<template>
  <gree-view bgColor='#AACD52'>
    <gree-header
      theme="transparent"
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
      :right-options="{showMore: !functype}"
      @on-click-more="moreInfo"
    >{{ devname }}</gree-header>
    <gree-error-page
      :bg-url="BgUrl"
      :img-url="errorImage"
      :text="errorSingleText"
      v-if="isOneError"
    ></gree-error-page>
    <gree-error-page
      :bg-url="BgUrl"
      :img-url="errorImage"
      :text="errorMultiText"
      :is-multi="true"
      v-else
    ></gree-error-page>
    <div v-show="ErrorNumber"></div>
  </gree-view>
</template>

<script>
import { mapState } from 'vuex';
import {
  closePage,
  editDevice,
  toWebPage
} from '../../../static/lib/PluginInterface.promise';
import errorConfig from '../mixins/config/error';

export default {
  mixins: [errorConfig],
  data() {
    return {
      isOneError: true,
      BgUrl: require('@/assets/img/error_mask.png'),
      errorImage: '',
      errorSingleText: [],
      errorMultiText: []
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      g_mac: state => state.g_mac,
      SensorErr: state => state.dataObject.ErrType
    }),
    /**
     * @description SensorErr字段有特殊故障需跳故障页
     */
    ErrorNumber() {
      let __SensorErr = this.SensorErr;
      let errorSum = 0;
      let oneErrorIndex = null;
      let sensorErrCode = 0;
      const errList = [];
      __SensorErr = String(__SensorErr.toString(2));
      const ErrorFirList = __SensorErr.split('');
      ErrorFirList.reverse();
      for (let i = 0; i < ErrorFirList.length; i += 1) {
        if (ErrorFirList[i] === '1') {
          errorSum += 1;
          oneErrorIndex = i;
          sensorErrCode = 0;
          errList.push(i);
          /* eslint vue/no-side-effects-in-computed-properties: 0 */
          if (i === 3) {
            this.errorImage = require('@/assets/img/error_co.png');
          } else {
            this.errorImage = require('@/assets/img/error_default.png');
          }
        }
      }
      errorSum === 1
        ? this.showSingleError(sensorErrCode, oneErrorIndex)
        : this.showMultiError(errList);
      return errorSum;
    }
  },
  created() {
    if (!this.SensorErr) {
      this.$router.push({ path: '/' });
    }
  },
  methods: {
    /**
     * @description 返回键
     */
    goBack() {
      // closePage();
      if (this.$route.path !== '/') {
        this.$router.back(-1);
      }
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevice(this.g_mac);
    },
    /**
     * @description 单个故障显示
     */
    showSingleError(sensorErrCode, index) {
      this.isOneError = true;
      this.errorSingleText = [
        {
          title: this.$language('error.notify_fault_name'),
          text: this.errorListMixins[index].name
        },
        {
          title: this.$language('error.error_solution'),
          text: this.errorListMixins[index].resolve
        }
      ];
    },
    /**
     * @description 多个故障显示
     */
    showMultiError(param) {
      this.isOneError = false;
      this.errorMultiText = [];
      for (let i = 0; i < param.length; i += 1) {
        this.errorMultiText.push(
          {
            title: this.errorListMixins[param[i]].code,
            subtitle: this.$language('error.notify_fault_name'),
            text: this.errorListMixins[param[i]].name
          },
          {
            subtitle: this.$language('error.error_solution'),
            text: this.errorListMixins[param[i]].resolve
          }
        );
      }
    },
    handleClick() {
      toWebPage(
        'http://pgxt.gree.com:7909/hjzx/bx/addbx.jsp?source=greejia',
        '服务预约'
      );
    }
  }
};
</script>
