/**
 * 终端会话管理
 */

const Session = require('./session');

class Manager {
  constructor() {
    this.sessions = {};
  }
  start(id, options) {
    if (!id) return;
    if (this.sessions[id]) return this.sessions[id];
    const session = new Session(options);

    this.sessions[id] = session;
    return session;
  }
  write(id, content) {
    const session = this.sessions[id];
    if (!session) return;
    session.write(content);
  }
  stop(id) {
    const session = this.sessions[id];
    if (!session) return;
    session.destroy();
    delete this.sessions[id];
  }
  stopAll() {
    for (const k in this.sessions) {
      this.sessions[k].destroy();
    }
    this.sessions = {};
  }
}

module.exports = new Manager();
