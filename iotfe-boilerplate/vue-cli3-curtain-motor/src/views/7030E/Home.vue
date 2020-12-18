<template>
  <gree-view>
    <gree-page no-navbar class="page-home" v-if="!isFirst">
      <div class="page-header">
        <gree-header
          theme="transparent"
          :left-options="{ preventGoBack: true }"
          @on-click-back="goBack"
          :right-options="{ showMore: true }"
          @on-click-more="moreInfo"
          >{{ devname }}</gree-header
        >
        <div class="battery-remind">
          <h3>
            {{ status }}
          </h3>
        </div>
      </div>

      <!-- 中间及下面 -->
      <div class="page-main">
        <div class="btn-control">
          <div
            :class="
              properties[0].value == '100'
                ? 'motor-opening-img'
                : 'motor-open-img'
            "
            @click="handleButtonChange('mach_operate', 'ZZ')"
          />
          <div
            :class="
              properties[0].value != 0 && properties[0].value != 100
                ? 'motor-suspending-img'
                : 'motor-suspend-img'
            "
            @click="handleButtonChange('mach_operate', 'STOP')"
          />
          <div
            :class="
              properties[0].value == '0'
                ? 'motor-closeing-img'
                : 'motor-close-img'
            "
            @click="handleButtonChange('mach_operate', 'FZ')"
          />
        </div>
        <!-- <div class="btn-appointment" @click="handleAppointment()">
          <img
            class="appointment-img"
            src="../../assets/img/appointment-icon-close.png"
            alt="appointment"
          />
          <h3 class="name-appointment">{{ $language('home.schedules') }}</h3>
        </div> -->
      </div>
      <div style="display:none">{{ ColorChange }}</div>
    </gree-page>
    <div class="box" v-else>
      <gree-activity-indicator gree-activity-indicator-css vertical
        >加载中...</gree-activity-indicator
      >
    </div>
  </gree-view>
</template>

<script>
import {
  Header,
  List,
  Item,
  // Block,
  Icon,
  ActivityIndicator,
  ScrollView,
  ScrollViewMore,
  Toast,
} from 'gree-ui'
import { mapState, mapMutations, mapActions } from 'vuex'
import { tuyaControlDev } from '../../../../static/lib/PluginInterface.promise'
// closePage,
// editDevice,
// changeBarColor,
import {
  changeBarColorPlugin,
  closePagePlugin,
  tuyaDeviceMorePlugin,
  tuyaControlDevPlugin,
} from '../../api/utils'

export default {
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    // [Block.name]: Block,
    [Icon.name]: Icon,
    [ActivityIndicator.name]: ActivityIndicator,
    [ScrollView.name]: ScrollView,
    [ScrollViewMore.name]: ScrollViewMore,
  },
  data() {
    return {
      lists: [],
      isFinished: false,
      statusString: ['close', 'pause', 'open'],
      status: '',
      timer: null,
    }
  },
  computed: {
    ...mapState({
      dataObject: (state) => state.dataObject,
      properties(state) {
        if (Number(state.dataObject.properties[0].value) === 0) {
          this.status = this.$language(`home.${this.statusString[0]}`)
        } else if (Number(state.dataObject.properties[0].value) === 100) {
          this.status = this.$language(`home.${this.statusString[2]}`)
        } else {
          this.status = this.$language(`home.${this.statusString[1]}`)
        }
        return state.dataObject.properties
      },
      devname: (state) => state.deviceInfo.name,
      functype: (state) => state.functype,
      mac: (state) => state.mac,
      isFirst: (state) => state.isFirst,
    }),
    power_off_bg() {
      const bg = require('@/assets/img/bg_off.png')
      return bg
    },
    /**
     * @description 主页面下更新状态栏颜色
     */
    ColorChange() {
      let color = false
      if (this.$route.name === 'Home') {
        color = '#1951A5'
      }
      // color ? changeBarColor(color) : '';
      color ? changeBarColorPlugin(color) : ''
      return color
    },
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setBtnStatus: 'CHANGE_STATUS',
      setIsUiLock: 'SET_UILOCK',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @description 返回键
     */
    goBack() {
      // closePage();
      closePagePlugin()
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      // editDevice(this.mac);
      tuyaDeviceMorePlugin(this.mac)
    },
    /**
     * @handleAppointment 预约页跳转(主体)
     */
    handleAppointment() {
      console.log('预约页跳转(主体)')
    },
    /**
     * @description: 下发控制命令及改变按钮样式
     * @param {string} eg: code:'Closeing', value: 'FZ',
     */
    handleButtonChange(code, value) {
      const Data = {
        code: 'position',
        value: 50,
      }
      if (value === 'FZ') {
        Data.value = 0
      }
      if (value === 'ZZ') {
        Data.value = 100
      }
      this.setBtnStatus([Data])

      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = 0
      }
      this.setIsUiLock(true)
      tuyaControlDevPlugin(this.mac, code, value)
      this.timer = setTimeout(() => {
        this.setIsUiLock(false)
      }, 5000)
      console.log(this.timer)
      // tuyaControlDevPlugin(this.mac, code, value);
    },
  },
}
</script>
