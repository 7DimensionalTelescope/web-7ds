import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, SpecTable, StatGrid, NextLinks } from '../components/site';
import { telescopeOverviewText, performanceText, depthText } from './content/text';
import specs from './content/specs.json';

export const meta: MetaFunction = () => [
  { title: 'Telescope · 7-Dimensional Telescope' },
  {
    name: 'description',
    content:
      'System overview of the 7-Dimensional Telescope: twenty 50-cm units, medium-band filters, and measured optical and photometric performance.',
  },
];

const Index = () => {
  return (
    <PageLayout menu="manu7dt">
      <PageHero
        eyebrow="Telescope"
        title={
          <>
            The <em>7DT</em> array
          </>
        }
        lede="Twenty commercial 50-cm telescopes, operated as one instrument. Off-the-shelf optics kept the array inexpensive and quick to bring on line; the filter set is what makes it unusual."
        image="/img/hero/telescope.jpg"
        meta={[
          { value: '50.8', unit: 'cm', label: 'Primary diameter' },
          { value: 'f/3.0', label: 'Focal ratio' },
          { value: '1.34 × 0.90', unit: '°', label: 'FoV per unit' },
          { value: '0.5', unit: '″', label: 'Pixel scale' },
        ]}
      />

      <Section eyebrow="Overview" title="One instrument in twenty parts">
        <div className="split split--wide-text">
          <div>
            <p className="prose">{telescopeOverviewText}</p>
            <p className="prose">{performanceText}</p>
          </div>
          <figure className="figure">
            <img
              src="/img/images/Figure2_7DT.jpg"
              alt="The 7-Dimensional Telescope array seen from the front"
              loading="lazy"
            />
            <figcaption>
              <b>DeltaRho 500</b> Each unit is a 508 mm corrected Cassegrain on an L-500
              direct-drive mount, with its own camera and filter wheel.
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section eyebrow="Performance" title="As measured on sky" alt>
        <StatGrid items={specs.performance} />
        <p className="prose" style={{ marginTop: '2rem' }}>
          {depthText}
        </p>
        <div className="table-wrap" style={{ marginTop: '1.5rem', maxWidth: '620px' }}>
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
      </Section>

      <Section eyebrow="Specifications" title="System summary">
        <SpecTable caption="7DT system specifications — June 2026" groups={specs.groups} />
        <div style={{ marginTop: '2.5rem' }}>
          <NextLinks
            title="In detail"
            links={[
              { label: 'Location', href: '/telescope/location' },
              { label: 'Instrument', href: '/telescope/instrument' },
              { label: 'Computational resources', href: '/telescope/computer' },
              { label: 'Observing mode', href: '/telescope/mode' },
            ]}
          />
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
