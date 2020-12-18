/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:08
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-04-15 14:41:18
 */
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
 * @description 十进制转2进制字符串
 * @function tenChangeTwo
 * @param { number} ten 传入的十进制数 
 * @description eg 17 => 00010111
 */
export const tenChangeTwo = ten => {
  let two = '';
  for (let index = 0; index < 8; index++) {
    const data = (ten >> index) & 1;
    two = `${data}${two}`;
  }
  return two;
};

/**
 * @description 十进制转2进制下标
 * @function HandleErrorCode
 * @param { number} value 传入的十进制数 
 * @return eg 13 => [0, 1, 3]
 */
export const HandleErrorCode = value => {
  let errorCode = value;
  errorCode = String(errorCode.toString(2));
  const errorCodeList = errorCode.split('').reverse();
  const indexList = [];
  for (let index = 0; index < errorCodeList.length; index++) {
    if (errorCodeList[index] === '1') {
      indexList.push(index);
    }
  }
  return indexList;
};

/**
 * @description 获取禁用的功能，包括配置参数和高级功能
 * @function getDisableObj
 * @param { obj } value 传入的对象
 * @return disableObj
 */
export const getDisableObj = (inputObj, runStage) => {
  const disableObj = {}; 
  const disableFunKeysList = Object.keys(inputObj);
  disableFunKeysList.forEach(element => {
    const value = inputObj[element];
    const isNumber = typeof value === 'number';
    disableObj[element] = isNumber ? runStage >= value : (runStage >= value.value || value.diableList.includes(runStage));
  });
  return disableObj;
};
