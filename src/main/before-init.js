/**
 * before-init
 */

const path = require('path');
const fse = require('fs-extra');
const { execSync } = require('child_process');
const env = require('./env');
const constants = require('./constants');

const { APP_PATH, NPM_BIN_PATH } = constants;

// 修正使用electron-builder打包之后忽略.bin目录的问题
try {
  if (!fse.existsSync(NPM_BIN_PATH)) {
    fse.copySync(path.join(APP_PATH, 'bin'), NPM_BIN_PATH);
    if (!env.isWin) {
      execSync('chmod 755 *', { cwd: NPM_BIN_PATH });
    }
  }
} catch (e) {
  console.log(e);
}
