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

  const days = 80;
  let totalFish = 0;

  const fishDay = (remainingDays, fish) => {
    if (remainingDays > fish) {
      return fishDay(remainingDays - fish, 7) + fishDay(remainingDays - fish, 9)
    } return 1
  }

  for (let fish of dataArray) {
      console.log(totalFish)
      totalFish += fishDay(days, fish)
    }


  console.log(totalFish);
});