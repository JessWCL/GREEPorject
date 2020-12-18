<template>
  <div class="page">
    <div class="page-content page-error">
      <div class="page-header">
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
          :right-options="{showMore: !functype && editEnable}"
          @on-click-more="moreInfo"
        >{{ devname }}</gree-header>
        <div class="error-body">
          <div
            class="error-code"
            v-show="errorCode"
          >
            <span>{{ errorCode }}</span>
          </div>
          <img
            :src="errorImg"
            v-show="!errorCode"
          >
          <div class="block">
            <h3>{{ $language("error.notify_fault_reson") }}</h3>
            <p>{{ errorName }}</p>
            <h3>{{ $language("error.notify_fault_remove") }}</h3>
            <p v-html="errorResolve"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import errorConfig from '../mixins/config/error';
import {
  closePage,
  editDevice,
  changeBarColor
} from '../../../static/lib/PluginInterface.promise';
import { getRealIndex } from '../utils';

export default {
  mixins: [errorConfig],
  data() {
    return {
      errorCode: 'E0',
      errorImg: require('@/assets/img/error_E0.png'),
      errorName: this.$language('error.notify_fault_name_E0'),
      errorResolve: this.$language('error.notify_fault_resolve_General'),
      errorSingle: true, // 是否单个故障
      errShowList: [] // 页面显示的故障列表
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      editEnable: state => state.editEnable,
      estate_0: state => state.dataObject.estate,
      estate_1: state => state.dataObject.estate2,
      estate_2: state => state.dataObject.estate3,
      estate_3: state => state.dataObject.estate4,
      functype: state => state.functype,
      mac: state => state.mac
    }),
    /**
     * @description 检测是否有故障
     */
    errStatus: function errStatus() {
      let errState;
      if (this.estate_0 || this.estate_1 || this.estate_2 || this.estate_3) {
        errState = true;
        this.updateError();
      } else {
        errState = false;
      }
      return errState;
    }
  },
  watch: {
    /**
     * @description 无故障时退出故障页面
     */
    errStatus: function watchError(newV) {
      if (!newV) {
        this.$router.push({ path: '/' });
      }
    }
  },
  mounted: function initError() {
    changeBarColor('#ddd5a3');
  },
  methods: {
    /**
     * @description 返回键
     */
    goBack() {
      closePage();
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      if (!this.functype) {
        if (this.editEnable) {
          editDevice(this.mac);
        }
      }
    },
    /**
     * @description 遍历故障列表，更新页面故障信息
     */
    updateError() {
      let referenceNum = 128;
      const errCacheList = [];
      this.errShowList = [];
      for (let i = 8; i > 0; referenceNum >>>= 1, i -= 1) {
        for (let j = 0; j < 4; j += 1) {
          if (this[`estate_${j}`] & referenceNum) {
            errCacheList.push(
              this[`errorList_${j}`][
                getRealIndex(this[`errorList_${j}`], 'itemId', referenceNum)
              ]
            );
          }
        }
      }
      // 特殊故障显示内容处理：errorConfig的故障代码跟服务器推过来的保持一致，但是wifi通讯故障无故障代码，所以这里更新
      errCacheList.forEach(item => {
        const _item = item;
        _item.code === 'Wf' ? (_item.code = 'WiFi图标循环闪烁3次') : '';
        _item.code === 'Eu' ? (_item.code = '└┘') : '';
      });
      if (errCacheList.length > 1) {
        this.errShowList = errCacheList;
        this.errorSingle = false;
      } else {
        if (errCacheList[errCacheList.length - 1].showImg) {
          this.errorCode = false;
          this.errorImg = errCacheList[errCacheList.length - 1].ImgUrl;
        } else {
          this.errorCode = errCacheList[errCacheList.length - 1].code;
        }
        this.errorName = errCacheList[errCacheList.length - 1].name;
        this.errorResolve = errCacheList[errCacheList.length - 1].resolve;
        this.errorSingle = true;
      }
    }
  }
};
</script>
