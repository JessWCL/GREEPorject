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
          {{ AllName }}
        </gree-header>
        <div v-show="false">{{ RmType }}</div>
        <!-- <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"   
          v-else      
        >
          {{ AllName }}
          <div 
            slot="right" 
            class="header-right">
            <a @click="sceneSave">
              {{ $language("home.btnSave") }}
            </a>  
          </div>
        </gree-header> -->
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
          <CarouselChildren
            keep-alive
            ref="modeCarousel"
            @currentChange="setMod"
            @touchstart.native="showTip"
            :prop-data="ModeImg"
            :options="ModeOptionsChildren"
          />
          <span class="rotate-mode">{{ HeatCoolType? modeCoolAll[getModeIndex()].name : modeAll[getModeIndex()].name }}</span>
        </div>  
      </div> 
      <div class="page-main">
        <!-- 温度滑轮 -->
        <div
          class="temp-carousel"
        >
          <Carousel
            v-if="!TemUnit"
            keep-alive
            ref="tempCarousel"
            @currentChange="setTemp"
            @touchstart.native="showTip"
            :prop-data="(OMod ===1 || LowDeHumi === 1) ? TempData812:TempData"
            :options="TempOptions"
          />
          <Carousel
            v-else
            keep-alive
            ref="tempCarousel"
            @currentChange="setTemp"
            @touchstart.native="showTip"
            :prop-data="(OMod ===1 || LowDeHumi === 1) ? TempData812F:TempDataF"
            :options="TempOptions"
          />
          <img 
            @click="changeCF()"
            class="temp-u" 
            :src="tempU">
        </div>
      </div>
      <!-- 电源关闭 -->
      <gree-power-off
        v-model="showPowerOff"
        :text="$language('home.powerOff')"
        :style="{backgroundImage:'url('+ PoweroffImg +')'}"
      ></gree-power-off>
    </gree-page>
    <!-- 底部按钮 -->
    <gree-toolbar
      position="bottom"
      no-hairline
    >
      <gree-row>
        <gree-col
          :class="{hidden: item.hidden}"
          v-for="(item, index) in footListChildren"
          :key="index"
          @click.native="setFunction(index)"
        >
          <div class="icon">
            <img :src="require(`@/assets/imgs/func/${item.ImgName}.png`)" />
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
    <div v-show="false">{{ TemUnit }} {{ Pow }}</div>
    <div 
      class="mask" 
      v-show="!isInit">
      <img 
        src="../../assets/imgs/loading.gif" 
        class="loading">
    </div>
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
  changeBarColor,
  timerListDevice
} from '../../../../static/lib/PluginInterface.promise';
import CarouselConfig from '../../mixins/config/carousel';
import btnConfig from '../../mixins/config/5001/btn';
import CarouselChildren from '../../components/CarouselChildren';
import Carousel from '../../components/Carousel';
import FunctionList from '../../components/5001/FunctionList';

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
    CarouselChildren,
    FunctionList
  },
  mixins: [CarouselConfig, btnConfig],
  data() {
    return {
      showPowerOff: false,
      modegroundImg: '',
      isPopupShow: {},
      tempU: '',
      PoweroffImg: '',
      AllName: '',
      FFlag: true // 华氏度，低于节能标准 不发命令标识
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      RmType(state) {
        if (state.dataObject.RmType === 0) {
          this.AllName =
            this.RmTypeList[0] +
            state.gmac.split('')[state.gmac.split('').length - 1];
        } else {
          this.AllName =
            this.RmTypeList[state.dataObject.RmType] +
            (state.dataObject.RmNum + 1);
        }
        return state.dataObject.RmType;
      },
      RmNum: state => state.dataObject.RmNum,
      isScene: state => state.isScene,
      dataObject: state => state.dataObject,
      gmac: state => state.gmac,
      mac: state => state.mac,
      isInit: state => state.isInit,
      TemUnit(state) {
        this.tempU = state.dataObject.TemUnit
          ? require('@/assets/imgs/F.png')
          : require('@/assets/imgs/c.png');
        return state.dataObject.TemUnit;
      },
      Mod(state) {
        // 应该放到watch里的
        let color;
        this.PoweroffImg = require('@/assets/imgs/background/blur_cool.png');
        switch (state.dataObject.Mod) {
          case 1:
            this.modegroundImg = require('@/assets/imgs/background/bg_cool.png');
            color = '#6BA0E2';
            break;
          case 2:
            this.PoweroffImg = require('@/assets/imgs/background/blur_heat.png');
            this.modegroundImg = require('@/assets/imgs/background/bg_heating.png');
            color = '#F9A130';
            break;
          case 3:
            this.modegroundImg = require('@/assets/imgs/background/bg_arefaction.png');
            color = '#6BA0E2';
            break;
          case 4:
            this.modegroundImg = require('@/assets/imgs/background/bg_blowing.png');
            color = '#6BA0E2';
            break;
          case 5:
            this.modegroundImg = require('@/assets/imgs/background/bg_automation.png');
            color = '#6BA0E2';
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
      StTem: state => state.dataObject.StTem,
      HeatCoolType: state => state.dataObject.HeatCoolType,
      CoolSvStTemMin: state => state.dataObject.CoolSvStTemMin,
      HeatSvStTemMax: state => state.dataObject.HeatSvStTemMax,
      EnSvSt: state => state.dataObject.EnSvSt,
      StFahFlg: state => state.dataObject.StFahFlg,
      OMod: state => state.dataObject.OMod,
      LowDeHumi: state => state.dataObject.LowDeHumi,
      VavleAllOn: state => state.dataObject.VavleAllOn,
      CSvStTemMinFlg: state => state.dataObject.CSvStTemMinFlg,
      HSvStTemMaxFlg: state => state.dataObject.HSvStTemMaxFlg
    }),
    /**
     * @description 刘海屏顶部颜色变化
     */

    bgColor: {
      get() {
        let color;
        if (
          this.Mod === 1 ||
          this.Mod === 3 ||
          this.Mod === 4 ||
          this.Mod === 5
        ) {
          color = '#6BA0E2';
        } else {
          color = '#F9A130';
        }
        return color;
      }
    }
  },
  watch: {
    Mod() {
      this.setCarouselId('modeCarousel', this.getModeIndex());
    },
    StTem() {
      if (!this.TemUnit) {
        this.TempOptions.controlAble = true;
        this.setCarouselId('tempCarousel', this.StTem);
      } else {
        this.TempOptions.controlAble = true;
        this.setCarouselId(
          'tempCarousel',
          this.changCFValue(this.StTem + 16) - 61
        );
      }
    },
    TemUnit(newVal) {
      if (this.OMod === 1) {
        this.setCarouselId('tempCarousel', 0);
      } else if (this.LowDeHumi === 1) {
        this.setCarouselId('tempCarousel', 1);
      } else if (newVal) {
        this.TempDataFRec.forEach((item, index) => {
          if ((item.valC === this.StTem + 16) & (item.Rec === this.StFahFlg)) {
            this.setCarouselId('tempCarousel', index);
          }
        });
      } else {
        this.setCarouselId('tempCarousel', this.StTem);
      }
    },
    StFahFlg(newVal) {
      if (this.TemUnit) {
        this.TempDataFRec.forEach((item, index) => {
          if ((item.valC === this.StTem + 16) & (item.Rec === newVal)) {
            this.setCarouselId('tempCarousel', index);
          }
        });
      }
    },
    LowDeHumi(newVal) {
      if (newVal) {
        this.setCarouselId('tempCarousel', 1);
      } else {
        this.TempDataFRec.forEach((item, index) => {
          if ((item.valC === this.StTem + 16) & (item.Rec === newVal)) {
            this.setCarouselId('tempCarousel', index);
          }
        });
      }
    },
    OMod(newVal) {
      if (newVal) {
        this.setCarouselId('tempCarousel', 0);
      } else {
        this.TempDataFRec.forEach((item, index) => {
          if ((item.valC === this.StTem + 16) & (item.Rec === newVal)) {
            this.setCarouselId('tempCarousel', index);
          }
        });
      }
    }
  },
  mounted() {
    // this.$refs.modeCarousel.redraw();
    // this.$refs.tempCarousel.redraw();
    this.setCarouselId('modeCarousel', this.getModeIndex());
    this.TempOptions.controlAble = false;
    if (this.OMod === 1) {
      this.setCarouselId('tempCarousel', 0);
    } else if (this.LowDeHumi === 1) {
      this.setCarouselId('tempCarousel', 1);
    } else {
      this.TempOptions.controlAble = true;
      if (this.TemUnit) {
        this.TempDataFRec.forEach((item, index) => {
          if ((item.valC === this.StTem + 16) & (item.Rec === this.StFahFlg)) {
            this.setCarouselId('tempCarousel', index);
          }
        });
      } else {
        this.setCarouselId('tempCarousel', this.StTem);
      }
    }
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
      editDevice(this.gmac);
    },
    /**
     * @description 场景模式的保存
     */
    sceneSave() {
      const keys = Object.keys(this.dataObject);
      const opt = [];
      const p = [];
      const remarks = '...';
      for (let i = 0, j = keys.length; i < j; i += 1) {
        opt.push(keys[i]);
        p.push(this.dataObject[keys[i]]);
      }
      const json = JSON.stringify({ opt, p, t: 'cmd', sub: this.mac });
      console.log('保存的数据: ', json);
      getCCcmd(this.mac, json, remarks, JSON.stringify(p));
    },
    /**
     * @description 滑轮不可滑动时弹出提示
     */
    showTip() {},
    togglePow() {},
    setMod(val) {
      this.sendCtrl({ Mod: val + 1 });
      this.setDataObject({ Mod: val + 1 });
    },
    setTemp(val) {
      let falTemp;
      let falFFlag;
      if (!this.TemUnit) {
        falTemp = val;
        if (this.EnSvSt) {
          if ((this.Mod === 1 || this.Mod === 3) && val < this.CoolSvStTemMin) {
            this.setCarouselId('tempCarousel', this.CoolSvStTemMin);
            falTemp = this.CoolSvStTemMin;
            showToast(this.$language('se.SvStTemTips'), 0);
          } else if (this.Mod === 2 && val > this.HeatSvStTemMax) {
            this.setCarouselId('tempCarousel', this.HeatSvStTemMax);
            falTemp = this.HeatSvStTemMax;
            showToast(this.$language('se.SvStTemTips'), 0);
          } else {
            falTemp = val;
          }
        }
      } else {
        falTemp = this.changFCValue(val);
        const TempCF = val + 61;
        falFFlag = this.changFFlag(TempCF);
        if (this.EnSvSt) {
          if (
            (this.Mod === 1 || this.Mod === 3) &&
            TempCF < this.changSECFValue(this.CoolSvStTemMin + 16)
          ) {
            this.setCarouselId(
              'tempCarousel',
              this.changCFValueIndex(
                this.changSECFValue(this.CoolSvStTemMin + 16)
              )
            );
            falTemp = this.CoolSvStTemMin;
            this.FFlag = false;
            showToast(this.$language('se.SvStTemTips'), 0);
          } else if (
            this.Mod === 2 &&
            TempCF > this.changSECFValue(this.HeatSvStTemMax + 16)
          ) {
            console.log(
              '!!!',
              TempCF,
              '!!!!',
              this.changSECFValue(this.HeatSvStTemMax + 16)
            );
            this.setCarouselId(
              'tempCarousel',
              this.changCFValueIndex(
                this.changSECFValue(this.HeatSvStTemMax + 16)
              )
            );
            falTemp = this.HeatSvStTemMax;
            this.FFlag = false;
            showToast(this.$language('se.SvStTemTips'), 0);
          } else {
            this.FFlag = true;
            falTemp = this.changFCValue(val);
          }
        }
      }
      console.log(falTemp);
      // const StFahFlgvalue = this.StFahFlg ? 0 : this.StFahFlg;
      // this.sendCtrl({
      //   StTem: falTemp,
      //   TemUnit: this.TemUnit,
      //   StFahFlg: !this.TemUnit ? this.StFahFlg : falFFlag
      // });
      // this.setDataObject({
      //   StTem: falTemp,
      //   TemUnit: this.TemUnit,
      //   StFahFlg: !this.TemUnit ? this.StFahFlg : falFFlag
      // });
      if (!this.TemUnit) {
        this.sendCtrl({
          StTem: falTemp,
          TemUnit: this.TemUnit,
          StFahFlg: 0 // StFahFlg: !this.TemUnit ? this.StFahFlg : falFFlag
        });
        this.setDataObject({
          StTem: falTemp,
          TemUnit: this.TemUnit,
          StFahFlg: 0 // StFahFlg: !this.TemUnit ? this.StFahFlg : falFFlag
        });
      } else {
        if (this.FFlag) {
          this.sendCtrl({
            StTem: falTemp,
            TemUnit: this.TemUnit,
            StFahFlg: falFFlag
          });
          this.setDataObject({
            StTem: falTemp,
            TemUnit: this.TemUnit,
            StFahFlg: falFFlag
          });
        }
      }
    },
    setFunction(index) {
      const macNo = parseInt(
        this.gmac.split('')[this.gmac.split('').length - 1],
        10
      );
      console.log(
        'gmac:',
        this.gmac,
        'macNo:',
        macNo,
        'VavleAllOn:',
        this.VavleAllOn
      );
      switch (index) {
        case 0:
          if (this.Pow & (this.VavleAllOn === macNo)) {
            showToast(this.$language('home.areaAlways'), 0);
          } else {
            this.Pow ? this.sendCtrl({ Pow: 0 }) : this.sendCtrl({ Pow: 1 });
            this.Pow
              ? this.setDataObject({ Pow: 0 })
              : this.setDataObject({ Pow: 1 });
          }
          break;
        case 1:
          this.Pow
            ? this.$set(this.isPopupShow, 'bottom', true)
            : timerListDevice(`${this.gmac}@${this.mac}`);
          break;
        default:
          break;
      }
    },
    changeCF() {
      this.tempU = this.TemUnit
        ? require('@/assets/imgs/F.png')
        : require('@/assets/imgs/c.png');
      this.TemUnit
        ? this.sendCtrl({ TemUnit: 0 })
        : this.sendCtrl({ TemUnit: 1 });
      this.TemUnit
        ? this.setDataObject({ TemUnit: 0 })
        : this.setDataObject({ TemUnit: 1 });
    },
    // 根据返回模式值判断位于第几个
    getModeIndex() {
      let currentModeIndex;
      if (this.HeatCoolType) {
        this.modeCoolAll.forEach((item, index) => {
          if (item.val === this.Mod) {
            console.log(this.Mod);
            currentModeIndex = index;
          }
        });
      } else {
        this.modeAll.forEach((item, index) => {
          if (item.val === this.Mod) {
            currentModeIndex = index;
          }
        });
      }
      return currentModeIndex;
    },
    setCarouselId(name, id) {
      this.$nextTick(() => {
        this.$refs[name].setId(id);
        console.log(name, id);
      });
    },
    changFCValue(val) {
      let tempCValues;
      this.TempDataFRec.forEach(item => {
        if (item.valF === val + 61) {
          tempCValues = item.valC;
        }
      });
      return tempCValues - 16;
    },
    changCFValue(val) {
      let tempFValues;
      this.TempDataFRec.forEach(item => {
        if ((item.valC === val) & (item.Rec === this.StFahFlg)) {
          tempFValues = item.valF;
        }
      });
      return tempFValues;
    },
    changSECFValue(val) {
      let tempFValues;
      let flag;
      if (this.Mod === 1 || this.Mod === 3) {
        flag = this.CSvStTemMinFlg;
      } else if (this.Mod === 2) {
        flag = this.HSvStTemMaxFlg;
      } else {
        flag = this.StFahFlg;
      }
      console.log('!!!!!', flag, '!!!!!!', val);
      this.TempDataFRec.forEach(item => {
        if ((item.valC === val) & (item.Rec === flag)) {
          tempFValues = item.valF;
        }
      });
      return tempFValues;
    },
    changCFValueIndex(val) {
      let tempFIndex;
      this.TempDataFRec.forEach((item, index) => {
        if (item.valF === val) {
          tempFIndex = index;
        }
      });
      return tempFIndex;
    },
    changFFlag(val) {
      let tempFFlag;
      this.TempDataFRec.forEach(item => {
        if (item.valF === val) {
          tempFFlag = item.Rec;
        }
      });
      return tempFFlag;
    }
  }
};
</script>
