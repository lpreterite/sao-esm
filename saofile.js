const superb = require('superb')

module.exports = {
  prompts() {
    return [
      {
        name: 'name',
        message: '项目名称',
        default: this.outFolder,
        filter: val => val.toLowerCase()
      },
      {
        name: 'scope',
        message: '组织名称，用于npm包安装',
        default: '',
      },
      {
        name: 'npm_name',
        message: 'npm包名称',
        default: ({ name,scope }) => `${scope?scope+'/':scope}${name}`,
      },
      {
        name: 'moduleBy',
        message: '模块基于',
        type: 'list',
        choices: ['function', 'vue'],
        default: 'function'
      },
      {
        name: 'description',
        message: '一句话简单介绍一下项目',
        default: `my ${superb()} project`
      },
      {
        name: 'keywords',
        message: '关键词',
        default: '',
        filter: val => JSON.stringify(val.replace("，",",").split(",").filter(str=>str.length>0))
      },
      {
        name: 'username',
        message: `用户名称，默认为git用户`,
        default: this.gitUser.username || this.gitUser.name,
        filter: val => val.toLowerCase(),
        store: true
      },
      {
        name: 'homepage',
        message: '访问地址',
        default: ({ name,username }) => {
          return `https://github.com/${username}/${name}`
        }
      },
      {
        name: 'issues',
        message: '收集反馈的地址，默认为`${homepage}/issues`',
        default({ homepage }){
          return `${homepage}/issues`
        },
        store: true
      },
      {
        name: 'email',
        message: `邮箱联系方式`,
        default: this.gitUser.email,
        store: true
      },
      {
        name: 'website',
        message: '你的网站',
        default({ username }) {
          return `https://github.com/${username}`
        },
        store: true
      }
    ]
  },
  actions: [
    {
      type: 'add',
      files: '**',
      transformExclude: ['example/index.html']
    },
    {
      type: 'move',
      patterns: {
        gitignore: '.gitignore',
        'release-it.json': '.release-it.json',
        nycrc: '.nycrc',
        npmrc: '.npmrc',
        'mocharc.json': '.mocharc.json',
        gitattributes: '.gitattributes',
        editorconfig: '.editorconfig',
        'nvmrc': '.nvmrc'
      }
    },
    {
      type: 'remove',
      files(answers) {
        const files = []
        if(answers.moduleBy !== 'vue') {
          const removeFiles = [`src/components`,'tests/unit/HelloWorld.spec.js','example','vue.config.js']
          removeFiles.forEach(file=>files.push(file))
        }
        return files
      }
    }
  ],
  async completed() {
    this.gitInit()
    await this.npmInstall()
    this.showProjectTips()
  }
}
