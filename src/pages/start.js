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
  
  return(
    <div>
      <div>スタート画面</div>
      <button onClick={() => {handleClick1()}} id="hai">playへ</button> 
    </div>
  );
}