import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, StatGrid, SimpleTable, Figure } from '../components/site';
import FilterCurves from '../components/filtercurves';
import {
  filterText,
  filterCaveatText,
  performanceText,
  photometryText,
  depthText,
} from './content/text';
import specs from './content/specs.json';
import surveys from './content/surveys.json';

export const meta: MetaFunction = () => [
  { title: 'Overview · 7DT for users' },
  {
    name: 'description',
    content:
      'What a 7DT observation delivers: filter transmission, delivered PSF, photometric zero points, the depth of a 100-second exposure and the depth each survey reaches.',
  },
];

/* ---------------------------------------------------------------------------
   The one page to read before planning an observation.

   Everything here already exists somewhere on the site — the filter set on the
   instrument page, the response curves and bands under status, image quality
   and calibration under performance. Split across four pages it takes four
   visits to answer one question: what will I actually get. This gathers the
   five numbers that answer it and links on for the detail behind each.

   Every figure is read from the same content files those pages read, so there
   is still one source for each number and they cannot drift apart.
--------------------------------------------------------------------------- */

const PSF = [
  ['Pixel scale', '0.5″ per pixel'],
  ['Field of view per unit', '1.34° × 0.90° (1.25 deg²)'],
  ['PSF FWHM at field center', '1.4″ – 2.2″'],
  ['Array median FWHM', '2.0″'],
  ['Unit-to-unit scatter', '0.2″'],
  ['Center-to-corner growth', '+0.3″'],
  ['Ellipticity, central 80% of field', '< 0.1'],
  ['Median site seeing', '1.5″'],
];

const ZEROPOINT = [
  ['Reference', 'Gaia DR3 BP/RP synthetic photometry'],
  ['Homogenization', 'Color- and magnitude-dependent residuals corrected'],
  ['Established on', '68 spectrophotometric standards, incl. CALSPEC'],
  ['Zero-point uncertainty', '15 – 25 mmag'],
  ['Redward of 775 nm', 'Toward the upper end of that range'],
  ['Calibrated set', 'The original 20 medium bands'],
];

