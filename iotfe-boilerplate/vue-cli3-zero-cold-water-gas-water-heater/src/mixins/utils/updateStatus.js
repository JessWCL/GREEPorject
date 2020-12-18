// 检测设备状态, 根据业务逻辑修改
import { mapState } from 'vuex';
/**
 * @description 检测有没有故障，有没有掉线
 */
const updateStatus = {
  mounted() {
    this.initApp();
  },
  computed: {
    ...mapState({
      isOffline: state => state.deviceInfo.deviceState,
      functype: state => state.functype,
      lang: state => state.deviceInfo.lang // 国际化
    })
  },
  watch: {
    /**
     * @description 设备离线时跳转离线页面
     */
    isOffline: function updateOffline(newv, oldv) {
      if (oldv && newv === -1) {
        this.initApp();
      }
    },
    lang: {
      handler(newVal) {
        this.$i18n.locale = newVal; // 国际化
      }
    }
  },
  methods: {
    /**
     * @description APP初始化时检查有没有故障, 有没有预约
     */
    initApp() {
      if (this.functype === 0 && this.isOffline === -1) {
        this.$router.push({ name: 'Offline' });
      } else {
        this.$router.push({ path: '/' });
      }
      // if (!this.functype) {
      //   if (this.isOffline === -1) {
      //     this.$router.push({ name: 'Offline' });
      //   } else {
      //     this.$router.push({ path: '/' });
      //   }
      // } else {
      //   this.$router.push({ path: '/' });
      // }
    }
  }
};
export default updateStatus;
