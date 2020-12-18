<template>
  <gree-view :bg-color="bgColor">
    <gree-page
      no-navbar
      class="page-home"
    >
      <div 
        class="page-header" 
        :style="{backgroundImage:'url(' + modegroundImg + ')'}">
        <gree-header  
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
          :right-options="{showMore: true}"
          @on-click-more="moreInfo"
          v-if="!isScene"
        >
          {{ devname }}
        </gree-header>
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"   
          v-else      
        >
          {{ devname }}
          <div 
            slot="right" 
            class="header-right">
            <a @click="sceneSave"> 
              {{ $language("home.btnSave") }}
            </a> 
          </div>
        </gree-header>
        <div class="bar-top">
          <gree-row>
            <gree-col>
              <img
                :src="require('@/assets/imgs/' + item.ImgName + '.png')"
                :class="{hidden: item.isHidden}"
                v-for="(item, index) in DeviceStatusIcon"
                :key="index"
              >
            </gree-col>
          </gree-row>
        </div>
        <!-- 模式滑轮 -->
        <div
          class="mode-carousel"
        >
          <Carousel
            ref="modeCarousel"
            @currentChange="setMod"
            @touchstart.native="showTip"
            :prop-data="ModeImg"
            :options="ModeOptions"
          />
          <span class="rotate-mode">{{ modeAll[currentMode] }}</span>
        </div>  
      </div> 
      <div class="page-main">
        <div 
          :class="{visibility: Mod === 8}"
          class="temp-carousel"
        >
          <Carousel
            ref="tempCarousel"
            @currentChange="setTemp"
            @touchstart.native="showTip"
            :prop-data="TempDatays"
            :options="TempOptions"
          />
          <img 
            class="temp-u"
            :src="tempU">
        </div>
        <span 
          v-show="Pow & Mod === 8"
          class="mode-text">干衣</span>
        <!-- 风档滑轮 -->
        <div
          class="fan-carousel"
          :class="{
            opacity:Mod ===8
          }"
        >
          <Carousel
            ref="fanCarousel"
            @currentChange="setFan"
            @touchstart.native="showTip"
            :prop-data="WdSpdImg"
            :options="WdSpdOptions"
          />
          <span class="rotate-fan">{{ WdSpdAll[currentWdSpd] }}</span>
        </div>
      </div>
      <!-- 电源关闭 -->
      <gree-power-off
        v-model="showPowerOff"
        :style="{backgroundImage:'url(' + PoweroffImg + ')'}"
        text="已关机"
      ></gree-power-off>
    </gree-page>
    <!-- 底部按钮 -->
    <gree-toolbar
      position="bottom"
      no-hairline
    >
      <gree-row>
        <gree-col
          :class="{hidden: item.showFlag}"
          v-for="(item, index) in footList"
          :key="index"
          @click.native="setFunction(index)"
        >
          <div class="icon">
            <img :src="require('@/assets/imgs/func/' + item.ImgName + '.png')" />
          </div>
          <h3>
            {{ $language(item.Name) }}
            <i
              class="triangle"
              v-if="item.moreBtn"
            ></i>
          </h3>
        </gree-col>
      </gree-row>
    </gree-toolbar>
    <!-- 底部弹出层按钮 -->
    <function-list :is-popup-show="isPopupShow"></function-list>
    <!-- <div v-show="false">{{ StFahFlg }}</div> -->
  </gree-view>
</template>

<script>
import {
  Header,
  Row,
  Col,
  Icon,
  NoticeBar,
  Popup,
  PowerOff,
  ToolBar
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  closePage,
  editDevice,
  showToast,
  getCCcmd,
  changeBarColor
} from '../../../../static/lib/PluginInterface.promise';
import CarouselConfig from '../../mixins/config/carousel';
import btnConfig from '../../mixins/config/6046/btn';
import Carousel from '../../components/Carousel';
import FunctionList from '../../components/6046/FunctionList';

