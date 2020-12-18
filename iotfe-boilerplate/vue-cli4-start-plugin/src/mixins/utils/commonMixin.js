// 根据实际业务修改
import { SET_DATA_OBJECT, SEND_CTRL } from '@/store/types';
import { mapActions, mapMutations, mapState } from 'vuex';

// 组件下使用需要引入到组件的 mixins
const mixin = {
  computed: {
    // 通用变量
    ...mapState({
      mac: state => state.mac,
      dataObject: state => state.dataObject,
      functype: state => state.functype,
      isScene: state => state.functype, // 兼容以前开发的变量名
      devname: state => state.deviceInfo.name // 设备名称
    })
  },
  methods: {
    // 通用方法
    ...mapMutations({
      setDataObject: SET_DATA_OBJECT
    }),
    // 通用方法
    ...mapActions({
      sendCtrl: SEND_CTRL
    })
  }
};

export default mixin;
