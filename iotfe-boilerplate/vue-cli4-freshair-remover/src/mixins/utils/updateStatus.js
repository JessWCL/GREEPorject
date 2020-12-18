import {
  mapState
} from 'vuex';
/**
 * @description 检测有没有故障，有没有掉线
 */
const updateStatus = {
  computed: {
    ...mapState({
      isOffline: state => state.deviceInfo.deviceState,
      GetEr: state => state.dataObject.GetEr,
      ErrType: state => state.dataObject.ErrType
    })
  },
  watch: {
    /**
     * @description 设备离线时跳转离线页面
     */
    isOffline(newV) {
      if (newV === -1) {
        this.$router.push({
          name: 'Offline'
        });
      } else if (newV === 2) {
        this.$router.push({
          path: '/'
        });
      }
    },

    /**
     * @description 设备故障时跳转故障页面
     */
    GetEr(newV, oldV) {
      const name = this.$route.name;
      if (name === 'Offline') return
      if (newV && this.ErrType && name !== 'ErrorWarning') {
        this.$router.push({
          name: 'ErrorWarning'
        });
      }
    },
    ErrType(newV) {
      const name = this.$route.name;
      if (name === 'Offline') return
      if (newV && this.GetEr && name !== 'ErrorWarning') {
        this.$router.push({
          name: 'ErrorWarning'
        });
      }
    }
  },
  created() {
    this.initApp();
  },
  methods: {
    /**
     * @description APP初始化时检查有没有故障, 有没有预约
     */
    initApp() {
      if (this.isOffline === -1) {
        this.$router.push({
          name: 'Offline'
        });
      } else if (this.ErrType && this.GetEr) {
        this.$router.push({
          name: 'ErrorWarning'
        });
      } else {
        this.$router.push({
          name: 'Home'
        });
      }
    }
  }
};
export default updateStatus;