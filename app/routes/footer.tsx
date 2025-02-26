
const FooterBar = () => {
  return (
  <footer style={{backgroundColor:"black", zIndex:1000, position: "relative"}}>
    <div className="mx-auto w-full flex" style={{maxWidth: "1440px", margin:"0 auto"}}>
      <div className="grid grid-cols-2 gap-8 py-6 lg:py-8 md:grid-cols-5">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 uppercase text-white">Contact</h2>
          <hr className="mb-2"/>
            <p className="text-gray-500"> Myungshin Im </p>
            <p className="text-gray-500"> Professor, Dept. of Physics & Astronomy, Seoul National University,</p>
            <p className="text-gray-500"> 56-1 San, Shillim-dong, Kwanak-gu, Seoul, KOREA </p>
            <p className="text-gray-500"> +82-2-880-6585/6761 </p>
            <p className="text-gray-500 mb-2"> <a href="mailto:mim@astro.snu.ac.kr">mim@astro.snu.ac.kr</a></p>
          <hr/>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-900 uppercase text-white">About</h2>
          <hr className="mb-2"/>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-2">
                  <a href="/about/intro" className="hover:color-org">What is 7DS</a>
              </li>
              <li className="mb-2">
                  <a href="/about/team" className="hover:color-org">Team</a>
              </li>
            </ul>

          <hr className="mb-6"/>
          <h2 className="text-sm font-semibold text-gray-900 uppercase text-white">Survey</h2>
          <hr className="mb-2"/>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-2">
                  <a href="/survey/overview" className="hover:color-org">Overview</a>
              </li>
              <li className="mb-2">
                  <a href="/survey/design" className="hover:color-org">Design</a>
              </li>
              <li className="mb-2">
                  <a href="/survey/status" className="hover:color-org">Status</a>
              </li>
            </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-900 uppercase text-white">Science</h2>
          <hr className="mb-2"/>
          <ul className="text-gray-500 dark:text-gray-400 font-medium">
            <li className="mb-2">
              <a href="/science/sci" className="hover:color-org">Multi-messenger Astronomy</a>
            </li>
            <li className="mb-2">
              <a href="/science/sci" className="hover:color-org">Galaxy Formation & Evolution</a>
            </li>
            <li className="mb-2">
              <a href="/science/sci" className="hover:color-org">Cosmology</a>
            </li>
            <li className="mb-2">
              <a href="/science/sci" className="hover:color-org">Active Galactic Nuclei</a>
            </li>
            <li className="mb-2">
              <a href="/science/sci" className="hover:color-org">Galactic Science</a>
            </li>
            <li className="mb-2">
              <a href="/science/sci" className="hover:color-org">Solar System Objects</a>
            </li>
            <li className="mb-2">
              <a href="/science/sci" className="hover:color-org">Transients</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-900 uppercase text-white">Facilities</h2>
          <hr className="mb-2"/>
          <ul className="text-gray-500 dark:text-gray-400 font-medium">
            <li className="mb-2">
              <a href="/telescope/overview" className="hover:color-org">Overview</a>
            </li>
            <li className="mb-2">
              <a href="/telescope/location" className="hover:color-org">Location</a>
            </li>
            <li className="mb-2">
              <a href="/telescope/instrument" className="hover:color-org">Instrument</a>
            </li>
            <li className="mb-2">
              <a href="/telescope/computer" className="hover:color-org">Computational<br/>Resources</a>
            </li>
            <li className="mb-2">
              <a href="/telescope/mode" className="hover:color-org">Observing<br/>Mode</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-900 uppercase text-white">Data</h2>
          <hr className="mb-2"/>
          <ul className="text-gray-500 dark:text-gray-400 font-medium">
            <li className="mb-2">
              <a href="/data/overview" className="hover:color-org">Overview</a>
            </li>
            <li className="mb-2">
              <a href="/data/data" className="hover:color-org">Data</a>
            </li>
            <li className="mb-2">
              <a href="/data/science" className="hover:color-org">Software</a>
            </li>
          </ul>
          <hr className="mb-4"/>
          <h2 className="text-sm font-semibold text-gray-900 uppercase text-white"><a href="/publication">Publications</a></h2>
          <hr className="mb-4"/>
          <h2 className="text-sm font-semibold text-gray-900 uppercase text-white"><a href="/news">News</a></h2>
          <hr className="mb-4"/>
          <h2 className="text-sm font-semibold text-gray-900 uppercase text-white"><a href="/gallery">Gallery</a></h2>
        </div>
      </div>
    </div>
  </footer>
  );
}


export default FooterBar;
