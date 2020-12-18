import { getCurrentMode } from '../../../static/lib/PluginInterface.promise'; // 主体接口
import { __DEV__ } from '../api/constant';

/**
 * @description 获取数组元素的index
 * @param {array} arrList 输入元素所在数组
 * @param {String} itemId 需要匹配的属性
 * @param {number} myIndex 实际获取的值
 * @returns realIndex, 查找数组元素的itemId属性，与myIndex相同时返回该数组元素的index
 */
export const getRealIndex = (arrList, itemId, myIndex) => {
  let realIndex = 0;
  arrList.forEach(element => {
    const Item = element;
    if (Item[itemId] === myIndex) {
      realIndex = arrList.indexOf(Item);
    }
  });
  return realIndex;
};

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

/**
 * @param {string | number} value
 * @returns {string}
 */
export const replaceServerData = value => {
  const txt = `${value}`.trim();
  if (value === '0' || value === 0 || txt === '0') {
    return '';
  } else if (value === 0.5) {
    return '1/2';
  } else if (value === 0.25) {
    return '1/4';
  }
  return txt;
};

export const isPluginDebug = async () => {
  try {
    let currentMode = await getCurrentMode();
    currentMode = parseInt(currentMode, 10); // iOS 返回字符串， Android返回数字
    return currentMode === 0;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const loadScript = (src, callback) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  const head = document.getElementsByTagName('head')[0];
  (head || document.body).appendChild(script);
  script.onload = () => {
    callback && callback();
  };
};

export function sortByProps(list, props) {
  /* eslint-disable */
  if (!Array.isArray(list) || !list.length) return list;
  return [...list].sort((a, b) => {
    return props.reduce((ret, prop) => {
      if (ret !== 0) return ret;
      if (typeof prop === 'function') return prop(a, b);
      let order = 'asc';
      if (prop.indexOf(':')) {
        [prop, order] = prop.split(':');
      }
      if (a[prop] === b[prop]) return ret;
      if (a[prop] > b[prop]) ret = 1;
      if (a[prop] < b[prop]) ret = -1;
      if (order === 'desc') ret = ret * -1;
      return ret;
    }, 0);
  });
}

export const debounce = (fn, delay) => {
  let timer;
  return () => {
    const context = this;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, arguments);
    }, delay);
  };
};

export const sleep = time => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export const getShareDishBasketURL = () => {
  try {
    const id = getQueryStringByName('id');
    if (id) {
      console.log({ id });
      let pathname = `/VoiceSvr/api/dishbasket/v1/GetShareDishBasket?id=${id}`;
      if (__DEV__) {
        return pathname;
      }
      const origin = window.location.origin;
      return `${origin}/VoiceSvr/api/dishbasket/v1/GetShareDishBasket?id=${id}`;
    }
    throw 'Parameter has no id.';
  } catch (error) {
    console.error(error);
    return '';
  }
};

export const isJSONStr = str => {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e);
      return false;
    }
  }
  console.log('It is not a string!');
  return false;
}

export const throttle = (fn, interval) => {
  let last = 0;
  return () => {
    const context = this;
    const now = Date.now();

    if (now - last > interval) {
      last = now;
      fn.apply(context, arguments);
    }
  };
};
