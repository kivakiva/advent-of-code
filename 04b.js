/* play bingo (diagonals don't count). 
multiply sum of each number of winning board by last called ball

logic:
-create 3d array
-clone for markup
-loop: (seperate cumlative loop for balls)
--markup each match
--check for winner
--if winner:
---find sum of winning board
---multiply by ball at cumulative loop index 

Part 2:
logic for 4b:

*/

const fs = require('fs')

//  create ball array

fs.readFile('./data/04-balls-input.txt', 'utf-8', (err, dataBall) => {
  if (err) throw err;
  let ballArray = dataBall.split(',');
  ballArray = ballArray.map(a => Number.parseInt(a))

fs.readFile('./data/04-cards-input.txt', 'utf-8', (err, data) => {
  if (err) throw err;


  // create 3-d array

  const regexCard = /(?<=\r\n)\r\n/g;
  const regexLine = /(?<=\w) +/g;

  let cleanCardArray = data.split(regexCard);
  cleanCardArray = cleanCardArray.map(a => a.split('\r\n', 5));
  cleanCardArray = cleanCardArray.map(a => a.map(b => b.split(regexLine)));
  cleanCardArray = cleanCardArray.map(a => a.map(b => b.map(c => Number.parseInt(c))));

  //clone for markup

  const markupArray = JSON.parse(JSON.stringify(cleanCardArray));

  // define win tests:
  
  const verticalWin = (arr, i, j, k) => {
    if (arr[i].every(a => a[k] === 'w')) {
      console.log('Vertical winner!: ', arr[i])
      console.log('Original:  ', cleanCardArray[i])
      return true;
    } return false;
  };

  const horizontalWin = (arr, i, j, k) => {
    if (arr[i][j].every(a => a === 'w')) {
      console.log('Horizontal winner!: ', arr[i])
      console.log('Original:  ', cleanCardArray[i])
      return true;
    } return false;
  }
  
  //define card product

  const cardSum = (arr, i) => {
    return arr[i].reduce((sum, a) => {
      return (sum + 
        a.reduce((sumB, b) => {
          if (b !== 'w') {
            return sumB + b
          } return sumB
        }, 0))
    }, 0)
  }

  //loop

  for (let h = 0; h < ballArray.length; h++) {
    let currentBall = ballArray[h];
    for (let i = 0; i < markupArray.length; i++) {
      for (let j = 0; j < markupArray[0].length; j++) {
        for (let k = 0; k < markupArray[0][0].length; k++) {
  
          //check for each match and mark
  
          let currentNumber = markupArray[i][j][k];
  
          if (currentNumber === currentBall) {
            markupArray[i][j][k] = 'w';
          }

          //check for winner and calculate score

          if (verticalWin(markupArray, i, j, k) || horizontalWin(markupArray, i, j, k)) {
            console.log('card sum:  ', cardSum(markupArray, i));
            console.log('current ball:  ', currentBall);
            console.log('final score:   ', cardSum(markupArray, i) * currentBall);
            return;
          }
        }
      }
    }
  }

})
});