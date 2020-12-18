<!--
 * @Author: Jerry-Rain
 * @Date: 2020-03-24 13:48:00
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-10-14 17:02:12
 * @Description: 新电量统计页面 V2.2  2代表黎工1.0模板电量页面，小版本1代表增加了坐标轴等较大改动
 -->
<template>
  <div class="page-electric" bgcolor="##FFFFFE">
    <!-- <gree-page> -->
      <!-- 总电量显示 -->
      <div class="title">电量统计</div>
      <gree-block class="total-clean">
        <span>当前累计总用电量：{{ total }} kW·h</span>
        <span @click="cleanElc()">电量清零</span>
      </gree-block>
      <!-- 按钮组 -->
      <gree-block class="button-group">
        <div
          v-for="(item, index) in typeList"
          :key="index"
          class="btn"
          @click="btnIndex(index)"
          :style="{
            color: index === selcetedIndex ? 'white' : 'black',
            background: index === selcetedIndex ? '#00aeff' : 'white',
          }"
        >
          {{ item }}
        </div>
      </gree-block>
      <!-- 图表区 -->
      <div class="chart-bg">
        <gree-block class="chart-block">
          <div v-show="selcetedIndex === 0">
            <div class="total-day">
              <span>日累计用电量</span>
              <span>{{ daytotle }} kW·h</span>
            </div>
            <gree-divider
              type="center"
              direction="horizontal"
            ></gree-divider>
          </div>
          <div v-show="!isNoData" class="isNoData">还没有电量数据哦</div>
          <div v-show="!isNoYearData && !isNoData" class="isNoData">还没有电量数据哦</div>
          <div class="chart-canves" ref="day" v-show="selcetedIndex === 0"/>
          <div class="chart-canves" ref="week" v-show="selcetedIndex === 1"/>
          <div class="chart-canves" ref="month" v-show="selcetedIndex === 2"/>
          <div class="chart-canves" ref="year" v-show="selcetedIndex === 3" />
          <span v-show="selcetedIndex < 3" class="unit-txt">/{{ type[selcetedIndex] }}</span>
          <span v-show="selcetedIndex === 3" class="unit-txt">/{{ type[3] }}</span>
        </gree-block>
        <gree-row class="tip">该设备的用电量仅供<span @click="shiChuiFlag ++">参考</span></gree-row>
      </div>
      <div v-show="shiChuiFlag > 50">{{ shiChuiTxt }}</div> 
    <!-- </gree-page> -->
  </div>
</template>

