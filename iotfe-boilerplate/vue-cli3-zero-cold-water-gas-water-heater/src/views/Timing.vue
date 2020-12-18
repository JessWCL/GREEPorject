<template>
  <gree-view
    id="TIMING"
    :bg-color="statusBarColor"
  >
    <gree-page class="page-timing">
      <!-- 头部 -->
      <gree-header>
        <gree-icon
          slot="overwrite-left"
          name="back"
          size="lg"
          @click="goBack"
        ></gree-icon>
        {{ $language("btn.zeroCold") }}
        <div
          v-show="favorites === 'yyxh'"
          slot="right"
          @click="saveTimer"
          class="save-text"
        >{{ $language("timer.save") }}</div>
      </gree-header>
      <!-- 内容区域 -->
      <div class="content">
        <div class="set-mode">
          <div class="set-mode-switch">
            <gree-list>
              <gree-list-item :title="$language('home.helpTitle')">
                <gree-switch
                  v-model="showZeroCold"
                  size="20px"
                  active-color="#61a5e7"
                  inactive-color="#e6e6e6"
                  slot="after"
                  @change="switchChange"
                ></gree-switch>
              </gree-list-item>
            </gree-list>
          </div>
          <div
            v-show="showZeroCold"
            class="set-mode-choose"
          >
            <gree-radio-list
              :options="checkOption"
              v-model="favorites"
              icon="checked"
              icon-inverse="unchecked"
              @change="radioChange"
            ></gree-radio-list>
          </div>
        </div>
        <!-- 设置时间 -->
        <div
          v-if="showZeroCold && showSetTing && favorites === 'yyxh'"
          class="set-time"
        >
          <!-- 时间标题 -->
          <div class="content-show-timing">
            <div class="start-and-end-timing">
              <div
                class="start-timing"
                @click="setStartTime"
                :style="{backgroundColor: startOrEnd ? '#61a5e7' : '#ffffff', color: startOrEnd ? '#ffffff' : '#61a5e7'}"
              >{{ startTimeMsg }}</div>
              <div
                class="end-timing"
                @click="setEndTime"
                :style="{backgroundColor: !startOrEnd ? '#61a5e7' : '#ffffff', color: !startOrEnd ? '#ffffff' : '#61a5e7'}"
              >{{ endTimeMsg }}</div>
            </div>
          </div>
          <!-- 时间选择器 -->
          <div class="content-choose-timing">
            <div
              class="select-time start-time"
              :style="{'z-index': startOrEnd ? 999 : 997}"
            >
              <gree-picker
                ref="startTimePicker"
                :data="pickerData"
                :cols="2"
                :line-height="55"
                :default-index="startTimeIndex"
                is-view
                is-cascade
                keep-index
                :multi-line="false"
                @initialed="startOnPickerInitialed"
                @change="startOnPickerConfirm"
              />
            </div>
            <div class="select-time end-time">
              <gree-picker
                ref="endTimePicker"
                :data="pickerData"
                :cols="2"
                :line-height="55"
                :default-index="endTimeIndex"
                is-view
                is-cascade
                keep-index
                :multi-line="false"
                @initialed="endOnPickerInitialed"
                @change="endOnPickerConfirm"
              />
            </div>
            <div
              class="line-and-colon"
              :style="{height: '203px'}"
            >
              <div
                class="line-and-colon-top"
                :style="{height: '62px'}"
              ></div>
              <div
                class="line-and-colon-center"
                :style="{height: '53px'}"
              >:</div>
              <div
                class="line-and-colon-bottom"
                :style="{height: '68px'}"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import {
  Header,
  Icon,
  Picker,
  List,
  Item,
  Switch,
  Radio,
  RadioList,
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { timeData } from '../api/timeData';
import { showToast } from '../../../static/lib/PluginInterface.promise';
import modeList from '../api/mode';
import cloudMethod from '../mixins/utils/cloudTimeFunction';

export default {
  name: 'SetTimer',
  components: {
    [Header.name]: Header,
    [Icon.name]: Icon,
    [Picker.name]: Picker,
    [List.name]: List,
    [Item.name]: Item,
    [Switch.name]: Switch,
    [Radio.name]: Radio,
    [RadioList.name]: RadioList,
  },
  mixins: [modeList, cloudMethod],
  data() {
    return {
      statusBarColor: '#FFFFFF', // 刘海屏适配
      showZeroCold: false, // 是否展开模式选择页面
      checkOption: modeList.data().modeListText, // 选项列表
      favorites: 'dcxh', // 选择项，默认单次
      pickerData: timeData(), // 定时列表
      startTimeValue: [18, 0], // 选中的定时值：[小时，分钟]
      startTimeIndex: [18, 0], // 选中的定时位置：[小时，分钟]
      endTimeValue: [0, 0], // 选中的定时值：[小时，分钟]
      endTimeIndex: [0, 0], // 选中的定时位置：[小时，分钟]
      startOrEnd: true, // 设置开始时间或结束时间
      startTimeMsg: this.$language('timer.startTimeMsg'), // 开始
      endTimeMsg: this.$language('timer.endTimeMsg'), // 结束
      showSetTing: false,
    };
  },
  computed: {
    ...mapState({
      mac: state => state.mac,
      Pow: state => state.dataObject.Pow,
      Mode: state => state.dataObject.Mode,
      cloudTimer: state => state.cloudTimer,
      Cruise: state => state.dataObject.Cruise,

      startCloudTime(state) {
        return {
          timerDic: {
            timeType: 2, // 类型，1单次，2循环,（必须）
            weeks: ['1', '2', '3', '4', '5', '6', '7'], // 星期,（必须）
            Etime: this.cst2utc(
              `${
                this.startTimeValue[0] < 10
                  ? `0${this.startTimeValue[0]}`
                  : this.startTimeValue[0]
              }:${
                this.startTimeValue[1] < 10
                  ? `0${this.startTimeValue[1]}`
                  : this.startTimeValue[1]
              }:00`,
              8
            ), // 时间,需要转为UTC时间,参数8为时区,（必须）
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
            Etime: this.cst2utc(
              `${
                this.endTimeValue[0] < 10
                  ? `0${this.endTimeValue[0]}`
                  : this.endTimeValue[0]
              }:${
                this.endTimeValue[1] < 10
                  ? `0${this.endTimeValue[1]}`
                  : this.endTimeValue[1]
              }:00`,
              8
            ),
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
    }),
  },
  watch: {
    favorites(newVal) {
      console.log(newVal);
      if (newVal !== 'yyxh') {
        this.showSetTing = false;
      }
    },
    Cruise(newVal, oldVal) {
      console.log('++++++++toastLock++++++++++');
      if (newVal === 1 && oldVal === 0) {
        showToast('开始巡航', 0);
      } else if (newVal === 0 && oldVal === 1) {
        showToast('巡航完毕', 0);
      }
    },
    Mode() {
      this.showZeroCold = this.Mode !== 0; // 判断是否展开选项
      this.setFavirites();
    },
    Pow(newVal) {
      if (newVal === 0) {
        this.$router.push({ path: '/' });
      }
    }
  },
  mounted() {
    // 查询云定时
    this.initCloudDate();
  },
  created() {
    this.showZeroCold = this.Mode !== 0; // 判断是否展开选项
    this.setFavirites(); // 初始化选中的模式
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setCloudTimerData: 'SET_CLOUD_TIMER_DATA', // 与写入时间重名，改为setCloudTimerData
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @description: 返回按钮
     * @function goBack
     */
    goBack() {
      console.log('返回上级');
      this.$router.go(-1);
    },
    /**
     * @description: 更新云定时
     * @function initCloudDate
     */
    initCloudDate() {
      if (!this.functype && this.Mode === 4) {
        let count = 0; // 计数器
        let interval = setInterval(() => {
          console.log(`计数器:${count}`);
          count += 1;
          if (this.mac) {
            clearInterval(interval); // 清除定时器
            this.updateCloudTimer(this.mac)
              .then(res => {
                console.log(res);
                this.initStartAndEndTime(); // 初始化时间选择器
                this.showSetTing = true;
              })
              .catch(err => {
                console.log(err);
                showToast('网络异常', 0);
              });
            // 10s后超时
          } else if (count > 9) {
            clearInterval(interval); // 清除定时器
            console.log('网络超时');
          }
        }, 1000);
      }
    },
    /**
     * @description: 开启和关闭模式
     * @function switchChange
     */
    switchChange(val) {
      console.log(val);
      if (val) {
        this.cancelCloudTimer(this.cloudTimer, 1, 0); // 开启模式，默认单次取
      } else {
        this.cancelCloudTimer(this.cloudTimer, 0, 0); // 关闭模式，取消云定时
      }
    },
    /**
     * @description: 切换模式
     * @function radioChange
     */
    radioChange(option, index) {
      console.log(option, index);
      if (option.value === 'dcxh' && this.Mode !== 1) {
        this.cancelCloudTimer(this.cloudTimer, 1, 0); // 设置其他模式，取消云定时
      } else if (option.value === 'ddxh' && this.Mode !== 2) {
        this.cancelCloudTimer(this.cloudTimer, 2, 0); // 设置其他模式，取消云定时
      } else if (option.value === 'qthxh' && this.Mode !== 3) {
        this.cancelCloudTimer(this.cloudTimer, 3, 0); // 设置其他模式，取消云定时
      } else if (option.value === 'yyxh') {
        this.updateCloudTimer(this.mac)
          .then(res => {
            console.log(res);
            this.initStartAndEndTime(); // 初始化时间选择器
            this.showSetTing = true;
          })
          .catch(err => {
            console.log(err);
            showToast('网络异常', 0);
          });
      }
    },
    /**
     * @description: 初始化默认选中的模式
     * @function setFavirites
     */
    setFavirites() {
      if (this.Mode !== 0) {
        if (this.Mode === 1) {
          this.favorites = 'dcxh';
        } else if (this.Mode === 2) {
          this.favorites = 'ddxh';
        } else if (this.Mode === 3) {
          this.favorites = 'qthxh';
        } else if (this.Mode === 4) {
          this.favorites = 'yyxh';
        }
      } else {
        this.favorites = 'dcxh';
      }
    },
    /**
     * @description: 北京时间转国际标准时间，china standard time，Coordinated Universal time
     * time: 'HH:MM:SS'
     * @function cst2utc
     */
    cst2utc(cstTime, timeZone) {
      console.log(cstTime);
      let hour = parseInt(cstTime.substring(0, 2), 10);
      let minute = cstTime.substring(3, 5);
      let seconds = cstTime.substring(6);
      hour = hour - timeZone >= 0 ? hour - timeZone : hour - timeZone + 24;
      let utcTime = `${hour < 10 ? `0${hour}` : hour}:${minute}:${seconds}`;
      console.log(utcTime);
      return utcTime;
    },
    /**
     * @description: 国际标准时间转北京时间，china standard time，Coordinated Universal time
     * time: 'HH:MM:SS'
     * @function utc2cst
     */
    utc2cst(utcTime, timeZone) {
      console.log(utcTime);
      let hour = parseInt(utcTime.substring(0, 2), 10);
      let minute = utcTime.substring(3, 5);
      let seconds = utcTime.substring(6);
      hour = hour + timeZone < 24 ? hour + timeZone : hour + timeZone - 24;
      let cstTime = `${hour < 10 ? `0${hour}` : hour}:${minute}:${seconds}`;
      console.log(cstTime);
      return cstTime;
    },
    /**
     * @description: 保存云定时
     * @function saveTimer
     */
    saveTimer() {
      if (this.showSetTing) {
        if (
          this.startCloudTime.timerDic.Etime !==
          this.endCloudTime.timerDic.Etime
        ) {
          this.pluginsSetCloudTimer(
            this.mac,
            this.startCloudTime,
            this.endCloudTime,
            0
          ); // 设置云定时
        } else {
          console.log('开始与结束时间不能一致');
          showToast('开始与结束时间不能一致', 0);
        }
      } else {
        console.log('没有设定时间');
      }
    },
    /**
     * @description: 开始时间选择器初始化
     * @function onPickerInitialed
     */
    startOnPickerInitialed() {
      const selectStartTime = this.$refs.startTimePicker.getColumnValues();
      console.log(selectStartTime);
    },
    /**
     * @description: 开始时间选择器选定值
     * @function startOnPickerConfirm
     */
    startOnPickerConfirm() {
      const selectStartTime = this.$refs.startTimePicker.getColumnValues();
      if (this.startOrEnd) {
        // this.startTimeValue[0] = selectStartTime[0].value; // 更新计算属性，错误写法，
        // this.startTimeValue[1] = selectStartTime[1].value;
        this.$set(this.startTimeValue, 0, selectStartTime[0].value); // 更新计算属性，正确写法，
        this.$set(this.startTimeValue, 1, selectStartTime[1].value);
        this.startTimeMsg = `${this.$language('timer.startTimeMsg')} ${
          selectStartTime[0].text
        }:${selectStartTime[1].text}`;
      }
      console.log(this.startTimeValue);
    },
    /**
     * @description: 结束时间选择器初始化
     * @function onPickerInitialed
     */
    endOnPickerInitialed() {
      const selectEndTime = this.$refs.endTimePicker.getColumnValues();
      console.log(selectEndTime);
    },
    /**
     * @description: 结束时间选择器选定值
     * @function onPickerConfirm
     */
    endOnPickerConfirm() {
      const selectEndTime = this.$refs.endTimePicker.getColumnValues();
      if (!this.startOrEnd) {
        // this.endTimeValue[0] = selectEndTime[0].value; // 更新计算属性，错误写法，
        // this.endTimeValue[1] = selectEndTime[1].value;
        this.$set(this.endTimeValue, 0, selectEndTime[0].value); // 更新计算属性，正确写法，
        this.$set(this.endTimeValue, 1, selectEndTime[1].value);
        this.endTimeMsg = `${this.$language('timer.endTimeMsg')} ${
          selectEndTime[0].text
        }:${selectEndTime[1].text}`;
      }
      console.log(this.endTimeValue);
    },
    /**
     * @description: 设置开始时间
     * @function setStartTime
     */
    setStartTime() {
      this.startOrEnd = true;
    },
    /**
     * @description: 设置结束时间
     * @function setEndTime
     */
    setEndTime() {
      this.startOrEnd = false;
    },
    /**
     * @description: 初始化时间选择器
     * @function initStartAndEndTime
     */
    initStartAndEndTime() {
      console.log('初始化时间选择器');
      let TmrStartHour = 18;
      let TmrStartMin = 0;
      let TmrEndHour = 0;
      let TmrEndMin = 0;
      if (Object.keys(this.cloudTimer).length > 0) {
        console.log('更新时间选择器');
        const startTime = this.utc2cst(
          this.cloudTimer.timerTasks[0].timer.Etime,
          8
        );
        const EndTime = this.utc2cst(
          this.cloudTimer.timerTasks[1].timer.Etime,
          8
        );
        console.log(`timeData:${startTime}`, EndTime);
        TmrStartHour = parseInt(startTime.substring(0, 2), 10);
        TmrStartMin = parseInt(startTime.substring(3, 5), 10);
        TmrEndHour = parseInt(EndTime.substring(0, 2), 10);
        TmrEndMin = parseInt(EndTime.substring(3, 5), 10);
      }
      // 开始时间
      this.startTimeValue[0] = TmrStartHour;
      this.startTimeValue[1] = TmrStartMin;
      this.startTimeIndex[0] = TmrStartHour;
      this.startTimeIndex[1] = TmrStartMin;
      // 结束时间
      this.endTimeValue[0] = TmrEndHour;
      this.endTimeValue[1] = TmrEndMin;
      this.endTimeIndex[0] = TmrEndHour;
      this.endTimeIndex[1] = TmrEndMin;
      // 18:00开始
      this.startTimeMsg = `${this.$language('timer.startTimeMsg')} ${
        this.startTimeValue[0] < 10
          ? `0${this.startTimeValue[0]}`
          : this.startTimeValue[0]
      }:${
        this.startTimeValue[1] < 10
          ? `0${this.startTimeValue[1]}`
          : this.startTimeValue[1]
      }`;
      // 00:00结束
      this.endTimeMsg = `${this.$language('timer.endTimeMsg')} ${
        this.endTimeValue[0] < 10
          ? `0${this.endTimeValue[0]}`
          : this.endTimeValue[0]
      }:${
        this.endTimeValue[1] < 10
          ? `0${this.endTimeValue[1]}`
          : this.endTimeValue[1]
      }`;
    },
  },
};
</script>
