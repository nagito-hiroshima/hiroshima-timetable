
    /*
 *** バスの時刻表データを「NextBus(TBL)」に準じた形式で *****
 *** 先頭の要素には＃ で始まるバス停の名称をセット   *****
*/
var tblData = [
    // 一つ目の時刻表
    [
    '# 盛岡BC',
    'a: BB',
    '07: aa43 58',
    '08: 13 28 43 58',
    '09: 13 15 17 28 48',
    '10: 03 15 23 43',
    '11: 03 23 43',
    '12: 03 23 43',
    '13: 03 15 23 43',
    '14: 03 15 23 43',
    '15: 03 15 32 52',
    '16: 03 12 32 52',
    '17: 03 04 12 17 20 22 27 33 38 43 45 48 53',
    '18: 03 13 23 33 43 53',
    '19: 03 13 23 33 43 53',
    '20: 12 32 52',
    '21: 22 52',
    '22: 22 52'
],
// 二つ目の時刻表
[
    '# 中央郵便局前',
    '07: 08 18 26 28 33 41 46 51',
    '08: 01 06 11 21 31 36 39 41 49 51 56 59',
    '09: 01 01 09 10 11 19 21 29 31 39 41 59',
    '10: 01 19 21 39 41 59',
    '11: 01 19 21 39 41 59',
    '12: 01 19 21 39 41 59',
    '13: 01 19 21 39 41 59',
    '14: 01 19 21 39 41 59',
    '15: 01 19 21 38 39 56 58 59',
    '16: 18 19 38 39 58',
    '17: 02 10 12 18 22 23 28 32 33 39 42 44 49 51 52 54 59',
    '18: 02 09 12 19 22 29 32 39 42 49 52 59',
    '19: 02 09 12 19 22 29 32 39 42 49 49 59 59',
    '20: 18 19 38 39 58 59',
    '21: 28 29 58 59',
    '22: 28 29 58 59'
],
// 三つ目の時刻表
[
    '# 盛岡駅前',
    '06: 40',
    '07: 02 12 22 27 32 37 42 52 57',
    '08: 02 07 12 22 32 42 52',
    '09: 02 12 22 32 52',
    '10: 12 32 52',
    '11: 12 32 52',
    '12: 12 32 52',
    '13: 12 32 52',
    '14: 12 32 52',
    '15: 12 32 52',
    '16: 12 32 55',
    '17: 05 15 25 35 45 55',
    '18: 05 15 25 35 45 55',
    '19: 05 15 25 35 45 52',
    '20: 12 32 52',
    '21: 22 52',
    '22: 22 52'
],
// 四つ目の時刻表
[
    '# 岩手大学前',
    // これ以前は本数が多いので省略
    '10: 03 05 23 25 43 45 52',
    '11: 03 05 23 25 43 45 52',
    '12: 03 05 23 25 43 45 52',
    '13: 03 05 23 25 43 45 52',
    '14: 03 05 23 25 43 45 52',
    '15: 03 05 23 25 43 45 52',
    '16: 00 02 03 12 22 23 42 43',
    '17: 02 06 12 14 16 22 26 27 32 36 37 43 46 48 53 55 56 58',
    '18: 03 06 13 16 23 26 33 36 43 46 53 56',
    '19: 03 06 13 16 23 26 33 36 43 46 53 53',
    '20: 03 03 22 23 42 43',
    '21: 02 03 32 33',
    '22: 02 03 32 33',
    '23: 02 03'
    ]
];  // 時刻表全体の宣言終了

/* ************* バス時刻表の設定はここまで ******************* */

var busTables = [];

function  hms(tim) {
    if (tim == '')  return ' ';
    return ('00' + Math.floor(tim / (60 * 60))).slice(-2) + ':' + ('00' + Math.floor((tim % (60 * 60)) / 60)).slice(-2) + ':' + ('00' + (tim % 60)).slice(-2);
};

function  hm(tim) {
    if (tim == '') return ' ';
    return  ('00' + Math.floor(tim / (60 * 60))).slice(-2) + ':' + ('00' + Math.floor((tim % (60 * 60)) / 60)).slice(-2);
};

function hm2Time(hm) {
    return (Math.floor((hm / 100)) * (60 * 60) + (hm % 100) * 60);
}

function tableSet() {
  for (i = 0; i < tblData.length; i++){
    var bTable = tblData[i];
    for (j = 0; j < bTable.length; j++){
      if (bTable[j].charAt(0) == "#") {
        var tbleEl = [bTable[j].substring(2)]; // バス停名を先頭要素にセット
      } else {
        var lineData = bTable[j].split(":");
        var hh = lineData[0];
        if (isFinite(hh)) {   // ：の前が数値だったら
          var minData = lineData[1].split(" ");
          for (k = 0; k < minData.length; k++){
            var mm = (minData[k]).replace(/\D/g,"");
            var hhmm = hh * 100 + parseInt(mm, 10);
            if (isFinite(hhmm)) {
              tbleEl.push(hhmm);
            }
          }
        }
      }
    }
    busTables.push(tbleEl);
  }
}

function clock() {
    document.getElementById("bus_stop").innerHTML = busTables[tableNo][0];
    var now = new Date();
    var nowTime = (now.getHours() * 60 * 60) + (now.getMinutes() * 60) + now.getSeconds();
//  var tbl = busTables[tableNo];
    var bTime, nbTime, nnbTime;
    bTime = nbTime = nnbTime = '';
    for (var i = 1; i < busTables[tableNo].length; i++) {
        var bt = busTables[tableNo][i];
        if (bt > (now.getHours() * 100 + now.getMinutes())) {
            bTime = hm2Time(bt);
            if ((i + 1) < busTables[tableNo].length) {
                nbTime = hm2Time(busTables[tableNo][i + 1]);
                if ((i + 2) < busTables[tableNo].length) {
                    nnbTime = hm2Time(busTables[tableNo][i + 2]);
                };
            };
            break;
        }
    };
    document.getElementById("clock_time").innerHTML = hms(nowTime);
    document.getElementById("bus").innerHTML = hm(bTime);
    document.getElementById("timeLeft").innerHTML = hms(bTime -nowTime);
    document.getElementById("nbus").innerHTML = hm(nbTime);
    document.getElementById("nnbus").innerHTML = hm(nnbTime);
};

function startClock() {
  tableSet();
    // 時刻表を切り替えるボタンをHTMLに追加する
    var div_button = document.createElement("div");
    var btn_element ="";
    tableNo = 0;
    for (i = 0; i < busTables.length; i++) {
        btn_element = btn_element + ' <input type="button" value="' + busTables[i][0] + '" onclick="';
        btn_element = btn_element + 'tableNo = ' + i + ';"/>';
        div_button.innerHTML = btn_element;
    };
    document.getElementById("btn").appendChild(div_button);

    // 上記のclock関数を1000ミリ秒ごと(毎秒)に実行する
    setInterval(clock, 1000);
};

function startClock2() {
    tableSet();
      // 時刻表を切り替えるボタンをHTMLに追加する
      var div_button = document.createElement("div");
      var btn_element ="";
      tableNo = 0;
      for (i = 0; i < busTables.length; i++) {
          btn_element = btn_element + ' <input type="button" value="' + busTables[i][0] + '" onclick="';
          btn_element = btn_element + 'tableNo = ' + i + ';"/>';
          div_button.innerHTML = btn_element;
      };
      document.getElementById("btn").appendChild(div_button);
  
      // 上記のclock関数を1000ミリ秒ごと(毎秒)に実行する
      setInterval(clock, 1000);
  };