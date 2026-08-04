import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import { publicationPolicyText } from './content/text';

export const meta: MetaFunction = () => [
  { title: 'Using the data · 7DT for users' },
  {
    name: 'description',
    content:
      'Terms of use, publication policy and acknowledgment for 7DT data, and what to know before working with it.',
  },
];

const Index = () => (
  <PageLayout menu="manuUsers">
    <PageHero
      eyebrow="For users"
      title={
        <>
          Using the <em>data</em>
        </>
      }
      lede="Who may use 7DT data, on what terms, and what to know before working with it."
      image="/img/hero/data.jpg"
    />

    <Section id="policy" eyebrow="Policy" title="Data rights and publication">
      <div className="split split--wide-text">
        <div>
          <p className="prose">{publicationPolicyText}</p>
          <p className="prose">
            Until the policy is ratified, anyone intending to publish results based on 7DT data
            should contact the principal investigator in advance so that collaboration authorship
            and funding acknowledgments can be agreed. Observations obtained as
            target-of-opportunity follow-up carry the same expectation.
          </p>
        </div>
        <div className="panel">
          <div className="panel__title">Acknowledgment</div>
          <p className="feature-list__body" style={{ marginBottom: 0 }}>
            Publications using 7DT data should acknowledge the 7-Dimensional Telescope and its
            funding bodies. The current wording is on the{' '}
            <Link to="/about/funding">funding page</Link>, and the instrument and pipeline should
            be cited from <Link to="/publication/list">publications</Link>.
          </p>
        </div>
      </div>
    </Section>

    <Section eyebrow="Before you start" title="Four things to know" alt>
      <ul className="feature-list">
        <li>
          <span className="feature-list__key">01</span>
          <div>
            <h3 className="feature-list__title">Every image carries its own quality flags</h3>
            <p className="feature-list__body">
              Check <code>SANITY</code> before using a frame: false means the pipeline judged the
              image unusable and recorded the stage at which it did so. Measured seeing, depth,
              ellipticity and astrometric precision are in the header of every product.
            </p>
          </div>
        </li>
        <li>
          <span className="feature-list__key">02</span>
          <div>
            <h3 className="feature-list__title">Coadd pixels are already in flux units</h3>
            <p className="feature-list__body">
              Coadds are scaled to a zero point of 23.9 AB, which puts pixel values directly in
              microjansky — convenient for the pixel-based analysis that medium-band data invite,
              but a departure from the counts other archives deliver.
            </p>
          </div>
        </li>
        <li>
          <span className="feature-list__key">03</span>
          <div>
            <h3 className="feature-list__title">Not every band is calibrated to the same standard</h3>
            <p className="feature-list__body">
              The original twenty medium bands are the calibrated set. The fifteen filters added in
              late 2025 are in operational use but their spectrophotometric calibration is still in
              preparation. Measured depths per band are on the{' '}
              <Link to="/users/performance">performance page</Link>.
            </p>
          </div>
        </li>
        <li>
          <span className="feature-list__key">04</span>
          <div>
            <h3 className="feature-list__title">Products can be traced back to their inputs</h3>
            <p className="feature-list__body">
              A dependency record links each output to the coadds, processed singles and master
              frames it was built from, and the pipeline version that produced it is recorded with
              the product.
            </p>
          </div>
        </li>
      </ul>
    </Section>

    <Section eyebrow="Next" title="Where the rest is">
      <p className="prose">
        What the pipeline produces, in what units, with what recorded alongside it — and how to
        obtain it in the first place — are on the data access page. How to reprocess it yourself is
        under available software.
      </p>
      <div className="btn-row" style={{ marginTop: '1.5rem' }}>
        <Link className="btn btn--primary" to="/users/access">
          Data access and format
        </Link>
        <Link className="btn btn--secondary" to="/users/software">
          Software
        </Link>
        <Link className="btn btn--secondary" to="/users/performance">
          Measured performance
        </Link>
      </div>
    </Section>

  </PageLayout>
);

export default Index;
