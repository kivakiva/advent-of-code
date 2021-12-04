const fs = require('fs')

fs.readFile('./data/01-input.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  const dataArray = data.split('\r\n');
  const dataNumbers = dataArray.map(a => Number.parseInt(a));
  let increases = 0;
  for (let i = 0; i < dataNumbers.length - 3; i++) {
    let previous = dataNumbers[i];
    let current = dataNumbers[i + 3];
    if (previous < current) {
      increases ++;
  }};
  console.log(increases);
});
