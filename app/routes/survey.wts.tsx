import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Section } from '../components/site';
import SurveyPage from '../components/surveypage';
import surveys from './content/surveys.json';

export const meta: MetaFunction = () => [
  { title: 'Wide-area Time-domain Survey · 7DT' },
  {
    name: 'description',
    content:
      'The time-domain component of the 7-Dimensional Sky Survey: 800–1,200 deg² revisited every 10–14 days over five years, in fields with existing near-infrared coverage.',
  },
];

const tier = surveys.tiers.find((t) => t.code === 'WTS')!;

const Index = () => (
  <SurveyPage
    code="WTS"
    name="Wide-area Time-domain Survey"
    lede="A moderately wide area revisited every 10 to 14 days for five years, in fields where near-infrared data already exist."
    image="/img/hero/survey.jpg"
    heroMeta={[
      { value: '800–1,200', unit: 'deg²', label: 'Survey area' },
      { value: '10–14', unit: 'd', label: 'Cadence' },
      { value: '90–100', label: 'Visits per tile' },
      { value: '2026', label: 'Commencing' },
    ]}
    tradeoff={tier.tradeoff}
    goal={tier.goal}
    rationale={tier.rationale}
    parameters={[
      ['Area', tier.area],
      ['Field selection', tier.region],
      ['Cadence', tier.cadence],
      ['Visits per tile', '90–100 over five years'],
      ['Cumulative depth', '22.0–22.5 mag in most medium bands'],
      ['Status', tier.statusLabel],
    ]}
    live={false}
  >
    {/* No map and no coverage figures: the survey has not started, and an empty
        map with zeros in it would suggest that it had. */}
    <Section eyebrow="Status" title="Not yet started">
      <div className="panel" style={{ maxWidth: '68ch' }}>
        <div className="panel__title">Field selection under consideration</div>
        <p className="feature-list__body" style={{ marginBottom: 0 }}>
          WTS is scheduled to commence in 2026. Fields are being selected to overlap existing
          near-infrared coverage — the VISTA Kilo-degree Infrared Galaxy survey footprint and the
          Vera C. Rubin Observatory Deep Drilling Fields are the leading candidates — so that 7DT
          medium-band photometry is complemented at wavelengths the array cannot reach. Until
          observations begin there is no coverage to report; tiles observed under the Reference
          Imaging Survey in these fields already exist and are shown on the{' '}
          <a href="/survey/coverage">sky coverage map</a>.
        </p>
      </div>
    </Section>

    <Section eyebrow="Science" title="What the cadence is chosen for" alt>
      <p className="prose">{tier.depthRange}</p>
      <p className="prose">
        Stacking 90 to 100 visits also reaches 22.0–22.5 mag across most of the medium bands,
        deep enough for photometric redshifts on galaxies well below the single-visit limit.
        Forecast redshift precision for the stacked survey is given under{' '}
        <a href="/science/sci#cosmology">cosmology and photometric redshifts</a>.
      </p>
    </Section>
  </SurveyPage>
);

export default Index;
