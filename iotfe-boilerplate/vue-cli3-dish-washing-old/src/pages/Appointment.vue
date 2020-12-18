<template>
  <div class="appointment-wrapper">
    <SafeAreaInsetTopComponent :top-color="barColor" />
    <div class="appointment-container">
      <GreeMain />

      <!-- <TimeTips /> -->

      <div
        class="appointment-body"
        v-show="!TmrOn"
        :class="{ 'yellow-theme': isNoneMod }"
      >

        <van-collapse v-model="activeNames">
          <van-collapse-item
            title="预约完成时间"
            :value="collapseValue"
            name="1"
          >
            <!-- picker -->
            <div class="picker-container">
              <!-- 定时滑轮 -->
              <!-- <div class ="time-picker-center-bg"/> -->
              <van-picker
                ref="datePicker"
                :columns="columns"
                :default-index="2"
                :item-height="55"
                :visible-item-count="3"
                @change="onChange"
              />
              <van-datetime-picker
                v-model="currentTime"
                type="time"
                :item-height="55"
                :show-toolbar="false"
                :visible-item-count="3"
                :filter="filter"
              />
              <!-- 定时滑轮 -->
            </div>
          </van-collapse-item>
        </van-collapse>

        <div class="title d-none">
          <div class="item-container font-title">
            <span>预约完成时间</span>
            <span>{{ currentTime }}</span>
          </div>
        </div>
        <mt-picker
          class="appointment d-none"
          ref="timerpicker"
          :visible-item-count="3"
          :item-height="55"
          :slots="slots"
          @change="onValuesChange"/>

        <div class="select-items-container">
          <div class="select-items">
            <div class="font-title">分层洗：</div>
            <div class="item-wrapper">
              <div
                @click="handleAppointmentLayerWash({ value: 0, isForbided: false })"
                :class="[ LayerWash === 0 ? 'active' : '']"
                class="item">双层洗</div>
              <div
                @click="handleAppointmentLayerWash({ value: 1, isForbided: underIsForbided })"
                :class="[ LayerWash === 1 ? 'active' : '', { forbided: upperIsForbided }]"
                class="item">上层洗</div>
              <div
                @click="handleAppointmentLayerWash({ value: 2, isForbided: underIsForbided })"
                :class="[ LayerWash === 2 ? 'active' : '', { forbided: underIsForbided } ]"
                class="item">下层洗</div>
            </div>
          </div>
          <div class="select-items">
            <div class="font-title">热风烘干：</div>
            <div class="item-wrapper">
              <div
                @click="handleAppointmentSetDry({ value: 1, isForbided: dryIsForbided })"
                :class="[ Dry === 1 ? 'active' : '', { forbided: dryIsForbided } ]"
                class="item">开启</div>
              <div
                @click="handleAppointmentSetDry({ value: 0, isForbided: dryIsForbided })"
                :class="[ Dry === 0 ? 'active' : '', { forbided: dryIsForbided } ]"
                class="item">关闭</div>
            </div>
          </div>
          <div class="select-items">
            <div class="font-title">保洁：</div>
            <div class="item-wrapper">
              <div
                @click="handleAppointmentSetPurifier({ value: 1, isForbided: purifierIsForbided })"
                :class="[ Purifier === 1 ? 'active' : '', { forbided: purifierIsForbided } ]"
                class="item">开启</div>
              <div
                @click="handleAppointmentSetPurifier({ value: 0, isForbided: purifierIsForbided })"
                :class="[ Purifier === 0 ? 'active' : '', { forbided: purifierIsForbided } ]"
                class="item">关闭</div>
            </div>
          </div>
        </div>

        <div class="btn-container">
          <div
            @click="handleAppointmentCancel()"
            class="gree-btn">取消</div>
          <div
            @click="handleAppointmentStart()"
            class="gree-btn">开始</div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import TimeTips from '@/components/TimeTips';
import GreeMain from './Main';
import { FUN_BTNS, DW_MID_828B00, MOD_NONE } from '../api/constants';
import { getMID, getAppointmentTime, padZero } from '../utils/index';
import SafeAreaInsetTopComponent from '../components/SafeAreaInsetTopComponent';

