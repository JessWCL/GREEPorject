<template>
  <gree-view>
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
              <span>故障：{{ item.code }}，{{ item.title }}。</span>
              <a
                href="javascript:;"
                @click="goErrorPage"
              >查看详情</a>
            </gree-marquee-item>
          </gree-marquee>
        </gree-notice-bar>
      </div>
      <div 
        class="main"
        v-show="Pow"
      >
        <div
          class="container"
          :class="{hidden: !Pow}">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide 
              v-for="(item, index) in fogLevelList" 
              :key="index"
              :class="{'intelligence-label': item === '智能档'}">
              {{ item }}
            </swiper-slide>
          </swiper>
        </div>
        <span 
          v-show="Mode !== 1" 
          class="label-unit">{{ $language('home.level') }}</span>
      </div>
      <gree-power-off
        v-model="showPowerOff"
        :style="{ backgroundImage:'url(' + powerOffImg + ')'}"
        :text="$language('home.powerOff')"
      ></gree-power-off>
      <div class="footer">
        <div 
          v-for="(item, index) in footList" 
          :key="index"
          :class="{hidden: (!item.isScenesShow && functype) ||
                     (item.onlyLang && item.onlyLang !== lang),
                   disabled: !Pow && item.Name === 'func.light'}"  
          class="btn"
          @click="setFunction(index)"
        >
          <img 
            class="icon" 
            :src="require('@/assets/images/828502/' + item.ImgName + '.png')" />
          <span class="name">{{ $language(item.Name) }}</span>
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
  Marquee, 
  MarqueeItem,
  NoticeBar,
} from 'gree-ui';

import { closePage, editDevice, changeBarColor, getCCcmd, showToast } from '../../../../static/lib/PluginInterface.promise';
import { judgeStringLength } from '../../utils/index';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

