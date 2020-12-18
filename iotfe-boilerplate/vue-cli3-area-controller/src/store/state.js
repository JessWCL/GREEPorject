const state = {
  mac: '', // 设备主mac
  gmac: '12131312', // 设备子
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 1, // 是否是场景模式
  isInit: true, // loading判断
  dataObject: {
    Pow: 1, // 电源
    Mod: 1, // 模式 1 制冷 2制热
    StTem: 0, // 温度
    WdSpd: 1, // 风挡
    Dry: 0, // 干燥
    EnSvSt: 0, // 节能
    StFahFlg: 0, // 华氏度摄氏度1度区分码
    ColdMod: 0, // 判断单冷机型  0:无效  1：单冷 2： 单热 3： 冷暖  4：送风
    HeatSvStTemMax: 0,
    CoolSvStTemMin: 0,
    Dred: 0,
    AppTimer: 0,
    TemUnit: 0, // 区分华氏度摄氏度
    IndoorType: 0, // 0未识别 1 UMATCH 2 大风管机型
    OMod: 0, // 0 关闭  1 开启
    LowDeHumi: 0, // 0 关闭  1 开启
    Quier: 0,
    RmType: 0,
    RmNum: 0,
    VavleAllOn: 0, // 常开区域
    CSvStTemMinFlg: 0, // 制冷节能一度标志位
    HSvStTemMaxFlg: 0, // 制热节能一度标志位
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '格力空调',
  },
};
export default state;
