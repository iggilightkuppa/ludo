function advance_the_game() {
  RollDice();
}

function RollDice() {
  //  スプレッドシートの読み込み
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  var insert_image_cell = spreadsheet.getRange("M1");

  var images = spreadsheet.getImages();
  images.forEach(function(image) {
    var position = image.getAnchorCell(); // 画像のアンカーセル（基準セル）を取得
    if (position.getA1Notation() === insert_image_cell.getA1Notation()) {
      image.remove(); // 画像を削除
    }
  });

  var result = random_dice();
  if(result == 1) {
    spreadsheet.insertImage("https://raw.githubusercontent.com/iggilightkuppa/ludo/main/images/dicefront_01.png", insert_image_cell.getColumn(), insert_image_cell.getRow());
  }
  else if(result == 2) {
    spreadsheet.insertImage("https://raw.githubusercontent.com/iggilightkuppa/ludo/main/images/dicefront_02.png", insert_image_cell.getColumn(), insert_image_cell.getRow());
  }
  else if(result == 3) {
    spreadsheet.insertImage("https://raw.githubusercontent.com/iggilightkuppa/ludo/main/images/dicefront_03.png", insert_image_cell.getColumn(), insert_image_cell.getRow());
  }
  else if(result == 4) {
    spreadsheet.insertImage("https://raw.githubusercontent.com/iggilightkuppa/ludo/main/images/dicefront_04.png", insert_image_cell.getColumn(), insert_image_cell.getRow());
  }
  else if(result == 5) {
    spreadsheet.insertImage("https://raw.githubusercontent.com/iggilightkuppa/ludo/main/images/dicefront_05.png", insert_image_cell.getColumn(), insert_image_cell.getRow());
  }
  else if(result == 6) {
    spreadsheet.insertImage("https://raw.githubusercontent.com/iggilightkuppa/ludo/main/images/dicefront_06.png", insert_image_cell.getColumn(), insert_image_cell.getRow());
  }
}

function random_dice () {
  return (generateRandomNumArray(666666, 30)[generateRandomNumArray(30, 1)[0]] % 6) + 1;
}


//重複しない1～maxNumの整数乱数を生成する関数
/**
 * @param {number} maxNum - 取りうる最大値
 * @param {number} generateArrayLength - 生成する配列の長さ
 * @return {number[]}
 */
function generateRandomNumArray(maxNum, generateArrayLength){
  let generateArray = []; //ランダム格納用配列
  let numberArray = []; //ランダム生成用配列

  //ランダム生成用配列を作成
  for(let i=0; i<maxNum; i++){
    numberArray[i] = i+1;
  }

  //ランダム格納用配列にランダム整数を格納
  for(let j=0,len=numberArray.length; j<generateArrayLength; j++,len--){
    let rndNum = Math.floor(Math.random()*len);
    generateArray.push(numberArray[rndNum]);
    numberArray[rndNum] = numberArray[len-1];
  }

  //debug
  for(let k=0; k<generateArray.length; k++){
    console.log(generateArray[k]);
  }

  return generateArray;
}//end function
