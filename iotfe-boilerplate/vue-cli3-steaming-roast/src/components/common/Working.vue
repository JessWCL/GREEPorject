<template>
  <div class="container">
    <CanvasDashBoard
      :percent="percent"
      :pause="Pause === 1"
    />
    <div
      v-if="isShowPreheating && TmpCtrl === 0"
      class="last-step">
      <div class="gauge-header">
        <span>{{ PreHeatText }}</span>
        剩余
      </div>
      <div class="gauge-body">
        <div
          class="gauge-body"
          @click="chooseTime"
        >
          <span class="gauge-num">{{ DisSetHour }}</span>
          <span class="gauge-unit">小时</span>
          <span class="gauge-num">{{ DisSetMin }}</span>
          <span class="gauge-unit">分钟</span>
        </div>
      </div>
      <div 
        @click="chooseTemp"
        class="gauge-footer"
      >{{ PreHeatingTextDisTmp }}</div>
    </div>
    <div
      v-else
      class="last-step">
      <div class="gauge-header">
        <span
          v-if="Pause"
          @click="chooseTemp"
        >{{ PauseModeText }}</span>
        剩余
      </div>
      <div
        class="gauge-body"
        @click="chooseTime"
      >
        <span class="gauge-num">{{ DisSetHour }}</span>
        <span class="gauge-unit">小时</span>
        <span class="gauge-num">{{ DisSetMin }}</span>
        <span class="gauge-unit">分钟</span>
      </div>
      <div
        v-if="Pause"
        class="gauge-footer"
      >{{ TextDisTmp }}</div>
      <div
        v-else
        class="gauge-footer"
        @click="chooseTemp"
      >{{ TextDisTmp }}</div>
    </div>
    <gree-block class="btns">
      <gree-row>
        <gree-button
          round
          @click="handleCancel"
        >取消</gree-button>
        <gree-button
          round
          @click="debounceHandleConfirm"
        >{{ btnText }}</gree-button>
      </gree-row>
    </gree-block>
    <!-- 烹饪时间选择弹层 -->
    <gree-popup
      v-model="isPopupShowTime.center"
      position="center"
      :mask-closable="false"
      @beforeShow="onPickerShowTime"
    >
      <div class="popup-center">
        <div class="title">烹饪时间</div>
        <div class="picker-column">
          <gree-row>
            <gree-col>
              <gree-picker
                ref="pickerTime"
                class="picker-time"
                :data="pickerDataTime"
                :cols="2"
                :line-height="60"
                :default-index="pickerDefaultIndexTime"
                is-view
                is-cascade
                :multi-line="false"
                @change="onPickerConfirmTime"
              ></gree-picker>
            </gree-col>
          </gree-row>
        </div>
        <footer class="actions">
          <div
            class="popup-btn"
            @click="hidePopUpTime"
          >取消</div>
          <div
            class="popup-btn"
            @click="confirmPopUpTime"
          >确定</div>
        </footer>
      </div>
    </gree-popup>
    <!-- 烹饪温度选择弹层 -->
    <gree-popup
      v-model="isPopupShowTemp.center"
      position="center"
      :mask-closable="false"
      @beforeShow="onPickerShowTemp"
    >
      <div class="popup-center">
        <div class="title">烹饪温度</div>
        <div class="picker-column">
          <gree-row>
            <gree-col>
              <gree-picker
                ref="pickerTemp"
                class="picker-temp"
                :class="{
                  'blank-unit': !isShowTempUnit
                }"
                :data="pickerDataTemp"
                :cols="1"
                :line-height="60"
                :default-index="pickerDefaultIndexTemp"
                is-view
                :multi-line="false"
                @change="onPickerConfirmTemp"
              ></gree-picker>
            </gree-col>
          </gree-row>
        </div>
        <footer class="actions">
          <div
            class="popup-btn"
            @click="hidePopUpTemp"
          >取消</div>
          <div
            class="popup-btn"
            @click="confirmPopUpTemp"
          >确定</div>
        </footer>
      </div>
    </gree-popup>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { Block, Row, Col, Button, Dialog, Popup, Picker } from 'gree-ui';
