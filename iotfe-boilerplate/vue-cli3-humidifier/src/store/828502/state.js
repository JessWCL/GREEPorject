const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isInit: false,
  uilock: false,
  errorList: [],
  dataObject: {
    Pow: 1,
    Mode: 0,
    FogLevel: 1,
    WaterTankLight: 0,
    Humidity: 0,
    Estate1: 0,
    Estate2: 0,
    Estate3: 0,
    MidType: 0
  },
  deviceData: {},
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: 'zh_CN', // 语言
    name: '加湿器123'
  },
};
export default state;
