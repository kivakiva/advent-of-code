


const fs = require('fs')


fs.readFile('./data/03-input.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  let gammaArray = [];
  let dataArray = data.split("\r\n");
  for (let i = 0; i < dataArray[0].length; i++) {
    let numberOfOnes = dataArray.reduce((sum, a) => {
      if (a[i] === "1") {
        return (sum + 1)
      } return sum;
    }, 0);
    if (numberOfOnes > dataArray.length / 2) {
      gammaArray.push(1);
    } else {
      gammaArray.push(0);
    }
  }
  gammaArray = gammaArray.reverse();
  let epsilonArray = gammaArray.map(a => {
    if (a === 1) {return 0}
    return 1;
  })
  const binary = (array) => array.reduce((sum, a, index) => {
    return sum + a * Math.pow(2, index);
  }, 0)
  console.log(gammaArray, epsilonArray);
  console.log(binary(gammaArray), binary(epsilonArray), 'sum: ', binary(gammaArray) * binary(epsilonArray));


});

/* 4095 is sum which is too low, but you need product */