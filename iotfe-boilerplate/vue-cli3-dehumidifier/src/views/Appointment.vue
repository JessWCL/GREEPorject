<template>
  <gree-view>
    <gree-page 
      no-navbar
      class="page-appointment"
    >
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
  getAllTimerList
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
      timeDeviation: 8 * 1000 // 新增标记，默认相差时间8s
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      mac: state => state.mac,
      subscribeTimer: state => state.subscribeTimer,
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
  },
  mounted() {
    /* eslint no-undef: 0 */
    this.getDevTime();
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
      ]
    });
    this.showLoading(true);
    getAllTimerList(null, this.mac).then(_res => {
      this.showLoading(false);
      console.log('_res:', _res);
      const res = JSON.parse(_res);
      if (res && res[0]) {
        this.instanceMobiScroll.setVal(this.getScrollerIndex(res[0]));
      } else {
        this.instanceMobiScroll.setVal(1);
      }
    }).catch(err => {
      this.showLoading(false);
      console.log('getTimerList Error:', err);
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
      if (timerEnable == 0)//预约定时有效
      {
        //当前时间
        var date     = new Date();
        var hour     = date.getHours();
        var min      = date.getMinutes();
        var index    = timerHour-hour;
        var indexMin = timerMin -min;
        // index  = index<1?index+24:index;
        if(index === 0) {//处理24小时与0小时
          if (indexMin < 0) {
            index = 24;
          } else if (indexMin === 0) {
            index = 1;
          } else {
            index = 1;
          }
        } else {
          if (indexMin < 0) {
            index = index - 1;
          }
          if (index < 0) {
            index = index + 24;
          }
        }
        return index;
      } else {
        return 1;
      }
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
      const curPickerVal = this.instanceMobiScroll.getVal();
      let hr = this.$dayjs().hour() + curPickerVal;
      let min = this.$dayjs().minute();
      if (hr >= 24) {
        hr = hr - 24;
      }
      if (curPickerVal === 24) {
        min = min - 1;
        if (min < 0) {
          min = 59;
          hr = hr - 1;
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
        hr: hr,
        min: min,
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
      this.showLoading(true);
      sendDataToDevice(this.mac, JSON.stringify(DataObject), false)
        .then(_res => {
          this.showLoading(false);
          console.log(`save timer result: ${_res}`);
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
          this.showLoading(false);
          console.log('err:'+err);
          return err;
        });
    },
    handleClick() {
      console.log('delete');
      const DataObject = {
        t: 'deleteT',
        id: 1
      };
      this.showLoading(true);
      sendDataToDevice(this.mac, JSON.stringify(DataObject), false)
        .then(_res => {
          this.showLoading(false);
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
          this.showLoading(false);
          return err;
        });
    },
    getDevTime(){
      console.log('同步设备时间');
      let sJson = "{\"t\":\"status\",\"mac\":\"" + this.mac + "\"," +"\"cols\":[\"time\"]}";
      sendDataToDevice(this.mac, sJson, false).then((result) => {
        console.log(`result: ${result}`);
        console.log("设备时间parseUrlData"+JSON.stringify(result));
        let dev_date = "";
        if (result.indexOf('\"') > -1) {
          // 包含斜杠
          dev_date = new Date(Date.parse(JSON.parse(result)[0].replace(/-/g,   "/")));
        }else{
          dev_date = new Date(JSON.parse(result));
        }
        //查到的时间与实际的手机时间对比
        var date = new Date();
        console.log("设备时间parseUrlData" + "dev_hour:" + dev_date.getTime() + "phone_hour:" + date.getTime());
        this.timeDeviation = dev_date.getTime() - date.getTime(); // 时间差
        // 改为毫秒时间判断
        if (Math.abs(dev_date.getTime() - date.getTime()) > 1*60*1000) {  
          // 同步时间
          this.syncTime(date);
          console.log("当前时间date:"+date);
        }
      }).catch(err => console.log(err));
    },
    syncTime(date){
      console.log("执行sendTime");
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth()+1;
      var strDate = date.getDate();
      var hour = date.getHours();
      hour = (hour > 0 && hour <= 9) ? `0${hour}` : hour;
      var minutes = date.getMinutes();
      minutes = (minutes > 0 && minutes <= 9) ? `0${minutes}` : minutes;
      var seconds = date.getSeconds();
      seconds = (seconds > 0 && seconds <= 9) ? `0${seconds}` : seconds;
      if (month >= 1 && month <= 9) {
          month = `0${month}`;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = `0${strDate}`;
      }

      var currentDate = "\""+date.getFullYear() + seperator1 + month +
          seperator1 + strDate +" "+ hour + seperator2 + minutes
          + seperator2 + seconds+"\"";
      var jsonTime;
      jsonTime = "{\"opt\":[\"time\"],\"p\":[" + currentDate + "],\"t\":\"cmd\"}";
      console.log("当前jsonTIme:"+jsonTime);
      sendDataToDevice(this.mac, jsonTime, false).then((result) => {
        if (result != ""){
          // navigator.PluginInterface.showToast(lang.timerSynchronizationSuccess,0);
          console.log('同步成功');
          this.timeDeviation = 8*1000;
        }else{
          // navigator.PluginInterface.showToast(lang.timerSynchronizationFailure,0);
          console.log('同步失败');
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>
