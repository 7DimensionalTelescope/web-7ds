import React from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { PageLayout, PageHero, Section, StatGrid, LiveBadge } from '../components/site';
import { getStatus } from '../lib/portal.server';

export const meta: MetaFunction = () => [
  { title: 'Survey status · 7-Dimensional Telescope' },
  {
    name: 'description',
    content:
      'Current operation of the 7DT array: observing nights, science frames, data volume and target-of-opportunity response, read from the observation database.',
  },
];

const CACHE = 'public, max-age=900, stale-while-revalidate=86400';

export async function loader() {
  const status = await getStatus();
  return json(status, { headers: { 'Cache-Control': CACHE } });
}

/* Without this the header set on the loader response only reaches client-side
   navigations — Remix does not carry it onto the document request by itself. */
export const headers: HeadersFunction = () => ({ 'Cache-Control': CACHE });

const num = (value: number, digits = 0) =>
  value.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

const day = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const Index = () => {
  const { data, live, generatedAt } = useLoaderData<typeof loader>();
  const { ris, ims, too, totals, nightly, telescopes } = data;

  const cycles = Object.values(ims.cycles_per_tile) as number[];
  const imsMedian = [...cycles].sort((a, b) => a - b)[Math.floor(cycles.length / 2)];

  return (
    <PageLayout menu="manu7ds">
      <PageHero
        eyebrow="Survey"
        title="Status"
        lede="How the array is operating. Every figure on this page is read from the observation database rather than entered by hand."
        image="/img/hero/status.jpg"
        meta={[
          {
            value: String(telescopes.total),
            label: 'Telescopes',
            note: `${telescopes.online} online`,
            live: true,
          },
          { value: num(nightly.n_nights), label: 'Observing nights' },
          {
            value: (totals.science_frames / 1e6).toFixed(2),
            unit: 'M',
            label: 'Science frames',
          },
          { value: num(totals.exposure_hours), unit: 'hr', label: 'Open shutter' },
        ]}
      />

      <Section eyebrow="Operations" title="Nightly operation">
        <div style={{ marginBottom: '1.5rem' }}>
          <LiveBadge live={live} updated={generatedAt} interval="every 30 minutes" />
        </div>

        {!live && (
          <div className="notice notice--warn">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v6M12 16h.01" strokeLinecap="round" />
            </svg>
            <span>
              The database could not be reached, so these figures are the last copy the site holds
              and may be out of date.
            </span>
          </div>
        )}

        <p className="prose">
          Over {num(nightly.n_nights)} observing nights since {day(nightly.first_night)}, the array
          has recorded {num(totals.science_frames)} science frames in{' '}
          {num(totals.exposure_hours)} hours of open shutter. The most recent observing night was{' '}
          {day(nightly.last_night)}. A typical night covers {nightly.tiles_per_night.median} tiles
          in {num(nightly.exposures_per_night.median)} exposures and writes{' '}
          {num(nightly.raw_gb_per_night.median)} GB of raw data, calibration frames included.
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
              { value: num(too.followup_events), label: 'ToO follow-ups' },
              { value: num(too.gw_campaigns), label: 'GW campaigns' },
            ]}
          />
        </div>
        <p className="footnote" style={{ marginTop: '1.25rem' }}>
          Medians rather than means: target-of-opportunity nights run to{' '}
          {num(nightly.exposures_per_night.max)} exposures and would otherwise dominate the figure.
        </p>
      </Section>

      <Section eyebrow="Components" title="Where each survey stands" alt>
        <div className="table-wrap" style={{ maxWidth: '760px' }}>
          <table className="tier-table">
            <caption>Current progress of the three survey components</caption>
            <thead>
              <tr>
                <th scope="col">Component</th>
                <th scope="col">Progress</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <Link to="/survey/ris">RIS</Link>
                </th>
                <td>{ris.coverage_pct}% of tiles observed</td>
                <td>
                  {num(ris.tiles_observed)} of {num(ris.tiles_defined)}
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <Link to="/survey/wts">WTS</Link>
                </th>
                <td>Not started</td>
                <td>Commencing 2026</td>
              </tr>
              <tr>
                <th scope="row">
                  <Link to="/survey/ims">IMS</Link>
                </th>
                <td>{num(imsMedian)} cycles on the median tile</td>
                <td>
                  {ims.min_cycles_per_tile}–{ims.max_cycles_per_tile} across {ims.n_tiles} tiles
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="note" style={{ marginTop: '1rem' }}>
          Each component page carries its own map, coverage and status in full.
        </p>
      </Section>

      <Section eyebrow="Response" title="Target of opportunity">
        <p className="prose">
          {num(too.followup_events)} follow-up campaigns have been carried out since automated
          target-of-opportunity response entered service, {num(too.gw_campaigns)} of them on
          gravitational-wave events.
        </p>
        <div className="chip-row" style={{ marginTop: '1.25rem' }}>
          {too.gw_event_ids.map((id: string) => (
            <span className="chip chip--static" key={id}>
              {id}
            </span>
          ))}
        </div>
        <p className="footnote" style={{ marginTop: '1rem' }}>
          LVK superevent identifiers as issued in the public alert stream. Target-level details are
          not published here.
        </p>
        <div className="btn-row" style={{ marginTop: '1.5rem' }}>
          <Link className="btn btn--primary" to="/survey/coverage">
            Sky coverage map
          </Link>
          <Link className="btn btn--secondary" to="/users/status">
            Data availability
          </Link>
          <Link className="btn btn--secondary" to="/about/intro#history">
            Project history
          </Link>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
