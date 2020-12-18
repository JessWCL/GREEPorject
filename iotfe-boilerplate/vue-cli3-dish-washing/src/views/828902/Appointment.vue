<template>
  <gree-view
    class="view-appointment"
    bg-color="#ffffff"
  >
    <gree-header
      :title="deviceName"
      :left-options="{ showBack: true, preventGoBack: false }"
      :right-options="{ showMore: false }"
    ></gree-header>
    <gree-page :no-navbar="false">
      <div
        class="banner-wrapper"
        :class="{
          yellow: modType === 1,
          blue: modType === 0 || modType === 2 ,
        }"
        :style="{ 'background-image': 'url(' + modeBG + ')' }"
      >
        <FunctionSmallList />
        <div>
          <p
            class="time range"
            v-if="hasRange"
          >
            <span class="about">{{ $language('home.about') }}</span>
            <span v-if="parseInt(ModTime.aboutValue / 60, 10) > 0" class="hour">{{ parseInt(ModTime.aboutValue / 60, 10) }}</span>
            <label class="unit" v-if="parseInt(ModTime.aboutValue / 60, 10) > 0">{{ $language('home.hour') }}</label>
            <span class="hour">{{ parseInt(ModTime.aboutValue % 60, 10) }}</span>
            <label class="unit">{{ $language('home.minute') }}</label>
          </p>
          <p
            class="time"
            v-else
          >
            <span v-if="parseInt(ModTime.value / 60, 10) > 0" class="hour">{{ parseInt(ModTime.value / 60, 10) }}</span>
            <label v-if="parseInt(ModTime.value / 60, 10) > 0" class="unit">{{ $language('home.hour') }}</label>
            <span class="minute">{{ parseInt(ModTime.value % 60, 10) }}</span>
            <label class="unit">{{ $language('home.minute') }}</label>
          </p>
          <p class="mod-name">{{ currentSlide.name }}</p>
        </div>
      </div>
      <gree-collapse
        v-model="active"
        accordion
      >
        <gree-collapse-item
          title="预约完成时间"
          name="1"
        >
          <gree-picker
            class="appointment"
            :class="{
              // 'today': isToday,
              // 'tomorrow': isTomorrow,
            }"
            ref="picker"
            :data="pickerData"
            @change="onPickerChange"
            :cols="2"
            :line-height="65"
            :default-index="defaultIndex"
            is-view
            is-cascade
            keep-index
            :multi-line="false"
          ></gree-picker>
        </gree-collapse-item>
        <gree-collapse-item
          v-show="modType === 0"
          title="功能"
          name="2"
        >
          <CommonFunctionList />
        </gree-collapse-item>
      </gree-collapse>
      <gree-toolbar>
        <gree-button
          round
          type="default"
          @click.native="goBack"
        >{{ $language('home.cancel') }}</gree-button>
        <gree-button
          round
          type="default"
          @click.native="handleAppointment"
        >{{ $language('home.start') }}</gree-button>
      </gree-toolbar>
    </gree-page>
  </gree-view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  Block,
  Page,
  View,
  Header,
  Collapse,
  CollapseItem,
  Row,
  Col,
  Button,
  Picker,
  ToolBar
} from 'gree-ui';
import * as types from '@/store/types';
import { timeData } from '@/api/828902/baseData';
import { modeBtnList } from '@/api/index';
import CommonFunctionList from '@/components/828902/CommonFunctionList';
import FunctionSmallList from '@/components/828902/FunctionSmallList';
import TabbarList from '@/api/828902/tabbarList';

