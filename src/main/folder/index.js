/**
 * 文件夹处理
 */

const { shell, dialog } = require('electron');

class Folder {
  select(options) {
    return new Promise((resolve) => {
      dialog.showOpenDialog(Object.assign({
        properties: ['openDirectory']
      }, options), (files) => {
        if (files) {
          resolve({ success: true, data: files });
        } else {
          resolve({ success: false });
        }
      });
    });
  }
  open(openPath) {
    shell.showItemInFolder(openPath);
  }
}

module.exports = new Folder();
