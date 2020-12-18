<!--
 * @Author: Jerry-Rain
 * @Date: 2019-12-04 13:42:37
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-05-11 17:14:01
 * @Description: 睡眠报告页面
 * initWeek => (initWeekChart => weekSleepReport)
 * init => initChart
 -->
<template>
  <gree-view class="page-report" bg-color="#0b83e9">
    <!-- 头部  -->
    <!-- <div class="page-header"> -->
    <gree-header
      :style="{ backgroundImage: 'url(' + head_bg + ')' }"
      :left-options="{ preventGoBack: true }"
      :right-options="{ showMore: true }"
      @on-click-back="goBack()"
      @on-click-more="moreInfo()"
    >睡眠报告（{{ nowBed === 'left' ? '左侧' : '右侧' }}）</gree-header
    >
    <!-- </div> -->
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
          </gree-row>

          <gree-row class="date-select" v-show="btnIndex === '日'">
            <gree-icon
              name="arrow-left"
              size="lg"
              @click="before()"
              :style="{
                opacity: hideLeftArrow ? '0' : '1'
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
            <div class="date-txt" @click="selectDateWeek()">
              {{ dateWeekShow }}
            </div>
            <gree-icon
              name="arrow-right"
              size="lg"
              @click="afterWeek()"
            ></gree-icon>
          </gree-row>

          <div class="circle-show" v-if="btnIndex === '日'">
            <gree-progress
              type="dashboard"
              :width="160"
              :stroke-width="3.5"
              :value="circleValue"
              color="#2CB9FF"
            >
            </gree-progress>
            <div class="txt-show">
              <div>睡眠评分</div>
              <div>
                {{ Math.round(circleValue * 100)
                  || '--' 
                }}
              </div>
              <div>{{ sleepModel }}</div>
            </div>
          </div>

          <div class="circle-show" v-show="btnIndex === '周'">
            <gree-progress
              type="dashboard"
              :width="160"
              :stroke-width="3.5"
              :value="weekCircleValue"
              color="#2CB9FF"
            ></gree-progress>
            <div class="txt-show">
              <div>平均得分</div>
              <div>
                {{
                  Math.round(weekCircleValue * 100)
                    || '--'
                }}
              </div>
            </div>
          </div>

          <div
            class="switch-bed"
            @click="changeBed()"
            :class="{
              left: true,
            }"
          >
            <!-- :class="{
              left: nowBed === 'left' ? true : false,
              right: nowBed === 'right' ? true : false
            }" -->
            <span>{{ nowBed === 'right' ? '切换左侧' : '切换右侧' }}</span>
          </div>

          <div class="bottom_show" v-show="btnIndex === '日'">
            <gree-row>
              <gree-col>{{ turnOver }}次</gree-col>
              <gree-col>{{ snore }}次</gree-col>
              <gree-col>{{ meanBreathRate }}次/分</gree-col>
            </gree-row>
            <gree-row>
              <gree-col>体动次数</gree-col>
              <gree-col>打鼾</gree-col>
              <gree-col>呼吸频率</gree-col>
            </gree-row>
          </div>
          <div class="bottom_show" v-show="btnIndex === '周'">
            <gree-row>
              <gree-col>{{ weekTotal }}</gree-col>
              <gree-col>{{ weekMeanEnterSleepDuration }}</gree-col>
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
        <gree-row class="title">
          <img :src="sleepPic" />
          <span>睡眠</span>
        </gree-row>
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
          <span>入睡 {{ sleepStartAt }}</span>
          <span>起床 {{ sleepEndAt }}</span>
        </gree-row>
        <gree-row class="first-data">
          <span>{{ wakeDuration }}</span>
          <span>{{ nrDuration }}</span>
          <span>{{ deepDuration }}</span>
        </gree-row>
        <gree-row class="first-title">
          <span>
            <div :style="{ background: '#FFD33B' }" />
            清醒
          </span>
          <span>
            <div :style="{ background: '#72B0FE' }" />
            浅睡
          </span>
          <span>
            <div :style="{ background: '#008DEF' }" />
            深睡
          </span>
        </gree-row>
      </div>
      <div key="周" class="sleep-board" v-show="btnIndex === '周'">
        <gree-row class="title">
          <img :src="sleepPic" />
          <span>睡眠评分</span>
        </gree-row>
        <gree-row class="chart-zoom">
          <div class="chart-name">
            <span>每日评分</span>
          </div>
          <div class="container" ref="week">
            <span style="z-index: 1000" v-show="noWeekData">无睡眠记录</span>
          </div>
        </gree-row>
      </div>
      <!-- 日的统计图 -->
      <div class="heart-breath" v-show="btnIndex === '日'">
        <!-- 心率模块 -->
        <div class="grap-block" />
        <div class="heart-board">
          <gree-row class="title">
            <img :src="heartPic" />
            <span>静息心率区</span>
          </gree-row>
          <div class="chart-name">
            <span>心率波动图</span>
            <img :src="question" @click="showTip(1)" />
          </div>
          <gree-row class="chart">
            <div class="container" ref="heart"></div>
          </gree-row>
          <gree-row class="data-first">
            <gree-col>{{ maxHeartRate }}次/分</gree-col>
            <gree-col>{{ minHeartRate }}次/分</gree-col>
            <!-- <gree-col>{{ heartAverage }}次/分</gree-col> -->
          </gree-row>
          <gree-row class="time-first">
            <gree-col>{{ maxHeartTime }}</gree-col>
            <gree-col>{{ minHeartTime }}</gree-col>
            <!-- <gree-col>偏低(缺少)</gree-col> -->
          </gree-row>
          <gree-row class="txt-first">
            <gree-col>最高心率</gree-col>
            <gree-col>最低心率</gree-col>
            <!-- <gree-col>平均心率</gree-col> -->
          </gree-row>
        </div>
        <div class="grap-block" />
        <!-- 呼吸模块 -->
        <div class="breath-board">
          <gree-row class="title">
            <img :src="breathPic" />
            <span>静息呼吸区</span>
          </gree-row>
          <div class="chart-name">
            <span>呼吸波动图</span>
            <img :src="question" @click="showTip(2)" />
          </div>
          <gree-row class="chart">
            <div class="container" ref="breath"></div>
          </gree-row>

          <gree-row class="data-first">
            <gree-col>{{ maxBreathRate }}次/分</gree-col>
            <gree-col>{{ minBreathRate }}次/分</gree-col>
          </gree-row>
          <gree-row class="time-first">
            <gree-col>{{ maxBreathTime }}</gree-col>
            <gree-col>{{ minBreathTime }}</gree-col>
          </gree-row>
          <gree-row class="txt-first">
            <gree-col>最高呼吸值</gree-col>
            <gree-col>最低呼吸值</gree-col>
          </gree-row>
        </div>
      </div>
      <!-- 周的统计图 -->
      <div class="heart-breath" v-show="btnIndex === '周'">
        <!-- 心率模块 -->
        <div class="grap-block" />
        <div class="heart-board">
          <gree-row class="title">
            <img :src="heartPic" />
            <span>静息心率区</span>
          </gree-row>
          <div class="chart-name">
            <span>平均心率波动图 </span>
          </div>
          <gree-row class="chart">
            <div class="container" ref="weekHeart">
              <span style="z-index: 1000" v-show="noWeekData">无睡眠记录</span>
            </div>
          </gree-row>
        </div>
        <div class="grap-block" />
        <!-- 呼吸模块 -->
        <div class="breath-board">
          <gree-row class="title">
            <img :src="breathPic" />
            <span>静息呼吸区</span>
          </gree-row>
          <div class="chart-name">
            <span>平均呼吸波动图</span>
          </div>
          <gree-row class="chart">
            <div class="container" ref="weekBreath">
              <span style="z-index: 1000">无睡眠记录</span>
            </div>
          </gree-row>
        </div>
      </div>
    </gree-page>
    <!-- 弹框解释 -->
    <gree-dialog
      id="homeTip"
      :title="tipTitle"
      v-model="slotDialog.open"
      :btns="slotDialog.btns"
    >
      <div class="content" v-html="tipContent"></div>
      <div class="item" v-for="(item, index) in heartList" :key="index">
        <gree-row>{{ item.title }}</gree-row>
        <gree-row>
          <gree-col>低</gree-col>
          <gree-col>中（标准）</gree-col>
          <gree-col>高</gree-col>
        </gree-row>
        <gree-row>
          <gree-col>{{ item.value[0] }}</gree-col>
          <gree-col>{{ item.value[1] }}</gree-col>
          <gree-col></gree-col>
        </gree-row>
      </div>
    </gree-dialog>
  </gree-view>
