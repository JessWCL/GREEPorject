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
      online: state => state.dataObject.online,
    })
  },
  watch: {
    /**
     * @description 设备离线时跳转离线页面
     */
    online(newV) {
      if (newV !== 'online') {
        this.$router.push({ name: 'Offline' });
      }
    }
  },
  methods: {
    /**
     * @description APP初始化时检查有没有故障, 有没有预约
     */
    initApp() {
      if (this.online !== 'online') {
        this.$router.push({ name: 'Offline' });
      } else {
        this.$router.push({ path: '/' });
      }
    }
  }
};
export default updateStatus;
