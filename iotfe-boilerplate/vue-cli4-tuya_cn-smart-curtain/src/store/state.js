const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否场景模式

  // 设备状态文档：https://docs.tuya.com/zh/iot/open-api/standard-function/small-home-appliances/categorycl/f?id=K9gf46o5mtfyc
  dataObject: {
    deviceId: '',
    deviceName: '智能窗帘',
    deviceTypeName: 'cl', // 涂鸦设备类型
    name: '',
    online: 'online',
    properties: [
      {
        code: 'mach_operate',
        value: 'ZZ' // ZZ打开，STOP暂停，FZ关闭
      }
    ],
    states: {},
    userId: '',
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '智能窗帘'
  }
};
export default state;
