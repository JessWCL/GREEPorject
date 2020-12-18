
<template>
  <gree-view bg-color="#2D71DC">
    <gree-page no-navbar class="page-home">
      <!-- 头部 -->
      <div class="page-header" >
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          :right-options="{showMore: true}"
          @on-click-back="goBack"
          @on-click-more="moreInfo"
        >{{ devname }}</gree-header>
        <div class="score">
          <gree-progress
            type="dashboard"
            :width="progressWidth"
            :stroke-width="3"
            :value="score / 100"
            color="#6ed4ff"
          ></gree-progress>
          <div class="score-content">
            <p>昨日评分</p>
            <h2>{{ score || '--' }}</h2>
          </div>
          <div class="battery">当前电量：{{ battery }}%</div>
        </div>
      </div>
      <div class="page-main">
        <!-- 居中内容提示 -->
        <div class="info-bar">
          <span>数据反馈</span>
          <!-- <div @click="refresh">
            <img :class="[showLoading?'refresh':'norefresh']" :src="refreshImg">
            <span>刷新</span> -->
            <!-- <span>刷新时间： {{ refreshDate }}<span/> -->
          <!-- </div>  -->
        </div>
        <div class="main-content">
          <ul>
            <li v-for="(el, i) in parameterList" :key="i">
              <h4>{{ el.value }}</h4>
              <p>
                <img :src="el.img" />
                <span>{{ el.text }}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 尾部 -->
      <div class="page-footer">
        <div class="item" v-for="(item, index) in functionList" :key="index">
          <img :src="item.url" @click="footerFunction(index)" />
          <span>{{ item.name }}</span>
        </div>
      </div>
      
      
      <!-- <myToast 
        ref="myToast"
        :has-mask="false"
        :duration="0"
        :position="'bottom'"
      >
        数据监测中，请保持身体平稳
      </myToast> -->
      <!-- <input ref="refs" type="text"> -->
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Progress, ActivityIndicator } from "gree-ui";
import { mapState, mapMutations, mapActions } from "vuex";
import {
  closePage,
  editDevice
} from "../../../../static/lib/PluginInterface.promise";
import homeConfig from '../../mixins/config/default/home.js';
import * as types from '../../store/types';
import dayjs from 'dayjs';

const imgAssets = {
  heartRate: require('../../assets/img/heartRate.png'),
  breath: require('../../assets/img/breathRate.png'),
  onOffBed: require('../../assets/img/inbedStatus.png'),
};

