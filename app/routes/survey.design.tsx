import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import { surveyDesignText, surveyDesignText2 } from './content/text';
import surveys from './content/surveys.json';

export const meta: MetaFunction = () => [
  { title: 'Survey design · 7-Dimensional Telescope' },
  {
    name: 'description',
    content:
      'How the 7-Dimensional Sky Survey is laid out: one tile grid for the whole program, and why it is divided into three tiers.',
  },
];

const TILING = [
  ['Tile centers', 'HEALPix pixelization of the celestial sphere'],
  ['Tile range', 'T00000 – T28519, increasing declination'],
  ['Sky coverage', 'South pole to +30°'],
  ['Overlap near equator', '≈ 5′ in R.A., 4′ in Dec.'],
  ['Standard visit', '3 × 100 s, coadded to 300 s'],
  ['Typical night', '≈ 30 tiles, ≈ 3,000 exposures'],
];

const Index = () => {
  return (
    <PageLayout menu="manu7ds">
      <PageHero
        eyebrow="Survey"
        title="Design"
        lede="One tile grid underlies everything the array does — survey tiers, target-of-opportunity pointings and difference imaging alike — and three tiers divide the available nights between area, cadence and depth."
        image="/img/hero/survey.jpg"
      />

      <Section eyebrow="Tiling" title="A single grid for the whole program">
        <div className="split split--wide-text">
          <div>
            <p className="prose">{surveyDesignText}</p>
            <p className="prose">{surveyDesignText2}</p>
          </div>
          <div>
            <div className="table-wrap">
              <table className="spec-table">
                <caption>Tiling and exposure</caption>
                <tbody>
                  {TILING.map((row) => (
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

      {/* Why the three tiers exist, not what their numbers are — the numbers are
          tabulated on the overview page and tracked on the status page. */}
      <Section eyebrow="Tiers" title="Why three surveys and not one" alt>
        <p className="prose">{surveys.designNote}</p>

        <div className="stack-lg" style={{ marginTop: '2rem' }}>
          {surveys.tiers.map((tier) => (
            <div className="panel" key={tier.code}>
              <div className="rationale__head">
                <span className="tier-card__code">{tier.code}</span>
                <h3>{tier.name}</h3>
                <span className="rationale__tradeoff">{tier.tradeoff}</span>
              </div>
              <p className="rationale__goal">{tier.goal}</p>
              <p className="prose" style={{ fontSize: '1rem', marginBottom: 0 }}>
                {tier.rationale}
              </p>
            </div>
          ))}
        </div>

        <div className="btn-row" style={{ marginTop: '2rem' }}>
          <Link className="btn btn--primary" to="/survey/status">Current status</Link>
          <Link className="btn btn--secondary" to="/survey/overview">Tier parameters</Link>
          <Link className="btn btn--secondary" to="/telescope/mode">Observing modes</Link>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
