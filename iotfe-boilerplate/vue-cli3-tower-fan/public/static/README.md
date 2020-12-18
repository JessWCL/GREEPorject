# iotfe-cordova-api

## 启动服务

```shell
npm start
```

修改hosts文件，添加 iotfe.gree.com 自定义网址，重定向本地服务

hosts文件位置：C:\Windows\System32\drivers\etc\hosts

```yaml
127.0.0.1 iotfe.gree.com
```

项目 index.html 引用

```html
<script src="http://iotfe.gree.com/plugin/cordova.js"></script>
<script src="http://iotfe.gree.com/lib/cordovainit.js"></script>
```

## 格力+ 插件 iotfe-cordova-api 独立成子模块步骤

第一步：进入项目中 public 文件夹

```powershell
PS D:\gitlab\iotfe-boilerplate\vue-cli3-start-plugin> cd .\public\
```

第二步：添加子模块 iotfe-cordova-api 命名为 static

```powershell
PS D:\gitlab\iotfe-boilerplate\vue-cli3-start-plugin\public> git submodule add http://10.2.11.226/iot-4/web/iotfe-cordova-api.git static
```

复制子模块的过程，可忽略

```powershell
Cloning into 'D:/gitlab/iotfe-boilerplate/vue-cli3-start-plugin/public/static'...
remote: Enumerating objects: 28, done.
remote: Counting objects: 100% (28/28), done.
remote: Compressing objects: 100% (23/23), done.
remote: Total 28 (delta 3), reused 0 (delta 0)
Unpacking objects: 100% (28/28), 305.46 KiB | 290.00 KiB/s, done.
warning: LF will be replaced by CRLF in .gitmodules.
The file will have its original line endings in your working directory
```

第三步：commit代码

```powershell
PS D:\gitlab\iotfe-boilerplate\vue-cli3-start-plugin\public> git add .
PS D:\gitlab\iotfe-boilerplate\vue-cli3-start-plugin\public> git commit -m 'add submodule'
[master 7c7210f] add submodule
 2 files changed, 4 insertions(+)
 create mode 100644 .gitmodules
 create mode 160000 vue-cli3-start-plugin/public/static
```

第四步：push代码

```
PS D:\gitlab\iotfe-boilerplate\vue-cli3-start-plugin\public> git push origin master
```

提交代码过程，可忽略

```powershell
Enumerating objects: 12, done.
Counting objects: 100% (10/10), done.
Delta compression using up to 8 threads
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 846 bytes | 423.00 KiB/s, done.
Total 6 (delta 2), reused 1 (delta 0), pack-reused 0
To http://10.2.11.226/bing/iotfe-boilerplate.git
   da49821..7c7210f  master -> master
```