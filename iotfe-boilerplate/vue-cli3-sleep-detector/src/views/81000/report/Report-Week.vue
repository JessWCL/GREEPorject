<template>
  <div class="report-week">
    <report-head
      :param-list="paramList"
      :score="score"
      :date-text="dateText"
      v-on:dateBoxClick="dateBoxClick"
    ></report-head>

    <div class="report-body">

      <!-- 周报图表 -->
      <reportWeekChart></reportWeekChart>

      <!-- 睡眠建议 -->
      <!-- <report-section
        :title="'睡眠建议'"
        :title-icon="imgAssets.sleepAdvice"
        class="sleep-advice"
      >
        <p>根据您的睡眠报告分析......运动可通过缓解白天所累积的紧张并使得身心放松而增进睡眠。常参加体育锻炼者比不常锻炼者睡得更好更深，但你不必刻意追求过度疲劳。每周至少三天，每次20－３0分钟的散步、工作、游泳或骑车应是你的目标－－有益于心血管的最低限度。但是别等到太晚才运动。晚上你应静下来而非锻炼出汗。别指望清晨的锻炼对白天累积的紧张神经有任何影响。理想的运动时间是下午晚些时候或傍晚早些时候此时体育锻炼可帮助你从白天的压  力调整到晚上的愉快。  </p>
      </report-section> -->
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
        @hide="calendarOnHide"
      ></gree-calendar>
    </div>
  </div>
</template>

<script>
import { Calendar, Icon, Dialog, } from 'gree-ui';
import reportHead from './Report-Head';
import reportWeekChart from './Report-Week_Chart.vue';
import reportSection from './Report-Section';
import { mapState, mapActions } from "vuex";
import dayjs from 'dayjs';

const imgAssets = {
  sleepStage: require('../../../assets/img/report-sleep.png'),
  sleepAdvice: require('../../../assets/img/report-advice.png'),
  triple: require('../../../assets/img/triple.jpg'),
};


export default {
  name: 'ReportWeek',
  components: {
    reportHead,
    reportWeekChart,
    reportSection,
    [Calendar.name]: Calendar,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      todayDate: new Date(),
      selectDate: new Date(),
      // 日历显示
      showCalendar: false,
      // 日历初次显示
      showCalendarInit: false,
      imgAssets,
      showDiv:false
    };
  },
  computed: {
    ...mapState({
      weekReportData: state => state.myModule.weekReportData,
      mac: state => state.mac
    }),
    score() {
      return this.weekReportData.score;
    },
    sleepStatus() {
      const score = this.weekReportData.score;
      if (!score) {
        return '- -'
      } else if (score < 60) {
        return '差';
      } else if (score > 80)  {
        return '好';
      } else if (score >= 60 && score <= 80)  {
        return '一般';
      } else {
        return '--';
      }
    },
    startDate() {
      return this.getWeekDate(this.selectDate).startDate;
    },
    endDate() {
      return this.getWeekDate(this.selectDate).endDate;
    },
    dateText() {
      return `${dayjs(this.startDate).format('YYYY/MM/DD')} - ${dayjs(this.endDate).format('YYYY/MM/DD')}`
    },
    paramList() {
      return [{
        value: `${!this.weekReportData.heartRate ? '- -' : this.weekReportData.heartRate}`,
        unit: ' 次 / 分',
        desc: '平均心率',
      }, {
        value: !this.weekReportData.breatheRate ? '- -' : this.weekReportData.breatheRate,
        unit: ' 次 / 分',
        desc: '平均呼吸',
      }, {
        value: this.sleepStatus, // TODO:此处有问题
        unit: '',
        desc: '睡眠状态',
      }, {
        value: [!this.weekReportData.inBedTime ? '-' : (this.weekReportData.inBedTime / 60 & 1), !this.weekReportData.inBedTime ? '-' : this.weekReportData.inBedTime % 60],
        unit: ['时', '分'],
        desc: '平均睡眠',
      }];
    },
    // 日历参数
    calendarComputed() {
      const maxDate = new Date(this.todayDate);
      const minDate = new Date(this.todayDate);
      const defaultDate = new Date(this.todayDate);
      minDate.setFullYear(minDate.getFullYear() - 1);
      // maxDate.setDate(maxDate.getDate() - 1);
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
  },
  watch: {
    // 日历初次显示
    showCalendar(val) {
      if (val) {
        if (!this.showCalendarInit) this.showCalendarInit = true;
      }
    }
  },
  created() {
    this.createdInit();
  },
  mounted() {
    // 初始化查当周
    this.getWeekReport({paramsStr: {startAt: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), mac: this.mac}});
  },
  methods: {
    ...mapActions({
      getWeekReport: 'GET_WEEK_REPORT'
    }),
    createdInit() {
      /* const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() - 1);
      this.selectDate = dateObj; */
    },
    dateBoxClick() {
      console.log(this.showCalendar);
      this.showCalendar = !this.showCalendar;
      setTimeout(() => {
        this.showDiv = true;
      }, 100);
    },
    // 获取本周头尾
    getWeekDate(date) {
      const dateObj = date instanceof Date ? date : this.selectDate;
      
      const day = dateObj.getDay();
      const startDate = new Date(dateObj);
      const startDifference = day === 0 ? -6 : -day + 1;
      startDate.setDate(startDate.getDate() + startDifference);

      let endDate = new Date(this.selectDate);
      const endDifference = day === 0 ? 0 : 7 - day;
      endDate.setDate(endDate.getDate() + endDifference);

      if (endDate > this.todayDate) endDate = new Date(this.todayDate);

      return {
        startDate,
        endDate,
      };
    },
    // 日历确定
    calendarOnConfirm() {
      console.log('calendarOnConfirm');
      // console.log(this.$refs.reportCalendar);
      console.log(this.$refs.reportCalendar.currentDate.toLocaleString());
      this.selectDate = this.$refs.reportCalendar.currentDate;
      this.showCalendar = false;
      this.showDiv = false;
      console.log('%c 选择的日期', 'color: red;',dayjs(this.selectDate).format('YYYY-MM-DD'));
      this.getWeekReport({paramsStr: {startAt: dayjs(this.selectDate).format('YYYY-MM-DD'), mac: this.mac}});
    },
    // 日历隐藏
    calendarOnHide() {
      console.log('calendarOnHide');
      // this.showCalendar = false;
      this.showDiv = false;
    },
  },
};
</script>

<style lang="scss">
.report-week {
  .report-head  {
    .date-select-box {
      .date-select {
        padding: 0 20px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.gree-popup {
  position: absolute !important;
}
</style>