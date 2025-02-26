import React, {useState, useEffect} from "react"

import NavBar from './navigate';
import FooterBar from "./footer"
import { Pagination } from 'flowbite-react';

import news from './content/news.json'


const Index=() => {


  const backgroundImage = {
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    backgroundImage: 'url("./img/news.png")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px",
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState(["press", "publication", "meeting", "update"]);

  const newsPerPage = 3; 

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const filteredNews = selectedTypes.length > 0 ? news.news.filter((item) => selectedTypes.includes(item.type)) : news.news;

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  const onPageChange = (page) => setCurrentPage(page); 

  return (
    <div style={{background: "#fff"}}>
      <NavBar manu="manuNews" fixed={true}/>
      
      <div className="mx-auto w-full main-container" style={{paddingTop: "150px"}}>
        <div className="p-10 max-w-screen-lg mx-auto">
          <div className="justify-between mb-5"  style={{maxWidth: "1200px", margin: "0 auto"}}>
            <p className="mt-4 text-sm leading-7 text-gray-500 font-regular" style={{textAlign:"center"}}>
              A Bunch of Intriguing Updates
            </p>
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900" style={{textAlign:"center", fontWeight: "700", color:"var(--pickled-bluewood-900)"}}>
              Latest <span style={{color:"var(--pickled-bluewood-600)"}}>News</span>
            </h3>
          </div>
          <div className= "flex justify-center mr-7 ml-7">
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex ">
              {["press", "publication", "meeting", "update"].map((type, index) => (
              <li key={index} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input id={`${type}-checkbox-list`} type="checkbox" value="1" className={`w-4 h-4 text-${type}-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500`} checked={selectedTypes.includes(type)} onChange={() => toggleType(type)} />
                  <label htmlFor={`${type}-checkbox-list`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" style={{textTransform:"uppercase"}}>{type}</label>
                </div>
              </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-center" style={{maxWidth: "1200px", margin: "0 auto", marginBottom:"5rem", textAlign:"center"}}>
            {currentNews.map((news, index) => {
              index = index+1
              return(
                <div className={`news news-${index}`} key={`news-${index}`}>
                  <div className="news-content">
                    <div className="news-img-container">
                      <img src={`./img/news/${news.imgName}`} alt="News Image"></img>
                      <a href="" className="news-img-hovered" style={{backgroundImage: `var(--news-img-hovered-overlay), url(./img/news/${news.imgName})`}}></a>
                    </div>
                    <div className="news-info">
                      <div className="news-about">
                        <a className={`news-tag ${news.type === "meeting" ? "tag-news" : news.type==="publication"? "tag-publication":news.type==="press"? "tag-press":null}`}>{news.type}</a>
                        <div className="news-time">{news.date}</div>
                      </div>
                      <h1 className="news-title">{news.title}</h1>
                      {news.type === "meeting" ? 
                        <div className="news-creator">in <a href="">{news.place}</a></div>:
                        news.type === "publication" ?
                        <div className="news-creator">by <a href="">{news.shortAuthor}</a></div>:
                        <div className="news-creator">by <a href="">{news.source}</a></div>
                      }
                      {(news.webpage)?<a href={news.webpage} className="details-button" target='_blank'>Details &#9654;</a>:null}
                    </div>
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