<!--
 * @Descripttion: 高级功能弹框
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-01-08 13:52:09
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-04-28 10:35:09
 -->
<template>
  <gree-popup v-model="isPopupShow.bottom" position="bottom">
    <div class="popup-bottom">
      <div class="arrow-down" @click="$emit('hideFuncListPopUp')"></div>
      <gree-row>
        <gree-col width="25" v-for="(v, k) in advancedList" :key="k">
          <div
            class="icon"
            @click="selectSenior(v.invalid, v.selected, k)"
          >
            <img
              :src="[
                require(`../../assets/img/Icon/${
                  v.invalid ? 'invalid' : v.selected ? 'selected' : 'normal'
                }/${v.IconName}.png`),
              ]"
            />
            <h3 :class="{opacity: v.invalid}">
              {{ $language(v.itemName) }}
              <img
                class="icon-more"
                src="../../assets/img/ic_more.png"
                v-if="v.showArrowMore"
              />
            </h3>
          </div>
        </gree-col>
      </gree-row>
    </div>
  </gree-popup>
</template>

<script>
import { Popup, Row, Col } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import funcConfig from '../../mixins/config/28a01/funcConfig';
import { showToastPlugin } from '../../api/pluginInterface.js';

export default {
  name: 'FuncList',
  components: {
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  mixins: [funcConfig],
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
      washModeIndex: 0, //  模式对应washList的下表
    };
  },
  computed: {
    ...mapState({
      devState: state => state.dataObject.devState,
      timeLeft: state => state.dataObject.timeLeft,
      timeAll: state => state.dataObject.timeAll,
      
      washType: state => state.dataObject.washType,
      washMode: state => state.dataObject.washMode,
      soakTime: state => state.dataObject.soakTime,
      speed: state => state.dataObject.speed,
    }),
  },
  watch: {
    washMode: {
      handler(newV) {
        this.washModeIndex = this.modeIndexList[this.washType][newV];
      },
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    ...mapMutations({
      setDataObj: 'SET_DATA_OBJECT',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @function selectSenior
     * @description 点击底部高级后弹框中的图标
     */
    selectSenior(invalid, sel, row) {  
      if (!invalid) {
        // 判断是否是预约 预约是第一位
        if (!row) {
          this.$emit('hideFuncListPopUp', true);
        } else if (row === 2 && !sel) { // 判断是否选择了浸泡，需额外弹框
          this.$emit('showSoakPicker');
        } else {
          // const value = !this.advancedList[row].selected;
          const obj = {};
          const protocol = this.advancedList[row].protocol; // 获取点击的字段
          const newV = !this.advancedList[row].selected >> 0;  
          const oldV = this[protocol];
          // const list = this.washList[this.washType].washMode[this.washModeIndex];
          // console.log(list,);
          
          obj[protocol] = Number(!sel);

          if (protocol === 'soak' && sel) { // 如果取消浸泡，需要把浸泡时间清0  
            obj.soakTime = 0;
          }
          
          if (protocol === 'creaseRes') {
            if (this.washType === 3) {
              showToastPlugin('蒸汽护理下无法取消');
              return;
            }
            if (obj[protocol]) { // 选中toast
              showToastPlugin('防皱功能适用的衣物重量为2kg以下');
            } 
          } 

          const spealList = ['energySave', 'creaseRes', 'soak']; // 选择这些需要加减时间
          if (spealList.indexOf(protocol) >= 0) this.changeTimeHandle(newV << 0, oldV, protocol);
          this.setDataObj(obj);
          this.sendCtrl(obj);
        }
      } else {
        this.devState ? showToastPlugin('当前阶段不可选择该高级功能') : showToastPlugin('当前模式不可选择该高级功能');
      }
    },
    /**
     * @description 判断防皱、节能、浸泡是否有选择，如有则+，没有则-.PS：首次没有不运行-, 且不可更改dataobj的默认值
     */
    changeTimeHandle(newV, oldV, protocol) {
      this.handleSelect(newV, oldV, protocol);
    },
    /**
     * @description 是否选择该高级功能，进而判断+-时间
     * @param protocol 需要判断的字段
     */
    handleSelect(newV, oldV, protocol) {
      const trunOn = newV === 1 && oldV === 0; // 注意不可直接判断是1还是0，首次会undefind，特殊，会存在2
      const trunOff = newV === 0 && oldV === 1;
      const list = this.washList[this.washType].washMode[this.washModeIndex];
      const time = list.auxiliaryTimeList[protocol] >> 0;
      const obj = {};

      if ((time === undefined && protocol !== 'soak') || (protocol === 'soak' && newV === 1)) return; // 没有或切换了模式则直接return
      
      let afterTime = this.devState ? this.timeLeft : this.timeAll; // 需判断是否待机状态
    
      if (protocol === 'creaseRes') { 
        if (trunOn && this.speed) afterTime += time; // 选择防皱且转速不为0，加上防皱时间
        if (trunOff) { // 取消防皱
          if (!this.speed) {
            afterTime += list.speed0Time; // 取消，如果此时转速为0，需要加上转速的时间
          } else {
            afterTime -= time;
          } 
        } 
      }

      if (protocol === 'soak') {
        // if (trunOn) afterTime += this.soakTime * 10; // 此行不会执行
        if (trunOff) afterTime -= this.soakTime * 10;
      }

      if (protocol === 'energySave') {
        if (trunOn) afterTime += time;
        if (trunOff) afterTime -= time;
      } 

      this.devState ? (obj.timeLeft = afterTime) : (obj.timeAll = afterTime);
      this.setDataObj(obj);
    }
  },
};
</script>
