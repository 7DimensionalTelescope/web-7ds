import React from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import SurveyPage from '../components/surveypage';
import SkyMap from '../components/skymap';
import { getStatus, getTileMap } from '../lib/portal.server';
import { RIS_TILES } from '../lib/tilegrid';
import surveys from '../content/data/surveys.json';

export const meta: MetaFunction = () => [
  { title: 'Reference Imaging Survey · 7DT' },
  {
    name: 'description',
    content:
      'The wide-area survey of 7DS: one medium-band visit to every tile of the southern sky, with live coverage from the observation database.',
  },
];

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

const num = (value: number) => value.toLocaleString('en-US');

const tier = surveys.tiers.find((t) => t.code === 'RIS')!;

const Index = () => {
  const { tiles, ris, exposureSec, live, generatedAt } = useLoaderData<typeof loader>();

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
        /* The full tool here, not the figure the home page uses: this is the
           page where a reader comes to ask about a particular piece of sky, so
           the map keeps its coordinate toggle, its pointer readout and its
           per-tile cards. */
        node: (
          <SkyMap
            tiles={tiles}
            planned={{ to: RIS_TILES }}
            exposureSec={exposureSec}
            depthRef={{ mag: 19.1, sec: 300, frameSec: 100, band: 'm600' }}
            caption={`${num(ris.tiles_observed)} of ${num(ris.tiles_defined)} tiles observed`}
          />
        ),
        note:
          'The survey as designed: all 25,472 tiles of the reference grid are drawn in gray, and the ones with science exposures are colored over them, so what is left to observe is the gray. Because RIS covers everything the array can reach, this grid is also the footprint of the survey as a whole. Hover a tile for its own figures. Depth and integration time are estimates: open-shutter time is recorded for the survey rather than per tile, so integration time on a tile is its frame count times the survey mean. Depth is counted differently, against the RIS visit itself: frames in m600 at the fiducial 100 s each, measured against the 19.1 mag reached by one 3 × 100 s visit — background-limited, so the 5σ limit improves as the square root of the time. Depth counts only the frames taken in m600, since a tile visited in many filters is no deeper in any one of them.',
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
