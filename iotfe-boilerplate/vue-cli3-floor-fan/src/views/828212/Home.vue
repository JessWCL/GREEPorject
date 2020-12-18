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
          :right-options="{showMore: true}"
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
              v-show="Mode === 0 || Mode === 2 || (Mode === 3 && !functype)"
              key="wind"
              ref="speedCarousel"
              @touchstart.native="showTip"
              @currentChange="setSpeed"
              @onDrag="setCarouselDragState"
              @onTouchend="checkCarouselState"
              :prop-data="speedData"
              :options="speedOptions"
            ></Carousel>
            <!--自然风风挡滑轮-->
            <Carousel
              v-show="Mode === 1"
              key="natrualWind"
              ref="natrualWindSpeedCarousel"
              @touchstart.native="showTip"
              @currentChange="setSpeed"
              @onDrag="setCarouselDragState"
              :prop-data="naturalWindSpeedData"
              :options="naturalWindSpeedCarouselOptions"
            ></Carousel>
            <div 
              class="auto-speed-label"
              v-show="Mode === 3 && functype">自动</div>
            <span 
              v-show="!(Mode === 3 && functype)"
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
            :class="{unactive: item.Name === 'btn.advance_sweep' && !Pow}">
            <img :src="require('@/assets/img/functionBtn/' + item.ImgName + '.png')" />
          </div>
          <h3 :class="{unactive: item.Name === 'btn.advance_sweep' && !Pow}">
            {{ $language(item.Name) }}
            <i
              class="triangle"
              v-if="item.moreBtn"
            ></i>
          </h3>
        </gree-col>
      </gree-row>
    </gree-toolbar>
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
import { mapState, mapMutations, mapActions } from 'vuex';
import Carousel from '@/components/Carousel';
import {
  closePage,
  editDevice,
  getCCcmd,
  changeBarColor,
  showToast,
} from '../../../../static/lib/PluginInterface.promise';
import btnConfig from '../../mixins/config/828212/btn';
import carouselConfig, {ModeNameList} from '../../mixins/config/carousel';
import errorLogic from '../../mixins/config/828212/errorLogic';
import * as MODE from '../../api/828212/constants';

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
  },
  mixins: [btnConfig, carouselConfig, errorLogic],
  data() {
    return {
      showPowerOff: false,
      isSingleError: false,
      errorCode: '',
      errorName: '',
      carouselDragState: false,
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
        return ModeNameList[state.dataObject.Mod];
      },
      dataObject: state => state.dataObject,
      Rotate: state => state.dataObject.Rotate,
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
      if (this.Mode === MODE.MODE_NATURAL_WIND) {
        this.$refs.natrualWindSpeedCarousel.setId(val - 1);
      } else {
        this.$refs.speedCarousel.setId(val - 1);
      }
    },
    Mode(val, oldVal) {
      const mode = val;
      this.$refs.modeCarousel.setId(mode);
      console.log(`mode: ${val}, wdspd: ${this.WdSpd}`);
      if (mode === MODE.MODE_NATURAL_WIND) {
        const carouselWdspd = this.$refs.natrualWindSpeedCarousel.selectId + 1;
        const currentWdspd = this.WdSpd;
        if (this.functype) {
          this.setWdspdInScence(oldVal, val);
        } else {
          if (carouselWdspd !== currentWdspd) {
            if (currentWdspd <= 4) {
              this.$refs.natrualWindSpeedCarousel.setId(currentWdspd - 1);
            } else {
              this.$refs.natrualWindSpeedCarousel.setId(0);
            }          
          }
        }
       
        // console.log(`isManual:${this.isManual}`);
        // if (this.isManual) {
        //   this.isManual = false;
        //   this.$refs.natrualWindSpeedCarousel.setId(this.getNaturalWindSpeed(currentWdspd) - 1);
        // } else {
        //   this.$refs.natrualWindSpeedCarousel.setId(this.WdSpd - 1);
        // }   
        // this.$refs.natrualWindSpeedCarousel.setId(this.WdSpd - 1);
      } else {
        this.speedOptions.controlAble = true;
        if (mode === MODE.MODE_SMART_WIND) {
          this.speedOptions.controlAble = false;
        } 
        if (this.functype) {
          this.setWdspdInScence(oldVal, val);
        } else {
         this.$refs.speedCarousel.setId(this.WdSpd - 1);
        }
      } 
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
    this.$refs.modeCarousel.setId(this.Mode);
    if (this.Mode === MODE.MODE_NATURAL_WIND) {
      this.$refs.natrualWindSpeedCarousel.setId(this.WdSpd - 1);
    } else {
      if (this.Mode === MODE.MODE_SMART_WIND) {
        // 智能档风速不可调
        this.speedOptions.controlAble = false;
      }
      this.$refs.speedCarousel.setId(this.WdSpd - 1);
    }
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
    setWdspdInScence(oldMode, newMode) {
      if (newMode === MODE.MODE_NATURAL_WIND) {
        this.$refs.natrualWindSpeedCarousel.setId(this.getNaturalWindSpeed(this.WdSpd) - 1);
      } else {
         if (oldMode === MODE.MODE_NATURAL_WIND) {
          const natureWdspd = this.$refs.natrualWindSpeedCarousel.selectId + 1;
          const convertWdspd = this.convertNaturalWindSpeed(natureWdspd);
          this.setDataObject({WdSpd: convertWdspd});
          this.$refs.speedCarousel.setId(convertWdspd - 1);
        } else {
          this.$refs.speedCarousel.setId(this.WdSpd - 1);
        }
      }
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
      const keys = ['Pow', 'Rotate', 'Mod', 'WdSpd', 'TmrOn', 'TmrAction', 'TmrHour', 'TmrMin'];
      const opt = [];
      const p = [];
      const remarks = '...';
      // 兼容性代码
      if (this.dataObject['Mod'] === MODE.MODE_NATURAL_WIND) {
        this.dataObject['WdSpd'] = this.$refs.natrualWindSpeedCarousel.selectId + 1;
      } else {
        this.dataObject['WdSpd'] = this.$refs.speedCarousel.selectId + 1;
      }
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
      const cmd = {Mod: mode};
      // if (mode === MODE.MODE_NATURAL_WIND) {
      //   let WdSpd = this.getWindSpeed();
      //   cmd.WdSpd = WdSpd;
      // }
      this.setDataObject(cmd);
      this.sendCtrl(cmd);
    },
    getWindSpeed() {
      if (this.WdSpd >= 1 && this.WdSpd < 7) {
        return 1;
      } else if (this.WdSpd < 13) {
        return 2;
      } else if (this.WdSpd < 19) {
        return 3;
      } else {
        return 4;
      } 
    },
    // 获取自然风风档
    getNaturalWindSpeed(WdSpd) {
      if (WdSpd >= 1 && WdSpd < 7) {
        return 1;
      } else if (WdSpd < 13) {
        return 2;
      } else if (WdSpd < 19) {
        return 3;
      } else {
        return 4;
      } 
    },
    // 从自然风切换到普通风、睡眠风时，转换风档
    convertNaturalWindSpeed(WdSpd) {
      let DefaultWdSpds = [1, 7, 13, 19];
      return DefaultWdSpds[WdSpd - 1];
    },
    checkCarouselState() {
      if (!this.speedOptions.controlAble && this.Mode === MODE.MODE_SMART_WIND) {
        console.log('touchend');
        this.$refs.speedCarousel.setTouchState(false);
        this.$refs.speedCarousel.setId(this.WdSpd - 1);
        // this.$refs.speedCarousel.redraw();
      }
    },
    showTip() {
      if (this.isError && this.JFerr) {
        showToast('故障中，不可操作', 0);
      }
    },
    setFunction(index) {
      if (this.isError && this.JFerr) {
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
      if (this.Mode === MODE.MODE_SMART_WIND) {
        this.speedOptions.controlAble = false; 
      } else {
        this.speedOptions.controlAble = true;
      }
      this.naturalWindSpeedCarouselOptions.controlAble = true;
      if (this.errors && this.errors.length > 0) {
        if (this.errors.length === 1) {
          this.isSingleError = true;
          this.errorCode = this.errors[0].code;
          this.errorName = this.errors[0].title;
        } 
        // this.setErrorList(JSON.parse(JSON.stringify(this.errors)));
        this.$nextTick(() => {
          if (this.JFerr) {
            this.modeOptions.controlAble = false;
            this.speedOptions.controlAble = false;
            this.naturalWindSpeedCarouselOptions.controlAble = false;
          }
        });
      }
    },
  }
};
</script>