import uniqBy from 'lodash/uniqBy';
import debounce from 'lodash/debounce';
import * as types from '@/store/types';
import {
  RUN_STAT,
  PAUSE,
  MODE_SMART_MENU,
  MODE_BAKING,
  MODE_STEAMING,
  MODE_HELPER,
  MODE_NETWORK_MODE,
  LIST1_SMART_MENU_CLOUD,
  LIST1_BAKING_SMALL_BARBECUE,
  LIST1_BAKING_LARGE_BARBECUE,
  LIST2_BAKING_LOW,
  LIST2_BAKING_MIDDLE,
  LIST2_BAKING_HEIGHT,
  LIST2_BAKING_LOW_TMP,
  LIST2_BAKING_MIDDLE_TMP,
  LIST2_BAKING_HEIGHT_TMP,
  TAG_LOADING_TIME,
  MODE_BAKING_TEMP_NAMES
} from '@/api/828d04/constant';
import IntelligentMenusV2 from '@/api/828d04/IntelligentMenusV2';
import CanvasDashBoard from '@/components/common/CanvasDashBoard';
import { getTempData, getTimeData } from '@/utils/index';
import {
  tempData as bakingTempData
} from '@/api/828d04/baking-tempData.js';
import {
  tempData as helperTempData
} from '@/api/828d04/helper-tempData.js';
import {
  timeData as helperTimeData
} from '@/api/828d04/helper-timeData.js';
import commonMethodConfig from '@/mixins/config/828d04/commonMethod';

const defaultTempData = getTempData(40, 100);
const defaultTimeData = getTimeData();

