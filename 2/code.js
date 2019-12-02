// Advent of Code, 2019, Day 2
// Luke Mitchell <hi@lukemitchell.co>

const fs = require('fs');
const readline = require('readline');

const OP_ADD = 1,
      OP_MUL = 2,
      OP_END = 99;
      
const OPERATIONS = {
  OP_ADD: (index, memory) => {
    ;
    return index + 4;
  },
  OP_MUL: (index, memory) => {
    
  },
  OP_END: () => { /* Do nothing, end */ }
};

async function emulateIntcode(initialState) {
  const rd = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity
  });
  
  let program = '';
  for await (const line of rd) {
    program += line;
  }
  
  let memory = program.split(',').map(x => parseInt(x));
  initialState.forEach(delta => {
    memory[delta.pos] = delta.val;
  });

  let pointer = 0;
  while (memory[pointer] != OP_END) {
    let opcode = memory[pointer],
        m1, m2, m3;
    
    switch(memory[pointer]) {
      case OP_ADD:
        m1 = memory[pointer + 1], m2 = memory[pointer + 2], m3 = memory[pointer + 3];
        //console.log(`add ${m1}, ${m2}, ${m3}`)
        memory[m3] = memory[m1] + memory[m2];
        pointer += 4;
        break;
        
      case OP_MUL:
        m1 = memory[pointer + 1], m2 = memory[pointer + 2], m3 = memory[pointer + 3];
        //console.log(`mul ${m1}, ${m2}, ${m3}`)
        memory[m3] = memory[m1] * memory[m2];
        pointer += 4;
        break;
        
      default:
        console.log('Unknown opcode encountered:', memory[pointer]);
        process.exit(1);
    }
  }
  
  return memory
}
  
emulateIntcode([{pos: 1, val: 12}, {pos: 2, val: 2}]).then(memory => {
  console.log(`The value in memory at position 0 is ${memory[0]}.`);
})

// Part 2

async function findTarget(target) {
  for (v1 = 0; v1 < 100; v1++) {
    for (v2 = 0; v2 < 100; v2++) {
      let memory = await emulateIntcode([{pos: 1, val: v1}, {pos: 2, val: v2}]);
      if (memory[0] == target) {
        return v1 * 100 + v2;
      }
    }
  }
}

const target = 19690720;
findTarget(target).then(input => {
  console.log(`The initial state to produce ${target} is ${input}.`);
});


