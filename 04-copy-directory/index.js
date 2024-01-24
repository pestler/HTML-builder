const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'files-copy');

const copyDir = async (src, dest) => {
  try {
    await fs.promises.rm(dest, { force: true, recursive: true });
    const dataFiles = await fs.promises.readdir(src, {
      withFileTypes: true,
    });
    await fs.promises.mkdir(dest, { recursive: true });
    for (let data of dataFiles) {
      const srcPath = path.join(src, data.name);
      const destPath = path.join(dest, data.name);
      data.isDirectory()
        ? await copyDir(srcPath, destPath)
        : await fs.promises.copyFile(srcPath, destPath);
    }
  } catch (error) {
    console.log(error);
  }
};

copyDir(src, dest);
