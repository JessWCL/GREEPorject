vue-cli4-newui-waterfilter(净水机项目新版插件页)  README.md

### 目录结构

```md
├─public
  ├─help_306
  ├─help_307
  ├─js
      ├─img
  ├─static
  ├─favicon.ico
  ├─index.html
  ├─more.html
|——src
  |——main_more.js
  |——route_more.js
```

#### 目录文件

1. 此目录文件夹多了“help_306”、“help_307”文件夹，存放的内容为‘净水机项目 '常见问题' 的文案介绍’，是功能书里‘828306更多页说明.doc’的内容，注意区分每个mid下的‘更多页’文案都不一样。

  “help_306”、“help_307”文件夹存放的内容为编译后的文件，打包时为了区分，以 more.html 命名。
      此命名原因：
      1、和主体统一，主体查找‘更多页’内容的url路径为 “file: ...中间省略.../mid/help/more.html”;
      2、初期技术方案遗留问题，简称历史原因;
  2020/10/10被主体告知此方案遭废弃，主体的小卡片详情页不再为插件提供定制化 ‘常见问题’ 入口服务，之后的存放方式暂无定案
2. main_more.js
    修改位置  import router from './router_more';
   route_more.js
    自行定义

#### 简单赘述一下打包过程

  1. 请移步到 vue.config.js 文件
    01. 注释掉 pages下的 index 和 notify ，将 more 放开
    02. 执行打包命令：yarn build
    03. dist\plugins\Plugins\mid\.......
      more.html文件里 <script src=./../../cordova.js></script> 手动修改 多加一层路径 ./../../../cordova.js
    04. 删除冗余的文件（自己甄别），保留用到的，放在项目里的Public/help 文件夹下
  2. 请移步到 vue.config.js 文件
    01. 放开 pages下的 index 和 notify ，将 more 注释
    02. 重新打包项目 执行打包命令：yarn build  或 yarn debug  自行区分命令的不同处
