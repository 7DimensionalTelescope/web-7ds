import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, NextLinks } from '../components/site';
import { overviewText, aboutText2, aboutText3 } from './content/text';
import surveys from './content/surveys.json';

export const meta: MetaFunction = () => [
  { title: 'What is 7DS · 7-Dimensional Telescope' },
  {
    name: 'description',
    content:
      'The 7-Dimensional Telescope and the 7-Dimensional Sky Survey: a twenty-unit medium-band array in Chile and the survey it carries out.',
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
        lede="A multi-telescope array built to find the optical counterparts of gravitational-wave events — and, in the process, to map the southern sky in forty colours."
        image="/img/hero/about.jpg"
        meta={[
          { value: '20', label: 'Telescopes', note: '16 online', live: true },
          { value: '40', label: 'Medium bands', note: '35 installed' },
          { value: '2023', label: 'First light' },
          { value: 'Chile', label: 'El Sauce Obs.' },
        ]}
      />

      <Section eyebrow="Overview" title="Imaging that behaves like spectroscopy">
        <div className="split split--wide-text">
          <div>
            <p className="prose">{overviewText}</p>
            <p className="prose">{aboutText2}</p>
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

      <Section eyebrow="Programme" title="What the survey delivers">
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
