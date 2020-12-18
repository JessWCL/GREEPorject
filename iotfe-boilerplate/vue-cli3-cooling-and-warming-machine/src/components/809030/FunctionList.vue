<!--
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-09-05 14:12:57
 * @LastEditors  : ZM_lee└(^o^)┘
 * @LastEditTime : 2019-12-30 10:24:44
 -->
<template>
  <gree-popup v-model="isPopupShow.bottom" position="bottom">
    <div class="popup-bottom">
      <div class="arrow-down" @click="cancel" @touchmove="cancel"></div>
      <gree-row>
        <gree-col
          :style="`${item.Disabled ? 'opacity: 0.3' : ''}`"
          v-for="(item, index) in FootFuncList"
          :key="index"
          @click.native="handleFunc(index)"
          v-show="!item.isHidden"
        >
          <img :src="item.ImgUrl" />
          <h3>
            {{ item.Name }}
            <span class="triangle" v-if="item.showArrowMore"></span>
          </h3>
        </gree-col>
      </gree-row>
    </div>
    <div style="display:none">{{ Mod }}</div>
  </gree-popup>
</template>

<script>
import { Popup, Row, Col, Dialog } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import homeConfig from '@/mixins/config/809030/home';
import { showToastPlugin } from '../../api/utils';

export default {
  components: {
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Dialog.name]: Dialog,
  },
  mixins: [homeConfig],
  props: {
    isPopupShow: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    ...mapState({
      mac: state => state.mac,
      enAcSvSt: state => state.dataObject.enAcSvSt, // 空调节能是否有效
      AcSvSt: state => state.dataObject.AcSvSt, // 空调节能
      Mod: state => state.dataObject.Mod, // 模式
      as1: state => state.dataObject.as1, // 机组数据
      as2: state => state.dataObject.as2, // 机组数据
      as3: state => state.dataObject.as3, // 机组数据
      DebugOk: state => state.dataObject.DebugOk, // 是否节能调试过
      Machine: state => state.dataObject.Machine,
    }),
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    cancel() {
      this.$set(this.isPopupShow, 'bottom', false);
    },
    confirm() {
      this.$set(this.isPopupShow, 'bottom', false);
    },
    /**
     * @description 功能点击触发事件
     */
    handleFunc(index) {
      const obj = {};
      if (this.Mod === 1) {
        switch (index) {
          case 0:
            obj.Quiet = Number(!this.Quiet);
            break;
          case 1:
            obj.AcSvSt = Number(!this.AcSvSt);
            break;
          default:
            break;
        }
      } else {
        switch (index) {
          case 0:
            obj.Quiet = Number(!this.Quiet);
            break;
          case 1:
            this.SvSt || this.AcSvSt
              ? this.enAcSvSt
                ? this.Machine === 2 ? showToastPlugin('空调节能模式下不能设置外出', 1) : showToastPlugin('空调节能和节能模式下不能设置外出', 1)
                : showToastPlugin('节能模式下不能设置外出', 1)
              : (obj.OutMode = Number(!this.OutMode));
            break;
          case 2:
            obj.AssHt = Number(!this.AssHt);
            break;
          case 3:
            if (this.enAcSvSt) {
              this.OutMode || this.SvSt
                ? this.Machine === 2 ? showToastPlugin('外出模式下不能设置空调节能', 1) : showToastPlugin('节能和外出模式下不能设置空调节能', 1)
                : (obj.AcSvSt = Number(!this.AcSvSt));
            } else {
              console.log('---------------------------------------');
              this.OutMode
                ? showToastPlugin('外出模式下不能设置节能', 1)
                : (obj.SvSt = Number(!this.SvSt));
            }
            break;
          // eslint-disable-next-line no-case-declarations
          case 4:
            if (this.OutMode || this.AcSvSt) {
              this.enAcSvSt
                ? showToastPlugin('外出和空调节能模式下不能设置节能', 1)
                : showToastPlugin('外出模式下不能设置节能', 1);
            } else {
              let num = 0;
              for (let index = 1; index < 4; index++) {
                for (let row = 0; row < this[`as${index}`].length; row++) {
                  this[`as${index}`][row] ? num++ : '';
                }
              }
              if (num > 2) {
                showToastPlugin('模块机数量大于两台, 无法开启节能模式', 1);
              } else if (this.DebugOk) {
                obj.SvSt = Number(!this.SvSt);
              } else {
                Dialog.alert({
                  title: '提示',
                  content:
                    '请通过手操器同时按住功能+模式键后可进入节能调试模式，成功后方可设置节能模式',
                  cancelText: '取消',
                  confirmText: '确定',
                  onConfirm: () =>
                    console.log('[Dialog.alert] confirm clicked'),
                });
              }
            }
            break;
          default:
            break;
        }
      }
      console.log('obj', obj);
      if (JSON.stringify(obj) !== '{}') {
        this.setDataObject(obj);
        this.sendCtrl(obj);
      }
    },
  },
};
</script>

<style lang="scss">
.gree-popup .popup-bottom .row .col {
  flex-basis: 25%;
}
.row {
  justify-content: inherit;
}
</style>
