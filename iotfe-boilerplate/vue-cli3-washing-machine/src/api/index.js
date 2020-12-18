/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:07
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-07-10 18:41:18
 */
import {advancedList28a02, orderList28a02, startFootList28a02} from './28a02/advanced';
import {advancedList28a03, orderList28a03, startFootList28a03} from './28a03/advanced';
import {advancedList28a04, orderList28a04, startFootList28a04 } from './28a04/advanced';
import {advancedList28a05, orderList28a05, startFootList28a05 } from './28a05/advanced';

import {modeIndexList28a02, washList28a02, disabledConfigObj28a02, disabledFunObj28a02} from './28a02/config';
import {modeIndexList28a03, washList28a03, disabledConfigObj28a03, disabledFunObj28a03} from './28a03/config';
import {modeIndexList28a04, washList28a04, disabledFunObj28a04, disabledConfigObj28a04} from './28a04/config';
import {modeIndexList28a05, washList28a05, disabledFunObj28a05, disabledConfigObj28a05} from './28a05/config';

import { upperWashList, upperModeIndexList } from './28a06/config';
// 高级功能配置   washMode对应washlist的下标  模式参数  配置参数禁用阶段  高级功能禁用阶段
// eslint-disable-next-line 
let advancedList = [], 
  modeIndexList = [], 
  washList = [], 
  disabledConfigObj = {}, 
  disableFunObj = {},
  orderList = [],
  startFootList = [];

switch (process.env.VUE_APP_MID) {
  case '28a02':
    advancedList = advancedList28a02;
    orderList = orderList28a02;
    startFootList = startFootList28a02;
    modeIndexList = modeIndexList28a02;
    washList = washList28a02;
    disabledConfigObj = disabledConfigObj28a02;
    disableFunObj = disabledFunObj28a02;
    break;
  case '28a03':
    advancedList = advancedList28a03;
    orderList = orderList28a03;
    startFootList = startFootList28a03;
    modeIndexList = modeIndexList28a03;
    washList = washList28a03;
    disabledConfigObj = disabledConfigObj28a03;
    disableFunObj = disabledFunObj28a03;
    break;
  case '28a04':
    advancedList = advancedList28a04;
    orderList = orderList28a04;
    startFootList = startFootList28a04;
    modeIndexList = modeIndexList28a04;
    washList = washList28a04;
    disabledConfigObj = disabledConfigObj28a04;
    disableFunObj = disabledFunObj28a04;
    break;
  case '28a05':
    advancedList = advancedList28a05;
    orderList = orderList28a05;
    startFootList = startFootList28a05;
    modeIndexList = modeIndexList28a05;
    washList = washList28a05;
    disabledConfigObj = disabledConfigObj28a05;
    disableFunObj = disabledFunObj28a05;
    break;
  case '28a06':
    modeIndexList = upperModeIndexList;
    washList = upperWashList;
    disabledConfigObj = disabledConfigObj28a04;
    disableFunObj = disabledFunObj28a04;
    break;
  default:
    modeIndexList = modeIndexList28a02;
    washList = washList28a02;
    break;
}

export {advancedList, orderList, startFootList, modeIndexList, washList, disabledConfigObj, disableFunObj};
