// 根据实际业务修改
import { SET_DATA_OBJECT, SEND_CTRL, INIT } from '@/store/types';
import { mapActions, mapMutations, mapState } from 'vuex';
import updateStatus from './updateStatus';

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {
    // 全局变量
    ...mapState({
      mac: state => state.mac,
      dataObject: state => state.dataObject,
      functype: state => state.functype,
      isScene: state => state.functype, // 兼容以前开发的变量名
      devname: state => state.deviceInfo.name, // 设备名称
    })
  },
  methods: {
    // 全局方法
    ...mapMutations({
      setDataObject: SET_DATA_OBJECT,
      sendCtrl: SEND_CTRL
    })
  }
};

export default mixin;
