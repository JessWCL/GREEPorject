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
          <span v-show="isSingleError">
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
        <!-- 湿度滑轮 -->
        <div
          class="speed-carousel-holder"
          :class="{hidden: !Pow}"
        >
          <div class="tem-carousel-pos" :class="{estate: isError}">
            <Carousel
              ref="speedCarousel"
              @touchstart.native="showTip"
              @currentChange="setSpeed"
              @onDrag="setCarouselDragState"
              :prop-data="speedData"
              :options="speedOptions"
            ></Carousel>
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
    <div 
      style="position: fixed; top:0; left:33%; width:30%; height:100px; opacity: 0;" 
      @click="consoleSwitch"></div>
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
  MarqueeItem 
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
import btnConfig from '../../mixins/config/828211/btn';
import carouselConfig from '../../mixins/config/carousel';

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
  mixins: [btnConfig, carouselConfig],
  data() {
    return {
      showPowerOff: false,
      errors: [],
      count: 0,
      timerId: 0,
      isSingleError: false,
      errorCode: '',
      errorName: '',
      carouselDragState: false
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
      estate: state => state.dataObject.estate,
      JFerr: state => state.dataObject.JFerr,
      isError: state => state.dataObject.estate + state.dataObject.JFerr,
      modeName: state => {
        const modeNameList = ['普通风', '睡眠风'];
        return modeNameList[state.dataObject.Mod === 2 ? 1 : 0];
      },
      dataObject: state => state.dataObject,
      isInit: state => state.isInit
    }),
    HeaderImg() {
      return require('@/assets/img/bg_header.png');
    },
    PoweroffImg() {
      return require('@/assets/img/bg_off.png');
    },
  },
  watch: {
    isInit(val) {
      if (val) {
        changeBarColor('#0abfec');
      }
    },
    Pow(val) {
      this.showPowerOff = !this.Pow;
      this.setDataObject({TmrOn: 0}); // 开关机时不点亮定时图标
    },
    WdSpd(val) {
      this.$refs.speedCarousel.setId(val - 1);
    },
    Mode(val) {
      let mode = val;
      console.log('mode', mode);
      if (mode === 2) {
        mode = 1; // 睡眠风模式值为2，而对应滑轮的值为1，因此此处做了转换
      }
      this.$refs.modeCarousel.setId(mode);
    },
    isError: {
      handler(val) {
        this.isSingleError = false;
        this.errorCode = '';
        this.errorName = '';
        this.modeOptions.controlAble = true;
        this.speedOptions.controlAble = true;
        if (val) {
          this.errors.splice(0, this.errors.length);
          for (let i = 1; i <= 128; i *= 2) {
            if ((i & this.estate) === 1) {
              this.errors.push({
                code: 'H0', 
                headtitle: '故障名称：',
                title: '板间通讯故障',
                subtitle: '解除办法：',
                text: '联系售后'
              });
            }
            if ((i & this.estate) === 64) {
              this.errors.push({
                code: 'H8', 
                headtitle: '故障名称：',
                title: '触摸通讯故障',
                subtitle: '解除办法：',
                text: '联系售后'
              });
            }
          }
          if (this.JFerr) {
            this.errors.push({
              code: 'H1',
              headtitle: '故障名称：',
              title: '整机与WiFi通讯故障',
              subtitle: '解除办法：',
              text: '请通知售后人员维修'
            });
          }
          if (this.errors && this.errors.length > 0) {
            if (this.errors.length === 1) {
              this.isSingleError = true;
              this.errorCode = this.errors[0].code;
              this.errorName = this.errors[0].title;
            } 
            this.setErrorList(JSON.parse(JSON.stringify(this.errors)));
            this.$nextTick(() => {
              this.modeOptions.controlAble = false;
              this.speedOptions.controlAble = false;
            });
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setErrorList: 'SET_ERROR_LIST'
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
      const keys = ['Pow', 'Rotate', 'LRAngle', 'Mod', 'WdSpd', 'TmrOn', 'TmrAction', 'TmrHour', 'TmrMin'];
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
    setSpeed(speed) {
      const cmd = {WdSpd: speed + 1 };
      this.setDataObject(cmd);
      this.sendCtrl(cmd);
    },
    setMode(mode) {
      const cmd = {Mod: 0};
      if (mode === 1) {
        cmd.Mod = 2; // 滑轮值为1时选择的是睡眠风，睡眠风模式的值为2
      }
      this.setDataObject(cmd);
      this.sendCtrl(cmd);
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
          {
            const cmd = {Pow: this.Pow ? 0 : 1};
            this.showPowerOff = !cmd.Pow;
            this.setDataObject(cmd);
            this.sendCtrl(cmd);
          }
          break;
        case 1:
          {
            if (this.Pow) {
              this.$router.push('/Sweep');
            }
          }
          break;
        case 2:
          {
            this.$router.push('/Timer');
          }
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
    consoleSwitch() {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = 0;
      }
      this.count++;
      if (this.count === 10) {
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
  },
  mounted() {
    this.$refs.modeCarousel.setId(this.Mode === 2 ? 1 : 0);
    this.$refs.speedCarousel.setId(this.WdSpd - 1);
    this.showPowerOff = !this.Pow;
  }
  
};
</script>
