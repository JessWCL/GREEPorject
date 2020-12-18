const version = require('../../package.json').version;

const state = {
  mac: '', // 设备mac
  functype: 0, // 是否是场景模式（集中控制）0代表正常，1代表集中控制
  dataObject: {
    Pow: 1,
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: `iotfe模板 ${version}`
  }
};
export default state;
