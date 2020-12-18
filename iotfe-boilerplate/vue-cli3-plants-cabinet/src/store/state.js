/*
 * @Author: 
 * @Date: 
 * @LastEditors: 
 * @LastEditTime: 
 * @Description: 
 */
const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  dataObject: {
    Light: 0, // [0, 1] 灯光开关
    Wind: 0, // [0, 1] 风机开关
    WatPump: 1, // [0, 1] 水泵开关
    LigOnH: 14, // [0, 23] 灯循环开小时值
    LigOnM: 0, // [0, 59] 灯循环开分钟值
    LigOffH: 10, // [0, 23] 灯循环关小时值
    LigOffM: 0, // [0, 59] 灯循环关小时值
    WindOnH: 1, // [0, 23] 风循环开小时值
    WindOnM: 0, // [0, 59] 风循环开分钟值
    WindOffH: 0, // [0, 23] 风循环关小时值
    WindOffM: 30, // [0, 59] 风循环关小时值
    WatOnH: 1, // [0, 23] 水循环开小时值
    WatOnM: 0, // [0, 59] 水循环开分钟值
    WatOffH: 0, // [0, 23] 水循环关小时值
    WatOffM: 0, // [0, 59] 水循环关分钟值
    PltType: 1, // [1, 12] 植物选择
    TempS: 20, // [6， 30] 设定温度 默认22
    TempR: 24, // [6， 30] 实时温度
    HumdS: 70, // [50， 90] 设定湿度 默认50
    HumdR: 72, // [50， 90] 实时湿度
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '植物生长柜'
  }
};
export default state;
