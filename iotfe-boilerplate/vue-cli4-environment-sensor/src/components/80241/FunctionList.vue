<template>
  <gree-popup v-model="isPopupShow.bottom" position="bottom">
    <div class="popup-bottom">
      <div class="arrow-down" @click="cancel" @touchmove="cancel"></div>
      <gree-row>
        <gree-col :disabled="item.Disabled" v-for="(item, index) in FootFuncList" :key="index" @click.native="handleFunc(index)">
          <img :src="item.ImgUrl" />
          <h3>{{ item.Name }}</h3>
        </gree-col>
      </gree-row>
    </div>
    <gree-dialog class="multi-dialog" title="用户协议" v-model="multiDialog.open" :btns="multiDialog.btns">
      <h3>尊敬的用户，自动控制功能为开放性体验功能，为了保证您的权益，请认真阅读以下内容：</h3>
      <p>1、 自动控制功能目前仅支持部分家电型号，具体型号请查阅环境感知器说明书；</p>
      <p>2、 自动控制可能会引起家电设备的蜂鸣器发出响声，对此不适者请慎用；</p>
      <p>3、 自动控制在未关闭状态下，人员离开仍会执行相关操作，建议离开时关闭自动控制功能；</p>
    </gree-dialog>
  </gree-popup>
</template>

<script>
import { Popup, Row, Col, Dialog } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import homeConfig from '@/mixins/config/80241/home';
import { getRoomDeviceSize, showToast } from '../../../../static/lib/PluginInterface.promise';

const STORAGE_KEY = 'HAS_READ_AGREEMENT';

export default {
  components: {
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Dialog.name]: Dialog
  },
  mixins: [homeConfig],
  props: {
    isPopupShow: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      multiDialog: {
        open: false,
        btns: [
          {
            text: '不同意',
            handler: this.onMultiCancel
          },
          {
            text: '同意',
            handler: this.onMultiConfirm
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      AutoCtr: state => state.dataObject.AutoCtr,
      BatteryWarn: state => state.dataObject.BatteryWarn,
      deviceList: state => state.deviceList,
      LigPow: state => state.dataObject.LigPow,
      mac: state => state.mac,
      ScrTime: state => state.dataObject.ScrTime,
      SensorErr: state => state.dataObject.SensorErr
    })
  },
  watch: {
    deviceList: {
      handler(val) {
        if (this.AutoCtr === 1 && val.num > 10) {
          Dialog.closeAll();
          Dialog.confirm({
            title: '提示',
            content: '环境感知器自动控制可控设备数量超过10台，已为您关闭自动控制功能，请自行关闭自动控制开启的设备。',
            confirmText: '确认',
            onConfirm: () => {
              this.setDataObject({ AutoCtr: 0 });
              this.sendCtrl({ AutoCtr: 0 });
            },
            cancelText: '取消',
            onCancel: () => {}
          });
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
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
    onMultiConfirm() {
      this.multiDialog.open = false;
      this.$storage.set(STORAGE_KEY, 1);
      this.handleFunc(1);
    },
    onMultiCancel() {
      this.multiDialog.open = false;
    },
    /**
     * @description 功能触发事件
     */
    handleFunc(index) {
      const __SensorErr = this.SensorErr.toString(2);
      switch (index) {
        case 0:
          this.$router.push({ name: 'Screen' });
          break;
        case 1:
          if (this.SensorErr > 0 || [1, 2, 3].includes(this.BatteryWarn)) {
            console.log('当发生故障或电池电量低时，禁止操作自动控制功能');
            return;
          }

          if (!this.$storage.get(STORAGE_KEY)) {
            // 必须同意用户协议才能使用自动控制功能
            this.multiDialog.open = true;
            return;
          }

          getRoomDeviceSize(this.mac)
            .then(res => {
              console.log(res);

              const resultInfo = JSON.parse(res);
              console.log(resultInfo);

              if (resultInfo.num <= 0) {
                if (this.AutoCtr === 0 || this.AutoCtr === 2) {
                  showToast('房间内无自动控制的设备，如需开启，请添加相关设备。', 0);
                } else {
                  // 如果房间内无设备，则关闭自动控制功能
                  this.setDataObject({ AutoCtr: 0 });
                  this.sendCtrl({ AutoCtr: 0 });
                }
              } else if (resultInfo.num > 0) {
                if (this.AutoCtr === 1) {
                  Dialog.confirm({
                    title: '提示',
                    content: '是否关闭自动控制功能开启的相关设备。',
                    confirmText: '是',
                    onConfirm: () => {
                      this.setDataObject({ AutoCtr: 2 });
                      this.sendCtrl({ AutoCtr: 2 });
                    },
                    cancelText: '否',
                    onCancel: () => {
                      this.setDataObject({ AutoCtr: 0 });
                      this.sendCtrl({ AutoCtr: 0 });
                    }
                  });
                } else {
                  if (resultInfo.num > 10) {
                    Dialog.confirm({
                      title: '提示',
                      content: '设备数量超出自动控制设备数量范围，无法开启自动控制功能，如需开启，请减少相关设备数量。',
                      confirmText: '确认',
                      cancelText: '取消'
                    });
                  }
                  if (resultInfo.num <= 10) {
                    const deviceList = resultInfo.devlist.join('，');
                    const room = resultInfo.roomName;
                    Dialog.confirm({
                      title: '提示',
                      content: `环境感知器将根据检查参数对房间内的${deviceList}设备进行自动控制，设备将自动运行，请确保环境感知器在${room}内。`,
                      confirmText: '确认',
                      onConfirm: () => {
                        this.setDataObject({ AutoCtr: 1 });
                        this.sendCtrl({ AutoCtr: 1 });
                      },
                      cancelText: '取消'
                    });
                  }
                }
              }
            })
            .catch(err => {
              console.log(err);
              err;
            });
          break;
        case 2:
          if (__SensorErr > 0) {
            if (parseInt(__SensorErr, 2) !== 2) {
              return;
            }
          }
          if (this.LigPow) {
            this.setDataObject({ LigPow: 0 });
          } else {
            this.setDataObject({ LigPow: 1 });
          }
          this.sendCtrl({ LigPow: this.LigPow });
          break;
        default:
          break;
      }
    }
  }
};
</script>