export default {
  components: {
    [Header.name]: Header,
    [Progress.name]: Progress,
  },
  filters: {
    formatTime(params) {
      let dateObj = new Date();
      if (params instanceof Number) {
        dateObj = new Date(params);
      }
      if (params instanceof String) {
        dateObj = new Date(Number(params, 10));
      }
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const date = dateObj.getDate();
      const hour = dateObj.getHours();
      const minute = dateObj.getMinutes();
      // const second = dateObj.getSeconds();

      return `${year}.${month}.${date} ${`0${hour}`.slice(-2)}:${`0${minute}`.slice(-2)}`;
    }
  },
  mixins: [homeConfig],
  data() {
    return {
      refreshImg: require('../../assets/img/refresh.png'),
      progressWidth: 150,
      refreshDate: 1587631048059,
      // score: 87,
      refreshFlag: false,
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      sleepReal: state => state.myModule.sleepReal,
      score: state => state.myModule.dayReportData.left.score,
      heartRate: state => state.dataObject.HeartRate,
      breathRate: state => state.dataObject.BreathRate,
      inBedState: state => state.dataObject.InBedState,
      battery: state => state.dataObject.Battery,
      showLoading: state => state.loading
    }),

    /* head_bg() {
      const bg = require("@/assets/img/bg_header_on.png");
      return bg;
    }, */

    parameterList() {
      const list = [{
        value: this.heartRate || '- -',
        img: imgAssets.heartRate,
        text: '心率（次/ 分）',
      }, {
        value: this.breathRate || '- -',
        img: imgAssets.breath,
        text: '呼吸 （次/ 分）',
      }, {
        value: this.inBedState ? '在床' : '离床',
        img: imgAssets.onOffBed,
        text: '在/离床',
      }];
      console.log('%c 显示的实时数据', 'color: red;', list);
      return list;
    },
    isUnstable() {
      return !this.sleepReal.breathRate && !this.sleepReal.heartRate && this.sleepReal.bodyMotion;
    },
  },
  watch: {
    isUnstable(val) {
      // if (val) this.$refs.myToast.show();
      // else this.$refs.myToast.hide();
    }
  },
  created() {},
  mounted() {
    // this.searchPowerDate();
    this.getDayReport({paramsStr: {startAt: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), mac: this.mac}}); // 初始化查当日
    this.mountedInit();
    console.log('%c 10/10 11:00', 'color: red;');
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.progressResize);
  },
  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT,
      setLoading: types.SET_LOADING
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL,
      getDayReport: types.GET_DAY_REPORT,
      // searchRealtimeData: types.SEARCH_REALTIME_DATA,
      searchPowerDate: types.SEARCH_POWER_DATA
    }),
    refresh: _.throttle(function () {
        console.log('%c 刷新中... ...', 'color: red;');
        // this.refreshFlag = !this.refreshFlag;
        // this.setLoading(true);
        // this.searchRealtimeData();
    }, 1000),
    mountedInit() {
      this.progressWidth = this.progressSizeCount();
      window.addEventListener('resize', this.progressResize);

      // this.$refs.myToast.hide();
    },
    progressResize() {
      setTimeout(() => {
        this.progressWidth = this.progressSizeCount();
      }, 400);
    },
    progressSizeCount() {
      const docWidth = document.documentElement.clientWidth;
      const headerHeight = document.querySelector('.page-header').getBoundingClientRect().height;
      const progressWidth = 440 * docWidth / 1080;
      const progressHeight = 420 * headerHeight / 680;

      return progressWidth > progressHeight * 44 / 42 ? progressHeight : progressWidth;
    },
    // 显示 console.log
    showLog() {
      if (!window.showVconsole) {
        window.showVconsole = 50;
      } else {
        window.showVconsole++;
      }
      /* 启用页面调试器 */
      if (window.showVconsole > 50) {
        const VConsole = require('vconsole/dist/vconsole.min.js');
        // eslint-disable-next-line no-new
        new VConsole();
      } 
    },
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
      editDevice(this.mac);
    },
    /**
     * @description: 底部功能按钮的点击事件
     */
    footerFunction(index) {
      console.log("btnfunc-", index);
      switch (index) {
        case 0:
          // console.log('睡眠报告');
          this.$router.push('/Report');
          break;
        case 1:
          break;
        case 2:
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang='scss'>
@keyframes refresh{
  from {transform: rotate(0deg);}
  to {transform: rotate(-360deg);}
}
  .page-home {
    .page-header {
      background: linear-gradient(to top, #45a2cd, #2d70dd);
      box-sizing: border-box;
      padding-top: 120px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-content: center;
      position: relative;
      .score {
        text-align: center;
        .gree-progress-dashboard {
          .gree-progress__text {
            display: none;
          }
        }
        .score-content {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -30%);
          color: #eee;
          font-weight: normal;
          p {
            font-size: 45px;
            margin-bottom: 10px;
          }
          h2 {
            font-size: 180px;
            color:#fff;
            font-weight: lighter;
            line-height: 1;
          }
        }
        .battery {
          margin-top: -20px;
          color: #eee;
          font-size: 40px;
        }
      }
    }
    .page-main {
      .info-bar {
        font-size: 40px;
        padding: 30px 40px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        span:last-child {
          margin-left: 10px;
          color: #999;
        }
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          .refresh {
            display: inline-block;
            height: 60px;
            // transition: ALL infinite ease-in-out;
            animation: refresh 0.7s linear infinite;
            transform: rotate(-360deg)
          }
          .norefresh {
            display: inline-block;
            height: 60px;
          }
          .rotate {
            transform: rotate(-720deg);
          }
        }
      }
      .main-content {
        background-color: #fff;
        ul {
          display: flex;
          flex-flow: row wrap;
          padding-top: 50px;
          padding-bottom: 50px;
          li {
            display: block;
            width: 50%;
            box-sizing: border-box;
            // border: 1px solid #000;
            text-align: center;
            padding: 40px 0;
            h4 {
              font-size: 90px;
              margin-bottom: 10px;
            }
            p {
              text-align: left;
              text-indent: 100px;
              img {
                width: 70px;
                height: 70px;
                vertical-align: middle;
                margin-right: 20px;
              }
              span {
                font-size: 40px;
                vertical-align: middle;
              }
            }
            &:last-child{
              h4 {
                font-size: 70px;
                font-weight: normal;
              }
            }
          }
        }
      }
    }
  }
</style>