<template>
  <gree-view bg-color="#0abfec">
    <gree-page
      no-navbar
      class="page-home"
    >
      <div 
        class="page-header" 
        :class="{estate: isError}">
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
          :right-options="{showMore: editEnable}"
          @on-click-more="moreInfo"
          v-show="!functype"
        >{{ devName }}
        </gree-header>
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
          v-show="functype"
        >
          {{ devName }}
          <div 
            slot="right" 
            class="header-right">
            <a @click="sceneSave">{{ $language("home.btnSave") }}</a>
          </div>
        </gree-header>
        <img
          :src="HeaderImg"
          class="header-bg"
          :class="{estate: isError}"
        />
        <!-- 功能开启显示栏 -->
        <ul 
          v-show="!functype" 
          class="mini-icon-bar">
          <li 
            v-for="(item, index) in functionList" 
            :key="index">
            <img 
              v-show="item.showMiniIcon" 
              :src="item.miniIconUrl" 
              class="icon">
            <span v-show="item.name === '定时' && dataObject.TmrOn">{{ timerLabel }}</span>
          </li>
        </ul>
        <!-- 模式滑轮 -->
        <div
          class="mod-carousel-holder"
          :class="{hidden: !Pow, estate: isError}"
        >
          <div
            class="mod-carousel-pos"
          >
            <Carousel
              ref="modeCarousel"
              @touchstart.native="showTip"
              @currentChange="setMode"
              :prop-data="modeImgs"
              :options="modeOptions"
            />
            <span class="mod-text">{{ modeName }}</span>
          </div>
        </div>
        <!-- 故障栏（场景模式不显示） -->
        <gree-notice-bar 
          v-show="isError" 
          :class="[Pow ? '':'PowOff']">
          <span 
            v-show="isSingleError" 
            class="notice-item">
            <img src="@/assets/img/fault_s.png"/>
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
                src="@/assets/img/fault_s.png"
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
      <div class="page-main">
        <!-- 风挡滑轮 -->
        <div
          class="speed-carousel-holder"
          :class="{hidden: !Pow}"
        >
          <div 
            class="tem-carousel-pos" 
            :class="{estate: isError}"
            :style="{display: !Pow ? 'none' : 'block'}">
            <Carousel
              ref="speedCarousel"
              @touchstart.native="showTip"
              @currentChange="setSpeed"
              @onDrag="setCarouselDragState"
              @onTouchend="checkCarouselState"
              :prop-data="speedData"
              :options="speedOptions"
            ></Carousel>
            <!-- <div 
              class="auto-speed-label"
              v-show="!showWdSpdCarousel">自动</div> -->
            <span 
              class="speed-unit"
              :style="{color: carouselDragState ? '#0abfec' : ''}" 
            >{{ $language('home.speed_unit') }}</span>
          </div>
        </div>
      </div>
      <!-- 电源关闭 -->
      <gree-power-off
        v-model="showPowerOff"
        :style="{backgroundImage:'url(' + PoweroffImg + ')'}"
        :text="$language('home.powerOff')"
      ></gree-power-off>
    </gree-page>
    <!-- 底部按钮 -->
    <gree-toolbar
      position="bottom"
      no-hairline
    >
      <gree-row>
        <gree-col
          :width="25"
          :class="{hidden: (!item.isScenesShow && functype) ||
          (item.onlyLang && item.onlyLang !== lang)}"
          v-for="(item, index) in footList"
          :key="index"
          @click.native="setFunction(index)"
        >
        <div 
            class="icon" 
            :class="{unactive: item.Name === 'btn.advance_sweep' && !Pow || item.Name === 'btn.advance_anion' && !Pow}">
            <img :src="require('@/assets/img/functionBtn/' + item.ImgName + '.png')" />
          </div>
          <h3 :class="{unactive: item.Name === 'btn.advance_sweep' && !Pow || item.Name === 'btn.advance_anion' && !Pow}">
            {{ $language(item.Name) }}
            <i
              class="triangle"
              v-if="item.moreBtn"
            ></i>
          <!-- <div 
            class="icon" 
            :class="{unactive: item.Name === 'btn.advance_sweep' && !Pow}">
            <img :src="require('@/assets/img/functionBtn/' + item.ImgName + '.png')" />
          </div>
          <h3 :class="{unactive: item.Name === 'btn.advance_sweep' && !Pow}">
            {{ $language(item.Name) }}
            <i
              class="triangle"
              v-if="item.moreBtn"
            ></i> -->
          </h3>
        </gree-col>
      </gree-row>
    </gree-toolbar>
    <!-- drawer pop弹框 -->
    <gree-popup v-model="showDrawer" position="bottom">
      <div class="drawer-area">
        <Drawer 
          @setAdvanced="setAdvanced"
          @hideDrawer="hideDrawer()" />
      </div>
    </gree-popup>
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
  ToolBar,
  Marquee, 
  MarqueeItem,
  Dialog 
} from 'gree-ui';
import Drawer from '../../components/Drawer';
import { mapState, mapMutations, mapActions } from 'vuex';
import Carousel from '@/components/Carousel';
import {
  closePage,
  editDevice,
  getCCcmd,
  changeBarColor,
  showToast,
} from '../../../../static/lib/PluginInterface.promise';
import btnConfig from '../../mixins/config/828213/btn';
import carouselConfig, {ModeNameList} from '../../mixins/config/828213/carousel';
import errorLogic from '../../mixins/config/828213/errorLogic';
import advanceFuncConfig from '../../mixins/config/828213/advancedFunc';
import { getTimerIndex } from '../../mixins/config/828213/timer';

