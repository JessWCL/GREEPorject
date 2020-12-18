<template>
  <gree-view>
    <gree-page 
      no-navbar
      class="page-appointment">
      <gree-header>
        {{ $language("appointment.advance_timer") }}
        <a
          slot="right"
          @click="save"
        >{{ $language("home.btnSave") }}</a>
      </gree-header>
      <div id="TimerSelector"></div>
      <gree-row v-show="dataObject.AppTimer">
        <gree-col>{{ detailTime }}</gree-col>
      </gree-row>
      <gree-action-bar :actions="actionBarData"></gree-action-bar>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Row, Col, ActionBar, Toast } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { SET_DATA_OBJECT, SET_SUBSCRIBE_TIMER, SEND_CTRL, SET_TIMER_VALUE, SET_LOADING } from '@/store/types';
import { AppendZero } from '@/utils';
import {
  showToast,
  sendDataToDevice,
  getAllTimerList,
  showLoading,
  hideLoading
} from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [ActionBar.name]: ActionBar
  },
  data() {
    return {
      instanceMobiScroll: undefined, // mobiscroll实例
      pickerData: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24
      ],
      detailTime: '',
      actionBarData: [
        {
          text: this.$language('appointment.timerDeleteBtn'),
          onClick: this.handleClick
        }
      ],
      isOnWheelAnimation: false
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      mac: state => state.mac,
      subscribeTimer: state => state.subscribeTimer,
      timerValue: state => state.timerValue,
    })
  },
  watch: {
    'dataObject.AppTimer': {
      handler(val) {
        if (val === 1) {
          this.setTimeLabel();
        } else {
          this.setSubscribeTimer(0);
          this.setTimerValue({hr: 0, min: 0});
          this.detailTime = '';
          this.$nextTick(() => {
            this.instanceMobiScroll.setVal(1);
          });
        }
      },
      immediate: true
    },
    timerValue: {
      handler(val) {
        if (this.dataObject.AppTimer === 0) {
          this.detailTime = '';
        } else {
          if (!val) {
            this.detailTime = '';
            return;
          }
          const labelStatus = this.dataObject.Pow
            ? this.$language('appointment.timerOff')
            : this.$language('appointment.timerOn');
          this.detailTime = (val.hr === 0 && val.min === 0) ? '' : `${AppendZero(val.hr)}:${AppendZero(val.min)}${labelStatus}`;
        }
      },
      deep: true
    }
  },
  mounted() {
    /* eslint no-undef: 0 */
    const self = this;
    this.instanceMobiScroll = mobiscroll.scroller('#TimerSelector', {
      theme: 'ios',
      display: 'inline',
      layout: 'liquid',
      showLabel: true,
      height: document.documentElement.clientHeight <= 568 ? 110 : 140,
      rows: 3,
      wheels: [
        [
          {
            label: this.dataObject.Pow
              ? this.$language('appointment.timerOffUnit')
              : this.$language('appointment.timerOnUnit'),
            data: this.pickerData
          }
        ]
      ],
      onWheelAnimationStart: function () {
        self.isOnWheelAnimation = true;
      },
      onWheelAnimationEnd: function (event, inst) {
        self.isOnWheelAnimation = false;
      }
    });
    showLoading();
    getAllTimerList(null, this.mac).then(_res => {
      hideLoading();
      const res = JSON.parse(_res);
      if (res && res[0]) {
        this.instanceMobiScroll.setVal(this.getScrollerIndex(res[0]));
      } else {
        this.instanceMobiScroll.setVal(1);
      }
    }).catch(err => {
      hideLoading();
      return err;
    });
  },
  methods: {
    ...mapMutations({
      setDataObject: SET_DATA_OBJECT,
      setSubscribeTimer: SET_SUBSCRIBE_TIMER,
      setTimerValue: SET_TIMER_VALUE,
      showLoading: SET_LOADING
    }),
    ...mapActions({
      sendCtrl: SEND_CTRL
    }),
    getScrollerIndex(timerVal) {
      const timerEnable = timerVal.enable;
      const timerHour = timerVal.hr;
      const timerMin = timerVal.min;
      if (timerEnable == 0)// 预约定时有效
      {
        // 当前时间
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();
        let index = timerHour - hour;
        const indexMin = timerMin - min;
        // index  = index<1?index+24:index;
        if (index === 0) { // 处理24小时与0小时
          if (indexMin < 0) {
            index = 24;
          } else if (indexMin === 0) {
            index = 1;
          } else {
            index = 1;
          }
        } else {
          if (indexMin < 0) {
            index -= 1;
          }
          if (index < 0) {
            index += 24;
          }
        }
        return index;
      } 
      return 1;
    },
    setTimeLabel() {
      getAllTimerList(null, this.mac)
        .then(_res => {
          const res = JSON.parse(_res);
          if (res && res[0]) {
            this.setTimerValue({hr: res[0].hr, min: res[0].min});
            const labelStatus = this.dataObject.Pow
              ? this.$language('appointment.timerOff')
              : this.$language('appointment.timerOn');
            this.detailTime = `${AppendZero(res[0].hr)}:${AppendZero(res[0].min)}${labelStatus}`;
          }
        })
        .catch(err => {
          return err;
        });
    },
    save() {
      if (this.isOnWheelAnimation) {
        showToast('正在选择定时，请稍后保存', 0);
        return;
      }
      console.log('save timer');
      const curPickerVal = this.instanceMobiScroll.getVal();
      let hr = this.$dayjs().hour() + curPickerVal;
      let min = this.$dayjs().minute();
      if (hr >= 24) {
        hr -= 24;
      }
      if (curPickerVal === 24) {
        min -= 1;
        if (min < 0) {
          min = 59;
          hr -= 1;
          if (hr < 0) {
            hr = 23;
          }
        }
      }
      // 上位机协议默认值
      const DataObject = {
        t: 'setT',
        id: 1,
        name: '',
        enable: 0,
        hr,
        min,
        sec: 0,
        tz: 8,
        week: [0, 0, 0, 0, 0, 0, 0],
        cmd: [
          {
            mac: [this.mac],
            opt: ['Pow'],
            p: [0]
          }
        ]
      };
      if (!this.dataObject.Pow) {
        // 定时开机
        DataObject.cmd[0].p = [1];
      }
      console.log(JSON.stringify(DataObject));
      showLoading();
      sendDataToDevice(this.mac, JSON.stringify(DataObject), false)
        .then(_res => {
          hideLoading();
          const res = JSON.parse(_res);
          if (res.r === 200) {
            this.setDataObject({ AppTimer: 1 });
            this.setSubscribeTimer(curPickerVal);
            this.setTimeLabel();
            try {
              showToast(this.$language('appointment.timerSaveSuccess'), 1);  
            } catch (err) {
              Toast.info(`${this.$language('appointment.timerSaveSuccess')}`);
            }
          }
        })
        .catch(err => {
          hideLoading();
          console.log(`err:${err}`);
          return err;
        });
    },
    handleClick() {
      if (this.isOnWheelAnimation) {
        showToast('正在选择定时，请稍后删除', 0);
        return;
      }
      console.log('delete timer');
      const DataObject = {
        t: 'deleteT',
        id: 1
      };
      showLoading();
      sendDataToDevice(this.mac, JSON.stringify(DataObject), false)
        .then(_res => {
          hideLoading();
          const res = JSON.parse(_res);
          if (res.r === 200) {
            this.setDataObject({ AppTimer: 0 });
            this.setSubscribeTimer(0);
            this.setTimerValue({hr: 0, min: 0});
            this.detailTime = '';
            this.instanceMobiScroll.setVal(1);
            try {
              showToast(this.$language('appointment.timerDeleteSuccess'), 1);
            } catch (err) {
              Toast.info(`${this.$language('appointment.timerDeleteSuccess')}`);
            }
          }
        })
        .catch(err => {
          hideLoading();
          return err;
        });
    }
  }
};
</script>
