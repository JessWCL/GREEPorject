/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-11 16:43:42
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-09-25 13:59:44
 * @Description: 
 */
const state = {
  mac: '', // 设备mac
  mainMac: '', // 主mac pmac 网关mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  pathName: '', // 跳转页面
  total: 0, // 累计总用电量
  dataObject: {
    Pow: 0, // 继电器开关 1开0关
    CountDownTime: 15, // 倒计时长，单位分
    CountDownState: 0, // 倒计时类型 1开 0关
    CountDownFlag: 0, // 倒计时开关 1开 0关
    RealTimeVoltage: 0, // 实时电压
    RealTimeEleCurrent: 0, // 实时电流
    RealTimePower: 0, // 实时功率
    Electnumzero: 0, // 1：电量清零
    EnergyOfTime: 0, // 某段时间统计的电量
    EnergyOfTimeFlag: 0, // 自定义提醒的字段标志
    StartTime: [2020, 5, 6, 14, 39], // 起始时间 [2020,5,6,14,39]
    EndTime: [2020, 5, 12, 14, 39], // 结束时间 [2020,5,12,14,39]
    AppTimer: 0, // 定时标志位
    MessagePushFlag: 0, // 功率过大提示

    monthEleUsed: null, // 本月用电量
    dayEleUsed: null // 本日用电量
  },
  // 图标的数据缓存
  chartData: {
    dayChart: null, // 两小时数据
    weekChart: null, // 每天
    monthChart: null, // 每月
    yearChart: null, // 每年
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
