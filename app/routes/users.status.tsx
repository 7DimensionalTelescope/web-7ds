import React from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { PageLayout, PageHero, Section, StatGrid, LiveBadge } from '../components/site';
import { getStatus } from '../lib/portal.server';

export const meta: MetaFunction = () => [
  { title: 'Status & overview · 7DT for users' },
  {
    name: 'description',
    content:
      'What 7DT can observe now and what data exist: telescopes and filters available, survey coverage, measured depths and processing status.',
  },
];

const CACHE = 'public, max-age=900, stale-while-revalidate=86400';
export const headers: HeadersFunction = () => ({ 'Cache-Control': CACHE });

export async function loader() {
  const status = await getStatus();
  return json(status, { headers: { 'Cache-Control': CACHE } });
}

/* The medium-band set as installed. The original twenty are on a regular 25 nm
   spacing; the fifteen added in late 2025 fill the gaps and are not regularly
   spaced, which is why they are listed separately rather than merged. */
const BANDS_ORIGINAL = [
  400, 425, 450, 475, 500, 525, 550, 575, 600, 625, 650, 675, 700, 725, 750, 775, 800, 825, 850,
  875,
];
const BANDS_ADDED = [375, 386, 412, 438, 462, 483, 512, 534, 561, 586, 615, 640, 661, 769, 832];

const num = (value: number, digits = 0) =>
  value.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

const day = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const Index = () => {
  const { data, live, generatedAt } = useLoaderData<typeof loader>();
  const { telescopes, ris, nightly, totals } = data;

  return (
    <PageLayout menu="manuUsers">
      <PageHero
        eyebrow="For users"
        title={
          <>
            Status &amp; <em>overview</em>
          </>
        }
        lede="What the array can observe at the moment, and what data already exist. Start here before planning an observation or a data request."
        image="/img/hero/data.jpg"
        meta={[
          {
            value: String(telescopes.online),
            label: 'Telescopes available',
            note: `of ${telescopes.total}`,
            live: true,
          },
          { value: '35', label: 'Filters installed', note: 'of 40 medium bands' },
          { value: String(ris.coverage_pct), unit: '%', label: 'Sky referenced' },
          { value: day(nightly.last_night), label: 'Last night observed' },
        ]}
      />

      <Section eyebrow="Availability" title="What is on sky tonight">
        <div style={{ marginBottom: '1.5rem' }}>
          <LiveBadge live={live} updated={generatedAt} interval="every 30 minutes" />
        </div>

        <p className="prose">
          {telescopes.online} of {telescopes.total} telescopes are in routine operation. Units not
          listed as online are either awaiting installation or out of service for maintenance. Each
          operational unit carries a nine-slot filter wheel holding Sloan broad bands and a share
          of the medium-band set, so the number of distinct bands available on a given night
          depends on how many units are observing.
        </p>

        <div style={{ marginTop: '2rem' }}>
          <StatGrid
            items={[
              {
                value: String(telescopes.online),
                label: 'Telescopes online',
                note: `of ${telescopes.total}`,
                live: true,
              },
              { value: num(nightly.n_nights), label: 'Nights observed' },
              { value: num(totals.science_frames), label: 'Science frames' },
              {
                value: num(nightly.exposures_per_night.median),
                label: 'Exposures per night',
                note: 'median',
              },
            ]}
          />
        </div>
      </Section>

      <Section eyebrow="Filters" title="Bands available" alt>
        <div className="split split--wide-text">
          <div>
            <p className="prose">
              The filter set is what distinguishes 7DT from other survey arrays. Twenty medium
              bands of 25 nm width are spaced regularly at 25 nm from 400 to 875 nm. Fifteen
              further filters, installed in late 2025, fall between them with central wavelengths
              from 375 to 832 nm and bandwidths of 14 to 41 nm. Sloan g, r and i are carried by
              every unit; u is carried by one and z by three.
            </p>
            <p className="prose">
              The original twenty are the calibrated set in operational use. Spectrophotometric
              calibration of the fifteen added filters is in preparation, and their central
              wavelengths are not aligned to a regular grid — check which bands a given tile
              actually carries on the{' '}
              <Link to="/survey/coverage">sky coverage map</Link>, which reports the medium bands
              observed on any tile under the pointer.
            </p>

            <div className="table-wrap" style={{ marginTop: '1.5rem' }}>
              <table className="spec-table">
                <caption>Medium bands, central wavelength in nm</caption>
                <tbody>
                  <tr>
                    <th scope="row">Original set (25 nm spacing)</th>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                      {BANDS_ORIGINAL.join(', ')}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Added 2025 (irregular)</th>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                      {BANDS_ADDED.join(', ')}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Broad bands</th>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                      u, g, r, i, z
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <figure className="figure">
            <img
              src="/img/filter.png"
              alt="Transmission curves of the 7DT medium-band filter set from 375 to 875 nm"
              loading="lazy"
            />
            <figcaption>
              <b>Transmission</b> Medium-band filter transmission across the operational set.
              Response curves for individual filters can also be generated with the{' '}
              <code>supy</code> simulator — see <a href="/users/software">software</a>.
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section eyebrow="Coverage" title="What has been observed">
        <p className="prose">
          {ris.coverage_pct} percent of the reference tiling has been observed at least once:{' '}
          {num(ris.tiles_observed)} of {num(ris.tiles_defined)} tiles. A tile with data has
          calibrated images and a source catalog. Coverage per tile, including which bands were
          taken and how many frames exist, is on the sky coverage map.
        </p>
        <div className="btn-row" style={{ marginTop: '1.5rem' }}>
          <Link className="btn btn--primary" to="/survey/coverage">
            Sky coverage map
          </Link>
          <Link className="btn btn--secondary" to="/users/performance">
            Measured depths
          </Link>
          <Link className="btn btn--secondary" to="/users/access">
            Requesting data
          </Link>
        </div>
      </Section>

      <Section eyebrow="Processing" title="Processing status" alt>
        <p className="prose">
          Data are reduced the same day they are taken. Raw frames are transferred from Chile
          overnight and a typical night clears the pipeline in about five hours of wall-clock time
          after transfer completes, so survey data are normally available the following day.
          Target-of-opportunity data skip compression and the wait for sunrise, which brings
          latency down to tens of minutes. What the pipeline produces, and the quality metrics
          attached to each product, are described under{' '}
          <Link to="/users/format">data format</Link>.
        </p>
      </Section>
    </PageLayout>
  );
};

export default Index;
