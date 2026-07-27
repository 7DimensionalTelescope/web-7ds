import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import { publicationPolicyText } from './content/text';

export const meta: MetaFunction = () => [
  { title: 'Publication policy · 7-Dimensional Telescope' },
  { name: 'description', content: 'Authorship, data rights and acknowledgement for work using 7DT data.' },
];

const Index = () => {
  return (
    <PageLayout menu="manuPaper">
      <PageHero
        eyebrow="Publications"
        title="Publication policy"
        lede="How authorship, data rights and acknowledgement are handled for work based on 7DT observations."
        image="/img/hero/policy.jpg"
      />

      <Section eyebrow="Status" title="In preparation">
        <p className="prose">{publicationPolicyText}</p>

        <div className="panel" style={{ marginTop: '2rem', maxWidth: '68ch' }}>
          <div className="panel__title">In the meantime</div>
          <ul className="prose" style={{ paddingLeft: '1.25rem', margin: 0 }}>
            <li>
              Contact the principal investigator at{' '}
              <a href="mailto:mim@astro.snu.ac.kr">mim@astro.snu.ac.kr</a> before submitting.
            </li>
            <li>
              Acknowledge the Center for the Gravitational-wave Universe at Seoul National
              University and the NRF grants listed on the{' '}
              <a href="/about/funding">funding</a> page.
            </li>
            <li>
              Cite the instrument and pipeline papers listed under{' '}
              <a href="/publication/list">publications</a>.
            </li>
          </ul>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
