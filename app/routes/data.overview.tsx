import React, { useState, useEffect } from "react";
import NavBar from './navigate';
import FooterBar from "./footer";
import { overviewText } from './content/text';

const Index = () => {
  const backgroundImageStyle = {
    backgroundSize: "cover",
    backgroundImage: 'url("../img/data.png")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px",
    position: "relative", // Add this line
  };

  const transparentBoxStyle = {
    position: "absolute",
    top: "30%", // Adjust this value as per your requirement
    left: "50%", // Adjust this value as per your requirement
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0.85)", // Adjust the transparency here
    padding: "50px",
    borderRadius: "10px",
    maxWidth: "90%",
    marginTop:"200px",

  };

  const buttonStyle = {
    backgroundColor: "var(--pickled-bluewood-900)",
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 50px",
    cursor: "pointer",
    borderRadius: "10px",

  };

  const buttonHoverStyle = {
    backgroundColor: "var(--pickled-bluewood-600)",
  };

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = buttonStyle.backgroundColor;
  };


  return (
    <div style={{background: "#fff"}}>
      <NavBar manu="manuData"/>
      
      <div style={backgroundImageStyle}>
        <div style={{height:"100vh"}}></div>
        <div style={transparentBoxStyle}>
          <div className="mx-auto w-full">
            <div className="max-w-screen-lg mx-auto">
              <div className="justify-between mb-5" style={{maxWidth: "1200px", margin: "0 auto"}}>
                <p className="mt-4 text-sm leading-7 text-gray-500 font-regular" style={{textAlign:"center"}}>
                  7DS data center
                </p>
                <h3 className="mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900" style={{textAlign:"center", fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
                  Overview of <span style={{color:"var(--pickled-bluewood-600)"}}>Data</span>
                </h3>
                <p className="text-content">{overviewText}</p>
                <br/>
                <p className="mt-4 text-gray-900 font-regular">To explore further,  </p>
                <div className="flex justify-center" >
                  <a href='./data'>
                    <button style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                      Data
                    </button>
                  </a>
                  <a href='./software'>
                    <button style={buttonStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                      Software
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterBar />
    </div>
  );
}

export default Index;
