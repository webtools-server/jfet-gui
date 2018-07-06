/**
 * 环境判断
 */

module.exports = {
  isDev: process.env.NODE_ENV !== 'production',
  isMac: process.platform === 'darwin',
  isWin: process.platform === 'win32',
  isLinux: process.platform === 'linux',
  isX86: process.arch === 'ia32',
  isX64: process.arch === 'x64',
  renderer() {
    return process.type === 'renderer';
  },
  main() {
    return process.type === 'browser';
  }
};
