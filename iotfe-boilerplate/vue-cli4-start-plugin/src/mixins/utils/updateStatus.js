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
    isOffline: {
      handler(newV, oldV) {
        if (newV === -1) {
          this.$router.push({ name: 'Offline' }).catch(e => {
            console.error(e);
          });
        } else if (oldV === -1) {
          this.$router.push({ name: 'Home' }).catch(e => {
            console.error(e);
          });
        }
      },
      immediate: true
    }
  }
};

export default updateStatus;
