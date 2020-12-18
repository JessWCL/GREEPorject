<template>
  <gree-view :bg-color="statusBarColor" class="page-home">
    <gree-header
      theme="transparent"
      :title="devname"
      :left-options="{ preventGoBack: true }"
      @on-click-back="goBack"
      :right-options="{ showMore: !functype }"
      @on-click-more="moreInfo"
    />
    <gree-page no-navbar>
      <div class="page-header" :style="{ backgroundImage: 'url(' + head_bg + ')' }">
        <gree-row v-if="va_battery >= 0">
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
        <div class="battery-remind" v-if="va_battery >= 0">
          <h3>
            {{ $language('home.dumpEnergy') }} {{ va_battery }}%
            <div class="status" :class="{ low: va_battery <= lowBatteryLimit }">
              <div class="acid" :style="{ height: va_battery + '%' }" />
            </div>
          </h3>
        </div>
        <gree-activity-indicator class="battery-remind-loading" type="carousel" :size="10" color="white" v-else />
      </div>
      <div class="page-main">
        <gree-tab-bar class="custom-tab-bar" v-model="curTab" :items="items" :has-ink="false" @change="onChange" />
        <gree-row>
          <gree-col>
            <gree-radio name="1" v-model="timeMode" icon icon-inverse icon-disabled inline />
            <gree-radio name="2" v-model="timeMode" icon icon-inverse icon-disabled inline />
          </gree-col>
        </gree-row>
        <ve-line height="300px" :data="chartData" :data-zoom="dataZoom" :loading="loading" :settings="chartSettings" :extend="chartExtend">
          <div class="data-empty" v-if="Object.keys(lists).length === 0">{{ $language('home.noData') }}</div>
        </ve-line>
      </div>
      <div v-show="false">{{ va_humidity }} - {{ va_battery }} - {{ va_temperature }} - {{ ColorChange }}</div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Row, Col, Icon, TabBar, Radio, ActivityIndicator } from 'gree-ui';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import echarts from 'echarts';
import VeLine from 'v-charts/lib/line.common';
import { mapState, mapMutations, mapActions } from 'vuex';
// import demo from '@/mixins/config/data_week'; // 模拟数据
import { closePage, tuyaDeviceMore, changeBarColor, getDeviceRegulationLogs } from '../../../../static/lib/PluginInterface.promise';

dayjs.locale('zh-cn'); // 全局使用简体中文

// yyyyMMddHH，8位长度，即以天位粒度查询
// 如果按小时查，请使用10位查询，比如2020031301，即从2020年3月13号1点开始查
const TODAY = dayjs(new Date(new Date(new Date().toLocaleDateString()).getTime())).format('YYYYMMDDHH');
const NOW = dayjs(Date.now()).format('YYYYMMDDHH');
const Now8Bytes = dayjs(Date.now()).format('YYYYMMDD');
const WEEK_AGO = dayjs(new Date())
  .subtract(1, 'week')
  .format('YYYYMMDD');
const MONTH_AGO = dayjs(new Date())
  .subtract(1, 'month')
  .format('YYYYMMDD');

