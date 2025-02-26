
import React, {useState, useEffect} from "react"

import NavBar from './navigate';
import FooterBar from "./footer"

import ScatterGeoPlot from './plot'

import data from './content/data'


const Index=() => {

  const backgroundImage = {
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    backgroundImage: 'url("./img/science.jpg")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px",
  }

  const [submenuTop, setSubmenuTop] = useState("750px");
  
  const [smallWindow, setSmallWindow] = useState(true);

  useEffect(() => {

    const updateWindow = () => {
      if (window.innerWidth < 1500){
        setSmallWindow(false)
      } else {
        setSmallWindow(true)
      }
 
    };
    updateWindow();

    window.addEventListener('resize', updateWindow);

    return () => {
      window.removeEventListener('resize', updateWindow);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const slowFactor = 0.5
      const newTop = `calc(750px - ${(scrollPosition * slowFactor / windowHeight) * 100}%)`;
      setSubmenuTop(newTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{background: "#fff"}}>
      <NavBar manu="manuScience" fixed={true} />

      <div className="mx-auto w-full main-container" style={{paddingTop: "100px"}}>
        <div className="p-10 max-w-screen-lg mx-auto">
          <div className="justify-between mb-5"  style={{maxWidth: "1200px", margin: "0 auto"}}>
            <p className="mt-4 text-sm leading-7 text-gray-500 font-regular" style={{textAlign:"center"}}>
              questions
            </p>
            <h3 className="mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900" style={{textAlign:"center", fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
              Templates <span style={{color:"var(--pickled-bluewood-600)"}}>ASD</span>
            </h3>
          </div>
        </div>
      </div>
      <FooterBar />
    </div>
  )
}


export default Index;
      