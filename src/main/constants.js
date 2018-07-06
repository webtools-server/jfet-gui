/**
 * constants
 */

const env = require('./env');

// gui配置目录名称
const JFET_GUI_SETTING_DIR_NAME = '.jfet';

// gui配置目录命令配置
const JFET_GUI_COMMAND_SETTING_FILE = 'command.json';

// 项目存储名称
const PROJECT_STORAGE_NAME = 'projectList';

// 模板仓库
const TEMPLATE_REPOSITORY = 'http://git.jtjr.com/groups/h5_webtools_grp';

// npm源
const NPM_REGISTRY = {
  NPM: 'http://registry.npmjs.org', // 官方npm源
  CNPM: 'http://registry.npm.taobao.org', // 淘宝npm源
  JNPM: 'http://npm.jyblife.com', // 加油宝npm源
};

// 编辑器
const SUBLIME_TEXT_3_NAME = 'Sublime Text3';
const VS_CODE_NAME = 'VS Code';
const WEBSTORM_NAME = 'WebStorm';

const VSCODE_BASE_PATH = env.isWin
  ? 'C:/Program Files (x86)/Microsoft VS Code'
  : '/Applications/Visual Studio Code.app';

const SUBLIME_TEXT_3_BASE_PATH = env.isWin
  ? 'C:/Program Files/Sublime Text 3'
  : '/Applications/Sublime Text.app';

const WEBSTORM_BASE_PATH = env.isWin
  ? 'C:/Program Files (x86)/JetBrains/WebStorm 2017.1/bin/webstorm.exe'
  : '/Applications/WebStorm.app';

// jfet网站
const JFET_WEBSITE_URL = 'http://doc.fe.jyb.com/book/jfet-website/';

// jfet API文档
const JFET_API_DOC_URL = 'http://doc.fe.jyb.com/book/workflow/index.html';

module.exports = {
  JFET_GUI_SETTING_DIR_NAME,
  JFET_GUI_COMMAND_SETTING_FILE,
  PROJECT_STORAGE_NAME,
  TEMPLATE_REPOSITORY,
  NPM_REGISTRY,
  SUBLIME_TEXT_3_NAME,
  VS_CODE_NAME,
  WEBSTORM_NAME,
  VSCODE_BASE_PATH,
  SUBLIME_TEXT_3_BASE_PATH,
  WEBSTORM_BASE_PATH,
  JFET_WEBSITE_URL,
  JFET_API_DOC_URL
};
