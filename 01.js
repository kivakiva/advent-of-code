// Requiring fs module in which
// readFile function is defined.
const fs = require('fs')
  
// Reading data in utf-8 format
// which is a type of character set.
// Instead of 'utf-8' it can be 
// other character set also like 'ascii'

let dataArray = [];
let inputRegex = /\w+/g;

fs.readFile('01-input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
  
    // Converting Raw Buffer to text
    // data using tostring function.
    dataArray = data.split('\r\n')
    const dataNumbers = dataArray.map(a => Number.parseInt(a));
    let increases = 0;
    dataNumbers.reduce((previous, current) => {
      if (previous < current) {
        increases ++;
      }
      return current;
    });
    console.log(increases);
});

