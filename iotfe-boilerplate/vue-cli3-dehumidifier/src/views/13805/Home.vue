<!--
 * @Author: Jerry-Rain
 * @Date: 2019-09-10 15:34:25
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2019-12-13 08:35:32
 * @Description: 继承强哥的意志-写一个快速开始的101模板; 
 -->
<template>
  <gree-view :bg-color="Pow ? '#a0bf3b' : '#ffffff'">
    <gree-page no-navbar class="page-home">
      <!-- 头部 -->
      <div class="page-header" :style="{backgroundImage:'url(' + head_bg + ')'}">
        <gree-header
          :theme="DwatFul ? 'transparent' : (Pow ? '' : 'transparent')"
          :style="{backgroundColor: !DwatFul && Pow ? '#fff' : 'transparent'}"
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
        <div class="header-content">
          <div class="tab-bar">
            <div 
              v-for="(mode, index) in modes" 
              :key="mode.name" 
              class="tab-item"
              :class="{active: mode.value.indexOf(Dmod) !== -1}"
              @click="setMode(mode, index)"
            >
              {{$language(mode.name)}}
            </div>
          </div>
          <div class="mod-carousel-container">
            <Carousel
              key="modeDehumidity"
              v-show="MODE_DEHUMIDIFY.indexOf(Dmod) !== -1"
              ref="modeDehumidityCarousel"
              :prop-data="modeDehumidity.carouselData.map(x => this.$language(x))"
              :options="modeDehumidity.carouselOptions" 
              @currentChange="setDehumiditySubMode"
            />
            <Carousel
              key="modeDry"
              v-show="MODE_DRY.indexOf(Dmod) !== -1"
              ref="modeDryCarousel"
              :prop-data="modeDry.carouselData.map(x => this.$language(x))"
              :options="modeDry.carouselOptions" 
              @currentChange="setDrySubMode"
            />
            <span class="mode-label" v-show="Dmod === 9">{{$language('mode.mode_clean')}}</span>
            <span class="mode-label" v-show="MODE_ALL.indexOf(Dmod) === -1">模式值({{Dmod}})不正确</span>
          </div>
          <div class="status-bar" :class="{warnning: Dfltr}">
            <span class="status-label">{{$language('home.clean_info')}}</span>
            <span class="status-label">PM2.5：{{$language(PM2P5_Description)}}</span>
            <span class="status-label">{{$language('home.airQlt')}}：{{$language(AirQltDescription)}}</span>
          </div>
          <gree-notice-bar v-show="Dfltr && !functype" ref="custom_notice_bar">
            <img
              src="@/assets/img/fault_s.png"
              slot="left"
            />
            <span style="padding-right: 10px;">{{ $language("home.filterClean_tips") }}</span>
            <a
              href="javascript:;"
              @click="close"
            >{{ $language("home.filterClean_close_tips") }}</a>
          </gree-notice-bar>
        </div>
      </div>
       <div class="page-main">
        <!-- 湿度滑轮 -->
        <div
          class="hum-carousel-holder"
          :class="{hidden: !Pow}"
        >
          <div v-show="MODE_WITH_HUIMIDITY_SETTING.indexOf(Dmod) !== -1">
            <Carousel
              ref="humidityCarousel"
              class="hum-carousel-pos"
              :prop-data="humidity.carouselData"
              :options="humidity.carouselOptions"
              @currentChange="setHumidty"
            ></Carousel>
            <img
              :src="HumidityImg"
              class="humidity-unit"
            />
          </div>
          <div class="humidity-label" v-show="MODE_WITH_HUIMIDITY_SETTING.indexOf(Dmod) === -1">
            <span>--</span>
          </div>
          <gree-row>
            <gree-col>
              <p>{{$language('home.current_humidity')}}{{currentHumidity}}</p>
            </gree-col>
          </gree-row>
        </div>
        <!-- 风档滑轮 -->
        <div
          class="fan-carousel-holder"
          :class="{hidden: !Pow}"
        >
          <Carousel
            ref="fanCarousel"
            :prop-data="windSpeed.carouselData"
            :options="windSpeed.carouselOptions"
            @currentChange="setWindSpeed"
          />
          <span class="rotate-fan">{{$language(fanName)}}</span>
        </div>
      </div>
      <!-- 尾部 -->
      <div class="page-footer">
        <div 
          class="item" 
          v-for="(item, index) in functionList" 
          v-show="item.visible"
          :class="{center: ((functype && !Pow) || (DwatFul && !Pow)) && item.name === 'btn.advance_pow'}"
          :key="index">
          <img :src="item.url" @click="footerFunction(index)" />
          <span>{{$language(item.name)}}</span>
        </div>
      </div>
      <!-- 关机页面 -->
      <gree-power-off
        v-model="showPowerOff"
        :text="$language('home.power_off')"
        :style="{backgroundImage:'url(' + power_off_bg + ')'}"
      ></gree-power-off>
      <!-- 水满提醒 -->
      <gree-power-off
        v-model="showWaterFull"
        :style="{backgroundImage:'url(' + power_off_bg + ')'}"
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
       <!-- drawer pop弹框 -->
      <gree-popup v-model="showDrawer" position="bottom">
        <div class="drawer-area">
          <Drawer @hideDrawer="hideDrawer()" @setAdvanced="setAdvanced"/>
        </div>
      </gree-popup>
    </gree-page>
    <div v-show="false">{{Dwet}} - {{WdSpd}}</div>
    <div class="mask" v-show="!isInit">
      <img src="../../../public/images/loading.gif" class="loading">
    </div>
  </gree-view>
