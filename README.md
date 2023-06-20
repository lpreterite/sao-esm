# sao-esm

[![npm version](https://img.shields.io/npm/v/@packy-tang/sao-esm.svg)](https://www.npmjs.com/package/@packy-tang/sao-esm)
![](https://img.shields.io/node/v/@packy-tang/sao-esm)
[![NPM downloads](http://img.shields.io/npm/dm/@packy-tang/sao-esm.svg)](https://www.npmjs.com/package/@packy-tang/sao-esm)

> 快速构建函数应用、vue组件的工具。

## 介绍

项目是公司内部用于快速构建各类包应用而诞生，目标是快速建立一个可用于发布的，符合npm发布规范的最小程序集。

## 特性

以下是这个工具的特性：

* 构建
  * [x] rollup构建
  * [x] 支持umd/cjs/esm格式内容的产出[^1]
  * [x] 包含babel兼容
  * [x] 支持Vue组件构建及本地调试（vue-cli, webpack）
  * [ ] 支持WMF特性[^2]
* 自动化[^3]
  * [x] 支持自动版本管理
  * [x] 支持自动产出日志
  * [x] 支持一键发布npm
* 测试
  * [x] 支持Mocha单元测试
  * [x] 测试覆盖报告支持
  * [x] 增加关于Vue的e2e测试及可视化支持
* 基础设置
  * [x] 通用编辑器设置支持，默认缩减为2空格

## 使用

### 直接使用

```sh
# 直接安装
$ npx sao npm:@packy-tang/sao-esm my-module
```

### 正常使用

本模板基于 [SAO](https://github.com/saojs/sao) 工具制作，需要先安装sao。

```bash
$ yarn global add sao
# or
$ npm i -g sao

# 使用
$ sao npm:@packy-tang/sao-esm my-module
```

### 研发调试

```bash
# sao-esm项目地址：/home/lpre/sao-esm
$ sao /home/lpre/sao-esm my-module
```

### 清除sao模板缓存

```bash
$ rm -rf ~/.sao/
```

### 首次发版

初次发版需要在本地操作，下面是具体步骤：

```sh
# 切换并创建`production`分支
$ git checkout -b production

# 自动执行版本更新、产出日志、提交并打上标签等工作
# -- 1.0.0 这步是指定版本号
$ npm run release -- 1.0.0
```

### 再次发版

下面是发布命令：

```sh
# 请自行切换至`production`分支，并同步`master`分支至`production`分支。
# 在`production`分支下进行
$ npm run release

# 指定升级版本
$ npm run release -- 1.0.1 

# 自动完成
$ npm run release -- --ci
```

## 命令

```json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "rollup -c",
    "watch": "rollup -c -w",
    "pretest": "rollup -c -m inline",
    "test": "mocha './tests/unit/*.spec.js'",
    "test:coverage": "nyc mocha './tests/unit/*.spec.js'",
    "rerelease": "npm run build",
    "release": "release-it",
    "nvm": "sh bin/nvm.sh"
  },
}
```

* 可用的
  * `serve` 本地运行
  * `build` 构建包代码
  * `watch` 监听代码变化，并持续构建新的包代码
  * `test` 根据当前包代码进行测试
  * `test:coverage` 测试并产出测试覆盖率
  * `release` 执行版本更新、产出日志、提交并打上标签等工作，更多内容请看详细说明
  * `nvm` 使用nvm切换与当前项目一致的node版本
* 预设
  * `pretest` 测试前置命令
  * `rerelease` 自动发布的前置命令

## TODOList

- [ ] `.jsconfig` VSCode配置支持
- [ ] VSCode编辑器内部断点支持
- [ ] 代码格式化设置（prettier）
- [ ] ESLint代码检测设置
- [ ] 创建时增设node版本限制可选项

## 仓库制作说明

本仓库是基于[lpreterite/sao-esmodule-mold](https://github.com/lpreterite/sao-esmodule-mold)创建，并添加了release-it自动日志产出工具，及drone的配置（CI/CD）。

## 拆分说明与建议

见 [拆分说明与建议](./docs/suggestion.md) 。

## License

MIT &copy; [packy-tang &lt;lpreterite@126.com&gt;](./LICENSE)

[^1]: 项目中关于Vue部分，是基于`rollup`构建，并在[Vue指南][vue cookbook]的指导下进行制作符合npm平台的包代码。

[^2]: WMF全称[Webpack Module Federation][WMF]，是webpack5 推出名叫模块联合的新功能，用于解决前端巨石项目的困境。具体看这三份文章：[《Webpack 5 之 模块联合（Module Federation）》](wmf_l1)、[《模块共享那些事》](wmf_l2)、[《探索 webpack5 新特性 Module federation 在腾讯文档的应用》](wmf_l3)。

[^3]: 此包使用`release-it`来实现做自动化实现，其中自动管理版本功能是[基于angular.js社区][ang-commit-guidelines]的提交规范来识别处理。详细的提交规范可阅读这份[《如何维护更新日志》][keepachangelog]内容。

[reify]: https://www.npmjs.com/package/reify
[vue cookbook]: https://v2.cn.vuejs.org/v2/cookbook/packaging-sfc-for-npm.html
[ang-commit-guidelines]: https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines
[keepachangelog]: https://keepachangelog.com/zh-CN/1.0.0/
[WMF]: https://indepth.dev/posts/1173/webpack-5-module-federation-a-game-changer-in-javascript-architecture
[wmf_l1]: https://www.lumin.tech/articles/webpack-module-federation/
[wmf_l2]: http://soiiy.com/index.php/Vue-js/13064.html
[wmf_l3]: http://www.alloyteam.com/2020/04/14338/


