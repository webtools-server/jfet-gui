/**
 * before-init
 */

const path = require('path');
const fse = require('fs-extra');
const { execSync } = require('child_process');
const env = require('./env');
const constants = require('./constants');

const { APP_PATH, NPM_BIN_PATH } = constants;
const APP_NODE_MODULES_PATH = path.join(APP_PATH, 'node_modules');

// 修正使用electron-builder打包之后忽略.bin目录的问题
try {
  if (!fse.existsSync(NPM_BIN_PATH)) {
    symlink(APP_NODE_MODULES_PATH, path.join(APP_NODE_MODULES_PATH, '.bin'));
    if (!env.isWin) {
      execSync('chmod 755 *', { cwd: NPM_BIN_PATH });
    }
  }
} catch (e) {
  console.log(e);
}

function symlink(srcPath, destPath) {
  const nodeModules = fse.readdirSync(srcPath);

  nodeModules.forEach(((mod) => {
    if (/^@\w+/.test(mod)) {
      symlink(path.join(srcPath, mod), destPath);
    } else if (isDirectory(path.join(srcPath, mod))) {
      const pkg = fse.readJsonSync(path.join(srcPath, mod, 'package.json'), { throws: false });
      if (pkg) {
        const bin = pkg.bin || {};
        for (const b in bin) {
          fse.ensureSymlinkSync(
            path.join(srcPath, mod, bin[b]),
            path.join(destPath, b)
          );
        }
      }
    }
  }));
}

function isDirectory(p) {
  try {
    return fse.statSync(p).isDirectory();
  } catch (e) {
    return false;
  }
}
