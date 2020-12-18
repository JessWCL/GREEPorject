<template>
  <gree-view bg-color="#F4F4F4">
    <gree-header>故障详情</gree-header>
    <gree-page>
      <errorpage
        type="malfunction"
        :bg-url="BgUrl2"
        :text="errorMultiText"
      ></errorpage>
    </gree-page>
  </gree-view>
</template>

<script>
import { mapState } from 'vuex';
import { Header } from 'gree-ui';
import errorConfig from '../mixins/config/error-config.mixin';
import getRealIndex from '../utils/getIndex';
import errorpage from '../components/error-page';

export default {
  components: {
    [Header.name]: Header,
    errorpage
  },
  mixins: [errorConfig],
  data() {
    return {
      BgUrl2: require('../assets/img/bg_error.png'),
      errShowList: [], // 页面显示的故障列表
      errorMultiText: [
        // {
        //   code: "F0",
        //   headtitle: "故障名称：",
        //   title: "PM2.5 传感器故障",
        //   subtitle: "解除办法：",
        //   text: "请联系指定服务商或服务中心"
        // },
        // {
        //   code: "F1",
        //   headtitle: "故障名称：",
        //   title: "温湿度传感器故障",
        //   subtitle: "解除办法：",
        //   text: "请联系指定服务商或服务中心"
        // },
        // {
        //   code: "F2",
        //   headtitle: "故障名称：",
        //   title: "甲醛传感器故障",
        //   subtitle: "解除办法：",
        //   text: "请联系指定服务商或服务中心"
        // },
        // {
        //   code: "F3",
        //   headtitle: "故障名称：",
        //   title: "CO2 传感器故障",
        //   subtitle: "解除办法：",
        //   text: "请联系指定服务商或服务中心"
        // },
        // {
        //   code: "F4",
        //   headtitle: "故障名称：",
        //   title: "与主控板通讯故障",
        //   subtitle: "解除办法：",
        //   text: "请联系指定服务商或服务中心"
        // }
      ]
    };
  },
  computed: {
    ...mapState({
      isError_0: state => state.dataObject.ErrorCode1,
      isError_1: state => state.dataObject.ErrorCode2,
      JFerr: state => state.dataObject.JFerr // wifi通讯故障单独判断
    })
  },
  watch: {
    isError_0() {
      this.updateError();
    },
    isError_1() {
      this.updateError();
    },
    JFerr() {
      this.updateError();
    }
  },
  mounted() {
    this.updateError();
  },
  methods: {
    /**
     * @function updateError
     * @description 遍历故障列表，更新页面故障信息
     */
    updateError() {
      let referenceNum = 4096;
      const errCacheList = [];
      this.errorMultiText = [];
      if (this.JFerr) {
        errCacheList.push(this.JFerrCode[0]);
      }
      for (let i = 13; i > 0; referenceNum >>>= 1, i -= 1) {
        for (let i = 0; i < 1; i += 1) {
          // ErrorCode此插件无用，暂时不循环
          if (this[`isError_${i}`] & referenceNum) {
            errCacheList.push(
              this[`ErrorCode_${i}`][
                getRealIndex(this[`ErrorCode_${i}`], 'itemId', referenceNum)
              ]
            );
          }
        }
      }
      this.errorMultiText = errCacheList;
    }
  }
};
</script>
