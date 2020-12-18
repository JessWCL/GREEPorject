<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-09-14 14:55:46
 * @Description: 首页  这个项目没上架就凉了
 -->
<template>
  <gree-view class="page-homePage" bg-color="#3674E7">
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
        <div class="header-content">
          <div class="circle-show">
            <gree-progress
              type="dashboard"
              :width="160"
              :stroke-width="3.5"
              :value="circleValue"
              color="#2CB9FF"
            ></gree-progress>
            <div class="txt-show">
              <div>睡眠评分</div>
              <div>
                {{ Math.round(circleValue * 100) || '--' }}
              </div>
              <div>昨日</div>
            </div>
          </div>
        </div>
      </div>
      <gree-card class="data-board">
        <div class="title">
          <span @click="$router.push({ name: 'FirstIn' })">实时监测</span
          ><span @click="test()">数据20s更新一次</span>
        </div>
        <gree-card-content>
          <gree-row>
            <gree-col>{{ bed.breathRate }}</gree-col>
            <gree-col>{{ bed.bodyMotion }}</gree-col>
          </gree-row>
          <gree-row>
            <gree-col> <img :src="iconList.heart" />心率（次/分） </gree-col>
            <gree-col> <img :src="iconList.action" />体动（次） </gree-col>
          </gree-row>
          <gree-row>
            <gree-col>{{ bed.inBedState }}</gree-col>
            <gree-col>{{ bed.inBedState === 1 ? '在床' : '离床' }}</gree-col>
          </gree-row>
          <gree-row>
            <gree-col> <img :src="iconList.breath" />呼吸（次/分） </gree-col>
            <gree-col> <img :src="iconList.sleep" />在/离床 </gree-col>
          </gree-row>
        </gree-card-content>
      </gree-card>
      <div class="page-footer">
        <div class="item" v-for="(item, index) in functionList" :key="index">
          <img :src="item.url" @click="footerFunction(index)" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { getDerucciGetBedStatus, sleepReport } from '@/api/70403/mock.js';
