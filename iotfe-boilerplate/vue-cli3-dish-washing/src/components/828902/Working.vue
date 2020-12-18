<template>
  <div class="working">
    <!-- 预约 start -->
    <gree-block
      class="time-range"
      v-show="TmrOn"
    >预约完成时间</gree-block>
    <gree-block
      class="time"
      v-show="TmrOn"
    >
      <span
        :class="{
          // 'tomorrow': isTomorrow,
          // 'today': isToday
      }">{{ TmrTxt }}</span>
    </gree-block>
    <gree-row v-show="TmrOn">
      <gree-col>
        <gree-button
          @click.native="handleCancle"
          inline
          round
          type="default"
        >取消</gree-button>
      </gree-col>
    </gree-row>
    <!-- 预约 end -->
    <!-- 工作 start -->
    <canvas-dash-board
      v-show="Wash"
      :content="content"
      :unit="unit"
      :desc="desc"
      :percent="percent"
      :gradient-color="gradientColor"
      :pause="isPause"
      :wash-done="isWashDone"
    >
      <template v-if="WashDone === 1">
        <span>已完成</span>
      </template>
      <template v-else>
        <span>
          {{ RmTmrHour }}
        </span>
        <span class="unit">小时</span>
        <span>
          {{ RmTmrMin }}
        </span>
        <span class="unit">分钟</span>
      </template>
    </canvas-dash-board>
    <gree-row v-show="Wash && !isWashDone">
      <gree-col>
        <gree-button
          @click.native="handleCancle"
          inline
          round
          type="default"
        >取消</gree-button>
      </gree-col>
      <gree-col>
        <gree-button
          @click.native="togglePause"
          inline
          round
          type="default"
        >{{ pauseTxt }}</gree-button>
      </gree-col>
    </gree-row>
    <gree-row v-show="isWashDone">
      <gree-col>
        <gree-button
          @click.native="handleWashDone"
          inline
          round
          type="default"
        >{{ $language('home.confirm') }}</gree-button>
      </gree-col>
    </gree-row>
    <!-- 工作 end -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { Block, Button, Row, Col, Dialog } from 'gree-ui';
import * as types from '@/store/types';
import CanvasDashBoard from './CanvasDashBoard';

export default {
  components: {
    [Button.name]: Button,
    [Block.name]: Block,
    [Row.name]: Row,
    [Col.name]: Col,
    CanvasDashBoard
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      modType: state => state.cache.modType,
      DataObject: state => state.DataObject,
      Wash: state => state.DataObject.Wash,
      TmrOn: state => state.DataObject.TmrOn,
      RmTmrHour: state => state.DataObject.RmTmrHour,
      RmTmrMin: state => state.DataObject.RmTmrMin,
      TmrHour: state => state.DataObject.TmrHour,
      TmrMin: state => state.DataObject.TmrMin,
      PauseStart: state => state.DataObject.PauseStart,
      WashDone: state => state.DataObject.WashDone,
      Purifier: state => state.DataObject.Purifier,
      PurifierTime: state => state.DataObject.PurifierTime,
    }),

    isTomorrow() {
      const { TmrHour, TmrMin } = this.DataObject;
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const currentTime = hour * 60 + minute;
      const customerTime = TmrHour * 60 + TmrMin;
      if (currentTime > customerTime) {
        return true;
      }
      return false;
    },

    isToday() {
      const { TmrHour, TmrMin } = this.DataObject;
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const currentTime = hour * 60 + minute;
      const customerTime = TmrHour * 60 + TmrMin;
      if (currentTime <= customerTime) {
        return true;
      }
      return false;
    },

    percent() {
      const { RmTmrHour, RmTmrMin } = this;
      let ret = 0;
      const RmTmrTime = (RmTmrHour * 60 + RmTmrMin);
      // ret = RmTmrTime / 100;
      return ret;
    },

    isPause() {
      const { PauseStart } = this;
      return PauseStart === 0;
    },

    pauseTxt() {
      const { isPause } = this;
      return isPause ? '继续' : '暂停';
    },

    isWashDone() {
      const { WashDone } = this;
      return WashDone === 1;
    },

    gradientColor() {
      const { modType } = this;
      const blueColor = ['#2dd8f1', '#1184ef']; // 蓝色
      const yellowColor = ['#ffda89', '#f79942']; // 黄色
      // const orangeColor = ['#f1ad26', '#f16926']; // 橙色
      switch (modType) {
        case 0:
          return blueColor;
        case 1:
          return yellowColor;
        case 2:
          return blueColor;
        default:
          break;
      }
      return [];
    },

    TmrTxt() {
      const { TmrHour, TmrMin } = this.DataObject;
      const TmrHourStr = TmrHour > 9 ? `${TmrHour}` : `0${TmrHour}`;
      const TmrMinStr = TmrMin > 9 ? `${TmrMin}` : `0${TmrMin}`;
      const ret = `${TmrHourStr}:${TmrMinStr}`;
      return ret;
    },

    content() {
      const { RmTmrHour, RmTmrMin, WashDone } = this.DataObject;
      if (typeof RmTmrHour === 'string' || typeof RmTmrMin === 'string') {
        return `${RmTmrHour}${RmTmrMin}`;
      }
      const ret = `${RmTmrHour * 60 + RmTmrMin}`;
      if (WashDone === 1) {
        return '已完成';
      } else if (ret === '0') {
        return '--';
      }
      return ret;
    },

    unit() {
      const { Purifier } = this;
      if (Purifier === 1) {
        return '小时';
      }
      return '分钟';
    },

    desc() {
      const { WorkStatus } = this.DataObject;
      const { isPause } = this;
      const txt = {
        1: '进水中',
        2: '洗涤中',
        3: '洗涤加热中',
        4: '排水中',
        5: '烘干中',
        6: '保洁中'
      };
      let ret = '--';
      if (isPause) {
        ret = '暂停中';
      } else if (txt[WorkStatus]) {
        ret = txt[WorkStatus];
      }
      return ret;
    }
  },

  mounted() {
    // const { Wash, Mod } = this.DataObject;
    // const isQuery = Wash === 1 && Mod === 1;
    // 所有模式都马上查一包数据
    setTimeout(() => {
      this.getWorkDeviceStates();
    }, 3000);
  },

  destroyed() {
    Dialog.closeAll();
  },

  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL,
      getWorkDeviceStates: types.GET_WORK_DEVICE_STATES,
    }),

    handleCancle() {
      Dialog.confirm({
        title: '提示',
        content: '请确定是否取消当前工作',
        confirmText: '确定',
        onConfirm: () => {
          this.setDataObject({ Wash: 0, TmrOn: 0, PauseStart: 0 });
          this.sendCtrl({ Wash: 0, TmrOn: 0, PauseStart: 0 });
        },
        cancelText: '取消',
        onCancel: () => {}
      });
    },

    togglePause() {
      const { PauseStart: _PauseStart } = this;
      const PauseStart = _PauseStart === 0 ? 1 : 0;
      this.setDataObject({ PauseStart });
      this.sendCtrl({ PauseStart });
    },

    handleWashDone() {
      const WashDone = 0;
      const Wash = 0;
      this.setDataObject({ WashDone, Wash });
      this.sendCtrl({ WashDone, Wash });
    },
  }
};
</script>

<style lang='scss'>
</style>
