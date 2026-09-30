import React, { useMemo, useState } from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PageLayout, PageHero, Section, StatGrid, LiveBadge, ButtonRow } from '../components/site';
import { Md, Paras } from '../components/md';
import { fillAll, metaOf, type Formats } from '../lib/page';
import page from '../content/pages/users/status.json';
import FilterCurves from '../components/filtercurves';
import SkyMap from '../components/skymap';
import TileQuery from '../components/tilequery';
import { getStatus, getTileMap } from '../lib/portal.server';
import { RIS_TILES, GRID_TILES } from '../lib/tilegrid';

export const meta: MetaFunction = () => metaOf(page);

const CACHE = 'public, max-age=900, stale-while-revalidate=86400';
export const headers: HeadersFunction = () => ({ 'Cache-Control': CACHE });

export async function loader() {
  /* The full tile list: the IMS layer picks its seven tiles out by identifier,
     and the position search reports the per-filter breakdown for whatever tile
     covers the coordinate. */
  const [status, tiles] = await Promise.all([getStatus(), getTileMap()]);

  const totals = status.data.totals;
  const exposureSec =
    totals && totals.science_frames > 0
      ? (totals.exposure_hours * 3600) / totals.science_frames
      : null;

  return json(
    { ...status, tiles: tiles.data, tilesLive: tiles.live, exposureSec },
    { headers: { 'Cache-Control': CACHE } }
  );
}

/* ---------------------------------------------------------------------------
   Coverage map with its layers.

   Four things could be drawn on this sky and only two of them exist as data.
   The reference grid and the northern extension follow from the tiling rule;
   the observation record comes from the portal; IMS is seven named tiles. WTS
   has not started and the portal publishes no positions for target-of-
   opportunity work, so those two are shown as unavailable rather than left
   off — a reader looking for them should find out why they are missing.
--------------------------------------------------------------------------- */

type Layers = { grid: boolean; ext: boolean; observed: boolean; ims: boolean };

type LayerText = {
  layers: { key: string; label: string; note: string }[];
  unavailable: { label: string; note: string; aria: string }[];
};

function CoverageMap({
  tiles,
  exposureSec,
  imsTiles,
  text,
}: {
  tiles: any;
  exposureSec: number | null;
  imsTiles: string[];
  /** Layer labels, placeholders already filled. */
  text: LayerText;
}) {
  const [on, setOn] = useState<Layers>({ grid: true, ext: false, observed: true, ims: false });
  const toggle = (key: keyof Layers) => setOn((was) => ({ ...was, [key]: !was[key] }));

  const planned = useMemo(() => {
    if (on.grid && on.ext) return { from: 0, to: GRID_TILES };
    if (on.grid) return { to: RIS_TILES };
    if (on.ext) return { from: RIS_TILES, to: GRID_TILES };
    return null;
  }, [on.grid, on.ext]);

  const BOXES = text.layers as { key: keyof Layers; label: string; note: string }[];

  return (
    <>
      <div className="map-layers">
        {BOXES.map((box) => (
          <label className="map-layers__item" key={box.key}>
            <input type="checkbox" checked={on[box.key]} onChange={() => toggle(box.key)} />
            <span>
              {box.label}
              <span className="map-layers__note">{box.note}</span>
            </span>
          </label>
        ))}
        {text.unavailable.map((layer) => (
          <span className="map-layers__item map-layers__item--off" aria-disabled="true" key={layer.label}>
            <input type="checkbox" disabled aria-label={layer.aria} />
            <span>
              {layer.label}
              <span className="map-layers__note">{layer.note}</span>
            </span>
          </span>
        ))}
      </div>

      <SkyMap
        tiles={tiles}
        planned={planned}
        showObserved={on.observed}
        emphasize={on.ims ? imsTiles : null}
        exposureSec={exposureSec}
      />
    </>
  );
}

const num = (value: number, digits = 0) =>
  value.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

const day = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const FORMATS: Formats = { num: (v: number) => num(v), day: (v: string) => day(v) };

