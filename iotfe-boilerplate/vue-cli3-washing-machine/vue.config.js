const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const browserslist = require('./package.json').browserslist;

const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  publicPath: '',  // 使用它来决定在哪个目录下启用服务，来访问 webpack 输出的文件。
  outputDir: `dist/plugins/Plugins/${process.env.VUE_APP_MID}`,  // 输出路径
  lintOnSave: true, // 设置是否在开发环境下每次保存代码时都启用 eslint验证
  productionSourceMap: false, // 设置生产环境的 source map 开启与关闭  source map 直译过来就是资源地图。所以，source map的作用就是定位。source map定位的时浏览器控制台输出语句在项目文件的位置
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename:
        process.env.NODE_ENV !== 'production' ? 'index.html' : 'control.html'
    },
    notify: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'notify.html'
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('autoprefixer')({ // 浏览器兼容处理 结合package.json看
            browsers: browserslist
          }),
          require('postcss-pxtorem')({  // 移动端适配
            rootValue: 108,
            minPixelValue: 2,
            propWhiteList: []
          })
        ]
      }
    }
  },
  configureWebpack: { // 打包配置
    resolve: {
      alias: {
        '@': resolve('src'),
        '@assets': resolve('src/assets'),
        '@components': resolve('src/components')
      },
      extensions: ['.js', '.vue', '.json']
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, './src/config/config.xml'),
          to: path.resolve(
            __dirname,
            `./dist/plugins/Plugins/${process.env.VUE_APP_MID}/config.xml`
          )
        },
        {
          from: path.resolve(__dirname, '../static/plugin/'),
          to: path.resolve(__dirname, './dist/plugins/')
        },
        {
          from: path.resolve(__dirname, '../static/lib/cordovainit.js'),
          to: path.resolve(
            __dirname,
            `./dist/plugins/Plugins/${process.env.VUE_APP_MID}/js/`
          )
        }
      ])
    ]
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      if (process.env.VUE_APP_MODE === 'debug') {
        config.optimization.minimize(false);
      }
    }
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        // eslint-disable-next-line no-param-reassign
        options.limit = 10000;
        return options;
      });
    if (process.env.npm_config_report) {
      config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin);
    }
  },
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 3000,
    https: false,
    hotOnly: false,
    proxy: '',
    before: () => {},
    disableHostCheck: true
  },
  pluginOptions: {}
};
