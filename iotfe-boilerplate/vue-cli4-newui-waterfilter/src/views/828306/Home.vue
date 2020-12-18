<template>
  <div :bg-color="statusBarColor">
    <gree-page class="page-home">
      <!-- 头部 -->
      <div class="page-header">
        <gree-header
          id="header"
          style="background-color: transparent !important;"
          :left-options="{ preventGoBack: true }"
          @on-click-back="goBack"
          :right-options="{ showMore: true }"
          @on-click-more="moreInfo"
          >{{ devname }}</gree-header
        >
      </div>
      <!-- body -->
      <div class="page-main">
        <!-- 故障和提醒 -->
        <div class="fault-and-reminder" v-if="Er">
          <!-- 单故障 -->
          <div v-if="errMsg.length > 0 && reminderMsg.length === 0" class="is-fault" @click="errorPage(0)">
            <div class="is-fault-icon">
              <!-- <img :src="ErrorIcon" /> -->
              <img src="../../assets/img/ic_error.png" />
            </div>
            <div class="is-fault-text">
              <gree-marquee>
                <gree-marquee-item v-for="(item, index) in errMsg" :key="index">{{ item }}</gree-marquee-item>
              </gree-marquee>
              <!-- {{errMsg[0]}} -->
            </div>
            <div class="is-fault-icon">
              <gree-icon name="arrow-right" size="lg" color="#404657"></gree-icon>
            </div>
          </div>
          <!-- 单提醒 -->
          <div v-else-if="errMsg.length === 0 && reminderMsg.length > 0" class="is-reminder">
            <div class="is-reminder-icon">
              <!-- <img :src="ReminderIcon" /> -->
              <img src="../../assets/img/ic_reminder.png" />
            </div>
            <div class="is-reminder-text" @click="errorPage(1)">
              <gree-marquee>
                <gree-marquee-item v-for="(item, index) in reminderMsg" :key="index">{{ item }}</gree-marquee-item>
              </gree-marquee>
            </div>
            <div class="is-reminder-icon" @click="clearReminder">
              <gree-icon name="fail" size="md" color="#9c9c9c"></gree-icon>
            </div>
          </div>
          <!-- 故障和提醒都有 -->
          <div v-else-if="errMsg.length > 0 && reminderMsg.length > 0" class="is-all">
            <div class="is-all-item">
              <div class="is-all-item-icon">
                <img :src="ErrorIcon" />
              </div>
              <div class="is-all-item-text" @click="errorPage(0)">
                <gree-marquee>
                  <gree-marquee-item v-for="(item, index) in errMsg" :key="index">{{ item }}</gree-marquee-item>
                </gree-marquee>
              </div>
              <div class="is-all-item-icon" @click="errorPage(0)">
                <gree-icon name="arrow-right" size="lg" color="#404657"></gree-icon>
              </div>
            </div>
            <div class="is-all-item">
              <div class="is-all-item-icon">
                <img :src="ReminderIcon" />
              </div>
              <div class="is-all-item-text" @click="errorPage(1)">
                <gree-marquee>
                  <gree-marquee-item v-for="(item, index) in reminderMsg" :key="index">{{ item }}</gree-marquee-item>
                </gree-marquee>
              </div>
              <div class="is-all-item-icon" @click="clearReminder">
                <gree-icon name="fail" size="md" color="#404657"></gree-icon>
              </div>
            </div>
          </div>
        </div>

        <div class="img-ball">
          <img
            src="../../assets/img/diban_img.png"
            :style="{ width: lottieRadius / 1.228 + 'px', height: lottieRadius / 1.15 + 'px' }"
          />
        </div>
        <!-- 动效 -->
        <div class="layer" :style="{ width: lottieRadius / 1.79 + 'px', height: lottieRadius / 1.79 + 'px' }">
          <div class="rotate -one"></div>
          <div class="rotate -two"></div>
          <div class="play"></div>
        </div>
        <!-- 内部字样 -->
        <div class="info" :style="{ height: lottieRadius / 1.88 + 'px' }">
          <!-- 模式字样 -->
          <div class="model">
            <span>{{ workStatus }}</span>
          </div>
          <!-- 制水量 -->
          <div class="total">
            今日制水量
            <span class="number">{{ TotalPureWater }}L</span>
          </div>
        </div>
      </div>
      <!-- foot -->
      <div class="page-foot">
        <div class="gree-example-child-progress">
          <!-- 环形进度条 -->
          <div class="filter-cycle">
            <gree-progress
              v-for="(item, index) in NewFilter"
              :class="item.val >= 25 ? 'changecolor' : 'colorchange'"
              @click.native="showPopUp('bottom', item)"
              :size="70"
              :width="3"
              :color="color(item)"
              :value="item.val / 100"
              :rotate="-90"
              linecap="round"
              :key="index"
              transition
            >
              <span class="progress-value">{{ item.val }}%</span>
            </gree-progress>
          </div>
        </div>
        <!-- 滤芯名字\文字 -->
        <div class="progress-text">
          <p v-for="(item, index) in NewFilter" :key="index">{{ item.name }}</p>
        </div>
      </div>
      <!-- 弹出层  单独写 -->
      <gree-popup v-model="isPopupShow.bottom" position="bottom">
        <!-- 弹出层内容 -->
        <div class="popup-main">
          <!-- 弹出层 标题 -->
          <div class="popup-title">{{ currentObject.name }}</div>
          <!-- 弹出层内容 -->
          <div class="popup-content">
            <!-- 弹出层左边 圆环 -->
            <div class="popup-content-left">
              <div class="gree-example-child gree-example-child-progress gree-example-child-progress-0">
                <gree-progress
                  :value="currentObject.val / 100"
                  :class="currentObject.val >= 25 ? 'changecolor' : 'colorchange'"
                  :color="color01()"
                  :width="3"
                  :size="70"
                  :rotate="-90"
                  linecap="round"
                >
                  <span class="progress-value">{{ currentObject.val }}%</span>
                </gree-progress>
              </div>
            </div>
            <!-- 弹出层右边文字 -->
            <div class="popup-content-right">
              <ul>
                <li>预计可使用{{ currentObject.LifeFilterDays }}天。</li>
                <li v-html="currentObject.text" />
              </ul>
            </div>
            <!-- 按钮 更换滤芯 -->
            <gree-button round type="info" @click="buy(currentObject.url)">更换滤芯</gree-button>
          </div>
        </div>
      </gree-popup>
    </gree-page>
  </div>
