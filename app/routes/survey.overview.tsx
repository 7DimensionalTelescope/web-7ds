import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import { Md, Paras } from '../components/md';
import { metaOf } from '../lib/page';
import surveys from '../content/data/surveys.json';
import page from '../content/pages/survey/overview.json';

export const meta: MetaFunction = () => metaOf(page);

type Tier = (typeof surveys.tiers)[number];
const pageOf = (tier: Tier) => `/survey/${tier.code.toLowerCase()}`;

const Index = () => {
  const { hero, overview, tiling, rationale } = page;
  /* Rows of the comparison table: each names a field of a tier in
     surveys.yaml, and the label the table shows for it. */
  const rows = Object.entries(overview.table.rows) as [keyof Tier, string][];
  return (
    <PageLayout menu="manu7ds">
      <PageHero
        eyebrow={hero.eyebrow}
        title={<Md>{hero.title}</Md>}
        lede={hero.lede}
        image={hero.image}
        meta={hero.meta}
      />

      <Section eyebrow={overview.eyebrow} title={overview.title}>
        <p className="prose">
          <Md>{overview.body}</Md>
        </p>

        <div className="table-wrap" style={{ marginTop: '2rem' }}>
          <table className="tier-table">
            <caption>{overview.table.caption}</caption>
            <thead>
              <tr>
                <th scope="col">{overview.table.corner}</th>
                {surveys.tiers.map((tier) => (
                  <th scope="col" key={tier.code}>
                    <Link to={pageOf(tier)}>{tier.code}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([field, label]) => (
                <tr key={String(field)}>
                  <th scope="row">{label}</th>
                  {surveys.tiers.map((tier) => (
                    <td key={tier.code}>{String(tier[field])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="footnote" style={{ marginTop: '0.75rem' }}>
          <Md>{overview.footnote}</Md>
        </p>
      </Section>

      <Section eyebrow={tiling.eyebrow} title={tiling.title} alt>
        <div className="split split--wide-text">
          <div>
            <Paras className="prose">{tiling.body}</Paras>
          </div>
          <div className="table-wrap">
            <table className="spec-table">
              <caption>{tiling.table.caption}</caption>
              <tbody>
                {tiling.table.rows.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section eyebrow={rationale.eyebrow} title={rationale.title}>
        <p className="prose">
          <Md>{surveys.designNote}</Md>
        </p>

        <div className="grid grid-cols-3" style={{ marginTop: '2rem' }}>
          {surveys.tiers.map((tier) => (
            <Link className="tier-card tier-card--link" key={tier.code} to={pageOf(tier)}>
              <span className="tier-card__code">{tier.code}</span>
              <h3 className="tier-card__name">{tier.name}</h3>
              <p className="rationale__tradeoff" style={{ marginBottom: '0.75rem' }}>
                {tier.tradeoff}
              </p>
              <p className="tier-card__note">{tier.goal}</p>
              <span className={`pill pill--${tier.status}`}>{tier.statusLabel}</span>
            </Link>
          ))}
        </div>

        <p className="note" style={{ marginTop: '1.5rem' }}>
          <Md>{rationale.note}</Md>
        </p>
      </Section>
    </PageLayout>
  );
};

export default Index;
