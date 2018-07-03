/**
 * event
 */

const { ipcMain, dialog } = require('electron');

// 打开目录
ipcMain.on('open-dir-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }, (files) => {
    if (files) {
      event.sender.send('selected-directory', files);
    }
  });
});
