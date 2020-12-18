<!--
 * @Author: Jerry-Rain
 * @Date: 2020-09-14 14:02:00
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-10-23 14:12:27
 * @Description: 这个是日报告页面，不包含图表的
 -->
<template>
  <div class="report-day">
    <report-head
      :param-list="paramList"
      :score="score"
      :date-text="dateText"
      v-on:dateBoxClick="dateBoxClick"
    ></report-head>

    <div class="report-body">

      <!-- 睡眠阶段 -->
      <div class="report-section sleep-stage">
        <div class="report-section-head">
          <span><img :src="sleepStage.icon" alt=""></span>
          <h4>睡眠</h4>
        </div>
        <div class="report-section-body">
          <div class="sleep-stage-chart">
            <p>
              睡眠时长 
              <span>
                {{ dayReportData.enterSleepDuration === null ? '-' : ((dayReportData.enterSleepDuration / 60) & 1)}}
                <i>时</i>
                {{ dayReportData.enterSleepDuration === null ? '-' : (dayReportData.enterSleepDuration % 60) }}
                <i>分</i>
              </span>
            </p>
            <div class="sleep-stage-chart-bar">
              <div
                v-for="(item, index) in sleepStatusList"
                :key="index"
                :style="{
                  height: '30px',
                  width: `${item.rate}%`,
                  background: item.color
                }"
              ></div>
            </div>
            <div class="sleep-stage-chart-footer">
              <span>入睡 <i>{{ dayReportData.onBedAt | formatDate }}</i></span>
              <span>起床 <i>{{ dayReportData.leaveBedAt | formatDate }}</i></span>
            </div>
          </div>
          <div class="sleep-stage-parameter">
            <dl v-for="(item, i) in sleepStage_parameters" :key="i" @click="item.onclick ? item.onclick(item.text) : '';">
              <dt>{{ item.dt }}</dt>
              <dd>
                <em :class="item.class"></em>{{ item.text }}
                <gree-icon v-if="item.icon" :name="item.icon" size="sm" color="#5ac4f5"></gree-icon>
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <!-- 日报图表 -->
      <reportDayChart></reportDayChart>

      <!-- 睡眠建议 -->
      <!-- <report-section
        :title="'睡眠建议'"
        :title-icon="imgAssets.sleepAdvice"
        class="sleep-advice"
      >
        <p>运动可通过缓解白天所累积的紧张并使得身心放松而增进睡眠。常参加体育锻炼者比不常锻炼者睡得更好更深，但你不必刻意追求过度疲劳。每周至少三天，每次20－３0分钟的散步、工作、游泳或骑车应是你的目标－－有益于心血管的最低限度。但是别等到太晚才运动。晚上你应静下来而非锻炼出汗。别指望清晨的锻炼对白天累积的紧张神经有任何影响。理想的运动时间是下午晚些时候或傍晚早些时候此时体育锻炼可帮助你从白天的压  力调整到晚上的愉快。  </p> -->
        <!-- <div><img :src="imgAssets.triple" alt=""></div> -->
      <!-- </report-section> -->
    </div>

    <!-- 日历 -->
    <div class="popSolute" v-show="showDiv">
      <gree-calendar
        title="选择日期"
        v-model="showCalendar"
        v-if="showCalendarInit"
        ref="reportCalendar"
        :type="calendarComputed.type"
        :color="calendarComputed.color"
        :round="true"
        :min-date="calendarComputed.minDate"
        :max-date="calendarComputed.maxDate"
        :default-date="calendarComputed.defaultDate"
        :position="calendarComputed.position"
        :poppable="calendarComputed.poppable"
        :show-confirm="calendarComputed.showConfirm"
        :show-mark="calendarComputed.showMark"
        @confirm="calendarOnConfirm"
        @select="calendarOnSelect"
        @hide="calendarOnHide"
      ></gree-calendar>
    </div>
  </div>
</template>

<script>
import { Calendar, Icon, Dialog, } from 'gree-ui';
import { mapState, mapActions } from "vuex";
import reportHead from './Report-Head';
import reportDayChart from './Report-Day_Chart';
import reportSection from './Report-Section';
import dayjs from 'dayjs';

const imgAssets = {
  sleepStage: require('../../../assets/img/report-sleep.png'),
  sleepAdvice: require('../../../assets/img/report-advice.png'),
  triple: require('../../../assets/img/triple.jpg'),
};

