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
        <!-- 模式滑轮场景（不包含外出） -->
        <div 
          v-if="isScene"
          class="mode-carousel"
        >
          <Carousel
            ref="modeCarousel"
            @currentChange="setMod"
            @touchstart.native="showTip"
            :prop-data="ModeForBedImgScene"
            :options="ModeOptionsForBed"
          />
          <span class="rotate-mode">{{ modeForBedAll[currentMode] }}</span>
        </div>  
        <!-- 模式滑轮 -->
        <div 
          v-else
          class="mode-carousel"
        >
          <Carousel
            ref="modeCarousel"
            @currentChange="setMod"
            @touchstart.native="showTip"
            :prop-data="ModeForBedImg"
            :options="ModeOptionsForBed"
          />
          <span class="rotate-mode">{{ modeForBedAll[currentMode] }}</span>
        </div> 
      </div> 
      <div class="page-main">
        <div 
          :class="{visibility: Mod === 10 || Mod === 9 || Mod === 11}"
          class="temp-carousel"
        >
          <Carousel
            ref="tempCarousel"
            @currentChange="setTemp"
            @touchstart.native="showTip"
            :prop-data="TempData"
            :options="TempOptions"
          />
          <img 
            class="temp-u" 
            :src="tempU">
        </div>
        <span 
          v-show="Mod === 10"
          class="mode-text">自动除湿</span>
        <span 
          v-show="Mod === 11"
          class="mode-text">外出</span>
        <!-- 清爽模式滑轮（温度与湿度） -->
        <div 
          class="refresh-carousel" 
          :class="{visibility:Mod !== 9}">
          <Carousel2
            ref="tempCarouselLeft"
            @currentChange="setTemp"
            @touchstart.native="showTip"
            :prop-data="TempData"
            :options="TempOptionsqs"
          />
          <img 
            class="temp-left" 
            :src="tempU">
          <img 
            class="temp-p" 
            :src="tempP">
          <Carousel2
            ref="HumidityCarousel"
            @currentChange="setHumidity"
            @touchstart.native="showTip"
            :prop-data="HumidityData"
            :options="HumidityOption"
          />
          <img 
            class="dehum-right" 
            :src="dehumU">
        </div>
        <!-- 风档滑轮 -->
        <div
          class="fan-carousel"
          :class="{
            opacity:Mod ===10 ||Mod ===11
          }"
        >
          <Carousel 
            ref="fanCarousel"
            @currentChange="setFan"
            @touchstart.native="showTip"
            :prop-data="WdSpdForBedImg"
            :options="WdSpdForBedOptions"
          />
          <span class="rotate-fan">{{ WdSpdForBedAll[currentWdSpd] }}</span>
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
    <div v-show="false">{{ Pow }}</div>
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
import btnConfig from '../../mixins/config/6045/btn';
import Carousel from '../../components/Carousel';
import Carousel2 from '../../components/Carousel2';
import FunctionList from '../../components/6045/FunctionList';

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
    Carousel2,
    FunctionList
  },
  mixins: [CarouselConfig, btnConfig],
  data() {
    return {
      showPowerOff: false,
      modegroundImg: '',
      isPopupShow: {},
      tempU: require('@/assets/imgs/c.png'),
      tempP: require('@/assets/imgs/fan/ic_fresh_cut-off.png'),
      dehumU: require('@/assets/imgs/D.png'),
      currentMode: '',
      currentWdSpd: '',
      PoweroffImg: '',
      currentTempIndex: ''
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      isScene: state => state.isScene,
      Mod(state) {
        let color;
        this.PoweroffImg = require('@/assets/imgs/background/blur_cool.png');
        if (state.dataObject.Mod === 10 || state.dataObject.Mod === 11) {
          this.WdSpdForBedOptions.controlAble = false;
        } else {
          this.WdSpdForBedOptions.controlAble = true;
        }
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
            this.modegroundImg = require('@/assets/imgs/background/bg_heating.png');
            this.PoweroffImg = require('@/assets/imgs/background/blur_heat.png');
            color = '#F9A130';
            break;
          case 3:
            this.modegroundImg = require('@/assets/imgs/background/bg_fresh.png');
            color = '#2AC4E2';
            break;
          case 4:
            this.modegroundImg = require('@/assets/imgs/background/bg_automatic-dehunmidification.png');
            color = '#6BA0E2';
            break;
          case 5:
            this.modegroundImg = require('@/assets/imgs/background/bg_go-out.png');
            color = '#3A88FF';
            break;
          default:
            break;
        }
        changeBarColor(color);
        return state.dataObject.Mod;
      },
      Pow(state) {
        this.showPowerOff = Boolean(!state.dataObject.Pow);
        // if (this.showPowerOff) {
        //   changeBarColor('#0C5CB7');
        // }
        return state.dataObject.Pow;
      },
      WdSpd: state => state.dataObject.WdSpd,
      SetTem: state => state.dataObject.SetTem,
      SvSt: state => state.dataObject.SvSt,
      Quiet: state => state.dataObject.Quiet,
      CoolSvStTemMin: state => state.dataObject.CoolSvStTemMin,
      HeatSvStTemMax: state => state.dataObject.HeatSvStTemMax,
      SetCoolHumi: state => state.dataObject.SetCoolHumi,
      SetDeciTem: state => state.dataObject.SetDeciTem,
      dataObject: state => state.dataObject,
      g_mac: state => state.g_mac,
      MasSub: state => state.dataObject.MasSub
    }),
    /**
     * @description 刘海屏顶部颜色变化
     */

    bgColor: {
      get() {
        let color;
        if (this.Mod === 1 || this.Mod === 3 || this.Mod === 10) {
          color = '#6BA0E2';
        } else if (this.Mod === 9) {
          color = '#2BC9DE';
        } else if (this.Mod === 11) {
          console.log();
          color = '#3B8AFF';
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
    SetDeciTem(newValue) {
      if (newValue % 2) {
        this.currentTempIndex =
          (Number(`${newValue}`.slice(0, 2)) - 16) * 2 + 1;
      } else {
        this.currentTempIndex = (Number(`${newValue}`.slice(0, 2)) - 16) * 2;
      }
      this.TempOptions.Has05 = !!newValue % 2;
      this.TempOptionsqs.Has05 = !!newValue % 2;
      this.setCarouselId('tempCarousel', this.currentTempIndex);
      this.setCarouselId('tempCarouselLeft', this.currentTempIndex);
    },
    SetCoolHumi(newValue) {
      this.setCarouselId('HumidityCarousel', (newValue - 45) / 5);
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
    this.setCarouselId('fanCarousel', this.valforWdSpd(this.WdSpd, this.Quiet));
    if (this.SetDeciTem % 2) {
      this.currentTempIndex =
        (Number(`${this.SetDeciTem}`.slice(0, 2)) - 16) * 2 + 1;
      this.TempOptions.Has05 = true;
      this.TempOptionsqs.Has05 = true;
    } else {
      this.currentTempIndex =
        (Number(`${this.SetDeciTem}`.slice(0, 2)) - 16) * 2;
    }
    this.setCarouselId('tempCarousel', this.currentTempIndex);
    this.setCarouselId('tempCarouselLeft', this.currentTempIndex);
    this.setCarouselId('HumidityCarousel', (this.SetCoolHumi - 45) / 5);
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
      // const keys = Object.keys(this.dataObject);
      const keys = [
        'Pow',
        'Mod',
        'SetTem',
        'WdSpd',
        'Quiet',
        'Blo',
        'SvSt',
        'Air',
        'CoolSvStTemMin',
        'HeatSvStTemMax',
        'SetCoolHumi',
        'SwhSlp',
        'AidHeat',
        'SetDeciTem',
        'GetEr',
        'MasSub',
        'SysSta'
      ];
      const opt = [];
      const p = [];
      const remarks = '...';
      for (let i = 0, j = keys.length; i < j; i += 1) {
        opt.push(keys[i]);
        if (keys[i] === 'SvSt') {
          p.push(0);
        } else if (keys[i] === 'SetTem') {
          p.push(Math.round(this.dataObject[keys[i]]));
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
      if ((this.modeForBedVal[val].value === 11) & this.MasSub) {
        this.sendCtrl({
          Mod: this.modeForBedVal[val].value,
          SetDeciTem: this.SetDeciTem,
          SwhSlp: 0,
          WdSpd: 0,
          Quiet: 0
        });
        this.setDataObject({
          Mod: this.modeForBedVal[val].value,
          SetDeciTem: this.SetDeciTem,
          SwhSlp: 0,
          WdSpd: 0,
          Quiet: 0
        });
      } else if ((this.modeForBedVal[val].value === 11) & !this.MasSub) {
        this.setCarouselId('modeCarousel', this.valforMode(this.Mod));
        showToast(this.$language('home.rules'), 0);
      } else if (this.modeForBedVal[val].value === 10) {
        this.sendCtrl({
          Mod: this.modeForBedVal[val].value,
          SetDeciTem: this.SetDeciTem,
          SwhSlp: 0,
          WdSpd: 1,
          Quiet: 0
        });
        this.setDataObject({
          Mod: this.modeForBedVal[val].value,
          SetDeciTem: this.SetDeciTem,
          SwhSlp: 0,
          WdSpd: 1,
          Quiet: 0
        });
      } else {
        this.sendCtrl({
          Mod: this.modeForBedVal[val].value,
          SetDeciTem: this.SetDeciTem,
          SwhSlp: 0
        });
        this.setDataObject({
          Mod: this.modeForBedVal[val].value,
          SetDeciTem: this.SetDeciTem,
          SwhSlp: 0
        });
      }
    },
    setFan(val) {
      if (this.WdSpdAllForBedValue[val].Quiet === -1) {
        this.sendCtrl({
          WdSpd: this.WdSpdAllForBedValue[val].value
        });
        this.setDataObject({
          WdSpd: this.WdSpdAllForBedValue[val].value
        });
      } else {
        this.sendCtrl({
          WdSpd: this.WdSpdAllForBedValue[val].value,
          Quiet: this.WdSpdAllForBedValue[val].Quiet
        });
        this.setDataObject({
          WdSpd: this.WdSpdAllForBedValue[val].value,
          Quiet: this.WdSpdAllForBedValue[val].Quiet
        });
      }
    },
    setTemp(val) {
      const Has05Val = val % 2 ? 1 : 0;
      let falTemp = this.TempData[val] * 10 + Has05Val * 5;
      const hopeTempVal = falTemp;
      if (this.SvSt) {
        if (this.Mod === 1 && hopeTempVal < this.CoolSvStTemMin * 10) {
          this.setCarouselId('tempCarousel', (this.CoolSvStTemMin - 16) * 2);
          falTemp = this.CoolSvStTemMin * 10;
          showToast(this.$language('se.SvStTemTips'), 0);
        } else if (this.Mod === 4 && hopeTempVal > this.HeatSvStTemMax * 10) {
          this.setCarouselId('tempCarousel', (this.HeatSvStTemMax - 16) * 2);
          falTemp = this.HeatSvStTemMax * 10;
          showToast(this.$language('se.SvStTemTips'), 0);
        } else {
          falTemp = this.TempData[val] * 10 + Has05Val * 5;
        }
      }
      this.sendCtrl({ SetDeciTem: falTemp });
      this.setDataObject({ SetDeciTem: falTemp });
      this.setDataObject({ SetTem: falTemp / 10 });
    },
    setHumidity(val) {
      this.sendCtrl({ SetCoolHumi: val * 5 + 45 });
      this.setDataObject({ SetCoolHumi: val * 5 + 45 });
    },
    setFunction(index) {
      switch (index) {
        case 0:
          this.Pow ? this.sendCtrl({ Pow: 0 }) : this.sendCtrl({ Pow: 1 });
          this.Pow
            ? this.setDataObject({ Pow: 0 })
            : this.setDataObject({ Pow: 1 });
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
      this.modeForBedVal.forEach((item, index) => {
        if (val === item.value) {
          indexVal = index;
          this.currentMode = index;
        }
      });
      return indexVal;
    },
    valforWdSpd(val, Quiet) {
      let indexVal;
      this.WdSpdAllForBedValue.forEach((item, index) => {
        if (
          (val === item.value && Quiet === item.Quiet) ||
          (val === item.value && item.Quiet === -1)
        ) {
          indexVal = index;
          this.currentWdSpd = index;
        } else if (item.value === -1 && Quiet === item.Quiet) {
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
