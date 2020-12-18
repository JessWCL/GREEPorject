(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ErrorWarning"],{

/***/ "62c0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"95952a12-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/828306/ErrorWarning.vue?vue&type=template&id=311ac176&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('error-warning-component',{attrs:{"type":_vm.type,"errorList":_vm.Er.a,"warningList":_vm.warningList}})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/828306/ErrorWarning.vue?vue&type=template&id=311ac176&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./src/api/error.js
var error = __webpack_require__("94f6");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/828306/ErrorWarning.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
 // import errorConfig from '../../mixins/config/error-config.mixin';


/* harmony default export */ var ErrorWarningvue_type_script_lang_js_ = ({
  components: {},
  mixins: [error["a" /* default */]],
  data: function data() {
    return {
      type: 'error',
      // error: 故障组件 warning: 提醒组件
      errorListMsg: [// { code: 'EC', title: '记忆故障', text: '请联系售后' },
        // { code: 'EE', title: '长时间制水提醒', text: '按复位1键退出，如若再次出现请通知售后' },
        // { code: 'C5', title: '跳线帽故障', text: '请通知售后' }
      ],
      warningList: [// { title: '缺盐提示', text: '请添加洗碗机专用盐' },
        // // 滤芯购买链接
        // {
        //   title: '滤芯寿命将尽',
        //   text: '活性炭滤芯已经使用361天，为了您的健康，请尽快更换滤网',
        //   name: '格力商城',
        //   href: 'https://www.gree.com/'
        // }
      ]
    };
  },
  computed: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["d" /* mapState */])({
    Er: function Er(state) {
      var a;
      this.errorListMsg = [];
      var estate = this.ErrorCode1 + this.ErrorCode2 + this.JFerr;
      var ErrorCode1 = this.ErrorCode1;
      var ErrorCode2 = this.ErrorCode2;
      var JFerr = this.JFerr; // const errorData1 = errorConfig.data().ErrorCode_0;
      // const errorData2 = errorConfig.data().ErrorCode_1;
      // const errorMultiTextJFerr = errorConfig.data().JFerrCode;

      var errorData1 = error["a" /* default */].data().errorMultiText1;
      var errorData2 = error["a" /* default */].data().errorMultiText2;
      var errorMultiTextJFerr = error["a" /* default */].data().errorMultiTextJFerr;

      if (ErrorCode1 !== 0) {
        // Data1多个错误显示
        for (var i = 0; i < 8; i += 1) {
          if (ErrorCode1 & 0x01 << i) {
            errorData1[i].title !== '' && this.errorListMsg.push(errorData1[i]);
          }
        }
      }

      if (ErrorCode2 !== 0) {
        // Data2多个错误显示
        for (var _i = 0; _i < 8; _i += 1) {
          if (ErrorCode2 & 0x01 << _i) {
            errorData2[_i].title !== '' && this.errorListMsg.push(errorData2[_i]);
          }
        }
      }

      if (JFerr !== 0) {
        // wifi故障
        this.errorListMsg.push(errorMultiTextJFerr[0]);
      }

      if (this.errorListMsg === undefined || this.errorListMsg.length < 1) {
        // 判断是否是已知的故障
        estate = 0;
      }

      a = this.errorListMsg;
      console.log('a', a);
      return {
        a: a
      };
    }
  }))
});
// CONCATENATED MODULE: ./src/views/828306/ErrorWarning.vue?vue&type=script&lang=js&
 /* harmony default export */ var _828306_ErrorWarningvue_type_script_lang_js_ = (ErrorWarningvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/828306/ErrorWarning.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  _828306_ErrorWarningvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ErrorWarning = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "94f6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var errorList = {
  data: function data() {
    return {
      errorMultiText1: [{
        // 跳线帽故障
        code: 'C5',
        title: '跳线帽故障',
        text: '请联系售后'
      }, {
        // 板间通讯故障
        code: '',
        headtitle: '',
        title: '',
        subtitle: '',
        text: ''
      }, {
        // 触摸按键故障
        code: '',
        headtitle: '',
        title: '',
        subtitle: '',
        text: ''
      }, {
        // 记忆芯片故障
        code: 'EC',
        headtitle: '故障名称：',
        title: '记忆故障',
        subtitle: '解除办法：',
        text: '请联系售后'
      }, {
        // 漏水故障
        code: '',
        headtitle: '',
        title: '',
        subtitle: '',
        text: ''
      }, {
        // 长时间制水提醒
        code: 'EE',
        headtitle: '故障名称：',
        title: '长时间制水提醒',
        subtitle: '解除办法：',
        text: '按复位1键退出，如若再次出现请联系售后'
      }, {
        //
        code: '',
        headtitle: '',
        title: '',
        subtitle: '',
        text: ''
      }, {
        //
        code: '',
        headtitle: '',
        title: '',
        subtitle: '',
        text: ''
      }],
      errorMultiText2: [{
        // 跳线帽故障
        code: 'C5',
        title: '跳线帽故障',
        text: '请联系售后'
      }, {
        // 板间通讯故障
        code: '',
        headtitle: '',
        title: '',
        subtitle: '',
        text: ''
      }, {
        // 触摸按键故障
        code: '',
        headtitle: '',
        title: '',
        subtitle: '',
        text: ''
      }, {
        // 记忆芯片故障
        code: 'EC',
        headtitle: '故障名称：',
        title: '记忆故障',
        subtitle: '解除办法：',
        text: '请联系售后'
      }, {
        // 漏水故障
        code: '',
        headtitle: '',
        title: '',
        subtitle: '',
        text: ''
      }, {
        // 长时间制水提醒
        code: 'EE',
        headtitle: '故障名称：',
        title: '长时间制水提醒',
        subtitle: '解除办法：',
        text: '按复位1键退出，如若再次出现请联系售后'
      }, {
        //
        code: '',
        headtitle: '',
        title: '',
        subtitle: '',
        text: ''
      }, {
        //
        code: '',
        headtitle: '',
        title: '',
        subtitle: '',
        text: ''
      }],
      errorMultiTextJFerr: [{
        code: 'H1',
        headtitle: '故障名称：',
        title: '整机与WiFi通讯异常',
        subtitle: '解除办法：',
        text: '联系售后'
      }]
    };
  }
};
/* harmony default export */ __webpack_exports__["a"] = (errorList);

/***/ })

}]);