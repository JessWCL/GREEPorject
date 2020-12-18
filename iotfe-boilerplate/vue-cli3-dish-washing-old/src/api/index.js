import {
  DW_MID_828B00,
  DW_MID_828901,
} from './constants';
import { getMID } from '../utils/index';

let funBtnList = require('./828b00/funBtnList').default; // eslint-disable-line
let modeBtnList = require('./828b00/modeBtnList').default; // eslint-disable-line
let menuBtnList = require('./828b00/menuBtnList').default; // eslint-disable-line
let errorObjects = require('./828b00/newErrorObjects').default; // eslint-disable-line

const MID = getMID() || process.env.VUE_APP_MID;

console.log('MID:', MID); // eslint-disable-line

if (MID === DW_MID_828B00) {
  funBtnList = require('./828b00/funBtnList').default;
  modeBtnList = require('./828b00/modeBtnList').default;
  menuBtnList = require('./828b00/menuBtnList').default;
  // errorObjects = require('./828b00/errorObjects').default;
  errorObjects = require('./828b00/newErrorObjects').default;
} else if (MID === DW_MID_828901) {
  funBtnList = require('./828901/funBtnList').default;
  modeBtnList = require('./828901/modeBtnList').default;
  menuBtnList = require('./828901/menuBtnList').default;
  // errorObjects = require('./828901/errorObjects').default;
  errorObjects = require('./828901/newErrorObjects').default;
}

export {
  MID,
  funBtnList,
  modeBtnList,
  menuBtnList,
  errorObjects,
};
