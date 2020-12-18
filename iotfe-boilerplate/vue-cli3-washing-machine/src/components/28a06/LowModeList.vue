<!--
 * @Descripttion: 高级功能弹框
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-01-08 13:52:09
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-07-10 18:42:21
 -->
<template>
  <gree-popup v-model="isPopupShow.bottom" position="bottom">
    <div class="popup-bottom">
      <div class="arrow-down" @click="$emit('hideModePopUp')" />
      <gree-row>
        <gree-col
          width="25"
          v-for="(v, k) in layer === 'Low' ? washList[washType] : washList"
          :key="k"
          @click.native="selectMode(v)"
        >
          <div class="icon">
            <img
              :src="[
                require(`@/assets/img/Icon/mode2/${
                  v.protocolNum === nowWashMode ? 'selected' : 'normal'
                }/${v.IconName}.png`),
              ]"
            />
            <h3>{{ washmodeName[v.protocolNum] }}</h3>
          </div>
        </gree-col>
      </gree-row>
    </div>
  </gree-popup>
</template>

<script>
import { Popup, Row, Col } from 'gree-ui'
import { mapState, mapMutations, mapActions } from 'vuex'
import { changeZnValue } from '@/utils/config'
import { upperWashList } from '@/api/28a06/config'
import { middleWashList } from '@/api/28a06/config'
import { lowWashList } from '@/api/28a06/config'
import { washmodeName } from '@/api/utils'

export default {
  name: 'ModeList',
  components: {
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  props: {
    isPopupShow: {
      type: Object,
      default() {
        return {}
      },
    },
    layer: {
      type: String,
      default: 'Middle',
    },
  },
  data() {
    return {
      washList: [],
      washmodeName,
    }
  },
  computed: {
    ...mapState({
      upperWashMode: (state) => state.parseObj.drum1Params.washMode,
      middleWashMode: (state) => state.parseObj.drum2Params.washMode,
      lowWashMode: (state) => state.parseObj.drum3Params.washMode,
      washType: (state) => state.parseObj.drum3Params.washType,
    }),

    // 当前模式值
    nowWashMode() {
      let value = 1
      switch (this.layer) {
        case 'Upper':
          value = this.upperWashMode
          break
        case 'Middle':
          value = this.middleWashMode
          break
        case 'Low':
          value = this.lowWashMode
        default:
          break
      }
      return value
    },
  },
  watch: {},
  created() {
    switch (this.layer) {
      case 'Upper':
        this.washList = upperWashList
        break
      case 'Middle':
        this.washList = middleWashList
        break
      case 'Low':
        this.washList = lowWashList
      default:
        break
    }
  },
  methods: {
    ...mapMutations({
      setDataObj: 'SET_DATA_OBJECT',
      setUpperObj: 'SET_UPPER_OBJECT',
      setMiddle: 'SET_MIDDLE_OBJECT',
      setLowObj: 'SET_LOW_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @function selectMode
     * @description 模式选择
     */
    selectMode(list, re) {
      if (list.protocolNum === this.nowWashMode) return
      let realList = list
      console.log('selectMode', re);
      if(re !== undefined){
        realList = this.washList[this.washType][0]
      }
      const { protocolNum, configList, defaultTime, auxiliaryFunction } = realList
      const obj = {
        washMode: protocolNum,
      }

      // 系统参数更改
      let configObj = {
        runStage: 0,
        devState: 0,
        timeAll: defaultTime,
      }
      // 高级功能全部清零
      const funKeyList = Object.keys(auxiliaryFunction)
      console.log('funKeyList', funKeyList);
      funKeyList.forEach((item) => {
        configObj[item] = 0
      })
      console.log('4654646');
      
      // 赋默认滑轮的值
      configList.forEach((item) => {
        configObj[item.protocol] = changeZnValue(item.value, item.protocol)

      })


      Object.assign(configObj, obj)
      if (this.layer === 'Middle') {
        this.setMiddle(configObj)
      }
      if (this.layer === 'Upper') {
        this.setUpperObj(configObj)
      }
      if (this.layer === 'Low') {
        this.setLowObj(configObj)
      }
      this.sendCtrl(obj)
      this.$emit('hideModePopUp')
    },
  },
}
</script>
