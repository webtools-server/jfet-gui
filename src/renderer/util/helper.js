/**
 * helper
 */

import { remote, ipcRenderer, shell } from 'electron';
import path from 'path';
import { homedir } from 'os';

const services = remote.getGlobal('services');

export function openEditor(openPath = '') {
  const basePath = '/Applications/Visual Studio Code.app';
  return services.openEditor(basePath, openPath);
}

export function openTerminal(openPath = '') {
  return services.openTerminal(openPath);
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