export default {
  name: 'ReportDay',
  components: {
    reportHead,
    reportDayChart,
    reportSection,
    [Calendar.name]: Calendar,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
  },
  filters: {
    formatDate(params) {
      return params ? dayjs(params).format('HH:mm') : '- -';
    },
  },
  data() {
    return {
      todayDate: dayjs(),
      selectDate: dayjs().subtract(1, 'day'),
      // 日历显示
      showCalendar: false,
      // 日历初次显示
      showCalendarInit: false,
      imgAssets,
      sleepStatusList: [], // 睡眠状态碎片图
      showDiv: false
    };
  },
  computed: {
    ...mapState({
      dayReportData: state => state.myModule.dayReportData.left,
      score: state => state.myModule.dayReportData.left.score,
      mac: state => state.mac
    }),
    // 体动文字
    turnOverTxt() {
      const value = this.dayReportData.turnOver / this.dayReportData.enterSleepDuration;
      if (!this.dayReportData.turnOver) {
        return '- -'
      } else if (value < 0.2) {
        return '弱';
      } else if (value > 0.5) {
        return '强';
      } else if (value >= 0.2 && value <= 0.5)  {
        return '中';
      } else {
        return '- -';
      }
    },
    // 参数显示
    paramList() {
      return [{
        value: this.dayReportData.meanHeartRate || '- -',
        unit: ' 次 / 分',
        desc: '平均心率',
      },
      {
        value: this.turnOverTxt,
        unit: '',
        desc: '体动',
      }, {
        value: this.dayReportData.meanBreathRate || '- -',
        unit: ' 次 / 分',
        desc: '呼吸频率',
      }];
    },
    // 年月日格式化
    dateText() {
      return `${dayjs(this.selectDate).format('YYYY/MM/DD')}`
    },
    // 日历参数
    calendarComputed() {
      const maxDate = new Date(this.todayDate);
      const minDate = new Date(this.todayDate);
      const defaultDate = new Date(this.todayDate);
      minDate.setFullYear(minDate.getFullYear() - 1);

      // defaultDate.setDate(defaultDate.getDate() - 1);
      console.log(`minDate:${minDate}`);
      console.log(`maxDate:${maxDate}`);
      return {
        type: 'single',
        color: '#008def',
        round: true,
        minDate,
        maxDate,
        defaultDate,
        poppable: true,
        position: 'bottom',
        showConfirm: true,
        showMark: true,
      };
    },
    sleepStage() {
      return {
        icon: imgAssets.sleepStage,
      };
    },
    sleepStage_parameters() {
      return [{
        dt: this.formatDuration(this.dayReportData.wakeDuration),
        class: 'awake',
        text: '清醒',
      }, {
        dt: this.formatDuration(this.dayReportData.nrDuration),
        class: 'light-sleep',
        text: '浅睡',
      }, {
        dt: this.formatDuration(this.dayReportData.deepDuration),
        class: 'deep-sleep',
        text: '深睡',
      }, {
        dt: this.formatDuration(this.dayReportData.remDuration),
        class: 'REM',
        text: 'REM',
        icon: 'question',
        onclick: this.sleepStage_params_click,
      }, {
        dt: this.formatDuration(this.dayReportData.leaveBedDuration),
        class: 'leave',
        text: '离床',
      }, ];
    },
  },
  watch: {
    // 日历初次显示
    showCalendar(val) {
      if (val) {
        if (!this.showCalendarInit) this.showCalendarInit = true;
      }
    }
  },
  async created() {
    // this.initColorChart(); // 初始化时间碎片图
    await this.dealData();
  },
  methods: {
    ...mapActions({
      getDayReport: 'GET_DAY_REPORT'
    }),
    async dealData(date) {
      if (date) {
        await this.getDayReport({paramsStr: {startAt: date, mac: this.mac}}); // 初始化查当日
      } else {
        await this.getDayReport({paramsStr: {startAt: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), mac: this.mac}}); // 初始化查当日
      }
      this.initColorChart(); // 初始化时间碎片图
    },
    dateBoxClick() {
      this.showCalendar = !this.showCalendar;
      setTimeout(() => {
        this.showDiv = true;
      }, 100);
    },
    // 日历确定
    calendarOnConfirm() {
      console.log('calendarOnConfirm');
      console.log(this.$refs.reportCalendar);
      console.log(this.$refs.reportCalendar.currentDate.toLocaleString());
      this.selectDate = this.$refs.reportCalendar.currentDate;
      console.log('%c 选择的日期', 'color: red;',dayjs(this.selectDate).format('YYYY-MM-DD'));
      this.showCalendar = false;
      this.showDiv = false
      // TODO:接口请求数据
      this.dealData(dayjs(this.selectDate).format('YYYY-MM-DD'));
    },
    // 日历选择
    calendarOnSelect(dateObj) {
      // console.log('calendarOnSelect');
    },
    // 日历隐藏
    calendarOnHide() {
      console.log('calendarOnHide');
      this.showCalendar = false;
      this.showDiv = false;
    },
    // 睡眠阶段参数点击
    sleepStage_params_click(text) {
      // console.log('sleepStage_params_click');
      // console.log(text);
      switch (text) {
        case 'REM':
          console.log('REM');
          this.showAlert({
            title: 'REM说明',
            content: `
              REM睡眠，快速眼球运动(rapid eyes movement)亦称异相睡眠（Para－sleep)或者也叫快相睡眠，眼球在此阶段时会呈现不由自主的快速移动。
              <br />
              <br />
              在这个阶段，大脑神经元的活动与清醒的时候相同。多数在醒来后能够回忆的栩栩如生的梦都是在REM睡眠发生的。它是全部睡眠阶段中最浅的，在REM睡眠时醒过来的人会不同于在其他睡眠阶段的情形，而是充满警觉心并且精神饱满。
              <br />
            `,
          });
          break;
        default:
          break;
      }
    },
    // 弹出警告dialog
    showAlert(userData) {
      const defaultData = {
        title: 'title',
        content: 'content',
        cancelText: '取消',
        confirmText: '确定',
        onConfirm: () => console.log('[Dialog.alert] confirm clicked')
      };
      const data = Object.assign({}, defaultData, userData);
      Dialog.alert(data);
    },
    // 处理碎片图宽度 和 颜色
    widthAndColor({ inBedStatus, stages, times } = sleepStage) {
      const colorList = ['#FFD33B', '#72B0FE', '#008DEF', '#7BE3E1', '#FFD33B'];
      const totalLong = times[times.length - 1] - times[0];
      const rateList = [];
      for (let i = 1, len = times.length; i < len; i++ ) {
        const timerLong = times[i] - times[i-1];
        const rate = (100 * timerLong / totalLong).toFixed(5);
        const status = inBedStatus[i];
        const color = colorList[stages[i]];
        const obj = {rate, status, color};
        rateList.push(obj);
      }
      return rateList;
    },
    // 初始化睡眠碎片图：没有碎片数据则显示完整的图
    initColorChart() {
      try {
        this.sleepStatusList = this.widthAndColor(this.dayReportData.sleepStage);
      } catch (error) {
        console.log('%c ??????', 'color: red;', error);
        this.sleepStatusList = [{rate: 100, status: 0, color: '#f4f4f4'}];
      }
    },
    // 时长格式化-时 -分
    formatDuration(params = 0) {
      if (!params) {
        return '-时 -分'
      }
      let time = params;
      if (params instanceof String) time = Number(time, 10);

      const hour = time / 360 | 1;
      const minute = time % 60;

      let result = ``;
      return `${hour}时${minute}分`;
    },
  },
};
</script>

