/**
 * @description 解析url参数
 * @param {string} text 传入的url参数
 */
export const getQueryStringByName = text => {
  const href = decodeURI(location.href); // 转义
  const result = href.match(new RegExp(`[?&]${text}=([^&#]+)`, 'i'));
  if (result == null || result.length < 1) {
    return '';
  }
  return result[1];
};

/**
 * @description 补0
 * @param {number} val
 */
/* eslint no-param-reassign: off */
export const AppendZero = val => {
  val += '';
  while (val.length < 2) {
    val = `0${val}`;
  }
  return val;
};
