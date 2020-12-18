const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const browserslist = require('./package.json').browserslist;

const resolve = dir => {
  return path.join(__dirname, dir);
};

// 开发环境
const __DEV__ = process.env.NODE_ENV === 'development';
// 测试环境
const __TEST__ = process.env.NODE_ENV === 'testing';

const GREE_REST_ASIA = 'http://grih.gree.com';
const GREE_REST_ASIA_TEST = 'http://testgrih.gree.com';

const isProdShare = process.env.NODE_ENV === 'production' && process.env.VUE_APP_SHARE === 'true';
const isDevShare = process.env.NODE_ENV === 'development' && process.env.VUE_APP_SHARE === 'true';

const isProdReview = process.env.NODE_ENV === 'production' && process.env.VUE_APP_REVIEW === 'true';
const isDevReview = process.env.NODE_ENV === 'development' && process.env.VUE_APP_REVIEW === 'true';

console.log({
  NODE_ENV: process.env.NODE_ENV,
  VUE_APP_SHARE: process.env.VUE_APP_SHARE,
  VUE_APP_REVIEW: process.env.VUE_APP_REVIEW
});

const getProxyTarget = proxyName => {
  if (__TEST__) {
    console.log(`${proxyName} 使用正式服务器代理: ${GREE_REST_ASIA}`);
    return GREE_REST_ASIA;
  } else if (__DEV__) {
    console.log(`${proxyName} 使用测试服务器代理: ${GREE_REST_ASIA_TEST}`);
    return GREE_REST_ASIA_TEST;
  }
  console.log(`未匹配，${proxyName} 默认使用正式服务器代理: ${GREE_REST_ASIA}`);
  return GREE_REST_ASIA;
};

const filename = () => {
  if (isProdShare || isDevShare) {
    return 'index.html';
  } else if (isProdReview || isDevReview) {
    return 'index.html';
  } else if (process.env.NODE_ENV !== 'production') {
    return 'index.html';
  }
  return 'control.html';
};

const copyFileList = () => {
  if (isProdShare) {
    return [
      {
        from: path.resolve(__dirname, '../static/plugin/'),
        to: path.resolve(__dirname, './dist/plugins/')
      }
    ];
  } else if (isProdReview) {
    return [
      {
        from: path.resolve(__dirname, '../static/plugin/'),
        to: path.resolve(__dirname, './dist/plugins/')
      }
    ];
  }
  return [
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
  ];
};

function getEntry() {
  if (isProdShare || isDevShare) {
    return 'src/shareMain.js';
  } else if (isProdReview || isDevReview) {
    return 'src/reviewMain.js';
  }
  return 'src/main.js';
}

module.exports = {
  publicPath: isProdReview ? '/menu/Review/' : '',
  outputDir: `dist/plugins/Plugins/${process.env.VUE_APP_MID}`,
  lintOnSave: true,
  productionSourceMap: false,
  pages: {
    index: {
      entry: getEntry(),
      template: 'public/index.html',
      filename: filename()
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('autoprefixer')({
            browsers: browserslist
          }),
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
      alias: {
        '@': resolve('src'),
        '@assets': resolve('src/assets'),
        '@components': resolve('src/components')
      },
      extensions: ['.js', '.vue', '.json']
    },
    plugins: [
      new CopyWebpackPlugin(copyFileList()),
    ]
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      if (process.env.VUE_APP_MODE === 'debug') {
        config.optimization.minimize(false);
      }
    }
    // 删除默认配置中处理svg
    config.module.rules.delete('svg');
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/img'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]'
      });
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
    port: process.env.NODE_ENV === 'testing' ? 80 : 3000,
    https: false,
    hotOnly: false,
    proxy: {
      '/app': {
        target: getProxyTarget('/app'),
        pathRewrite: { '^/app': '/app' },
        changeOrigin: true
      },
      '/newfoodsapi': {
        target: 'http://test.grih.gree.com',
        pathRewrite: { '^/newfoodsapi': '/newfoodsapi' },
        changeOrigin: true
      },
      '/VoiceSvr': {
        target: getProxyTarget('/VoiceSvr'),
        pathRewrite: { '^/VoiceSvr': '/VoiceSvr' },
        changeOrigin: true
      },
    },
    before: () => {},
    disableHostCheck: true
  },
  pluginOptions: {}
};
