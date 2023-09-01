//日本語からローマ字へ変更する
export const kanaToRoman = function (kana) {
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
    'ゔぁ': ['va'], 'ゔぃ': ['vi'], 'ゔ': ['vu'], 'ゔぇ': ['ve'], 'ゔぉ': ['vo'],
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
          roman = ['nn', 'xn'];
        } else {
          if (next[0].match(/^[aiueony]/)) {
            roman = ['nn', 'xn'];
          };
          roman = romanMap[firstStr];
        }
      } else{
        roman = romanMap[firstStr];
      } 
    }
    AllRoman.push(roman);
  }
  return AllRoman;
}

