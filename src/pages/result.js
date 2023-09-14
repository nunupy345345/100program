import {NavLink,Rocation,useParams,useLocation,useNavigate} from "react-router-dom";
import React, { useState, useEffect} from 'react' ;
import './result.css';
//import sendDataToAnotherPage from "./play.js";
import norenImage from "../images/header.png";
import yazirushiImage from "../images/yazirushi.jpg";
import yazirushiExplainImage from "../images/yazirushiExplain.jpg";
import arigatouImage from "../images/arigatou.jpg";
import ToTitleImage from "../images/ToTitle.jpg";

export const Result = () => {

  //ページを変えても値を受け渡すやつ
  const search = useLocation().search;

  const query2 = new URLSearchParams(search);

  //couponに変数を送信するよう
  const navigate = useNavigate();
  const sendDataToAnotherPage = () => {//coupon画面に表示する用 改　
   const variable1 = receivedData1;
   const variable2 = receivedData2;
   const time = receivedData3;
   navigate(`/coupon?var1=${variable1}&var2=${variable2}&time=${time}`);
 };
  
  //クリックして別の場所に移るためのもの
  const handleClick3 = () => {
    window.location.href = "/start";
  }

  //クリックして別の場所に移るためのもの
  const handleClick4 = () => {
    //window.location.href = "/coupon";
    sendDataToAnotherPage();
  }
  
   //playから変数を受け取る用
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const receivedData1 = queryParams.get('var1');
   const receivedData2 = queryParams.get('var2');
   const receivedData3 = queryParams.get('time');
   
   

  return(
    <div>

      <div className='header'><img src={norenImage} onClick={() => {handleClick4()}}/></div>
      <div className='yazirushi'><img src={yazirushiImage}/></div>
      <div className='yazirushiExplain'><img src={yazirushiExplainImage}/></div>
      {/* <div>{receivedData1}</div>
      <div>missCounted: {receivedData2}</div>
      <div>経過時間: {receivedData3} 秒</div> */}
      <div className='arigatou'><img src={arigatouImage}/></div>
      <div className='ToTitle' onClick={() => {handleClick3()}}><img src={ToTitleImage}/></div>

    </div>
    
  );
}