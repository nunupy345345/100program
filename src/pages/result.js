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

  //クリックして他の場所に移るためのもの
  const handleClick4 = () => {
    window.location.href = "/coupon";
  }

  //playから変数を受け取る用
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const receivedData1 = queryParams.get('var1');
  const receivedData2 = queryParams.get('var2');
  const receivedData3 = queryParams.get('time');
  
  return(
    <div>
      <div>リザルト画面</div>
      <div>{receivedData1}</div>
      <div>missCounted: {receivedData2}</div>
      <div>経過時間: {receivedData3} 秒</div>
      <button onClick={() => {handleClick3()}} id="hai">startへ</button> 
      <button onClick={() => {handleClick4()}} id="hai">couponへ</button>
    </div>
    
  );
}