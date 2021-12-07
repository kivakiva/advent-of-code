/* description

logic
*/

const fs = require('fs')

data = fs.readFileSync('./data/07-input.txt', 'utf-8')

const regex1 = /\w+/g

let dataArray = 
data
.split(',')
.map(a => Number.parseInt(a))



console.log(dataArray)