const state = {
  mac: '', // 设备mac
  functype: 0, // 是否是场景模式（集中控制）0代表正常，1代表集中控制
  dataObject: {
    Pow: 1,
    PM2P5: 0,
    mode: 1,
    wspd: 2,
    light: 0,
    wipm25: 1,
    wopm25: 0,
    FomadeValue: 1,
    StTmr: 0,
    TmrOff: 0,
    TmrOn: 0,
    FiltUT: 0,
    FiltBT: 0,
    estate: 0,
    estate1: 0,
    MeshWarning1: 0,
    MidType: 0,
    FiltUPercent: 0,
    LifeTimeMesh1: 0,
    LifeTimeMesh2: 0,
    AirChildLock: 0,
    meshid: 0,
    LifeTimeError: 30,
    hid: 0,
    JFerr: 0,
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '空气净化器'
  }
};

export default state;
