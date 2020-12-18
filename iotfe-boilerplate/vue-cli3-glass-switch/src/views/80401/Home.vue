<!--
 * @Description: In User Settings Edit
 * @Author: Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditTime: 2020-09-14 14:25:34
 * @LastEditors: Jerry-Rain
 -->
<template>
  <gree-view>
    <gree-page no-navbar class="page-home">
      <div class="page-header" :style="{backgroundImage:'url(' + head_bg + ')'}">
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          :right-options="{showMore: true}"
          @on-click-back="goBack"
          @on-click-more="moreInfo"
        >{{ devname }}</gree-header>
        <gree-row class="icon"><img :src="timerIcon" v-show="AppTimer"></gree-row>
        <gree-row class="showStatus">
          <img class="statusImg" @click="showLog" :src="Pow ? lightOn : lightOff"/>
        </gree-row>
      </div>
      <div class="page-main">
        <gree-row class="powZoom">
          <gree-button @click="beforeControl" class="powBtn" round>{{ Pow ? '关闭' : '开启' }}</gree-button>
        </gree-row>
      </div>
      <div class="page-bottom">
        <gree-row class="funcZoom">
          <div class="timerZoom">
            <img :src="AppTimer ? timerOffImg : timerImg" class="timerImg" @click="goToTimer" />
            <span class="timerTxt">定时</span>
          </div>
        </gree-row>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Row, Col, Button } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  closePage,
  editDevice,
  showToast,
  showLoading,
  hideLoading,
  changeBarColor,
  timerListDevice
} from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button
  },
  // mixins: [homeConfig],
  data() {
    return {
      timerImg: require('@/assets/img/timer.png'),
      timerOffImg: require('@/assets/img/timerOff.png'),
      timerIcon: require('@/assets/img/timerIcon.png'),
      iconImg: require('@/assets/img/icon.png'),
      lightOn: require('@/assets/img/light_on.png'),
      lightOff: require('@/assets/img/light_off.png'),
      hasTimer: false,
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      Pow: state => state.dataObject.Pow,
      isFirstIn: state => state.isFirstIn,
      AppTimer: state => state.dataObject.AppTimer,
      cloudTimer: state => state.cloudTimer,
      mainMac: state => state.mainMac
    }),
    head_bg() {
      // 此处添加 开关机判断
      if (this.Pow) {
        return require('@/assets/img/bg_header_on.png');
      } 
      return require('@/assets/img/bg_header_off.png');
    },
    power_off_bg() {
      const bg = require('@/assets/img/bg_off.png');
      return bg;
    }
  },
  watch: {
    // 根据pow状态设置颜色
    Pow: {
      handler: function (newv) {
        if (newv) {
          changeBarColor('#51A8F8');
        } else {
          changeBarColor('#ACB0B4');
        }
      },
      immediate: true, 
    }
  },
  created() {},
  mounted() {
    // this.beginTimer(); // 该页面开启轮询
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
      getTimerList: 'GET_TIMERLIST',
      stopTimer: 'STOP_TIMER',
      beginTimer: 'BEGIN_TIMER'
    }),
    /**
     * @description 返回键
     */
    goBack() {
      closePage();
    },
    moreInfo() {
      editDevice(this.mac);
    },
    goToTimer() {
      // TODO:一开始没有云定时，后面加上了，所以要进行兼容
      if (this.cloudTimer) {
        console.log(`${this.mac}@${this.mainMac}`);
        timerListDevice(`${this.mac}@${this.mainMac}`);
      } else {
        // 两种方式
        // this.$router.push('/Timer')
        // if (this.isFirstIn) {
        // 初始化时间列表只进行一次
        this.$store.state.isFirstIn = false;
        console.log(
          '-------------- 初始化 时间列表 只会出现一次 Begin------------------'
        );
        showLoading();
        this.getTimerList(); // 事先获取列表
        console.log(this.timerList);
        console.log(
          '-------------- 结束 时间列表 只会出现一次 End------------------'
        );
        // }
        this.$router.push({ name: 'Timer' });
        // hideLoading();
        // showLoading()
      } 
    },
    beforeControl() {
      this.setDataObject({ Pow: this.Pow ? 0 : 1 });
      this.control();
    },
    control: _.debounce(function () { this.sendCtrl({ Pow: this.Pow }) }, 1000),
    showLog() {
      if (!window.showVconsole) {
        window.showVconsole = 1;
      } else {
        window.showVconsole++;
      }
      /* 启用页面调试器 */
      if (window.showVconsole > 50) {
        const VConsole = require('vconsole/dist/vconsole.min.js');
        // eslint-disable-next-line no-new
        new VConsole();
      } 
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-view-wrapper {
  height: calc(100vh - 669px);
}

.iconZoom {
  position: absolute;
  top: 2.1rem;
  left: 0.5rem;
  height: 0.5rem;
  .iconImg {
    width: 0.5rem;
  }
  .iconTxt {
    color: white;
    font-size: 0.3rem;
    line-height: 0.5rem;
    margin-left: 0.2rem;
  }
}

.showStatus {
  width: 100%;
  position: absolute;
  top: 350px;
  display: flex;
  justify-content: center;
  .statusTxt {
    width: 10rem;
    text-align: center;
    font-size: 0.6rem;
    color: white;
  }
  .statusImg {
    width: 120px;
  }
}

.powZoom {
  display: flex;
  justify-content: center;
  margin-top: 3.5rem;
  .powBtn {
    font-size: 0.7rem;
    max-width: 4rem;
    height: 1.5rem;
    // border-radius: 1rem;
    // box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1); // 阴影效果
    // background-color: white;
    // outline: none;
    // border: 0;
  }
}

.page-bottom {
  position: absolute;
  bottom: 0rem;
  height: 3rem;
  width: 10rem;
  .funcZoom {
    margin-top: 0.3rem;
    justify-content: center;
    .timerZoom {
      // margin-left: 0.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .timerImg {
        width: 1.4rem;
      }
      .timerTxt {
        margin-top: 0.1rem;
        font-size: 0.4rem;
      }
    }
  }
}
.gree-button.default:after {
  border: none;
}
</style>