</template>

<script>
import { Header, PowerOff, Popup, Row, Col, NoticeBar, Icon } from "gree-ui";
import { mapState, mapMutations, mapActions } from "vuex";
import {
  closePage,
  editDevice,
  changeBarColor,
  getCCcmd,
} from "@/../../static/lib/PluginInterface.promise";
import Drawer from "@/components/Drawer";
import Carousel from "@/components/CarouselEx";
import homeConfig from '@/mixins/config/13805/home.js';
import carouselConfig from '../../mixins/config/13805/carouselConfig';
import * as types from '../../store/types';

const MODE_DEHUMIDIFY = [1, 2, 4];
const MODE_DRY = [5, 10];
const MODE_CLEAN = [9];
const MODE_ALL = [...MODE_DEHUMIDIFY, ...MODE_DRY, ...MODE_CLEAN];
const MODE_WITH_HUIMIDITY_SETTING = [2, 4]; // 可以调节湿度的模式
const MODE_MUTE_DEHUM = 4; // 静音除湿模式
const MODE_FAST_DRY = 5; // 快速干衣模式
const MODES = [
  {
    value: MODE_DEHUMIDIFY, // 设备上报值的列表
    name: 'mode.mode_dehumidity',
    bgUrl: require('../../assets/img/13805/mode_dehumidify_bg.png'),
  },
  {
    value: MODE_DRY,
    name: 'mode.mode_dry',
    bgUrl: require('../../assets/img/13805/mode_dry_bg.png'),
  },
  {
    value: MODE_CLEAN,
    name: 'mode.mode_clean',
    bgUrl: require('../../assets/img/13805/mode_clean_bg.png')
  }
];
const WIND_SPEED_VALS = [0, 1, 3, 5]; // 风档具体取值，顺序须与滑轮索引一致

