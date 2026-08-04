import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, StatGrid } from '../components/site';
import { performanceText, photometryText, depthText } from './content/text';
import specs from './content/specs.json';
import surveys from './content/surveys.json';

export const meta: MetaFunction = () => [
  { title: 'Performance · 7DT for users' },
  {
    name: 'description',
    content:
      'Measured on-sky performance of the 7DT array and the depths reached by each component of the survey: image quality, photometric calibration and limiting magnitudes.',
  },
];

/* This page is the single source for performance numbers. Other pages state
   what the instrument is; this one states what it delivers, and they link
   here rather than repeating the figures. */

const Index = () => (
  <PageLayout menu="manuUsers">
    <PageHero
      eyebrow="For users"
      title="Performance"
      lede="What the array delivers on sky, as measured in routine operation rather than specified on paper."
      image="/img/hero/telescope.jpg"
      meta={[
        { value: '2.0', unit: '″', label: 'Median PSF FWHM' },
        { value: '15–25', unit: 'mmag', label: 'Zero-point uncertainty' },
        { value: '19.6', unit: 'mag', label: 'Best single-visit depth' },
        { value: '23.6', unit: 'mag', label: 'Deepest planned coadd' },
      ]}
    />

    <Section eyebrow="Image quality" title="Optical performance">
      <StatGrid items={specs.performance} />
      <p className="prose" style={{ marginTop: '2rem' }}>
        {performanceText}
      </p>
    </Section>

    <Section eyebrow="Photometry" title="Calibration accuracy" alt>
      <p className="prose">{photometryText}</p>
      <p className="footnote" style={{ marginTop: '1rem' }}>
        Zero-point uncertainties are larger redward of 775 nm, where detector quantum efficiency
        falls and signal-to-noise drops with it. The fifteen filters installed in late 2025 are not
        yet spectrophotometrically calibrated; the original twenty medium bands are the calibrated
        set in operational use.
      </p>
    </Section>

    <Section eyebrow="Depth" title="Limiting magnitudes">
      <p className="prose">{depthText}</p>

      <div className="split split--wide-text" style={{ marginTop: '2rem' }}>
        <div className="table-wrap">
          <table className="spec-table">
            <caption>{specs.depths.caption}</caption>
            <tbody>
              {specs.depths.rows.map((row) => (
                <tr key={row[0]}>
                  <th scope="row">{row[0]}</th>
                  <td>{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-wrap">
          <table className="spec-table">
            <caption>Depth reached by each survey component, 5σ in m600</caption>
            <tbody>
              {surveys.tiers.map((tier) => (
                <tr key={tier.code}>
                  <th scope="row">
                    <Link to={`/survey/${tier.code.toLowerCase()}`}>{tier.code}</Link>
                  </th>
                  <td>{tier.depth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="footnote" style={{ marginTop: '1rem' }}>
        Single-exposure depths above are for a 100 s exposure under nominal conditions: seeing
        better than 2.0 arcseconds, airmass below 1.5, and a non-bright night. The RIS figure is
        one visit of 3 × 100 s. WTS and IMS figures are cumulative over the planned five-year
        operation, not the depth of any single visit.
      </p>
    </Section>

    <Section eyebrow="Estimating" title="Planning an exposure" alt>
      <p className="prose">
        To estimate the signal-to-noise expected for a source, combine the depths above with the
        filter response curves. The <code>supy</code> package includes a simulator module that
        generates filter and detector response for the 7DT bands, and an observer module for
        target visibility from El Sauce. Both are described under{' '}
        <Link to="/users/software">available software</Link>.
      </p>
      <div className="btn-row" style={{ marginTop: '1.5rem' }}>
        <Link className="btn btn--primary" to="/users/software">
          Software
        </Link>
        <Link className="btn btn--secondary" to="/users/propose">
          Observing modes
        </Link>
        <Link className="btn btn--secondary" to="/telescope/instrument">
          Instrument detail
        </Link>
      </div>
    </Section>
  </PageLayout>
);

export default Index;
