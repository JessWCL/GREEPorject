<template>
  <div class="report-month">
    <report-head
      :param-list="paramList"
      :score="score"
      :date-text="dateText"
      v-on:dateBoxClick="dateBoxClick"
    ></report-head>

    <div class="report-body">

      <!-- 周报图表 -->
      <reportMonthChart ref="reportMonthChart"></reportMonthChart>

      <!-- 睡眠建议 -->
      <!-- <report-section
        :title="'睡眠建议'"
        :title-icon="imgAssets.sleepAdvice"
        class="sleep-advice"
      >
        <p>根据您的睡眠报告分析......运动可通过缓解白天所累积的紧张并使得身心放松而增进睡眠。常参加体育锻炼者比不常锻炼者睡得更好更深，但你不必刻意追求过度疲劳。每周至少三天，每次20－３0分钟的散步、工作、游泳或骑车应是你的目标－－有益于心血管的最低限度。但是别等到太晚才运动。晚上你应静下来而非锻炼出汗。别指望清晨的锻炼对白天累积的紧张神经有任何影响。理想的运动时间是下午晚些时候或傍晚早些时候此时体育锻炼可帮助你从白天的压  力调整到晚上的愉快。  </p>
      </report-section> -->
    </div>

    <!-- 月份选择 -->
    <gree-picker
      class="picker"
      ref="picker"
      v-model="isPickerShow"
      :data="pickerData"
      :cols="2"
      :line-height="pickerParams.lineHeight"
      :default-index="pickerParams.defaultIndex"
      is-cascade
      title="月份选择"
      ok-text="确认"
      cancel-text="取消"
      @change="onPickerChange"
      @confirm="onPickerConfirm"
    />
  </div>
</template>

<script>
import { Picker, Icon, Dialog, } from 'gree-ui';
import { mapState, mapActions } from "vuex";
import reportHead from './Report-Head';
import reportMonthChart from './Report-Month_Chart.vue';
import reportSection from './Report-Section';
import dayjs from 'dayjs';
import { tuyaWeightHistorySingleDelete } from '../../../../../static/lib/PluginInterface.promise';

const imgAssets = {
  sleepStage: require('../../../assets/img/report-sleep.png'),
  sleepAdvice: require('../../../assets/img/report-advice.png'),
  triple: require('../../../assets/img/triple.jpg'),
};


export default {
  name: 'ReportMonth',
  components: {
    reportHead,
    reportMonthChart,
    reportSection,
    [Picker.name]: Picker,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      todayDate: new Date(),
      selectDate: new Date(),
      docWidth: 0,
      imgAssets,
      isPickerShow: false,
    };
  },
  computed: {
    ...mapState({
      monthReportData: state => state.myModule.monthReportData,
      mac: state => state.mac
    }),
    score() {
      return this.monthReportData.score;
    },
    // 睡眠状态文字
    sleepStatus() {
      const score = this.monthReportData.score
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
    // 日期开始时间
    startDate() {
      return this.getMonthDate(this.selectDate).startDate;
    },
    // 日期结束时间
    endDate() {
      return this.getMonthDate(this.selectDate).endDate;
    },
    // 日期显示范围
    dateText() {
      return `${dayjs(this.startDate).format('YYYY/MM/DD')} - ${dayjs(this.endDate).format('YYYY/MM/DD')}`
    },
    // 参数显示
    paramList() {
      return [{
        value: `${!this.monthReportData.heartRate ? '- -' : this.monthReportData.heartRate}`,
        unit: ' 次 / 分',
        desc: '平均心率',
      }, {
        value: !this.monthReportData.breatheRate ? '- -' : this.monthReportData.breatheRate,
        unit: ' 次 / 分',
        desc: '平均呼吸',
      }, {
        value: this.sleepStatus, // TODO:此处有问题
        unit: '',
        desc: '睡眠状态',
      }, {
        value: [!this.monthReportData.inBedTime ? '-' : (this.monthReportData.inBedTime / 60 & 1), !this.monthReportData.inBedTime ? '-' : this.monthReportData.inBedTime % 60],
        unit: ['时', '分'],
        desc: '平均睡眠',
      }];
    },
    pickerParams() {
      return {
        lineHeight: 45,
        defaultIndex: [1, this.todayDate.getMonth()],
      };
    },
    pickerData() {
      const endDate = new Date(this.todayDate);
      const startDate = new Date(this.todayDate);
      startDate.setFullYear(startDate.getFullYear() - 1);

      return [
        [
          {
            text: startDate.getFullYear(),
            value: 1,
            children: Array.from({length: 12}).map((el, i) => {
              return {
                text: String(i + 1),
                value: i + 1,
              };
            }),
          },
          {
            text: endDate.getFullYear(),
            value: 2,
            children: Array.from({length: this.todayDate.getMonth() + 1}).map((el, i) => {
              return {
                text: String(i + 1),
                value: i + 1,
              };
            }),
          },
        ]
      ];
    },
  },
  created() {
    this.createdInit();
  },
  mounted() {
    // 初始化查当月
    this.getMonthReport({paramsStr: {startAt: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), mac: this.mac}});
  },
  methods: {
    ...mapActions({
      getMonthReport: 'GET_MONTH_REPORT'
    }),
    createdInit() {
      /* const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() - 1);
      this.todayDate = dateObj; */
    },
    dateBoxClick() {
      console.log(this.isPickerShow);
      this.isPickerShow = !this.isPickerShow;
    },
    // 获取本月头尾
    getMonthDate(date) {
      const dateObj = date instanceof Date ? date : this.selectDate;

      const startDate = new Date(dateObj);
      startDate.setDate(1);

      let endDate = new Date(dateObj);
      if (endDate.getFullYear() < this.todayDate.getFullYear() || endDate.getMonth() < this.todayDate.getMonth()) {
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0);
      } else {
        endDate = new Date(this.todayDate);
      }

      return {
        startDate,
        endDate,
      };
    },
    // 日历改变
    onPickerChange(...params) {
    },
    // 日历确定
    onPickerConfirm(columnsValue) {
      // console.log(columnsValue);
      const year = Number(columnsValue[0].text, 10);
      const month = Number(columnsValue[1].text, 10);
      const d = new Date(year, month - 1);
      this.selectDate = d;
      console.log('%c 选择的日期', 'color: red;',dayjs(this.selectDate).format('YYYY-MM-DD'));
      this.getMonthReport({paramsStr: {startAt: dayjs(this.selectDate).format('YYYY-MM-DD'), mac: this.mac}});
    },
  },
};
</script>

<style lang="scss">
.report-month {
  .report-head  {
    .date-select-box {
      .date-select {
        padding: 0 20px;
      }
    }
  }
}
</style>
