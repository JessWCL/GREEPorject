const state = {
  mac: '', // 设备mac
  functype: 1, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  isMorebtn: false, // 功能详细
  isTime: false,
  isSleep: 0,
  dataObject: {
    Pow: 1,
    wspd: 5,
    estate: 0
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: 'zh_CN', // 语言
    name: '加湿器123456789123456'
  },
};
export default state;
