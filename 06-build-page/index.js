const fs = require('fs');
const path = require('path');

const destDistFolder = path.join(__dirname, 'dist');

const srcAssets = path.join(__dirname, 'assets');
const destAssets = path.join(destDistFolder, 'assets');

async function copyFolderAssetsForDist(srcAssets, destAssets) {
  const dataFiles = await fs.promises.readdir(srcAssets, {
    withFileTypes: true,
  });
  await fs.promises.rm(destAssets, { force: true, recursive: true });
  await fs.promises.mkdir(destAssets);
  for (let data of dataFiles) {
    const srcPath = path.join(srcAssets, data.name);
    const destPath = path.join(destAssets, data.name);
    data.isDirectory()
      ? await copyFolderAssetsForDist(srcPath, destPath)
      : await fs.promises.copyFile(srcPath, destPath);
  }
}
copyFolderAssetsForDist(srcAssets, destAssets);

const srcStyles = path.join(__dirname, 'styles');
const destStyles = path.join(destDistFolder, 'styles.css');

const bundleDistCssFile = () => {
  const writeStream = fs.createWriteStream(destStyles);
  fs.readdir(srcStyles, { withFileTypes: true }, (error, files) => {
    if (error) console.log(error.message);
    files.forEach((file) => {
      if (file.isFile()) {
        const filesAll = path.join(srcStyles, file.name);
        const filesCss = path.extname(filesAll);
        filesCss === '.css' && fs.createReadStream(filesAll).pipe(writeStream);
      }
    });
  });
};
bundleDistCssFile();

const srcComponents = path.join(__dirname, 'components');
const srcTemplateHtml = path.join(__dirname, 'template.html');
const destDistHtml = path.join(destDistFolder, 'index.html');

const bundleDistHtmlFile = () => {
  

};

bundleDistHtmlFile();