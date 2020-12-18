
<template>
  <gree-view bg-color="#367CE2">
    <gree-page no-navbar class="page-report" ref="pageReport">
      <!-- 头部 -->
      <div class="page-header" >
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          :right-options="{showMore: true}"
          @on-click-back="goBack"
          @on-click-more="moreInfo"
        >{{ devname }}</gree-header>
        <div class="report-switch">
          <ul>
            <li :class="{active: routeName === 'report_day'}">
              <router-link :to="{ path: '/report/day'}" replace>日</router-link>
            </li>
            <li :class="{active: routeName === 'report_week'}">
              <router-link :to="{ path: '/report/week'}" replace>周</router-link>
            </li>
            <li :class="{active: routeName === 'report_month'}">
              <router-link :to="{ path: '/report/month'}" replace>月</router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- 报告页 -->
      <div class="report-main">
        <!-- <div @click="test" style="height: 80px">测试用区域</div> -->
        <!-- <div>
          <button @click="toggleMyToast">toggle myToast</button>
        </div> -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Progress, } from "gree-ui";
import { mapState, mapMutations, mapActions } from "vuex";
import {
  // closePage,
  editDevice
} from "../../../../static/lib/PluginInterface.promise";
import homeConfig from '../../mixins/config/default/home.js';
import * as types from '../../store/types';
import dayjs from 'dayjs';

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
      refreshDate: 1587631048059,
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,
      dayReportData: state => state.myModule.dayReportData.left,
    }),

    routeName() {
      return this.$route.name;
    }

  },
  watch: {
  },
  created() {},
  mounted() {
    // this.mountedInit();
    // this.getDayReport({paramsStr: {startAt: dayjs().format('YYYY-MM-DD'), mac: this.mac}});
  },
  beforeDestroy() {
    this.$myToast.hide();
  },
  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT,
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL,
      getDayReport: types.GET_DAY_REPORT,
      getWeekReport: types.GET_WEEK_REPORT,
      getMonthReport: types.GET_MONTH_REPORT,
    }),
    test() {
      // this.getDayReport({paramsStr: {startAt: '2020-08-19'}});
      // this.getWeekReport();
      // this.getMonthReport();
    },
    mountedInit() {
      this.$myToast({
        content: 'myToast',
        hasMask: false,
        duration: 1500,
        position: 'center',
      });
    },
    /**
     * @description 返回键
     */
    goBack() {
      console.log(this.$route);
      this.$router.go(-1);
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevice(this.mac);
    },
    toggleMyToast() {
      this.$refs.myToast.visible ? this.$refs.myToast.hide() : this.$refs.myToast.show();
    },
  }
};
</script>

<style lang='scss' >
  .page-content {
    padding-bottom: 0px !important;
  }
  .page-report {
    position: absolute;
    z-index: 1;
    .page-header {
      width: 100%;
      height: auto;
      // background: linear-gradient(to top, #45a2cd, #2d70dd);
      background: linear-gradient(to bottom, #367ce3, #3681df);
      box-sizing: border-box;
      padding-top: 120px;
      padding-bottom: 30px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-content: center;
      position: relative;
      overflow: hidden;
      .report-switch {
        ul {
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          li {
            width: 200px;
            height: 80px;
            font-size: 40px;
            line-height: 80px;
            border: 1px solid rgba(255,255,255,.3);
            text-align: center;
            cursor: pointer;
            &:first-child {
              width: 150px;
              border-radius: 100px 0 0 100px;
              border-right: none;
            }
            &:last-child {
              width: 150px;
              border-radius: 0 100px 100px 0;
              border-left: none;
            }
            &.active {
              background-color: #fff;
              a {
                color: #55c9ff;
              }
            }
            a {
              color: #fff;
            }
          }
        }
      }
    }
  }

  .report-section {
    margin-bottom: 15px;
    .sleep-advice {
    .report-section-body {
      // background-color: #fac;
      padding-bottom: 40px;
      p {
        color: #49c4ff;
        font-size: 38px;;
      }
      img {
        width: 100%;
        height: auto;
      }
    }
  }
  }
</style>


<style lang="scss">
// myToast
/* .myToast-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: 9999;
  .myToast-mask {
    display: none;
    pointer-events: auto;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0, .05);
    position: absolute;
  }
  &.hide {
    display: none;
  }
  &.with-mask {
    .myToast-mask {
      display: block;
    }
  }

  .myToast-box {
    pointer-events: auto;
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 3%;
    background-color: rgba(0,0,0,.4);
    border-radius: 10px;
    max-width: 50vw;
    max-height: 90vh;
    box-sizing: border-box;
    overflow: auto;
    transition: opacity 400ms;
    &.hide {
      opacity: 0;
    }
    .myToast-content {
      color: #fff;
      overflow-wrap: break-word;
    }
  }
} */
</style>
