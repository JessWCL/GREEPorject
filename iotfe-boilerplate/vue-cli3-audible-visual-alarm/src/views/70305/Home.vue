<template>
  <gree-view>
    <gree-page
      no-navbar
      class="page-home"
    >
      <div
        class="page-header"
        :style="{backgroundImage:'url(' + head_bg + ')'}"
      >
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
        >
          {{ devname }}
          <gree-dropdown
            slot="right"
            position="is-bottom-left"
          >
            <gree-icon
              slot="trigger"
              name="more"
              size="lg"
            ></gree-icon>
            <gree-dropdown-item @click.native="moreInfo">Device Information</gree-dropdown-item>
            <gree-dropdown-item @click.native="jumpTo('AlertSettings')">Alert Settings</gree-dropdown-item>
          </gree-dropdown>
        </gree-header>
        <!-- <div class="schedule-icon" v-if="isScheduled" >
          <img :src="imgData.schedules[2]">
        </div> -->
        <div class="battery-remind">
          <img :src="alarmImg" />
          <h3>
            {{ battery_percentage }}% Battery
            <i
              class="status"
              :class="{'full': battery_percentage > 10}"
            ></i>
          </h3>
        </div>
      </div>
      <div class="page-main">
        <!-- <div class="listBox" style="position:absolute; ">
          <ul>
            <li v-for="(el, i) in pressList" :key="i" style="width: 100vw; box-sizing: border-box; border:1px solid #ccc; padding: 10px 5px; " >
              {{ el.content + i }}
            </li>
          </ul>
        </div> -->
        <!-- 居中内容提示 -->
        <div
          class="main-tips"
        >
          <!-- <h3>{{ $language('home.alarm') }}</h3> -->
          <!-- <gree-button round>{{ $language('home.alarmSrc') }}</gree-button> -->
          <button ref="btnClick" :class="{isAlarming:isAlarming,}" @click="alarmBtnClick" >{{ isAlarming? $language('home.cancelSrc') : $language('home.alarmSrc') }}</button>
        </div>
      </div>
      <!-- <div class="bottom-control">
        <div class="control-icon-group">
          <div class="circle" @click="schedulesClick" >
            <img 
              v-if="!isScheduled" 
              :src="imgData.schedules[0]">
            <img 
              v-if="isScheduled" 
              :src="imgData.schedules[1]">
          </div>
          <h3>{{ $language('home.schedules') }}</h3>
        </div>
      </div> -->
      <div class="loading-bg" v-if="loading_bg" ></div>
      <gree-popup
        :mask-closable="false"
        v-model="loading_show"
      >
        <img src="@/assets/img/loading.gif" />
      </gree-popup>
    </gree-page>
  </gree-view>
</template>

<script>
import {
  Header,
  List,
  Item,
  Icon,
  Dropdown,
  DropdownItem,
  NoticeBar,
  ScrollView,
  ScrollViewMore,
  Button,
  Popup,
} from 'gree-ui';
// import dayjs from 'dayjs';
import { mapState, mapMutations, mapActions } from 'vuex';
import * as type from '../../store/types.js';
import {
  closePage,
  // editDevice,
  // tuyaRequestDevData,
  tuyaDeviceMore,
  // tuyaControlDev,
} from '../../../../static/lib/PluginInterface.promise';

const imgData = {
  schedules: [require('../../assets/img/schedules.png'), require('../../assets/img/schedules_on.png'), require('../../assets/img/schedules-sm.png')],
};

