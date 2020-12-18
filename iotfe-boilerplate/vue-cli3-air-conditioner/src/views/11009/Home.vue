<template>
  <gree-view>
    <gree-page
      no-navbar
      class="page-home"
    >
      <div class="page-header">
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
          :right-options="{showMore: true}"
          @on-click-more="moreInfo"
          v-show="!functype && editEnable"
        >{{ devname }}</gree-header>
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
          v-show="functype"
        >
          {{ devname }}
          <a
            slot="right"
            @click="sceneSave"
          >保存</a>
        </gree-header>
        <img
          :src="HeaderImg"
          class="header-bg"
          v-show="Pow"
        />
        <!-- 设备状态小图标 -->
        <div
          class="bar-top"
          v-show="deviceState !== -1"
        >
          <gree-row>
            <gree-col>
              <img
                :src="item.miniIcon"
                v-for="(item, index) in functionList"
                :key="index"
                v-show="iconDisplay[index]"
              />
            </gree-col>
          </gree-row>
        </div>
        <!-- 模式滑轮 -->
        <div
          class="mod-carousel-holder"
          :class="{hidden: !Pow}"
        >
          <Carousel
            ref="modCarousel"
            @currentChange="setMod"
            :prop-data="ModImg"
            :options="ModOptions"
          />
          <span class="mod-text">{{ modName }}</span>
        </div>
      </div>
      <div class="page-main">
        <!-- 温度滑轮 -->
        <div
          class="tem-carousel-holder"
          :class="{hidden: !Pow}"
        >
          <div :class="{hidden: !Mod}">
            <Carousel
              ref="temCarousel"
              class="tem-carousel-pos"
              @currentChange="setTemperature"
              :prop-data="TemData"
              :options="TemOptions"
              v-show="!dataObject.StHt"
            ></Carousel>
            <span
              class="tem-stht"
              v-show="dataObject.StHt"
            >8</span>
            <img
              :src="TemImg"
              class="tem-unit"
            />
          </div>
          <span
            class="auto-text"
            :class="{hidden: Mod}"
          >
            <span>{{ $language("mode.mode_auto") }}</span>
          </span>
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
          <span class="rotate-fan">{{ fanName }}</span>
        </div>
        <span v-show="false">{{ Mod }} - {{ SetTem }} - {{ WdSpd }} - {{ ColorChange }}</span>
      </div>
      <!-- 电源关闭 -->
      <gree-power-off
        v-model="showPowerOff"
        :text="PoweroffText"
        :style="{backgroundImage:'url(' + PoweroffImg + ')'}"
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
          width="25"
          :class="{hidden: (!item.isScenesShow && functype) ||
          (item.onlyLang && item.onlyLang !== lang)}"
          v-for="(item, index) in footList"
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
import { Header, Row, Col, Popup, PowerOff, ToolBar } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import UpdateStatus from '@/mixins/utils/updateStatus';
import CarouselConfig from '@/mixins/config/carousel';
import BtnConfig from '@/mixins/config/btn';
import Logic from '@/mixins/utils/logic';
import Carousel from '@/components/Carousel';
import FunctionList from '@/components/FunctionList';
import {
  closePage,
  editDevice,
  getCCcmd,
  changeBarColor,
  showToast
} from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Popup.name]: Popup,
    [PowerOff.name]: PowerOff,
    [ToolBar.name]: ToolBar,
    Carousel,
    FunctionList
  },
  mixins: [UpdateStatus, CarouselConfig, BtnConfig, Logic],
  data() {
    return {
      showPowerOff: false,
      isPopupShow: {},
      modName: '',
      selAdvanced: false
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      deviceState: state => state.deviceInfo.deviceState,
      devname: state => state.deviceInfo.name,
      editEnable: state => state.editEnable,
      functype: state => state.functype,
      Has05: state => state.Has05,
      lang: state => state.deviceInfo.lang,
      mac: state => state.mac,
      Quiet: state => state.dataObject.Quiet,
      Tur: state => state.dataObject.Tur,
      /**
       * @description 获取电源开关信息，更新电源按键UI
       */
      Pow(state) {
        this.showPowerOff = Boolean(!state.dataObject.Pow);
        state.dataObject.Pow
          ? (this.footList[0].ImgName = 'btn_off')
          : (this.footList[0].ImgName = 'btn_on');
        return state.dataObject.Pow;
      },
      /**
       * @description 获取模式状态
       */
      Mod(state) {
        this.$nextTick(() => {
          this.$refs.modCarousel.setId(state.dataObject.Mod);
        });
        this.modName = this.ModAll[state.dataObject.Mod];
        return state.dataObject.Mod;
      },
      /**
       * @description 获取温度信息，更新温度
       */
      SetTem(state) {
        const num =
          this.TemData.indexOf(state.dataObject.SetTem) +
          state.dataObject.Add05;
        this.$nextTick(() => {
          this.$refs.temCarousel.setId(num);
        });
        return state.dataObject.SetTem;
      },
      /**
       * @description 获取0.5度信息，更新温度
       */
      Add05(state) {
        if (!this.Has05) return '';
        const num =
          this.TemData.indexOf(state.dataObject.SetTem) +
          state.dataObject.Add05;
        this.$nextTick(() => {
          this.$refs.temCarousel.setId(num);
        });
        return state.dataObject.Add05;
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
      switch (this.Mod) {
        case 0:
          return require('@/assets/img/mode/ac_bg_auto.png');
        case 1:
          return require('@/assets/img/mode/ac_bg_cool.png');
        case 2:
          return require('@/assets/img/mode/ac_bg_dry.png');
        case 3:
          return require('@/assets/img/mode/ac_bg_fan.png');
        case 4:
          return require('@/assets/img/mode/ac_bg_heat.png');
        default:
          return require('@/assets/img/mode/ac_bg_auto.png');
      }
    },
    /**
     * @description 关机状态背景图片
     */
    PoweroffImg() {
      return this.Mod === 4
        ? require('@/assets/img/blur_heat.png')
        : require('@/assets/img/blur_cool.png');
    },
    /**
     * @description 关机状态提示文本
     */
    PoweroffText() {
      return this.$language('home.powerOff');
    },
    /**
     * @description 摄氏度图片（可添加华氏度）
     */
    TemImg: function updateTemImg() {
      return require('@/assets/img/c.png');
    },
    /**
     * @description 主页面下更新状态栏颜色
     */
    ColorChange() {
      const Pow = this.Pow;
      const Hot = this.Mod === this.$store.state.ModHeat;
      const Adv = this.selAdvanced;
      let color = false;
      if (this.routeName === 'Home') {
        if (Pow) {
          if (Hot) {
            color = Adv ? '#644013' : '#f9a130';
          } else {
            color = Adv ? '#2b405a' : '#6da2e2';
          }
        } else if (Hot) {
          color = Adv ? '#623900' : '#f78d00';
        } else {
          color = Adv ? '#2b405a' : '#6ba0e2';
        }
      } else if (this.routeName === 'Sweep') {
        color = '#f4f4f4';
      } else if (this.routeName === 'Error') {
        color = '#ddd5a3';
      } else if (this.routeName === 'Offline') {
        color = Hot ? '#f78d00' : '#6ba0e2';
      }
      color ? changeBarColor(color) : '';
      return color;
    },
    routeName() {
      return this.$route.name;
    }
  },
  watch: {
    routeName(newVal) {
      newVal === 'Home' ? '' : (this.selAdvanced = false);
    }
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
     * @description 场景模式的保存
     */
    sceneSave() {
      const keys = Object.keys(this.dataObject);
      const opt = [];
      const p = [];
      const remarks = '...';
      for (let i = 0, j = keys.length; i < j; i += 1) {
        opt.push(keys[i]);
        p.push(this.dataObject[keys[i]]);
      }
      opt.push('Add0.5');
      p.push(this.dataObject.Add05);
      const json = JSON.stringify({ opt, p, t: 'cmd' });
      getCCcmd(this.mac, json, remarks, JSON.stringify(p));
    },
    /**
     * @description 循环滑轮设置
     */
    setMod(val) {
      if (this.Mod !== val) {
        this.setDataObject({ Mod: val });
      }
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
      const set05 = val % 2;
      const setData = {};
      if (temNum !== this.SetTem || (set05 !== this.Add05 && this.Has05)) {
        setData.SetTem = temNum;
        this.Has05 ? (setData.Add05 = set05) : '';
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
      } else if (this.WdSpd !== val * 2 + 1) {
        this.setDataObject({ WdSpd: val * 2 + 1 });
        this.sendCtrl({ WdSpd: val * 2 + 1 });
      }
    },
    /**
     * @description 点击底部功能列表
     */
    setFunction(val) {
      switch (val) {
        case 0:
          if (this.Pow) {
            this.setDataObject({ Pow: 0, SlpMod: 0, SwhSlp: 0 });
            this.sendCtrl({ Pow: 0, SlpMod: 0, SwhSlp: 0 });
          } else {
            this.sendCtrl({ Pow: 1 });
            this.setDataObject({ Pow: 1 });
          }
          break;
        case 1:
          this.selAdvanced = true;
          this.$set(this.isPopupShow, 'bottom', true);
          break;
        default:
          break;
      }
    }
  }
};
</script>
