import React from 'react';
import { PageLayout, PageHero, Section, StatGrid, LiveBadge } from './site';
import { Md, SmartLink } from './md';
import { fill } from '../lib/page';
import shared from '../content/shared.json';

/* ---------------------------------------------------------------------------
   One page per survey — RIS, WTS, IMS.

   The three pages answer the same four questions in the same order (strategy,
   map, coverage, status), so they are one component rather than three copies.
   What differs is only whether a survey has data yet: WTS has not started,
   so it renders the strategy and says plainly that the rest is not applicable
   instead of showing zeros.

   The words come from content/pages/survey/<code>.yaml, with its live
   placeholders already filled by the route; the headings the three share come
   from content/shared.yaml.
--------------------------------------------------------------------------- */

type Stat = { value: string; unit?: string; label: string; note?: string; live?: boolean };

/** What a survey's content file holds, as far as this component reads it. */
export type SurveyContent = {
  hero: { code: string; name: string; lede: string; image: string; meta: Stat[] };
  /** Design parameters specific to this component. */
  parameters: string[][];
  map?: { title?: string; note: string };
  coverage?: Stat[];
  progress?: { label: string; note?: string };
};

/** The survey's entry in surveys.yaml: why it exists, and what it gives up. */
type Tier = { goal: string; rationale: string; tradeoff: string };

export type SurveyPageProps = {
  content: SurveyContent;
  tier: Tier;
  live: boolean;
  generatedAt?: string;
  /** The figure itself — an all-sky map, a field map, whatever fits. */
  mapNode?: React.ReactNode;
  /** Percent complete for the progress bar, where the survey has a measure of it. */
  percent?: number;
  children?: React.ReactNode;
};

const T = shared.surveyPage;

export default function SurveyPage({
  content,
  tier,
  live,
  generatedAt,
  mapNode,
  percent,
  children,
}: SurveyPageProps) {
  const { hero, parameters, map, coverage, progress } = content;
  const code = hero.code;

  return (
    <PageLayout menu="manu7ds">
      <PageHero
        eyebrow={fill(T.eyebrow, { code })}
        title={hero.name}
        lede={hero.lede}
        image={hero.image}
        meta={hero.meta}
      />

      <Section eyebrow={T.strategy.eyebrow} title={T.strategy.title}>
        <div className="split split--wide-text">
          <div>
            <p className="rationale__goal">
              <Md>{tier.goal}</Md>
            </p>
            <p className="prose">
              <Md>{tier.rationale}</Md>
            </p>
          </div>
          <div>
            <div className="panel">
              <div className="panel__title">{T.strategy.trade}</div>
              <p className="feature-list__body" style={{ margin: 0 }}>
                <Md>{tier.tradeoff}</Md>
              </p>
            </div>
            <div className="table-wrap" style={{ marginTop: '1.25rem' }}>
              <table className="spec-table">
                <caption>{T.strategy.parameters}</caption>
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

      {map && mapNode && (
        <Section eyebrow={T.map.eyebrow} title={map.title ?? T.map.title} alt wide>
          <div style={{ marginBottom: '1.25rem' }}>
            <LiveBadge live={live} updated={generatedAt} interval={T.map.updated} />
          </div>
          {mapNode}
          <p className="footnote" style={{ marginTop: '1rem' }}>
            <Md>{map.note}</Md> <Md>{T.map.footnote}</Md>
          </p>
        </Section>
      )}

      {coverage && (
        <Section eyebrow={T.coverage.eyebrow} title={T.coverage.title}>
          <div style={{ marginBottom: '1.5rem' }}>
            <LiveBadge live={live} updated={generatedAt} interval={T.coverage.updated} />
          </div>
          <StatGrid items={coverage} />

          {progress && percent !== undefined && (
            <div className="panel" style={{ marginTop: '2rem' }}>
              <div className="panel__title">{T.coverage.status}</div>
              <div className="meter" role="img" aria-label={fill(T.coverage.meter, { code, percent })}>
                <span className="meter__fill meter__fill--spectrum" style={{ width: `${percent}%` }} />
              </div>
              <p className="note" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                <Md>{progress.label}</Md>
              </p>
              {progress.note && (
                <p className="footnote" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                  <Md>{progress.note}</Md>
                </p>
              )}
            </div>
          )}
        </Section>
      )}

      {children}

      <Section eyebrow={T.related.eyebrow} title={T.related.title} alt>
        <div className="chip-row">
          {T.related.links.map((link) => (
            <SmartLink className="chip" href={link.href} key={link.href}>
              {link.label}
            </SmartLink>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