const {
  // DEFAULT,
  UP_WASH,
  DOWN_WASH,
  HOT_AIR_DRYING,
  PURIFIER,
} = FUN_BTNS;

const miniteAll = [];
const HourAll = [];
// 时间范围数组
for (let i = 0; i < 24; i += 1) {
  if (i < 10) {
    HourAll.push(`0${i}`);
  } else {
    HourAll.push(i);
  }
}
for (let i = 0; i < 60; i += 1) {
  if (i < 10) {
    miniteAll.push(`0${i}`);
  } else {
    miniteAll.push(i);
  }
}
export default {
  name: 'Appointment',
  components: {
    GreeMain,
    TimeTips,
    SafeAreaInsetTopComponent,
  },
  data() {
    return {
      slots: [
        {
          flex: 1,
          values: HourAll,
          className: 'slot1',
          textAlign: 'center',
        },
        {
          divider: true,
          content: ':',
          className: 'slot2',
        },
        {
          flex: 1,
          values: miniteAll,
          className: 'slot3',
          textAlign: 'center',
        },
      ],
      MID: getMID(),
      DW_MID_828B00,
      activeNames: ['1'],
      columnsIndex: 1,
      currentTime: '00:00',
    };
  },
  computed: {
    ...mapGetters('device', ['ModeTime']),
    ...mapState({
      DataObject: state => state.device.DataObject,
      LayerWash: state => state.device.DataObject.LayerWash,
      Dry: state => state.device.DataObject.Dry,
      Purifier: state => state.device.DataObject.Purifier,
      TmrOn: state => state.device.DataObject.TmrOn,
      Wash: state => state.device.DataObject.Wash,
      upperIsForbided: state => state.device.funBtnList[UP_WASH].isForbided, // 按钮是否禁用
      underIsForbided: state => state.device.funBtnList[DOWN_WASH].isForbided, // 按钮是否禁用
      dryIsForbided: state => state.device.funBtnList[HOT_AIR_DRYING].isForbided, // 按钮是否禁用
      purifierIsForbided: state => state.device.funBtnList[PURIFIER].isForbided, // 按钮是否禁用
      TmrStatus: state => state.device.DataObject.TmrStatus,
      Mod: state => state.device.DataObject.Mod,
      barColor: state => state.device.barColor,
    }),

    collapseValue() {
      let ret = '';
      if (this.activeNames[0] !== undefined) {
        ret = '';
      } else {
        ret = this.currentTime;
      }
      return ret;
    },

    isOnlyAppointmentTomorrow() {
      const ModeTime = this.ModeTime;
      const nowTime = new Date().getTime();
      const nowDate = new Date().getDate();
      const retTime = new Date(ModeTime * 60 * 1000 + nowTime);
      const retDate = retTime.getDate();
      const ret = nowDate !== retDate;
      return ret;
    },

    columns() {
      const isOnlyAppointmentTomorrow = this.isOnlyAppointmentTomorrow;
      return [
        { text: '明天', disabled: false },
        { text: '今天', disabled: isOnlyAppointmentTomorrow === true },
      ];
    },

    isNoneMod() {
      let ret = false;
      const Mod = this.Mod;
      if (Mod === MOD_NONE) {
        ret = true;
      }
      return ret;
    },
  },
  watch: {
    TmrStatus(newV, oldV) { // 监听预约状态，不同的手机，预约后界面不同步的问题
      if (newV === 1 && oldV === 0) {
        vm.$router.push('/index'); // eslint-disable-line
      }
    },

    Wash(newV, oldV) { // 监听预约状态，不同的手机，工作后界面不同步的问题
      if (newV === 1 && oldV === 0) {
        vm.$router.push('/index'); // eslint-disable-line
      }
    },

    ModeTime(newV) {
      const ModeTime = newV;
      const nowTime = new Date().getTime();
      const retTime = new Date(ModeTime * 60 * 1000 + nowTime);
      const mHour = padZero(retTime.getHours());
      const mMinute = padZero(retTime.getMinutes());
      this.currentTime = `${mHour}:${mMinute}`;

      const isOnlyAppointmentTomorrow = this.isOnlyAppointmentTomorrow;
      let index = 0;
      if (isOnlyAppointmentTomorrow) {
        index = 0;
      } else {
        index = 1;
      }
      this.$refs.datePicker.setIndexes([index]);
      this.columnsIndex = index;
    },

    isOnlyAppointmentTomorrow(newV, oldV) {
      const needsUpdate = newV === true && oldV === false;
      let index = 0;
      if (needsUpdate) {
        index = 0;
      } else {
        index = 1;
      }
      this.$refs.datePicker.setIndexes([index]);
      this.columnsIndex = index;
    },

    columnsIndex(newV) {
      const ModeTime = this.ModeTime;
      const nowTime = new Date().getTime();
      const retTime = new Date(ModeTime * 60 * 1000 + nowTime);
      const mHour = padZero(retTime.getHours());
      const mMinute = padZero(retTime.getMinutes());
      this.currentTime = `${mHour}:${mMinute}`;

      if (newV === 1) {
        this.currentTime = `${mHour}:${mMinute}`;
      } else if (newV === 0) {
        this.currentTime = '00:00';
      }
    },

    currentTime(newV) {
      const currentTime = newV;

      const countTime = getAppointmentTime(currentTime);

      const hour = parseInt(countTime / 60, 10);
      const min = parseInt(countTime % 60, 10);
      // 判断是否有预约
      if (countTime > this.ModeTime) {
        this.setTmrHour({ value: hour });
        this.setTmrMin({ value: min });
        this.handleSetStTmr({ value: countTime });
      } else {
        this.setTmrHour({ value: 0 });
        this.setTmrMin({ value: 0 });
        this.handleSetStTmr({ value: 0 });
      }
    },
  },
  mounted() {
    // this.updateTime();
    this.updateTimeForVantPicker();
  },
  methods: {
    ...mapActions('device', ['handleSetStTmr']),
    ...mapActions('device', ['handleAppointmentCancel']),
    ...mapActions('device', ['handleAppointmentStart']),
    ...mapActions('device', ['handleAppointmentLayerWash']),
    ...mapActions('device', ['handleAppointmentSetDry']),
    ...mapActions('device', ['handleAppointmentSetPurifier']),
    ...mapMutations('device', ['setTmrHour']),
    ...mapMutations('device', ['setTmrMin']),

    onChange(picker, value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.columnsIndex = index;
    },

    filter(type, options) {
      const ModeTime = this.ModeTime;
      const isOnlyAppointmentTomorrow = this.isOnlyAppointmentTomorrow;
      const isPickTomorrow = this.columnsIndex === 0;
      const isPickToday = this.columnsIndex === 1;
      const [strHour] = this.currentTime.split(':');
      const curHour = parseInt(strHour, 10);

      const nowTime = new Date().getTime();
      const retTime = new Date(ModeTime * 60 * 1000 + nowTime);
      const cHour = new Date().getHours(); // 当前时间戳的小时
      const cMinute = new Date().getMinutes(); // 当前时间戳的分钟

      const filterHour = retTime.getHours();
      const filterMin = retTime.getMinutes();

      if (isPickToday) {
        if (type === 'hour') {
          return options.filter(option => option >= filterHour);
        }
        if (type === 'minute') {
          if (curHour === filterHour) {
            return options.filter(option => option >= filterMin);
          }
          return options;
        }
      } else if (isPickTomorrow) {
        if (isOnlyAppointmentTomorrow) {
          if (type === 'hour') {
            return options.filter(option => option >= filterHour);
          }
          if (type === 'minute') {
            if (curHour === filterHour) {
              return options.filter(option => option >= filterMin);
            }
            return options;
          }
        } else {
          if (type === 'hour') {
            return options.filter(option => option <= cHour);
          }
          if (type === 'minute') {
            if (curHour === cHour) {
              return options.filter(option => option <= cMinute);
            }
            return options;
          }
        }
      }
      return options;
    },

    /**
     * @function onValuesChange - 根据模式改变定时范围和默认值
     * @property {object} picker - 调用mintUI的picker组件
     * @property {function} picker.setSlotValues - 设置当前的数组范围
     * @property {function} picker.setSlotValue - 设置当前的时间
     * @param {object[]} values - 当前选择时间组成的数组
     */
    updateTime() {
      const ModeTime = this.ModeTime;
      const nowTime = new Date().getTime();
      const retTime = new Date(ModeTime * 60 * 1000 + nowTime);
      const hour = retTime.getHours();
      const minute = retTime.getMinutes();
      this.$refs.timerpicker.setSlotValue(0, hour);
      this.$refs.timerpicker.setSlotValue(1, minute);
      const countMins = hour * 60 + minute;
      this.handleSetStTmr({ value: countMins });
    },

    updateTimeForVantPicker() {
      const ModeTime = this.ModeTime;
      const nowTime = new Date().getTime();
      const retTime = new Date(ModeTime * 60 * 1000 + nowTime);
      const hour = padZero(retTime.getHours());
      const minute = padZero(retTime.getMinutes());
      this.currentTime = `${hour}:${minute}`;
      const countMins = hour * 60 + minute;
      this.handleSetStTmr({ value: countMins });
    },

    onValuesChange(picker, values) {
      const selectHour = parseInt(values[0], 10);
      const selectMin = parseInt(values[1], 10);
      const nowHour = new Date().getHours();
      const nowMin = new Date().getMinutes();

      // 选择时间
      const countSelectTime = selectHour * 60 + selectMin;
      // 现在时间
      const countRealTime = nowHour * 60 + nowMin;

      let countMins = 0;
      let hour = 0;
      let min = 0;

      // 预约时间大于等于当前时间
      const isAfterAppointment = (countSelectTime - countRealTime) >= 0;
      // 预约时间小与当前时间
      const isBeforeAppointment = (countSelectTime - countRealTime) < 0;
      if (isAfterAppointment) {
        /**
         * |    00      |     00     |
         * |  nowHour   |   nowMin   |
         * | pickerHour | pickerMin  |
         * |            |            |
         * |    24      |     00     |
         */
        // 预约时间大于等于当前时间
        countMins = countSelectTime - countRealTime;
        hour = parseInt(countMins / 60, 10);
        min = parseInt(countMins % 60, 10);
      } else if (isBeforeAppointment) {
        /**
         * |    00      |    00      |
         * | pickerHour | pickerMin  |
         * |  nowHour   |   nowMin   |
         * |            |            |
         * |    24      |     00     |
         */
        // 预约时间小与当前时间
        const ONE_DAY_TIME = 24 * 60; // 此处需要完善
        countMins = ONE_DAY_TIME - countRealTime + countSelectTime;
        hour = parseInt(countMins / 60, 10);
        min = parseInt(countMins % 60, 10);
      } else {
        // 默认 预约时间大于等于当前时间
        countMins = countSelectTime - countRealTime;
        hour = parseInt(countMins / 60, 10);
        min = parseInt(countMins % 60, 10);
      }
      // 判断是否有预约
      if (countMins > this.ModeTime) {
        this.setTmrHour({ value: hour });
        this.setTmrMin({ value: min });
        this.handleSetStTmr({ value: countMins });
      } else {
        this.setTmrHour({ value: 0 });
        this.setTmrMin({ value: 0 });
        this.handleSetStTmr({ value: 0 });
      }
    },
  },
};
</script>

