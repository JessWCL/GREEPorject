import {
  mapState
} from 'vuex';
/**
 * @description 检测有没有故障，有没有掉线
 */
const updateStatus = {
  computed: {
    ...mapState({
      isOffline: state =>
        process.env.VUE_APP_MID.startsWith('703') ?
        state.deviceInfo.deviceState : state.dataObject.OnLine,
      lang: state => state.deviceInfo.lang
    })
  },
  watch: {
    /**
     * @description 设备离线时跳转离线页面
     */
    isOffline(newV) {
      if (process.env.VUE_APP_MID.startsWith('702')) {
        if (newV !== 'online') {
          this.$router.push({
            name: 'Offline'
          });
        }
      }
      if (process.env.VUE_APP_MID.startsWith('703')) {
        if (newV === -1) {
          this.$router.push({
            name: 'Offline'
          });
        }
      }
    },
    /**
     * @description 语言包选择
     */
    lang: {
      handler(newv) {
        if (newv.indexOf('zh_CN') !== -1) {
          this.$i18n.locale = 'zh_CN';
        } else {
          this.$i18n.locale = 'en';
        }
      },
      immediate: true,
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
      if (process.env.VUE_APP_MID.startsWith('702')) {
        if (this.isOffline !== 'online') {
          this.$router.push({
            name: 'Offline'
          });
        } else {
          this.$router.push({
            path: '/'
          });
        }
      }
      if (process.env.VUE_APP_MID.startsWith('703')) {
        if (this.isOffline === -1) {
          this.$router.push({
            name: 'Offline'
          });
        } else {
          this.$router.push({
            path: '/'
          });
        }
      }
    }
  }
};
export default updateStatus;