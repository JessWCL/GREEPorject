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
      isOffline: state => state.deviceInfo.deviceState,
      AllErr: state => state.dataObject.AllErr,
    }),
  },
  watch: {
    /**
     * @description 设备离线时跳转离线页面
     */
    isOffline(newV) {
      if (newV === -1) {
        this.$router.push({ name: 'Offline' });
      }
    },
    /**
     * @description 设备故障时跳转故障页面
     */
    AllErr(newVal) {
      if (newVal === 1) {
        // this.initApp();
        this.$router.push({ name: 'Error' });
      } else {
        this.$router.push({ path: '/' });
      }
    },
  },
  methods: {
    /**
     * @description APP初始化时检查有没有故障, 有没有预约
     */
    initApp() {
      if (this.isOffline === -1) {
        this.$router.push({ name: 'Offline' });
      } else if (this.AllErr !== 0) {
        this.$router.push({ name: 'Error' });
      } else {
        this.$router.push({ path: '/' });
      }
    },
  },
};
export default updateStatus;
