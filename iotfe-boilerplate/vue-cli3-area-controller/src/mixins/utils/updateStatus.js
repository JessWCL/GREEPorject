// 检测设备状态, 根据业务逻辑修改
import { mapState } from 'vuex';
/**
 * @description 检测有没有故障，有没有掉线
 */
const updateStatus = {
  computed: {
    ...mapState({
      isOffline: state => state.deviceInfo.deviceState,
      lang: state => state.deviceInfo.lang,
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
    lang: {
      handler(newVal) {
        this.$i18n.locale = newVal === 'zh_CN' ? 'zh_CN' : 'en';
      },
      immediate: true,
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
