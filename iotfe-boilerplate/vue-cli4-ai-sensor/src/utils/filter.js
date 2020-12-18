import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import Vue from 'vue';
dayjs.locale('zh-cn');

Vue.filter('dateformat', (str, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  if (dayjs().isSame(str, 'day')) {
    return '今天';
  }
  return dayjs(str).format(pattern);
});

Vue.filter('timeformat', (str, pattern = 'HH:mm:ss') => {
  return dayjs(str).format(pattern);
});
