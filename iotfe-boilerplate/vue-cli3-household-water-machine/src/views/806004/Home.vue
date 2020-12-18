<template>
  <gree-view :bg-color="bgColor">
    <gree-page
      no-navbar
      class="page-home"
    >
      <div
        class="page-header"
        :style="{backgroundImage:'url(' + head_bg + ')'}"
      >
        <!-- 头部 -->
        <gree-header
          v-show="!isScene"
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
          :right-options="{showMore: true}"
          @on-click-more="moreInfo"
        >{{ devname }}</gree-header>
        <gree-header
          v-show="isScene"
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
        >{{ devname }}
          <div 
            slot="right" 
            class="header-right">
            <a @click="sceneSave">{{ $language("home.btnSave") }}</a>
          </div>
        </gree-header>
        <!-- 设备状态小图标 -->
        <div class="bar-top">
          <gree-row>
            <gree-col>
              <img
                :src="require('@/assets/img/' + item.ImgName + '.png')"
                :class="{hidden: item.isHidden}"
                v-for="(item, index) in DeviceStatusIcon"
                :key="index"
              >
            </gree-col>
          </gree-row>
        </div>
        <!-- 模式滑轮 -->
        <div class="mode-carousel-holder">
          <Carousel
            ref="modeCarousel"
            class="carousel-wrapper"
            @currentChange="setmode"
            @uncontrolable="showToast"
            :prop-data="JsonData.modeData"
            :options="JsonData.modeOptions"
          />
          <span class="mode-name">
            {{ JsonData.modeAll[Mod-1] }}
          </span>
        </div>
      </div>
      <!-- <gree-notice-bar 
        icon="warning" 
        v-show="AllErr"/> -->
      <div class="page-main">
        <div 
          class="tem-carousel-holder" 
          :class="{visibility:!Pow}">
          <Carousel
            ref="temCarousel"
            class="tem-carousel"
            @currentChange="setTem"
            @uncontrolable="showToast"
            :prop-data="TemData"
            :options="JsonData.TemOptions"
          />
          <img
            :src="temUnit"
            class="tem-unit"
          >
        </div>
        <!-- 故障 -->

        <!-- 警告 -->
        
        <!-- 已关机 -->
        <span 
          class="powoff" 
          v-show="showPowerOff">已关机</span>
      </div>
    </gree-page>
    <!-- 电源关闭 -->
    <!-- <gree-power-off
      v-model="showPowerOff"
      :text="$language('home.powerOff')"
    ></gree-power-off> -->

    <!-- 底部弹出层按钮 -->
    <function-list :is-popup-show="isPopupShow"></function-list>
    <!-- 底部按钮 -->
    <gree-toolbar
      position="bottom"
      no-hairline
    >
      <gree-row>
        <gree-col
          :class="{hidden: !item.isShowFuncBtn}"
          v-for="(item, index) in FootList"
          :key="index"
          @click.native="setFunction(index)"
          :style="`${!Pow && item.isDisabled ? 'visibility:hidden' : ''}`"
        >
          <div class="icon">
            <img :src="require('@/assets/img/' + item.ImgName + '.png')">
          </div>
          <h3>{{ $language(item.Name) }}</h3>
        </gree-col>
      </gree-row>
    </gree-toolbar>
    <div v-show="false"> {{ ColorChange }}
    </div>
  </gree-view>
</template>

<script>
import { Header, NoticeBar, Row, Col, PowerOff, ToolBar } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import homeConfig from '@/mixins/config/806004/home';
import errorConfig from '@/mixins/config/error';
import FunctionList from '@/components/806004/FunctionList';
import * as type from '@/store/types';
import Carousel from '../../components/Carousel';

import {
  changeBarColorPlugin,
  editDevicePlugin,
  closePagePlugin,
  timerListDevicePlugin
} from '../../api/utils';
import { getCCcmd } from '../../../../static/lib/PluginInterface.promise'; // 主体接口

