const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isInit: false,
  showLoading: false, // 是否显示loading
  dataObject: {
    Pow: 1,
    UVLight: 1,
    mode: 0,
    FogLevel: 1,
    WaterTankLight: 0,
    TmrHour: 0,
    TmrMin: 0,
    TmrOn: 0,
    TmrAction: 0,
    estate1: 0,
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: 'en', // 语言
    name: '加湿器123'
  },
};
export default state;
