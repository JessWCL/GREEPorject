// 字段需放进dataObject，其他的放外面, 结构请勿修改，内容自行修改
const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  errorCode: '', // 消息里进入故障页面的错误代码
  editEnable: true, // 消息里进入故障页面禁止解绑设备
  subscribeTimer: 0, // 设置的预约时间（小时）
  timerValue: {
    hr: 0,
    min: 0
  },
  errorList: [],
  isInit: false,
  showLoading: false,
  dataObject: {
    Pow: 1, // 开/关
    Dwet: 5, // 设定湿度[3 ~ 13]
    DwatSen: 56, // 实际湿度显示
    Dmod: 0, // 模式
    WdSpd: 1, // 风速[1 ~ 3]
    Dfltr: 0, // 过滤网清洗
    DwatFul: 0, // 水满
    AllErr: 0, // 总故障
    TemSen: 0, // 室内环境温度
    Health: 0, // 健康
    AppTimer: 0, // 预约
    Lig: 0, // 灯光
    MidType: 0, // 0有灯光功能，1无灯光功能
    estateInsta21: 0,
    estateOutsta22: 0,
    estateOutsta24: 0,
    estateOutsta23: 0,
  },
  deviceData: {},
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: 'zh_CN', // 语言
    name: '除湿机'
  }
};
export default state;
