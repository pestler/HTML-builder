const fs = require('fs');
const path = require('path');

const filesRead = path.join(__dirname, 'styles');
const fileWrite = path.join(__dirname, 'project-dist', 'bundle.css');

const writeStream = fs.createWriteStream(fileWrite);

fs.readdir(filesRead, { withFileTypes: true }, (error, files) => {
  if (error) console.log(error.message);
  files.forEach((file) => {
    if (file.isFile()) {
      const filesAll = path.join(filesRead, file.name);
      const filesCss = path.extname(filesAll);
      filesCss === '.css' && fs.createReadStream(filesAll).pipe(writeStream);
    }
  });
});
