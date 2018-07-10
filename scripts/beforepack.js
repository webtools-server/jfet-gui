/**
 * pack前执行
 */

const path = require('path');
const fse = require('fs-extra');

const NODE_PACKAGE_PATH = path.join(__dirname, '..', 'node');
const APP_PATH = path.join(__dirname, '..', 'app');
const APP_NODE_PATH = path.join(APP_PATH, 'node');

fse.emptyDirSync(APP_NODE_PATH);

switch (process.argv[2]) {
  case 'win': {
    fse.copySync(
      path.join(NODE_PACKAGE_PATH, 'win', 'node.exe'),
      path.join(APP_NODE_PATH, 'node.exe')
    );
    break;
  }
  case 'mac': {
    fse.copySync(
      path.join(NODE_PACKAGE_PATH, 'mac', 'node'),
      path.join(APP_NODE_PATH, 'node')
    );
    break;
  }
  case 'linux': {
    fse.copySync(
      path.join(NODE_PACKAGE_PATH, 'linux', 'node'),
      path.join(APP_NODE_PATH, 'node')
    );
    break;
  }
  default: {
    break;
  }
}
