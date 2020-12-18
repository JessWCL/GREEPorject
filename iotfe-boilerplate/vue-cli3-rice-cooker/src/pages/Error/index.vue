<template>
  <!-- 故障页面 -->
  <div class="page-error">
    <div class="error-header">
      <DevInfo @statusBack="goBack()" />
    </div>
    <div
      v-show="errorSingle"
      class="error-body-single"
    >
      <div class="img-wrapper">
        <div
          v-show="errorCode"
          class="error-code"
        >
          <span class="code-txt">{{ errorCode }}</span>
        </div>
        <img
          v-show="!errorCode"
          class="error-img"
          :src="errorImg"
        >
      </div>
      <div class="name-wrapper">
        <p class="txt">
          {{ $language("error.notify_fault_reson") }}
        </p>
        <p class="txt">
          {{ errorName }}
        </p>
      </div>
      <div class="reason-wrapper">
        <p class="txt">
          {{ $language("error.notify_fault_remove") }}
        </p>
        <p
          class="txt"
          v-html="errorResolve"
        />
      </div>
    </div>
    <div
      class="main-multi"
      :class="{hide: errorSingle || multiDetail}"
    >
      <div class="multi-top">
        <img
          src="../../assets/img/error_multi-error.png"
          @click="goMulti()"
        >
      </div>
      <div class="multi-center">
        {{ $language('Err_Multi') }}
      </div>
      <div class="multi-foot">
        {{ $language('Err_P') }}
      </div>
    </div>
    <div
      v-show="multiDetail"
      class="error-body-multi"
    >
      <div
        v-for="(item, index) in errShowList"
        :ref="'error_' + index"
        :key="item.index"
        class="detail-container"
      >
        <div class="detail-code">
          {{ item.code }}
        </div>
        <div class="detail-reason">
          <p>{{ $language("error.notify_fault_reson") }}</p>
          <p>{{ item.name }}</p>
        </div>
        <div class="detail-resolve">
          <p>{{ $language("error.notify_fault_remove") }}</p>
          <p v-html="item.resolve" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @module Error
 * @description 故障页面
 * @requires module:errorConfig
 * @requires module:NavBar
 */
import { mapState } from 'vuex';
import errorConfig from '../../mixins/error-config.mixin';
import errorConfigThirdPartyPlatform from '../../mixins/error-config-third-party-platform.mixin';
import { closePage, changeBarColor } from '../../../../static/lib/PluginInterface.promise';
import DevInfo from '../../components/DevInfo';
import {
  RC_MID_TYPE_30X61C,
  RC_MID_TYPE_30X66C,
  RC_MID_TYPE_30X88C,
  RC_MID_TYPE_40X65C,
  RC_MID_TYPE_4009C,
  RC_MID_TYPE_2008C,
} from '../../api/constants';

