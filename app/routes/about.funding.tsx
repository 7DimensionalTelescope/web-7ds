import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import {
  fundingGWText,
  fundingNRFText,
  fundingKASIText,
  fundingKreonetText,
} from './content/text';

export const meta: MetaFunction = () => [
  { title: 'Funding · 7-Dimensional Telescope' },
  {
    name: 'description',
    content: 'Grants and institutions supporting the 7-Dimensional Telescope and Sky Survey.',
  },
];

/* Grant numbers were deliberately taken off this page. If they are ever put
   back, keep project-level awards separate from individual investigator awards
   — conflating the two misrepresents colleagues' funding. */

const Index = () => {
  return (
    <PageLayout menu="manuAbout">
      <PageHero
        eyebrow="About"
        title="Funding sources"
        lede="7DT exists because of sustained public investment in gravitational-wave astronomy and in the research network that carries its data across the Pacific each night."
        image="/img/hero/about.jpg"
      />

      <Section eyebrow="Host center" title="Center for the Gravitational-wave Universe">
        <div className="split split--wide-text">
          <p className="prose">{fundingGWText}</p>
          <figure className="figure">
            <img
              src="/img/institutes/gwuniv.png"
              alt="Center for the Gravitational-wave Universe"
              style={{ padding: '2rem', background: '#fff' }}
              loading="lazy"
            />
          </figure>
        </div>
      </Section>

      <Section eyebrow="Agencies" title="Project support" alt>
        <div className="split split--wide-text">
          <div>
            <p className="prose">{fundingNRFText}</p>
            <p className="prose">{fundingKASIText}</p>
          </div>
          <figure className="figure">
            <img
              src="/img/institutes/nrf.jpg"
              alt="National Research Foundation of Korea"
              style={{ padding: '2rem', background: '#fff' }}
              loading="lazy"
            />
          </figure>
        </div>
      </Section>

      <Section eyebrow="Infrastructure" title="KREONET / KISTI">
        <p className="prose">{fundingKreonetText}</p>
      </Section>

    </PageLayout>
  );
};

export default Index;
