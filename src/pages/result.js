import {NavLink,Rocation,useParams,useLocation} from "react-router-dom";
import React, { useState, useEffect} from 'react' ;
import './result.css';
import norenImage from "../images/header.png";
import yazirushiImage from "../images/yazirushi.jpg";
import yazirushiExplainImage from "../images/yazirushiExplain.jpg";
import arigatouImage from "../images/arigatou.jpg";
import ToTitleImage from "../images/ToTitle.jpg";

export const Result = () => {

  //ページを変えても値を受け渡すやつ
  const search = useLocation().search;

  const query2 = new URLSearchParams(search);
  
  //クリックして別の場所に移るためのもの
  const handleClick3 = () => {
    window.location.href = "/start";
  }
  //クリックして別の場所に移るためのもの
  const handleClick4 = () => {
    window.location.href = "/coupon";
  }
  
  return(
    <div>
      <div className='header'><img src={norenImage} onClick={() => {handleClick4()}}/></div>
      <div className='yazirushi'><img src={yazirushiImage}/></div>
      <div className='yazirushiExplain'><img src={yazirushiExplainImage}/></div>
      <div className='arigatou'><img src={arigatouImage}/></div>
      <div className='ToTitle' onClick={() => {handleClick3()}}><img src={ToTitleImage}/></div>
    </div>
    
  );
}