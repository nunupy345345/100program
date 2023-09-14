import {NavLink,Rocation,useParams,useLocation} from "react-router-dom";
import React, { useState, useEffect} from 'react' ;
import './explain.css';
import norenImage from "../images/header.png";


export const Explain = () => {

  //ページを変えても値を受け渡すやつ
  const search = useLocation().search;

  const query2 = new URLSearchParams(search);

  //クリックして別の場所に移るためのもの
  const handleClick1 = () => {
    window.location.href = "/start";
  }

  return(
    <div>
      <div className='explain'>説明</div>
      <button className="startButton" onClick={() => {handleClick1()}} id="hai">startへ</button> 
    </div>
  );
}