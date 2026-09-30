import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, NextLinks } from '../components/site';
import { Md, Paras } from '../components/md';
import { metaOf } from '../lib/page';
import surveys from '../content/data/surveys.json';
import page from '../content/pages/about/intro.json';

export const meta: MetaFunction = () => metaOf(page);

const Index = () => {
  const { hero, motivation, name, approach, history } = page;
  return (
    <PageLayout menu="manuAbout" rail>
      <PageHero
        eyebrow={hero.eyebrow}
        title={<Md>{hero.title}</Md>}
        lede={hero.lede}
        image={hero.image}
        meta={hero.meta}
      />

      <Section id="motivation" eyebrow={motivation.eyebrow} title={motivation.title}>
        <div className="split split--wide-text">
          <div>
            <Paras className="prose">{motivation.body}</Paras>
          </div>
          <figure className="figure">
            <img src={motivation.figure.src} alt={motivation.figure.alt} loading="lazy" />
            <figcaption>
              <b>{motivation.figure.label}</b> <Md>{motivation.figure.caption}</Md>
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section eyebrow={name.eyebrow} title={name.title} alt>
        <div className="split split--wide-text">
          <p className="prose">
            <Md>{name.body}</Md>
          </p>
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

      <Section eyebrow={approach.eyebrow} title={approach.title}>
        <div className="split split--wide-text">
          <div>
            <Paras className="prose">{approach.body}</Paras>
          </div>
          <div className="panel">
            <div className="panel__title">{approach.detail.title}</div>
            <ul className="feature-list" style={{ borderTop: 0, margin: 0 }}>
              {approach.detail.items.map((item) => (
                <li key={item} style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
                  <div>
                    <p className="feature-list__body" style={{ margin: 0 }}>
                      <Md>{item}</Md>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* History last: it is a record rather than an explanation, and a reader
          arriving at this page wants the second before the first. */}
      <Section id="history" eyebrow={history.eyebrow} title={history.title} alt>
        <ol className="timeline">
          {history.milestones.map((item) => (
            <li key={item.when}>
              <span className="timeline__when">{item.when}</span>
              <div className="timeline__body">
                <h3>{item.what}</h3>
                <p>
                  <Md>{item.body}</Md>
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div style={{ marginTop: '2.5rem' }}>
          <NextLinks title={history.next.title} links={history.next.links} />
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
