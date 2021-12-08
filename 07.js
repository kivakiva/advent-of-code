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
.sort();

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


//alternate solution using physics
//using a sorted array, reduce the array into a low mass and a high mass
//the target position is the weighted average of the two masses
//the masses increment up in size by grabbing the next lowest or highest value
//you decide which one to incerment up on each cycle of the loop by determining
//which one is furthest from the target

//the thinking for doing this instead of just using one mass is to guarantee
//that once a point is grouped in a mass, it will only ever move in one direction
//therefore the center of the mass (shown here as blob.location) can be used to compute total fuel 
//by measuring its displacement to the target

const lowBlob = {
  location: dataArray[0],
  mass: 1,
  lastIndex: 0
}
const highBlob = {
  location: dataArray[dataArray.length - 1],
  mass: 1,
  lastIndex: dataArray.length - 1
}

const target = {
  location() {
    const distance = highBlob.location - lowBlob.location;
    const totalMass = lowBlob.mass + highBlob.mass;
    return lowBlob.location + distance * highBlob.mass / totalMass; //you should get the same answer whichever you start with?
  },
  fuel() {
    const distance = highBlob.location - lowBlob.location;
    const totalMass = lowBlob.mass + highBlob.mass;
    const lowBlobDisplacement = distance * highBlob.mass / totalMass;
    const highBlobDisplacement = distance * lowBlob.mass / totalMass; // should be same as distance - lowblob displacement
    return lowBlobDisplacement * lowBlob.mass + highBlobDisplacement * highBlob.mass;
  }

}

for (let i = 2; i <dataArray.length; i++) {
  let nextLowest = dataArray[lowBlob.lastIndex + 1];
  let lowDistance = target.location() - nextLowest; // not sure if this is how to use object methods
  let nextHighest = dataArray[highBlob.lastIndex - 1];
  let highDistance = nextHighest - target.location();
  if (lowDistance > highDistance) {
    // find new location of lowBlob and increase mass by one and update index
    let distance = nextLowest - lowBlob.location;
    let totalMass = lowBlob.mass + 1;
    lowBlob.location += distance / totalMass;
    lowBlob.mass ++;
    lowBlob.lastIndex ++;
  } else {
    let distance = highBlob.location - nextHighest;
    let totalMass = highBlob.mass + 1;
    highBlob.location -= distance / totalMass;
    highBlob.mass ++;
    highBlob.lastIndex --;
  }

} 

//after the loop, return the location of the target for validation and the fuel for the answer

console.log('least fuel:  ', minPos.min)
console.log('position of least fuel:  ', minPos.position)
console.log('new strategy position: ', target.location())
console.log('target fuel: ', target.fuel())
// 332 (median) is incorrect
//330 is incorrect (misread the problem input)