<template>
  <div class="report-month_chart">
    <report-section
      :title="'睡眠评分'"
      :title-icon="imgAssets.sleepScore"
    >
      <!-- <div class="chart-title">睡眠评分 <gree-icon :name="'question'" size="md" color="#5ac4f5"></gree-icon></div> -->
      <div ref="chart_score" :style="{opacity: monthReportData.datePlot && monthReportData.scorePlot ? 1 : 0}" class="chart-box" id="chart_scoree"></div>
      <div class="tip" v-show="!monthReportData.datePlot || !monthReportData.scorePlot">暂无数据</div>
      <div class="chart-footer">
        <ul>
          <li>
            好
          </li>
          <li>
            一般
          </li>
          <li>
            差
          </li>
        </ul>
      </div>
    </report-section>

  </div>
</template>

<script>
import { Icon, } from 'gree-ui';
import reportSection from './Report-Section.vue';
import ChartOption from '../../../mixins/config/default/charOption.js';
import { mapState } from 'vuex';
import dayjs from 'dayjs';

const echarts = require('echarts');

const imgAssets = {
  sleepScore: require('../../../assets/img/sleep-score.png'),
};

export default {
  name: 'ReportMonthChart',
  components: {
    [Icon.name]: Icon,
    reportSection,
  },
  data() {
    return {
      imgAssets,
      chart_score: null,
    };
  },
  computed: {
    ...mapState({
      monthReportData: state => state.myModule.monthReportData
    }),
    heartRateParams() {
      const data = [
        {
          value: `80次/分`,
          text: '00:30',
          desc: '最高心率',
        },
        {
          value: `60次/分`,
          text: '05:30',
          desc: '最低心率',
        },
        {
          value: `70次/分`,
          text: '偏低',
          desc: '平均心率',
        },
      ];
      return data;
    },
  },
  watch: {
  },
  created() {
    this.createdInit();
  },
  mounted() {
    this.mountedInit();
  },
  activated() {
    // console.log(`谁啊`);
    // console.log('Report-Month_Chart.vue');
    // this.chartUpdate();
    this.chartResize();
  },
  updated() {
    console.log('-----month updated-----');
    this.chartSetOption();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartResize);
  },
  methods: {
    createdInit() {
    },
    mountedInit() {
      this.chartInit();
      this.chartSetOption();
      // this.chartUpdate();
    },
    chartInit() {
      this.chart_score = echarts.init(this.$refs.chart_score);
    },
    chartSetOption() {  
      const highColor = [{
        offset: 0, color: 'rgba(149, 227, 162, 1)' // 0% 处的颜色
      }, {
        offset: 1, color: 'rgba(149, 227, 162, .2)' // 100% 处的颜色
      }];
      const mediumColor =  [{
        offset: 0, color: 'rgba(77, 197, 252, 1)' // 0% 处的颜色
      }, {
        offset: 1, color: 'rgba(77, 197, 252, .2)' // 100% 处的颜色
      }];
      const lowColor =  [{
        offset: 0, color: 'rgba(248, 152, 118, 1)' // 0% 处的颜色
      }, {
        offset: 1, color: 'rgba(248, 152, 118, .2)' // 100% 处的颜色
      }];
    
      if (!this.monthReportData.datePlot || !this.monthReportData.scorePlot) {
        this.chart_score.setOption(ChartOption.sleepScore_month);
        this.chartResize();
        window.addEventListener('resize', this.chartResize);
        return;
      }

      const xData = this.monthReportData.datePlot;
      const yData = this.monthReportData.scorePlot;


      let data = [];
      let time = [];
      for (let i = 0, len = xData.length; i < len; i++ ) {
        const obj = {
          value: null, itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(149, 227, 162, 1)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(149, 227, 162, .2)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            },
          }
        };

        if (yData[i] >= 80) {
          obj.itemStyle.color.colorStops = highColor;
        } else if (yData[i] < 31) {
          obj.itemStyle.color.colorStops = lowColor;
        } else {
          obj.itemStyle.color.colorStops = mediumColor;
        }
        obj.value = yData[i];
        data.push(obj);
        time.push(dayjs(xData[i]).format('MM-DD'));
      }
      
      ChartOption.sleepScore_month.xAxis.data = time;
      ChartOption.sleepScore_month.series[0].data = data;

      this.chart_score.setOption(ChartOption.sleepScore_month);

      this.chartResize();
      window.addEventListener('resize', this.chartResize);
    },
    chartResize() {
      setTimeout(() => {
        console.log('month chart resize!');
        this.chart_score && this.chart_score.resize();
      }, 300);
    },
    chartUpdate() {
      const currentDate = new Date();
      const xAxisData = [];

      const seriesData = [];
      const seriesColor = new Map([
        [
          [0, 30], 
          [{
            offset: 0, color: 'rgba(248, 152, 118, 1)' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(248, 152, 118, .2)' // 100% 处的颜色
          }],
        ],
        [
          [31, 79], 
          [{
            offset: 0, color: 'rgba(77, 197, 252, 1)' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(77, 197, 252, .2)' // 100% 处的颜色
          }],
        ],
        [
          [80, 100],  
          [{
            offset: 0, color: 'rgba(149, 227, 162, 1)' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(149, 227, 162, .2)' // 100% 处的颜色
          }],
        ],
      ]);
      
      for (let i = 0; i < 14; i += 1) {
        xAxisData.unshift({
          value: `${currentDate.getMonth() + 1}/${`0${currentDate.getDate()}`.slice(-2)}`, 
          textStyle: { color: '#666' },
        });
        currentDate.setDate(currentDate.getDate() - 1);

        const dataValue = Math.round((Math.random() * 100));
        const colorStops = seriesColor.get(Array.from(seriesColor.keys()).find(key => dataValue >= key[0] && dataValue <= key[1]));
        // console.log(`dataValue`, dataValue);
        // console.log(`colorStops`, colorStops);
        seriesData.push({
          value: dataValue,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops,
              global: false // 缺省为 false
            },
          },
        });
      }

      const updateOptions = {
        xAxis: {
          data: xAxisData,
        },
        series: {
          data: seriesData,
        },
      };
      // console.log(updateOptions);
      this.chart_score.setOption(updateOptions);
    }
  },
};
</script>

<style lang='scss' scoped >
.report-month_chart {
  .report-section {
    .report-section-body {
      .chart-box {
        width: 100%;
        height: 600px;
        // border: 1px solid #ccc;
        box-sizing: border-box;
        padding: 0 -30px;
        margin-bottom: 60px;
      }
      .chart-footer {
        padding: 0 60px;
        ul {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          li {
            vertical-align: middle;
            &::before {
              content: "";
              display: inline-block;
              vertical-align: middle;
              width: 20px;
              height: 20px;
              border-radius: 100%;
              background-color: #4cc6ff;
              margin-right: 10px;
            }
            &:nth-child(1)::before {
              background-color: #90e29e;
            }
            &:nth-child(3)::before {
              background-color: #f3926f;
            }
          }
        }
      }
      .tip {
        position: absolute;
        margin-top: -400px;
        width: 94.5%;
        text-align: center;
        color: #aaa;
        font-size: 50px;
      }
    }
  }
}
</style>

<style lang='scss' >
.report-month_chart {
  .report-section {
    .report-section-body {
      padding: 30px;
    }
  }
}
</style>

