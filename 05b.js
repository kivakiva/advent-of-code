/* description

logic */

const fs = require('fs')

fs.readFile('./data/05-input.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  let dataArray = data.split(',');



  console.log(dataArray);
});