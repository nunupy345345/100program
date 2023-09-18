import {NavLink,Rocation,useParams,useLocation} from "react-router-dom";
import React, { useState, useEffect} from 'react' ;
import './start.css';
// import norenImage from "../images/header.png";
// import titleImage from "../images/title.jpg";
// import startImage from "../images/playbutton_2.png";
// import title2Image from "../images/title2.jpg";
// import scrollImage from "../images/scroll.jpg";
// import typingImage from "../images/typingImg.jpg";
// import explainTitleImage from "../images/explainTitle.jpg";
// import explainImage from "../images/explain.jpg";
// import companyTitle from "../images/companyTitle.jpg";
// import companyExplain from "../images/companyExplain.jpg";

export const Start = () => {

  //ページを変えても値を受け渡すやつ
  const search = useLocation().search;

  const query2 = new URLSearchParams(search);
  
  //クリックして別の場所に移るためのもの
  const handleClick1 = () => {
    window.location.href = "/play";
  }

  const handleClick2 = () => {
    window.location.href = "/company";
  }

  const handleClick3 = () => {
    window.location.href = "/explain";
  }

  return(
    <div>

      <header className='header'><img src='header.png'/></header>
      <div className='body'><img src='title.jpg'/><br/></div>
      <div className='title2'><img src='title2.jpg'/><br/></div>  
      <div className='startButton'><img src='playbutton_2.png' onClick={() => {handleClick1()}}/></div>  
      <div className='scroll'><img src='scroll.jpg'/><br/></div>
      <div className='explain'>
        <div>
          <img className='explainTitleImg' src='explainTitle.jpg'/>
          <p><img className="explainImg" src='explain.jpg'/></p>
        </div>
        <div><img className='typingImg' src='typingImg.jpg'/></div>
      </div> 
      <div className="companytitleImg"><img src='companyTitle.jpg'/></div>
      <div className="companyExplainImg"><img src='companyExplain.jpg'/></div>

    </div>
  );
}