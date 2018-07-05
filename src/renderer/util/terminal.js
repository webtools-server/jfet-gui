/**
 * 命令行处理
 */

const os = require('os');
const pty = require('node-pty');
const processEnv = require('../../main/paths');

// 命令行集合
let terminals = {};
// 日志
let logs = {};

// 启动终端
function startTerminal(projectId, options) {
  if (!projectId) return;
  if (terminals[projectId]) return terminals[projectId];
  // os.platform() === 'win32' ? 'powershell.exe' : 'bash';
  const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
  const ptyProcess = pty.spawn(shell, [], Object.assign({
    encoding: 'utf8',
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.cwd(),
    env: processEnv
  }, options));

  // 存储term
  terminals[projectId] = ptyProcess;
  logs[projectId] = '';

  ptyProcess.on('data', (data) => {
    logs[projectId] += data;
  });
  return ptyProcess;
}

// 终端输入
function writeTerminal(projectId, content) {
  const term = terminals[projectId];
  if (!term) return;
  console.log(term);
  term.write(content);
}

// 获取终端日志
function getTerminalLogs(projectId) {
  if (!projectId) return '';
  if (!logs[projectId]) return '';
  return logs[projectId];
}

// 关闭某一个终端
function closeTerminal(projectId) {
  const term = terminals[projectId];
  if (!term) return;
  term.kill();
  delete terminals[projectId];
  delete logs[projectId];
}

// 关闭所有终端
function closeAllTerminal() {
  for (const k in terminals) {
    terminals[k].kill();
  }
  terminals = {};
  logs = {};
}

module.exports = {
  startTerminal,
  writeTerminal,
  closeTerminal,
  closeAllTerminal,
  getTerminalLogs
};
