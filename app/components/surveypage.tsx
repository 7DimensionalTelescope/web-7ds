import React from 'react';
import { Link } from '@remix-run/react';
import { PageLayout, PageHero, Section, StatGrid, LiveBadge } from './site';

/* ---------------------------------------------------------------------------
   One page per survey — RIS, WTS, IMS.

   The three pages answer the same four questions in the same order (strategy,
   map, coverage, status), so they are one component rather than three copies.
   What differs is only whether a survey has data yet: WTS has not started,
   so it renders the strategy and says plainly that the rest is not applicable
   instead of showing zeros.
--------------------------------------------------------------------------- */

type Stat = { value: string; unit?: string; label: string; note?: string; live?: boolean };

export type SurveyPageProps = {
  code: string;
  name: string;
  /** One sentence: what this component is for. */
  lede: string;
  image: string;
  heroMeta: Stat[];
  /** The trade this component makes, and why it is worth making. */
  tradeoff: string;
  goal: string;
  rationale: string;
  /** Design parameters specific to this component. */
  parameters: string[][];
  live: boolean;
  generatedAt?: string;
  map?: {
    /** The figure itself — an all-sky map, a field map, whatever fits. */
    node: React.ReactNode;
    title?: string;
    note: React.ReactNode;
  };
  coverage?: Stat[];
  progress?: { percent: number; label: string; note?: string };
  children?: React.ReactNode;
};

export default function SurveyPage(props: SurveyPageProps) {
  const {
    code,
    name,
    lede,
    image,
    heroMeta,
    tradeoff,
    goal,
    rationale,
    parameters,
    live,
    generatedAt,
    map,
    coverage,
    progress,
    children,
  } = props;

  return (
    <PageLayout menu="manu7ds">
      <PageHero
        eyebrow={`Survey · ${code}`}
        title={name}
        lede={lede}
        image={image}
        meta={heroMeta}
      />

      <Section eyebrow="Strategy" title="What this survey is for">
        <div className="split split--wide-text">
          <div>
            <p className="rationale__goal">{goal}</p>
            <p className="prose">{rationale}</p>
          </div>
          <div>
            <div className="panel">
              <div className="panel__title">Trade</div>
              <p className="feature-list__body" style={{ margin: 0 }}>
                {tradeoff}
              </p>
            </div>
            <div className="table-wrap" style={{ marginTop: '1.25rem' }}>
              <table className="spec-table">
                <caption>Design parameters</caption>
                <tbody>
                  {parameters.map((row) => (
                    <tr key={row[0]}>
                      <th scope="row">{row[0]}</th>
                      <td>{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      {map && (
        <Section eyebrow="Map" title={map.title ?? 'Where it has observed'} alt wide>
          <div style={{ marginBottom: '1.25rem' }}>
            <LiveBadge live={live} updated={generatedAt} interval="daily" />
          </div>
          {map.node}
          <p className="footnote" style={{ marginTop: '1rem' }}>
            {map.note} The whole survey footprint, with per-tile detail under the pointer and a
            search by position, is on the <Link to="/users/access">data access page</Link>.
          </p>
        </Section>
      )}

      {coverage && (
        <Section eyebrow="Coverage" title="What has been observed so far">
          <div style={{ marginBottom: '1.5rem' }}>
            <LiveBadge live={live} updated={generatedAt} interval="every 30 minutes" />
          </div>
          <StatGrid items={coverage} />

          {progress && (
            <div className="panel" style={{ marginTop: '2rem' }}>
              <div className="panel__title">Status</div>
              <div
                className="meter"
                role="img"
                aria-label={`${code} progress: ${progress.percent} percent`}
              >
                <span
                  className="meter__fill meter__fill--spectrum"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
              <p className="note" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                {progress.label}
              </p>
              {progress.note && (
                <p className="footnote" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                  {progress.note}
                </p>
              )}
            </div>
          )}
        </Section>
      )}

      {children}

      <Section eyebrow="Elsewhere" title="Related pages" alt>
        <div className="chip-row">
          <Link className="chip" to="/survey/overview">
            All three surveys
          </Link>
          <Link className="chip" to="/users/access">
            Sky coverage and search
          </Link>
          <Link className="chip" to="/users/status">
            Array operations
          </Link>
          <Link className="chip" to="/users/performance">
            Measured performance
          </Link>
        </div>
      </Section>
    </PageLayout>
  );
}