<style lang='scss' scoped >
@import '../../../assets/scss/sleep-stage.scss';
.gree-popup {
  position: absolute !important;
}
  .report-section {
    border-top: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
    margin-bottom: 18px;
    .report-section-head {
      background-color: #fff;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      height: 126px;
      padding: 0 60px;
      box-sizing: border-box;
      border-bottom: 1px solid #f3f3f3;
      span {
        display: block;
        width: 52px;
        height: 52px;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      h4 {
        font-size: 46px;
      }
    }
    .report-section-body {
      background-color: #fff;
      padding: 36px 60px;
      border-top: 1px solid #f5f5f5;
    }
  }
  
  .report-section.sleep-stage {
    .report-section-body {
      .sleep-stage-chart {
        p {
          font-size: 40px;
          margin-bottom: 20px;
          span {
            margin-left: 10px;
            font-size: 50px;
            i {
              font-size: 40px;
            }
          }
        }
        .sleep-stage-chart-bar {
          margin: 24px auto;
          display: flex;
          height: 80px;
          border-radius: 10px;
          overflow: hidden;
          justify-content: space-evenly;
          // box-shadow: 0 1px 2PX 0px rgba(0,0,0,.3);
          div {
            flex: 1 1 auto;
            height: 80px;
            background-color: #ddd;
            @include stage-bg-color;
          }
        }
        .sleep-stage-chart-footer {
          font-size: 40px;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          color: #aaa;
        }
      }
      .sleep-stage-parameter {
        margin-top: 65px;
        display: flex;
        flex-flow: row wrap;
        counter-reset: section;
        dl {
          width: 20%;
          box-sizing: border-box;
          // border: 1px solid #000;
          font-size: 36px;
          margin-top: 40px;
          text-align: center;
          flex-basis: 1;
          /* &:nth-last-of-type(3n + 0) {
            text-align: right;
          } */
          &:nth-last-of-type(3n + 1) {
            width: 60%;
          }
          dt {
            font-size: 40px;
            margin-bottom: 5px;
          }
          dd {
            font-size: 40px;
            em {
              display: inline-block;
              width: 20px;
              height: 20px;
              border-radius: 100%;
              margin-right: 20px;
              @include stage-bg-color;
            }
          }
        }
      }
    }
  }
  .report-section.sleep-advice {
    /deep/ .report-section-body {
      // background-color: #fac;
      padding-bottom: 40px;
      p {
        color: #49c4ff;
        font-size: 38px;;
      }
      img {
        width: 100%;
        height: auto;
      }
    }
  }
</style>

<style lang="scss">
.gree-calendar__header-subtitle {
    display: none;
}
.popSolute {
  position: fixed;
  z-index: 100000;
  top: 0;
  height: 100%;
  width: 100%;
  background: #fbfbfb00;
}
.gree-dialog {
  .gree-dialog-content {
    width: 90%;
    margin: 0 auto;
  }
}
.report-day {
  .gree-calendar__popup {
    .gree-calendar__selected-day {
      border-radius: 100%;
    }
    .gree-calendar__weekday:first-child, .gree-calendar__weekday:last-child {
      color: inherit;
    }
  }
}
</style>
