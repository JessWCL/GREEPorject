<!--
 * @Descripttion: 高级功能弹框
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-01-08 13:52:09
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-05-11 19:17:04
 -->
<template>
  <gree-popup 
    v-model="isPopupShow.bottom"
    position="bottom"
  >
    <div class="popup-bottom">
      <div 
        class="arrow-down" 
        @click="$emit('hideModePopUp')"
      />
      <gree-row>
        <gree-col
          width="25"
          v-for="(v, k) in washList[washType].washMode"
          :key="k"
          @click.native="selectMode(k)"
        >
          <div class="icon">
            <img
              :src="[
                require(`../../assets/img/Icon/${
                  k === modeIndexList[washType][washMode] ? 'selected' : 'normal'
                }/${v.IconName}.png`),
              ]"
            />
            <h3>{{ v.chineseName }}</h3>
          </div>
        </gree-col>
      </gree-row>
    </div>
  </gree-popup>
</template>

<script>
import { Popup, Row, Col } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { washList, modeIndexList } from '../../api/index';
import {
  changeZnValue
} from '../../utils/config';

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
        return {};
      },
    },
  },
  data() {
    return {
      modeIndexList,
      washList,
    };
  },
  computed: {
    ...mapState({
      washType: state => state.dataObject.washType, // 洗涤类型
      washMode: state => state.dataObject.washMode, // 洗涤模式
    }),
  },
  watch: {},
  created() {},
  methods: {
    ...mapMutations({
      setDataObj: 'SET_DATA_OBJECT',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @function selectMode
     * @description 模式选择
     * @params re 便是强制刷新
     */
    selectMode(row, re) {
      const list = this.washList[this.washType].washMode[row];
      const { modeNum, configList, defaultTime, auxiliaryFunction, otherFun } = list;
      
      if ((row !== undefined && modeNum !== this.washMode) || re) {
        const obj = {
          washType: this.washType,
          washMode: modeNum,
        };
        let configObj = {
          runStage: 0,
          devState: 0,
          noDrain: 0, 
          creaseRes: Number(this.washType === 3),
          soak: 0,
          energySave: 0,
          highWater: 0,
          timeAll: defaultTime, // 把默认时间放置到时间值里
        };
        configList.forEach(item => {
          configObj[item.protocol] = changeZnValue(item.value, item.protocol);
        });
        if (auxiliaryFunction.creaseRes === 'U')configObj.creaseRes = 1; // // 蒸汽护理默认防皱选中

        if (otherFun) { // 特殊 当有otherFun 时, 禁用自动投放
          configObj.autoScour = 0;
          configObj.autoMeek = 0;
        }
        Object.assign(configObj, obj);
        this.setDataObj(configObj); 
        this.sendCtrl(obj);
        this.$emit('hideModePopUp', re);
      }
    },
  },
};
</script>
