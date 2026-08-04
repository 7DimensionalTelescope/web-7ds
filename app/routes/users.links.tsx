import React from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { PageLayout, PageHero, Section } from '../components/site';
import { readEnv } from '../lib/portal.server';

export const meta: MetaFunction = () => [
  { title: 'Useful links · 7DT for users' },
  {
    name: 'description',
    content:
      'Project services, code repositories and documentation for users of the 7-Dimensional Telescope.',
  },
];

const CACHE = 'public, max-age=3600';
export const headers: HeadersFunction = () => ({ 'Cache-Control': CACHE });

/* The operational services sit on project infrastructure and their addresses
   are configuration, not source — the same rule the portal API follows, and for
   the same reason. Set these in .env and the entries appear; leave them unset
   and the page says the service exists but is not linked publicly. */
const SERVICES: { key: string; name: string; note: string }[] = [
  {
    key: 'LINK_WIKI',
    name: 'Project wiki',
    note: 'User manuals, quality-assurance criteria and operating procedures for internal and external users of 7DT data.',
  },
  {
    key: 'LINK_PIPELINE',
    name: 'Pipeline status',
    note: 'Real-time progress of the nightly reduction, with quality-assurance summaries per night and per unit.',
  },
  {
    key: 'LINK_TOO',
    name: 'Target-of-opportunity page',
    note: 'Observation requests and the history of follow-up campaigns, including gravitational-wave events.',
  },
  {
    key: 'LINK_PORTAL',
    name: 'Data server',
    note: 'The observation database of record: images, catalogs, processing state and data quality.',
  },
];

export async function loader() {
  return json(
    {
      services: SERVICES.map((service) => ({ ...service, url: readEnv(service.key) ?? null })),
    },
    { headers: { 'Cache-Control': CACHE } }
  );
}

const GITHUB = 'https://github.com/7DimensionalTelescope';

const CODE = [
  ['pipeline', `${GITHUB}/pipeline`, 'Py7DT — the data reduction pipeline, from preprocessing through difference imaging'],
  ['supy', `${GITHUB}/supy`, 'Target visibility, tile lookup and filter response simulation for 7DT users'],
  ['tcspy', `${GITHUB}/tcspy`, 'RTCSpy — telescope control and scheduling for the array'],
  ['Spec7DT', `${GITHUB}/Spec7DT`, 'Spectral image handling tools for 7DT users'],
  ['Spec7plot', `${GITHUB}/Spec7plot`, 'Plotting and image handling tools for 7DT users'],
  ['tract7dt', `${GITHUB}/tract7dt`, 'Tractor-based photometry pipeline for 7DT images'],
  ['gcn_bot', `${GITHUB}/gcn_bot`, 'Real-time GCN alert monitoring feeding target-of-opportunity response'],
  ['gppy', `${GITHUB}/gppy`, 'Automatic processing and transient search'],
];

const DOCS = [
  ['supy documentation', 'https://sdt-supy.readthedocs.io/en/latest/', 'Installation, module reference and worked examples'],
  ['supy examples — Observer', 'https://sdt-supy.readthedocs.io/en/latest/examples/observer.html', 'Target visibility and altitude from El Sauce'],
  ['supy examples — Tiles', 'https://sdt-supy.readthedocs.io/en/latest/examples/tiles.html', 'Tile lookup by coordinate and matching a localization region'],
  ['supy examples — Simulator', 'https://sdt-supy.readthedocs.io/en/latest/examples/simulator.html', 'Filter and detector response simulation'],
];

const Index = () => {
  const { services } = useLoaderData<typeof loader>();
  const linked = services.filter((service) => service.url);

  return (
    <PageLayout menu="manuUsers">
      <PageHero
        eyebrow="For users"
        title={
          <>
            Useful <em>links</em>
          </>
        }
        lede="Project services, code and documentation. For partner surveys, vendors and institutions, see the site-wide links page."
        image="/img/hero/computer.jpg"
      />

      <Section eyebrow="Services" title="Operational services">
        {linked.length > 0 ? (
          <ul className="feature-list">
            {linked.map((service) => (
              <li key={service.key}>
                <span className="feature-list__key">↗</span>
                <div>
                  <h3 className="feature-list__title">
                    <a href={service.url ?? '#'} target="_blank" rel="noreferrer">
                      {service.name}
                    </a>
                  </h3>
                  <p className="feature-list__body">{service.note}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="panel" style={{ maxWidth: '68ch' }}>
            <div className="panel__title">Not publicly linked</div>
            <p className="feature-list__body" style={{ marginBottom: '0.75rem' }}>
              Four services support work with 7DT data — a project wiki carrying user manuals and
              quality-assurance criteria, a pipeline status page with per-night progress, a
              target-of-opportunity page holding observation requests and campaign history, and
              the observation database itself. They run on project infrastructure and are reached
              through the collaboration rather than from this page.
            </p>
            <p className="feature-list__body" style={{ marginBottom: 0 }}>
              Ask the project for access, or see{' '}
              <Link to="/users/access">data access</Link> for what can be obtained without it.
            </p>
          </div>
        )}

        {linked.length > 0 && linked.length < services.length && (
          <p className="footnote" style={{ marginTop: '1rem' }}>
            Services not listed here are reached through the collaboration rather than from this
            page.
          </p>
        )}
      </Section>

      <Section eyebrow="Code" title="Repositories" alt>
        <p className="prose">
          All 7DT software is developed in the open on GitHub. What to install as a user, and what
          each package is for, is set out under{' '}
          <Link to="/users/software">available software</Link>.
        </p>
        <ul className="feature-list" style={{ marginTop: '2rem' }}>
          {CODE.map((item) => (
            <li key={item[0]}>
              <span className="feature-list__key" style={{ fontFamily: 'var(--font-mono)' }}>
                ↗
              </span>
              <div>
                <h3 className="feature-list__title" style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>
                  <a href={item[1]} target="_blank" rel="noreferrer">
                    {item[0]}
                  </a>
                </h3>
                <p className="feature-list__body">{item[2]}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="btn-row" style={{ marginTop: '1.5rem' }}>
          <a className="btn btn--secondary" href={GITHUB} target="_blank" rel="noreferrer">
            All repositories
          </a>
        </div>
      </Section>

      <Section eyebrow="Documentation" title="Manuals and examples">
        <ul className="feature-list">
          {DOCS.map((item) => (
            <li key={item[0]}>
              <span className="feature-list__key">↗</span>
              <div>
                <h3 className="feature-list__title">
                  <a href={item[1]} target="_blank" rel="noreferrer">
                    {item[0]}
                  </a>
                </h3>
                <p className="feature-list__body">{item[2]}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="footnote" style={{ marginTop: '1.5rem' }}>
          Instrument and pipeline papers are listed under{' '}
          <Link to="/publication/list">publications</Link>. Partner surveys, facilities, vendors
          and institutions are on the <Link to="/links">links page</Link>.
        </p>
      </Section>
    </PageLayout>
  );
};

export default Index;
