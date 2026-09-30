import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import { Md } from '../components/md';
import { metaOf } from '../lib/page';
import links from '../content/data/links.json';
import page from '../content/pages/links.json';

export const meta: MetaFunction = () => metaOf(page);

const Index = () => {
  const { hero } = page;
  return (
    <PageLayout menu="manuLinks">
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} image={hero.image} />

      {links.groups.map((group, index) => (
        <Section key={group.title} eyebrow={String(index + 1).padStart(2, '0')} title={group.title} alt={index % 2 === 1}>
          <ul className="feature-list">
            {group.items.map((item) => (
              <li key={item.name}>
                <span className="feature-list__key">↗</span>
                <div>
                  <h3 className="feature-list__title">
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {item.name}
                    </a>
                  </h3>
                  <p className="feature-list__body">
                    <Md>{item.note}</Md>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </PageLayout>
  );
};

export default Index;
