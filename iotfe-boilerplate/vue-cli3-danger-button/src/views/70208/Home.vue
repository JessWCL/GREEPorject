<template>
  <gree-view>
    <gree-page
      no-navbar
      class="page-home"
    >
      <div class="page-header">
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
      </div>
      <div class="page-main">
        <!-- 居中内容提示 -->
        <div
          class="main-tips"
          v-if="lists.length === 0"
        >
          <h3>{{ $language('home.alarm') }}</h3>
        </div>
        <div
          class="scroll-view-wrapper"
          v-else-if="lists.length > 0"
        >
          <gree-scroll-view
            ref="scrollView"
            :scrolling-x="false"
            manual-init
            :bouncing="false"
            @end-reached="onEndReached"
          >
            <gree-list>
              <gree-list-item
                :title="item.event_time"
                v-for="(item, index) in lists"
                :key="index"
              >
                <div
                  slot="after"
                  v-if="item.value === '1'"
                >Sensor On</div>
                <div
                  slot="after"
                  v-else
                >Sensor Off</div>
              </gree-list-item>
            </gree-list>
            <gree-scroll-view-more
              slot="more"
              loading-text="加载更多..."
              finished-text="已全部加载"
              :is-finished="isFinished"
            ></gree-scroll-view-more>
          </gree-scroll-view>
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
  ScrollView,
  ScrollViewMore
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  closePage,
  editDevice,
  changeBarColor,
  getMsgRequest
} from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    [Icon.name]: Icon,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
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
        color = '#446faf';
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
  mounted() {
    getMsgRequest()
      .then(res => {
        const __res = JSON.parse(res);
        console.log(__res);
        return res;
      })
      .catch(err => {
        err;
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
      editDevice(this.mac);
    },
    jumpTo(path) {
      this.$router.push(path);
    },
    close() {
      this.$refs.custom_notice_bar.$el.remove();
    }
  }
};
</script>
