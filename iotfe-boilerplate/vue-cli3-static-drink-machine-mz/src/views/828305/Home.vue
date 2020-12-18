<template>
  <gree-view bg-color="#5BB5F3">
    <gree-page
      no-navbar
      class="page-home"
    >
      <div
        class="page-header"
      >
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
          :right-options="{showMore: true}"
          @on-click-more="moreInfo"
        >{{ devname }}</gree-header>
        <!-- 模式滑轮 -->
        <div
          class="mode-carousel"
        >
          <span class="rotate-mode">{{ modeAll[forModeVal(mode,state)].name }}</span>
          <!-- <span>{{ forModeVal(mode,state) }}</span> -->
        </div>  
        <div class="custom-notice-bar-error">
          <!-- <gree-notice-bar>总净水量 &nbsp;&nbsp;&nbsp; {{ TotalPureWater }}L</gree-notice-bar> -->
          <gree-notice-bar 
            icon="warning" 
            v-show="ErrorCode1 || ErrorCode2 || ErrorCode3">
            <a 
              class="notice-errors" 
              @click="errorDetails"> {{ this.$language('error.error') }}</a>
          </gree-notice-bar>
        </div>
      </div>
      <!-- 中间及下面 -->
      <div class="page-main">
        <gree-list
        >
          <gree-list-item 
            v-for="(item,index) in contentList" 
            :key="index"
            :title="item.name" 
            :after="item.value"
            :style="{color: item.status ? '#404657':'red'}"
          >
            <img 
              slot="header"
              src="../../assets/img/help.png" 
              @click="question(item)">
          </gree-list-item>
        </gree-list>
        <gree-dialog
          class="dialog-extend"
          ref="trigger"
          :title="item.name"
          :closable="false"
          v-model="Dialog.open"
          :btns="Dialog.btns"
          mask-closable
        >{{ item.desc }}</gree-dialog>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import {
  Header,
  List,
  Item,
  // Block,
  Icon,
  // ActivityIndicator,
  // ScrollView,
  // ScrollViewMore,
  NoticeBar,
  Dialog
  // ProgressBar,
  // Popup,
  // Button
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
// closePage,
// editDevice,
// changeBarColor,
import {
  changeBarColorPlugin,
  closePagePlugin,
  editDevicePlugin
} from '../../api/utils';
import homeConfig from '../../mixins/config/home';
// import Carousel from '../../components/Carousel';

export default {
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    // [Block.name]: Block,
    [Icon.name]: Icon,
    // [ActivityIndicator.name]: ActivityIndicator,
    // [ScrollView.name]: ScrollView,
    // [ScrollViewMore.name]: ScrollViewMore,
    [NoticeBar.name]: NoticeBar,
    [Dialog.name]: Dialog
    // [ProgressBar.name]: ProgressBar,
    // [Popup.name]: Popup,
    // [Button.name]: Button,
    // Carousel
  },
  mixins: [homeConfig],
  data() {
    return {
      percent: 90,
      isPopupShow: {},
      currentObject: {},
      currentMode: '',
      Dialog: {
        open: false,
        btns: [
          {
            text: '知道了'
          }
        ]
      },
      item: {} // 点击传的对象
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      mode: state => state.dataObject.mode,
      state: state => state.dataObject.state,
      ErrorCode1: state => state.dataObject.ErrorCode1,
      ErrorCode2: state => state.dataObject.ErrorCode2,
      ErrorCode3: state => state.dataObject.ErrorCode3
    }),
    /**
     * @description 主页面下根据开关状态更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      this.Switch ? (color = '#51A9F9') : (color = '#AEB2B6');
      changeBarColorPlugin(color);
      return color;
    }
  },
  watch: {
    mode(newValue) {
      this.forModeVal(newValue, this.state);
      // this.setCarouselId('modeCarousel', this.currentMode);
    },
    state(newValue) {
      this.forModeVal(this.mode, newValue);
    }
  },
  // created() {
  //   if (typeof window !== 'undefined') {
  //     document.addEventListener('click', this.clickedOutside);
  //   }
  // },
  // beforeDestroy() {
  //   if (typeof window !== 'undefined') {
  //     document.removeEventListener('click', this.clickedOutside);
  //   }
  // },
  mounted() {
    // this.$refs.modeCarousel.redraw();
    // this.forModeVal(this.mode, this.state);
    // this.setCarouselId('modeCarousel', this.currentMode);
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
      closePagePlugin();
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevicePlugin(this.mac);
    },
    errorDetails() {
      this.$router.push({ name: 'error' });
    },
    // setCarouselId(name, id) {
    //   this.$refs[name].setId(id);
    //   console.log(name, id);
    // },
    // 根据协议值判断是哪个模式
    forModeVal(mode, state) {
      let currentMode = '';
      this.modeAll.forEach((item, index) => {
        if (item.mode === mode && item.state === state) {
          currentMode = index;
        } else if (item.mode === mode && item.state === -1) {
          currentMode = index;
        }
      });
      return currentMode;
    },
    question(item) {
      this.item = item;
      this.Dialog.open = true;
      this.Dialog.btns[0].text = `正常范围:${item.Range}`;
    }
    /**
     *  @description 如果点击外部，关闭下拉菜单
     */
    // clickedOutside(event) {
    //   if (!this.isInWhiteList(event.target)) {
    //     this.Dialog.open = false;
    //   }
    // },
    /**
     * @description 白名单，单独设置点击时不关闭时
     */
    // isInWhiteList(el) {
    //   if (el === this.$refs.trigger) {
    //     return true;
    //   }
    //   if (this.$refs.trigger !== undefined) {
    //     const children = this.$refs.trigger;
    //     for (const child of children) {
    //       if (el === child) {
    //         return true;
    //       }
    //     }
    //   }
    //   return false;
    // }
  }
};
</script>

