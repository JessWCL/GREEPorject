<!--
 * @Author: Jerry-Rain
 * @Date: 2019-12-04 13:42:37
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-04-28 14:59:12
 * @Description: 这是睡眠报告页
 -->
<template>
  <gree-view class="page-report" bg-color="#3674E7">
    <!-- 头部  -->
    <div class="page-header">
      <gree-header
        :style="{ backgroundImage: 'url(' + head_bg + ')' }"
        :left-options="{ preventGoBack: true }"
        :right-options="{ showMore: true }"
        @on-click-back="goBack()"
        @on-click-more="moreInfo()"
      >
        睡眠报告 智韵
      </gree-header>
    </div>
    <!-- 页面内容 -->
    <gree-page class="page-content">
      <!-- 头部高度占位 -->
      <div
        class="header-block"
        :style="{ backgroundImage: 'url(' + head_bg + ')' }"
      >
        <div class="header-content">
          <gree-row class="button-group">
            <gree-button
              class="day"
              :class="{ selected: btnIndex === '日' ? true : false }"
              @click="btnGroup('日')"
            >日</gree-button
            >
            <gree-button
              class="week"
              :class="{ selected: btnIndex === '周' ? true : false }"
              @click="btnGroup('周')"
            >周</gree-button
            >
            <gree-button
              class="month"
              :class="{ selected: btnIndex === '月' ? true : false }"
              @click="btnGroup('月')"
            >月</gree-button
            >
          </gree-row>

          <gree-row class="date-select" v-if="btnIndex === '日'">
            <gree-icon
              name="arrow-left"
              size="lg"
              @click="before()"
              :style="{
                opacity:
                  dayDateIndex === getDateList.length - 1 ||
                  getDateList.length === 0
                    ? '0'
                    : '1'
              }"
            ></gree-icon>
            <div class="date-txt" @click="selectDate()">{{ dateShow }}</div>
            <gree-icon
              name="arrow-right"
              size="lg"
              @click="after()"
              :style="{ opacity: dayDateIndex === 0 ? '0' : '1' }"
            ></gree-icon>
          </gree-row>

          <gree-row class="date-select" v-if="btnIndex === '周'">
            <gree-icon
              name="arrow-left"
              size="lg"
              @click="beforeWeek()"
            ></gree-icon>
            <div class="date-txt">
              {{ dateWeekShow }}
            </div>
            <gree-icon
              name="arrow-right"
              size="lg"
              @click="afterWeek()"
            ></gree-icon>
          </gree-row>

          <gree-row class="date-select" v-if="btnIndex === '月'">
            <gree-icon
              name="arrow-left"
              size="lg"
              @click="beforeMonth()"
            ></gree-icon>
            <div class="date-txt">
              {{ dateMonthShow }}
            </div>
            <gree-icon
              name="arrow-right"
              size="lg"
              @click="afterMonth()"
            ></gree-icon>
          </gree-row>

          <div class="circle-show">
            <gree-progress
              type="dashboard"
              :width="160"
              :stroke-width="3.5"
              :value="circleValue"
              color="#2CB9FF"
            >
            </gree-progress>
            <div class="txt-show">
              <div v-if="btnIndex === '日'">睡眠评分</div>
              <div v-else>平均得分</div>
              <div>
                {{ Math.round(circleValue * 100) || '--' }}
              </div>
              <div
                v-if="btnIndex === '日'"
                v-html="sleepModel || '&nbsp;'"
              ></div>
              <div v-else v-html="'&nbsp;'" />
            </div>
          </div>

          <div class="bottom_show" v-if="btnIndex === '日'">
            <gree-row>
              <gree-col>{{ turnOver }}次</gree-col>
              <gree-col>{{ meanHeartRate }}</gree-col>
              <gree-col>{{ meanBreathRate }}次/分</gree-col>
            </gree-row>
            <gree-row>
              <gree-col>体动次数</gree-col>
              <gree-col>平均心率</gree-col>
              <gree-col>呼吸频率</gree-col>
            </gree-row>
          </div>
          <div class="bottom_show" v-else>
            <gree-row>
              <gree-col>{{ WMTotal }}</gree-col>
              <gree-col>{{ WMMeanEnterSleepDuration }}</gree-col>
            </gree-row>
            <gree-row>
              <gree-col>总记录数</gree-col>
              <gree-col>平均睡眠</gree-col>
            </gree-row>
          </div>
        </div>
      </div>
      <!-- 睡眠模块 -->
      <div key="日" class="sleep-board" v-show="btnIndex === '日'">
        <gree-row class="title"
        ><img :src="sleepPic" /><span>睡眠</span></gree-row
        >
        <gree-row class="time-txt">
          <span>睡眠时长 {{ sleepDuration }}</span>
        </gree-row>
        <gree-row class="chart" v-show="blockWidth.length">
          <div
            v-for="(item, index) in blockWidth"
            :key="index"
            :style="{
              height: '30px',
              width: item,
              background: colorList[index]
            }"
          ></div>
        </gree-row>
        <gree-row class="til">
          <span>入睡 {{ sleepStartAt || '-:-' }}</span>
          <span>起床 {{ sleepEndAt || '-:-' }}</span>
        </gree-row>
        <gree-row class="first-data">
          <span>{{ wakeDuration }}</span>
          <span>{{ nrDuration }}</span>
          <span>{{ deepDuration }}</span>
        </gree-row>
        <gree-row class="first-title">
          <span>
            <div :style="{ background: '#FFD33B' }" />
          清醒</span
          >
          <span>
            <div :style="{ background: '#72B0FE' }" />
          浅睡</span
          >
          <span>
            <div :style="{ background: '#008DEF' }" />
          深睡</span
          >
        </gree-row>
        <gree-row class="second-data">
          <span>{{ remDuration }}</span>
          <span>{{ leaveBedDuration }}</span>
          <span style="opacity: 0;">0时00分</span>
        </gree-row>
        <gree-row class="second-title">
          <span>
            <div :style="{ background: '#7BE3E1' }" />
          REM</span
          >
          <span>
            <div :style="{ background: '#314EFE' }" />
          离床</span
          >
          <span style="opacity: 0;">没用</span>
        </gree-row>
      </div>
      <div
        key="周"
        class="sleep-board"
        v-show="btnIndex === '周' || btnIndex === '月'"
      >
        <gree-row class="title"
        ><img :src="sleepPic" /><span>睡眠评分</span></gree-row
        >
        <gree-row class="chart-zoom">
          <div class="container" ref="week"></div>
        </gree-row>
      </div>
      <!-- <div key="月" class="sleep-board" v-show="btnIndex === '月'">
        <gree-row class="title"
        ><img :src="sleepPic" /><span>睡眠评分</span></gree-row
        >
        <gree-row class="chart-zoom">
          <div class="container" ref="month"></div>
        </gree-row>
      </div> -->

      <div v-show="btnIndex === '日'">
        <!-- 心率模块 -->
        <div class="grap-block" />
        <div class="heart-board">
          <gree-row class="title"
          ><img :src="heartPic" /><span>心率</span></gree-row
          >
          <gree-row class="chart">
            <div class="container" ref="heart"></div>
          </gree-row>
          <gree-row class="data">
            <gree-col>{{ maxHeartRate }}次/分</gree-col>
            <gree-col>{{ minHeartRate }}次/分</gree-col>
          </gree-row>
          <gree-row class="txt">
            <gree-col>最高心率</gree-col>
            <gree-col>最低心率</gree-col>
          </gree-row>
        </div>
        <div class="grap-block" />
        <!-- 呼吸模块 -->
        <div class="breath-board">
          <gree-row class="title"
          ><img :src="breathPic" /><span>呼吸</span></gree-row
          >
          <gree-row class="chart">
            <div class="container" ref="breath"></div>
          </gree-row>
          <gree-row class="data-first">
            <gree-col>{{ maxBreathRate }}次/分</gree-col>
            <gree-col>{{ minBreathRate }}次/分</gree-col>
          </gree-row>
          <gree-row class="txt-first">
            <gree-col>最高呼吸值</gree-col>
            <gree-col>最低呼吸值</gree-col>
          </gree-row>
          <gree-row class="data-second">
            <gree-col>{{ breath_pause10_count }}次</gree-col>
            <gree-col>{{ breath_avg_pause }}秒</gree-col>
          </gree-row>
          <gree-row class="txt-second">
            <gree-col>呼吸暂停次数</gree-col>
            <gree-col>呼吸暂停时间</gree-col>
          </gree-row>
        </div>
      </div>

      <div v-show="btnIndex === '周' || btnIndex === '月'">
        <!-- 心率模块 -->
        <div class="grap-block" />
        <div class="heart-board">
          <gree-row class="title"
          ><img :src="heartPic" /><span>心率</span></gree-row
          >
          <gree-row class="chart">
            <div class="container" ref="weekHeart"></div>
          </gree-row>
          <gree-row class="data">
            <gree-col>{{ WMMaxHeartRate }}次/分</gree-col>
            <gree-col>{{ WMMinHeartRate }}次/分</gree-col>
          </gree-row>
          <gree-row class="txt">
            <gree-col>最高心率</gree-col>
            <gree-col>最低心率</gree-col>
          </gree-row>
        </div>
        <div class="grap-block" />
        <!-- 呼吸模块 -->
        <div class="breath-board">
          <gree-row class="title"
          ><img :src="breathPic" /><span>呼吸</span></gree-row
          >
          <gree-row class="chart">
            <div class="container" ref="weekBreath"></div>
          </gree-row>
          <gree-row class="data-first">
            <gree-col>{{ WMMaxBreathRate }}次/分</gree-col>
            <gree-col>{{ WMMinBreathRate }}次/分</gree-col>
          </gree-row>
          <gree-row class="txt-first">
            <gree-col>最高呼吸值</gree-col>
            <gree-col>最低呼吸值</gree-col>
          </gree-row>
        </div>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import echarts from 'echarts';
