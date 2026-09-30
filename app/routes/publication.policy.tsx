import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import { Md } from '../components/md';
import { metaOf } from '../lib/page';
import page from '../content/pages/publication/policy.json';

export const meta: MetaFunction = () => metaOf(page);

const Index = () => {
  const { hero, status } = page;
  return (
    <PageLayout menu="manuPaper">
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} image={hero.image} />

      <Section eyebrow={status.eyebrow} title={status.title}>
        <p className="prose">
          <Md>{status.body}</Md>
        </p>

        <div className="panel" style={{ marginTop: '2rem', maxWidth: '68ch' }}>
          <div className="panel__title">{status.meantime.title}</div>
          <ul className="prose" style={{ paddingLeft: '1.25rem', margin: 0 }}>
            {status.meantime.items.map((item) => (
              <li key={item}>
                <Md>{item}</Md>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
