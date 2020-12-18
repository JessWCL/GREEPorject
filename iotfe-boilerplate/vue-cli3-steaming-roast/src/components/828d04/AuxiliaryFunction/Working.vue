<template>
  <div class="container">
    <CanvasDashBoard
      :percent="percent"
      :pause="Pause === 1"
    />
    <div class="last-step">
      <div class="gauge-header">
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
        class="gauge-footer"
        @click="chooseTemp"
      >
        {{ DisTmp }}℃
      </div>
    </div>
    <gree-block class="btns">
      <gree-row>
        <gree-col>
          <gree-button
            round
            @click="handleCancel"
          >
            取消
          </gree-button>
        </gree-col>
        <gree-col>
          <gree-button
            round
            @click="handleConfirm"
          >
            {{ btnText }}
          </gree-button>
        </gree-col>
      </gree-row>
    </gree-block>
    <!-- 烹饪时间选择弹层 -->
    <gree-popup
      v-model="isPopupShowTime.center"
      position="center"
      :mask-closable="false"
      @show="onPickerShowTime"
    >
      <div class="popup-center">
        <div class="title">
          烹饪时间
        </div>
        <div class="picker-column">
          <gree-row>
            <gree-col>
              <gree-picker
                v-if="afterShowPickerTime"
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
          >
            取消
          </div>
          <div
            class="popup-btn"
            @click="confirmPopUpTime"
          >
            确定
          </div>
        </footer>
      </div>
    </gree-popup>
    <!-- 烹饪温度选择弹层 -->
    <gree-popup
      v-model="isPopupShowTemp.center"
      position="center"
      :mask-closable="false"
      @show="onPickerShowTemp"
    >
      <div class="popup-center">
        <div class="title">
          烹饪温度
        </div>
        <div class="picker-column">
          <gree-row>
            <gree-col>
              <gree-picker
                v-if="afterShowPickerTemp"
                ref="pickerTemp"
                class="picker-temp"
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
          >
            取消
          </div>
          <div
            class="popup-btn"
            @click="confirmPopUpTemp"
          >
            确定
          </div>
        </footer>
      </div>
    </gree-popup>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { Block, Row, Col, Button, Dialog, Popup, Picker } from 'gree-ui';
import * as types from '@/store/types';
import { RUN_STAT, PAUSE } from '@/api/828d04/constant';
import tempData from '@/api/828d04/tempData';
import timeData from '@/api/828d04/timeData';
import CanvasDashBoard from '@/components/common/CanvasDashBoard';

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
  data() {
    return {
      isPaused: false, // 是否暂停中
      afterShowPickerTime: false, // 是否显示pickerTime
      afterShowPickerTemp: false, // 是否显示pickerTemp
      isPopupShowTime: {},
      isPopupShowTemp: {},
      pickerDataTime: timeData,
      pickerDefaultIndexTime: [],
      pickerValueTime: [],
      pickerDataTemp: tempData,
      pickerDefaultIndexTemp: [],
      pickerValueTemp: ''
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      DisSetHour: state => state.dataObject.DisSetHour,
      DisSetMin: state => state.dataObject.DisSetMin,
      DisTmp: state => state.dataObject.DisTmp,
      SetHour: state => state.dataObject.SetHour,
      SetMin: state => state.dataObject.SetMin,
      RunStat: state => state.dataObject.RunStat,
      SetTmp: state => state.dataObject.SetTmp,
      Pause: state => state.dataObject.Pause,
    }),
    btnText() {
      return this.isPaused ? '继续' : '暂停';
    },

    percent() {
      const { SetHour, SetMin, DisSetHour, DisSetMin } = this;
      const totalTime = SetHour * 60 + SetMin;
      const rHour = SetHour - DisSetHour;
      const rMin = SetMin - DisSetMin;
      const runTime = rHour * 60 + rMin;
      let ret = runTime / totalTime * 100;
      if (ret > 100) {
        ret = 100;
      } else if (ret < 0) {
        ret = 0;
      }
      console.log({percent: ret});
      return ret;
    },
  },
  created() {
    // 设置picker默认值
    this.pickerDefaultIndexTime = [this.SetHour, this.SetMin - 1];
    const findTmpValue = tempData[0].filter(item => {
      return ~~item.text === this.SetTmp;
    });
    this.pickerDefaultIndexTemp = [findTmpValue[0].value - 1];
  },
  methods: {
    ...mapActions({
      sendCtrl: types.SEND_CTRL
    }),
    ...mapMutations({
      setHour: types.SET_SET_HOUR,
      setMin: types.SET_SET_MIN,
      setRunStat: types.SET_RUNSTAT,
      setTmp: types.SET_SET_TMP,
      setDisSetHour: types.SET_DIS_SET_HOUR,
      setDisSetMin: types.SET_DIS_SET_MIN,
      setPause: types.SET_PAUSE,
    }),
    handleCancel() {
      Dialog.confirm({
        title: '提示',
        content:
          '请确认是否退出当前烹饪',
        confirmText: '是',
        onConfirm: () => {
          this.setRunStat(RUN_STAT.TurnOn);
          const { RunStat } = this.dataObject;
          this.sendCtrl({ RunStat });
        },
        cancelText: '否'
      });
    },
    chooseTime() {
      if (!this.isPaused) {
        return;
      }
      this.showPopUpTime();
    },
    chooseTemp() {
      // if (!this.isPaused) return;
      this.showPopUpTemp();
    },
    onPickerShowTime() {
      this.afterShowPickerTime = true;
    },
    showPopUpTime() {
      this.$set(this.isPopupShowTime, 'center', true);
    },
    hidePopUpTime() {
      this.$set(this.isPopupShowTime, 'center', false);
    },
    confirmPopUpTime() {
      this.setHour(~~this.pickerValueTime[0]);
      this.setMin(~~this.pickerValueTime[1]);

      // APP 主动先同步数据
      this.setDisSetHour(~~this.pickerValueTime[0]);
      this.setDisSetMin(~~this.pickerValueTime[1]);

      const { SetHour, SetMin } = this.dataObject;
      this.sendCtrl({ SetHour, SetMin });
      this.$set(this.isPopupShowTime, 'center', false);
    },
    onPickerConfirmTime(columnIndex, itemIndex, value) {
      if (columnIndex === 0 && itemIndex === 5) {
        this.pickerValueTime[1] = '0';
      }
      if (columnIndex === 0 && itemIndex !== 5) {
        this.pickerValueTime[1] = '1';
      }
      if (value) {
        this.pickerValueTime[columnIndex] = value.text;
      }
    },
    onPickerShowTemp() {
      this.afterShowPickerTemp = true;
    },
    showPopUpTemp() {
      this.$set(this.isPopupShowTemp, 'center', true);
    },
    hidePopUpTemp() {
      this.$set(this.isPopupShowTemp, 'center', false);
    },
    confirmPopUpTemp() {
      this.setTmp(~~this.pickerValueTemp);
      const { SetTmp } = this.dataObject;
      this.sendCtrl({ SetTmp });
      this.$set(this.isPopupShowTemp, 'center', false);
    },
    onPickerConfirmTemp(columnIndex, itemIndex, value) {
      if (value) {
        this.pickerValueTemp = value.text;
      }
    },
    handleConfirm() {
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
    .gauge-header {
      font-size: 48px;
    }
    .gauge-body {
      font-family: appleLight;
      .gauge-num {
        font-size: 190px;
      }
      .gauge-unit {
        font-size: 48px;
      }
    }
    .gauge-footer {
      font-size: 48px;
    }
  }
  .block.btns {
    position: absolute;
    top: 800px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
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
      content: "";
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
        content: "";
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
