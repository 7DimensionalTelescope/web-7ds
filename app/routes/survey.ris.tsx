import React from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import SurveyPage from '../components/surveypage';
import SkyMap from '../components/skymap';
import { getStatus, getTileMap } from '../lib/portal.server';
import { RIS_TILES } from '../lib/tilegrid';
import surveys from '../content/data/surveys.json';
import { fillAll, metaOf, type Formats } from '../lib/page';
import page from '../content/pages/survey/ris.json';

export const meta: MetaFunction = () => metaOf(page);

const CACHE = 'public, max-age=900, stale-while-revalidate=86400';
export const headers: HeadersFunction = () => ({ 'Cache-Control': CACHE });

export async function loader() {
  /* The full tile list rather than the lite one: the depth scale counts
     frames in the reference band, which needs the per-filter table. */
  const [tiles, status] = await Promise.all([getTileMap(), getStatus()]);

  /* Open-shutter time is recorded for the survey as a whole, not per tile, so
     integration time per tile is estimated from the frame count and this mean.
     Everything derived from it is labeled as an estimate. */
  const totals = status.data.totals;
  const exposureSec =
    totals && totals.science_frames > 0
      ? (totals.exposure_hours * 3600) / totals.science_frames
      : null;

  return json(
    {
      tiles: tiles.data,
      ris: status.data.ris,
      exposureSec,
      live: status.live && tiles.live,
      generatedAt: status.generatedAt,
    },
    { headers: { 'Cache-Control': CACHE } }
  );
}

const FORMATS: Formats = { num: (value: number) => value.toLocaleString('en-US') };

const tier = surveys.tiers.find((t) => t.code === 'RIS')!;

const Index = () => {
  const { tiles, ris, exposureSec, live, generatedAt } = useLoaderData<typeof loader>();
  const content = fillAll(page, { ris, tier }, FORMATS);

  return (
    <SurveyPage
      content={content}
      tier={tier}
      live={live}
      generatedAt={generatedAt}
      /* The full tool here, not the figure the home page uses: this is the
         page where a reader comes to ask about a particular piece of sky, so
         the map keeps its coordinate toggle, its pointer readout and its
         per-tile cards. */
      mapNode={
        <SkyMap
          tiles={tiles}
          planned={{ to: RIS_TILES }}
          exposureSec={exposureSec}
          depthRef={content.map.depthRef}
          caption={content.map.caption}
        />
      }
      percent={ris.coverage_pct}
    />
  );
};

export default Index;
