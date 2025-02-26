import React, {useState, useEffect} from "react"

import NavBar from './navigate';
import FooterBar from "./footer"

import { opticText, mountText, filterText } from './content/text'

const Index=() => {


  return (
    <div>
      <NavBar manu="manu7dt" fixed={true} />

      <div className="p-10 max-w-screen-lg mx-auto" style={{paddingTop: "150px", paddingBottom: "100px"}}>
        <div className="p-10 max-w-screen-lg mx-auto">
          <div className="justify-between"  style={{maxWidth: "1200px", margin: "0 auto"}}>
            <p className="mt-4 text-sm leading-7 text-gray-500 font-regular" style={{textAlign:"center"}}>
              The Biggest Ground-based Multi-telescope System
            </p>
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight" style={{textAlign:"center", fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
              Specifcation of <span style={{color:"var(--pickled-bluewood-600)"}}>7DT</span>
            </h3>
          </div>
        </div>
      </div>
      
      

      <div style={{backgroundColor:"#f9f9f9"}}>
        <div className="mx-auto w-full" style={{maxWidth: "1440px", margin:"0 auto", padding: "0 10vw 0 10vw"}}>
          <div className="p-10 max-w-screen-lg mx-auto">
            <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight" style={{fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
              Optical Tube Assembly
            </h3>
            <p className="text-content">{opticText}</p>
          </div>
        </div>
      </div>

      <div style={{backgroundColor:"#fff"}}>
        <div className="mx-auto w-full" style={{maxWidth: "1440px", margin:"0 auto", padding: "0 10vw 0 10vw"}}>
          <div className="p-10 max-w-screen-lg mx-auto">
            <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight" style={{fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
              Mount
            </h3>
            <p className="text-content">{mountText}</p>
          </div>
        </div>
      </div>

      <div style={{backgroundColor:"#f9f9f9"}}>

        <div className="mx-auto w-full" style={{maxWidth: "1440px", margin:"0 auto", padding: "0 10vw 0 10vw"}}>
          <div className="p-10 max-w-screen-lg mx-auto">
            <h3 className="mb-3 text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight" style={{fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
              Filter
            </h3>

            <p className="text-content">{filterText}</p>

            <img className="p-6" src="/img/filter.png" />

            <p className="text-content">Here are two examples: NGC7293(left) and NGC0253(right)</p>
            
            <div className="flex flex-wrap justify-between p-10" style={{textAlign:"center"}}>
              <img src="/img/NGC7293.gif" width="40%"/>
              <img src="/img/NGC0253.gif" width="40%"/>
            </div>

          </div>
        </div>
      </div>
      
      <FooterBar />
    </div>
  );
}


export default Index;