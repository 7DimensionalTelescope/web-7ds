import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, Figure } from '../components/site';
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

    <Section eyebrow="Reach" title="What the questions require">
      <div className="prose">
        <p>
          Spectral information is only useful as far out as the survey can detect a source, and
          the depth reached at each wavelength is what decides which of the questions below are
          answerable. Sampling the spectrum in many narrow steps costs depth per band relative to
          a broadband survey of the same aperture, and the survey design trades that against the
          three cadences.
        </p>
        <p>
          The comparison below also shows why 7DS and SPHEREx are complementary rather than
          redundant: they reach similar depth over overlapping wavelengths, but 7DS resolves the
          sky roughly ten times more finely, so a 7DS pixel is a measurement of one source where
          a SPHEREx pixel is a blend of several. Measured per-band depths for the current filter
          set are on the <Link to="/users/performance">performance page</Link>.
        </p>
      </div>
      <div style={{ marginTop: '2.5rem' }}>
        <Figure
          src="/img/science/survey-depth.jpg"
          alt="Five-sigma depth against wavelength for 7DT single exposures, the wide-area time-domain survey and the intensive monitoring survey, compared with SPHEREx, Pan-STARRS 1 and SkyMapper"
          label="Depth against wavelength"
          caption="5σ depth for a single 7DT exposure and for the accumulated wide-area and intensive-monitoring surveys, against SPHEREx, Pan-STARRS 1 and SkyMapper. 7DS covers the optical at medium-band resolution where SPHEREx continues into the infrared."
        />
      </div>
    </Section>

    <Section eyebrow="Program" title="Seven science themes" alt>
      <p className="prose">
        Each theme below draws on the same data product: a medium-band spectral energy
        distribution for every source in the field, measured repeatedly.
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
        <Link className="btn btn--secondary" to="/publication/list">
          Publications
        </Link>
      </div>
    </Section>
  </PageLayout>
);

export default Index;
