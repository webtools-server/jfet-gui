/**
 * paths
 */

const npmRunPath = require('npm-run-path');
const path = require('path');
const fixPath = require('fix-path');
const env = require('./env');
const constants = require('./constants');

const {
  NPM_BIN_PATH,
  NODE_PATH
} = constants;

fixPath();

const npmEnv = npmRunPath.env();
const pathEnv = [
  process.env.Path,
  npmEnv.PATH,
  NODE_PATH,
  NPM_BIN_PATH
].filter(p => !!p).join(path.delimiter);

// 临时处理
delete npmEnv.npm_config_prefix;
const processEnv = { ...npmEnv, FORCE_COLOR: 1 };

if (env.isWin) {
  processEnv.Path = pathEnv;
} else {
  processEnv.PATH = `${pathEnv}:/usr/local/bin`;
}

module.exports = processEnv;
