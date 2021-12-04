/* Calculate the horizontal position and depth you would have after following the planned course. 
What do you get if you multiply your final horizontal position by your final depth? */

const fs = require('fs')


fs.readFile('./data/02-input.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  
  const regexForward = /(?<=forward )\d+/g;
  let forwardArray = data.match(regexForward);
  forwardArray = forwardArray.map(a => Number.parseInt(a));
  const horizontal = forwardArray.reduce((sum, a) => {
    return (sum + a);
  });
  const regexdown = /(?<=down )\d+/g;
  const downArray = data.match(regexdown);
  const regexup = /(?<=up )\d+/g;
  let upArray = data.match(regexup);
  upArray = upArray.map(a => `-${a}`);
  let vertArray = downArray.concat(upArray);
  vertArray = vertArray.map(a => Number.parseInt(a));
  const vert = vertArray.reduce((sum, a) => {
    return (sum + a);
  })
  
});

