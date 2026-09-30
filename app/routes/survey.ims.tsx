import React from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import SurveyPage from '../components/surveypage';
import FieldMap from '../components/fieldmap';
import { getStatus, getTilesNear } from '../lib/portal.server';
import surveys from '../content/data/surveys.json';
import { fillAll, metaOf, type Formats } from '../lib/page';
import page from '../content/pages/survey/ims.json';

export const meta: MetaFunction = () => metaOf(page);

const CACHE = 'public, max-age=900, stale-while-revalidate=86400';
export const headers: HeadersFunction = () => ({ 'Cache-Control': CACHE });

/* Field center, from the survey definition. */
const CENTER = { ra: 78.28, dec: -60.47 };

export async function loader() {
  const status = await getStatus();
  /* The field and its neighbors, and nothing else. Shipping the whole tile
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

const FORMATS: Formats = { num: (value: number) => value.toLocaleString('en-US') };

const tier = surveys.tiers.find((t) => t.code === 'IMS')!;

const Index = () => {
  const { field, ims, live, generatedAt } = useLoaderData<typeof loader>();

  const cycles = Object.values(ims.cycles_per_tile) as number[];
  const median = [...cycles].sort((a, b) => a - b)[Math.floor(cycles.length / 2)];

  // Five years of observable nights is the plan the field was budgeted for;
  // the bar is the median tile against that, not against a fixed end date.
  const planned = 5 * 250;

  const content = fillAll(page, { ims, tier, median }, FORMATS);

  return (
    <SurveyPage
      content={content}
      tier={tier}
      live={live}
      generatedAt={generatedAt}
      mapNode={
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
          valueLabel={content.map.valueLabel}
          caption={content.map.caption}
        />
      }
      percent={Math.min(100, Math.round((median / planned) * 100))}
    />
  );
};

export default Index;
