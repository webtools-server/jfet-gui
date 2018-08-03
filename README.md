# jfet gui

该仓库不再维护，新仓库：http://git.jtjr.com/jfet/jfet-gui

## TODO

- 自动更新机制
- tray
- main代码编译
- 自动打包
- 增加扩展模块

## node版本

node版本在根目录下`package.json`下的`nodeVersion`字段设置

设置之后，重新执行`npm i`会重新下载对应的node版本

## 开发

安装的时候，需要注意[node-pty](https://github.com/Microsoft/node-pty)在Windows下的安装

```shell
// 进入src/renderer目录，执行
$ npm i
// 返回根目录，执行
$ npm i
// 启动renderer开发服务
$ npm run dev
// 启动客户端
$ npm start
```

## 打包

**mac**

必须在macOS环境下打包

```shell
$ npm run beforepack:mac
$ npm run pack
```

**win**

必须在Windows环境下打包

Windows下`app`目录第一次安装依赖完毕之后，需要执行`npm run rebuild`，修正部分依赖。

```shell
$ npm run beforepack:win
$ npm run pack
```