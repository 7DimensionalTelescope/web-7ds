import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import calculators from './content/calculators.json';
import { tools } from '../components/calculatorpage';

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
      lede="Four questions stand between a target and a request that can be scheduled: when it is up, how long it needs, what that costs in clock time, and which survey tiles it falls on. One calculator each."
      image="/img/hero/computer.jpg"
      meta={[
        { value: '4', label: 'Calculators' },
        { value: '100', unit: 's', label: 'Default exposure' },
        { value: '3', label: 'Default frames' },
        { value: 'Live', label: 'Array configuration' },
      ]}
    />

    <Section eyebrow="The set" title="Which one answers your question">
      <div className="grid grid-cols-2">
        {tools.map((tool) => (
          <Link className="theme-card" to={`/calculator/${tool.slug}`} key={tool.slug}>
            <span className="theme-card__index">{tool.n}</span>
            <h3 className="theme-card__title">{tool.name}</h3>
            <p className="theme-card__body">{tool.question}</p>
          </Link>
        ))}
      </div>

      <p className="footnote" style={{ marginTop: '2rem' }}>
        {calculators.shared}
      </p>
    </Section>

    <Section eyebrow="Order" title="Planning an observation" alt>
      <p className="prose">
        Taken in order they answer a proposal. <Link to="/calculator/visibility">Visibility</Link>{' '}
        decides whether the target can be observed at all in the window you have in mind, and for
        how many hours a night.{' '}
        <Link to="/calculator/exposure">The exposure calculator</Link> turns the signal-to-noise
        the science needs into a time per filter, or a time into the depth it reaches.{' '}
        <Link to="/calculator/overhead">The overhead calculator</Link> adds what the array spends
        slewing, changing filters, focusing and reading out, which is the difference between the
        integration time and the time a request actually costs. And{' '}
        <Link to="/calculator/tiles">the tile matcher</Link> places the target on the survey grid,
        where an observation coadds with the data already there.
      </p>
      <p className="prose">
        What a request has to specify, and who may submit one, are under{' '}
        <Link to="/users/propose">how to propose</Link>. The measured performance these calculators
        predict against is on the <Link to="/users/performance">performance page</Link>.
      </p>
      <div className="btn-row" style={{ marginTop: '2rem' }}>
        <Link className="btn btn--primary" to="/users/propose">
          How to propose
        </Link>
        <Link className="btn btn--secondary" to="/users/performance">
          Measured performance
        </Link>
        <Link className="btn btn--secondary" to="/users/software">
          Software
        </Link>
      </div>
    </Section>
  </PageLayout>
);

export default Index;
