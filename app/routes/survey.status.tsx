import React from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { PageLayout, PageHero, Section, StatGrid } from '../components/site';
import { getStatus } from '../lib/portal.server';
import surveys from './content/surveys.json';

export const meta: MetaFunction = () => [
  { title: 'Survey status · 7-Dimensional Telescope' },
  {
    name: 'description',
    content:
      'Live progress of the Reference Imaging, Wide-area Time-domain and Intensive Monitoring surveys, read from the 7DT GW Portal.',
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

/* Dated milestones are project history, not status — they stay in the page. */
const MILESTONES = [
  ['Oct. 2023', 'First light'],
  ['Jul. 2024', 'Reference Imaging Survey commences'],
  ['Aug. 2024', 'RTCSpy takes over nightly operation'],
  ['Dec. 2024', 'Array grows to 16 units; automated ToO response'],
  ['Apr. 2025', 'Intensive Monitoring Survey commences'],
  ['Late 2025', '15 additional medium-band filters installed'],
  ['Jan. 2026', 'Py7DT becomes the sole operational pipeline'],
  ['2026', 'Wide-area Time-domain Survey to commence'],
  ['End 2027', 'Full RIS cycle anticipated'],
];

const num = (value: number, digits = 0) =>
  value.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

const day = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const minute = (iso: string) =>
  new Date(iso).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  }) + ' UTC';

