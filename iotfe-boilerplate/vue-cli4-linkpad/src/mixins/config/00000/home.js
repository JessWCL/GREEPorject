/**
 * @description Home配置列表
 */
import homeData from '@/api/00000/home';

const homeConfig = {
  data() {
    return {
      ApiHomeData: {}
    };
  },
  created() {
    this.ApiHomeData = homeData[0];
  }
};

export default homeConfig;
