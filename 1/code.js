// Advent of Code, 2019, Day 1
// Luke Mitchell <hi@lukemitchell.co>

const fs = require('fs');
const readline = require('readline');

async function computeFuelReqs(includeFuelMass) {
  const rd = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity
  });
  
  let masses = [];
  for await (const line of rd) {
    masses.push(parseInt(line));
  }
  
  let totalFuelNeeded = 0, i = 0;
  while (i < masses.length) {
    let fuelNeeded = Math.floor(masses[i] / 3) - 2;
    
    if (fuelNeeded > 0) {
      totalFuelNeeded += fuelNeeded;
    
      if (includeFuelMass) {
        masses.push(fuelNeeded)
      }
    }
    i++;
  }
  return totalFuelNeeded;
}
  
computeFuelReqs(true).then(fuel => {
  console.log(`The total fuel requirement for the Counter-Upper is ${fuel} units!`);
})
