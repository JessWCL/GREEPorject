import isNumber from 'lodash/isNumber';
import isArray from 'lodash/isArray';

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
  const href = decodeURI(window.location.href); // 转义
  const result = href.match(new RegExp(`[?&]${text}=([^&#]+)`, 'i'));
  if (result == null || result.length < 1) {
    return '';
  }
  return result[1];
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

export const isJSON = str => {
  if (typeof str == 'string') {
    try {
      var obj=JSON.parse(str);
      if(typeof obj == 'object' && obj ){
        return true;
      }else{
        return false;
      }
    } catch(e) {
      console.log('error：'+str+'!!!'+e);
      return false;
    }
  }
  console.log('It is not a string!')
}

export const padZero = (value, defaultLength = 1) => {
  if (!isNumber(value)) return value;
  const num = parseInt(value, 10);
  return num >= 10 ? num : `${'0'.repeat(defaultLength)}${num}`
}

export const getCloudMenuKey = (mac = 'Default') => {
  return `MID${process.env.VUE_APP_MID}_CloudMenu_${mac}`;
};

/**
 * legal arr like:
 * [
 *  [number, number, number],
 *  [number, number, number],
 *  ...
 * ]
 */
export const isLegalForFavoriteData = arr => {
  if (!isArray(arr)) return false;
  for (let index = 0; index < arr.length; index += 1) {
    const childArr = arr[index];
    if (!isArray(childArr)) return false;
    if (childArr.length !== 3) return false;
    for (let index = 0; index < childArr.length; index += 1) {
      const element = childArr[index];
      if (!isNumber(element)) return false;
    }
  }
  return true;
};

// 获取Picker温度数据
export const getTempData = (min, max) => {
  const arr = [];
  for (let i = min; i <= max; i += 1) {
    arr.push({ text: `${i}`, value: i });
  }
  return [arr];
}

// 获取Picker时间数据
export const getTimeData = (minTime = '00:01', maxTime = '02:00') => {
  const arr = [];
  const [aHourStr, aMinuteStr] = minTime.split(':');
  const [aHour, aMinute] = [Number.parseInt(aHourStr), Number.parseInt(aMinuteStr)]
  const [bHourStr, bMinuteStr] = maxTime.split(':');
  const [bHour, bMinute] = [Number.parseInt(bHourStr), Number.parseInt(bMinuteStr)]
  for (let i = aHour; i <= bHour; i += 1) {
    if (i === aHour) {
      const childArr = [];
      for (let j = aMinute; j < 60; j += 1) {
        childArr.push({ text: `${j}`, value: j });
      }
      const ele = {
        text: `${i}`,
        value: i,
        children: childArr
      }
      arr.push(ele);
    } else if (i > aHour && i < bHour) {
      const childArr = [];
      for (let j = 0; j < 60; j += 1) {
        childArr.push({ text: `${j}`, value: j });
      }
      const ele = {
        text: `${i}`,
        value: i,
        children: childArr
      }
      arr.push(ele);
    } else if (i === bHour) {
      const childArr = [];
      for (let j = 0; j <= bMinute; j += 1) {
        childArr.push({ text: `${j}`, value: j });
      }
      const ele = {
        text: `${i}`,
        value: i,
        children: childArr
      }
      arr.push(ele);
    }
  }
  return [arr];
}

// 判断是否是低版本浏览器
export const isGtChrome = (version = 44) => {
  if (isAndroid) {
    const strChromeVer = u.match(/chrome\/[\d.]+/gi)[0];
    const chromeVersion = strChromeVer.replace(/[^0-9.]/ig, '');
    const mainVer = chromeVersion.split('.')[0];
    if (version < parseInt(mainVer, 10)) {
      return true;
    }
  }
  return false;
}

export function isIPhone() {
  const ua = navigator.userAgent;
  let isIPhone = null;
  return isIPhone === null ? (isIPhone = /iPhone/i.test(ua)) : isIPhone;
}

const u = navigator.userAgent;
export const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
export const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

export function isPixel2() {
  return isAndroid && screen.width === 411 && screen.height === 731;
}

export function isGalaxyS5() {
  return isAndroid && screen.width === 360 && screen.height === 640;
}

export function isGreePhone2() {
  return isAndroid && screen.width === 412 && screen.height === 732;
}

export function isIPhone5() {
  return isIPhone() && screen.width === 320 && screen.height === 568;
}

export function isIPhone678() {
  return isIPhone() && screen.width === 375 && screen.height === 667;
}

export function isIPhone678plus() {
  return isIPhone() && screen.width === 414 && screen.height === 736;
}

export function isIPhoneX() {
  return isIPhone() && screen.width === 375 && screen.height === 812;
}
