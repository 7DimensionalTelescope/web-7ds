import React from 'react';
import { Link } from '@remix-run/react';
import { PageLayout, PageHero, Section, NextLinks } from './site';
import calculators from '../routes/content/calculators.json';

/* ---------------------------------------------------------------------------
   One page per observation calculator.

   The calculators are separate Streamlit applications on the project's own
   server. Each gets a page here that says what the tool answers, what to give
   it and what comes back, and then embeds the tool itself — so a reader who
   arrived from the menu can use it without being handed a bare port number,
   and one who wants the whole window has a link to it.

   The four pages ask the same questions in the same order, so they are one
   component. Everything that differs is in content/calculators.json, including
   the addresses: move a calculator to another port and every page follows.
--------------------------------------------------------------------------- */

export type Tool = {
  slug: string;
  n: string;
  name: string;
  url: string;
  question: string;
  metaDescription: string;
  lede: string;
  detail: string[];
  inputs: string[];
  outputs: string[];
  model?: string;
  limits?: string[];
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

  /* Streamlit's own header and footer are redundant inside a page that already
     has both; `embed=true` is the documented way to drop them. */
  const embedded = `${tool.url}${tool.url.includes('?') ? '&' : '?'}embed=true`;

  return (
    <PageLayout menu="manuUsers">
      <PageHero
        eyebrow={`Calculator · ${tool.n}`}
        title={tool.name}
        lede={tool.lede}
        image="/img/hero/computer.jpg"
      />

      <Section eyebrow="Purpose" title={tool.question}>
        <div className="split split--wide-text">
          <div className="prose">
            {tool.detail.map((para, k) => (
              <p key={k}>{para}</p>
            ))}
          </div>
          <div className="panel">
            <div className="panel__title">What it takes, what it returns</div>
            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
              Give it
            </p>
            <ul className="prose" style={{ paddingLeft: '1.1rem', margin: '0 0 1.25rem' }}>
              {tool.inputs.map((item) => (
                <li key={item} style={{ fontSize: '0.875rem' }}>
                  {item}
                </li>
              ))}
            </ul>
            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
              It returns
            </p>
            <ul className="prose" style={{ paddingLeft: '1.1rem', margin: 0 }}>
              {tool.outputs.map((item) => (
                <li key={item} style={{ fontSize: '0.875rem' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="footnote" style={{ marginTop: '1.5rem' }}>
          {calculators.shared}
        </p>
      </Section>

      <Section eyebrow="Use it" title={`Run the ${tool.name.toLowerCase()}`} alt wide>
        <div className="embed">
          <iframe
            className="embed__frame"
            src={embedded}
            title={`7DT ${tool.name}`}
            loading="lazy"
          />
        </div>
        <div className="embed__meta">
          <span className="embed__note">
            Runs on the project server. Nothing entered here is stored by this site.
          </span>
          <a className="link-arrow" href={tool.url} target="_blank" rel="noreferrer">
            Open in its own window
          </a>
        </div>
      </Section>

      {(tool.model || tool.limits) && (
        <Section eyebrow="Method" title="What is behind the number">
          {tool.model && <p className="prose">{tool.model}</p>}
          {tool.limits && tool.limits.length > 0 && (
            <>
              <p className="prose" style={{ marginTop: '1.5rem' }}>
                Where it stops being reliable:
              </p>
              <ul className="prose">
                {tool.limits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
          <p className="footnote" style={{ marginTop: '1.5rem' }}>
            Measured depths, delivered image quality and zero-point accuracy for the array are on
            the <Link to="/users/performance">performance page</Link>. What a request has to
            specify is under <Link to="/users/propose">how to propose</Link>.
          </p>
        </Section>
      )}

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
