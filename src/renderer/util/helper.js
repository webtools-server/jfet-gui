/**
 * helper
 */

import { ipcRenderer, shell } from 'electron';
import path from 'path';
import { homedir } from 'os';
import mainGlobal from '@/util/main_global';

export function openEditor(openPath = '') {
  const basePath = '/Applications/Visual Studio Code.app';
  return mainGlobal.services.openEditor(basePath, openPath);
}

export function openTerminal(openPath = '') {
  return mainGlobal.services.openTerminal(openPath);
}

export function openFolder(openPath = '') {
  shell.showItemInFolder(openPath);
}

export function openExternal(url) {
  shell.openExternal(url);
}

export function openProject() {
  ipcRenderer.send('open-dir-dialog', {
    defaultPath: path.join(homedir(), 'jfet-workspace')
  });
}
