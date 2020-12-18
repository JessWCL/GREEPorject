<template>
  <gree-view bg-color="#49afe5">
    <gree-page no-navbar class="page-home">
      <div class="page-header" :style="{ backgroundImage: 'url(' + head_bg + ')' }">
        <gree-header
          theme="transparent"
          :left-options="{ preventGoBack: true }"
          @on-click-back="goBack"
          :right-options="{ showMore: !functype }"
          @on-click-more="moreInfo"
        >{{ devname }}</gree-header>
        <gree-row>
          <gree-col>
            <div class="logo">
              <img :src="require('@/assets/img/temperature.png')" />
            </div>
            <div class="info">{{ va_temperature }}℃</div>
          </gree-col>
          <gree-col>
            <div class="logo">
              <img :src="require('@/assets/img/humidity.png')" />
            </div>
            <div class="info">{{ va_humidity }}%</div>
          </gree-col>
        </gree-row>
        <div class="battery-remind">
          <h3>
            {{ $language('home.dumpEnergy') }} {{ va_battery }}%
            <i class="status" :class="{ full: va_battery > 10 }"></i>
          </h3>
        </div>
      </div>
      <div class="page-main">
        <gree-tab-bar class="custom-tab-bar" v-model="curTab" :items="items" :has-ink="false" @change="onChange"></gree-tab-bar>
        <gree-row>
          <gree-col>
            <gree-radio name="1" v-model="timeMode" icon icon-inverse icon-disabled inline></gree-radio>
            <gree-radio name="2" v-model="timeMode" icon icon-inverse icon-disabled inline></gree-radio>
          </gree-col>
        </gree-row>
        <ve-line :data="chartData" :settings="chartSettings" :extend="chartExtend" v-if="Object.keys(lists).length > 0"></ve-line>
        <div class="main-tips" v-else>
          <h3>{{ $language('home.noData') }}</h3>
        </div>
      </div>
      <div v-show="false">
        {{ va_humidity }} - {{ va_battery }} - {{ va_temperature }} -
        {{ ColorChange }}
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Row, Col, Icon, TabBar, Radio, Toast } from 'gree-ui';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import echarts from 'echarts';
import VeLine from 'v-charts/lib/line.common';
import { mapState, mapMutations, mapActions } from 'vuex';
import demo from '@/mixins/config/data'; // 模拟数据
import {
  closePage,
  tuyaDeviceMore,
  changeBarColor,
  tuyaGetDeviceLogs
} from '../../../../static/lib/PluginInterface.promise';

dayjs.locale('zh-cn'); // 全局使用简体中文

const TODAY = dayjs(
  dayjs(dayjs().format('YYYY-MM-DD')).format('YYYY-MM-DD HH:mm:ss')
)
  .toDate()
  .getTime();
const NOW = dayjs(Date.now(), 'YYYY-MM-DD HH:mm:ss').valueOf();
const WEEK_AGO = dayjs(new Date())
  .subtract(1, 'week')
  .valueOf();
const MONTH_AGO = dayjs(new Date())
  .subtract(1, 'month')
  .valueOf();

