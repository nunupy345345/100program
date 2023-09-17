import {NavLink,Rocation,useParams,useLocation} from "react-router-dom";
import React, { useState, useEffect} from 'react' ;
import './coupon.css';
import norenImage from "../images/header.png";
import midoriWaku from "../images/midoriWaku.png";
import yen20 from "../images/20yen.png";

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
   
  
   let splitList = receivedData1.split(',');
   
  return(
    <div>
      <header className='header'><img src={norenImage} onClick={() => handleClick1()}/></header>
      <body>
      <div className="receipt">お買い物レシート</div>
      <div className="list0">1.{splitList[0]}</div>
      <div className="list">
        <div className="explain">
          <div><img src={midoriWaku}/></div>
          <div><img src={yen20}/></div>
        </div>
        <div>2.{splitList[1]}</div>
        <div className="explain">
          <div><img src={midoriWaku}/></div>
          <div><img src={yen20}/></div>
        </div>
        <div>3.{splitList[2]}</div>
        <div className="explain">
          <div><img src={midoriWaku}/></div>
          <div><img src={yen20}/></div>
        </div>
        <div>4.{splitList[3]}</div>
        <div className="explain">
          <div><img src={midoriWaku}/></div>
          <div><img src={yen20}/></div>
        </div>
        <div>5.{splitList[4]}</div>
        <div className="explain">
          <div><img src={midoriWaku}/></div>
          <div><img src={yen20}/></div>
        </div>
        <div>6.{splitList[5]}</div>
        <div className="explain">
          <div><img src={midoriWaku}/></div>
          <div><img src={yen20}/></div>
        </div>
        <div>7.{splitList[6]}</div>
        <div className="explain">
          <div><img src={midoriWaku}/></div>
          <div><img src={yen20}/></div>
        </div>
        <div>8.{splitList[7]}</div>
        <div className="explain">
          <div><img src={midoriWaku}/></div>
          <div><img src={yen20}/></div>
        </div>
        <div>9.{splitList[8]}</div>
        <div className="explain">
          <div><img src={midoriWaku}/></div>
          <div><img src={yen20}/></div>
        </div>
        <div>10.{splitList[9]}</div>
        <div className="explain">
          <div><img src={midoriWaku}/></div>
          <div><img src={yen20}/></div>
        </div>
      </div>
      </body>
      <div className="missCount">missCounted: {receivedData2}</div>
      <div className="time">経過時間: {receivedData3} 秒</div>
    </div>
  )
}