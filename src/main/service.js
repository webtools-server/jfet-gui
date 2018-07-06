/**
 * service
 */

const { exec } = require('child_process');
const env = require('./env');
const path = require('path');

function openEditor(basePath, openPath) {
  let editorPath = basePath;
  if (env.isMac) {
    editorPath = path.join(basePath, '/Contents/Resources/app/bin/code');
  } else if (env.isWin) {
    editorPath = /\.exe$/.test(basePath) ? basePath : path.join(basePath, 'Code.exe');
  }

  return new Promise((resolve) => {
    if (editorPath) {
      exec(`"${editorPath}" ${openPath}`, {
        cwd: openPath
      }, (error) => {
        if (error) {
          resolve({
            success: false,
            message: error
          });
          return;
        }
        resolve({ success: true });
      });
    } else {
      resolve({
        success: false,
        message: '请先设置VS Code的路径'
      });
    }
  });
}

function openTerminal() {
  // TODO...
}

module.exports = {
  openEditor,
  openTerminal
};
