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
  let totalFish = 0;
  let twoDimensionalFish = [];

  const howManyAge = (array) => {
    for (let i = 0; i < 6; i ++) {
      let age = i;
      let number = array.filter(a => a === age).length
      twoDimensionalFish = twoDimensionalFish.concat([[age, number]])
    }
  }
  howManyAge(dataArray);


  const fishDay = (remainingDays, fish) => {
    if (remainingDays > fish) {
      return fishDay(remainingDays - fish, 7) + fishDay(remainingDays - fish, 9)
    } return 1
  }

  for (let fish of twoDimensionalFish) {
    console.log('number:  ', fish[1], 'age: ', fish[0])
    totalFish += fish[1] * (fishDay(days, fish[0]))
    console.log('totalFish: ', totalFish)
  }



  console.log(totalFish);
});