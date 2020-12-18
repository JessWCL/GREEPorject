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
    name: '一氧化碳报警器'
  }
};

const DataObject = {
  deviceId: '', // 设备ID
  deviceName: '', // 设备名称
  deviceTypeName: '', // 设备类型
  online: 'online', // 设置在线状态
  properties: [
    {
      code: 'co_state', // CO检测状态 {"range":["1","2"]} "1":报警;"2":报警解除
      value: '0'
    },
    {
      code: 'battery_percentage', // 电池电量百分比 {"unit":"%","min":0,"max":100,"scale":0,"step":1}
      value: -1
    }
  ]
};
state.dataObject = DataObject;

export default state;
