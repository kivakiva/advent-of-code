/* description

logic
*/

const fs = require('fs')

fs.readFile('./data/06-input.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  const regex1 = /\w+/g

  let dataArray = 
  data
  .split(',')
  .map(a => Number.parseInt(a))

  const days = 256;
  const birthGestationAge = 8;
  const gestationAge = 6;
  let twoDimensionalFish = [];

  const howManyAge = (array) => {
    for (let i = 0; i <= birthGestationAge; i ++) {
      let age = i;
      let number = array.filter(a => a === age).length
      twoDimensionalFish = twoDimensionalFish.concat(number)
    }
  }
  howManyAge(dataArray);

  //more hard coding here than i would like
  const oneDayAtATime = (array) => {
    let newArr = array;
    for (let i = 0; i < days; i ++) {
      newArr = [
        newArr[1],
        newArr[2],
        newArr[3],
        newArr[4],
        newArr[5],
        newArr[6],
        newArr[7] + newArr[0],
        newArr[8],
        newArr[0],
      ];
    }
    console.log('array: ', newArr)
    console.log('total: ', newArr.reduce((sum, a) => sum + a))
  }

console.log(oneDayAtATime(twoDimensionalFish))

});