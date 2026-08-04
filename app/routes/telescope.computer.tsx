import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, SimpleTable, StatGrid } from '../components/site';
import { computingText, storageText, protonText } from './content/text';

export const meta: MetaFunction = () => [
  { title: 'Computational resources · 7-Dimensional Telescope' },
  {
    name: 'description',
    content:
      'On-site control computers, the Proton processing server and the storage behind 7DT.',
  },
];

const ONSITE = [
  ['Telescope control computers', '16, one per operational unit'],
  ['Main control computer', '1, array-level command hub'],
  ['Dispatch', 'RTCSpy over real-time network'],
  ['Link to Korea', 'KREONET'],
  ['Transfer protocol', 'GridFTP, ≈ 80 MB s⁻¹'],
  ['Typical transfer time', '< 12 hours (ToO: tens of minutes)'],
];

const PROTON = [
  ['CPU', '2 × AMD EPYC 7513'],
  ['Cores', '128 @ up to 2.6 GHz'],
  ['Memory', '512 GB (8 × 64 GB)'],
  ['GPU', '2 × NVIDIA A100, 82 GB VRAM'],
  ['GPU interconnect', 'NVLink'],
  ['Target throughput', '≈ 30 s per image'],
];

/* Servers are added as the archive grows, so this lists the current set and
   the convention behind the names rather than treating two of them as the
   permanent arrangement. */
const STORAGE = [
  ['Naming', 'Hydrogen transition series — Lyman, Balmer, …'],
  ['Lyman', '2 × 1.2 PB (RAID 60)'],
  ['Balmer', '1 × 1.2 PB, extensible'],
  ['Current capacity', '≈ 3.6 PB, extended as required'],
  ['Attachment', 'NFS over 10 Gbps class network'],
  ['Nightly inflow', '≈ 350 GB (≈ 3,000 × 117 MiB)'],
];

const Index = () => {
  return (
    <PageLayout menu="manu7dt">
      <PageHero
        eyebrow="Telescope"
        title={
          <>
            <em>Computational</em> resources
          </>
        }
        lede="About 350 GB of raw data are produced each night, transferred from Chile to Seoul and reduced the same day."
        image="/img/hero/computer.jpg"
        meta={[
          { value: '128', label: 'CPU cores' },
          { value: '2', unit: '× A100', label: 'GPUs' },
          { value: '3.6', unit: 'PB', label: 'Storage' },
          { value: '66 ± 24', unit: 'GB/hr', label: 'Pipeline throughput' },
        ]}
      />

      <Section eyebrow="On site" title="Control computers in Chile">
        <div className="split split--wide-text">
          <p className="prose">{computingText}</p>
          <SimpleTable caption="On-site infrastructure" rows={ONSITE} />
        </div>
      </Section>

      <Section eyebrow="Processing" title="Proton" alt>
        <div className="split split--wide-text">
          <p className="prose">{protonText}</p>
          <SimpleTable caption="Processing server" rows={PROTON} />
        </div>
      </Section>

      <Section eyebrow="Storage" title="Storage servers">
        <div className="split split--wide-text">
          <p className="prose">{storageText}</p>
          <SimpleTable caption="Storage servers" rows={STORAGE} />
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          <StatGrid
            items={[
              { value: '≈ 3,000', label: 'Images per night' },
              { value: '≈ 5', unit: 'hr', label: 'To reduce a night' },
              { value: '≈ 350', unit: 'GB', label: 'Nightly inflow' },
              { value: '1.75', unit: 'M', label: 'Images archived' },
            ]}
          />
        </div>
      </Section>

      <Section eyebrow="Facility" title="The processing center" alt>
        <figure className="figure" style={{ maxWidth: '760px' }}>
          <img src="/img/computer.jpeg" alt="The 7DT data processing facility at Seoul National University" loading="lazy" />
          <figcaption>
            <b>Proton</b> The dedicated reduction server at Seoul National University, where all
            7DT data are processed.
          </figcaption>
        </figure>
        <div className="btn-row" style={{ marginTop: '2rem' }}>
          <Link className="btn btn--primary" to="/users/software">Reduction software</Link>
          <Link className="btn btn--secondary" to="/users/access#format">Data products</Link>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
