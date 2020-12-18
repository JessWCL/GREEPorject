const state = {
  mac: '', // 设备主子mac
  mainmac: '', // 设备主mac
  g_mac: '', // 设备子mac
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  dataObject: {
    Pow: 1, // 电源
    Mod: 4, // 模式 1 制冷 3送风 4制热 9清爽 10自动除湿 11外出
    SetTem: 28, // 温度
    WdSpd: 5, // 风挡
    Quiet: 0, // 静音
    Blo: 0, // 干燥
    SvSt: 0, // 节能
    Air: 0, // 换气
    CoolSvStTemMin: 20, // 节能下线
    HeatSvStTemMax: 23, // 节能上线
    SetCoolHumi: 50, // 湿度
    // Has05: 1, // 是否带0.5
    SwhSlp: 0, // 睡眠
    AidHeat: 1, // 辅热
    SetDeciTem: 280, // 带0.5的温度
    GetEr: 0, // 故障
    MasSub: 1, // 设备mac
    SysSta: 2, // 外出开 1  关 2
  },
  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '空调',
  },
};
export default state;
