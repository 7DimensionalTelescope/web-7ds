import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, NextLinks } from '../components/site';
import { dataOverviewText, dataProductText } from './content/text';
import software from './content/software.json';

export const meta: MetaFunction = () => [
  { title: 'Data · 7-Dimensional Telescope' },
  {
    name: 'description',
    content: 'Data flow, products and quality assurance for the 7-Dimensional Telescope.',
  },
];

const FLOW = [
  ['Acquire', 'Sixteen units write exposures to local storage as they complete; ≈ 3,000 images a night.'],
  ['Transfer', 'Roughly 350 GB is compressed and sent to Seoul over KREONET by GridFTP at ≈ 80 MB s⁻¹.'],
  ['Reduce', 'Py7DT groups, preprocesses, solves, calibrates, coadds and subtracts — about five hours per night.'],
  ['Record', 'Every product, its version, its QA metrics and its provenance are written to the gwportal database.'],
  ['Deliver', 'Coadds, difference images and matched source catalogues, with SED plots and magnitude tables for ToO events.'],
];

const Index = () => {
  return (
    <PageLayout menu="manuData">
      <PageHero
        eyebrow="Data"
        title={
          <>
            The 7DS <em>data centre</em>
          </>
        }
        lede="Observation, reduction and analysis closed into a single nightly loop between Chile and Seoul."
        image="/img/hero/data.jpg"
        meta={[
          { value: '≈ 350', unit: 'GB', label: 'Per night' },
          { value: '3.6', unit: 'PB', label: 'Archive capacity' },
          { value: '≈ 5', unit: 'hr', label: 'Reduction latency' },
          { value: '≈ 1', unit: 'hr', label: 'ToO, if observable' },
        ]}
      />

      <Section eyebrow="Overview" title="From the mountain to the catalogue">
        <p className="prose">{dataOverviewText}</p>
        <ul className="feature-list" style={{ marginTop: '2rem' }}>
          {FLOW.map((step, index) => (
            <li key={step[0]}>
              <span className="feature-list__key">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="feature-list__title">{step[0]}</h3>
                <p className="feature-list__body">{step[1]}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Products" title="What comes out" alt>
        <div className="split split--wide-text">
          <p className="prose">{dataProductText}</p>
          <div className="panel">
            <div className="panel__title">Quality assurance</div>
            <p className="feature-list__body">
              Every image carries a boolean <code>SANITY</code> flag whose false value means the
              frame should be rejected rather than processed further, together with the process in
              which the flag flipped. Alongside it sit the measured seeing, 5σ depth, ellipticity
              and astrometric precision — in the FITS header and in the database, for every image
              the pipeline produces.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Systems" title="Three systems, one loop">
        <div className="grid grid-cols-3">
          {software.systems.map((system) => (
            <div className="tier-card" key={system.name}>
              <span className="tier-card__code">{system.name}</span>
              <h3 className="tier-card__name" style={{ fontSize: '1rem' }}>
                {system.role}
              </h3>
              <p className="tier-card__note">{system.since}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          <NextLinks
            title="Continue"
            links={[
              { label: 'Data archive', href: '/data/data' },
              { label: 'Software', href: '/data/software' },
              { label: 'Computational resources', href: '/telescope/computer' },
              { label: 'Publication policy', href: '/publication/policy' },
            ]}
          />
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
