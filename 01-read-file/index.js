const fs = require('fs');
const path = require('path');

const dirFile = path.join(__dirname, 'text.txt');
const streamRead = fs.createReadStream(dirFile, 'utf-8');

streamRead.on('data', (chunk) => process.stdout.write(chunk));
