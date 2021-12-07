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


const factorial = (number) => {
  if (number === 0) {return 0}
  else if (number === 1) {return 1}
  else {return number + factorial(number - 1)}
}

const max = dataArray.reduce((max, a) => {
  if (a > max) {return a}
  return max
});

let minPos = {
  min: factorial(max) * dataArray.length,
  position: 0
};


for (let i = 1; i <= max; i++) {

  //find fuel 
  let fuel = dataArray.reduce((sum, a) => {
    return sum + factorial(Math.abs(a - i))
  },0);

  if (minPos.min > fuel) {
    minPos.min = fuel;
    minPos.position = i;
  }
}

console.log('least fuel:  ', minPos.min)
console.log('position of least fuel:  ', minPos.position)

//1934000 at zero is incorrect (did not make defualt min high enough)