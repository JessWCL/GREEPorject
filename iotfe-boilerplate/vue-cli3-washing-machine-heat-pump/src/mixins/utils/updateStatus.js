/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-08-20 20:01:18
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-04-18 14:46:01
 */
import {
  mapState
} from 'vuex';
/**
 * @description 检测有没有故障，有没有掉线
 */
const updateStatus = {
  created() {
    const test = process.env.VUE_APP_MODE === 'test';
    if (test) {
      this.initApp();
    }
  },
  computed: {
    ...mapState({
      isOffline: state => state.deviceInfo.deviceState
    })
  },
  watch: {
    /**
     * @function isOffline
     * @param {number} newV
     * @description 设备离线时跳转离线页面
     */
    isOffline(newV) {
      if (newV === -1) {
        this.$router.push({
          name: 'Offline'
        });
      }
    },
  },
  methods: {
    /**
     * @description APP初始化时检查有没有故障, 有没有预约
     */
    initApp() {
      if (this.isOffline === -1) {
        this.$router.push({
          name: 'Offline'
        });
      } else {
        this.$router.push({
          name: 'Home'
        });
      }
    }
  }
};
export default updateStatus;
