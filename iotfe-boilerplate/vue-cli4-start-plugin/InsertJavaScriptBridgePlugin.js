/**
 * 插入 JavaScriptBridge
 */
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

/**
 * 获取本机 IP
 */
function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

class InsertJavaScriptBridgePlugin {
  apply(compiler) {
    compiler.plugin('compilation', function(compilation) {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
        'InsertJavaScriptBridgePlugin',
        (data, callback) => {
          const html = data.html;
          const dom = new JSDOM(html);
          const document = dom.window.document;
          const children = document.head.children;
          const insertDom = [].find.call(children, (item, index) => {
            if (item.tagName === 'SCRIPT') {
              return item;
            }
          });
          const headDom = document.querySelector('head');
          const host = getIPAddress() + ':3000';
          let script = document.createElement('script');
          script.innerHTML = `function trigger() {
          var re = /OS ((\d{1,2})_\d{1,2}||(\d{1,2})_\d{1,2}_\d{1,2}) like Mac OS X/i;
            var result = re.exec(window.navigator.userAgent);
            var ver = result && result[1] && result[1].substr(0, 2);
            return parseInt(ver) >= 8;
          }
          var script = document.createElement("script");
          if (trigger()) {
            script.src = "//${host}/static/plugin/ios/cordova.js";
          } else {
            script.src = "//${host}/static/plugin/cordova.js";
          }
          document.head.appendChild(script);`;
          headDom.insertBefore(script, insertDom);
          script = document.createElement('script');
          script.src = `//${host}/static/lib/cordovainit.js`;
          headDom.insertBefore(script, insertDom);
          data.html = dom.serialize();
          callback();
        }
      );
    });
  }
}

module.exports = InsertJavaScriptBridgePlugin;
