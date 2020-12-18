
// 
// 恭喜你，进坑了
//
<template>
  <gree-view bg-color="#4DB6CF">
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
          @on-click-more="moreInfo"> <span @click="onTest('stepOne')">{{ devname }}</span>
        </gree-header>
        <!-- 背景图片区域 -->

        <!-- 时间 -->
        <div class="mode-time" v-if="devState && devState !== 3 && devState !== 5">
          {{ timeLeft | timeConversion }}
        </div>
        <div class="mode-time" v-else>  <!-- 待机状态下显示这个 -->
          {{ timeAll | timeConversion }}
        </div>

        <div class="mode-name" @click="onTest('stepTwo')">
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
            <div :class="washList[washModeIndex].configList.length > 4 && howPage === 1 ? 'data-list-arrow' : 'data-list'">
              <img v-show="washList[washModeIndex].configList.length > 4 && howPage === 2" @click="howPage=1" class="list-left" src="../../assets/img/ic_left.png" >
              <div
                v-for="(item, index) in washList[washModeIndex].configList"
                :key="index"
                v-show=" (howPage -1 ) * 4 <= index && index < howPage * 4 "
                :class="{'data-block' : washList[washModeIndex].configList.length > 4}"
              >
                <div
                  :id="`TimerSelector${item.protocol}`"
                  class="timer-elector"
                  :class="{'visibility-hidden' : !isActive || index !== clickConfigIndex}"
                  :style="{bottom: errStatus ? '57px': ''}"
                ></div>
                <p class="protocol-value" :class="{'visibility-hidden' : isActive && index === clickConfigIndex}" @click="toggle(index)" ref="trigger">{{ valueChangeZn(dataObject[item.protocol], item.protocol) }} <span class="protocol-unit" :class="{'hidden': hiddenUnit(dataObject[item.protocol], item.protocol)}"> {{ washUnit[item.protocol] }}</span></p>
                <p class="protocol-name" @click="toggle(index)" :class="{'mbsc-bg': isActive && index === clickConfigIndex }">{{ washConfigDescribe[0][item.protocol] }}</p>
              </div>
              <div class="arrow-block" v-show="washList[washModeIndex].configList.length > 4 && howPage === 1" @click="howPage=2">
                <img class="list-right" src="../../assets/img/ic_right.png">
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

      <div style="display:none"></div>
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
import VConsole from 'vconsole/dist/vconsole.min.js';
import { mapState, mapMutations, mapActions } from 'vuex';
import FuncList from '../../components/28a03/FunctionList';
import ModeList from '../../components/28a03/ModeList';
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
      instanceMobiScroll_smudge: undefined, // mobiscroll实例
      instanceMobiScroll_dry: undefined, // mobiscroll实例
      power_off_bg: require('../../assets/img/bg_off_2.png'),
      washmodeImg2,
      washmodeName,
      valueChangeZn,
      hiddenUnit,
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
      howPage: 1,
      onTestFlag: 0
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
      smudge: state => state.dataObject.smudge,
      dry: state => state.dataObject.dry,
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
        // 如果设备启动了则跳转去启动页 (且不是预约状态, 已完成了第一次需要跳转)  

        if (newV === 1 || newV === 3) {
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
      if (newV && this.Pow) {
        this.$router.push({
          name: 'Error',
        });
      }
    },

    Pow(newV) {
      if (newV && this.JFerr) {
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
        this.howPage = 1;
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
    smudge(newV) {
      const list = ['无选择', '轻微', '标准', '较脏'];
      this.$nextTick(() => {
        setTimeout(() => { this.instanceMobiScroll_smudge.setVal(`${list[newV]}`); }, 0);
      });
    },

    dry: {
      immediate: true,
      handler(newV, oldV) {
        this.$nextTick(() => {
          this.instanceMobiScroll_dry.setVal(valueChangeZn(newV, 'dry'));
        });

        if (!this.Pow) return;
        if (this.isFirst && !newV) {
          this.isFirst = false;
        }
        const isDry = newV && !oldV; // 选择烘干
        const noDry = !newV && oldV; // 不选择烘干
        let isChange = isDry || noDry; // 是否需要改变
        if (!isChange) return; 

        const obj = this.washList[this.washModeIndex]; // configList
        if (!obj.drySpeed) return; // 特殊的,如果有烘干， 但没取消

        let List = obj.configList;
        let row = null;

        // 判断是否需要有dry配置项
        List.forEach(element => {
          if (element.protocol === 'dry') {
            isChange = true;
          }
        }); 
        if (!isChange) return; 


        // 获取speed 的index
        List.forEach((element, index) => {
          if (element.protocol === 'speed') {
            row = index;
          }
        }); 

        // 默认选择烘干 
        let changeList = obj.drySpeed.list; 
        let defalutValue = obj.drySpeed.value; 
        
        // 为不烘干时改变
        if (noDry) {
          changeList = List[row].list;
          defalutValue = List[row].value;
        }
        // 特殊的，当前转速为0且 选择烘干时，要加上0转速恢复的时间
        if (isDry && !this.speed) {
          const setObj = {};
          if (this.devState) {
            setObj.timeLeft = this.timeLeft + obj.Speed0Time;
          } else {
            setObj.timeAll = this.timeAll + obj.Speed0Time;
          }
          this.setDataObj(setObj);
        }

        // 特殊的，如果打开了滑轮，切换后只有一个值时，要关闭滑轮
        if (changeList.length < 3 && this.isActive) this.isActive = false; 

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
      }
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
    if ('13'.includes(this.devState)) this.$router.push({ name: 'Startup' }); // 从小卡片进来如果是已启动或已完成, 立即跳到启动页
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
   * @description 初始化Home页面
   */
  mounted() {
    changeBarColorPlugin('#4DB6CF');
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
        const setVal = valueChangeZn(this[element.protocol], element.protocol);
        this[`instanceMobiScroll_${element.protocol}`].setVal(`${setVal}`);
        setTimeout(() => {
        }, 100);
      });
    },

    /**
     * @description 滑轮改变触发时间
     */
    pickerOnChange(event, inst) {
      let _this = this;
      // 对应configList的数组下标配置
      const list = _this.washList[_this.washModeIndex];
      const configList = list.configList[_this.clickConfigIndex];
              
      const obj = {};
      const protocol = configList.protocol; // 对应的字段
              
      // 改变前的值
      const beforeValue = _this[protocol];
      // 改变后的值
      const afterValue = changeZnValue(inst.getVal(), protocol) >> 0;
      // 设置选中的值
      obj[protocol] = afterValue;
            
      if (_this[protocol] === afterValue) return; // 如果这个值相同，不发送数据
              
      _this.setDataObj(obj);
      _this.sendCtrl(obj); 

      if (_this.clickProtocol === 'smudge') return;

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

      // 烘干状态
      if (_this.clickProtocol === 'dry') {
        addTime = originalTime + (configList.timeList[afterValue] - configList.timeList[beforeValue]);
        if (_this.nightWash) {
          addTime -= list.auxiliaryTimeList.nightWash >> 0;
          sendobj.nightWash = 0;
          if (!_this.speed) {
            addTime += list.nightWashSpeed0Time - list.Speed0Time - 1;
          }
        }
      }

      _this.devState ? _this.setDataObj({timeLeft: addTime}) : _this.setDataObj({timeAll: addTime});
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

      // 运行阶段
      if (!this.devState) obj2.runStage = runStage;

      this.setDataObj(Object.assign(obj2, obj));
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
              commitObj.prompt1 = 0;
              commitObj.prompt2 = 0;
              this.setShowData({ isCloseing: 1 });
              setTimeout(() => {
                this.setShowData({ isCloseing: 0 });
              }, 5000);
              this.setDataObj(Object.assign(commitObj, obj));
              this.sendCtrl(obj);
            } else { // 开机3秒内不可控，所以页面先不跳
              this.powerOffDescribe = '开机中···';
              this.sendCtrl(obj);
              this.setShowData({ isCloseing: 1 });

              setTimeout(() => {
                this.setDataObj({devState: 0, Pow: 1});
                this.setShowData({ isCloseing: 0 });
              }, 3000)
            }
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
    closeModeList(row) {
      this.$set(this.isShowModePopup, 'bottom', false);
      this.isShowPopUp && this.setShowData({isShowPopUp: false});
      if (row === 0) {
        this.handleStartBtn();
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
     * @description 插件debug模式
     */
    onTest(key) {
      switch (key) {
        case 'stepOne':
          this.onTestFlag >= 3 ? this.onTestFlag = 0 : (this.onTestFlag += 1);
          break;
        case 'stepTwo':
          this.onTestFlag < 3 ? this.onTestFlag = 0 : this.onTestFlag += 1;
          break;
        default:
          this.onTestFlag = 0;
          break;
      }
      if (this.onTestFlag === 8) {
        new VConsole();
      }
    },
  },
};
</script>
