/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:08
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2019-11-22 10:57:14
 */
// 请勿修改
/**
 * @function $language
 * @param {string} text
 * @description 对i18n的拓展封装，可同时输入多个字符串，然后返回一个数组
 */

function install(_Vue) {
  const Vue = _Vue;
  Vue.prototype.$language = function $language(...text) {
    try {
      let result;
      if (text.length <= 1) {
        result = this.$t(text[0]);
      } else {
        const array = [];
        text.forEach(element => {
          const item = element;
          if (this.$t(item)) {
            array.push(this.$t(item));
          }
          result = array;
        });
      }
      return result;
    } catch (error) {};
  };
}
export default install;
