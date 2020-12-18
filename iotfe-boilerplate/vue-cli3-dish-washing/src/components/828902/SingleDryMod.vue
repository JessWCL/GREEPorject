<template>
  <main>
    <div
      class="banner-wrapper"
      :class="{
        'is-working': isWorking
      }"
      :style="{ 'background-image': 'url(' + modeBG + ')' }"
    >
      <!-- gree-tab-bar -->
      <slot></slot>
      <FunctionSmallList />
      <swiper
        ref="swiper"
        :options="swiperOption"
        @slide-change="onSlideChange"
      >
        <swiper-slide
          v-for="(item, index) in swiperSlides"
          :key="index"
        >
          <div>
            <gree-image
              :src="item.normalIconSrc"
              width="100%"
              height="100%"
              radius="100px"
            ></gree-image>
            <p class="name">{{ item.name }}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <common-notice-bar />
    <gree-block
      class="mod-time-wrapper"
      v-show="!isWorking"
    >
      <p
        v-if="hasRange"
        :class="{ range: hasRange === true }">
        <span v-if="parseInt(timeFrameStr / 60, 10) > 0" class="time">{{ parseInt(timeFrameStr / 60, 10) }}</span>
        <label v-if="parseInt(timeFrameStr / 60, 10) > 0">小时</label>
        <span>{{ parseInt(timeFrameStr % 60, 10) }}</span>
        <label>分钟</label>
      </p>
      <p v-else>
        <span v-if="parseInt(ModTime / 60, 10) > 0" class="time">{{ parseInt(ModTime / 60, 10) }}</span>
        <label v-if="parseInt(ModTime / 60, 10) > 0">小时</label>
        <span>{{ parseInt(ModTime % 60, 10) }}</span>
        <label>分钟</label>
      </p>
    </gree-block>
    <gree-button
      v-show="!isWorking"
      class="btn-start"
      @click.native="handleStart"
      round
      type="default"
    >{{ $language('home.start') }}</gree-button>

    <working
      v-if="isWorking"
      mode-theme="orange"
    />
  </main>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import {
  TabBar,
  Header,
  Image,
  Block,
  Button,
  PowerOff,
  CanvasGauge
} from 'gree-ui';
import { modeBtnList } from '@/api/index';
import GreeToolBar from '@/components/828902/ToolBar';
import FunctionSmallList from '@/components/828902/FunctionSmallList';
import FunctionList from '@/components/828902/FunctionList';
import CommonNoticeBar from '@/components/828902/CommonNoticeBar';
import ModList from '@/components/828902/ModList';
import Working from '@/components/828902/Working';
import TabbarList from '@/api/828902/tabbarList';
import * as types from '@/store/types';
import {
  closePage,
  editDevice
} from '../../../../static/lib/PluginInterface.promise.js';

