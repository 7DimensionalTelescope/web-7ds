import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, SpecTable, NextLinks } from '../components/site';
import { telescopeOverviewText, arrayDesignText, arrayDesignText2 } from './content/text';
import specs from './content/specs.json';

export const meta: MetaFunction = () => [
  { title: 'Telescope · 7-Dimensional Telescope' },
  {
    name: 'description',
    content:
      'The 7-Dimensional Telescope: twenty 50-cm units on direct-drive mounts with CMOS cameras and medium-band filter wheels, operated as one instrument.',
  },
];

const Index = () => (
  <PageLayout menu="manu7dt">
    <PageHero
      eyebrow="Telescope"
      title={
        <>
          The <em>7DT</em> array
        </>
      }
      lede="Twenty 50-cm telescopes on direct-drive mounts, each with its own camera and filter wheel, operated as a single instrument."
      image="/img/hero/telescope.jpg"
      meta={[
        { value: '20', label: 'Telescopes', note: '16 online', live: true },
        { value: '50.8', unit: 'cm', label: 'Primary diameter' },
        { value: 'f/3.0', label: 'Focal ratio' },
        { value: '1.34 × 0.90', unit: '°', label: 'Field per unit' },
      ]}
    />

    <Section eyebrow="Hardware" title="What the array is made of">
      <div className="split split--wide-text">
        <div>
          <p className="prose">{telescopeOverviewText}</p>
          <div className="table-wrap" style={{ marginTop: '1.5rem' }}>
            <table className="spec-table">
              <caption>Unit telescope, at a glance</caption>
              <tbody>
                <tr>
                  <th scope="row">Optical tube</th>
                  <td>PlaneWave DeltaRho 500 — 508 mm corrected Cassegrain, f/3.0</td>
                </tr>
                <tr>
                  <th scope="row">Mount</th>
                  <td>PlaneWave L-500 direct drive, equatorial, 20 deg s⁻¹ slew</td>
                </tr>
                <tr>
                  <th scope="row">Camera</th>
                  <td>Moravian C3-61000 PRO — SONY IMX455 CMOS, 9576 × 6388 px</td>
                </tr>
                <tr>
                  <th scope="row">Filter wheel</th>
                  <td>9 slots per unit — Sloan broad bands and a share of 35 medium bands</td>
                </tr>
                <tr>
                  <th scope="row">Field of view</th>
                  <td>1.34° × 0.90° at 0.5″ per pixel, 1.25 deg² per pointing</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="note" style={{ marginTop: '1rem' }}>
            Each subsystem is described in full under{' '}
            <Link to="/telescope/instrument">instrument</Link>. Measured on-sky performance is
            reported on the <Link to="/users/performance">performance page</Link>.
          </p>
        </div>
        <figure className="figure">
          <img
            src="/img/images/Figure2_7DT.jpg"
            alt="The 7-Dimensional Telescope array seen from the front"
            loading="lazy"
          />
          <figcaption>
            <b>DeltaRho 500</b> Each unit is a 508 mm corrected Cassegrain on an L-500 direct-drive
            mount, with its own camera and filter wheel.
          </figcaption>
        </figure>
      </div>
    </Section>

    <Section eyebrow="Design" title="Why an array rather than one telescope" alt>
      <div className="split split--wide-text">
        <div>
          <p className="prose">{arrayDesignText}</p>
          <p className="prose">{arrayDesignText2}</p>
        </div>
        <figure className="figure">
          <img
            src="/img/images/Figure1_7DT.jpeg"
            alt="The 7-Dimensional Telescope array at El Sauce Observatory"
            loading="lazy"
          />
          <figcaption>
            <b>The array</b> DeltaRho 500 units installed at El Sauce Observatory, Río Hurtado
            Valley, Chile.
          </figcaption>
        </figure>
      </div>
    </Section>

    <Section eyebrow="Specifications" title="System summary">
      <SpecTable caption="7DT system specifications — June 2026" groups={specs.groups} />
      <div style={{ marginTop: '2.5rem' }}>
        <NextLinks
          title="In detail"
          links={[
            { label: 'Instrument', href: '/telescope/instrument' },
            { label: 'Location', href: '/telescope/location' },
            { label: 'Computational resources', href: '/telescope/computer' },
            { label: 'Measured performance', href: '/users/performance' },
          ]}
        />
      </div>
    </Section>
  </PageLayout>
);

export default Index;
