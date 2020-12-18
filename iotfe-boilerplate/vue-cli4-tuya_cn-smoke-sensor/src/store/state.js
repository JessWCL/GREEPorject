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
    name: '烟雾传感器'
  }
};

const DataObject = {
  deviceId: '', // 设备ID
  deviceName: '', // 设备名称
  deviceTypeName: '', // 设备类型
  online: 'online', // 设置在线状态
  properties: [
    {
      code: 'smoke_sensor_state', // 烟雾检测值 "1":烟雾报警;"2":烟雾报警解除
      value: '0'
    },
    {
      code: 'battery_percentage', // 电池电量百分比
      value: -1
    }
  ]
};
state.dataObject = DataObject;

export default state;
