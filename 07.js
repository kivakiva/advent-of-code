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
let fueltest = dataArray.reduce((sum, a) => {
  return sum + Math.abs(a - 3)
},0);
console.log('test at 3: ',fueltest)


for (let i = max * 2; i > - max; i--) {

  //find fuel 
  let fuel = dataArray.reduce((sum, a) => {
    return sum + Math.abs(a - i)
  },0);

  if (minPos.min > fuel) {
    minPos.min = fuel;
    minPos.position = i;
  }
  if (i % 30 === 0) {console.log('fuel:  ', fuel);console.log('best pos: ', minPos.position);console.log('best solution:  ', minPos.min)}
}

// const average = dataArray.reduce((sum, a) => sum + a) / dataArray.length;

// const middle = Math.floor(dataArray.length / 2)
console.log('data array length', dataArray.length)
console.log('max: ', max)
console.log('least fuel:  ', minPos.min)
console.log('position of least fuel:  ', minPos.position)
console.log(dataArray.slice(0,20))
console.log(dataArray.slice(980,1000))
// 332 (median) is incorrect
//330 is incorrect