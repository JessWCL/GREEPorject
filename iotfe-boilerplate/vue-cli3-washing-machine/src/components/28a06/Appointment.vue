<!--
 * @Descripttion: 预约北京时间。区别于另外一个非北京时间的组件
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:07
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-05-30 19:13:19
 -->
<template>
  <div class="body-main">
    <div class="time-describe">
      <span>{{ describe }}</span>
    </div>
    <div v-if="order" class="order-time">
      {{ orderTimeHour }}:{{ orderTimeMin }}
    </div>
    <div v-else class="picker-column">
      <gree-picker
        class="picker-time"
        ref="pickerTime"
        :data="pickerDataTime"
        :cols="3"
        :line-height="60"
        :default-index="pickerDefalutData"
        :default-value="pickerDefalutData"
        is-view
        :multi-line="false"
        is-cascade
      ></gree-picker>
    </div>
    <gree-block>
      <!-- 已预约时间 -->
      <gree-row v-if="order">
        <gree-col width="10"/>
        <gree-col width="35">
          <gree-button @click="handleCancel" round :class="{opacity: childLock}" style="width: 100%">{{
            $language('timer.cancel')
          }}</gree-button>
        </gree-col>
        <gree-col width="35">
          <gree-button @click="handlePause" round :class="{opacity: childLock, textBlue: !orderLaunch}" style="width: 100%" >{{
            orderLaunch ? $language('timer.pause') : $language('timer.continue')
          }}</gree-button>
        </gree-col>
        <gree-col width="10"/>
      </gree-row>
      
      <!-- 设置预约 -->
      <gree-row v-else>
        <gree-col width="10"/>
        <gree-col width="35">
          <gree-button @click="$emit('close', false)" round style="width:100%">{{
            $language('timer.cancel')
          }}</gree-button>
        </gree-col>
        <gree-col width="35">
          <gree-button @click="handleConfirm" round style="width: 100%">{{
            $language('timer.confirm')
          }}</gree-button>
        </gree-col>
        <gree-col width="10"/>
      </gree-row>
    </gree-block>
  </div>
</template>

<script>
import { Picker, Block, Row, Col, Button, Dialog } from 'gree-ui';
import { showToastPlugin } from '@/api/pluginInterface';
import upper from '@/mixins/config/28a06/order/upper';