export default {
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [NoticeBar.name]: NoticeBar,
    [Popup.name]: Popup,
    [PowerOff.name]: PowerOff,
    [ToolBar.name]: ToolBar,
    Carousel,
    FunctionList
  },
  mixins: [CarouselConfig, btnConfig],
  data() {
    return {
      showPowerOff: false,
      modegroundImg: '',
      isPopupShow: {},
      tempU: require('@/assets/imgs/c.png'),
      currentMode: '',
      currentWdSpd: '',
      PoweroffImg: ''
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      isScene: state => state.isScene,
      // StFahFlg(state) {
      //   this.tempU = state.dataObject.StFahFlg
      //     ? require('@/assets/imgs/F.png')
      //     : require('@/assets/imgs/c.png');
      //   return state.dataObject.StFahFlg;
      // },
      Mod(state) {
        let color;
        this.PoweroffImg = require('@/assets/imgs/background/blur_cool.png');
        switch (this.valforMode(state.dataObject.Mod)) {
          case 0:
            this.modegroundImg = require('@/assets/imgs/background/bg_cool.png');
            color = '#6BA0E2';
            break;
          case 1:
            this.modegroundImg = require('@/assets/imgs/background/bg_blowing.png');
            color = '#6BA0E2';
            break;
          case 2:
            this.PoweroffImg = require('@/assets/imgs/background/blur_heat.png');
            this.modegroundImg = require('@/assets/imgs/background/bg_heating.png');
            color = '#F9A130';
            break;
          case 3:
            this.PoweroffImg = require('@/assets/imgs/background/blur_heat.png');
            this.modegroundImg = require('@/assets/imgs/background/bg_drying.png');
            color = '#F9A130';
            break;
          default:
            break;
        }
        changeBarColor(color);
        return state.dataObject.Mod;
      },
      Pow(state) {
        this.showPowerOff = Boolean(!state.dataObject.Pow);
        return state.dataObject.Pow;
      },
      WdSpd: state => state.dataObject.WdSpd,
      SetTem: state => state.dataObject.SetTem,
      SvSt: state => state.dataObject.SvSt,
      CoolSvStTemMin: state => state.dataObject.CoolSvStTemMin,
      HeatSvStTemMax: state => state.dataObject.HeatSvStTemMax,
      Quiet: state => state.dataObject.Quiet,
      g_mac: state => state.g_mac,
      SysSta: state => state.dataObject.SysSta
    }),
    /**
     * @description 刘海屏顶部颜色变化
     */

    bgColor: {
      get() {
        let color;
        if (this.Mod === 1 || this.Mod === 3) {
          color = '#6BA0E2';
        } else {
          color = '#F9A130';
        }
        return color;
      }
    }
  },
  watch: {
    Mod(newValue) {
      this.valforMode(newValue);
      this.setCarouselId('modeCarousel', this.currentMode);
    },
    WdSpd(newValue) {
      this.valforWdSpd(newValue, this.Quiet);
      this.setCarouselId('fanCarousel', this.currentWdSpd);
    },
    SetTem(newValue) {
      this.setCarouselId('tempCarousel', newValue - 16);
    },
    Quiet(newValue) {
      this.valforWdSpd(this.WdSpd, newValue);
      this.setCarouselId('fanCarousel', this.currentWdSpd);
    }
  },
  mounted() {
    this.$refs.modeCarousel.redraw();
    this.$refs.fanCarousel.redraw();
    this.setCarouselId('modeCarousel', this.valforMode(this.Mod));
    if (this.Mod === 8) {
      this.setCarouselId('fanCarousel', this.valforWdSpd(5, 0));
      this.WdSpdOptions.Mid = '6046';
      this.WdSpdOptions.controlAble = false;
    } else {
      this.WdSpdOptions.controlAble = true;
      this.setCarouselId(
        'fanCarousel',
        this.valforWdSpd(this.WdSpd, this.Quiet)
      );
    }
    this.setCarouselId('tempCarousel', this.SetTem - 16);
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
      editDevice(this.g_mac);
    },
    /**
     * @description 场景模式的保存
     */
    sceneSave() {
      const keys = Object.keys(this.dataObject);
      const opt = [];
      const p = [];
      console.log(this.remarks);
      const remarks = '...';
      for (let i = 0, j = keys.length; i < j; i += 1) {
        opt.push(keys[i]);
        if (keys[i] === 'SvSt') {
          p.push(0);
        } else {
          p.push(this.dataObject[keys[i]]);
        }
      }
      const json = JSON.stringify({ opt, p, t: 'cmd', sub: this.g_mac });
      console.log('保存的数据: ', json);
      getCCcmd(this.mac, json, remarks, JSON.stringify(p));
    },
    /**
     * @description 滑轮不可滑动时弹出提示
     */
    showTip() {},
    togglePow() {},
    setMod(val) {
      if (this.modeVal[val].value === 8) {
        this.sendCtrl({
          Mod: this.modeVal[val].value,
          SetTem: this.SetTem,
          WdSpd: 5,
          Quiet: 0
        });
        this.setDataObject({
          Mod: this.modeVal[val].value,
          SetTem: this.SetTem,
          WdSpd: 5,
          Quiet: 0
        });
      } else {
        this.sendCtrl({
          Mod: this.modeVal[val].value,
          SetTem: this.SetTem
        });
        this.setDataObject({
          Mod: this.modeVal[val].value,
          SetTem: this.SetTem
        });
      }
      if (val === 3) {
        // 干衣模式固定高风
        this.setDataObject({ WdSpd: 5 });
        this.sendCtrl({ WdSpd: 5 });
        this.WdSpdOptions.Mid = '6046';
        this.WdSpdOptions.controlAble = false;
      } else {
        this.WdSpdOptions.controlAble = true;
      }
    },
    setFan(val) {
      this.sendCtrl({
        WdSpd: this.WdSpdAllValue[val].value,
        Quiet: this.WdSpdAllValue[val].Quiet
      });
      this.setDataObject({
        WdSpd: this.WdSpdAllValue[val].value,
        Quiet: this.WdSpdAllValue[val].Quiet
      });
    },
    setTemp(val) {
      let falTemp = val + 16;
      if (this.SvSt) {
        if (this.Mod === 1 && val + 16 < this.CoolSvStTemMin) {
          this.setCarouselId('tempCarousel', this.CoolSvStTemMin - 16);
          falTemp = this.CoolSvStTemMin;
          showToast(this.$language('se.SvStTemTips'), 0);
        } else if (this.Mod === 4 && val + 16 > this.HeatSvStTemMax) {
          this.setCarouselId('tempCarousel', this.HeatSvStTemMax - 16);
          falTemp = this.HeatSvStTemMax;
          showToast(this.$language('se.SvStTemTips'), 0);
        } else {
          falTemp = val + 16;
        }
      }
      this.sendCtrl({ SetTem: falTemp });
      this.setDataObject({ SetTem: falTemp });
      this.setDataObject({ SetDeciTem: falTemp * 10 });
    },
    setFunction(index) {
      const SysStaList = this.SysSta.toString(2).split('');
      switch (index) {
        case 0:
          if (
            (SysStaList.length > 1) &
            (SysStaList[SysStaList.length - 2] === '1')
          ) {
            this.Pow ? this.sendCtrl({ Pow: 0 }) : this.sendCtrl({ Pow: 1 });
            this.Pow
              ? this.setDataObject({ Pow: 0 })
              : this.setDataObject({ Pow: 1 });
          } else if (!this.Pow) {
            // 开启外出不能开机
            showToast(this.$language('home.nopow'), 0);
          } else {
            this.sendCtrl({ Pow: 0 });
            this.setDataObject({ Pow: 0 });
          }
          break;
        case 1:
          this.$set(this.isPopupShow, 'bottom', true);
          break;
        default:
          break;
      }
    },
    valforMode(val) {
      let indexVal;
      this.modeVal.forEach((item, index) => {
        if (val === item.value) {
          indexVal = index;
          this.currentMode = index;
        }
      });
      return indexVal;
    },
    valforWdSpd(val, Quiet) {
      let indexVal;
      this.WdSpdAllValue.forEach((item, index) => {
        if (val === item.value && Quiet === item.Quiet) {
          indexVal = index;
          this.currentWdSpd = index;
        }
      });
      return indexVal;
    },
    setCarouselId(name, id) {
      this.$refs[name].setId(id);
      console.log(name, id);
    }
  }
};
</script>
