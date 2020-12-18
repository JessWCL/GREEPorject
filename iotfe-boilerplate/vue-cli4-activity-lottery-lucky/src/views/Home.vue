<template>
  <gree-view :bg-color="statusBarColor">
    <loading-view :loaded="loaded" />
    <gree-page no-navbar :class="['page-home', iphoneXClass]" v-show="loaded">
      <div class="banner" />
      <div class="page-close" @click="goBack" />
      <div class="record" @click="openPopup('PrizeList')" />
      <div class="rule" @click="openPopup('Rule')" />
      <div class="logo" />
      <div class="result" />
      <gree-block class="button-box">
        <gree-row>
          <gree-col>
            <gree-button round @click="addDevice" />
          </gree-col>
          <gree-col>
            <gree-button round @click="goToHelp" />
          </gree-col>
        </gree-row>
      </gree-block>
      <div class="page-main">
        <div class="radius-group"></div>
        <div class="circle">
          <div class="circle-box">
            <div class="prize" v-for="(item, index) in prize_list" :key="index">
              <div class="prize-dialog">
                <gree-image :src="item.awardImg" />
              </div>
            </div>
          </div>
        </div>
        <div class="start" :class="{ 'start--disabled': startDisabled, gray: activityObject.status === 3 }" @click="start()">
          <p>{{ !startDisabled ? '抽奖' : '抽奖中' }}</p>
        </div>
      </div>
      <div class="apple">
        <gree-tag size="large" shape="circle" type="fill">
          当前您拥有的抽奖券
          <label>{{ lottery_times }}</label>
          张
        </gree-tag>
        <gree-block-title>抽奖记录</gree-block-title>
        <gree-marquee v-if="notices1">
          <gree-marquee-item v-for="(item, index) in notices1" :key="index">{{ item }}</gree-marquee-item>
        </gree-marquee>
        <gree-marquee v-if="notices2">
          <gree-marquee-item v-for="(item, index) in notices2" :key="index">{{ item }}</gree-marquee-item>
        </gree-marquee>
        <gree-marquee v-if="notices3">
          <gree-marquee-item v-for="(item, index) in notices3" :key="index">{{ item }}</gree-marquee-item>
        </gree-marquee>
        <gree-marquee v-if="notices4">
          <gree-marquee-item v-for="(item, index) in notices4" :key="index">{{ item }}</gree-marquee-item>
        </gree-marquee>
      </div>
      <!-- 活动规则 -->
      <popup-rule v-model="showPopupRule" @hide="hidePopup('Rule')" v-if="loaded" />
      <!-- 未中奖弹窗 -->
      <popup-lose v-model="showPopupLosePrize" @hide="hidePopup('LosePrize')" v-if="showPopupLosePrize" />
      <!-- 中奖弹窗 -->
      <popup-win v-model="showPopupWinPrize" :win-id="winId" :prize-list="prize_list" @hide="hidePopup('WinPrize')" v-if="showPopupWinPrize" />
      <!-- 奖品列表弹窗 -->
      <popup-prize-list v-model="showPopupPrizeList" @hide="hidePopup('PrizeList')" v-if="showPopupPrizeList" />
    </gree-page>
    <div v-show="false">{{ ColorChange }}</div>
  </gree-view>
</template>

<script>
import $ from 'zepto-webpack';
require('@/utils/rotate.js');
import { Block, BlockTitle, Row, Col, Button, Image, Tag, Toast, Marquee, MarqueeItem, PopupActivity } from 'gree-ui';
import { mapState } from 'vuex';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import LoadingView from '@components/LoadingView';
import PopupRule from '@components/PopupRule';
import PopupLose from '@components/PopupLose';
import PopupWin from '@components/PopupWin';
import PopupPrizeList from '@components/PopupPrizeList';
import homeConfig from '@/mixins/config/home';
import { isIOS } from '@/utils';
import {
  closePage,
  changeBarColor,
  toWebPage,
  activityGetUserTickets,
  activityGetAllWinHistory,
  activityTakeLottery,
  startCatalogConfigActivity
} from '../../../static/lib/PluginInterface.promise';

