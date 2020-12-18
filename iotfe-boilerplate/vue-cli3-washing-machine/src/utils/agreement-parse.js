export const parseParams = [
  // P8
  {
    launch: { start: 0, len: 1 }, // 启动 / 暂停
    nightWash: { start: 1, len: 2 }, // 夜间洗
    highWater: { start: 2, len: 3 }, // 高水位
    creaseRes: { start: 3, len: 4 }, // 防皱
    soak: { start: 1, len: 2 }, //  浸泡
    clear: { start: 1, len: 2 }, // 干净洗
  },
  // P9
  {
    autoMeek: { start: 0, len: 1  }, //  洗涤剂自动投放
    autoScour: {start: 0, len: 1  }, // 洗涤剂是否自动投放
  },
  // P10
  {
    washMode: {start: 0, len: 8 }, // 洗涤模式
  },
  // P11
  { 
    setWashTime: {start: 0, len: 8}, // 设定洗涤时间
  },
  // P12
  {
    washTemp: {start: 0, len: 8}, // 设定洗涤温度
  },
  //P13
  {
    potch:  {start: 0, len: 4}, // 设定漂洗次数
    speed: {start: 4, len: 4}, // 设定转速
  },
  // P14
  {
    timeAllH: {start: 0, len: 8}, // 设定总运行时间 高四位
  },
  // P15
  {
    timeAllL: {start: 0, len: 8, special: {'add': 'timeAllH'}}, // 设定总运行时间 底四位
  },
  // P16
  {
    setMeek: {start: 0, len: 4}, // 柔顺剂投放量
    setScour: {start: 4, len: 4},  // 洗涤剂投放量
  },
  // P17
  {
    stains: {start: 4, len: 4}, // 特渍
  },
  //P18
  {
    devState: {start: 4, len: 4}, //整机状态
  },
  // P19
  {
    runStage: {start: 0, len: 8}, //运行阶段表
  },
  // P20
  {
    timeLeftH: {start: 0, len: 8}, // 洗涤剩余总时间 高8位
  },
  // P21
  {
    timeLeftL: {start: 0, len: 8, special: {'add': 'timeLeftH'}}, // 洗涤剩余总时间 底8位
  }
],




