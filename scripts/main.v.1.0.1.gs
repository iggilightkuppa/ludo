function RESET() {
  dice = 0;
  turn = 0;
  FIRST_A = ["A", "B2"];
  FIRST_B = ["B", "C2"];
  FIRST_C = ["C", "B3"];
  FIRST_D = ["D", "C3"];

  SECOND_A = ["A", "I2"];
  SECOND_B = ["B", "J2"];
  SECOND_C = ["C", "I3"];
  SECOND_D = ["D", "J3"];

  THIRD_A = ["A", "I9"];
  THIRD_B = ["B", "J9"];
  THIRD_C = ["C", "I10"];
  THIRD_D = ["D", "J10"];

  FOURTH_A = ["A", "B9"];
  FOURTH_B = ["B", "C9"];
  FOURTH_C = ["C", "B10"];
  FOURTH_D = ["D", "C10"];

  return;
}

var dice = 0;

// [タイプ, 位置]
var FIRST_A = ["A", "B2"];
var FIRST_B = ["B", "C2"];
var FIRST_C = ["C", "B3"];
var FIRST_D = ["D", "C3"];

var SECOND_A = ["A", "I2"];
var SECOND_B = ["B", "J2"];
var SECOND_C = ["C", "I3"];
var SECOND_D = ["D", "J3"];

var THIRD_A = ["A", "I9"];
var THIRD_B = ["B", "J9"];
var THIRD_C = ["C", "I10"];
var THIRD_D = ["D", "J10"];

var FOURTH_A = ["A", "B9"];
var FOURTH_B = ["B", "C9"];
var FOURTH_C = ["C", "B10"];
var FOURTH_D = ["D", "C10"];

var turn = 0;
var player = "";

waiting_area = ["B2", "C2", "B3", "C3", "I2", "J2", "I3", "J3", "I9", "J9", "I10", "J10", "B9", "C9", "B10", "C10"];

function piece_start(piece) {
  var still_waiting = false;
  for(let i = 0; i < 16; i++) {
    if(piece[1] == waiting_area[i]) still_waiting = true;
  }
  return (!still_waiting);
}

function set_player() {
  if(turn % 4 === 0) player = "FIRST";
  if(turn % 4 === 1) player = "SECOND";
  if(turn % 4 === 2) player = "THIRD";
  if(turn % 4 === 3) player = "FOURTH";
  return;
}

function player_start(Name) {
  var already_start = false;
  if(Name == "FIRST") {
    if(piece_start(FIRST_A)) already_start = true;
    if(piece_start(FIRST_B)) already_start = true;
    if(piece_start(FIRST_C)) already_start = true;
    if(piece_start(FIRST_D)) already_start = true;
    return already_start;
  }
  if(Name == "SECOND") {
    if(piece_start(SECOND_A)) already_start = true;
    if(piece_start(SECOND_B)) already_start = true;
    if(piece_start(SECOND_C)) already_start = true;
    if(piece_start(SECOND_D)) already_start = true;
    return already_start;
  }
  if(Name == "THIRD") {
    if(piece_start(THIRD_A)) already_start = true;
    if(piece_start(THIRD_B)) already_start = true;
    if(piece_start(THIRD_C)) already_start = true;
    if(piece_start(THIRD_D)) already_start = true;
    return already_start;
  }
  if(Name == "FOURTH") {
    if(piece_start(FOURTH_A)) already_start = true;
    if(piece_start(FOURTH_B)) already_start = true;
    if(piece_start(FOURTH_C)) already_start = true;
    if(piece_start(FOURTH_D)) already_start = true;
    return already_start;
  }
  return false;
}

function canmove() {
  return false;
}

function advance_the_game() {
  set_player();
  RollDice();
  if(!canmove()) {
    Browser.msgBox("パス");
    return;
  }
  Browser.msgBox(player);
  Browser.msgBox(dice);
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
  var dice_url = randomdice_image_url(result);
  spreadsheet.insertImage(dice_url, insert_image_cell.getColumn(), insert_image_cell.getRow());
  dice = result;
}

function randomdice_image_url(result) {
  if(result === 1) return "https://raw.githubusercontent.com/iggilightkuppa/ludo/main/images/dicefront_01.png";
  if(result === 2) return "https://raw.githubusercontent.com/iggilightkuppa/ludo/main/images/dicefront_02.png";
  if(result === 3) return "https://raw.githubusercontent.com/iggilightkuppa/ludo/main/images/dicefront_03.png";
  if(result === 4) return "https://raw.githubusercontent.com/iggilightkuppa/ludo/main/images/dicefront_04.png";
  if(result === 5) return "https://raw.githubusercontent.com/iggilightkuppa/ludo/main/images/dicefront_05.png";
  if(result === 6) return "https://raw.githubusercontent.com/iggilightkuppa/ludo/main/images/dicefront_06.png";
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