export default {
  components: {
    [Block.name]: Block,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    CanvasDashBoard
  },

  mixins: [commonMethodConfig],

  data() {
    return {
      isPaused: false, // 是否暂停中
      isMultiClick: false, // 是否重复点击
      afterShowPickerTime: false, // 是否显示pickerTime
      afterShowPickerTemp: false, // 是否显示pickerTemp
      isPopupShowTime: {},
      isPopupShowTemp: {},
      pickerDataTime: defaultTimeData,
      pickerDefaultIndexTime: [0, 0],
      pickerValueTime: [],
      pickerDataTemp: defaultTempData,
      pickerDefaultIndexTemp: [0],
      pickerValueTemp: ''
    };
  },
  computed: {
    ...mapState({
      deviceInfo: state => state.deviceInfo,
      dataObject: state => state.dataObject,
      RunStat: state => state.dataObject.RunStat,
      Mod: state => state.dataObject.Mod,
      List1: state => state.dataObject.List1,
      List2: state => state.dataObject.List2,
      List3: state => state.dataObject.List3,
      Pause: state => state.dataObject.Pause,
      TmpCtrl: state => state.dataObject.TmpCtrl,
      DisSetHour: state => state.dataObject.DisSetHour,
      DisSetMin: state => state.dataObject.DisSetMin,
      DisTmp: state => state.dataObject.DisTmp,
      SetHour: state => state.dataObject.SetHour,
      SetMin: state => state.dataObject.SetMin,
      SetTmp: state => state.dataObject.SetTmp,
      estate3: state => state.dataObject.estate3,
    }),

    hasEstate() {
      const { estate3 } = this;
      // 门打开禁用按钮
      if (estate3 & (1 << 0)) {
        return true;
      }
      return false;
    },

    percent() {
      const { SetHour, SetMin, DisSetHour, DisSetMin } = this;
      const totalTime = SetHour * 60 + SetMin;
      const rHour = SetHour - DisSetHour;
      const rMin = SetMin - DisSetMin;
      const runTime = rHour * 60 + rMin;
      let ret = (runTime / totalTime) * 100;
      if (ret > 100) {
        ret = 100;
      } else if (ret < 0) {
        ret = 0;
      }
      return ret;
    },

    PreHeatText() {
      return this.Pause === 1 ? '暂停中' : '预热中';
    },

    btnText() {
      return this.Pause === 1 ? '继续' : '暂停';
    },

    isShowTempUnit() {
      let ret = true;
      const { Mod, List1 } = this;
      const isSmallOrLargeBaking = Mod === MODE_BAKING
        && (List1 === LIST1_BAKING_SMALL_BARBECUE
        || List1 === LIST1_BAKING_LARGE_BARBECUE);
      if (isSmallOrLargeBaking) {
        ret = false;
      }
      return ret;
    },

    foodName() {
      let ret = '';
      let retList = [];
      retList = IntelligentMenusV2.filter(ele => {
        return (
          ele.List1Value === this.List1
          && ele.List2Value === this.List2
          && ele.List3Value === this.List3
        );
      });
      retList = uniqBy(retList, 'List3Label');
      if (retList.length > 0) {
        ret = retList[0].List3Label;
      }
      return ret;
    },

    PauseModeText() {
      let ret = '';
      const { Pause, Mod, List1, SetTmp, DisTmp } = this;

      if (!Pause) return ''; 

      const isCloudMenu = Mod === MODE_NETWORK_MODE
        || (Mod === MODE_SMART_MENU && List1 === LIST1_SMART_MENU_CLOUD);
      const isSmallOrLargeBaking = Mod === MODE_BAKING
        && (List1 === LIST1_BAKING_SMALL_BARBECUE
        || List1 === LIST1_BAKING_LARGE_BARBECUE);
      if (isCloudMenu) {
        ret = '云菜单';
      } else if (Mod === MODE_SMART_MENU) {
        ret = this.foodName;
      } else if (isSmallOrLargeBaking) {
        ret = MODE_BAKING_TEMP_NAMES[SetTmp];
      } else if (DisTmp === TAG_LOADING_TIME) {
        ret = TAG_LOADING_TIME;
      } else {
        const temperature = SetTmp;
        ret = `${temperature}℃`;
      }
      return ret;
    },

    PreHeatingTextDisTmp() {
      let ret = '';
      const { Mod, List1, SetTmp } = this;
      const isSmallOrLargeBaking = Mod === MODE_BAKING
        && (List1 === LIST1_BAKING_SMALL_BARBECUE
        || List1 === LIST1_BAKING_LARGE_BARBECUE);
      const temperature = SetTmp;
      ret = `${temperature}℃`;
      return ret;
    },

    TextDisTmp() {
      let ret = '';
      const { Pause, Mod, List1, SetTmp, DisTmp } = this;
      const isCloudMenu = Mod === MODE_NETWORK_MODE
        || (Mod === MODE_SMART_MENU && List1 === LIST1_SMART_MENU_CLOUD);
      const isSmallOrLargeBaking = Mod === MODE_BAKING
        && (List1 === LIST1_BAKING_SMALL_BARBECUE
        || List1 === LIST1_BAKING_LARGE_BARBECUE);
      if (Pause) {
        ret = '暂停中';
      } else if (isCloudMenu) {
        ret = '云菜单';
      } else if (Mod === MODE_SMART_MENU) {
        ret = this.foodName;
      } else if (isSmallOrLargeBaking) {
        ret = MODE_BAKING_TEMP_NAMES[SetTmp];
      } else if (DisTmp === TAG_LOADING_TIME) {
        ret = TAG_LOADING_TIME;
      } else {
        const temperature = SetTmp;
        ret = `${temperature}℃`;
      }
      return ret;
    }
  },

  created() {
    this.debounceHandleConfirm = debounce(() => {
      this.handleConfirm();
    }, 300);
  },

  mounted() {
    this.dispose();

    this.getPickerDataTime();

    this.getPickerDataTemp();

    this.querySmartMenuWorkingState();

    this.initTemp();

    this.initTime();
  },

  destroyed() {
    Dialog.closeAll();
  },

  methods: {
    ...mapActions({
      sendCtrl: types.SEND_CTRL,
      queryWorkingState: types.QUERY_WORKING_STATE,
      dispose: types.DISPOSE
    }),
    ...mapMutations({
      setHour: types.SET_SET_HOUR,
      setMin: types.SET_SET_MIN,
      setRunStat: types.SET_RUNSTAT,
      setList2: types.SET_LIST2,
      setTmp: types.SET_SET_TMP,
      setPause: types.SET_PAUSE,
      setDisSetHour: types.SET_DIS_SET_HOUR,
      setDisSetMin: types.SET_DIS_SET_MIN
    }),

    getPickerDataTime() {
      const { Mod, List1 } = this;
      const isBaking = Mod === MODE_BAKING;
      const isSteaming = Mod === MODE_STEAMING;
      const isHelper = Mod === MODE_HELPER;
      let ret = defaultTimeData;
      if (isBaking) {
        ret = getTimeData('00:01', '02:00');
      } else if (isSteaming) {
        ret = getTimeData('00:01', '05:00');
      } else if (isHelper) {
        ret = helperTimeData[List1];
      }
      console.log({ pickerDataTime: ret });
      this.pickerDataTime = ret;
      return ret;
    },

    getPickerDataTemp() {
      const { Mod, List1 } = this;
      const isNormalBaking = Mod === MODE_BAKING;
      const isSteaming = Mod === MODE_STEAMING;
      const isHelper = Mod === MODE_HELPER;
      let ret = defaultTempData;
      if (isNormalBaking) {
        ret = bakingTempData[List1];
      } else if (isSteaming) {
        ret = defaultTempData;
      } else if (isHelper) {
        ret = helperTempData[List1];
      }
      console.log({ pickerDataTemp: ret });
      this.pickerDataTemp = ret;
      return ret;
    },

    initTemp() {
      setTimeout(() => {
        // fixbug 刷新所引
        const defaultIndex = this.getPickerDefaultIndexTemp();
        const ref = this.$refs.pickerTemp;
        this.pickerDefaultIndexTemp = defaultIndex;
        // ref.defaultIndex = defaultIndex;
        this.refreshPickerTemp();
        const temp = ref.getColumnValues()[0].value;
        this.pickerValueTemp = temp;
      }, 0);
    },

    initTime() {
      setTimeout(() => {
        // fixbug 刷新所引
        const defaultIndex = this.getPickerDefaultIndexTime();
        const ref = this.$refs.pickerTime;
        this.pickerDefaultIndexTime = defaultIndex;
        // ref.defaultIndex = defaultIndex;
        this.refreshPickerTime();
        const hour = ref.getColumnValues()[0].value;
        const minute = ref.getColumnValues()[1].value;
        this.pickerValueTime[0] = hour;
        this.pickerValueTime[1] = minute;
      }, 0);
    },

    querySmartMenuWorkingState() {
      const { Mod, RunStat } = this;
      const isWorking = RunStat === RUN_STAT.Appointment || RunStat === RUN_STAT.Working;
      const isSmartmenu = Mod === MODE_SMART_MENU;
      // 智能菜单时间需要在整机查询
      if (isWorking && isSmartmenu) {
        const { cols } = JSON.parse(this.deviceInfo.fullstatueJson);
        this.queryWorkingState({ cols });
        // this.queryWorkingState({ cols: ['DisSetHour', 'DisSetMin', 'SetHour', 'SetMin'] });
      }
    },

    handleCancel() {
      Dialog.confirm({
        title: '提示',
        content: '请确认是否退出当前烹饪',
        confirmText: '是',
        onConfirm: () => {
          this.setRunStat(RUN_STAT.TurnOn);
          this.setPause(PAUSE.Off);
          const { RunStat, Pause } = this.dataObject;
          this.sendCtrl({ RunStat, Pause });
        },
        cancelText: '否'
      });
    },
    chooseTime() {
      const { Mod, List1 } = this;
      // 智能菜单、智能菜单-云菜单、辅助功能 不能调节时间
      const isCloudMenu = (Mod === MODE_SMART_MENU && List1 === LIST1_SMART_MENU_CLOUD) || Mod === MODE_NETWORK_MODE;
      if (Mod === MODE_SMART_MENU || isCloudMenu || Mod === MODE_HELPER) return;

      this.isMultiClick = false;
      this.showPopUpTime();
    },
    chooseTemp() {
      const { Mod, List1 } = this;
      // 智能菜单、智能菜单-云菜单、辅助功能 不能调节时间
      const isCloudMenu = (Mod === MODE_SMART_MENU && List1 === LIST1_SMART_MENU_CLOUD) || Mod === MODE_NETWORK_MODE;
      if (Mod === MODE_SMART_MENU || isCloudMenu || Mod === MODE_HELPER) return;

      this.isMultiClick = false;
      this.showPopUpTemp();
    },
    onPickerShowTime() {
      this.afterShowPickerTime = true;
      // fixbug 刷新所引
      const defaultIndex = this.getPickerDefaultIndexTime();
      const ref = this.$refs.pickerTime;
      this.pickerDefaultIndexTime = defaultIndex;
      // ref.defaultIndex = defaultIndex;
      this.refreshPickerTime();
    },
    showPopUpTime() {
      this.$set(this.isPopupShowTime, 'center', true);
    },
    hidePopUpTime() {
      this.isMultiClick = false;
      this.$set(this.isPopupShowTime, 'center', false);
    },
    confirmPopUpTime() {
      // 是否重复点击
      if (this.isMultiClick) return;
      this.isMultiClick = true;

      const hour = ~~this.pickerValueTime[0];
      const minute = ~~this.pickerValueTime[1];
      this.setHour(hour);
      this.setMin(minute);

      // APP 主动先同步数据
      this.setDisSetHour(hour);
      this.setDisSetMin(minute);

      const { SetHour, SetMin } = this.dataObject;
      this.sendCtrl({ SetHour, SetMin });
      this.$set(this.isPopupShowTime, 'center', false);
    },
    onPickerConfirmTime(columnIndex, itemIndex, value) {
      setTimeout(() => {
        if (value) {
          const ref = this.$refs.pickerTime;
          const hour = ref.getColumnValues()[0].value;
          const minute = ref.getColumnValues()[1].value;
          this.$set(this.pickerValueTime, 0, hour);
          this.$set(this.pickerValueTime, 1, minute);
          console.log(this.pickerValueTime);
        }
      }, 0);
    },

    onPickerShowTemp() {
      this.afterShowPickerTemp = true;
      // fixbug 刷新所引
      const defaultIndex = this.getPickerDefaultIndexTemp();
      this.pickerDefaultIndexTemp = defaultIndex;
      // this.$refs.pickerTemp.defaultIndex = defaultIndex;
      this.refreshPickerTemp();
    },

    getPickerDefaultIndexTime(_hour, _minute) {
      const { DisSetHour, DisSetMin } = this.dataObject;
      const { pickerDataTime } = this;
      const hour = _hour || DisSetHour;
      const minute = _minute || DisSetMin;
      const findHourArr = pickerDataTime[0].find(item => {
        return item.value === hour;
      });
      let hourIndex = pickerDataTime[0].findIndex(item => {
        return item.value === hour;
      });
      let minIndex = findHourArr.children.findIndex(item => {
        return item.value === minute;
      });
      // 非法值时
      if (hourIndex < 0 || minIndex < 0) {
        console.error('timePicker数组下标越界');
        hourIndex = 0;
        minIndex = 0;
      }
      return [hourIndex, minIndex];
    },

    getPickerDefaultIndexTemp(_temp) {
      const { Mod, List1, SetTmp, pickerDataTemp } = this;
      const currentTmp = _temp || SetTmp;
      const isSmallOrLargeBaking = Mod === MODE_BAKING
        && (List1 === LIST1_BAKING_SMALL_BARBECUE
        || List1 === LIST1_BAKING_LARGE_BARBECUE);
      let indexValue = 0;
      if (isSmallOrLargeBaking) {
        indexValue = pickerDataTemp[0].findIndex(item => {
          return ~~item.value === currentTmp;
        });
      } else {
        indexValue = pickerDataTemp[0].findIndex(item => {
          return ~~item.text === currentTmp;
        });
      }
      if (indexValue < 0) {
        console.error('tempPicker数组下标越界');
        indexValue = 0;
      }
      return [indexValue];
    },

    refreshPickerTime() {
      setTimeout(() => {
        this.$refs.pickerTime.refresh();
      }, 0);
    },

    refreshPickerTemp() {
      setTimeout(() => {
        this.$refs.pickerTemp.refresh();
      }, 0);
    },

    showPopUpTemp() {
      this.$set(this.isPopupShowTemp, 'center', true);
    },
    hidePopUpTemp() {
      this.isMultiClick = false;
      this.$set(this.isPopupShowTemp, 'center', false);
    },
    confirmPopUpTemp() {
      // 是否重复点击
      if (this.isMultiClick) return;
      this.isMultiClick = true;

      this.setTmp(~~this.pickerValueTemp);
      const { Mod, List1, SetTmp, SetHour, SetMin } = this.dataObject;
      const isSmallOrLargeBaking = Mod === MODE_BAKING && (List1 === LIST1_BAKING_SMALL_BARBECUE || List1 === LIST1_BAKING_LARGE_BARBECUE);
      if (isSmallOrLargeBaking) {
        let List2 = LIST2_BAKING_MIDDLE;
        if (SetTmp === LIST2_BAKING_LOW_TMP) List2 = LIST2_BAKING_LOW;
        else if (SetTmp === LIST2_BAKING_MIDDLE_TMP) List2 = LIST2_BAKING_MIDDLE;
        else if (SetTmp === LIST2_BAKING_HEIGHT_TMP) List2 = LIST2_BAKING_HEIGHT;
        this.setList2(List2);
        this.sendCtrl({ Mod, List1, List2, SetTmp, SetHour, SetMin });
      } else {
        this.sendCtrl({ SetTmp });
      }
      this.$set(this.isPopupShowTemp, 'center', false);
    },
    onPickerConfirmTemp(columnIndex, itemIndex, value) {
      if (value) {
        this.pickerValueTemp = value.value;
      }
    },
    handleConfirm() {
      // 整机开门不能点击
      if (this.hasEstate) return;

      this.Pause === PAUSE.On ? this.setPause(PAUSE.Off) : this.setPause(PAUSE.On);
      const { Pause } = this.dataObject;
      this.sendCtrl({ Pause });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  flex: 1;
  .canvas-wrapper {
    top: 80px;
  }
  .last-step {
    position: absolute;
    top: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 850px;
    color: #404657;
    font-family: appleLight;
    font-size: 72px;
    .gauge-header {
      height: 60px;
      line-height: 60px;
      font-size: 48px;
      span {
        padding-right: 80px;
      }
    }
    .gauge-body {
      height: 280px;
      line-height: 280px;
      font-family: appleLight;
      .gauge-num {
        font-size: 190px;
      }
      .gauge-unit {
        font-size: 48px;
      }
    }
    .gauge-footer {
      height: 60px;
      line-height: 60px;
      font-size: 48px;
    }
  }
  .block.btns {
    position: absolute;
    bottom: 0.8rem;
    left: 50%;
    margin: 0;
    width: 100%;
    transform: translateX(-50%);
    .disable {
      opacity: 0.55;
    }
  }
}
.popup-center {
  width: 950px;
  text-align: center;
  border-radius: 10px;
  color: #404657;
  background-color: #fff;
  box-shadow: #dbdbdb 0 0 4px 0;
  padding-top: 75px;
  padding-bottom: 0;
  .title {
    font-size: 50px;
  }
  .picker-column {
    margin-top: 50px;
    margin-bottom: 50px;
  }
  .actions {
    position: relative;
    display: flex;

    &::after {
      content: '';
      position: absolute;
      z-index: 2;
      background-color: #c8c7cc;
      transform-origin: 100% 50%;
      transform: scaleY(0.5) translateY(-100%);
      top: 0;
      left: 0;
      right: auto;
      bottom: auto;
      width: 100%;
      height: 2px;
      transform-origin: 50% 0;
    }

    .popup-btn {
      position: relative;
      flex: 1 1 0%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 120px;
      font-size: 40px;
      font-weight: 500;
      color: #666f83;
      text-align: center;
      transition: background-color 0.3s;
      user-select: none;
      -webkit-tap-highlight-color: transparent;

      &::before {
        content: '';
        position: absolute;
        z-index: 2;
        background-color: #c8c7cc;
        transform: scaleX(0.5) translateX(100%);
        top: 0;
        right: 0;
        left: auto;
        bottom: auto;
        width: 2px;
        height: 100%;
        transform-origin: 100% 50%;
      }

      &:last-child::before {
        display: none;
      }
    }
  }
}
</style>
