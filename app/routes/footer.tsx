import React from 'react';
import { Link } from '@remix-run/react';
import { SmartLink } from '../components/md';
import site from '../content/site.json';

/* Contact, link columns, partner logos and the closing line are in
   content/site.yaml. */
const { footer } = site;

const FooterBar = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__spectrum" />

      <div className="site-footer__top">
        <div className="container container--wide">
          <div className="site-footer__grid">
            <div className="site-footer__contact">
              <h3 className="site-footer__heading">{footer.contact.title}</h3>
              <p className="site-footer__name">{footer.contact.name}</p>
              {footer.contact.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p style={{ marginTop: '0.5rem' }}>
                <a href={`mailto:${footer.contact.email}`}>{footer.contact.email}</a>
              </p>
            </div>

            {footer.columns.map((column) => (
              <div key={column.title}>
                <h3 className="site-footer__heading">{column.title}</h3>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="site-footer__partners">
        <div className="container container--wide">
          <h3 className="site-footer__heading">{footer.partners.title}</h3>
          <div className="logo-strip">
            {footer.partners.logos.map((partner) => (
              <div className="logo-strip__item" key={partner.alt}>
                <img src={partner.src} alt={partner.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container container--wide">
        <div className="site-footer__bottom">
          <div className="site-footer__copyright">
            {footer.copyright}
          </div>
          <div className="site-footer__legal">
            {footer.legal.map((link) => (
              <SmartLink href={link.href} key={link.label}>
                {link.label}
              </SmartLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
