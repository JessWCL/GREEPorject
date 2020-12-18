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
    washType: 1, // 洗涤类型  0洗涤 1洗烘 2烘干 3蒸汽护理
    washMode: 1, // 洗涤模式 没有0, 最大26
    eco: 0, // eco 节能功能

    runStage: 0, // 显示板进程1-180 参照运行阶段表
    devState: 0, // 整机状态 // 0待机 1启动 2暂停 3结束 4故障 5关机 
    launch: 0, // 按键启动/暂停状态

    childLock: 0, // 童锁

    order: 0, // 预约
    orderLaunch: 1, // 暂停预约0 , 继续为1
    orderTimeDay: 0, // 0今天 1明天
    orderTimeHour: 1, // 预约小时
    orderTimeMin: 0, // 预约分钟

    energySave: 0, // 节能
    noDrain: 0, // 免排水
    nightWash: 0, // 夜间洗
    highWater: 0, // 高水位
    creaseRes: 0, // 防皱
    preWash: 0, // 预洗

    steamCare: 0, // 蒸汽护理
    doorLock: 0, // 是否开门锁
    soak: 0, // 浸泡
    mute: 0, // 静音
    autoScour: 0, // 洗涤剂是否自动投放
    autoMeek: 0, // 柔顺剂是否自动投放
    washWeather: 0, // 看天洗衣
    washTime: 0, // 看时洗衣
    autoOpenDoor: 0, // 自动开门锁
    drying: 0,

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

    orderTime: 0, // 设定预约时间

    timeLeft: 67, // 洗涤剩余总时间
    reset: 0, // 恢复默认设置状态

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


    // E项目
    // 静音mute 童锁childLock 电源Pow  JFerr
    drumNumber: 1, // 1 2 4 改变筒的状态
    drum1Params: [], // 筒一参数数组
    drum2Params: [],
    drum3Params: [],
    drum1Order: [], // 筒一预约数组
    drum2Order: [], 
    drum3Order: [], 
    drumError: 0, // 发生故障筒序号 1 全局 2 下筒 4 中筒 8上筒   
    drum1Error: [], // 筒一故障数组
    drum2Error: [],
    drum3Error: [],
    drum1prompt: [], // 筒一提醒数组
    drum2prompt: [],
    drum3prompt: [],

    // 好像用不到 
    changeFavor: '', // 改变的收藏夹编号  新增1、删除2、改变3
    exeFavor: '', // 执行的收藏夹编号
  },

  // E项目解析出来的数据
  parseObj: {
    Pow: 1,
    mute: 0,
    childLock: 0,
    drum1Params: {
      washMode: 2, // 洗涤模式 没有0, 最大26

      devState: 0, // 整机状态 // 0待机 1启动 2暂停 3结束 4故障 5关机 
      runStage: 0, // 显示板进程1-180 参照运行阶段表
      launch: 0, // 按键启动/暂停状态
      timeAll: 67, // 设定总运行时间
      timeLeft: 67, // 洗涤剩余总时间
  
      soak: 0, // 浸泡
      clear: 0, // 干净（极净洗）
      nightWash: 0, // 安静洗（夜间洗）
      creaseRes: 0, // 防皱
      highWater: 0, // 高水位

      autoScour: 0, // 洗涤剂是否自动投放
      autoMeek: 0, // 柔顺剂是否自动投放

      setWashTime: 15, // 设定洗涤时间
      washTemp: 40, // 设定洗涤温度
      potch: 2, // 设定漂洗次数
      speed: 1000, // 设定转速
      stains: 0, // 特渍 0无 1血渍 2奶渍 3油渍 4汗渍 5果渍 

      error1: 0, // 故障字段1
      error2: 0, // 故障字段2
      error3: 0, // 故障字段3
      error4: 0, // 故障字段4
      prompt1: 0, // 提示字段1
      prompt2: 0, // 提醒字段2
    },
    drum2Params: {
      washMode:5, // 洗涤模式 没有0, 最大26

      devState: 0, // 整机状态 // 0待机 1启动 2暂停 3结束 4故障 5关机 
      runStage: 0, // 显示板进程1-180 参照运行阶段表
      launch: 0, // 按键启动/暂停状态
      timeAll: 69, // 设定总运行时间
      timeLeft: 69, // 洗涤剩余总时间
  
      soak: 0, // 浸泡
      clear: 0, // 干净（极净洗）
      nightWash: 0, // 安静洗（夜间洗）
      creaseRes: 0, // 防皱
      highWater: 0, // 高水位

      autoScour: 0, // 洗涤剂是否自动投放
      autoMeek: 0, // 柔顺剂是否自动投放

      setWashTime: 15, // 设定洗涤时间
      washTemp: 40, // 设定洗涤温度
      potch: 2, // 设定漂洗次数
      speed: 1000, // 设定转速
      stains: 0, // 特渍 0无 1血渍 2奶渍 3油渍 4汗渍 5果渍 

      error1: 0, // 故障字段1
      error2: 0, // 故障字段2
      error3: 0, // 故障字段3
      error4: 0, // 故障字段4
      prompt1: 0, // 提示字段1
      prompt2: 0, // 提醒字段2
    },
    drum3Params: {
      washType: 0,
      washMode: 7, // 洗涤模式 没有0, 最大26

      devState: 0, // 整机状态 // 0待机 1启动 2暂停 3结束 4故障 5关机 
      runStage: 0, // 显示板进程1-180 参照运行阶段表
      launch: 0, // 按键启动/暂停状态
      timeAll: 59, // 设定总运行时间
      timeLeft: 59, // 洗涤剩余总时间
  
      soak: 0, // 浸泡
      clear: 0, // 干净（极净洗）
      nightWash: 0, // 安静洗（夜间洗）
      creaseRes: 0, // 防皱
      highWater: 0, // 高水位

      autoScour: 0, // 洗涤剂是否自动投放
      autoMeek: 0, // 柔顺剂是否自动投放

      setWashTime: 15, // 设定洗涤时间
      washTemp: 40, // 设定洗涤温度
      potch: 2, // 设定漂洗次数
      speed: 1000, // 设定转速
      stains: 0, // 特渍 0无 1血渍 2奶渍 3油渍 4汗渍 5果渍 

      error1: 0, // 故障字段1
      error2: 0, // 故障字段2
      error3: 0, // 故障字段3
      error4: 0, // 故障字段4
      prompt1: 0, // 提示字段1
      prompt2: 0, // 提醒字段2
    },

    drum1Order: {
      order: 0, // 预约
      orderLaunch: 1, // 暂停预约0 , 继续为1
      orderTimeDay: 0, // 0今天 1明天
      orderTimeHour: 1, // 预约小时
      orderTimeMin: 0, // 预约分钟
    },
    drum2Order: {},
    drum3Order: {},

    drum1prompt: {
      prompt1: 0, // 提示字段1
      prompt2: 0, // 提醒字段2
    },
    drum2prompt: {},
    drum3prompt: {},
  },
  

  remarks_on: {},
  remarks_off: {},
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 0, // 设备在线状态，设备状态 0近程发现设备 1远程发现设备 2近程在线 3远程在线 -1掉线
    lang: '', // 语言
    name: '洗衣机',
  },
};
export default state;
