// 检测设备状态, 根据业务逻辑修改
import { mapState } from 'vuex';
/**
 * @description 检测有没有故障，有没有掉线
 */
const updateStatus = {
  computed: {
    ...mapState({
      isOffline: state => state.deviceInfo.deviceState,
      GetEr: state => state.dataObject.GetEr,
    }),
  },
  watch: {
    /**
     * @description 设备离线时跳转离线页面
     */
    isOffline(newVal) {
      if (newVal === -1) {
        // this.initApp();
        this.$router.push({ name: 'Offline' });
      } else {
        this.$router.push({ path: '/' });
      }
    },
    /**
     * @description 设备故障时跳转故障页面
     */
    GetEr(newVal) {
      if (newVal === 1) {
        // this.initApp();
        this.$router.push({ name: 'error' });
      } else {
        this.$router.push({ path: '/' });
      }
    },
  },
  mounted() {
    this.initApp();
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
    },
  },
};
export default updateStatus;
