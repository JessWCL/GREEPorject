// 字段需放进dataObject，其他的放外面, 结构请勿修改，内容自行修改
const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  errorCode: '', // 消息里进入故障页面的错误代码
  editEnable: true, // 消息里进入故障页面禁止解绑设备
  isInit: false,
  uilock: false, // ui锁，防止更新乱序
  errorList: [],
  dataObject: {
    Pow: 1, // 开/关
    Rotate: 0, // 左右摇头
    Mod: 0, // 模式
    WdSpd: 1, // 风速[1 ~ 12]
    TmrOn: 0, // 定时
    TmrAction: 0, // 定时模式
    TmrHour: 0, // 定时小时
    TmrMin: 0, // 定时分钟
    estate2: 0, // 故障
    JFerr: 0, // WiFi通讯故障
  },
  deviceData: {},
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: 'zh_CN', // 语言
    name: '落地扇'
  }
};
export default state;
