const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  isMorebtn: false, // 功能详细
  isTime: false,
  isSleep: 0,
  isInit: false,
  isFirstLoad: false,
  uilock: false,
  errorList: [],
  dataObject: {
    Pow: 1,
    Mode: 0,
    FogLevel: 1,
    Humidity: 0,
    HumiditySet: 0,
    UV: 0,
    TmrHour: 0,
    TmrMin: 0,
    TmrAction: 0,
    TmrOn: 0,
    Sleep: 0,
    Estate1: 0,
    Estate2: 0,
    MidType: 0,
    JFerr: 0,
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    name: '加湿器'
  },
};
export default state;
