import React, { useMemo, useState } from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { PageLayout, PageHero, Section, StatGrid, LiveBadge } from '../components/site';
import FilterCurves from '../components/filtercurves';
import SkyMap from '../components/skymap';
import { getStatus, getTileMapLite } from '../lib/portal.server';
import { RIS_TILES, GRID_TILES } from '../lib/tilegrid';

export const meta: MetaFunction = () => [
  { title: 'Status & overview · 7DT for users' },
  {
    name: 'description',
    content:
      'What 7DT can observe now and what data exist: telescopes and filters available, survey coverage, measured depths and processing status.',
  },
];

const CACHE = 'public, max-age=900, stale-while-revalidate=86400';
export const headers: HeadersFunction = () => ({ 'Cache-Control': CACHE });

export async function loader() {
  /* Names are asked for because the IMS layer picks its seven tiles out by
     identifier; they are 3 KB gzipped. The per-filter breakdown is not, so the
     lite copy is enough for the map. */
  const [status, tiles] = await Promise.all([getStatus(), getTileMapLite(true)]);

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

/* The medium-band set as installed. The original twenty are on a regular 25 nm
   spacing; the fifteen added in late 2025 fill the gaps and are not regularly
   spaced, which is why they are listed separately rather than merged. */
const BANDS_ORIGINAL = [
  400, 425, 450, 475, 500, 525, 550, 575, 600, 625, 650, 675, 700, 725, 750, 775, 800, 825, 850,
  875,
];
const BANDS_ADDED = [375, 386, 412, 438, 462, 483, 512, 534, 561, 586, 615, 640, 661, 769, 832];

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

function CoverageMap({
  tiles,
  exposureSec,
  imsTiles,
}: {
  tiles: any;
  exposureSec: number | null;
  imsTiles: string[];
}) {
  const [on, setOn] = useState<Layers>({ grid: true, ext: false, observed: true, ims: false });
  const toggle = (key: keyof Layers) => setOn((was) => ({ ...was, [key]: !was[key] }));

  const planned = useMemo(() => {
    if (on.grid && on.ext) return { from: 0, to: GRID_TILES };
    if (on.grid) return { to: RIS_TILES };
    if (on.ext) return { from: RIS_TILES, to: GRID_TILES };
    return null;
  }, [on.grid, on.ext]);

  const BOXES: { key: keyof Layers; label: string; note: string }[] = [
    { key: 'grid', label: 'RIS reference grid', note: `${RIS_TILES.toLocaleString('en-US')} tiles` },
    { key: 'ext', label: 'Northern extension', note: 'to Dec +30°' },
    { key: 'observed', label: 'Observed', note: 'colored by the scale below' },
    { key: 'ims', label: 'IMS field', note: `${imsTiles.length} tiles` },
  ];

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
        <span className="map-layers__item map-layers__item--off" aria-disabled="true">
          <input type="checkbox" disabled aria-label="WTS layer, unavailable: not started" />
          <span>
            WTS
            <span className="map-layers__note">not started</span>
          </span>
        </span>
        <span className="map-layers__item map-layers__item--off" aria-disabled="true">
          <input
            type="checkbox"
            disabled
            aria-label="Target of opportunity layer, unavailable: positions not published"
          />
          <span>
            Target of opportunity
            <span className="map-layers__note">positions not published</span>
          </span>
        </span>
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

const Index = () => {
  const { data, live, generatedAt, tiles, tilesLive, exposureSec } =
    useLoaderData<typeof loader>();
  const { telescopes, ris, nightly, totals, ims } = data;
  const imsTiles = Object.keys(ims.cycles_per_tile ?? {});

  return (
    <PageLayout menu="manuUsers">
      <PageHero
        eyebrow="For users"
        title={
          <>
            Status 
          </>
        }
        lede="What the array can observe at the moment, and what data already exist. Start here before planning an observation or a data request."
        image="/img/hero/data.jpg"
        meta={[
          {
            value: String(telescopes.online),
            label: 'Telescopes available',
            note: `of ${telescopes.total}`,
            live: true,
          },
          { value: '35', label: 'Filters installed', note: 'of 40 medium bands' },
          { value: String(ris.coverage_pct), unit: '%', label: 'Sky referenced' },
          { value: day(nightly.last_night), label: 'Last night observed' },
        ]}
      />

      <Section eyebrow="Availability" title="What is on sky tonight">
        <div style={{ marginBottom: '1.5rem' }}>
          <LiveBadge live={live} updated={generatedAt} interval="every 30 minutes" />
        </div>

        <p className="prose">
          {telescopes.online} of {telescopes.total} telescopes are in routine operation. Units not
          listed as online are either awaiting installation or out of service for maintenance. Each
          operational unit carries a nine-slot filter wheel holding Sloan broad bands and a share
          of the medium-band set, so the number of distinct bands available on a given night
          depends on how many units are observing.
        </p>

        <div style={{ marginTop: '2rem' }}>
          <StatGrid
            items={[
              {
                value: String(telescopes.online),
                label: 'Telescopes online',
                note: `of ${telescopes.total}`,
                live: true,
              },
              { value: '35', label: 'Filters installed', note: 'of 40 medium bands' },
              { value: num(nightly.n_nights), label: 'Nights observed' },
              { value: day(nightly.last_night), label: 'Most recent night' },
            ]}
          />
        </div>
      </Section>

      {/* Array-wide operation. It is neither a property of one survey nor of
          the instrument, and a user planning work needs it before either. */}
      <Section eyebrow="Operations" title="What a night produces" alt>
        <p className="prose">
          Over {num(nightly.n_nights)} observing nights since {day(nightly.first_night)}, the array
          has recorded {num(totals.science_frames)} science frames in{' '}
          {num(totals.exposure_hours)} hours of open shutter. A typical night covers{' '}
          {nightly.tiles_per_night.median} tiles in {num(nightly.exposures_per_night.median)}{' '}
          exposures and writes {num(nightly.raw_gb_per_night.median)} GB of raw data, calibration
          frames included.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <StatGrid
            items={[
              {
                value: num(nightly.tiles_per_night.median),
                label: 'Tiles per night',
                note: 'median',
              },
              {
                value: num(nightly.exposures_per_night.median),
                label: 'Exposures per night',
                note: 'median',
              },
              {
                value: num(nightly.raw_gb_per_night.median),
                unit: 'GB',
                label: 'Raw data per night',
                note: 'median',
              },
              { value: num(totals.science_frames), label: 'Science frames', note: 'to date' },
              {
                value: num(totals.exposure_hours),
                unit: 'hr',
                label: 'Open shutter',
                note: 'to date',
              },
            ]}
          />
        </div>
        <p className="footnote" style={{ marginTop: '1.25rem' }}>
          Medians rather than means: target-of-opportunity nights run to{' '}
          {num(nightly.exposures_per_night.max)} exposures and would otherwise dominate the figure.
          Progress of each survey is on its own page —{' '}
          <Link to="/survey/ris">RIS</Link>, <Link to="/survey/wts">WTS</Link> and{' '}
          <Link to="/survey/ims">IMS</Link>.
        </p>
      </Section>

      <Section eyebrow="Filters" title="Bands available">
        <div className="split split--wide-text">
          <div>
            <p className="prose">
              The filter set is what distinguishes 7DT from other survey arrays. Twenty medium
              bands of 25 nm width are spaced regularly at 25 nm from 400 to 875 nm. Fifteen
              further filters, installed in late 2025, fall between them with central wavelengths
              from 375 to 832 nm and bandwidths of 14 to 41 nm. Sloan g, r and i are carried by
              every unit; u is carried by one and z by three.
            </p>
            <p className="prose">
              The original twenty are the calibrated set in operational use. Spectrophotometric
              calibration of the fifteen added filters is in preparation, and their central
              wavelengths are not aligned to a regular grid — check which bands a given tile
              actually carries on the{' '}
              <Link to="/users/access">data access page</Link>, which reports the medium bands
              observed on any tile.
            </p>

            <div className="table-wrap" style={{ marginTop: '1.5rem' }}>
              <table className="spec-table">
                <caption>Medium bands, central wavelength in nm</caption>
                <tbody>
                  <tr>
                    <th scope="row">Original set (25 nm spacing)</th>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                      {BANDS_ORIGINAL.join(', ')}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Added 2025 (irregular)</th>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                      {BANDS_ADDED.join(', ')}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Broad bands</th>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                      u, g, r, i, z
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Availability" title="How much sky each band has reached" alt wide>
        <p className="prose">
          A band is only useful where it has been taken. Because each unit carries nine slots out
          of the {tiles.perFilter?.length ?? 37} bands in use, the array works through the set over
          many nights, and coverage runs well ahead in some bands and behind in others. The count
          below is tiles with at least one science frame in that band.
        </p>
        <div className="table-wrap" style={{ marginTop: '1.5rem' }}>
          <table className="spec-table">
            <caption>Tiles observed per band, of {num(ris.tiles_defined)} in the reference grid</caption>
            <thead>
              <tr>
                <th scope="col">Band</th>
                <th scope="col">Central λ</th>
                <th scope="col">Tiles in the grid</th>
                <th scope="col">Of the grid</th>
                <th scope="col">Frames</th>
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
          Counted over the original reference grid, so the percentages are comparable with the{' '}
          {ris.coverage_pct}% figure above. Broad bands are listed at their effective wavelength.
          Which bands a particular tile carries is reported on the{' '}
          <Link to="/users/access">data access page</Link>.
        </p>
      </Section>

      <Section eyebrow="Response" title="Filter response curves" wide>
        <FilterCurves />
        <p className="footnote" style={{ marginTop: '1rem' }}>
          Curves are read from the reference data shipped with{' '}
          <Link to="/users/software">
            <code>supy</code>
          </Link>
          , which is also what its simulator module uses, so a response computed there matches
          this figure exactly.
        </p>
      </Section>

      <Section eyebrow="Coverage" title="What has been observed" wide>
        <p className="prose">
          {ris.coverage_pct} percent of the reference tiling has been observed at least once:{' '}
          {num(ris.tiles_observed)} of {num(ris.tiles_defined)} tiles, or{' '}
          {num(ris.tiles_observed_extended)} of {num(ris.tiles_extended)} counting the northern
          extension. A tile with data has calibrated images and a source catalog.
        </p>

        <div style={{ margin: '1.5rem 0' }}>
          <LiveBadge live={tilesLive} updated={generatedAt} interval="daily" />
        </div>

        <CoverageMap tiles={tiles} exposureSec={exposureSec} imsTiles={imsTiles} />

        <p className="footnote" style={{ marginTop: '1rem' }}>
          The reference grid is the survey as designed — every tile the array intends to reach —
          reconstructed from the tiling rule rather than published as a list, and checked against
          every observed tile. WTS has not begun and has no footprint to draw yet. Target-of-
          opportunity observations are made across the whole grid, and the portal publishes their
          counts but not their positions, so they cannot be drawn as a layer; the{' '}
          {num(data.too.followup_events)} follow-up campaigns to date are summarized under{' '}
          <Link to="/users/propose">how to propose</Link>.
        </p>

        <div className="btn-row" style={{ marginTop: '1.5rem' }}>
          <Link className="btn btn--primary" to="/users/access">
            Search coverage by position
          </Link>
          <Link className="btn btn--secondary" to="/users/performance">
            Measured depths
          </Link>
        </div>
      </Section>

      <Section eyebrow="Processing" title="Processing status" alt>
        <p className="prose">
          Data are reduced the same day they are taken. Raw frames are transferred from Chile
          overnight and a typical night clears the pipeline in about five hours of wall-clock time
          after transfer completes, so survey data are normally available the following day.
          Target-of-opportunity data skip compression and the wait for sunrise, which brings
          latency down to tens of minutes. What the pipeline produces, and the quality metrics
          attached to each product, are described under{' '}
          <Link to="/users/access#format">using the data</Link>.
        </p>
      </Section>
    </PageLayout>
  );
};

export default Index;
