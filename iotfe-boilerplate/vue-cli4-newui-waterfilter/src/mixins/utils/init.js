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
    })
  },
  created() {
    /**
     *  @description 初始化，并将小卡片传进来的值赋予 state
     */
    this.init();
  },
  methods: {
    // 全局方法
    ...mapMutations({
      setDataObject: SET_DATA_OBJECT,
      sendCtrl: SEND_CTRL
    }),
    ...mapActions({
      init: INIT
    })
  }
};

export default mixin;
