import { mapState } from 'vuex';
/**
 * @description 检测有没有故障，有没有掉线
 */
const updateStatus = {
  data() {
    return {};
  },
  mounted() {
    this.initError();
    this.updateTimer();
  },
  computed: {
    ...mapState({
      Pow: state => state.dataObject.Pow,
      SchEn: state => state.dataObject.SchEn,
      /**
       * @param {object} state
       * @description 检测是否有故障
       */
      isError: function isError(state) {
        const estate = state.dataObject.estate;
        const estate2 = state.dataObject.estate2;
        const estate3 = state.dataObject.estate3;
        const estate4 = state.dataObject.estate4;
        let errStatus;
        if (estate || estate2 || estate3 || estate4) {
          errStatus = true;
        } else {
          errStatus = false;
        }
        return errStatus;
      },
      isOffline: state => state.deviceInfo.deviceState
    })
  },
  watch: {
    /**
     * @param {number} newv
     * @description 跳转预约页面
     */
    SchEn: function getSchEn(newv) {
      if (newv && this.Pow && !this.isError && this.isOffline !== -1) {
        this.$router.push({ name: 'Timer' });
      }
    },
    /**
     * @param {number} newv
     * @description 设备故障时跳转故障页面
     */
    isError: function getIsError(newv, oldv) {
      if (!oldv && newv) {
        this.initError();
      }
    },
    /**
     * @param {number} newv
     * @description 设备离线时跳转离线页面
     */
    isOffline: function updateOffline(newv) {
      newv === -1 ? this.$router.push({ name: 'Offline' }) : '';
    }
  },
  methods: {
    /**
     * @description 预约
     */
    updateTimer() {
      if (this.Pow && this.SchEn && !this.isError && this.isOffline !== -1) {
        this.$router.push({ name: 'Timer' });
      }
    },
    /**
     * @description APP初始化时检查有没有故障
     */
    initError() {
      if (this.isError && this.isOffline !== -1) {
        this.$router.push({ name: 'Error' });
      } else {
        this.$router.push({ path: '/' });
      }
    }
  }
};
export default updateStatus;
