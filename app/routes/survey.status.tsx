import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, StatGrid } from '../components/site';
import { surveyStatusText } from './content/text';
import surveys from './content/surveys.json';

export const meta: MetaFunction = () => [
  { title: 'Survey status · 7-Dimensional Telescope' },
  {
    name: 'description',
    content: 'Current progress of the Reference Imaging, Wide-area Time-domain and Intensive Monitoring surveys.',
  },
];

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

const Index = () => {
  return (
    <PageLayout menu="manu7ds">
      <PageHero
        eyebrow="Survey"
        title="Status"
        lede="Where the three tiers stand as of June 2026."
        image="/img/hero/status.jpg"
        meta={[
          { value: '58', unit: '%', label: 'RIS complete' },
          { value: '260', unit: '+', label: 'IMS cycles' },
          { value: '1.75', unit: 'M', label: 'Images acquired' },
          { value: '20', label: 'Telescopes', note: '16 online', live: true },
        ]}
      />

      <Section eyebrow="Operations" title="Nightly operation">
        <p className="prose">{surveyStatusText}</p>
        <div style={{ marginTop: '2rem' }}>
          <StatGrid
            items={[
              { value: '≈ 30', label: 'Tiles per night' },
              { value: '≈ 3,000', label: 'Exposures per night' },
              { value: '≈ 350', unit: 'GB', label: 'Raw data per night' },
              { value: '≈ 100', label: 'ToO follow-ups' },
              { value: '≈ 10', label: 'GW campaigns' },
            ]}
          />
        </div>
      </Section>

      <Section eyebrow="Progress" title="Tier by tier" alt>
        <div className="stack-lg">
          {surveys.tiers.map((tier) => (
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

              <div className="meter" aria-hidden="true">
                <span className="meter__fill meter__fill--spectrum" style={{ width: `${tier.progress}%` }} />
              </div>
              <p className="note" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                {tier.progressLabel} · started {tier.started} · {tier.depthNote.toLowerCase()}
              </p>
            </div>
          ))}
        </div>
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
          Status figures are those reported in the June 2026 7DT status report. See{' '}
          <a href="/news">News</a> for updates as the surveys progress.
        </p>
      </Section>
    </PageLayout>
  );
};

export default Index;
