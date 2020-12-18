<template>
  <gree-view :bg-color="statusBarColor">
    <gree-page no-navbar class="page-home">
      <div class="page-header" :style="{ backgroundImage: 'url(' + head_bg + ')' }">
        <gree-header
          theme="transparent"
          :title="devname"
          :left-options="{ preventGoBack: true }"
          @on-click-back="goBack"
          :right-options="{ showMore: true }"
          @on-click-more="moreInfo"
        />
        <div class="battery-remind" v-if="battery_percentage >= 0">
          <img :src="alarmImg" />
          <h3>
            {{ $language('home.dumpEnergy') }} {{ battery_percentage }}%
            <div class="status" :class="{ low: battery_percentage <= lowBatteryLimit }">
              <div class="acid" :style="{ height: battery_percentage + '%' }"></div>
            </div>
          </h3>
        </div>
        <gree-activity-indicator class="battery-remind-loading" type="carousel" :size="10" color="white" v-else />
      </div>
      <div class="page-main">
        <gree-block v-if="isLoading">
          <gree-activity-indicator :size="20">{{ $language('home.loading') }}</gree-activity-indicator>
        </gree-block>
        <section v-else>
          <div class="main-tips" v-if="lists.length === 0">
            <h3>{{ $language('home.alarm') }}</h3>
          </div>
          <div class="scroll-view-wrapper" v-else-if="lists.length > 0">
            <gree-scroll-view ref="scrollView" :scrolling-x="false" manual-init :bouncing="false" @end-reached="onEndReached">
              <gree-list contacts-list>
                <gree-list-item :title="item.event_time" v-for="(item, index) in lists" :key="index">
                  <div slot="after" v-if="item.value === '1'">发生报警</div>
                  <div slot="after" v-else>报警解除</div>
                </gree-list-item>
              </gree-list>
              <gree-scroll-view-more
                slot="more"
                :loading-text="$language('home.loadMore')"
                :finished-text="$language('home.loadFinished')"
                :is-finished="isFinished"
              />
            </gree-scroll-view>
          </div>
        </section>
      </div>
      <div v-show="false">{{ smoke_sensor_state }} - {{ battery_percentage }} - {{ ColorChange }}</div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, List, Item, Block, Icon, ActivityIndicator, ScrollView, ScrollViewMore, Popup, Toast } from 'gree-ui';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { mapState, mapMutations } from 'vuex';
import { closePage, tuyaDeviceMore, tuyaGetDevLogs, changeBarColor } from '../../../../static/lib/PluginInterface.promise';

dayjs.locale('zh-cn'); // 全局使用简体中文

export default {
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    [Block.name]: Block,
    [Icon.name]: Icon,
    [ActivityIndicator.name]: ActivityIndicator,
    [ScrollView.name]: ScrollView,
    [ScrollViewMore.name]: ScrollViewMore,
    [Popup.name]: Popup
  },
  data() {
    return {
      statusBarColor: '#5a89c5',
      lowBatteryLimit: 20,
      alarmImg: '',
      lists: [],
      isLoading: true,
      isFinished: false
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac
    }),
    head_bg() {
      const bg = require('@/assets/img/bg_header.png');
      return bg;
    },
    power_off_bg() {
      const bg = require('@/assets/img/bg_off.png');
      return bg;
    },
    smoke_sensor_state() {
      return this.dataObject.properties[0].value;
    },
    battery_percentage() {
      return this.dataObject.properties[1].value;
    },
    /**
     * @description 主页面下更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      if (this.$route.name === 'Home') {
        color = this.statusBarColor;
      }
      color ? changeBarColor(color) : '';
      return color;
    }
  },
  watch: {
    smoke_sensor_state: {
      handler(newVal) {
        if (newVal === '1') {
          this.alarmImg = require('@/assets/img/alarm_on.png');
        } else {
          this.alarmImg = require('@/assets/img/alarm_off.png');
        }
      },
      immediate: true
    }
  },
  mounted() {
    const startTime = dayjs(new Date())
      .subtract(1, 'weeks')
      .valueOf();
    const endTime = dayjs(new Date()).valueOf();
    const logType = '7';
    const logSize = '50';
    tuyaGetDevLogs(this.mac, startTime, endTime, logType, logSize)
      .then(res => {
        const __res = JSON.parse(res);
        if (__res.code === 200) {
          this.lists = __res.message.result.logs.filter(item => item.code === 'smoke_sensor_state');
          if (this.lists.length > 0) {
            this.lists.forEach((item, index) => {
              if (dayjs().isSame(item.event_time, 'day')) {
                this.lists[index].event_time = `今天 ${dayjs(item.event_time).format('H:mm:ss')}`;
                this.lists[index].today = true;
              } else {
                this.lists[index].event_time = dayjs(item.event_time).format('YYYY/MM/DD H:mm:ss');
                this.lists[index].today = false;
              }
            });
            setTimeout(() => {
              this.$refs.scrollView.init();
            }, 0);
          }
        } else {
          Toast.failed('Api Error');
        }
        this.isLoading = false;
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
      tuyaDeviceMore(this.mac);
    },
    close() {
      this.$refs.custom_notice_bar.$el.style.display = 'none';
    },
    onEndReached() {
      if (this.isFinished) {
        return;
      }
      this.isFinished = true;
      this.$refs.scrollView.finishLoadMore();
    }
  }
};
</script>