<script>
import echarts from 'echarts';
import { mapState, mapActions, mapMutations } from 'vuex';
import chartsConfig from '../../mixins/config/80803/charts.js';
import { View, Page, Header, Row, Col, Block, Divider, Dialog } from 'gree-ui';
import {
  showLoading,
  hideLoading,
  showToast,
  changeBarColor,
  getGridConListOneDay,
  clearHistoricalPhotovoltaicPowerData,
} from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [View.name]: View,
    [Page.name]: Page,
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Block.name]: Block,
    [Divider.name]: Divider,
    [Dialog.name]: Dialog,
  },
  mixins: [chartsConfig],
  data() {
    return {
      DEBUG: false, // 测试
      typeList: ['日', '月', '年', '历年'],
      selcetedIndex: 0,
      type: ['h', '日', '月', '年'],
      yearChart: '',
      monthChart: '',
      dayChart: '',
      weekChart: '',
      isNoData: false, // 无数据显示
      isNoYearData: false, // 无数据显示
      daytotle: 0, // 日累计用电量
      shiChuiFlag: 0, // 实锤标志
      shiChuiTxt: [], // 实锤输出
    };
  },
  computed: {
    ...mapState({
      mac: state => state.mac,
      isClear: state => state.isClear,
      chartData: state => state.chartData,
      total: state => state.total
    }),
  },
  mounted() {
    changeBarColor('#00aeff');
    this.initCharts(); // 初始化图表
    if (this.DEBUG) {
      this.isNoData = true;
      this.isNoYearData = true;
    }
  },
  beforeDestroy() {
    this.setChartData({ dayChart: null });
  },
  methods: {
    ...mapMutations({
      setChartData: 'SET_CHART_DATA',
      setTotal: 'SET_TOTAL'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    // 初始化图表
    async initCharts() {
      this.dayChart = echarts.init(this.$refs.day);
      this.weekChart = echarts.init(this.$refs.week);
      this.monthChart = echarts.init(this.$refs.month);
      this.yearChart = echarts.init(this.$refs.year);
      await this.getDayData();
      this.isNoData = !!this.chartData.dayChart[2].length;
      await this.getYearData();
      this.isNoYearData = !!this.chartData.yearChart[2].length;
    },
    // 当前选择类型请求对应的数据
    async btnIndex(index) {
      this.DEBUG ? this.setChartData(this.debugData) : ''; // 测试数据
      this.selcetedIndex = index;
      console.log(this.chartData);
      switch (index) {
        case 0:
          await this.chartData.dayChart ? this.dayChartSet(this.tooltip) : await this.getDayData();
          this.isNoData = !!this.chartData.dayChart[2].length;
          console.log('------', this.chartData.dayChart[2]);
          break;
        case 1:
          this.otherOpt.tooltip.formatter = '当日用电量：{c} kW·h';
          await this.chartData.weekChart ? this.weekChartSet(this.tooltip, this.dataZoom) : await this.getWeekData();  
          this.isNoData = !!this.chartData.weekChart[2].length;
          console.log('------', this.chartData.weekChart[2]);
          break;
        case 2:
          this.otherOpt.tooltip.formatter = '当月用电量：{c} kW·h';
          this.chartData.monthChart ? this.monthChartSet(this.tooltip, this.dataZoom) : await this.getMonthData();  
          this.isNoData = !!this.chartData.monthChart[2].length;
          console.log('------', this.chartData.monthChart[2]);
          break;
        case 3:
          this.otherOpt.tooltip.formatter = '当年用电量：{c} kW·h';
          await this.chartData.yearChart ? this.yearChartSet(this.tooltip, this.dataZoom) : await this.getYearData();
          this.isNoYearData = !!this.chartData.yearChart[2].length;
          break;
        default:
          await this.chartData.dayChart ? this.dayChartSet(this.tooltip) : await this.getDayData();
          this.isNoData = !!this.chartData.dayChart[2].length;
          break;
      }
    },
    // 清楚电量dialog
    cleanElc() {
      Dialog.confirm({
        title: '提示',
        content: '电量清零后不可恢复，是否确认清零？',
        confirmText: '确定',
        onConfirm: () => this.cleanElcInterface(),
        cancelText: '取消',
        onCancel: () => console.log('[Dialog.confirm] cancel clicked'),
      });
    },
    async getDayData() {  
      await getGridConListOneDay(this.mac, 'day', '')
        .then(res => {
          hideLoading();
          this.shiChuiTxt.push(res);
          const obj = JSON.parse(res);
          const { time, val } = obj.data;

          //  日求和，取最大
          this.daytotle = 0;
          if (val.length > 0) {
            this.daytotle = val[val.length - 1].toFixed(2);
          }
          console.log(`日累计用电量${this.daytotle}`);

          const day = [];
          const count = [];
          for (let i = 0; i < 12; i++) {
            day[i] = 0;
            count[i] = 2 * (i + 1);
          }

          let trueValue = 0;
          for (let i = 0; i < time.length; i++) {
            if (i == 0) {
              day[0] = val[0].toFixed(2);
            } else if (i > 0) {
              trueValue = val[i] - val[i - 1];
              if (trueValue > 0) {
                day[time[i] / 2 - 1] = trueValue.toFixed(2);
              } else {
                day[time[i] / 2 - 1] = 0;
              }
            }
          }
          this.setChartData({ dayChart: [day, count, val]});
          this.refreshChart(day, count, 'dayChart');
        })
        .catch(res => {
          console.log('查询失败', res);
          showToast('查询失败', 0);
          hideLoading();
        });
    },
    async getWeekData() {
      showLoading();
      await getGridConListOneDay(this.mac, 'month', '')
        .then(res => {
          hideLoading();
          this.shiChuiTxt.push(res);
          const obj = JSON.parse(res);
          console.log(obj);
          const { time, val } = obj.data;

          const d = new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0,
          );
          const monthCount = d.getDate();
          const month = [];
          const count = [];

          for (let i = 0; i < monthCount; i++) {
            month[i] = 0;
            count[i] = i + 1;
          }

          for (let i = 0; i < time.length; i++) {
            month[time[i] - 1] = val[i];
          }
          this.setChartData({ weekChart: [month, count, val]});
          this.otherOpt.dataZoom = this.dataZoom;
          this.refreshChart(month, count, 'weekChart');
        })
        .catch(res => {
          console.log('查询失败', res);
          showToast('查询失败', 0);
          hideLoading();
        });
    },
    async getMonthData() {
      showLoading();
      await getGridConListOneDay(this.mac, 'year', '')
        .then(res => {
          hideLoading();
          this.shiChuiTxt.push(res);
          const obj = JSON.parse(res);
          console.log(obj);
          const { time, val } = obj.data;

          const year = [];
          const count = [];
          for (let i = 0; i < 12; i++) {
            year[i] = 0;
            count[i] = i + 1;
          }

          for (let i = 0; i < time.length; i++) {
            year[time[i] - 1] = val[i].toFixed(2);
          }
          this.setChartData({ monthChart: [year, count, val]});
          this.otherOpt.dataZoom = [];
          this.refreshChart(year, count, 'monthChart');
        })
        .catch(res => {
          console.log('查询失败', res);
          showToast('查询失败', 0);
          hideLoading();
        });
    },
    async getYearData() {
      showLoading();
      await getGridConListOneDay(this.mac, 'all', '')
        .then(res => {
          hideLoading();
          this.shiChuiTxt.push(res);
          const obj = JSON.parse(res);
          console.log(obj);
          const { time, val } = obj.data;

          const all = [];
          const count = [];
          let TOTAL = 0;
          for (let i = 0; i < time.length; i++) {
            all[i] = val[i].toFixed(2);
            count[i] = time[i];
            TOTAL += val[i];
          }
          this.setTotal(TOTAL.toFixed(2));
          this.isNoYearData = !time.length;
          this.setChartData({ yearChart: [all, count, val]});
          this.refreshChart(all, count, 'yearChart');
        })
        .catch(res => {
          console.log('查询失败', res);
          showToast('查询失败', 0);
          hideLoading();
        });
    },
    // 清除电量接口
    async cleanElcInterface() {
      showLoading();
      await clearHistoricalPhotovoltaicPowerData(this.mac).then(result => {
        hideLoading();
        const res = JSON.parse(result);
        console.log(res);
        // 判断是否成功清除电量
        if (res.r === 400) {
          showToast('电量数据清除失败', 0);
          console.log('Api调用失败');
        } else if (res.r === 200) {
          console.log('成功请求，清除电量');
          this.sendCtrl({ Electnumzero: 0 });
          showToast('电量数据已清除', 0);
          this.cleanALLChartData();
        } else if (res.r === 10700) {
          showToast('您没有权限清除电量数据哦', 0);
        } else {
          showToast('电量数据清除失败', 0);
          console.log('失败！其他原因');
        }
      })
        .catch(err => {
          console.log('err', err);
          hideLoading();
        });
    },
    refreshChart(value, count, type) {
      console.log(`${type} =>  `, value, count);
      if (type === 'dayChart') {
        this.dayChartOpt.xAxis.data = count;
        this.dayChartOpt.series[0].data = value;
      } else {
        this.otherOpt.xAxis.data = count;
        this.otherOpt.series[0].data = value;     
      }
      this[type].setOption(type === 'dayChart' ? this.dayChartOpt : this.otherOpt, true);
      this.$nextTick(() => {
        this[type].resize();
      });
    },
    dayChartSet(tooltip) {
      console.log('日数据设置');
      this.refreshChart(this.chartData.dayChart[0], this.chartData.dayChart[1], 'dayChart');
    },
    weekChartSet(tooltip, dataZoom) {
      tooltip.formatter = '当日用电量：{c} kW·h';
      this.otherOpt.tooltip = tooltip;
      this.otherOpt.dataZoom = dataZoom;
      this.otherOpt.grid = { left: '12%', top: '11%', right: '6%', bottom: '20%' };
      this.refreshChart(this.chartData.weekChart[0], this.chartData.weekChart[1], 'weekChart');
    },
    monthChartSet(tooltip, dataZoom) {
      tooltip.formatter = '当月用电量：{c} kW·h';
      this.otherOpt.tooltip = tooltip;
      this.otherOpt.dataZoom = [];
      this.otherOpt.grid = { left: '12%', top: '11%', right: '6%', bottom: '20%' };
      this.refreshChart(this.chartData.monthChart[0], this.chartData.monthChart[1], 'monthChart');
    },
    yearChartSet(tooltip) {
      tooltip.formatter = '当年用电量：{c} kW·h';
      this.otherOpt.tooltip = tooltip;
      this.otherOpt.dataZoom = [];
      this.otherOpt.grid = { left: '12%', top: '11%', right: '6%', bottom: '20%' };
      this.refreshChart(this.chartData.yearChart[0], this.chartData.yearChart[1], 'yearChart');
    },
    cleanALLChartData() {
      this.setChartData({ dayChart: [], weekChart: [], monthChart: [], yearChart: [] });
      // this.$router.replace({name: 'Home', query: { type: 'clear' } });
      location.reload();
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/global.scss';
</style>
