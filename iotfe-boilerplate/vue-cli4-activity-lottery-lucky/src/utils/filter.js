import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import Vue from 'vue';
dayjs.locale('zh-cn');

Vue.filter('timeformat', (str, pattern = 'YYYY-MM-DD HH:mm') => {
  return dayjs(str).format(pattern);
});
