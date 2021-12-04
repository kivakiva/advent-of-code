/* Calculate the horizontal position and depth you would have after following the planned course. 
What do you get if you multiply your final horizontal position by your final depth? */

const fs = require('fs')

fs.readFile('./data/02-input.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  
  let dataArray = data.split("\r\n");
  
  let aim = 0;
  let depth = 0;
  let horizontal = 0;

  for (let command of dataArray) {
    if (command.match('forward')) {
      horizontal += Number.parseInt(command[8]);
      depth += aim * Number.parseInt(command[8]);
    }
    else if (command.match('up')) {
      aim -= Number.parseInt(command[3]);
    }
    else if (command.match('down')) {
      aim += Number.parseInt(command[5]);
    }
  }
  
  console.log('aim: ', aim, 'depth: ', depth, 'horizontal: ', horizontal, 
  'final product: ', horizontal * depth);
  
});