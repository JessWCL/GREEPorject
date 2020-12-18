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
          <Carousel
            keep-alive
            ref="modeCarousel"
            @currentChange="setMod"
            @touchstart.native="showTip"
            :prop-data="ModeImg"
            :options="ModeOptions"
          />
          <span class="rotate-mode">{{ modeAll[currentMode].name }}</span>
        </div>  
        <div class="custom-notice-bar-error">
          <gree-notice-bar>总净水量 &nbsp;&nbsp;&nbsp; {{ TotalPureWater }}L</gree-notice-bar>
          <gree-notice-bar 
            icon="warning" 
            v-show="ErrorCode1||JFerr">
            <a 
              class="notice-errors" 
              @click="errorDetails"> {{ this.$language('error.error') }}</a>
          </gree-notice-bar>
        </div>
      </div>
      <!-- 中间及下面 -->
      <div class="page-main">
        <div class="filter-tips">
          <span>{{ this.$language('home.tips') }}</span>
        </div>
        <div class="progress-main">
          <gree-progress-bar  
            @click.native="showPopUp('bottom',item)"
            :class="[item.background ? '' : 'progress-color']"
            vertical
            :percent="item.val"
            v-for="(item, index) in NewFilter" 
            :key="index"
          >
            <span>{{ item.val }}%</span>
          </gree-progress-bar> 
        </div>
        <div class="progress-text">
          <p             
            v-for="(item, index) in NewFilter" 
            :key="index">{{ item.name }}</p>
        </div>
      </div>
      <gree-popup
        v-model="isPopupShow.bottom"
        position="bottom"
      >
        <div class="popup-main">
          <div class="popup-title">
            <span>{{ currentObject.name }}</span>     
          </div>
          <div class="popup-content">
            <div class="popup-content-left">
              <gree-progress-bar 
                :class="[currentObject.background ? '' : 'progress-color']"
                vertical
                :percent="currentObject.val"
              >
                <span>{{ currentObject.val }}%</span>
              </gree-progress-bar>
            </div>
            <div class="popup-content-right">
              <ul>
                <li>预计可使用{{ currentObject.LifeFilterDays }}天。</li>
                <li v-html="currentObject.text"/>
              </ul>
            </div>
            <gree-button 
              type="positive" 
              @click="buy(currentObject.url)">更换滤芯</gree-button>
          </div>
        </div>
      </gree-popup>
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
  ActivityIndicator,
  ScrollView,
  ScrollViewMore,
  NoticeBar,
  ProgressBar,
  Popup,
  Button
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
// closePage,
// editDevice,
// changeBarColor,
import {
  changeBarColorPlugin,
  closePagePlugin,
  editDevicePlugin,
  toWebPagePlugin
} from '../../api/utils';
import homeConfig from '../../mixins/config/home';
import Carousel from '../../components/Carousel';

export default {
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    // [Block.name]: Block,
    [Icon.name]: Icon,
    [ActivityIndicator.name]: ActivityIndicator,
    [ScrollView.name]: ScrollView,
    [ScrollViewMore.name]: ScrollViewMore,
    [NoticeBar.name]: NoticeBar,
    [ProgressBar.name]: ProgressBar,
    [Popup.name]: Popup,
    [Button.name]: Button,
    Carousel
  },
  mixins: [homeConfig],
  data() {
    return {
      percent: 90,
      isPopupShow: {},
      currentObject: {},
      currentMode: ''
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      WorkStatus(state) {
        this.forModeVal(state.dataObject.WorkStatus);
        return state.dataObject.WorkStatus;
      },
      TotalPureWater: state => state.dataObject.TotalPureWater,
      ErrorCode1: state => state.dataObject.ErrorCode1,
      ErrorCode2: state => state.dataObject.ErrorCode2,
      JFerr: state => state.dataObject.JFerr,
      NewFilter(state) {
        this.filters.map((item, index) => {
          this.filters[index].val =
            state.dataObject[`LifeTimeFilter${index + 1}`];
          this.filters[index].LifeFilterDays =
            state.dataObject[`LifeFilterDays${index + 1}`];
          this.filters[index].name = this.filterKinds[
            state.dataObject[`FilterKind${index + 1}`] - 1
          ];
          switch (index) {
            case 0:
              if (this.filters[index].val > 30) {
                this.filters[index].background = true;
              } else {
                this.filters[index].background = false;
              }
              break;
            case 1:
              if (this.filters[index].val > 10) {
                this.filters[index].background = true;
              } else {
                this.filters[index].background = false;
              }
              break;
            case 2:
              if (this.filters[index].val > 5) {
                this.filters[index].background = true;
              } else {
                this.filters[index].background = false;
              }
              break;
            case 3:
              if (this.filters[index].val > 5) {
                this.filters[index].background = true;
              } else {
                this.filters[index].background = false;
              }
              break;
            default:
              break;
          }
          return false;
        });
        return this.filters;
      }
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
    WorkStatus(newValue) {
      this.forModeVal(newValue);
      this.setCarouselId('modeCarousel', this.currentMode);
    }
  },
  mounted() {
    this.$refs.modeCarousel.redraw();
    this.forModeVal(this.WorkStatus);
    this.setCarouselId('modeCarousel', this.currentMode);
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
    setMod(val) {
      this.setDataObject({ WorkStatus: this.modeAll[val].value });
      this.sendCtrl({ WorkStatus: this.modeAll[val].value });
      console.log(this.modeAll[val].value);
      // if (val) {
      //   this.ModeOptions.showNumOrImg = false;
      // }else {
      //   this.ModeOptions.showNumOrImg = true;
      // }
    },
    showTip() {},
    showPopUp(type, object) {
      this.currentObject = object;
      this.$set(this.isPopupShow, type, true);
    },
    hidePopUp(type) {
      this.$set(this.isPopupShow, type, false);
    },
    hidePopUp2(type) {
      this.$set(this.isPopupShow, type, false);
    },
    buy(url) {
      // window.location.href = url;
      toWebPagePlugin(url, this.$language('home.buyurl')); // 带有返回
    },
    errorDetails() {
      this.$router.push({ name: 'error' });
    },
    setCarouselId(name, id) {
      this.$refs[name].setId(id);
      console.log(name, id);
    },
    // 根据协议值判断是哪个模式
    forModeVal(val) {
      this.modeAll.map((item, index) => {
        if (item.value === val) {
          this.currentMode = index;
        }
        return false;
      });
    }
  }
};
</script>
