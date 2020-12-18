<!--
 * @Descripttion: 809030 主页
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-09-05 14:12:57
 * @LastEditors  : ZM_lee└(^o^)┘
 * @LastEditTime : 2019-12-23 16:27:31
 -->
<template>
  <gree-view :bg-color="statusBarColor">
    <gree-page no-navbar
               class="page-home">
      <div class="page-header"
           :style="{ backgroundImage: 'url(' + head_bg + ')' }">
        <!-- 头部 -->
        <gree-header theme="transparent"
                     :left-options="{ preventGoBack: true }"
                     @on-click-back="goBack"
                     :right-options="{ showMore: true }"
                     @on-click-more="moreInfo">{{ devname }}</gree-header>
        <!-- 设备状态小图标 -->
        <div class="bar-top">
          <gree-row>
            <gree-col>
              <img :src="require('@/assets/img/' + item.ImgName + '.png')"
                   :class="{ hidden: item.isHidden }"
                   v-for="(item, index) in DeviceStatusIcon"
                   :key="index" />
            </gree-col>
          </gree-row>
        </div>
        <!-- 模式滑轮 -->
        <div class="mode-carousel-holder">
          <Carousel ref="modeCarousel"
                    class="carousel-wrapper"
                    @currentChange="setmode"
                    @uncontrolable="showToast"
                    :prop-data="JsonData.modeData"
                    :options="JsonData.modeOptions" />
          <span class="mode-name">{{ JsonData.modeAll[Mod] }}</span>
        </div>

        <!-- 故障提示 -->
        <gree-notice-bar 
            :style="`${SvStDebug ? '' : 'background-color: rgba(0, 0, 0, 0.2)'}`"
            v-show="Er && Pow"
            class="notice-bar"
            icon="warning"
        >
          {{ errMsg }}
          <router-link to="/Error">
            <span class="err-detail">查看详情</span>
          </router-link>
        </gree-notice-bar>
      </div>

      <div class="page-main">
        <div class="tem-carousel-holder"
             v-if="!AcSvSt">
          <!-- 此温度滑轮为制冷、非空调节能模式下设置的进水温度 -->
          <Carousel ref="temColdCarousel"
                    class="tem-carousel"
                    v-if="isShowSetTem && Mod === 1"
                    @currentChange="setTem"
                    @uncontrolable="showToast"
                    :prop-data="TemColdData"
                    :options="JsonData.TemOptions" />
          <!-- 此温度滑轮为制热、非空调节能模式下设置的进水温度 -->
          <Carousel ref="temHotCarousel"
                    class="tem-carousel"
                    v-if="isShowSetTem && Mod === 2 && OutMode === 0 && SvSt === 0"
                    @currentChange="setTem"
                    @uncontrolable="showToast"
                    :prop-data="TemHotData"
                    :options="JsonData.TemOptions" />
          <!-- 此温度滑轮为制热、节能模式、非空调节能下设置的室内温度 -->
          <Carousel ref="temHotHouseCarousel"
                    class="tem-carousel"
                    v-if="isShowSetTem && Mod === 2 && OutMode === 0 && SvSt === 1"
                    @currentChange="setTem"
                    @uncontrolable="showToast"
                    :prop-data="TemHotHouseData"
                    :options="JsonData.TemOptions" />
          <!-- 以下逻辑有点脑残，读者请勿吐槽 -->
          <div class="outmode-auto"
               v-if="isShowSetTem && Mod === 2 && OutMode === 1">
            自动
          </div>
          <div class="tempWatch"
               v-if="!isShowSetTem">
            <div class="tempWatch-num"
                 v-if="SvSt && Mod === 2"
                 @click="showTem()">
              {{ Temp }}
            </div>
            <div class="tempWatch-num"
                 v-else
                 @click="showTem()">
              {{ WtTemp }}
            </div>
          </div>
          <img :src="require('@/assets/img/c.png')"
               class="tem-unit"
               :class="{ hidden: OutMode === 1 && Mod === 2 && isShowSetTem }" />
          <span class="tem-name"
                v-if="isShowSetTem && !OutMode">设置温度</span>
          <span class="tem-name"
                v-if="!isShowSetTem && SvSt && Mod === 2">室内温度</span>
          <span class="tem-name"
                v-if="!isShowSetTem && ((SvSt && Mod === 1) || !SvSt)">进水温度</span>
        </div>

        <!-- 空调节能 页面-->
        <div class="tem-carousel-holder"
             v-else>
          <Carousel ref="temColdHouseCarousel"
                    class="tem-carousel"
                    v-if="isShowSetTem && Mod === 1"
                    @currentChange="setTem"
                    @uncontrolable="showToast"
                    :prop-data="TemColdHouseData"
                    :options="JsonData.TemOptions" />
          <Carousel ref="temHotHouseCarousel"
                    class="tem-carousel"
                    v-if="isShowSetTem && Mod === 2"
                    @currentChange="setTem"
                    @uncontrolable="showToast"
                    :prop-data="TemHotHouseData"
                    :options="JsonData.TemOptions" />
          <div class="tempWatch"
               v-if="!isShowSetTem">
            <div class="tempWatch-num"
                 v-if="AcSvSt"
                 @click="showTem()">
              {{ Temp }}
            </div>
          </div>
          <img :src="require('@/assets/img/c.png')"
               class="tem-unit"
               :class="{ hidden: OutMode === 1 && Mod === 2 && isShowSetTem }" />
          <span class="tem-name"
                v-if="isShowSetTem">设置温度</span>
          <span class="tem-name"
                v-else>室内温度</span>
        </div>

      </div>
      <!-- 底部按钮 -->
      <gree-toolbar position="bottom"
                    no-hairline>
        <gree-row>
          <gree-col :class="{ hidden: !item.isShowFuncBtn }"
                    v-for="(item, index) in FootList"
                    :key="index"
                    @click.native="setFunction(index)"
                    :style="`${!Pow && item.isDisabled ? 'visibility:hidden' : ''}`">
            <div class="icon">
              <img :src="require('@/assets/img/' + item.ImgName + '.png')" />
            </div>
            <h3>{{ $language(item.Name) }}</h3>
          </gree-col>
        </gree-row>
      </gree-toolbar>

      <!-- 电源关闭 -->
      <gree-power-off v-model="showPowerOff"
                      :text="$language('home.powerOff')"
                      :style="{ backgroundImage: 'url(' + power_off_bg + ')' }"></gree-power-off>

      <!-- 节能调试模式 -->
      <gree-power-off id="svSt-Debug"
                      v-model="SvStDebug"
                      text="节能调试模式运行中,无法设置,请通过手操器关闭该模式"
                      :style="{ backgroundImage: 'url(' + power_off_bg + ')' }"></gree-power-off>
    </gree-page>

    <!-- 底部弹出层按钮 -->
    <function-list :is-popup-show="isPopupShow"></function-list>

    <div v-show="false">
      {{ ColorChange }} --- {{ HtWtSetTem }} --- {{ ColWtSetTem }} --{{
        HtSetTem
      }}
      -- {{ ColSetTem }}
    </div>
  </gree-view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import homeConfig from '@/mixins/config/809030/home';
