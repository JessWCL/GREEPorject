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
            <gree-dropdown-item @click.native="jumpTo('Setting')">Alert Settings</gree-dropdown-item>
          </gree-dropdown>
        </gree-header>
        <div class="battery-remind">
          <img :src="alarmImg" />
          <h3>
            {{ battery_percentage }}% Battery
            <i
              class="status"
              :class="{'full': battery_percentage > 10}"
            ></i>
          </h3>
        </div>
        <!-- 警告 -->
        <gree-notice-bar
          ref="custom_notice_bar"
          v-if="temper_alarm"
        >
          <img
            src="@/assets/img/warning.png"
            slot="left"
          />
          <span>{{ $language("home.warning") }}</span>
          <a
            href="javascript:;"
            @click="close"
          >Turn Off.</a>
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
              loading-text="More in loading..."
              finished-text="All loaded"
              :is-finished="isFinished"
            ></gree-scroll-view-more>
          </gree-scroll-view>
        </div>
      </div>
      <div v-show="false">{{ watersensor_state }} - {{ battery_percentage }} - {{ temper_alarm }}</div>
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
import dayjs from 'dayjs';
import { mapState, mapMutations } from 'vuex';
import {
  closePage,
  editDevice,
  tuyaGetDevLogs
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
      isWarningShow: false,
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
    watersensor_state() {
      return this.dataObject.status[0].value;
    },
    battery_percentage() {
      return this.dataObject.status[1].value;
    },
    temper_alarm() {
      return this.dataObject.status[2].value;
    }
  },
  watch: {
    temper_alarm: {
      handler(newVal) {
        if (newVal === 'true') {
          this.alarmImg = require('@/assets/img/alarm_on.png');
        } else {
          this.alarmImg = require('@/assets/img/alarm_off.png');
        }
      },
      immediate: true
    }
  },
  mounted() {
    tuyaGetDevLogs(this.mac)
      .then(res => {
        const __res = JSON.parse(res);
        if (__res.code === 200) {
          this.lists = __res.message.result.logs;
          this.lists.forEach((item, index) => {
            if (dayjs().isSame(dayjs(new Date(item.event_time)), 'day')) {
              this.lists[index].event_time = `Today ${dayjs(
                new Date(item.event_time)
              ).format('HH:mm:ss')}`;
            } else {
              this.lists[index].event_time = dayjs(
                new Date(item.event_time)
              ).format('YYYY/MM/DD HH:mm:ss');
            }
          });
          this.lists = this.lists.filter(
            item => item.code === 'watersensor_state'
          );
          setTimeout(() => {
            this.$refs.scrollView.init();
          }, 0);
        }
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
      editDevice(this.mac);
    },
    jumpTo(path) {
      this.$router.push(path);
    },
    close() {
      this.$refs.custom_notice_bar.$el.style.display = 'none';
    },
    onEndReached() {
      if (this.isFinished) {
        return;
      }
      setTimeout(() => {
        this.isFinished = true;
        this.$refs.scrollView.finishLoadMore();
      }, 50);
    }
  }
};
</script>
