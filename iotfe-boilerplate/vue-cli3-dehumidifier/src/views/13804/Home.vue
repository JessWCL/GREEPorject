<template>
  <gree-view bg-color="#a0bf3b">
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
          <div slot="right">
            <a 
              @click="sceneSave" 
              v-show="functype">
              {{ $language("home.btnSave") }}
            </a>
            <gree-icon 
              name="more" 
              @click="moreInfo" 
              v-show="!functype"
            ></gree-icon>
          </div>
        </gree-header>
        <img
          :src="HeaderImg"
          class="header-bg"
          v-show="Pow"
        />
        <!-- 模式滑轮 -->
        <div
          class="mod-carousel-holder"
          :class="{hidden: !Pow}"
        >
         <Carousel
            ref="modeCarousel"
            @currentChange="setMode"
            :prop-data="ModeItems"
            :options="ModeCarouselOptions"
          />
          <span class="mod-text">{{ $language(modName) }}</span>
        </div>
        <!-- 警告 -->
        <gree-notice-bar
          ref="custom_notice_bar"
          v-if="dataObject.Dfltr === 1 && !functype && !DwatFul && Pow"
        >
          <img
            src="@/assets/img/fault_s.png"
            slot="left"
          />
          <span>{{ $language("home.filterClean_tips") }}</span>
          <a
            href="javascript:;"
            @click="close"
          >{{ $language("home.filterClean_close_tips") }}</a>
        </gree-notice-bar>
      </div>
      <div class="page-main">
        <!-- 湿度滑轮 -->
        <div
          class="tem-carousel-holder"
          :style="{display: (!Pow || (DwatFul && !functype)) ? 'none' : 'block'}"
        >
          <div v-show="Dmod === 0">
            <CarouselEx
              ref="temCarousel"
              class="tem-carousel-pos"
              @currentChange="setTemperature"
              :prop-data="TemData"
              :options="humidityCarouselOptions"
            ></CarouselEx>
            <img
              :src="HumidityImg"
              class="humidity-unit"
            />
          </div>
          <div 
            class="uv-humidity-label"
            v-show="Dmod !== 0">
            <span>--</span>
          </div>
          <gree-row>
            <gree-col>
              <p>{{ $language('home.environmental_humidity') }}{{ Dmod === 0 ? (AllErr ? ' --' : `${dataObject.DwatSen}%`) : ' --'}}</p>
            </gree-col>
          </gree-row>
        </div>
        <!-- 风档滑轮 -->
        <div
          class="fan-carousel-holder"
          :class="{hidden: !Pow}"
        >
          <Carousel
            keep-alive
            ref="fanCarousel"
            @currentChange="setFan"
            @touchstart.native="showTip"
            :prop-data="WdSpdImgList"
            :options="WdSpdOptions"
          />
          <span class="rotate-fan">{{ $language(fanName) }}</span>
        </div>
      </div>
      <!-- 电源关闭 -->
      <gree-power-off
        v-model="showPowerOff"
        :text="$language('home.power_off')"
        :style="{backgroundImage:'url(' + PoweroffImg + ')'}"
      ></gree-power-off>
      <!-- 水满提醒 -->
      <gree-power-off
        v-model="showWaterFull"
        :style="{backgroundImage:'url(' + PoweroffImg + ')'}"
        v-if="!functype"
      ></gree-power-off>
      <gree-popup
        class="water-full"
        v-model="showWaterFull"
        :has-mask="false"
        transition
        v-if="!functype"
      >
        <div class="result">
          <div class="result-image">
            <img :src="require('@/assets/img/DwatFul_pic.png')" />
          </div>
          <div class="result-text">{{ $language("home.FullWaterWarning") }}</div>
          <div class="result-subtext">{{ $language("home.FullWaterWarningDesc") }}</div>
        </div>
      </gree-popup>
      <div class="page-footer">
      <div 
        class="item" 
        v-for="(item, index) in functionList" 
        :class="{
          hidden: (functype && !item.isScenesShow) ||
           (!Pow && !item.isShowInPowOffState) ||
           (!functype && DwatFul && !item.isShowInWaterFull),
          center: (DwatFul && !functype) && item.isShowInWaterFull
        }"
        :key="index">
        <img :src="item.imgUrl" @click="setFunction(index)" />
        <span>{{$language(item.name)}}</span>
      </div>
    </div>
    </gree-page>
    <!-- 底部按钮 -->
    <div
      v-show="false"
    >{{ Dmod }} - {{ Dwet }} - {{ DwatFul }} - {{ WdSpd }} - {{ AllErr }} - {{ ColorChange }}</div>
    <div class="mask" v-show="!isInit">
      <img src="../../../public/images/loading.gif" class="loading">
    </div>
  </gree-view>
