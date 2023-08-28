import {NavLink,Rocation,useParams,useLocation} from "react-router-dom";
import React, { useState, useEffect} from 'react' ;
import './play.css';

export const Play = () => {

  //ページを変えても値を受け渡すやつ
  const search = useLocation().search;

  const query2 = new URLSearchParams(search);
  
  //クリックして別の場所に移るためのもの
  const handleClick2 = () => {
    window.location.href = "/result";
  }
  
  return(
    <div>
      <div>プレイ画面</div>
      <button onClick={() => {handleClick2()}} id="hai">resultへ</button> 
    </div>
    
  );
}