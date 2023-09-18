import {NavLink,useParams,useLocation,useNavigate} from "react-router-dom";
import React, {useRef, useState, useEffect, KeyboardEvent} from 'react' ;
import './play.css';
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { kanaToRoman } from "./KanaToRoman";
import { colorTyped } from "./colorTyped";
import { TypingTimer } from "./timer";
import { anime_word_list } from "./words";
import norenImage from "../images/header.png";
  
export const Play = () => {
    
  //ページを変えても値を受け渡すやつ
  const search = useLocation().search;
  const query2 = new URLSearchParams(search);
  
  let list_length = anime_word_list.length;
  const randomNumber = Math.floor(Math.random()*list_length);
  let allRoman = kanaToRoman(anime_word_list[randomNumber][1]);
  let idx1 = allRoman.length;

  const initialListState = {
    i1 : allRoman.length,//取得リストの長さ
    i2 : 0,//プレイ中の場所
    i3 : 0,//何文字目か
    pn : new Array(idx1).fill(0),//複数候補がある場合のリスト
    tp : '',//複数候補がある場合の保存用
    iSt : true,//falseでゲーム終了
  };
  const initialShowList = {
    title: anime_word_list[randomNumber][0],
    jaTitle: anime_word_list[randomNumber][1],
    a: kanaToRoman(anime_word_list[randomNumber][1])
  };
  const [showList, setShowList] = useState(initialShowList);//表示用
  const [historyList, setHistoryList] = useState([]);//resultでの表示用
  const [missCounted, setMissCounted] = useState(0);
  const [list, setList] = useState(initialListState);//judgementやcolorTypedで用いる変数
  const [count, setCount] = useState(0);//何回目の文章セットか
  const [elapsedTime, setElapsedTime] = useState(0);//タイマー関連
  <TypingTimer onUpdate={(time) => {
    setElapsedTime(time);
  }}/>
  const [colorTypedOutput, setColorTypedOutput] = useState('');//colorTypedを呼ぶのに用いる本当に必要かは要検討

  const startNewRound = () => {//新しい文章セットの用意
    const newRandomNumber = Math.floor(Math.random() * anime_word_list.length);
    const newAllRoman = kanaToRoman(anime_word_list[newRandomNumber][1]);
    setShowList({
      title: anime_word_list[newRandomNumber][0],
      jaTitle: anime_word_list[newRandomNumber][1],
      a: newAllRoman
    });
    setList({
      i1: newAllRoman.length,
      i2: 0,
      i3: 0,
      pn: new Array(newAllRoman.length).fill(0),
      tp: '',
      iSt: true,
    });
  };

  const Judgement = (event,list, showList) => {
    let allRoman = showList.a;
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
        setHistoryList([...historyList, showList.title]);
        setCount(count+1);
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
          }
        } else {
          temp = temp.slice(0,-1);
        }
      }
    }else {
      temp = temp.slice(0,-1);
      setMissCounted(missCounted + 1);
    };
    if (isStart){
      const newList = {
        i1 : idx1,//取得リストの長さ
        i2 : idx2,//プレイ中の場所
        i3 : idx3,//何文字目か
        pn : pattern,//複数候補がある場合のリスト
        tp : temp,//複数候補がある場合の保存用
        iSt : isStart,//falseでゲーム終了
      };
      console.log(list);
      console.log(showList);
      setList(newList); 
    } 
  };

  //resultに変数を送信するよう
  const navigate = useNavigate();
  const sendDataToAnotherPage = () => {//result画面に表示する用 改　
    const variable1 = historyList;
    const variable2 = missCounted
    navigate(`/result?var1=${variable1}&var2=${variable2}&time=${elapsedTime}`);
  };

  //クリックして別の場所に移るためのもの
  const handleClick2 = () => {
    sendDataToAnotherPage();
  }
  const handleKeyDown = (event) => {
    if (!event.repeat){
      Judgement(event,list,showList);
    }
  }

  useEffect(() => {
    const handleDocumentKeyDown = (event) => {
        if (!event.repeat){
            Judgement(event, list, showList);
        }
    }
    document.addEventListener('keydown', handleDocumentKeyDown);
    return () => {
        document.removeEventListener('keydown', handleDocumentKeyDown);
    };
}, [list, showList]);
  
  useEffect(() => {
    const updateHTML = colorTyped(list, showList);
    setColorTypedOutput(updateHTML);
  }, [list, showList]);

  useEffect(() => {
    if (count === 10){
      sendDataToAnotherPage();
    }
  },[count]);

  return(
    <div className="StyleSheet.container" onKeyDown={handleKeyDown} tabIndex={0}>
      <header className='header'><img src={norenImage}/></header>
      <TypingTimer onUpdate={(time) => setElapsedTime(time)} />
      <div className="Title">{showList.title}</div>
      <div className="hurigana">{showList.jaTitle}</div>
      <div dangerouslySetInnerHTML={{__html: colorTypedOutput }}/>
      <button onClick={() => startNewRound()} id="hai">Next Round</button>
      <button onClick={() => {handleClick2()}} id="hai">resultへ</button> 
    </div>
  );
}

