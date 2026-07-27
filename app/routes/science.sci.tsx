import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import science from './content/science.json';

export const meta: MetaFunction = () => [
  { title: 'Science themes · 7-Dimensional Telescope' },
  {
    name: 'description',
    content:
      'Science themes and early results from the 7-Dimensional Telescope: multi-messenger astronomy, transients, galaxies, cosmology, AGN, Galactic and solar-system science.',
  },
];

const Index = () => {
  return (
    <PageLayout menu="manuScience">
      <PageHero
        eyebrow="Science"
        title="Themes & early results"
        lede="Each theme below draws on the same data product — a medium-band spectral energy distribution for every source in a 1.25 square degree field."
        image="/img/hero/sci.jpg"
      />

      <Section eyebrow="Themes" title="The 7DS science programme">
        <ul className="feature-list">
          {science.themes.map((theme) => (
            <li key={theme.id} id={theme.id} style={{ scrollMarginTop: '6rem' }}>
              <span className="feature-list__key">{theme.n}</span>
              <div>
                <h2 className="feature-list__title" style={{ fontSize: '1.25rem' }}>
                  {theme.title}
                </h2>
                <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
                  {theme.summary}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Early science" title="Results from commissioning and first survey data" alt>
        <div className="grid grid-cols-2">
          {science.results.map((result) => (
            <div className="panel" key={result.title}>
              <div className="panel__title">{result.tag}</div>
              <h3 style={{ fontSize: '1.0625rem' }}>{result.title}</h3>
              <p className="feature-list__body" style={{ margin: 0 }}>
                {result.body}
              </p>
            </div>
          ))}
        </div>

        <p className="note" style={{ marginTop: '1.5rem' }}>
          Figures quoted above are drawn from the 7DT status report and the associated early
          science papers. See <a href="/publication/list">Publications</a> for the full list.
        </p>
      </Section>

      <Section eyebrow="Data" title="Working with 7DT data">
        <div className="split">
          <div>
            <p className="prose">
              7DT data products are medium-band images and matched source catalogues on a fixed
              tile grid, calibrated against Gaia DR3 synthetic photometry and flux-scaled so that
              pixel values carry units of microjansky. That makes them directly usable for
              pixel-based SED fitting without further conversion.
            </p>
            <div className="btn-row" style={{ marginTop: '1.5rem' }}>
              <a className="btn btn--primary" href="/data/overview">
                Data &amp; products
              </a>
              <a className="btn btn--secondary" href="/data/software">
                Reduction software
              </a>
            </div>
          </div>
          <figure className="figure">
            <img
              src="/img/images/Figure8a(lowres)_u-500-650_asinh.png"
              alt="Pseudo-colour image of the Helix Nebula from Sloan u and the m500 and m650 medium bands"
              loading="lazy"
            />
            <figcaption>
              <b>Helix Nebula</b> Pseudo-colour composite from Sloan u and the m500 and m650
              medium bands, mapped to blue, green and red.
            </figcaption>
          </figure>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
