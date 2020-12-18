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
          v-show="!functype && editEnable"
        >
          <span @click="moreInfo">
            {{ devname }}
            <i class="triangle"></i>
          </span>
          <gree-icon
            slot="right"
            name="power"
            @click="togglePow"
            v-show="showPowerOn"
          ></gree-icon>
        </gree-header>
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
          v-show="functype"
        >
          {{ devname }}
          <!-- <a
            slot="right"
            @click="sceneSave"
          >{{ $language("home.btnSave") }}</a> -->
          <div slot="right" class="header-right">
            <a @click="sceneSave">{{ $language("home.btnSave") }}</a>
            <gree-icon 
              name="power" 
              @click="togglePow" 
              v-show="Pow"
            ></gree-icon>
          </div>
        </gree-header>
        <img
          :src="HeaderImg"
          class="header-bg"
          v-show="Pow"
        />
        <!-- 设备状态小图标 -->
        <div
          class="bar-top"
          v-show="deviceState !== -1 && !DwatFul && !functype"
        >
          <gree-row>
            <gree-col>
              <img
                :src="item.miniIcon"
                v-for="(item, index) in functionList"
                :key="index"
                v-show="iconDisplay[index] && item.index !== 2"
              />
            </gree-col>
          </gree-row>
          <gree-row>
            <gree-col
              :key="index"
              v-for="(item, index) in functionList"
              v-show="iconDisplay[index] && item.index === 2 && dataObject.AppTimer"
            >
              <img :src="item.miniIcon" />
              <span>{{ detailTime }}</span>
            </gree-col>
          </gree-row>
        </div>
        <!-- 模式滑轮 -->
        <div
          class="mod-carousel-holder"
          :class="{hidden: !Pow}"
        >
          <img :src="ModImg[0]" />
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
          :class="{hidden: !Pow}"
        >
          <div>
            <Carousel
              ref="temCarousel"
              class="tem-carousel-pos"
              @currentChange="setTemperature"
              :prop-data="TemData"
              :options="TemOptions"
            ></Carousel>
            <img
              :src="HumidityImg"
              class="humidity-unit"
            />
          </div>
          <gree-row>
            <gree-col>
              <p>{{ $language('home.environmental_humidity') }}{{ dataObject.DwatSen }}%</p>
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
            :prop-data="WdSpdImg"
            :options="WdSpdOptions"
          />
          <span class="rotate-fan">{{ $language(fanName) }}</span>
        </div>
      </div>
      <!-- 电源关闭 -->
      <gree-power-off
        v-model="showPowerOff"
        :style="{backgroundImage:'url(' + PoweroffImg + ')'}"
      ></gree-power-off>
      <gree-popup
        class="power-off"
        v-model="showPowerOff"
        :has-mask="false"
        transition
      >
        <gree-row>
          <gree-col>
            <img
              src="@/assets/img/powoff.png"
              @click="togglePow"
            />
            <p :class="[dataObject.AppTimer? '' :　'invisible']">{{ detailTime }}&nbsp;</p>
          </gree-col>
        </gree-row>
      </gree-popup>
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
      <!-- 故障提醒 -->
      <!-- <gree-power-off
        v-model="showAllError"
        :style="{backgroundImage:'url(' + PoweroffImg + ')'}"
        v-if="Pow && !DwatFul"
      ></gree-power-off>
      <gree-popup
        class="all-error"
        v-model="showAllError"
        :has-mask="false"
        transition
        v-if="Pow && !DwatFul"
      >
        <div class="result">
          <div class="result-image">
            <img :src="require('@/assets/img/fault.png')" />
          </div>
          <div class="result-text">{{ $language("home.malfunction") }}</div>
        </div>
      </gree-popup>-->
    </gree-page>
    <!-- 底部按钮 -->
    <gree-toolbar
      position="bottom"
      no-hairline
    >
      <gree-row>
        <gree-col
          :width="Pow && !DwatFul ? 25 : 'auto'"
          :class="{hidden: (!item.isScenesShow && functype) ||
          (item.onlyLang && item.onlyLang !== lang)}"
          v-for="(item, index) in footList"
          :key="index"
          @click.native="setFunction(index)"
        >
          <div class="icon">
            <img :src="require('@/assets/img/functionBtn/' + item.ImgName + '.png')" />
          </div>
          <h3>
            {{ $language(item.Name) }}
            <i
              class="triangle"
              v-if="item.moreBtn"
            ></i>
          </h3>
        </gree-col>
      </gree-row>
    </gree-toolbar>
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
  ToolBar
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import UpdateStatus from '@/mixins/utils/updateStatus';
import CarouselConfig from '@/mixins/config/carousel';
import BtnConfig from '@/mixins/config/13803/btn';
import Logic from '@/mixins/utils/13803/logic';
import Carousel from '@/components/Carousel';
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
    Carousel
  },
  mixins: [UpdateStatus, CarouselConfig, BtnConfig, Logic],
  data() {
    return {
      showPowerOff: false,
      showWaterFull: false,
      showAllError: false,
      showPowerOn: true,
      modName: '',
      detailTime: ''
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
        this.modName = this.ModAll[state.dataObject.Dmod];
        return state.dataObject.Dmod;
      },
      /**
       * @description 获取健康状态
       */
      Health(state) {
        state.dataObject.Health
          ? (this.footList[0].ImgName = 'health_light')
          : (this.footList[0].ImgName = 'health_nomal');
        return state.dataObject.Health;
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
        if (this.Pow) {
          return this.WdSpdAll[this.WdSpdFunc[this.WdSpdName][0][3]];
        }
        return this.WdSpdAll[this.WdSpd];
      },
      /**
       * @description 是否显示小图标
       */
      iconDisplay() {
        const Arr = this.functionList.map(item => {
          const val = this.dataObject[this.AdvFunc[item.sign][0][0]];
          const type = this.AdvFunc[item.sign][2][0];
          return (
            (type === 'All' && val !== 0) ||
            (type === 'Only' &&
              val === Number(this.AdvFunc[item.sign][1]) &&
              (!this.functype || item.ScenesShow))
          );
        });
        return Arr;
      }
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
    'dataObject.AppTimer': {
      handler(val) {
        if (val === 0 || val === 1) {
          this.setTimeLabel();
        }
      },
      immediate: true
    },
    isInit(val) {
      if(val) {
        console.log('init finish');
        changeBarColor('#a0bf3b');
      }
    },
    timerValue: {
      handler(val) {
        console.log('timer changed');
        this.setTimerLabel();
      },
      deep: true
    },
    Pow(val) {
      console.log(`init:${this.isInit}, Pow:${val}`);
      if (this.dataObject.AppTimer && this.isInit) {
        this.detailTime = '';
        this.setDataObject({AppTimer: 0});
      }
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
      // const keys = Object.keys(this.dataObject);
      const keys = ["Pow","Dwet","DwatSen","Dmod","WdSpd","AllErr","TemSen","Health","AppTimer"];
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
      // 立即关闭预约
      // const DataObject = {
      //   t: 'deleteT',
      //   id: 1
      // };
      // sendDataToDevice(this.mac, DataObject, false)
      //   .then(_res => {
      //     const res = JSON.parse(_res);
      //     if (res.r === 200) {
      //       this.setDataObject({ AppTimer: 0 });
      //       this.setSubscribeTimer(0);
      //       this.detailTime = '';
      //       console.log('首页关闭预约成功');
      //     }
      //   })
      //   .catch(err => {
      //     return err;
      //   });
    },
    setTimerLabel() {
      if (this.dataObject.AppTimer === 0) {
        this.detailTime = '';
      } else {
        const labelStatus = this.dataObject.Pow
          ? this.$language('appointment.timerOff')
          : this.$language('appointment.timerOn');
        // this.detailTime = `${AppendZero(this.timerValue.hr)}:${AppendZero(this.timerValue.min)}${labelStatus}`;
        this.detailTime = (this.timerValue.hr === 0 && this.timerValue.min === 0) ?  '' : `${AppendZero(this.timerValue.hr)}:${AppendZero(this.timerValue.min)}${labelStatus}`;
      }
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
     * @description 设置预约时间文本
     */
    setTimeLabel() {
      if (this.dataObject.AppTimer === 0) {
        this.detailTime = '';
      } else {
        getAllTimerList(null, this.mac)
          .then(_res => {
            const res = JSON.parse(_res);
            if (res && res[0]) {
              const labelStatus = this.dataObject.Pow
                ? this.$language('appointment.timerOff')
                : this.$language('appointment.timerOn');
              this.detailTime = `${AppendZero(res[0].hr)}:${AppendZero(res[0].min)}${labelStatus}`;
            }
          })
          .catch(err => {
            return err;
          });
      }
    },
    /**
     * @description 点击底部功能列表
     */
    setFunction(val) {
      if (this.Pow) {
        switch (val) {
          // case 0:
          //   if (this.Health) {
          //     this.setDataObject({ Health: 0 });
          //     this.sendCtrl({ Health: 0 });
          //   } else {
          //     this.setDataObject({ Health: 1 });
          //     this.sendCtrl({ Health: 1 });
          //   }
          //   break;
          case 0:
            this.$router.push({
              name: 'Appointment'
            });
            break;
          default:
            break;
        }
      } else {
        this.$router.push({
          name: 'Appointment'
        });
      }
    }
  }
};
</script>
