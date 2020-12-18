<template>
  <gree-popup
    v-model="isPopupShow.bottom"
    position="bottom"
  >
    <div class="popup-bottom">
      <div
        class="arrow-down"
        @touchmove="cancel"
      ></div>
      <gree-row>
        <gree-col
          :disabled="item.Disabled"
          v-for="(item, index) in FootFuncList"
          :key="index"
          @click.native="handleFunc(index)"
        >
          <img :src="item.ImgUrl">
          <h3>
            {{ item.Name }}
            <span
              class="triangle"
              v-if="item.showArrowMore"
            ></span>
          </h3>
        </gree-col>
      </gree-row>
    </div>
  </gree-popup>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import homeConfig from '@/mixins/config/80242/home';
import {
  getRoomDeviceSize,
  showToast
} from '../../../../static/lib/PluginInterface.promise';

export default {
  mixins: [homeConfig],
  props: {
    isPopupShow: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    ...mapState({
      AutoCtr: state => state.dataObject.AutoCtr,
      mac: state => state.mac,
      SensorErr: state => state.dataObject.SensorErr
    })
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setSleep: 'IS_SLEEP'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    cancel() {
      this.$set(this.isPopupShow, 'bottom', false);
    },
    confirm() {
      this.$set(this.isPopupShow, 'bottom', false);
    },
    /**
     * @description 功能触发事件
     */
    handleFunc(index) {
      switch (index) {
        case 0:
          if (this.SensorErr > 0) {
            return;
          }
          getRoomDeviceSize(this.mac)
            .then(res => {
              const resultInfo = JSON.parse(res);
              if (resultInfo.num <= 1) {
                if (this.AutoCtr === 0) {
                  showToast('房间内无设备，自动控制功能无法开启', 0);
                } else {
                  // 如果房间内无设备，则关闭自动控制功能
                  this.setDataObject({ AutoCtr: 0 });
                  this.sendCtrl({ AutoCtr: 0 });
                }
              } else if (resultInfo.num > 1) {
                if (this.AutoCtr) {
                  this.$dialog.confirm({
                    title: '提示',
                    content: '关闭自动控制功能，房间内设备停止自动运行。',
                    confirmText: '确定',
                    onConfirm: () => {
                      this.setDataObject({ AutoCtr: 0 });
                      this.sendCtrl({ AutoCtr: 0 });
                    },
                    cancelText: '取消'
                  });
                } else {
                  this.$dialog.confirm({
                    title: '提示',
                    content: '开启自动控制功能，房间内设备将自动运行。',
                    confirmText: '确定',
                    onConfirm: () => {
                      this.setDataObject({ AutoCtr: 1 });
                      this.sendCtrl({ AutoCtr: 1 });
                    },
                    cancelText: '取消'
                  });
                }
              }
            })
            .catch(err => {
              err;
            });
          break;
        default:
          break;
      }
    }
  }
};
</script>
