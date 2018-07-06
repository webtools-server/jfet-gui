/**
 * 主进程global
 */

import { remote } from 'electron';

export default {
  services: remote.getGlobal('services'),
  env: remote.getGlobal('env'),
  constants: remote.getGlobal('constants')
};
