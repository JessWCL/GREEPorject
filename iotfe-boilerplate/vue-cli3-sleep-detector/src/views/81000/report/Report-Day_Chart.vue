<!--
 * @Author: Jerry-Rain
 * @Date: 2020-09-14 14:02:00
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-09-14 14:02:25
 * @Description: 这个是日报告页面，图表
 -->
<template>
  <div class="report-day_chart">
    <report-section
      :title="'心率'"
      :title-icon="imgAssets.heartRate"
    >
      <div class="chart-title">心率波动图 <img :src="tip" @click="chartTitleClick('heartRate')"><div class="tip" v-show="dayReportData.sleepRate === null">暂无数据</div></div>
      <div ref="chart_heartRate" :style="{opacity: dayReportData.sleepRate ? 1 : 0}" class="chart-box" id="chart_heartRatee"></div>
      <div class="chart-params">
        <ul>
          <li v-for="(el, i) in heartRateParams" :key="i">
            <h5>{{ el.value }}</h5>
            <span>{{ el.text }}</span>
            <p>{{ el.desc }}</p>
          </li>
        </ul>
      </div>
    </report-section>

    <report-section
      :title="'呼吸'"
      :title-icon="imgAssets.breath"
    >
      <div class="chart-title">呼吸波动图 <img :src="tip" @click="chartTitleClick('breath')"><div class="tip" v-show="dayReportData.sleepRate === null">暂无数据</div></div>
      <div ref="chart_breath" class="chart-box" id="chart_breath"></div>
      <div class="chart-params">
        <ul>
          <li v-for="(el, i) in breathParams" :key="i">
            <h5>{{ el.value }}</h5>
            <span>{{ el.text }}</span>
            <p>{{ el.desc }}</p>
          </li>
        </ul>
      </div>
    </report-section>

    <report-section
      :title="'体动'"
      :title-icon="imgAssets.movement"
    >
      <div class="chart-title">体动图 <img :src="tip" @click="chartTitleClick('turnOver')"><div class="tip" v-show="dayReportData.sleepRate === null">暂无数据</div></div>
      <div ref="chart_movement" class="chart-box" id="chart_movement"></div>
    </report-section>

    <!-- 弹出框 -->
    <gree-dialog 
      :title="slotDialog.title" 
      v-model="slotDialog.show" 
      :btns="slotDialog.btns"
      :has-mask="true"
      :mask-closable="true"
      class="report-day-dialog"
    >
      <div class="slotDialog-slot">
        <div class="content" v-html="slotDialog.content"></div>
      </div>
    </gree-dialog>
  </div>
</template>

<script>
import { mapState, } from "vuex";
import { Icon, Dialog, } from 'gree-ui';
import dayjs from 'dayjs';
import reportSection from './Report-Section.vue';
import ChartOption from '../../../mixins/config/default/charOption.js';

const echarts = require('echarts');

const imgAssets = {
  heartRate: require('../../../assets/img/sleep-heartRate.png'),
  breath: require('../../../assets/img/report-breath.png'),
  movement: require('../../../assets/img/sleep-turn.png'),
};

