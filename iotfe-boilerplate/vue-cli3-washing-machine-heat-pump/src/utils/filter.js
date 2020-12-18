/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:08
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-03-05 10:38:45
 */
import Vue from 'vue';

// 时间转换 eg: 89 => 01:29
Vue.filter('timeConversion', data => {
  let h = Math.floor(data / 60);
  h = `0${h}`;
  let mm = data % 60;
  mm = mm >= 10 ? mm : `0${mm}`;
  return `${h}:${mm}`;
});


Vue.filter('showChange', data => {
  if (!data) {
    return '--';
  }
  return data;
});