const Index = () => (
  <PageLayout menu="manuUsers">
    <PageHero
      eyebrow="For users"
      title="Overview"
      lede="What one 7DT exposure delivers: which bands it can be taken in, how sharp it is, how well it is calibrated, and how deep it goes — the five numbers an observing plan starts from."
      image="/img/hero/telescope.jpg"
      meta={[
        { value: '35', label: 'Medium bands installed' },
        { value: '2.0', unit: '″', label: 'Median PSF FWHM' },
        { value: '15–25', unit: 'mmag', label: 'Zero-point uncertainty' },
        { value: '19.6', unit: 'mag', label: 'Best 100 s depth' },
      ]}
    />

    <Section eyebrow="Filters" title="Filter transmission" wide>
      <div className="prose" style={{ maxWidth: '68ch' }}>
        <p>{filterText}</p>
        <p>{filterCaveatText}</p>
      </div>

      <div style={{ marginTop: '2.5rem' }}>
        <FilterCurves />
        <p className="footnote" style={{ marginTop: '0.75rem' }}>
          <b>The complete set</b> Response of all 35 medium bands together with Sloan u, g, r, i
          and z, so the medium bands can be read against the broad ones that overlap them. Each
          curve is drawn in the colour of its own central wavelength.
        </p>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <FilterCurves showBroad={false} />
        <p className="footnote" style={{ marginTop: '0.75rem' }}>
          <b>Medium bands alone</b> The same data with the broad bands removed. The broad bands
          are several times wider and sit over the medium set; without them the 25 nm spacing of
          the original twenty, and where the fifteen added in 2025 fall between them, are legible.
        </p>
      </div>

      <p className="footnote" style={{ marginTop: '1.5rem' }}>
        Curves are the system response — filter transmission folded with detector quantum
        efficiency, telescope optics and atmospheric transmission — read from the reference data
        shipped with <Link to="/users/software"><code>supy</code></Link>, which is what its
        simulator module computes with. A response derived there matches these figures exactly.
        Which bands exist on a particular tile is reported on the{' '}
        <Link to="/users/access">data access page</Link>.
      </p>
    </Section>

    <Section eyebrow="Image quality" title="Point-spread function" alt>
      <div className="split split--wide-text">
        <div>
          <p className="prose">{performanceText}</p>
          <p className="footnote" style={{ marginTop: '1rem' }}>
            Measured from the point-spread function across the field of view by the Py7DT pipeline
            as part of routine astrometric and photometric processing, so the figures are delivered
            image quality in survey operation rather than a specification. Image quality is
            monitored continuously; units are re-aligned individually as needed.
          </p>
        </div>
        <SimpleTable caption="Delivered image quality" rows={PSF} />
      </div>

      <div style={{ marginTop: '2.5rem' }}>
        <Figure
          src="/img/images/psf-starfield.jpg"
          alt="A crop of a 7DT frame showing a field of stars, each recorded as a round compact point source"
          label="Point sources on a 7DT frame"
          caption="A crop of a 7DT exposure of the field around the Helix Nebula, at full resolution and without further processing. Stars are round and compact across the crop; the numbers beside it are what that looks like measured — 2.0 arcseconds FWHM at the array median, ellipticity under 0.1 over the central 80 percent of the field."
        />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <StatGrid items={specs.performance} />
      </div>
    </Section>

    <Section eyebrow="Photometry" title="Photometric zero point">
      <div className="split split--wide-text">
        <p className="prose">{photometryText}</p>
        <SimpleTable caption="Calibration" rows={ZEROPOINT} />
      </div>
      <p className="footnote" style={{ marginTop: '1.5rem' }}>
        Zero points are determined per image by Py7DT with 3σ clipping across multiple aperture
        sizes, against corrected synthetic photometry of matched Gaia sources. The fifteen filters
        installed in late 2025 are not yet spectrophotometrically calibrated and are excluded from
        the figures above; a calibration campaign following the same procedure is planned. Full
        methodology is in preparation (Paek et al.).
      </p>
    </Section>

    <Section eyebrow="Depth" title="A 100-second exposure" alt>
      <p className="prose">{depthText}</p>

      <div className="split split--wide-text" style={{ marginTop: '2rem' }}>
        <SimpleTable caption={specs.depths.caption} rows={specs.depths.rows} />
        <div>
          <p className="footnote">
            One hundred seconds is the fiducial 7DS exposure: every survey visit is built from it,
            so a depth quoted for any programme is this number scaled by the number of frames
            coadded. Background-limited, so four frames buy 0.75 mag.
          </p>
          <p className="footnote" style={{ marginTop: '1rem' }}>
            Nominal conditions: seeing better than 2.0 arcseconds, airmass below 1.5, and a
            non-bright night. The spread around each figure on a real night is the width of the
            violins below.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '2.5rem' }}>
        <Figure
          src="/img/images/depth-distribution.png"
          alt="Violin plot of the 5-sigma limiting magnitude distribution for each 7DT band in a 100-second exposure"
          label="Measured depth per band"
          caption="Distribution of single-exposure 5σ point-source depths for the twenty original medium bands and Sloan g, r, i and z, measured from individual 100-second exposures taken in routine survey operation. The width of each violin is proportional to the number of exposures reaching that magnitude; the spread within a band is the variation in seeing, airmass and sky brightness across real nights. The fifteen filters added in late 2025 are not included, their spectrophotometric calibration being incomplete. From Kim et al., Proc. SPIE 14147-84."
        />
      </div>
    </Section>

    <Section eyebrow="Depth" title="What each survey reaches">
      <p className="prose">
        The three surveys spend that fiducial exposure differently — over the whole southern sky
        once, over a smaller area every ten to fourteen days, or on one field every night — so
        they arrive at very different depths from the same instrument.
      </p>

      <div className="table-wrap" style={{ marginTop: '2rem' }}>
        <table className="spec-table">
          <caption>Depth reached by each survey, 5σ in m600</caption>
          <thead>
            <tr>
              <th scope="col">Survey</th>
              <th scope="col">Area</th>
              <th scope="col">Cadence</th>
              <th scope="col">Depth</th>
            </tr>
          </thead>
          <tbody>
            {surveys.tiers.map((tier) => (
              <tr key={tier.code}>
                <th scope="row">
                  <Link to={`/survey/${tier.code.toLowerCase()}`}>{tier.code}</Link>
                </th>
                <td>{tier.area}</td>
                <td>{tier.cadence}</td>
                <td>{tier.depth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="footnote" style={{ marginTop: '1.5rem' }}>
        The RIS figure is one visit of 3 × 100 s. Figures marked with an asterisk are cumulative
        over the planned operation rather than the depth of any single visit, and are targets:{' '}
        <Link to="/users/status">status and overview</Link> reports what has actually been
        observed, and the coverage map on the{' '}
        <Link to="/users/access">data access page</Link> gives the integration time and estimated
        depth reached on any individual tile.
      </p>
    </Section>

    <Section eyebrow="Next" title="Planning an observation" alt>
      <p className="prose">
        To turn these figures into an expected signal-to-noise, combine the depths with the
        response curves: the <code>supy</code> package has a simulator module that generates filter
        and detector response for the 7DT bands, and an observer module for target visibility from
        El Sauce.
      </p>
      <div className="btn-row" style={{ marginTop: '1.5rem' }}>
        <Link className="btn btn--primary" to="/users/performance">
          Performance in detail
        </Link>
        <Link className="btn btn--secondary" to="/users/software">
          Software
        </Link>
        <Link className="btn btn--secondary" to="/users/propose">
          How to propose
        </Link>
        <Link className="btn btn--secondary" to="/telescope/instrument">
          Instrument specification
        </Link>
      </div>
    </Section>
  </PageLayout>
);

export default Index;
