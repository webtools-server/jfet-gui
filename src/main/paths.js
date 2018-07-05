/**
 * paths
 */

const npmRunPath = require('npm-run-path');
const path = require('path');
const env = require('../shared/env');

const APP_PATH = env.isDev ? path.join(process.cwd(), 'src') : path.join(process.resourcesPath, 'app');
const NODE_PATH = path.join(APP_PATH, 'node');
const NPM_BIN_PATH = path.join(process.cwd(), 'node_modules', '.bin');

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
