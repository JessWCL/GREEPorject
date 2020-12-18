<template>
  <gree-view>
    <gree-page
      no-navbar
      class="page-home"
    >
      <div
        class="page-header"
        :style="{backgroundImage:'url(' + head_bg + ')'}"
      >
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
        >
          {{ devname }}
          <gree-dropdown
            slot="right"
            position="is-bottom-left"
          >
            <gree-icon
              slot="trigger"
              name="more"
              size="lg"
            ></gree-icon>
            <gree-dropdown-item @click.native="moreInfo">Device Information</gree-dropdown-item>
          </gree-dropdown>
        </gree-header>
        <div class="battery-remind">
          <img :src="alarmImg" />
          <h3>
            {{ $language('home.dumpEnergy') }} {{ dataObject.electricity }}%
            <i
              class="status"
              :class="{'full': batteryLow}"
            ></i>
          </h3>
        </div>
        <!-- 警告 -->
        <gree-notice-bar
          ref="custom_notice_bar"
          v-if="alarm"
        >
          <img
            src="@/assets/img/warning.png"
            slot="left"
          />
          <span>{{ $language("home.warning") }}</span>
          <a
            href="javascript:;"
            @click="close"
          >点击关闭</a>
        </gree-notice-bar>
      </div>
      <div class="page-main">
        <!-- 居中内容提示 -->
        <div
          class="main-tips"
          v-if="lists.length === 0"
        >
          <h3>{{ $language('home.alarm') }}</h3>
        </div>
      </div>
      <div v-show="false">{{ alarm }} - {{ batteryLow }} - {{ ColorChange }}</div>
    </gree-page>
  </gree-view>
</template>

<script>
import {
  Header,
  List,
  Item,
  Icon,
  Dropdown,
  DropdownItem,
  NoticeBar,
  ScrollView,
  ScrollViewMore
} from 'gree-ui';
import { mapState, mapMutations } from 'vuex';
import {
  closePage,
  editDevice,
  changeBarColor
} from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    [Icon.name]: Icon,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [NoticeBar.name]: NoticeBar,
    [ScrollView.name]: ScrollView,
    [ScrollViewMore.name]: ScrollViewMore
  },
  data() {
    return {
      alarmImg: '',
      lists: [],
      isFinished: false
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      isScene: state => state.isScene
    }),
    head_bg() {
      const bg = require('@/assets/img/bg_header.png');
      return bg;
    },
    power_off_bg() {
      const bg = require('@/assets/img/bg_off.png');
      return bg;
    },
    alarm() {
      return this.dataObject.alarm;
    },
    batteryLow() {
      return Boolean(this.dataObject.batteryLow);
    },
    /**
     * @description 主页面下更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      if (this.$route.name === 'Home') {
        color = '#3964b0';
      }
      color ? changeBarColor(color) : '';
      return color;
    }
  },
  watch: {
    alarm: {
      handler(newVal) {
        if (newVal) {
          this.alarmImg = require('@/assets/img/alarm_on.png');
        } else {
          this.alarmImg = require('@/assets/img/alarm_off.png');
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
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
      editDevice(this.mac);
    },
    close() {
      this.$refs.custom_notice_bar.$el.style.display = 'none';
    }
  }
};
</script>
