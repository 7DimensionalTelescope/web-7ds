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
      { label: 'Design', href: '/survey/design' },
      { label: 'Status', href: '/survey/status' },
    ],
  },
  {
    title: 'Science',
    links: [
      { label: 'Overview', href: '/science/overview' },
      { label: 'Multi-messenger Astronomy', href: '/science/sci#mma' },
      { label: 'Transients', href: '/science/sci#transients' },
      { label: 'Galaxy Formation & Evolution', href: '/science/sci#galaxies' },
      { label: 'Cosmology', href: '/science/sci#cosmology' },
      { label: 'Active Galactic Nuclei', href: '/science/sci#agn' },
      { label: 'Galactic Science', href: '/science/sci#galactic' },
      { label: 'Solar System Objects', href: '/science/sci#solar' },
    ],
  },
  {
    title: 'Facilities',
    links: [
      { label: 'Overview', href: '/telescope/overview' },
      { label: 'Location', href: '/telescope/location' },
      { label: 'Instrument', href: '/telescope/instrument' },
      { label: 'Computational Resources', href: '/telescope/computer' },
      { label: 'Observing Mode', href: '/telescope/mode' },
      { label: 'Data & Software', href: '/data/overview' },
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
              <p className="site-footer__name">Prof. Myungshin Im</p>
              <p>Principal Investigator</p>
              <p>Dept. of Physics &amp; Astronomy</p>
              <p>Seoul National University</p>
              <p>1 Gwanak-ro, Gwanak-gu</p>
              <p>Seoul 08826, Republic of Korea</p>
              <p>+82-2-880-6585 / 6761</p>
              <p style={{ marginTop: '0.75rem' }}>
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
