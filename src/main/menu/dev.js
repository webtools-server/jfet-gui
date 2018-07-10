/**
 * 菜单
 */

const { BrowserWindow } = require('electron');

module.exports = {
  label: '开发',
  submenu: [
    {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
      }
    },
  ]
};
