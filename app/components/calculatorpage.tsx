import React from 'react';
import { PageLayout, PageHero, Section, NextLinks } from './site';
import calculators from '../routes/content/calculators.json';

/* ---------------------------------------------------------------------------
   One page per observation calculator.

   The calculators are Streamlit applications. The intent is that they are
   served from this site rather than from the machine they run on, so that a
   reader never sees a bare host and port — see deploy/calculators.nginx.conf,
   which proxies /calculator/<slug>/app/ to them. Until that is in place the
   page links out instead of framing: this site is served over HTTPS with a
   `default-src 'self'` content-security policy, so a cross-origin frame is
   blocked by the browser whatever the frame contains.
--------------------------------------------------------------------------- */

export type Tool = {
  slug: string;
  n: string;
  name: string;
  url: string;
  question: string;
  metaDescription: string;
};

export const tools = calculators.tools as Tool[];

export function getTool(slug: string): Tool {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) throw new Response(`Unknown calculator: ${slug}`, { status: 404 });
  return tool;
}

export function calculatorMeta(slug: string) {
  const tool = getTool(slug);
  return [
    { title: `${tool.name} · 7DT calculators` },
    { name: 'description', content: tool.metaDescription },
  ];
}

export default function CalculatorPage({ slug }: { slug: string }) {
  const tool = getTool(slug);
  const index = tools.findIndex((t) => t.slug === slug);
  const previous = index > 0 ? tools[index - 1] : undefined;
  const next = index < tools.length - 1 ? tools[index + 1] : undefined;

  return (
    <PageLayout menu="manuUsers">
      <PageHero
        eyebrow={`Calculator · ${tool.n}`}
        title={tool.name}
        lede={tool.question}
        image="/img/hero/computer.jpg"
      />

      <Section eyebrow="Open" title={tool.name}>
        <div className="btn-row">
          <a className="btn btn--primary" href={tool.url} target="_blank" rel="noreferrer">
            Open the {tool.name.toLowerCase()}
          </a>
        </div>
      </Section>

      <Section eyebrow="Continue" title="Other calculators" alt>
        <NextLinks
          links={[
            ...(previous ? [{ label: `← ${previous.name}`, href: `/calculator/${previous.slug}` }] : []),
            ...(next ? [{ label: `${next.name} →`, href: `/calculator/${next.slug}` }] : []),
            { label: 'All calculators', href: '/calculator' },
          ]}
        />
      </Section>
    </PageLayout>
  );
}
