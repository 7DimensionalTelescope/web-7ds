import React from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PageLayout, PageHero, Section } from '../components/site';
import { readEnv } from '../lib/portal.server';
import { tools } from '../lib/calculators';
import { Md } from '../components/md';
import { metaOf } from '../lib/page';
import page from '../content/pages/users/links.json';

export const meta: MetaFunction = () => metaOf(page);

const CACHE = 'public, max-age=3600';
export const headers: HeadersFunction = () => ({ 'Cache-Control': CACHE });

type Service = { key?: string; url?: string; name: string; note: string };

/* The services published by decision of the project carry their address in
   the content file. The data server does not: its address stays
   configuration, in LINK_PORTAL, the same rule the portal API follows and for
   the same reason. A service with a `key` appears only when that variable is
   set, and otherwise the page says the service exists but is not linked. Only
   LINK_ variables are read, so an edit to the content file cannot put any
   other configuration — the portal API base above all — into a page. */
const SERVICES = page.services.list as Service[];
const configured = (key?: string) => (key && key.startsWith('LINK_') ? readEnv(key) : undefined);

export async function loader() {
  return json(
    {
      services: SERVICES.map((service) => ({
        ...service,
        url: service.url ?? configured(service.key) ?? null,
      })),
    },
    { headers: { 'Cache-Control': CACHE } }
  );
}

const Index = () => {
  const { services } = useLoaderData<typeof loader>();
  const linked = services.filter((service) => service.url);
  const { hero, services: section, calculators } = page;

  return (
    <PageLayout menu="manuUsers">
      <PageHero eyebrow={hero.eyebrow} title={<Md>{hero.title}</Md>} lede={hero.lede} image={hero.image} />

      <Section eyebrow={section.eyebrow} title={section.title}>
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
                  <p className="feature-list__body">
                    <Md>{service.note}</Md>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="panel" style={{ maxWidth: '68ch' }}>
            <div className="panel__title">{section.noneLinked.title}</div>
            {section.noneLinked.body.map((para, k, all) => (
              <p
                key={k}
                className="feature-list__body"
                style={{ marginBottom: k === all.length - 1 ? 0 : '0.75rem' }}
              >
                <Md>{para}</Md>
              </p>
            ))}
          </div>
        )}

        {linked.length > 0 && linked.length < services.length && (
          <p className="footnote" style={{ marginTop: '1rem' }}>
            <Md>{section.someUnlinked}</Md>
          </p>
        )}
      </Section>

      {/* The calculators used to have a menu entry and a page of their own.
          They are tools a user opens, like the services above, so they sit
          with them. Each opens straight into the tool. */}
      <Section id={calculators.id} eyebrow={calculators.eyebrow} title={calculators.title} alt>
        <div className="grid grid-cols-2">
          {tools.map((tool) => (
            <a
              className="theme-card"
              href={tool.path}
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
