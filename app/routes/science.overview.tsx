import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, ContentFigure } from '../components/site';
import { Md, Paras } from '../components/md';
import { metaOf } from '../lib/page';
import science from '../content/data/science.json';
import page from '../content/pages/science/overview.json';

export const meta: MetaFunction = () => metaOf(page);

const Index = () => {
  const { hero, spectral, time, reach, program } = page;
  return (
    <PageLayout menu="manuScience" rail>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lede={hero.lede}
        image={hero.image}
        meta={hero.meta}
      />

      <Section eyebrow={spectral.eyebrow} title={spectral.title}>
        <Paras className="prose">{spectral.body}</Paras>
      </Section>

      <Section eyebrow={time.eyebrow} title={time.title} alt>
        <Paras className="prose">{time.body}</Paras>
      </Section>

      <Section eyebrow={reach.eyebrow} title={reach.title}>
        <div className="prose">
          <Paras>{reach.body}</Paras>
        </div>
        <div style={{ marginTop: '2.5rem' }}>
          <ContentFigure fig={reach.figure} />
        </div>
      </Section>

      <Section eyebrow={program.eyebrow} title={program.title} alt>
        <p className="prose">
          <Md>{program.body}</Md>
        </p>
        <div className="grid grid-cols-2" style={{ marginTop: '2rem' }}>
          {science.themes.map((theme) => (
            <Link className="theme-card" to={`/science/${theme.id}`} key={theme.id}>
              <span className="theme-card__index">{theme.n}</span>
              <h3 className="theme-card__title">{theme.title}</h3>
              <p className="theme-card__body">{theme.question ?? theme.summary}</p>
            </Link>
          ))}
        </div>
        <div className="btn-row" style={{ marginTop: '2rem' }}>
          <Link className="btn btn--secondary" to={program.button.href}>
            {program.button.label}
          </Link>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
