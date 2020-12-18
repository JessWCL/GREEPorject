<!--
 * @Descripttion: 高级功能弹框
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-01-08 13:52:09
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-05-19 10:22:11
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
          v-for="(v, k) in washList"
          :key="k"
          @click.native="selectMode(k)"
        >
          <div class="icon">
            <img
              :src="[
                require(`../../assets/img/Icon/mode2/${
                  k === washModeIndex ? 'selected' : 'normal'
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
import {modeIndexList, washList} from '../../api/index';
import { changeZnValue } from '../../utils/config';

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
      washModeIndex: 0, //  模式对应washList的下表
    };
  },
  computed: {
    ...mapState({
      washMode: state => state.dataObject.washMode,
    }),
  },
  watch: {
    washMode: {
      handler(newV) {
        this.washModeIndex = this.modeIndexList[newV];
      },
      immediate: true,
    },
  },
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
     */
    selectMode(row) {
      const list = this.washList[row];
      const { modeNum, configList, defaultTime, auxiliaryFunction} = list;
      if (row !== undefined && modeNum !== this.washMode) {
        const obj = {
          washMode: modeNum,
        };
        let configObj = {
          runStage: 0,
          devState: 0,
          nightWash: 0, 
          highWater: 0, 
          energySave: 0,
          soak: 0,
          dry: 0,
          timeAll: defaultTime,
        };
        configList.forEach(item => { 
          configObj[item.protocol] = changeZnValue(item.value, item.protocol);
          // 特殊的如果切换模式时，烘干非默认值，需要加上额外时间
          const isChangeTime = item.protocol === 'dry' && item.value !== '不烘干';
          if (isChangeTime) {
            configObj.timeAll += item.timeList[configObj[item.protocol]];
          }
        });
        if (auxiliaryFunction.autoScour === 'U') configObj.autoScour = 1;
        if (auxiliaryFunction.autoMeek === 'U') configObj.autoMeek = 1;
        this.setDataObj(Object.assign(configObj, obj));
        this.sendCtrl(obj);
        this.$emit('hideModePopUp');
      }
    },
  },
};
</script>
