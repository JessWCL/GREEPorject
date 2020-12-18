/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-11 16:43:42
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-07-01 09:17:23
 * @Description: 
 */
const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  pathName: '', // 跳转页面
  dataObject: {
    Pow: false, // 继电器开关 false开 true关
    code: 'switch_1', 
    deviceName: '开关', 
    online: 'online', 
    deviceTypeName: 'kg', 
    groups: [], 
    switchNum: 1,
    devData: {},
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '开关'
  }
};
export default state;
