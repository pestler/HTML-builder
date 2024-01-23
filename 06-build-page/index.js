const fs = require('fs');
const path = require('path');

const destDistFolder = path.join(__dirname, 'dist');

const srcComponents = path.join(__dirname, 'components');
const destComponents = path.join(__dirname, 'components');

const srcTemplateHtml = path.join(__dirname, 'template.html');
const destDistHtml = path.join(destDistFolder, 'index.html');

const createDist = () => {};

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

const bundleDistCssFile = () => {};




const bundleDistHtmlFile = () => {};
