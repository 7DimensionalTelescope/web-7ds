import React from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { PageLayout, PageHero, Section, StatGrid, LiveBadge } from '../components/site';
import SkyMap from '../components/skymap';
import { getStatus, getTileMap } from '../lib/portal.server';

export const meta: MetaFunction = () => [
  { title: 'Sky coverage · 7-Dimensional Telescope' },
  {
    name: 'description',
    content:
      'Every tile the 7-Dimensional Sky Survey has observed, plotted on an equal-area all-sky map and read from the observation database.',
  },
];

export async function loader() {
  // The map is the point of the page; the figures beside it are a secondary
  // read, so a portal outage degrades those rather than the page.
  const [tiles, status] = await Promise.all([getTileMap(), getStatus().catch(() => null)]);

  /* The database records open-shutter time for the survey as a whole, not per
     tile, so the pointer card estimates a tile's integration from its frame
     count and this mean. It is labeled as an estimate wherever it is shown. */
  const totals = status?.data.totals;
  const exposureSec =
    totals && totals.science_frames > 0
      ? (totals.exposure_hours * 3600) / totals.science_frames
      : null;

  return json(
    {
      tiles: tiles.data,
      generatedAt: tiles.generatedAt,
      live: tiles.live,
      ris: status?.data.ris ?? null,
      frames: totals?.science_frames ?? null,
      exposureSec,
    },
    { headers: { 'Cache-Control': CACHE } }
  );
}

/* The tile list changes once a night at most, so this can sit in front caches
   for an hour without ever being wrong by more than one night. The exported
   headers function is what puts it on the document response; the loader's own
   headers only reach client-side navigations. */
const CACHE = 'public, max-age=3600, stale-while-revalidate=86400';

export const headers: HeadersFunction = () => ({ 'Cache-Control': CACHE });

const num = (value: number) => value.toLocaleString('en-US');

const day = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const Index = () => {
  const { tiles, generatedAt, live, ris, frames, exposureSec } = useLoaderData<typeof loader>();

  const singleVisit = (tiles.visits ?? []).filter((v) => v === 1).length;
  const repeated = tiles.count - singleVisit;

  return (
    <PageLayout menu="manu7ds">
      <PageHero
        eyebrow="Survey"
        title={
          <>
            Sky <em>coverage</em>
          </>
        }
        lede="Every tile 7DS has observed, taken from the observation record rather than from the survey plan."
        image="/img/hero/survey.jpg"
        meta={[
          { value: num(tiles.count), label: 'Tiles observed', live: true },
          ...(ris ? [{ value: String(ris.coverage_pct), unit: '%', label: 'RIS complete' }] : []),
          { value: num(tiles.visitsMax), label: 'Most-visited tile' },
          { value: day(tiles.lastNight), label: 'Last observation' },
        ]}
      />

      <Section eyebrow="Footprint" title="Where 7DS has observed" wide>
        <div style={{ marginBottom: '1.25rem' }}>
          <LiveBadge live={live} updated={generatedAt} interval="daily" />
        </div>

        <p className="prose">
          The projection is Mollweide and equal-area: a given area of the map corresponds to the
          same area of sky wherever it falls, so coverage near the pole is not exaggerated as it
          would be on a rectangular plot. Longitude increases to the left. Switch between
          equatorial and galactic coordinates to view the footprint against either frame, and
          point anywhere on the map to read what the database holds for that position — tile
          identifier, visits, frames, estimated integration time and the medium bands observed.
          Positions with no data are reported as such.
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
          {exposureSec ? (
            <>
              {' '}
              Frame counts and filters are exact. Exposure time is an estimate: open-shutter time
              is recorded for the survey as a whole rather than per tile, so a tile's figure is its
              frame count times the survey mean of {exposureSec.toFixed(0)} seconds per frame, and
              is marked ≈ for that reason.
            </>
          ) : null}
        </p>
      </Section>

      <Section eyebrow="Read from the map" title="What the coverage shows" alt>
        <StatGrid
          items={[
            { value: num(tiles.count), label: 'Tiles with data' },
            { value: num(singleVisit), label: 'Observed once', note: 'RIS reference pass' },
            { value: num(repeated), label: 'Revisited', note: 'monitoring and ToO' },
            ...(frames ? [{ value: num(frames), label: 'Science frames' }] : []),
          ]}
        />

        <div className="split split--wide-text" style={{ marginTop: '2.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.0625rem' }}>Reading the three components</h3>
            <p className="prose">
              The broad wash across the southern sky is the{' '}
              <Link to="/survey/ris">Reference Imaging Survey</Link> working through the tiling one
              tile at a time. The small, heavily repeated cluster near the south ecliptic pole is
              the <Link to="/survey/ims">Intensive Monitoring Survey</Link> — seven tiles carrying
              hundreds of visits each, which is why the visit scale is logarithmic. Isolated tiles
              elsewhere are target-of-opportunity follow-ups that fell on the tiling.
            </p>
            <p className="prose">
              Colored by date, the map records how the survey has moved. The array observes the
              fields that are up, so coverage advances in seasonal bands rather than sweeping
              steadily across the sky.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.0625rem' }}>Using these data</h3>
            <p className="prose">
              The map is generated from the database that drives the pipeline, so a tile appearing
              here means calibrated images exist for it. How to obtain them is described under{' '}
              <Link to="/users/access">data access</Link>.
            </p>
            <div className="btn-row" style={{ marginTop: '1.25rem' }}>
              <Link className="btn btn--primary" to="/users/access">
                Data access
              </Link>
              <Link className="btn btn--secondary" to="/survey/status">
                Array operations
              </Link>
              <Link className="btn btn--secondary" to="/survey/overview">
                Survey design
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
