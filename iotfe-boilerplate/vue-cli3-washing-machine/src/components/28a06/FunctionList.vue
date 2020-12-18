<!--
 * @Descripttion: 高级功能弹框
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-01-08 13:52:09
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-06-03 16:57:22
 -->
<template>
  <gree-popup v-model="isPopupShow.bottom" position="bottom">
    <div class="popup-bottom">
      <div class="arrow-down" @click="$emit('hideFuncListPopUp')"></div>
      <gree-row>
        <gree-col width="25" v-for="(v, k) in advancedList" :key="k">
          <div
            class="icon"
            @click="selectSenior(v)"
          >
            <!-- @click="selectSenior(v.invalid, v.selected, k)" -->
            <img
              :src="[
                require(`../../assets/img/Icon/adv3/${v.selected ? 'selected' : 'normal'}/${v.IconName}.png`),
              ]"
              :class="{opacity: v.invalid}"
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
import upperFuncConfig from '@/mixins/config/28a06/upperFuncConfig';
import { showToastPlugin } from '@/api/pluginInterface';

export default {
  name: 'FuncList',
  components: {
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  mixins: [upperFuncConfig],
  props: {
    isPopupShow: {
      type: Object,
      default() {
        return {};
      },
    },
    layer: {
      type: String,
      default: 'Middle'
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({ }),
  },
  watch: {},
  mounted() { },
  methods: {
    ...mapMutations({
      setDataObj: 'SET_DATA_OBJECT',
      setUpperObj: 'SET_UPPER_OBJECT',
      setMiddle: 'SET_MIDDLE_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @function selectSenior
     * @description 点击底部高级后弹框中的图标
     */
    // selectSenior(invalid, sel, row) {
    selectSenior(item) {
      if (!item.invalid) {
        // 判断是否是预约 预约是第一位
        const value = !item.selected;
        const obj = {};
        const protocol = item.protocol; // 获取点击的字段
        const oldV = this[protocol];
        const newV = Boolean(value);

        const list = this.washList[this.modeIndexList[this.washMode]];

        // const spealList = ['soak', 'clear', 'nightWash', 'creaseRes']; // 选择这些需要加减时间
        
        obj[protocol] = value >> 0;
        // if (spealList.indexOf(protocol) >= 0) 
        this.changeTimeHandle(newV << 0, oldV, protocol);
          
        if (protocol === 'nightWash') { // 选择夜间洗, 需要调整对应转速 + 时间。 取消恢复默认转速
          // TODO 待补充转速问题
          // if (!value) { // 如果选中
          //   if (this.washMode !== 8) { // 筒清洁不可调节转速
          //     obj.speed = list.nightWashSpeed; // 夜间洗转速
          //     if (!this.speed) { // 之前为0转速时，选择夜间洗，改了变转速需要+ 回来时间
          //       this.devState ? obj.timeLeft = this.timeLeft + list.Speed0Time : obj.timeAll = this.timeAll + list.Speed0Time; 
          //     }
          //   }
          // } else if (this.washMode !== 8) { // 取消且不是同清洁
          //   obj.speed = list.defaultSpeed;
          //   if (!this.speed) {
          //     this.devState ? obj.timeLeft = this.timeLeft + list.nightWashSpeed0Time - 1 : obj.timeAll = this.timeAll + list.nightWashSpeed0Time - 1; 
          //   }
          // }
        }


        this.showToast(protocol, value); // 洗涤剂、柔顺剂需要提示
        switch (this.layer) {
          case 'Upper':
            this.setUpperObj(obj);
            break;
        
          default:
            break;
        }
        this.sendCtrl(obj);
      } else {
        this.devState ? showToastPlugin('当前阶段不可选择该高级功能') : showToastPlugin('当前模式不可选择该高级功能');
      }
    },
    /**
     * @description 判断夜间洗、节能、浸泡是否有选择，如有则+，没有则-.PS：首次没有不运行-, 且不可更改dataobj的默认值
     */
    changeTimeHandle(newV, oldV, protocol) {
      this.handleSelect(newV, oldV, protocol);
    },
    /**
     * @description 是否选择该高级功能，进而判断+-时间
     * @param protocol 需要判断的字段
     */
    handleSelect(newV, oldV, protocol) {
      const trunOn = newV === 1; // 注意不可直接判断是1还是0，首次会undefind，特殊，会存在2
      const trunOff = newV === 0 && oldV === 1;
      const time = this.washList[this.washModeIndex].auxiliaryTime[protocol] >> 0;
      if (time === undefined || newV === 2) return; // 没有或切换了模式则直接return
      let afterTime = this.devState ? this.timeLeft : this.timeAll; // 需判断是否待机状态
      if (trunOn) afterTime += time;
      if (trunOff) afterTime -= time;
      switch (this.layer) {
        case 'Upper':
          this.devState ? this.setUpperObj({timeLeft: afterTime}) : this.setUpperObj({timeAll: afterTime}); 
          break;
        
        default:
          break;
      }
    },

    /**
     * @description 特殊模式需提示
     */   
    showToast(protocol, value) {
      if (protocol === 'autoMeek') {
        value ? showToastPlugin('柔顺剂自动投放已开启') : showToastPlugin('柔顺剂自动投放已关闭');
      }
      if (protocol === 'autoScour') {
        value ? showToastPlugin('洗涤剂自动投放已开启') : showToastPlugin('洗涤剂自动投放已关闭');
      }
    }
  },
};
</script>
