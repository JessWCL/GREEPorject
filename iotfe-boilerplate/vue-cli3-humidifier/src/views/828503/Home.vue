/* eslint-disable quotes */
<template>
  <gree-view :bg-color="bgStatus">
    <gree-page
      no-navbar
      class="page-home"
    >
      <div class="header">
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          :right-options="{showMore: functype? false : true}"
          :title="devname"
          @on-click-back="goBack"
          @on-click-more="editDevice"
        >
          <span
            v-show="functype"
            slot="right"
            @click.stop="saveScence"
            style="color: #ffffff;"
          >{{ $language('home.save') }}</span>
        </gree-header>
        <ul
          class="mini-icon-bar"
          v-show="deviceState !== -1"
        >
          <li
            v-for="(item, index) in functionList"
            :key="index"
            v-show="iconDisplay[index]"
          >
            <img class="icon" :src="item.miniIcon">
          </li>
        </ul>
        <div class="humidity-label">
          <img
            class="humidity-icon"
            src="@/assets/images/828502/ic_humidity.png"/>
          <span>
            {{ Humidity }}%
          </span>
        </div>
        <gree-notice-bar
          v-show="isError"
          :class="[Pow ? '':'PowOff']">
          <span v-show="isSingleError">
            <img src="@/assets/images/fault_s.png"/>
            <span>故障：{{ errorCode }}，{{ errorName }}。</span>
            <a
              href="javascript:;"
              @click="goErrorPage"
            >查看详情</a>
          </span>
          <gree-marquee v-show="!isSingleError">
            <gree-marquee-item
              v-for="(item, index) in errors"
              :key="index">
              <img
                src="@/assets/images/fault_s.png"
              />
              <span v-if="item.code!=='!'">故障：{{ item.code }}，{{ item.title }}。</span>
              <span v-if="item.code==='!'">故障：{{ item.title }}。</span>
              <a
                href="javascript:;"
                @click="goErrorPage"
              >查看详情</a>
            </gree-marquee-item>
          </gree-marquee>
        </gree-notice-bar>
        <!-- 消息提醒 -->
        <gree-notice-bar class="custom-notice-bar" v-if="Humidity>=70" scrollable>
          <gree-icon slot="left" name="bell" ></gree-icon>
          湿度较高，请关闭加湿器或者降低档位，智能档会自动停止加湿。
        </gree-notice-bar>
      </div>
      <div
        class="main"
        v-show="Pow"
      >
        <div
        class="container">
          <div
            class="fog-carousel-holder"
            :class="{hidden: !Pow}">
            <Carousel
              ref="fogCarousel"
              class="fog-carousel-pos"
              @currentChange="setFogLevel"
              @ondrag="setitemlight"
              :prop-data="fogLevelList"
              :options="carouselOptions"
            />
          </div>
        </div>
        <span
          v-show="FogLevel !== 0"
          :class="{'intelligence-label2': itemlight === true,'intelligence-label3': itemlight === false}"
          class="label-unit">{{ '档' }}</span>
      </div>
      <gree-power-off
        v-model="showPowerOff"
        :style="{ backgroundImage:'url(' + powerOffImg + ')'}"
        :text="'已关机'"
      ></gree-power-off>
      <div class="footer">
        <div 
          v-for="(item, index) in footList" 
          :key="index"
          :class="{hidden: (!item.isScenesShow && functype)||(index===1&&Pow===0) }"  
          class="btn"
          @click="setFunction(index)"
        >
          <img 
            class="icon" 
            :src="item.ImgName" />
          <span class="name">{{ item.Name }}</span>
        </div>
      </div>
    </gree-page>
    <div 
      style="position: fixed; top:0; left:33%; width:30%; height:100px; opacity: 0;" 
      @click="consoleSwitch"></div>
  </gree-view>  
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  Header,
  Row,
  Col,
  Icon,
  PowerOff,  
  Toast,
  Marquee, 
  MarqueeItem,
  NoticeBar,
} from 'gree-ui';

import { closePage, editDevice, changeBarColor, getCCcmd, showToast, } from '../../../../static/lib/PluginInterface.promise';
import { judgeStringLength } from '../../utils/index';
import 'swiper/dist/css/swiper.css';
import Carousel from '../../components/Carousel503';

