/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-11 16:43:42
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2019-10-08 15:31:30
 * @Description: 
 */

const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式（集中控制）
  isInit: false,
  showLoading: false,
  dataObject: {
    Pow: 1,
    Dmod: 1, // 模式（除湿：1-连续、2-智能、4-静音，干衣：5-快速、10-保持，单净化：9）
    Dwet: 3,
    WdSpd: 1, // 0-自动、1-低风、3-中风、5-高风
    Dfltr: 0,
    DwatFul: 0,
    Lig: 0,
    SwUpDn: 0,
    Health: 0, // 负离子
    Quiet: 0,
    PM2P5: 1,
    airQlt: 1,
    DwatSen: 56,
    ChildLock: 0,
    AppTimer: 0,
    AllErr: 0,
  },
  deviceData: {},
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '除湿机'
  }
};
export default state;
