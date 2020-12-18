/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-11 16:43:42
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-09-25 13:55:22
 * @Description: 
 */
const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  pathName: '', // 跳转页面
  total: 0, // 累计总用电量
  dataObject: {
    Pow: 1, // 继电器开关 1开0关
    RealTimePower: 0, // 实时功率
    Electnumzero: 0, // 1：电量清零
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
