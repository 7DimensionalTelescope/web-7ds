import React, { useState, useEffect } from "react";
import NavBar from './navigate';
import FooterBar from "./footer";
import { overviewText } from './content/text';

const Index = () => {
  
  return (
    <div style={{background: "#fff"}}>
      <NavBar manu="manu7ds" fixed={true} />
      
      <div className="mx-auto w-full main-container" style={{paddingTop: "300px"}}>
        <div className="p-10 max-w-screen-lg mx-auto">
          <div className="justify-between mb-5"  style={{maxWidth: "1200px", margin: "0 auto"}}>
            <p className="mt-4 text-sm leading-7 text-gray-500 font-regular" style={{textAlign:"center"}}>
              ....?
            </p>
            <h3 className="mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900" style={{textAlign:"center", fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
              Design of <span style={{color:"var(--pickled-bluewood-600)"}}>7DS</span>
            </h3>
            <p className="text-content">{overviewText}</p>
          </div>
        </div>
      </div>
      <FooterBar />
    </div>
  );
}

export default Index;