dayjs.locale('zh-cn'); // 全局使用简体中文

export default {
  components: {
    [Block.name]: Block,
    [BlockTitle.name]: BlockTitle,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Image.name]: Image,
    [Tag.name]: Tag,
    [Marquee.name]: Marquee,
    [MarqueeItem.name]: MarqueeItem,
    [PopupActivity.name]: PopupActivity,
    LoadingView,
    PopupRule,
    PopupLose,
    PopupWin,
    PopupPrizeList
  },
  mixins: [homeConfig],
  data() {
    return {
      statusBarColor: '#F1AD29',
      loaded: false,
      lottery_times: 0, // 抽奖次数
      thanksDeg: 0, // 初始旋转角度
      speed: 1300, // 转动速度
      timeout: false, // 是否超时
      running: false, // 抽奖状态（是否进行中）
      startDisabled: false, // 开始按钮状态
      showPopupRule: false, // 活动规则弹窗
      showPopupLosePrize: false, // 未中奖弹窗
      showPopupWinPrize: false, // 中奖弹窗
      showPopupPrizeList: false, // 我的奖品列表弹窗
      notices1: [],
      notices2: [],
      notices3: [],
      notices4: []
    };
  },
  computed: {
    ...mapState({
      activityObject: state => state.activityObject,
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac
    }),
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
  created() {
    this.handleUserTickets();
    this.handleNotice();
  },
  mounted() {
    // 活动结束再进入，主动弹出 - 我的奖品列表
    if (this.activityObject.status === 3) {
      this.openPopup('PrizeList');
    }
    // 重置转盘
    if (!this.running) {
      this.reset();
    }
  },
  destroyed() {
    $('.circle').stopRotate();
  },
  methods: {
    /**
     * @description 返回键
     */
    goBack() {
      closePage();
    },
    addDevice() {
      startCatalogConfigActivity();
    },
    goToHelp() {
      toWebPage('http://helpgrih.gree.com/GreePlusHelpZh/v3.0/#/AddDevice', '如何添加设备？');
    },
    handleUserTickets() {
      activityGetUserTickets()
        .then(res => {
          console.log(`GetUserTickets: ${res}`);
          let resInfo;
          if (isIOS) {
            try {
              resInfo = res.match(/msg":"(\S*)/)[1];
              resInfo = resInfo.substr(0, resInfo.length - 2);
              resInfo = JSON.parse(resInfo);
            } catch (e) {
              Toast.failed('GetUserTickets Parse Data Error');
            }
          } else {
            resInfo = eval('(' + JSON.parse(res)['msg'] + ')');
          }
          this.lottery_times = resInfo.unusedTickets;
          return res;
        })
        .catch(err => {
          err;
        });
    },
    handleNotice() {
      activityGetAllWinHistory()
        .then(res => {
          this.loaded = true;
          console.log(`GetAllWinHistory: ${res}`);
          let resInfo;
          if (isIOS) {
            try {
              resInfo = res.match(/msg":"(\S*)/)[1];
              resInfo = resInfo.substr(0, resInfo.length - 2);
              resInfo = JSON.parse(resInfo);
            } catch (e) {
              Toast.failed('GetAllWinHistory Parse Data Error');
            }
          } else {
            resInfo = eval('(' + JSON.parse(res)['msg'] + ')');
          }
          Array.from(resInfo.content).forEach(item => {
            this.notices1.push(
              `${item.ctime && dayjs(item.ctime).format('YYYY年M月D日')} ${item.displayName &&
                item.displayName.replace(/^(\d{4})\d{4}(\d+)/, '$1$2****')} 获得${item.awardName}`
            );
          });
          if (resInfo.content.length >= 2) {
            this.notices2 = this.notices1.slice(1, this.notices1.length).concat(this.notices1.slice(0, 1));
          }
          if (resInfo.content.length >= 3) {
            this.notices3 = this.notices2.slice(1, this.notices2.length).concat(this.notices2.slice(0, 1));
          }
          if (resInfo.content.length >= 4) {
            this.notices4 = this.notices3.slice(1, this.notices3.length).concat(this.notices3.slice(0, 1));
          }
          return res;
        })
        .catch(err => {
          err;
        });
    },
    // 打开弹窗
    openPopup(type) {
      this[`showPopup${type}`] = true;
    },
    // 关闭弹窗
    hidePopup(type) {
      this[`showPopup${type}`] = false;
    },
    // 重置转盘
    reset() {
      $('.circle').rotate(this.thanksDeg);
      $('.circle').rotate({
        angle: this.thanksDeg,
        animateTo: 3600,
        duration: 3000 * 1000,
        easing: (start, time, begin, change, duration) => {
          return -change * ((time = time / duration - 1) * time * time * time - 1) + begin;
        }
      });
    },
    // 重新初始化
    reInit() {
      document.ontouchmove = null;
      this.running = false;
      $('.circle').rotate(this.thanksDeg);
      this.startDisabled = false;
      this.reset();
    },
    // 开始抽奖
    start() {
      if (this.activityObject.status === 1) {
        return Toast.info('活动未开始');
      }
      if (this.activityObject.status === 3) {
        return Toast.info('感谢您的参与，活动已结束');
      }
      if (this.lottery_times <= 0) {
        return Toast.info('无抽奖券，请配网获取抽奖券');
      }
      if (!this.running) {
        this.rotateStart();
        setTimeout(() => {
          this.getLottery();
        }, 500);
      }
    },
    rotateStart() {
      this.timeout = false;
      this.running = true;
      this.startDisabled = true;
      $('.circle').stopRotate();
      $('.circle').rotate({
        angle: this.getRotateAngle(),
        animateTo: 7200,
        duration: 20 * this.speed,
        easing: function(start, time) {
          return time;
        },
        callback: function() {
          this.timeout = true;
          Toast.info('网络错误');
        }
      });
    },
    getRotateAngle() {
      return $('.circle-box').getRotateAngle() % 60;
    },
    getLottery() {
      activityTakeLottery()
        .then(res => {
          console.log(`TakeLottery: ${res}`);
          let resInfo;
          if (isIOS) {
            try {
              resInfo = res.match(/msg":"(\S*)/)[1];
              resInfo = resInfo.substr(0, resInfo.length - 2);
              resInfo = JSON.parse(resInfo);
            } catch (e) {
              Toast.failed('TakeLottery Parse Data Error');
            }
          } else {
            resInfo = eval('(' + JSON.parse(res)['msg'] + ')');
          }
          if (resInfo.result >= 0) {
            let rotateAngel;
            if (resInfo.result >= 0 && resInfo.result <= 2) {
              rotateAngel = 60 * (6 - resInfo.result) + 60;
            } else {
              rotateAngel = 60 * (6 - resInfo.result) + 120;
            }
            rotateAngel += 360;
            setTimeout(() => {
              this.lottery_times -= 1;
              $('.circle').stopRotate();
              $('.circle').rotate({
                angle: this.getRotateAngle(),
                animateTo: rotateAngel,
                duration: 1 * this.speed,
                easing: function(start, time, begin, change, duration) {
                  return -change * ((time = time / duration - 1) * time * time * time - 1) + begin;
                },
                callback: () => {
                  setTimeout(() => {
                    this.winId = resInfo.result;
                    if (resInfo.result > 0) {
                      this.openPopup('WinPrize');
                    } else {
                      this.openPopup('LosePrize');
                    }
                    this.reInit();
                  }, 300);
                }
              });
            }, 1500);
          } else {
            Toast.info('API Error');
            setTimeout(() => {
              this.reInit();
            }, 2000);
          }
          return res;
        })
        .catch(err => {
          err;
        });
    }
  }
};
</script>
