import React from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import SurveyPage from '../components/surveypage';
import { getStatus, getTileMapLite } from '../lib/portal.server';
import surveys from './content/surveys.json';

export const meta: MetaFunction = () => [
  { title: 'Reference Imaging Survey · 7DT' },
  {
    name: 'description',
    content:
      'The wide-area component of the 7-Dimensional Sky Survey: one medium-band visit to every tile of the southern sky, with live coverage from the observation database.',
  },
];

const CACHE = 'public, max-age=900, stale-while-revalidate=86400';
export const headers: HeadersFunction = () => ({ 'Cache-Control': CACHE });

export async function loader() {
  const [tiles, status] = await Promise.all([getTileMapLite(), getStatus()]);
  return json(
    {
      tiles: tiles.data,
      ris: status.data.ris,
      live: status.live && tiles.live,
      generatedAt: status.generatedAt,
    },
    { headers: { 'Cache-Control': CACHE } }
  );
}

const num = (value: number) => value.toLocaleString('en-US');

const tier = surveys.tiers.find((t) => t.code === 'RIS')!;

const Index = () => {
  const { tiles, ris, live, generatedAt } = useLoaderData<typeof loader>();

  return (
    <SurveyPage
      code="RIS"
      name="Reference Imaging Survey"
      lede="One medium-band visit to every tile the array can reach, to give the southern sky a reference image against which anything that changes can be found."
      image="/img/hero/survey.jpg"
      heroMeta={[
        { value: String(ris.coverage_pct), unit: '%', label: 'Tiles observed', live: true },
        { value: '23,000', unit: 'deg²', label: 'Survey area' },
        { value: 'Single visit', label: 'Cadence' },
        { value: 'July 2024', label: 'Started' },
      ]}
      tradeoff={tier.tradeoff}
      goal={tier.goal}
      rationale={tier.rationale}
      parameters={[
        ['Area', tier.area],
        ['Region', tier.region],
        ['Cadence', tier.cadence],
        ['Visit', '3 × 100 s, coadded to 300 s'],
        ['Single-visit depth', '19.1 mag, 5σ in m600'],
        ['Tile range', 'T00000 – T25471, plus northern extension'],
      ]}
      live={live}
      generatedAt={generatedAt}
      map={{
        tiles,
        caption: `${num(tiles.count)} tiles observed`,
        note:
          'Every tile with at least one science exposure, colored by the month it was last observed. Because RIS covers everything the array can reach, this map is also the footprint of the survey as a whole.',
      }}
      coverage={[
        { value: num(ris.tiles_observed), label: 'Tiles observed', note: 'original grid' },
        { value: num(ris.tiles_defined), label: 'Tiles defined' },
        { value: String(ris.coverage_pct), unit: '%', label: 'Complete' },
        {
          value: num(ris.tiles_observed_extended),
          label: 'Including extension',
          note: `of ${num(ris.tiles_extended)}`,
        },
      ]}
      progress={{
        percent: ris.coverage_pct,
        label: `${num(ris.tiles_observed)} of ${num(ris.tiles_defined)} tiles observed`,
        note:
          'Counted over the original grid, T00000–T25471. The northern extension carries the tiling to Dec +30° and is counted separately. A full cycle is anticipated by the end of 2027.',
      }}
    />
  );
};

export default Index;
