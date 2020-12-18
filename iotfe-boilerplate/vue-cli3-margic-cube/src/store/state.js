const state = {
  mac: '', // 设备mac
  isOwner: false,
  finishLoad: process.env.NODE_ENV === 'development',
  dataObject: {
    Pow: NaN,
    FindCube: 0,
    // Scene: [
    //   '回家',
    //   '起床',
    //   '影院',
    //   false,
    //   '离家',
    // ],
    Scene: [
      false,
      false,
      false,
      false,
      false,
    ],
  },
  // deviceInfo中name可以修改，其他的请勿修改d
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: 'en', // 语言
    name: '魔方'
  }
};
export default state;
