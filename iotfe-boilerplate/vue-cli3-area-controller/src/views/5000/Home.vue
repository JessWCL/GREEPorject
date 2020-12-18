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
            {{ $language("home.btnSave") }}</a>  
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
          <modCarousel
            ref="modeCarousel"
            @currentChange="setMod"
            @touchstart.native="showTip"
            :prop-data="getModRange()"
            :options="ModeOptions"
          />
          <span class="rotate-mode">{{ getModName().name }}</span>
        </div>  
      </div> 
      <div class="page-main">
        <!-- 风档滑轮 -->
        <div
          class="fan-carousel"
        >
          <Carousel
            ref="fanCarousel"
            @currentChange="setFan"
            @touchstart.native="showTip"
            :prop-data="WdSpdImg"
            :options="WdSpdOptions"
          />
          <span class="rotate-fan">{{ Quier ? WdSpdAll[7] : WdSpdAll[WdSpd] }}</span>
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
  changeBarColor
} from '../../../../static/lib/PluginInterface.promise';
import CarouselConfig from '../../mixins/config/carousel';
import btnConfig from '../../mixins/config/5000/btn';
import Carousel from '../../components/Carousel';
import modCarousel from '../../components/modCarousel';
import FunctionList from '../../components/5000/FunctionList';

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
    modCarousel,
    FunctionList
  },
  mixins: [CarouselConfig, btnConfig],
  data() {
    return {
      showPowerOff: false,
      modegroundImg: '',
      isPopupShow: {},
      PoweroffImg: ''
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      isScene: state => state.isScene,
      gmac: state => state.gmac,
      mac: state => state.mac,
      isInit: state => state.isInit,
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
      WdSpd: state => state.dataObject.WdSpd,
      ColdMod: state => state.dataObject.ColdMod,
      IndoorType: state => state.dataObject.IndoorType,
      OMod: state => state.dataObject.OMod,
      LowDeHumi: state => state.dataObject.LowDeHumi,
      Quier: state => state.dataObject.Quier
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
    WdSpd() {
      this.setCarouselId('fanCarousel', this.WdSpd);
    },
    Quier(newVal) {
      if (newVal) {
        this.setCarouselId('fanCarousel', 7);
      } else {
        this.setCarouselId('fanCarousel', this.WdSpd);
      }
    }
  },
  mounted() {
    // this.$refs.modeCarousel.redraw();
    // console.log(this.$refs.modeCarousel);
    // this.$refs.fanCarousel.redraw();
    console.log('this.getModeIndex()', this.getModeIndex());
    this.$nextTick(() => {
      this.setCarouselId('modeCarousel', this.getModeIndex());
      if (this.Quier) {
        this.setCarouselId('fanCarousel', 7);
      } else {
        this.setCarouselId('fanCarousel', this.WdSpd);
      }
      if (this.Mod === 3) {
        this.sendCtrl({ WdSpd: 1 });
        this.setDataObject({ WdSpd: 1 });
      }
    });
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
      // const keys = Object.keys(this.dataObject);
      const keys = [
        'Pow',
        'Mod',
        'StTem',
        'WdSpd',
        'Dry',
        'EnSvSt',
        'StFahFlg',
        'ColdMod',
        'HeatSvStTemMax',
        'CoolSvStTemMin',
        'Dred',
        'AppTimer',
        'TemUnit',
        'IndoorType',
        'OMod',
        'LowDeHumi',
        'Quier',
        'RmType',
        'RmNum',
        'VavleAllOn',
        'CSvStTemMinFlg',
        'HSvStTemMaxFlg'
      ];
      const opt = [];
      const p = [];
      const remarks = `${this.getModName().name}...`;
      for (let i = 0, j = keys.length; i < j; i += 1) {
        opt.push(keys[i]);
        p.push(this.dataObject[keys[i]]);
      }
      const json = JSON.stringify({ opt, p, t: 'cmd', sub: this.gmac });
      console.log('保存的数据: ', json);
      console.log(remarks);
      getCCcmd(this.gmac, json, remarks, JSON.stringify(p));
    },
    /**
     * @description 滑轮不可滑动时弹出提示
     */
    showTip() {},
    togglePow() {},
    setMod(val) {
      // if (this.ColdMod) {
      //   this.setDataObject({ Mod: this.modeCoolAll[val].val });
      //   this.sendCtrl({ Mod: this.modeCoolAll[val].val });
      // } else {
      //   this.setDataObject({ Mod: this.modeAll[val].val });
      //   this.sendCtrl({ Mod: this.modeAll[val].val });
      // }
      // if (this.Mod === 3) {
      //   this.setDataObject({ WdSpd: 1 });
      //   this.sendCtrl({ WdSpd: 1 });
      //   this.WdSpdOptions.controlAble = false;
      // } else {
      //   this.WdSpdOptions.controlAble = true;
      // }
      if ((this.IndoorType === 1) & (this.ColdMod === 1)) {
        this.sendCtrl({ Mod: this.modeCoolAll[val].val });
        this.setDataObject({ Mod: this.modeCoolAll[val].val });
      } else if ((this.IndoorType === 2) & (this.ColdMod === 1)) {
        this.sendCtrl({ Mod: this.modeCoolAll[val].val });
        this.setDataObject({ Mod: this.modeCoolAll[val].val });
      } else if ((this.IndoorType === 2) & (this.ColdMod === 2)) {
        this.sendCtrl({ Mod: this.modeHeatAll[val].val });
        this.setDataObject({ Mod: this.modeHeatAll[val].val });
      } else if ((this.IndoorType === 2) & (this.ColdMod === 4)) {
        this.sendCtrl({ Mod: this.ModeFanImg[val].val });
        this.setDataObject({ Mod: this.ModeFanImg[val].val });
      } else {
        this.sendCtrl({ Mod: this.modeAll[val].val });
        this.setDataObject({ Mod: this.modeAll[val].val });
      }
      if (this.Mod === 3) {
        this.sendCtrl({ WdSpd: 1 });
        this.setDataObject({ WdSpd: 1 });
        // this.WdSpdOptions.controlAble = false;
      } else {
        // this.WdSpdOptions.controlAble = true;
      }
    },
    setFan(val) {
      console.log(`${val}aaaaaa`);
      console.log(this);
      if ((this.Mod === 4) & (val === 7)) {
        this.setDataObject({ WdSpd: this.WdSpd });
        this.setCarouselId('fanCarousel', this.WdSpd);
        showToast(this.$language('home.fan_quiet'), 1);
      } else if (this.Mod === 3) {
        this.sendCtrl({ WdSpd: 1, Quier: 0 });
        this.setDataObject({ WdSpd: 1, Quier: 0 });
        this.setCarouselId('fanCarousel', 1);
        showToast(this.$language('home.dry_low'), 1);
      } else if ((this.Mod === 4 || this.Mod === 5) & (val === 6)) {
        this.sendCtrl({ WdSpd: this.WdSpd, Quier: 0 });
        this.setDataObject({ WdSpd: this.WdSpd, Quier: 0 });
        this.setCarouselId('fanCarousel', this.WdSpd);
        showToast(this.$language('home.cool_heat_tro'), 1);
      } else if (val === 7) {
        this.sendCtrl({ Quier: 1 });
        this.setDataObject({ Quier: 1 });
      } else {
        this.sendCtrl({ WdSpd: val, Quier: 0 });
        this.setDataObject({ WdSpd: val, Quier: 0 });
      }
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
          this.Pow ? this.$set(this.isPopupShow, 'bottom', true) : '';
          break;
        default:
          break;
      }
    },
    // 根据返回模式值判断位于第几个
    getModeIndex() {
      let currentModeIndex;
      // if (this.ColdMod) {
      //   this.modeCoolAll.forEach((item, index) => {
      //     if (item.val === this.Mod) {
      //       console.log(this.Mod);
      //       currentModeIndex = index;
      //     }
      //   });
      // } else {
      //   this.modeAll.forEach((item, index) => {
      //     if (item.val === this.Mod) {
      //       currentModeIndex = index;
      //     }
      //   });
      // }
      if ((this.IndoorType === 1) & (this.ColdMod === 1)) {
        this.modeCoolAll.forEach((item, index) => {
          if (item.val === this.Mod) {
            console.log(this.Mod);
            currentModeIndex = index;
          }
        });
      } else if ((this.IndoorType === 2) & (this.ColdMod === 1)) {
        this.modeCoolAll.forEach((item, index) => {
          if (item.val === this.Mod) {
            console.log(this.Mod);
            currentModeIndex = index;
          }
        });
      } else if ((this.IndoorType === 2) & (this.ColdMod === 2)) {
        this.modeHeatAll.forEach((item, index) => {
          if (item.val === this.Mod) {
            console.log(this.Mod);
            currentModeIndex = index;
          }
        });
      } else if ((this.IndoorType === 2) & (this.ColdMod === 4)) {
        currentModeIndex = 0;
      } else {
        this.modeAll.forEach((item, index) => {
          if (item.val === this.Mod) {
            console.log(this.Mod);
            currentModeIndex = index;
          }
        });
      }
      return currentModeIndex;
    },
    setCarouselId(name, id) {
      this.$refs[name].setId(id);
      console.log(name, id);
    },
    // 判断当前模式范围
    getModRange() {
      let currentAllModImg;
      if ((this.IndoorType === 1) & (this.ColdMod === 1)) {
        currentAllModImg = this.ModeCoolImg;
      } else if ((this.IndoorType === 2) & (this.ColdMod === 1)) {
        currentAllModImg = this.ModeCoolImg;
      } else if ((this.IndoorType === 2) & (this.ColdMod === 2)) {
        currentAllModImg = this.ModeHeatImg;
      } else if ((this.IndoorType === 2) & (this.ColdMod === 4)) {
        currentAllModImg = this.ModeFanImg;
        this.ModeOptions.controlAble = false;
      } else {
        currentAllModImg = this.ModeImg;
      }
      return currentAllModImg;
    },
    // 取当前模式名称
    getModName() {
      let currentModeName;
      if ((this.IndoorType === 1) & (this.ColdMod === 1)) {
        currentModeName = this.modeCoolAll[this.getModeIndex()];
      } else if ((this.IndoorType === 2) & (this.ColdMod === 1)) {
        currentModeName = this.modeCoolAll[this.getModeIndex()];
      } else if ((this.IndoorType === 2) & (this.ColdMod === 2)) {
        currentModeName = this.modeHeatAll[this.getModeIndex()];
      } else if ((this.IndoorType === 2) & (this.ColdMod === 4)) {
        currentModeName = this.modeFanAll[this.getModeIndex()];
      } else {
        currentModeName = this.modeAll[this.getModeIndex()];
      }
      return currentModeName;
    }
  }
};
</script>
