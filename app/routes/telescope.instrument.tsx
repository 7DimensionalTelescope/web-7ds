import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, SimpleTable } from '../components/site';
import {
  opticText,
  mountText,
  cameraText,
  filterText,
  filterCaveatText,
  photometryText,
} from './content/text';

export const meta: MetaFunction = () => [
  { title: 'Instrument · 7-Dimensional Telescope' },
  {
    name: 'description',
    content:
      'Optics, mount, camera and the 35-filter medium-band set of the 7-Dimensional Telescope.',
  },
];

const OPTICS = [
  ['Model', 'PlaneWave DeltaRho 500'],
  ['Design', 'Corrected Cassegrain'],
  ['Primary diameter', '50.8 cm'],
  ['Focal length', '1537 mm'],
  ['Focal ratio', 'f/3.0'],
  ['Image circle', '70 mm (≈ 2.6°)'],
];

const MOUNT = [
  ['Model', 'PlaneWave L-500'],
  ['Drive', 'Direct drive, equatorial'],
  ['Slew rate', '20 deg s⁻¹'],
  ['Unguided tracking', '> 100 s'],
  ['Pointing model', 'PWI4, 40–50 sky points'],
];

const CAMERA = [
  ['Model', 'Moravian C3-61000 PRO'],
  ['Sensor', 'SONY IMX455 back-illuminated CMOS'],
  ['Sensor size', '36 × 24 mm'],
  ['Dimension', '9576 × 6388 pixels'],
  ['Pixel size', '3.76 µm'],
  ['Pixel scale', '0.5 arcsec'],
  ['Field of view', '1.34° × 0.90°'],
  ['Operating temperature', '−10 °C'],
];

const FILTERS = [
  ['Filter wheel', '9 slots per unit'],
  ['Sloan g, r, i', 'Every unit'],
  ['Sloan u', '1 unit'],
  ['Sloan z', '3 units'],
  ['Medium bands installed', '35 of 40 planned'],
  ['Wavelength coverage', '375–875 nm'],
  ['FWHM', '14–41 nm (typ. 25–30)'],
  ['Manufacturers', 'Chroma (broad), Edmund Optics (medium)'],
];

const Index = () => {
  return (
    <PageLayout menu="manu7dt">
      <PageHero
        eyebrow="Telescope"
        title={
          <>
            Instrument <em>specification</em>
          </>
        }
        lede="All twenty units of the array are identical: the same optics, the same mount, the same camera. What differs between them is the filters they carry — and that is the whole design."
        image="/img/hero/instrument.jpg"
      />

      <Section eyebrow="01" title="Optical tube assembly">
        <div className="split split--wide-text">
          <p className="prose">{opticText}</p>
          <SimpleTable caption="DeltaRho 500" rows={OPTICS} />
        </div>
      </Section>

      <Section eyebrow="02" title="Mount" alt>
        <div className="split split--wide-text">
          <p className="prose">{mountText}</p>
          <SimpleTable caption="L-500 mount" rows={MOUNT} />
        </div>
      </Section>

      <Section eyebrow="03" title="Camera">
        <div className="split split--wide-text">
          <p className="prose">{cameraText}</p>
          <SimpleTable caption="C3-61000 PRO" rows={CAMERA} />
        </div>
      </Section>

      <Section eyebrow="04" title="Filters" alt>
        <div className="split split--wide-text">
          <div>
            <p className="prose">{filterText}</p>
            <p className="prose">{filterCaveatText}</p>
          </div>
          <SimpleTable caption="Filter complement" rows={FILTERS} />
        </div>

        <figure className="figure" style={{ marginTop: '2.5rem' }}>
          <img src="/img/filter.png" alt="Transmission curves of the 7DT medium-band filter set" loading="lazy" />
          <figcaption>
            <b>System response</b> Filter response curves incorporating detector quantum
            efficiency, sky transmission, telescope optics and filter throughput. Filters are
            designated by central wavelength in nanometers — m400 is the band centered at 400 nm.
          </figcaption>
        </figure>
      </Section>

      <Section eyebrow="05" title="Calibration">
        <p className="prose">{photometryText}</p>
      </Section>

      <Section eyebrow="On sky" title="What the filter set looks like" alt>
        <div className="split">
          <figure className="figure">
            <img src="/img/NGC7293.gif" alt="The Helix Nebula through successive 7DT medium bands" loading="lazy" />
            <figcaption>
              <b>NGC 7293</b> The Helix Nebula, band by band across the medium-band set.
            </figcaption>
          </figure>
          <figure className="figure">
            <img src="/img/NGC0253.gif" alt="The Sculptor Galaxy through successive 7DT medium bands" loading="lazy" />
            <figcaption>
              <b>NGC 253</b> The Sculptor Galaxy, band by band across the medium-band set.
            </figcaption>
          </figure>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