import dayjs from 'dayjs';
import {
  Header,
  Field,
  InputItem,
  Row,
  Col,
  Card,
  CardContent,
  Progress,
} from 'gree-ui';
import { mapState, mapMutations } from 'vuex';
import homeConfig from '../../mixins/config/70403/homeReport.js'; // home 配置文件
import {
  closePage,
  editDevice,
  showLoading,
  hideLoading,
  musiGetData,
  showToast,
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
    [Progress.name]: Progress,
  },
  mixins: [homeConfig],
  data() {
    return {
      DEGUG: false,
      circleValue: 0, // 圆圈的百分比
      head_bg: require('@/assets/img/bg_header_on.png'),
      currentRate: 88,
      gradientColor: {
        '0%': '#6ED4FF',
        '100%': '#30BAFF',
      },
      iconList: {
        heart: require('@/assets/img/heartIcon.png'),
        action: require('@/assets/img/actionIcon.png'),
        breath: require('@/assets/img/breathIcon.png'),
        sleep: require('@/assets/img/sleepIcon.png'),
      },
      heartList: [
        {
          title: '25岁以下 55次/分',
          value: [70, 90, 130],
        },
        {
          title: '25岁以下 55次/分',
          value: [70, 90, 130],
        },
        {
          title: '25岁以下 55次/分',
          value: [70, 90, 130],
        },
      ],
      getBedStatusJson: '',
      bed: {
        bodyMotion: '--',
        heartRate: '--',
        breathRate: '--',
        inBedState: '--',
      },
      beginTimer: null,
      CYCLE: 1000 * 20,
      yesDate: new Date(),
      startAt: dayjs(new Date().getTime() - 24 * 60 * 60 * 1000).format(
        'YYYY/MM/DD 00:00:00',
      ),
      endAt: dayjs(new Date().getTime() - 24 * 60 * 60 * 1000).format(
        'YYYY/MM/DD 23:59:59',
      ),
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,
      yesScore: state => state.yesScore,
      userData: state => state.apiObject.userData,
      getDateList: state => state.apiObject.getDateList,
      getDateListFemade: state => state.apiObject.getDateListFemade,
      pathName: state => state.pathName
    }),
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
      console.log('2020/05/12 增加语音看报告跳转');
    }
  },
  methods: {
    ...mapMutations({
      setYesScore: 'SET_YES_SCORE',
      setApiObj: 'SET_API_OBJECT',
    }),
    async init() {
      this.yesScore === null
        ? await this.getYesDateReport()
        : (this.circleValue = this.yesScore); // 没有分数数据时才再去查，不然不查了
      this.getDateListFemade === null ? await this.getDateListReport() : ''; // null说明没有获取过接口
      !this.userData ? await this.getInfo(this.mac) : ''; // 每次进来先查询一下是否已填个人信息
      // TODO:这里有bug未解决 清除定时器的
      this.startSearch(); // 开始轮询
    },
    // 获取用户信息
    async getInfo(mac) {
      showLoading();
      console.log('正在获取用户信息↓');
      await musiGetData('00046DAFB309', {}, 'getDerucciGetLadyInfo')
        .then(res => {
          const result = JSON.parse(res);
          const { code, message } = result;
          console.log('用户信息↓：', result);
          if (code === 400) {
            // clearInterval(this.beginTimer);
            // console.log('清除定时器');
            // this.$router.replace({ name: 'FirstIn', query: {flag: 400} }); // 400显示下面提交按钮
            this.setApiObj({ userData: [] }); // 已经填写，存起来
          } else if (code === 200 && message.result) {
            this.setApiObj({ userData: message.result }); // 已经填写，存起来
          }
        })
        .catch(res => console.log('res', res));
    },
    // 开始轮询
    startSearch() {
      this.getBedStatus(); // 开始轮询
      if (!this.beginTimer) {
        this.beginTimer = setInterval(() => {
          this.getBedStatus(); // 开始轮询
        }, this.CYCLE);
      }
      this.$once('hook:destroyed', () => {
        clearInterval(this.beginTimer);
        console.log('清除定时器： ', this.beginTimer);
      });
    },
    // 查询昨日报告分数
    async getYesDateReport() {
      const data = {
        startAt: this.startAt,
        endAt: this.endAt,
      };
      console.log('昨日睡眠报告↓', [data.startAt, data.endAt]);
      await musiGetData('00046DAFB309', data, 'getDerucciGetSleepData')
        .then(res => {
          console.log('获取睡眠报告↓', JSON.parse(res));
          const result = JSON.parse(res);
          // TODO:设置分数
          this.circleValue = result.message.result.score * 0.01;
          console.log('this.circleValue', this.circleValue);
          this.setYesScore(this.circleValue);
          hideLoading();
        })
        .catch(err => {
          console.log('', err);
          hideLoading();
        });
    },
    // 查询床垫的日期列表
    async getDateListReport() {
      showLoading();
      const data = {
        startAt: '2019/11/01 00:00:00',
        endAt: `${dayjs().format('YYYY/MM/DD 00:00:00')}`,
      };
      console.log('查询日期↓ ', [data.startAt, data.endAt]);
      await musiGetData('00046DAFB309', data, 'getDerucciGetDateList')
        .then(res => {
          hideLoading();
          if (!res) {
            console.log('返回的数据异常： ', res);
          } else {
            try {
              const result = JSON.parse(res);
              const list = result.message.result;
              result.code !== 200 ? showToast('请求异常', 0) : '';
              console.log('日期： ', list);
              let femade = null;
              list.length > 10 ? (femade = list.slice(0, -10)) : (femade = []);
              this.setApiObj({
                getDateList: list,
              });
              this.setApiObj({
                getDateListFemade: femade,
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
    getBedStatus() {
      showLoading();
      console.log('轮询中');
      musiGetData('00046DAFB309', {}, 'getDerucciGetBedStatus')
        .then(res => {
          console.log('在床-获取成功', JSON.parse(res));
          // TODO:这里设置值
          this.setBedStatus(JSON.parse(res));
          hideLoading();
        })
        .catch(err => {
          console.log('', err);
          hideLoading();
        });
    },
    async footerFunction(index) {
      switch (index) {
        case 0:
          this.$router.push({ name: 'SleepReport' });
          break;
        case 1:
          console.log(
            '查看女性报告: ',
            this.getDateListFemade,
            '用户数据：',
            this.userData,
          );
          if (!this.userData.length || !this.userData === null) {
            // 每次进来先查询一下是否已填个人信息
            await this.getInfo(this.mac);
            this.$router.replace({ name: 'FirstIn', query: { flag: 400 } }); // 没有个人信息跳转过去填,传400 显示提交
          } else if (!this.getDateListFemade === null) {
            await this.getDateListReport(); // null说明没有获取过接口
          } else {
            this.getDateListFemade.length
              ? this.$router.push({ name: 'FemadeReport' })
              : showToast('10份睡眠报告后可查看', 0);
          }
          break;
        default:
          break;
      }
    },
    // 设置查询回来的在床状态
    setBedStatus(result) {
      // 首页内容
      this.DEGUG
        ? (this.getBedStatusJson =
            getDerucciGetBedStatus.message.result.parts[0])
        : (this.getBedStatusJson = result.message.result.parts[0]);
      this.bed.bodyMotion = this.getBedStatusJson.bodyMotion;
      this.bed.breathRate = this.getBedStatusJson.breathRate;
      this.bed.heartRate = this.getBedStatusJson.heartRate;
      this.bed.inBedState = this.getBedStatusJson.inBedState;
    },
    test() {
      this.setApiObj({ userData: [1, 2] }); // 已经填写，存起来
    },
    goBack() {
      closePage();
    },
    moreInfo() {
      editDevice(this.mac);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';
@import '@/assets/scss/HomePage.scss';
</style>
