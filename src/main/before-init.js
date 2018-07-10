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

// template
const shTpl = fse.readFileSync(path.join(__dirname, 'template', 'sh.tpl'), 'utf8');
const cmdTpl = fse.readFileSync(path.join(__dirname, 'template', 'cmd.tpl'), 'utf8');

const OUTPUT_BIN_PATH = path.join(APP_NODE_MODULES_PATH, '.bin');

// 修正使用electron-builder打包之后忽略.bin目录的问题
try {
  if (!fse.existsSync(NPM_BIN_PATH)) {
    fse.emptyDirSync(OUTPUT_BIN_PATH);
    if (!env.isWin) {
      symlink(APP_NODE_MODULES_PATH, OUTPUT_BIN_PATH);
      execSync('chmod 755 *', { cwd: NPM_BIN_PATH });
    } else {
      createBinFile(APP_NODE_MODULES_PATH, OUTPUT_BIN_PATH);
    }
  }
} catch (e) {
  console.log(e);
}

// 非Windows
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

// Windows
function createBinFile(srcPath, destPath) {
  const nodeModules = fse.readdirSync(srcPath);

  nodeModules.forEach(((mod) => {
    if (/^@\w+/.test(mod)) {
      createBinFile(path.join(srcPath, mod), destPath);
    } else if (isDirectory(path.join(srcPath, mod))) {
      const pkg = fse.readJsonSync(path.join(srcPath, mod, 'package.json'), { throws: false });
      if (pkg) {
        const bin = pkg.bin || {};
        for (const b in bin) {
          fse.writeFileSync(
            path.join(destPath, b),
            shTpl.replace(
              /__PATH_PLACEHOLDER__/g,
              path.relative(APP_NODE_MODULES_PATH, path.join(srcPath, mod, bin[b])).split(path.sep).join('/')
            ),
            'utf8'
          );
          fse.writeFileSync(
            path.join(destPath, `${b}.cmd`),
            cmdTpl.replace(
              /__PATH_PLACEHOLDER__/g,
              path.relative(APP_NODE_MODULES_PATH, path.join(srcPath, mod, bin[b]))
            ),
            'utf8'
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
