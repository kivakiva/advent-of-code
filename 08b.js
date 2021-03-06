/* description

logic
*/

const fs = require('fs')

data = fs.readFileSync('./data/08-input.txt', 'utf-8')

let code = 
data
.split('\n')
.map(a => a.split('|'))
.flat()
.filter(a => !a.includes('\r') && a.length !== 0)
.map(a => a
  .trim()
  .split(" "));

const decoder = new Array(code.length)

for (let line in code) {
  decoder[line] = {
    1: code[line].filter(a => a.length === 2),
    2: 2,
    3: 3,
    4: code[line].filter(a => a.length === 4),
    5: 5,
    7: code[line].filter(a => a.length === 3),
    8: code[line].filter(a => a.length === 7),
  };

  //find six by finding segment c and f by taking all the segments of 7 that are not segments of 1
  //filtering for six length segments that does not include both c and f

  const one = decoder[line][1][0];
  const seven = decoder[line][7][0]
  const segmentCF = seven
  .split("")
  .filter(a => one.includes(a))

  // console.log('cf: ', segmentCF)

  const segmentCFMatch = (string) => {
    return string.includes(segmentCF[0]) && string.includes(segmentCF[1])
  };

  decoder[line][6] = code[line].filter(a => a.length === 6 && !(segmentCFMatch(a)));

  //find zero similarly buy filter 4 with 1 to get segments d and b
  //zero does not have d

  const four = decoder[line][4][0];
  const segmentDB = four
  .split("")
  .filter(a => !one.includes(a));

  // console.log('db:  ', segmentDB)

  const segmentDBMatch = (string) => {
    return string.includes(segmentDB[0]) && string.includes(segmentDB[1])
  };

  decoder[line][0] = code[line].filter(a => a.length === 6 && !(segmentDBMatch(a)))
  
  //find nine because it is neither zero nor six
  const zero = decoder[line][0][0]
  const six = decoder[line][6][0]
  
  decoder[line][9] = code[line].filter(a => a.length === 6 && a !== zero && a !== six)
  
  //find five by filtering four thru 1 same as finding zero but we look for positive db match
  decoder[line][5] = code[line].filter(a => a.length === 5 && (segmentDBMatch(a)))

  //find two using segment e g match which we find from filtering 8 thru !7 thru !4
  const eight = decoder[line][8][0];
  const segmentEG = eight
  .split("")
  .filter(a => !seven.includes(a))
  .filter(a => !four.includes(a))
  
  const segmentEGMatch = (string) => {
    return string.includes(segmentEG[0]) && string.includes(segmentEG[1])
  };
  
  decoder[line][2] = code[line].filter(a => a.length === 5 && (segmentEGMatch(a)))
  
  //find three which is not two nor five
  
  const two = decoder[line][2][0]
  const five = decoder[line][5][0]

  decoder[line][3] = code[line].filter(a => a.length === 5 && a !== two && a !== five)

  //sort alphabetically for matching later
  Object.keys(decoder[line])
  .forEach(k => decoder[line][k][0] =
    decoder[line][k][0]
    .split("")
    .sort()
    .join(""))
}

// console.log(decoder)

let dataArray = 
data
.split('\n')
.map(a => a.split('|'))
.flat()
.filter(a => a.includes('\r'))
.map(a => 
  a
  .slice(1, -1)
  .split(" ")
  .map(b => b
    .split("")
    .sort()
    .join(""))
  .join(" ")
  )

for (let i in dataArray) {
  let line = dataArray[i]
  // console.log(line, decoder[i])
  dataArray[i] = dataArray[i].split(" ");
  for (let [key, value] of Object.entries(decoder[i])) {
    // console.log('value[0]: ',value[0], 'key: ', key)
    // dataArray[i] = line.replace(value[0], key)
    const match = value[0];
    for (let j in dataArray[i]) {
      let word = dataArray[i][j]
      if (match === word) {
        // console.log(match, word);
        dataArray[i][j] = key;
      }
    }
  }
  dataArray[i] = Number.parseInt(dataArray[i].join(""));
}


console.log(dataArray)
console.log('sum: ', dataArray.reduce((sum, a) => sum + a));