const img = {
  sleep_on: require('@/assets/images/828502/sleep_on.png'),
  sleep_off: require('@/assets/images/828502/sleep_off.png'),
  btn_off: require('@/assets/images/828502/btn_off.png'),
  btn_on: require('@/assets/images/828502/btn_on.png'),
  time_on: require('@/assets/images/828502/time_on.png'),
  time_off: require('@/assets/images/828502/time_off.png'),
};

const TITLE_BAR_COLOR = {
  // 开、关机界面状态栏颜色值
  POW_ON: '#2f6c98',
  POW_OFF: '#5c92b5',
};
const ERRORS_MAP = {
  Estate1: {
    4: {
      code: '!',
      headtitle: '故障名称：',
      title: '水箱提起',
      subtitle: '解除办法：',
      text: '请把水箱放置到位'
    },
    16: {
      code: 'F0',
      headtitle: '故障名称：',
      title: '缺水保护',
      subtitle: '解除办法：',
      text: '水箱缺水,请注意加水'
    }
  },
  Estate2: {
    128: {
      code: 'E3',
      headtitle: '故障名称：',
      title: '温湿度传感器故障',
      subtitle: '解除办法：',
      text: '联系售后'
    }
  },
  JFerr: {
    1: {
      code: 'H1',
      headtitle: '故障名称：',
      title: 'WIFI通讯故障',
      subtitle: '解除办法：',
      text: '联系售后'
    },
  }
};
export default {
  components: {
    Carousel,
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [PowerOff.name]: PowerOff,
    [Marquee.name]: Marquee,
    [MarqueeItem.name]: MarqueeItem,
    [NoticeBar.name]: NoticeBar,
    [Toast.name]: Toast,
  },
  data() {
    return {
      showPowerOff: false,
      isPopupShow: {},
      powerOffImg: require('../../assets/images/pow_off_bg.png'),
      carouselOptions: {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: true, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: false, // 显示3个or全部显示
        width: '100%', // 组件宽度
        spaceBetween: '2.1rem', // 间距
        height: '3.9rem', // 图片大小
        fontSize: '3.63rem',
        radiusMutiply: 1.6, // 半径系数
      },
      fogLevelList: ['智能', 1, 2, 3], // 雾量可调节范围
      isSingleError: false,
      errorCode: '',
      errorName: '',
      errors: [],
      count: 0,
      timerId: 0,
      itemlight: false,
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => judgeStringLength(state.deviceInfo.name),
      lang: state => state.deviceInfo.lang,
      functype: state => state.functype,
      mac: state => state.mac,
      Pow: state => state.dataObject.Pow,
      deviceState: state => state.deviceInfo.deviceState,
      FogLevel: function (state) {
        const fogLevel = state.dataObject.FogLevel;
        console.log(this);
        this.$nextTick(() => {
          console.log('computed pow');
          this.$refs.fogCarousel.setId(fogLevel);
        });
        return fogLevel;
      },
      isInit: state => state.isInit,
      TmrHour: state => state.dataObject.TmrHour,
      TmrOn: state => state.dataObject.TmrOn,
      TmrMin: state => state.dataObject.TmrMin,
      Humidity: state => state.dataObject.Humidity,
      Mode: state => state.dataObject.Mode,
      Estate1: state => state.dataObject.Estate1,
      Estate2: state => state.dataObject.Estate2,
      Sleep: state => state.dataObject.Sleep,
      UV: state => state.dataObject.UV,
      isFirstLoad: state => state.isFirstLoad,
      JFerr: state => state.dataObject.JFerr
    }),
    isError() {
      if (this.JFerr === 1 || this.JFerr === 2 || this.JFerr === 3) { return this.Estate1 + this.Estate2 + 1; } return this.Estate1 + this.Estate2;  
    },
    footList() {
      return [
        {
          isScenesShow: true,
          onlyLang: '',
          Name: '开关',
          ImgName: this.Pow ? img.btn_off : img.btn_on
        },
        {
          isScenesShow: true,
          onlyLang: '',
          Name: '睡眠',
          ImgName: this.Sleep ? img.sleep_on : img.sleep_off
        },
        {
          isScenesShow: false,
          onlyLang: '',
          Name: '定时',
          ImgName: this.TmrOn ? img.time_on : img.time_off
        },
      ];
    },
    functionList() {
      return [
        {
          index: 1,
          name: 'func.uv',
          miniIcon: require('../../assets/images/uv_mini.png'),
          ImgUrl: '',
          moreBtn: false,
          ScenesShow: true,
          sign: 'UV',
        },
        {
          index: 2,
          name: '睡眠',
          miniIcon: require('../../assets/images/sleep_mini.png'),
          moreBtn: false,
          ScenesShow: true,
          sign: 'Sleep',
        },
        {
          index: 3,
          name: '预约',
          miniIcon: require('../../assets/images/timer_mini.png'),
          moreBtn: false,
          ScenesShow: true,
          sign: 'TmrOn',
        },
      ];
    },
    iconDisplay() {
      const items = this.functionList.map(item => {
        return this.dataObject[item.sign] && (!this.functype || item.ScenesShow);
      });
      return items;
    },
    bgStatus() {
      let color = '#0000ff';
      if (this.Pow) {
        color = TITLE_BAR_COLOR.POW_ON;
      } else {
        color = TITLE_BAR_COLOR.POW_OFF;
      }
      changeBarColor(color);
      return color;
    },
  },
  watch: {
    /**
     * @description 获取电源开关信息，更新电源按键UI
     */
    Pow(val) {
      this.showPowerOff = Boolean(!this.Pow);
      this.setBarColor();
      if (val) {
        // 开机默认智能档清除定时和显示睡眠功能
        const cmd = {TmrOn: 0, UV: 1, TmrMin: 0, TmrHour: 0};
        this.setDataObject(cmd);
        this.sendCtrl(cmd);
        this.footList[1].isScenesShow = true;
      } else {
        // 关机清除定时和睡眠设置和隐藏睡眠功能
        const cmd = {Sleep: 0, TmrOn: 0, UV: 0, TmrMin: 0, TmrHour: 0};
        this.setDataObject(cmd);
        this.sendCtrl(cmd);
        this.footList[1].isScenesShow = false;
      }
      if (val) {
        this.$nextTick(() => {
          console.log('watch pow');
          this.$refs.fogCarousel.redraw();
        });
      }
    },    
    UV(val) {
      if (this.Pow) {
        if (val) {
          Toast.info('UV灯已开启', 1500);
        } else {
          Toast.info('UV灯已关闭', 1500);
        }
      }
    },
    isInit(val) {
      if (val) {
        console.log('init end');
        this.setBarColor();
      }
    },
    isError(val) {
      this.checkErrors(val);
    },
  },
  mounted() {
    this.showPowerOff = Boolean(!this.Pow);
    this.setBarColor();
    this.checkErrors(this.isError);
    console.log(`mode:${this.Mode}`);
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setErrorList: 'SET_ERROR_LIST',
      setFirstLoad: 'SET_FIRSTLOAD'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    setitemlight(isitemlight) {
      if (isitemlight === true) this.itemlight = true;
      else this.itemlight = false;
    },
    goBack() {
      closePage();
    },
    editDevice() {
      if (this.functype) return;
      editDevice(this.mac);
    },
    saveScence() {
      const keys = Object.keys(this.dataObject);
      const opt = [];
      const p = [];
      const remarks = '...';
      for (let i = 0, j = keys.length; i < j; i += 1) {
        opt.push(keys[i]);
        p.push(this.dataObject[keys[i]]);
      }
      const json = JSON.stringify({ opt, p, t: 'cmd' });
      getCCcmd(this.mac, json, remarks, JSON.stringify(p));
    },
    setFogLevel(val) {
      console.log(`val:${val}`);
      if (val === 0) {
        const cmd = {Mode: 1, FogLevel: 0};
        this.setDataObject(cmd);
        this.sendCtrl(cmd);
      } else {
        const cmd = {Mode: 0, FogLevel: val};
        this.setDataObject(cmd);
        this.sendCtrl(cmd); 
      }
    },
    powerOn() {
      this.setDataObject({Pow: 1});
      this.sendCtrl({Pow: 1});
      changeBarColor(TITLE_BAR_COLOR.POW_ON);
    },
    setBarColor() {
      if (this.Pow) {
        changeBarColor(TITLE_BAR_COLOR.POW_ON);
      } else {
        changeBarColor(TITLE_BAR_COLOR.POW_OFF);
      }
    },
    goErrorPage() {
      this.$router.push('/Error');
    },
    setErrors() {
      let estates = {
        Estate1: this.Estate1,
        Estate2: this.Estate2,
        JFerr: 1
      };
      if (this.JFerr === 0) {
        estates = {
          Estate1: this.Estate1,
          Estate2: this.Estate2,
        };
      }
      Object.keys(estates).forEach(k => {
        const errorVal = estates[k];
        for (let i = 1; i <= 256; i *= 2) {
          Object.keys(ERRORS_MAP[k]).forEach(err => {
            if ((i & errorVal) === Number(err)) {
              this.errors.push(ERRORS_MAP[k][err]);
              console.log(ERRORS_MAP[k][err]);
            }
          });
        }
      });
    },
    showTip() {
      if (this.isError && (this.Estate1 || this.JFerr)) {
        showToast('故障中，不可调节', 0);
      }
    },
    
    /**
     * @description 点击底部功能列表
     */
    setFunction(val) {
      if (this.isError && (this.Estate1 || this.JFerr)) {
        showToast('故障中，不可操作', 0);
        return;
      }
      switch (val) {
        case 0:
          if (this.Pow) {
            this.setDataObject({ Pow: 0 });
            this.sendCtrl({ Pow: 0 });
          } else {
            this.sendCtrl({ Pow: 1 });
            this.setDataObject({ Pow: 1 });
          }
          break;
        case 1:
          if (this.Sleep) {
            this.setDataObject({ Sleep: 0 });
            this.sendCtrl({ Sleep: 0 });
          } else {
            this.setDataObject({ Sleep: 1 });
            this.sendCtrl({ Sleep: 1 });
          }
          break;
        case 2:
          this.$router.push('/Timer1');
          break;
        default:
          break;
      }
    },
    checkErrors(val) {
      this.isSingleError = false;
      this.errorCode = '';
      this.errorName = '';
      this.carouselOptions.controlAble = true;
      if (val) {
        this.errors.splice(0, this.errors.length);
        this.setErrors();
        if (this.errors && this.errors.length > 0) {
          if ([1, 2, 3, 4, 16, 128].indexOf(val) !== -1) {
            this.isSingleError = true;
            this.errorCode = this.errors[0].code;
            this.errorName = this.errors[0].title;
          }
          this.setErrorList(JSON.parse(JSON.stringify(this.errors)));
          if (this.Estate1 || this.JFerr) {
            this.carouselOptions.controlAble = false;
          }
        }
      }
    },
    consoleSwitch() {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = 0;
      }
      this.count++;
      if (this.count === 5) {
        const vconsoleElement = document.getElementById('__vconsole');
        if (vconsoleElement) {
          if (vconsoleElement.style.display && vconsoleElement.style.display === 'none') {
            vconsoleElement.style.display = 'block';
          } else {
            vconsoleElement.style.display = 'none';
          }
        }
      }
      this.timerId = setTimeout(() => {
        this.count = 0;
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>  
 .intelligence-label2{
       color:#00aeff;
     }
     .intelligence-label3{
       color:#404657;
     }
.main {
  .container {
    .intelligence-label{
      font-size: 98px;
      font-family: 'appleLight';
    }
    }
  .label-unit{
    top: 396px !important;
  }
  .hidden{
    display: none;
  }
}
</style>
<style>
.fog-carousel-holder{
padding-top:0 !important;
margin-top:190px ;
}
.gree-toast{
   width: 4rem;
   height: 1rem;
}
  .gree-toast-content{
    margin-top: 10rem;
    width: 4rem;
    border-radius: 0.4rem;
    position: relative;
    z-index: -1;
  }
  .gree-toast-text{
    margin-left: 0.75rem;
  }
  .custom-notice-bar{
    color:#2f86f6  !important;
    bottom: -0.93rem !important;
    z-index:-1;
  }
  .gree-notice-bar{
    z-index: 0;
  }
  .gree-header-title span{
    font-weight: 100;
  }
</style>
