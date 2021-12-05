/* description

logic
-loop through data array
--filter for vert or horizontal straight lines
--insert them into the board with ++ with a helper function
*/

const fs = require('fs')

fs.readFile('./data/05-input.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  const regex = /\d+,\d+( -> )\d+,\d+/g;
  const regex1 = /\w+/g

  let dataArray = 
  data.split('\r\n')
  .map(a => a.replace(" -> ", ","))
  .map(a => a.split(','))
  .map(a => a
    .map(b => Number.parseInt(b)));

  //find largest y

  let yMax = 0
  for (let line of dataArray) {
    if (line[1] > yMax) {
      yMax = line[1]
    }
    if (line[3] > yMax) {
      yMax = line[3]
    }
  }

  //find largest x
  
  let xMax = 0
  for (let line of dataArray) {
    if (line[0] > xMax) {
      xMax = line[0]
    }
    if (line[2] > xMax) {
      xMax = line[2]
    }
  }

  //make board the size of those max values

  let board = []
  for (let i = 0; i <= yMax; i++) {
    const line = [];
    for (let j = 0; j <= xMax; j++) {
      line.push(0);
    }
    board.push(line)
  }

  //test for horizontal

  const isHorizontal = (line) => {
    if (line[1] === line[3]) {
      return true
    } return false
  }

  //test for vertical

  const isVertical = (line) => {
    if (line[0] === line[2]) {
      return true
    } return false
  }

  //test for diagonal

  const isDiagonal = (line) => {
    if (Math.abs((line[2]-line[0])/(line[3]-line[1])) === 1) {
      return true;
    } return false;
  }

  
  //add vertical to board
  
  for (let line of dataArray) {
    if (isVertical(line)) {
      let min = 0;
      let max = 0
      if (line[1] < line[3]) {
        min = line[1];
        max = line[3];
      } else {
        min = line[3];
        max = line[1];
      }
      for (let i = min; i <= max; i++) {
        board[i][line[0]] ++;
      }
    }

    //add horizontal

    if (isHorizontal(line)) {
        let min = 0;
        let max = 0
      if (line[0] < line[2]) {
        min = line[0];
        max = line[2];
      } else {
        min = line[2];
        max = line[0];
      }
      for (let i = min; i <= max; i++) {
        board[line[1]][i] ++;
      }
    }

    if (isDiagonal(line)) {
      let minY = 0;
      let maxY = 0;
      let startX = 0;
      let endX = 0
      if (line[1] < line[3]) {
        minY = line[1];
        startX = line[0];
        maxY = line[3];
        endX = line[2]
      } else {
        minY = line[3];
        startX = line[2];
        maxY = line[1];
        endX = line[0];
      }
      let minX = 0;
      let maxX = 0
    if (line[0] < line[2]) {
      minX = line[0];
      maxX = line[2];
    } else {
      minX = line[2];
      maxX = line[0];
    }
    const diagonalLength = maxX - minX;
    if (minX === startX) {
      for (let i = 0; i <= diagonalLength; i++) {
        board[minY + i][minX + i] ++;
      }
    } else {
      for (let i = 0; i <= diagonalLength; i++) {
        board[minY + i][startX - i] ++;
      }
    }

    }
  }

  //add 

  //loop through data array again to count instances of >= 2
  let count = 0
  for (let line of board) {
    for (let position of line) {
      if (position > 1) {
        count ++
      } 
    }
  }




  // console.log(dataArray);
  console.log(yMax)
  // console.log(board);
  console.log(count);
});

// 19392 is too high (forgot === 1 for slope)
// 18114 is too low (less than or equals)
// 18125 is too low (less than or equals again)
// 18144 is correct