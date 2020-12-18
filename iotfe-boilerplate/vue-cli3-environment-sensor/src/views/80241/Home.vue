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
          :right-options="{showMore: !functype}"
          @on-click-more="moreInfo"
        >{{ devname }}</gree-header>
        <!-- 设备状态小图标 -->
        <div class="bar-top">
          <gree-row>
            <gree-col>
              <img
                :src="require('@/assets/img/' + item.ImgName + '.png')"
                :class="{hidden: item.isHidden}"
                v-for="(item, index) in DeviceStatusIcon"
                :key="index"
              />
            </gree-col>
          </gree-row>
        </div>
        <!-- cols 数据展示 -->
        <gree-row class="data-list">
          <gree-col
            width="20"
            v-for="(item, index) in ColsList"
            :key="index"
          >
            <p>{{ item.Value }}</p>
            <p>{{ $language(item.Name) }}</p>
          </gree-col>
        </gree-row>
      </div>
      <div class="page-main">
        <!-- 电池电量低 -->
        <gree-notice-bar
          icon
          v-if="BatteryWarn > 0 && Pow"
        >
          <img src="@/assets/img/warning.png" />
          <span>{{ $language("home.batteryWarn1") }}</span>
        </gree-notice-bar>
        <!-- 故障 -->
        <gree-notice-bar
          @click.native="$router.push({ name: 'Error' })"
          v-if="BatteryWarn === 0 && Pow && !isWarningShow && SensorErr && !isMultiError"
        >
          <img
            slot="left"
            src="@/assets/img/warning.png"
          />
          <span>{{ errorListMixins[errorIndex].name }}</span>
        </gree-notice-bar>
        <gree-notice-bar
          @click.native="$router.push({ name: 'Error' })"
          v-else-if="BatteryWarn === 0 && Pow && !isWarningShow && SensorErr && isMultiError"
        >
          <img
            slot="left"
            src="@/assets/img/warning.png"
          />
          <gree-marquee>
            <gree-marquee-item
              v-for="(item, key) in errorMsg"
              :key="key"
            >{{ item }}</gree-marquee-item>
          </gree-marquee>
        </gree-notice-bar>
        <!-- 警告 -->
        <gree-notice-bar
          icon
          v-else-if="BatteryWarn === 0 && Pow && isWarningShow"
        >
          <img src="@/assets/img/warning.png" />
          <span>{{ $language("home.warning") }}</span>
        </gree-notice-bar>
        <!-- 空气质量 -->
        <div class="air-quality">
          <span class="air-level">{{ airQ[InAirQuality] }}</span>
        </div>
      </div>
      <!-- 电源关闭 -->
      <gree-power-off
        v-model="showPowerOff"
        :text="$language('home.powerOff')"
        :style="{backgroundImage:'url(' + power_off_bg + ')'}"
      ></gree-power-off>
    </gree-page>
    <!-- 底部弹出层按钮 -->
    <function-list :is-popup-show="isPopupShow"></function-list>
    <!-- 底部按钮 -->
    <gree-toolbar
      position="bottom"
      no-hairline
    >
      <gree-row>
        <gree-col
          :class="{hidden: !item.isShowFuncBtn, disabled: item.isDisabled}"
          v-for="(item, index) in FootList"
          :key="index"
          @click.native="setFunction(index)"
        >
          <div class="icon">
            <img :src="require('@/assets/img/' + item.ImgName + '.png')" />
          </div>
          <h3>{{ $language(item.Name) }}</h3>
        </gree-col>
      </gree-row>
    </gree-toolbar>
  </gree-view>
</template>

