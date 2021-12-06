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
      totalFish += fishDay(days, fish)
    }

    // dataArray = dataArray.map((a, index, array) => {
    //   if (a === 0) {
    //     array = array.push(8);
    //     return 6
    //   } return (a - 1)
    // })
    // console.log(dataArray)
  // console.log(dataArray);


  console.log(totalFish);
});