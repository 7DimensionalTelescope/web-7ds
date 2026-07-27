import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, NextLinks } from '../components/site';
import { surveyOverviewText } from './content/text';
import surveys from './content/surveys.json';

export const meta: MetaFunction = () => [
  { title: '7-Dimensional Sky Survey · 7DT' },
  {
    name: 'description',
    content:
      'The 7-Dimensional Sky Survey: a three-tier programme covering the southern sky in medium bands, from a single-visit reference map to nightly deep monitoring.',
  },
];

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
        lede="Wide-area, high-cadence and deep, on one tile grid and one instrument. 7DS trades area against depth across three tiers that share a single observational infrastructure."
        image="/img/hero/survey.jpg"
        meta={[
          { value: '23,000', unit: 'deg²', label: 'RIS footprint' },
          { value: '10–14', unit: 'd', label: 'WTS cadence' },
          { value: '1', unit: 'd', label: 'IMS cadence' },
          { value: '23.6', unit: 'mag', label: 'Deepest tier' },
        ]}
      />

      <Section eyebrow="Overview" title="Three tiers, one grid">
        <p className="prose">{surveyOverviewText}</p>

        <div className="table-wrap" style={{ marginTop: '2rem' }}>
          <table className="tier-table">
            <caption>Summary of the three components of 7DS — status June 2026</caption>
            <thead>
              <tr>
                <th scope="col">Property</th>
                {surveys.tiers.map((tier) => (
                  <th scope="col" key={tier.code}>
                    {tier.code}
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
          Depths are 5σ point-source limits in the m600 band. The RIS figure is a single-visit
          depth (3 × 100 s); the WTS and IMS figures are expected values from cumulative data
          after five years of operation.
        </p>
      </Section>

      <Section eyebrow="Tiers" title="What each survey is for" alt>
        <div className="stack-lg">
          {surveys.tiers.map((tier) => (
            <div className="panel" key={tier.code}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'baseline',
                  gap: '0.75rem',
                  marginBottom: '0.75rem',
                }}
              >
                <span className="tier-card__code">{tier.code}</span>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{tier.name}</h3>
                <span className={`pill pill--${tier.status}`}>{tier.statusLabel}</span>
              </div>
              <p className="prose" style={{ fontSize: '1rem' }}>
                {tier.summary}
              </p>
              <p className="note" style={{ marginBottom: 0 }}>
                {tier.depthRange}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Continue" title="Explore the survey">
        <NextLinks
          links={[
            { label: 'Survey design', href: '/survey/design' },
            { label: 'Current status', href: '/survey/status' },
            { label: 'Observing modes', href: '/telescope/mode' },
            { label: 'Science programme', href: '/science/overview' },
          ]}
        />
      </Section>
    </PageLayout>
  );
};

export default Index;