import dayjs from 'dayjs';
import {
  editDevice,
  showLoading,
  hideLoading,
  showToast,
  musiGetData
} from '../../../../static/lib/PluginInterface.promise';
import {
  Header,
  Row,
  Col,
  Icon,
  ToolBar,
  ErrorPage,
  Button,
  TabBar,
  Block,
  Divider,
  Progress
} from 'gree-ui';
import { sleepReport, weekMonthReport, femade } from '@/api/70403/mock.js';
import echartsOpt from '../../mixins/config/70403/echarts.js';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'SleepReport',
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [ToolBar.name]: ToolBar,
    [ErrorPage.name]: ErrorPage,
    [Button.name]: Button,
    [TabBar.name]: TabBar,
    [Block.name]: Block,
    [Divider.name]: Divider,
    [Progress.name]: Progress
  },
  mixins: [echartsOpt],
  data() {
    return {
      DEBUG: false,
      dateShow: '',
      dateMonthShow: new Date().getMonth() + 1,
      dateMonthTime: new Date(),
      dateWeekShow: new Date(),
      dateWeekStart: '',
      dateWeekEnd: '',
      dateTime: new Date(new Date() - 24 * 60 * 60 * 1000),
      circleValue: 0.91, // 圆圈的百分比
      head_bg: require('@/assets/img/bg_header_on.png'),
      current: 1,
      btnIndex: '日',
      currentRate: 50,
      breathPic: require('@/assets/img/breath.png'),
      sleepPic: require('@/assets/img/sleep.png'),
      heartPic: require('@/assets/img/heart.png'),
      sleepList: [
        { width: '10%', color: '#72B0FE' },
        { width: '40%', color: '#008DEF' },
        { width: '20%', color: '#7BE3E1' },
        { width: '30%', color: '#324FFE' }
      ],
      gradientColor: {
        '0%': '#6ED4FF',
        '100%': '#30BAFF'
      },
      items: [
        { name: 1, label: '日' },
        { name: 2, label: '周' },
        { name: 3, label: '月' }
      ],

      result: null,
      turnOver: '-',
      heart_beat_average: '-', // 平均心率
      snore: '-',
      sleepModel: '',
      meanBreathRate: '-',
      meanHeartRate: '-',
      sleepDuration: '-时-分',
      sleepStartAt: '-:-',
      sleepEndAt: '-:-',
      wakeDuration: '-',
      nrDuration: '-',
      deepDuration: '-',
      leaveBedDuration: '-',
      remDuration: '-',
      maxHeartRate: '-',
      minHeartRate: '-',
      maxBreathRate: '-',
      minBreathRate: '-',
      heartAverage: '-:-',
      heartTimeLog: '',
      breathTimeLog: '',
      breath_pause10_count: '-',
      breath_avg_pause: '-',
      WMTotal: '-', // 周月 总记录数
      WMMeanEnterSleepDuration: '-', // 平均睡眠
      WMMaxHeartRate: '-', // 周月最大心率
      WMMinHeartRate: '-', // 周月最小心率
      WMMaxBreathRate: '-', // 周月最大呼吸
      WMMinBreathRate: '-', // 周月最小呼吸

      blockWidth: [], // 时间碎片图 宽度配置表
      colorList: [], // 时间碎片图 颜色配置表
      dayDateIndex: 0, // 日 时间列表选择序号
      heart: '', // 日 心率
      breath: '', // 日 呼吸
      week: '', // 周月
      weekHeart: '', // 周 心率
      weekBreath: '' // 周 呼吸
    };
  },
  computed: {
    ...mapState({
      getSleepData: state => state.apiObject.getSleepData,
      getWeekList: state => state.apiObject.getWeekList,
      getDateList: state => state.apiObject.getDateList,
      mac: state => state.mac,
    })
  },
  watch: {
    dateShow: {
      handler(newv) {
        console.log('%c 日 >自动查询', 'color: brown;', newv);
        this.getDayReport();
      }
    },
    dateWeekShow: {
      handler(newv) {
        console.log('%c 周 >自动查询', 'color: blue;', newv);
        this.getWeekReport();
      }
    },
    dateMonthShow: {
      handler(newv) {
        console.log('%c 月 >自动查询', 'color: red;', newv);
        this.getMonthReport();
      }
    },
    btnIndex: {
      handler(newv) {
        switch (newv) {
          case '日':
            this.dateTime = new Date();
            if (this.dateShow === this.getDateList[0]) {
              console.log('%c 日-手动查询', 'color: brown;');
              this.getDayReport();
              this.dayDateIndex = 0;
            } else {
              this.dateShow = this.getDateList[0];
              this.dayDateIndex = 0;
            }
            break;
          case '周':
            if (
              this.dateWeekShow ===
              `${this.dateFormat(
                new Date(this.dateWeekStart)
              )}-${this.dateFormat(new Date(this.dateWeekEnd))}`
            ) {
              console.log('%c 周-手动查询', 'color: blue;');
              this.getWeekReport();
            } else {
              this.getWeekStartAndEnd(this.dateTime);
            }
            break;
          case '月':
            if (
              this.dateMonthShow ===
              `${dayjs(this.dateTime).format('YYYY/MM/01')}-${dayjs(
                dayjs(this.dateTime).endOf('month')
              ).format('YYYY/MM/DD')}`
            ) {
              console.log('%c 月-手动查询', 'color: red;');
              this.getMonthReport();
            } else {
              this.dateMonthShow = `${dayjs(this.dateTime).format(
                'YYYY/MM/01'
              )}-${dayjs(dayjs(this.dateTime).endOf('month')).format(
                'YYYY/MM/DD'
              )}`;
            }
            break;
          default:
            break;
        }
      }
      // immediate: true
    }
  },
  mounted() {
    // await this.getDateListReport(); // 获取报告历史日期列表
    this.dateShow = this.getDateList[0];
    this.initChartsRef(); // 初始化图表定义
    if (this.DEBUG) {
      this.init(); // 日 报告初始化
      this.initChart(); // 日 图表初始化
      this.initWeek(); // 周 初始化
      this.initWeekChart(); // 周 图表初始化
    }
  },
  methods: {
    ...mapMutations({
      setApiObject: 'SET_API_OBJECT'
    }),
    // 日  报告
    getDayReport() {
      showLoading();
      this.clearDate();
      const data = {
        startAt: dayjs(new Date(this.dateShow)).subtract(1, 'day').format(
          'YYYY/MM/DD 00:00:00'
        ),
        endAt: dayjs(new Date(this.dateShow)).subtract(1, 'day').format(
          'YYYY/MM/DD 23:59:59'
        ),
      };
      console.log('日-报告：', [data.startAt, data.endAt]);
      musiGetData('00046DAFB309', data, 'getDerucciGetSleepData')
        .then(res => {
          this.loadingStay();
          if (!res) {
            console.log('返回的数据异常： ', res);
          } else {
            console.log('查询到的 日 睡眠报告', JSON.parse(res));
            this.setApiObject({ getSleepData: JSON.parse(res) });
            this.init(); // 日 报告初始化
          }
        })
        .catch(this.loadingStay());
    },
    // 周  睡眠报告
    getWeekReport() {
      showLoading();
      this.clearDate();
      const data = {
        startAt: dayjs(this.dateWeekStart).format(
          'YYYY/MM/DD 00:00:00'
        ),
        endAt: dayjs(this.dateWeekEnd).format(
          'YYYY/MM/DD 23:59:59'
        ),
      };
      console.log('周-报告：', [data.startAt, data.endAt]);
      musiGetData('00046DAFB309', data, 'getDerucciWeekList')
        .then(res => {
          this.loadingStay();
          if (!res) {
            showToast('数据异常', 0);
          } else {
            const result = JSON.parse(res);
            result.code !== 200 ? showToast('请求异常', 0) : '';
            console.log('查询到的 周报告 ', result);
            this.setApiObject({ getWeekList: result });
            result.message.result.list ? '' : showToast('本周没有睡眠数据哦', 0);
            this.initWeek(); // 周 初始化
          }
        })
        .catch(this.loadingStay());
    },
    // 月  睡眠报告
    getMonthReport() {
      showLoading();
      this.clearDate();
      const data = {
        startAt: dayjs(this.dateMonthTime).format('YYYY/MM/01'),
        endAt: dayjs(dayjs(this.dateMonthTime).endOf('month')).format(
          'YYYY/MM/DD'
        )
      };
      console.log(' 月-报告：', [data.startAt, data.endAt]);
      musiGetData('00046DAFB309', data, 'getDerucciWeekList')
        .then(res => {
          this.loadingStay();
          if (!res) {
            showToast('数据异常', 0);
          } else {
            const result = JSON.parse(res);
            result.code !== 200 ? showToast('请求异常', 0) : '';
            console.log('查询到的 月报告 ', result);
            this.setApiObject({ getWeekList: result });
            result.message.result.list ? '' : showToast('本月没有睡眠数据哦', 0);
            this.initWeek(); // 月 初始化
          }
        })
        .catch(this.loadingStay());
    },
    // 日期列表
    async getDateListReport() {
      showLoading();
      const data = {
        startAt: '2019/11/01 00:00:00',
        endAt: `${dayjs().format('YYYY/MM/DD 00:00:00')} `
      };
      console.log('查询日期↓ ', [data.startAt, data.endAt]);
      await musiGetData('00046DAFB309', data, 'getDerucciGetDateList')
        .then(res => {
          this.loadingStay();
          if (!res) {
            console.log('返回的数据异常： ', res);
          } else {
            try {
              const result = JSON.parse(res);
              const list = result.message.result;
              result.code !== 200 ? showToast('请求异常', 0) : '';
              console.log('日期： ', list);
              let femade = null;
              list.length > 10 ? femade = list.slice(0, -10) : femade = [];
              this.setApiObject({
                getDateList: list
              });
              this.setApiObject({
                getDateListFemade: femade
              });
              this.dateShow = dayjs(list[0]).format('YYYY/MM/DD');
              if (list[0].length === 0) {
                showToast('您还没有睡眠数据哦', 0);
              }
              this.dateShow = list[0]; // 每次切换回到最近一天        
            } catch (error) {
              console.log('!!!日期发生错误： ', error);
            }    
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    },
    // 初始化echarts
    initChartsRef() {
      const name = ['heart', 'breath', 'week', 'weekHeart', 'weekBreath'];
      for (const item of name) {
        this[item] = echarts.init(this.$refs[item]);
      }
    },
    // 日 报告初始化
    init() {
      let result = '';
      this.DEBUG
        ? (result = sleepReport.message.result)
        : (result = this.getSleepData.message.result);
      this.result = result;

      try {
        this.circleValue = this.result.score * 0.01; // 评分
        this.turnOver = this.result.turnOver; // 翻身次数
        this.snore = this.result.snore; // 分数次数
        this.sleepModel = this.result.sleepModel.substring(
          0,
          this.result.sleepModel.length - 5
        ); // 睡眠模式
        this.meanBreathRate = this.result.meanBreathRate; // 平均呼吸率
        this.meanHeartRate = this.result.meanHeartRate; // 平均心率

        this.sleepDuration = this.initSleepDuration(
          this.result.enterSleepDuration
        ); // 睡眠总时长
        this.sleepStartAt = this.initSleepStartEnd(this.result.sleepStartAt); // 睡眠开始时间
        this.sleepEndAt = this.initSleepStartEnd(this.result.sleepEndAt); // 睡眠开始时间
        this.wakeDuration = this.initSleepDuration(this.result.wakeDuration); // 清醒
        this.nrDuration = this.initSleepDuration(
          this.result.nrDuration + this.result.nr2Duration
        ); // 浅睡
        this.deepDuration = this.initSleepDuration(this.result.deepDuration); // 深睡
        this.leaveBedDuration = this.initSleepDuration(
          this.result.leaveBedDuration
        ); // 离床
        this.remDuration = this.initSleepDuration(this.result.remDuration); // REM快速眼球跳动

        // TODO:## 现在报告里面缺失 ##
        this.breath_pause10_count = this.searchArrIdJson(
          'breath_pause10_count'
        ); // 呼吸暂停次数
        this.breath_avg_pause = this.searchArrIdJson('breath_avg_pause'); // 呼吸暂停总长

        this.heartTimeLog = this.searchArrIdJson('rd_heart_beat'); // 心率波动图
        this.breathTimeLog = this.searchArrIdJson('rd_breath'); // 呼吸波动图

        this.initTimeChart(result.sleepStage); // 绘制时间碎片图

        this.initChart();
      } catch (error) {
        console.log('数据解析异常： ', error);
        showToast('数据异常', 0);
      }
    },
    // 日图标初始化
    initChart() {
      try {
        this.heartOption.xAxis.data = this.selectChartDate(
          this.formatLabel(this.heartTimeLog)
        );
        this.heartOption.series[0].data = this.selectChartDate(
          this.heartTimeLog.XDataValue
        );
        const hxd = this.heartOption.series[0].data;
        if (hxd.length === 0 || !hxd) {
          this.maxHeartRate = '-';
          this.maxHeartTime = '-:-';
          // 取出最小值
          this.minHeartRate = '-';
          this.minHeartTime = '-:-';
        } else {
          // 取出最大值
          this.maxHeartRate = Math.max(...hxd);
          this.maxHeartTime = this.heartOption.xAxis.data[
            hxd.findIndex(el => el === Math.max(...hxd))
          ];
          // 取出最小值
          this.minHeartRate = Math.min(...hxd);
          this.minHeartTime = this.heartOption.xAxis.data[
            hxd.findIndex(el => el === Math.min(...hxd))
          ];
        }
        this.heart.setOption(this.heartOption, true);

        this.breathOption.xAxis.data = this.selectChartDate(
          this.formatLabel(this.breathTimeLog)
        );
        this.breathOption.series[0].data = this.selectChartDate(
          this.breathTimeLog.XDataValue
        );
        // 取出最大值
        const bxd = this.breathOption.series[0].data;
        if (bxd.length === 0 || !bxd) {
          this.maxBreathRate = '-';
          this.minBreathRate = '-';
          this.maxBreathTime = '-:-';
          this.minBreathTime = '-:-';
        } else {
          this.maxBreathRate = Math.max(...bxd);
          this.maxBreathTime = this.breathOption.xAxis.data[
            bxd.findIndex(el => el === Math.max(...bxd))
          ];
          this.minBreathRate = Math.min(...bxd);
          this.minBreathTime = this.breathOption.xAxis.data[
            bxd.findIndex(el => el === Math.min(...bxd))
          ];
        }
      } catch (error) {
        console.log('初始化图标失败： ', error);
        showToast('数据异常', 0);
      }

      this.breath.setOption(this.breathOption, true);
      this.$nextTick(() => {
        this.heart.resize();
        this.breath.resize();
      });
    },
    // 周图表数据和图表初始化
    initWeekChart() {
      let result = '';
      this.DEBUG
        ? (result = sleepReport.message.result)
        : (result = this.getWeekList.message.result);
      this.result = result;

      try {
        // this.weekHeartTimeLog = this.searchArrIdJson('rd_heart_beat'); // 心率波动图
        // this.weekBreathTimeLog = this.searchArrIdJson('rd_breath'); // 呼吸波动图

        // 周接口处理方法
        this.weekOption.xAxis.data = this.weekDateList;
        this.weekOption.series[0].data = this.weekScoreList;
        this.weekHeartOption.xAxis.data = this.weekDateList;
        this.weekHeartOption.series[0].data = this.weekHeartList;
        this.weekBreathOption.xAxis.data = this.weekDateList;
        this.weekBreathOption.series[0].data = this.weekBreathList;
        this.WMMaxHeartRate = Math.max(...this.weekHeartList);
        this.WMMinHeartRate = Math.min(...this.weekHeartList);
        this.WMMaxBreathRate = Math.max(...this.weekBreathList);
        this.WMMinBreathRate = Math.min(...this.weekBreathList);
      } catch (err) {
        console.log(err);
        showToast('数据异常', 0);
      }

      this.week.setOption(this.weekOption, true);
      this.weekHeart.setOption(this.weekHeartOption, true);
      this.weekBreath.setOption(this.weekBreathOption, true);

      this.$nextTick(() => {
        this.week.resize();
        this.weekHeart.resize();
        this.weekBreath.resize();
      });
    },
    // 初始化周数据
    initWeekList(list, type) {
      const L = [];
      list.forEach(item => {
        L.push(item[type]);
      });
      return L;
    },
    // 初始化 周数据 不包括图表数据
    initWeek() {
      let result = '';
      this.DEBUG
        ? (result = weekMonthReport.message.result)
        : (result = this.getWeekList.message.result);
      if (result.list === null) {
        // this.clearDate()
        console.log('数据为空', result);
        return;
      }
      try {
        this.weekScoreList = this.initWeekList(result.list, 'score'); // 平均睡眠分数的数组
        this.weekHeartList = this.initWeekList(result.list, 'meanHeartRate'); // 平均心率分数的数组
        this.weekBreathList = this.initWeekList(result.list, 'meanBreathRate'); // 平均胡须分数的数组
        this.weekDateList = this.initWeekDateList(result.list); // 平均睡眠的时间列表
        this.WMMeanEnterSleepDuration = this.initSleepDuration(
          result.meanEnterSleepDuration
        ); // 平均睡眠时间
        this.WMTotal = result.total; // 总记录数
        this.circleValue = result.meanScore * 0.01; // 平均评分
      } catch (error) {
        showToast('数据异常', 0);
      }
      this.initWeekChart();
    },
    // 筛选50条数据
    selectChartDate(list) {
      const L = [];
      const limit = 50;
      const i = parseInt(list.length / limit);
      const rest = list.length % limit;
      if (list.length > 50) {
        for (let j = 0; j < 50; j++) {
          if (j * i > list.length) {
            break;
          }
          L.push(list[i * j]);
        }
        // console.log('L =   ', L);
        return L;
      } else if (list.length <= 50) {
        return list;
      }
      return L;
    },
    // 初始化周评分
    initWeekScoreList(list) {
      const L = [];
      list.forEach(item => {
        L.push(item.score);
      });
      return L;
    },
    // 初始化周数据
    initWeekDateList(list) {
      const L = [];
      list.forEach(item => {
        L.push(item.createAt.substr(5, 6));
      });
      return L;
    },
    // 格式化Json time 00:00
    initJsontime(name) {
      return this.initDayXTime(
        this.result.attrs.find(item => item.healthResultAttr.name === name)
          .value.time
      );
    },
    // 获取对应name json内容
    searchArrIdJson(name) {
      return this.result.attrs.find(item => {
        if (!item.healthResultAttr) return false;
        return item.healthResultAttr.name === name;
      }).value;
    },
    // 时分 的 格式化
    initSleepDuration(date) {
      const hour = Math.floor(date / 3600);
      const mins = date % 60;
      return `${hour}时${mins}分`;
    },
    // 00:00 的 格式化
    initSleepStartEnd(date) {
      return date ? dayjs(date).format('HH:mm') : '';
    },
    // 00:00 的 格式化
    initDayXTime(date) {
      return dayjs(date).format('HH:mm');
    },
    // 格式化图标labels
    formatLabel(list) {
      const LIST = [];
      list.XDataTime.forEach((date, index) => {
        LIST[index] = this.initDayXTime(date);
      });
      return LIST;
    },
    //  格式化周的labels
    formatWeekLabel(list) {
      const LIST = [];
      list.labels.forEach((date, index) => {
        LIST[index] = date.toString().substring(5, 10);
      });
      return LIST;
    },
    // 获取一周的时间
    getWeekStartAndEnd(timestamp) {
      const oneDayTime = 1000 * 60 * 60 * 24; // 一天里一共的毫秒数
      const today = timestamp ? new Date(timestamp) : new Date();
      const todayDay = today.getDay() || 7; // 若那一天是周末时，则强制赋值为7
      const startDate = new Date(today.getTime() - oneDayTime * (todayDay - 1));
      const endDate = new Date(today.getTime() + oneDayTime * (7 - todayDay));
      this.dateWeekStart = startDate;
      this.dateWeekEnd = endDate;
      this.dateWeekShow = `${this.dateFormat(startDate)}-${this.dateFormat(
        endDate
      )}`;
    },
    // 日期格式化 => 2020/10/20
    dateFormat(date) {
      return dayjs(date).format('YYYY/MM/DD');
    },
    // 上一天
    before() {
      const B = this.getDateList.length - 1;
      const L = this.getDateList;
      if (this.dayDateIndex < B) {
        this.dayDateIndex++;
        this.dateShow = L[this.dayDateIndex];
        console.log('< 上一天', this.dayDateIndex);
      } else {
        console.log('到头了', B);
      }
    },
    // 下一天
    after() {
      const B = this.getDateList.length - 1;
      const L = this.getDateList;
      if (this.dayDateIndex > 0) {
        this.dayDateIndex--;
        this.dateShow = L[this.dayDateIndex];
        console.log('> 下一天', this.dayDateIndex);
      } else {
        console.log('到头了', B);
      }
    },
    // 上一周
    beforeWeek() {
      const nextDate = new Date(
        this.dateTime.getTime() - 1000 * 60 * 60 * 24 * 7
      );
      this.dateTime = new Date(nextDate);
      this.getWeekStartAndEnd(nextDate);
    },
    // 下一周
    afterWeek() {
      const newDate = new Date(new Date()); // 当前时间
      const nextDate = new Date(
        this.dateTime.getTime() + 1000 * 60 * 60 * 24 * 7
      );
      if (Date.parse(nextDate) > Date.parse(newDate)) {
        console.log('下周不能选');
      } else {
        console.log('> 下一周');
        this.dateTime = new Date(nextDate);
        this.getWeekStartAndEnd(nextDate);
      }
    },
    // 上一月
    beforeMonth() {
      const now = this.dateMonthShow.substr(0, 10);
      const lastMonth = dayjs(now).subtract(1, 'month');
      const newDate = `${lastMonth.format('YYYY/MM/01')}-${dayjs(
        dayjs(lastMonth).endOf('month')
      ).format('YYYY/MM/DD')}`;
      this.dateMonthTime = lastMonth.format('YYYY/MM/01');
      this.dateMonthShow = newDate;
    },
    // 下一月
    afterMonth() {
      const now = this.dateMonthShow.substr(0, 10);
      const nextMonth = dayjs(now).add(1, 'month');
      if (dayjs(nextMonth) < dayjs()) {
        const newDate = `${nextMonth.format('YYYY/MM/01')}-${dayjs(
          dayjs(nextMonth).endOf('month')
        ).format('YYYY/MM/DD')}`;
        this.dateMonthTime = nextMonth.format('YYYY/MM/01');
        this.dateMonthShow = newDate;
      }
    },
    selectDate() {
      // TODO:
      console.log('选择时间');
    },
    btnGroup(name) {
      this.btnIndex = name;
      // console.log('点击了', this.btnIndex);
      switch (name) {
        case '日':
          // this.dateShow = this.dateFormat(this.dateTime);
          break;
        case '周':
          // this.getWeekStartAndEnd(this.dateTime);
          break;
        case '月':
          // this.dateMonthShow = `${dayjs(this.dateTime).format(
          //   'YYYY/MM/01',
          // )}-${dayjs(dayjs(this.dateTime).endOf('month')).format(
          //   'YYYY/MM/DD',
          // )}`;
          break;
        default:
          break;
      }
    },
    // 延迟关闭showLoading
    loadingStay() {
      setTimeout(() => {
        hideLoading();
      }, 1000);
    },
    // 处理碎片图宽度 和 颜色
    widthAndColor(list, limit, j) {
      list.forEach((e, index) => {
        const rate =
          ((1 / j) * 100).toFixed(5);
        if (!isNaN(rate)) {
          this.blockWidth[index] = `${rate}%`;
          switch (e.stage) {
            case 0: // 清醒
              this.colorList[index] = '#FFD33B';
              break;
            case 1: // 浅睡
              this.colorList[index] = '#72B0FE';
              break;
            case 2: // 深睡
              this.colorList[index] = '#008DEF';
              break;
            case 3: // 浅睡
              this.colorList[index] = '#72B0FE';
              break;
            case 4: // 深睡
              this.colorList[index] = '#008DEF';
              break;
            case 5: // 浅睡 REM
              this.colorList[index] = '#72B0FE';
              break;
            case 6: // 清醒
              this.colorList[index] = '#FFD33B';
              break;
            default:
              // 浅睡
              this.colorList[index] = '#FFD33B';
              break;
          }
        } else {
          console.log('一条数据有误');
        }
      });
      console.log('颜色', this.colorList);
      console.log('比例', this.blockWidth);
    },
    // 每隔10筛选1条数据
    selectData(list) {
      const L = [];
      const limit = Math.ceil(list.length / (window.innerWidth * 0.9));
      let j = 0;
      for (let i = 0; i < list.length; i = limit + i) {
        if (i % limit === 0) {
          L[j] = list[i];
          j++;
        }
      }
      return this.widthAndColor(L, limit, j);
    },
    // 绘制时间碎片图
    initTimeChart(sleepStage) {
      // 去除长度
      // const long =
      //   sleepStage[sleepStage.length - 1].startAt - sleepStage[0].endAt;
      this.selectData(sleepStage);
    },
    // 清空显示所有数据
    clearDate() {
      this.week = echarts.init(this.$refs.week);
      this.heart = echarts.init(this.$refs.heart);
      this.breath = echarts.init(this.$refs.breath);
      this.weekHeart = echarts.init(this.$refs.weekHeart);
      this.weekBreath = echarts.init(this.$refs.weekBreath);

      this.weekOption.xAxis.data = [];
      this.weekOption.series[0].data = [];
      this.week.setOption(this.weekOption, true);

      this.heartOption.xAxis.data = [];
      this.heartOption.series[0].data = [];
      this.heart.setOption(this.heartOption, true);

      this.breathOption.xAxis.data = [];
      this.breathOption.series[0].data = [];
      this.breath.setOption(this.breathOption, true);

      this.weekHeartOption.xAxis.data = [];
      this.weekHeartOption.series[0].data = [];
      this.weekHeart.setOption(this.weekHeartOption, true);

      this.weekBreathOption.xAxis.data = [];
      this.weekBreathOption.series[0].data = [];
      this.weekBreath.setOption(this.weekBreathOption, true);

      this.result = null;
      this.turnOver = '-';
      this.snore = '-';
      this.sleepModel = '';
      this.meanBreathRat = '-';
      this.sleepDuration = '-时-分';
      this.sleepStartAt = '-:-';
      this.sleepEndAt = '-:-';
      this.wakeDuration = '-';
      this.nrDuration = '-';
      this.deepDuration = '-';
      this.maxHeartRate = '-';
      this.minHeartRate = '-';
      this.maxHeartTime = '-:-';
      this.minHeartTime = '-:-';
      this.maxBreathRate = '-';
      this.minBreathRate = '-';
      this.maxBreathTime = '-:-';
      this.minBreathTime = '-:-';
      this.heartAverage = '-:-';
      this.heartTimeLog = [];
      this.breathTimeLog = [];

      this.breath_pause10_count = '-';
      this.breath_avg_pause = '-';
      this.WMTotal = '-'; // 周月 总记录数
      this.WMMeanEnterSleepDuration = '-'; // 平均睡眠
      this.WMMaxHeartRate = '-'; // 周月最大心率
      this.WMMinHeartRate = '-'; // 周月最小心率
      this.WMMaxBreathRate = '-'; // 周月最大呼吸
      this.WMMinBreathRate = '-'; // 周月最小呼吸

      this.blockWidth = []; // 时间碎片图 宽度配置表
      this.colorList = []; // 时间碎片图 颜色配置表

      this.WMTotal = '-';
      this.WMMeanEnterSleepDuration = '-时-分';
      this.weekScoreList = [];
      this.weekHeartTimeLog = [];
      this.weeBreathTimeLog = [];

      this.circleValue = 0.0; // 圆圈的百分比
    },
    goBack() {
      console.log('返回上级');
      this.$router.go(-1);
    },
    moreInfo() {
      editDevice(this.mac);
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';
@import '@/assets/scss/SleepReport.scss';
</style>
