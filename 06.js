/* description

logic
*/

const fs = require('fs')

fs.readFile('./data/06-input.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  const regex1 = /\w+/g

  let dataArray = 
  data.split('\r\n')

});