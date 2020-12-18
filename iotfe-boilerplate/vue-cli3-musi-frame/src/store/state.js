/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-11 16:43:42
 * @LastEditors  : Jerry-Rain
 * @LastEditTime : 2019-12-26 11:19:44
 * @Description: 
 */
const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  dataObject: {
    ActType: '', // 控制类型
    ActValue: '', // 功能指令
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: 'Jerry的模板v1.1'
  }
};
export default state;
