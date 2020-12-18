<template>
  <gree-view :bg-color="statusBarColor">
    <gree-page no-navbar class="page-home">
      <div class="page-header" :style="{ backgroundImage: 'url(' + head_bg + ')' }">
        <gree-header
          theme="transparent"
          :title="devname"
          :left-options="{ preventGoBack: true }"
          @on-click-back="goBack"
          :right-options="{ showMore: !functype }"
          @on-click-more="moreInfo"
        />
        <div :class="['status-remind', WorkState === 2 ? 'alarm' : '']" v-if="[1, 2].includes(WorkState)">
          <img :src="modeImg" />
          <h3>{{ modeMsg }}</h3>
        </div>
      </div>
      <div class="page-main">
        <template v-if="WorkState === 1">
          <gree-block class="loading" v-if="isLoading">
            <gree-activity-indicator :size="20">{{ $language('home.loading') }}</gree-activity-indicator>
          </gree-block>
          <!-- 暂无报警记录 -->
          <div class="no-record" v-else-if="!isLoading && Object.keys(lists).length === 0">
            <h3>{{ $language('home.noAlarm') }}</h3>
          </div>
          <!-- 报警列表 -->
          <div class="gree-child-scroll-view" v-else-if="!isLoading && Object.keys(lists).length > 0">
            <div class="scroll-view-wrapper">
              <gree-scroll-view ref="scrollView" :scrolling-x="false" manual-init :bouncing="false" @end-reached="onEndReached">
                <gree-list contacts-list no-hairlines no-hairlines-between v-for="(item, index) in lists" :key="index">
                  <gree-block-header>{{ $options.filters.dateformat(index, 'MM月DD日') }}</gree-block-header>
                  <gree-list-item v-for="(v, k) in item" :key="k" :header="$options.filters.timeformat(v.ctime)" :title="v.title">
                    <div slot="after">
                      <div class="item-tail" />
                      <div class="item-head" />
                    </div>
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
          </div>
        </template>
        <!-- 报警时间提示 -->
        <gree-block v-else-if="WorkState === 2">
          <gree-notice-bar>{{ $language('home.alarmWarning') }}</gree-notice-bar>
          <gree-row>
            <gree-col>{{ $language('home.alarmTime') }}</gree-col>
          </gree-row>
          <gree-row>
            <gree-col>
              <gree-timer ref="timer" :time="time" />
            </gree-col>
          </gree-row>
        </gree-block>
      </div>
    </gree-page>
    <!-- 底部按钮 -->
    <gree-toolbar position="bottom" no-hairline v-if="WorkState === 2">
      <!-- 取消报警按钮 -->
      <gree-block>
        <gree-button type="info" block @click="doHandle">{{ $language('home.alarmCancel') }}</gree-button>
      </gree-block>
      <!-- 3个功能按钮 -->
      <gree-row class="hidden">
        <gree-col v-for="(item, index) in FootList" :key="index" @click.native="setFunction(index)">
          <div class="icon">
            <img :src="require('@/assets/img/' + item.ImgName + '.png')" />
          </div>
          <h3>{{ $language(item.Name) }}</h3>
        </gree-col>
      </gree-row>
    </gree-toolbar>
    <div v-show="false">{{ ColorChange }}</div>
  </gree-view>
</template>

<script>
import {
  Header,
  Block,
  BlockHeader,
  List,
  Item,
  Row,
  Col,
  Button,
  Icon,
  ToolBar,
  NoticeBar,
  ActivityIndicator,
  ScrollView,
  ScrollViewMore,
  Toast
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import dayjs from 'dayjs';
import groupBy from 'lodash/groupBy';
import timer from '@/components/timer';
import homeConfig from '@/mixins/config/80260/home';
import { closePage, editDevice, changeBarColor, getAIWarningRecordsList } from '../../../../static/lib/PluginInterface.promise';
// import mock from '@/api/80260/mock'; // 模拟数据

const ALARMMODEIMG = require('@/assets/img/ic_in_the_alarm_2.png'); // 报警图标
const ALARMNORMALIMG = require('@/assets/img/ic_ai_perceptron.png'); // 正常图标

export default {
  components: {
    [Header.name]: Header,
    [Block.name]: Block,
    [BlockHeader.name]: BlockHeader,
    [List.name]: List,
    [Item.name]: Item,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [ToolBar.name]: ToolBar,
    [NoticeBar.name]: NoticeBar,
    [ActivityIndicator.name]: ActivityIndicator,
    [ScrollView.name]: ScrollView,
    [ScrollViewMore.name]: ScrollViewMore,
    'gree-timer': timer
  },
  mixins: [homeConfig],
  data() {
    return {
      statusBarColor: '#578CD5',
      head_bg: require('@/assets/img/bg_alarm.png'),
      modeImg: '',
      modeMsg: '',
      time: 0,
      /* 报警记录 */
      isLoading: true,
      lists: [],
      lastUpdate: '',
      isFinished: false
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      WorkState: state => state.dataObject.WorkState,
      AlarmCancel: state => state.dataObject.AlarmCancel,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac
    }),
    /**
     * @description 主页面下更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      if (this.$route.name === 'Home') {
        color = '#578CD5';
      }
      color ? changeBarColor(color) : '';
      return color;
    }
  },
  watch: {
    WorkState: {
      handler(val) {
        if (val === 2) {
          this.modeImg = ALARMMODEIMG;
          this.modeMsg = this.$language('home.mode.alarm');
          this.time = this.dataObject.AlarmTime * 1000;
        } else if (val === 1) {
          this.modeImg = ALARMNORMALIMG;
          this.modeMsg = this.$language('home.mode.normal');
        }
      },
      immediate: true
    }
  },
  created() {
    // this.lists = mock[0].records; // 模拟数据

    const cnt = 500;
    this.lastUpdate = dayjs().format('YYYY-MM-DD HH:mm:ss');

    getAIWarningRecordsList(this.mac, cnt, this.lastUpdate)
      .then(res => {
        const __res = JSON.parse(res);
        console.log('getAIWarningRecordsList:', __res);
        if (__res.r === 200) {
          this.lists = __res.records;
          if (this.lists.length > 0) {
            this.lists.forEach((item, index) => {
              this.lists[index].ctime = dayjs(item.ctime)
                .add(8, 'hours')
                .format('YYYY/MM/DD H:mm:ss');
            });
            this.lists = groupBy(this.lists, detail => {
              return dayjs(detail.ctime).format('YYYY-MM-DD');
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
    doHandle() {
      this.$refs.timer.stop();
      this.setDataObject({ WorkState: 1, AlarmCancel: 1 });
      this.sendCtrl({ WorkState: 1, AlarmCancel: 1 });
    },
    /**
     * @description 点击底部功能列表
     */
    setFunction(val) {
      switch (val) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          break;
        default:
          break;
      }
    },
    onEndReached() {
      if (this.isFinished) {
        return;
      }
      setTimeout(() => {
        this.isFinished = true;
        this.$refs.scrollView.finishLoadMore();
      }, 1000);
    }
  }
};
</script>
