import { Link } from '@remix-run/react';
const PARTNERS = [
  { src: '/img/institutes/snu.jpeg', alt: 'Seoul National University' },
  { src: '/img/institutes/kasi.gif', alt: 'Korea Astronomy and Space Science Institute' },
  { src: '/img/institutes/postech.png', alt: 'POSTECH' },
  { src: '/img/institutes/ewha.png', alt: 'Ewha Womans University' },
  { src: '/img/institutes/gwuniv.png', alt: 'Center for the Gravitational-wave Universe' },
  { src: '/img/institutes/nrf.jpg', alt: 'National Research Foundation of Korea' },
];

const COLUMNS = [
  {
    title: 'About',
    links: [
      { label: 'What is 7DS', href: '/about/intro' },
      { label: 'Team', href: '/about/team' },
      { label: 'Funding', href: '/about/funding' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Links', href: '/links' },
    ],
  },
  {
    title: 'Survey',
    links: [
      { label: 'Overview', href: '/survey/overview' },
      { label: 'Reference (RIS)', href: '/survey/ris' },
      { label: 'Time-domain (WTS)', href: '/survey/wts' },
      { label: 'Monitoring (IMS)', href: '/survey/ims' },
    ],
  },
  {
    title: 'Science',
    links: [
      { label: 'Overview', href: '/science/overview' },
      { label: 'Multi-messenger', href: '/science/mma' },
      { label: 'Transients', href: '/science/transients' },
      { label: 'Galaxy Evolution', href: '/science/galaxies' },
      { label: 'Cosmology', href: '/science/cosmology' },
      { label: 'Active Galactic Nuclei', href: '/science/agn' },
      { label: 'Galactic & Exoplanets', href: '/science/galactic' },
      { label: 'Solar System', href: '/science/solar' },
    ],
  },
  {
    title: 'Facilities',
    links: [
      { label: 'Overview', href: '/telescope/overview' },
      { label: 'Instrument', href: '/telescope/instrument' },
      { label: 'Location', href: '/telescope/location' },
      { label: 'Computing', href: '/telescope/computer' },
    ],
  },
  {
    title: 'For Users',
    links: [
      { label: 'Status', href: '/users/status' },
      { label: 'Performance', href: '/users/performance' },
      { label: 'How to Propose', href: '/users/propose' },
      { label: 'Data Format', href: '/users/format' },
      { label: 'Data Access', href: '/users/access' },
      { label: 'Software', href: '/users/software' },
      { label: 'Useful Links', href: '/users/links' },
    ],
  },
];

const FooterBar = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__spectrum" />

      <div className="site-footer__top">
        <div className="container container--wide">
          <div className="site-footer__grid">
            <div className="site-footer__contact">
              <h3 className="site-footer__heading">Contact</h3>
              <p className="site-footer__name">Prof. Myungshin Im · Principal Investigator</p>
              <p>Dept. of Physics &amp; Astronomy, Seoul National University</p>
              <p>1 Gwanak-ro, Gwanak-gu, Seoul 08826, Republic of Korea</p>
              <p>+82-2-880-6585 / 6761</p>
              <p style={{ marginTop: '0.5rem' }}>
                <a href="mailto:mim@astro.snu.ac.kr">mim@astro.snu.ac.kr</a>
              </p>
            </div>

            {COLUMNS.map((column) => (
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
          <h3 className="site-footer__heading">Participating institutions</h3>
          <div className="logo-strip">
            {PARTNERS.map((partner) => (
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
            © 2026 7-Dimensional Telescope · Center for the Gravitational-wave Universe, SNU
          </div>
          <div className="site-footer__legal">
            <Link to="/publication/policy">Publication Policy</Link>
            <Link to="/links">Links</Link>
            <a href="mailto:mim@astro.snu.ac.kr">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
