import {NavLink,Rocation,useParams,useLocation} from "react-router-dom";
import React, { useState, useEffect} from 'react' ;
import './start.css';

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
      <div>スタート画面</div>
      <button className="startButton" onClick={() => {handleClick1()}} id="hai">playへ</button> 
      <button className="startButton" onClick={() => {handleClick2()}} id="hai">compnanyへ</button> 
      <button className="startButton" onClick={() => {handleClick3()}} id="hai">explainへ</button> 
      
    </div>
  );
}