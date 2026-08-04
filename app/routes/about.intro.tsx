import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { PageLayout, PageHero, Section, NextLinks } from '../components/site';
import {
  surveyIntroText,
  aboutText3,
  aboutMotivationText,
  aboutMotivationText2,
  aboutApproachText,
  aboutApproachText2,
} from './content/text';
import surveys from './content/surveys.json';

export const meta: MetaFunction = () => [
  { title: 'What is 7DS · 7-Dimensional Telescope' },
  {
    name: 'description',
    content:
      'The 7-Dimensional Sky Survey: what it measures, why it is built as a medium-band survey, and how it has developed since first light in October 2023.',
  },
];

/* Dates are those reported in the project papers and in the site news record;
   every entry should be traceable to one of them. */
const MILESTONES = [
  {
    when: '2019–2020',
    what: 'Before 7DT',
    body:
      'GECKO, the Gravitational-wave Electromagnetic Counterpart Korean Observatory, follows up gravitational-wave alerts during the O3 run using existing Korean-accessible telescopes. Its campaign on GW190425 covers 621 candidate host galaxies inside a 7,460 deg² localization and finds no counterpart — the direct argument for a purpose-built facility.',
  },
  {
    when: 'Oct 2023',
    what: 'First light',
    body:
      'The first units observe from El Sauce Observatory in the Río Hurtado Valley, Chile. Commissioning begins with twelve of the twenty planned telescopes on sky.',
  },
  {
    when: 'Feb 2024',
    what: 'First images released',
    body:
      'The Center for the Gravitational-wave Universe publishes the first public set of 7DT images.',
  },
  {
    when: 'Jul 2024',
    what: 'Reference Imaging Survey begins',
    body:
      'Routine survey operation starts on the wide-area component, covering roughly 23,000 deg² south of Dec +20° with a single visit per tile.',
  },
  {
    when: 'Aug 2024',
    what: 'Robotic operation',
    body:
      'RTCSpy takes over nightly operation. From this point the array plans, observes and hands off the night without an operator at the controls.',
  },
  {
    when: 'Dec 2024',
    what: 'Sixteen units, automated response',
    body:
      'Four more DeltaRho 500 units enter routine operation, and automated target-of-opportunity ingestion goes live: the scheduler can interrupt the night and begin a follow-up exposure in under a minute.',
  },
  {
    when: 'Apr 2025',
    what: 'Intensive Monitoring Survey begins',
    body:
      'Seven tiles at the south ecliptic pole, chosen to overlap the SPHEREx Deep Field South, are observed every available night.',
  },
  {
    when: 'Late 2025',
    what: 'Thirty-five medium bands',
    body:
      'Fifteen further medium-band filters are installed, extending coverage to 375–875 nm and advancing toward the designed complement of forty.',
  },
  {
    when: 'Jun 2026',
    what: 'Commissioning closes',
    body:
      'Final commissioning is completed. The facility is reported as an operating observatory, with two of the three survey components under way.',
  },
  {
    when: 'Ahead',
    what: 'Completing the survey',
    body:
      'The Wide-area Time-domain Survey commences in 2026. Four remaining units and five remaining filters complete the design, and the first full cycle of the Reference Imaging Survey is anticipated by the end of 2027.',
  },
];

const Index = () => {
  return (
    <PageLayout menu="manuAbout">
      <PageHero
        eyebrow="About"
        title={
          <>
            What is <em>7DS</em>?
          </>
        }
        lede="A medium-band survey of the southern sky that measures a low-resolution spectrum for every source it observes, and repeats the measurement over time."
        image="/img/hero/about.jpg"
        meta={[
          { value: '23,000', unit: 'deg²', label: 'Survey area' },
          { value: '40', label: 'Medium bands', note: '35 installed' },
          { value: '30–70', label: 'Spectral resolution R' },
          { value: '2023', label: 'First light' },
        ]}
      />

      <Section id="motivation" eyebrow="Motivation" title="Why a medium-band survey">
        <div className="split split--wide-text">
          <div>
            <p className="prose">{aboutMotivationText}</p>
            <p className="prose">{aboutMotivationText2}</p>
          </div>
          <figure className="figure">
            <img
              src="/img/overview.png"
              alt="Sky areas compared: a gravitational-wave localization region set against the fields of view of 7DT and other survey telescopes"
              loading="lazy"
            />
            <figcaption>
              <b>Scale of the problem</b> A gravitational-wave localization region set against the
              field of view of 7DT and of other survey telescopes.
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section eyebrow="The name" title="Seven dimensions" alt>
        <div className="split split--wide-text">
          <p className="prose">{aboutText3}</p>
          <ul className="feature-list" style={{ margin: 0 }}>
            {surveys.dimensions.map((dim) => (
              <li key={dim.n} style={{ padding: '0.6rem 0' }}>
                <span className="feature-list__key">{dim.n}</span>
                <div>
                  <h3 className="feature-list__title" style={{ margin: 0, fontSize: '1rem' }}>
                    {dim.label}
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section eyebrow="Approach" title="Spectral mapping and the time domain">
        <div className="split split--wide-text">
          <div>
            <p className="prose">{surveyIntroText}</p>
            <p className="prose">{aboutApproachText}</p>
            <p className="prose">{aboutApproachText2}</p>
          </div>
          <div className="panel">
            <div className="panel__title">Where the detail is</div>
            <ul className="feature-list" style={{ borderTop: 0, margin: 0 }}>
              <li style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
                <div>
                  <p className="feature-list__body" style={{ margin: 0 }}>
                    How the three survey components divide area, cadence and depth —{' '}
                    <Link to="/survey/overview">survey design</Link>.
                  </p>
                </div>
              </li>
              <li style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
                <div>
                  <p className="feature-list__body" style={{ margin: 0 }}>
                    What the array is and why it is built as an array —{' '}
                    <Link to="/telescope/overview">the telescope</Link>.
                  </p>
                </div>
              </li>
              <li style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
                <div>
                  <p className="feature-list__body" style={{ margin: 0 }}>
                    What the measurement is used for —{' '}
                    <Link to="/science/overview">science</Link>.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* History last: it is a record rather than an explanation, and a reader
          arriving at this page wants the second before the first. */}
      <Section id="history" eyebrow="History" title="From first light to survey operation" alt>
        <ol className="timeline">
          {MILESTONES.map((item) => (
            <li key={item.when}>
              <span className="timeline__when">{item.when}</span>
              <div className="timeline__body">
                <h3>{item.what}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div style={{ marginTop: '2.5rem' }}>
          <NextLinks
            title="Continue"
            links={[
              { label: 'Current survey status', href: '/survey/status' },
              { label: 'Team', href: '/about/team' },
              { label: 'Funding', href: '/about/funding' },
              { label: 'For users', href: '/users/status' },
            ]}
          />
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
