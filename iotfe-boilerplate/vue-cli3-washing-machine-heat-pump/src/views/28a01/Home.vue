<template>
  <gree-view :bg-color="bgStatus" >
    <!-- Home主页，包含一个简易页面，请根据实际业务修改 -->
    <!-- <Header :fun="goBack"/> -->
    <gree-header 
      v-if="Pow"
      style="{backgroundColor: '#f4f4f4'}"
      :left-options="{ preventGoBack: true }"
      @on-click-back="goBack"
    >
      {{ devname }}
      <gree-dropdown
        slot="right"
        position="is-bottom-left"
      >
        <gree-icon
          slot="trigger"
          name="more"
          size="lg"
        ></gree-icon>
        <gree-dropdown-item 
          v-for="(item,index) in moreList" 
          :key="index"
          @click="selectMore(item,index)"
          :class="{opacity:specialLock && index === 2}">{{ item }}
        </gree-dropdown-item>
      </gree-dropdown>
    </gree-header>
    
    <gree-header 
      v-else          
      theme="transparent"
      :left-options="{ preventGoBack: true }"
      @on-click-back="goBack"
      :right-options="{ showMore: true }"
      @on-click-more="moreInfo">{{ devname }}
    </gree-header>  

    <gree-page class="page-home" has-navbar>
      <!-- <Header :fun="goBack" /> -->
      <!-- 模式选择 -->
      <div
        class="page-mode"
        :style="{
          backgroundImage: `url(${washmodeImg[washMode]})`,
        }"
      >
  

        <gree-tabs v-if="Pow" @change="selectType" v-model="showWashType" >
          <gree-tab-pane name="0" label="洗涤" :disabled="Boolean(specialLock || order)"/>
          <gree-tab-pane name="1" label="专业烘干" :disabled="Boolean(specialLock || order)"/>
          <gree-tab-pane name="2" label="洗烘" :disabled="Boolean(specialLock || order)"/>
          <gree-tab-pane name="3" label="蒸汽护理" :disabled="Boolean(specialLock || order)"/>
        </gree-tabs>

        <!-- 背景图片区域 -->
        <!-- 收藏夹 -->
        <div
          class="mode-favorites"
          :class="{ active: star }"
          @click="handleStar(!star)"
        />
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

            <!-- 中间几个配置 eg: 温度--洗涤--漂洗--转速 --烘干状态-->
            <div class="data-list" >
              <!-- <div class="arrow-block" > -->
              <img v-show="washList[washType].washMode[washModeIndex].configList.length > 4 && howPage === 2" @click="howPage=1" class="list-left" src="../../assets/img/ic_left.png" >
              <!-- </div> -->
              <div
                v-for="(item, index) in washList[washType].washMode[washModeIndex].configList"
                :key="index"
                v-show=" (howPage -1 ) * 4 <= index && index < howPage * 4 "
                class="data-block"
              >
                <!-- 滑轮 -->
                <div
                  :id="`TimerSelector${item.protocol}`"
                  class="timer-elector"
                  :class="{'visibility-hidden' : !isActive || index !== clickConfigIndex}"
                  :style="{bottom: errStatus ? '56px': ''}"
                />
                <!-- 配置参数 -->
                <p 
                  ref="trigger" 
                  class="protocol-value" 
                  @click="toggle(index)"
                  :class="{'visibility-hidden' : isActive && index === clickConfigIndex}"
                >{{ valueChangeZn(dataObject[item.protocol], item.protocol) }} 
                  <span class="protocol-unit" :class="{'hidden': hiddenUnit(dataObject[item.protocol], item.protocol)}"> {{ washUnit[item.protocol] }}</span> 
                </p>
                <!-- 配置说明 -->
                <p 
                  class="protocol-name" 
                  @click="toggle(index)" 
                  :class="{'mbsc-bg': isActive && index === clickConfigIndex }"
                >{{ washConfigDescribe[washType][item.protocol] }}</p>
              </div>
              <div class="arrow-block" v-show="washList[washType].washMode[washModeIndex].configList.length > 4 && howPage === 1" @click="howPage=2">
                <img class="list-right" src="../../assets/img/ic_right.png" >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 开始按钮 -->
      <div class="start-or-timer">
        <!-- 提醒提示 -->
        <gree-notice-bar
          v-show="warningStatus && !appointmentStatus && !isShowSoakPicker"
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
          :class="{textBlue: describe === '继续'}"
          @click="handleStartBtn"
        >
          {{ describe }}
        </gree-button>
      </div>

      <!-- 电源关闭 -->
      <gree-power-off
        class="re-ben-pow-off"
        v-model="showPowerOff"
        :text="powerOffDescribe"
        :style="{ backgroundImage: 'url(' + power_off_bg + ')' }"
      ></gree-power-off>
      
      <!-- 浸泡弹框 -->
      <SoakPicker
        v-if="isShowSoakPicker"
        @close="closeSoakPicker"
      />

      <!-- 设置预约状态 -->
      <Appointment
        v-if="order || appointmentStatus"
        @close="appointmentStatus = false"
      />

      <!-- 高级弹框 -->
      <FuncList
        :is-popup-show="isShowFunPopup"
        @hideFuncListPopUp="closeFuncList"
        @showSoakPicker="handleSoakPicker"
      />

      <!-- 模式弹框 -->
      <ModeList
        ref="mode"
        :is-popup-show="isShowModePopup"
        @hideModePopUp="closeModeList"
      />


      <!-- 底下按钮 开关-高级-模式 -->
      <gree-toolbar
        v-show="!(order || appointmentStatus || isShowSoakPicker)"
        position="bottom"
        no-hairline
      >
        <gree-row>
          <gree-col
            :class="{ hidden: !item.isShowFuncBtn, disabled: item.isDisabled }"
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

      <div style="display:none">{{ JFerr }}{{ dry }}</div>
    </gree-page>
  </gree-view>
