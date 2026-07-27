import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import { surveyDesignText, surveyDesignText2, modeText } from './content/text';
import surveys from './content/surveys.json';

export const meta: MetaFunction = () => [
  { title: 'Survey design · 7-Dimensional Telescope' },
  {
    name: 'description',
    content:
      'Tiling, exposure strategy and observing modes of the 7-Dimensional Sky Survey.',
  },
];

const TILING = [
  ['Tile centres', 'HEALPix pixelization of the celestial sphere'],
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
        lede="One tile grid underlies everything the array does — survey tiers, target-of-opportunity pointings and difference imaging alike."
        image="/img/hero/survey.jpg"
      />

      <Section eyebrow="Tiling" title="A single grid for the whole programme">
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

      <Section eyebrow="Observing modes" title="Four ways to spend a night" alt>
        <p className="prose">{modeText}</p>
        <div className="grid grid-cols-2" style={{ marginTop: '2rem' }}>
          {surveys.modes.map((mode) => (
            <div className="panel" key={mode.name}>
              <div className="panel__title">{mode.tagline}</div>
              <h3 style={{ fontSize: '1.125rem' }}>{mode.name}</h3>
              <p className="feature-list__body" style={{ margin: 0 }}>
                {mode.body}
              </p>
            </div>
          ))}
        </div>
        <figure className="figure" style={{ marginTop: '2rem', maxWidth: '760px' }}>
          <img src="/img/overview.png" alt="Schematic of the 7DT observing modes" loading="lazy" />
          <figcaption>
            <b>Modes</b> Filter assignment across the array determines whether a night favours
            spectral resolution, depth, colour or sky coverage.
          </figcaption>
        </figure>
      </Section>

      <Section eyebrow="Tiers" title="Cadence and depth by tier">
        <div className="grid grid-cols-3">
          {surveys.tiers.map((tier) => (
            <div className="tier-card" key={tier.code}>
              <span className="tier-card__code">{tier.code}</span>
              <h3 className="tier-card__name">{tier.name}</h3>
              <dl>
                <div>
                  <dt>Area</dt>
                  <dd>{tier.area}</dd>
                </div>
                <div>
                  <dt>Cadence</dt>
                  <dd>{tier.cadence}</dd>
                </div>
                <div>
                  <dt>Depth</dt>
                  <dd>{tier.depth}</dd>
                </div>
                <div>
                  <dt>Started</dt>
                  <dd>{tier.started}</dd>
                </div>
              </dl>
              <p className="tier-card__note">{tier.depthNote}</p>
            </div>
          ))}
        </div>
        <div className="btn-row" style={{ marginTop: '2rem' }}>
          <a className="btn btn--primary" href="/survey/status">
            Current status
          </a>
          <a className="btn btn--secondary" href="/survey/overview">
            Survey overview
          </a>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
