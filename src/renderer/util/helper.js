/**
 * helper
 */

import { ipcRenderer, shell } from 'electron';
import path from 'path';
import { homedir } from 'os';
import mainGlobal from '@/util/main_global';
import lsStorage from '@/util/ls_storage';
import fse from 'fs-extra';

const { SETTING } = mainGlobal.constants;

export function ensureDirSync(dir) {
  return fse.ensureDirSync(dir);
}

export function openEditor(openPath = '') {
  const setting = lsStorage.get(SETTING);
  if (!setting) return;
  return mainGlobal.services.openEditor(setting.defaultEditor, setting.editorBasePath, openPath);
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