<style lang="scss">
@import '../assets/sass/index.scss';
// 滑轮样式，在局部style里无法生效，所以放这里
.picker.appointment{
  width: 100%;
  // margin-top: 5%;
}

@media screen and (min-width: 320px) and (max-width:375px){
  .picker.appointment{
    margin-top: 0;
  }
}
.picker.appointment .slot1{
  padding-left: 20%;
  font-family: appleUltralight
}
.picker.appointment .slot2{
  position: absolute;
  top: 20%;
  left: 50%;
  width: 1rem;
  margin-left: -0.5rem;
  font-family: appleUltralight;
  div{
    @include font-size(60px);
  }
}
.picker.appointment .slot3{
  padding-right: 20%;
  font-family: appleUltralight;
}
.picker.appointment .slot4{
  position: absolute;
  top: 50%;
  right: 18%;
  div{
    @include font-size(20px);
  }
}
.picker.appointment .picker-item{
  color: #c3c3c3;
  @include font-size(40px);
}
.picker.appointment .picker-item.picker-selected {
  color: #404657;
  @include font-size(55px);
}
.picker.appointment .break{
  display: flex;
  justify-content: center;
  align-items: center;
  @include font-size(60px);
}
</style>

<style lang="scss">
.picker-container {
  position: relative;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1rem;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin-top: 55px;
    height: 55px;
    width: 100%;
    background: #fff;
  }
  .van-picker {
    display: flex;
    flex: 1;
    background-color: initial;
    &:first-child {
      position: absolute;
      top: 0;
      left: 10%;
      .van-picker-column__item {
        font-size: 1.5rem;
      }
    }
    &:last-child {
      flex-basis: 30%;
      max-width: 50%;
      margin: 0 auto;
      .van-picker-column__item {
        font-size: 3rem;
      }
      .van-picker-column__item--selected {
        font-size: 3.5rem;
      }
    }
    .van-picker__columns {
      display: flex;
      flex: 1;
      .van-picker-column {
        z-index: 3;
      }
      .van-picker-column__item--selected {
        color: #404657 !important;
      }
      .van-picker-column__item {
        color: #c3c3c3;
        font-family: appleUltralight;
      }
      .van-picker__mask {
        background-position: center;
        background-image: initial;
      }
      .van-picker__frame {
        &:after {
          border-width: 0;
        }
      }
    }
  }
}
.van-picker.van-datetime-picker {
  .van-picker__mask::before {
    content: ":";
    position: absolute;
    top: 35%;
    left: 50%;
    font-size: 3rem;
    color: #404657;
    font-weight: lighter;
    font-family: appleLight;
  }
  .van-picker__mask::after {
    content: "";
  }
}

