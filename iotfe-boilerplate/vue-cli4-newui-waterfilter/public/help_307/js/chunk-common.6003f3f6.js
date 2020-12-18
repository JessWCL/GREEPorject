(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-common"],{

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("56d7");


/***/ }),

/***/ "2957":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __DEV__; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __PROD__; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __TEST__; });
// 开发环境
var __DEV__ = "production" === 'development'; // 生产环境

var __PROD__ = "production" === 'production'; // 测试环境

var __TEST__ = "production" === 'testing';

/***/ }),

/***/ "305d":
/***/ (function(module, exports) {

module.exports = {
  home: {
    tips: '滤芯剩余寿命',
    buyurl: '购买链接'
  },
  offline: {
    prompt: '连接已断开，',
    detail: '查看详情'
  },
  error: {
    headtitle: '故障名称:',
    subtitle: '解除条件:',
    error: '故障',
    notify_fault_name_txm: '跳线帽故障',
    notify_fault_name_jy: '记忆故障',
    notify_fault_name_csjzstx: '长时间制水提醒',
    notify_fault_name_bjtxgz: '板间通讯故障',
    notify_fault_name_cmajgz: '触摸按键故障',
    notify_fault_name_jyxpgz: '记忆芯片故障',
    notify_fault_name_lsgz: '漏水故障',
    notify_fault_name_jxgz: '检修故障',
    notify_fault_name_gwbkl: '感温包开路故障',
    notify_fault_name_wifi: 'wifi故障',
    notify_fault_resolve_txm: '请联系售后',
    notify_fault_resolve_jy: '请联系售后',
    notify_fault_resolve_csjzstx: '按复位1键退出，如若再次出现请联系售后',
    notify_fault_resolve_bjtxgz: '请通知售后人员维修',
    notify_fault_resolve_cmajgz: '请通知售后人员维修',
    notify_fault_resolve_jyxpgz: '请通知售后人员维修',
    notify_fault_resolve_lsgz: '1、按下机身背部排水塞，观察是否有水漏出；2、若无水排除或再次出现故障，请联系售后人员',
    notify_fault_resolve_jxgz: '1、按【制冷/选择】键退出；2、若再次出现故障，请联系售后人员',
    notify_fault_resolve_gwbkl: '请通知售后人员维修',
    notify_fault_resolve_wifi: '请通知售后人员维修'
  }
};

/***/ }),

/***/ "36f0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4160");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("159b");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_1__);



// 请勿修改

/**
 * @function $language
 * @param {string} text
 * @description 对i18n的拓展封装，可同时输入多个字符串，然后返回一个数组
 */
function install(_Vue) {
  var Vue = _Vue;

  Vue.prototype.$language = function $language() {
    var _this = this;

    var result;

    for (var _len = arguments.length, text = new Array(_len), _key = 0; _key < _len; _key++) {
      text[_key] = arguments[_key];
    }

    if (text.length <= 1) {
      result = this.$t(text[0]);
    } else {
      var array = [];
      text.forEach(function (element) {
        var item = element;

        if (_this.$t(item)) {
          array.push(_this.$t(item));
        }

        result = array;
      });
    }

    return result;
  };
}

/* harmony default export */ __webpack_exports__["a"] = (install);

/***/ }),

/***/ "3dfd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"f95623f2-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=4600ecaa&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('keep-alive',[(_vm.$route.meta.keepAlive)?_c('router-view'):_vm._e()],1),(!_vm.$route.meta.keepAlive)?_c('router-view'):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=4600ecaa&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Appvue_type_script_lang_js_ = ({
  name: 'App'
});
// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/App.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_Appvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var App = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "3ead":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return showToast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return editDevice; });
/* unused harmony export timerListDevice */
/* unused harmony export getCurtainOpenPercent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return sendDataToDevice; });
/* unused harmony export sendDataToDevicePublic */
/* unused harmony export sendDataToDeviceDayPublic */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return closePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getCCcmd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return changeBarColor; });
/* unused harmony export voiceDevice */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return updateStates; });
/* unused harmony export newPage */
/* unused harmony export onCallBack */
/* unused harmony export showTimePicker */
/* unused harmony export showAlert */
/* unused harmony export showConfirm */
/* unused harmony export showMenuDialog */
/* unused harmony export addStore */
/* unused harmony export updateStore */
/* unused harmony export deleteStore */
/* unused harmony export queryStore */
/* unused harmony export queryAllStore */
/* unused harmony export deleteAllStore */
/* unused harmony export feedbackCommit */
/* unused harmony export startVoice */
/* unused harmony export startSpeak */
/* unused harmony export stopSpeak */
/* unused harmony export translateValue */
/* unused harmony export pluginTranslateData */
/* unused harmony export saveUserInfo */
/* unused harmony export getUserInfo */
/* unused harmony export backToHomePage */
/* unused harmony export sendDataToDeviceNoCallback */
/* unused harmony export pluginHttpPost */
/* unused harmony export startListening */
/* unused harmony export addStoreList */
/* unused harmony export getAllTimerList */
/* unused harmony export getAllSubDevices */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return finishLoad; });
/* unused harmony export searchSubBLE */
/* unused harmony export BLEAddMESH */
/* unused harmony export BLEDelMESHSubDev */
/* unused harmony export sendDataToDevicebyPower */
/* unused harmony export callNumber */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return toWebPage; });
/* unused harmony export thirdPlatformRequest */
/* unused harmony export getCurrentMode */
/* unused harmony export showLoading */
/* unused harmony export hideLoading */
/* unused harmony export getSeaHeight */
/* unused harmony export connectBleDevice */
/* unused harmony export getRoomDeviceSize */
/* unused harmony export getCloudMenuList */
/* unused harmony export getCloudMenuDetailSteps */
/* unused harmony export searchCloudMenu */
/* unused harmony export getRecommendedMenu */
/* unused harmony export addDishToBasket */
/* unused harmony export removeDishFromBasket */
/* unused harmony export getDishFromBasket */
/* unused harmony export shareDishBasket */
/* unused harmony export longClickListenerVibrator */
/* unused harmony export generateMenuListByCaptureImg */
/* unused harmony export setUserData */
/* unused harmony export getUserData */
/* unused harmony export shareDishBasketUrl */
/* unused harmony export screenControl */
/* unused harmony export getOuriboDevicesAllStatus */
/* unused harmony export getMsgRequest */
/* unused harmony export getGridConLis */
/* unused harmony export clearHistoricalPhotovoltaicPowerData */
/* unused harmony export getFiveSystemDevicesAllStatus */
/* unused harmony export tuyaControlDev */
/* unused harmony export tuyaDeviceMore */
/* unused harmony export tuyaRequestDevData */
/* unused harmony export setLightBeltControl */
/* unused harmony export tuyaGetDevLogs */
/* unused harmony export getDeviceRegulationLogs */
/* unused harmony export tuyaWeightAdd */
/* unused harmony export tuyaWeightQuery */
/* unused harmony export tuyaWeightDelete */
/* unused harmony export tuyaWeightUpdate */
/* unused harmony export tuyaWeightHistory */
/* unused harmony export tuyaWeightTrend */
/* unused harmony export tuyaWeightCheckData */
/* unused harmony export tuyaWeightHistorySingleDelete */
/* unused harmony export tuyaWeightList */
/* unused harmony export tuyaWeightDatas */
/* unused harmony export getAIWarningRecordsList */
/* unused harmony export activityGetUserTickets */
/* unused harmony export activityGetWinHistory */
/* unused harmony export activityGetAllWinHistory */
/* unused harmony export activityGetAwardMapping */
/* unused harmony export activityTakeLottery */
/* unused harmony export startCatalogConfigActivity */
/* unused harmony export toMallUserPage */
/* unused harmony export tuyaSetTimers */
/* unused harmony export tuyaQueryTimerslist */
/* unused harmony export tuyaEditTimers */
/* unused harmony export tuyaDeleteTimers */
/* unused harmony export getCloudTimerByMac */
/* unused harmony export getDayUseAndGenerElec */
/* unused harmony export getGridConListOneDay */
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);


/**
 * @author IOTFE
 * @desc 原生与WebView通讯接口promise封装
 */

/**
 * Toast提示
 * @param {string} msg
 * @param {number} type
 */
