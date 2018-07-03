/**
 * event
 */

const { ipcMain, dialog } = require('electron');

// 打开目录
ipcMain.on('open-dir-dialog', (event, args) => {
  dialog.showOpenDialog(Object.assign({
    properties: ['openDirectory']
  }, args), (files) => {
    if (files) {
      event.sender.send('selected-directory', files);
    }
  });
});
