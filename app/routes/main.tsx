import React, {useEffect, useState, useRef} from 'react';
import news from './content/news.json'
import { mainText1, mainText2, mainText3, mainText4 } from './content/text'

const MainPage = () => {


  const [smallWindow, setSmallWindow] = useState(true);
  const [backgroudImageSet, setBackgroudImageSet] = useState("fixed");
  const [scrollPos, setScrollPos] = useState(0);
  const rulerImageRef = useRef(false);
  const rulerImageRefFixed = useRef(false);
  const [hovered, setHovered] = useState(0);

  const handleHover = (val) => {
    setHovered(val);
  };
  
  useEffect(() => {

    const updateWindow = () => {
      if (window.innerWidth < 1200){
        setSmallWindow(false)
      } else {
        setSmallWindow(true)
      }
 
    };
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPos(scrollY);
    };

    updateWindow();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateWindow);


    return () => {
      window.removeEventListener('resize', updateWindow);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      
      if (rulerImageRef.current) {
        const scrollX = window.scrollY || window.pageYOffset;
        rulerImageRef.current.style.backgroundPositionX = `-${scrollX}px`;
      }

      if (rulerImageRefFixed.current) {
        const scrollX = window.scrollY || window.pageYOffset;
        rulerImageRefFixed.current.style.backgroundPositionX = `-${scrollX}px`;
      }

    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const backgroundImage = {
    backgroundSize: "cover",
    backgroundImage: 'url("./img/main.jpg")',
    backgroundAttachment: backgroudImageSet,
    backgroundPosition: "50% 0px",
  }

  const backgroundImage2 = {
    backgroundSize: "cover",
    backgroundImage: 'url("./img/science.jpg")',
    backgroundAttachment: backgroudImageSet,
    backgroundPosition: "50% 0px",
  }

  const backgroundImage3 = {
    backgroundSize: "cover",
    backgroundImage: 'url("./img/survey.jpg")',
    backgroundAttachment: backgroudImageSet,
    backgroundPosition: "50% 0px",
  }

  const backgroundImage4 = {
    backgroundSize: "cover",
    backgroundImage: 'url("./img/telescope.jpg")',
    backgroundAttachment: backgroudImageSet,
    backgroundPosition: "50% 0px",
  }

  const rulerImage = {
    backgroundSize: 'cover',
    backgroundImage: 'url("./img/ruler.jpg")',
    backgroundRepeat: "none repeat-x",
    backgroundPosition: '50% 0px',
    width: '100%',
    height: '40px',
    zIndex: 200,
  };

  useEffect(() => {

    if (window.innerWidth < 768) {
      setBackgroudImageSet("scroll")
    }
  }, []);

  
  return (
    <div>
      <div style = {backgroundImage}>
        <div className="w-full" style={{ height: "100vh" }}>
          <img src="./img/title.png" style={{ width: "max(1000px, 70%)", paddingTop: "120px", paddingLeft: "15%" }} alt="7DT telescope" />
        </div>
      </div>

    
      <div style={{backgroundColor:"#fff"}}>
        <a href="./about/intro">
        <div className="main w-full">
          <div className="w-full mx-auto">
            <p style={{maxWidth:"1440px"}}>
              <h2 className="mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900" style={{textAlign:"center", fontWeight: "700"}}>
                Introduction
              </h2>
              <img className="inline-flex" src="/img/NGC0253.gif" width="40%"/>
              
              <h4 style={{paddingTop:"20px"}}>
                {mainText1}
              </h4>
            </p>
          </div>
        </div>
        </a>
      </div>

      <div style={{backgroundColor:"#f9f9f9"}}>
        <a href="./science/overview">
        <div className="main w-full main-style">
          <div className="w-full mx-auto" 
            onMouseEnter={() => handleHover(1)}
            onMouseLeave={() => handleHover(0)}
            style={(hovered===1) ? backgroundImage2 : {backgroundColor:"#f9f9f9"}}>
            <p style={{maxWidth:"1440px"}}>
              <h2 className="mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900" style={{textAlign:"center", fontWeight: "700"}}>
                <span>7 Scientific Goals</span>
              </h2>
              {(hovered!=1)?<img className="inline-flex" src="/img/science.jpg" style={{height: "350px", width: "600px"}}/>:''}
              <h4 style={(hovered===1)?{paddingTop:"400px"}:{paddingTop:"50px"}}>
                {mainText2}
              </h4>
            </p>
          </div>
        </div>
        </a>
      </div>

      <div style={{backgroundColor:"#fff"}}>
        <a href="./survey/overview">
        <div className="main w-full main-style">
          <div className="w-full mx-auto" 
            onMouseEnter={() => handleHover(2)}
            onMouseLeave={() => handleHover(0)}
            style={(hovered===2) ? backgroundImage3 : {} }>
            <p style={{maxWidth:"1440px"}}>
              <h2 className="mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900" style={{textAlign:"center", fontWeight: "700"}}>
                <span>7 Dimensional Sky Survey</span>
              </h2>
              {(hovered!=2)?<img className="inline-flex" src="/img/survey.jpg" style={{height: "350px", width: "600px"}}/>:''}
              <h4 style={(hovered===2)?{paddingTop:"400px"}:{paddingTop:"50px"}}>
                {mainText3}
              </h4>
            </p>
          </div>
        </div>
        </a>
      </div>

      <div style={{backgroundColor:"#f9f9f9"}}>
        <a href="./telescope/overview">
        <div className="main w-full main-style">
          <div className="w-full mx-auto" 
            onMouseEnter={() => handleHover(3)}
            onMouseLeave={() => handleHover(0)}
            style={(hovered===3) ? backgroundImage4 : {backgroundColor:"#f9f9f9"} }>
            <p style={{maxWidth:"1440px"}}>
              <h2 className="mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900" style={{textAlign:"center", fontWeight: "700"}}>
                <span>7 Dimensional Telescope</span>
              </h2>
              {(hovered!=3)?<img className="inline-flex" src="/img/telescope.jpg" style={{height: "350px", width: "600px"}}/>:''}
              <h4 style={(hovered===3)?{paddingTop:"400px"}:{paddingTop:"50px"}}>
                {mainText4}
              </h4>
            </p>
          </div>
        </div>
        </a>
      </div>
        
      <div style={{backgroundColor:"#fff", paddingTop: "100px"}}>
        <div className="mx-auto w-full" style={{maxWidth: "1440px"}}>
          <div className="justify-center mb-5"  style={{maxWidth: "1200px", margin: "0 auto", color:"--pickled-bluewood-900"}}>
            <p>
              <h2 className="mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900" style={{textAlign:"center", fontWeight: "700"}}>
                Meet Our Latest News
              </h2>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center" style={{maxWidth: "1200px", margin: "0 auto", marginBottom:"5rem", textAlign:"center"}}>
            {news.news.map((news, index) => {
              index = index+1
              if (index<=3){
              return(
                <div className={`card card-${index}`} key={`card-${index}`}>
                  <img src={`./img/news/${news.imgName}`}></img>
                  <a href={news.webpage} target='_blank'>
                    <div className="card-img-hovered" style={{backgroundImage: `var(--card-img-hovered-overlay), url(./img/news/${news.imgName})`}}></div>
                  </a>
                  <div className="card-info">
                    <div className="card-about">
                      <a className={`card-tag ${news.type === "meeting" ? "tag-news" : news.type==="publication"? "tag-publication":news.type==="press"? "tag-press":null}`}>{news.type}</a>
                    <div className="card-time">{news.date}</div>
                    </div>
                    <h1 className="card-title">{news.title}</h1>
                    {news.type === "meeting" ?
                      <div className="card-creator">in <a href="">{news.place}</a></div> :
                    news.type === "publication" ?
                      <div className="card-creator">by <a href="">{news.shortAuthor}</a></div>:
                      <div className="card-creator">by <a href="">{news.source}</a></div>
                    }
                  </div>
                </div>
            )}})}
          </div>
        </div>
      </div>
      <div style={{backgroundColor:"#fff"}}>
        <div className="mx-auto w-full" style={{maxWidth: "1200px"}}>
          <div className="flex flex-wrap justify-between" >
            <a href="https://www.nrf.re.kr/eng/index" target="_blank"><img src="./img/institutes/nrf.jpg" style={{height:"100px", padding:"20px"}}/></a>
            <a href="https://gwuniverse.snu.ac.kr/" target="_blank"><img src="./img/institutes/gwuniv.png" style={{height:"100px", padding:"20px"}}/></a>
            <a href="https://en.snu.ac.kr/" target="_blank"><img src="./img/institutes/snu.jpeg" style={{height:"100px", padding:"20px"}}/></a>
          </div>
          <div className="flex flex-wrap justify-between" >
            <a href="https://www.kasi.re.kr/eng/index" target="_blank"><img src="./img/institutes/kasi.gif" style={{height:"100px", padding:"20px"}}/></a>
            <a href="https://www.ewha.ac.kr/ewhaen/index.do" target="_blank"><img src="./img/institutes/ewha.png" style={{height:"100px", padding:"20px"}}/></a>
            <a href="https://www.postech.ac.kr/eng/" target="_blank"><img src="./img/institutes/postech.png" style={{height:"100px", padding:"20px"}}/></a>
          </div>
        </div>
      </div>
      <div ref={rulerImageRef} style={{...rulerImage, position:"fixed", bottom: "0"}}></div>
    </div>
  );
}


export default MainPage;


