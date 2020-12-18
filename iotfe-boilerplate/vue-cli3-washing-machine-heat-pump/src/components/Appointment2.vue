<!--
 * @Descripttion: 预约非北京时间 eg: XX 小时后
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:07
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-05-26 14:38:24
 -->
<template>
  <div class="body-main">
    <div class="time-describe" :style="{marginTop: prompt1 && order ? '0px' : '' }">
      <span>{{ $language('timer.appointmenttitle') }}</span>
    </div>
    <div v-if="order" class="order-time">
      {{ orderTimeHour }}
      <span>时</span>
      {{ orderTimeMin }}
      <span>分后</span>
    </div>

    <div v-else class="picker">
      <!-- 小时滑轮 -->
      <div
        id="TimerSelectorHour"
        class="timer-elector-hour"
        :class="{ isMaxTop: isXSMax }"
      />
      <!-- 分钟滑轮 -->
      <div
        id="TimerSelectorMin"
        class="timer-elector-min"
        :class="{ isMaxTop: isXSMax }"
      />
      <div class="white-block" />
      <div class="unit-hour">时</div>
      <div class="unit-min">分后</div>
    </div>
    <gree-block>
      <!-- 预约时间 -->
      <gree-row v-if="order">
        <gree-col width="10"/>
        <gree-col width="35">
          <gree-button @click="handleCancel" round :class="{opacity: childLock}" style="width: 100%">{{
            $language('timer.cancel')
          }}</gree-button>
        </gree-col>
        <gree-col width="35">
          <gree-button @click="handlePause" round :class="{opacity: childLock}" style="width: 100%">{{
            orderLaunch ? $language('timer.pause') : $language('timer.continue')
          }}</gree-button>
        </gree-col>
        <gree-col width="10"/>
      </gree-row>

      <!-- 设置预约 -->
      <gree-row v-else>
        <gree-col width="40">
          <gree-button @click="$emit('close', false)" round style="width: 100%">{{
            $language('timer.cancel')
          }}</gree-button>
        </gree-col>
        <gree-col width="40">
          <gree-button @click="handleConfirm" round style="width: 100%">{{
            $language('timer.confirm')
          }}</gree-button>
        </gree-col>
      </gree-row>
    </gree-block>

    <gree-toolbar v-show="order" no-hairline position="bottom">
      <gree-row>
        <gree-col
          width="30"
          v-for="(item, index) in orderList"
          :key="index"
          @click.native="setFunction('bottom', item)"
          :class="{opacity: (item.isDisabled) || (item.protocol === 'childLock' && !orderLaunch)}"
        >
          <div class="icon">
            <img :src="require('@/assets/img/Icon/' + item.ImgName + '.png')" style="width: 60px"/>
          </div>
          <h3>{{ $language(item.name) }}</h3>
        </gree-col>
      </gree-row>
    </gree-toolbar>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { Picker, Block, Row, Col, Button, ToolBar } from 'gree-ui';
import footConfig from '../../src/api/home';
import { showToastPlugin } from '../api/pluginInterface';

