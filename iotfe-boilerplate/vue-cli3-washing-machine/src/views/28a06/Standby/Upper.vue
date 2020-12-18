<!--
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-07-08 17:19:24
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-07-10 18:51:39
-->
<template>
  <gree-view bg-color="#4DB6CF">
    <!-- Home主页，包含一个简易页面，请根据实际业务修改 -->
    <gree-page class="page-home" no-navbar>
      <!-- 模式选择 -->
      <div
        class="page-mode"
        :style="{ backgroundImage: `url(${washmodeImg3[washMode]})` }"
      >
        <gree-header
          theme="transparent"
          :left-options="{ preventGoBack: true }"
          @on-click-back="goBack"
          :right-options="{ showMore: true }"
          @on-click-more="moreInfo"
          >上层
        </gree-header>
        <!-- 背景图片区域 -->

        <!-- 时间 -->
        <div
          class="mode-time"
          v-if="devState && devState !== 3 && devState !== 5"
        >
          {{ timeLeft | timeConversion }}
        </div>
        <div class="mode-time" v-else>
          <!-- 待机状态下显示这个 -->
          {{ timeAll | timeConversion }}
        </div>

        <div class="mode-name">
          {{ washmodeName[washMode] }}
        </div>
        <div class="data-list-div-div">
          <div class="data-list-div">
            <!-- 故障提示 -->
            <!-- <gree-notice-bar
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
            </gree-notice-bar> -->

            <!-- 中间几个配置 eg: 温度--洗涤--漂洗--转速 -->
            <div
              :class="
                washList[modeIndexList[washMode]].configList.length > 4 &&
                howPage === 1
                  ? 'data-list-arrow'
                  : 'data-list'
              "
            >
              <img
                v-show="
                  washList[washModeIndex].configList.length > 4 && howPage === 2
                "
                @click="howPage = 1"
                class="list-left"
                src="@/assets/img/ic_left.png"
              />
              <div
                v-for="(item, index) in washList[modeIndexList[washMode]]
                  .configList"
                :key="index"
                v-show="(howPage - 1) * 4 <= index && index < howPage * 4"
                :class="{
                  'data-block':
                    washList[modeIndexList[washMode]].configList.length > 4,
                }"
              >
                <div
                  :id="`TimerSelector${item.protocol}`"
                  class="timer-elector"
                  :class="{
                    'visibility-hidden':
                      !isActive || index !== clickConfigIndex,
                  }"
                  :style="{ bottom: errStatus ? '57px' : '' }"
                />

                <p
                  class="protocol-value"
                  :class="{
                    'visibility-hidden': isActive && index === clickConfigIndex,
                  }"
                  @click="showPicker(index)"
                  ref="trigger"
                >
                  {{ valueChangeZn(dataObject[item.protocol], item.protocol) }}
                  <span
                    class="protocol-unit"
                    :class="{
                      hidden: hiddenUnit(
                        dataObject[item.protocol],
                        item.protocol,
                      ),
                    }"
                  >
                    {{ washUnit[item.protocol] }}
                  </span>
                </p>
                <p
                  class="protocol-name"
                  @click="showPicker(index)"
                  :class="{ 'mbsc-bg': isActive && index === clickConfigIndex }"
                >
                  {{ washConfigDescribe[0][item.protocol] }}
                </p>
              </div>
              <div
                class="arrow-block"
                v-show="
                  washList[washModeIndex].configList.length > 4 && howPage === 1
                "
                @click="howPage = 2"
              >
                <img class="list-right" src="@/assets/img/ic_right.png" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 开始按钮 -->
      <div class="start-or-timer">
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

        <gree-button
          v-show="!(order || appointmentStatus)"
          class="gree-button-stup"
          round
          @click="handleStartBtn"
        >
          {{ devState === 2 ? '继续' : '开始' }}
        </gree-button>
      </div>

      <!-- 设置预约状态 -->
      <upper-appointment
        v-if="order || appointmentStatus"
        @close="appointmentStatus = false"
      />

      <!-- 高级弹框 -->
      <upper-funclist
        v-if="isShowPopUp"
        :is-popup-show="isShowFunPopup"
        @hideFuncListPopUp="closeFuncList"
        key="upper"
      />

      <!-- 模式弹框 -->
      <ModeList
        v-if="isShowPopUp"
        ref="Modefage"
        :is-popup-show="isShowModePopup"
        layer="Upper"
        @hideModePopUp="closeModeList"
      />

      <!-- 底下按钮 开关-高级-模式 -->
      <gree-toolbar
        v-show="!(order || appointmentStatus)"
        position="bottom"
        no-hairline
      >
        <gree-row>
          <gree-col
            :class="{ opacity: item.invalid }"
            v-for="(item, index) in footList"
            :key="index"
            @click.native="setFunction(item)"
          >
            <div class="icon">
              <img
                :src="
                  require('@/assets/img/Icon/functionBtn/' +
                    item.IconName +
                    '.png')
                "
              />
            </div>
            <h3>{{ $language(item.itemName) }}</h3>
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
} from 'gree-ui'

