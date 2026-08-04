import React from 'react';
import { Link } from '@remix-run/react';
import NavBar from '../routes/navigate';
import FooterBar from '../routes/footer';

/* ---------------------------------------------------------------------------
   Shared page furniture. Interior pages are built from these so that spacing,
   type scale and rules stay identical across the site.
--------------------------------------------------------------------------- */

type Meta = { value: string; unit?: string; label: string; note?: string; live?: boolean };

export function PageLayout({
  menu,
  children,
}: {
  menu: string;
  children: React.ReactNode;
}) {
  return (
    <div className="page">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <NavBar manu={menu} fixed={true} />
      <main id="content">{children}</main>
      <FooterBar />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  meta,
  actions,
  tall,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  image?: string;
  meta?: Meta[];
  actions?: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <header
      className={`hero${tall ? ' hero--tall' : ''}`}
      style={image ? { backgroundImage: `url("${image}")` } : undefined}
    >
      <div className="hero__inner">
        <div className="container container--wide">
          {eyebrow && <span className="eyebrow eyebrow--on-dark">{eyebrow}</span>}
          <h1 className="hero__title">{title}</h1>
          {lede && <p className="hero__lede">{lede}</p>}
          {actions && <div className="btn-row">{actions}</div>}
          {meta && meta.length > 0 && (
            <div className="hero__meta">
              {meta.map((item) => (
                <div className="hero__meta-item" key={item.label}>
                  <span className="hero__meta-value">
                    {item.value}
                    {item.unit && <span className="stat__unit">{item.unit}</span>}
                  </span>
                  <span className="hero__meta-label">{item.label}</span>
                  {item.note && (
                    <span className={`stat__note${item.live ? ' stat__note--live' : ''}`}>
                      {item.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="hero__spectrum" />
    </header>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  alt,
  center,
  wide,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  alt?: boolean;
  center?: boolean;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={`section${alt ? ' section--alt' : ''}`} id={id}>
      <div className={`container${wide ? ' container--wide' : ''}`}>
        {(eyebrow || title) && (
          <div className={`section-title${center ? ' section-title--center' : ''}`}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && <h2>{title}</h2>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Live-update indicator.

   Every figure on this site is either a fixed property of the instrument or a
   number read from the observation database a moment ago. This marks the
   second kind, so a reader never has to guess which they are looking at, and
   says plainly when the database could not be reached and the page is showing
   a stored copy instead.
--------------------------------------------------------------------------- */
export function LiveBadge({
  live,
  updated,
  interval,
  onDark,
}: {
  live: boolean;
  /** ISO timestamp the source stamped on the data. */
  updated?: string;
  /** How often this page refetches, in plain words. */
  interval?: string;
  onDark?: boolean;
}) {
  const when = updated
    ? new Date(updated).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
      }) + ' UTC'
    : null;

  return (
    <span
      className={`live-badge${live ? '' : ' live-badge--stale'}${onDark ? ' live-badge--on-dark' : ''}`}
      role="status"
    >
      <span className="live-badge__dot" aria-hidden="true" />
      <span className="live-badge__text">
        {live ? 'Live data' : 'Stored copy'}
        {when && <span className="live-badge__when"> · {when}</span>}
        {live && interval && <span className="live-badge__when"> · refreshed {interval}</span>}
      </span>
    </span>
  );
}

export function StatGrid({ items, onDark }: { items: Meta[]; onDark?: boolean }) {
  return (
    <div className={`stat-grid${onDark ? ' stat-grid--on-dark' : ''}`}>
      {items.map((item) => (
        <div className="stat" key={item.label}>
          <span className="stat__value">
            {item.value}
            {item.unit && <span className="stat__unit">{item.unit}</span>}
          </span>
          <span className="stat__label">{item.label}</span>
          {item.note && (
            <span className={`stat__note${item.live ? ' stat__note--live' : ''}`}>
              {item.note}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export function SpecTable({
  caption,
  groups,
}: {
  caption?: string;
  groups: { group: string; rows: string[][] }[];
}) {
  return (
    <div className="table-wrap">
      <table className="spec-table">
        {caption && <caption>{caption}</caption>}
        <tbody>
          {groups.map((group) => (
            <React.Fragment key={group.group}>
              <tr className="spec-group">
                <th colSpan={2}>{group.group}</th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row[0]}>
                  <th scope="row">{row[0]}</th>
                  <td>{row[1]}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SimpleTable({
  caption,
  rows,
}: {
  caption?: string;
  rows: string[][];
}) {
  return (
    <div className="table-wrap">
      <table className="spec-table">
        {caption && <caption>{caption}</caption>}
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              <th scope="row">{row[0]}</th>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Figure({
  src,
  alt,
  caption,
  label,
}: {
  src: string;
  alt: string;
  caption?: React.ReactNode;
  label?: string;
}) {
  return (
    <figure className="figure">
      <img src={src} alt={alt} loading="lazy" />
      {(caption || label) && (
        <figcaption>
          {label && <b>{label}</b>} {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function NextLinks({
  title,
  links,
}: {
  title?: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      {title && <span className="eyebrow">{title}</span>}
      <div className="chip-row">
        {links.map((link) => (
          <Link className="chip" to={link.href} key={link.label}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
