const path = require('path');
const fs = require('fs');

const dirFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(dirFile, 'utf-8');

stream.on('data', (chunk) => process.stdout.write(chunk));