.van-cell {
  background-color: initial !important;
  padding: 1rem 2rem;
}
.van-cell__title, .van-cell__value {
  font-size: 1.5rem;
  font-family: appleLight;
}
.van-collapse-item__content {
  padding: 0;
  background-color: initial !important;
}
</style>

<style scoped>
.appointment-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  bottom: constant(safe-area-inset-bottom);
  bottom: env(safe-area-inset-bottom);
  left: 0;
}

.time-picker-center-bg {
  position: absolute;
  margin-top: 55px;
  height: 55px;
  width: 100%;
  background: #fff;
}

.appointment-container {
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  background: #f4f4f4;
}
.appointment-body.yellow-theme .select-items .item {
  color: #f6b039;
  border: 1px solid #f6b039;
}
.appointment-body.yellow-theme .select-items .item.active {
  color: #ffffff;
  background: #f6b039;
}
.appointment-body.yellow-theme .select-items .item.forbided {
  border: 1px solid #cdcdcd;
  color: #cdcdcd;
  background: #f4f4f4;
}
.appointment-body {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.title {
  padding: 1rem 2rem;
}
.item-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.select-items-container {
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
}
.select-items ~ .select-items {
  border-top: 1px solid #dbdbdb;
}
.select-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}
.select-items .item-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.select-items .item {
  width: 6rem;
  height: 2rem;
  color: #fff;
  line-height: 2rem;
  font-size: 1.3rem;
  border-radius: 5rem;
  white-space: nowrap;
  text-align: center;
  border: 1px solid #5eb2e8;
  color: #5eb2e8;
}
.select-items .item {
  margin-right: 0.9rem;
}
.select-items .item:last-child {
  margin-right: 0;
}
.select-items .item.active {
  background: #5eb2e8;
  color: #fff;
}
.select-items .item.forbided {
  border: 1px solid #cdcdcd;
  color: #cdcdcd;
  background: #f4f4f4;
}
.font-title {
  font-size: 1.5rem;
  color: #404657;
  font-family: appleLight;
}
.btn-container {
  display: flex;
  flex: row;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding: 2rem 2rem;
  background: #f4f4f4;
}
.btn-container .gree-btn {
  display: flex;
  flex-basis: 38%;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  line-height: 3.5rem;
  background: #fff;
  box-shadow: 0 2px 13px rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
}
.btn-container .gree-btn:active {
  background: #f8f8f8;
}

</style>
