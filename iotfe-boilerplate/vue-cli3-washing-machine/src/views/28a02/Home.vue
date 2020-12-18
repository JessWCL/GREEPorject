
// 
// 恭喜你，进坑了
//
<template>
  <gree-view bg-color="#4DB6CF" >
    <!-- Home主页，包含一个简易页面，请根据实际业务修改 -->
    <gree-page class="page-home" no-navbar>
      <!-- 模式选择 -->
      <div
        class="page-mode"
        :style="{backgroundImage: `url(${washmodeImg2[washMode]})`}"
      >
        <gree-header 
          theme="transparent"
          :left-options="{ preventGoBack: true }"
          @on-click-back="goBack"
          :right-options="{ showMore: true }"
          @on-click-more="moreInfo">{{ devname }}
        </gree-header>
        <!-- 背景图片区域 -->

        <!-- 时间 -->
        <div class="mode-time" v-if="devState && devState !== 3 && devState !== 5">
          {{ timeLeft | timeConversion }}
        </div>
        <div class="mode-time" v-else>  <!-- 待机状态下显示这个 -->
          {{ timeAll | timeConversion }}
        </div>

        <div class="mode-name">
          {{ washmodeName[washMode] }}
        </div>
        <div class="data-list-div-div">
          <div class="data-list-div">
            <!-- 故障提示 -->
            <gree-notice-bar
              scrollable
              v-show="errStatus"
              class="notice-bar"
              icon="warning"
            >{{ errMsg }}
              <router-link to="/Error">
                <span class="err-detail">
                  查看详情
                </span>
              </router-link>
            </gree-notice-bar>

            <!-- 中间几个配置 eg: 温度--洗涤--漂洗--转速 -->
            <div class="data-list">
              <div
                v-for="(item, index) in washList[modeIndexList[washMode]].configList"
                :key="index"
              >
                <div
                  :id="`TimerSelector${index}`"
                  class="timer-elector"
                  :class="{'visibility-hidden' : !isActive || index !== clickConfigIndex}"
                  :style="{bottom: errStatus ? '57px': ''}"
                ></div>
                <p class="protocol-value" @click="toggle(index)" ref="trigger" :class="{'visibility-hidden' : isActive && index === clickConfigIndex}">{{ valueChangeZn(dataObject[item.protocol], item.protocol) }} <span class="protocol-unit" :class="{'hidden': hiddenUnit(dataObject[item.protocol] , item.protocol)}"> {{ washUnit[item.protocol] }}</span></p>
                <p class="protocol-name" @click="toggle(index)" :class="{'mbsc-bg': isActive && index === clickConfigIndex }">{{ washConfigDescribe[0][item.protocol] }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 开始按钮 -->
      <div class="start-or-timer">
        <!-- 提醒提示 -->
        <gree-notice-bar
          v-show="warningStatus && !appointmentStatus"
          icon="bell"
          class="notice-warning"
        >{{ warnMsg }}
          <router-link to="/Error">
            <span class="err-detail">
              查看详情
            </span>
          </router-link>
        </gree-notice-bar>

        <!-- 中间启动按钮 -->
        <gree-button
          v-show="!(order || appointmentStatus)"
          class="gree-button-stup"
          round
          @click="handleStartBtn"
        >
          {{ describe }} 
        </gree-button>
      </div>


      <!-- 设置预约状态 -->
      <Appointment2
        v-if="order || appointmentStatus"
        @close="appointmentStatus = false"
      />

      <!-- 高级弹框 -->
      <FuncList
        v-if="isShowPopUp"
        :is-popup-show="isShowFunPopup"
        @hideFuncListPopUp="closeFuncList"
      />

      <!-- 模式弹框 -->
      <ModeList
        v-if="isShowPopUp"
        ref="Modefage"
        :is-popup-show="isShowModePopup"
        @hideModePopUp="closeModeList"
      />

      <!-- 电源关闭 -->
      <gree-power-off
        v-model="showPowerOff"
        :text="powerOffDescribe"
        :style="{ backgroundImage: 'url(' + power_off_bg + ')' }"
      ></gree-power-off>
      
      <!-- 底下按钮 开关-高级-模式 -->
      <gree-toolbar
        v-show="!(order || appointmentStatus) "
        position="bottom"
        no-hairline
      >
        <gree-row>
          <gree-col
            :class="{ hidden: !item.isShowFuncBtn, opacity: item.isDisabled }"
            v-for="(item, index) in footList"
            :key="index"
            @click.native="setFunction('bottom', index)"
          >
            <div class="icon">
              <img
                :src="require('@/assets/img/Icon/' + item.ImgName + '.png')"
              />
            </div>
            <h3>{{ $language(item.name) }}</h3>
          </gree-col>
        </gree-row>
      </gree-toolbar>
    </gree-page>
  </gree-view>
</template>

<script>
import {
  Header,
  TabBar,
  Popup,
  Row,
  Col,
  ToolBar,
  Button,
  Block,
  NoticeBar,
  Picker,
  PowerOff,
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import FuncList from '../../components/FunctionList';
import ModeList from '../../components/ModeList';
// import Header2 from '../../components/Header2';
import Appointment2 from '../../components/Appointment2';
// eslint-disable-next-line no-unused-vars
import { changeZnValue, valueChangeZn, hiddenUnit} from '../../utils/config';
import { getDisableObj } from '../../utils/index';

import footConfig from '../../../src/api/home';
import { modeIndexList, washList, disabledConfigObj } from '../../api/index';
import error from '../../mixins/config/error';

import {washmodeImg2, washmodeName, washUnit, washConfigDescribe} from '../../api/utils';
import { changeBarColorPlugin, showToastPlugin, closePagePlugin, editDevicePlugin, showLoadingPlugin, hideLoadingPlugin } from '../../api/pluginInterface.js';


export default {
  name: 'Home',
  components: {
    // Header2,
    Appointment2,
    FuncList,
    ModeList,
    [Header.name]: Header,
    [TabBar.name]: TabBar,
    [Popup.name]: Popup,
    [ToolBar.name]: ToolBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Block.name]: Block,
    [Picker.name]: Picker,
    [PowerOff.name]: PowerOff,
    [NoticeBar.name]: NoticeBar,
  },
  mixins: [footConfig, error],
  data() {
    return {
      modeIndexList,
      washList,
      instanceMobiScroll_washTemp: undefined, // mobiscroll实例
      instanceMobiScroll_setWashTime: undefined, // mobiscroll实例
      instanceMobiScroll_potch: undefined, // mobiscroll实例
      instanceMobiScroll_speed: undefined, // mobiscroll实例
      power_off_bg: require('../../assets/img/bg_off_2.png'),
      washmodeImg2,
      washmodeName,
      washUnit,
      washConfigDescribe,
      isShowFunPopup: {}, // 高级功能弹框控制
      isShowModePopup: {}, // 模式弹框控制
      isActive: false, // 配置参数是否打开
      clickConfigIndex: 0, // 参数选项小弹框的下标
      clickProtocol: '', // 谈起的选项卡对应字段
      appointmentStatus: false, // 预约是否打开状态
      washModeIndex: 0,
      describe: '开始',
      powerOffDescribe: '已关机', // 关机描述
      hiddenUnit,
      valueChangeZn,
    };
  },
  computed: {
    ...mapState({
      mac: state => state.mac,
      devState: state => state.dataObject.devState, 
      runStage: state => state.dataObject.runStage, // 阶段运行表细分
      /**
       * @function getPow
       * @param state state
       * @description 获取电源开关信息，更新电源按键UI
       */
      Pow(state) {
        if (state.dataObject.Pow) {
          this.footList[0].ImgName = 'btn_off';
          this.powerOffDescribe = '已关机';
        } else {
          this.footList[0].ImgName = 'btn_on';
          this.closeModeList();
          this.closeFuncList();
          this.appointmentStatus = false;
        }
        return state.dataObject.Pow;
      },
      functype: state => state.deviceInfo.functype,
      devname: state => state.deviceInfo.name,

      JFerr: state => state.dataObject.JFerr, // wifi 故障单独判断

      washMode: state => state.dataObject.washMode,
      timeAll: state => state.dataObject.timeAll, // 总设定的时间
      timeLeft: state => state.dataObject.timeLeft, // 洗涤剩余时间

      
      nightWash: state => state.dataObject.nightWash, // 夜间洗
      washTemp: state => state.dataObject.washTemp,
      setWashTime: state => state.dataObject.setWashTime,
      potch: state => state.dataObject.potch,
      speed: state => state.dataObject.speed,
      childLock: state => state.dataObject.childLock,
      
      // 预约
      order: state => state.dataObject.order,
      orderLaunch: state => state.dataObject.orderLaunch,

      dataObject: state => state.dataObject,
      isCloseing: state => state.showData.isCloseing,
      isShowPopUp: state => state.showData.isShowPopUp,
      showPowerOff() {
        return !this.Pow;
      }
    }),

  },
  watch: {
    /**
     * @description //整机状态判断
     */
    devState: {
      handler(newV) {
        this.describe = newV === 2 ? '继续' : '开始';
        // 如果设备启动了则跳转去启动页
        if (newV === 1) {
          this.$router.push({
            name: 'Startup',
          });
          return;
        }     
        if (newV === 3) {
          this.$router.push({
            name: 'Startup',
          });
        } 
        if (newV === 4) {
          this.$router.push({
            name: 'Error',
          });
        } 
      },
      immediate: true,
    },

    /**
     * @description JFerr单独判断
     */
    JFerr(newV) {
      if (newV) {
        this.$router.push({
          name: 'Error',
        });
      }
    },

    /**
     * @description 获取洗涤模式对应的list下标
     */
    washMode: {
      handler(newV) {
        this.washModeIndex = this.modeIndexList[newV];
        this.$nextTick(() => {
          this.isActive = false;
          this.setPickerList();
        });
      },
      immediate: true,
    },
    washTemp(newV) {
      this.$nextTick(() => {
        this.instanceMobiScroll_washTemp.setVal(newV);
      });
    },
    setWashTime(newV) {
      this.$nextTick(() => {
        this.instanceMobiScroll_setWashTime.setVal(newV);
      });
    },
    potch(newV) {
      this.$nextTick(() => {
        this.instanceMobiScroll_potch.setVal(newV);
      });
    },
    speed(newV) {
      this.$nextTick(() => {
        this.instanceMobiScroll_speed.setVal(newV);
      });
    },
    /**
     * @description // 进入洗涤后，在某个过程打开了弹框，进入下一个进程时如果不可调节，需把打开的弹框关掉
     */
    runStage(newV) {
      // console.log('clickProtocol', this.clickProtocol);
      const protocol = this.clickProtocol;
      const obj = getDisableObj(disabledConfigObj, newV);
      const close = obj[protocol];
      close && (this.isActive = false);
    },
  },
  created() {
    // if ('13'.includes(this.devState)) this.$router.push({ name: 'Startup' }); // 从小卡片进来如果是已启动或已完成, 立即跳到启动页
    // if (this.devState === 4) this.$router.push({ name: 'Error' }); // 如果故障，直接去故障页
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        document.addEventListener('click', this.clickedOutside);
      }, 100);
    }
  },

  beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('click', this.clickedOutside);
    }
  },
  /**
   * @function beforeRouteEnter
   * @description 进入页面后监听根组件的事件分发，将goBack传给安卓返回键
   * @param to 路由跳转的目标
   * @param from 路由从哪里来
   * @param next 传一个回调给next进而访问组件实例。否则获取不到组件内的this
   */
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$root.$on('statusBack', () => {
        vm.goBack();
      });
    });
  },
  /**
   * @function beforeRouteLeave
   * @description 退出后解除根组件的事件绑定
   * @param to 路由跳转的目标
   * @param from 路由从哪里来
   * @param next 传一个回调给next。beforeRouteLeave可以获取到this
   */
  beforeRouteLeave(to, from, next) {
    this.$root.$off('statusBack');
    next();
  },
  /** 
   * @description 初始化Home页面
   */
  mounted() {
    changeBarColorPlugin('#4DB6CF');
    this.$nextTick(() => {
      this.setPickerList();
    });
  },

  methods: {
    ...mapMutations({
      setDataObj: 'SET_DATA_OBJECT',
      setShowData: 'SET_SHOW_DATA',
      setStatusList: 'SET_STATUS_LIST',
    }),
    ...mapActions({ 
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @function goBack
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
    /**
     * @function setPickerList
     * @description // 配置参数小滑轮赋值
     */
    setPickerList() {
      const configList = this.washList[this.washModeIndex].configList;
      const nameList = [];
      configList.forEach(element => {
        nameList.push(element.protocol);
      });
      const _this = this;
      try {
        for (let index = 0; index < configList.length; index++) {
          this[
            `instanceMobiScroll_${nameList[index]}`
          ] = mobiscroll.scroller(`#TimerSelector${index}`, {
            theme: 'mobiscroll',
            display: 'inline',
            layout: 'liquid',
            showLabel: true,
            height: 40,
            rows: 3,
            wheels: [
              [
                {
                  label: '',
                  data: configList[index].list,
                },
              ],
            ],
            onChange(event, inst) {
              // 对应configList的数组下标配置
              const list = _this.washList[_this.washModeIndex];
              const configList = list.configList[_this.clickConfigIndex];
              
              const obj = {};
              const protocol = configList.protocol; // 对应的字段
              
              // 改变前的值
              const beforeValue = _this[protocol];
              // 改变后的值
              const afterValue = changeZnValue(inst.getVal(), protocol);
              // 设置选中的值
              obj[protocol] = afterValue;
            
              if (_this[protocol] === afterValue) return; // 如果这个值相同，不发送数据
              
              _this.setDataObj(obj);
              _this.sendCtrl(obj);

              // 以下是根据选择的值计算变化的时间
              let addTime = 0; 
              let originalTime = _this.devState ? _this.timeLeft : _this.timeAll;
              // 转速
              if (_this.clickProtocol === 'speed') {
                const Speed0Time = _this.nightWash === 1 ? list.nightWashSpeed0Time - 1 : list.Speed0Time; // 如果是否选中夜间洗、转速为0减去的时间是不
                
                if (!afterValue && beforeValue) { // 如果新值为0, 久值不为0  不脱水，减去脱水的时间
                  addTime = originalTime - Speed0Time;
                } else if (afterValue && !beforeValue) { // 如果久值为0 新值不为0
                  addTime = originalTime + Speed0Time;
                } else {
                  return;
                }
              } 
              // 温度
              if (_this.clickProtocol === 'washTemp') {
                const beforeTempTime = configList.timeList[beforeValue];
                const afterTempTime = configList.timeList[afterValue];
                
                const beforeWashTime = _this.setWashTime;
                const afterWashTime = configList.defalutWashTimeList[afterValue];

                addTime = originalTime + (afterTempTime - beforeTempTime) + (afterWashTime - beforeWashTime); // 温度越高，时间越长，所以是总时间-变化时间
                if (_this.clickProtocol === 'washTemp') _this.setDataObj({setWashTime: afterWashTime});
              }
              // 洗涤时间
              if (_this.clickProtocol === 'setWashTime') {
                addTime = originalTime + (afterValue - beforeValue);
              }
              // 漂洗次数
              if (_this.clickProtocol === 'potch') {
                const singleTime = _this.washList[_this.washModeIndex].configList[_this.clickConfigIndex].singleTime;
                addTime = originalTime + (afterValue - beforeValue) * singleTime;
              }
              _this.devState ? _this.setDataObj({timeLeft: addTime}) : _this.setDataObj({timeAll: addTime});
            },
          });
          setTimeout(() => {
            this[`instanceMobiScroll_${nameList[index]}`].setVal(
              `${this[nameList[index]]}`,
            );
          }, 100);
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @function handleStartBtn
     * @description // 开始按键
     */
    handleStartBtn() {
      const obj = {
        launch: 1, // 按键启动/暂停状态
      };
      let runStage = 2;
      if (this.washMode === 7) runStage = 70; // 漂洗+脱水只有两个进度条
      if (this.washMode === 6) runStage = 88; // 单脱水只有一个进度条
      // 启动时先把时间放到剩余时间里
      let obj2 = {
        timeLeft: this.devState === 2 ? this.timeLeft : this.timeAll,
        devState: 1,
      };
      if (!this.devState) {
        obj2.runStage = runStage; // 启动后的进度条, 继续用整机的
        // 第一次启动下发配置参数
        obj.washMode = this.washMode;
        const list = this.washList[this.washModeIndex].configList;
        list.forEach(element => {
          obj[element.protocol] = this[element.protocol];
        });
        const funlist = this.washList[this.washModeIndex].auxiliaryFunction;
        const keys = Object.keys(funlist);
        keys.forEach(element => {
          if (funlist[element] === 'U' && this[element]) {
            obj[element] = 1;
          }
        });
      } 
      Object.assign(obj2, obj);
      this.setDataObj(obj2);
      this.sendCtrl(obj);
      this.$router.push({ name: 'Startup' });
    },
    /**
     * @function toggle
     * @description // 显示参数选项弹框下标
     */
    toggle(index) {
      if (this.childLock) {
        showToastPlugin('先解锁童锁');
        return;
      }
      if ((this.order && this.orderLaunch)) return;
      const configList = this.washList[this.washModeIndex].configList;
      const length = configList[index].list.length;
      if (length !== 1) {
        this.clickProtocol = configList[index].protocol; // 当可选时再切换  
        const protocol = this.clickProtocol;
        if (this.devState === 0) {
          this.clickConfigIndex = index; 
          this.isActive = true;
        }
        if (this.devState === 2) {
          // 判断当前阶段是否可调节参数
          // 获取禁用的配置参数
          const obj = getDisableObj(disabledConfigObj, this.runStage);
          const canChange = !obj[protocol];

          if (canChange) {
            this.clickConfigIndex = index;
            this.isActive = true;
          } else {
            showToastPlugin('当前阶段不可调整该参数');
          }
        }
      } else {
        showToastPlugin('当前参数不可选择');
      }
    },
    /**
     *  @description 如果点击外部，关闭下拉菜单
     */
    clickedOutside(event) {
      if (!this.isInWhiteList(event.target)) {
        this.isActive = false;
      }
    },
    /**
     * @description 白名单，单独设置点击时不关闭时
     */
    isInWhiteList(el) {
      try {
        const classNameList = ['protocol-value', 'protocol-unit', 'protocol-name mbsc-bg'];
        if (classNameList.includes(el.className) || classNameList.includes(el.parentNode.className)) return true;
        if (el === this.$refs.trigger) {
          return true;
        }
        if (this.$refs.trigger !== undefined) {
          const children = this.$refs.trigger;
          for (const child of children) {
            if (el === child) {
              return true;
            }
          }
        }
        return false;
      } catch (error) {
        return false;
      }
    },

    /**
     * @description 底部三个选项选择
     */
    async setFunction(type, index) {
      const obj = {};
      const commitObj = {};
      switch (index) {
        case 0:
          if (!this.isCloseing) {
            obj.Pow = !this.Pow >> 0;
            if (!obj.Pow) { // 关机5秒不可开机
              this.powerOffDescribe = '已关机';
              this.setShowData({ isCloseing: 1 });
              setTimeout(() => {
                this.setShowData({ isCloseing: 0 });
              }, 5000);
              this.setDataObj(Object.assign(commitObj, obj));
              this.sendCtrl(obj);
            } else { // 开机3秒内不可控，所以页面先不跳
              this.powerOffDescribe = '开机中···';
              commitObj.devState = 0;
              this.sendCtrl(obj);
              this.setShowData({ isCloseing: 1 });
              setTimeout(() => {
                this.setShowData({ isCloseing: 0 });
                this.setDataObj(Object.assign(commitObj, obj));
              }, 3000);
            }
            // else { // 待机状态下重新开机需回到默认状态 不回到默认模式
            // const obj1 = {};
            // obj1.nightWash = 0;
            // obj1.highWater = 0;
            // obj1.energySave = 0;
            // obj1.soak = 0;
            // obj1.autoMeek = 0;
            // obj1.autoScour = 0;
            // obj1.timeAll = 67;
            // obj1.washMode = 2;
            // obj1.setWashTime = 15;
            // obj1.washTemp = 40;
            // obj1.potch = 2;
            // obj1.speed = 1000;
            // this.setDataObj(Object.assign(obj, obj1));
            // }
            // if (!obj.Pow) 
            // if (obj.Pow) {
            //   showLoadingPlugin();
            //   await this.getPowOnState();
            //   this.setDataObj(obj);
            //   hideLoadingPlugin();
            // }
          } else {
            showToastPlugin('关机中暂时无法开启', 0);
          }
          break;
        case 1:
          this.$set(this.isShowFunPopup, 'bottom', true); // 打开底部高级弹框
          this.setShowData({isShowPopUp: true});
          break;
        case 2:
          this.$set(this.isShowModePopup, 'bottom', true); // 打开底部模式弹框
          this.setShowData({isShowPopUp: true});
          break;
        default:
          break;
      }
    },
    /**
     * @description 关闭模式弹框
     */
    closeModeList() {
      this.$set(this.isShowModePopup, 'bottom', false);
      this.isShowPopUp && this.setShowData({isShowPopUp: false});
    },
    /**
     * @description 关闭高级弹框
     */
    closeFuncList(isOrder) {
      this.$set(this.isShowFunPopup, 'bottom', false);
      this.isShowPopUp && this.setShowData({isShowPopUp: false});
      // 如果点了预约
      isOrder && (this.appointmentStatus = true);
    },

  },
};
</script>
