# sao-esm

[![npm version](https://img.shields.io/npm/v/@packy-tang/sao-esm.svg)](https://www.npmjs.com/package/@packy-tang/sao-esm)
[![NPM downloads](http://img.shields.io/npm/dm/@packy-tang/sao-esm.svg)](https://www.npmjs.com/package/@packy-tang/sao-esm)

> 集成rollup、vue用于快速构建生成esm格式的npm包模板
## 特性

本包特性包括以下内容：

* 构建
  * [x] 包产出支持，支持umd/cjs/esm格式内容的产出[^1]
  * [x] 包含babel兼容
  * [x] 支持Vue组件构建及本地调试
  * [ ] 支持WMF特性[^4]
* 自动化[^2]
  * [x] 支持自动版本管理
  * [x] 支持自动产出日志
  * [x] 支持一键发布npm
* 测试
  * [x] 支持Mocha单元测试，~~支持es2015写法~~ [^3]
  * [x] 测试覆盖报告支持
  * [ ] 增加关于Vue的e2e测试及可视化支持
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

### 初次发版

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

### release命令详细说明

```sh
# 指定升级版本
$ npm run release 1.0.1 

# 自动完成
$ npm run release -- --ci
```

## 说明与建议

### 代码模块的定义的建议

样例包是给与前端组同事用于独立管理一些共用模块而建立出来用于示范作用的项目。共用模块可分为两种特性和三种层次，下面会进行说明：

#### 两种特性

| 特性           | 说明                                |
|----------------|-------------------------------------|
| Vue相关的代码  | 必须依赖于Vue框架才能正常运作的代码 |
| 函数级别的代码 | 没有限制，最小粒度为一个函数方法    |

#### 三种层次

* 全量级别。这类代码会作为应用系统执行的基础，是在应用系统执行前就必须运作的代码。
* 框架级别。如`Vue`,`React`这种框架或是`element-ui`,`iview`,`vant`这种UI组件，又或是`axios`,`js-cookie`这种常用的底层逻辑代码，又或是因项目总结常用的**函数级别的代码**均属于此层次。
* 组件级别。此类更多为可选的能随意替换的代码，如某个业务功能UI组件。

共用模块代码层次只是从完整的六大级（函数级别、组件级别、页面级别、框架级别、应用级别、系统级别）中的三个级进行抽离。代码适应情况更多地跟随应用及业务而设计。

### CI/CD工具的作用

目前工作链条基于[drone](http://drone.io)进行。已把基本的功能整合至`.drone.yml`配置内。大概会做以下工作：

1. 登录自建npm服务
2. 安装依赖
3. 运行构建
4. 运行测试
5. 执行自动版本更新、产出日志，提交更改、打上标签并上传至远端。
6. 发布至自己npm服务

以上行为只在`production`分支发生推送(`push`)时执行。

### 自动化链条运作说明

自动化的工作链条是这样运作的：

* CI/CD
  1. 进行构建
  2. 检测
  3. 自动版本更新
  4. 产出日志，提交更改
  5. 打上标签并上传至远端
* Verdaccio
  1. 发送通知到飞书前端群


## TODOList

- [ ] `.jsconfig` VSCode配置支持
- [ ] VSCode编辑器内部断点支持
- [ ] 代码格式化设置（prettier）
- [ ] ESLint代码检测设置

## 仓库制作说明

本仓库是基于[lpreterite/sao-esmodule-mold](https://github.com/lpreterite/sao-esmodule-mold)创建，并添加了release-it自动日志产出工具，及drone的配置（CI/CD）。

## License

MIT &copy; [packy-tang &lt;lpreterite@126.com&gt;](uxfeel.com)


[^1]: 单元测试模块由于使用[reify][reify]导致`@vue/test-utils`不能解析vue组件，抛出下面的错误。所以单元测试的文件下暂时不支持esm写法。

[^2]: 此包使用`release-it`来实现做自动化实现，其中自动管理版本功能是[基于angular.js社区][ang-commit-guidelines]的提交规范来识别处理。详细的提交规范可阅读这份[《如何维护更新日志》][keepachangelog]内容。

[^3]: [基于Vue指南][vue cookbook]将用于npm平台下包的代码使用`rollup`构建。

[^4]: WMF全称[Webpack Module Federation][WMF]，是webpack5 推出名叫模块联合的新功能，用于解决前端巨石项目的困境。具体看这三份文章：[《Webpack 5 之 模块联合（Module Federation）》](wmf_l1)、[《模块共享那些事》](wmf_l2)、[《探索 webpack5 新特性 Module federation 在腾讯文档的应用》](wmf_l3)。

[reify]: https://www.npmjs.com/package/reify
[vue cookbook]: https://cn.vuejs.org/v2/cookbook/packaging-sfc-for-npm.html
[ang-commit-guidelines]: https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines
[keepachangelog]: https://keepachangelog.com/zh-CN/1.0.0/
[WMF]: https://indepth.dev/posts/1173/webpack-5-module-federation-a-game-changer-in-javascript-architecture
[wmf_l1]: https://www.lumin.tech/articles/webpack-module-federation/
[wmf_l2]: http://soiiy.com/index.php/Vue-js/13064.html
[wmf_l3]: http://www.alloyteam.com/2020/04/14338/


