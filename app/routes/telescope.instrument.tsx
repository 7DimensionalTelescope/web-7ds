import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, SimpleTable, ContentFigure } from '../components/site';
import { Md } from '../components/md';
import { metaOf } from '../lib/page';
import shared from '../content/shared.json';
import page from '../content/pages/telescope/instrument.json';

export const meta: MetaFunction = () => metaOf(page);

type Part = { eyebrow: string; title: string; body: string; table: { caption: string; rows: string[][] } };

const Index = () => {
  const { hero, optics, mount, camera, filters, onSky } = page;
  const parts: [Part, boolean][] = [
    [optics, false],
    [mount, true],
    [camera, false],
  ];
  return (
    <PageLayout menu="manu7dt" rail>
      <PageHero
        eyebrow={hero.eyebrow}
        title={<Md>{hero.title}</Md>}
        lede={hero.lede}
        image={hero.image}
      />

      {parts.map(([part, alt]) => (
        <Section key={part.eyebrow} eyebrow={part.eyebrow} title={part.title} alt={alt}>
          <div className="split split--wide-text">
            <p className="prose">
              <Md>{part.body}</Md>
            </p>
            <SimpleTable caption={part.table.caption} rows={part.table.rows} />
          </div>
        </Section>
      ))}

      <Section eyebrow={filters.eyebrow} title={filters.title} alt>
        <div className="split split--wide-text">
          <div>
            <p className="prose">
              <Md>{shared.filterSet.body}</Md>
            </p>
            <p className="prose">
              <Md>{shared.filterSet.caveat}</Md>
            </p>
          </div>
          <SimpleTable caption={filters.table.caption} rows={filters.table.rows} />
        </div>

        <p className="note" style={{ marginTop: '1.5rem' }}>
          <Md>{filters.note}</Md>
        </p>
      </Section>

      <Section eyebrow={onSky.eyebrow} title={onSky.title}>
        <div className="split">
          {onSky.figures.map((fig) => (
            <ContentFigure key={fig.src} fig={fig} />
          ))}
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
