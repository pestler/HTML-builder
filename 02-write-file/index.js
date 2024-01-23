const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const streamWrite = fs.createWriteStream(path.join(__dirname, 'stream.txt'));

stdout.write('START, write text here:\n');
process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('END, GOOD BYE!!!'));

stdin.on('data', (chunk) => {
  chunk.toString().includes('exit') && process.exit();
  streamWrite.write(chunk);
});
