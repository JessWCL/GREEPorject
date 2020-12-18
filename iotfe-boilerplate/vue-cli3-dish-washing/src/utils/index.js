
// eslint-disable-next-line import/prefer-default-export

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
      fn.apply(context, arguments);
    }
  };
};

export const getMID = () => {
  // location.href: file:///data/user/0/com.gree.greesmarthome/files/assets/Plugins/MID/control.html
  // location.href: file:///data/user/0/com.gree.greesmarthome/files/assets/Plugins/MID/notify.html
  const href = location.href;
  const reg = /\/Plugins\/(.*)\/(.*).html/;
  const ret = reg.exec(href);
  if (ret != null) return ret[1];
  return '';
};

export const formatPurifierTime = (PurifierTime, defaultModeTime = 0) => {
  let ret = defaultModeTime;
  const hour = 60;
  const day = 24 * 60;
  const purifierTimerPickers = [
    6 * hour,
    12 * hour,
    18 * hour,
    1 * day,
    2 * day,
    3 * day,
    4 * day
  ];
  if (PurifierTime > 0 && PurifierTime <= 7) {
    ret = purifierTimerPickers[PurifierTime - 1];
  }
  return ret;
};

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

export const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

/**
* 加载script文件
* @param url
* @param callback
*/
export const loadScript = (url, callback) => {
  const script = document.createElement('script');
  script.src = url;
  // 加载之后立即执行
  script.onload = () => callback && callback();
  document.body.appendChild(script);
};

export const padZero = num => {
  return num > 10 ? num : `0${num}`;
};

export const getCharCodeAtForArray = strArray => {
  let ret = 0;
  for (let index = 0; index < strArray.length; index += 1) {
    const code = strArray[index].charCodeAt() || 0;
    ret += code;
  }
  return ret;
};

export const getAppointmentTime = time => {
  const [strHour, strMinute] = time.split(':');
  const tHour = parseInt(strHour, 10);
  const tMinute = parseInt(strMinute, 10);
  const currentDate = new Date();
  const cHour = currentDate.getHours();
  const cMinute = currentDate.getMinutes();

  const countParamTime = tHour * 60 + tMinute;
  const countCurrentTime = cHour * 60 + cMinute;

  const isAppointmentTomorrow = countParamTime < countCurrentTime;
  const isAppointmentToday = countParamTime >= countCurrentTime;

  const COUNT_ONE_DAY_TIME = 24 * 60;

  let ret = 0;
  if (isAppointmentTomorrow) {
    ret = COUNT_ONE_DAY_TIME - countCurrentTime + countParamTime;
  } else if (isAppointmentToday) {
    ret = countParamTime - countCurrentTime;
  } else {
    console.error('=== getAppointmentTime ===');
  }
  return ret;
};
