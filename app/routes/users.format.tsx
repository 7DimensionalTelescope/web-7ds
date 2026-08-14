import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import format from './content/dataformat.json';

export const meta: MetaFunction = () => [
  { title: 'Data format · 7DT for users' },
  {
    name: 'description',
    content:
      'What a 7DT data product is: image and catalog products, the filename convention, WCS and unit conventions, the FITS header keywords, and the columns of a Py7DT source catalog.',
  },
];

/* ---------------------------------------------------------------------------
   The data format specification, as published to the science working groups.

   Every row comes from `content/dataformat.json`, which is a transcription of
   that document — so revising the specification is a change to one file rather
   than a rewrite of this page. Nothing here is inferred from the data.

   Long reference tables, and they are meant to be: this is the page a user
   keeps open beside a terminal, not one they read through.
--------------------------------------------------------------------------- */

const Mono = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>{children}</span>
);

function KeywordTable({ caption, rows }: { caption: string; rows: string[][] }) {
  return (
    <div className="table-wrap" style={{ marginTop: '1.25rem' }}>
      <table className="spec-table">
        <caption>{caption}</caption>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              <th scope="row" style={{ whiteSpace: 'nowrap' }}>
                <Mono>{row[0]}</Mono>
              </th>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Index = () => (
  <PageLayout menu="manuUsers">
    <PageHero
      eyebrow="For users"
      title="Data format"
      lede="What arrives when you obtain 7DT data: two image products and a catalog, a filename that tells you what a file is, and headers that carry everything needed to turn counts into calibrated magnitudes."
      image="/img/hero/data.jpg"
      meta={[
        { value: '2', label: 'Image products' },
        { value: '9576×6388', label: 'Single-exposure pixels' },
        { value: '0.505', unit: '″', label: 'Per pixel' },
        { value: 'µJy', label: 'Coadd pixel units' },
      ]}
    />

    <Section eyebrow="Products" title="What a data product is">
      <div className="subsection">
        <h3>Images</h3>
        <p className="prose">
          A calibrated single exposure and a coadd are the two primary image products. Coadds may
          be nightly stacks, commonly around 300 seconds, or longer multi-epoch stacks.
        </p>
        <div className="table-wrap" style={{ marginTop: '1.5rem' }}>
          <table className="spec-table">
            <caption>Primary image products</caption>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Filename</th>
                <th scope="col">Format and size</th>
                <th scope="col">Contents</th>
              </tr>
            </thead>
            <tbody>
              {format.products.map((row) => (
                <tr key={row[0]}>
                  <th scope="row">{row[0]}</th>
                  <td>
                    <Mono>{row[1]}</Mono>
                  </td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection">
        <h3>What a filename tells you</h3>
        <p className="prose">
          A basename identifies the observation completely, so a file can be placed without opening
          it. A typical single exposure:
        </p>
        <p
          style={{
            marginTop: '1.25rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9375rem',
            overflowX: 'auto',
          }}
        >
          T08147_m650_7DT02_20251126_043413_100s.fits
        </p>
        <div className="table-wrap" style={{ marginTop: '1.25rem' }}>
          <table className="spec-table">
            <caption>Elements of a basename</caption>
            <tbody>
              {format.basename.map((row) => (
                <tr key={row[0]}>
                  <th scope="row" style={{ whiteSpace: 'nowrap' }}>
                    <Mono>{row[0]}</Mono>
                  </th>
                  <td>{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="prose" style={{ marginTop: '1.5rem' }}>
          The same stem carries through to everything derived from that image, distinguished by a
          suffix.
        </p>
        <KeywordTable caption="Suffixes on the same stem" rows={format.suffixes} />
      </div>

      <div className="subsection">
        <h3>Conventions</h3>
        <KeywordTable caption="Coordinate, unit and naming conventions" rows={format.conventions} />
      </div>
    </Section>

    <Section eyebrow="Headers" title="FITS header keywords" alt>
      <p className="prose">
        Beyond the standard keywords, a 7DT header carries what the observation was, how good it
        turned out, what is needed to calibrate it, and where every input came from. Quality
        metrics are written by the pipeline for every image it produces and are also ingested into
        the observation database.
      </p>
      {format.headerGroups.map((group) => (
        <div className="subsection" key={group.title}>
          <h3>{group.title}</h3>
          <KeywordTable caption={group.title} rows={group.rows} />
        </div>
      ))}
      <p className="footnote" style={{ marginTop: '1.5rem' }}>
        Two keywords are worth reading before any analysis. <Mono>SANITY</Mono> is the pipeline's
        own verdict on the frame, and <Mono>False</Mono> means it should normally be excluded.{' '}
        <Mono>PPFLAG</Mono> records every compromise made in finding calibration masters, so a
        frame calibrated against something less than ideal always says so.
      </p>
    </Section>

    <Section eyebrow="Catalogs" title="Source catalogs">
      <div className="subsection">
        <h3>The naming rule</h3>
        <p className="prose">
          Py7DT source catalogs are FITS binary tables following SExtractor conventions, holding
          instrumental measurements, calibrated photometry, source morphology and reference-catalog
          cross-matches. One rule explains most of the column names: an unsuffixed photometric
          column is an instrumental measurement, and a column suffixed with a filter name is the
          calibrated quantity in that filter.
        </p>
        <KeywordTable caption="The same measurement, in an m650 catalog" rows={format.catalogExample} />
        <p className="footnote" style={{ marginTop: '1rem' }}>
          The suffix convention extends to the corresponding errors and related quantities wherever
          filter-specific columns are provided.
        </p>
      </div>

      {format.catalogGroups.map((group) => (
        <div className="subsection" key={group.title}>
          <h3>{group.title}</h3>
          <KeywordTable caption={group.title} rows={group.rows} />
        </div>
      ))}
    </Section>

    <Section eyebrow="Next" title="Working with it" alt>
      <p className="prose">
        The pipeline that produces these files, and the packages for reading and analyzing them,
        are described under <Link to="/users/software">software</Link>. How the data are obtained
        is on <Link to="/users/access">data access</Link>. Measured depths, zero-point accuracy and
        delivered image quality — the numbers behind the header keywords above — are on the{' '}
        <Link to="/users/performance">performance page</Link>.
      </p>
      <div className="btn-row" style={{ marginTop: '1.5rem' }}>
        <Link className="btn btn--primary" to="/users/software">
          Software
        </Link>
        <Link className="btn btn--secondary" to="/users/access">
          Data access
        </Link>
        <Link className="btn btn--secondary" to="/users/performance">
          Measured performance
        </Link>
      </div>
    </Section>
  </PageLayout>
);

export default Index;