</template>

<script>
import {
  Header,
  Row,
  Col,
  Icon,
  NoticeBar,
  Popup,
  PowerOff,
  ToolBar,
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import UpdateStatus from '@/mixins/utils/updateStatus';
import CarouselConfig from '@/mixins/config/carousel';
import BtnConfig from '@/mixins/config/13804/btn';
import Logic from '@/mixins/utils/13803/logic';
import Carousel from '@/components/Carousel';
import CarouselEx from '@/components/CarouselEx';
import { AppendZero } from '@/utils';
import {
  closePage,
  editDevice,
  getCCcmd,
  changeBarColor,
  showToast,
  sendDataToDevice,
  getAllTimerList
} from '../../../../static/lib/PluginInterface.promise';

// eslint-disable-next-line
const MODE_NAME_MAP = {
  '0': 'mode.mode_continuous',
  '8': 'mode.mode_uv',
  '9': 'mode.mode_uv'
};

export default {
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [NoticeBar.name]: NoticeBar,
    [Popup.name]: Popup,
    [PowerOff.name]: PowerOff,
    [ToolBar.name]: ToolBar,
    Carousel,
    CarouselEx
  },
  mixins: [UpdateStatus, CarouselConfig, BtnConfig, Logic],
  data() {
    return {
      showPowerOff: false,
      showWaterFull: false,
      showAllError: false,
      showPowerOn: true,
      modName: '',
      detailTime: '',
      cacheUvState: 0, // UV负载缓存值
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      deviceState: state => state.deviceInfo.deviceState,
      devname: state => state.deviceInfo.name.length > 12 ? `${state.deviceInfo.name.slice(0, 12)}...` : state.deviceInfo.name,
      editEnable: state => state.editEnable,
      functype: state => state.functype,
      lang: state => state.deviceInfo.lang,
      mac: state => state.mac,
      subscribeTimer: state => state.subscribeTimer,
      isInit: state => state.isInit,
      timerValue: state => state.timerValue,
      /**
       * @description 获取UV负载状态
       */
      UV: state => state.dataObject.Health,
      /**
       * @description 获取电源开关信息
       */
      Pow(state) {
        this.showPowerOff = Boolean(!state.dataObject.Pow && (!state.dataObject.DwatFul || state.functype));
        if (state.functype) {
          this.showPowerOn = Boolean(state.dataObject.Pow);
        } else {
          this.showPowerOn = Boolean(state.dataObject.Pow || state.dataObject.DwatFul);
        }
        return state.dataObject.Pow;
      },
      /**
       * @description 获取水满信息
       */
      DwatFul(state) {
        this.showWaterFull = Boolean(state.dataObject.DwatFul);
        return state.dataObject.DwatFul;
      },
      /**
       * @description 获取总故障信息
       */
      AllErr(state) {
        this.showAllError = Boolean(state.dataObject.AllErr);
        return state.dataObject.AllErr;
      },
      /**
       * @description 获取模式状态
       */
      Dmod(state) {
        // this.modName = this.ModAll[state.dataObject.Dmod];
        let Dmod = state.dataObject.Dmod;
        // this.modName = MODE_NAME_MAP[Dmod];
        this.modName = Dmod !== 0 ? 'mode.mode_uv' : 'mode.mode_continuous';
        this.TemOptions.controlAble = true;
        if (Dmod !== 0) {
          // 除湿机（13804）只有两个模式，0为除湿模式，
          // 由于UV模式传上来的值有时为8，有时为9，故此处判断Dmod不为0时为UV模式
          // UV模式下强制开启UV负载，并且不能关闭
          // this.setDataObject({Health: 1});
          Dmod = 1;
          this.TemOptions.controlAble = false;
        }
        this.$nextTick(() => {
          this.$refs.modeCarousel.setId(Dmod);
        });
        return state.dataObject.Dmod;
      },
      /**
       * @description 获取湿度信息，更新湿度
       */
      Dwet(state) {
        let realDwet;
        switch (state.dataObject.Dwet) {
          case 3:
            realDwet = 30;
            break;
          case 4:
            realDwet = 35;
            break;
          case 5:
            realDwet = 40;
            break;
          case 6:
            realDwet = 45;
            break;
          case 7:
            realDwet = 50;
            break;
          case 8:
            realDwet = 55;
            break;
          case 9:
            realDwet = 60;
            break;
          case 10:
            realDwet = 65;
            break;
          case 11:
            realDwet = 70;
            break;
          case 12:
            realDwet = 75;
            break;
          case 13:
            realDwet = 80;
            break;
          default:
            realDwet = 30;
            break;
        }
        const num = this.TemData.indexOf(realDwet);
        this.$nextTick(() => {
          this.$refs.temCarousel.setId(num);
        });
        return state.dataObject.Dwet;
      },
      WdSpd(state) {
        this.$nextTick(() => {
          this.$refs.fanCarousel.setId(this.WdSpdFunc[this.WdSpdName][0][3]);
        });
        return state.dataObject.WdSpd;
      },
      /**
       * @description 更新风档滑轮名称、刷新滑轮
       */
      fanName() {
        return this.WdSpd === 0 ? 'windSpeed.low' : 'windSpeed.high';
        // if (this.Pow) {
        //   return this.WdSpdAll[this.WdSpdFunc[this.WdSpdName][0][3]];
        // }
        // return this.WdSpdAll[this.WdSpd];
      },
    }),
    /**
     * @description 更新背景图片
     */
    HeaderImg() {
      return require('@/assets/img/bg_header.png');
    },
    /**
     * @description 关机状态背景图片
     */
    PoweroffImg() {
      return require('@/assets/img/pow_off_bg.png');
    },
    /**
     * @description 湿度百分比图片
     */
    HumidityImg() {
      return require('@/assets/img/percent.png');
    },
    /**
     * @description 主页面下更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      if (this.routeName === 'Home') {
        color = '#a0bf3b';
      }
      color ? changeBarColor(color) : '';
      return color;
    },
    routeName() {
      return this.$route.name;
    }
  },
  watch: {
    isInit(val) {
      if(val) {
        console.log('init finish');
        changeBarColor('#a0bf3b');
      }
    },
    Pow(val) {
      console.log(`init:${this.isInit}, Pow:${val}`);
      if (this.dataObject.AppTimer && this.isInit) {
        this.detailTime = '';
        this.setDataObject({AppTimer: 0});
      }
    },
    UV: {
      handler(val) {
        this.cacheUvState = val;
        console.log('uv state changed:', this.cacheUvState);
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setSubscribeTimer: 'SUBSCRIBE_TIMER'
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
     * @description 场景模式的保存
     */
    sceneSave() {
      let keys = Object.keys(this.dataObject);
      if (window.VUE_APP_MID === '13803') { 
        keys = ["Pow","Dwet","DwatSen","Dmod","WdSpd","AllErr","TemSen","Health","AppTimer"];
      }
      const opt = [];
      const p = [];
      const remarks = '...';
      for (let i = 0, j = keys.length; i < j; i += 1) {
        if (keys[i] === 'WdSpd') {
          // 发送时转换一下 - 1：低风；3：高风
          if (this.dataObject[keys[i]] === 0) {
            this.dataObject[keys[i]] = 1;
          } else if (this.dataObject[keys[i]] === 1) {
            this.dataObject[keys[i]] = 3;
          }
        }
        opt.push(keys[i]);
        p.push(this.dataObject[keys[i]]);
      }
      const json = JSON.stringify({ opt, p, t: 'cmd' });
      console.log(json);
      getCCcmd(this.mac, json, remarks, JSON.stringify(p));
    },
    /**
     * @description 滑轮不可滑动时弹出提示
     */
    showTip() {
      if (this.WdSpdOptions.controlAble === false) {
        const tip = `mode.fan_${this.ModName}_tips`.toLowerCase();
        showToast(this.$language(tip), 0);
      }
    },
    /**
     * @description 温度滑轮设置
     */
    setTemperature(val) {
      const temNum = this.TemData[val];
      const setData = {};
      let finalTem = 0;
      if (temNum !== this.Dwet) {
        switch (temNum) {
          case 30:
            finalTem = 3;
            break;
          case 35:
            finalTem = 4;
            break;
          case 40:
            finalTem = 5;
            break;
          case 45:
            finalTem = 6;
            break;
          case 50:
            finalTem = 7;
            break;
          case 55:
            finalTem = 8;
            break;
          case 60:
            finalTem = 9;
            break;
          case 65:
            finalTem = 10;
            break;
          case 70:
            finalTem = 11;
            break;
          case 75:
            finalTem = 12;
            break;
          case 80:
            finalTem = 13;
            break;
          default:
            break;
        }
        setData.Dwet = finalTem;
        this.setDataObject(setData); // 更新state状态
        this.sendCtrl(setData); // 发送指令
      }
    },
    /**
     * @description 风速滑轮设置
     */
    setFan(val) {
      if (this.Pow) {
        const setData = {};
        for (let i = 0; i < this.WdSpdData[val][0].length; i += 1) {
          const state = this.WdSpdData[val][0][i];
          const num = this.WdSpdData[val][1][i];
          setData[state] = num;
        }
        this.setDataObject(setData);
      }
    },
    /**
     * @description 模式滑轮设置
     */
    setMode(val) {
      let cmd = {Dmod: val === 1 ? 8 : 0};
      if (val === 0) {
        cmd.Health = this.cacheUvState; // 由UV模式切换回除湿模式时，UV负载恢复为之前设置的值
      }
      this.setDataObject(cmd);
      this.sendCtrl(cmd);
    },
    /**
     * @description 切换电源开关
     */
    togglePow() {
      if (this.Pow) {
        this.setDataObject({ Pow: 0 });
        this.sendCtrl({ Pow: 0 });
      } else {
        this.sendCtrl({ Pow: 1 });
        this.setDataObject({ Pow: 1 });
      }
      this.setDataObject({ AppTimer: 0});
      this.detailTime = '';
    },
    /**
     * @description 关闭NoticeBar
     */
    close() {
      if (this.dataObject.Dfltr === 1) {
        this.sendCtrl({ Dfltr: 0 });
        this.setDataObject({ Dfltr: 0 });
      }
      this.$refs.custom_notice_bar.$el.style.display = 'hidden';
    },
    /**
     * @description 点击底部功能列表
     */
    setFunction(val) {
      switch (val) {
        case 0:
          {
            let cmd = {Pow: this.Pow? 0 : 1};
            this.setDataObject(cmd);
            this.sendCtrl(cmd);
          }
          break;
        case 1: 
          this.$router.push({
            name: 'Appointment'
          });
          break;
        case 2:
          {
            if (this.Dmod !== 0) {
              // UV模式下不能关闭UV负载
              showToast(this.$language('msg.uv_function_tips'), 0);
              // Toast.info(this.$language('msg.uv_function_tips'));
              return;
            }
            let cmd = {Health: this.UV ? 0 : 1};
            this.setDataObject(cmd);
            this.sendCtrl(cmd);
          }
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="scss">
@import '@assets/scss/13804/home.scss';
</style>