export default {
  components: {
    [Header.name]: Header,
    [TabBar.name]: TabBar,
    [Image.name]: Image,
    [Block.name]: Block,
    [Button.name]: Button,
    [PowerOff.name]: PowerOff,
    [CanvasGauge.name]: CanvasGauge,
    FunctionList,
    GreeToolBar,
    ModList,
    FunctionSmallList,
    Working,
    CommonNoticeBar
  },

  data() {
    return {
      localDry: 1,
      swiperOption: {
        effect: 'coverflow',
        slidesPerView: 3,
        centeredSlides: true,
        loop: false,
        noSwiping: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: Math.floor(document.body.clientWidth / 6.5 / 10) * 10,
          modifier: 2,
          slideShadows: false
        }
      },
      isFuncPopupShow: { bottom: false },
      isModPopupShow: { bottom: false },
      currentSlide: {}
    };
  },

  computed: {
    ...mapState({
      deviceName: state => state.deviceInfo.name,
      mac: state => state.mac,
      cache: state => state.cache,
      modType: state => state.cache.modType,
      DataObject: state => state.DataObject,
      singleDryModIndex: state => state.cache.singleDryModIndex,
      Pow: state => state.DataObject.Pow,
      Wash: state => state.DataObject.Wash,
      TmrOn: state => state.DataObject.TmrOn,
      Mod: state => state.DataObject.Mod,
      Dry: state => state.DataObject.Dry,
    }),

    isWorking() {
      const { Wash, TmrOn } = this;
      return Wash === 1 || TmrOn === 1;
    },

    tabbarList() {
      const disabled = this.isWorking;
      TabbarList.forEach(element => {
        const item = element;
        item.disabled = disabled;
      });
      const ret = TabbarList;
      return ret;
    },

    modeBG() {
      return TabbarList[this.modType].img;
    },

    hasRange() {
      if (this.currentSlide && this.currentSlide.normalTime) {
        return this.currentSlide.normalTime.indexOf('-') !== -1;
      }
      return false;
    },

    timeFrameStr() {
      try {
        if (this.currentSlide && this.currentSlide.normalTime) {
          const value = this.currentSlide.normalTime;
          const [aTimeStr, bTimeStr] = value.split('-');
          const [ahour, aminute] = aTimeStr.split(':');
          const [bhour, bminute] = bTimeStr.split(':');
          const aTime = parseInt(ahour, 10) * 60 + parseInt(aminute, 10);
          const bTime = parseInt(bhour, 10) * 60 + parseInt(bminute, 10);
          return `${aTime}-${bTime}`;
        }
        return 0;
      } catch (e) {
        console.log(e);
        return 0;
      }
    },

    ModTime() {
      try {
        const { LayerWash } = this.DataObject;
        const { singleDryModIndex } = this;
        const layerTime = this.currentSlide.layerTime;
        const mildDryingTime = this.currentSlide.mildDryingTime;
        const dryingTime = this.currentSlide.dryingTime;
        const enhancedDryingTime = this.currentSlide.enhancedDryingTime;
        const LMDTime = this.currentSlide.LMDTime; // 分层 + 轻度烘干
        const LDTime = this.currentSlide.LDTime; // 分层 + 标准烘干
        const LEDTime = this.currentSlide.LEDTime; // 分层 + 加强烘干
        let value = this.currentSlide.normalTime || 0;
        const Dry = singleDryModIndex + 1;
        if (LayerWash !== 0 && Dry !== 0) {
          switch (Dry) {
            case 1:
              value = LMDTime;
              break;
            case 2:
              value = LDTime;
              break;
            case 3:
              value = LEDTime;
              break;
            default:
              break;
          }
        } else if (LayerWash !== 0) {
          value = layerTime;
        } else if (Dry === 1) {
          value = mildDryingTime;
        } else if (Dry === 2) {
          value = dryingTime;
        } else if (Dry === 3) {
          value = enhancedDryingTime;
        }
        if (typeof value === 'number' || value === undefined) {
          return 0;
        } else if (value.indexOf('-') !== -1) {
          const [aTimeStr, bTimeStr] = value.split('-');
          const [ahour, aminute] = aTimeStr.split(':');
          const [bhour, bminute] = bTimeStr.split(':');
          const aTime = parseInt(ahour, 10) * 60 + parseInt(aminute, 10);
          const bTime = parseInt(bhour, 10) * 60 + parseInt(bminute, 10);
          return `${aTime}-${bTime}`;
        } else if (value.indexOf(':') !== -1) {
          const [hour, minute] = value.split(':');
          return parseInt(hour, 10) * 60 + parseInt(minute, 10);
        }
        return value;
      } catch (e) {
        console.log(e);
        return 0;
      }
    },

    showPowerOff() {
      return Boolean(!this.Pow);
    },

    headerTheme() {
      const { Pow } = this;
      const { deviceState } = this;
      const isOffline = deviceState === -1 || this.$route.name === 'Offline';
      let ret = '';
      if (isOffline || !Pow) {
        ret = 'transparent';
      }
      return ret;
    },

    swiper() {
      return this.$refs.swiper.swiper;
    },

    swiperSlides() {
      return modeBtnList.filter(item => item.modType === this.modType);
    }
  },

  watch: {
    singleDryModIndex() {
      this.handleSwiperSlide();
    },
    modType(newV) {
      const modType = newV;
      if (modType === 0) {
        const { Wash, TmrOn, localDry } = this;
        const isWorking = Wash === 1 && TmrOn === 1;
        console.log('[single dry page] change modType');
        if (!isWorking) {
          this.setDataObject({ Dry: localDry });
        }
      }
    },
    Dry() {
      this.handleSwiperSlide();
    },
    Wash() {
      this.handleSwiperSlide();
    },
    TmrOn() {
      this.handleSwiperSlide();
    }
  },

  activated() {
    console.log('=== dry activeated ===');
    const { Wash, TmrOn, Dry } = this;
    const isWorking = Wash === 1 && TmrOn === 1;
    if (!isWorking) {
      this.localDry = Dry;
    }
    const { singleDryModIndex } = this;
    this.swiper.slideToLoop(singleDryModIndex);
    this.handleModelStatus();
    this.handleSwiperSlide();
  },

  deactivated() {
    // const { isWorking, localDry } = this;
    // if (!isWorking) {
    //   this.setDataObject({ Dry: localDry });
    // }
  },

  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT,
      setCache: types.SET_CACHE,
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL
    }),
    onSwiperChange(from, to) {
      this.current = to;
    },

    /**
     * @description 返回键
     */
    clickBack() {
      if (this.$route.name === 'Home' || this.$route.name === 'Offline') {
        closePage();
      } else {
        this.$router.back();
      }
    },

    moreInfo() {
      editDevice(this.mac);
    },

    handleModelStatus() {
      try {
        const { realIndex } = this.swiper;
        const slideItem = this.swiperSlides[realIndex];
        this.currentSlide = slideItem;
        const { command } = slideItem;
        const { Wash } = this.DataObject;
        const isWorking = Wash === 1;
        if (!isWorking) {
          this.setDataObject(command);
        }
      } catch (e) {
        console.error(e);
      }
    },

    handleSwiperSlide() {
      // swiper翻到对应的模式
      const { Wash, Mod, Dry, TmrOn } = this.DataObject;
      const { singleDryModIndex } = this;
      const isWorking = Wash === 1 || TmrOn === 1;
      // const isWashTabbar = Mod !== 0;
      const isDryTabbar = Mod === 0 && Dry !== 0;
      // const isPurifierTabbar = Mod === 0 && Dry === 0 && Purifier !== 0;

      if (isWorking) {
        // 先设置可滑动
        this.swiper.allowSlideNext = true;
        this.swiper.allowSlidePrev = true;

        const { realIndex } = this.swiper;
        this.WashSwiperIndex = realIndex;
        // swiper翻到对应的模式
        this.swiper.slideToLoop(Dry - 1);

        // 后设置不可滑动
        this.swiper.allowSlideNext = false;
        this.swiper.allowSlidePrev = false;
      } else {
        // 设置可滑动
        this.swiper.allowSlideNext = true;
        this.swiper.allowSlidePrev = true;
        // swiper翻到对应的模式
        this.swiper.slideToLoop(singleDryModIndex);
      }
    },

    onSlideChange() {
      console.log('=== onSlideChange ===');
      const { realIndex } = this.$refs.swiper.swiper;
      this.setCache({
        singleDryModIndex: realIndex,
        Dry: realIndex + 1
      });
      this.handleModelStatus();
      // this.handleSwiperSlide();
    },

    toolbarClick(footerItem, index) {
      console.log(footerItem, index);
      if (index === 0) {
        const Pow = this.Pow === 1 ? 0 : 1;
        console.log({ Pow });
        this.setDataObject({ Pow });
        this.sendCtrl({ Pow });
      } else if (index === 1) {
        if (this.Pow === 0) return;
        this.isModPopupShow.bottom = !this.isModPopupShow.bottom;
      } else if (index === 2) {
        if (this.Pow === 0) return;
        this.isFuncPopupShow.bottom = !this.isFuncPopupShow.bottom;
      }
    },

    handleStart() {
      const { realIndex } = this.$refs.swiper.swiper;
      const slideItem = this.swiperSlides[realIndex];
      const { command } = slideItem;
      const Pow = 1;
      const Wash = 1;
      const PauseStart = 1;
      const WorkStatus = 5; // 烘干中
      // const TmrOn = 0;
      // const Purifier = 0;
      // const PurifierTime = 0;
      const simpleCommand = JSON.parse(JSON.stringify(command));
      const {
        LayerWash,
        Disinfect,
        TmrOn,
        TmrHour,
        TmrMin
      } = this.DataObject;

      let cmd = {};

      cmd = Object.assign(cmd, simpleCommand, {
        Pow,
        Wash,
        PauseStart,
        LayerWash
      });

      if (Disinfect) {
        cmd = { ...cmd, Disinfect };
      }

      if (TmrOn) {
        cmd = { ...cmd, TmrOn, TmrHour, TmrMin };
      }

      const { ModTime } = this;
      let RmTmrHour = '-';
      let RmTmrMin = '-';
      if (typeof ModTime === 'number') {
        RmTmrHour = parseInt(ModTime / 60, 10);
        RmTmrMin = parseInt(ModTime % 60, 10);
      }
      const TmrMinCmd = { RmTmrHour, RmTmrMin };

      console.log({ ...cmd });
      this.sendCtrl({ ...cmd });
      this.setDataObject({ ...cmd, ...TmrMinCmd, WorkStatus });
    }
  }
};
</script>
