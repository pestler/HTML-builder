const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const streamWrite = fs.createWriteStream(path.join(__dirname, 'stream.txt'));

stdout.write('START, write text here:\n');
process.on('listener', () => process.exit());
process.on('end', () => stdout.write('END'));

stdin.on('data', (chunk) => {
  chunk.toString().includes('exit') && process.exit();
  streamWrite.write(chunk);
});
