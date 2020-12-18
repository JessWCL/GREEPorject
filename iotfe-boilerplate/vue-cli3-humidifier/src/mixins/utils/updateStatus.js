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
      isError: state => state.dataObject.estate1,
      isOffline: state => state.deviceInfo.deviceState
    })
  },
  watch: {
    /**
     * @description 设备故障时跳转故障页面
     */
    isError(newV, oldV) {
      if (newV && !oldV) {
        this.initApp();
      }
    },
    /**
     * @function isOffline
     * @param {number} newV
     * @description 设备离线时跳转离线页面
     */
    isOffline(newV) {
      if (newV === -1) {
        this.$router.replace({ name: 'Offline' });
      } else {
        this.$router.replace({ path: '/' });
      }
    }
  },
  methods: {
    /**
     * @description APP初始化时检查有没有故障, 有没有预约
     */
    initApp() {
      if (this.isOffline === -1) {
        this.$router.push({ name: 'Offline' });
      } else {
        this.$router.push({ path: '/' });
      }
    }
  }
};
export default updateStatus;
