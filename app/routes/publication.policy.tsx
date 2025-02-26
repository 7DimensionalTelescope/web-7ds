import React, { useState, useEffect } from "react";
import NavBar from './navigate';
import FooterBar from "./footer";

const Index = () => {
  
  return (
    <div style={{background: "#fff"}}>
      <NavBar manu="manuPaper" fixed={true} />
      
      <div className="mx-auto w-full main-container" style={{paddingTop: "300px"}}>
        <div className="p-10 max-w-screen-lg mx-auto">
          <div className="justify-between mb-5"  style={{maxWidth: "1200px", margin: "0 auto"}}>
            <p className="mt-4 text-sm leading-7 text-gray-500 font-regular" style={{textAlign:"center"}}>
              To be determined.
            </p>
          </div>
        </div>
      </div>
      <FooterBar />
    </div>
  );
}

export default Index;