<script>
import {
  Header,
  Row,
  Col,
  NoticeBar,
  Marquee,
  MarqueeItem,
  PowerOff,
  ToolBar,
  Toast
} from 'gree-ui';
import dayjs from 'dayjs';
import { mapState, mapMutations, mapActions } from 'vuex';
import homeConfig from '@/mixins/config/80241/home';
import errorConfig from '@/mixins/config/error';
import FunctionList from '@/components/80241/FunctionList';
import * as type from '@/store/types';
import {
  closePage,
  editDevice,
  changeBarColor,
  showToast
} from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [NoticeBar.name]: NoticeBar,
    [Marquee.name]: Marquee,
    [MarqueeItem.name]: MarqueeItem,
    [PowerOff.name]: PowerOff,
    [ToolBar.name]: ToolBar,
    [Toast.name]: Toast,
    FunctionList
  },
  mixins: [homeConfig, errorConfig],
  data() {
    return {
      showPowerOff: false,
      isPopupShow: {},
      isWarningShow: false,
      airQ: ['优', '良', '中', '差'],
      errorIndex: null, // 故障下标
      isMultiError: false, // 是否多故障
      errorMsg: [] // 故障文本(如果多故障的话)
    };
  },
  computed: {
    ...mapState({
      AutoCtr: state => state.dataObject.AutoCtr,
      BatteryWarn: state => state.dataObject.BatteryWarn,
      CO2: state => state.dataObject.CO2,
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      HCHO: state => state.dataObject.HCHO,
      HumSor: state => state.dataObject.HumSor,
      InAirQuality: state => state.dataObject.InAirQuality,
      isMorebtn: state => state.isMorebtn,
      isScene: state => state.isScene,
      isSleep: state => state.isSleep,
      isTime: state => state.isTime,
      LigPow: state => state.dataObject.LigPow,
      mac: state => state.mac,
      PM2P5: state => state.dataObject.PM2P5,
      Pow: state => state.dataObject.Pow,
      show: state => state.show,
      TemSor: state => state.dataObject.TemSor,
      SensorErr: state => state.dataObject.SensorErr,
      deviceList: state => state.deviceList
    }),
    head_bg() {
      let bg;
      if (this.InAirQuality === 1) {
        bg = require('@/assets/img/bg_header_a.png');
      } else if (this.InAirQuality === 2) {
        bg = require('@/assets/img/bg_header_b.png');
      } else if (this.InAirQuality === 3) {
        bg = require('@/assets/img/bg_header_c.png');
      } else {
        bg = require('@/assets/img/bg_header_s.png');
      }
      return bg;
    },
    power_off_bg() {
      let bg;
      if (this.InAirQuality === 1) {
        bg = require('@/assets/img/bg_off_a.png');
      } else if (this.InAirQuality === 2) {
        bg = require('@/assets/img/bg_off_b.png');
      } else if (this.InAirQuality === 3) {
        bg = require('@/assets/img/bg_off_c.png');
      } else {
        bg = require('@/assets/img/bg_off_s.png');
      }
      return bg;
    }
  },
  watch: {
    /**
     * @description 获取电源开关信息，更新电源按键UI
     */
    Pow() {
      this.showPowerOff = Boolean(!this.Pow);
      this.Pow
        ? (this.FootList[0].ImgName = 'btn_off')
        : (this.FootList[0].ImgName = 'btn_on');
      this.FootList[1].isDisabled = Boolean(!this.Pow);
    },
    HCHO: {
      handler(val) {
        if (val / 1000 > 0.08) {
          this.isWarningShow = true;
        } else {
          this.isWarningShow = false;
        }
      },
      immediate: true
    },
    InAirQuality(val) {
      switch (val) {
        case 0:
          changeBarColor(this.BarColor[0].Value);
          break;
        case 1:
          changeBarColor(this.BarColor[1].Value);
          break;
        case 2:
          changeBarColor(this.BarColor[2].Value);
          break;
        case 3:
          changeBarColor(this.BarColor[3].Value);
          break;
        default:
          changeBarColor(this.BarColor[0].Value);
          break;
      }
    },
    /**
     * @description 更新故障显示
     */
    SensorErr() {
      this.errorIndex = this.getErrorIndex();
      this.errorMsg = [];
      this.getErrorMsg();
    },
    /**
     * @description 房间内设备数量
     */
    deviceList() {
      if (this.deviceList.num <= 0 && this.AutoCtr === 1) {
        this.setDataObject({ AutoCtr: 0 });
        this.sendCtrl({ AutoCtr: 0 });
      }
    },
    BatteryWarn: {
      handler(val) {
        switch (val) {
          case 2:
            try {
              showToast(this.$language('home.batteryWarn2'), 0);
            } catch (error) {
              Toast({
                content: this.$language('home.batteryWarn2'),
                position: 'bottom',
                duration: 3000
              });
            }
            this.setDataObject({ AutoCtr: 0 });
            this.sendCtrl({ AutoCtr: 0 });
            break;
          case 3:
            try {
              showToast(this.$language('home.batteryWarn3'), 0);
            } catch (error) {
              Toast({
                content: this.$language('home.batteryWarn3'),
                position: 'bottom',
                duration: 3000
              });
            }
            this.setDataObject({ AutoCtr: 0 });
            this.sendCtrl({ AutoCtr: 0 });
            break;
          default:
            break;
        }
      },
      immediate: true
    }
  },
  created() {
    this.$set(this.isPopupShow, 'bottom', this.isMorebtn);
    this.errorIndex = this.getErrorIndex();
  },
  mounted() {
    this.getErrorMsg();
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
    /**
     * @description 点击底部功能列表
     */
    setFunction(val) {
      switch (val) {
        case 0:
          this.Pow ? this.sendCtrl({ Pow: 0 }) : this.sendCtrl({ Pow: 1 });
          this.Pow
            ? this.setDataObject({ Pow: 0 })
            : this.setDataObject({ Pow: 1 });
          break;
        case 1:
          this.$set(this.isPopupShow, 'bottom', true);
          this.$store.commit(type.IS_MOREBTN, true);
          break;
        case 2:
          this.$router.push({ name: 'Voice' });
          break;
        default:
          break;
      }
    },
    getErrorIndex() {
      const __SensorErr = this.SensorErr.toString(2);
      // 发生任一故障，禁用自动控制功能
      if (__SensorErr > 0) {
        this.setDataObject({ AutoCtr: 0 });
        // this.sendCtrl({ AutoCtr: 0 });
        if (parseInt(__SensorErr, 2) !== 2) {
          console.log(
            `故障发生，自动控制和灯带关闭：[二进制]${this.SensorErr}([十进制]${__SensorErr})`
          );
          console.log(' ');
          console.log(`故障时间：${dayjs().format('YYYY年MM月DD日 HH:mm:ss')}`);

          this.setDataObject({ LigPow: 0 });
          // this.sendCtrl({ LigPow: 0 });
        }
      }
      for (let i = 0; i < 8; i += 1) {
        if (__SensorErr & (0x01 << i)) {
          return i;
        }
      }
      return null;
    },
    getErrorMsg() {
      const __SensorErr = this.SensorErr.toString(2)
        .split('')
        .reverse();
      let errorSum = 0;
      setTimeout(() => {
        __SensorErr.forEach((v, k) => {
          if (v === '1') {
            errorSum += 1;
            this.errorMsg.push(`${this.errorListMixins[k].name}；`);
          }
        });
        if (errorSum === 1) {
          this.isMultiError = false;
        } else {
          this.isMultiError = true;
        }
      }, 200);
    }
  }
};
</script>
