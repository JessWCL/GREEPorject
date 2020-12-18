const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  scrollY: 0,
  dataObjLock: 0, // dataObj是否锁定
  dataObject: {
    deviceId: '',
    deviceName: '',
    deviceTypeName: '',
    online: 'online',
    properties: [
      {
        code: 'alarm_state',
        value: '',
      },
      {
        code: 'alarm_time',
        value: '',
      },
      {
        code: 'battery_percentage',
        value: '0',
      },
      {
        code: 'alarm_setting',
        value: '',
      },
    ],
    userId: '',
  }, 
  firstLoad: 0, // 是否第一次进入

  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: 'Audible and Visual Alarm',
  }
};
export default state;
