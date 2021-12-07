/* description
-make all the numbers equal by changing them as little as possible
-return sum of change magnitude
logic
*/

const fs = require('fs')

data = fs.readFileSync('./data/07-input.txt', 'utf-8')

let dataArray = 
data
.split(',')
.map(a => Number.parseInt(a))

const max = dataArray.reduce((max, a) => {
  if (a > max) {return a}
  return max
});

let minPos = {
  min: max * dataArray.length,
  position: 0
};

for (let i = 1; i <=max; i++) {

  //find fuel 
  let fuel = dataArray.reduce((sum, a) => {
    return sum + Math.abs(a - i)
  },0);

  if (minPos.min > fuel) {
    minPos.min = fuel;
    minPos.position = i;
  }
}

console.log('least fuel:  ', minPos.min)
console.log('position of least fuel:  ', minPos.position)
console.log(dataArray.slice(0,20))
console.log(dataArray.slice(980,1000))
// 332 (median) is incorrect
//330 is incorrect (misread the problem input)