export default {
  components: {
    FunctionList,
    Carousel,
    [Header.name]: Header,
    [NoticeBar.name]: NoticeBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [PowerOff.name]: PowerOff,
    [ToolBar.name]: ToolBar
  },
  mixins: [homeConfig, errorConfig],
  data() {
    return {
      // showPowerOff: false,
      isPopupShow: {},
      isWarningShow: false,
      errorIndex: null, // 故障下标
      isMultiError: false, // 是否多故障
      errorMsg: [], // 故障文本(如果多故障的话)
      TemData: [], // 温度滑轮数值
      TemIndex: '', // 温度索引
      temUnit: require('@/assets/img/c.png') // 温度单位图片地址
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
      AllErr: state => state.dataObject.AllErr,
      // timesList: state => state.timesList,
      FloorHeat: state => state.dataObject.FloorHeat,
      TemUn: state => state.dataObject.TemUn,
      HeWatOutTemSet: state => state.dataObject.HeWatOutTemSet,
      HeWatOutTemSetFloor: state => state.dataObject.HeWatOutTemSetFloor,
      CoWatOutTemSet: state => state.dataObject.CoWatOutTemSet,
      Mod: state => state.dataObject.Mod,

      // SetTem: function(state) {
      //   this.$nextTick(() => {
      //     // if (this.TemData.length === 0){
      //     //   this.TemIndex = this.timesList.indexOf(state.dataObject.setTem);
      //     // }else {
      //     //   this.TemIndex = this.TemData.indexOf(state.dataObject.setTem);
      //     // }
      //     this.TemIndex = this.TemData.indexOf(state.dataObject.setTem);
      //     this.$refs.temCarousel.setId(this.TemIndex);
      //   });
      //   return state.dataObject.SetTem;
      // },
      Quiet: state => state.dataObject.Quiet, // 静音
      LefHom: state => state.dataObject.LefHom, // 外出模式
      SvSt: state => state.dataObject.SvSt, // 节能
      SetTem: state => state.dataObject.SetTem // 设置热水温度
    }),
    /**
     * @description 主页面下根据模式状态更新背景图
     */
    head_bg() {
      let bg;
      if (this.Mod === 1) {
        bg = require('@/assets/img/bg_cool.png');
      } else {
        bg = require('@/assets/img/bg_heat.png');
      }
      return bg;
    },
    /**
     * @description 刘海屏顶部颜色变化
     */

    bgColor: {
      get() {
        let color;
        color = this.Mod === 2 ? '#F9A130' : '#6BA0E2';
        return color;
      }
    },
    /**
     * @description 主页面下根据开关状态更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      this.Mod === 2 ? (color = '#F9A130') : (color = '#6AA6E2');
      changeBarColorPlugin(color);
      return color;
    },
    power_off_bg() {
      let bg;
      if (this.Mod === 2) {
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
    Pow(newValue) {
      // this.Pow
      //   ? (this.FootList[0].ImgName = 'btn_off')
      //   : (this.FootList[0].ImgName = 'btn_on');
      if (!newValue) {
        this.$set(this.isPopupShow, 'bottom', false);
      }
      this.FootList[1].isDisabled = Boolean(!this.Pow);
      this.FootList[2].isDisabled = Boolean(!this.Pow);
      this.TemData = [];
      if (this.Mod === 1) {
        if (!this.TemUn) {
          for (let index = 5; index <= 25; index += 1) {
            this.TemData.push(index);
          }
          this.$nextTick(() => {
            this.$refs.temCarousel.setId(this.CoWatOutTemSet - 105);
          });
        } else {
          for (let index = 41; index <= 77; index += 1) {
            this.TemData.push(index);
          }
          this.$nextTick(() => {
            this.$refs.temCarousel.setId(this.CoWatOutTemSet - 141);
          });
        }
        console.log(this.TemData);
      } else if (this.FloorHeat) {
        if (!this.TemUn) {
          for (let index = 25; index <= 50; index += 1) {
            this.TemData.push(index);
          }
          this.$nextTick(() => {
            this.$refs.temCarousel.setId(this.HeWatOutTemSetFloor - 125);
          });
        } else {
          for (let index = 77; index <= 122; index += 1) {
            this.TemData.push(index);
          }
          this.$nextTick(() => {
            this.$refs.temCarousel.setId(this.HeWatOutTemSetFloor - 177);
          });
        }
      } else if (!this.TemUn) {
        for (let index = 25; index <= 55; index += 1) {
          this.TemData.push(index);
        }
        this.$nextTick(() => {
          this.$refs.temCarousel.setId(this.HeWatOutTemSet - 125);
        });
      } else {
        for (let index = 77; index <= 131; index += 1) {
          this.TemData.push(index);
        }
        this.$nextTick(() => {
          this.$refs.temCarousel.setId(this.HeWatOutTemSet - 177);
        });
      }
    },
    FloorHeat(newValue) {
      if (this.Mod === 1) {
        for (let index = 5; index <= 25; index += 1) {
          this.TemData.push(index);
        }
      } else if (newValue) {
        for (let index = 25; index <= 50; index += 1) {
          this.TemData.push(index);
        }
      } else {
        for (let index = 25; index <= 55; index += 1) {
          this.TemData.push(index);
        }
      }
    },
    Mod(newValue) {
      this.$refs.modeCarousel.setId(newValue - 1);
      this.modeName = this.JsonData.modeAll[newValue];
    },
    HeWatOutTemSet() {
      this.TemIndex = this.TemData.indexOf(this.HeWatOutTemSet - 100);
      this.$refs.temCarousel.setId(this.TemIndex);
    },
    HeWatOutTemSetFloor() {
      this.TemIndex = this.TemData.indexOf(this.HeWatOutTemSetFloor - 100);
      this.$refs.temCarousel.setId(this.TemIndex);
    },
    CoWatOutTemSet() {
      this.TemIndex = this.TemData.indexOf(this.CoWatOutTemSet - 100);
      this.$refs.temCarousel.setId(this.TemIndex);
    },
    TemUn() {
      this.temUnit =
        this.TemUn === 0
          ? require('@/assets/img/c.png')
          : require('@/assets/img/F.png');
    }
  },
  created() {
    this.$set(this.isPopupShow, 'bottom', this.isMorebtn);
    this.$set(this.isPopupShow, 'bottom', false);
  },
  mounted() {
    this.$refs.modeCarousel.setId(Number(this.Mod) - 1);
    this.temUnit =
      this.TemUn === 0
        ? require('@/assets/img/c.png')
        : require('@/assets/img/F.png');
    if (this.Mod === 1) {
      if (!this.TemUn) {
        for (let index = 5; index <= 25; index += 1) {
          this.TemData.push(index);
        }
        setTimeout(() => {
          this.$refs.temCarousel.setId(this.CoWatOutTemSet - 105);
        }, 0);
        // this.$nextTick(() => {
        //   this.$refs.temCarousel.setId(this.CoWatOutTemSet - 5);
        // })
      } else {
        for (let index = 41; index <= 77; index += 1) {
          this.TemData.push(index);
        }
        setTimeout(() => {
          this.$refs.temCarousel.setId(this.CoWatOutTemSet - 141);
        }, 0);
      }
    } else if (this.FloorHeat) {
      if (!this.TemUn) {
        for (let index = 25; index <= 50; index += 1) {
          this.TemData.push(index);
        }
        setTimeout(() => {
          this.$refs.temCarousel.setId(this.HeWatOutTemSetFloor - 125);
        }, 0);
      } else {
        for (let index = 77; index <= 122; index += 1) {
          this.TemData.push(index);
        }
        setTimeout(() => {
          this.$refs.temCarousel.setId(this.HeWatOutTemSetFloor - 177);
        }, 0);
      }
    } else if (!this.TemUn) {
      for (let index = 25; index <= 55; index += 1) {
        this.TemData.push(index);
      }
      setTimeout(() => {
        this.$refs.temCarousel.setId(this.HeWatOutTemSet - 125);
      }, 0);
    } else {
      for (let index = 77; index <= 131; index += 1) {
        this.TemData.push(index);
      }
      setTimeout(() => {
        this.$refs.temCarousel.setId(this.HeWatOutTemSet - 177);
      }, 0);
    }
    if (this.Pow) {
      this.JsonData.modeOptions.controlAble = false;
    } else {
      this.JsonData.modeOptions.controlAble = true;
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
      closePagePlugin();
    },
    /**
     * @function setmode
     * @param val 循环滑轮取值（模式）
     * @description 循环滑轮设置
     */
    setmode(val) {
      const obj = { Mod: Number(val) + 1 };
      // this.modeName = this.JsonData.modeAll[Number(val) + 1];
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
      if (this.Mod === 1) {
        if (!this.TemUn) {
          obj.CoWatOutTemSet = val + 105;
        } else {
          obj.CoWatOutTemSet = val + 141;
        }
      } else if (this.FloorHeat) {
        if (!this.TemUn) {
          obj.HeWatOutTemSetFloor = val + 125;
        } else {
          obj.HeWatOutTemSetFloor = val + 177;
        }
      } else if (!this.TemUn) {
        obj.HeWatOutTemSet = val + 125;
      } else {
        obj.HeWatOutTemSet = val + 177;
      }
      this.setDataObject(obj);
      this.sendCtrl(obj);
    },

    /**
     * @function showToast
     * @description 显示提示
     */
    showToast() {
      // showToastPlugin('当前模式下不可调节', 1);
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevicePlugin(this.mac);
    },
    /**
     * @description 场景模式的保存
     */
    sceneSave() {
      // const keys = Object.keys(this.dataObject);
      const keys = [
        'Pow',
        'Mod',
        'HeWatOutTemSet',
        'HeWatOutTemSetFloor',
        'CoWatOutTemSet',
        'Quiet',
        'LefHom',
        'SvSt',
        'EnvironmentTem',
        'AirInTem',
        'AirOutTem',
        'DefrostTem',
        'AllInWatTem',
        'AllOutWatTem',
        'AntifreezeTem',
        'CodeCoalGasTem',
        'CodeCoalLiquidTem',
        'HighPressureTem',
        'AllErr',
        'FloorHeat',
        'TemUn'
      ];
      const opt = [];
      const p = [];
      const remarks = '...';
      for (let i = 0, j = keys.length; i < j; i += 1) {
        opt.push(keys[i]);
        p.push(this.dataObject[keys[i]]);
      }
      const json = JSON.stringify({ opt, p, t: 'cmd' });
      getCCcmd(this.mac, json, remarks, JSON.stringify(p));
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
          if (this.Pow) {
            this.JsonData.modeOptions.controlAble = false;
          } else {
            this.JsonData.modeOptions.controlAble = true;
          }
          break;
        case 1:
          this.$set(this.isPopupShow, 'bottom', true);
          this.$store.commit(type.IS_MOREBTN, true);
          break;
        case 2:
          this.$router.push({
            name: 'ParameterQueryDetails'
          });
          break;
        case 3:
          // this.$router.push({
          //   name: 'OrderList'
          // });
          timerListDevicePlugin(this.mac);

          break;
        default:
          break;
      }
    }
  }
};
</script>
