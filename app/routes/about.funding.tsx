import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import {
  fundingGWText,
  fundingNRFText,
  fundingKASIText,
  fundingKreonetText,
} from './content/text';

export const meta: MetaFunction = () => [
  { title: 'Funding · 7-Dimensional Telescope' },
  {
    name: 'description',
    content: 'Grants and institutions supporting the 7-Dimensional Telescope and Sky Survey.',
  },
];

/* Project-level awards only. Individual investigator grants are listed
   separately below — conflating the two misrepresents colleagues' funding. */
const PROJECT_GRANTS = [
  ['NRF 2021M3F7A1084525', 'Center for the Gravitational-wave Universe (MSIT)'],
  ['NRF RS-2026-25490019', 'Project support (MSIT)'],
  ['KASI', 'Special funding toward 7DT operations'],
  ['KREONET / KISTI', 'Research network carrying nightly data transfer'],
];

const INDIVIDUAL_GRANTS = [
  ['J. H. Kim', 'NRF RS-2026-25487912'],
  ['S.-W. Chang', 'NRF RS-2023-00245013 (MoE); RS-2026-25489059 (MSIT)'],
  ['D. Tak', 'NRF RS-2024-00343729'],
  ['H. Choi', 'NRF RS-2025-00573214'],
];

const Index = () => {
  return (
    <PageLayout menu="manuAbout">
      <PageHero
        eyebrow="About"
        title="Funding sources"
        lede="7DT exists because of sustained public investment in gravitational-wave astronomy and in the research network that carries its data across the Pacific each night."
        image="/img/hero/about.jpg"
      />

      <Section eyebrow="Host centre" title="Center for the Gravitational-wave Universe">
        <div className="split split--wide-text">
          <p className="prose">{fundingGWText}</p>
          <figure className="figure">
            <img
              src="/img/institutes/gwuniv.png"
              alt="Center for the Gravitational-wave Universe"
              style={{ padding: '2rem', background: '#fff' }}
              loading="lazy"
            />
          </figure>
        </div>
      </Section>

      <Section eyebrow="Agencies" title="Project support" alt>
        <div className="split split--wide-text">
          <div>
            <p className="prose">{fundingNRFText}</p>
            <p className="prose">{fundingKASIText}</p>
          </div>
          <figure className="figure">
            <img
              src="/img/institutes/nrf.jpg"
              alt="National Research Foundation of Korea"
              style={{ padding: '2rem', background: '#fff' }}
              loading="lazy"
            />
          </figure>
        </div>

        <div className="split" style={{ marginTop: '2.5rem' }}>
          <div className="table-wrap">
            <table className="spec-table">
              <caption>Project-level support</caption>
              <tbody>
                {PROJECT_GRANTS.map((grant) => (
                  <tr key={grant[0]}>
                    <th scope="row" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                      {grant[0]}
                    </th>
                    <td style={{ fontFamily: 'var(--font-sans)' }}>{grant[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-wrap">
            <table className="spec-table">
              <caption>Individual investigator support</caption>
              <tbody>
                {INDIVIDUAL_GRANTS.map((grant) => (
                  <tr key={grant[0]}>
                    <th scope="row">{grant[0]}</th>
                    <td style={{ fontSize: '0.8125rem' }}>{grant[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section eyebrow="Infrastructure" title="KREONET / KISTI">
        <p className="prose">{fundingKreonetText}</p>
      </Section>

      <Section eyebrow="Citation" title="How to acknowledge 7DT" alt>
        <p className="prose">
          Work using 7DT data should acknowledge the Center for the Gravitational-wave Universe at
          Seoul National University, National Research Foundation of Korea grants No.
          2021M3F7A1084525 and RS-2026-25490019, the special funding of the Korea Astronomy and
          Space Science Institute, and KREONET/KISTI. The collaboration publication policy sets out
          the expected wording; see the <a href="/publication/policy">publication policy</a> page.
        </p>
      </Section>
    </PageLayout>
  );
};

export default Index;
