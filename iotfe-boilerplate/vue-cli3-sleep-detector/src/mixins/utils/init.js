// 根据实际业务修改
import { mapState, mapMutations, mapActions } from 'vuex';
import updateStatus from './updateStatus';

import * as types from '../../store/types';

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {
    ...mapState({ mac: state => state.mac })
  },
  methods: {
    // 全局方法
    ...mapMutations({
      setDataObject: types.SET_DATA_OBJECT
    }),
    // 全局方法
    ...mapActions({
      sendCtrl: types.SEND_CTRL
    })
  }
};

export default mixin;
