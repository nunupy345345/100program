import {NavLink,Rocation,useParams,useLocation} from "react-router-dom";
import React, { useState, useEffect} from 'react' ;
import './company.css';

export const Company = () => {

  //ページを変えても値を受け渡すやつ
  const search = useLocation().search;

  const query2 = new URLSearchParams(search);

  //クリックして別の場所に移るためのもの
  const handleClick = () => {
    window.location.href = "/start";
  }

  return(
    <div>
      <div className='explain'>協賛企業様</div>
      <button className="startButton" onClick={() => {handleClick()}} id="hai">startへ</button> 
    </div>
  );
}