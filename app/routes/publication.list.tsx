import React, {useState, useEffect} from "react"

import NavBar from './navigate';
import FooterBar from "./footer"
import { Pagination } from 'flowbite-react';

import news from './content/news.json'
import { Alert } from "flowbite-react";
import { HiEye, HiInformationCircle } from "react-icons/hi";

const Index=() => {


  const backgroundImage = {
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    backgroundImage: 'url("./img/news.png")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px",
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [showAbstract, setShowAbstract] = useState(false);

  const pubPerPage = 5; 

  const pub = news.news.filter((item) => item.type==="publication");

  const totalPages = Math.ceil(pub.length / pubPerPage);
  const indexOfLastPubs = currentPage * pubPerPage;
  const indexOfFirstPubs = indexOfLastPubs- pubPerPage;
  const currentPub = pub.slice(indexOfFirstPubs, indexOfLastPubs);
  const onPageChange = (page) => setCurrentPage(page); 

  return (
    <div style={{background: "#fff"}}>
      <NavBar manu="manuPaper" fixed={true}/>
      <div style={{paddingTop: "80px"}}>
        <Alert color="warning" icon={HiInformationCircle} className="p-3">
          See our <a href="./policy"><span style={{textDecoration: "underline"}}>publication policy</span></a>
        </Alert>
      </div>

      <div className="mx-auto w-full main-container">
        <div className="p-10 max-w-screen-lg mx-auto">
          <div className="justify-between mb-5"  style={{maxWidth: "1200px", margin: "0 auto"}}>
            <p className="mt-4 text-sm leading-7 text-gray-500 font-regular" style={{textAlign:"center"}}>
              Meet our works
            </p>
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900" style={{textAlign:"center", fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
              <span style={{color:"var(--pickled-bluewood-600)"}}>Publications</span>
            </h3>
          </div>

          <a className="w-full" href="./policy">
            <button style={{textAlign:"right"}}>Publication Policy</button>
          </a>

          <div className="w-full" style={{ display: "flex", justifyContent: "flex-end" }}>
            <button style={{textAlign:"right"}} onClick={() => setShowAbstract(!showAbstract)}>{showAbstract ? "Hide Abstract" : "Show Abstract"}</button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center" style={{maxWidth: "1200px", margin: "0 auto", marginBottom:"5rem", textAlign:"center", color:"black"}}>
            {pub.map((p, index) => {
              index = index+1
              return(
                <div className="w-full pub-container p-6 m-3" style={{boxShadow: "0px 15px 35px rgba(227, 252, 239, 0.1), 0px 5px 15px rgba(0, 0, 0, 0.07)"}} key={index}>
                  <div className="pr-5 p-cont-1">
                    <p className="pb-3" style={{fontSize: "24px", lineHeight: "1.2", color:"var(--pickled-bluewood-600)", fontWeight:500}}><a href={p.webpage} target="_blank">{p.title}</a></p>
                    {showAbstract && <p className="text-content" style={{ fontSize: "12pt" }}>{p.abstract}</p>}
                    {!showAbstract && <p className="pb-3"><span className="text-bluewood-900" style={{fontWeight:700}}>Authors:</span> {p.author}</p>}
                  </div>
                  <div className="p-cont-2" style={{textAlign:"left"}}>
                    {showAbstract && <p className="pb-3"><span className="text-bluewood-900" style={{fontWeight:700}}>Authors:</span> {p.author}</p>}
                    <p className="pb-3"><span className="text-bluewood-900" style={{fontWeight:700}}>Journal:</span> {p.journal}</p>
                    <p className="pb-3"><span className="text-bluewood-900" style={{fontWeight:700}}>Date:</span> {p.date}</p>
                    <p className="pb-3"><span className="text-bluewood-900" style={{fontWeight:700}}>doi:</span> <a href={p.webpage} target="_blank">{p.doi}</a></p>
                    <p className="pb-3"><span className="text-bluewood-900" style={{fontWeight:700}}>preprint:</span> <a href={p.webpage2} target="_blank">{p.preprint}</a></p>
                  </div>
                </div>
            )})}
          <div className="flex justify-center mt-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </div>
          </div>
        </div>
      </div>
      <FooterBar />
    </div>
  );
}


export default Index;