 export const colorTyped = (list, showList) => {
  let allRoman = showList.a;
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
