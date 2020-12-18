<template>
  <gree-view :bg-color="statusBarColor">
    <gree-page
      class="page-home"
      :style="{backgroundImage:'url(' + PoweroffImg + ')',}"
    >
      <div class="page-header">
        <!-- 顶部导航栏 -->
        <gree-header @on-click-title="moreTest">
          <gree-icon
            slot="overwrite-left"
            name="back"
            size="lg"
            @click="goBack"
          ></gree-icon>
          {{ devname }}
          <!-- 更多 -->
          <gree-icon
            v-if="!functype"
            slot="right"
            name="more"
            size="xl"
            @click="moreInfo"
          ></gree-icon>
          <!-- 场景设置 -->
          <div
            v-if="functype"
            slot="right"
            @click="sceneSave"
            class="save-text"
          >{{ $language("home.sceneSave") }}</div>
        </gree-header>
      </div>
      <div class="page-main">
        <div class="fault-and-reminder">
          <div v-if="Er !== 0 & reminder"></div>
          <div
            v-if="errMsg.length > 0 && reminderMsg.length === 0"
            class="is-fault"
            @click="errorPage(0)"
          >
            <div class="is-fault-icon">
              <img :src="ErrorIcon" />
            </div>
            <div class="is-fault-text">
              <gree-marquee>
                <gree-marquee-item
                  v-for="(item, index) in errMsg"
                  :key="index"
                >{{ item }}</gree-marquee-item>
              </gree-marquee>
            </div>
          </div>
          <div
            v-else-if="errMsg.length === 0 && reminderMsg.length > 0"
            class="is-reminder"
          >
            <div class="is-reminder-icon">
              <img :src="ReminderIcon" />
            </div>
            <div
              class="is-reminder-text"
              @click="errorPage(1)"
            >
              <gree-marquee>
                <gree-marquee-item
                  v-for="(item, index) in reminderMsg"
                  :key="index"
                >{{ item }}</gree-marquee-item>
              </gree-marquee>
            </div>
          </div>
          <div
            v-else-if="errMsg.length > 0 && reminderMsg.length > 0"
            class="is-all"
          >
            <div class="is-all-item">
              <div class="is-all-item-icon">
                <img :src="ErrorIcon" />
              </div>
              <div
                class="is-all-item-text"
                @click="errorPage(0)"
              >
                <gree-marquee>
                  <gree-marquee-item
                    v-for="(item, index) in errMsg"
                    :key="index"
                  >{{ item }}</gree-marquee-item>
                </gree-marquee>
              </div>
            </div>
            <div class="is-all-item">
              <div class="is-all-item-icon">
                <img :src="ReminderIcon" />
              </div>
              <div
                class="is-all-item-text"
                @click="errorPage(1)"
              >
                <gree-marquee>
                  <gree-marquee-item
                    v-for="(item, index) in reminderMsg"
                    :key="index"
                  >{{ item }}</gree-marquee-item>
                </gree-marquee>
              </div>
            </div>
          </div>
        </div>
        <!-- 主体温度调节 -->
        <div class="set-temp">
          <div class="set-temp-item">
            <SetTemperature
              :title-text="getCycle"
              :inlet-temp="(InWaterTemp - 100).toString()"
              :power-off="powerOff"
              :water-tepm="(SetTemp - 100)"
              :burning="BurnState"
              :mode-and-boost="(Mode + PreBoost)"
              @changeTemp="changeTemp"
            />
            <div
              class="shield-set-temp"
              @touchend="showPowTip()"
              :style="powerOff && !Er ? {'pointer-events': 'none'} : {}"
            ></div>
          </div>
        </div>
        <!-- 预约巡航时间 -->
        <div
          class="cycling-time"
          v-if="Mode === 4"
        >
          <div class="cycling-time-title">{{ $language('home.cyclingTime') }}</div>
          <div class="cycling-time-msg">{{ getStartAndEndTime }}</div>
        </div>
      </div>
    </gree-page>
    <!-- 底部按钮 -->
    <gree-toolbar
      position="bottom"
      no-hairline
    >
      <gree-row>
        <gree-col
          width="25"
          :class="{'not-scenes': (!item.isScenesShow && functype)}"
          v-for="(item, index) in footList"
          :key="index"
          :style="!powerOff && (index === 1 || index === 2) ? {opacity: 0.2} : {}"
        >
          <div
            :class="{'icon':true, 'powOff':powerOff && index === 0}"
            :style="(index === 1 || index === 2) ? {border: '0px'} : {width: '1.15rem', height: '1.15rem'}"
            @click="setFunction(index)"
          >
            <!-- <i class="iconfont">&#xe68f;</i> -->
            <img
              v-if="powerOff && ModOff && index === 1"
              :src="require('@/assets/img/ic_zero_cold_water_on.svg')"
            />
            <img
              v-else-if="powerOff && PreBoost === 1 && index === 2"
              :src="require('@/assets/img/ic_booster_on.svg')"
            />
            <img
              v-else
              :class="{'icon-powOff': !powerOff && index === 0}"
              :src="require('@/assets/img/' + item.ImgName)"
            />
          </div>
          <div
            class="dot"
            v-if="!powerOff && index === 0"
          ></div>
          <h3
            v-if="index === 1"
            class="foot-item1"
          >
            <div
              @click="setTiming()"
              class="advanced-more"
              :style="powerOff && Mode ? {color: '#f2af8d'} : {}"
            >
              {{ $language(item.Name) }}
              <div
                class="triangle-bottomright"
                :style="powerOff && Mode ? {'border-bottom': '0.18rem solid #f2af8d'} : {}"
              ></div>
            </div>
          </h3>
          <h3
            v-if="index === 2"
            class="foot-item0"
            :style="powerOff && PreBoost === 1 ? {color: '#f2af8d'} : {}"
            @click="setFunction(index)"
          >{{ $language(item.Name) }}</h3>
        </gree-col>
      </gree-row>
    </gree-toolbar>
    <!-- 首次使用提醒 -->
    <!-- <div
      class="leader"
      v-if="showLeader"
    >
      <gree-popup
        v-model="isFirstLoad"
        position="center"
        :has-mask="false"
        :mask-closable="false"
      >
        <div class="leader-main">
          <div
            class="leader-main-img"
            @click="closeLeader"
          ></div>
          <div class="leader-main-text">使用帮助在这里面</div>
        </div>
      </gree-popup>
    </div>-->
  </gree-view>
