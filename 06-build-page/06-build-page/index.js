const fs = require('fs');
const path = require('path');

const destDistFolder = path.join(__dirname, 'dist');

const srcAssets = path.join(__dirname, 'assets');
const destAssets = path.join(destDistFolder, 'assets');

const srcStyles = path.join(__dirname, 'styles');
const destStyles = path.join(destDistFolder, 'styles.css');

const srcComponents = path.join(__dirname, 'components');
const destComponents = path.join(__dirname, 'components');

const srcTemplateHtml = path.join(__dirname, 'template.html');
const destDistHtml = path.join(destDistFolder, 'index.html');

const createDist = () => {};

const copyFolderForDist = () => {};

const bundleDistHtmlFile = () => {};

const bundleDistCssFile = () => {};
