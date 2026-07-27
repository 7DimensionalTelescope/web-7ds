import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import { modeText } from './content/text';
import surveys from './content/surveys.json';

export const meta: MetaFunction = () => [
  { title: 'Observing modes · 7-Dimensional Telescope' },
  {
    name: 'description',
    content: 'Spec, Deep, Color and Search — the four observing modes of the 7-Dimensional Telescope.',
  },
];

const Index = () => {
  return (
    <PageLayout menu="manu7dt">
      <PageHero
        eyebrow="Telescope"
        title={
          <>
            <em>Observing</em> modes
          </>
        }
        lede="Diverse strategy, dynamic science. Because every unit carries its own filters, the array can be reconfigured for spectral resolution, depth or coverage without touching the hardware."
        image="/img/hero/telescope.jpg"
      />

      <Section eyebrow="Principle" title="One array, four configurations">
        <p className="prose">{modeText}</p>

        <ul className="feature-list" style={{ marginTop: '2rem' }}>
          {surveys.modes.map((mode, index) => (
            <li key={mode.name}>
              <span className="feature-list__key">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="feature-list__title" style={{ fontSize: '1.125rem' }}>
                  {mode.name}
                  <span
                    style={{
                      marginLeft: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--slate-500)',
                      fontWeight: 400,
                    }}
                  >
                    {mode.tagline}
                  </span>
                </h3>
                <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
                  {mode.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Schematic" title="Filter assignment across the array" alt>
        <figure className="figure" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <img src="/img/overview.png" alt="Schematic of 7DT observing modes and filter assignment" loading="lazy" />
          <figcaption>
            <b>Modes</b> The full spectral range is covered by giving each unit a unique filter
            combination and rotating through it during a target observation.
          </figcaption>
        </figure>
      </Section>

      <Section eyebrow="Response" title="Target of opportunity">
        <p className="prose">
          When a transient alert arrives — a gamma-ray burst, a gravitational-wave candidate — the
          scheduler interrupts the observing plan and repoints. Two response modes are available: a
          regular mode that completes the current exposure block before switching, and a rapid mode
          that interrupts immediately. Once the ToO observation finishes the array returns to the
          queue, resuming the interrupted target if it is still observable. Response time from
          alert ingestion to the start of a follow-up exposure is under one minute.
        </p>
        <div className="btn-row" style={{ marginTop: '1.5rem' }}>
          <a className="btn btn--primary" href="/data/software">
            How ToO data are processed
          </a>
          <a className="btn btn--secondary" href="/survey/design">
            Survey design
          </a>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
