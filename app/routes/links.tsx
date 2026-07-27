import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import links from './content/links.json';

export const meta: MetaFunction = () => [
  { title: 'Links · 7-Dimensional Telescope' },
  { name: 'description', content: 'Partner surveys, facilities, vendors and institutions related to 7DT.' },
];

const Index = () => {
  return (
    <PageLayout menu="manuLinks">
      <PageHero
        eyebrow="Resources"
        title="Links"
        lede="The surveys, facilities, networks and suppliers that 7DT depends on or works alongside."
        image="/img/hero/links.jpg"
      />

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
                  <p className="feature-list__body">{item.note}</p>
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
