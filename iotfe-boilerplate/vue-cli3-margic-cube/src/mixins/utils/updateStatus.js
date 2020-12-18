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
      devLang: state => state.deviceInfo.lang
    })
  },
  watch: {
    /**
     * @description 设备离线时跳转离线页面
     */
    isOffline() {
      this.initApp();
    },
    devLang: {
      // 1.如果包含zh，则为中文；2.如果语言包存在，则设置该语言；3.不存在，则默认英文
      handler(newV) {
        if (newV.includes('zh')) {
          this.$i18n.locale = 'zh_CN';
        } else if (this.$i18n.availableLocales.includes(newV)) {
          this.$i18n.locale = newV;
        } else {
          this.$i18n.locale = 'en';
        }
      },
      immediate: true
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