</template>
<script>
import { Header, Progress, Popup, Button, Icon, SliderCircle, Marquee, MarqueeItem } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { toWebPagePlugin } from '../../api/utils';
import { closePage, editDevice } from '../../../../static/lib/PluginInterface.promise';
import homeConfig from '../../mixins/config/home';
import errorList from '../../api/error';
// import errorConfig from '../../mixins/config/error-config.mixin';

export default {
  components: {
    [Header.name]: Header,
    [Progress.name]: Progress,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [SliderCircle.name]: SliderCircle,
    [Marquee.name]: Marquee,
    [MarqueeItem.name]: MarqueeItem
  },
  mixins: [homeConfig],
  data() {
    return {
      statusBarColor: '#f4f4f4',
      currentMode: '', // 模式
      isPopupShow: {}, // 弹出层显示
      currentObject: { val: 0 },
      lottieRadius: 0, // 动效
      svgRadius: 0, // 动效
      errMsg: [], // 故障文字
      reminderMsg: [], // 提醒文字
      errorMultiText: [] // 故障列表
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      ErrorCode1: state => state.dataObject.ErrorCode1,
      // ErrorCode2: state => state.dataObject.ErrorCode2,
      JFerr: state => state.dataObject.JFerr,
      workStatus(state) {
        const { WorkStatus } = state.dataObject;
        return this.modeAll[WorkStatus].name || '';
        console.log('状态', WorkStatus);
      },
      TotalPureWater: state => state.dataObject.TotalPureWater,
      NewFilter(state) {
        this.filters.map((item, index) => {
          this.filters[index].val = state.dataObject[`LifeTimeFilter${index + 1}`];
          console.log('LifeTimeFilter滤芯寿命', this.filters[index].val);

          this.filters[index].LifeFilterDays = state.dataObject[`LifeFilterDays${index + 1}`];
          console.log('LifeFilterDays剩余天数', this.filters[index].LifeFilterDays);

          // this.filters[index].name = this.filterKinds[
          //   state.dataObject[`FilterKind${index + 1}`] -1 ];
          //   console.log('FilterKind滤芯名称',this.filters[index].name)
        });
        console.log('滤芯信息', this.filters);
        return this.filters;
      }
    }),
    /**
     * 是否有故障
     */
    Er(state) {
      this.errorMultiText = [];
      // let estate = this.ErrorCode1 + this.ErrorCode2 + this.JFerr;
      let estate = this.ErrorCode1 + this.JFerr;
      const ErrorCode1 = this.ErrorCode1;
      // const ErrorCode2 = this.ErrorCode2;
      const JFerr = this.JFerr;
      const errorData1 = errorList.data().errorMultiText1;
      // const errorData2 = errorList.data().errorMultiText2;
      const errorMultiTextJFerr = errorList.data().errorMultiTextJFerr;
      if (ErrorCode1 !== 0) {
        // Data1多个错误显示
        for (let i = 0; i < 8; i += 1) {
          if (ErrorCode1 & (0x01 << i)) {
            errorData1[i].title !== '' && this.errorMultiText.push(errorData1[i]);
          }
        }
      }
      // if (ErrorCode2 !== 0) {
      //   // Data2多个错误显示
      //   for (let i = 0; i < 8; i += 1) {
      //     if (ErrorCode2 & (0x01 << i)) {
      //       errorData2[i].title !== '' && this.errorMultiText.push(errorData2[i]);
      //     }
      //   }
      // }
      if (JFerr !== 0) {
        // wifi故障
        this.errorMultiText.push(errorMultiTextJFerr[0]);
      }
      if (this.errorMultiText === undefined || this.errorMultiText.length < 1) {
        // 判断是否是已知的故障
        this.errMsg = [];
        estate = 0;
      } else {
        console.log('errList', JSON.stringify(this.errorMultiText));
        for (let i = 0; i < this.errorMultiText.length; i += 1) {
          this.errMsg.push(
            this.errorMultiText[i].code !== ''
              ? `${this.errorMultiText[i].code} : ${this.errorMultiText[i].title}。`
              : `${this.errorMultiText[i].title}。`
          );
        }
        console.log('故障errMsg:', this.errMsg);
      }
      return estate;
    }
  },
  watch: {
    WorkStatus(newValue) {
      this.forModeVal(newValue);
    }
  },
  created() {
    this.svgRadius = window.screen.width * 0.7;
    this.lottieRadius = this.svgRadius * 1.8;
  },
  mounted() {
    this.forModeVal(this.WorkStatus);
    // window.vm.$root.$on('back-btn', () => {
    window.vm.$on('back-btn', () => {
      if (this.isPopupShow.bottom) {
        this.isPopupShow.bottom = false;
      } else {
        closePage();
      }
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
      console.log('编辑设备名称');
    },
    setMod(val) {
      this.setDataObject({ WorkStatus: this.modeAll[val].value });
      this.sendCtrl({ WorkStatus: this.modeAll[val].value });
      console.log(this.modeAll[val].value);
    },
    /**
     * @description 根据协议值判断是哪个模式
     */
    forModeVal(val) {
      this.modeAll.map((item, index) => {
        if (item.value === val) {
          this.currentMode = index;
        }
        return false;
      });
    },
    /**
     * @description  弹出层显示/隐藏
     */
    showPopUp(type, object) {
      this.currentObject = object;
      console.log('popup', this.currentObject);
      this.$set(this.isPopupShow, type, true);
    },
    hidePopUp(type) {
      this.$set(this.isPopupShow, type, false);
    },
    hidePopUp2(type) {
      this.$set(this.isPopupShow, type, false);
    },
    /**
     * @description 故障图标
     */
    ErrorIcon() {
      return require('@/assets/img/ic_error.png');
    },
    /**
     * @description 提醒图标
     */
    ReminderIcon() {
      return require('@/assets/img/ic_reminder.png');
    },
    /**
     * @description 故障页
     * @function errorPage
     */
    errorPage(val) {
      this.$router.push({
        name: 'ErrorWarning',
        params: { id: val }
      });
    },
    /**
     * @description 清除提醒
     * @function clearReminder
     */
    clearReminder() {
      this.reminderMsg = [];
      console.log('清除提醒');
    },
    /**
     * @description 颜色变化
     */
    color(item) {
      if (item.val / 100 <= 0.25) {
        return '#FF0202';
      } else {
        return '#619CE7';
      }
    },
    color01() {
      if (this.currentObject.val / 100 <= 0.25) {
        return '#FF0202';
      } else {
        return '#619CE7';
      }
    },

    /**
     * @description 购买链接
     */
    buy(url) {
      // window.location.href = url;
      toWebPagePlugin(url, this.$language('home.buyurl')); // 带有返回
    }
  }
};
</script>