export default {
  name: 'Appointment2',
  components: {
    [Picker.name]: Picker,
    [Block.name]: Block,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [ToolBar.name]: ToolBar,
  },
  mixins: [footConfig],
  props: {},
  data() {
    return {
      pickerHourList: [],
      instanceMobiScroll_Hour: undefined, // mobiscroll实例
      instanceMobiScroll_MIn: undefined, // mobiscroll实例
      isChange: false,
      hourValue: 0,
      minValue: 0,
      isXSMax: false,
    };
  },
  computed: {
    ...mapState({
      timeAll: state => state.dataObject.timeAll,
      childLock: state => state.dataObject.childLock,
      dataObject: state => state.dataObject,
      prompt1: state => state.dataObject.prompt1,
      order: state => state.dataObject.order,
      orderLaunch: state => state.dataObject.orderLaunch,
      orderTimeHour(state) {
        let value = state.dataObject.orderTimeHour;
        value = value > 9 ? value : `0${value}`;
        return value;
      },
      orderTimeMin(state) {
        let value = state.dataObject.orderTimeMin;
        value = value > 9 ? value : `0${value}`;
        return value;
      },
    }),
  },
  watch: {
    timeAll(newV, oldV) {
      let newH = Math.ceil(newV / 60);
      if (!(newV % 60)) newH++;
      let oldH = Math.ceil(oldV / 60);
      if (!(oldV % 60)) oldH++;
      // 判断是否需要更新数值（出现总运行时间小于最小运行时间），忽略会出bug.
      if (newH < oldH && !this.order) { 
        this.pickerHourList = this.timeData(newV);
        this.setPickerHour();
        return;
      }

      const condition1 = !this.order && newH > Number(this.hourValue); // 编辑状态下，总运行时间大于当前时间
      const orderTime = (this.orderTimeHour >> 0) * 60 + Number(this.orderTimeMin);      
      const condition2 = this.order && !this.orderLaunch && (newV > orderTime); // 预约暂停状态下，当前时长大于当前剩余时长,
      if (condition1 || condition2) {
        showToastPlugin('当前运行时间大于预约时间,已取消预约');
        const obj = {
          order: 0,
          orderTimeHour: 0,
          orderTimeMin: 0
        };
        this.setDataObject(obj);
        this.sendCtrl(obj);
        condition1 && this.$emit('close');
      }
    },
  },

  created() {
    this.isXSMax =
      /iphone/gi.test(window.navigator.userAgent) &&
      window.devicePixelRatio &&
      window.devicePixelRatio === 3 &&
      window.screen.width === 414 &&
      window.screen.height === 896;
    console.log('isXSMax', this.isXSMax);
  },

  mounted() {
    this.pickerHourList = this.timeData(this.timeAll);
    this.hourValue = Number(this.pickerHourList[0]);
    if (!this.order) {
      this.$nextTick(() => {
        this.setPickerHour();
        this.setPickerMin(false);
      });
    }
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @description 预约确认
     */
    handleConfirm() {
      let obj = {
        order: 1,
        orderTimeHour: Number(this.hourValue),
        orderTimeMin: Number(this.minValue),
        orderLaunch: 1
      };
      this.setDataObject(obj);
      this.sendCtrl(obj);
      this.$emit('close');
    },
    /**
     * @description 暂停预约
     */
    handlePause() {
      if (this.childLock) {
        showToastPlugin('请先解锁童锁');
        return;
      }
      const orderLaunch = !this.orderLaunch >> 0;
      this.setDataObject({ orderLaunch });
      this.sendCtrl({ orderLaunch });
    },

    /**
     * @description 取消预约
     */
    handleCancel() {
      if (this.childLock) {
        showToastPlugin('请先解锁童锁');
        return;
      } 
      this.setDataObject({ order: 0, orderLaunch: 1 });
      this.sendCtrl({ order: 0, orderLaunch: 1 });
      this.$emit('close');
    },

    /**
     * @description 底部按钮点击事件
     */
    setFunction(string, item) {
      const obj = {};
      const protocol = item.protocol;
      if (protocol !== 'childLock' && item.isDisabled) { // 童锁开启后其他不可设置
        showToastPlugin('请先解锁童锁');
        return;
      }

      if (protocol === 'childLock' && !this.orderLaunch) { // 预约暂停是不可设置童锁
        showToastPlugin('当前不可设置');
        return;
      }
      obj[item.protocol] = !this.dataObject[item.protocol] >> 0;
      this.setDataObject(obj);
      this.sendCtrl(obj);
    },
    /**
     * @description 根据时间计算初始值，返回列表
     * @return array
     */
    timeData(value) {
      let firstHour = Math.ceil(value / 60);
      if (!(value % 60)) firstHour++;
      let list = [];
      for (let index = firstHour; index < 25; index++) {
        list.push(index > 9 ? `${index}` : `0${index}`);
      }
      return list;
    },
    /**
     * @description 初始化滑轮小时轴
     */
    setPickerHour() {
      try {
        let _this = this;
        mobiscroll.settings = {
          theme: 'ios',
          themeVariant: 'light',
        };
        this.instanceMobiScroll_Hour = mobiscroll.scroller(
          '#TimerSelectorHour',
          {
            theme: 'mobiscroll',
            display: 'inline',
            showLabel: false,
            height: 60,
            rows: 3,
            wheels: [
              [
                {
                  label: '',
                  data: this.pickerHourList,
                },
              ],
            ],
            onChange(event, inst) {
              const afterValue = inst.getVal();
              _this.hourValue = Number(afterValue);
              if (_this.isChange) {
                _this.setPickerMin(false);
                _this.isChange = false;
              }
              if (afterValue === 24) {
                _this.setPickerMin(true);
                _this.isChange = true;
              }
            },
          },
        );
        const setTimeValue =
          this.hourValue > 9 ? `${this.hourValue}` : `0${this.hourValue}`;
        this.instanceMobiScroll_Hour.setVal(setTimeValue);
      } catch (error) {
        console.log('定时setPickerHour', error);
      }
    },

    /**
     * @description 初始化滑轮分钟轴
     * @param isLast 判断是否是‘24’，如果是，则分钟只有00
     */
    setPickerMin(isLast) {
      try {
        let _this = this;
        mobiscroll.settings = {
          theme: 'ios',
          themeVariant: 'light',
        };
        let list = ['00', '30'];
        if (isLast) list = ['00'];
        this.instanceMobiScroll_MIn = mobiscroll.scroller('#TimerSelectorMin', {
          theme: 'mobiscroll',
          display: 'inline',
          showLabel: false,
          height: 60,
          rows: 3,
          wheels: [
            [
              {
                label: '',
                data: list,
              },
            ],
          ],
          onChange(event, inst) {
            const afterValue = inst.getVal();
            _this.minValue = afterValue;
          },
        });
        this.instanceMobiScroll_MIn.setVal('00');
      } catch (error) {
        console.log('定时setPickerMin', error);
      }
    },
  },
};
</script>