export default {
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    [Icon.name]: Icon,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [NoticeBar.name]: NoticeBar,
    [ScrollView.name]: ScrollView,
    [ScrollViewMore.name]: ScrollViewMore,
    [Button.name]: Button,
    [Popup.name]: Popup,
  },
  data() {
    return {
      isPopupShow: {},
      isWarningShow: false,
      alarmImg: '',
      imgData,
      isScheduled: false,
      pressList: [{
        content: 'list content...',
      }, {
        content: 'list content...',
      }, {
        content: 'list content...',
      }],
      loading_bg: true,
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devId: state => state.dataObject.deviceId,
      devname: state => state.dataObject.deviceName,
      functype: state => state.functype,
      battery_percentage: state => {
        const battery = state.dataObject.properties.find(el => {
          return el.code === 'battery_percentage';
        });
        return battery.value;
      },
      alarmState: state => {
        const alarmState = state.dataObject.properties.find(el => {
          return el.code === 'alarm_state';
        });
        return alarmState.value;
      },
      isAlarming: state => {
        let alarmState = state.dataObject.properties.find(el => {
          return el.code === 'alarm_state';
        });
        alarmState = Number(alarmState.value);
        if (alarmState) {
          // console.log('alarmState is ' + alarmState);
          if (alarmState === 4) { // 报警解除
            return false;
          } else if (alarmState === 1 || alarmState === 2 || alarmState === 3) { // 声音，光亮，声光
            return true;
          }
          console.warn('alarmState is not 1 | 2 | 3 | 4');
          return false;
        }
        console.warn('alarmState is falsy');
        return false;
      },
      firstLoad: state => state.firstLoad,
    }),
    head_bg() {
      const bg = require('@/assets/img/bg_header.png');
      return bg;
    },
    power_off_bg() {
      const bg = require('@/assets/img/bg_off.png');
      return bg;
    },
    /* loading_show() {
      if (this.devId && this.firstLoad !== 0) {
        return false;
      }
      return true;
    }, */
    loading_show: {
      get() {
        if (this.devId && this.firstLoad !== 0) {
          return false;
        }
        return true;
      },
      set() {},
    },
  },
  watch: {
    isAlarming: {
      handler(val) {
        if (val) {
          this.alarmImg = require('@/assets/img/alarm_on.png');
        } else {
          this.alarmImg = require('@/assets/img/alarm_off.png');
        }
      },
      immediate: true
    },
    devId(newVal) {
      if (newVal) {
        if (this.firstLoad === 0) {
          this.setFirstLoad();
        }
      }
    },
  },
  created() {
    this.$set(this.isPopupShow, 'bottom', this.isMorebtn);
    console.log('Home.vue -----------');
    console.log(this.dataObject);
    console.log(navigator.PluginInterface);
    // 查指令
    /* const ps = new Promise((resolve, reject) => {
      try {
        console.log(`tuyaGetDevFunctions devId: ${this.devId}`);
        navigator.PluginInterface.tuyaGetDevFunctions(this.devId, (...params) => {
          resolve(...params);
        });
      } catch (err) {
        reject(err);
      }
    });
    ps.then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    }); */
  },
  mounted() {
    // console.log(this.mac);
    /* tuyaRequestDevData(this.mac)
      .then(res => {
        console.log('Home.vue tuyaRequestDevData');
        console.log(JSON.parse(res));
      })
      .catch(err => {
        console.log(err);
      }); */

    setTimeout(() => {
      this.loading_bg = false;
    }, 500);
  },
  methods: {
    ...mapMutations({
      setDataObject: type.SET_DATA_OBJECT,
      setFirstLoad: 'setFirstLoad',
      setDataObjLock: 'setDataObjLock',
    }),
    ...mapActions({
      sendCtrl: type.SET_DATA_OBJECT,
      tuyaCtrl: 'tuyaCtrl',
    }),
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
      tuyaDeviceMore(this.devId);
    },
    jumpTo(path) {
      this.$router.push(path);
    },
    close() {
      this.$refs.custom_notice_bar.$el.remove();
    },
    onEndReached() {
      if (this.isFinished) {
        return;
      }
      setTimeout(() => {
        this.isFinished = true;
        this.$refs.scrollView.finishLoadMore();
      }, 50);
    },
    alarmBtnClick() {
      // const devId = this.devId;
      // const key = 'alarm_switch';
      const key = 'alarm_setting';
      let value = 3;
      if (!this.isAlarming) {
        value = 2;
      }
      /**
       * value = 3 = 取消 
       * value = 2 = 声光 */ 
      /* console.log(`
        devId: ${devId},
        key: ${key},
        value: ${value},
      `); */

      // 发送指令
      /* tuyaControlDev(devId, key, value)
        .then(res => {
          console.log('Home.vue > tuyaControlDev');
          console.log(res);
        })
        .catch(err => console.error(err)); */
      this.tuyaCtrl({
        key,
        value,
      });

      // 设置state
      const properties = [...this.dataObject.properties];
      const asIndex = properties.findIndex(el => el.code === 'alarm_state');
      properties[asIndex] = {
        code: 'alarm_state',
        value: value + 1,
      };
      this.setDataObject({
        properties,
      });
      // dataObjLock锁定
      this.setDataObjLock(1);
      // console.log(this.dataObject);
    },
    schedulesClick() {
      this.isScheduled = !this.isScheduled;
    },
  }
};
</script>

<style lang="scss" scoped>
  .schedule-icon {
    position: absolute;
    top: 120px;
    left: 40px;
    img {
      width: 70px;
      height: auto;;
    }
  }
  .bottom-control {
    position: fixed;
    top: initial;
    bottom: 0;
    left: 0;
    padding: 0 0 75px 38px;
    display: flex;
    flex-flow: row nowrap;
    .control-icon-group {
      text-align: center;
      display: flex;
      flex-flow: column nowrap;
      .circle {
        width: 220px;
        height: auto;
        img {
          width: 100%;
          height: auto;
        }
      }
      h3 {
        font-size: 45px;
        color: #404657;
      }
    }
  }
  .loading-bg {
      background: #fff;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 2;
    }
</style>>
