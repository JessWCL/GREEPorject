/* eslint-disable vue/max-attributes-per-line */
<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-05-13 15:27:32
 * @Description: 首次进入插件，完善个人信息
 -->
<template>
  <gree-view class="page-femade-report" bg-color="#fffffe">
    <gree-header
      :left-options="{ preventGoBack: true }"
      @on-click-back="goBack()"
    >
      女性报告
      <!-- <span slot="right" @click="clickOption">设置</span> -->
    </gree-header>
    <gree-page class="page-content">
      <!-- 时间选择 -->
      <div class="date-pick">
        <gree-icon
          name="arrow-left"
          size="lg"
          @click="before()"
          :style="{
            opacity: dateShowIndex === getDateListFemade.length - 1 ? '0' : '1'
          }"
        ></gree-icon>
        <div class="date-txt" @click="selectDate()">{{ dateShow }}</div>
        <gree-icon
          name="arrow-right"
          size="lg"
          @click="after()"
          :style="{ opacity: dateShowIndex === 0 ? '0' : '1' }"
        ></gree-icon>
      </div>
      <!-- 个人状况 -->
      <div class="your-date">
        <gree-row>
          <gree-col>
            <div class="block-blue" />
            个人状况
          </gree-col>
        </gree-row>
        <gree-row>
          <gree-col width="40"
          >心脏总能量值<img :src="question" @click="showTip(1)"
          /></gree-col>
          <gree-col width="20">{{ hrv_heart_index.score || '-' }}</gree-col>
          <gree-col width="40">参考值：596-13923</gree-col>
        </gree-row>
        <gree-row>
          <gree-col width="40"
          >平均心率值<img :src="question" @click="showTip(2)"
          /></gree-col>
          <gree-col width="20">{{ heart_beat_average.score || '-' }}</gree-col>
          <gree-col width="40">参考值：50-95</gree-col>
        </gree-row>
        <template v-for="(item, index) in personList" >
          <gree-row :key="index">
            <gree-col width="40"
            >{{ item.title }}<img :src="question" @click="showTip(index + 3)"
            /></gree-col>
            <gree-col width="20">{{ item.value || '-' }}</gree-col>
            <gree-col width="40"
            ><gree-progress-bar
              :percent="item.value"
              hide-info
            ></gree-progress-bar
            ></gree-col>
          </gree-row>
        </template>
      </div>
      <gree-divider />
      <!-- 健康贴士 -->
      <div class="heath-tip">
        <gree-row>
          <gree-col>
            <div class="block-blue" />
            健康贴士
          </gree-col>
        </gree-row>
        <gree-row>
          <div v-for="(item, index) in heathImg" :key="index">
            <img :src="item.src" @click="healthShow(index)" />
            <span
              @click="healthShow(index)"
              :style="{
                color: healthIndex === index ? '#00aeff' : 'black'
              }"
            >{{ item.name }}</span
            >
          </div>
        </gree-row>
        <gree-row class="advices">
          {{ advicesShow }}
          <!-- 你的身体已经超负荷，今天不宜运动，适合好好休养。 -->
        </gree-row>
        <gree-divider />
      </div>
      <!-- 能量区 -->
      <div class="pow-board">
        <gree-row>
          <gree-col>
            <div class="block-blue" />
            能量区
          </gree-col>
        </gree-row>
        <div class="radio-group">
          <div v-for="(item, index) in powerShowTxt" :key="index">
            <gree-radio
              :name="(index).toString()"
              v-model="powerType"
              icon
              icon-inverse
              icon-disabled
              :label="item"
              inline
            />
          </div>
        </div>
        <gree-row class="title" :style="{ color: '#00aeff' }"
        >{{ powerShowTxt[parseInt(powerType)]
        }}<img :src="question" @click="showTip(parseInt(powerType) + 7)"
        /></gree-row>
        <gree-row class="chart"
        ><div class="container" ref="powerChart"></div
        ></gree-row>
      </div>
      <gree-divider />
      <!-- 内分泌 -->
      <div class="endocrine-board">
        <gree-row>
          <gree-col>
            <div class="block-blue" />
            内分泌
          </gree-col>
        </gree-row>
        <gree-row><gree-col>内分泌曲线</gree-col></gree-row>
        <gree-row class="title">标准内分泌曲线</gree-row>
        <gree-row class="chart"
        ><div class="container" ref="standerChart"></div
        ></gree-row>

        <gree-row class="title">个人内分泌回溯曲线</gree-row>
        <gree-row class="chart"
        ><div class="container" ref="personalChart"></div
        ></gree-row>
      </div>
    </gree-page>
    <!-- 对话框 -->
    <gree-dialog id="tip" v-model="slotDialog.open" :btns="slotDialog.btns">
      <div>{{ showTipTitle }}</div>
      <div v-html="showTipContent" />
    </gree-dialog>
  </gree-view>
