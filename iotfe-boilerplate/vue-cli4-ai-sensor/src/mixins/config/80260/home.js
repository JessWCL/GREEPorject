/**
 * @description Home配置列表
 */
import homeData from '@/api/80260/home';

const homeConfig = {
  data() {
    return {
      JsonData: {}
    };
  },
  created() {
    this.JsonData = homeData[0];
  },
  computed: {
    FootList() {
      return this.JsonData.FootList;
    }
  }
};

export default homeConfig;
