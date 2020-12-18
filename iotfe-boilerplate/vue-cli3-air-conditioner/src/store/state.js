// 字段需放进dataObject，其他的放外面, 结构请勿修改，内容自行修改
const state = {
  mac: '', // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  ModHeat: 4, // 制热模式
  errorCode: '', // 消息里进入故障页面的错误代码
  editEnable: true, // 消息里进入故障页面禁止解绑设备
  hasReportedForRepair: false,
  Has05: true,
  dataObject: {
    Pow: 1, // 电源
    Mod: 1, // 模式
    SetTem: 20, // 温度
    StHt: 0, // 八度制热
    Add05: 1,
    WdSpd: 4, // 风速
    Tur: 0, // 强劲
    Quiet: 0, // 静音
    SwUpDn: 0, // 上下扫风
    SwingLfRig: 0, // 左右扫风
    Lig: 0, // 灯光
    SwhSlp: 0, // 睡眠 1开 0关
    SlpMod: 0, // 睡眠 0关 1 2 3 4对应模式
    AssHt: 0, // 辅热
    AppTimer: 1,
    UDFanPort: 0, // 下出风
    VocCtl: 0 // 空调语音
  },
  deviceData: {
    VocCtl: 0 // 空调语音
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: 'zh_CN', // 语言
    name: 'M3柜机'
  }
};
export default state;
