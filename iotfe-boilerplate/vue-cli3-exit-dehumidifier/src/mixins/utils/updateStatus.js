// 检测设备状态, 根据业务逻辑修改
import { mapState } from 'vuex';
/**
 * @description 检测有没有故障，有没有掉线
 */
const updateStatus = {
  computed: {
    ...mapState({
      isOffline: state => state.deviceInfo.deviceState
    })
  },
  watch: {
    /**
     * @description 设备离线时跳转离线页面
     */
    isOffline: function updateDeviceState(newVal) {
      if (newVal === -1) {
        // this.initApp();
        console.log('deviceState', newVal);
        console.log(this.$router);
        const UA = window.navigator.userAgent.toLowerCase();
        const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA));
        if (isIOS) {
          window.vm.$router.push('/Offline');
        } else {
          this.$router.push({ name: 'Offline'});
        }
      } else {
        console.log('deviceState', newVal);
        // this.$router.push({ path: '/'});
        window.vm.$router.push({path: '/'});
      }
    }
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
    }
  }
};
export default updateStatus;
