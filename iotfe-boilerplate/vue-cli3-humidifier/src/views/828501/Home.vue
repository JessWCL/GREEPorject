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
      </div>
      <div 
        class="main"
        v-show="Pow"
      >
        <div
          class="fog-carousel-holder"
          :class="{hidden: !Pow}">
          <Carousel
            ref="fogCarousel"
            class="fog-carousel-pos"
            @currentChange="setFogLevel"
            :prop-data="fogLevelList"
            :options="carouselOptions"
          />
        </div>
        <span class="label-unit">{{ $language('home.level') }}</span>
      </div>
      <div class="footer">
        <div 
          v-for="(item, index) in footList" 
          :key="index"
          :class="{hidden: (!item.isScenesShow && functype) ||
          (item.onlyLang && item.onlyLang !== lang)}"  
          class="btn"
          @click="setFunction(index)"
        >
          <img class="icon" :src="require('@/assets/images/' + item.ImgName + '.png')" />
          <span class="name">{{ $language(item.Name) }}</span>
        </div>
      </div>
      <gree-power-off
        v-model="showPowerOff"
        :style="{ backgroundImage:'url(' + powerOffImg + ')'}"
      >
        <img
          @touchend="powerOn"
          class="btn-powon" 
          src="../../assets/images/pow_on.png">
      </gree-power-off>
      <!--底部弹出层按钮-->
      <function-list :is-popup-show="isPopupShow"></function-list>
      <div class="mask" v-show="!isInit">
        <img src="../../assets/images/loading.gif" class="loading">
      </div>
    </gree-page>
  </gree-view>  
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { closePage, editDevice, changeBarColor, getCCcmd } from '../../../../static/lib/PluginInterface.promise';
import { judgeStringLength } from '../../utils/index';
import FunctionList from '../../components/FunctionList';
import Carousel from '../../components/Carousel';
import BtnConfig from '../../mixins/config/btn';
import {
  Header,
  Row,
  Col,
  Icon,
  Popup,
  PowerOff,
} from 'gree-ui';

const TITLE_BAR_COLOR = {
  // 开、关机界面状态栏颜色值
  POW_ON: '#2f6c98',
  POW_OFF: '#5c92b5',
};
export default {
  mixins: [BtnConfig],
  components: {
    FunctionList,
    Carousel,
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [PowerOff.name]: PowerOff,
    [Popup.name]: Popup
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
        spaceBetween: '6.8rem', // 间距
        height: '3.9rem', // 图片大小
        fontSize: '3.63rem',
        radiusMutiply: 1.6, // 半径系数
      },
      fogLevelList: [1, 2, 3], // 雾量可调节范围
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
          this.$refs.fogCarousel.setId(fogLevel - 1);
        });
        return fogLevel;
      },
      isInit: state => state.isInit
    }),
    iconDisplay() {
      const items = this.functionList.map(item => {
        return this.dataObject[item.sign] && (!this.functype || item.ScenesShow);
      });
      return items;
    }
  },
  watch: {
    /**
     * @description 获取电源开关信息，更新电源按键UI
     */
    Pow: {
      handler(val) {
        this.showPowerOff = Boolean(!this.Pow);
        this.setBarColor();
        if (val) {
          this.$nextTick(() => {
            console.log('watch pow');
            this.$refs.fogCarousel.redraw();
          });
        }
      },
      immediate: true
    },
    FogLevel(val) {
      console.log('fog:', val);
      this.sendCtrl({FogLevel: val});
    },
    isInit(val) {
      if (val) {
        console.log('init end');
        this.setBarColor();
      }
    }
  },
  mounted() {
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    setFogLevel(val) {
      this.setDataObject({FogLevel: val + 1});
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
    /**
     * @description 点击底部功能列表
     */
    setFunction(val) {
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
          this.selAdvanced = true;
          this.$set(this.isPopupShow, 'bottom', true);
          break;
        default:
          break;
      }
    }
  }
};
</script>