const Index = () => {
  const { data, live, generatedAt, tiles, tilesLive, exposureSec } =
    useLoaderData<typeof loader>();
  const { ris } = data;
  const imsTiles = Object.keys(data.ims.cycles_per_tile ?? {});

  /* Everything the content file's placeholders can name: the status report
     as the portal sends it, and three counts the page makes itself. */
  const vars = {
    ...data,
    bandsInUse: tiles.perFilter?.length ?? 37,
    imsTileCount: imsTiles.length,
    risTiles: RIS_TILES,
  };
  const t = fillAll(page, vars, FORMATS);
  const { hero, tonight, night, bands, perBand, response, coverage, processing } = t;

  return (
    <PageLayout menu="manuUsers" rail>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} image={hero.image} meta={hero.meta} />

      <Section eyebrow={tonight.eyebrow} title={tonight.title}>
        <div style={{ marginBottom: '1.5rem' }}>
          <LiveBadge live={live} updated={generatedAt} interval={tonight.updated} />
        </div>

        <p className="prose">
          <Md>{tonight.body}</Md>
        </p>

        <div style={{ marginTop: '2rem' }}>
          <StatGrid items={tonight.stats} />
        </div>
      </Section>

      {/* Array-wide operation. It is neither a property of one survey nor of
          the instrument, and a user planning work needs it before either. */}
      <Section eyebrow={night.eyebrow} title={night.title} alt>
        <p className="prose">
          <Md>{night.body}</Md>
        </p>
        <div style={{ marginTop: '2rem' }}>
          <StatGrid items={night.stats} />
        </div>
        <p className="footnote" style={{ marginTop: '1.25rem' }}>
          <Md>{night.footnote}</Md>
        </p>
      </Section>

      <Section eyebrow={bands.eyebrow} title={bands.title}>
        <div className="split split--wide-text">
          <div>
            <Paras className="prose">{bands.body}</Paras>

            <div className="table-wrap" style={{ marginTop: '1.5rem' }}>
              <table className="spec-table">
                <caption>{bands.table.caption}</caption>
                <tbody>
                  {bands.table.rows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                        {row.bands.join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow={perBand.eyebrow} title={perBand.title} alt wide>
        <p className="prose">
          <Md>{perBand.body}</Md>
        </p>
        <div className="table-wrap" style={{ marginTop: '1.5rem' }}>
          <table className="spec-table">
            <caption>{perBand.caption}</caption>
            <thead>
              <tr>
                {perBand.columns.map((col) => (
                  <th key={col} scope="col">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(tiles.perFilter ?? []).map((f) => (
                <tr key={f.name}>
                  <th scope="row" style={{ fontFamily: 'var(--font-mono)' }}>
                    {f.name}
                  </th>
                  <td>{Number.isFinite(f.nm) ? `${f.nm} nm` : '—'}</td>
                  <td>{num(f.tilesRis)}</td>
                  <td>{((f.tilesRis / ris.tiles_defined) * 100).toFixed(1)}%</td>
                  <td>{num(f.frames)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="footnote" style={{ marginTop: '1rem' }}>
          <Md>{perBand.footnote}</Md>
        </p>
      </Section>

      <Section eyebrow={response.eyebrow} title={response.title} wide>
        <FilterCurves />
        <p className="footnote" style={{ marginTop: '1rem' }}>
          <Md>{response.footnote}</Md>
        </p>
      </Section>

      <Section eyebrow={coverage.eyebrow} title={coverage.title} wide>
        <p className="prose">
          <Md>{coverage.body}</Md>
        </p>

        <div style={{ margin: '1.5rem 0' }}>
          <LiveBadge live={tilesLive} updated={generatedAt} interval={coverage.updated} />
        </div>

        <CoverageMap tiles={tiles} exposureSec={exposureSec} imsTiles={imsTiles} text={coverage} />

        <p className="footnote" style={{ marginTop: '1rem' }}>
          <Md>{coverage.footnote}</Md>
        </p>

        {/* The search sits under the map rather than on a page of its own: it
            answers the same question the map does, one position at a time, and
            runs in the browser against the tile list already loaded here. */}
        <div style={{ marginTop: '2.5rem' }}>
          <h3>{coverage.query}</h3>
          <TileQuery tiles={tiles} exposureSec={exposureSec} />
        </div>

        <ButtonRow buttons={coverage.buttons} style={{ marginTop: '2rem' }} />
      </Section>

      <Section eyebrow={processing.eyebrow} title={processing.title} alt>
        <p className="prose">
          <Md>{processing.body}</Md>
        </p>
      </Section>
    </PageLayout>
  );
};

export default Index;
