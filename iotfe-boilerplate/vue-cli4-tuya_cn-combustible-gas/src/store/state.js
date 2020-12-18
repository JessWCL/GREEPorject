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
    name: '可燃气体报警器'
  }
};

const DataObject = {
  deviceId: '', // 设备ID
  deviceName: '', // 设备名称
  deviceTypeName: '', // 设备类型
  online: 'online', // 设置在线状态
  properties: [
    {
      code: 'gas_sensor_state', // 燃气检测状态 "1":煤气报警;"2":煤气报警解除
      value: '0'
    }
  ]
};
state.dataObject = DataObject;

export default state;
