import {NavLink,useParams,useLocation} from "react-router-dom";
import React, { useRef,useState, useEffect,KeyboardEvent} from 'react' ;
import './play.css';
import { keyboard } from "@testing-library/user-event/dist/keyboard";

export const Play = () => {

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
      'さ': ['sa'], 'し': ['si', 'shi', 'ci'], 'す': ['su'], 'せ': ['se', 'ce'], 'そ': ['so'],
      'た': ['ta'], 'ち': ['ti', 'chi'], 'つ': ['tu', 'tsu'], 'て': ['te'], 'と': ['to'],
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
      'ちゃ': ['tya', 'cha'], 'ちぃ': ['tyi'], 'ちゅ': ['tyu', 'chu'], 'ちぇ': ['tye', 'che'], 'ちょ': ['tyo', 'cho'],
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
      }else if (firstStr == 'っ') { //小い「つ」の場合
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
        } else if (firstStr == 'ん') { //n一つで完了させない処理（省略禁止）
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





  function Alljudgement(AllRoman){
    let idx1 = AllRoman.length;//取得リストの長さ
    let idx2 = 0;//プレイ中の場所
    let idx3 = 0;//何文字目か
    let pattern = new Array(AllRoman.length).fill(0);
    let temp = '';
    let isStart = true;

    while(isStart){
      judgement();
      let innerHTML = colorTyped();
      //TODO表示用関数を作って埋め込む
      console.log(innerHTML)
      return(
        <div className={StyleSheet.container}>
          <h1>タイピングゲーム</h1>
          <input type="text" />
          <div>{innerHTML}</div>
        <button onClick={() => {handleClick2()}} id="hai">resultへ</button> 
      </div>
      );
    }

    function judgement(){
      document.addEventListener('keydown',(event)=>{
        let key = event.key;//キーの取得
        temp += key;
        if (key == AllRoman[idx2][pattern[idx2]][idx3]){//候補の０番目に合致した時の処理
          if (idx3 < AllRoman[idx2][pattern[idx2]].length - 1){
            idx3 += 1;
          } else if (idx2 < idx1 - 1){
            idx2 += 1;
            idx3 = 0;
            temp = '';
          } else {
            isStart = false;
          }
        } else if (AllRoman[idx2].length > 1) {//候補に合致しないとき別の候補があれば参照
          let reg = new RegExp('^' + temp);
          for (let i = 0; i < AllRoman[idx2].length; i++) {
            if (!!AllRoman[idx2][i].match(reg)) {
              pattern[idx2] = i;//合致した時パターン変更
              break;
            }
          }
        }
      });
    }

    function colorTyped(){
      let html = '<div><span style="color:red">';
      for (let i = 0; i < idx2; i++){//成功箇所の色付け
        html += AllRoman[i][pattern[i]];
      }  
      for (let i = 0; i <= idx3; i++){
        html += AllRoman[idx2][pattern[idx2]][i];
      }
      html += '</span><span>';
      for (let i = AllRoman[idx2][pattern[idx2]].length + 1; i < AllRoman[idx2][pattern[idx2]].length; i++){
        html += AllRoman[idx2][pattern[idx2]][i];
      }
      for (let i = idx2 + 1; i < idx1; i++){
        html += AllRoman[i][pattern[i]];
      }
      html += '</span></div>';
      return html;
    }
  }

 

  //ページを変えても値を受け渡すやつ
  const search = useLocation().search;

  const query2 = new URLSearchParams(search);

  
  //クリックして別の場所に移るためのもの
  const handleClick2 = () => {
    window.location.href = "/result";
  }
  
  
const words = ["apple", "banana", "cherry", "grape", "orange", "strawberry", "watermelon", "pineapple", "blueberry", "raspberry"];
const totalQuestions = 10;


  const [currentWordIndex, setCurrentWordIndex] = useState(0); //現在の問題のインデックス
  const [currentInput, setCurrentInput] = useState(''); //現在の入力
  const [currentWord, setCurrentWord] = useState(words[currentWordIndex]);//現在の問題
  const [inputStatus, setInputStatus] = useState([]);//各文字のステータス(あってるか、間違ってるか、入力されたか)
  const [currentTextIndex,setcurrentTextIndex] = useState(0); //現在の文字が何番目かを出力させる
  //問題が変わるたびに実行されるもの
  useEffect(() => {
    setCurrentWord(words[currentWordIndex]); //問題を更新
    setCurrentInput(''); //入力を空にしなおす
    setInputStatus([]);  //入力されているステータス(あってるか、間違っているかを判別)
  }, [currentWordIndex]);
  
  //入力が変更されたときに呼ばれる関数
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setCurrentInput(inputValue); //現在の入力を更新する
    
    
    //新しく入力された文字のステータスをリストとして管理する
    const newInputStatus = [];
    for (let i = 0; i < inputValue.length; i++) {
      if (inputValue[i] === currentWord[i]) {
        newInputStatus.push('correct'); //正しくする
      } else {
        newInputStatus.push('incorrect');//間違った文字にする
      }
    }
    setInputStatus(newInputStatus); //入力ステータスを更新する(増やす)
  };

  const handleInputEnter = (e) => {
    if (e.key === 'Enter') {
      if (currentInput === currentWord) {
        if (currentWordIndex < totalQuestions - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
        } else {
          alert('ゲーム終了！お疲れさまでした！');
        }
      }
    }
  };

  return(
    <div>
    <h1>タイピングゲーム</h1>
    <p>問題: {currentWord}</p>
    <input
      type="text"
      value={currentInput}
      onChange={handleInputChange}
      onKeyDown={handleInputEnter}
    />
    <div>
      {currentWord.split('').map((letter, index) => (
        <span
          key={index}
          className={`letter ${inputStatus[index]}`} // 修正
        >
          {letter}
        </span>
      ))}
    </div>
    <button onClick={() => {handleClick2()}} id="hai">resultへ</button> 
  </div>
  );
}