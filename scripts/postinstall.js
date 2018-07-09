/**
 * postinstall
 */

const path = require('path');
const fse = require('fs-extra');
const download = require('download');
const pkgJson = require('../package.json');

async function downloadNode() {
  const nodeDir = path.join(__dirname, '..', 'node');
  fse.emptyDirSync(nodeDir);

  const nodePath = `https://npm.taobao.org/mirrors/node/${pkgJson.nodeVersion}`;
  const nodePackageName = {
    win: '',
    mac: `node-${pkgJson.nodeVersion}-darwin-x64`,
    linux: `node-${pkgJson.nodeVersion}-linux-x64`
  };
  const urls = {
    win: `${nodePath}/win-x64/node.exe`,
    mac: `${nodePath}/${nodePackageName.mac}.tar.gz`,
    linux: `${nodePath}/${nodePackageName.linux}.tar.gz`
  };

  for (const k in urls) {
    const rootPath = path.join(nodeDir, k);
    await download(urls[k], rootPath, {
      extract: k !== 'win'
    });
    console.log(`${urls[k]} download successful.`);
    if (k !== 'win') {
      const target = path.join(rootPath, nodePackageName[k] || '');
      if (fse.existsSync(target)) {
        const src = path.join(target, 'bin', 'node');
        fse.copySync(src, path.join(rootPath, 'node'));
        fse.removeSync(target);
      }
    }
  }
}

downloadNode();