var showToast = function showToast(msg, type) {
  try {
    return navigator.PluginInterface.showToast(msg, type);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 跳转到设备编辑页
 * @param {string} mac
 */

var editDevice = function editDevice(mac) {
  try {
    return navigator.PluginInterface.editDevice(mac);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 跳转到设备预约页
 * @param {string} mac
 */

var timerListDevice = function timerListDevice(mac) {
  try {
    return navigator.PluginInterface.timerListDevice(mac);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 查询窗帘开合度
 * @param {string} mac
 */

var getCurtainOpenPercent = function getCurtainOpenPercent(mac) {
  try {
    return navigator.PluginInterface.getCurtainOpenPercent(mac);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 发送json数据给设备
 * @param {string} mac
 * @param {string} json
 * @param {boolean} isFollowSysVibration
 */

var sendDataToDevice = function sendDataToDevice(mac, json, isFollowSysVibration) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.sendDataToDevice(mac, json, isFollowSysVibration, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 发送json数据到设备 公钥解密
 * @param {string} mac
 * @param {string} json
 * @param {boolean} isFollowSysVibration
 * @returns
 */

var sendDataToDevicePublic = function sendDataToDevicePublic(mac, json, isFollowSysVibration) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.sendDataToDevicePublic(mac, json, isFollowSysVibration, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 发送json数据到设备 公钥解密
 * @param {string} mac
 * @param {string} json
 * @param {boolean} isFollowSysVibration
 * @returns
 */

var sendDataToDeviceDayPublic = function sendDataToDeviceDayPublic(mac, json, isFollowSysVibration) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.sendDataToDeviceDayPublic(mac, json, isFollowSysVibration, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 关闭H5(WebView)页面
 * @param {*} result
 */

var closePage = function closePage(result) {
  try {
    return navigator.PluginInterface.closePage(result);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 调用主体场景功能
 * @param {string} mac
 * @param {*} cmd
 * @param {string} remarks
 * @param {string} dat
 */

var getCCcmd = function getCCcmd(mac, cmd, remarks, dat) {
  try {
    return navigator.PluginInterface.getCCcmd(mac, cmd, remarks, dat);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 获取设备查询字段以及查看设备是否在线
 * @param {string} mac
 */

var getInfo = function getInfo(mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getInfo(mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 改变标题栏颜色（空字符串时不改变颜色）
 * @param {string} color
 */

var changeBarColor = function changeBarColor(color) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.changeBarColor(color, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 2.0已废弃，不需要此接口
 * @param {string} mac
 */

var voiceDevice = function voiceDevice(mac) {
  try {
    return navigator.PluginInterface.voiceDevice(mac);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 更新H5页面中的状态信息给主体
 * @param {string} mac
 * @param {*} states
 */

var updateStates = function updateStates(mac, states) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.updateStates(mac, states, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 打开新页面
 * @param {string} url
 */

var newPage = function newPage(url) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.newPage(url, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * Cordova初始化成功后回调
 */

var onCallBack = function onCallBack() {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.onCallBack(function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 日期时间选择Dialog
 * @param {number} type
 */

var showTimePicker = function showTimePicker(type) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.showTimePicker(type, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 弹出提示对话框
 * @param {*} title
 * @param {*} msg
 */

var showAlert = function showAlert(title, msg) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.showAlert(title, msg, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 弹出确认对话框
 * @param {*} title
 * @param {*} msg
 */

var showConfirm = function showConfirm(title, msg) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.showConfirm(title, msg, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 拍照、选择图片对话框
 * @param {string} mac
 * @returns
 */

var showMenuDialog = function showMenuDialog(mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.showMenuDialog(mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 添加储存数据
 * @param {string} mac
 * @param {string} key
 * @param {string} val
 */

var addStore = function addStore(mac, key, val) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.updateStates(mac, key, val, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 更新储存数据
 * @param {string} mac
 * @param {string} key
 * @param {string} val
 */

var updateStore = function updateStore(mac, key, val) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.updateStore(mac, key, val, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 删除储存数据
 * @param {string} mac
 * @param {string} key
 * @returns
 */

var deleteStore = function deleteStore(mac, key) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.deleteStore(mac, key, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 查询储存数据
 *
 * @param {string} mac
 * @param {string} key
 * @returns
 */

var queryStore = function queryStore(mac, key) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.queryStore(mac, key, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 查询全部数据
 * @param {string} mac
 */

var queryAllStore = function queryAllStore(mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.queryAllStore(mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 删除全部储存数据
 * @param {string} mac
 */

var deleteAllStore = function deleteAllStore(mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.deleteAllStore(mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 反馈接口
 * @param {*} mac
 */

var feedbackCommit = function feedbackCommit(mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.feedbackCommit(mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 弹出语音监听Dialog
 */

var startVoice = function startVoice() {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.startVoice(function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 开始播报
 * @param {string} text
 */

var startSpeak = function startSpeak(text) {
  try {
    return navigator.PluginInterface.startSpeak(text);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 结束播报
 */

var stopSpeak = function stopSpeak() {
  try {
    return navigator.PluginInterface.stopSpeak();
  } catch (e) {
    console.error(e);
  }
};
/**
 * 发送给设备的json字段跟机型相关
 * @param {string} jsonData
 */

var translateValue = function translateValue(jsonData) {
  try {
    return navigator.PluginInterface.translateValue(jsonData);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 冰箱食材
 * @param {string} url
 * @param {string} jsonData
 */

var pluginTranslateData = function pluginTranslateData(url, jsonData) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.pluginTranslateData(url, jsonData, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 保存用户信息
 * @param {string} key
 * @param {string} value
 */

var saveUserInfo = function saveUserInfo(key, value) {
  try {
    return navigator.PluginInterface.saveUserInfo(key, value);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 获取用户信息
 * @param {string} key
 * @param {string} value
 */

var getUserInfo = function getUserInfo(key, value) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getUserInfo(key, value, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 跳转到主界面
 */

var backToHomePage = function backToHomePage() {
  try {
    return navigator.PluginInterface.backToHomePage();
  } catch (e) {
    console.error(e);
  }
};
/**
 * 发送json到设备
 * @param {string} mac
 * @param {string} json
 * @param {boolean} isFollowSysVibration
 */

var sendDataToDeviceNoCallback = function sendDataToDeviceNoCallback(mac, json, isFollowSysVibration) {
  try {
    return navigator.PluginInterface.sendDataToDeviceNoCallback(mac, json, isFollowSysVibration);
  } catch (e) {
    console.error(e);
  }
};
/**
 * post方式http接口
 * @param {*} url
 * @param {*} paramsStr
 * @param {*} headersStr
 */

var pluginHttpPost = function pluginHttpPost(url, paramsStr, headersStr) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.pluginHttpPost(url, paramsStr, headersStr, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 开始语音监听无UI
 */

var startListening = function startListening() {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.startListening(function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 添加存储数据（数组）
 * @param {*} val
 */

var addStoreList = function addStoreList(val) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.addStoreList(val, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 多联机获取主设备全部预约
 * @param {*} subMac
 * @param {*} mainMac
 */

var getAllTimerList = function getAllTimerList(subMac, mainMac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getAllTimerList(subMac, mainMac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 多联机获取子设备列表
 * @param {*} subMac
 * @param {*} mainMac
 */

var getAllSubDevices = function getAllSubDevices(subMac, mainMac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getAllSubDevices(subMac, mainMac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 结束Loading
 */

var finishLoad = function finishLoad() {
  try {
    return navigator.PluginInterface.finishLoad();
  } catch (e) {
    console.error(e);
  }
};
/**
 * BLE网关搜索周围的蓝牙设备
 * @param {*} isStart
 * @param {string} mac
 */

var searchSubBLE = function searchSubBLE(isStart, mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.searchSubBLE(isStart, mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 蓝牙组网
 * @param {string} mac
 * @param {number} subCount
 * @param {*} hashList
 */

var BLEAddMESH = function BLEAddMESH(mac, subCount, hashList) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.BLEAddMESH(mac, subCount, hashList, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 删除蓝牙子设备
 * @param {string} mac
 * @param {number} subCount
 * @param {*} hashList
 * @returns
 */

var BLEDelMESHSubDev = function BLEDelMESHSubDev(mac, subCount, hashList) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.BLEDelMESHSubDev(mac, subCount, hashList, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 体检电量
 * @param {string} mac
 * @param {string} json
 * @param {boolean} isFollowSysVibration
 */

var sendDataToDevicebyPower = function sendDataToDevicebyPower(mac, json, isFollowSysVibration) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.sendDataToDevicebyPower(mac, json, isFollowSysVibration, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 拨打电话
 * @param {string} num
 */

var callNumber = function callNumber(num) {
  try {
    return navigator.PluginInterface.callNumber(num);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 跳转webView
 * @param {*} url
 * @param {*} title
 */

var toWebPage = function toWebPage(url, title) {
  try {
    return navigator.PluginInterface.toWebPage(url, title);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 第三方请求
 * @param {*} json
 * @param {*} url
 */

var thirdPlatformRequest = function thirdPlatformRequest(json, url) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.thirdPlatformRequest(json, url, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 获取插件是否debug模式
 */

var getCurrentMode = function getCurrentMode() {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getCurrentMode(function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 显示阻塞加载Loading
 */

var showLoading = function showLoading() {
  try {
    return navigator.PluginInterface.showLoading();
  } catch (e) {
    console.error(e);
  }
};
/**
 * 隐藏阻塞加载Loading
 */

var hideLoading = function hideLoading() {
  try {
    return navigator.PluginInterface.hideLoading();
  } catch (e) {
    console.error(e);
  }
};
/**
 * 获取海拔
 * @param {string} mac
 */

var getSeaHeight = function getSeaHeight(mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getSeaHeight(mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 连接到BLE设备
 * @param {string} mac
 */

var connectBleDevice = function connectBleDevice(mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.connectBleDevice(mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 通过mac获取设备对应房间下的所有设备数量
 * @param {string} mac
 */

var getRoomDeviceSize = function getRoomDeviceSize(mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getRoomDeviceSize(mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 蒸烤双能机___获取云菜谱列表
 */

var getCloudMenuList = function getCloudMenuList(mid, index, cnt) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getCloudMenuList(mid, index, cnt, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 蒸烤双能机___获取云菜单详细步骤
 */

var getCloudMenuDetailSteps = function getCloudMenuDetailSteps(cid) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getCloudMenuDetailSteps(cid, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 蒸烤双能机___搜索云菜单
 */

var searchCloudMenu = function searchCloudMenu(keyword, mid, index, cnt) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.searchCloudMenu(keyword, mid, index, cnt, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 获取一日三餐推荐菜谱
 */

var getRecommendedMenu = function getRecommendedMenu() {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getRecommendedMenu(function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 添加菜谱到菜篮子
 */

var addDishToBasket = function addDishToBasket(addDatas) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.addDishToBasket(addDatas, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 从菜篮子里移除菜谱
 */

var removeDishFromBasket = function removeDishFromBasket(idsStr) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.removeDishFromBasket(idsStr, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 获取菜篮子列表
 */

var getDishFromBasket = function getDishFromBasket() {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getDishFromBasket(function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 菜谱：菜篮子分享
 * @param {Array<number>} basketArr
 * @returns
 */

var shareDishBasket = function shareDishBasket(basketArr) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.shareDishBasket(basketArr, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 菜谱：长按监听振动
 */

var longClickListenerVibrator = function longClickListenerVibrator() {
  try {
    return navigator.PluginInterface.longClickListenerVibrator();
  } catch (e) {
    console.error(e);
  }
};
/**
 * 菜谱：生成清单
 */

var generateMenuListByCaptureImg = function generateMenuListByCaptureImg() {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.generateMenuListByCaptureImg(function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 写入用户自有数据
 * @param {string} key
 * @param {*} value
 */

var setUserData = function setUserData(key, value) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.setUserData(key, value, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 读取用户自有数据
 * @param {string} key
 */

var getUserData = function getUserData(key) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getUserData(key, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 菜篮子分享URL
 * @param {string} url
 */

var shareDishBasketUrl = function shareDishBasketUrl(url) {
  try {
    return navigator.PluginInterface.shareDishBasketUrl(url);
  } catch (e) {
    console.error(e);
  }
};
var screenControl = function screenControl(mac, json) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.screenControl(mac, json, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 欧瑞博获取设备详细数据
 * @param {string} mac
 */

var getOuriboDevicesAllStatus = function getOuriboDevicesAllStatus(mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getOuriboDevicesAllStatus(mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 欧瑞博获取设备历史消息
 * @param {string} mac
 */

var getMsgRequest = function getMsgRequest(mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getMsgRequest(mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 获取光伏空调用电统计
 * @param {string} mac
 * @param {string} type
 */

var getGridConLis = function getGridConLis(mac, type) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getGridConList(mac, type, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 清除光伏空调历史电量数据
 * @param {string} mac
 */

var clearHistoricalPhotovoltaicPowerData = function clearHistoricalPhotovoltaicPowerData(mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.clearHistoricalPhotovoltaicPowerData(mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 总部展厅-五大系统-主体取数接口
 * @param {string} mac
 */

var getFiveSystemDevicesAllStatus = function getFiveSystemDevicesAllStatus(mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getFiveSystemDevicesAllStatus(mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/** ============================== 涂鸦体脂称接口 start ============================== */

/**
 * 涂鸦控制设备接口
 * @param {string} mac
 * @param {string} deviceTypeName
 * @param {Array} payload
 */

var tuyaControlDev = function tuyaControlDev(mac, deviceTypeName, payload) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.tuyaControlDev(mac, deviceTypeName, payload, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 涂鸦跳转设备详情
 * @param {string} mac
 */

var tuyaDeviceMore = function tuyaDeviceMore(mac) {
  try {
    navigator.PluginInterface.tuyaDeviceMore(mac);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 涂鸦获取设备详细数据
 * @param {string} mac
 */

var tuyaRequestDevData = function tuyaRequestDevData(mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.tuyaRequestDevData(mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 欧瑞博灯带设置接口
 * @param {string} mac
 */

var setLightBeltControl = function setLightBeltControl(mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.setLightBeltControl(mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 涂鸦获取设备历史消息
 * @param {string} mac
 */

var tuyaGetDevLogs = function tuyaGetDevLogs(mac, startTime, endTime, logType, logSize) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.tuyaGetDevLogs(mac, startTime, endTime, logType, logSize, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};
/**
 * 有规律（取小时，天平均值）查询设备历史记录 (温湿度传感器)
 * @param {*} mac
 * @param {*} startTime
 * @param {*} endTime
 * @param {*} code
 */

var getDeviceRegulationLogs = function getDeviceRegulationLogs(mac, startTime, endTime, code) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getDeviceRegulationLogs(mac, startTime, endTime, code, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 涂鸦体脂称新增用户接口
 * @param {string} mac
 * @param WeightData
 */

var tuyaWeightAdd = function tuyaWeightAdd(mac, WeightData) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.tuyaWeightAdd(mac, WeightData, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 涂鸦体脂秤用户查询接口
 * @param {string} mac
 * @param userId
 */

var tuyaWeightQuery = function tuyaWeightQuery(mac, userId) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.tuyaWeightQuery(mac, userId, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 涂鸦体脂秤用户删除
 * @param {string} mac
 * @param userId
 */

var tuyaWeightDelete = function tuyaWeightDelete(mac, userId) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.tuyaWeightDelete(mac, userId, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 涂鸦体脂秤用户更新接口
 * @param {string} mac
 * @param updateData
 */

var tuyaWeightUpdate = function tuyaWeightUpdate(mac, updateData) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.tuyaWeightUpdate(mac, updateData, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 涂鸦体脂称获取历史记录
 * @param {string} mac
 * @param requestData
 */

var tuyaWeightHistory = function tuyaWeightHistory(mac, requestData) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.tuyaWeightHistory(mac, requestData, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 涂鸦体脂称体重趋势获取
 * @param {string} mac
 * @param userId
 * @param startDay
 * @param endDay
 */

var tuyaWeightTrend = function tuyaWeightTrend(mac, userId, startDay, endDay) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.tuyaWeightTrend(mac, userId, startDay, endDay, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 涂鸦体脂称认领单个称重记录
 * @param {string} mac
 * @param userId
 * @param id
 */

var tuyaWeightCheckData = function tuyaWeightCheckData(mac, userId, id) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.tuyaWeightCheckData(mac, userId, id, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 涂鸦体脂秤删除单个称重记录
 * @param {string} mac
 * @param id
 */

var tuyaWeightHistorySingleDelete = function tuyaWeightHistorySingleDelete(mac, id) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.tuyaWeightHistorySingleDelete(mac, id, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 涂鸦体脂称查询用户列表
 * @param {string} mac
 */

var tuyaWeightList = function tuyaWeightList(mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.tuyaWeightList(mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * 涂鸦体脂秤计算报告接口
 * @param {string} mac
 * @param requestData
 */

var tuyaWeightDatas = function tuyaWeightDatas(mac, requestData) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.tuyaWeightDatas(mac, requestData, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
};
/** ============================== 涂鸦体脂称接口 end ============================== */
// AI感知器报警l记录接口

var getAIWarningRecordsList = function getAIWarningRecordsList(mac, cnt, lastUpdate) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getAIWarningRecordsList(mac, cnt, lastUpdate, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
}; // 用于获取用户抽奖券数量

var activityGetUserTickets = function activityGetUserTickets() {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.activityGetUserTickets(function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
}; // 获取用户获奖纪录

var activityGetWinHistory = function activityGetWinHistory() {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.activityGetWinHistory(function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
}; // 获取所有人的获奖纪录

var activityGetAllWinHistory = function activityGetAllWinHistory() {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.activityGetAllWinHistory(function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
}; // 加载抽奖信息

var activityGetAwardMapping = function activityGetAwardMapping() {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.activityGetAwardMapping(function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
}; // 提交抽奖请求

var activityTakeLottery = function activityTakeLottery() {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.activityTakeLottery(function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
}; // 去添加设备

var startCatalogConfigActivity = function startCatalogConfigActivity() {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.startCatalogConfigActivity(function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
}; // 跳转到商城账户页

var toMallUserPage = function toMallUserPage() {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.toMallUserPage(function () {
        resolve.apply(void 0, arguments);
      });
    } catch (error) {
      reject(error);
    }
  });
}; // 涂鸦设备设置定时任务

var tuyaSetTimers = function tuyaSetTimers(mac, data) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.tuyaSetTimers(mac, data, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
}; // 查询涂鸦设备定时任务

var tuyaQueryTimerslist = function tuyaQueryTimerslist(mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.tuyaQueryTimerslist(mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
}; // 涂鸦修改定时任务

var tuyaEditTimers = function tuyaEditTimers(mac, data) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.tuyaEditTimers(mac, data, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
}; // 删除涂鸦设备定时任务

var tuyaDeleteTimers = function tuyaDeleteTimers(mac, groupId) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.tuyaDeleteTimers(mac, groupId, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
}; // 透传获取云定时接口

var getCloudTimerByMac = function getCloudTimerByMac(mac) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getCloudTimerByMac(mac, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
}; // 获取某一天的用电量

var getDayUseAndGenerElec = function getDayUseAndGenerElec(mac, time) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getDayUseAndGenerElec(mac, time, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
}; // 新：光伏 获取某一天电量

var getGridConListOneDay = function getGridConListOneDay(mac, range, oneDay) {
  return new Promise(function (resolve, reject) {
    try {
      navigator.PluginInterface.getGridConListOneDay(mac, range, oneDay, function () {
        resolve.apply(void 0, arguments);
      });
    } catch (err) {
      reject(err);
    }
  });
};

/***/ }),

/***/ "4360":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./src/store/getters.js
var getters = {};
/* harmony default export */ var store_getters = (getters);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.timers.js
var web_timers = __webpack_require__("4795");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("ade3");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./src/store/types.js
var types = __webpack_require__("6e87");

// EXTERNAL MODULE: ../static/lib/PluginInterface.promise.js
var PluginInterface_promise = __webpack_require__("3ead");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__("c975");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.is-array.js
var es_array_is_array = __webpack_require__("277d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.date.now.js
var es_date_now = __webpack_require__("6eba");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.date.to-string.js
var es_date_to_string = __webpack_require__("0d03");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.constructor.js
var es_regexp_constructor = __webpack_require__("4d63");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__("466d");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__("53ca");

// CONCATENATED MODULE: ./src/utils/index.js













var utils_arguments = arguments,
    _this = undefined;

/**
 * @description 获取数组元素的index
 * @param {array} arrList 输入元素所在数组
 * @param {String} itemId 需要匹配的属性
 * @param {number} myIndex 实际获取的值
 * @returns realIndex, 查找数组元素的itemId属性，与myIndex相同时返回该数组元素的index
 */
var getRealIndex = function getRealIndex(arrList, itemId, myIndex) {
  var realIndex = 0;
  arrList.forEach(function (element) {
    var Item = element;

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

var getQueryStringByName = function getQueryStringByName(text) {
  var href = decodeURI(location.href); // 转义

  var result = href.match(new RegExp("[?&]".concat(text, "=([^&#]+)"), 'i'));

  if (result == null || result.length < 1) {
    return '';
  }

  return result[1];
};
var debounce = function debounce(fn, delay) {
  var timer;
  return function () {
    var context = _this;
    timer && clearTimeout(timer);
    timer = setTimeout(function () {
      // eslint-disable-next-line no-undef
      fn.apply(context, utils_arguments);
    }, delay);
  };
};
var throttle = function throttle(fn, interval) {
  var last = 0;
  return function () {
    var context = _this;
    var now = Date.now();

    if (now - last > interval) {
      last = now; // eslint-disable-next-line no-undef

      fn.apply(context, utils_arguments);
    }
  };
};
var u = navigator.userAgent;
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
var utils_useDefaultValue = function useDefaultValue(obj) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var ret;
  var isLog = false;
  var isArray = Array.isArray(obj);

  function isObject(val) {
    return val != null && Object(esm_typeof["a" /* default */])(val) === 'object' && Array.isArray(val) === false;
  }

  if (isArray) {
    ret = [];

    for (var index = 0; index < obj.length; index += 1) {
      var value = obj[index];
      var isGetDefaultValue = value === '' || value === null || isNaN(value);

      if (isGetDefaultValue) {
        if (!isLog) isLog = true;
        ret.push(defaultValue);
      } else {
        ret.push(value);
      }
    }
  } else if (isObject(obj)) {
    ret = {};

    for (var key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        var _value = obj[key];

        var _isGetDefaultValue = _value === '' || _value === null || isNaN(_value);

        if (_isGetDefaultValue) {
          if (!isLog) isLog = true;
          ret[key] = defaultValue;
        } else {
          ret[key] = _value;
        }
      }
    }
  } else {
    console.error('=== not match any type ===');
  }

  if (isLog) console.log('==== useDefaultValue ====');
  return ret;
};
// EXTERNAL MODULE: ./src/api/constant.js
var constant = __webpack_require__("2957");

// EXTERNAL MODULE: ./src/config/config.json
var config = __webpack_require__("896d");

// CONCATENATED MODULE: ./src/store/actions.js










var _types$INIT$types$INI;






var timer = 0; // setInterval定时器ID

var _firstCallback = true; // 是否第一次查询设备状态

var allowCommit = true; // 是否允许提交 dataObject
// 自定义数据，根据业务更改

function customizeDataObject(_dataObject) {
  var dataObject = _dataObject;
  dataObject = utils_useDefaultValue(dataObject); // 由于不同设备，有些设备没有此字段模块回空字符串

  return dataObject;
}

/* harmony default export */ var actions = (_types$INIT$types$INI = {}, Object(defineProperty["a" /* default */])(_types$INIT$types$INI, types["d" /* INIT */], function (_ref) {
  return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var dispatch, state, functype;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch = _ref.dispatch, state = _ref.state;
            _context.prev = 1;
            _context.next = 4;
            return dispatch(types["e" /* INIT_DEVICE_DATA */]);

          case 4:
            functype = state.functype;

            if (functype === 0) {
              // 获取设备信息
              dispatch(types["b" /* GET_DEVICE_INFO */]); // 查询一包数据

              dispatch(types["a" /* GET_DEVICE_DATA */]); // 定时轮询 - 获取设备所有状态数据

              dispatch(types["m" /* TIMER_GET_ALL_DEVICE_STATES */]);
            }

            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            console.warn(_context.t0);

          case 11:
            _context.prev = 11;
            // 关闭原生加载H5的全屏白底loading
            // TODO: vue 可能没渲染完页面
            Object(PluginInterface_promise["d" /* finishLoad */])();
            return _context.finish(11);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8, 11, 14]]);
  }))();
}), Object(defineProperty["a" /* default */])(_types$INIT$types$INI, types["e" /* INIT_DEVICE_DATA */], function (_ref2) {
  return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var dispatch, commit, mac, functype, data, dataObject;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch = _ref2.dispatch, commit = _ref2.commit;
            _context2.prev = 1;
            // 打印基础数据为了方便调试
            console.log('[window] location: ', window.location);
            console.log('[config_xml] config: ', config); // 获取mac

            mac = getQueryStringByName('mac');
            console.log('[url] mac:', mac);
            commit(types["l" /* SET_MAC */], mac); // 获取functype

            functype = getQueryStringByName('functype') || 0;
            console.log('[url] functype:', functype);
            commit(types["k" /* SET_FUNCTYPE */], Number(functype)); // 获取小卡片提供第一包设备数据

            data = getQueryStringByName('data');
            console.log('[url] data:', data); // 根据设备信息解析第一包设备数据

            _context2.next = 14;
            return dispatch(types["f" /* PARSE_DATA_BY_COLS */], data);

          case 14:
            dataObject = _context2.sent;
            // 自定义数据，根据业务更改
            dataObject = customizeDataObject(dataObject);
            commit(types["i" /* SET_DATA_OBJECT */], dataObject);
            _context2.next = 22;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](1);
            console.error(_context2.t0);

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 19]]);
  }))();
}), Object(defineProperty["a" /* default */])(_types$INIT$types$INI, types["f" /* PARSE_DATA_BY_COLS */], function (context, payload) {
  var dataObject = {};

  try {
    var cols = config.device.statueJson2;
    var res = JSON.parse(payload);

    for (var i = 0, j = cols.length; i < j; i += 1) {
      dataObject[cols[i]] = res[i]; // 遍历查询到的数据
    }

    console.log('dataObject:', JSON.stringify(dataObject));
  } catch (e) {
    console.error(e);
  }

  return dataObject;
}), Object(defineProperty["a" /* default */])(_types$INIT$types$INI, types["m" /* TIMER_GET_ALL_DEVICE_STATES */], function (_ref3) {
  return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var dispatch;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            dispatch = _ref3.dispatch;

            try {
              // 清除定时器
              timer && clearInterval(timer); // 开启轮询设备状态

              timer = setInterval(function () {
                allowCommit = true; // 获取设备信息

                dispatch(types["b" /* GET_DEVICE_INFO */]); // 查询一包数据

                dispatch(types["a" /* GET_DEVICE_DATA */]);
              }, 5000);
            } catch (e) {
              console.error(e);
            }

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }))();
}), Object(defineProperty["a" /* default */])(_types$INIT$types$INI, types["b" /* GET_DEVICE_INFO */], function (_ref4) {
  return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var dispatch, commit, state, mac, res, deviceInfo;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            dispatch = _ref4.dispatch, commit = _ref4.commit, state = _ref4.state;
            _context4.prev = 1;

            if (!state.functype) {
              _context4.next = 4;
              break;
            }

            return _context4.abrupt("return");

          case 4:
            mac = state.mac;
            _context4.next = 7;
            return Object(PluginInterface_promise["f" /* getInfo */])(mac)["catch"](function (e) {
              return console.error(e);
            });

          case 7:
            res = _context4.sent;
            deviceInfo = JSON.parse(res);
            commit(types["j" /* SET_DEVICE_INFO */], deviceInfo);
            _context4.next = 15;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](1);
            console.error(_context4.t0);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 12]]);
  }))();
}), Object(defineProperty["a" /* default */])(_types$INIT$types$INI, types["a" /* GET_DEVICE_DATA */], function (_ref5) {
  return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var state, commit, dispatch, mac, deviceInfo, cols, t, SEARCH_JSON, data, uiVersion, dataObject;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            state = _ref5.state, commit = _ref5.commit, dispatch = _ref5.dispatch;
            _context5.prev = 1;

            if (!state.functype) {
              _context5.next = 4;
              break;
            }

            return _context5.abrupt("return");

          case 4:
            mac = state.mac, deviceInfo = state.deviceInfo; // 采用本地 SEARCH_JSON 作查询， fullstatueJson 弃用，为了更快显示H5

            cols = config.device.statueJson2;
            t = 'status';
            SEARCH_JSON = JSON.stringify({
              cols: cols,
              mac: mac,
              t: t
            });
            _context5.next = 10;
            return Object(PluginInterface_promise["g" /* sendDataToDevice */])(mac, SEARCH_JSON, false);

          case 10:
            data = _context5.sent;
            // 尝试修复设备断电后，立刻点击小卡片，显示WebView控制页面的整改问题
            console.log(config);

            if (!(_firstCallback && data === '')) {
              _context5.next = 19;
              break;
            }

            uiVersion = config.device.uiVersion;
            _context5.t0 = uiVersion;
            _context5.next = _context5.t0 === '1' ? 17 : 18;
            break;

          case 17:
            return _context5.abrupt("break", 19);

          case 18:
            return _context5.abrupt("break", 19);

          case 19:
            console.log(deviceInfo);
            _firstCallback = false;
            _context5.next = 23;
            return dispatch(types["f" /* PARSE_DATA_BY_COLS */], data);

          case 23:
            dataObject = _context5.sent;
            // 自定义数据，根据业务更改
            dataObject = customizeDataObject(dataObject);
            allowCommit && commit(types["i" /* SET_DATA_OBJECT */], dataObject);
            _context5.next = 31;
            break;

          case 28:
            _context5.prev = 28;
            _context5.t1 = _context5["catch"](1);
            console.error(_context5.t1);

          case 31:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 28]]);
  }))();
}), Object(defineProperty["a" /* default */])(_types$INIT$types$INI, types["c" /* GET_WORKING_DEVICE_STATES */], function (_ref6) {
  return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var dispatch, commit, state, mac, cols, t, SEARCH_JSON, data, dataObject;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            dispatch = _ref6.dispatch, commit = _ref6.commit, state = _ref6.state;
            mac = state.mac; // 采用本地 SEARCH_JSON 作查询， fullstatueJson 弃用，为了更快显示H5用

            cols = config.device.statueJson2;
            t = 'status';
            SEARCH_JSON = JSON.stringify({
              cols: cols,
              mac: mac,
              t: t
            });
            _context6.next = 7;
            return Object(PluginInterface_promise["g" /* sendDataToDevice */])(mac, SEARCH_JSON, false);

          case 7:
            data = _context6.sent;
            _context6.next = 10;
            return dispatch(types["f" /* PARSE_DATA_BY_COLS */], data);

          case 10:
            dataObject = _context6.sent;
            // 更新的状态，根据业务更改
            // const { Pow } = dataObject;
            commit(types["i" /* SET_DATA_OBJECT */], dataObject);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }))();
}), Object(defineProperty["a" /* default */])(_types$INIT$types$INI, types["h" /* SEND_FUNCTYPE_CTRL */], function (_ref7) {
  var _arguments = arguments;
  return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var state, payload, getRemarks, zh, mac, dataObject, p, opt, key, val, t, cmd, remarks;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            state = _ref7.state;
            payload = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : {};

            try {
              getRemarks = function getRemarks(_ref8) {
                var opt = _ref8.opt,
                    p = _ref8.p,
                    zh = _ref8.zh;
                var ret = '';

                for (var index = 0; index < opt.length; index += 1) {
                  var _key = opt[index];
                  var _val = p[index];

                  if (zh["".concat(_key, "_").concat(_val)]) {
                    // 非动态的，如模式
                    ret += "".concat(zh["".concat(_key, "_").concat(_val)], " ");
                  } else if (zh[_key]) {
                    // 动态的，如风速
                    ret += "".concat(zh[_key]).concat(_val, " ");
                  }
                }

                ret += '...';
                return ret;
              };

              zh = payload;
              mac = state.mac, dataObject = state.dataObject;
              p = [];
              opt = [];

              for (key in dataObject) {
                val = dataObject[key];
                opt.push(key);
                p.push(val);
              }

              t = 'cmd';
              cmd = JSON.stringify({
                opt: opt,
                p: p,
                t: t
              });
              remarks = getRemarks({
                opt: opt,
                p: p,
                zh: zh
              });
              Object(PluginInterface_promise["e" /* getCCcmd */])(mac, cmd, remarks, JSON.stringify(p));
            } catch (e) {
              console.error(e);
            }

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }))();
}), Object(defineProperty["a" /* default */])(_types$INIT$types$INI, types["g" /* SEND_CTRL */], function (_ref9, DataObject) {
  return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var state, dispatch, mac, dataObject, keys, opt, p, t, json, res, resJson, r, cardCols, _p, i, j;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            state = _ref9.state, dispatch = _ref9.dispatch;
            _context8.prev = 1;
            mac = state.mac, dataObject = state.dataObject;
            keys = Object.keys(DataObject);
            opt = [];
            p = []; // 组装指令，根据业务更改

            keys.forEach(function (key) {
              opt.push(key);
              p.push(DataObject[key]);
            });
            t = 'cmd';
            json = JSON.stringify({
              mac: mac,
              t: t,
              opt: opt,
              p: p
            });
            console.log(json); // 集中控制时数据不下发

            if (!state.functype) {
              _context8.next = 12;
              break;
            }

            return _context8.abrupt("return");

          case 12:
            if (!(constant["b" /* __PROD__ */] || constant["c" /* __TEST__ */])) {
              _context8.next = 21;
              break;
            }

            // 发送指令前取消定时器
            timer && clearInterval(timer);
            allowCommit = false;
            _context8.next = 17;
            return Object(PluginInterface_promise["g" /* sendDataToDevice */])(mac, json, false)["catch"](function (e) {
              return console.error(e);
            });

          case 17:
            res = _context8.sent;
            resJson = JSON.parse(res);
            r = resJson.r; // 成功之后更新主体状态

            if (r === 200) {
              // TODO: 需要项目验证此逻辑是否没问题
              // 小卡片字段 全部更新给主体
              cardCols = config.device.statueJson;
              _p = [];

              for (i = 0, j = cardCols.length; i < j; i += 1) {
                _p.push(dataObject[cardCols[i]]); // 遍历查询到的数据

              }

              Object(PluginInterface_promise["j" /* updateStates */])(mac, JSON.stringify(_p))["catch"](function (e) {
                return console.error(e);
              });
            }

          case 21:
            _context8.next = 26;
            break;

          case 23:
            _context8.prev = 23;
            _context8.t0 = _context8["catch"](1);
            console.error(_context8.t0);

          case 26:
            _context8.prev = 26;
            // 定时轮询 - 获取设备数据
            dispatch(types["m" /* TIMER_GET_ALL_DEVICE_STATES */]);
            return _context8.finish(26);

          case 29:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 23, 26, 29]]);
  }))();
}), _types$INIT$types$INI);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// CONCATENATED MODULE: ./src/store/mutations.js



var _types$SET_MAC$types$;

 // 同步操作放这里

/* harmony default export */ var mutations = (_types$SET_MAC$types$ = {}, Object(defineProperty["a" /* default */])(_types$SET_MAC$types$, types["l" /* SET_MAC */], function (state, payload) {
  state.mac = payload;
}), Object(defineProperty["a" /* default */])(_types$SET_MAC$types$, types["j" /* SET_DEVICE_INFO */], function (state, payload) {
  state.deviceInfo = payload;
}), Object(defineProperty["a" /* default */])(_types$SET_MAC$types$, types["k" /* SET_FUNCTYPE */], function (state, payload) {
  state.functype = payload;
}), Object(defineProperty["a" /* default */])(_types$SET_MAC$types$, types["i" /* SET_DATA_OBJECT */], function (state, payload) {
  state.dataObject = Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, state.dataObject), payload);
}), _types$SET_MAC$types$);
// CONCATENATED MODULE: ./src/store/state.js
var state_state = {
  mac: '',
  // 设备mac
  isScene: 0,
  // 是否是场景模式（集中控制）
  functype: 0,
  // 是否是场景模式（集中控制）0代表正常，1代表集中控制
  dataObject: {
    ErrorCode1: 0,
    // 多个错误代码
    ErrorCode2: 0,
    // 多个错误代码
    WorkStatus: 3,
    // 设备状态 详见WORKSTATUS
    FilterNum: 2,
    //滤芯数量 0~5
    TotalPureWater: 10,
    //总制水量 取值范围：0-65535，间距：1, 单位：L
    LifeTimeFilter1: 50,
    // 滤芯寿命  取值范围：0-100，间距：1, 单位：%
    LifeTimeFilter2: 70,
    // 滤芯寿命  取值范围：0-100，间距：1, 单位：%
    LifeTimeFilter3: 20,
    // 滤芯寿命  取值范围：0-100，间距：1, 单位：%
    LifeTimeFilter4: 100,
    // 滤芯寿命  取值范围：0-100，间距：1, 单位：%
    LifeTimeFilter5: 100,
    // 滤芯寿命  取值范围：0-100，间距：1, 单位：%
    FilterKind1: 1,
    // 滤芯种类
    FilterKind2: 2,
    // 滤芯种类
    FilterKind3: 3,
    // 滤芯种类
    FilterKind4: 4,
    // 滤芯种类
    FilterKind5: 5,
    // 滤芯种类
    FilterWarning1: 0,
    // 滤芯寿命提醒  枚举值：0（正常） 1（更换） 2（已到期提醒）
    FilterWarning2: 0,
    // 滤芯寿命提醒  枚举值：0（正常） 1（更换） 2（已到期提醒）
    FilterWarning3: 0,
    // 滤芯寿命提醒  枚举值：0（正常） 1（更换） 2（已到期提醒）
    FilterWarning4: 0,
    // 滤芯寿命提醒  枚举值：0（正常） 1（更换） 2（已到期提醒）
    FilterWarning5: 0,
    // 滤芯寿命提醒  枚举值：0（正常） 1（更换） 2（已到期提醒）
    LifeFilterDays1: 10,
    // 滤芯寿命天数  取值范围：0-1100，间距：1, 单位：d
    LifeFilterDays2: 1,
    // 滤芯寿命天数  取值范围：0-1100，间距：1, 单位：d
    LifeFilterDays3: 6,
    // 滤芯寿命天数  取值范围：0-1100，间距：1, 单位：d
    LifeFilterDays4: 10,
    // 滤芯寿命天数  取值范围：0-1100，间距：1, 单位：d
    LifeFilterDays5: 10,
    // 滤芯寿命天数  取值范围：0-1100，间距：1, 单位：d
    JFerr: 0 // wifi通讯故障 1、2、3代表故障 0代表无故障

  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '',
    // 主体插件页面路径
    fullstatueJson: '',
    // config.xml里对应的查询字段
    deviceState: 2,
    // 设备在线状态，-1离线，2在线
    lang: '',
    // 语言
    name: '净水机'
  }
};
/* harmony default export */ var store_state = (state_state);
// CONCATENATED MODULE: ./src/store/index.js






vue_runtime_esm["default"].use(vuex_esm["a" /* default */]);
/* harmony default export */ var store = __webpack_exports__["a"] = (new vuex_esm["a" /* default */].Store({
  state: store_state,
  getters: store_getters,
  actions: actions,
  mutations: mutations,
  modules: {},
  strict: "production" !== 'production'
}));

/***/ }),

/***/ "56d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/gree-ui/lib/page/index.js
var page = __webpack_require__("f207");
var page_default = /*#__PURE__*/__webpack_require__.n(page);

// EXTERNAL MODULE: ./node_modules/gree-ui/lib/view/index.js
var view = __webpack_require__("fc7b");
var view_default = /*#__PURE__*/__webpack_require__.n(view);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__("cca6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.finally.js
var es_promise_finally = __webpack_require__("a79d");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/vue-i18n/dist/vue-i18n.esm.js
var vue_i18n_esm = __webpack_require__("a925");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ../static/lib/PluginInterface.promise.js
var PluginInterface_promise = __webpack_require__("3ead");

// EXTERNAL MODULE: ./src/App.vue + 4 modules
var App = __webpack_require__("3dfd");

// EXTERNAL MODULE: ./src/assets/js/flexible.js
var flexible = __webpack_require__("d332");

// EXTERNAL MODULE: ./src/assets/scss/global.scss
var global = __webpack_require__("b751");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./src/store/types.js
var types = __webpack_require__("6e87");

// CONCATENATED MODULE: ./src/mixins/utils/globalMixin.js


// 根据实际业务修改


var mixin = {
  computed: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["d" /* mapState */])({
    mac: function mac(state) {
      return state.mac;
    },
    dataObject: function dataObject(state) {
      return state.dataObject;
    },
    functype: function functype(state) {
      return state.functype;
    },
    isScene: function isScene(state) {
      return state.functype;
    },
    // 兼容以前开发的变量名
    devname: function devname(state) {
      return state.deviceInfo.name;
    } // 设备名称

  })),
  methods: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["c" /* mapMutations */])({
    setDataObject: types["i" /* SET_DATA_OBJECT */]
  })), Object(vuex_esm["b" /* mapActions */])({
    sendCtrl: types["g" /* SEND_CTRL */]
  }))
};
/* harmony default export */ var globalMixin = (mixin);
// CONCATENATED MODULE: ./src/mixins/utils/updateStatus.js


/**
 * @description 检测有没有故障，有没有掉线
 */

var updateStatus = {
  computed: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["d" /* mapState */])({
    isOffline: function isOffline(state) {
      return state.deviceInfo.deviceState;
    },
    functype: function functype(state) {
      return state.functype;
    }
  })),
  watch: {
    /**
     * @description 设备离线时跳转离线页面
     */
    isOffline: {
      handler: function handler(newV, oldV) {
        console.log('------------- isOffline  -----', newV, oldV);
        if (this.functype) return;
        console.log('functype', this.functype);

        if (newV === -1) {
          this.$router.push({
            name: 'Offline'
          })["catch"](function (e) {
            console.error(e);
          });
        } else if (oldV === -1) {
          this.$router.push({
            name: 'Home'
          })["catch"](function (e) {
            console.error(e);
          });
        }
      },
      immediate: true
    }
  }
};
/* harmony default export */ var utils_updateStatus = (updateStatus);
// CONCATENATED MODULE: ./src/mixins/utils/debug.js

 // 自定义初始化功能，可以修改

var debug_mixin = {
  mixins: [globalMixin, // 全局变量、方法
  utils_updateStatus]
};
/* harmony default export */ var debug = (debug_mixin);
// CONCATENATED MODULE: ./src/mixins/utils/init.js

// 根据实际业务修改




var init_mixin = {
  mixins: [globalMixin, // 全局变量、方法
  utils_updateStatus // 该mixin自定义初始化时检测故障等功能，需更改
  ],
  created: function created() {
    /**
     *  @description 初始化，并将小卡片传进来的值赋予 state
     */
    this.init();
  },
  methods: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["b" /* mapActions */])({
    init: types["d" /* INIT */]
  }))
};
/* harmony default export */ var utils_init = (init_mixin);
// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__("8c4f");

// CONCATENATED MODULE: ./src/router.js



var Home = function Home(r) {
  return Promise.all(/* require.ensure | home */[__webpack_require__.e("HelpFaultAnalysis~HelpFilterList~HelpFilterReplaceCycle~HelpFilterReplaceMethod~HelpFilterReset~home"), __webpack_require__.e("home")]).then((function () {
    return r(__webpack_require__("3124"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

var Offline = function Offline(r) {
  return __webpack_require__.e(/* require.ensure | Offline */ "Offline").then((function () {
    return r(__webpack_require__("d8ef"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

var ErrorWarning = function ErrorWarning(r) {
  return __webpack_require__.e(/* require.ensure | ErrorWarning */ "ErrorWarning").then((function () {
    return r(__webpack_require__("a134"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

var HelpFilterList = function HelpFilterList(r) {
  return Promise.all(/* require.ensure | HelpFilterList */[__webpack_require__.e("HelpFaultAnalysis~HelpFilterList~HelpFilterReplaceCycle~HelpFilterReplaceMethod~HelpFilterReset~home"), __webpack_require__.e("HelpFilterList")]).then((function () {
    return r(__webpack_require__("8110"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

var HelpFaultAnalysis = function HelpFaultAnalysis(r) {
  return Promise.all(/* require.ensure | HelpFaultAnalysis */[__webpack_require__.e("HelpFaultAnalysis~HelpFilterList~HelpFilterReplaceCycle~HelpFilterReplaceMethod~HelpFilterReset~home"), __webpack_require__.e("HelpFaultAnalysis")]).then((function () {
    return r(__webpack_require__("0c4e"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

var HelpFilterReplaceCycle = function HelpFilterReplaceCycle(r) {
  return Promise.all(/* require.ensure | HelpFilterReplaceCycle */[__webpack_require__.e("HelpFaultAnalysis~HelpFilterList~HelpFilterReplaceCycle~HelpFilterReplaceMethod~HelpFilterReset~home"), __webpack_require__.e("HelpFilterReplaceCycle")]).then((function () {
    return r(__webpack_require__("17bb"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

var HelpFilterReset = function HelpFilterReset(r) {
  return Promise.all(/* require.ensure | HelpFilterReset */[__webpack_require__.e("HelpFaultAnalysis~HelpFilterList~HelpFilterReplaceCycle~HelpFilterReplaceMethod~HelpFilterReset~home"), __webpack_require__.e("HelpFilterReset")]).then((function () {
    return r(__webpack_require__("e0db"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

var HelpFilterReplaceMethod = function HelpFilterReplaceMethod(r) {
  return Promise.all(/* require.ensure | HelpFilterReplaceMethod */[__webpack_require__.e("HelpFaultAnalysis~HelpFilterList~HelpFilterReplaceCycle~HelpFilterReplaceMethod~HelpFilterReset~home"), __webpack_require__.e("HelpFilterReplaceMethod")]).then((function () {
    return r(__webpack_require__("3a96"));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

vue_runtime_esm["default"].use(vue_router_esm["a" /* default */]);
/* harmony default export */ var router = (new vue_router_esm["a" /* default */]({
  base: "",
  routes: [{
    path: '/',
    redirect: '/Home'
  }, {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true
    }
  }, {
    path: '/ErrorWarning',
    name: 'ErrorWarning',
    component: ErrorWarning
  }, {
    path: '/Offline',
    name: 'Offline',
    component: Offline
  }, {
    path: '/HelpFilterList',
    name: 'HelpFilterList',
    component: HelpFilterList
  }, {
    path: '/HelpFaultAnalysis',
    name: 'HelpFaultAnalysis',
    component: HelpFaultAnalysis
  }, {
    path: '/HelpFilterReplaceMethod',
    name: 'HelpFilterReplaceMethod',
    component: HelpFilterReplaceMethod
  }, {
    path: '/HelpFilterReset',
    name: 'HelpFilterReset',
    component: HelpFilterReset
  }, {
    path: '/HelpFilterReplaceCycle',
    name: 'HelpFilterReplaceCycle',
    component: HelpFilterReplaceCycle
  }]
}));
// EXTERNAL MODULE: ./src/store/index.js + 5 modules
var store = __webpack_require__("4360");

// EXTERNAL MODULE: ./src/utils/language.js
var language = __webpack_require__("36f0");

// EXTERNAL MODULE: ./src/api/constant.js
var constant = __webpack_require__("2957");

// EXTERNAL MODULE: ./node_modules/iotfe-components/dist/iotfeComponents.umd.min.js
var iotfeComponents_umd_min = __webpack_require__("75c2");
var iotfeComponents_umd_min_default = /*#__PURE__*/__webpack_require__.n(iotfeComponents_umd_min);

// EXTERNAL MODULE: ./node_modules/iotfe-components/dist/iotfeComponents.css
var iotfeComponents = __webpack_require__("a0cf");

// CONCATENATED MODULE: ./src/main.js











 // 主体接口：关闭插件页、获取设备信息、改变状态栏颜色




 // 开发环境初始化

 // 生产环境初始化



 // 对i18n的封装




 // import { ErrorWarningComponent, OfflineComponent } from 'iotfe-components';
// import 'iotfe-components/dist/iotfeComponents.css';
// 安装插件

vue_runtime_esm["default"].use(vue_i18n_esm["a" /* default */]);
vue_runtime_esm["default"].use(language["a" /* default */]);
vue_runtime_esm["default"].use(vuex_esm["a" /* default */]);
vue_runtime_esm["default"].component(view_default.a.name, view_default.a);
vue_runtime_esm["default"].component(page_default.a.name, page_default.a);
vue_runtime_esm["default"].use(iotfeComponents_umd_min_default.a); // 使用语言包

var i18n = new vue_i18n_esm["a" /* default */]({
  locale: 'zh_CN',
  messages: {
    en: __webpack_require__("811a"),
    zh_CN: __webpack_require__("305d")
  }
});
vue_runtime_esm["default"].config.productionTip = false;
var dev = "production" === 'development';
var test = "debug" === 'test'; // vue实例挂载到window，用于控制台查看

window.vm = new vue_runtime_esm["default"]({
  el: '#app',
  i18n: i18n,
  store: store["a" /* default */],
  router: router,
  mixins: constant["a" /* __DEV__ */] ? [debug] : [utils_init],
  render: function render(h) {
    return h(App["a" /* default */]);
  }
});
/* 启用页面调试器 */

if (['test', 'debug'].includes("debug")) {
  var VConsole = __webpack_require__("3a34");

  new VConsole();
}
/* ********************************* Native Func ********************************* */

/**
 * @description 安卓后退键方法。如果开始预约或者故障则直接退出。预约界面调用取消预约的按键，模式选择页面时调用取消选择的按键。其他就返回上一层
 */


window.backButton = function backButton() {
  var name = router.currentRoute.name;

  if (name === 'Home' || name === 'Offline') {
    Object(PluginInterface_promise["b" /* closePage */])();
  } else {
    router.back(-1);
  }
};
/**
 * @description APP从后台切回来之后同步数据 - iOS
 */


window.onReFocus = function onReFocus() {
  store["a" /* default */].dispatch(types["b" /* GET_DEVICE_INFO */]);
};
/**
 * @description APP从后台切回来之后同步数据 - Android
 */


window.onResume = function onResume() {
  store["a" /* default */].dispatch(types["b" /* GET_DEVICE_INFO */]);
}; // 根据加载页面改变状态栏颜色


window.init = function init() {
  if (!dev || test) {
    new vue_runtime_esm["default"]({
      el: '#app',
      i18n: i18n,
      store: store["a" /* default */],
      router: router,
      mixins: dev ? [debug] : [utils_init],
      render: function render(h) {
        return h(App["a" /* default */]);
      }
    });
  }

  Object(PluginInterface_promise["a" /* changeBarColor */])('#EDF3F4');
  router.beforeEach(function (to, from, next) {
    var color = '#f4f4f4';

    if (to.name === 'Home') {
      color = '#f4f4f4';
    }

    Object(PluginInterface_promise["a" /* changeBarColor */])(color);
    next();
  });
};

/***/ }),

/***/ "6e87":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return SET_MAC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return SET_FUNCTYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return SET_DEVICE_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return SET_DATA_OBJECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return INIT_DEVICE_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GET_DEVICE_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GET_DEVICE_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return PARSE_DATA_BY_COLS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return TIMER_GET_ALL_DEVICE_STATES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return GET_WORKING_DEVICE_STATES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return SEND_CTRL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return SEND_FUNCTYPE_CTRL; });
/** mutations */
var SET_MAC = 'SET_MAC'; // 设置mac

var SET_FUNCTYPE = 'SET_FUNCTYPE'; // 设置functype

var SET_DEVICE_INFO = 'SET_DEVICE_INFO'; // 设置deviceInfo

var SET_DATA_OBJECT = 'SET_DATA_OBJECT'; // 设备的各种状态
// 根据业务逻辑修改

/** actions */

var INIT = 'INIT'; // cordov初始化后调用的方法

var INIT_DEVICE_DATA = 'INIT_DEVICE_DATA'; // 初始化设备数据

var GET_DEVICE_INFO = 'GET_DEVICE_INFO'; // 获取设备信息

var GET_DEVICE_DATA = 'GET_DEVICE_DATA'; // 获取设备状态

var PARSE_DATA_BY_COLS = 'PARSE_DATA_BY_COLS'; // 根据DeviceInfo解析设备数据

var TIMER_GET_ALL_DEVICE_STATES = 'TIMER_GET_ALL_DEVICE_STATES'; // 初始化定时器轮询设备数据

var GET_WORKING_DEVICE_STATES = 'GET_WORKING_DEVICE_STATES'; // 获取设备信息，用于更新刚启动后更新工作状态

var SEND_CTRL = 'SEND_CTRL'; // 发送控制指令

var SEND_FUNCTYPE_CTRL = 'SEND_FUNCTYPE_CTRL'; // 保存场景控制指令

/***/ }),

/***/ "811a":
/***/ (function(module, exports) {

module.exports = {
  home: {},
  offline: {
    prompt: 'Connection disconnected,',
    detail: 'view details'
  }
};

/***/ }),

/***/ "896d":
/***/ (function(module) {

module.exports = JSON.parse("{\"device\":{\"mid\":\"828307\",\"version\":\"1.0\",\"moduleVer\":\"1\",\"uiVersion\":\"1\",\"iconpath\":\"/images/icon.png\",\"iconpath2\":\"/images/iconGroup.png\",\"statueJson\":[\"WorkStatus\",\"ErrorCode1\",\"ErrorCode2\",\"JFerr\"],\"statueJson2\":[\"ErrorCode1\",\"ErrorCode2\",\"WorkStatus\",\"FilterNum\",\"TotalPureWater\",\"LifeTimeFilter1\",\"LifeTimeFilter2\",\"LifeTimeFilter3\",\"LifeTimeFilter4\",\"LifeTimeFilter5\",\"LifeFilterDays1\",\"LifeFilterDays2\",\"LifeFilterDays3\",\"LifeFilterDays4\",\"LifeFilterDays5\",\"FilterKind1\",\"FilterKind2\",\"FilterKind3\",\"FilterKind4\",\"FilterKind5\",\"FilterWarning1\",\"FilterWarning2\",\"FilterWarning3\",\"FilterWarning4\",\"FilterWarning5\",\"JFerr\"]}}");

/***/ }),

/***/ "b751":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d332":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("b680");

__webpack_require__("acd8");

__webpack_require__("e25e");

__webpack_require__("ac1f");

__webpack_require__("466d");

__webpack_require__("4795");

(function (win, lib) {
  var doc = win.document;
  var docEl = doc.documentElement;
  var metaEl = doc.querySelector('meta[name="viewport"]');
  var flexibleEl = doc.querySelector('meta[name="flexible"]');
  var dpr = 0;
  var scale = 0;
  var tid;
  var flexible = lib.flexible || (lib.flexible = {});
  /*将根据已有的meta标签来设置缩放比例*/

  if (metaEl) {
    var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);

    if (match) {
      scale = parseFloat(match[1]);
      dpr = parseInt(1 / scale);
    }
  } else if (flexibleEl) {
    var content = flexibleEl.getAttribute('content');

    if (content) {
      var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
      var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);

      if (initialDpr) {
        dpr = parseFloat(initialDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }

      if (maximumDpr) {
        dpr = parseFloat(maximumDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
    }
  }
  /*当原先没有设置过meta，以及缩放比例
   * iphone手机根据2,3屏幕处理
   * 其他设备下，仍旧使用1倍的方案  得到dpr和scale的值
   * */


  if (!dpr && !scale) {
    var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;

    if (isIPhone) {
      // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
      if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
        dpr = 3;
      } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
        dpr = 2;
      } else {
        dpr = 1;
      }
    } else {
      // 其他设备下，仍旧使用1倍的方案
      dpr = 1;
    }

    scale = 1 / dpr;
  }
  /*设置html的data-dpr的值*/


  docEl.setAttribute('data-dpr', dpr);
  /*
   *scale
   * 查询有没有meta属性，没有的情况下加上 <meta content='initial-scale= scale, maximum-scale=scale, minimum-scale=scale, user-scalable=no/>
   * */

  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl);
    } else {
      var wrap = doc.createElement('div');
      wrap.appendChild(metaEl);
      doc.write(wrap.innerHTML);
    }
  }
  /*
   * 这个width跟dpr有关系     例如iphone5 dpr为2  得到的屏幕的宽为640px
   *  例如iphone6 plus dpr为3 得到的屏幕的宽为1242px
   * */


  function refreshRem() {
    var width = docEl.getBoundingClientRect().width; //注意这里，这里是适配手机的一个具体的参数，相对大于540的就不适用了

    if (width / dpr > 540) {
      width = 540 * dpr;
    }

    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
  }

  win.addEventListener('resize', function () {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }, false);
  win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);

  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = 12 * dpr + 'px';
  } else {
    doc.addEventListener('DOMContentLoaded', function (e) {
      doc.body.style.fontSize = 12 * dpr + 'px';
    }, false);
  }

  refreshRem();
  /*rem转px
  px转rem*/

  flexible.dpr = win.dpr = dpr;
  flexible.refreshRem = refreshRem;

  flexible.rem2px = function (d) {
    var val = parseFloat(d) * this.rem;

    if (typeof d === 'string' && d.match(/rem$/)) {
      val += 'px';
    }

    return val;
  };

  flexible.px2rem = function (d) {
    var val = parseFloat(d) / this.rem;

    if (typeof d === 'string' && d.match(/px$/)) {
      val += 'rem';
    }

    return val;
  };
})(window, window['lib'] || (window['lib'] = {}));

/***/ })

}]);