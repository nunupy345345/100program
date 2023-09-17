import {NavLink,Rocation,useParams,useLocation} from "react-router-dom";
import React, { useState, useEffect} from 'react' ;
import './start.css';
import norenImage from "../images/header.png";
import titleImage from "../images/title.jpg";
import startImage from "../images/playbutton_2.png"

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
      <header className='header'><img src={norenImage}/></header> 
      <div className="'body"><img src={titleImage}/><br/></div>
      <div className="startButton"><img src={startImage}></img></div>
      <button className="playButton" onClick={() => {handleClick1()}} id="hai">playへ</button> 
      <button className="companyButton" onClick={() => {handleClick2()}} id="hai">compnanyへ</button> 
      <button className="explainButton" onClick={() => {handleClick3()}} id="hai">explainへ</button>

    </div>
  );
}