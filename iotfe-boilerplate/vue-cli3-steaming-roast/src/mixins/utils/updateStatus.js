import { mapState } from 'vuex';
/**
 * @description 检测有没有故障，有没有掉线
 */
const updateStatus = {
  created() {
    this.initApp();
  },
  computed: {
    ...mapState({
      deviceState: state => state.deviceInfo.deviceState,
      Pow: state => state.dataObject.Pow,
      estate1: state => state.dataObject.estate1,
    }),

    isOffline() {
      const {deviceState} = this;
      if (deviceState === -1) return true; 
      return false;
    },

    isHasError() {
      const { estate1 } = this;
      return estate1 !== 0;
    }
  },
  watch: {
    /**
     * @description 设备离线时跳转离线页面
     */
    deviceState(newV) {
      if (newV === -1) {
        this.$router.push({ name: 'Offline' });
      } else {
        this.$router.push({ path: '/' });
      }
    },

    /**
     * @description 设备关机时跳转首页
     */
    Pow(newV) {
      if (newV === 0) {
        this.$router.push({ path: '/' });
      }
    },

    isHasError(newV) {
      if (newV === true) {
        this.$router.push({ name: 'Error' });
      } else {
        this.$router.push({ path: '/' });
      }
    }
  },
  methods: {
    /**
     * @description APP初始化时检查有没有故障, 有没有预约
     */
    initApp() {
      if (this.deviceState === -1) {
        this.$router.push({ name: 'Offline' });
      } else if (this.isHasError) {
        this.$router.push({ name: 'Error' });
      } else {
        this.$router.push({ path: '/' });
      }
    }
  }
};
export default updateStatus;
