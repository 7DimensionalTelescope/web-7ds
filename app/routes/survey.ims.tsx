import React from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import SurveyPage from '../components/surveypage';
import FieldMap from '../components/fieldmap';
import { getStatus, getTilesNear } from '../lib/portal.server';
import surveys from './content/surveys.json';

export const meta: MetaFunction = () => [
  { title: 'Intensive Monitoring Survey · 7DT' },
  {
    name: 'description',
    content:
      'The deep, nightly survey of 7DS: seven tiles at the south ecliptic pole, overlapping the SPHEREx Deep Field South.',
  },
];

const CACHE = 'public, max-age=900, stale-while-revalidate=86400';
export const headers: HeadersFunction = () => ({ 'Cache-Control': CACHE });

/* Field centre, from the survey definition. */
const CENTER = { ra: 78.28, dec: -60.47 };

export async function loader() {
  const status = await getStatus();
  /* The field and its neighbours, and nothing else. Shipping the whole tile
     list to draw a few dozen would be fifty kilobytes to show a speck. */
  const field = await getTilesNear(CENTER.ra, CENTER.dec, 3.4);

  return json(
    {
      field: field.data,
      ims: status.data.ims,
      live: status.live && field.live,
      generatedAt: status.generatedAt,
    },
    { headers: { 'Cache-Control': CACHE } }
  );
}

const num = (value: number) => value.toLocaleString('en-US');

const tier = surveys.tiers.find((t) => t.code === 'IMS')!;

const Index = () => {
  const { field, ims, live, generatedAt } = useLoaderData<typeof loader>();

  const cycles = Object.values(ims.cycles_per_tile) as number[];
  const median = [...cycles].sort((a, b) => a - b)[Math.floor(cycles.length / 2)];

  // Five years of observable nights is the plan the field was budgeted for;
  // the bar is the median tile against that, not against a fixed end date.
  const planned = 5 * 250;

  return (
    <SurveyPage
      code="IMS"
      name="Intensive Monitoring Survey"
      lede="Seven tiles at the south ecliptic pole, observed every available night with the full medium-band set."
      image="/img/hero/status.jpg"
      heroMeta={[
        { value: num(median), label: 'Cycles, median tile', live: true },
        { value: '8.5', unit: 'deg²', label: 'Survey area' },
        { value: '1', unit: 'd', label: 'Cadence' },
        { value: 'April 2025', label: 'Started' },
      ]}
      tradeoff={tier.tradeoff}
      goal={tier.goal}
      rationale={tier.rationale}
      parameters={[
        ['Area', tier.area],
        ['Field', tier.region],
        ['Field center', 'RA 05h13m07.4s, Dec −60°28′12″'],
        ['Cadence', tier.cadence],
        ['Tiles', `${ims.n_tiles}`],
        ['Time budget', '20,000 minutes per year'],
        ['Cumulative depth', '23.6 mag over five years'],
      ]}
      live={live}
      generatedAt={generatedAt}
      map={{
        title: 'The monitored field',
        node: (
          <FieldMap
            tiles={field.map((tile) => {
              const cycles = (ims.cycles_per_tile as Record<string, number>)[tile.name];
              return {
                name: tile.name,
                ra: tile.ra,
                dec: tile.dec,
                value: cycles ?? tile.visits,
                highlight: cycles !== undefined,
              };
            })}
            valueLabel="cycles"
            caption={`The ${ims.n_tiles} monitored tiles, dashed, against their neighbours on the survey tiling. Shading and the figure inside each monitored tile give the observing cycles completed on it, read from the observation database.`}
          />
        ),
        note:
          'The field covers about 8.5 square degrees near the south ecliptic pole and is drawn at its own scale, on a tangent plane, rather than on an all-sky map where it would be a few pixels across.',
      }}
      coverage={[
        { value: String(ims.n_tiles), label: 'Tiles monitored' },
        { value: num(median), label: 'Cycles, median tile' },
        { value: num(ims.min_cycles_per_tile), label: 'Fewest cycles' },
        { value: num(ims.max_cycles_per_tile), label: 'Most cycles' },
      ]}
      progress={{
        percent: Math.min(100, Math.round((median / planned) * 100)),
        label: `${ims.min_cycles_per_tile}–${ims.max_cycles_per_tile} observing cycles across ${ims.n_tiles} tiles`,
        note:
          'Progress is the median tile against a nominal five years of observable nights. Cycle counts differ between tiles because the field sets at different times through the season and because weather does not fall evenly.',
      }}
    />
  );
};

export default Index;
