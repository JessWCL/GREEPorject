const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const browserslist = require('./package.json').browserslist;

const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  publicPath: '',
  outputDir: `dist/plugins/Plugins/${process.env.VUE_APP_MID}`,
  lintOnSave: true,
  productionSourceMap: false,
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
          // Autoprefixer 解析CSS文件并且添加浏览器前缀到CSS规则里,
          require('autoprefixer')({
            browsers: browserslist 
          }),
          // postcss-pxtorem 屏幕适配
          require('postcss-pxtorem')({
            rootValue: 108,
            minPixelValue: 2,
            propWhiteList: []
          })
        ]
      }
    }
  },
  configureWebpack: {
    resolve: {
      // alias 别名
      alias: {
        '@': resolve('src'),
        '@assets': resolve('src/assets'),
        '@components': resolve('src/components')
      },
      // extensisons 自动添加后缀
      extensions: ['.js', '.vue', '.json']
    },
    plugins: [
      // CopyWebpackPlugin 拷贝静态文件
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
        // config.optimization.minimize 压缩代码
        config.optimization.minimize(false);
      }
    }
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        // eslint-disable-next-line no-param-reassign
        options.limit = 10000; // 单位byte，小于10000byte的图片都会被编码(base64)放打包在js中
        return options;
      });
    if (process.env.npm_config_report) {
      // BundleAnalyzerPlugin 软件包报告
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
