// 请勿修改
function install(_Vue) {
  // 添加实例方法
  const Vue = _Vue;
  /**
   * @description 解析url参数
   * @function getQueryStringByName
   * @version 0.0.1
   * @param {string} text 传入的url参数
   */
  Vue.prototype.$getQueryStringByName = function $getQueryStringByName(text) {
    const href = decodeURI(window.location.href); // 转义
    const result = href.match(new RegExp(`[?&]${text}=([^&#]+)`, 'i'));
    if (result == null || result.length < 1) {
      return '';
    }
    return result[1];
  };
}
export default install;
