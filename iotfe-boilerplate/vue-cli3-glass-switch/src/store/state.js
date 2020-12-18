/*
 * @Description: In User Settings Edit
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditTime: 2020-06-22 14:57:56
 * @LastEditors: Jerry-Rain
 */
const state = {
  mac: '', // 设备mac
  mainMac: '', // 设备mainMac
  cloudTimer: 0, // 云定时标志位 0无云定时
  meshId: '', // meshId 找设备用啊
  switchNum: null, // switchNum 也是找设备用啊，一拖四，四个开关的
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  isFirstIn: true, 
  type: 1, // 修改接口的标志位 1开 2关 3删
  dataObject: {
    Pow: 0, // 开关
    AppTimer: 0, // 定时标志位
  },

  // 定时列表的list eg:[{},{}] 1开 2关
  timerList: [
    // { enable: 1, type: 0, hour: 1, min: 1, repeat: 1 },
    // { enable: 2, type: 0, hour: 2, min: 2, repeat: 3 },
    // { enable: 1, type: 1, hour: 13, min: 33, repeat: 8 },
    // { enable: 1, type: 0, hour: 4, min: 44, repeat: 12 },
    // { enable: 2, type: 1, hour: 5, min: 55, repeat: 127 }
  ], // 初始化定时列表

  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: 'zh-CN', // 语言
    name: 'Jerry的智能开关'
  }
};
export default state;
