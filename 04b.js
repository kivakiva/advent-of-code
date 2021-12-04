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
find the last board to win
logic for 4b:
-count total boards
-track board wins
--only register a win once per board
-only report winning board if board wins is equal to total boards

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
      return true;
    } return false;
  };

  const horizontalWin = (arr, i, j, k) => {
    if (arr[i][j].every(a => a === 'w')) {
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

  //define board counts
  const totalBoards = markupArray.length;
  let boardWins = 0;
  let hasBoardWon = markupArray.map(a => false);
  console.log(hasBoardWon);

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
            if (!hasBoardWon[i]) {
              hasBoardWon[i] = true;
              boardWins ++;
              console.log(`winner number ${boardWins} at board ${i}:  `, markupArray[i]);
              if (boardWins === totalBoards) {
                console.log('Supporting evidence that all boards have won:  ', markupArray.slice(0, 10));
                console.log('Last to win!: ', markupArray[i])
                console.log('Original:  ', cleanCardArray[i])
                console.log('card sum:  ', cardSum(markupArray, i));
                console.log('current ball:  ', currentBall);
                console.log('final score:   ', cardSum(markupArray, i) * currentBall);
                return;
              }
            }
          }
        }
      }
    }
  }

})
});