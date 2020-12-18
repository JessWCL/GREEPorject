/**
 * @description 解析url参数
 * @function getQueryStringByName
 * @version 0.0.1
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

export const debounce = (fn, delay) => {
  let timer;
  return () => {
    const context = this;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      // eslint-disable-next-line no-undef
      fn.apply(context, arguments);
    }, delay);
  };
};

export const throttle = (fn, interval) => {
  let last = 0;
  return () => {
    const context = this;
    const now = Date.now();

    if (now - last > interval) {
      last = now;
      // eslint-disable-next-line no-undef
      fn.apply(context, arguments);
    }
  };
};

const u = navigator.userAgent;
export const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
export const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
