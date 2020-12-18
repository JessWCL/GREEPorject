const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  dataObject: {},
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '净饮机',
  },
};

const DataObject = {
  ErrorCode1: 0, // 多个错误代码
  ErrorCode2: 128, // 多个错误代码
  ErrorCode3: 0, // 多个错误代码
  mode: 0, // 模式状态
  state: 0, // 自动运行/自动停止
  InPressC: 0, // 进水压力   0 正 1负
  InPressN: 2,
  MemPressC: 1, // 膜前压力
  MemPressN: 1,
  InElecC: 0, // 进水电导率
  InElecN: 1,
  ProElecC: 0, // 产水电导率
  ProElecN: 1,
  RawLevelC: 1, // 原水箱夜位
  RawLevelN: 2,
  ProLevelC: 1, // 产水箱液位
  ProLevelN: 2,
};
state.dataObject = DataObject;

export default state;
