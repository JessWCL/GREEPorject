<!--
 * @Descripttion: 总览页
 * @version: 1.0
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-07-08 15:56:14
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-07-09 19:18:09
-->
<template>
  <gree-view bg-color="#4DB6CF">
    <gree-page class="panorama" no-navbar>
      <gree-header
        @on-click-back="goBack"
        :right-options="{ showMore: true }"
        @on-click-more="moreInfo"
        >{{ devname }}
      </gree-header>

      <div class="enter">
        <!-- 上筒 -->
        <div class="upper" @click="goToStandby('Upper')">

          <div class="content no-working-content" v-if="!drum1DevState">
              上筒
          </div>

          <div class="content working-content" v-else>
            <div class="upper-mode">
              {{ washmodeName[drum1washMode] }}
            </div>
            <div class="upper-washTime">
              {{ drum1TimeAll | timeConversion }}
            </div>
            <div class="upper-describe">
              剩余时间
            </div>
          </div>
        </div>

        <!-- 中筒 -->
        <div class="middle" @click="goToStandby('Middle')">
          <div class="content no-working-content" v-if="!drum2DevState">
              中筒
          </div>
          <div class="content working-content" v-else>
            <div class="middle-mode">
              {{ washmodeName[drum2washMode] }}
            </div>
            <div class="middle-washTime">
              {{ drum2TimeAll | timeConversion }}
            </div>
            <div class="middle-describe">
              剩余时间
            </div>
          </div>
        </div>

        <!-- 下筒 -->
        <div class="lower" @click="goToStandby('Lower')">
          <div class="content no-working-content" v-if="!drum3DevState">
              下筒
          </div>
          <div class="content working-content" v-else>
            <div class="lower-mode">
              {{ washTypeName[drum3washType] }} ({{ washmodeName[drum3washMode] }})
            </div>
            <div class="lower-washTime">
              {{ drum3TimeAll | timeConversion }}
            </div>
            <div class="lower-describe">
              剩余时间
            </div>
          </div>
        </div>
      </div>

      <gree-toolbar position="bottom" no-hairline>
        <gree-row>
          <gree-col
            v-for="(item, index) in footList"
            :key="index"
            :class="{'opacity': item.invalid,  'visibility-hidden': !item.show }"
            @click.native="setFunction(item)"
          >
            <div class="icon">
              <img
                :src="
                  require('@/assets/img/Icon/functionBtn/' +
                    item.ImgName +
                    '.png')
                "
              />
            </div>
            <h3>{{ $language(item.itemName) }}</h3>
          </gree-col>
        </gree-row>
      </gree-toolbar>

      <!-- 电源关闭 -->
        <!-- :text="powerOffDescribe" -->
      <gree-power-off
        v-model="showPowerOff"
        :style="{ backgroundImage: 'url(' + power_off_bg + ')' }"
      ></gree-power-off>

    </gree-page>
    <router-view />
  </gree-view>
</template>

<script>
import { Header, PowerOff, Row, Col, ToolBar } from 'gree-ui'
import { mapState, mapMutations, mapActions } from 'vuex'
import { footListHome } from '@/api/28a06/advanced'
import {
  changeBarColorPlugin,
  showToastPlugin,
  closePagePlugin,
  editDevicePlugin,
  showLoadingPlugin,
  hideLoadingPlugin,
} from '../../api/pluginInterface.js'
import { washTypeName, washmodeName } from '@/api/utils'

export default {
  name: 'Home',
  components: {
    [Header.name]: Header,
    [PowerOff.name]: PowerOff,
    [Row.name]: Row,
    [Col.name]: Col,
    [ToolBar.name]: ToolBar,
  },
  data() {
    return {
      washTypeName,
      washmodeName,
      power_off_bg: require('../../assets/img/box-bg-off-e.png'),
    }
  },
  computed: {
    ...mapState({
      devname: (state) => state.deviceInfo.name,
      Pow: (state) => state.parseObj.Pow,
      mute: (state) => state.parseObj.mute,
      childLock: (state) => state.parseObj.childLock,
      drum1DevState: (state) => state.parseObj.drum1Params.devState, // 筒状态
      drum1TimeAll: (state) => state.parseObj.drum1Params.timeAll, // 总设定的时间
      drum1TimeLeft: (state) => state.parseObj.drum1Params.timeLeft, // 洗涤剩余时间
      drum1washMode: (state) => state.parseObj.drum1Params.washMode,

      drum2DevState: (state) => state.parseObj.drum2Params.devState, // 筒状态
      drum2TimeAll: (state) => state.parseObj.drum2Params.timeAll,
      drum2TimeLeft: (state) => state.parseObj.drum2Params.timeLeft,
      drum2washMode: (state) => state.parseObj.drum2Params.washMode,

      drum3DevState: (state) => state.parseObj.drum3Params.devState, // 筒状态
      drum3TimeAll: (state) => state.parseObj.drum3Params.timeAll,
      drum3TimeLeft: (state) => state.parseObj.drum3Params.timeLeft,
      drum3washType: (state) => state.parseObj.drum3Params.washType,
      drum3washMode: (state) => state.parseObj.drum3Params.washMode,
    }),

    // 关机
    showPowerOff() {
      return !this.Pow;
    },

    // 底部栏的状态显示
    footList() {
      const list = JSON.parse(JSON.stringify(footListHome))
      list.forEach((item) => {
        const element = item
        const value = this[element.protocol] ? 'on' : 'off'
        element.selected = !!this[element.protocol]
        element.ImgName = `${element.IconName}_${value}`
        if (element.protocol === 'mute') { // 童锁禁用静音
          element.invalid = !!this.childLock
          element.show = !!this.Pow
        }
        if(element.protocol === 'childLock'){
          element.show = !!this.Pow
        }
      })   
      return list
    },
  },
  watch: {},
  methods: {
    ...mapMutations({
      setParseObj: 'SET_PARSE_OBJECT',
    }),
    /**
     * @function goBack
     * @description 返回键
     */
    goBack() {
      closePagePlugin()
    },

    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevicePlugin(this.mac)
    },

    /**
     * @description 底部三个选项选择
     */
    setFunction(item) {
      if (item.invalid) return
      const setObj = {}
      setObj[item.protocol] = !item.selected >> 0
      this.setParseObj(setObj)
    },

    goToStandby(name) {
      this.$router.push({
        name,
      })
    },
  },
}
</script>
