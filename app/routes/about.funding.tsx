import React, {useState, useEffect} from "react"

import NavBar from './navigate';
import FooterBar from "./footer"
import members from './content/team'

import { DataGrid } from "@mui/x-data-grid";

import {overviewText} from "./content/text"

const Index=() => {


  return (
    <div style={{background: "#fff"}}>
      <NavBar manu="manuAbout" fixed={true}/>

      <div className="mx-auto w-full m,main-container" style={{paddingTop: "100px"}}>
        <div className="p-10 max-w-screen-lg mx-auto">
          <div className="justify-between mb-5"  style={{maxWidth: "1200px", margin: "0 auto"}}>
            <p className="mt-4 text-sm leading-7 text-gray-500 font-regular" style={{textAlign:"center"}}>
              Gratitude
            </p>
            <h3 className="mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900" style={{textAlign:"center", fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
             <span style={{color:"var(--pickled-bluewood-600)"}}>Funding</span> Sources
            </h3>
          </div>
        </div>

        <div style={{backgroundColor:"#fff"}}>
          <div className="mx-auto w-full" style={{maxWidth: "1440px", margin:"0 auto", padding: "0 10vw 0 10vw"}}>
            <div className="p-10 max-w-screen-lg mx-auto">
              <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight" style={{fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
                Center for the Gravitational-Wave Universe
              </h3>
              <p className="flex" style={{margin:"0 auto", justifyContent: "center"}}><img src="../img/institutes/gwuniv.png" width="60%" style={{padding:"10px"}}/></p>
              <p className="text-content">{overviewText}</p>
            </div>
          </div>
        </div>


        <div style={{backgroundColor:"#fff"}}>
          <div className="mx-auto w-full" style={{maxWidth: "1440px", margin:"0 auto", padding: "0 10vw 0 10vw"}}>
            <div className="p-10 max-w-screen-lg mx-auto">
              <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight" style={{fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
                National Research Foundation of Korea
              </h3>
              <p className="flex" style={{margin:"0 auto", justifyContent: "center"}}><img src="../img/institutes/nrf.jpg" width="50%"/></p>
              <p className="text-content">{overviewText}</p>
            </div>
          </div>
        </div>

        <div style={{backgroundColor:"#fff"}}>
          <div className="mx-auto w-full" style={{maxWidth: "1440px", margin:"0 auto", padding: "0 10vw 0 10vw"}}>
            <div className="p-10 max-w-screen-lg mx-auto">
              <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight" style={{fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
                Consolidator Grants
              </h3>
              <p className="text-content">{overviewText}</p>
            </div>
          </div>
        </div>
      </div>
      <FooterBar />
    </div>
  );
}


export default Index;