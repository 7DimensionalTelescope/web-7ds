import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, StatGrid } from '../components/site';
import { pipelineText, pipelineToOText, softwareReuseText } from './content/text';
import software from './content/software.json';

export const meta: MetaFunction = () => [
  { title: 'Software · 7-Dimensional Telescope' },
  {
    name: 'description',
    content:
      'RTCSpy, Py7DT and gwportal — the control, reduction and database software behind 7DT operations.',
  },
];

const Index = () => {
  return (
    <PageLayout menu="manuData">
      <PageHero
        eyebrow="Data"
        title="Software"
        lede="An array of sixteen telescopes producing three thousand images a night is a software problem as much as an optical one. Three systems carry it."
        image="/img/hero/computer.jpg"
      />

      {software.systems.map((system, index) => (
        <Section
          key={system.name}
          eyebrow={String(index + 1).padStart(2, '0')}
          title={system.name}
          alt={index % 2 === 1}
          id={system.name.toLowerCase()}
        >
          <div className="split split--wide-text">
            <div>
              <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
                {system.expansion}
              </p>
              <p className="prose">{system.body}</p>
              <p className="note">{system.since}</p>
            </div>
            <div className="panel">
              <div className="panel__title">Structure</div>
              <ul className="feature-list" style={{ borderTop: 0, margin: 0 }}>
                {system.layers.map((layer) => (
                  <li key={layer[0]} style={{ gridTemplateColumns: 'minmax(0, 1fr)', gap: '0.25rem' }}>
                    <div>
                      <h3 className="feature-list__title" style={{ fontSize: '0.9375rem' }}>
                        {layer[0]}
                      </h3>
                      <p className="feature-list__body" style={{ fontSize: '0.875rem' }}>
                        {layer[1]}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <StatGrid items={system.stats} />
          </div>
        </Section>
      ))}

      <Section eyebrow="Pipeline" title="How a night is reduced">
        <p className="prose">{pipelineText}</p>

        <ul className="feature-list" style={{ marginTop: '2rem' }}>
          {software.stages.map((stage, index) => (
            <li key={stage.module}>
              <span className="feature-list__key">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="feature-list__title" style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>
                  {stage.module}
                </h3>
                <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
                  {stage.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Priority" title="Target-of-opportunity handling" alt>
        <p className="prose">{pipelineToOText}</p>
      </Section>

      <Section eyebrow="Reuse" title="Running the pipeline yourself">
        <div className="split split--wide-text">
          <div>
            <p className="prose">{softwareReuseText}</p>
            <p className="note">
              Py7DT adopts a rolling-release version scheme in which the last digit is incremented
              whenever a scientific decision changes how data are processed. That version is
              recorded in every configuration file and in the process status database, so any
              product can be traced to the code that made it — and reprocessed in bulk when the
              code changes.
            </p>
          </div>
          <div className="panel panel--alt">
            <div className="panel__title">External engines</div>
            <div className="table-wrap" style={{ border: 0 }}>
              <table className="spec-table">
                <tbody>
                  {software.external.map((tool) => (
                    <tr key={tool[0]}>
                      <th scope="row" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                        {tool[0]}
                      </th>
                      <td style={{ fontFamily: 'var(--font-sans)' }}>{tool[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p className="note" style={{ marginTop: '2rem' }}>
          Full technical descriptions are given in Hyun et al., <i>Py7DT: Data Reduction Pipeline
          of the 7-Dimensional Telescope</i> (Proc. SPIE 14155-12), and in Choi et al.,
          Proc. SPIE 14151-12, which covers RTCSpy in full. See{' '}
          <a href="/publication/list">Publications</a>.
        </p>
      </Section>
    </PageLayout>
  );
};

export default Index;
