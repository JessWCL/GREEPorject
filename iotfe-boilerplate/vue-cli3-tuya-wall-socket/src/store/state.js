/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-11 16:43:42
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-07-01 09:17:36
 * @Description: 
 */
const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  pathName: '', // 跳转页面
  dataObject: {
    Pow: false, // 继电器开关 1开0关
    code: 'switch', 
    deviceName: '插座', 
    online: 'online', 
    deviceTypeName: 'cz', 
    groups: [],
    
    curVoltage: 0,
    curPower: 0,
    curCurrent: 0,

    countDown: 0, // 倒计时S
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '插座'
  }
};
export default state;
