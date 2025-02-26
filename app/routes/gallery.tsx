
import React, {useState, useEffect} from "react"
import { Pagination } from 'flowbite-react';

import NavBar from './navigate';
import FooterBar from "./footer"

import images from './content/images'


const Index=() => {

  const backgroundImage = {
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    backgroundImage: 'url("./img/data.jpg")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px",
  }

  const [submenuTop, setSubmenuTop] = useState("200px");
  const [smallWindow, setSmallWindow] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;

  
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const paginatedImages = images.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage);
  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };


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
      const slowFactor = -0.1
      const newTop = `calc(200px - ${(scrollPosition * slowFactor / windowHeight) * 100}%)`;
      setSubmenuTop(newTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div style={{background: "#fff"}}>
      <NavBar manu="manuGallery" fixed={true}/>
 
      <div className="mx-auto w-full main-container" style={{paddingTop: "150px"}}>
        <div className="p-10 max-w-screen-lg mx-auto">
          <div className="justify-between"  style={{maxWidth: "1200px", margin: "0 auto"}}>
            <p className="mt-4 text-sm leading-7 text-gray-500 font-regular" style={{textAlign:"center"}}>
              Pictures of our Universe from 7DS
            </p>
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900" style={{textAlign:"center", fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
              <span style={{color:"var(--pickled-bluewood-600)"}}>Gallery</span> 
            </h3>
          </div>
          
          <div className="gallery" style={{paddingTop: "100px"}}>
            <ul>
              {paginatedImages.map((img, index) => {
              return(
              <li key={index}>
                <a href={`./img/images/${img.file}`}>
                  <figure>
                    <img src={`./img/images/${img.file}`}  />
                    <figcaption>{img.name}</figcaption>
                  </figure>
                </a>
              </li>
              )})}
            </ul>
          </div>
          <div className="flex justify-center mt-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </div>
        </div>
      </div>
      <FooterBar />
    </div>
  );
}


export default Index;
      