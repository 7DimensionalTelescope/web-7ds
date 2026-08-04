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
      'What 7DS is built to measure: spectral mapping and the time domain, and the science themes that follow from them.',
  },
];

const Index = () => (
  <PageLayout menu="manuScience">
    <PageHero
      eyebrow="Science"
      title="Motivation"
      lede="7DS measures two things a conventional survey does not measure together: the spectrum of every source in the field, and how that spectrum changes with time."
      image="/img/hero/science.jpg"
      meta={[
        { value: '30–70', label: 'Spectral resolution R' },
        { value: '375–875', unit: 'nm', label: 'Wavelength range' },
        { value: '1', unit: 'd', label: 'Fastest cadence' },
      ]}
    />

    <Section eyebrow="Spectral mapping" title="A spectrum for every source in the field">
      <p className="prose">{scienceOverviewText}</p>
      <p className="prose">
        The practical consequence is that classification does not depend on follow-up. A source
        detected in a 7DS image already carries the information needed to estimate a photometric
        redshift, separate a quasar from a star, or distinguish a kilonova from the supernovae and
        detector artifacts that outnumber it — at the moment of detection, for every object in
        1.25 square degrees. The filter set that makes this possible, and which bands exist on a
        given tile, are described under <Link to="/users/status">status and overview</Link>.
      </p>
    </Section>

    <Section eyebrow="Time domain" title="Repeating the measurement" alt>
      <p className="prose">{scienceOverviewText2}</p>
      <p className="prose">
        The three surveys exist to put that repetition at different cadences: one visit
        everywhere, a revisit every 10 to 14 days over a smaller area, and nightly observation of
        a single deep field. Which cadence a question needs is what determines which survey
        serves it — set out under <Link to="/survey/overview">survey design</Link>.
      </p>
    </Section>

    <Section eyebrow="Program" title="Seven science themes">
      <p className="prose">
        Each theme below draws on the same data product: a medium-band spectral energy
        distribution for every source in the field, measured repeatedly.
      </p>
      <div className="grid grid-cols-2" style={{ marginTop: '2rem' }}>
        {science.themes.map((theme) => (
          <a className="theme-card" href={`/science/sci#${theme.id}`} key={theme.id}>
            <span className="theme-card__index">{theme.n}</span>
            <h3 className="theme-card__title">{theme.title}</h3>
            <p className="theme-card__body">{theme.summary}</p>
          </a>
        ))}
      </div>
      <div className="btn-row" style={{ marginTop: '2rem' }}>
        <Link className="btn btn--primary" to="/science/sci">
          All themes in detail
        </Link>
        <Link className="btn btn--secondary" to="/publication/list">
          Publications
        </Link>
      </div>
    </Section>
  </PageLayout>
);

export default Index;