const Index = () => {
  const { data, live, generatedAt } = useLoaderData<typeof loader>();
  const { ris, ims, too, totals, nightly, telescopes } = data;

  // The portal reports IMS as cycles per tile; the survey's own progress is
  // that count against the five-year plan, so it is derived rather than read.
  const imsCycles = Object.values(ims.cycles_per_tile);
  const imsMedian = [...imsCycles].sort((a, b) => a - b)[Math.floor(imsCycles.length / 2)];

  const progressFor = (code: string) => {
    if (code === 'RIS') {
      return {
        percent: ris.coverage_pct,
        label: `${num(ris.tiles_observed)} of ${num(ris.tiles_defined)} tiles observed`,
      };
    }
    if (code === 'IMS') {
      // Five years of nightly visits, allowing for the field's annual window.
      const planned = 5 * 250;
      return {
        percent: Math.min(100, Math.round((imsMedian / planned) * 100)),
        label: `${ims.min_cycles_per_tile}–${ims.max_cycles_per_tile} cycles across ${ims.n_tiles} tiles`,
      };
    }
    return { percent: 0, label: 'Field selection under consideration' };
  };

  return (
    <PageLayout menu="manu7ds">
      <PageHero
        eyebrow="Survey"
        title="Status"
        lede="Where the three tiers stand tonight. Every figure on this page is read from the 7DT GW Portal, the database that records what the array actually observed."
        image="/img/hero/status.jpg"
        meta={[
          { value: String(ris.coverage_pct), unit: '%', label: 'RIS complete' },
          { value: num(imsMedian), label: 'IMS cycles', note: 'median tile' },
          {
            value: (totals.science_frames / 1e6).toFixed(2),
            unit: 'M',
            label: 'Science frames',
          },
          {
            value: String(telescopes.total),
            label: 'Telescopes',
            note: `${telescopes.online} online`,
            live: true,
          },
        ]}
      />

      <div className={`notice${live ? '' : ' notice--warn'}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v6M12 16h.01" strokeLinecap="round" />
        </svg>
        <span role="status">
          {live ? (
            <>
              Live from the 7DT GW Portal, generated {minute(generatedAt)}. Last observing night{' '}
              {day(nightly.last_night)}.
            </>
          ) : (
            <>
              The portal could not be reached, so these figures are the last copy the site holds,
              generated {minute(generatedAt)}. They may be out of date.
            </>
          )}
        </span>
      </div>

      <Section eyebrow="Operations" title="Nightly operation">
        <p className="prose">
          Across {num(nightly.n_nights)} observing nights since {day(nightly.first_night)}, the array
          has recorded {num(totals.science_frames)} science frames over {num(totals.exposure_hours)}{' '}
          hours of open shutter. A typical night covers {nightly.tiles_per_night.median} tiles in{' '}
          {num(nightly.exposures_per_night.median)} exposures and writes{' '}
          {num(nightly.raw_gb_per_night.median)} GB of raw data, calibration frames included.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <StatGrid
            items={[
              { value: num(nightly.tiles_per_night.median), label: 'Tiles per night', note: 'median' },
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
          Medians rather than means: a handful of target-of-opportunity nights run to{' '}
          {num(nightly.exposures_per_night.max)} exposures and would otherwise dominate the figure.
        </p>
      </Section>

      <Section eyebrow="Progress" title="Tier by tier" alt>
        <div className="stack-lg">
          {surveys.tiers.map((tier) => {
            const progress = progressFor(tier.code);
            return (
              <div className="panel" key={tier.code}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span className="tier-card__code">{tier.code}</span>
                    <h3 style={{ margin: 0, fontSize: '1.125rem' }}>{tier.name}</h3>
                  </div>
                  <span className={`pill pill--${tier.status}`}>{tier.statusLabel}</span>
                </div>

                <div
                  className="meter"
                  role="img"
                  aria-label={`${tier.code} progress: ${progress.percent} percent`}
                >
                  <span
                    className="meter__fill meter__fill--spectrum"
                    style={{ width: `${progress.percent}%` }}
                  />
                </div>
                <p className="note" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                  {progress.label} · started {tier.started} · {tier.depthNote.toLowerCase()}
                </p>
              </div>
            );
          })}
        </div>
        <p className="footnote" style={{ marginTop: '1.25rem' }}>
          RIS coverage counts the original grid, T00000–T25471. Including the northern extension,{' '}
          {num(ris.tiles_observed_extended)} of {num(ris.tiles_extended)} tiles have been observed.
          The IMS bar is the median tile against a nominal five years of observable nights.
        </p>
        <div className="btn-row" style={{ marginTop: '1.5rem' }}>
          <Link className="btn btn--primary" to="/data/coverage">Sky coverage map</Link>
          <Link className="btn btn--secondary" to="/survey/design">Survey design</Link>
        </div>
      </Section>

      <Section eyebrow="Monitoring" title="Intensive Monitoring Survey field">
        <p className="prose">
          The seven IMS tiles at the south ecliptic pole are observed on every available night.
          Cycle counts differ between them because the field sets at different times across the
          season and because weather does not fall evenly.
        </p>
        <div className="table-wrap" style={{ marginTop: '1.5rem', maxWidth: '480px' }}>
          <table className="spec-table">
            <caption>Observing cycles per IMS tile</caption>
            <tbody>
              {Object.entries(ims.cycles_per_tile).map(([tile, cycles]) => (
                <tr key={tile}>
                  <th scope="row" style={{ fontFamily: 'var(--font-mono)' }}>{tile}</th>
                  <td>{num(cycles as number)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="Response" title="Target of opportunity" alt>
        <p className="prose">
          {num(too.followup_events)} follow-up campaigns have been carried out since automated
          target-of-opportunity response entered service, {num(too.gw_campaigns)} of them on
          gravitational-wave events.
        </p>
        <div className="chip-row" style={{ marginTop: '1.25rem' }}>
          {too.gw_event_ids.map((id: string) => (
            <span className="chip chip--static" key={id}>{id}</span>
          ))}
        </div>
        <p className="footnote" style={{ marginTop: '1rem' }}>
          LVK superevent identifiers, as issued in the public alert stream. Target-level details are
          not published here.
        </p>
      </Section>

      <Section eyebrow="Timeline" title="Milestones">
        <ul className="feature-list">
          {MILESTONES.map((milestone) => (
            <li key={milestone[0] + milestone[1]}>
              <span className="feature-list__key">{milestone[0]}</span>
              <div>
                <p className="feature-list__body" style={{ margin: 0, color: 'var(--slate-700)' }}>
                  {milestone[1]}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="note" style={{ marginTop: '1.5rem' }}>
          Milestone dates are project record; the figures above are live. See <a href="/news">News</a>{' '}
          for what changed and when.
        </p>
      </Section>
    </PageLayout>
  );
};

export default Index;