<style lang="scss" scope>


// 预约
.body-main {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  .time-describe {
    margin: 25px 0 0 50px;
    font-size: 48px;
  }
  // 滑轮样式
  .picker {
    height: 180PX;
    // min-height: 400px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex: 1 1 auto;
  }
  
  .mbsc-mobiscroll .mbsc-fr-w {
    min-width: 300px;
  }
  .mbsc-mobiscroll .mbsc-sc-lbl-v .mbsc-sc-whl-w {
    margin-top: 0;
  }

  .mbsc-mobiscroll .mbsc-sc-itm {
    color: #c0c0c0;
    font-size: 130px;
    // Arial, Hiragino Sans GB, Microsoft Yahei, STXihei, SimHei, WenQuanYi Micro Hei, Droid Sans, sans-serif;
  }
  .mbsc-mobiscroll .mbsc-sc-whl-l {
    border: 0;
  }
  .mbsc-fr-w {
    background-color: inherit;
  }
  .mbsc-sc-itm.mbsc-btn-e.mbsc-sc-itm-sel {
    color: #000;
    font-size: 160px;
  }

  .timer-elector-hour,
  .timer-elector-min {
    position: absolute;
    // top: 0%;
    left: 22%;
    // width: 100px !important;
  }
  .isMaxTop {
    // top: 160px; // 智铂之后无需兼容 也不知道为啥，可能手机系统问题
  }
  .timer-elector-min {
    left: 48%;
  }

  .white-block {
    z-index: -1;
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translateY(-50%);
    width: 100%;
    height: 190px;
    background-color: #fff;
  }
  .unit-hour,
  .unit-min {
    position: absolute;
    top: 53%;
    left: 46%;
    font-size: 48px;
  }
  .unit-min {
    left: 72%;
  }

  .order-time {
    width: 100%;
    text-align: center;
    // transform: translateX(4%);
    font-size: 200px;
    color: #404657;
    span {
      font-size: 45px;
    }
  }

  .order-btn {
    position: absolute;
    top: 300px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    height: 172px;

    &.round:after {
      border-radius: 268px !important;
    }
  }
}
.page-home {
  .body-main {
    .toolbar.toolbar-bottom {
      position: static !important;
      bottom: none !important;
    }
  }
}
</style>

