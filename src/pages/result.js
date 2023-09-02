import {NavLink,Rocation,useParams,useLocation} from "react-router-dom";
import React, { useState, useEffect} from 'react' ;
import './result.css';

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
      <div>リザルト画面</div>
      <button onClick={() => {handleClick3()}} id="hai">startへ</button> 
      <button onClick={() => {handleClick4()}} id="hai">couponへ</button> 
    </div>
    
  );
}