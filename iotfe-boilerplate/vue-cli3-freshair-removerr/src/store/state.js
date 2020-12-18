const state = {
  mac: '', // 设备mac
  g_mac: '',
  mainmac: '',
  functype: 0, // 0代表正常，1代表集中控制
  isScene: 0, // 是否是场景模式
  isMorebtn: false, // 功能详细
  isTime: false,
  isSleep: 0,
  GasN: 0, // 点击时的盒子编号
  remarks: '',
  BoxStatus: true,
  homeName: [
    {
      room: '',
    },
    {
      room: '',
    },
  ],
  dataObject: {
    // SensorErr: 0, // 故障码
    // // 新风除霾机
    Pow: 1,
    FanMod: 1,
    WdSpd: 1,
    PctCle: 0,
    VitiGr: 1,
    PctRe: 3,
    GetEr: 0,
    IDUAirQu: 2,
    ODUViti: 4,
    GasQ: 0,
    InVitiGr: 1,
    InVitiGrCg: 10,
    RunMod: 1,
    ErrType: 0,
    ModS: 0,
    MIdType: 6079,
    Inloop: 1,
    IFDtiGr: 100,
    VitiGr: 100,
  },
  DataBoxData: [
    // {
    //   TemSor: 100,
    //   HumSor: 100,
    //   PM2P5: 1,
    //   CO2: 100,
    //   GasLED: 1,
    //   GasMod: 1,
    //   GasAvail: 1,
    //   GasMas: 1,
    //   SorErr: 1,
    //   AirQu: 0,
    //   CommErr: 0,
    //   PM2P5Sta: 1,
    // },
    // {
    //   TemSor: 100,
    //   HumSor: 100,
    //   PM2P5: 3,
    //   CO2: 0,
    //   GasLED: 0,
    //   GasMod: 1,
    //   GasAvail: 0,
    //   GasMas: 0,
    //   SorErr: 0,
    //   AirQu: 3,
    //   CommErr: 0,
    //   PM2P5Sta: 4,
    // },
  ],
  DataBoxObject: {
    TemSor: 0,
    HumSor: 0,
    PM2P5: 0,
    CO2: 0,
    GasMas: 0,
    GasLED: 0,
    GasAvail: 0,
    GasMod: 0,
    AirQu: 0,
    SorErr: 0,
    CommErr: 0,
    PM2P5Sta: 0,
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
  BoxParameterstList: [
    {
      value: 0,
      text: '开启空气盒子',
    },
    {
      value: 1,
      text: '设为主空气盒子',
    },
    {
      value: 2,
      text: '夜灯',
    },
    {
      value: 3,
      text: '呼吸灯',
    },
    {
      value: 4,
      text: 'PM2.5检测',
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
      range: [1, 2, 3, 4, 5, 6],
      rNames: ['低档', '中低档', '中档', '中高档', '高', '强劲'],
      icons: [
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
    name: '新风除霾机',
  },
  deviceNum: {
    num: 0, // 房间内设备数量
  },
};
export default state;