</template>

<script>
import {
  Header,
  Row,
  Col,
  PowerOff,
  ToolBar,
  Icon,
  Popup,
  SliderCircle,
  Marquee,
  MarqueeItem,
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import UpdateStatus from '@/mixins/utils/updateStatus';
import BtnConfig from '@/mixins/config/btn';
import errorList from '../../api/error';
import cloudMethod from '../../mixins/utils/cloudTimeFunction';
import {
  closePage,
  editDevice,
  getCCcmd,
  showToast,
  changeBarColor,
} from '../../../../static/lib/PluginInterface.promise';
// eslint-disable-next-line import/first
import _ from 'lodash';
import SetTemperature from '../../components/SetTemperature';

export default {
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [PowerOff.name]: PowerOff,
    [ToolBar.name]: ToolBar,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [SliderCircle.name]: SliderCircle,
    [Marquee.name]: Marquee,
    [MarqueeItem.name]: MarqueeItem,
    [PowerOff.name]: PowerOff,
    SetTemperature,
  },

  mixins: [UpdateStatus, BtnConfig, errorList, cloudMethod],

  data() {
    return {
      statusBarColor: '#ffab0b', // 优化刘海屏顶部状态栏
      errMsg: [], // 故障文字
      reminderMsg: [
        // '单次巡航已开',
        // '点动巡航已开',
        // '全天候巡航已开',
        // '预约巡航已开',
      ], // 提醒文字
      showLeader: true, // 首次打开导航
      leadKey: 'water_heater_829100',
      titleText: '点动', // 巡航中文字
      errorMultiText: [], // 故障列表
      modeValue: [1, 2, 3, 4], // 零冷水模式
      cloudLock: true,
      reSetCount: 0,
      clickNum: [],
    };
  },

  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      mac: state => state.mac,
      lang: state => state.deviceInfo.lang,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      Pow: state => state.dataObject.Pow,
      Mode: state => state.dataObject.Mode,
      PreBoost: state => state.dataObject.PreBoost,
      SetTemp: state => state.dataObject.SetTemp,
      InWaterTemp: state => state.dataObject.InWaterTemp,
      Cruise: state => state.dataObject.Cruise,
      ErrorCode1: state => state.dataObject.ErrorCode1,
      ErrorCode2: state => state.dataObject.ErrorCode2,
      // ErrorCode3: state => state.dataObject.ErrorCode3,
      JFerr: state => state.dataObject.JFerr,
      rssi: state => state.dataObject.rssi,
      BurnState: state => state.dataObject.BurnState,
      CruiseState: state => state.dataObject.CruiseState,
      cloudTimer: state => state.cloudTimer,
      toastLock: state => state.toastLock,

      startCloudTime(state) {
        return {
          timerDic: {
            timeType: 2, // 类型，1单次，2循环,（必须）
            weeks: ['1', '2', '3', '4', '5', '6', '7'], // 星期,（必须）
            Etime: '10:00:00', // 时间,需要转为UTC时间,参数8为时区,（必须）
            timeZone: 8.0, // 时区,（必须）
            status: 1, // 状态，0关闭，1开启,（必须）
          },
          taskDic: {
            mac: `${state.mac}`, // mac地址,（必须）
            subId: '', // 子设备,（主体提供，不需要）
            cmd: JSON.stringify({
              t: 'cmd',
              opt: ['Cruise'],
              p: [1],
            }), // 控制命令包,（必须）
            key: '', // 密钥,（主体提供，不需要）
            remark: 'The start of cruise', // 描述，最多60字节,（必须）
            dat: ['1'], // 控制命令数据，最多512字节,（必须）
          },
        }; // 开始时间
      },
      endCloudTime(state) {
        return {
          timerDic: {
            timeType: 2,
            weeks: ['1', '2', '3', '4', '5', '6', '7'],
            Etime: '16:00:00',
            timeZone: 8.0,
            status: 1,
          },
          taskDic: {
            mac: `${state.mac}`,
            subId: '',
            cmd: JSON.stringify({
              t: 'cmd',
              opt: ['Cruise'],
              p: [0],
            }),
            key: '',
            remark: 'The end of cruise',
            dat: ['0'],
          },
        }; // 结束时间
      },
      /**
       * 是否第一次使用，加载新手教程
       */
      isFirstLoad() {
        if (localStorage.getItem(this.leadKey)) {
          console.log('页面被刷新');
          this.showLeader = false;
          return this.showLeader;
        }
        console.log('首次被加载');
        localStorage.setItem(this.leadKey, true);
        this.showLeader = true;
        return this.showLeader;
      },
      /**
       * 获取巡航状态
       */
      isCruise(state) {
        if (state.dataObject.CruiseState !== 0) {
          console.log('巡航中');
          return true;
        }
        return false;
      },
      /**
       * 获取开始与结束时间
       */
      getStartAndEndTime(state) {
        let time = '';
        if (state.dataObject.Mode === 4) {
          if (Object.keys(state.cloudTimer).length > 0) {
            let startTime = this.utc2cst(
              state.cloudTimer.timerTasks[0].timer.Etime,
              8
            );
            let endTime = this.utc2cst(
              state.cloudTimer.timerTasks[1].timer.Etime,
              8
            );
            time = `${startTime.substring(0, 5)}-${endTime.substring(0, 5)}`;
          } else {
            this.initCloudDate(); // 初始化云定时
          }
        }
        return time;
      },
      /**
       * 是否有故障
       */
      // eslint-disable-next-line no-unused-vars
      Er(state) {
        this.errorMultiText = [];
        let estate = this.ErrorCode1 + this.ErrorCode2 + this.JFerr;
        // let estate =
        //   this.ErrorCode1 + this.ErrorCode2 + this.ErrorCode3 + this.JFerr;
        const ErrorCode1 = this.ErrorCode1;
        const ErrorCode2 = this.ErrorCode2;
        // const ErrorCode3 = this.ErrorCode3;
        const JFerr = this.JFerr;
        const errorData1 = errorList.data().errorMultiText1;
        const errorData2 = errorList.data().errorMultiText2;
        // const errorData3 = errorList.data().errorMultiText3;
        const errorMultiTextJFerr = errorList.data().errorMultiTextJFerr;
        if (ErrorCode1 !== 0) {
          // Data1多个错误显示
          for (let i = 0; i < 8; i += 1) {
            if (ErrorCode1 & (0x01 << i)) {
              errorData1[i].title !== '' &&
                this.errorMultiText.push(errorData1[i]);
            }
          }
        }
        if (ErrorCode2 !== 0) {
          // Data2多个错误显示
          for (let i = 0; i < 8; i += 1) {
            if (ErrorCode2 & (0x01 << i)) {
              errorData2[i].title !== '' &&
                this.errorMultiText.push(errorData2[i]);
            }
          }
        }
        // if (ErrorCode3 !== 0) {
        //   // Data3多个错误显示
        //   for (let i = 0; i < 8; i += 1) {
        //     if (ErrorCode3 & (0x01 << i)) {
        //       errorData3[i].title !== '' &&
        //         this.errorMultiText.push(errorData3[i]);
        //     }
        //   }
        // }
        if (JFerr !== 0) {
          // wifi故障
          this.errorMultiText.push(errorMultiTextJFerr[0]);
        }
        if (
          this.errorMultiText === undefined ||
          this.errorMultiText.length < 1
        ) {
          // 判断是否是已知的故障
          this.errMsg = [];
          estate = 0;
        } else {
          for (let i = 0; i < this.errorMultiText.length; i += 1) {
            this.errMsg.push(
              this.errorMultiText[i].code !== ''
                ? `${this.errorMultiText[i].code} : ${this.errorMultiText[i].title}。`
                : `${this.errorMultiText[i].title}。`
            );
          }
          // console.log('errMsg:', this.errMsg);
        }
        return estate;
      },
      /**
       * @description 提醒
       */
      reminder() {
        return this.reminderMsg;
      },
      /**
       * @description 获取电源开关信息，更新电源按键UI
       */
      powerOff(state) {
        if (state.dataObject.Pow === 1) {
          this.footList[0].ImgName = 'btn_off.svg';
          return true;
        }
        this.footList[0].ImgName = 'powOff.png';
        return false;
      },
      /**
       * @description 获取模式信息，更新模式图标
       */
      ModOff(state) {
        state.dataObject.Mode === 1
          ? (this.footList2[0].ImgName = 'SwingLfRig_1.svg')
          : (this.footList2[0].ImgName = 'SwingLfRig_0.svg');
        state.dataObject.Mode === 2
          ? (this.footList2[1].ImgName = 'SwingLfRig_1.svg')
          : (this.footList2[1].ImgName = 'SwingLfRig_0.svg');
        state.dataObject.Mode === 3
          ? (this.footList2[2].ImgName = 'SwingLfRig_1.svg')
          : (this.footList2[2].ImgName = 'SwingLfRig_0.svg');
        state.dataObject.Mode === 3
          ? (this.footList2[3].ImgName = 'SwingLfRig_1.svg')
          : (this.footList2[3].ImgName = 'SwingLfRig_0.svg');
        if (state.dataObject.Mode !== 4) {
          const timer = {};
          this.setCloudTimerData(timer);
        }
        return state.dataObject.Mode !== 0;
      },
      /**
       * @description 获取模式信息，更新文字描述
       */
      getCycle(state) {
        if (state.dataObject.Mode !== 0) {
          const text1 = `${this.$language(
            this.footList2[this.modeValue.indexOf(state.dataObject.Mode)].Name
          )}`;
          const text2 = `${this.$language('home.cycling')}`;
          this.titleText =
            state.dataObject.CruiseState !== 0
              ? `${text1} I ${text2}`
              : `${text1}`;
          return this.titleText;
        }
        return '';
      },
      /**
       * @description 获取信号强度
       */
      getRssi(state) {
        if (state.dataObject.rssi >= 0) {
          // 两种芯片：高通信号强度为正数
          console.log(`srri: ${state.dataObject.rssi}`);
          if (state.dataObject.rssi >= 44) {
            console.log('srri: 强');
          } else if (state.dataObject.rssi < 44 && state.dataObject.rssi > 25) {
            console.log('srri: 中');
          } else {
            console.log('srri: 弱');
          }
        } else {
          // 两种芯片：MTK,realtek信号强度为负数
          console.log(`srri: ${state.dataObject.rssi}`);
          if (state.dataObject.rssi >= -60) {
            console.log('srri: 强');
          } else if (
            state.dataObject.rssi < -60 &&
            state.dataObject.rssi > -90
          ) {
            console.log('srri: 中');
          } else {
            console.log('srri: 弱');
          }
        }
        return state.dataObject.rssi;
      },
    }),
    /**
     * @description 关机状态背景图片
     */
    PoweroffImg() {
      this.setBarColor(this.powerOff ? '#f3f0ed' : '#eeeee5');
      return this.powerOff
        ? require('@/assets/img/bg/bg.png')
        : require('@/assets/img/bg/bg_of.png');
    },
    /**
     * @description 故障图标
     */
    ErrorIcon() {
      return require('@/assets/img/ic_error.svg');
    },
    /**
     * @description 提醒图标
     */
    ReminderIcon() {
      return require('@/assets/img/ic_reminder.svg');
    },
    /**
     * @description 关机状态提示文本
     */
    PoweroffText() {
      return this.$language('home.powerOff');
    },
    /**
     * @description 路径名称
     */
    routeName() {
      return this.$route.name;
    },
  },
  watch: {
    CruiseState() {
      if (this.CruiseState !== 0) {
        console.log('巡航中');
      }
    },
    Cruise(newVal, oldVal) {
      console.log('++++++++++++++++++');
      console.log('toastLock: 1 ', this.toastLock);
      if (this.toastLock) {
        if (newVal === 1 && oldVal === 0) {
          showToast('开始巡航', 0);
        } else if (newVal === 0 && oldVal === 1) {
          showToast('巡航完毕', 0);
        }
      }
    },
    toastLock(newVal) {
      console.log('toastLock: 2 ', newVal);
    }
  },
  created() {
    this.setBarColor(this.powerOff ? '#f3f0ed' : '#eeeee5'); // 设置状态栏颜色
    // 开关防抖
    this.debouncePow = _.debounce(() => {
      this.sendCtrl({ Pow: this.powerOff ? 0 : 1 });
      this.setDataObject({ Pow: this.powerOff ? 0 : 1 });
      console.log(this.powerOff ? '开机' : '关机');
    }, 220);
    // 零冷水防抖
    this.debounceZeroColdWater = _.debounce(() => {
      if (this.Mode !== 4) {
        if (this.SetTemp > 150) {
          this.sendCtrl({
            Mode: this.Mode ? 0 : 1,
            Cruise: 0,
            SetTemp: 150,
          });
          this.setDataObject({
            Mode: this.Mode ? 0 : 1,
            Cruise: 0,
            SetTemp: 150,
          });
        } else {
          this.sendCtrl({ Mode: this.Mode ? 0 : 1, Cruise: 0 });
          this.setDataObject({ Mode: this.Mode ? 0 : 1, Cruise: 0 });
        }
      } else {
        this.cancelCloudTimer(this.cloudTimer, 0, 0); // 关闭模式，取消云定时
      }
      console.log(this.Mod ? '开启零冷水' : '关闭零冷水');
    }, 220);
    // 增压防抖
    this.debounceBooster = _.debounce(() => {
      if (this.SetTemp > 150) {
        this.sendCtrl({
          PreBoost: this.PreBoost === 1 ? 0 : 1,
          SetTemp: 150,
        });
        this.setDataObject({
          PreBoost: this.PreBoost === 1 ? 0 : 1,
          SetTemp: 150,
        });
      } else {
        this.sendCtrl({ PreBoost: this.PreBoost === 1 ? 0 : 1 });
        this.setDataObject({ PreBoost: this.PreBoost === 1 ? 0 : 1 });
      }
      console.log(this.PreBoost === 1 ? '开启增压' : '关闭增压');
    }, 220);
    // 设置水温
    this.SetWaterTepm = _.debounce(temp => {
      if (this.SetTemp !== temp + 100) {
        this.sendCtrl({ SetTemp: temp + 100 });
        this.setDataObject({ SetTemp: temp + 100 });
        console.log(`设置水温:${temp}`);
      }
    }, 220);
  },
  mounted() {
    console.log(`CruiseState: ${this.isCruise}`); // 巡航状态
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setDeviceData: 'SET_DEVICE_DATA',
      setCloudTimerData: 'SET_CLOUD_TIMER_DATA',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @description 关闭导航页面
     * @function closeLeader
     */
    closeLeader() {
      this.showLeader = false;
    },
    /**
     * @description 退出键
     * @function goBack
     */
    goBack() {
      try {
        closePage();
      } catch (err) {
        console.log('退出');
      }
    },
    /**
     * @description 更多页,编辑设备名称
     * @function moreInfo
     */
    moreInfo() {
      try {
        editDevice(this.mac); // 进入更多页
      } catch (err) {
        console.log('更多');
      }
      // this.errorPage(1);
      // this.deleteAllCloudTimer(this.mac);
    },
    /**
     * @description: 国际标准时间转北京时间，china standard time，Coordinated Universal time
     * time: 'HH:MM:SS'
     * @function utc2cst
     */
    utc2cst(utcTime, timeZone) {
      let hour = parseInt(utcTime.substring(0, 2), 10);
      let minute = utcTime.substring(3, 5);
      let seconds = utcTime.substring(6);
      hour = hour + timeZone < 24 ? hour + timeZone : hour + timeZone - 24;
      let cstTime = `${hour < 10 ? `0${hour}` : hour}:${minute}:${seconds}`;
      console.log(cstTime);
      return cstTime;
    },
    /**
     * @description 保存场景设置
     * @function sceneSave
     */
    sceneSave() {
      // const keys = Object.keys(this.dataObject);
      const keys = [
        'Pow',
        'Mode',
        'PreBoost',
        'InWaterTemp',
        'SetTemp',
        'Cruise',
        'ErrorCode1',
        'ErrorCode2',
        'ErrorCode3',
        'JFerr',
        'rssi',
        'BurnState',
        'CruiseState',
      ];
      const opt = [];
      const p = [];
      console.log(`==>${this.remarks}`);
      const remarks = '...';
      for (let i = 0, j = keys.length; i < j; i += 1) {
        opt.push(keys[i]);
        p.push(this.dataObject[keys[i]]);
      }
      const json = JSON.stringify({ opt, p, t: 'cmd' });
      console.log('保存的数据: ', json);
      getCCcmd(this.mac, json, remarks, JSON.stringify(p));
    },
    /**
     * @description 故障操作提示
     * @function showTip
     */
    showTip() {
      if (this.Er && !this.functype) {
        try {
          showToast('故障中，不可操作', 0);
        } catch (err) {
          console.log(this.$language('home.errToast'));
        }
      }
    },
    /**
     * @description 故障操作提示
     * @function showPowTip
     */
    showPowTip() {
      if (!this.powerOff) {
        try {
          // showToast('已关机，不可操作', 0);
          console.log(this.$language('home.powToast'));
        } catch (err) {
          console.log(this.$language('home.powToast'));
        }
      } else if (this.Er && !this.functype) {
        try {
          showToast('故障中，不可操作', 0);
        } catch (err) {
          console.log(this.$language('home.errToast'));
        }
      }
    },
    /**
     * @description 故障页
     * @function errorPage
     */
    errorPage(val) {
      this.$router.push({
        name: 'Error',
        params: { id: val },
      });
    },
    /**
     * @description 清除提醒
     * @function clearReminder
     */
    clearReminder() {
      this.reminderMsg = [];
      console.log('清除提醒');
    },
    /**
     * @description 根据模式设置状态栏颜色
     * @function setBarColor
     */
    setBarColor(color) {
      changeBarColor(color);
      this.statusBarColor = color;
    },
    /**
     * @description 点击底部功能列表
     * @function setFunction
     */
    setFunction(val) {
      if (this.Er && !this.functype) {
        try {
          showToast('故障中，不可操作', 0);
        } catch (err) {
          console.log(this.$language('home.errToast'));
        }
        return;
      }
      switch (val) {
        case 0:
          // 开关
          this.debouncePow();
          break;
        case 1:
          // 零冷水
          if (this.powerOff && !this.functype) {
            this.debounceZeroColdWater();
          } else {
            console.log('互斥');
          }
          break;
        case 2:
          // 增压
          if (this.powerOff) {
            this.debounceBooster();
          }
          break;
        default:
          break;
      }
    },
    moreTest() {
      const now = new Date().getTime();
      this.clickNum.push(now);
      if (this.clickNum.length === 8) {
        let testCode = '';
        for (let i = 0; i < this.clickNum.length - 1; i += 1) {
          if (this.clickNum[i + 1] - this.clickNum[i] < 1000) {
            testCode += '.';
          } else if (this.clickNum[i + 1] - this.clickNum[i] >= 2000) {
            testCode += ' ';
          } else {
            testCode += '-';
          }
        }
        this.clickNum = [];
        console.log(testCode);
        if (testCode === '--. .-.') {
          const VConsole = require('vconsole/dist/vconsole.min.js');
          // eslint-disable-next-line no-new
          new VConsole();
        }
      }
    },
    /**
     * @description 点击底部零冷水
     * @function setTiming
     */
    setTiming() {
      if (this.Er && !this.functype) {
        try {
          showToast('故障中，不可操作', 0);
        } catch (err) {
          console.log(this.$language('home.errToast'));
        }
        return;
      }
      if (this.powerOff && !this.Er && !this.functype) {
        this.$router.push({ name: 'Timing' });
      } else {
        console.log('互斥');
      }
    },
    /**
     * @description 设置温度
     * @function changeTemp
     */
    changeTemp(val) {
      this.SetWaterTepm(val);
    },
    /**
     * 初始化云定时信息
     * @function initCloudDate
     */
    async initCloudDate() {
      if (!this.functype && this.Mode === 4) {
        if (this.mac && this.cloudLock) {
          this.cloudLock = false;
          this.updateCloudTimer(this.mac)
            .then(res => {
              console.log(res);
              console.log(`计数器:${this.reSetCount}`);
              if (this.reSetCount < 3 && res === 'empty') {
                this.reSetCount += 1; // 计数器
                console.log('---云定时为空，重置云定时');
                this.resetCloudTimer(this.startCloudTime, this.endCloudTime); // 重置云定时
              } else {
                this.cloudLock = true;
              }
            })
            .catch(err => {
              console.log(err);
              this.cloudLock = true;
              showToast('网络异常', 0);
            });
        }
      }
    },
    /**
     * 重置云定时
     * @function resetCloudTimer
     */
    async resetCloudTimer(startCloudTime, endCloudTime) {
      console.log(startCloudTime, endCloudTime);
      this.asyncSetCloudTimer(startCloudTime)
        .then(res => {
          console.log('开始时间写入成功', res);
          this.asyncSetCloudTimer(endCloudTime)
            .then(res => {
              console.log('结束时间写入成功', res);
              this.cloudLock = true;
            })
            .catch(err => {
              console.log('结束时间写入失败', err);
              this.deleteAllCloudTimer(this.mac)
                .then(res => {
                  res;
                  this.cloudLock = true;
                  showToast('网络异常', 0);
                })
                .catch(err => {
                  err;
                  this.cloudLock = true;
                  showToast('网络异常', 0);
                });
            });
        })
        .catch(err => {
          console.log('开始时间写入失败', err);
          this.cloudLock = true;
          showToast('网络异常', 0);
        });
    },
  },
};
</script>
