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

/**
 * 用于设置默认值
 * 由于不同设备，有些设备没有此字段模块回空字符串
 *
 * @param {Object | Array} obj 设备数据
 * @param {Number | String} defaultValue 字段默认值
 */
export const useDefaultValue = (obj, defaultValue = 0) => {
  let ret;
  let isLog = false;

  const isArray = Array.isArray(obj);

  function isObject(val) {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
  }

  if (isArray) {
    ret = [];
    for (let index = 0; index < obj.length; index += 1) {
      const value = obj[index];
      const isGetDefaultValue = value === '' || value === null || isNaN(value);
      if (isGetDefaultValue) {
        if (!isLog) isLog = true;
        ret.push(defaultValue);
      } else {
        ret.push(value);
      }
    }
  } else if (isObject(obj)) {
    ret = {};
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const isGetDefaultValue = value === '' || value === null || isNaN(value);
        if (isGetDefaultValue) {
          if (!isLog) isLog = true;
          ret[key] = defaultValue;
        } else {
          ret[key] = value;
        }
      }
    }
  } else {
    console.error('=== not match any type ===');
  }

  if (isLog) console.log('==== useDefaultValue ====');

  return ret;
};

/*
 * 判读模块是否 MQTT 协议
 */
export const isMqtt = () => {
  // 原生在自定义UA中追加 upper_device_protocol_version/V3.0.0
  var reg = /upper_device_protocol_version\/V([0-9]+.[0-9]+.[0-9]+)/g;
  var ver = reg.exec(navigator.userAgent);
  try {
    if (ver === null) return false;

    // 获取模块协议的版本号
    var version = ver[1] || '';
    var [mainVer] = version.split('.');
    // 模块传的值需要 >= 3.0.0 代表设备支持 MQTT 协议
    if (Number(mainVer) >= 3) {
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};
