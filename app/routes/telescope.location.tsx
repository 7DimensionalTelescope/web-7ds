import React, {useState, useEffect} from "react"

import NavBar from './navigate';
import FooterBar from "./footer"
import { Carousel } from 'react-bootstrap';

import { locationText } from './content/text'

const Index=() => {

  const [index, setIndex] = useState(0);
  
  const images = ['c1.jpg', 'c2.jpg', 'c3.jpg', 'c4.jpg', 'c5.jpg', 'c6.jpg', 'c7.jpg'];

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  return (
    <div>
      <NavBar manu="manu7dt" fixed={true} />

      <div className="p-10 max-w-screen-lg mx-auto" style={{paddingTop: "300px", paddingBottom: "200px"}}>
        <div className="justify-between mb-5"  style={{maxWidth: "1200px", margin: "0 auto"}}>
          <p className="mt-4 text-sm leading-7 text-gray-500 font-regular" style={{textAlign:"center"}}>
            Build the Telescope
          </p>
          <h3 className="mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900" style={{textAlign:"center", fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
            7DT in <span style={{color:"var(--pickled-bluewood-600)"}}>Chile</span>
          </h3>
        </div>
        <p className="text-content">{locationText}</p>
      </div>

      <Carousel activeIndex={index} onSelect={handleSelect} interval={3000} style={{zIndex:100}}>
        {images.map((image, idx) => (
          <Carousel.Item key={idx}>
            <div
              className="d-block w-100"
              style={{
                backgroundImage: `url(../img/carousel/${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "700px",
                overflow: "hidden",

              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <FooterBar />
    </div>
  );
}


export default Index;