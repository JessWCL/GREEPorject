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
      deviceState: state => state.deviceState,
      Pow: state => state.DataObject.Pow,
      estate1: state => state.DataObject.estate1,
      estate2: state => state.DataObject.estate2,
      JFerr: state => state.DataObject.JFerr,
    }),

    isOffline() {
      const {deviceState} = this;
      if (deviceState === -1) return true;
      return false;
    },

    isHasError() {
      const { estate1, estate2, JFerr } = this;
      if (estate1 !== 0 || estate2 & (0x01 << 4) || estate2 & (0x01 << 1) || estate2 & (0x01 << 0) || JFerr !== 0) {
        return true;
      }
      return false;
    }
  },
  watch: {
    /**
     * @description 设备离线时跳转离线页面
     */
    deviceState(newV) {
      if (newV === -1) {
        this.$router.push({ path: '/Offline' });
      } else {
        this.$router.push({ path: '/' });
      }
    },

    /**
     * @description 设备关机时跳转首页
     */
    Pow(newV) {
      if (newV === 0) {
        this.$router.push({ path: '/PowerOff' });
      } else if (newV === 1) {
        this.$router.push({ path: '/Home' });
      }
    },

    isHasError(newV) {
      const { Pow } = this;
      if (newV === true) {
        this.$router.push({ path: '/Error' });
      } else if (newV === false && Pow === 0) {
        this.$router.push({ path: '/PowerOff' });
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
        this.$router.push({ path: '/Offline' });
      } else if (this.isHasError) {
        this.$router.push({ path: '/Error' });
      } else if (this.Pow === 1) {
        this.$router.push({ path: '/Home' });
      } else if (this.Pow === 0) {
        this.$router.push({ path: '/PowerOff' });
      } else {
        this.$router.push({ path: '/' });
      }
    }
  }
};
export default updateStatus;
