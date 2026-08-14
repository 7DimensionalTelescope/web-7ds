import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import { surveyOverviewText, surveyTilingText, surveyTilingText2 } from './content/text';
import surveys from './content/surveys.json';

export const meta: MetaFunction = () => [
  { title: '7-Dimensional Sky Survey · 7DT' },
  {
    name: 'description',
    content:
      'The 7-Dimensional Sky Survey: three surveys covering the southern sky in medium bands, from a single-visit reference map to nightly deep monitoring, on one tiling.',
  },
];

/* Tiling parameters live here and nowhere else on the site. The component
   pages give the parameters specific to each survey and link back. */
const TILING = [
  ['Tile centers', 'HEALPix pixelization of the celestial sphere'],
  ['Tile numbering', 'T00000 – T28519, by increasing declination'],
  ['Sky coverage', 'South celestial pole to Dec +30°'],
  ['Overlap near equator', '≈ 5′ in right ascension, 4′ in declination'],
  ['Standard visit', '3 × 100 s, coadded to 300 s'],
  ['Field of view per tile', '1.34° × 0.90°, 1.25 deg²'],
];

const PAGES: Record<string, string> = {
  RIS: '/survey/ris',
  WTS: '/survey/wts',
  IMS: '/survey/ims',
};

const Index = () => {
  return (
    <PageLayout menu="manu7ds">
      <PageHero
        eyebrow="Survey"
        title={
          <>
            The 7-Dimensional <em>Sky Survey</em>
          </>
        }
        lede="7DS is the science program of 7DT. It comprises three surveys that differ in area, cadence and depth, and that share one tiling of the sky."
        image="/img/hero/survey.jpg"
        meta={[
          { value: '3', label: 'Surveys' },
          { value: '23,000', unit: 'deg²', label: 'Widest survey' },
          { value: '1', unit: 'd', label: 'Fastest cadence' },
          { value: '23.6', unit: 'mag', label: 'Deepest planned' },
        ]}
      />

      <Section eyebrow="Overview" title="Three surveys on one tiling">
        <p className="prose">{surveyOverviewText}</p>

        <div className="table-wrap" style={{ marginTop: '2rem' }}>
          <table className="tier-table">
            <caption>Design parameters of the three surveys</caption>
            <thead>
              <tr>
                <th scope="col">Property</th>
                {surveys.tiers.map((tier) => (
                  <th scope="col" key={tier.code}>
                    <Link to={PAGES[tier.code]}>{tier.code}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Survey area</th>
                {surveys.tiers.map((tier) => (
                  <td key={tier.code}>{tier.area}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Target region</th>
                {surveys.tiers.map((tier) => (
                  <td key={tier.code}>{tier.region}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Cadence</th>
                {surveys.tiers.map((tier) => (
                  <td key={tier.code}>{tier.cadence}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Depth</th>
                {surveys.tiers.map((tier) => (
                  <td key={tier.code}>{tier.depth}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Status</th>
                {surveys.tiers.map((tier) => (
                  <td key={tier.code}>{tier.statusLabel}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="footnote" style={{ marginTop: '0.75rem' }}>
          Depths are 5σ point-source limits in the m600 band. The RIS figure is the depth of one
          visit (3 × 100 s); the WTS and IMS figures are cumulative over the planned five-year
          operation. Measured performance is reported on the{' '}
          <Link to="/users/performance">performance page</Link>, and current progress on each
          survey page.
        </p>
      </Section>

      <Section eyebrow="Tiling" title="One tile pattern for the whole program" alt>
        <div className="split split--wide-text">
          <div>
            <p className="prose">{surveyTilingText}</p>
            <p className="prose">{surveyTilingText2}</p>
          </div>
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
      </Section>

      <Section eyebrow="Rationale" title="Why three surveys and not one">
        <p className="prose">{surveys.designNote}</p>

        <div className="grid grid-cols-3" style={{ marginTop: '2rem' }}>
          {surveys.tiers.map((tier) => (
            <Link className="tier-card tier-card--link" key={tier.code} to={PAGES[tier.code]}>
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
          Each survey page carries its own strategy, sky map, coverage and current status.
        </p>
      </Section>
    </PageLayout>
  );
};

export default Index;
