<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-09-14 14:54:56
 * @Description: 床垫首页（这个项目应该没有后续了） 
 -->
<template>
  <gree-view class="page-homePage" bg-color="#0b83e9">
    <gree-header
      :style="{ backgroundImage: 'url(' + head_bg + ')' }"
      :left-options="{ preventGoBack: true }"
      :right-options="{ showMore: true }"
      @on-click-back="goBack()"
      @on-click-more="moreInfo()"
    >{{ devname }}</gree-header
    >
    <gree-page class="page-content">
      <div
        class="header-block"
        :style="{ backgroundImage: 'url(' + head_bg + ')' }"
      >
        <gree-row class="user-show">
          <gree-col width="40">昨日睡眠评分</gree-col>
        </gree-row>
        <div class="header-content">
          <div class="circle-show gree-example-child-progress gree-example-child-progress-0">
            <gree-progress :value="yesScoreLeft" :width="4" :color=" !yesScoreLeft ? 'transparent' : '#2CB9FF'" :size="120" :rotate="-90">  
              <span class="progress-title">左侧</span>      
              <span class="progress-value">{{ Math.round(yesScoreLeft * 100) || '--' }}</span>      
            </gree-progress>
            <gree-progress :value="yesScoreRight" :width="4" :color=" !yesScoreRight ? 'transparent' : '#45c4c2'" :size="120" :rotate="-90">
              <span class="progress-title">右侧</span> 
              <span class="progress-value">{{ Math.round(yesScoreRight * 100) || '--' }}</span>
            </gree-progress> 
          </div>
        </div>
      </div>
      <div class="card">
        <div class="title">
          <span>实时监测</span><span>数据10s更新一次</span>
        </div>
        <div class="content-title">
          <span>床垫左侧</span><span>床垫右侧</span>
        </div>
        <div class="line" />
        <gree-row>
          <gree-col>{{ bed[0].heartRate || '--' }}</gree-col>
          <gree-col>{{ bed[1].heartRate || '--' }}</gree-col>
        </gree-row>
        <gree-row>
          <gree-col> <img :src="iconList.heart" />心率（次/分） </gree-col>
          <gree-col> <img :src="iconList.heart" />心率（次/分） </gree-col>
        </gree-row>
        <gree-row>
          <gree-col>{{ bed[0].breathRate || '--' }}</gree-col>
          <gree-col>{{ bed[1].breathRate || '--' }}</gree-col>
        </gree-row>
        <gree-row>
          <gree-col> <img :src="iconList.breath" />呼吸（次/分） </gree-col>
          <gree-col> <img :src="iconList.breath" />呼吸（次/分） </gree-col>
        </gree-row>
      </div>
      <div class="page-footer">
        <div class="item" v-for="(item, index) in functionList" :key="index">
          <img :src="item.url" @click="footerFunction(index)" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </gree-page>
    <!-- <gree-dialog id="auth" v-model="slotDialog.open" :btns="slotDialog.btns">
      <div>您没有权限查看睡眠报告！可向主人申请权限：</div>
      <img :src="iconList.sleep" />
      <div>小智z</div>
    </gree-dialog> -->
  </gree-view>
</template>

<script>
import dayjs from 'dayjs';
import {
  Header,
  Field,
  InputItem,
  Row,
  Col,
  Card,
  CardContent,
  Dialog,
  Progress
} from 'gree-ui';
import { mapState, mapMutations } from 'vuex';
import homeConfig from '../../mixins/config/70402/homeReport.js'; // home 配置文件
import { getDerucciGetBedStatus, sleepReport } from '@/api/70402/mock.js'; // 测试数据
import {
  musiGetData,
  closePage,
  editDevice,
  showLoading,
  hideLoading
} from '../../../../static/lib/PluginInterface.promise';

