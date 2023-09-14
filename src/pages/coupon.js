import {NavLink,Rocation,useParams,useLocation} from "react-router-dom";
import React, { useState, useEffect} from 'react' ;
import './start.css';
import norenImage from "../images/header.png";

export const Coupon  = () => {
  const handleClick1 = () => {
    window.location.href = "/start";
  }
   //ページを変えても値を受け渡すやつ
   const search = useLocation().search;

   const query2 = new URLSearchParams(search);

   //playから変数を受け取る用
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const receivedData1 = queryParams.get('var1');
   const receivedData2 = queryParams.get('var2');
   const receivedData3 = queryParams.get('time');
  return(
    <div>
    <h1>クーポン取得画面</h1>
    <div>{receivedData1}</div>
      <div>missCounted: {receivedData2}</div>
      <div>経過時間: {receivedData3} 秒</div>
    <button className="startButton" onClick={() => {handleClick1()}} id="hai">startへ</button> 
    </div>
  )
}