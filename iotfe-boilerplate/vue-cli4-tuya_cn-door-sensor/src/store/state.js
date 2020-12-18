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
    name: '智能门磁'
  }
};

const DataObject = {
  deviceId: '', // 设备ID
  deviceName: '', // 设备名称
  deviceTypeName: '', // 设备类型
  online: 'online', // 设置在线状态
  properties: [
    {
      code: 'doorcontact_state', // 门窗开关状态 "true":打开状态;"false":关闭状态
      value: false
    },
    {
      code: 'battery_percentage',
      value: -1
    }
  ]
};
state.dataObject = DataObject;

export default state;