export default {
  name: 'HomePage',
  components: {
    [Header.name]: Header,
    [Field.name]: Field,
    [InputItem.name]: InputItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card,
    [CardContent.name]: CardContent,
    [Dialog.name]: Dialog,
    [Progress.name]: Progress
  },
  mixins: [homeConfig],
  data() {
    return {
      circleValueLeft: 0.01, // 圆圈的百分比
      circleValueRight: 0.01, // 圆圈的百分比
      leftScore: 0, // 左 分数
      rightScore: 0, // 左 分数
      dateShow: new Date(), // 初始化显示
      head_bg: require('@/assets/img/bg_header_on.png'),
      currentRate: 88,
      gradientColor: {
        '0%': '#6ED4FF',
        '100%': '#30BAFF'
      },
      iconList: {
        heart: require('@/assets/img/heartIcon.png'),
        action: require('@/assets/img/actionIcon.png'),
        breath: require('@/assets/img/breathIcon.png'),
        sleep: require('@/assets/img/sleepIcon.png')
      },
      heartList: [
        {
          title: '25岁以下 55次/分',
          value: [70, 90, 130]
        },
        {
          title: '25岁以下 55次/分',
          value: [70, 90, 130]
        },
        {
          title: '25岁以下 55次/分',
          value: [70, 90, 130]
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
      bed: [
        {
          heartRate: '--',
          breathRate: '--'
        },
        {
          heartRate: '--',
          breathRate: '--'
        }
      ],
      time: 0, // 轮询的计时器
      beginTimer: 0, // 开始延迟运行的计时器
      rightTimer: 0, // 右床查询的计时器
      DUR: 10000, // 轮询周期
      diGuiCount: 0, // 递归次数
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,
      getBedStatusJson: state => state.apiObject.getBedStatusJson,
      getSleepDataLeft: state => state.apiObject.getSleepDataLeft,
      getSleepDataRight: state => state.apiObject.getSleepDataRight,
      yesScoreLeft: state => state.yesScoreLeft,
      yesScoreRight: state => state.yesScoreRight,
      pathName: state => state.pathName
    })
  },
  watch: {},
  mounted() {
    if (this.pathName !== '') { 
      // 没有分数数据时才再去查，不然不查了
      if (this.yesScoreLeft === null || this.yesScoreRight === null) {
        this.haveMac(); // 递归校验 是否存在mac
      }
      this.beginTimer = setTimeout(() => {
        this.startSearch(); // 开始轮询
      }, 3000);
      console.log('2020/5/15 语音跳转逻辑');
    }
  },
  beforeDestroy() {
    clearInterval(this.time);
    this.time = null;
    clearTimeout(this.beginTimer);
    this.beginTimer = null;
    clearTimeout(this.rightTimer);
    this.rightTimer = null;
  },
  methods: {
    ...mapMutations({
      setApiObject: 'SET_API_OBJECT',
      setYesScoreLeft: 'SET_YES_SCORE_LEFT',
      setYesScoreRight: 'SET_YES_SCORE_RIGHT'
    }),
    // 有mac才开始
    haveMac() {
      if (this.mac && this.diGuiCount < 10) {
        this.getAllBedScore(); // 获取左右床分数
      } else {
        setTimeout(() => {       
          this.haveMac(); // 调用自己
          this.diGuiCount++;
        }, 100);
      }
    },
    //  开始查询
    startSearch() {
      this.searchData();
      this.time = setInterval(() => {
        this.searchData(); // 轮询在床状态
      }, this.DUR);
    },
    // 查询实时数据
    searchData() {
      showLoading();
      const data = {};
      musiGetData(this.mac, data, 'getDerucciGetBedStatus').then(res => {
        hideLoading();
        console.log('在床状态: ', typeof (res), JSON.parse(res));
        this.setApiObject({ getBedStatusJson: JSON.parse(res) });
        this.init();
      })
        .catch(hideLoading());
    },
    // 初始化显示数据
    init() {
      // 首页内容
      // this.circleValueLeft = sleepReport.message.result.score * 0.01
      // this.getBedStatusJson = getDerucciGetBedStatus // 测试数据
      if (this.getBedStatusJson.message.result.parts) {
        this.bed[0].heartRate = this.getBedStatusJson.message.result.parts[0].heartRate;
        this.bed[0].breathRate = this.getBedStatusJson.message.result.parts[0].breathRate;
        this.bed[1].heartRate = this.getBedStatusJson.message.result.parts[1].heartRate;
        this.bed[1].breathRate = this.getBedStatusJson.message.result.parts[1].breathRate;
      } else {
        console.log('没有在床状态parts');
      }
    }, 
    // 只获取获取左右床分数 --- 后面添加的新接口
    getAllBedScore() {
      showLoading();
      const data = {
        startAt: `${dayjs(this.dateShow).subtract(1, 'day').format('YYYY/MM/DD')} 00:00:00`,
        endAt: `${dayjs(this.dateShow).subtract(1, 'day').format('YYYY/MM/DD')} 23:59:59`,
      };
      console.log('请求昨日的分数： ', [data.startAt, data.endAt]);
      musiGetData(this.mac, data, 'getDerucciGetSleepAllData').then(res => {
        hideLoading();
        const { left, right } = JSON.parse(res);
        this.circleValueLeft = left * 0.01; // 接口
        this.leftScore = left;
        console.log('左床分数是：', this.leftScore, this.circleValueLeft);
        this.setYesScoreLeft(this.circleValueLeft);

        this.circleValueright = right * 0.01; // 接口
        this.rightScore = right;
        console.log('右床分数是：', this.rightScore, this.circleValueright);
        this.setYesScoreRight(this.circleValueright);
      })
        .catch(hideLoading());
    },
    LoadingStay() {
      setTimeout(() => {       
        hideLoading();
      }, 600);
    },
    goBack() {
      closePage();
    },
    moreInfo() {
      editDevice(this.mac);
    },
    // 底部功能按钮的点击事件
    footerFunction(index) {
      console.log('index', index);
      switch (index) {
        case 0:
          this.$router.push({ name: 'SleepReport' });
          break;
        case 1:
          this.$router.push({ name: 'Control' });
          break;
        default:
          break;
      }
    },
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';
@import '@/assets/scss/HomePage.scss';
</style>