import {
  changeBarColorPlugin,
  showToastPlugin,
  closePagePlugin,
  editDevicePlugin,
  showLoadingPlugin,
  hideLoadingPlugin,
} from '@/api/pluginInterface.js'
import {
  washmodeImg3,
  washmodeName,
  washUnit,
  washConfigDescribe,
} from '@/api/utils'
import { mapState, mapMutations, mapActions } from 'vuex'
import { footListStandby } from '@/api/28a06/advanced'
import {
  upperWashList,
  upperModeIndexList,
  disabledConfigObj,
} from '@/api/28a06/config'
import {
  changeZnValue,
  valueChangeZn,
  hiddenUnit,
  stainsList,
} from '@/utils/config'
import { getDisableObj } from '@/utils/index'

import ModeList from '@/components/28a06/ModeList'
import upperFunclist from '@/components/28a06/upperFunclist'
import upperAppointment from '@/components/28a06/upperAppointment'

export default {
  name: 'Upper',
  components: {
    ModeList,
    upperFunclist,
    upperAppointment,
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
  data() {
    return {
      washmodeImg3,
      washmodeName,
      washUnit,
      washConfigDescribe,
      valueChangeZn,
      hiddenUnit,
      washList: upperWashList,
      modeIndexList: upperModeIndexList,
      appointmentStatus: false,
      howPage: 1,
      washModeIndex: 0,
      isActive: false, // 配置参数是否打开
      clickConfigIndex: 0, // 参数选项小弹框的下标
      clickProtocol: 'washTemp', // 谈起的选项卡对应字段
      isShowFunPopup: {}, // 高级功能弹框控制
      isShowModePopup: {}, // 模式弹框控制
      errStatus: false,
      warningStatus: false,
      warnMsg: '',
      instanceMobiScroll_washTemp: undefined, // mobiscroll实例
      instanceMobiScroll_setWashTime: undefined, // mobiscroll实例
      instanceMobiScroll_potch: undefined, // mobiscroll实例
      instanceMobiScroll_speed: undefined, // mobiscroll实例
      instanceMobiScroll_dry: undefined, // mobiscroll实例,
      instanceMobiScroll_stains: undefined, // mobiscroll实例,
    }
  },
  computed: {
    ...mapState({
      mac: (state) => state.mac,
      childLock: (state) => state.parseObj.childLock,
      devState: (state) => state.parseObj.drum1Params.devState, // 当前整机状态
      washMode: (state) => state.parseObj.drum1Params.washMode,
      timeAll: (state) => state.parseObj.drum1Params.timeAll, // 总设定的时间
      timeLeft: (state) => state.parseObj.drum1Params.timeLeft, // 洗涤剩余时间
      runStage: (state) => state.parseObj.drum1Params.runStage, // 当前运行阶段
      order: (state) => state.parseObj.drum1Params.order, // 预约
      orderLaunch: (state) => state.parseObj.drum1Params.orderLaunch, // 预约
      dataObject: (state) => state.parseObj.drum1Params,
      washTemp: (state) => state.parseObj.drum1Params.washTemp,
      setWashTime: (state) => state.parseObj.drum1Params.setWashTime,
      potch: (state) => state.parseObj.drum1Params.potch,
      speed: (state) => state.parseObj.drum1Params.speed,
      stains: (state) => state.parseObj.drum1Params.stains,
      isShowPopUp: (state) => state.showData.isShowPopUp,
    }),

    // 底部样式生成
    footList() {
      const list = JSON.parse(JSON.stringify(footListStandby))
      list.forEach((item) => {
        const element = item
      })
      return list
    },
  },
  watch: {
    devState: {
      handler(newV) {
        if (newV === 1) {
          this.$router.push({
            name: 'UpperStartup',
          })
        }
      },
      immediate: true,
    },
    /**
     * @description 获取洗涤模式对应的list下标
     */
    washMode: {
      handler(newV) {
        this.washModeIndex = this.modeIndexList[newV]
        this.howPage = 1
        this.$nextTick(() => {
          this.isActive = false
          this.setPickerList()
        })
      },
      immediate: true,
    },

    // 开启童锁自动关闭弹框
    childLock(newV) {
      if (newV && this.isShowPopUp) {
        this.setShowData({ isShowPopUp: false })
      }
    },

    // 更新滑轮的值
    washTemp(newV) {
      if (this.devState === 1) return
      this.$nextTick(() => {
        this.instanceMobiScroll_washTemp.setVal(newV)
      })
    },
    setWashTime(newV) {
      if (this.devState === 1) return
      this.$nextTick(() => {
        this.instanceMobiScroll_setWashTime.setVal(newV)
      })
    },
    potch(newV) {
      if (this.devState === 1) return
      this.$nextTick(() => {
        this.instanceMobiScroll_potch.setVal(newV)
      })
    },
    speed(newV) {
      if (this.devState === 1) return
      this.$nextTick(() => {
        this.instanceMobiScroll_speed.setVal(newV)
      })
    },
    stains(newV) {
      if (this.devState === 1) return
      this.$nextTick(() => {
        this.instanceMobiScroll_stains.setVal(stainsList[newV])
      })
    },
  },

  created() {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        document.addEventListener('click', this.clickedOutside)
      }, 100)
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('click', this.clickedOutside)
    }
  },
  mounted() {
    changeBarColorPlugin('#4DB6CF')
  },

  methods: {
    ...mapMutations({
      setShowData: 'SET_SHOW_DATA',
      setUpperObj: 'SET_UPPER_OBJECT',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    goBack() {
      this.$router.push({
        name: 'Home',
      })
    },
    moreInfo() {
      console.log('-------------')
    },

    /**
     * @function setPickerList
     * @description // 配置参数小滑轮赋值
     */
    setPickerList() {
      const configList = this.washList[this.washModeIndex].configList
      const _this = this
      configList.forEach((element) => {
        const list =
          element.list.length === 3
            ? element.list.concat(element.list)
            : element.list
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
                  data: list,
                },
              ],
            ],
            onChange(event, inst) {
              _this.pickerOnChange(event, inst)
            },
          },
        )
        this[`instanceMobiScroll_${element.protocol}`].setVal(
          `${this[element.protocol]}`,
        )
      })
    },

    /**
     * @description 滑轮触发改变时间
     */
    pickerOnChange(event, inst) {
      const _this = this
      // 对应configList的数组下标配置
      const list = _this.washList[_this.washModeIndex]
      const configList = list.configList[_this.clickConfigIndex]

      const obj = {}
      const protocol = configList.protocol // 对应的字段

      // 改变前的值
      const beforeValue = _this[protocol]

      // 改变后的值
      const afterValue = changeZnValue(inst.getVal(), protocol) >> 0

      // 设置选中的值
      obj[protocol] = afterValue

      if (_this[protocol] === afterValue) return // 如果这个值相同，不发送数据

      _this.setUpperObj(obj)
      _this.sendCtrl(obj)

      // 以下是根据选择的值计算变化的时间&&各参数的特殊逻辑
      let addTime = 0
      let originalTime = _this.devState ? _this.timeLeft : _this.timeAll
      const sendObj = {}
      // 转速
      if (_this.clickProtocol === 'speed') {
        // const Speed0Time = _this.nightWash === 1 ? list.nightWashSpeed0Time - 1 : list.Speed0Time; // 如果是否选中夜间洗、转速为0减去的时间是不

        // if (!afterValue && beforeValue) { // 如果新值为0, 久值不为0  不脱水，减去脱水的时间
        //   addTime = originalTime - Speed0Time;
        // } else if (afterValue && !beforeValue) { // 如果久值为0 新值不为0
        //   addTime = originalTime + Speed0Time;
        // } else {
        //   return;
        // }
        const beforeSpeedTime = configList.timeList[beforeValue]
        const afterSpeedTime = configList.timeList[afterValue]

        addTime = originalTime + afterSpeedTime - beforeSpeedTime
      }
      // 温度
      if (_this.clickProtocol === 'washTemp') {
        const beforeTempTime = configList.timeList[beforeValue]
        const afterTempTime = configList.timeList[afterValue]

        addTime = originalTime + afterTempTime - beforeTempTime // 温度越高，时间越长，所以是总时间-变化时间
      }

      // 洗涤时间
      if (_this.clickProtocol === 'setWashTime') {
        addTime = originalTime + (afterValue - beforeValue)
      }

      // 漂洗次数
      if (_this.clickProtocol === 'potch') {
        const singleTime = configList.singleTime
        addTime = originalTime + (afterValue - beforeValue) * singleTime
      }

      // 污渍
      if (_this.clickProtocol === 'stains') {
        const stainsLogic = configList.stainsLogic
        // 改变前的温度和洗涤时间
        const beforeSetWashTime = _this.setWashTime
        const beforeWashTemp = _this.washTemp

        // 改变后的温度和洗涤时间
        const afterSetWashTime = stainsLogic[afterValue].setWashTime
        const afterWashTemp = stainsLogic[afterValue].washTemp

        // const diffSetWashTime = afterSetWashTime - beforeSetWashTime;
        sendObj.setWashTime = afterSetWashTime
        sendObj.washTemp = afterWashTemp

        _this.setUpperObj(sendObj)
        return
      }

      _this.devState
        ? (sendObj.timeLeft = addTime)
        : (sendObj.timeAll = addTime)
      _this.setUpperObj(sendObj)
    },

    /**
     * @description 显示参数选项弹框
     */
    showPicker(index) {
      if (this.childLock) {
        showToastPlugin('先解锁童锁')
        return
      }
      if (this.order && this.orderLaunch) return
      const washList = this.washList[this.washModeIndex]
      const configList = washList.configList
      const length = configList[index].list.length
      const protocol = configList[index].protocol
      const isStains =
        this.stains && (protocol === 'washTemp' || protocol === 'setWashTime')
      if (length !== 1 && !isStains) {
        this.clickProtocol = configList[index].protocol // 当可选时再切换
        if (this.devState === 0) {
          this.clickConfigIndex = index
          this.isActive = true
        }
        if (this.devState === 2) {
          // 判断当前阶段是否可调节参数
          // 获取禁用的配置参数
          const obj = getDisableObj(disabledConfigObj, this.runStage)
          const canChange = !obj[protocol]
          if (canChange) {
            this.clickConfigIndex = index
            this.isActive = true
          } else {
            showToastPlugin('当前阶段不可调整该参数')
          }
        }
      } else {
        showToastPlugin('当前参数不可选择')
      }
    },

    /**
     * @description // 开始按键
     */
    handleStartBtn() {
      console.log('--------handleStartBtn---')
      const sendObj = {
        launch: 1, // 按键启动/暂停状态
      }
      const commitObj = {
        devState: 1, // 启动状态
        timeLeft: this.devState === 2 ? this.timeLeft : this.timeAll,
      }

      // 运行阶段
      let runStage = 2
      if (!this.devState) commitObj.runStage = runStage

      this.setUpperObj(Object.assign(commitObj, sendObj))

      this.$router.push({
        name: 'UpperStartup',
      })
    },

    /**
     * @description 底部三个
     */
    setFunction(item) {
      // console.log(item);
      if (item.invalid) return
      if (this.childLock) {
        showToastPlugin('先解锁童锁')
        return
      }
      switch (item.protocol) {
        case 'mode':
          this.$set(this.isShowModePopup, 'bottom', true) // 打开底部模式弹框
          this.setShowData({ isShowPopUp: true })
          break
        case 'appointment':
          this.appointmentStatus = true
          break
        case 'senior':
          this.$set(this.isShowFunPopup, 'bottom', true) // 打开底部模式弹框
          this.setShowData({ isShowPopUp: true })
          break
        default:
          break
      }
    },

    /**
     * @description 关闭模式弹框
     */
    closeModeList() {
      this.$set(this.isShowModePopup, 'bottom', false)
      this.isShowPopUp && this.setShowData({ isShowPopUp: false })
    },

    /**
     * @description 关闭高级弹框
     */
    closeFuncList() {
      this.$set(this.isShowFunPopup, 'bottom', false)
      this.isShowPopUp && this.setShowData({ isShowPopUp: false })
    },
    /**
     *  @description 如果点击外部，关闭下拉菜单
     */
    clickedOutside(event) {
      if (!this.isInWhiteList(event.target)) {
        this.isActive = false
      }
    },
    /**
     * @description 白名单，单独设置点击时不关闭时
     */
    isInWhiteList(el) {
      try {
        const classNameList = [
          'protocol-value',
          'protocol-unit',
          'protocol-name mbsc-bg',
        ]
        if (
          classNameList.includes(el.className) ||
          classNameList.includes(el.parentNode.className)
        )
          return true
        if (el === this.$refs.trigger) {
          return true
        }
        if (this.$refs.trigger !== undefined) {
          const children = this.$refs.trigger
          for (const child of children) {
            if (el === child) {
              return true
            }
          }
        }
        return false
      } catch (error) {
        return false
      }
    },
  },
}
</script>
