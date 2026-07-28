import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import { scienceOverviewText, scienceOverviewText2 } from './content/text';
import science from './content/science.json';

export const meta: MetaFunction = () => [
  { title: 'Science · 7-Dimensional Telescope' },
  {
    name: 'description',
    content:
      'From gravitational-wave counterparts to photometric redshifts: the science program of the 7-Dimensional Telescope.',
  },
];

const Index = () => {
  return (
    <PageLayout menu="manuScience">
      <PageHero
        eyebrow="Science"
        title="Shedding light on the physics of the Universe"
        lede="A medium-band array turns a single visit into a low-resolution spectrum for every source in the field. That capability starts with kilonovae and reaches across the whole of time-domain and extragalactic astronomy."
        image="/img/hero/science.jpg"
        meta={[
          { value: '30–70', label: 'Spectral resolution R' },
          { value: '0.4–0.9', unit: 'µm', label: 'Wavelength range' },
          { value: '7', label: 'Science themes' },
        ]}
      />

      <Section eyebrow="Motivation" title="Why medium bands">
        <div className="split split--wide-text">
          <div>
            <p className="prose">{scienceOverviewText}</p>
            <p className="prose">{scienceOverviewText2}</p>
          </div>
          <figure className="figure">
            <img src="/img/filter.png" alt="Transmission curves of the 7DT medium-band filter set" loading="lazy" />
            <figcaption>
              <b>Filter set</b> Medium bands of 25 nm width spanning 375–875 nm, distributed
              across the array so the full set is covered in a small number of exposures.
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section eyebrow="Program" title="Seven science themes" alt>
        <div className="grid grid-cols-2">
          {science.themes.map((theme) => (
            <a className="theme-card" href={`/science/sci#${theme.id}`} key={theme.id}>
              <span className="theme-card__index">{theme.n}</span>
              <h3 className="theme-card__title">{theme.title}</h3>
              <p className="theme-card__body">{theme.summary}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section eyebrow="Verification" title="What commissioning observed">
        <p className="lede">
          Science verification ran alongside instrument commissioning from first light, covering
          the full range of intended use cases.
        </p>
        <ul className="feature-list">
          {science.verification.map((item, index) => (
            <li key={item}>
              <span className="feature-list__key">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p className="feature-list__body" style={{ margin: 0 }}>
                  {item}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="btn-row" style={{ marginTop: '2rem' }}>
          <Link className="btn btn--primary" to="/science/sci">Early science results</Link>
          <Link className="btn btn--secondary" to="/publication/list">Publications</Link>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
