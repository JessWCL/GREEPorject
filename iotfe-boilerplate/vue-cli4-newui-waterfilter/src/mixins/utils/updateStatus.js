import { mapState } from 'vuex';
/**
 * @description 检测有没有故障，有没有掉线
 */
const updateStatus = {
  computed: {
    ...mapState({
      isOffline: state => state.deviceInfo.deviceState === -1,
      ErrorCode1: state => state.dataObject.ErrorCode1,
      ErrorCode2: state => state.dataObject.ErrorCode2,
      JFerr: state => state.dataObject.JFerr,
    }),

    isErrorWarning() {
      const { ErrorCode1, ErrorCode2, JFerr } = this;
        if (ErrorCode1 !==0 || ErrorCode2!==0 || JFerr !== 0){
          return true;
        } else {
          return false;
        }
    }

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
    isErrorWarning(newV) {
      // const { ErrorCode1, ErrorCode2, JFerr } = this;
        if (newV ===true){
          this.$router.push({ name: 'ErrorWarning' });
        } else {
          this.$router.push({ path: '/' });
        }
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
      if (this.isOffline === -1) {
        this.$router.push({ name: 'Offline' });
      } 
      // else if (this.isErrorWarning) {
      //   this.$router.push({ name: 'ErrorWarning' });
      // } 
      else {
        this.$router.push({ path: '/' });
      }
    }
  }
};
export default updateStatus;
