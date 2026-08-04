import React from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Section } from '../components/site';
import SurveyPage from '../components/surveypage';
import { getStatus, getTileMapLite } from '../lib/portal.server';
import surveys from './content/surveys.json';

export const meta: MetaFunction = () => [
  { title: 'Intensive Monitoring Survey · 7DT' },
  {
    name: 'description',
    content:
      'The deep, nightly component of the 7-Dimensional Sky Survey: seven tiles at the south ecliptic pole, overlapping the SPHEREx Deep Field South.',
  },
];

const CACHE = 'public, max-age=900, stale-while-revalidate=86400';
export const headers: HeadersFunction = () => ({ 'Cache-Control': CACHE });

export async function loader() {
  // Names are needed here: the map draws these seven tiles against the rest of
  // the footprint, and it picks them out by identifier.
  const [tiles, status] = await Promise.all([getTileMapLite(true), getStatus()]);
  return json(
    {
      tiles: tiles.data,
      ims: status.data.ims,
      live: status.live && tiles.live,
      generatedAt: status.generatedAt,
    },
    { headers: { 'Cache-Control': CACHE } }
  );
}

const num = (value: number) => value.toLocaleString('en-US');

const tier = surveys.tiers.find((t) => t.code === 'IMS')!;

const Index = () => {
  const { tiles, ims, live, generatedAt } = useLoaderData<typeof loader>();

  const names = Object.keys(ims.cycles_per_tile);
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
        tiles,
        emphasize: names,
        caption: `${ims.n_tiles} monitored tiles`,
        note:
          'The seven monitored tiles are drawn in color against the rest of the observed footprint in grey, so their position on the sky is visible at the scale it actually occupies — about 8.5 square degrees out of 23,000.',
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
    >
      <Section eyebrow="Per tile" title="Observing cycles by tile" alt>
        <div className="table-wrap" style={{ maxWidth: '480px' }}>
          <table className="spec-table">
            <caption>Cycles completed on each monitored tile</caption>
            <tbody>
              {Object.entries(ims.cycles_per_tile).map(([tile, count]) => (
                <tr key={tile}>
                  <th scope="row" style={{ fontFamily: 'var(--font-mono)' }}>
                    {tile}
                  </th>
                  <td>{num(count as number)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </SurveyPage>
  );
};

export default Index;
