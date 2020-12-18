/*
 * @Author: Jerry-Rain
 * @Date: 2020-01-03 10:55:46
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-03-11 08:42:14
 * @Description: 
 */
import { mapState } from 'vuex'
/**
 * @description 检测有没有故障，有没有掉线
 */
const updateStatus = {
  created() {
    this.initApp()
  },
  computed: {
    ...mapState({
      isOffline: state => state.deviceInfo.deviceState
    })
  },
  watch: {
    /**
     * @description 设备离线时跳转离线页面
     */
    isOffline(newV) {
      if (newV === -1) {
        this.$router.push({ name: 'Offline' })
      }
    }
  },
  methods: {
    /**
     * @description APP初始化时检查有没有故障, 有没有预约
     */
    initApp() {
      if (this.isOffline === -1) {
        this.$router.push({ name: 'Offline' })
      } else {
        this.$router.push({ path: '/' })
      }
    }
  }
}
export default updateStatus
