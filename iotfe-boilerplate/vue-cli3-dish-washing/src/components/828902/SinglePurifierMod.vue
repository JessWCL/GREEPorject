<template>
  <main>
    <div
      class="banner-wrapper"
      :class="{
        'is-working': isWorking
      }"
      :style="{ 'background-image': 'url(' + modeBG + ')' }"
    >
      <!-- for gree-tab-bar start -->
      <slot></slot>
      <!-- for gree-tab-bar end -->
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

    <!-- 工作时不显示提示 -->
    <gree-block
      v-show="!isWorking"
      class="time-range"
    >可调时间范围：1-96小时</gree-block>

    <gree-picker
      class="only-hour"
      v-if="!isWorking"
      ref="picker"
      :data="pickerData"
      @change="onPickerChange"
      :cols="1"
      :line-height="60"
      :default-index="defaultIndex"
      is-view
      is-cascade
      keep-index
      :multi-line="false"
    ></gree-picker>

    <gree-button
      v-show="!isWorking"
      class="btn-start"
      @click.native="handleStart"
      round
      type="default"
    >{{ $language('home.start') }}</gree-button>

    <working
      v-if="isWorking"
      mode-theme="blue"
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
  CanvasGauge,
  Picker
} from 'gree-ui';
import { modeBtnList } from '@/api/index';
import GreeToolBar from '@/components/828902/ToolBar';
import FunctionSmallList from '@/components/828902/FunctionSmallList';
import CommonNoticeBar from '@/components/828902/CommonNoticeBar';
import FunctionList from '@/components/828902/FunctionList';
import ModList from '@/components/828902/ModList';
import Working from '@/components/828902/Working';
import TabbarList from '@/api/828902/tabbarList';
import * as types from '@/store/types';
import {
  closePage,
  editDevice
} from '../../../../static/lib/PluginInterface.promise.js';

const data = [];
for (let index = 1; index < 97; index += 1) {
  data.push({
    text: `${index}`,
    value: index
  });
}

function getPurifierTimeByMac(mac) {
  const LOCAL_STORAGE_PURIFIER = `MID_${process.env.VUE_APP_MID}_PURIFIER_TIME_${mac}`;
  const strPurifierTime = localStorage.getItem(LOCAL_STORAGE_PURIFIER);
  const PurifierTime = Number(strPurifierTime) || 1;
  return PurifierTime;
}

function setPurifierTimeByMac(mac, value) {
  try {
    const LOCAL_STORAGE_PURIFIER = `MID_${process.env.VUE_APP_MID}_PURIFIER_TIME_${mac}`;
    const PurifierTime = value || '';
    localStorage.setItem(LOCAL_STORAGE_PURIFIER, PurifierTime);
  } catch (e) {
    console.error(e);
  }
}

export default {
  components: {
    [Header.name]: Header,
    [TabBar.name]: TabBar,
    [Image.name]: Image,
    [Block.name]: Block,
    [Button.name]: Button,
    [PowerOff.name]: PowerOff,
    [CanvasGauge.name]: CanvasGauge,
    [Picker.name]: Picker,
    FunctionList,
    GreeToolBar,
    ModList,
    FunctionSmallList,
    Working,
    CommonNoticeBar
  },

  data() {
    return {
      localPurifierTime: 1, // 内部变量 保洁时间 1-96
      pickerData: [data],
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
      Pow: state => state.DataObject.Pow,
      Wash: state => state.DataObject.Wash,
      TmrOn: state => state.DataObject.TmrOn,
      Mod: state => state.DataObject.Mod,
      Dry: state => state.DataObject.Dry,
      Purifier: state => state.DataObject.Purifier,
      // PurifierTime: state => state.DataObject.PurifierTime,
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

    defaultIndex() {
      const { localPurifierTime } = this;
      return [localPurifierTime - 1];
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
        const { LayerWash, Dry } = this.DataObject;
        const layerTime = this.currentSlide.layerTime;
        const mildDryingTime = this.currentSlide.mildDryingTime;
        const dryingTime = this.currentSlide.dryingTime;
        const enhancedDryingTime = this.currentSlide.enhancedDryingTime;
        const LMDTime = this.currentSlide.LMDTime; // 分层 + 轻度烘干
        const LDTime = this.currentSlide.LDTime; // 分层 + 标准烘干
        const LEDTime = this.currentSlide.LEDTime; // 分层 + 加强烘干
        let value = this.currentSlide.normalTime || 0;
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
    Wash() {
      this.handleSwiperSlide();
    }
  },

  activated() {
    console.log('=== purifier activeated ===');
    const { mac, Wash, TmrOn, Dry, Purifier } = this;

    const isWorking = Wash === 1 && TmrOn === 1;
    if (!isWorking) {
      const localPurifierTime = getPurifierTimeByMac(mac);
      this.localPurifierTime = localPurifierTime;
    }
    this.handleModelStatus();
    this.handleSwiperSlide();
    window.picker = this.$refs.picker;
    setTimeout(() => { this.$refs.picker.refresh(); console.log('refresh'); }, 0);
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

    onPickerChange(columnIndex, itemIndex, value) {
      console.log('=== onPickerChange ===');
      if (value) {
        console.log({ value });
        const PurifierTime = value.value;

        this.setDataObject({ PurifierTime });

        const { mac } = this;
        setPurifierTimeByMac(mac, PurifierTime);
        this.localPurifierTime = PurifierTime;

        // this.setDataObject({ PurifierTime });
        setTimeout(() => { this.$refs.picker.refresh(); console.log('onPickerChange refresh'); }, 0);
      }
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
      const { realIndex } = this.swiper;
      this.setCache({ singlePurifierModIndex: realIndex });
      const slideItem = this.swiperSlides[realIndex];
      this.currentSlide = slideItem;
      // const { command } = slideItem;
      // this.setDataObject(command);
    },

    handleSwiperSlide() {
      // swiper翻到对应的模式
      const { Wash, TmrOn } = this.DataObject;
      const isWorking = Wash === 1 || TmrOn === 1;

      if (isWorking) {
        // 后设置不可滑动
        this.swiper.allowSlideNext = false;
        this.swiper.allowSlidePrev = false;
      } else {
        // 设置可滑动
        this.swiper.allowSlideNext = true;
        this.swiper.allowSlidePrev = true;
      }
    },

    onSlideChange() {
      console.log('=== onSlideChange ===');
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
      const { realIndex } = this.swiper;
      const slideItem = this.swiperSlides[realIndex];
      const { command } = slideItem;
      const Pow = 1;
      const Wash = 1;
      const PauseStart = 1;
      const Purifier = 1;
      const WorkStatus = 6; // 保洁中
      const simpleCommand = JSON.parse(JSON.stringify(command));
      const {
        Disinfect,
      } = this.DataObject;

      const PurifierTime = this.$refs.picker.getColumnValues()[0].value;

      let cmd = {};

      cmd = Object.assign(cmd, simpleCommand, {
        Pow,
        Wash,
        PauseStart,
        Purifier,
        PurifierTime
      });

      if (Disinfect) {
        cmd = { ...cmd, Disinfect };
      }

      let RmTmrHour = '-';
      let RmTmrMin = '-';
      if (typeof PurifierTime === 'number') {
        RmTmrHour = PurifierTime;
        RmTmrMin = 0;
      }
      const TmrMinCmd = { RmTmrHour, RmTmrMin };

      console.log({ ...cmd });
      this.sendCtrl({ ...cmd });
      this.setDataObject({ ...cmd, ...TmrMinCmd, WorkStatus });
    }
  }
};
</script>
