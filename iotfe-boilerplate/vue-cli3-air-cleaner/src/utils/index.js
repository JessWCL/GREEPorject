/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-03-14 08:50:27
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-03-17 02:07:13
 */
/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-03-14 08:50:27
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-03-14 13:49:21
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
