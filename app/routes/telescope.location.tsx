import React, { useEffect, useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Carousel } from 'react-bootstrap';
// Bootstrap's stylesheet is loaded per-route: this is the only page using it,
// and it was previously 232 KB of render-blocking CSS on all 22 pages.
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

import { PageLayout, PageHero, Section, SimpleTable, ButtonRow } from '../components/site';
import { Md } from '../components/md';
import { metaOf } from '../lib/page';
import page from '../content/pages/telescope/location.json';

export const links = () => [{ rel: 'stylesheet', href: bootstrap }];

export const meta: MetaFunction = () => metaOf(page);

const { hero, site, photos, infrastructure } = page;

const Index = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Auto-advancing content needs a stop control (WCAG 2.2.2), and should not
  // move at all for anyone who has asked for reduced motion.
  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const autoplay = !paused && !reduceMotion;

  return (
    <PageLayout menu="manu7dt">
      <PageHero
        eyebrow={hero.eyebrow}
        title={<Md>{hero.title}</Md>}
        lede={hero.lede}
        image={hero.image}
        meta={hero.meta}
      />

      <Section eyebrow={site.eyebrow} title={site.title}>
        <div className="split split--wide-text">
          <div>
            <p className="prose">
              <Md>{site.body}</Md>
            </p>
            <h3 style={{ marginTop: '2rem', fontSize: '1rem' }}>{site.neighbours.title}</h3>
            <ul className="prose" style={{ paddingLeft: '1.25rem' }}>
              {site.neighbours.names.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
          <SimpleTable caption={site.table.caption} rows={site.table.rows} />
        </div>
      </Section>

      <div className="carousel-frame">
        <Carousel
          activeIndex={index}
          onSelect={(selected: number) => setIndex(selected)}
          interval={autoplay ? 5000 : null}
          fade={!reduceMotion}
        >
          {photos.map((photo, i) => (
            <Carousel.Item key={photo.file}>
              <div
                className="carousel-slide"
                style={{ backgroundImage: `url(/img/carousel/${photo.file})` }}
                role="img"
                aria-label={`${photo.caption} (${i + 1} of ${photos.length})`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <button
          type="button"
          className="carousel-pause"
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
        >
          {paused || reduceMotion ? '▶ Play' : '❚❚ Pause'}
        </button>
      </div>
      <div className="container container--wide">
        <p className="footnote" style={{ padding: '0.75rem 0' }}>
          {photos[index].caption}
        </p>
      </div>

      <Section eyebrow={infrastructure.eyebrow} title={infrastructure.title} alt>
        <p className="prose">
          <Md>{infrastructure.body}</Md>
        </p>
        <ButtonRow buttons={infrastructure.buttons} style={{ marginTop: '1.5rem' }} />
      </Section>
    </PageLayout>
  );
};

export default Index;
