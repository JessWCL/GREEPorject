const state = {
  mac: '', // 设备mac
  isDebug: false, // 是否是debug状态
  functype: 0, // 0代表正常，1代表集中控制
  editEnable: true, // 消息里进入故障页面禁止解绑设备
  synchronize: { // 跟小卡片同步数据的字段，跟config/statueJson保持一致
    Pow: 1, // 电源
    WdSpd: 1, // 风速
    Mod: 1, // 模式

    estate: 0, // 故障
    estate2: 0, // 故障
    estate3: 0, // 故障
    estate4: 0, // 故障
  },
  showData: {
    washModeIndex: 0,
    isCloseing: 0,
    HDwashType: 0,  
    HDwashModeIndex: 5,
    isShowPopUp: false, // 是否弹框
  },
  statusList: [], // 目前的状态数据
  dataObject: { // 插件跟wifi通信的字段，跟config/statueJson2保持一致
    Pow: 1, // 电源
    washType: 2, // 洗涤类型  0洗涤 1洗烘 2烘干 3蒸汽护理
    washMode: 1, // 洗涤模式 没有0, 最大26
    eco: 0, // eco 节能功能

    runStage: 0, // 显示板进程1-180 参照运行阶段表
    devState: 0, // 整机状态 // 0待机 1启动 2暂停 3结束 4故障 5关机 
    launch: 0, // 按键启动/暂停状态

    childLock: 0, // 童锁
    specialLock: 0, // 特殊锁, 1童锁生效 0童锁不生效

    order: 0, // 预约
    orderLaunch: 1, // 暂停预约0 , 继续为1
    orderTimeDay: 0, // 0今天 1明天
    orderTimeHour: 1, // 预约小时
    orderTimeMin: 0, // 预约分钟

    energySave: 0, // 节能
    noDrain: 0, // 免排水
    nightWash: 0, // 夜间洗
    highWater: 0, // 高水位
    creaseRes: null, // 防皱


    steamCare: 0, // 蒸汽护理

    soak: 0, // 浸泡
    mute: 0, // 静音
    autoScour: 0, //  洗涤剂是否自动投放
    autoMeek: 0, // 柔顺剂是否自动投放
    setScour: 1, // 洗涤剂投放量
    setMeek: 1, // 柔顺剂投放量
    washWeather: 0, // 看天洗衣
    washTime: 0, // 看时洗衣
    autoOpenDoor: 0, // 自动开门锁


    speed: 1000, // 设定转速
    washTemp: 40, // 设定洗涤温度
    setWashTime: 15, // 设定洗涤时间
    waterLevel: 0, // 设定水位
    potch: 2, // 设定漂洗次数
    timeAll: 67, // 设定总运行时间
    dry: 0, // 设定烘干状态
    dryTime: 0, // 设定烘干时间
    soakTime: 0, // 设定浸泡时间
    smudge: 2, // 脏污程度 0不选择 1轻微 2标准 3较脏   

    doorLock: 0, // 是否开门锁
    
    orderTime: 0, // 设定预约时间
    runTime: 1, // 已运行时间
    timeLeft: 67, // 洗涤剩余总时间

    
    error1: 0, // 故障字段1
    error2: 0, // 故障字段2
    error3: 0, // 故障字段3
    error4: 0, // 故障字段4
    prompt1: 0, // 提示字段1
    prompt2: 0, // 提醒字段2
    JFerr: 0, // wifi 通讯故障
    // eslint-disable-next-line no-tabs
    favor1Params: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    favor2Params: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    favor3Params: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    sync: 0, // 收藏夹是否正在同步

    // 好像用不到 
    drying: 0,
    reset: 0, // 恢复默认设置状态
    changeFavor: 1, // 改变的收藏夹编号  新增1、删除2、改变3  执行7 
    exeFavor: 1, // 执行的收藏夹编号
    preWash: 0, // 预洗
    washMax: '', // 最大洗涤容量
    dryMax: '', // 最大烘干容量
    disLight: '', // 屏幕亮度调节
    volume: '', // 声音调节
    statusFavor: '', // APP查询收藏夹状态
    chFavorFlag: '', // APP收藏夹参数是否改变
    language: '', // 语言种类选择
    outHomeFlag: '', // 离家标志
    weather: '', // 天气状态
    weatherTem: '', // 天气-温度
    weatherHum: '', // 天气-湿度
    windPower: '', // 风力
    city: '', // 城市
  },
  remarks_on: {},
  remarks_off: { // 关机机状态下，场景模式需要返回给主体的文字
  },
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 0, // 设备在线状态，设备状态 0近程发现设备 1远程发现设备 2近程在线 3远程在线 -1掉线
    lang: '', // 语言
    name: '洗衣机',
  },
};
export default state;
