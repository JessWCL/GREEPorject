const browserslist = require('./package.json').browserslist;

module.exports = {
  plugins: {
    autoprefixer: {
      browsers: browserslist,
    },
    'postcss-pxtorem': {
      rootValue: 192,
      minPixelValue: 2,
      propWhiteList: [],
      unitPrecision: 5,
    }
  }
};
