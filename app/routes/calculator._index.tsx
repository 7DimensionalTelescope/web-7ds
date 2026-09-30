import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import { tools, type Tool } from '../lib/calculators';

export const meta: MetaFunction = () => [
  { title: 'Observation calculators · 7DT for users' },
  {
    name: 'description',
    content:
      'Four calculators for planning a 7DT observation: target visibility, exposure time and signal-to-noise, observing overhead, and which survey tiles cover a position.',
  },
];

const Index = () => (
  <PageLayout menu="manuUsers">
    <PageHero
      eyebrow="For users"
      title="Observation calculators"
      lede="Four calculators for planning a 7DT observation."
      image="/img/hero/computer.jpg"
    />

    <Section eyebrow="The set" title="Which one answers your question">
      <div className="grid grid-cols-2">
        {/* Straight to the calculator, in its own tab: a page in between only
            asked the reader to click again. */}
        {tools.map((tool: Tool) => (
          <a
            className="theme-card"
            href={tool.url}
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

export default Index;