const MODE_MUTE_WIND = 5; // 静音风

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
    [Marquee.name]: Marquee,
    [MarqueeItem.name]: MarqueeItem,
    Carousel,
    Drawer,
  },
  mixins: [btnConfig, carouselConfig, errorLogic, advanceFuncConfig],
  data() {
    return {
      showPowerOff: false,
      isSingleError: false,
      errorCode: '',
      errorName: '',
      carouselDragState: false,
      showDrawer: false,
    };
  },
  computed: {
    ...mapState({
      devName: state => (state.deviceInfo.name.length > 12 ? `${state.deviceInfo.name.slice(0, 12)}...` : state.deviceInfo.name),
      functype: state => state.functype,
      Pow: state => state.dataObject.Pow,
      editEnable: state => state.editEnable,
      mac: state => state.mac,
      WdSpd: state => state.dataObject.WdSpd,
      Mode: state => state.dataObject.Mod,
      modeName: state => {
        return ModeNameList[state.dataObject.Mod === MODE_MUTE_WIND ? 3 : state.dataObject.Mod];
      },
      dataObject: state => state.dataObject,
      Rotate: state => state.dataObject.Rotate,
      showWdSpdCarousel: state => !(state.dataObject.Mod === MODE_MUTE_WIND && state.functype),
      timerLabel: state => {
        const totalMinutes = state.dataObject.TmrHour * 60 + state.dataObject.TmrMin;
        const timerVal = getTimerIndex(totalMinutes);
        return `${timerVal}小时后${state.dataObject.Pow ? '关机' : '开机'}`;
      }
    }),
    HeaderImg() {
      return require('@/assets/img/bg_header.png');
    },
    PoweroffImg() {
      return require('@/assets/img/bg_off.png');
    },
  },
  watch: {
    Pow(val) {
      this.showPowerOff = !this.Pow;
      this.setDataObject({TmrOn: 0}); // 开关机时不点亮定时图标
    },
    WdSpd(val) {
      console.log('WdSpd:', val);
      this.$refs.speedCarousel.setId(val - 1);
    },
    Mode(val, oldVal) {
      this.speedOptions.controlAble = true;
      let mode = val;
      if (val === MODE_MUTE_WIND) {
        mode = 3;
        this.$refs.speedCarousel.setId(0); // 静音风模式风挡不可调节，特定转速，显示1档
        this.speedOptions.controlAble = false;
      } 
      // ==更改点：修改其他档位不为1，调到静音档再调回后档位不恢复而变为1的问题
      else {
        this.$refs.speedCarousel.setId(this.WdSpd - 1);
      }
      // ==
      this.$refs.modeCarousel.setId(mode);
    },
    errors: {
      handler(val) {
        this.setErrorState(val);
      },
      immediate: true
    },
  },
  mounted() {
    function bodyScroll(event) {
      event.preventDefault();
    }
    document.body.addEventListener('touchmove', bodyScroll, {passive: false});
    this.$once('hook:beforeDestroy', () => {
      document.body.removeEventListener('touchmove', bodyScroll, {passive: false});
    });

    changeBarColor('#0abfec');
    Dialog.closeAll();
    this.$refs.modeCarousel.setId(this.Mode === MODE_MUTE_WIND ? 3 : this.Mode);
    this.$refs.speedCarousel.setId(this.WdSpd - 1);
    this.showPowerOff = !this.Pow;
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setDeviceData: 'SET_DEVICE_DATA'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    /**
     * @description 隐藏抽屉列表
     */
    hideDrawer() {
      this.showDrawer = false;
    },
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
      // editDevice(this.mac);
      if (!this.functype) {
        this.editEnable ? editDevice(this.mac) : '';
      }
    },
    /**
     * @description 场景模式的保存
     */
    sceneSave() {
      // const keys = Object.keys(this.dataObject);
       const keys = ['Pow', 'Rotate', 'Anion', 'Mod', 'WdSpd', 'TmrOn', 'TmrAction', 'TmrHour', 'TmrMin', 'estate1', 'JFerr'];
      const opt = [];
      const p = [];
      const remarks = '...';
      for (let i = 0, j = keys.length; i < j; i += 1) {
        opt.push(keys[i]);
        p.push(this.dataObject[keys[i]]);
      }
      const json = JSON.stringify({ opt, p, t: 'cmd' });
      console.log(json);
      getCCcmd(this.mac, json, remarks, JSON.stringify(p));
    },
    setSpeed(speed) {
      const cmd = {WdSpd: speed + 1};
      this.setDataObject(cmd);
      this.sendCtrl(cmd);
    },
    setMode(mode) {
      const cmd = {Mod: mode === 3 ? MODE_MUTE_WIND : mode};
      this.setDataObject(cmd);
      this.sendCtrl(cmd);
    },
    checkCarouselState() {
      if (!this.speedOptions.controlAble && this.Mode === MODE_MUTE_WIND) {
        console.log('touchend');
        this.$refs.speedCarousel.setTouchState(false);
        this.$refs.speedCarousel.setId(this.WdSpd - 1);
      }
    },
    showTip() {
      if (this.isError) {
        showToast('故障中，不可操作', 0);
      }
    },
    setFunction(index) {
      if (this.isError) {
        showToast('故障中，不可操作', 0);
        return;
      }
      switch (index) {
        case 0:
          const cmd = {Pow: this.Pow ? 0 : 1};
          this.showPowerOff = !cmd.Pow;
          this.setDataObject(cmd);
          this.sendCtrl(cmd);
          break;
        case 1:
          if (this.Pow) {
            // this.$router.push('/Sweep');
            const cmd = {Rotate: this.Rotate ? 0 : 1};
            this.setDataObject(cmd);
            this.sendCtrl(cmd);
          }
          break;
        case 2:
          // ==更改点
          if (this.functype && !this.Pow) return;
          // ==
          const btnConfig = this.footList[2];
          if (btnConfig.Name === 'btn.advance_anion') {
            const cmd = {Anion: this.dataObject.Anion ? 0 : 1};
            this.setDataObject(cmd);
            this.sendCtrl(cmd);
          } else {
            this.showDrawer = true;
          }
          break;
        default:
          break;
      }
    },
    setAdvanced(index) {
      switch (Number(index)) {
        case 0:
          {
            const cmd = {Anion: this.dataObject.Anion === 0 ? 1 : 0};
            this.setDataObject(cmd);
            this.sendCtrl(cmd);
          }
          break;
        case 1:
          this.$router.push('/Timer');
          break;
        default:
          break;
      }
    },
    goErrorPage() {
      this.$router.push('/Error');
    },
    setCarouselDragState(val) {
      this.carouselDragState = !!val;
    },
    setErrorState(val) {
      this.isSingleError = false;
      this.errorCode = '';
      this.errorName = '';
      this.modeOptions.controlAble = true;
      this.speedOptions.controlAble = true;
      if (this.Mode === MODE_MUTE_WIND) {
        this.speedOptions.controlAble = false; 
      } else {
        this.speedOptions.controlAble = true;
      }
      if (this.errors && this.errors.length > 0) {
        if (this.errors.length === 1) {
          this.isSingleError = true;
          this.errorCode = this.errors[0].code;
          this.errorName = this.errors[0].title;
        } 
        // this.setErrorList(JSON.parse(JSON.stringify(this.errors)));
        this.$nextTick(() => {
          this.modeOptions.controlAble = false;
          this.speedOptions.controlAble = false;
        });
      }
    },
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/scss/828213/home.scss';
</style>