export default {
  name: 'Appointment',
  components: {
    [Picker.name]: Picker,
    [Block.name]: Block,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
  },
  mixins: [upper],
  props: {
    timeValue: {
      type: Number,
      default() {
        return 60;
      },
    },
  },
  data() {
    return {
      pickerDataTime: null,
      pickerDefalutData: [1, 23, 59],
    };
  },
  computed: {
    describe() {
      let string = this.$language('timer.appointmenttitle');
      if (this.order) {
        if (this.orderTimeDay) {
          string += '明日';
        } else {
          string += '今日';
        }
      }
      return string + this.$language('timer.appointmenttitleTime');
    },
  },
  watch: {
    timeAll(newV, oldV) {
      const newH = Math.ceil(newV / 60);
      const oldH = Math.ceil(oldV / 60);
      // 判断是否需要更新数值（出现总运行时间小于最小运行时间），忽略会出bug.
      let columnValues = null;
      if (!this.order) columnValues = this.$refs.pickerTime.getColumnValues();
      if (newH < oldH && !this.order) { 
        this.pickerDefalutData = [columnValues[0].value, columnValues[1].value, columnValues[2].value];
        this.pickerDataTime = this.timeData(newV);
        setTimeout(() => {
          this.$refs.pickerTime.refresh();
        }, 0);
        return;
      }

      const time = new Date();
      const nowH = time.getHours();
      const nowMin = time.getMinutes();
      let firstTime = nowH * 60 + nowMin + newV + 10;
      let condition1 = false;
      if (!this.order) {
        const currentSelectTime = columnValues[0].value * 24 * 60 + columnValues[1].value * 60 + columnValues[2].value; // 当前选的时间
        condition1 = !this.order && firstTime > Number(currentSelectTime); // 编辑状态下，总运行时间大于当前选的时间
      }

      const orderTime = this.orderTimeDay * 24 * 60 + Number(this.orderTimeHour) * 60 + Number(this.orderTimeMin); // 预约的时间     
      const condition2 = this.order && !this.orderLaunch && (firstTime >= orderTime); // 预约暂停状态下，当前时长大于当前剩余时长,
      if (condition1 || condition2) {
        showToastPlugin('当前运行时间大于预约时间,已取消预约');
        const commitObj = {
          order: 0,
          orderTimeDay: 0,
          orderTimeHour: 0,
          orderTimeMin: 0,
          orderLaunch: 1
        };
        this.setDataObj(commitObj);
        condition1 && this.$emit('close');
      }
    }
  },
  mounted() {
    if (!this.order) {
      this.pickerDataTime = this.timeData(this.timeAll);
      this.pickerDefalutData = [0, 0, 0];
      setTimeout(() => {
        this.$refs.pickerTime.refresh();
      }, 100);
    }
  },
  methods: {
    /**
     * @description 时间数据
     */
    timeData(timeAll) {
      const time = new Date();
      const nowH = time.getHours();
      const nowMin = time.getMinutes();
      let firstTime = nowH * 60 + nowMin + timeAll + 10;
      const remainder = firstTime % 10; 
      if (remainder) firstTime += (10 - remainder);     
      const firstH = parseInt(firstTime / 60, 10);
      const firstMin = firstTime % 60;
      // console.log(`最早的时间${firstH}：${firstMin}`);
      let timelist = [{
        value: 0,
        text: '今日',
      }, {
        value: 1,
        text: '明日',
      }];
      // 以下配置今日最早小时
      let todayHourList = [
        {
          value: firstH,
          text: firstH > 9 ? firstH : `0${firstH}`,
          children: []
        }
      ];
      for (let index = firstMin; index < 60; index += 10) {
        const list = {
          value: index,
          text: index > 9 ? index : `0${index}`,
        };
        todayHourList[0].children.push(list);
      }
      // 以下配置今日
      let minList = [];
      for (let index = 0; index < 60; index += 10) {
        const list = {
          value: index,
          text: index > 9 ? index : `0${index}`,
        };
        minList.push(list);
      }
      for (let index = firstH + 1; index < 24; index++) {
        const hourlist = {
          value: index,
          text: index > 9 ? index : `0${index}`,
          children: minList
        };
        todayHourList.push(hourlist);
      }
      timelist[0].children = todayHourList;
    
      // 配置明日
      let todayTomorrowList = [];
      let tomrrowomLastTime = nowH * 60 + nowMin; 
      const tomorrowRemainder = tomrrowomLastTime % 10;
      if (tomorrowRemainder) tomrrowomLastTime += (10 - tomorrowRemainder);
      const tomrrowomLastHour = parseInt(tomrrowomLastTime / 60, 10);
      const tomrrowomLastMin = tomrrowomLastTime % 60;
     
      for (let index = 0; index < tomrrowomLastHour; index++) {
        const list = {
          value: index,
          text: index > 9 ? index : `0${index}`,
          children: minList
        };
        todayTomorrowList.push(list);
      } 
      // 明日最后一小时
      let tomrrowomLastHourList = {
        value: tomrrowomLastHour,
        text: tomrrowomLastHour > 9 ? tomrrowomLastHour : `0${tomrrowomLastHour}`,
        children: []
      };
      for (let index = 0; index <= tomrrowomLastMin; index += 10) {
        const list = {
          value: index,
          text: index > 9 ? index : `0${index}`,
        };
        tomrrowomLastHourList.children.push(list);
      }
      todayTomorrowList.push(tomrrowomLastHourList);
      // 配置完成
      timelist[1].children = todayTomorrowList;
      return [timelist];
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
      this.setDataObj({ orderLaunch });
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
      Dialog.confirm({
        title: '确认提示',
        content:
            '是否确认取消预约',
        confirmText: '确认',
        onConfirm: () => this.handleCancelConfirm(),
        cancelText: '取消',
        onCancel: () => console.log('取消')
      });
    },

    handleCancelConfirm() {
      const commitObj = {};
      this.setDataObj(Object.assign(commitObj, { order: 0 }));
      this.sendCtrl({ order: 0 });
      showToastPlugin('已取消预约');
      this.$emit('close');
    },
    /**
     * @description 预约确认
     */
    handleConfirm() {
      const columnValues = this.$refs.pickerTime.getColumnValues();
      const obj = {
        order: 1,
        orderTimeDay: columnValues[0].value,
        orderTimeHour: columnValues[1].value,
        orderTimeMin: columnValues[2].value,
        orderLaunch: 1
      };
      const commitObj = {};
      this.setDataObj(Object.assign(commitObj, obj));
      this.sendCtrl(obj);
      this.$emit('close');
    }
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
    margin: 30px 0 0 30px;
    font-size: 40px;
  }

  .gree-picker {
    &.picker-time {
      .gree-picker-column {
        padding: 0 !important;
        width: 100% !important;
        .gree-picker-column-container {
          .gree-picker-column-masker {
            left: 0;
            right: 0;
            &.top {
              top: 0 !important;
              background: #f4f4f4 !important;
              z-index: 0;
              &:before {
                visibility: hidden;
              }
            }
            &.bottom {
              bottom: 0 !important;
              background: #f4f4f4 !important;
              z-index: 0;
              &:after {
                visibility: hidden;
              }
            }
          }
          .gree-picker-column-list {
            .gree-picker-column-item {
              &:nth-of-type(1) {
                flex: 0.8;
              }
              &:nth-of-type(2):after {
                content: '时';
              }
              &:nth-of-type(3):after {
                content: '分';
              }
              &:nth-of-type(2),
              &:nth-of-type(3) {
                &:after {
                  position: absolute;
                  top: 52.5%;
                  right: 10%;
                  transform: translateY(-50%);
                  font-size: 55px !important;
                }
              }
            }
            .column-list {
              .column-item {
                color: #404657;
                font-size: 110px !important;
                font-weight: 100;
              }
            }
          }
          .gree-picker-column-hooks {
            .gree-picker-column-hook {
              &:nth-of-type(1) {
                flex: 0.5;
              }
            }
          }
        }
      }
    }
  }

  .order-time {
    // border: 1px solid red;
    // position: absolute;
    // top: 150px;
    // left: 50%;
    // transform: translate(-50%, 0);
    // width: 100%;
    padding: 50px 0 ;
    text-align: center;
    font-size: 226px;
    color: #404657;
  }
  .order-btn {
    // position: absolute;
    top: 460px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 535px !important;
    height: 172px;

    &.round:after {
      border-radius: 268px !important;
    }
  }
}
</style>