</template>

<script>
import echarts from 'echarts';
import dayjs from 'dayjs';
import { femade } from '@/api/70403/mock.js';
import {
  showLoading,
  hideLoading,
  showToast,
  musiGetData,
  closePage
} from '../../../../static/lib/PluginInterface.promise';
import {
  Header,
  Field,
  InputItem,
  Icon,
  Row,
  Col,
  Divider,
  Radio,
  ProgressBar,
  Dialog
} from 'gree-ui';
import { mapState, mapMutations } from 'vuex';
import echartsOpt from '../../mixins/config/70403/echarts.js';
import tips from '../../mixins/config/70403/tips.js';


export default {
  name: 'FemadeReport',
  components: {
    [Header.name]: Header,
    [Field.name]: Field,
    [InputItem.name]: InputItem,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [Divider.name]: Divider,
    [Radio.name]: Radio,
    [ProgressBar.name]: ProgressBar,
    [Dialog.name]: Dialog
  },
  mixins: [echartsOpt, tips], // echartsOpt 图表配置， tips 提示文案和图表解释
  data() {
    return {
      DEBUG: false,
      result: '',
      dateShow: '', // 时间显示
      dateShowIndex: 0, // 时间列表的index
      dateTime: new Date(new Date() - 24 * 60 * 60 * 1000), // 时间显示的date
      head_bg: require('@/assets/img/bg_header_on.png'),
      question: require('@/assets/img/tip.png'),
      heathImg: [
        { src: require('@/assets/img/sport.png'), name: '运动' },
        { src: require('@/assets/img/nutrition.png'), name: '营养' },
        { src: require('@/assets/img/mood.png'), name: '情绪' },
        { src: require('@/assets/img/sleeping.png'), name: '睡眠' }
      ],
      powerType: '0', // 能量区的标志 0-5
      healthIndex: 1, // 健康贴士的标志 1-4
      // 图标变量
      powerChart: '',
      standerChart: '',
      personalChart: '',
      // 个人状况
      hrv_heart_index: {explain: '', score: 0, suggest: [''], type: ''}, // 心脏总能量
      heart_beat_average: {explain: '', score: 0, suggest: [''], type: ''}, // 平均心率
      pregnancy_index: {explain: '', score: 0, suggest: [''], type: ''}, // 孕气指数
      water_index: {explain: '', score: 0, suggest: [''], type: ''}, // 水润指数
      easy_fat_index: {explain: '', score: 0, suggest: [''], type: ''}, // 易胖指数
      emostr_index: {explain: '', score: 0, suggest: [''], type: ''}, // 情绪应激
      strtol_index: {explain: '', score: 0, suggest: [''], type: ''}, // 抗压能力
      // 健康贴士
      advices: [], // 建议 序号从1开始
      advicesShow: '暂无建议', // 显示的内容
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,
      getDateListFemade: state => state.apiObject.getDateListFemade,
      getSleepData: state => state.apiObject.getSleepData,
      pathName: state => state.pathName
    }),
    personList() {   
      return [
        { title: '孕气指数', value: this.pregnancy_index.score},
        { title: '水润指数', value: this.water_index.score},
        { title: '易胖指数', value: this.easy_fat_index.score},
        { title: '情绪应激', value: this.emostr_index.score},
        { title: '抗压能力', value: this.strtol_index.score}
      ];
    },
  },
  watch: {
    dateTime: {
      handler(newv) {
        this.dateShow = dayjs(newv).format('YYYY/MM/DD');
      },
    },
    dateShow: {
      handler(newv) {
        console.log('日期变化请求接口: ', newv);
        this.getLadyReport();
      },
    },
    powerType: {
      handler(newv) {
        console.log('能量区图表 - ', newv);
        const name = [
          'tp_days_trent_chart',
          'lf_days_trent_chart',
          'hf_days_trent_chart',
          'lf_hf_days_trent_chart',
          'endocrine_days_trent_chart',
          'dc_days_trent_chart'
        ];
        this.option.xAxis.data = this.selectChartDate(
          this[name[Number(newv)]].timeList
        );
        this.option.series[0].data = this.selectChartDate(
          this[name[Number(newv)]].valueList
        );
        if (newv === '3' || newv === '5') {
          this.option.yAxis.axisLabel.formatter = '{value}';
          this.option.grid.left = '8%';
        } else {
          this.option.grid.left = '10%';
          this.option.yAxis.axisLabel.formatter = this.formatUnit;
        }
        console.log(this.option.xAxis.data, this.option.series[0].data);
        this.powerChart.setOption(this.option, true);
        this.powerChart.resize();
      },
      // immediate: true,
    }
  },
  mounted() {
    this.init(); // 初始化入口
    this.initChartOpt(); // 初始化chartOption
  },
  methods: {
    ...mapMutations({
      setApiObj: 'SET_API_OBJECT'
    }),
    // 初始化chartoption
    initChartOpt() {
      const chartInit = [
        { ref: 'powerChart', key: 'tp_days_trent_chart', opt: 'option' },
        { ref: 'standerChart', key: 'rd_heart_beat', opt: 'standerOption' },
        { ref: 'personalChart', key: 'rd_breath', opt: 'personalOption' }
      ];
      for (const item of chartInit) {
        try {
          const { ref, opt, key } = item;
          this[ref] = echarts.init(this.$refs[ref]);
          this[opt].xAxis.data = this.selectChartDate(this[key].timeList);
          this[opt].series[0].data = this.selectChartDate(this[key].valueList);
          this[ref].setOption(this[opt], true);
          this[ref].resize();
        } catch (error) {
          console.log('error4:', error);
        }
      }
    },
    // 初始化
    init() {
      if (this.DEBUG) {
        const { result } = femade.message;
        this.result = result;
        this.healthShow(0); // 初始化运动的建议
        this.initAdvices(); // 处理suggestion
        this.initData(); // 初始化显示数据
      }
      this.dateShow = this.getDateListFemade[0];    
    },
    // 查询女性报告
    getLadyReport() {
      showLoading();
      this.cleanData();
      const data = {
        startAt: dayjs(new Date(this.dateShow)).format(
          'YYYY/MM/DD 00:00:00'
        ),
        endAt: dayjs(new Date(this.dateShow)).format(
          'YYYY/MM/DD 23:59:59'
        ),
      };
      console.log('日-报告：', [data.startAt, data.endAt]);
      musiGetData('00046DAFB309', data, 'getDerucciGetSleepData')
        .then(res => {
          hideLoading();
          if (!res) {
            console.log('返回的数据异常： ', res);
          } else {
            console.log('查询到的 日 睡眠报告', JSON.parse(res));
            this.result = JSON.parse(res).message.result;
            this.result.attrs === null ? showToast('数据错误', 0) : '';
            this.setApiObj({ getSleepData: JSON.parse(res) });
            this.healthShow(0); // 初始化运动的建议
            this.initAdvices(); // 处理suggestion
            this.initData(); // 初始化显示数据
          }
        })
        .catch(hideLoading());
    },
    // 个人状况 显示数据初始化
    initData() {
      this.hrv_heart_index.score = this.searchArrIdJson('hrv_heart_index');
      this.heart_beat_average.score = this.searchArrIdJson('heart_beat_average');
      const name = [
        'pregnancy_index',
        'water_index',
        'easy_fat_index',
        'emostr_index',
        'strtol_index'
      ];
      for (const item of name) {
        this[item] = this.searchArrIdJson(item);
      }  
      this.initChart(); // 初始化图表
    },
    // 初始化图表 回溯曲线图数据
    initChart() {
      // 0心脏总能量多天 1交感神经调节能力 2迷走神经张力指数多天 3自主神经平衡指数多天 4内分泌指数多天 5心率减速力DC（猝死风险指数）多天
      const name = [
        'tp_days_trent_chart',
        'lf_days_trent_chart',
        'hf_days_trent_chart',
        'lf_hf_days_trent_chart',
        'endocrine_days_trent_chart',
        'dc_days_trent_chart',
      ];
      const stander = ['rd_heart_beat', 'rd_breath'];
      for (const item of name) {
        this.formatChartData(this.searchArrIdJson(item), item);
      }
      for (const item of stander) {
        this.formatStanderData(this.searchArrIdJson(item), item);
      }
      this.initChartOpt(); // 初始化图标
    },
    // 格式化能量区6个图表的数据
    formatChartData(value, name) {
      try {
        const { Data } = value;
        const timeList = [];
        const valueList = [];
        Data.forEach((item, index) => {
          timeList[index] = dayjs(item.time).format('MM-DD');
          valueList[index] = parseInt(item.value);
        });
        this[name].timeList = timeList;
        this[name].valueList = valueList;
      } catch (error) {
        console.log('error2', name, error);
      }
    },
    // 格式化内分泌2个表数据
    formatStanderData(value, name) {
      try {
        const { XDataTime, XDataValue } = value;
        const timeList = XDataTime.map(item => {
        return '';
          // return dayjs(item).format('HH-mm');
        });
        this[name].timeList = timeList;
        this[name].valueList = XDataValue;
      } catch (error) {
        console.log('error5', name, error);
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
        return L;
      } else if (list.length <= 50) {
        return list;
      }
      return L;
    },
    // 初始化建议
    initAdvices() {
      const suggestionList = this.searchArrIdJson('advices');
      const list = [
        { Suggestion: '', SuggestCode: '' },
        { Suggestion: '', SuggestCode: '' },
        { Suggestion: '', SuggestCode: '' },
        { Suggestion: '', SuggestCode: '' }
      ];
      suggestionList.forEach((item, index) => {
        list[index].Suggestion = item.Suggestion;
        list[index].SuggestCode = item.SuggestCode;
      });
      this.advices = JSON.parse(JSON.stringify(list));
    },
    // 获取对应name json内容
    searchArrIdJson(name) {
      try {
        return this.result.attrs.find(item => {
          if (!item.healthResultAttr) return false;
          return item.healthResultAttr.name === name;
        }).value;
      } catch (error) {
        console.log('error3:', name, error);
        return showToast('数据错误', 0);
      }
    },
    // 上一天
    before() {
      const length = this.getDateListFemade.length - 1;
      if (this.dateShowIndex < length) {
        this.dateShowIndex++;
        this.dateTime = dayjs(this.getDateListFemade[this.dateShowIndex]);
      } else {
        console.log('无-上一天');
      }
    },
    // 下一天
    after() {
      if (this.dateShowIndex > 0) {
        this.dateShowIndex--;
        this.dateTime = dayjs(this.getDateListFemade[this.dateShowIndex]);
      } else {
        console.log('无-下一天');
      }
    },
    selectDate() {
      // TODO:
      console.log('选择时间');
    },
    clickOption() {
      this.$router.push({ name: 'ManageAuth' });
    },
    goBack() {
      console.log('返回》》》', this.pathName);
      this.pathName ? closePage() : this.$router.go(-1);
    },
    // 显示解释
    showTip(index) {
      const opt = this.dialogOpt[index];
      console.log('显示： ', index, opt[1]);
      this.slotDialog.open = true;
      this.showTipTitle = opt[1];
      this.showTipContent = `${this[opt[0]].explain}${this[opt[0]].suggest}`;
    },
    // 显示健康贴士
    healthShow(index) {
      console.log('健康贴士', index);
      this.healthIndex = index;
      const name = ['YunDong', 'YY', 'QingXuYaLi', 'ShuiMianXiuXi'];
      this.advicesShow = this.findSuggestion(name[index]);
    },
    // 查找建议
    findSuggestion(name) {
      const find = this.advices.find(item => {
        if (!item) return false;
        return item.SuggestCode === name;
      });
      return find ? find.Suggestion : '暂无建议';
    },
    // echarts 调整单位显示用的
    formatUnit: function (parms) {
      return `${parms / 1000} k`;
    },
    // 清除data
    cleanData() {
      this.hrv_heart_index = {explain: '', score: 0, suggest: [''], type: ''}; // 心脏总能量
      this.heart_beat_average = {explain: '', score: 0, suggest: [''], type: ''}; // 平均心率
      this.pregnancy_index = {explain: '', score: 0, suggest: [''], type: ''}; // 孕气指数
      this.water_index = {explain: '', score: 0, suggest: [''], type: ''}; // 水润指数
      this.easy_fat_index = {explain: '', score: 0, suggest: [''], type: ''}; // 易胖指数
      this.emostr_index = {explain: '', score: 0, suggest: [''], type: ''}; // 情绪应激
      this.strtol_index = {explain: '', score: 0, suggest: [''], type: ''}; // 抗压能力
      this.advices = []; // 建议
      const chartInit = [
        { ref: 'powerChart', key: 'tp_days_trent_chart', opt: 'option' },
        { ref: 'standerChart', key: 'tp_days_trent_chart', opt: 'standerOption' },
        { ref: 'personalChart', key: 'tp_days_trent_chart', opt: 'personalOption' }
      ];
      for (const item of chartInit) {
        const { ref, opt } = item;
        this[ref] = echarts.init(this.$refs[ref]);
        this[opt].xAxis.data = [];
        this[opt].series[0].data = [];
        this[ref].setOption(this[opt], true);
      }
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/FemadeReport.scss';
</style>
