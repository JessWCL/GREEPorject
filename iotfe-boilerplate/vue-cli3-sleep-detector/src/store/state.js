/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-11 16:43:42
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-09-25 17:05:56
 * @Description: 
 */

// const version = require('../../package.json').version;

const state = {
  mac: '', // 设备mac
  loading: false, // 是否显示loading（主页那个刷新转圈）
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式（集中控制）
  dataObject: { // 实时数据显示，home那个
    HeartRate: 0,
    BreathRate: 0,
    InBedState: 0,
    Battery: 0
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: `睡眠检测仪`,
  }
};
export default state;
