/* 
-loop through the array one bit at a time
-for each loop:
--find the most common bit through reduction
--(check if exactly half of length in which case common = "1")
--filter results to preserve those that match that bit
--check if you only have one result and either return it, or go again 
      with the filter looking at the next bit

-co2 is reversed and "0" for tie

--multiply the numbers


*/

const fs = require('fs')

const binary = (array) => array.reduce((sum, a, index) => {
  return sum + a * Math.pow(2, index);
}, 0)


fs.readFile('./data/03-input.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  let dataArray = data.split("\r\n");

  //for oxygen

  let commonfilterArray = dataArray;

  let mostCommon = "";

  for (let i = 0; i < dataArray[0].length; i ++) {

    // find most common

    let numberOfOnes = commonfilterArray.reduce((sum, a) => {
      if (a[i] === "1") {
        return (sum + 1)
      } return sum;
    }, 0);
    if (numberOfOnes >= commonfilterArray.length / 2) {
      mostCommon = "1";
    } else {
      mostCommon = "0";
    };

    //filter for most common

    if (commonfilterArray.length === 1) {
      console.log("Found 02!  ", commonfilterArray);
      return 
    }
    commonfilterArray = commonfilterArray.filter(a => a[i] === mostCommon)
  }

  //for carbon dioxide

  let rarefilterArray = dataArray;

  let mostrare = "";

  for (let i = 0; i < dataArray[0].length; i ++) {

    // find most rare

    let numberOfZeros = rarefilterArray.reduce((sum, a) => {
      if (a[i] === "0") {
        return (sum + 1)
      } return sum;
    }, 0);
    if (numberOfZeros > rarefilterArray.length / 2) {
      mostrare = "1";
    } else {
      mostrare = "0";
    };

    //filter for most rare

    if (rarefilterArray.length === 1) {

      let co2 = binary(rarefilterArray[0].split("").map(a => Number.parseInt(a)).reverse());

      let o2 = binary(commonfilterArray[0].split("").map(a => Number.parseInt(a)).reverse())

      console.log("Found it!  ", "CO2: ", rarefilterArray, "O2: ", commonfilterArray,
       "product: ", co2 * o2);
      return ;
    }
    rarefilterArray = rarefilterArray.filter(a => a[i] === mostrare)
  }

})



/* 14746202 is too high */
//  3414905