export default {
  components: {
    [Header.name]: Header,
    [PowerOff.name]: PowerOff,
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
    [NoticeBar.name]: NoticeBar,
    [Icon.name]: Icon,
    Drawer,
    Carousel,
  },
  mixins: [homeConfig, carouselConfig],
  data() {
    return {
      showPowerOff: false,
      showDrawer: false,
      modes: MODES,
      HumidityImg: require('@/assets/img/percent.png'),
      power_off_bg: require("@/assets/img/bg_off.png"),
      MODE_DEHUMIDIFY,
      MODE_DRY,
      MODE_CLEAN,
      MODE_ALL,
      MODE_WITH_HUIMIDITY_SETTING,
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      lang: state => state.deviceInfo.lang,
      devname: state => state.deviceInfo.name.length > 12 ? `${state.deviceInfo.name.slice(0, 12)}...` : state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      Pow: state => state.dataObject.Pow,
      Dmod: state => state.dataObject.Dmod,
      Dfltr: state => state.dataObject.Dfltr,
      DwatFul: state => state.dataObject.DwatFul,
      PM2P5_Description: (state) => {
        let description = '--';
        switch (state.dataObject.PM2P5) {
          case 1:
            description = 'pm2p5.excellent';
            break;
          case 2:
            description = 'pm2p5.good';
            break;
          case 3:
            description = 'pm2p5.bad';
            break;
          default:
            break;
        }
        return state.dataObject.AllErr? '--' : description;
      },
      AirQltDescription: (state) => {
        let description = '--';
        switch (state.dataObject.airQlt) {
          case 1:
            description = 'airQlt.normal';
            break;
          case 2:
            description = 'airQlt.slight';
            break;
          case 3:
            description = 'airQlt.serious';
            break;
          default:
            break;
        }
        return state.dataObject.AllErr ? '--' : description;
      },
      showWaterFull: state => Boolean(state.dataObject.DwatFul),
      WdSpd(state) {
        const WdSpd = state.dataObject.WdSpd;
        this.$nextTick(() => {
          const idx = WIND_SPEED_VALS.indexOf(WdSpd);
          this.$refs.fanCarousel.setId(idx !== -1 ? idx : 0);
        });
        return WdSpd;
      },
      currentHumidity: state => {
        if (state.dataObject.AllErr) {
          return ' --';
        } else if (Number.isNaN(parseInt(state.dataObject.DwatSen, 10))) {
          return ' --';
        } else {
          return ` ${state.dataObject.DwatSen}%`;
        }
      },
      isInit: state => state.isInit,
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
        const num = this.humidity.carouselData.indexOf(realDwet);
        this.$nextTick(() => {
          this.$refs.humidityCarousel.setId(num);
        });
        return state.dataObject.Dwet;
      },
    }),
    fanName() {
      return this.fanNameList[this.WdSpd];
    },
    head_bg() {
      const mode = this.modes.find(x => x.value.indexOf(this.Dmod) !== -1);
      const bg = mode.bgUrl;
      return bg;
    },
   
  },
  watch: {
    Pow(newv) {
      this.changeStatusbarColor();
      return this.DwatFul ? (this.showPowerOff = false) 
        : newv ? (this.showPowerOff = false) : (this.showPowerOff = true);
    },
    DwatFul(val) {
      this.changeStatusbarColor();
    },
    Dmod(val) {
      this.windSpeed.carouselOptions.controlAble = true;
      if (val === MODE_MUTE_DEHUM || val === MODE_FAST_DRY) {
        this.windSpeed.carouselOptions.controlAble = false;
        // 静音除湿模式下风速只有低风，快速干衣模式下只有高风
        val === MODE_MUTE_DEHUM ? this.setDataObject({WdSpd: 1}) : this.setDataObject({WdSpd: 5});
      } 
      if (val === MODE_CLEAN[0]) {
        // 单净化模式下强制开启离子
        this.setDataObject({Health: 1});
      }
      this.setModeCarousel(val);
    }
  },
  created() {},
  mounted() {
    this.changeStatusbarColor();
    this.showPowerOff = this.Pow ? false : true;
    this.setModeCarousel(this.Dmod);
  },
  methods: {
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT
    }),
    ...mapActions({
      sendCtrl: types.SEND_CTRL
    }),
    setModeCarousel(val) {
      const mode = this.modes.find(x => x.value.indexOf(val) !== -1);
      const index = mode.value.indexOf(val); // 请确保value的值的顺序与滑轮选项的顺序一致
      if (mode.name === 'mode.mode_dehumidity') {
        this.$refs.modeDehumidityCarousel.setId(index !== -1 ? index : 0);
      } 
      if (mode.name === 'mode.mode_dry') {
        this.$refs.modeDryCarousel.setId(index !== -1 ? index : 0);
      }
    },
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
     * @description 隐藏抽屉列表
     */
    hideDrawer() {
      this.showDrawer = false;
    },
    /**
     * @description: 底部功能按钮的点击事件
     */
    footerFunction(index) {
      switch (index) {
        case 0:
          {
            const cmd = {Pow: this.Pow ? 0 : 1};
            this.setDataObject({Pow: cmd.Pow, AppTimer: 0}); // 开关机关闭定时
            this.sendCtrl(cmd);
          }
          break;
        case 1:
          this.$router.push('/Appointment');
          break;
        case 2:
          this.showDrawer = true;
          break;
        default:
          break;
      }
    },
    changeStatusbarColor() {
      if (this.DwatFul) {
        changeBarColor('#a0bf3b');
      } else {
        if (this.Pow) {
          changeBarColor('#fffffe');
        } else {
          changeBarColor('#a0bf3b');
        }
      }
    },
    setHumidty(val) {
      const humidity = this.humidity.carouselData[val];
      const setData = {};
      let finalTem = 0;
      if (humidity !== this.Dwet) {
        switch (humidity) {
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
    setMode(mode, index) {
      console.log(`mode:${mode.value[0]}, index:${index}`);
      const cmd = {Dmod: mode.value[0]};
      this.setDataObject(cmd);
      this.sendCtrl(cmd);
    },
    // 设置除湿子模式（如除湿模式下有智能【1】、连续【2】、静音【4】三个子模式）
    setDehumiditySubMode(index) {
      // const cmd = {Dmod: index < 2 ? index + 1 : 4};
      // this.modes[0]获取除湿模式的配置
      const cmd = {Dmod: this.modes[0].value[index]};  
      this.setDataObject(cmd);
      this.sendCtrl(cmd);
    },
    // 设置干衣子模式（快速干衣【5】，保持干衣【10】）
    setDrySubMode(index) {
      // const cmd = {Dmod: index ? 10 : 5};
      const cmd = {Dmod: this.modes[1].value[index]};
      this.setDataObject(cmd);
      this.sendCtrl(cmd);
    },
    setWindSpeed(index) {
      const cmd = {WdSpd: WIND_SPEED_VALS[Math.abs(index)]};
      this.setDataObject(cmd);
      this.sendCtrl(cmd);
    },
    setAdvanced(key) {
      const func = this.dataObject[key];
      const cmd = {};
      if (key === 'Quiet') {
        cmd[key] = func ? 0 : 2;
      } else {
        cmd[key] = func ? 0 : 1;
      }
      this.setDataObject(cmd);
      this.sendCtrl(cmd);
    },
     /**
     * @description 关闭NoticeBar
     */
    close() {
       if (this.dataObject.Dfltr === 1) {
        this.sendCtrl({ Dfltr: 0 });
        this.setDataObject({ Dfltr: 0 });
      }
      this.$refs.custom_notice_bar.$el.style.display = 'none';
    },
    sceneSave() {
      let keys = Object.keys(this.dataObject);
      const opt = [];
      const p = [];
      const remarks = '...';
      for (let i = 0, j = keys.length; i < j; i += 1) {
        opt.push(keys[i]);
        p.push(this.dataObject[keys[i]]);
      }
      const json = JSON.stringify({ opt, p, t: 'cmd' });
      console.log(json);
      getCCcmd(this.mac, json, remarks, JSON.stringify(p));
    }
  }
};
</script>
<style lang="sass" scoped>
@import '@assets/scss/13805/home.scss';
</style>