export default {
  name: 'ReportDayChart',
  components: {
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    reportSection,
  },
  data() {
    return {
      imgAssets,
      chart_heartRate: null,
      chart_breath: null,
      slotDialog: {
        show: false,
        type: '',
        title: '',
        content: '',
        btns: [
          {
            text: '确定'
          }
        ],

      },
      movementQuestion: {
        title: '体动说明',
        content: `
          体动多，通常是睡眠较浅的表现。睡眠质量不高，有可能的影响因素是身体不舒服或者睡眠环境不佳，比如过热、过冷、通风差等情况，都会对睡眠产生负面影响。
        `,
        confirmText: '确定',
        onConfirm: () => console.log('[Dialog.alert] confirm clicked')
      },
      maxHeartRate: null,
      maxBreathRate: null,
      // minHeartRate: null,
      // minBreathRate: null,
      tip: require('@/assets/img/tip.png')
    };
  },
  computed: {
    ...mapState({
      dayReportData: state => state.myModule.dayReportData.left
    }),
    // 心率值配置
    heartRateParams() {
      const data = [
        {
          value: `${this.maxHeartRate || '- -'}次/分`, // TODO:怎么获取
          text: `${!this.dayReportData.maxHeartRateMoment ? '-时 -分' : dayjs(this.dayReportData.maxHeartRateMoment).format('HH:mm')}`,
          desc: '最高心率',
        },
        {
          value: `${this.minHeartRate || '- -'}次/分`, // TODO:怎么获取
          text: `${!this.dayReportData.minHeartRateMoment ? '-时 -分' : dayjs(this.dayReportData.minHeartRateMoment).format('HH:mm')}`,
          desc: '最低心率', 
        },
        {
          value: `${this.dayReportData.meanHeartRate || '- -'}次/分`,
          text: !this.dayReportData.meanHeartRate ? '- - ' : this.meanHeartRateTxt, // TODO:怎么获取
          desc: '平均心率',
        },
      ];
      return data;
    },
    // 呼吸值配置
    breathParams() {
      const data = [
        {
          value: `${this.maxBreathRate || '- -'}次/分`, // TODO:怎么获取
          text: `${!this.dayReportData.maxHeartRateMoment ? '-时 -分' : dayjs(this.dayReportData.maxHeartRateMoment).format('HH:mm')}`,
          desc: '最高呼吸值',
        },
        {
          value: `${this.minBreathRate || '- -'}次/分`, // TODO:怎么获取
          text: `${!this.dayReportData.minHeartRateMoment ? '-时 -分' : dayjs(this.dayReportData.minHeartRateMoment).format('HH:mm')}`,
          desc: '最低呼吸值',
        },
        {
          value: `${this.dayReportData.meanBreathRate || '- -'}次/分`,
          text: !this.dayReportData.meanBreathRate ? '- - ' : this.meanBreathRateTxt, // TODO:怎么获取
          desc: '平均呼吸值',
        },
      ];
      return data;
    },
    // 最小心率
    minHeartRate() {
      const value = this.dayReportData.minHeartRate;
      if (value === null) {
        return '- -'
      }
      // const value = Math.min(...this.dayReportData.sleepRate.heartRate);
      // return value < 40 ? 40 : value;
      return value;
    },
    // 最下呼吸率 
    minBreathRate() {
      const value = this.dayReportData.minBreathRate;
      if (value === null) {
        return '- -'
      }
      // const value = Math.min(...this.dayReportData.sleepRate.breathRate);
      // return value < 10 ? 10 : value;
      return value;
    },
    // 平均心率文字
    meanHeartRateTxt() {
      const value = this.dayReportData.meanHeartRate
      if (value < 55) {
        return '偏低';
      } else if (value > 65)  {
        return '偏高';
      } else if (value >= 55 && value <= 65)  {
        return '正常';
      } else {
        return '--';
      }
    },
    // 平均呼吸率文字
    meanBreathRateTxt() {
      const value = this.dayReportData.meanBreathRate
      if (value < 12) {
        return '偏低';
      } else if (value > 20)  {
        return '偏高';
      } else if (value >= 12 && value <= 20) {
        return '正常';
      } else {
        return '--';
      }
    },
    // 参考值
    slotDialogData() {
      const data = {
        heartRate: {
          title: '心率说明',
          type: 'heartRate',
          content: `
            心率是指正常人安静状态下每分钟心跳的次数，也较安静心率，一般为60~100次/分，可因年龄、性别或其他生理因素产生个体差异。
            <br />
            # 信息仅供参考 #
            <br />
            <div class="content-stage heartRate">
              <p>3-18岁儿童：55-115</p>
              <div class="stage-bar">
                <span>低</span>
                <span>中(标准)</span>
                <span>高</span>
              </div>
              <div class="stage-bar-footer">
                <span>55</span>
                <span>115</span>
                <span></span>
              </div>
              <p>18-65岁：60-100</p>
              <div class="stage-bar">
                <span>低</span>
                <span>中(标准)</span>
                <span>高</span>
              </div>
              <div class="stage-bar-footer">
                <span>60</span>
                <span>100</span>
                <span></span>
              </div>
              <p>65岁以上：70-100</p>
              <div class="stage-bar">
                <span>低</span>
                <span>中(标准)</span>
                <span>高</span>
              </div>
              <div class="stage-bar-footer">
                <span>76</span>
                <span>85</span>
                <span></span>
              </div>
            </div>
          `,
        },
        breath: {
          title: '呼吸说明',
          type: 'breath',
          content: `
            呼吸频率为一种形容每分钟呼吸次数的医学术语，胸部的一次起伏就是一次呼吸，即一次吸气一次呼气。每分钟呼吸的次数称谓呼吸频率。
            <br />
            # 信息仅供参考 #
            <br />
            <div class="content-stage heartRate">
              <p>3-18岁儿童：30-40</p>
              <div class="stage-bar">
                <span>低</span>
                <span>中(标准)</span>
                <span>高</span>
              </div>
              <div class="stage-bar-footer">
                <span>30</span>
                <span>40</span>
                <span></span>
              </div>
              <p>18-65岁：16-20</p>
              <div class="stage-bar">
                <span>低</span>
                <span>中(标准)</span>
                <span>高</span>
              </div>
              <div class="stage-bar-footer">
                <span>16</span>
                <span>20</span>
                <span></span>
              </div>
              <p>65岁以上：12-20</p>
              <div class="stage-bar">
                <span>低</span>
                <span>中(标准)</span>
                <span>高</span>
              </div>
              <div class="stage-bar-footer">
                <span>12</span>
                <span>20</span>
                <span></span>
              </div>
            </div>
          `,
        },
        turnOver: {
          title: '体动说明',
          type: 'turnOver',
          content: `
          体动过多，通常是睡眠较浅的表现。睡眠质量不高，有可能的影响因素是身体不舒服或者睡眠环境不佳，比如过热、过冷、通风差等情况，都会对睡眠产生负面影响。
          `,
        },
      };
      return data;
    },
  },
  watch: {
  },
  created() {
    // this.createdInit();
  },
  mounted() {
    this.mountedInit();
  },
  activated() {
    // console.log(`谁啊`);
    this.chartResize();
  },
  updated() {
    console.log('-----day updated-----');
    this.chartSetOption();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartResize);
  },
  methods: {
    createdInit() {},
    // echarts初始化
    chartInit() {
      this.chart_heartRate = echarts.init(this.$refs.chart_heartRate);
      this.chart_breath = echarts.init(this.$refs.chart_breath);
      this.chart_movement = echarts.init(this.$refs.chart_movement);
    },
    mountedInit() {
      this.chartInit(); // 初始化所有图表
      this.chartSetOption(); // 设置所有图表
    },
    // echarts初始化配置项值
    chartSetOption() {
      try {
        const maxHeartRate = this.dayReportData.maxHeartRate;
        const maxBreathRate = this.dayReportData.maxBreathRate;
        const sleepRate = this.dayReportData.sleepRate;
        this.maxHeartRate = !maxHeartRate ? '- -' : maxHeartRate;
        this.maxBreathRate = !maxBreathRate ? '- -' : maxBreathRate;
        // this.minHeartRate = Math.min(...sleepRate.heartRate);
        // this.minBreathRate = Math.min(...sleepRate.breathRate)
        ChartOption.heartRate.xAxis.data = sleepRate.times.map(item => dayjs(item).format('HH:mm'));
        ChartOption.heartRate.series[0].data = sleepRate.heartRate;
        this.chart_heartRate.setOption(ChartOption.heartRate);
  
        ChartOption.breathRate.xAxis.data = sleepRate.times.map(item => dayjs(item).format('HH:mm'));
        ChartOption.breathRate.series[0].data = sleepRate.breathRate;
        this.chart_breath.setOption(ChartOption.breathRate);
        
        this.chart_movement = echarts.init(this.$refs.chart_movement);
        ChartOption.movement.xAxis.data = sleepRate.times.map(item => dayjs(item).format('HH:mm'));
        ChartOption.movement.series[0].data = sleepRate.bodyMov;
        this.chart_movement.setOption(ChartOption.movement);  
      } catch (error) {
        ChartOption.heartRate.xAxis.data = [];
        ChartOption.heartRate.series[0].data = [];
        ChartOption.breathRate.xAxis.data = [];
        ChartOption.breathRate.series[0].data = [];
        ChartOption.movement.xAxis.data = [];
        ChartOption.movement.series[0].data = [];
        this.chart_heartRate.setOption(ChartOption.heartRate);
        this.chart_breath.setOption(ChartOption.breathRate);
        this.chart_movement.setOption(ChartOption.movement);
      }
      
      this.chartResize();
      window.addEventListener('resize', this.chartResize);
    },
    // 页面切换的时候需要resize一下，不然可能会出现图表被压缩，这是个坑，很重要
    chartResize() {
      setTimeout(() => {
        console.log('day chart resize!');
        this.chart_heartRate && this.chart_heartRate.resize();
        this.chart_breath && this.chart_breath.resize();
        this.chart_movement && this.chart_movement.resize();
      }, 300);
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
    // 弹出slotDialog
    chartTitleClick(flag) {
      switch (flag) {
        case 'heartRate':
          this.slotDialog = Object.assign({}, this.slotDialog, this.slotDialogData[flag]);
          this.slotDialog.show = true;
          break;
        case 'breath':
          this.slotDialog = Object.assign({}, this.slotDialog, this.slotDialogData[flag]);
          this.slotDialog.show = true;
          break;
        case 'turnOver':
          this.slotDialog = Object.assign({}, this.slotDialog, this.slotDialogData[flag]);
          this.slotDialog.show = true;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang='scss' scoped >
.report-day_chart {
  .report-section {
    .report-section-body {
      .chart-title {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        font-size: 44px;
        text-align: center;
        margin-bottom: 20px;
        img {
          margin-left: 15px;
          height: 40px;
        }
        .tip {
          position: absolute;
          padding-top: 800px;
          width: 100%;
          text-align: center;
          color: #aaa;
          font-size: 50px;
        }
      }
      .chart-box {
        width: 100%;
        height: 600px;
        // border: 1px solid #ccc;
        box-sizing: border-box;
        padding: 0 -30px;
        margin-bottom: 60px;
      }
      .chart-params {
        padding: 0 30px;
        padding-bottom: 20px;
        ul {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          li {
            text-align: center;
            h5 {
              font-size: 45px;
            }
            span {
              color: #999;
              line-height: 60px;
            }
            p {
              font-size: 36px;
              color: #999;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang='scss' >
.report-day_chart {
  .report-section {
    .report-section-body {
      padding: 30px;
    }
  }
}

.report-day-dialog {
  .slotDialog-slot {
    .content-stage {
      margin-top: 20px;
      p {
        font-size: 36px;
        margin-bottom: 10px;
      }
      .stage-bar {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        padding: 0 10px;
        box-sizing: border-box;
        span {
          display: block;
          width: 31%;
          text-align: center;
          color: #eee;
          background-color: #aaa;
          &:nth-child(1) {
            background-color: #62cc74;
            border-radius: 50px 0 0 50px;
            margin-right: 2%;
          }
          &:nth-child(2) {
            background-color: #ffbd45;
          }
          &:nth-child(3) {
            background-color: #eb6636;
            margin-left: 2%;
            border-radius: 0 50px 50px 0;
          }
        }
      }
      .stage-bar-footer {
        margin-bottom: 10px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        span {
          display: block;
          width: 31%;
          font-size: 36px;
          text-align: right;
          color: #999;
          &:nth-child(1) {
            margin-right: 2%;
          }
          &:nth-child(3) {
            margin-left: 2%;
          }
        }
      }
    }
  }
}
</style>

