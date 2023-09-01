import {NavLink,useParams,useLocation} from "react-router-dom";
import React, {useRef, useState, useEffect, KeyboardEvent} from 'react' ;
import './play.css';
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { kanaToRoman } from "./kanaToRoman";
import { colorTyped } from "./colorTyped";
import { anime_word_list } from "./words";

  
export const Play = () => {
  let list_length = anime_word_list.length;
  const randomNumber = Math.floor(Math.random()*list_length);
  let allRoman = kanaToRoman(anime_word_list[randomNumber][1]);
  let idx1 = allRoman.length;

  const initialListState = {
    a : kanaToRoman(anime_word_list[randomNumber][1]),
    i1 : allRoman.length,//取得リストの長さ
    i2 : 0,//プレイ中の場所
    i3 : 0,//何文字目か
    pn : new Array(idx1).fill(0),//複数候補がある場合のリスト
    tp : '',//複数候補がある場合の保存用
    iSt : true,//falseでゲーム終了
  };

  const [title, setTitle] = useState(anime_word_list[randomNumber][0]);
  const [jaTitle, setJaTitle] = useState(anime_word_list[randomNumber][1]);
  const [list, setList] = useState(initialListState);
  const [colorTypedOutput, setColorTypedOutput] = useState('');

  const startNewRound = () => {
    const newRandomNumber = Math.floor(Math.random() * anime_word_list.length);
    const newAllRoman = kanaToRoman(anime_word_list[newRandomNumber][1]);

    setTitle(anime_word_list[newRandomNumber][0]);
    setJaTitle(anime_word_list[newRandomNumber][1]);
    const newList2 = {
      a: newAllRoman,
      i1: newAllRoman.length,
      i2: 0,
      i3: 0,
      pn: new Array(newAllRoman.length).fill(0),
      tp: '',
      iSt: true,
    }
    setList(newList2);
  };

  const judgement = (event,list) => {
    let allRoman = list.a;
    let idx1 = list.i1;
    let idx2 = list.i2;
    let idx3 = list.i3;
    let pattern = list.pn;
    let temp = list.tp;
    let isStart = list.iSt;
    let key = event.key;//キーの取得
    console.log(key);
    temp += key;
    if (key === allRoman[idx2][pattern[idx2]][idx3]){//候補の０番目に合致した時の処理
      if (idx3 < allRoman[idx2][pattern[idx2]].length - 1){
        idx3 += 1;
      } else if (idx2 < idx1 - 1){
        idx2 += 1;
        idx3 = 0;//次の項に移るため初期化
        temp = '';//次の項に移るため初期化
      } else {
        idx3 += 1;//次の項に移るため初期化
        temp = '';//次の項に移るため初期化
        isStart = false;
        startNewRound();
      }
    } else if (allRoman[idx2].length > 1) {//候補に合致しないとき別の候補があれば参照
      let reg = new RegExp('^' + temp);
      for (let i = 0; i < allRoman[idx2].length; i++) {
        if (!!allRoman[idx2][i].match(reg)) {
          pattern[idx2] = i;//合致した時パターン変更
          if (idx3 === allRoman[idx2][pattern[idx2]].length - 1){
            idx3 = 0;
            idx2 += 1;
            temp = '';
          } else {
            idx3 = temp.length;
            temp = '';
          }
        }
      }
    };
    console.log(list);
    const newList = {
      a : allRoman,
      i1 : idx1,//取得リストの長さ
      i2 : idx2,//プレイ中の場所
      i3 : idx3,//何文字目か
      pn : pattern,//複数候補がある場合のリスト
      tp : temp,//複数候補がある場合の保存用
      iSt : isStart,//falseでゲーム終了
    };
    console.log("List updated:", list);
    setList(newList); 
  };
  
  /*
  const [typedText, setTypedText] = useState('');
  const [currentKana, setCurrentKana] = useState('おちゃ'); // テスト用のかな文字
  //const [allRoman, setAllRoman] = useState([]); // ローマ字のリスト
  const [currentIndex, setCurrentIndex] = useState(0); // インデックスの管理
  
  useEffect(() => {
    // かな文字をローマ字に変換
    setAllRoman(kanaToRoman(currentKana));
  }, [currentKana]);
  */
  
  //ページを変えても値を受け渡すやつ
  const search = useLocation().search;
  const query2 = new URLSearchParams(search);
  
  //クリックして別の場所に移るためのもの
  const handleClick2 = () => {
    window.location.href = "/result";
  }
  const handleKeyDown = (event) => {
    judgement(event,list);
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown',handleKeyDown);
    };
  },[list]);

  useEffect(() => {
    const updateHTML = colorTyped(list);
    setColorTypedOutput(updateHTML);
  }, [list]);

  return(
    <div className="StyleSheet.container" onKeyDown={handleKeyDown} tabIndex={0}>
      <div>{title}</div>
      <div>{jaTitle}</div>
      <div dangerouslySetInnerHTML={{__html: colorTypedOutput }}/>
      <button onClick={() => startNewRound()} id="hai">Next Round</button>
      <button onClick={() => {handleClick2()}} id="hai">resultへ</button> 
    </div>
  );
}

