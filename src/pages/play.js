import {NavLink,Rocation,useParams,useLocation} from "react-router-dom";
import React, { useState, useEffect,KeyboardEvent} from 'react' ;
import './play.css';

export const Play = () => {

  //ページを変えても値を受け渡すやつ
  const search = useLocation().search;

  const query2 = new URLSearchParams(search);

  //タイピングするローマ字のリスト
  const RomasText = ["AROMA","MAC","WINDOW"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] =useState(0);

  
  // 次の問題に進む処理
  const moveToNextText = () => {
    setCurrentTextIndex((prevIndex) => (prevIndex + 1));
    setTypedText('');
    setCurrentIndex(0);
  }

  //キーが押されたときにそのキーが合ってたら状態を更新する
  const handleKeyPress = (KeyboardEvent) =>{
    const typedChar = KeyboardEvent.key;

    //問題のテキスト
    const currentText = RomasText[currentTextIndex];

    if (currentIndex !== currentText.length -1) {
      //タイプされた文字が正しい場合
    if (typedChar === currentText[currentIndex]) {
      setTypedText((prevTypedText) => prevTypedText + typedChar);
      setCurrentIndex((prevIndex) => prevIndex +1);
    }
    //<Todo>ミスカウントも表示させる
    } else{
      moveToNextText();
    }
  };
  
  // コンポーネントがマウントされたときにキーボードイベントのリスナーを追加し、
  // アンマウント時にリスナーを削除する
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  },[currentIndex, currentTextIndex]);
  
  //テキスト表示用
  const renderText = () => {
    const currentText = RomasText[currentTextIndex];

    return currentText.split('').map((char, index) => {
      if (index < typedText.length) {
        //タイプされた文字と一致している場合は黒色、一致しない場合は灰色にする
        const color = char === typedText[index] ? 'black' : 'gray';
        return (
          <span key={index} style={{color}}>{char}</span>
        );
      }
      return (
        <span key={index} style={{color:'gray'}}>{char}</span>
      );
    })
  }
  //クリックして別の場所に移るためのもの
  const handleClick2 = () => {
    window.location.href = "/result";
  }
  
  return(
    <div className={StyleSheet.container}>
      <div>プレイ画面</div>
      <p>
        {RomasText.map((char,index) => (
          <span ket={index} style={{color: index === currentTextIndex ? 'black' :'gray'}}>
            {char}
          </span>
        ))}
      </p>
      <input 
         type="text"
         onKeyDown={handleKeyPress}
         value={typedText}
         readOnly={currentTextIndex !== RomasText.length -1}
      />
      <button onClick={() => {handleClick2()}} id="hai">resultへ</button> 
    </div>
    
  );
}