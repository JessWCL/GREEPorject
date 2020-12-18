import {
  RC_MID_TYPE_30X61C,
  RC_MID_TYPE_30X66C,
  RC_MID_TYPE_30X88C,
  RC_MID_TYPE_40X65C,
  RC_MID_TYPE_4009C,
  RC_MID_TYPE_2008C,
  MID_828409,
  MID_828402,
} from '../api/constants';

/* eslint-disable */
function getQueryStringByName(text) {
  const href = decodeURI(location.href); // 转义
  const result = href.match(new RegExp(`[?&]${text}=([^&#]+)`, 'i'));
  if (result == null || result.length < 1) {
    return '';
  }
  return result[1];
}
/**
 * @constant $midType
 * @description 解析机型细分码，加载不同配置
 */

let midtype = RC_MID_TYPE_30X61C;

const strData_30X61C = '[0.0,4.0,0.0,50.0,0.0,0.0,1.0,1.0,1.0,0.0,0.0,50.0,0.0,0.0,3590.0,0.0,0.0,257]';

try {
  const strData = getQueryStringByName('data') || strData_30X61C;
  const data = JSON.parse(strData);
  midtype = parseInt(data[data.length - 1], 10) || RC_MID_TYPE_2008C;
} catch (e) {
  console.error(e);
}

let modeList;

const VUE_APP_MID = process.env.VUE_APP_MID
const is4030c = VUE_APP_MID === MID_828409;
const isMid828402 = VUE_APP_MID === MID_828402;

if (is4030c) {
  modeList = require('../api/API_4030C');
  console.log('=== 4030C ===');
} else if (isMid828402) {
  switch (midtype) {
    case RC_MID_TYPE_30X61C:
      modeList = require('../api/API_30X61C');
      console.log('=== 30X61C ===');
      break;
  
    case RC_MID_TYPE_30X66C:
    case RC_MID_TYPE_30X88C:
      modeList = require('../api/API_30X66C');
      console.log('=== 30X66C ===');
      break;
  
    case RC_MID_TYPE_40X65C:
    case RC_MID_TYPE_4009C:
      modeList = require('../api/API_4009C');
      console.log('=== 4009C ===');
      break;
  
    case RC_MID_TYPE_2008C:
    default:
      modeList = require('../api/API_2008C');
      console.log('=== 2008C ===');
      break;
  }
  // modeList = require('../api/API_30X66C');
}

export default modeList;
