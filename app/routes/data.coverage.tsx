import React from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { PageLayout, PageHero, Section, StatGrid } from '../components/site';
import SkyMap from '../components/skymap';
import { getStatus, getTileMap } from '../lib/portal.server';

export const meta: MetaFunction = () => [
  { title: 'Sky coverage · 7-Dimensional Telescope' },
  {
    name: 'description',
    content:
      'Every tile the 7-Dimensional Sky Survey has observed, plotted on an equal-area all-sky map and read live from the 7DT GW Portal.',
  },
];

export async function loader() {
  // The map is the point of the page; the status figures beside it are a
  // secondary read, so a portal outage degrades those rather than the page.
  const [tiles, status] = await Promise.all([
    getTileMap(),
    getStatus().catch(() => null),
  ]);

  /* The portal reports open-shutter time only as a survey total, not per tile,
     so the pointer card estimates a tile's integration from its frame count
     and this mean. It is labelled as an estimate wherever it is shown. */
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

  const singleVisit = tiles.visits.filter((v) => v === 1).length;
  const repeated = tiles.count - singleVisit;

  return (
    <PageLayout menu="manuData">
      <PageHero
        eyebrow="Data"
        title={
          <>
            Sky <em>coverage</em>
          </>
        }
        lede="Every tile 7DS has observed, drawn from the observation record itself rather than from a survey plan. What is on this map is what the array has actually taken."
        image="/img/hero/survey.jpg"
        meta={[
          { value: num(tiles.count), label: 'Tiles observed' },
          ...(ris ? [{ value: String(ris.coverage_pct), unit: '%', label: 'RIS complete' }] : []),
          { value: num(tiles.visitsMax), label: 'Most-visited tile' },
          { value: day(tiles.lastNight), label: 'Last observation' },
        ]}
      />

      <Section eyebrow="Footprint" title="Where 7DS has been" wide>
        <p className="prose">
          The projection is Mollweide and equal-area, so a patch of ink covers the same amount of
          sky wherever it falls — the deep southern coverage is not exaggerated by the projection
          the way it would be on a rectangular plot. Longitude increases to the left, as on the
          sky. Switch between equatorial and galactic coordinates to see the survey against the
          sky's own grid or against the plane of the Milky Way. Point anywhere on the map to read
          what the observation record holds for that position: the tile identifier, how many nights
          it has been visited, how many frames it carries, roughly how much open-shutter time that
          represents, and which of the medium bands have been taken on it. Positions with no data
          say so rather than reporting nothing.
        </p>

        <div style={{ marginTop: '2rem' }}>
          <SkyMap tiles={tiles} exposureSec={exposureSec} />
        </div>

        <p className="footnote" style={{ marginTop: '1rem' }}>
          {live
            ? `Live from the 7DT GW Portal, generated ${day(generatedAt)}.`
            : 'The portal could not be reached; this map is a stored copy and may be out of date.'}{' '}
          Only tiles with at least one science exposure appear. Target-of-opportunity pointings at
          arbitrary coordinates are not on the tile grid and are not shown.
          {exposureSec ? (
            <>
              {' '}
              Frame counts and filters are exact. Exposure time is an estimate: the database records
              open-shutter time for the survey as a whole rather than per tile, so a tile's figure
              is its frame count times the survey mean of {exposureSec.toFixed(0)} seconds per
              frame, and is marked ≈ for that reason.
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
            <h3 style={{ fontSize: '1.0625rem' }}>Three surveys, one map</h3>
            <p className="prose">
              The broad grey-green wash across the southern sky is the Reference Imaging Survey
              working through its grid a tile at a time. The small, intensely repeated cluster near
              the south ecliptic pole is the Intensive Monitoring Survey — seven tiles carrying
              hundreds of visits each, which is why the visit scale on this map is logarithmic.
              Scattered isolated tiles are target-of-opportunity follow-ups that happened to land on
              the survey grid.
            </p>
            <p className="prose">
              Colored by date, the map also reads as a record of how the survey has moved: the
              array works the fields that are up, so coverage advances in seasonal bands rather
              than sweeping steadily across the sky.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.0625rem' }}>Using these data</h3>
            <p className="prose">
              The map is generated from the same database that drives the pipeline, so a tile
              appearing here means calibrated images exist for it. There is no public archive
              interface yet; until the release accompanying the completion of RIS, requests are
              handled directly by the project.
            </p>
            <div className="btn-row" style={{ marginTop: '1.25rem' }}>
              <Link className="btn btn--primary" to="/data/data">Data products</Link>
              <Link className="btn btn--secondary" to="/survey/status">Survey status</Link>
              <Link className="btn btn--secondary" to="/survey/design">Why three tiers</Link>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Source" title="How this page is built">
        <p className="prose">
          The map and the figures beside it come from the 7DT GW Portal, the project's internal
          observation database. The site reads it on the server, reduces the result to the few
          fields the map needs, caches that for a few minutes and falls back to the last stored
          copy if the database is unreachable. The database itself is not exposed to visitors: your
          browser only ever talks to this site. What you see here is therefore what the observation
          record says, not a figure typed into a page by hand.
        </p>
      </Section>
    </PageLayout>
  );
};

export default Index;
