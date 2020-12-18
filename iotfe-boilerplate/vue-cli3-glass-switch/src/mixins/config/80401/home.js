/**
 * @description Home配置列表
 */
import homeData from '@/api/80401/home';
import mockList from '@/api/80401/mock_list';

const homeConfig = {
  data() {
    return {
      JsonData: {},
      listData: {}
    };
  },
  created() {
    this.JsonData = homeData[0];
    this.listData = mockList[0];
  },
  computed: {}
};

export default homeConfig;