import FunctionList from '@/components/809030/FunctionList';
import errorList from '../../api/error';
import * as type from '@/store/types';
import Carousel from '../../components/Carousel';
import {
  Header,
  NoticeBar,
  Row,
  Col,
  PowerOff,
  ToolBar,
  Dialog
} from 'gree-ui';
import { showToastPlugin, closePagePlugin } from '../../api/utils';
import {
  editDevice,
  changeBarColor
} from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    FunctionList,
    Carousel,
    [Header.name]: Header,
    [NoticeBar.name]: NoticeBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [PowerOff.name]: PowerOff,
    [ToolBar.name]: ToolBar,
    [Dialog.name]: Dialog
  },
  mixins: [homeConfig, errorList],
  data() {
    return {
      isPopupShow: {},
      isWarningShow: false,
      errorIndex: null, // 故障下标
      isMultiError: false, // 是否多故障
      errorMsg: [], // 故障文本(如果多故障的话)
      isShowSetTem: false,
      Loop: null, // 定时器
      TemColdData: [], // 制冷进水温度滑轮数值
      TemHotData: [], // 制热进水温度滑轮数值
      TemColdHouseData: [], // 制冷室内温度
      TemHotHouseData: [], // 制热室内温度
      errMsg: '', // 故障文字
      warnMsg: '', // 提醒文字
      statusBarColor: '#F9A130'
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,

      isMorebtn: state => state.isMorebtn,
      isScene: state => state.isScene,

      mac: state => state.mac,
      Pow: state => state.dataObject.Pow,

      SensorErr: state => state.dataObject.SensorErr,

      SvStDebug(state) {
        if (state.dataObject.SvStDebug) {
          this.$set(this.isPopupShow, 'bottom', false);  
        }
        return Boolean(state.dataObject.SvStDebug);
      },
      // 增加
      /**
       * @function getmode
       * @param state state
       * @description 获取模式
       */
      Mod: function getMod(state) {
        this.$nextTick(() => {
          this.$refs.modeCarousel.setId(state.dataObject.Mod - 1);
        });
        this.modeName = this.JsonData.modeAll[state.dataObject.Mod + 1];
        return state.dataObject.Mod;
      },
      Quiet: state => state.dataObject.Quiet, // 静音
      OutMode: state => state.dataObject.OutMode, // 外出模式
      AssHt: state => state.dataObject.AssHt, // 辅热
      SvSt: state => state.dataObject.SvSt, // 节能
      AcSvSt: state => state.dataObject.AcSvSt, // 空调节能

      enAcSvSt: state => state.dataObject.enAcSvSt, // 空调节能是否有效

      WtTemp: state => state.dataObject.WtTemp, // 进水温度
      Temp: state => state.dataObject.Temp, // 进水温度(空调节能)
      HtWtSetTem: state => state.dataObject.HtWtSetTem, //  制热设置温度
      ColWtSetTem: state => state.dataObject.ColWtSetTem, //  制冷设置温度
      HtSetTem: state => state.dataObject.HtSetTem, // 制热设置温度(空调节能)
      ColSetTem: state => state.dataObject.ColSetTem, // 制冷设置温度(空调节能)

      HSMax: state => state.dataObject.HSMax, // 制热房间温度设置上限(空调节能)
      HSMin: state => state.dataObject.HSMin, // 制热房间温度设置下限(空调节能)
      CSMax: state => state.dataObject.CSMax, // 制冷房间温度设置上限(空调节能)
      CSMin: state => state.dataObject.CSMin, // 制冷房间温度设置下限(空调节能)

      HWMax: state => state.dataObject.HWMax, // 制热进水温度设置上限
      HWMin: state => state.dataObject.HWMin, // 制热进水温度设置下限
      CWMax: state => state.dataObject.CWMax, // 制冷进水温度设置上限
      CWMin: state => state.dataObject.CWMin, // 制冷进水温度设置下限

      AntiF(state) {
        this.setDataObject({ Mod: 2 });
        return state.dataObject.AntiF;
      }, // 防冻标识
      Ocmd: state => state.dataObject.Ocmd, // 手操器预约
      Er(state) {
        // 是否有故障
        if (state.dataObject.Er) {
          let errorMultiText = null;
          this.List.forEach(element => {
            if (element.index === Number(this.err[0])) {
              errorMultiText = element;
            }
          });
          console.log('errorMultiText', errorMultiText);
          this.errMsg = `故障:${errorMultiText.code},${errorMultiText.title}。`;
          const length = 20;
          if (this.errMsg.length > length){
             this.errMsg = this.errMsg.substring(0, length) + '...'
          }
        }
        return state.dataObject.Er;
      },
      err: state => state.dataObject.err // 故障数组
    }),
    /**
     * @description 主页面下根据模式状态更新背景图
     */
    head_bg() {
      let bg;
      if (this.Mod === 2) {
        bg = require('@/assets/img/bg_heat.png');
      } else {
        bg = require('@/assets/img/bg_cool.png');
      }
      return bg;
    },
    /**
     * @description 主页面下根据开关状态更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      this.Mod === 2 ? (color = '#F9A130') : (color = '#6CA0E3');
      this.statusBarColor = this.Mod === 2 ? '#F9A130' : '#6CA0E3';
      navigator.PluginInterface ? changeBarColor(color) : '';
      return color;
    },
    power_off_bg() {
      let bg;
      if (this.Mod == 2) {
        bg = require('@/assets/img/blur_heat.png');
      } else {
        bg = require('@/assets/img/blur_cool.png');
      }
      return bg;
    },
    showPowerOff() {
      return !this.Pow;
    }
  },
  watch: {
    /**
     * @description 获取电源开关信息，更新电源按键UI
     */
    Pow() {
      if (this.Pow) {
        this.FootList[0].ImgName = 'btn_off';
      } else {
        this.$set(this.isPopupShow, 'bottom', false);
        this.FootList[0].ImgName = 'btn_on';
      }
      this.FootList[1].isDisabled = Boolean(!this.Pow);
      this.FootList[2].isDisabled = Boolean(!this.Pow);
    },

    isShowSetTem(newV) {
      if (newV) {
        if (this.AcSvSt) {
          if (this.Mod === 2) {
            this.$nextTick(() => {
              this.$refs.temHotHouseCarousel.setId(
                Number(this.HtSetTem) - this.HSMin
              );
            });
          }
          if (this.Mod === 1) {
            this.$nextTick(() => {
              this.$refs.temColdHouseCarousel.setId(
                Number(this.ColSetTem) - this.CSMin
              );
            });
          }
        } else {
          if (this.Mod === 2) {
            this.$nextTick(() => {
              // 节能模式下是设置室内温度
              if (this.SvSt) {
                this.$refs.temHotHouseCarousel.setId(
                  Number(this.HtSetTem) - this.HSMin
                );
              } else {
                this.$refs.temHotCarousel.setId(
                  Number(this.HtWtSetTem) - this.HWMin
                );
              }
            });
          }
          if (this.Mod === 1) {
            console.log(this.ColWtSetTem, this.CWMin);
            this.$nextTick(() => {
              this.$refs.temColdCarousel.setId(
                Number(this.ColWtSetTem) - this.CWMin
              );
            });
          }
        }
      }
      this.modeName = this.JsonData.modeAll[newV + 1];
    },

    /**
     * @function HWMax @HWMin @CWMax @CWMin (非空调节能模式下)
     * @description 更新可设置的上下值限制
     */
    HWMax(newV) {
      if (newV) {
        this.TemHotData = [];
        for (let index = this.HWMin; index <= newV; index++) {
          this.TemHotData.push(index);
        }
      }
    },
    HWMin(newV) {
      if (newV) {
        this.TemHotData = [];
        for (let index = newV; index <= this.HWMax; index++) {
          this.TemHotData.push(index);
        }
      }
    },
    CWMax(newV) {
      if (newV) {
        this.TemColdData = [];
        for (let index = this.CWMin; index <= newV; index++) {
          this.TemColdData.push(index);
        }
      }
    },
    CWMin(newV) {
      if (newV) {
        this.TemColdData = [];
        for (let index = newV; index <= this.CWMax; index++) {
          this.TemColdData.push(index);
        }
      }
    },
    /**
     * @function HSMax @HSMin @CSMax @CSMin (空调节能下)
     * @description 更新可设置的上下值限制
     */
    HSMax(newV) {
      if (newV) {
        this.TemHotHouseData = [];
        for (let index = this.HSMin; index <= newV; index++) {
          this.TemHotHouseData.push(index);
        }
      }
    },
    HSMin(newV) {
      if (newV) {
        this.TemHotHouseData = [];
        for (let index = newV; index <= this.HSMax; index++) {
          this.TemHotHouseData.push(index);
        }
      }
    },
    CSMax(newV) {
      if (newV) {
        this.TemColdHouseData = [];
        for (let index = this.CSMin; index <= newV; index++) {
          this.TemColdHouseData.push(index);
        }
      }
    },
    CSMin(newV) {
      if (newV) {
        this.TemColdHouseData = [];
        for (let index = newV; index <= this.CSMax; index++) {
          this.TemColdHouseData.push(index);
        }
      }
    }
  },
  created() {
    document.body.addEventListener('touchstart', {});
    this.$set(this.isPopupShow, 'bottom', false);
    this.FootList[0].ImgName = this.Pow ? 'btn_off' : 'btn_on';
  },
  mounted() {
    this.TemHotData = [];
    this.TemColdData = [];
    this.TemHotHouseData = [];
    this.TemColdHouseData = [];
    for (let index = this.HWMin; index <= this.HWMax; index++) {
      this.TemHotData.push(index);
    }
    for (let index = this.CWMin; index <= this.CWMax; index++) {
      this.TemColdData.push(index);
    }
    for (let index = this.HSMin; index <= this.HSMax; index++) {
      this.TemHotHouseData.push(index);
    }
    for (let index = this.CSMin; index <= this.CSMax; index++) {
      this.TemColdHouseData.push(index);
    }
    this.$nextTick(() => {
      this.modeName = this.JsonData.modeAll[this.Mod + 1];
      this.$refs.modeCarousel.setId(this.Mod - 1);
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
      closePagePlugin();
    },
    /**
     * @function setmode
     * @param val 循环滑轮取值（模式）
     * @description 循环滑轮设置
     */
    setmode(val) {
      this.isShowSetTem = false;
      const obj = { Mod: Number(val) + 1 };
      // 空调节能使能的情况，从制冷切换到制热的时候，如何此时空调节能为1.要把外出和节能模式置为0；
      if (val && this.AcSvSt) {
        obj.OutMode = 0;
        obj.SvSt = 0;
      }
      this.modeName = this.JsonData.modeAll[Number(val) + 1];
      this.setDataObject(obj);
      this.sendCtrl(obj);
    },
    /**
     * @function setTem
     * @param val 循环滑轮取值(温度)
     * @description 循环滑轮设置
     */
    setTem(val) {
      const obj = {};
      console.log(val);
      if (this.AcSvSt) {
        this.Mod === 2
          ? (obj.HtSetTem = val + this.HSMin)
          : (obj.ColSetTem = val + this.CSMin);
      } else if (this.SvSt) {
        // 此处需单独处理节能模式下可设置室内温度
        this.Mod === 2
          ? (obj.HtSetTem = val + this.HSMin)
          : (obj.ColWtSetTem = val + this.CWMin);
      } else {
        this.Mod === 2
          ? (obj.HtWtSetTem = val + this.HWMin)
          : (obj.ColWtSetTem = val + this.CWMin);
      }
      this.showTem();
      this.setDataObject(obj);
      this.sendCtrl(obj);
    },

    /**
     * @function showToast
     * @description 显示提示
     */
    showToast() {
      this.AntiF
        ? showToastPlugin('当前处在防冻模式，需等待机组解除防冻', 1)
        : '';
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
      const obj = {};
      switch (val) {
        case 0:
          obj.Pow = this.Pow ? 0 : 1;
          this.setDataObject(obj);
          this.sendCtrl(obj);
          break;
        case 1:
          this.$set(this.isPopupShow, 'bottom', true);
          this.$store.commit(type.IS_MOREBTN, true);
          break;
        case 2:
          this.$router.push({
            name: 'ParameterQuery'
          });
          break;
        case 3:
          if (this.Ocmd) {
            Dialog.confirm({
              title: '',
              content:
                '开启APP手操器预约功能后，将自动关闭手操器预约功能，请确认是否继续',
              confirmText: '确定',
              onConfirm: () => {
                this.setDataObject({ Ocmd: 0 });
                this.sendCtrl({ Ocmd: 0 });
                this.$router.push({
                  name: 'OrderList'
                });
              },
              cancelText: '取消',
              onCancel: () => console.log('已取消')
            });
          } else {
            this.$router.push({
              name: 'OrderList'
            });
          }
          break;
        default:
          break;
      }
    },

    /**
     * @function handleCilckWatchTem
     * @description 进水温度点击事件
     */
    handleCilckWatchTem() {
      if (this.SvSt && this.Mod === 2 && !this.enAcSvSt) {
        showToastPlugin('节能模式下不可设置进水温度', 1);
      } else {
        this.showTem();
      }
    },

    /**
     * @function showTem
     * @description 显示可以设置温度的水滑轮
     */
    showTem() {
      this.isShowSetTem = true;
      if (this.Loop) {
        clearInterval(this.Loop);
        this.Loop = setTimeout(() => {
          this.isShowSetTem = false;
        }, 2000);
      } else {
        this.Loop = setTimeout(() => {
          this.isShowSetTem = false;
        }, 2000);
      }
    }
  }
};
</script>
