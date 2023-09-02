import {NavLink,useParams,useLocation} from "react-router-dom";
import React, {useRef, useState, useEffect, KeyboardEvent} from 'react' ;
import './play.css';
import { keyboard } from "@testing-library/user-event/dist/keyboard";

  
const Play = () => {

  let allRoman = kanaToRoman('おちゃがし');
  let idx1 = allRoman.length;
  const initialListState = {
    a : kanaToRoman('おちゃがし'),
    i1 : allRoman.length,//取得リストの長さ
    i2 : 0,//プレイ中の場所
    i3 : 0,//何文字目か
    pn : new Array(idx1).fill(0),//複数候補がある場合のリスト
    tp : '',//複数候補がある場合の保存用
    iSt : true,//falseでゲーム終了
  };
  const [list, setList] = useState(initialListState);

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
        console.log('ohayo')
      } else if (idx2 < idx1 - 1){
        idx2 += 1;
        idx3 = 0;//次の項に移るため初期化
        temp = '';//次の項に移るため初期化
        console.log('hey')
      } else {
        idx3 = 0;//次の項に移るため初期化
        temp = '';//次の項に移るため初期化
        isStart = false;
        console.log('henta')
      }
    } else if (allRoman[idx2].length > 1) {//候補に合致しないとき別の候補があれば参照
      let reg = new RegExp('^' + temp);
      console.log('peach')
      for (let i = 0; i < allRoman[idx2].length; i++) {
        if (!!allRoman[idx2][i].match(reg)) {
          pattern[idx2] = i;//合致した時パターン変更
          break;
        }
      }
    };
    const newList = {
      a : allRoman,
      i1 : idx1,//取得リストの長さ
      i2 : idx2,//プレイ中の場所
      i3 : idx3,//何文字目か
      pn : pattern,//複数候補がある場合のリスト
      tp : temp,//複数候補がある場合の保存用
      iSt : isStart,//falseでゲーム終了
    };
    console.log(newList);
    setList(newList); 
    console.log(list);
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

  return(
    <div className="StyleSheet.container" onKeyDown={handleKeyDown} tabIndex={0}>
      <div dangerouslySetInnerHTML={{__html: colorTyped(list)}}/>
      <button onClick={() => {handleClick2()}} id="hai">resultへ</button> 
    </div>
  );
}

const colorTyped = (list) => {
  let allRoman = list.a;
  let idx1 = list.i1;
  let idx2 = list.i2;
  let idx3 = list.i3;
  let pattern = list.pn;

  let html = '<div><span style="color:red">';
  if (idx2 > 0) {
    for (let i = 0; i < idx2; i++){//成功箇所の色付け
      html += allRoman[i][pattern[i]];
    }  
  } 
  if (idx3 > 0) {
    for (let i = 0; i < idx3; i++){
      html += allRoman[idx2][pattern[idx2]][i];
    }
  }
  html += '</span><span>';
  for (let i = idx3; i < allRoman[idx2][pattern[idx2]].length; i++){
    html += allRoman[idx2][pattern[idx2]][i];
  }
  for (let i = idx2 + 1; i < idx1; i++){
    html += allRoman[i][pattern[i]];
  }
  html += '</span></div>';
  console.log(html);
  return html; 
}

