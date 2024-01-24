const fs = require('fs');
const path = require('path');

const destDistFolder = path.join(__dirname, 'project-dist');

const srcAssets = path.join(__dirname, 'assets');
const destAssets = path.join(destDistFolder, 'assets');

async function createDist() {
  await fs.promises.rm(destDistFolder, { force: true, recursive: true });
  await fs.promises.mkdir(destDistFolder, { force: true, recursive: true });
  copyDir(srcAssets, destAssets);
  bundleDistCssFile();
  bundleDistHtmlFile();
}

createDist();

const copyDir = async (srcAssets, destAssets) => {
  const dataFiles = await fs.promises.readdir(srcAssets, {
    withFileTypes: true,
  });
  await fs.promises.mkdir(destAssets);
  for (let data of dataFiles) {
    const srcPath = path.join(srcAssets, data.name);
    const destPath = path.join(destAssets, data.name);
    data.isDirectory()
      ? await copyDir(srcPath, destPath)
      : await fs.promises.copyFile(srcPath, destPath);
  }
};

const srcStyles = path.join(__dirname, 'styles');
const destStyles = path.join(destDistFolder, 'style.css');

const bundleDistCssFile = async () => {
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

const srcComponents = path.join(__dirname, 'components');
const srcTemplateHtml = path.join(__dirname, 'template.html');
const destDistHtml = path.join(destDistFolder, 'index.html');

const bundleDistHtmlFile = async () => {
  try {
    const filesComponents = await fs.promises.readdir(srcComponents, {
      withFileTypes: true,
    });
    let data = await fs.promises.readFile(srcTemplateHtml, 'utf-8');
    const promisePending = filesComponents.map(async (fileHtml) => {
      const nameComponent = path.parse(fileHtml.name).name;
      const fileNameComponent = path.join(srcComponents, fileHtml.name);
      const componentsHtmlWriteTag = await fs.promises.readFile(
        fileNameComponent,
        'utf-8',
      );
      data = data.replaceAll(`{{${nameComponent}}}`, componentsHtmlWriteTag);
    });
    await Promise.all(promisePending);
    return await fs.promises.writeFile(destDistHtml, data);
  } catch (error) {
    return console.log(error.message);
  }
};
