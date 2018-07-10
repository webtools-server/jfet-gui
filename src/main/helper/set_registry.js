/**
 * 设置npm源
 * @see https://github.com/npm/npm/blob/latest/lib/npm.js
 */

const npm = require('npm');

function setRegistry(registry) {
  npm.load((err) => {
    if (err) return;
    npm.commands.config(['set', 'registry', registry], (e) => {
      if (e) return;
      // let newR = npm.config.get('registry');
    });
  });
}

module.exports = setRegistry;

