import React, { useState, useEffect } from 'react';

function buttonStyle(valid){
  return ({
    height:"380px", 
    backgroundColor: valid ? "#fff" : null, 
    color: valid ? "#000" : null,
    borderTop: valid?"2px solid var(--pickled-bluewood-900)":null,
    transition: "all 0.3s ease",
  })
}

function menuClass(valid){
  if (valid){
    return `font-bold border-transparent sm:mx-6 transition duration-300 ease-in-out transform border-default-500 text-orange`
  } else {
    return `font-bold border-transparent sm:mx-6 transition duration-300 ease-in-out transform hover:border-default-500 hover:text-white`
  }
}

function NavBar(props) {
  const [onMouse, setOnMouse] = useState(false);
  const [isTop, setIsTop] = useState(!props.fixed);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const isTop = scrollPosition === 0;
    setIsTop(isTop&&!props.fixed);
  };

  const handleManu = (manu, onMouse) => {
    setActiveMenu(manu);
    setOnMouse(onMouse);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setActiveMenu(props.manu)
  }, []);

  const navbarClass = "justify-center mx-auto shadow fixed w-full top-0 z-1000 text-white";

  const navbarStyle = {
    backgroundColor:`rgba(7, 28, 48, ${isTop ? 0.5 : 1})`,
    margin: "0 auto",
  };

  return (

    <nav className={navbarClass} style={navbarStyle}>
      
      
      <div className="container flex mx-auto capitalize" style={{maxWidth: "1440px", color:"#fff", margin:"0 auto"}}
        onMouseLeave={() => handleManu(props.manu,false)}
        >
        

        <div>
          <button onClick={() => setShowMenu(!showMenu)} data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
              <a className="logo-container" href="/">
                <img src="/logo_name.png" alt="Logo" className=" h-10"/>
              </a>
          </button>
        </div>

        <div className={`w-full md:block md:w-auto ${showMenu ? 'block pt-5 justify-start' : 'hidden'}`} id="navbar-dropdown">
          <ul className="flex flex-col font-medium py-2 md:p-0 mt-0 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 mx-auto" style={{margin:"0 auto"}}>
            <li className={`$(showMenu) ? pb-2 : ''`} style={{textAlign: showMenu?"left":"center"}}>
              <div
                onMouseEnter={() => handleManu("manuHome", true)}
              >
                <button
                  id="home"
                  data-dropdown-toggle="manuHome"
                  className={menuClass((activeMenu === "manuHome"))}
                  style={{marginRight: "1rem", marginLeft: "1rem"}}
                >
                  <a href="/">Home</a>
                </button>
              </div>
            </li>
            <li className={`$(showMenu) ? pb-2 : ''`}style={{textAlign: showMenu?"left":"center"}}>
              <div
                onMouseEnter={() => handleManu("manuAbout", true)}
              >
                <button
                  id="team"
                  data-dropdown-toggle="manuAbout"
                  className={menuClass(activeMenu === "manuAbout")}
                  style={{marginRight: "1.5rem", marginLeft: "1.5rem"}}
                >
                  <a href="/about/intro">About</a>
                </button>
                {(onMouse&&!showMenu)?
                <div style={buttonStyle(activeMenu === "manuAbout")}>
                  <ul className="text-xs">
                    <li>
                      <a href="/about/intro" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>What is 7DS</a>
                    </li>
                    <li>
                      <a href="/about/team" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Team</a>
                    </li>
                    <li>
                      <a href="/about/funding" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Funding<br/>Sources</a>
                    </li>
                  </ul>
                </div>:(showMenu)?
                <ul className="text-sm">
                    <li>
                      <a href="/about/intro" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- What is 7DS</a>
                    </li>
                    <li>
                      <a href="/about/team" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Team</a>
                    </li>
                    <li>
                      <a href="/about/funding" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Funding Sources</a>
                    </li>
                </ul>:null}
              </div>
            </li>
            <li className={`$(showMenu) ? pb-2 : ''`} style={{textAlign: showMenu?"left":"center"}}>
              <div
                onMouseEnter={() => handleManu("manuScience", true)}
              >
                <button
                  id="home"
                  data-dropdown-toggle="manuScience"
                  className={menuClass((activeMenu === "manuScience"))}
                  style={{marginRight: "2rem", marginLeft: "2rem"}}
                >
                  <a href="/science/overview">Science</a>
                </button>
                {(onMouse&&!showMenu)?
                <div style={buttonStyle(activeMenu === "manuScience")}>
                  <ul className="text-xs">
                    <li>
                      <a href="/science/overview" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Overview</a>
                    </li>
                    <li>
                      <a href="/science/sci" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Multi-messenger<br/>Astronomy</a>
                    </li>
                    <li>
                      <a href="/science/sci" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Galaxy Formation<br/>& Evolution</a>
                    </li>
                    <li>
                      <a href="/science/sci" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Cosmology</a>
                    </li>
                    <li>
                      <a href="/science/sci" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Active Galactic<br/>Nuclei</a>
                    </li>
                    <li>
                      <a href="/science/sci" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Galactic Science</a>
                    </li>
                    <li>
                      <a href="/science/sci" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Solar System<br/>Objects</a>
                    </li>
                    <li>
                      <a href="/science/sci" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Transients</a>
                    </li>
                  </ul>
                </div>:(showMenu)?
                <ul className="text-sm">
                    <li>
                      <a href="/science/sci" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Multi-messenger Astronomy</a>
                    </li>
                    <li>
                      <a href="/science/sci" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Galaxy Formation & Evolution</a>
                    </li>
                    <li>
                      <a href="/science/sci" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Cosmology</a>
                    </li>
                    <li>
                      <a href="/science/sci" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Active Galactic Nuclei</a>
                    </li>
                    <li>
                      <a href="/science/sci" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Galactic Science</a>
                    </li>
                    <li>
                      <a href="/science/sci" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Solar System Objects</a>
                    </li>
                    <li>
                      <a href="/science/sci" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Transients</a>
                    </li>
                </ul>:null}
              </div>
            </li>
            
            <li className={`$(showMenu) ? pb-2 : ''`}style={{textAlign: showMenu?"left":"center"}}>
              <div
                onMouseEnter={() => handleManu("manu7ds", true)}
              >
                <button
                  id="7ds"
                  data-dropdown-toggle="manu7ds"
                  className={menuClass(activeMenu === "manu7ds")}
                  style={{marginRight: "1rem", marginLeft: "1rem"}}
                >
                  <a href="/survey/overview">Survey</a>
                </button>
                {(onMouse&&!showMenu)?
                <div style={buttonStyle(activeMenu === "manu7ds")}>
                  <ul className="text-xs">
                    <li>
                      <a href="/survey/overview" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Overview</a>
                    </li>
                    <li>
                      <a href="/survey/design" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Design</a>
                    </li>
                    <li>
                      <a href="/survey/status" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Status</a>
                    </li>
                  </ul>
                </div>:(showMenu)?
                <ul className="text-sm">
                    <li>
                      <a href="/survey/overview" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Overview</a>
                    </li>
                    <li>
                      <a href="/survey/survey" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Design</a>
                    </li>
                    <li>
                      <a href="/survey/status" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Status</a>
                    </li>
                </ul>:null}
              </div>
            </li>
            <li className={`$(showMenu) ? pb-2 : ''`}style={{textAlign: showMenu?"left":"center"}}>
              <div
                onMouseEnter={() => handleManu("manu7dt", true)}
              >
                <button
                  id="7dt"
                  data-dropdown-toggle="manu7dt"
                  className={menuClass(activeMenu === "manu7dt")}
                  style={{marginRight: "1rem", marginLeft: "1rem"}}
                >
                  <a href="/telescope/overview">Facilities</a>
                </button>
                {(onMouse&&!showMenu)?
                <div style={buttonStyle(activeMenu === "manu7dt")}>
                  <ul className="text-xs" style={{margin:"0 auto"}}>
                    <li>
                      <a href="/telescope/overview" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Overview</a>
                    </li>
                    <li>
                      <a href="/telescope/location" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Location</a>
                    </li>
                    <li>
                      <a href="/telescope/instrument" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Instrument</a>
                    </li>
                    <li>
                      <a href="/telescope/computer" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Computational<br/>Resources</a>
                    </li>
                    <li>
                      <a href="/telescope/mode" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Observing<br/>Mode</a>
                    </li>
                  </ul>
                </div>:(showMenu)?
                <ul className="text-sm" style={{margin:"0 auto"}}>
                    <li>
                      <a href="/telescope/overview" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Overview</a>
                    </li>
                    <li>
                      <a href="/telescope/location" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Location</a>
                    </li>
                    <li>
                      <a href="/telescope/instrument" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Instrument</a>
                    </li>
                    <li>
                      <a href="/telescope/computer" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Computational Resources</a>
                    </li>
                    <li>
                      <a href="/telescope/mode" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Observing Mode</a>
                    </li>
                  </ul>:null}
              </div>
            </li>
            <li className={`$(showMenu) ? pb-2 : ''`} style={{textAlign: showMenu?"left":"center"}}>
              <div
                onMouseEnter={() => handleManu("manuData", true)}
              >
                <button
                  id="data"
                  data-dropdown-toggle="manuData"
                  className={menuClass(activeMenu === "manuData")}
                  style={{marginRight: "1rem", marginLeft: "1rem"}}
                >
                  <a href="/data/overview">Data</a>
                </button>
                {(onMouse&&!showMenu)?
                <div style={buttonStyle(activeMenu === "manuData")}>
                  <ul className="text-xs">
                    <li>
                      <a href="/data/overview" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Overview</a>
                    </li>
                    <li>
                      <a href="/data/data" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Data</a>
                    </li>
                    <li>
                      <a href="/data/software" className="block py-2 hover:bg-oran-100" style={{padding:"0.5rem"}}>Software</a>
                    </li>
                  </ul>
                </div>:(showMenu)?
                  <ul className="text-sm">
                    <li>
                      <a href="/data/overview" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Overview</a>
                    </li>
                    <li>
                      <a href="/data/data" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Data</a>
                    </li>
                    <li>
                      <a href="/data/software" className="block py-0 ml-5 hover:text-bluewood-600" style={{padding:"0.5rem"}}>- Software</a>
                    </li>
                  </ul>:null}
              </div>
            </li>
            <li className={`$(showMenu) ? pb-2 : ''`} style={{textAlign: showMenu?"left":"center"}}>
              <div
                onMouseEnter={() => handleManu("manuPaper", true)}
              >
                <button
                  id="publication"
                  data-dropdown-toggle="manuPaper"
                  className={menuClass(activeMenu === "manuPaper")}
                  style={{marginRight: "1rem", marginLeft: "1rem"}}
                >
                  <a href="/publication/list">Publications</a>
                </button>
              </div>
            </li>
            <li className={`$(showMenu) ? pb-2 : ''`} style={{textAlign: showMenu?"left":"center"}}>
              <div
                onMouseEnter={() => handleManu("manuNews", true)}
              >
                <button
                  id="news"
                  data-dropdown-toggle="manuNews"
                  className={menuClass(activeMenu === "manuNews")}
                  style={{marginRight: "2rem", marginLeft: "2rem"}}
                >
                  <a href="/news">News</a>
                </button>
              </div>
            </li>
            <li className={`$(showMenu) ? pb-2 : ''`} style={{textAlign: showMenu?"left":"center"}}>
              <div
                onMouseEnter={() => handleManu("manuImages", true)}
              >
                <button
                  id="news"
                  data-dropdown-toggle="manuImages"
                  className={menuClass(activeMenu === "manuImages")}
                  style={{marginRight: "1rem", marginLeft: "1rem"}}
                >
                  <a href="/gallery">Gallery</a>
                </button>
              </div>
            </li>
            <li className={`$(showMenu) ? pb-2 : ''`} style={{textAlign: showMenu?"left":"center"}}>
              <div
                onMouseEnter={() => handleManu("manuLinks", true)}
              >
                <button
                  id="links"
                  data-dropdown-toggle="manuLinks"
                  className={menuClass(activeMenu === "manuLinks")}
                  style={{marginRight: "1rem", marginLeft: "1rem"}}
                >
                  <a href="/links">Useful Links</a>
                </button>
              </div>
            </li>

          </ul>
          {showMenu?null:<a className="logo-container" href="/">
              <img src="/logo.png" alt="Logo" className="h-10 items-center" style={{top: "50%", transform: "translateY(0%)"}}/>
          </a>}
        </div>

      </div>
    </nav>

  );
}

export default NavBar;


    

