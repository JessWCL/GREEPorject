// 根据实际业务修改
import { mapState, mapMutations, mapActions } from 'vuex';
import * as types from '@/store/types';
import updateStatus from './updateStatus';

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {
    ...mapState({ mac: state => state.mac })
  },
  methods: {
    ...mapMutations({
      setMac: types.SET_MAC,
      setDataObject: types.SET_DATA_OBJECT,
    }),
    ...mapActions({
      getDeviceInfo: types.GET_DEVICE_INFO
    }),
  }
};

export default mixin;
