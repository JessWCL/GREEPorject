const state = {
  mac: '', // 设备mac
  g_mac: '',
  mainmac: '',
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  remarks: '',
  dataObject: {
    Pow: 1,
    FanMod: 1,
    WdSpd: 2,
    PctCle: 0,
    VitiGr: 10,
    PctRe: 3,
    GetEr: 0,
    IDUAirQu: 2,
    AirQu: 1,
    TemSor: 20,
    HumSor: 20,
    PM2P5: 35,
    VOC: 200,
    CO2: 600,
    HCHO: 7,
    PM2P5EN: 0,
    HCHOEN: 1,
    ODUViti: 4,
    InVitiGr: 1,
    InVitiGrCg: 10,
    InEffClRes: 1,
    InEffReRes: 1,
    IFDClRes: 1,
    EffReRes: 2,
    RunMod: 1,
    ErrType: 0,
    ModS: 7,
    MdVitiGr: 50,
    MIdType: '60a0',
    Inloop: 0,
    InloopEN: 1,
    SorSet: 0, // 0：无效；1：选择PM2.5；2：选择CO2；3：选择综合
  },
  // 当前污染等级参数
  PollutionList: [
    {
      value: 1,
      text: '优',
    },
    {
      value: 2,
      text: '良',
    },
    {
      value: 3,
      text: '轻度污染',
    },
    {
      value: 4,
      text: '中度污染',
    },
    {
      value: 5,
      text: '重度污染',
    },
    {
      value: 6,
      text: '严重污染',
    },
  ],
  // 除霾机配置参数
  swiperOptions: {
    effect: 'cube',
    cubeEffect: {
      slideShadows: false,
      shadow: false,
    },
  },
  data: {
    // 模式
    FanMode: {
      name: 'FanMode',
      cName: '模式',
      power: true,
      controlable: true,
      value: 1,
      range: [1, 2, 3, 4, 5, 6, 7],
      rNames: ['自动', '低', '中低', '中', '中高', '高', '强劲'],
      icons: [
        require('../assets/img/n_auto.png'),
        require('../assets/img/n_low.png'),
        require('../assets/img/n_medium_low.png'),
        require('../assets/img/n_medium.png'),
        require('../assets/img/n_medium_high.png'),
        require('../assets/img/n_high.png'),
        require('../assets/img/n_turbo.png'),
      ],
    },
    // 运行模式
    MoveMode: {
      name: 'MoveMode',
      cName: '运行模式',
      power: true,
      controlable: true,
      value: 1,
      range: [1, 2, 3],
      rNames: ['运行', '联动', '自动'],
      icons: [
        require('../assets/img/hand_c.png'),
        require('../assets/img/link_c.png'),
        require('../assets/img/auto_c.png'),
      ],
    },
  },

  // deviceInfo中name可以修改，其他的请勿修改
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '新风净化机',
  },
  deviceNum: {
    num: 0, // 房间内设备数量
  },
  remarks_off: {
    // 关机状态下，场景模式需要返回给主体的文字
  },
};
export default state;