</template>

<script>
// import echarts from 'echarts';
import dayjs from 'dayjs';
import echarts from 'echarts/lib/echarts';
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
  Progress,
  Dialog
} from 'gree-ui';
import {
  sleepReport,
  weekMonthReport,
  test,
  dateList
} from '@/api/70402/mock.js';
import { mapState, mapMutations } from 'vuex';
import {
  editDevice,
  showLoading,
  hideLoading,
  showToast,
  musiGetData,
  closePage
} from '../../../../static/lib/PluginInterface.promise';
import echartsOpt from '../../mixins/config/70402/echartsOpt.js';

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
    [Progress.name]: Progress,
    [Dialog.name]: Dialog
  },
  mixins: [echartsOpt],
  data() {
    return {
      DEBUG: false, // 调试用
      noWeekData: true, // 是否有数据的提示
      nowBed: 'left',
      dateShow: '', // 初始化显示
      dateWeekShow: new Date(),
      tipTitle: '',
      tipContent: '',
      heartList: [
        {
          title: '3-18岁儿童：55-115',
          value: [55, 115]
        },
        {
          title: '18-65岁：60-100',
          value: [60, 100]
        },
        {
          title: '65岁以上：70-100',
          value: [76, 85]
        }
      ],
      slotDialog: {
        open: false,
        btns: [
          {
            text: '确定'
          }
        ]
      },
      dateTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
      circleValue: 0.0, // 圆圈的百分比
      weekCircleValue: 0.0, // 圆圈的百分比
      head_bg: require('@/assets/img/bg_header_on.png'),
      current: 1,
      btnIndex: '日',
      breathPic: require('@/assets/img/breath.png'),
      sleepPic: require('@/assets/img/sleep.png'),
      heartPic: require('@/assets/img/heart.png'),
      question: require('@/assets/img/tip.png'),
      blockWidth: [], // 时间碎片图 宽度配置表
      colorList: [], // 时间碎片图 颜色配置表
     
      week: '',
      heart: '',
      breath: '',
      weekHeart: '',
      weekBreath: '',

      result: null,
      turnOver: '-',
      snore: '-',
      sleepModel: '-- --',
      meanBreathRate: '-',
      sleepDuration: '-时-分',
      sleepStartAt: '-:-',
      sleepEndAt: '-:-',
      wakeDuration: '-',
      nrDuration: '-',
      deepDuration: '-',
      maxHeartRate: '-',
      minHeartRate: '-',
      maxHeartTime: '-:-',
      minHeartTime: '-:-',
      maxBreathRate: '-',
      minBreathRate: '-',
      maxBreathTime: '-:-',
      minBreathTime: '-:-',
      heartAverage: '-:-',
      heartTimeLog: '',
      breathTimeLog: '',

      weekTotal: '',
      weekMeanEnterSleepDuration: '',
      weekScoreList: [], // 周分数用于画图
      weekDateList: [], // 周日期用于画图
      weekHeartList: [], // 周心率平均用于画图
      weekBreathList: [], // 周呼吸平均用于画图
      weekHeartTimeLog: '',
      weeBreathTimeLog: '',

      dayDateIndex: 0, // 日 时间列表选择序号
      weekStart: new Date(),
      weekEnd: new Date(),

    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,
      getSleepDataLeft: state => state.apiObject.getSleepDataLeft,
      getSleepDataRight: state => state.apiObject.getSleepDataRight,
      getWeekSleepDataLeft: state => state.apiObject.getWeekSleepDataLeft,
      getWeekSleepDataRight: state => state.apiObject.getWeekSleepDataRight,
      getWeekListRight: state => state.apiObject.getWeekListRight,
      getWeekListLeft: state => state.apiObject.getWeekListLeft,
      getDateListLeft: state => state.apiObject.getDateListLeft,
      getDateListRight: state => state.apiObject.getDateListRight,
      pathName: state => state.pathName
    }),
    // 是否隐藏左箭头
    hideLeftArrow() {
      if (this.nowBed === 'left') {
        if (this.dayDateIndex === this.getDateListLeft.length - 1 || this.getDateListLeft.length === 0) {
          return true;
        } 
        return false;
      } 
      if (this.dayDateIndex === this.getDateListRight.length - 1 || this.getDateListRight.length === 0) {
        return true;
      } 
      return false;
    }
  },
  watch: {
    // 周 时间更新的时候重新查询
    dateTime: {
      handler(newv) {
        this.getWeekStartAndEnd(newv); // 时间生成
        this.weekReport(this.nowBed); // 请求周报告
      },
      // immediate: true,
      deep: true
    },
    // 日时间更新的时候重新查询
    dateShow: {
      handler() {
        this.dayReport(this.nowBed);
      },
      // immediate: true,
      deep: true
    },
    btnIndex: {
      handler(newv) {
        // 如果是日 才查询时间
        if (newv === '日') {
          this.nowBed === 'left'
            ? this.getDateList('left')
            : this.getDateList('right');
        }
        // 如果周， 获取周报告
        this.btnIndex === '周' ? this.weekReport(this.nowBed) : '';
      }
      // this.dateTime = new Date()
    },
    nowBed: {
      handler(newv) {
        // 如果是日 才查询时间
        if (this.btnIndex === '日') {
          newv === 'left'
            ? this.getDateList('left')
            : this.getDateList('right');
        }
        // 如果周， 获取周报告
        this.btnIndex === '周' ? this.weekReport(this.nowBed) : '';
        // this.btnIndex === '日' ? this.dayReport(this.nowBed) : this.weekReport(this.nowBed)
      },
      // immediate: true,
      deep: true
    }
  },
  mounted() {
    this.initEcharts();
    this.getApi();
    /* 调试打开下面 */
    if (this.DEBUG) {
      this.init(this.nowBed); // 日 报告初始化
      this.initChart(); // 日 图表初始化
      this.initWeek(this.nowBed); // 周 初始化
      this.initWeekChart(this.nowBed); // 周 图表初始化
    }
  },
  methods: {
    async getApi() {
      setTimeout(() => {
        this.getDateList('left'); // 左床的时间列表
        this.getWeekStartAndEnd(this.dateTime);
      }, 500);
    },
    ...mapMutations({
      setApiObject: 'SET_API_OBJECT'
    }),
    //  初始化 echarts
    initEcharts() {
      const name = ['week', 'heart', 'breath', 'weekHeart', 'weekBreath'];
      for (const item of name) {
        this[item] = echarts.init(this.$refs[item]);
      }
    },
    // 总初始化函数
    init(type) {
      let result = '';
      if (type === 'left') {
        this.DEBUG
          ? (result = sleepReport.message.result)
          : (result = this.getSleepDataLeft.message.result);
        this.result = result;
      } else {
        this.DEBUG
          ? (result = sleepReport.message.result)
          : (result = this.getSleepDataRight.message.result);
        this.result = result;
      }
      try {
        this.circleValue = this.result.score * 0.01; // 评分
        this.turnOver = this.result.turnOver; // 翻身次数
        this.snore = this.result.snore; // 打鼾次数
        this.sleepModel = this.result.sleepModel.substring(
          0,
          this.result.sleepModel.length - 5
        ); // 睡眠模式
        this.meanBreathRate = this.result.meanBreathRate; // 平均呼吸率
        this.sleepDuration = this.initSleepDuration(
          this.result.enterSleepDuration
        ); // 睡眠总时长
        this.sleepStartAt = this.initSleepStartEnd(this.result.sleepStartAt); // 睡眠开始时间
        this.sleepEndAt = this.initSleepStartEnd(this.result.sleepEndAt); // 睡眠开始时间
        this.wakeDuration = this.initSleepDuration(
          this.result.wakeDuration + this.result.leaveBedDuration
        ); // 清醒
        this.nrDuration = this.initSleepDuration(
          this.result.nrDuration +
          this.result.nr2Duration +
          this.result.remDuration +
          this.result.fallAsleepDuration
        ); // 浅睡
        this.deepDuration = this.initSleepDuration(this.result.deepDuration); // 深睡

        // this.maxHeartRate = this.searchArrIdJson('maxHeart').value; // 最高心率
        // this.maxHeartTime = this.initJsontime('maxHeart'); // 最大心率下面的时间
        // this.minHeartRate = this.searchArrIdJson('minHeart').value; // 最小心率
        // this.minHeartTime = this.initJsontime('minHeart'); // 最大心率下面的时间

        // this.maxBreathRate = this.searchArrIdJson('maxBreath').value; // 最高呼吸值
        // this.maxBreathTime = this.initJsontime('maxBreath'); // 最大心率下面的时间
        // this.minBreathRate = this.searchArrIdJson('minBreath').value; // 最小呼吸值
        // this.minBreathTime = this.initJsontime('minBreath'); // 最大心率下面的时间

        // this.heartAverage = this.searchArrIdJson('heart_beat_average') // 平均心率

        this.initTimeChart(result.sleepStage); // 绘制时间碎片图

        this.heartTimeLog = this.searchArrIdJson('heartTimeLog'); // 心率波动图
        console.log(
          'this.searchArrIdJson(75)',
          this.searchArrIdJson('heartTimeLog')
        );

        this.breathTimeLog = this.searchArrIdJson('breathTimeLog'); // 呼吸波动图
        console.log(
          'this.searchArrIdJson(76)',
          this.searchArrIdJson('breathTimeLog')
        );
      } catch (error) {
        showToast('数据异常', 0);
      }
    },
    // 初始化周数据
    initWeekList(list, type) {
      const L = [];
      list.forEach(item => {
        L.push(item[type]);
      });
      return L.reverse();
    },
    // 初始化周数据
    initWeekDateList(list) {
      const L = [];
      list.forEach(item => {
        L.push(item.createAt.substr(5, 6));
      });
      return L.reverse();
    },
    // 日图标初始化
    initChart() {
      this.heart = echarts.init(this.$refs.heart);
      this.breath = echarts.init(this.$refs.breath);

      this.heartOption.xAxis.data = this.selectChartDate(
        this.formatLabel(this.heartTimeLog)
      );
      this.heartOption.series[0].data = this.selectChartDate(
        this.heartTimeLog.values
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
      console.log('this.heartOption.xAxis.data', this.heartOption.xAxis.data);
      console.log(
        'this.heartOption.series[0].data',
        this.heartOption.series[0].data
      );
      this.heart.setOption(this.heartOption, true);

      this.breathOption.xAxis.data = this.selectChartDate(
        this.formatLabel(this.breathTimeLog)
      );
      this.breathOption.series[0].data = this.selectChartDate(
        this.breathTimeLog.values
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
      console.log('+++++++++++++++', Math.max(...bxd));
      console.log('this.breathOption.xAxis.data', this.breathOption.xAxis.data);
      console.log(
        'this.breathOption.series[0].data',
        this.breathOption.series[0].data
      );
      this.breath.setOption(this.breathOption, true);

      this.$nextTick(() => {
        this.heart.resize();
        this.breath.resize();
      });
    },
    // 周图表数据和图表初始化
    initWeekChart(type) {
      let result = '';
      if (type === 'left') {
        this.DEBUG
          ? (result = sleepReport.message.result)
          : (result = this.getWeekSleepDataLeft.message.result);
      } else {
        this.DEBUG
          ? (result = sleepReport.message.result)
          : (result = this.getWeekSleepDataRight.message.result);
      }
      this.result = result;

      try {
        this.weekHeartTimeLog = this.searchArrIdJson('heartTimeLog'); // 心率波动图
        this.weekBreathTimeLog = this.searchArrIdJson('breathTimeLog'); // 呼吸波动图
      } catch (error) {
        showToast('数据异常', 0);
      }
      
      this.week = echarts.init(this.$refs.week);
      this.weekHeart = echarts.init(this.$refs.weekHeart);
      this.weekBreath = echarts.init(this.$refs.weekBreath);

      this.$nextTick(() => {
        this.week.resize();
        this.weekHeart.resize();
        this.weekBreath.resize();
      });

      // 周接口处理方法
      this.weekOption.xAxis.data = this.weekDateList;
      this.weekOption.series[0].data = this.weekScoreList;
      this.weekHeartOption.xAxis.data = this.weekDateList;
      this.weekHeartOption.series[0].data = this.weekHeartList;
      this.weekBreathOption.xAxis.data = this.weekDateList;
      this.weekBreathOption.series[0].data = this.weekBreathList;
      // 旧方法
      // this.weekHeartOption.xAxis.data = this.selectChartDate(
      //   this.formatWeekLabel(this.weekHeartTimeLog)
      // );
      // this.weekHeartOption.series[0].data = this.selectChartDate(
      //   this.weekHeartTimeLog.values
      // );
      // this.weekBreathOption.xAxis.data = this.selectChartDate(
      //   this.formatWeekLabel(this.weekBreathTimeLog)
      // );
      // this.weekBreathOption.series[0].data = this.selectChartDate(
      //   this.weekBreathTimeLog.values
      // );

      this.week.setOption(this.weekOption, true);
      this.weekHeart.setOption(this.weekHeartOption, true);
      this.weekBreath.setOption(this.weekBreathOption, true);
    },
    // 切换左右
    changeBed() {
      this.nowBed === 'left' ? (this.nowBed = 'right') : (this.nowBed = 'left');
      this.dayDateIndex = 0;
      // this.dayReport(this.nowBed)
      // this.weekReport(this.nowBed)
    },
    // 上一天
    before() {
      // const date = this.dateTime.getTime() - 1000 * 60 * 60 * 24
      // this.dateTime = new Date(date)
      let B = '';
      let L = '';
      if (this.nowBed === 'left') {
        B = this.getDateListLeft.length - 1;
        L = this.getDateListLeft;
      } else {
        B = this.getDateListRight.length - 1;
        L = this.getDateListRight;
      }
      console.log('##########################', this.getDateListLeft);
      if (this.dayDateIndex < B) {
        this.dayDateIndex++;
        this.dateShow = L[this.dayDateIndex];
        console.log('< 上一天');
      } else {
        console.log('到头了', B);
      }
    },
    // 下一天
    after() {
      // const newDate = new Date(new Date() - 1000 * 60 * 60 * 24) // 当前
      // this.dateTime = new Date(date)
      let B = '';
      let L = '';
      if (this.nowBed === 'left') {
        B = this.getDateListLeft.length - 1;
        L = this.getDateListLeft;
      } else {
        B = this.getDateListRight.length - 1;
        L = this.getDateListRight;
      }
      if (this.dayDateIndex > 0) {
        this.dayDateIndex--;
        this.dateShow = L[this.dayDateIndex];
        console.log('> 下一天');
      } else {
        console.log('到头了', B);
      }
      // if (Date.parse(nextDate) > Date.parse(newDate)) {
      //   console.log('今天不能选')
      // } else {
      //   console.log('> 下一天')
      //   this.dateTime = new Date(nextDate)
      // }
    },
    // 选择时间
    selectDate() {
      // TODO:
      console.log('选择时间,保留位置');
    },
    // 上一周
    beforeWeek() {
      const nextDate = new Date(
        this.dateTime.getTime() - 1000 * 60 * 60 * 24 * 7
      );
      this.dateTime = new Date(nextDate);
    },
    // 下一周
    afterWeek() {
      const newDate = new Date(new Date() - 1000 * 60 * 60 * 24); // 当前时间
      const nextDate = new Date(
        this.dateTime.getTime() + 1000 * 60 * 60 * 24 * 7
      );
      if (Date.parse(nextDate) > Date.parse(newDate)) {
        console.log('下周不能选');
      } else {
        console.log('> 下一周');
        this.dateTime = nextDate;
      }
    },
    // 选择时间
    selectDateWeek() {
      // TODO:
      console.log('选择时间,保留位置');
    },
    // 日周选择
    btnGroup(name) {
      this.btnIndex = name;
      console.log('点击了', this.btnIndex);
      switch (name) {
        case '周':
          this.dateTime = new Date(new Date().getTime() - 1000 * 60 * 60 * 24);
          this.getWeekStartAndEnd(this.dateTime);
          break;
        case '日':
          this.dayDateIndex = 0;
          break;
        default:
          break;
      }
    },
    showTip(index) {
      console.log('显示： ', index);
      this.slotDialog.open = true;
      switch (index) {
        case 1:
          this.tipTitle = '心率参考值';
          this.tipContent =
            '心率是指正常人安静状态下每分钟心跳的次数，也叫安静心率，一般为60～100次/分，可因年龄、性别或其他生理因素产生个体差异。<br/> #信息仅供参考#';
          this.heartList = [
            {
              title: '3-18岁儿童：55-115',
              value: [55, 115]
            },
            {
              title: '18-65岁：60-100',
              value: [60, 100]
            },
            {
              title: '65岁以上：70-100',
              value: [76, 85]
            }
          ];
          break;
        case 2:
          this.tipTitle = '呼吸参考值';
          this.tipContent =
            '呼吸频率为一种形容每分钟呼吸的次数的医学术语，胸部的一次起伏就是一次呼吸，即一次吸气一次呼气。每分钟呼吸的次数称为呼吸频率。<br/> #信息仅供参考#';
          this.heartList = [
            {
              title: '3-18岁儿童：30-40',
              value: [30, 40]
            },
            {
              title: '18-65岁：16-20',
              value: [16, 20]
            },
            {
              title: '65岁以上：12-20',
              value: [12, 20]
            }
          ];
          break;
        default:
          break;
      }
    },
    goBack() {
      console.log('返回》》》', this.pathName);
      this.pathName ? closePage() : this.$router.go(-1);
    },
    moreInfo() {
      editDevice(this.mac);
    },
    async dayReport(type) {
      showLoading();
      this.clearDate();
      const data = {
        startAt: dayjs(new Date(this.dateShow)).format(
          'YYYY/MM/DD 00:00:00'
        ),
        endAt: dayjs(new Date(this.dateShow)).format(
          'YYYY/MM/DD 23:59:59'
        ),
        machineEntityPartCode: `${this.mac}####${type}`
      };
      console.log('日', data);
      console.log(
        `====================日： ${type}睡眠报告===================`
      );
      await musiGetData(this.mac, data, 'getDerucciGetSleepData')
        .then(res => {
          this.LoadingStay();
          if (!res) {
            console.log('返回的数据异常： ', res);
          } else {
            const result = JSON.parse(res);
            console.log(
              `查询到的 日 睡眠报告 getDerucciGetSleepData${type}`,
              result
            );
            result.code !== 200 ? showToast('请求异常', 0) : '';
            type === 'left'
              ? this.setApiObject({ getSleepDataLeft: result })
              : this.setApiObject({ getSleepDataRight: result });
            this.init(type); // 日 报告初始化
            setTimeout(() => {         
              this.initChart(); // 日 图表初始化
            }, 100);
          }
        })
        .catch(this.LoadingStay());
    },
    // 周报告运行入口(先查周睡眠数据)
    async weekReport(type) {
      showLoading();
      this.clearDate();
      const data = {
        startAt: dayjs(this.weekStart).format(
          'YYYY/MM/DD 00:00:00'
        ),
        endAt: dayjs(this.weekEnd).format(
          'YYYY/MM/DD 23:59:59'
        ),
        machineEntityPartCode: `${this.mac}####${type}`
      };
      console.log('周', data);
      console.log(
        `====================${type}周： 睡眠报告===================`
      );
      await musiGetData(this.mac, data, 'getDerucciWeekList')
        .then(res => {
          this.LoadingStay();
          if (!res) {
            console.log('返回的数据异常： ', res);
          } else {
            console.log(`查询到的 周报告 getWeekList${type}:  `);
            console.log(JSON.parse(res).message.result);
            const result = JSON.parse(res);
            result.code !== 200 ? showToast('请求异常', 0) : '';
            type === 'left'
              ? this.setApiObject({ getWeekListLeft: result })
              : this.setApiObject({ getWeekListRight: result });
            if (result.message.result.list === null) {
              // list 为0 就不用再查下去了
              this.noWeekData = true;
              showToast('本周没有睡眠数据哦', 0);
              console.log('本周没有睡眠数据哦！');
              return;
            }
            this.noWeekData = false;
            this.initWeek(type); // 周 初始化
            setTimeout(() => {
              this.weekSleepReport(type); // 周 报告的图表数据
            }, 100);
          }
        })
        .catch(this.LoadingStay());
    },
    // 周睡眠报告
    async weekSleepReport(type) {
      showLoading();
      const data = {
        startAt: `${dayjs(
          new Date(new Date(this.weekStart).getTime())
        ).format('YYYY/MM/DD')} 00:00:00`,
        endAt: `${dayjs(
          new Date(new Date(this.weekEnd).getTime())
        ).format('YYYY/MM/DD')} 23:59:59`,
        machineEntityPartCode: `${this.mac}####${type}`
      };
      console.log('周-报告', data);
      console.log(
        `====================${type}周： 睡眠报告===================`
      );
      await musiGetData(this.mac, data, 'getDerucciGetSleepData')
        .then(res => {
          this.LoadingStay();
          if (!res) {
            console.log('返回的数据异常： ', res);
          } else {
            console.log(`查询到的 周报告 getDerucciGetSleepData${type}:  `);
            const result = JSON.parse(res);  
            result.code !== 200 ? showToast('请求异常', 0) : '';
            type === 'left'
              ? this.setApiObject({ getWeekSleepDataLeft: result })
              : this.setApiObject({ getWeekSleepDataRight: result });
            if (this.getWeekSleepDataLeft) {
              console.log('有，周报告的数据');
              this.initWeekChart(type); // 周 图表初始化
            } else {
              console.log('没有，周报告的数据，延迟1s初始化');
              setTimeout(() => {
                console.log('1s初始化');
                this.initWeekChart(type); // 周 图表初始化
              }, 1000);
            }
          }
        })
        .catch(this.LoadingStay());
    },
    // 查询床垫的日期列表
    async getDateList(type) {
      showLoading();
      const data = {
        startAt: '2019/11/01 00:00:00',
        endAt: `${dayjs(new Date()).format('YYYY/MM/DD')} 00:00:00`,
        machineEntityPartCode: `${this.mac}####${type}`
      };
      console.log('查询日期', data);
      console.log(`====================${type}查询日期===================`);
      await musiGetData(this.mac, data, 'getDerucciGetDateList')
        .then(res => {
          this.LoadingStay();
          if (!res) {
            console.log('返回的数据异常： ', res);
          } else {
            console.log(`查到的 日期 getDerucciGetDateList${type}:  `);
            const result = JSON.parse(res);
            result.code !== 200 ? showToast('请求异常', 0) : '';
            try {
              console.log(result.message.result);         
            } catch (error) {
              console.log('!!!日期发生错误： ', error);
            }
            type === 'left'
              ? this.setApiObject({
                getDateListLeft: result.message.result
              })
              : this.setApiObject({
                getDateListRight: result.message.result
              });
            this.dayDateIndex = 0;
            // 如果 切换会回来还是一样的日期，就需要主动去触发查询
            if (this.dateShow === result.message.result[0]) {
              this.dayReport(this.nowBed);
            }
            if (result.message.result[0].length === 0) {
              showToast('您还没有睡眠数据哦', 0);
            }
            this.dateShow = result.message.result[0]; // 每次切换回到最近一天
          }
        })
        .catch(this.LoadingStay());
    },
    // 延迟关闭showLoading
    LoadingStay() {
      setTimeout(() => {
        hideLoading();
      }, 1000);
    },
    // 清空显示所有数据
    clearDate() {
      // this.week = echarts.init(this.$refs.week)
      // this.heart = echarts.init(this.$refs.heart)
      // this.breath = echarts.init(this.$refs.breath)
      // this.weekHeart = echarts.init(this.$refs.weekHeart)
      // this.weekBreath = echarts.init(this.$refs.weekBreath)

      // this.week.dispose()
      // this.heart.dispose()
      // this.breath.dispose()
      // this.weekHeart.dispose()
      // this.weekBreath.dispose()

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

      this.colorList = [];
      this.blockWidth = [];
      this.result = null;
      this.turnOver = '-';
      this.snore = '-';
      this.sleepModel = '';
      this.meanBreathRate = '-';
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

      this.blockWidth = []; // 时间碎片图 宽度配置表
      this.colorList = []; // 时间碎片图 颜色配置表

      this.weekTotal = '-';
      this.weekMeanEnterSleepDuration = '-时-分';
      this.weekScoreList = [];
      this.weekHeartTimeLog = [];
      this.weeBreathTimeLog = [];

      this.circleValue = 0.0; // 圆圈的百分比
      this.weekCircleValue = 0.0; // 圆圈的百分比
    },
    // 初始化 周数据 不包括图表数据
    initWeek(type) {
      let result = '';
      if (type === 'left') {
        this.DEBUG
          ? (result = weekMonthReport.message.result)
          : (result = this.getWeekListLeft.message.result);
      } else {
        this.DEBUG
          ? (result = weekMonthReport.message.result)
          : (result = this.getWeekListRight.message.result);
      }
      if (result.list === null) {
        // this.clearDate()
        return;
      }

      try {
        this.weekScoreList = this.initWeekList(result.list, 'score'); // 平均睡眠分数的数组
        this.weekHeartList = this.initWeekList(result.list, 'meanHeartRate'); // 平均心率分数的数组
        this.weekBreathList = this.initWeekList(result.list, 'meanBreathRate'); // 平均胡须分数的数组
        this.weekDateList = this.initWeekDateList(result.list); // 平均睡眠的时间列表
        this.weekMeanEnterSleepDuration = this.initSleepDuration(
          result.meanEnterSleepDuration
        ); // 平均睡眠时间
        this.weekTotal = result.total; // 总记录数
        this.weekCircleValue = result.meanScore * 0.01; // 平均评分
      } catch (error) {
        showToast('数据异常', 0);
      } 
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
        console.log('L =   ', L);
        return L;
      } else if (list.length <= 50) {
        return list;
      }
      return L;
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
    // 处理碎片图宽度 和 颜色
    widthAndColor(list, limit, j) {
      list.forEach((e, index) => {
        const rate =
          ((1 / j) * 100).toFixed(5);
        if (!isNaN(rate)) {
          this.blockWidth[index] = `${rate}%`;
          const colorList = ['#FFD33B', '#72B0FE', '#008DEF', '#72B0FE', '#008DEF', '#7BE3E1', '#FFD33B'];
          try {
            this.colorList[index] = colorList[e.stage];
          } catch (error) {
            this.colorList[index] = colorList[0];
            console.log('不存在的状态');
          }  
        } else {
          console.log('一条数据有误');
        }
      });
      console.log('颜色', this.colorList);
      console.log('比例', this.blockWidth);
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
      console.log();
      return this.result.attrs.find(item => item.healthResultAttr.name === name)
        .value;
    },
    // 绘制时间碎片图
    initTimeChart(sleepStage) {
      // const long =
      //   sleepStage[sleepStage.length - 1].startAt - sleepStage[0].endAt;
      // console.log('总长度', long);
      this.selectData(sleepStage);
    },
    // 时分 的 格式化
    initSleepDuration(date) {
      const hour = Math.floor(date / 3600);
      const mins = date % 60;
      return `${hour}时${mins}分`;
    },
    // 00:00 的 格式化
    initSleepStartEnd(date) {
      return dayjs(date).format('HH:mm');
    },
    // 00:00 的 格式化
    initDayXTime(date) {
      return date.toString().substring(11, 16);
    },
    // 格式化图标labels
    formatLabel(list) {
      const LIST = [];
      list.labels.forEach((date, index) => {
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
      const today = timestamp ? new Date(timestamp) : new Date();
      const todayDay = today.getDay() || 7; // 若那一天是周末时，则强制赋值为7
      const startDate = dayjs(today).subtract((todayDay - 1), 'day');
      const endDate = dayjs(today).add((7 - todayDay), 'day');

      this.dateWeekShow = `${dayjs(startDate).format('YYYY/MM/DD')}-${dayjs(
        endDate
      ).format('YYYY/MM/DD')}`;
      this.weekStart = dayjs(startDate).format('YYYY/MM/DD');
      this.weekEnd = dayjs(endDate).format('YYYY/MM/DD');
    },
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';
@import '@/assets/scss/SleepReport.scss';
</style>
