# 水浸传感器--模板

## 拉取组件库

> 按分支拉取，确保组件库更新不会影响到项目正常运行

```bash
yarn add 'ssh://git@10.2.11.226:iot-4/web/gree-ui.git#<branch>'
```

> 始终拉取最新版

```bash
yarn add 'ssh://git@10.2.11.226:li/gree-ui.git#<commit>'
```

## 目录结构

```md
├─public
├─favicon.ico
├─index.html
├─src
│ ├─api // API 接口
├─xxx.js [按 PageName 拆分]
│ ├─assets
│ ├─ img
│ ├─ js
│ ├─ scss
├─ global.scss [通用样式]
├─ xxx.scss [按 PageName 拆分]
│ ├─components // 自定义组件
│ ├─config // mid 配置
├─config.xml
│ ├─directives // 自定义指令
├─chat-scroll.js [语音对话列表滚动]
│ ├─i18n // 语言包
├─en
├─zh_CN
│ ├─mixins // 混入
├─config
├─xxx.js [按 PageName 拆分，计算处理 api 目录数据]
├─utils [vuex 数据处理]
| |-store // Vuex
| |-utils // 自定义工具
| |-views // 视图文件
| |-APP.vue // 根组件
| |-main.js // 入口 js 文件
| |-router.js // 路由
├─.env // 环境变量
├─.eslintignore // ESLint 忽略指定文件和目录
├─.eslintrc.js // ESLint 配置文件
├─.gitignore // Git 忽略特殊文件
├─.postcssrc.js // PostCSS 配置
├─babel.config.js // Babel 配置文件
├─package.json // 包依赖管理
├─vue.config.js // Vue CLI 配置
```
## 工作交接事项

【功能】缺乏电量、基础代谢、蛋白质、骨骼肌、骨量、脂肪量、去脂体重、肌肉量、内脏脂肪等级、肌肉控制、脂肪控制、身体年龄、身型、身体得分、体重变化提示、数据分配、体脂趋势图、BMI趋势图、自动分配开关等功能

注：此功能无UI，无接口目前暂时无法实现