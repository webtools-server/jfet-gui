/**
 * 终端会话
 */

const EventEmitter = require('events');
const os = require('os');
const pty = require('node-pty');
const processEnv = require('../paths');
const env = require('../env');

const defaultOptions = {
  encoding: 'utf8',
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.cwd(),
  env: processEnv
};

class Session extends EventEmitter {
  constructor(options = {}) {
    super();
    const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
    this.pty = pty.spawn(shell, [], Object.assign({}, defaultOptions, options));

    this.pty.on('data', (data) => {
      this.emit('session:data', data);
    });
  }
  resize(cols, rows) {
    this.pty.resize(cols, rows);
  }
  write(content) {
    this.pty.write(content);
  }
  writeln(content) {
    if (env.isWin) {
      this.write(`${content}\r\n`);
    } else {
      this.write(`${content}\n`);
    }
  }
  destroy() {
    try {
      this.pty.kill();
    } catch (e) {
      console.log(`pty kill error, ${e.stack}`);
    }
  }
}

module.exports = Session;
