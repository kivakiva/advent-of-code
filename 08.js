/* description

logic
*/

const fs = require('fs')

data = fs.readFileSync('./data/08-input.txt', 'utf-8')

let dataArray = 
data
.split('\n')
.map(a => a.split('|'))
.flat()
.filter(a => a.includes('\r'))
.map(a => 
  a
  .slice(1, -1)
  .split(" "))
.flat()
.filter(a => {
 return a.length === 2 || a.length === 4 || a.length === 3 || a.length === 7
}).length



console.log(dataArray)