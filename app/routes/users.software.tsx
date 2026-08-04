import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, StatGrid } from '../components/site';
import { softwareReuseText } from './content/text';
import software from './content/software.json';

export const meta: MetaFunction = () => [
  { title: 'Software · 7DT for users' },
  {
    name: 'description',
    content:
      'Software available to 7DT users: supy for analysis, Py7DT for reprocessing, and the operational systems that produce the data.',
  },
];

/* Two audiences, kept apart deliberately: supy is what an external user
   installs, the operational systems are what produced the data they are
   looking at. Mixing them made the previous page hard to act on. */

const SUPY_MODULES = [
  ['Observer', 'Target visibility and altitude from El Sauce, including StarAlt-style plots'],
  ['Tiles', 'Tile lookup by coordinate, matching against a localization region, and tile plotting'],
  ['Simulator', 'Filter and detector response simulation for the 7DT bands'],
  ['const', 'Instrument and site constants used by the other modules'],
];

const Index = () => (
  <PageLayout menu="manuUsers">
    <PageHero
      eyebrow="For users"
      title={
        <>
          Available <em>software</em>
        </>
      }
      lede="What to install to plan an observation or work with 7DT data, and what produced the data in the first place."
      image="/img/hero/computer.jpg"
    />

    <Section eyebrow="Analysis" title="supy">
      <div className="split split--wide-text">
        <div>
          <p className="prose">
            <code>supy</code> is a collection of Python utilities for members and users of the 7DT
            survey. It covers the tasks that come up before and after an observation rather than
            the reduction itself: working out whether a target is observable, finding which tiles
            cover a position or a gravitational-wave localization region, and simulating the
            response of the filter set.
          </p>
          <p className="prose">
            It is installed from source. Documentation, including worked examples for each module,
            is published at <code>sdt-supy.readthedocs.io</code>.
          </p>
          <div className="panel panel--alt" style={{ marginTop: '1.5rem' }}>
            <div className="panel__title">Install</div>
            <pre
              style={{
                margin: 0,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                lineHeight: 1.7,
                overflowX: 'auto',
              }}
            >
              <code>
                git clone https://github.com/7DimensionalTelescope/supy.git{'\n'}
                cd supy{'\n'}
                pip install .
              </code>
            </pre>
          </div>
          <div className="btn-row" style={{ marginTop: '1.25rem' }}>
            <a
              className="btn btn--primary"
              href="https://sdt-supy.readthedocs.io/en/latest/"
              target="_blank"
              rel="noreferrer"
            >
              Documentation
            </a>
            <a
              className="btn btn--secondary"
              href="https://github.com/7DimensionalTelescope/supy"
              target="_blank"
              rel="noreferrer"
            >
              Source
            </a>
          </div>
        </div>
        <div className="table-wrap">
          <table className="spec-table">
            <caption>Modules</caption>
            <tbody>
              {SUPY_MODULES.map((row) => (
                <tr key={row[0]}>
                  <th scope="row" style={{ fontFamily: 'var(--font-mono)' }}>
                    {row[0]}
                  </th>
                  <td>{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>

    <Section eyebrow="Reprocessing" title="Running the pipeline yourself" alt>
      <p className="prose">{softwareReuseText}</p>
      <p className="note" style={{ marginTop: '1rem' }}>
        Py7DT uses a rolling-release version scheme in which the last digit is incremented whenever
        a scientific decision changes how data are processed. That version is recorded in every
        configuration file and in the process status database, so any product can be traced to the
        code that made it and reprocessed in bulk when the code changes. What each stage does is
        described under <Link to="/users/format">data format</Link>.
      </p>
    </Section>

    <Section eyebrow="Operations" title="The systems that produce the data">
      <p className="prose">
        Three systems close observation, reduction and analysis into a nightly loop. They are not
        installed by external users, but knowing which one recorded a given quantity is often
        useful when interpreting it.
      </p>

      <div className="stack-lg" style={{ marginTop: '2rem' }}>
        {software.systems.map((system) => (
          <div className="panel" key={system.name} id={system.name.toLowerCase()}>
            <div className="rationale__head">
              <span className="tier-card__code">{system.name}</span>
              <h3>{system.role}</h3>
            </div>
            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
              {system.expansion}
            </p>
            <p className="prose" style={{ fontSize: '1rem' }}>
              {system.body}
            </p>
            <StatGrid items={system.stats} />
          </div>
        ))}
      </div>

      <p className="note" style={{ marginTop: '2rem' }}>
        Full technical descriptions are in Hyun et al., <i>Py7DT: Data Reduction Pipeline of the
        7-Dimensional Telescope</i> (Proc. SPIE 14155-12), and Choi et al., Proc. SPIE 14151-12,
        which covers RTCSpy. See <Link to="/publication/list">publications</Link>.
      </p>
    </Section>
  </PageLayout>
);

export default Index;
