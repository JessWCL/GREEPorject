/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:08
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-05-09 10:11:12
 */
//  参数中的中文转数字特殊处理
export const changeZnVlue = value => {
  let realValue = value;
  if (typeof (value) === 'string') {
    switch (value) {
      case '不加热':
        realValue = 0;
        break;
      case '标准':
        realValue = 1;
        break;
      case '超干':
        realValue = 2;
        break;
      case '30分':
        realValue = 3;
        break;
      case '60分':
        realValue = 4;
        break;
      case '90分':
        realValue = 5;
        break;
      case '120分':
        realValue = 6;
        break;
      case '150分':
        realValue = 7;
        break;
      case '180分':
        realValue = 8;
        break;
      case '210分':
        realValue = 9;
        break;
      case '240分':
        realValue = 10;
        break;
      case '熨烫':
        realValue = 11;
        break;
      case '经济':
        realValue = 12;
        break;
      case '快速':
        realValue = 13;
        break;
      case '不脱水':
        realValue = 0;
        break;
      case '轻微':
        realValue = 1;
        break;
      // case '标准':
      //   realValue = 2;
      //   break;
      case '较脏':
        realValue = 1;
        break;
      default:
        break;
    }
  }
  return realValue;
};


export const dryValueObj = {
  0: '不烘干',
  1: '标准',
  2: '超干',
  3: '30',
  4: '60',
  5: '90',
  6: '120',
  7: '150',
  8: '180',
  9: '210',
  10: '240',
  11: '熨烫',
  12: '经济',
  13: '快速',
};
const smudgeValueObj = {
  0: '无选择',
  1: '轻微',
  2: '标准',
  3: '较脏'
};
const stainsValueObj = {
  0: '--', 
  1: '血渍', 
  2: '奶渍', 
  3: '油渍', 
  4: '汗渍', 
  5: '果渍'
};
const dryValueList = ['不烘干', '标准', '超干', '30', '60', '90', '120', '150', '180', '210', '240', '熨烫', '经济', '快速'];
const smudgeList = ['无选择', '轻微', '标准', '较脏'];
export const stainsList = ['--', '血渍', '奶渍', '油渍', '汗渍', '果渍'];

// 中文转协议数据
export const changeZnValue = (value, protocol) => {
  let realValue = value;
  if (protocol === 'dry') realValue = `${value}`;
  if (typeof (realValue) === 'number') return value; // protocol !== 'dry' 是因为dry时数字不是协议上的数据
  
  switch (protocol) {
    case 'washTemp': // 温度
      realValue = 0;
      break;    
    case 'speed': // 速度
      realValue = 0;
      break;    
    case 'dry': // 烘干
      realValue = realValue ? dryValueList.indexOf(realValue) : 0;
      break;
    case 'smudge': // 脏污度
      realValue = smudgeList.indexOf(value);
      break;  
    case 'stains': // 污迹
      realValue = stainsList.indexOf(value);
      break;   
    default:
      break;
  } 

  return realValue;
};

// 协议值转中文
export const valueChangeZn = (value, protocol) => {
  let realValue = value;
  switch (protocol) {
    case 'washTemp': // 温度
      realValue = realValue || '--'; // 只有为0需要特殊处理, 热泵显示不加热
      break;
    case 'speed':
      realValue = value || '--';
      break;    
    case 'dry': // 烘干
      realValue = dryValueObj[value];
      break;
    case 'smudge': // 脏污度
      realValue = smudgeValueObj[value];
      break;    
    case 'stains': // 污迹
      realValue = stainsValueObj[value];
      break;   
    default:
      break;
  } 
  return realValue;
};

// 协议值转字段
// export const valueChangeZnShow = (value, protocol) => {
//   let realValue = value;
//   switch (protocol) {
//     case 'washTemp':
//       realValue = value || '--';
//       break;
//     case 'speed':
//       realValue = value || '--';
//       break;
//     case 'smudge':
//       realValue = smudgeList[value];
//       break; 
//     default:
//       break;
//   }
//   return realValue;
// };

export const hiddenUnit = (value, protocol) => {
  let isHidden = false;
  switch (protocol) {
    case 'washTemp':
      isHidden = !value; // 温度只有0才不需要温度
      break;
    case 'speed':
      isHidden = !value; // 转速只有0才不需要温度
      break;
    case 'smudge':
      isHidden = smudgeList[value];
      break; 
    case 'dry':
      isHidden = value < 3 || value > 11;  
      break;
    case 'stains':
      isHidden = true;
      break;
    default:
      break;
  }
  return isHidden;
};