export default {
  name: 'Error',
  components: {
    DevInfo,
  },
  mixins: [errorConfig, errorConfigThirdPartyPlatform],
  data() {
    return {
      errorCode: 'E0',
      errorImg: require('../../assets/img/error_E0.png'),
      errorName: this.$language('error.notify_fault_name_E0'),
      errorResolve: this.$language('error.notify_fault_resolve_General'),
      errorSingle: true, // 是否单个故障
      errShowList: [], // 页面显示的故障列表
      multiDetail: false, // 是否显示多故障
    };
  },
  computed: {
    ...mapState({
      MidType: state => state.dataObject.MidType,
      estate_0: state => state.dataObject.estate,
      estate_1: state => state.dataObject.estate2,
      estate_2: state => state.dataObject.estate3,
      estate_3: state => state.dataObject.estate4,
    }),
    /**
       * @function errStatus
       * @param {object} state
       * @description 检测是否有故障
       */
    errStatus: function errStatus() {
      const MidType = Number(this.MidType);
      const is30X61C = MidType === RC_MID_TYPE_30X61C;
      const is30X66C = MidType === RC_MID_TYPE_30X66C;
      const is30X88C = MidType === RC_MID_TYPE_30X88C;
      const is40X65C = MidType === RC_MID_TYPE_40X65C;
      const is4009C = MidType === RC_MID_TYPE_4009C;
      const is2008C = MidType === RC_MID_TYPE_2008C;

      let errState = false;
      if (is2008C || is4009C) {
        if (this.estate_0 !== 0 || this.estate_1 !== 0) {
          errState = true;
        } else if (this.estate_2 !== 0 || this.estate_3 !== 0) {
          this.MidType === 26116 ? errState = true : errState = false;
        }
        errState && this.updateError();
      } else if (is30X61C || is30X66C || is30X88C || is40X65C) {
        if (this.estate_1 !== 0) {
          errState = true;
        }
        errState && this.updateError();
      }
      return errState;
    },
  },
  watch: {
    /**
     * @function watchError
     * @param {number} newv
     * @description 无故障时退出故障页面
     */
    errStatus: function watchError(newV, oldV) {
      const isNormal = newV === false && oldV === true;
      if (isNormal) {
        this.$router.push({path: '/'});
      }
    },
  },
  mounted: function initError() {
    changeBarColor('#ddd5a3');
  },
  methods: {
    /**
     * @function goBack
     * @description 返回键
     * @todo 返回小卡片
     */
    goBack() {
      closePage();
    },
    /**
     * @function goMulti
     * @description 多个故障
     */
    goMulti() {
      this.multiDetail = true;
    },
    /**
     * @function updateError
     * @description 遍历故障列表，更新页面故障信息
     */
    updateError() {
      const MidType = Number(this.MidType);
      const is30X61C = MidType === RC_MID_TYPE_30X61C;
      const is30X66C = MidType === RC_MID_TYPE_30X66C;
      const is30X88C = MidType === RC_MID_TYPE_30X88C;
      const is40X65C = MidType === RC_MID_TYPE_40X65C;
      const is4009C = MidType === RC_MID_TYPE_4009C;
      const is2008C = MidType === RC_MID_TYPE_2008C;

      const errCacheList = [];
      this.errShowList = [];
      if (is2008C || is4009C) {
        for (let i = 0; i <= 8; i += 1) {
          for (let j = 0; j < 4; j += 1) {
            if (this[`estate_${j}`] & (0x01 << i)) {
              errCacheList.push(this[`errorList_${j}`][i]);
            }
          }
        }
      } else if (is30X61C || is30X66C || is30X88C || is40X65C) {
        const index = this.estate_1 - 1;
        errCacheList.push(this.errorListThirdPartyPlatform[index]);
      }
      // 特殊故障显示内容处理：errorConfig的故障代码跟服务器推过来的保持一致，但是wifi通讯故障无故障代码，所以这里更新
      errCacheList.forEach(item => {
        const _item = item;
        _item.code === 'Wf' ? _item.code = 'WiFi图标循环闪烁3次' : '';
        _item.code === 'Eu' ? _item.code = '└┘' : '';
      });
      if (errCacheList.length > 1) {
        this.errShowList = errCacheList;
        this.errorSingle = false;
      } else {
        // 个别无故障代码的用通用图片或者特殊图片
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
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/index.scss';

.page-error {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
  background-image: url('../../assets/img/error_bg.png');
  background-size: 100% 100%;
  overflow: hidden;
  .error-header {
    width: 100%;
    color: #ffffff;
  }
  .error-body-single {
    width: 100%;
    height: 94%;
    box-sizing: border-box;
    .img-wrapper {
      margin-top: 4.5rem;
      width: 100%;
      .error-code {
        position: relative;
        display: inline-table;
        height: 3rem;
        width: 3rem;
        color: #ff0000;
        background-image: url('../../assets/img/error_wapper.png');
        background-size: 100% 100%;
        font-weight: bold;
      }
      .error-img {
        height: 3rem;
        width: 3rem;
      }
      .code-txt {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        font-size: 1.2rem;
      }
    }
    .name-wrapper, .reason-wrapper {
      margin: 0 2%;
      width: 96%;
      padding-top: 0.3rem;
    }
    .txt {
      color: #404657;
      font-size: 0.4rem;
      line-height: 0.7rem;
    }
  }
  .main-multi {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 94%;
    color: #707070;
    text-align: center;
    div {
      width: 100%;
    }
    .multi-top {
      margin-top: 5%;
      height: 23%;
      img {
        width: 32%;
        max-width: 200px;
      }
    }
    .multi-center {
      height: 5%;
      color: #707070;
      @include font-size(16px);
    }
    .multi-foot {
      height: 18%;
      color: #707070;
      @include font-size(16px);
    }
  }
  .error-body-multi {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    height: 94%;
    .detail-container {
      width: 88%;
      padding-top: 8%;
      padding-left: 7%;
      text-align: left;
      .detail-code {
        color: #ff0000;
        font-size: 0.806rem;
      }
      .detail-reason {
        margin-top: 2.6%;
        margin-bottom: 3.2%;
        color: #707070;
        line-height: 0.5rem;
        font-size: 0.324rem;
      }
      .detail-resolve {
        color: #707070;
        line-height: 0.5rem;
        font-size: 0.324rem;
      }
      &:last-child {
        padding-bottom: 10%;
      }
    }
  }
  .hidden {
    visibility: hidden;
  }
  .hide {
    display: none;
  }
}
</style>
