// 字段需放进dataObject，其他的放外面, 结构请勿修改，内容自行修改
/* eslint-disable */
const state = {
  mac: "", // 设备mac
  functype: 0, // 0代表正常，1代表集中控制
  errorCode: "", // 消息里进入故障页面的错误代码
  editEnable: true, // 消息里进入故障页面禁止解绑设备
  hasReportedForRepair: false, // 是否已保修
  dataObject: {
    Pow: 1, // 电源,0关闭，1开启
    Mode: 0, // 零冷水模式，1单次，2点动，3全天候，4预约
    PreBoost: 0, // 增压,0关闭，1开启
    InWaterTemp: 130, // 进水温度，传送值=实际值+100
    SetTemp: 135, // 设定的水温，传送值=实际值+100
    Cruise: 0, // 预约巡航开关0关闭，1开启
    ErrorCode1: 0, // 故障1
    ErrorCode2: 0, // 故障2
    ErrorCode3: 0, // 故障3
    JFerr: 0, // WIFI故障
    rssi: 0, // 信号强度
    BurnState: 0, // 燃烧状态，0，温度>50可调大小，1温度>50只减不增
    CruiseState: 0 // 巡航状态，0不巡航，1巡航中
  },
  toastLock: false,
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: "", // 主体插件页面路径
    fullstatueJson: "", // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: "zh_CN", // 语言
    name: "零冷水燃气热水器"
  },
  cloudTimer: {} // 云定时数据
};
export default state;
