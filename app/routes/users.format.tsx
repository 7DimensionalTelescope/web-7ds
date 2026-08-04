import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, SimpleTable } from '../components/site';
import { dataProductText } from './content/text';
import software from './content/software.json';

export const meta: MetaFunction = () => [
  { title: 'Data format · 7DT for users' },
  {
    name: 'description',
    content:
      'Data products, photometric conventions, FITS header keywords, source catalogs and the processing sequence that produces them.',
  },
];

const PRODUCTS = [
  ['single', 'A calibrated individual exposure, 100 s, with WCS and a source catalog'],
  ['coadd', 'Three singles combined to a 300 s frame — the basic survey product'],
  ['difference', 'A coadd minus its reference image, for transient detection'],
  ['catalog', 'A flux-calibrated source list attached to every image above'],
  ['master frame', 'Bias, dark and flat, generated nightly and matched by group key'],
];

const CONVENTIONS = [
  ['Photometric system', 'AB magnitudes'],
  ['Coadd zero point', '23.9 AB — pixel values in µJy'],
  ['Astrometric reference', 'Gaia DR3'],
  ['Flux calibration', 'Synthetic photometry from Gaia XP spectra'],
  ['Tiling', 'HEALPix-derived, T00000 – T28519'],
  ['File format', 'FITS, with QA metrics in the header'],
];

const QA_KEYS = [
  ['SANITY', 'Boolean; false means the image should not be used for science'],
  ['REJ_PROC', 'The processing stage at which SANITY was set false'],
  ['SEEING', 'Measured PSF FWHM'],
  ['UL5_5', '5σ limiting magnitude'],
  ['ELLIP', 'Point-source elongation'],
  ['PPFLAG', 'Bitmask recording compromises in master-frame selection'],
];

const Index = () => (
  <PageLayout menu="manuUsers">
    <PageHero
      eyebrow="For users"
      title={
        <>
          Data <em>format</em>
        </>
      }
      lede="What the pipeline produces, in what units, with what recorded alongside it."
      image="/img/hero/data.jpg"
    />

    <Section eyebrow="Products" title="What the pipeline produces">
      <div className="split split--wide-text">
        <div>
          <p className="prose">{dataProductText}</p>
          <ul className="feature-list" style={{ marginTop: '1.5rem' }}>
            {PRODUCTS.map((product) => (
              <li key={product[0]}>
                <span className="feature-list__key" style={{ fontFamily: 'var(--font-mono)' }}>
                  {product[0]}
                </span>
                <div>
                  <p className="feature-list__body" style={{ margin: 0 }}>
                    {product[1]}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <SimpleTable caption="Conventions" rows={CONVENTIONS} />
      </div>
    </Section>

    <Section eyebrow="Headers" title="Header and catalog information" alt>
      <div className="split split--wide-text">
        <div>
          <p className="prose">
            Quality-assurance metrics are written into the FITS header of every product and
            ingested into the operations database, so the state of an image can be inspected
            without opening it. Each catalog is a flux-calibrated source list matched to its parent
            image, carrying positions on the Gaia DR3 frame and AB magnitudes in the band of the
            image it was extracted from. For a coadd this means one row per detected source per
            band; combining bands for a given source gives the medium-band spectral energy
            distribution that the survey exists to produce.
          </p>
          <p className="prose">
            A dependency record links each output back through the coadds, processed singles and
            master frames used to build it, and the pipeline version is recorded with every
            product, so any figure can be traced to the code that produced it.
          </p>
        </div>
        <SimpleTable caption="Selected header keywords" rows={QA_KEYS} />
      </div>
    </Section>

    <Section eyebrow="Processing" title="How a night is reduced">
      <p className="prose">
        Images are grouped by their properties — unit, filter, observing mode, night — into
        configurations, and each group runs through the same sequence. Established astronomical
        software does the numerical work behind Python interfaces rather than being reimplemented,
        so the behavior of each stage is that of the underlying tool.
      </p>

      <ul className="feature-list" style={{ marginTop: '2rem' }}>
        {software.stages.map((stage, index) => (
          <li key={stage.module}>
            <span className="feature-list__key">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3
                className="feature-list__title"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem' }}
              >
                {stage.module}
              </h3>
              <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
                {stage.body}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="panel panel--alt" style={{ marginTop: '2rem' }}>
        <div className="panel__title">External engines</div>
        <div className="table-wrap" style={{ border: 0 }}>
          <table className="spec-table">
            <tbody>
              {software.external.map((tool) => (
                <tr key={tool[0]}>
                  <th
                    scope="row"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
                  >
                    {tool[0]}
                  </th>
                  <td style={{ fontFamily: 'var(--font-sans)' }}>{tool[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="btn-row" style={{ marginTop: '2rem' }}>
        <Link className="btn btn--primary" to="/users/access">
          Getting the data
        </Link>
        <Link className="btn btn--secondary" to="/users/software">
          Running the pipeline yourself
        </Link>
      </div>
    </Section>
  </PageLayout>
);

export default Index;
