const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'files-copy');

async function copyDir(src, dest) {
  try {
    await fs.promises.rm(dest, { force: true, recursive: true });
    await fs.promises.mkdir(dest, { recursive: true });
    const files = await fs.promises.readdir(
      src,
      { withFileTypes: true },
      (_error, files) => {
        return files;
      },
    );
    files.forEach((file) => {
      fs.promises.copyFile(
        path.join(src, file.name),
        path.join(dest, file.name),
      );
    });
  } catch (error) {
    console.log(error);
  }
}

copyDir(src, dest);
