/**
 * 项目session管理
 */

const sessionManager = require('./manager');

class ProjectSession {
  constructor() {
    // { '/users/canye/jfet': { 'npm run dev': {} } }
    this.projectSessions = {};
    // { '/users/canye/jfet': '' }
    this.projectLogs = {};
  }
  start(cwd, command, options) {
    command = command || '__default__';
    // cwd设置默认
    if (!this.projectSessions[cwd]) {
      this.projectSessions[cwd] = {};
    }
    if (!options) {
      options = { cwd };
    }
    let session = this.projectSessions[cwd][command];
    if (session) return session;
    // 创建新的会话
    session = sessionManager.start(cwd + command, options);

    this.projectSessions[cwd][command] = session;
    session.on('session:data', (data) => {
      this.logs(cwd, data);
    });
    return session;
  }
  logs(cwd, data) {
    if (!this.projectLogs[cwd]) {
      this.projectLogs[cwd] = '';
    }
    this.projectLogs[cwd] += data;
  }
  queryLogs(cwd) {
    if (!this.projectLogs[cwd]) return '';
    return this.projectLogs[cwd];
  }
  checkCommand(cwd, command) {
    if (!this.projectSessions[cwd]) return false;
    if (!this.projectSessions[cwd][command]) return false;
    return true;
  }
  stopCommand(cwd, command) {
    if (!this.checkCommand(cwd, command)) return false;
    sessionManager.stop(cwd + command);
    delete this.projectSessions[cwd][command];
    return true;
  }
  stop(cwd) {
    if (!this.projectSessions[cwd]) return false;
    for (const k in this.projectSessions[cwd]) {
      sessionManager.stop(cwd + k);
    }
    delete this.projectSessions[cwd];
    return true;
  }
  stopAll() {
    sessionManager.stopAll();
  }
}

module.exports = new ProjectSession();
