<!--
 * @Date: 2019-11-21 16:32:35
 * @LastEditors: Feng
 * @LastEditTime: 2020-06-05 18:04:59
 * @Description: 总部展厅项目屏幕web页说明文档
 -->

# 总部展厅 

> `vue-cli3-HQ-exhibition`
总部展厅项目的文件夹

总部展厅项目不同于一般的格力+插件，对接的主体是为了展厅电视展示的**展厅版安卓格力+**，
APP主体负责人： **黄子勋**，**王丰**

# 依赖安装

由于未知原因没有生成 `package-lock.json`，`npm install` `npm run server` 的时候可能会产生以下错误
```shell
TypeError: Cannot read property 'range' of null
```

主要是`babel-eslint`的小版本不对所导致的

此时请将`yarn.lock-save`重命名为`yarn.lock`，使用yarn进行依赖安装和运行。


# 五大系统

> `vue-cli3-HQ-exhibition -> vue-cli3-five-systems`

总部展厅项目，五大系统页面的工程文件夹
`起床页，晚安页，睡眠报告页` 也在此文件夹中

## 资源路径

因为从`iotfe-boilerplate`迁移了路径到 `vue-cli3-HQ-exhibition` 下，所以` vue-cli3-five-systems `中引用了` iotfe-boilerplate > static `资源的路径要修改。
- ~~`public/index.html >>> <script src="../../../cordova.js">`~~
  + **这个不要更改！这个是打包后的拿主体的路径**
- `main.js >>> '../../../static/lib/PluginInterface.promise';`
- `actions.js >>>  from '../../../../static/lib/PluginInterface.promise'; // 主体接口`
- `vue.config.js >>> from: path.resolve(__dirname, '../../static/plugin/'),`
- `vue.config.js >>> from: path.resolve(__dirname, '../../static/lib/cordovainit.js'),`

## 根路径判断

进入根路径时，根据URL中的`xxx.html`，将前端路由导航至`xxx`
- `router.js:13  > function getHtmlName() `
- 因为Android使用2个webview互相切换，切换时会整页刷新到根路径
- 所以打包时独立打包了多个html文件，这样也造成了js文件的冗余
- 如果没有取到 `xxx.html`， 跳转到`home`，这个可以在该函数中手动修改
- 使用`npm run test` 和主体用ip联调时，请求数据的参数也是根据这里设置的`window.htmlName`来传参

## cordova事项、主体接口环境等

- `iotfe-boilerplate\static\lib\finishLoad`
    + 在此添加新的接口Promise封装
- 若要主体通过ip访问页面进行调试，需要让黎工往线上的cordova资源中pluginInterface添加如下格式函数
  + ```javascript
        getFiveSystemDevicesAllStatus: function(mac, callback) {
            exec(callback, null, "PluginInterface", "getFiveSystemDevicesAllStatus", [mac])
        }
        ```
  + 若是打包，则此资源包读取主体中的路径
  + 具体路径参考`public\index.html`
- **必须要在插件中调用`finishLoad()`！**
  + `PluginInterface.promise.js` 中有 `finishLoad` 方法
  + `iotfe-boilerplate\static\lib\cordovainit.js` 中的 `onDeviceReady` ：在设备准备完成的事件会通知cordova，并执行该事件的回调函数`window.init()`
  + `window.init()` 在 `main.js` 中定义，并且执行了Vue实例的init方法 `vm.init()`，即`src\mixins\utils\init.js`
  + `init.js` 中会判断和调用各接口，取URL参数等。也在此处开始调用`actions.js`中的轮询方法。
  + 开始调用取数方法时，会调用`finishLoad()`
  + 以上也是常规插件的启动逻辑
- 主体需要在cordova中添加对应的接口
- 若要ip调试，主体还需要添加白名单


# 产品详情

> `vue-cli3-HQ-exhibition -> product-detail`

- 总部展厅项目，产品详情页面的工程文件夹
- 该工程文件夹已经不再更新，后续由 **林炳权** 维护 
- ~~读取URL中最后一对 `/` 中的内容，替换页面中的 `img` 的 `src` 路径~~
- 根据MID给文件夹命名，命名成control.html上传至测试服

