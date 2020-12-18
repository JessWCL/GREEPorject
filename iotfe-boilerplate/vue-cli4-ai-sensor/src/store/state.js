const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  dataObject: {
    WorkState: 1, // 工作状态 2 报警 1 正常 0 无效
    AlarmCancel: 0, // 报警取消 1 取消 0 无效
    AlarmTmrEnable: 0, // 报警计时使能位 1 触发使能 0 无效
    AlarmTime: 1260 // 报警时间
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: 'AI感知器'
  },
  deviceList: {
    num: 0, // 房间内设备数量
    devlist: [], // 房间内设备列表
    roomName: '' // 房间类别
  }
};
export default state;
