import React from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { PageLayout, PageHero, Section, StatGrid, SimpleTable, LiveBadge } from '../components/site';
import SkyMap from '../components/skymap';
import TileQuery from '../components/tilequery';
import { getStatus, getTileMap } from '../lib/portal.server';
import { dataProductText } from './content/text';
import software from './content/software.json';

export const meta: MetaFunction = () => [
  { title: 'Data access · 7DT for users' },
  {
    name: 'description',
    content:
      'Search 7DS coverage by position or on an all-sky map, find out how to obtain the data, and what the pipeline produces and in what units.',
  },
];

const CACHE = 'public, max-age=3600, stale-while-revalidate=86400';
export const headers: HeadersFunction = () => ({ 'Cache-Control': CACHE });

export async function loader() {
  // The map and the query both run off the tile list; the status figures
  // beside them are secondary, so a portal outage degrades those, not the page.
  const [tiles, status] = await Promise.all([getTileMap(), getStatus().catch(() => null)]);

  /* Open-shutter time is recorded for the survey as a whole, not per tile, so
     integration time per tile is estimated from the frame count and this mean.
     It is labeled as an estimate wherever it appears. */
  const totals = status?.data.totals;
  const exposureSec =
    totals && totals.science_frames > 0
      ? (totals.exposure_hours * 3600) / totals.science_frames
      : null;

  return json(
    {
      tiles: tiles.data,
      live: tiles.live,
      generatedAt: tiles.generatedAt,
      ris: status?.data.ris ?? null,
      frames: totals?.science_frames ?? null,
      exposureSec,
    },
    { headers: { 'Cache-Control': CACHE } }
  );
}

/* Format lives here rather than on a page of its own: finding data and knowing
   what arrives are the same errand. */
const PRODUCTS = [
  ['single', 'A calibrated individual exposure, 100 s, with WCS and a source catalog'],
  ['coadd', 'Three singles combined to a 300 s frame — the basic survey product'],
  ['difference', 'A coadd minus its reference image, for transient detection'],
  ['catalog', 'A flux-calibrated source list attached to every image above'],
  ['master frame', 'Bias, dark and flat, generated nightly and matched by group key'],
];

const CONVENTIONS = [
  ['Photometric system', 'AB magnitudes'],
  ['Coadd zero point', '23.9 AB — pixel values in µJy'],
  ['Astrometric reference', 'Gaia DR3'],
  ['Flux calibration', 'Synthetic photometry from Gaia XP spectra'],
  ['Tiling', 'HEALPix-derived, T00000 – T28519'],
  ['File format', 'FITS, with QA metrics in the header'],
];

const QA_KEYS = [
  ['SANITY', 'Boolean; false means the image should not be used for science'],
  ['REJ_PROC', 'The processing stage at which SANITY was set false'],
  ['SEEING', 'Measured PSF FWHM'],
  ['UL5_5', '5σ limiting magnitude'],
  ['ELLIP', 'Point-source elongation'],
  ['PPFLAG', 'Bitmask recording compromises in master-frame selection'],
];

const num = (value: number) => value.toLocaleString('en-US');