//日本語からローマ字へ変更する
function kanaToRoman(kana) {
  let AllStr = String(kana); //入力の全文
  let roman =[]; //一字毎に変換されたローマ字
  let AllRoman = []; //最終的にここに格納してローマ字全文にする

  function cutting() { //日本語文を一字ずつ切り出す
    let oneChar = AllStr.slice(0, 1); 
    AllStr = AllStr.slice(1); //全文を一字切り出された状態にして保存
    return oneChar;
  }

  function isSmallChar() {
    return !!AllStr.slice(0, 1).match(/^[ぁぃぅぇぉゃゅょ]$/);
  }

  function SmallChar(firstStr){
    if (romanMap[firstStr]){//後ろまで見て一塊で表せる時
      roman = [...romanMap[firstStr]];
      for (let i=0; i<romanMap[firstStr.slice(0, 1)].length; i++){
        for (let j=0; j<romanMap[firstStr.slice(1)].length; j++){
          let mergeroma = romanMap[firstStr.slice(0, 1)][i] + romanMap[firstStr.slice(1)][j];
          roman.push(mergeroma);
        }
      }
    } else {//表せない時
      roman = [];//それぞれのromanMapを全通り足し合わせる
      for (let i=0; i<romanMap[firstStr.slice(0, 1)].length; i++){
        for (let j=0; i<romanMap[firstStr.slice(1)].length; j++){
          let mergeroma = romanMap[firstStr.slice(0, 1)][i] + romanMap[firstStr.slice(1)][j];
          roman.push(mergeroma);
        }
      }
    }
  }

  const romanMap = { //対応表
    'あ': ['a'], 'い': ['i', 'yi'], 'う': ['u', 'wu'], 'え': ['e'], 'お': ['o'],
    'か': ['ka', 'ca'], 'き': ['ki'], 'く': ['ku', 'cu', 'qu'], 'け': ['ke'], 'こ': ['ko', 'co'],
    'さ': ['sa'], 'し': ['shi', 'si', 'ci'], 'す': ['su'], 'せ': ['se', 'ce'], 'そ': ['so'],
    'た': ['ta'], 'ち': ['chi', 'ti'], 'つ': ['tu', 'tsu'], 'て': ['te'], 'と': ['to'],
    'な': ['na'], 'に': ['ni'], 'ぬ': ['nu'], 'ね': ['ne'], 'の': ['no'],
    'は': ['ha'], 'ひ': ['hi'], 'ふ': ['fu', 'hu'], 'へ': ['he'], 'ほ': ['ho'],
    'ま': ['ma'], 'み': ['mi'], 'む': ['mu'], 'め': ['me'], 'も': ['mo'],
    'や': ['ya'], 'ゆ': ['yu'], 'よ': ['yo'],
    'ら': ['ra'], 'り': ['ri'], 'る': ['ru'], 'れ': ['re'], 'ろ': ['ro'],
    'わ': ['wa'], 'ゐ': ['wyi'], 'ゑ': ['wye'], 'を': ['wo'], 'ん': ['nn', 'xn', 'n'],
    'が': ['ga'], 'ぎ': ['gi'], 'ぐ': ['gu'], 'げ': ['ge'], 'ご': ['go'],
    'ざ': ['za'], 'じ': ['ji', 'zi'], 'ず': ['zu'], 'ぜ': ['ze'], 'ぞ': ['zo'],
    'だ': ['da'], 'ぢ': ['di'], 'づ': ['du'], 'で': ['de'], 'ど': ['do'],
    'ば': ['ba'], 'び': ['bi'], 'ぶ': ['bu'], 'べ': ['be'], 'ぼ': ['bo'],
    'ぱ': ['pa'], 'ぴ': ['pi'], 'ぷ': ['pu'], 'ぺ': ['pe'], 'ぽ': ['po'],
    'うぁ': ['wha'], 'うぃ': ['whi'], 'うぇ': ['whe'], 'うぉ': ['who'],
    'きゃ': ['kya'], 'きぃ': ['kyi'], 'きゅ': ['kyu'], 'きぇ': ['kye'], 'きょ': ['kyo'],
    'くぁ': ['qa', 'qwa'], 'くぃ': ['qi', 'qwi'], 'くぇ': ['qe', 'qwe'], 'くぉ': ['qo', 'qwo'], 'くゃ': ['qya'], 'くゅ': ['qyu'], 'くょ': ['qyo'],
    'しゃ': ['sya', 'sha'], 'しぃ': ['syi'], 'しゅ': ['syu', 'shu'], 'しぇ': ['sye', 'she'], 'しょ': ['syo', 'sho'],
    'つぁ': ['tsa'], 'つぃ': ['tsi'], 'つぇ': ['tse'], 'つぉ': ['tso'],
    'ちゃ': ['tya', 'cha'], 'ちぃ': ['tyi'], 'ちゅ': ['chu', 'tyu'], 'ちぇ': ['tye', 'che'], 'ちょ': ['tyo', 'cho'],
    'てゃ': ['tha'], 'てぃ': ['thi'], 'てゅ': ['thu'], 'てぇ': ['the'], 'てょ': ['tho'],
    'とぁ': ['twa'], 'とぃ': ['twi'], 'とぅ': ['twu'], 'とぇ': ['twe'], 'とぉ': ['two'],
    'ひゃ': ['hya'], 'ひぃ': ['hyi'], 'ひゅ': ['hyu'], 'ひぇ': ['hye'], 'ひょ': ['hyo'],
    'ふぁ': ['fa'], 'ふぃ': ['fi'], 'ふぇ': ['fe'], 'ふぉ': ['fo'],
    'にゃ': ['nya'], 'にぃ': ['nyi'], 'にゅ': ['nyu'], 'にぇ': ['nye'], 'にょ': ['nyo'],
    'みゃ': ['mya'], 'みぃ': ['myi'], 'みゅ': ['myu'], 'みぇ': ['mye'], 'みょ': ['myo'],
    'りゃ': ['rya'], 'りぃ': ['ryi'], 'りゅ': ['ryu'], 'りぇ': ['rye'], 'りょ': ['ryo'],
    'ヴぁ': ['va'], 'ヴぃ': ['vi'], 'ヴ': ['vu'], 'ヴぇ': ['ve'], 'ヴぉ': ['vo'],
    'ぎゃ': ['gya'], 'ぎぃ': ['gyi'], 'ぎゅ': ['gyu'], 'ぎぇ': ['gye'], 'ぎょ': ['gyo'],
    'ぐぁ': ['gwa'], 'ぐぃ': ['gwi'], 'ぐぅ': ['gwu'], 'ぐぇ': ['gwe'], 'ぐぉ': ['gwo'],
    'じゃ': ['ja', 'zya'], 'じぃ': ['jyi', 'zyi'], 'じゅ': ['ju', 'zyu'], 'じぇ': ['je', 'zye'], 'じょ': ['jo', 'zyo'],
    'でゃ': ['dha'], 'でぃ': ['dhi'], 'でゅ': ['dhu'], 'でぇ': ['dhe'], 'でょ': ['dho'],
    'ぢゃ': ['dya'], 'ぢぃ': ['dyi'], 'ぢゅ': ['dyu'], 'ぢぇ': ['dye'], 'ぢょ': ['dyo'],
    'びゃ': ['bya'], 'びぃ': ['byi'], 'びゅ': ['byu'], 'びぇ': ['bye'], 'びょ': ['byo'],
    'ぴゃ': ['pya'], 'ぴぃ': ['pyi'], 'ぴゅ': ['pyu'], 'ぴぇ': ['pye'], 'ぴょ': ['pyo'],
    'ぁ': ['la', 'xa'], 'ぃ': ['li', 'xi'], 'ぅ': ['lu', 'xu'], 'ぇ': ['le', 'xe'], 'ぉ': ['lo', 'xo'],
    'ゃ': ['lya', 'xya'], 'ゅ': ['lyu', 'xyu'], 'ょ': ['lyo', 'xyo'], 'っ': ['ltu', 'xtu'],
    'ー': ['-'], '、': [','], '。': ['.'], '・': ['/']
  };

  while (AllStr) { //日本語文が存在する限り続く
    let firstStr = cutting(); //一文字目
    let next = romanMap[AllStr.slice(0, 1)]; //次の文字のローマ字
    if (!romanMap[firstStr]){
      roman = [...firstStr]; //ローマ字はそのまま　
    }else if (firstStr === 'っ') { //小い「つ」の場合
      if (!AllStr || AllStr.match(/^[,.]/) || !next || next[0].match(/^[aiueon]/)) {//後ろの文字により省略できない
        roman = [...romanMap[firstStr]];  
      } else { //省略できる
        firstStr = cutting();
        if (isSmallChar()) {//後ろが小さい文字の時
          firstStr += cutting();
          SmallChar(firstStr);
        };
        roman = [...romanMap[firstStr].map(str => str.slice(0, 1) + str)]; //後ろの文字の子音をひとつ増やしたものを追加
        for (let i=0; i<romanMap['っ'].length; i++){//省略しない場合も
          for (let j=0; j<romanMap[firstStr].length; j++){
            let mergeroma = romanMap['っ'][i] + romanMap[firstStr][j];
            roman.push(mergeroma);
          }
        }
      }
    } else {//小さな「つ」以外
      if (isSmallChar()) { //後ろが小さい文字の時
        firstStr += cutting();
        SmallChar(firstStr);
      } else if (firstStr === 'ん') { //n一つで完了させない処理（省略禁止）
        if (!AllStr) {
          roman.pop();
        } else {
          if (next[0].match(/^[aiueony]/)) {
            roman.pop();
          };
        }
      } else{
        roman = romanMap[firstStr];
      } 
    }
    AllRoman.push(roman);
  }
  return AllRoman;
}


export {kanaToRoman, Play};