export default {
  components: {
    [Block.name]: Block,
    [Page.name]: Page,
    [View.name]: View,
    [Header.name]: Header,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [ToolBar.name]: ToolBar,
    CommonFunctionList,
    FunctionSmallList
  },
  data() {
    return {
      active: '1',
      pickerData: timeData,
      pickerValue: '',
      date: new Date(),
      // defaultIndex: [0, 0]
    };
  },

  computed: {
    ...mapState({
      DataObject: state => state.DataObject,
      deviceName: state => state.deviceInfo.name,
      modType: state => state.cache.modType,
      normalModIndex: state => state.cache.normalModIndex,
      singleDryModIndex: state => state.cache.singleDryModIndex,
    }),

    currentSlide() {
      const { modType, normalModIndex, singleDryModIndex } = this;
      let slideItem = modeBtnList[0];
      if (modType === 0) {
        slideItem = modeBtnList.filter(item => item.modType === modType)[normalModIndex];
      } else if (modType === 1) {
        slideItem = modeBtnList.filter(item => item.modType === modType)[singleDryModIndex];
      }
      return slideItem;
    },

    isTomorrow() {
      // 由于整机没同步时间的情况下文案提示有问题，检查中心要求屏蔽此提示

      // const { TmrHour, TmrMin } = this.DataObject;
      // const date = this.date;
      // const TmrTime = TmrHour * 60 + TmrMin;
      // const nowTime = date.getHours() * 60 + date.getMinutes();
      // if (nowTime > TmrTime) {
      //   return true;
      // }
      return false;
    },

    isToday() {
      // 由于整机没同步时间的情况下文案提示有问题，检查中心要求屏蔽此提示

      // const { TmrHour, TmrMin } = this.DataObject;
      // const date = this.date;
      // const TmrTime = TmrHour * 60 + TmrMin;
      // const nowTime = date.getHours() * 60 + date.getMinutes();
      // if (TmrTime >= nowTime) {
      //   return true;
      // }
      return false;
    },

    modeBG() {
      const { modType } = this;
      return TabbarList[modType].img || '';
    },

    hasRange() {
      if (this.currentSlide && this.currentSlide.normalTime) {
        return this.currentSlide.normalTime.indexOf('-') !== -1;
      }
      return false;
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
        let value = this.currentSlide.normalTime || '0:0';
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

        let aboutValue = 0;
        if (typeof value === 'number' || value === undefined) {
          return { value: 0, aboutValue };
        } else if (value.indexOf(',') !== -1) {
          const [rangeTimeStr, aboutTimeStr] = value.split(',');
          const [aTimeStr, bTimeStr] = rangeTimeStr.split('-');
          const [ahour, aminute] = aTimeStr.split(':');
          const [bhour, bminute] = bTimeStr.split(':');
          const aTime = parseInt(ahour, 10) * 60 + parseInt(aminute, 10);
          const bTime = parseInt(bhour, 10) * 60 + parseInt(bminute, 10);
          const [aboutHour, aboutMinute] = aboutTimeStr.split(':');
          aboutValue = parseInt(aboutHour, 10) * 60 + parseInt(aboutMinute, 10);
          return { value: `${aTime}-${bTime}`, aboutValue };
        } else if (value.indexOf(':') !== -1) {
          const [hour, minute] = value.split(':');
          const formatStr = parseInt(hour, 10) * 60 + parseInt(minute, 10);
          return { value: formatStr, aboutValue };
        }
        return { value, aboutValue };
      } catch (e) {
        console.error(e);
        return { value: 0, aboutValue: 0 };
      }
    },

    defaultIndex() {
      const date = this.date;
      const hour = date.getHours();
      const minute = date.getMinutes();
      return [hour, minute];
    }
  },

  created() {
    const date = new Date();
    this.date = date;
    const hour = date.getHours();
    const minute = date.getMinutes();
    this.pickerValue = [hour, minute];
    this.setDataObject({ TmrHour: hour, TmrMin: minute });
  },

  activated() {
    this.intervalID = setInterval(() => {
      this.date = new Date();
    }, 10 * 1000);
  },

  deactivated() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  },

  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL
    }),
    goBack() {
      this.$router.back();
    },

    getModTimeRange() {
      const { normalTime } = this.currentSlide;
      const value = normalTime || [0, 0];
      try {
        if (value.indexOf('-') !== -1) {
          const [aTimeStr, bTimeStr] = value.split('-');
          const [ahour, aminute] = aTimeStr.split(':');
          const [bhour, bminute] = bTimeStr.split(':');
          const aTime = parseInt(ahour, 10) * 60 + parseInt(aminute, 10);
          const bTime = parseInt(bhour, 10) * 60 + parseInt(bminute, 10);
          return [aTime, bTime];
        }
      } catch (e) {
        console.log(e);
      }
      return value;
    },

    getModTime() {
      try {
        const { LayerWash, Dry } = this.DataObject;
        const {
          layerTime,
          mildDryingTime,
          dryingTime,
          enhancedDryingTime,
          normalTime,
          LMDTime, // 分层 + 轻度烘干
          LDTime, // 分层 + 标准烘干
          LEDTime // 分层 + 加强烘干
        } = this.currentSlide;
        let value = normalTime || 0;
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
        } else if (value.indexOf(':') !== -1) {
          const [hour, minute] = value.split(':');
          return [parseInt(hour, 10), parseInt(minute, 10)];
        }
        return value;
      } catch (e) {
        console.log(e);
        return 0;
      }
    },

    handleAppointment() {
      const Pow = 1;
      const Wash = 0;
      const PauseStart = 1;
      const TmrOn = 1;
      const {
        LayerWash,
        Dry,
        Disinfect,
        Purifier,
        PurifierTime,
        TmrHour,
        TmrMin,
      } = this.DataObject;
      const { command } = this.currentSlide;

      const simpleCommand = JSON.parse(JSON.stringify(command));

      let cmd = {};
      cmd = Object.assign(cmd, simpleCommand, {
        Pow,
        Wash,
        PauseStart,
        LayerWash,
        Dry,
        Disinfect,
        TmrOn,
        TmrHour,
        TmrMin
      });

      if (Purifier) {
        cmd = { ...cmd, ...{ Purifier, PurifierTime } };
      }
      if (Disinfect) {
        cmd = { ...cmd, ...{ Disinfect } };
      }

      console.log({ ...cmd });
      this.sendCtrl({ ...cmd });
      this.setDataObject({ ...cmd });
      this.$router.push({ path: 'Home' });
    },
    onChange(picker, value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
    },
    onPickerChange(columnIndex, itemIndex, value) {
      console.log('=== onPickerChange ===');
      if (value && columnIndex === 0) {
        const TmrHour = value.value;
        this.pickerValue[0] = value.value;
        console.log({ TmrHour });
        this.setDataObject({ TmrHour });
      }
      if (value && columnIndex === 1) {
        const TmrMin = value.value;
        this.pickerValue[1] = value.value;
        console.log({ TmrMin });
        this.setDataObject({ TmrMin });
      }
    }
  }
};
</script>
