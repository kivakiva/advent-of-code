/* description

logic
*/

const fs = require('fs')

data = fs.readFileSync('./data/07-input.txt', 'utf-8')

let dataArray = 
data
.split(',')
.map(a => Number.parseInt(a))
.sort();



console.log(dataArray)