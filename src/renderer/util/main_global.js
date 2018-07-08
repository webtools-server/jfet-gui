/**
 * 主进程global
 */

import { remote } from 'electron';

export default {
  services: remote.getGlobal('services'),
  sessions: remote.getGlobal('sessions'),
  helper: remote.getGlobal('helper'),
  env: remote.getGlobal('env'),
  constants: remote.getGlobal('constants')
};
