import React, { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { Carousel } from 'react-bootstrap';
// Bootstrap's stylesheet is loaded per-route: this is the only page using it,
// and it was previously 232 KB of render-blocking CSS on all 22 pages.
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

import { PageLayout, PageHero, Section, SimpleTable } from '../components/site';
import { locationText } from './content/text';

export const links = () => [{ rel: 'stylesheet', href: bootstrap }];

export const meta: MetaFunction = () => [
  { title: 'Location · 7-Dimensional Telescope' },
  {
    name: 'description',
    content: 'El Sauce Observatory, Río Hurtado Valley, Chile — the site of the 7-Dimensional Telescope.',
  },
];

const IMAGES = ['c1.jpg', 'c2.jpg', 'c3.jpg', 'c4.jpg', 'c5.jpg', 'c6.jpg', 'c7.jpg'];

/* Captions written from the photographs themselves — do not edit without
   looking at the image the caption belongs to. */
const CAPTIONS = [
  'Site preparation and pier foundations above the Río Hurtado Valley',
  'The roll-off enclosure erected over the instrument deck, before installation',
  'Inside the closed enclosure: DeltaRho 500 units parked on their piers',
  'The roof rolled open at dusk, units stowed and ready for the night',
  'Members of the 7DT team and ObsTech site staff on the instrument deck',
  'The deck from above — installed units alongside piers still awaiting theirs',
  'The array working under the southern Milky Way',
];

const SITE = [
  ['Observatory', 'El Sauce, Río Hurtado Valley'],
  ['Latitude', '30° 28′ 16″ S'],
  ['Longitude', '70° 45′ 47″ W'],
  ['Altitude', '1600 m'],
  ['Median seeing', '≈ 1.5 arcsec'],
  ['Clear nights', '> 300 per year'],
  ['Zenith sky brightness', '21.97 mag arcsec⁻²'],
  ['Site operator', 'ObsTech'],
];

const NEIGHBOURS = [
  'Cerro Tololo Inter-American Observatory',
  'Gemini South Telescope',
  'Southern Astrophysical Research Telescope',
  'Vera C. Rubin Observatory',
];

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
        eyebrow="Telescope"
        title={
          <>
            7DT in <em>Chile</em>
          </>
        }
        lede="El Sauce — the willow tree — sits in the Río Hurtado Valley just south of the great Chilean observatories, and shares their skies."
        image="/img/hero/location.jpg"
        meta={[
          { value: '1600', unit: 'm', label: 'Altitude' },
          { value: '1.5', unit: '″', label: 'Median seeing' },
          { value: '300', unit: '+', label: 'Clear nights / yr' },
          { value: '21.97', label: 'Sky brightness' },
        ]}
      />

      <Section eyebrow="The site" title="Río Hurtado Valley">
        <div className="split split--wide-text">
          <div>
            <p className="prose">{locationText}</p>
            <h3 style={{ marginTop: '2rem', fontSize: '1rem' }}>Neighbouring facilities</h3>
            <ul className="prose" style={{ paddingLeft: '1.25rem' }}>
              {NEIGHBOURS.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
          <SimpleTable caption="Site parameters" rows={SITE} />
        </div>
      </Section>

      <div className="carousel-frame">
        <Carousel
          activeIndex={index}
          onSelect={(selected: number) => setIndex(selected)}
          interval={autoplay ? 5000 : null}
          fade={!reduceMotion}
        >
          {IMAGES.map((image, i) => (
            <Carousel.Item key={image}>
              <div
                className="carousel-slide"
                style={{ backgroundImage: `url(/img/carousel/${image})` }}
                role="img"
                aria-label={`${CAPTIONS[i]} (${i + 1} of ${IMAGES.length})`}
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
          {CAPTIONS[index]}
        </p>
      </div>

      <Section eyebrow="On site" title="Infrastructure" alt>
        <p className="prose">
          Site infrastructure, enclosures and on-site computing hardware are maintained by ObsTech,
          a Chilean telescope hosting company. The array is controlled from sixteen telescope
          control computers and a single main control computer housed at the site; data are handed
          to the Korean processing facility over KREONET each night.
        </p>
        <div className="btn-row" style={{ marginTop: '1.5rem' }}>
          <Link className="btn btn--primary" to="/telescope/computer">Computational resources</Link>
          <Link className="btn btn--secondary" to="/telescope/instrument">Instrument</Link>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
