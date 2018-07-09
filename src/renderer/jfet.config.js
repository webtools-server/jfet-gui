/**
 * 构建工具配置
 */

const path = require('path');
const fse = require('fs-extra');

// public路径
const publicPathMap = {
  development: '/', // 开发
  production: '', // 打包
};

module.exports = {
  build(abc, context) {
    const publicDir = path.join(__dirname, 'public');

    context.setConfig({
      scanEntry: { pattern: path.join(__dirname, 'pages/**/index.js') },
      setOutput: {
        filename: '[name]-[chunkhash:8].js',
        chunkFilename: '[name]-[chunkhash:8].js',
        path: publicDir,
        publicPath: (publicPathMap[process.env.NODE_ENV] === undefined) ? publicPathMap.development : publicPathMap[process.env.NODE_ENV]
      },
      resolveAliases: {
        vue$: 'vue/dist/vue.common.js',
        '@': path.join(__dirname),
        assets: path.join(__dirname, 'assets'),
        routes: path.join(__dirname, 'routes'),
        components: path.join(__dirname, 'components')
      },
      extractTextScss: '[name]-[chunkhash:8].css',
      extractTextVue: '[name].vue-[chunkhash:8].css',
      image: {
        name: '[name]-[hash:8].[ext]'
      },
      svg: {
        name: '[name]-[hash:8].[ext]'
      },
      font: {
        name: '[name]-[hash:8].[ext]'
      },
      uglifyJsPlugin: false,
      sass: {
        includePaths: ['node_modules']
      },
      defineConstants: {
        'process.env.NODE_ENV': process.env.NODE_ENV
      },
      assemble: {
        layouts: path.join(__dirname, 'pages/layouts/*.hbs'),
        partials: path.join(__dirname, 'pages/partials/*.hbs'),
        pages: path.join(__dirname, 'pages/**/index.hbs'),
        mapPath: path.join(__dirname, 'public/manifest.json'),
        renameFunc(file) {
          const arrPath = path.dirname(file.key).split(path.sep);

          file.dirname = publicDir;
          file.filename = arrPath.pop();
          file.extname = '.html';
          return publicDir;
        }
      }
    });

    context.addBlock(setTarget('electron-renderer'));
    context.addBlock(setExternals((context, request, callback) => {
      if (/^node-pty$/.test(request)) {
        return callback(null, `commonjs ${request}`);
      }
      callback();
    }));

    context.on('before', () => {
      fse.emptyDirSync(publicDir);
    });

    context.on('after', () => {
      if (context.env !== 'watch') {
        const appPublicPath = path.join(process.cwd(), 'app/public');
        const appMainPath = path.join(process.cwd(), 'app/main');

        fse.emptyDirSync(appPublicPath);
        fse.emptyDirSync(appMainPath);
        fse.copySync(path.join(__dirname, 'public'), appPublicPath);
        fse.copySync(path.join(__dirname, '../main'), appMainPath);
      }
    });
  },
  server(abc, context) {
    context.setConfig({
      port: 2017,
      opnPath: '/',
      livereload: {
        init: {
          port: 2018
        },
        watch: path.join(__dirname, './public/**/*')
      }
    });
  }
};

function setTarget(target = 'web') {
  return (context, util) => util.merge({ target });
}

function setExternals(externals) {
  let ext = externals;
  if (!Array.isArray(externals)) {
    ext = [externals];
  }
  return (context, util) => util.merge({
    externals: ext
  });
}

