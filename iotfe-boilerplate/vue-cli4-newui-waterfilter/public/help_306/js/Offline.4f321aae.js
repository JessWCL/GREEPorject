(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Offline"],{

/***/ "03d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"95952a12-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/828306/Offline.vue?vue&type=template&id=946db3f2&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('offline-component',{attrs:{"title":_vm.devname}})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/828306/Offline.vue?vue&type=template&id=946db3f2&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/828306/Offline.vue?vue&type=script&lang=js&


//
//
//
//

/* harmony default export */ var Offlinevue_type_script_lang_js_ = ({
  components: {},
  data: function data() {
    return {};
  },
  computed: Object(objectSpread2["a" /* default */])({}, Object(vuex_esm["d" /* mapState */])({
    devname: function devname(state) {
      return state.deviceInfo.name;
    }
  })),
  watch: {
    /**
     * @description 设备上线时返回主页
     */
    // isOffline(newV) {
    //   if (newV === 2) {
    //     this.$router.push({ path: '/' });
    //   }
    // }
  },
  methods: {
    /**
     * @description 返回键
     */
    goBack: function goBack() {
      closePage();
    }
  }
});
// CONCATENATED MODULE: ./src/views/828306/Offline.vue?vue&type=script&lang=js&
 /* harmony default export */ var _828306_Offlinevue_type_script_lang_js_ = (Offlinevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/828306/Offline.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  _828306_Offlinevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Offline = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);