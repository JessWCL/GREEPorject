/**
 * @description Home配置列表
 */
import settingsData from '@/api/00000/settings';

const settingsConfig = {
  data() {
    return {
      ApiSettingsData: {}
    };
  },
  created() {
    this.ApiSettingsData = settingsData[0];
  }
};

export default settingsConfig;
