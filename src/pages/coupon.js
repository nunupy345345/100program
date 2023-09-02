import {NavLink,Rocation,useParams,useLocation} from "react-router-dom";
import React, { useState, useEffect} from 'react' ;
import './start.css';

export const Coupon  = () => {
  const handleClick1 = () => {
    window.location.href = "/start";
  }
  return(
    <div>
    <h1>クーポン取得画面</h1>
    <button className="startButton" onClick={() => {handleClick1()}} id="hai">startへ</button> 
    </div>
  )
}