export default {
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [TabBar.name]: TabBar,
    [Radio.name]: Radio,
    echarts,
    VeLine
  },
  data() {
    return {
      curTab: 1,
      items: [
        { name: 1, label: '日' },
        { name: 2, label: '周' },
        { name: 3, label: '月' }
      ],
      timeMode: '1',
      lists: [],
      chartData: null
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      path: state => state.deviceInfo.path,
      functype: state => state.functype,
      mac: state => state.mac
    }),
    head_bg() {
      const bg = require('@/assets/img/bg_header.png');
      return bg;
    },
    power_off_bg() {
      const bg = require('@/assets/img/bg_off.png');
      return bg;
    },
    va_humidity() {
      return Math.round(this.dataObject.properties[0].value / 100);
    },
    va_battery() {
      return this.dataObject.properties[1].value;
    },
    va_temperature() {
      return Math.round(this.dataObject.properties[2].value / 100);
    },
    /**
     * @description 主页面下更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      if (this.$route.name === 'Home') {
        color = '#49afe5';
      }
      color ? changeBarColor(color) : '';
      return color;
    }
  },
  watch: {
    timeMode: {
      handler(newVal) {
        this.timeMode = newVal;
        if (this.curTab === 1) {
          this.initLogs(this.mac, TODAY, NOW);
        } else if (this.curTab === 2) {
          this.initLogs(this.mac, WEEK_AGO, NOW);
        } else if (this.curTab === 3) {
          this.initLogs(this.mac, MONTH_AGO, NOW);
        }
      },
      immediate: true
    }
  },
  created() {
    this.chartSettings = {
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(179, 231, 255)'
          },
          {
            offset: 1,
            color: 'rgb(255, 255, 255)'
          }
        ])
      }
    };
    this.chartExtend = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            type: 'dashed',
            width: 1,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(255, 255, 255, 0)' // 0% 处的颜色
                },
                {
                  offset: 0.5,
                  color: 'rgba(0, 174, 255, 1)' // 50% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(0, 174, 255, 1)' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        },
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#d5d5d5',
        padding: [10, 15],
        textStyle: {
          color: '#404657',
          fontSize: 18
        }
        // formatter(params) {
        //   let res = `<p>${params[1].data[1]}℃</p>`;
        //   res += `<p>Day: ${params[0].data[1]}</p>`;
        //   res += `<p>Time: ${params[1].data[0]}</p>`;
        //   return res;
        // }
      },
      xAxis: {
        type: 'category',
        axisTick: {
          show: false // 是否显示坐标轴刻度
        },
        axisLabel: {
          show: true,
          fontSize: 16,
          color: '#404657'
        },
        // 坐标轴在 grid 区域中的分隔线
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: '#dddfe2',
            type: 'dashed'
          }
        }
      },
      yAxis: {
        // show: false,
        type: 'value',
        interval: 10, // 强制设置坐标轴分割间隔
        axisTick: {
          show: false // 是否显示坐标轴刻度
        },
        axisLabel: {
          fontSize: 15,
          color: '#404657',
          formatter: '{value}°'
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: '#dddfe2',
            type: 'solid'
          }
        }
      },
      series: {
        type: 'line',
        symbol: 'circle',
        itemStyle: {
          normal: {
            borderWidth: 5,
            borderColor: '#66ceff',
            lineStyle: {
              width: 0
            },
            // 图形的高亮样式
            emphasis: {
              color: '#00aeff',
              borderWidth: 10
            }
          }
        },
        // 标记线
        // markLine: {
        //   symbol: 'none', // 去掉箭头
        //   data: [{ yAxis: 10 }],
        //   label: {
        //     show: false
        //   },
        //   lineStyle: {
        //     color: '#dddfe2',
        //     type: 'solid'
        //   }
        // },
        smooth: true // 是否平滑曲线显示
      },
      legend: {
        show: false
      }
    };
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    /**
     * @description 返回键
     */
    goBack() {
      closePage();
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      tuyaDeviceMore(this.mac);
    },
    onChange(item, index, prevIndex) {
      console.log(
        `currentIndex: ${index}, prevIndex: ${prevIndex}, label: ${item.label}`
      );
      this.curTab = index + 1;
      if (index === 0) {
        this.initLogs(this.mac, TODAY, NOW);
      } else if (index === 1) {
        this.initLogs(this.mac, WEEK_AGO, NOW);
      } else if (index === 2) {
        this.initLogs(this.mac, MONTH_AGO, NOW);
      }
    },
    initLogs(mac, startTime, endTime) {
      // Toast.loading('加载中...');

      /* 模拟调试 Start */
      this.lists = demo[0].message.result.logs;
      this.resizeEcharts();
      /* 模拟调试 End */

      tuyaGetDeviceLogs(mac, startTime, endTime)
        .then(res => {
          // console.log(`tuyaGetDeviceLogs => ${res}`);
          const __res = JSON.parse(res);
          if (__res.code === 200) {
            this.lists = __res.message.result.logs;
            this.resizeEcharts();
          } else {
            Toast.failed('Api Error');
          }
          setTimeout(() => {
            Toast.hide();
          }, 200);
          return res;
        })
        .catch(err => {
          err;
        });
    },
    resizeEcharts() {
      let rows = [];
      const codes = ['va_humidity', 'va_temperature'];
      this.lists = this.lists.filter(
        item =>
          item.code !== 'va_battery' && item.code !== codes[this.timeMode - 1]
      );
      const dates = ['day', 'week', 'month'];
      this.lists = this.lists.filter(
        item =>
          dayjs(item.event_time).format('YYYYMMDD') >
            dayjs()
              .subtract(1, dates[this.curTab - 1])
              .format('YYYYMMDD') && item.value !== ''
      );
      this.lists.reverse().forEach((item, index) => {
        const date = dayjs(item.event_time).format('YYYY-M-DD');
        const week = dayjs(item.event_time).format('dddd');
        const time = dayjs(item.event_time).format('HH:mm');
        const value = (item.value / 100).toFixed(1);
        rows[index] = { date, week, time, value };
      });
      if (Object.keys(this.lists).length > 0) {
        if (this.curTab === 1) {
          this.chartData = {
            columns: ['time', 'date', 'value'],
            rows
          };
        } else if (this.curTab === 2) {
          this.chartData = {
            columns: ['week', 'date', 'value'],
            rows
          };
        } else if (this.curTab === 3) {
          this.chartData = {
            columns: ['date', 'date', 'value'],
            rows
          };
        }
      }
      setTimeout(() => {
        if (this.timeMode === '1') {
          this.chartExtend.yAxis.axisLabel.formatter = '{value}°';
          this.chartExtend.tooltip.formatter = params => {
            let res;
            if (params[1].data[1].includes('-') === false) {
              res = `<p>${params[1].data[1]}℃</p>`;
            } else if (params[2].data[1].includes('-') === false) {
              res = `<p>${params[2].data[1]}℃</p>`;
            } else if (params[3].data[1].includes('-') === false) {
              res = `<p>${params[3].data[1]}℃</p>`;
            } else {
              res = `<p>${params[4].data[1]}℃</p>`;
            }
            res += `<p>日期: ${params[0].data[1]}</p>`;
            res += `<p>时间: ${params[1].data[0]}</p>`;
            return res;
          };
        } else {
          this.chartExtend.yAxis.axisLabel.formatter = '{value}%';
          this.chartExtend.tooltip.formatter = params => {
            let res;
            if (params[1].data[1].includes('-') === false) {
              res = `<p>${params[1].data[1]}%</p>`;
            } else if (params[2].data[1].includes('-') === false) {
              res = `<p>${params[2].data[1]}%</p>`;
            } else if (params[3].data[1].includes('-') === false) {
              res = `<p>${params[3].data[1]}%</p>`;
            } else {
              res = `<p>${params[4].data[1]}%</p>`;
            }
            res += `<p>日期: ${params[0].data[1]}</p>`;
            res += `<p>时间: ${params[1].data[0]}</p>`;
            return res;
          };
        }
      }, 0);
    }
  }
};
</script>
