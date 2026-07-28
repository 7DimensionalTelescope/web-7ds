import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, NextLinks } from '../components/site';
import {
  overviewText,
  aboutText2,
  aboutText3,
  aboutMotivationText,
  aboutMotivationText2,
  aboutApproachText,
  aboutOriginText,
} from './content/text';
import surveys from './content/surveys.json';

export const meta: MetaFunction = () => [
  { title: 'What is 7DS · 7-Dimensional Telescope' },
  {
    name: 'description',
    content:
      'Why the 7-Dimensional Telescope was built, who built it, and how the array and the 7-Dimensional Sky Survey have developed since first light in October 2023.',
  },
];

/* Dates are those reported in the project papers and in the site news record;
   every entry should be traceable to one of them. */
const MILESTONES = [
  {
    when: '2019–2020',
    what: 'Before 7DT',
    body:
      'GECKO, the Gravitational-wave Electromagnetic Counterpart Korean Observatory, follows up gravitational-wave alerts during the O3 run with existing telescopes. Its campaign on GW190425 covers 621 candidate host galaxies inside a 7,460 deg² localization and finds no kilonova.',
  },
  {
    when: 'Oct 2023',
    what: 'First light',
    body:
      'The first units see the sky at El Sauce Observatory in the Río Hurtado Valley, Chile. Commissioning begins with twelve of the twenty planned telescopes on sky.',
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
      'Routine survey operation starts on the wide-area tier of 7DS, covering roughly 23,000 deg² south of Dec +20° with a single visit per tile.',
  },
  {
    when: 'Aug 2024',
    what: 'The array runs itself',
    body:
      'RTCSpy takes over nightly operation. Since then the array has acquired some 1.75 million images under fully unattended operation.',
  },
  {
    when: 'Dec 2024',
    what: 'Sixteen units, automated response',
    body:
      'Four more DeltaRho 500 units enter routine operation, and automated target-of-opportunity ingestion goes live — the scheduler can now interrupt the night and begin a follow-up exposure in under a minute.',
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
    what: 'A working observatory',
    body:
      'Final commissioning closes. The facility is reported as an operating observatory rather than a project under commissioning, with two of the three 7DS tiers under way.',
  },
  {
    when: 'Ahead',
    what: 'Completing the array',
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
        lede="A multi-telescope array built to find the optical counterparts of gravitational-wave events — and, in the process, to map the southern sky in forty colors."
        image="/img/hero/about.jpg"
        meta={[
          { value: '20', label: 'Telescopes', note: '16 online', live: true },
          { value: '40', label: 'Medium bands', note: '35 installed' },
          { value: '2023', label: 'First light' },
          { value: 'Chile', label: 'El Sauce Obs.' },
        ]}
      />

      <Section id="motivation" eyebrow="Motivation" title="One counterpart in nine years">
        <div className="split split--wide-text">
          <div>
            <p className="prose">{aboutMotivationText}</p>
            <p className="prose">{aboutMotivationText2}</p>
          </div>
          <figure className="figure">
            <img
              src="/img/overview.png"
              alt="Sky areas compared: a GW170817-sized localization region set against the fields of view of 7DT, ZTF, SkyMapper and LSST"
              loading="lazy"
            />
            <figcaption>
              <b>The problem, to scale</b> A gravitational-wave localization set against the
              field of view of 7DT and of other survey telescopes.
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section eyebrow="Approach" title="Twenty small telescopes instead of one large one" alt>
        <div className="split split--wide-text">
          <div>
            <p className="prose">{aboutApproachText}</p>
            <p className="prose">{overviewText}</p>
          </div>
          <figure className="figure">
            <img
              src="/img/images/Figure1_7DT.jpeg"
              alt="The 7-Dimensional Telescope array at El Sauce Observatory"
              loading="lazy"
            />
            <figcaption>
              <b>The array</b> DeltaRho 500 units installed at El Sauce Observatory, Río
              Hurtado Valley, Chile.
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section id="origins" eyebrow="Origins" title="Where the project came from">
        <div className="split split--wide-text">
          <div>
            <p className="prose">{aboutOriginText}</p>
            <p className="prose">{aboutText2}</p>
          </div>
          <figure className="figure">
            <img
              src="/img/carousel/c1.jpg"
              alt="Site preparation and pier foundations above the Río Hurtado Valley"
              loading="lazy"
            />
            <figcaption>
              <b>Before the telescopes</b> Pier foundations above the Río Hurtado Valley,
              before the enclosure was erected.
            </figcaption>
          </figure>
        </div>
        <p className="footnote" style={{ marginTop: '1.5rem' }}>
          Funding sources are set out in full on the <a href="/about/funding">funding page</a>.
        </p>
      </Section>

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
      </Section>

      <Section eyebrow="The name" title="Seven dimensions">
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

      <Section eyebrow="Program" title="What the survey delivers" alt>
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
              </dl>
              <span className={`pill pill--${tier.status}`}>{tier.statusLabel}</span>
            </div>
          ))}
        </div>
        <p className="footnote" style={{ marginTop: '1rem' }}>{surveys.depthFootnote}</p>

        <div style={{ marginTop: '2.5rem' }}>
          <NextLinks
            title="Continue"
            links={[
              { label: 'Meet the team', href: '/about/team' },
              { label: 'Funding sources', href: '/about/funding' },
              { label: 'Survey design', href: '/survey/design' },
              { label: 'The telescope', href: '/telescope/overview' },
            ]}
          />
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
