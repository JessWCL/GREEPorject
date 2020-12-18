<!--
 * @Descripttion: 高级功能弹框
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-01-08 13:52:09
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-04-29 20:52:24
 -->
<template>
  <gree-popup v-model="isPopupShow.bottom" position="bottom" >
    <div class="popup-bottom">
      <div class="arrow-down" @click="$emit('hideFuncListPopUp')"></div>
      <gree-row>
        <gree-col width="25" v-for="(v, k) in startFootList" :key="k" v-if="k">
          <div
            class="icon"
            @click="selectSenior(v.isDisabled, v.selected, k, v)"
          >
            <img
              :src="[
                require(`../assets/img/Icon/adv2/${v.selected ? 'selected' : 'normal'}/${v.ImgName}.png`),
              ]"
              :class="{opacity: v.isDisabled}"
            />
            <h3 :class="{opacity: v.isDisabled}">
              {{ $language(v.name) }}
              <img
                class="icon-more"
                src="../assets/img/ic_more.png"
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
import footConfig from '../../src/api/home';
import { showToastPlugin } from '../api/pluginInterface.js';

export default {
  name: 'StartupFunctionList',
  components: {
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  mixins: [footConfig],
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
    }),
  },
  mounted() { },
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
    selectSenior(invalid, sel, row, item) {
      if (invalid && this.devState !== 2) {
        showToastPlugin('请先解锁童锁');
        return;
      }
      if (this.devState === 2 && row === 1) {
        showToastPlugin('当前不可用');
        return;
      }

      const obj = {};
      obj[item.protocol] = !sel >> 0;
      this.setDataObj(obj);
      this.sendCtrl(obj);
    },
  },
};
</script>
