import React, {useState, useEffect} from "react"

import NavBar from './navigate';
import FooterBar from "./footer"

import {storageText, protonText} from './content/text'


const Index=() => {

  return (
    <div>
      <NavBar manu="manu7dt" fixed={true} />

      <div className="p-10 max-w-screen-lg mx-auto" style={{paddingTop: "150px", paddingBottom: "100px"}}>
        <div className="p-10 max-w-screen-lg mx-auto">
          <div className="justify-between"  style={{maxWidth: "1200px", margin: "0 auto"}}>
            <p className="mt-4 text-sm leading-7 text-gray-500 font-regular" style={{textAlign:"center"}}>
              Center for Machine Learning Viability
            </p>
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight" style={{textAlign:"center", fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
              <span style={{color:"var(--pickled-bluewood-600)"}}>Computational</span> Resorces
            </h3>
          </div>
        </div>
      </div>
      
      <div style={{backgroundColor:"#f9f9f9"}}>
        <div className="mx-auto w-full" style={{maxWidth: "1440px", margin:"0 auto", padding: "0 10vw 0 10vw"}}>
          <div className="p-10 max-w-screen-lg mx-auto">
            <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight" style={{fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
              Data Storage
            </h3>
            <p className="text-content">{storageText}</p>
          </div>
        </div>
      </div>

      <div style={{backgroundColor:"#fff"}}>
        <div className="mx-auto w-full" style={{maxWidth: "1440px", margin:"0 auto", padding: "0 10vw 0 10vw"}}>
          <div className="p-10 max-w-screen-lg mx-auto">
            <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight" style={{fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
              Proton
            </h3>
            <p className="text-content">{protonText}</p>
          </div>
        </div>
      </div>
      <div style={{backgroundColor:"#f9f9f9"}}>
        <p className="flex" style={{margin:"0 auto", justifyContent: "center", padding:"50px"}}>
          <img src="../img/computer.jpeg" width="30%"/>
        </p>
      </div>
      

      <FooterBar />
    </div>
  );
}


export default Index;
      