const day = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const Index = () => {
  const { tiles, live, generatedAt, ris, frames, exposureSec } = useLoaderData<typeof loader>();

  const singleVisit = (tiles.visits ?? []).filter((v) => v === 1).length;
  const repeated = tiles.count - singleVisit;

  return (
    <PageLayout menu="manuUsers">
      <PageHero
        eyebrow="For users"
        title={
          <>
            Data access &amp; <em>format</em>
          </>
        }
        lede="Find out whether a position has been observed, obtain the data, and know what arrives when you do."
        image="/img/hero/data.jpg"
        meta={[
          { value: num(tiles.count), label: 'Tiles with data', live: true },
          ...(ris ? [{ value: String(ris.coverage_pct), unit: '%', label: 'Sky referenced' }] : []),
          { value: num(tiles.visitsMax), label: 'Most-visited tile' },
          { value: day(tiles.lastNight), label: 'Last observation' },
        ]}
      />

      {/* The query comes first: most visitors arrive with a position in hand
          and want a yes or no before anything else. */}
      <Section eyebrow="Search" title="Is this position observed?">
        <div style={{ marginBottom: '1.5rem' }}>
          <LiveBadge live={live} updated={generatedAt} interval="daily" />
        </div>

        <p className="prose">
          Enter a position to see whether a survey tile covers it and what the observation record
          holds — how many nights and frames, roughly how much open-shutter time, which medium
          bands were taken and over what date range. The search runs against the same database
          that drives the pipeline, so a tile reported as observed has calibrated images behind it.
        </p>

        <div style={{ marginTop: '2rem' }}>
          <TileQuery tiles={tiles} exposureSec={exposureSec} />
        </div>

        <p className="footnote" style={{ marginTop: '1.5rem' }}>
          A position is matched to a tile when it falls within that tile's 1.34° × 0.90° field.
          Frame counts and filters are exact. Exposure time is an estimate — the frame count times
          the survey mean of {exposureSec ? exposureSec.toFixed(0) : '≈80'} seconds per frame — and
          is marked ≈ for that reason.
        </p>
      </Section>

      <Section eyebrow="Footprint" title="Where 7DS has observed" alt wide>
        <p className="prose">
          The same record, drawn as a map. The projection is Mollweide and equal-area: a given area
          of the map corresponds to the same area of sky wherever it falls, so coverage near the
          pole is not exaggerated as it would be on a rectangular plot. Longitude increases to the
          left. Switch between equatorial and galactic coordinates, and point anywhere to read what
          exists at that position.
        </p>

        <div style={{ marginTop: '2rem' }}>
          <SkyMap tiles={tiles} exposureSec={exposureSec} />
        </div>

        <p className="footnote" style={{ marginTop: '1rem' }}>
          {live
            ? `Generated ${day(generatedAt)}.`
            : 'The database could not be reached; this map is a stored copy and may be out of date.'}{' '}
          Only tiles with at least one science exposure are shown. Target-of-opportunity pointings
          at arbitrary coordinates are not on the tiling and do not appear.
        </p>

        <div style={{ marginTop: '2.5rem' }}>
          <StatGrid
            items={[
              { value: num(tiles.count), label: 'Tiles with data' },
              { value: num(singleVisit), label: 'Observed once', note: 'RIS reference pass' },
              { value: num(repeated), label: 'Revisited', note: 'monitoring and ToO' },
              ...(frames ? [{ value: num(frames), label: 'Science frames' }] : []),
            ]}
          />
        </div>

        <p className="footnote" style={{ marginTop: '1.25rem' }}>
          The broad wash across the southern sky is the{' '}
          <Link to="/survey/ris">Reference Imaging Survey</Link>; the heavily repeated cluster near
          the south ecliptic pole is the{' '}
          <Link to="/survey/ims">Intensive Monitoring Survey</Link>, which is why the visit scale is
          logarithmic. Isolated tiles elsewhere are target-of-opportunity follow-ups that fell on
          the tiling.
        </p>
      </Section>

      <Section eyebrow="Requesting" title="Obtaining data">
        <div className="split split--wide-text">
          <div>
            <p className="prose">
              There is no public archive interface yet. A complete record of every image type and
              source catalog is held internally, with the provenance of any product traceable back
              to the raw frames it was built from, and requests are handled by the project directly
              until a public release is made.
            </p>
            <p className="prose">
              A request is quickest to fill if it states the tile identifier — or the coordinates —
              the filters, the epoch range, and which product is wanted: single exposures, coadds,
              difference images or catalogs. Terms of use and acknowledgment are set out under{' '}
              <Link to="/users/data">how to use the data</Link>.
            </p>
          </div>
          <div className="panel">
            <div className="panel__title">Requesting data</div>
            <p className="feature-list__body" style={{ marginBottom: '1rem' }}>
              Include the tile identifier or position, the bands, the epoch range and the product
              type.
            </p>
            <a
              className="btn btn--primary"
              href="mailto:mim@astro.snu.ac.kr?subject=7DT%20data%20request"
            >
              Contact the project
            </a>
          </div>
        </div>
      </Section>

      <Section id="format" eyebrow="Format" title="What the pipeline produces" alt>
        <div className="split split--wide-text">
        <div>
          <p className="prose">{dataProductText}</p>
          <ul className="feature-list" style={{ marginTop: '1.5rem' }}>
            {PRODUCTS.map((product) => (
              <li key={product[0]}>
                <span className="feature-list__key" style={{ fontFamily: 'var(--font-mono)' }}>
                  {product[0]}
                </span>
                <div>
                  <p className="feature-list__body" style={{ margin: 0 }}>
                    {product[1]}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <SimpleTable caption="Conventions" rows={CONVENTIONS} />
        </div>
      </Section>

        <Section eyebrow="Headers" title="Header and catalog information">
        <div className="split split--wide-text">
        <div>
          <p className="prose">
            Quality-assurance metrics are written into the FITS header of every product and
            ingested into the operations database, so the state of an image can be inspected
            without opening it. Each catalog is a flux-calibrated source list matched to its parent
            image, carrying positions on the Gaia DR3 frame and AB magnitudes in the band of the
            image it was extracted from. For a coadd this means one row per detected source per
            band; combining bands for a given source gives the medium-band spectral energy
            distribution that the survey exists to produce.
          </p>
        </div>
        <SimpleTable caption="Selected header keywords" rows={QA_KEYS} />
        </div>
      </Section>

        <Section eyebrow="Processing" title="How a night is reduced" alt>
        <p className="prose">
        Images are grouped by their properties — unit, filter, observing mode, night — into
        configurations, and each group runs through the same sequence. Established astronomical
        software does the numerical work behind Python interfaces rather than being reimplemented,
        so the behavior of each stage is that of the underlying tool.
        </p>

        <ul className="feature-list" style={{ marginTop: '2rem' }}>
        {software.stages.map((stage, index) => (
          <li key={stage.module}>
            <span className="feature-list__key">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3
                className="feature-list__title"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem' }}
              >
                {stage.module}
              </h3>
              <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
                {stage.body}
              </p>
            </div>
          </li>
        ))}
        </ul>

        <div className="panel panel--alt" style={{ marginTop: '2rem' }}>
        <div className="panel__title">External engines</div>
        <div className="table-wrap" style={{ border: 0 }}>
          <table className="spec-table">
            <tbody>
              {software.external.map((tool) => (
                <tr key={tool[0]}>
                  <th scope="row" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                    {tool[0]}
                  </th>
                  <td style={{ fontFamily: 'var(--font-sans)' }}>{tool[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

        <div className="btn-row" style={{ marginTop: '2rem' }}>
        <Link className="btn btn--primary" to="/users/access">
          Getting the data
        </Link>
        <Link className="btn btn--secondary" to="/users/software">
          Reprocessing it yourself
        </Link>
        </div>
      </Section>
      <Section eyebrow="Ahead" title="Planned public release">
        <p className="prose">
          A public release of survey products is being prepared alongside the completion of the
          Reference Imaging Survey, whose first full cycle is anticipated by the end of 2027. The
          release is intended to include a query interface over images and catalogs; this page will
          carry it when it exists.
        </p>
      </Section>
    </PageLayout>
  );
};

export default Index;