export default {
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [TabBar.name]: TabBar,
    [Radio.name]: Radio,
    [ActivityIndicator.name]: ActivityIndicator,
    VeLine
  },
  data() {
    // 设置区域缩放组件
    this.dataZoom = [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        handleSize: 14, // 滑动条左右2个按钮大小
        zoomOnMouseWheel: false,
        height: 6,
        left: 30,
        right: 40,
        bottom: 30,
        handleColor: '#ddd', // 滑动图标的颜色
        handleStyle: {
          borderColor: '#cacaca',
          borderWidth: '1',
          shadowBlur: 2,
          background: '#ddd',
          shadowColor: '#ddd'
        },
        fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          {
            offset: 0,
            color: '#3ea4de'
          },
          {
            offset: 1,
            color: '#5ccbb1'
          }
        ]),
        backgroundColor: '#ddd', // 两边未选中的滑动条区域的颜色
        showDataShadow: false, // 是否显示数据阴影 默认auto
        showDetail: false, // 即拖拽时候是否显示详细数值信息 默认true
        handleIcon:
          'M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z',
        filterMode: 'filter'
      },
      {
        type: 'inside',
        show: true,
        xAxisIndex: [0],
        start: 1,
        end: 100,
        zoomOnMouseWheel: false
      }
    ];
    return {
      statusBarColor: '#3ea4de',
      lowBatteryLimit: 20,
      curTab: 1,
      items: [
        { name: 1, label: '日' },
        { name: 2, label: '周' },
        { name: 3, label: '月' }
      ],
      timeMode: '1',
      loading: false,
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
      // return Math.round(parseFloat((this.dataObject.properties[0].value / 100).toFixed(1)));
      const humidity = [this.dataObject.properties[0].value].toString();
      return Math.round(humidity.substr(0, humidity.length - 1) / 10);
    },
    va_battery() {
      return this.dataObject.properties[1].value;
    },
    va_temperature() {
      return parseFloat(this.dataObject.properties[2].value / 100).toFixed(1);
    },
    /**
     * @description 主页面下更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      if (this.$route.name === 'Home') {
        color = this.statusBarColor;
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
          this.initLogs(this.mac, WEEK_AGO, Now8Bytes);
        } else if (this.curTab === 3) {
          this.initLogs(this.mac, MONTH_AGO, Now8Bytes);
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
          fontSize: 12
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
          fontSize: 12,
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
        // interval: 10, // 强制设置坐标轴分割间隔
        axisTick: {
          show: false // 是否显示坐标轴刻度
        },
        axisLabel: {
          fontSize: 12,
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
      console.log(`currentIndex: ${index}, prevIndex: ${prevIndex}, label: ${item.label}`);
      this.curTab = index + 1;
      if (index === 0) {
        this.initLogs(this.mac, TODAY, NOW);
      } else if (index === 1) {
        this.initLogs(this.mac, WEEK_AGO, Now8Bytes);
      } else if (index === 2) {
        this.initLogs(this.mac, MONTH_AGO, Now8Bytes);
      }
    },
    initLogs(mac, startTime, endTime) {
      this.loading = true;

      /* 模拟调试 Start */
      // this.lists = demo[0].result;
      // if (this.curTab === 2) {
      //   // 周 - 过滤多余数据
      //   Object.keys(this.lists).forEach(item => {
      //     if (
      //       item <=
      //       dayjs()
      //         .subtract(1, 'weeks')
      //         .format('YYYYMMDD')
      //     ) {
      //       delete this.lists[item];
      //     }
      //   });
      // } else if (this.curTab === 3) {
      //   // 月 - 过滤多余数据
      //   Object.keys(this.lists).forEach(item => {
      //     if (
      //       item <=
      //       dayjs()
      //         .subtract(1, 'month')
      //         .format('YYYYMMDD')
      //     ) {
      //       delete this.lists[item];
      //     }
      //   });
      // }
      // this.resizeEcharts();
      // setTimeout(() => {
      //   this.loading = false;
      // }, 200);
      /* 模拟调试 End */

      let code;
      if (this.timeMode === '1') {
        code = 'va_temperature';
      } else {
        code = 'va_humidity';
      }
      getDeviceRegulationLogs(this.mac, startTime, endTime, code)
        .then(res => {
          console.log(`getDeviceRegulationLogs => ${res}`);
          const __res = JSON.parse(res);
          if (__res.code === 200) {
            if (this.curTab === 1) {
              this.lists = __res.message.result.hours;
            } else {
              this.lists = __res.message.result.days;
              if (this.curTab === 2) {
                // 周 - 过滤多余数据
                Object.keys(this.lists).forEach(item => {
                  if (
                    item <=
                    dayjs()
                      .subtract(1, 'weeks')
                      .format('YYYYMMDD')
                  ) {
                    delete this.lists[item];
                  }
                });
              } else if (this.curTab === 3) {
                // 月 - 过滤多余数据
                Object.keys(this.lists).forEach(item => {
                  if (
                    item <=
                    dayjs()
                      .subtract(1, 'month')
                      .format('YYYYMMDD')
                  ) {
                    delete this.lists[item];
                  }
                });
              }
            }
            this.resizeEcharts();
          } else {
            console.error(__res.message);
          }
          setTimeout(() => {
            this.loading = false;
          }, 200);
          return res;
        })
        .catch(err => {
          err;
        });
    },
    resizeEcharts() {
      let rows = [];
      if (Object.keys(this.lists).length > 0) {
        Object.keys(this.lists).forEach((item, index) => {
          const date = dayjs(item).format('YYYY-M-DD');
          const time = dayjs(item).format('HH:mm');
          const weekOfDay = dayjs(item).format('dddd');
          const dayOfMonth = dayjs(item).format('D');
          const value = this.curTab === 1 ? parseInt(this.lists[item], 0) : this.lists[item];
          rows[index] = { date, time, weekOfDay, dayOfMonth, value };
        });
        if (this.curTab === 1) {
          this.chartData = {
            columns: ['time', 'date', 'value'],
            rows
          };
        } else if (this.curTab === 2) {
          this.chartData = {
            columns: ['weekOfDay', 'date', 'value'],
            rows
          };
        } else {
          this.chartData = {
            columns: ['dayOfMonth', 'date', 'value'],
            rows
          };
        }
      }
      setTimeout(() => {
        if (this.curTab === 2) {
          this.chartExtend.xAxis.axisLabel.interval = 0;
        } else {
          this.chartExtend.xAxis.axisLabel.interval = 'auto';
        }
        if (this.timeMode === '1') {
          this.chartExtend.yAxis.axisLabel.formatter = '{value}°';
          this.chartExtend.tooltip.formatter = params => {
            let res = `<p>${params[1].data[1]}℃</p>`;
            res += `<p>日期: ${params[0].data[1]}</p>`;
            if (this.curTab === 1) {
              res += `<p>时间: ${params[1].data[0]}</p>`;
            }
            return res;
          };
        } else {
          this.chartExtend.yAxis.axisLabel.formatter = '{value}%';
          this.chartExtend.tooltip.formatter = params => {
            let res = `<p>${params[1].data[1]}%</p>`;
            res += `<p>日期: ${params[0].data[1]}</p>`;
            if (this.curTab === 1) {
              res += `<p>时间: ${params[1].data[0]}</p>`;
            }
            return res;
          };
        }
      }, 0);
    }
  }
};
</script>
