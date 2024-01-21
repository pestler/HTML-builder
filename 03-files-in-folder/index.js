const path = require('path');
const fs = require('fs');

const pathSecretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathSecretFolder, (error, files) => {
  if (error) console.log(error.message);
  files.forEach((file) => {
    const fullName = file;
    let filePath = path.join(pathSecretFolder, file);
    const name = fullName.split('.').shift();
    const extension = fullName.split('.').pop();
    fs.stat(filePath, (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        const size = stats.size;
        const sizeKb = size / 1000 + 'kb';
        console.log(`${name} -- ${extension} -- ${sizeKb}`);
      }
    });
  });
});
