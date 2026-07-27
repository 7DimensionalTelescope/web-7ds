import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';

import { PageLayout, PageHero, Section, SimpleTable } from '../components/site';
import { archiveText } from './content/text';

export const meta: MetaFunction = () => [
  { title: 'Data archive · 7-Dimensional Telescope' },
  {
    name: 'description',
    content: 'What 7DT produces, how it is catalogued, and how to request data before the public release.',
  },
];

/* Data product definitions come from the pipeline paper (Hyun et al.,
   Proc. SPIE 14155-12). There is deliberately no observation listing here:
   the public archive interface does not exist yet, and a placeholder table
   of invented observations would misrepresent the survey. */

const PRODUCTS = [
  ['single', 'A calibrated individual exposure, 100 s, with WCS and a source catalogue'],
  ['coadd', 'Three singles combined to a 300 s frame — the basic survey product'],
  ['difference', 'A coadd minus its RIS reference, for transient detection'],
  ['catalogue', 'A flux-calibrated source list attached to every image above'],
  ['master frame', 'Bias, dark and flat, generated nightly and matched by group key'],
];

const CONVENTIONS = [
  ['Photometric system', 'AB magnitudes'],
  ['Coadd zero point', '23.9 AB — pixel values in µJy'],
  ['Astrometric reference', 'Gaia DR3'],
  ['Flux calibration', 'Synthetic photometry from Gaia XP spectra'],
  ['Tiling', 'HEALPix-derived RIS grid, T00000 – T28519'],
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

const Index = () => {
  return (
    <PageLayout menu="manuData">
      <PageHero
        eyebrow="Data"
        title={
          <>
            Data <em>products</em>
          </>
        }
        lede="What the array produces each night, how it is calibrated and catalogued, and how to reach the data before the public release."
        image="/img/hero/data.jpg"
        meta={[
          { value: '1.75', unit: 'M', label: 'Images acquired' },
          { value: '3.6', unit: 'PB', label: 'Archive capacity' },
          { value: '25,472', label: 'RIS tiles' },
        ]}
      />

      <Section eyebrow="Access" title="Status of the archive">
        <p className="prose">{archiveText}</p>

        <div className="panel" style={{ marginTop: '2rem', maxWidth: '68ch' }}>
          <div className="panel__title">Requesting data</div>
          <p className="feature-list__body" style={{ marginBottom: '1rem' }}>
            Until the public release, requests for 7DT imaging, catalogues or
            target-of-opportunity products are handled by the project directly. Please include the
            field or coordinates, the filters and the epoch range you need.
          </p>
          <a className="btn btn--primary" href="mailto:mim@astro.snu.ac.kr?subject=7DT%20data%20request">
            Contact the project
          </a>
        </div>
      </Section>

      <Section eyebrow="Products" title="What the pipeline produces" alt>
        <div className="split split--wide-text">
          <ul className="feature-list" style={{ margin: 0 }}>
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
          <SimpleTable caption="Conventions" rows={CONVENTIONS} />
        </div>
      </Section>

      <Section eyebrow="Quality" title="What every image carries">
        <div className="split split--wide-text">
          <p className="prose">
            Quality-assurance metrics are written into the FITS header of every product and
            ingested into the operations database, so the state of any image can be inspected
            without opening it. A companion dependency table traces each output back through the
            coadds, processed singles and master frames it was built from.
          </p>
          <SimpleTable caption="Selected header keywords" rows={QA_KEYS} />
        </div>

        <div className="btn-row" style={{ marginTop: '2rem' }}>
          <Link className="btn btn--secondary" to="/data/software">How the pipeline works</Link>
          <Link className="btn btn--secondary" to="/publication/policy">Publication policy</Link>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
