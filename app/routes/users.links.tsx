import React from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { PageLayout, PageHero, Section } from '../components/site';
import { readEnv } from '../lib/portal.server';
import { tools } from '../lib/calculators';

export const meta: MetaFunction = () => [
  { title: 'Useful links · 7DT for users' },
  {
    name: 'description',
    content:
      'Project services and observation calculators for users of the 7-Dimensional Telescope.',
  },
];

const GITHUB = 'https://github.com/7DimensionalTelescope';

const CACHE = 'public, max-age=3600';
export const headers: HeadersFunction = () => ({ 'Cache-Control': CACHE });

/* Three of these are published by decision of the project and are written here.
   The data server is not: its address stays configuration, in LINK_PORTAL,
   the same rule the portal API follows and for the same reason. A service with
   a `url` is always shown; one with a `key` appears only when that variable is
   set, and otherwise the page says the service exists but is not linked. */
const SERVICES: { key?: string; url?: string; name: string; note: string }[] = [
  {
    url: 'https://proton.snu.ac.kr',
    name: 'Project wiki',
    note: 'User manuals, quality-assurance criteria and operating procedures for internal and external users of 7DT data.',
  },
  {
    url: 'https://proton.snu.ac.kr/pipeline',
    name: 'Pipeline status',
    note: 'Real-time progress of the nightly reduction, with quality-assurance summaries per night and per unit.',
  },
  {
    url: 'https://proton.snu.ac.kr/too',
    name: 'Target-of-opportunity page',
    note: 'Observation requests and the history of follow-up campaigns, including gravitational-wave events.',
  },
  {
    key: 'LINK_PORTAL',
    name: 'Data server',
    note: 'The observation database of record: images, catalogs, processing state and data quality.',
  },
  {
    url: GITHUB,
    name: '7DT on GitHub',
    note: 'The project organization. Every repository listed below lives here, including the pipeline, the control system and supy.',
  },
];

export async function loader() {
  return json(
    {
      services: SERVICES.map((service) => ({
        ...service,
        url: service.url ?? (service.key ? readEnv(service.key) : null) ?? null,
      })),
    },
    { headers: { 'Cache-Control': CACHE } }
  );
}

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
        lede="The services that support work with 7DT data. For partner surveys, vendors and institutions, see the site-wide links page."
        image="/img/hero/computer.jpg"
      />

      <Section eyebrow="Services" title="Project services">
        {linked.length > 0 ? (
          <ul className="feature-list">
            {linked.map((service) => (
              <li key={service.name}>
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

      {/* The calculators used to have a menu entry and a page of their own.
          They are tools a user opens, like the services above, so they sit
          with them. Each opens straight into the tool. */}
      <Section id="calculators" eyebrow="Calculators" title="Observation calculators" alt>
        <div className="grid grid-cols-2">
          {tools.map((tool) => (
            <a
              className="theme-card"
              href={`/calculator/${tool.slug}`}
              target="_blank"
              rel="noreferrer"
              key={tool.slug}
            >
              <span className="theme-card__index">{tool.n}</span>
              <h3 className="theme-card__title">{tool.name}</h3>
              <p className="theme-card__body">{tool.question}</p>
            </a>
          ))}
        </div>
      </Section>

    </PageLayout>
  );
};

export default Index;