const TITLE_BAR_COLOR = {
  // 开、关机界面状态栏颜色值
  POW_ON: '#2f6c98',
  POW_OFF: '#5c92b5',
};
const ERRORS_MAP = {
  Estate1: {
    16: {
      code: 'F0', 
      headtitle: '故障名称：',
      title: '缺水保护',
      subtitle: '解除办法：',
      text: '请向水箱加水并确认水箱正确放置'
    },
    8: {
      code: 'F1', 
      headtitle: '故障名称：',
      title: '干烧保护',
      subtitle: '解除办法：',
      text: '拔掉电源线，水箱加水后，重新插上电'
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
  Estate3: {
    1: {
      code: 'H1', 
      headtitle: '故障名称：',
      title: 'WIFI通讯故障',
      subtitle: '解除办法：',
      text: '联系售后'
    }
  }
};
function initSlide(mode, fogLevel) {
  if (mode) {
    return 0;
  } else {
    return fogLevel;
  }
}
export default {
  components: {
    swiper,
    swiperSlide,
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [PowerOff.name]: PowerOff,
    [Marquee.name]: Marquee,
    [MarqueeItem.name]: MarqueeItem,
    [NoticeBar.name]: NoticeBar
  },
  data() {
    return {
      showPowerOff: false,
      isPopupShow: {},
      powerOffImg: require('../../assets/images/pow_off_bg.png'),
      fogLevelList: ['智能档', 1, 2, 3], // 雾量可调节范围，
      swiperOption: {
        loop: true,
        centeredSlides: true,
        initialSlide: initSlide(this.$store.state.dataObject.Mode, this.$store.state.dataObject.FogLevel)
      },
      isSingleError: false,
      errorCode: '',
      errorName: '',
      errors: [],
      count: 0,
      timerId: 0,
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
      FogLevel: state => state.dataObject.FogLevel,
      isInit: state => state.isInit,
      WaterTankLight: state => state.dataObject.WaterTankLight,
      Humidity: state => state.dataObject.Humidity,
      Mode: state => state.dataObject.Mode,
      Estate1: state => state.dataObject.Estate1,
      Estate2: state => state.dataObject.Estate2,
      Estate3: state => state.dataObject.Estate3
    }),
    isError() {
      return this.Estate1 + this.Estate2 + this.Estate3;
    },
    footList() {
      return [
        {
          isScenesShow: true,
          onlyLang: '',
          Name: 'home.power',
          ImgName: this.Pow ? 'btn_off' : 'btn_on'
        },
        {
          isScenesShow: true,
          onlyLang: '',
          Name: 'func.light',
          ImgName: this.WaterTankLight ? (this.Pow ? 'light_on' : 'light_off') : 'light_off'
        }
      ];
    },
    functionList() {
      return [
        {
          index: 1,
          name: 'func.light',
          miniIcon: require('../../assets/images/828502/mini_ic_light.png'),
          moreBtn: false,
          ScenesShow: true,
          sign: 'WaterTankLight',
        },
      ];
    },
    iconDisplay() {
      const items = this.functionList.map(item => {
        return this.dataObject[item.sign] && (!this.functype || item.ScenesShow);
      });
      return items;
    },
    fogLevelSwiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  watch: {
    /**
     * @description 获取电源开关信息，更新电源按键UI
     */
    Pow(val) {
      this.showPowerOff = Boolean(!this.Pow);
      this.setBarColor();
      if (val) {
        // 开机默认智能档
        this.setDataObject({Mode: 1, FogLevel: 0});
      }
    },
    FogLevel(val) {
      if (this.Mode) {
        this.setSwiperSlide(0);
        return;
      }
      if (val) {
        this.setSwiperSlide(val);
      }
    },
    Mode(val) {
      if (val === 1) {
        this.setSwiperSlide(0);
      } else {
        this.setSwiperSlide(this.FogLevel);
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
    this.fogLevelSwiper.on('slideChange', () => {
      let slideIndex = this.fogLevelSwiper.realIndex;
      console.log(slideIndex, this.fogLevelSwiper.activeIndex);
      if (slideIndex) {
        const cmd = {FogLevel: slideIndex, Mode: 0};
        this.setDataObject(cmd);
        this.sendCtrl(cmd);
      } else {
        const cmd = {Mode: 1, FogLevel: 0};
        this.setDataObject(cmd);
        this.sendCtrl(cmd);
      }
    });
    this.fogLevelSwiper.on('touchStart touchMove touchEnd', () => {
      this.showTip();
    });
    this.showPowerOff = Boolean(!this.Pow);
    this.setBarColor();
    this.checkErrors(this.isError);
    if (this.Mode) {
      this.setSwiperSlide(0);
    } else {
      this.setSwiperSlide(this.FogLevel);
    }
  },
  destroyed() {
    this.fogLevelSwiper.off('slideChange');
    this.fogLevelSwiper.off('touchStart');
    this.fogLevelSwiper.off('touchMove');
    this.fogLevelSwiper.off('touchEnd');
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setErrorList: 'SET_ERROR_LIST',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
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
      const estates = {
        Estate1: this.Estate1,
        Estate2: this.Estate2,
        Estate3: this.Estate3
      };
      Object.keys(estates).forEach(k => {
        const errorVal = estates[k];
        for (let i = 1; i <= 256; i *= 2) {
          Object.keys(ERRORS_MAP[k]).forEach(err => {
            if ((i & errorVal) === Number(err)) {
              this.errors.push(ERRORS_MAP[k][err]);
            }
          });
        }
      });
    },
    showTip() {
      if (this.isError && (this.Estate1 || this.Estate3)) {
        showToast('故障中，不可调节', 0);
      }
    },
    
    /**
     * @description 点击底部功能列表
     */
    setFunction(val) {
      if (this.isError && (this.Estate1 || this.Estate3)) {
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
          if (this.Pow) {
            const cmd = { WaterTankLight: this.WaterTankLight ? 0 : 1 };
            this.setDataObject(cmd);
            this.sendCtrl(cmd);
          }
          break;
        default:
          break;
      }
    },
    setSwiperSlide(id) {
      if (id !== this.fogLevelSwiper.realIndex) {
        console.log(`slideId, ${id}`);
        this.fogLevelSwiper.slideToLoop(id, 0);
      }
    },
    checkErrors(val) {
      this.isSingleError = false;
      this.errorCode = '';
      this.errorName = '';
      this.fogLevelSwiper.allowTouchMove = true;
      if (val) {
        this.errors.splice(0, this.errors.length);
        this.setErrors();
        if (this.errors && this.errors.length > 0) {
          if ([1, 8, 16, 128].indexOf(val) !== -1) {
            this.isSingleError = true;
            this.errorCode = this.errors[0].code;
            this.errorName = this.errors[0].title;
          }
          this.setErrorList(JSON.parse(JSON.stringify(this.errors)));
          if (this.Estate1 || this.Estate3) {
            this.fogLevelSwiper.allowTouchMove = false;
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
.main {
  .container {
    padding-top: 320px;
    .swiper-slide{
      height: 374px;
      line-height: 374px;
      text-align: center;
      font-family: 'appleUltralight';
      font-size: 388px;
    }
    .intelligence-label{
      font-size: 98px;
      font-family: 'appleLight';
    }
  }
  .label-unit{
    top: 586px !important;
  }
}

</style>
