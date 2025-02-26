import React, {useState, useEffect} from "react"

import NavBar from './navigate';
import FooterBar from "./footer"


const Index=() => {

  
  return (
    <div style={{background: "#fff"}}>
      <NavBar manu="manu7dt" fixed={true} />
      
      <div className="p-10 max-w-screen-lg mx-auto" style={{paddingTop: "300px", paddingBottom: "100px"}}>
        <div className="justify-between mb-5"  style={{maxWidth: "1200px", margin: "0 auto"}}>
          <p className="mt-4 text-sm leading-7 text-gray-500 font-regular" style={{textAlign:"center"}}>
            Diverse Strategy, Dynamic Science
          </p>
          <h3 className="mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900" style={{textAlign:"center", fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
            <span style={{color:"var(--pickled-bluewood-600)"}}>Observing</span> Mode
          </h3>
        </div>        
      </div>
  
      <div style={{display: "flex", justifyContent: "center", paddingBottom: "100px"}}>
        <img width="50%" src="../img/overview.png" />
      </div>
    
      <FooterBar />
    </div>
  );
}


export default Index;