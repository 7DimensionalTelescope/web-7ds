import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, Figure } from '../components/site';
import science from './content/science.json';

export const meta: MetaFunction = () => [
  { title: 'Science themes · 7-Dimensional Telescope' },
  {
    name: 'description',
    content:
      'The seven questions 7DS is built to answer: multi-messenger astronomy, transients, galaxy evolution, cosmology, active galactic nuclei, Galactic science and exoplanets, and solar system objects.',
  },
];

type Fig = { src: string; alt: string; label?: string; caption?: string };
type Theme = {
  id: string;
  n: string;
  title: string;
  question?: string;
  summary: string;
  detail?: string[];
  goals?: string[];
  figure?: Fig;
  figure2?: Fig;
};

const themes = science.themes as Theme[];

const Index = () => (
  <PageLayout menu="manuScience">
    <PageHero
      eyebrow="Science"
      title="Seven questions"
      lede="7DS produces one kind of measurement — a spectrum for every source in the field, repeated over time. These are the questions that measurement was assembled to answer."
      image="/img/hero/sci.jpg"
    />

    {themes.map((theme, i) => (
      <Section
        key={theme.id}
        id={theme.id}
        eyebrow={`Theme ${theme.n}`}
        title={theme.title}
        alt={i % 2 === 1}
      >
        {theme.question && <p className="lede">{theme.question}</p>}

        <div className="prose" style={{ marginTop: theme.question ? '1.5rem' : 0 }}>
          {(theme.detail ?? []).map((para, k) => (
            <p key={k}>{para}</p>
          ))}
          <p>{theme.summary}</p>
        </div>

        {theme.goals && theme.goals.length > 0 && (
          <div className="panel" style={{ marginTop: '2rem', maxWidth: '68ch' }}>
            <div className="panel__title">What the program aims to deliver</div>
            <ul className="prose prose--full" style={{ marginBottom: 0 }}>
              {theme.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        )}

        {theme.figure && (
          <div style={{ marginTop: '2.5rem' }}>
            <Figure
              src={theme.figure.src}
              alt={theme.figure.alt}
              label={theme.figure.label}
              caption={theme.figure.caption}
            />
          </div>
        )}

        {theme.figure2 && (
          <div style={{ marginTop: '2rem' }}>
            <Figure
              src={theme.figure2.src}
              alt={theme.figure2.alt}
              label={theme.figure2.label}
              caption={theme.figure2.caption}
            />
          </div>
        )}
      </Section>
    ))}

    <Section eyebrow="Data" title="Working with 7DT data" alt>
      <div className="split">
        <div>
          <p className="prose">
            7DT data products are medium-band images and matched source catalogs on the survey
            tiling, calibrated against Gaia DR3 synthetic photometry and flux-scaled so that pixel
            values carry units of microjansky. That makes them directly usable for pixel-based SED
            fitting without further conversion.
          </p>
          <div className="btn-row" style={{ marginTop: '1.5rem' }}>
            <Link className="btn btn--primary" to="/users/access#format">
              Using the data
            </Link>
            <Link className="btn btn--secondary" to="/users/software">
              Software
            </Link>
          </div>
        </div>
        <figure className="figure">
          <img
            src="/img/images/Figure8a(lowres)_u-500-650_asinh.png"
            alt="Pseudo-color image of the Helix Nebula from Sloan u and the m500 and m650 medium bands"
            loading="lazy"
          />
          <figcaption>
            <b>Helix Nebula</b> Pseudo-color composite from Sloan u and the m500 and m650 medium
            bands, mapped to blue, green and red.
          </figcaption>
        </figure>
      </div>
    </Section>
  </PageLayout>
);

export default Index;