</template>

<script>
import {
  Header,
  Icon,
  Tabs,
  TabPane,
  Popup,
  Row,
  Col,
  ToolBar,
  Button,
  Block,
  NoticeBar,
  Picker,
  PowerOff,
  Dialog,
  Dropdown,
  DropdownItem
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import Appointment from '../../components/Appointment';
import SoakPicker from '../../components/28a01/SoakPicker';
// import Header from '../../components/Header';

import {
  advancedList,
  washList, 
  modeIndexList
} from '../../../src/api/index';
import { changeZnValue, valueChangeZn, hiddenUnit} from '../../utils/config';

import favorModule from '../../mixins/config/28a01/favorModule';
import { changeBarColorPlugin, showToastPlugin, closePagePlugin, editDevicePlugin } from '../../api/pluginInterface.js';

import footConfig from '../../../src/api/home';
import error from '../../mixins/config/error';

import FuncList from '../../components/28a01/FunctionList';
import ModeList from '../../components/28a01/ModeList';
import {washmodeImg, washmodeName, washUnit, washConfigDescribe} from '../../api/utils';

export default {
  name: 'Home',
  components: {
    Header,
    Appointment,
    FuncList,
    ModeList,
    SoakPicker,
    [Header.name]: Header,
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Popup.name]: Popup,
    [ToolBar.name]: ToolBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Block.name]: Block,
    [Picker.name]: Picker,
    [PowerOff.name]: PowerOff,
    [NoticeBar.name]: NoticeBar,
    [DropdownItem.name]: DropdownItem,
    [Dropdown.name]: Dropdown,
  },
  mixins: [footConfig, favorModule, error],
  data() {
    return {
      washList,
      modeIndexList,
      instanceMobiScroll_washTemp: undefined, // mobiscroll实例
      instanceMobiScroll_setWashTime: undefined, // mobiscroll实例
      instanceMobiScroll_potch: undefined, // mobiscroll实例
      instanceMobiScroll_speed: undefined, // mobiscroll实例
      instanceMobiScroll_dryStatus: undefined, // mobiscroll实例
      power_off_bg: require('../../assets/img/bg_off_s.png'),
      advancedList,
      isActive: false,
      washmodeImg,
      washmodeName,
      washUnit,
      washConfigDescribe,
      clickConfigIndex: 0, // 参数选项小弹框的下标

      showWashType: '0',
      valueChangeZn,
      hiddenUnit,
      isShowSoakPicker: false, // 浸泡弹框
      isShowFunPopup: {}, // 高级功能弹框控制
      isShowModePopup: {}, // 模式弹框控制  
      time: 188,
      star: 0,
      moreList: ['设备信息', '洗衣机设置', '收藏夹'],
      pickerIndex: 0,
      appointmentStatus: false, // 预约是否打开状态
      powerOffDescribe: '已关机', // 关机描述
      washModeIndex: 0, // 类型的模式下表
      clickProtocol: '', // 弹起的选项卡对应字段
      howPage: 1, // 配置参数时第几页
      describe: '开始',
      isFirst: true,
      pickerTimer: 0
    };
  },
  computed: {
    ...mapState({
      mac: state => state.mac,
      devState: state => state.dataObject.devState,
      timeAll: state => state.dataObject.timeAll,
      timeLeft: state => state.dataObject.timeLeft,
      washType: state => state.dataObject.washType,
      washMode: state => state.dataObject.washMode,
      runStage: state => state.dataObject.runStage,
      
      /**
       * @function getPow
       * @param state state
       * @description 获取电源开关信息，更新电源按键UI
       */
      Pow: function getPow(state) {
        if (state.dataObject.Pow) {
          this.footList[0].ImgName = 'btn_off';
        } else {
          this.footList[0].ImgName = 'btn_on';
          Dialog.closeAll(); // 关闭所有Dialog
          this.closeModeList();
          this.closeFuncList();
          this.closeSoakPicker(true);
          this.appointmentStatus = false;
        }
        return state.dataObject.Pow;
      },
      functype: state => state.deviceInfo.functype,
      devname: state => state.deviceInfo.name,

      washTemp: state => state.dataObject.washTemp,
      setWashTime: state => state.dataObject.setWashTime,
      potch: state => state.dataObject.potch,
      speed: state => state.dataObject.speed,
      dry: state => state.dataObject.dry,
  
      energySave: state => state.dataObject.energySave,
      creaseRes: state => state.dataObject.creaseRes,
      childLock: state => state.dataObject.childLock,
      JFerr: state => state.dataObject.JFerr,

      specialLock: state => state.dataObject.specialLock,

      // 预约
      order: state => state.dataObject.order,
      orderLaunch: state => state.dataObject.orderLaunch,
      dataObject: state => state.dataObject,
      isCloseing: state => state.showData.isCloseing,
      isShowPopUp: state => state.showData.isShowPopUp,

      showPowerOff() {
        return !this.Pow;
      },
    }),

    bgStatus() {
      let color = '#fff';
      if (this.Pow) {
        color = '#f4f4f4';
      } else {
        color = '#cdd0d9';
      }
      changeBarColorPlugin(color);
      return color;
    }
  },

  watch: {
    /**
     * @description //整机状态判断
     */
    devState: {
      handler(newV) {   
        this.describe = newV === 2 || newV === 4 ? '继续' : '开始';
        // 如果设备启动了则跳转去启动页 (且不是预约状态)       
        if ('13'.includes(Number(newV))) {
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
     * @description //wifi 故障需要单独判断
     */ 
    Pow(newV) {
      if (newV && this.JFerr) {
        this.$router.push({
          name: 'Error'
        });
      }
    },
    JFerr(newV) {
      if (newV && this.Pow) {
        this.$router.push({
          name: 'Error'
        });
      }
    },

    /**
     * @description washType 无法双向绑定问题，在添加showWashType做过度值
     */
    washType: {
      immediate: true,
      handler(newV) {
        this.washModeIndex = this.modeIndexList[newV][this.washMode];
        this.showWashType = `${newV}`;
        if (this.howPage !== 1) this.howPage = 1; // 回归第一页
        if (this.isActive) { // 清除弹框
          this.isActive = false;
          this.clickConfigIndex = 0;
        } 
        if (newV && this.appointmentStatus) {
          this.appointmentStatus = false;
        }
        if (newV > -1) {
          Dialog.closeAll(); // 关闭所有Dialog
          this.$nextTick(() => { 
            if (this.pickerTimer) {
              clearTimeout(this.pickerTimer);
              this.pickerTimer = 0;
              this.pickerTimer = setTimeout(() => { this.setPickerList(); }, 100);
            } else {
              this.pickerTimer = setTimeout(() => { this.setPickerList(); }, 100);
            }
          });
        }
      }
    },

    washMode: { 
      immediate: true,
      handler(newV) {
        this.washModeIndex = this.modeIndexList[this.washType][newV];
        if (newV) {
          this.isActive = false;
          this.$nextTick(() => { 
            Dialog.closeAll(); // 关闭所有Dialog
            if (this.pickerTimer) {
              clearTimeout(this.pickerTimer);
              this.pickerTimer = 0;
              this.pickerTimer = setTimeout(() => { this.setPickerList(); }, 100);
            } else {
              this.pickerTimer = setTimeout(() => { this.setPickerList(); }, 100);
            }
          });
        }
      }
    },

    washTemp(newV) {
      this.rendering(newV, 'washTemp');
    },
    setWashTime(newV) {
      this.rendering(newV, 'setWashTime');
    },
    potch(newV) {
      this.rendering(newV, 'potch');
    },
    speed(newV) {
      this.rendering(newV, 'speed');
    },

    dry(newV) {
      this.rendering(newV, 'dry');
    },

    /**
     * @description // 进入洗涤后，在某个过程打开了弹框，进入下一个进程时如果不可调节，需把打开的弹框关掉
     */
    runStage(newV) {
      const closeSetWashTime = newV === 43 && this.clickProtocol === 'setWashTime';
      const closeWashTemp = newV === 37 && this.clickProtocol === 'washTemp';
      const closePotch = newV === 70 && this.clickProtocol === 'potch';
      const closeSpeedList = [34, 67, 83, 88];
      const closeSpeed = closeSpeedList.includes(newV) && this.clickProtocol === 'speed';
      const closeDryStatus = newV === 144 && this.clickProtocol === 'dry';
      const close = closeSetWashTime || closeWashTemp || closePotch || closeSpeed || closeDryStatus;
      close && (this.isActive = false);
    },
    /**
     * @function creaseRes
     * @description 防皱功能下默认转速大于800的需要调节转速为范围为0-800, 且转速变为800
     */
    creaseRes: {
      immediate: true,
      handler(newV, oldV) {
        if (!this.Pow) return;
        if (this.isFirst && !newV) {
          this.isFirst = false;
          return;
        }
        const isCreaseRes = newV && !oldV; // 选中防皱
        let isChange = false; // 是否需要改变
        let List = this.washList[this.washType].washMode[this.washModeIndex].configList; // 原本的list
        let changeList = ['不脱水', 400, 600, 800]; // 需要调整的list，初始化时为这个
        let defalutValue = 800; // 默认800
        // 判断是否需要改版滑轮的值
        List.forEach(element => {
          if (element.protocol === 'speed') { // 大前提当前滑轮是speed
            if ((element.value >= 800 || this.speed >= 800)) { // 如果当前速度或默认值大于800，需要改变滑轮
              isChange = true;
              if (this.speed < 800) defalutValue = this.speed; // 当前转速小于800，默认转速的值不变
              if ((element.list[0] >> 0) >= 800) { // 如果list 第一个就是大于800 的额，只有800
                changeList = [800];
              }
            }

            if (!isCreaseRes) { // 如果是取消防皱、恢复原本的列表
              changeList = element.list;
              defalutValue = element.value;
            }
          }
        });  

        if (!isChange) { // 如果取消选中防皱，回复默认转速
          if (defalutValue !== this.speed) this.setDataObj({speed: defalutValue}); 
          return;
        }
        let that = this;  
        this.$nextTick(() => {
          setTimeout(() => {
            this.instanceMobiScroll_speed = mobiscroll.scroller('#TimerSelectorspeed', {
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
                    data: changeList,
                  },
                ],
              ],
              onChange(event, inst) {
                that.pickerOnChange(event, inst);
              },
            },
            );
            this.instanceMobiScroll_speed.setVal(defalutValue);
            if (defalutValue !== this.speed) {
              this.setDataObj({speed: defalutValue}); 
            }
          }, 100);
        });
      },
    },

    /**
     * @description 安卓物理按键返回关闭弹框
     */
    isShowPopUp(newV, oldV) {
      if (!newV && oldV) {
        this.$set(this.isShowFunPopup, 'bottom', false); // 关闭底部高级弹框
        this.$set(this.isShowModePopup, 'bottom', false); // 关闭底部高级弹框
      }
    },
  },

  created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('click', this.clickedOutside);
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('click', this.clickedOutside);
    }
    Dialog.closeAll(); // 关闭所有Dialog
  },
  /**
   * @function initHome
   * @description 初始化Home页面
   */
  mounted() {
    this.$nextTick(() => {
      if (this.pickerTimer) {
        clearTimeout(this.pickerTimer);
        this.pickerTimer = 0;
        this.pickerTimer = setTimeout(() => { this.setPickerList(); }, 100);
      } else {
        this.pickerTimer = setTimeout(() => { this.setPickerList(); }, 100);
      }
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
     * @function selectType
     * @description 四大板块选择
     */
    selectType(item) {
      const row = item.name >> 0;
      
      if (this.washType !== row) {
        this.howPage = 1;
        this.isShowSoakPicker = false;
        this.appointmentStatus = false;
        const mode = row === 3 ? 0 : 1; // 默认棉麻
        const commitObj = {};
        if (this.order) commitObj.order = 0;
        const obj = {
          washType: row,
        };
        this.setDataObj(Object.assign(commitObj, obj));
        this.sendCtrl(obj);
        this.$refs.mode.selectMode(mode, true);
      }
    },

    /**
     * @description 滑轮赋值
     */
    rendering(newV, protocol) {
      let isRendering = false;
      let configList = this.washList[this.washType].washMode[this.washModeIndex].configList;
      for (const config of configList) {
        if (config.protocol) isRendering = true;
      }
      if (!isRendering || !this[`instanceMobiScroll_${protocol}`]) return;
      let realValue = valueChangeZn(newV, protocol); // 特殊数据需转中文放入滑轮
      
      if (protocol === 'dry' && newV >= 3 && newV <= 10) realValue += '分';

      this.$nextTick(() => {
        this[`instanceMobiScroll_${protocol}`].setVal(realValue);
      });
    },
    /**
     * @function setPickerList
     * @description // 参数小滑轮赋值
     */
    setPickerList() {
      const configList = this.washList[this.washType].washMode[this.washModeIndex].configList; 
      const _this = this;
      configList.forEach(element => {
        this[`instanceMobiScroll_${element.protocol}`] = mobiscroll.scroller(
          `#TimerSelector${element.protocol}`,
          {
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
                  data: element.list,
                },
              ],
            ],
            onChange(event, inst) {
              _this.pickerOnChange(event, inst);
            },
          },
        );

        let setValue = valueChangeZn(this[element.protocol], element.protocol);
        if (element.protocol === 'dry' && this[element.protocol] >= 3 && this[element.protocol] <= 10) setValue += '分'; 
        this[`instanceMobiScroll_${element.protocol}`].setVal(
          `${setValue}`,
        );
      });
    },

    /**
     * @function handleStartBtn
     * @description // 开始按键
     */
    handleStartBtn() {
      if (this.specialLock) {
        showToastPlugin('请先解锁童锁');
        return;
      }

      if (this.washMode === 10) {
        Dialog.confirm({
          title: '确认提示',
          content:
            '本程序仅适用于可机洗羊毛织物，请确认是否可机洗!  启动前请确保已打开机门手动投放适量中性洗涤剂。',
          confirmText: '确认',
          onConfirm: () => this.StartBtn(),
          cancelText: '取消',
          onCancel: () => console.log('取消')
        });
      } else if (this.washMode === 12) {
        Dialog.confirm({
          title: '确认提示',
          content:
            '本程序仅适用于可机洗丝绸织物，请确认是否可机洗! 启动前请确保已打开机门手动投放适量中性洗涤剂。',
          confirmText: '确认',
          onConfirm: () => this.StartBtn(),
          cancelText: '取消',
          onCancel: () => console.log('取消')
        });
      } else {
        this.StartBtn();
      }
    },

    StartBtn() {
      const obj = {
        launch: 1, // 按键启动/暂停状态
      };
      const runStage = this.devState === 2 ? this.runStage : 2; 
      // 启动时先把时间放到剩余时间里
      const timeLeft = this.devState === 2 ? this.timeLeft : this.timeAll;
      const commitObj = {
        devState: 1,
        timeLeft,
        runStage, 
        runTime: this.timeAll
      };
      if (this.childLock) commitObj.specialLock = 1;
      this.setDataObj(Object.assign(commitObj, obj));
      this.sendCtrl(obj);
      this.$router.push({ name: 'Startup' });
    },
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

    pickerOnChange(event, inst) {
      const _this = this;
      // 对应configList的数组下标配置
      const list = _this.washList[_this.washType].washMode[_this.washModeIndex];
      const configList = list.configList[_this.clickConfigIndex];
              
      const obj = {};
      const protocol = configList.protocol; // 对应的字段

      // 改变后的值
      const afterValue = changeZnValue(inst.getVal(), protocol) >> 0;
      
      if (afterValue === _this[protocol]) return; // 如果没改变不发指令              
      // 改变前的值
      const beforeValue = changeZnValue(_this[protocol], protocol);

      // 设置选中的值
      obj[protocol] = afterValue;
      _this.setDataObj(obj);
      _this.sendCtrl(obj);

      // 以下是根据选择的值计算变化的时间
      let addTime = 0; 
      let originalTime = _this.devState ? _this.timeLeft : _this.timeAll; // 判断是剩余时间还是运行总时间

      // 洗涤时间
      if (_this.clickProtocol === 'setWashTime') {
        addTime = originalTime + (afterValue - beforeValue);
      }
      // 温度
      if (_this.clickProtocol === 'washTemp') {
        const beforeTempTime = configList.timeList[beforeValue];
        const afterTempTime = configList.timeList[afterValue];
        addTime = originalTime + afterTempTime - beforeTempTime; 
        
        if (!afterValue && _this.energySave) {
          addTime -= list.auxiliaryTimeList.energySave;
          _this.setDataObj({energySave: 0});
        }
      }

      // 漂洗次数
      if (_this.clickProtocol === 'potch') {
        const singleTime = configList.singleTime;
        addTime = originalTime + (afterValue - beforeValue) * singleTime;
      }

      // 转速
      if (_this.clickProtocol === 'speed') {
        if (beforeValue && afterValue) return; // 前后转速均大于0，无逻辑变化 
        const creaseResTime = list.auxiliaryTimeList.creaseRes >> 0;
        if (beforeValue && !afterValue) { // 转速变为0
          addTime = originalTime - (list.speed0Time >> 0);
          if (_this.creaseRes) addTime -= creaseResTime;
        }
        if (!beforeValue && afterValue) { // 转速0变为非0
          addTime = originalTime + (list.speed0Time >> 0);
          if (_this.creaseRes) addTime += creaseResTime;
        }
      }

      // 烘干
      if (_this.clickProtocol === 'dry') {
        if (afterValue === 1 || afterValue === 13) {
          if (_this.washType === 1) { // 
            addTime = configList.timeDefalutList[afterValue]; 
          } else { // 洗涤烘干模式下只有快速13和标准1
            addTime = originalTime + (afterValue === 13 ? -10 : 10); 
          }
        } else {
          if (_this.devState) {
            _this.setDataObj({timeLeft: Number(valueChangeZn(afterValue, _this.clickProtocol).split('分')[0])});
          } else {
            _this.setDataObj({timeAll: Number(valueChangeZn(afterValue, _this.clickProtocol).split('分')[0])});
          }  
          return;
        }
      }
      _this.devState ? _this.setDataObj({timeLeft: addTime}) : _this.setDataObj({timeAll: addTime});
    },

    /**
     * @function toggle
     * @description // 显示参数选项弹框下标
     */
    toggle(index) {
      if (this.specialLock) {
        showToastPlugin('先解锁童锁');
        return;
      }
      if ((this.order && this.orderLaunch)) return;

      const configList = this.washList[this.washType].washMode[this.washModeIndex].configList;
      const length = configList[index].list.length;

      if (configList[index].protocol === 'speed' && this.creaseRes && configList[index].list[0] >= 800) {
        showToastPlugin('当前参数不可选择');
        return;
      }

      if (length !== 1) {
        this.clickProtocol = configList[index].protocol;  
        const protocol = this.clickProtocol;
        if (this.devState === 0) {
          this.clickConfigIndex = index;
          this.isActive = true;
        }
        if (this.devState === 2) {
          // 判断当前阶段是否可调节参数
          const canChangeSetWashTime = this.runStage < 37 && protocol === 'setWashTime'; // 洗涤时间
          const canChangeWashTemp = this.runStage < 43 && protocol === 'washTemp'; // 洗涤温度
          const canChangePotch = this.runStage < 70 && protocol === 'potch'; // 漂洗次数
          const uncanSpeedList = [34, 67, 83]; // 转速
          const canChangeSpeed = !uncanSpeedList.includes(this.runStage) && this.runStage < 88 && protocol === 'speed';
          const canChangeDryStatus = this.runStage < 144 && protocol === 'dry'; // 烘干状态
          const canChange = canChangeSetWashTime || canChangeWashTemp || canChangePotch || canChangeSpeed || canChangeDryStatus;
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
     * @description 顶部栏右边三个点更多设置项
     */
    selectMore(item, index) {
      switch (index) {
        case 0:
          editDevicePlugin(this.mac);
          break;
        case 1:
          this.$router.push({ name: 'Setup' });
          break;
        case 2:
          if (this.childLock && this.devState || this.specialLock) {
            showToastPlugin('请先解锁童锁');
            return;
          } 
          this.$router.push({ name: 'Favorites' });
          break;
        default:
          break;
      }
    },
    /**
     * @description 底部三个选项选择
     */
    setFunction(type, index) {
      const obj = {};
      const commitObj = {};
      switch (index) {
        case 0:
          obj.Pow = !this.Pow >> 0;
          if (!obj.Pow) { // 关机5秒不可开机
            this.powerOffDescribe = '已关机';
            this.setDataObj(Object.assign(commitObj, obj));
            this.sendCtrl(obj);
          } else { // 开机5秒内不可控，所以页面先不跳, 5秒后再跳控制页
            this.powerOffDescribe = '开机中···';
            this.sendCtrl(obj);
            this.setShowData({ isCloseing: 1 });

            // 开机时要把默认参数恢复
            const list = this.washList[this.washType].washMode[this.washModeIndex];
            const configList = list.configList; // configList
            const auxiliaryFunction = list.auxiliaryFunction; // auxiliaryFunction
            // 恢复配置参数
            commitObj.timeAll = list.defaultTime;
            configList.forEach(item => {
              commitObj[item.protocol] = changeZnValue(item.value, item.protocol) >> 0;
            });
            // 恢复高级功能
            for (const keys in auxiliaryFunction) {
              if (Object.prototype.hasOwnProperty.call(auxiliaryFunction, keys)) {
                const value = auxiliaryFunction[keys];
                commitObj[keys] = value === 'U' | 0;
              }
            }

            setTimeout(() => {
              this.setShowData({ isCloseing: 0 });
              this.setDataObj(Object.assign(commitObj, obj));
              this.powerOffDescribe = '已关机';
            }, 5000);
          }
          break;
        case 1:
          if (this.specialLock) {
            showToastPlugin('请先解锁童锁');
            return;
          }
          this.$set(this.isShowFunPopup, 'bottom', true); // 打开底部高级弹框
          this.setShowData({isShowPopUp: true});
          break;
        case 2:
          if (this.specialLock) {
            showToastPlugin('请先解锁童锁');
            return;
          }
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
    closeModeList(re = false) {
      this.howPage = 1;
      this.$set(this.isShowModePopup, 'bottom', false);
      this.isShowPopUp && this.setShowData({isShowPopUp: false});
      if (!re) {
        this.$nextTick(() => {
          if (this.pickerTimer) {
            clearTimeout(this.pickerTimer);
            this.pickerTimer = 0;
            this.pickerTimer = setTimeout(() => { this.setPickerList(); }, 100);
          } else {
            this.pickerTimer = setTimeout(() => { this.setPickerList(); }, 100);
          }
        });
      }
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
    /**
     * @description 打开浸泡弹框并把高级弹框关掉
     */
    handleSoakPicker() {
      this.$set(this.isShowFunPopup, 'bottom', false);
      // this.$set(this.isShowSoakPicker, 'bottom', true);
      this.isShowSoakPicker = true;
    },
    /**
     * @description  掉浸泡弹框并打开高级弹框
     */
    closeSoakPicker(isCloseFunPopup) {
      // this.$set(this.isShowSoakPicker, 'bottom', false);
      this.isShowSoakPicker = false;
      !isCloseFunPopup && this.$set(this.isShowFunPopup, 'bottom', true);
    },
  },
};
</script>
