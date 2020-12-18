/**
 * @constant {object} washModeConfig
 * @description 洗涤模式配置表
 */

// 各模式对应的配置
const washList28a03 = [
  // 混合 0
  {
    index: 0, // 洗涤模式序号
    modeNum: 2, // 对应洗涤模式字段
    chineseName: '混合',
    configList: [
      {
        list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
        protocol: 'setWashTime', // 设定洗涤时间
        value: 15,
      }, 
      {
        list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
        timeList: { // 对应需要的加热时间
          0: 0,
          20: 5,
          30: 10,
          40: 15
        },
        defalutWashTimeList: { // 切换温度时对应的洗涤时间默认值
          0: 45,
          20: 35,
          30: 25,
          40: 15
        },
        protocol: 'washTemp', // 协议字段 洗涤温度
        value: 40, // 选中的值,
      },
      {
        list: [1, 2, 3, 4, 5, 6, 7, 8],
        protocol: 'potch', // 漂洗次数
        singleTime: 13, // 一次洗涤时间
        value: 2,
      },
      {
        list: [0, 400, 600, 800, 1000, 1200, 1400],
        protocol: 'speed', // 转速
        value: 1000,
      },
      {
        list: ['不烘干', '标准', '超干', 30, 60, 90, 120, 150, 180],
        protocol: 'dry', // 协议字段 转速
        timeList: {
          0: 0,
          1: 163,
          2: 183,
          3: 30,
          4: 60,
          5: 90,
          6: 120,
          7: 150,
          8: 180
        },
        value: '不烘干'
      }
    ],
    drySpeed: { // 选择烘干时，脱水转速
      list: [1000, 1200, 1400, 1000, 1200, 1400],
      protocol: 'speed', // 转速
      value: 1200
    },
    defaultTime: 67, // 默认时间
    Speed0Time: 8, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 800, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: { // 辅助功能是否拥有该选项[预约,童锁, 静音, 夜间洗, 节能,,高水位,浸泡, 柔顺剂自动投放,洗涤剂自动投放] 
      order: true,
      mute: true,
      nightWash: true,
      energySave: true,
      highWater: true,
      soak: true,
      autoScour: 'U',
      autoMeek: 'U',
      noDryNightWash: true, // 夜间洗和烘干互斥， 为true, 表示烘干下 夜间洗不可选
    },
    auxiliaryTimeList: { // 选择的时候加减的时间
      energySave: 10,
      nightWash: 14,
      soak: 30,
    },
    IconName: 'hun-he',
  },

  // 快洗 1
  {
    index: 1,
    modeNum: 3,
    chineseName: '快洗',
    configList: [
      {
        list: [0, 5, 10, 15, 20, 25, 30],
        protocol: 'setWashTime', // 协议字段  设定洗涤时间
        value: 0,
      }, 
      {
        list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
        timeList: { // 对应需要的加热时间
          0: 0,
          20: 5,
          30: 5,
          40: 20
        }, 
        defalutWashTimeList: { // 切换温度时对应的洗涤时间默认值
          0: 10,
          20: 5,
          30: 0,
          40: 0
        }, 
        protocol: 'washTemp', // 协议字段 洗涤温度
        value: 30,
      },
      {
        list: [1, 2, 3, 4],
        protocol: 'potch', // 协议字段 漂洗次数
        singleTime: 6, // 一次洗涤时间
        value: 1,
      },
      {
        list: [0, 400, 600, 800, 1000, 1200],
        protocol: 'speed', // 协议字段 转速
        value: 1000,
      },
      {
        list: ['不烘干', '标准', '超干', 30, 60, 90, 120, 150, 180],
        protocol: 'dry', // 协议字段 转速
        timeList: {
          0: 0,
          1: 58,
          2: 78,
          3: 30,
          4: 60,
          5: 90,
          6: 120,
          7: 150,
        },
        value: '不烘干'
      }
    ],
    drySpeed: { // 选择烘干时，脱水转速
      list: [1000, 1200],
      protocol: 'speed', // 转速
      value: 1200
    },
    defaultTime: 15,
    Speed0Time: 2, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 800, // 夜间洗转速
    nightWashSpeed0Time: 3, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: false,
      nightWash: true,
      highWater: false,
      soak: true,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      noDryNightWash: true, // 夜间洗和烘干互斥， 为true, 表示烘干下 夜间洗不可选
    },
    auxiliaryTimeList: {
      soak: 30,
    }, // 辅助功能选择时增加对应的时间 false 代表不可选
    IconName: 'kuai-xi',
  },

  // 棉麻 2
  {
    index: 2,
    modeNum: 1,
    chineseName: '棉麻',
    configList: [
      {
        list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
        protocol: 'setWashTime', // 协议字段  设定洗涤时间
        value: 15,
      }, 
      {
        list: ['不加热', 20, 30, 40, 60, 90], // 可选列表 （中文对应的具体value 参考utils 文件）
        timeList: { // 对应需要的加热时间
          0: 0,
          20: 5,
          30: 10,
          40: 15,
          60: 30,
          90: 75
        },
        defalutWashTimeList: { // 切换温度时对应的洗涤时间默认值
          0: 45,
          20: 35,
          30: 25,
          40: 15,
          60: 20,
          90: 25
        },
        protocol: 'washTemp', // 协议字段 洗涤温度
        value: 40,
      },
      {
        list: [1, 2, 3, 4, 5, 6, 7, 8],
        protocol: 'potch', // 协议字段 漂洗次数
        singleTime: 13, // 一次洗涤时间
        value: 2,
      },
      {
        list: [0, 400, 600, 800, 1000, 1200, 1400],
        protocol: 'speed', // 协议字段 转速
        value: 1000,
      },
      {
        list: ['不烘干', '标准', '超干', 30, 60, 90, 120, 150, 180],
        protocol: 'dry', // 协议字段 转速
        timeList: {
          0: 0,
          1: 163,
          2: 183,
          3: 30,
          4: 60,
          5: 90,
          6: 120,
          7: 150,
          8: 180
        },
        value: '不烘干'
      }
    ],
    drySpeed: { // 选择烘干时，脱水转速
      list: [1000, 1200, 1400, 1000, 1200, 1400],
      protocol: 'speed', // 转速
      value: 1200
    },
    defaultTime: 68,
    Speed0Time: 9, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 800, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    noDryNightWash: true, // 夜间洗和烘干互斥， 为true, 表示烘干下 夜间洗不可选
    auxiliaryFunction: {
      energySave: true,
      nightWash: true,
      highWater: true,
      soak: true,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      noDryNightWash: false, // 夜间洗和烘干互斥， 为true, 表示烘干下 夜间洗不可选
    },
    auxiliaryTimeList: {
      energySave: 10,
      nightWash: 13,
      soak: 30,
    },
    IconName: 'mian-ma',
  },

  // 大物 3
  {
    index: 13,
    modeNum: 5,
    chineseName: '大物',
    configList: [{
      list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
      protocol: 'setWashTime', // 协议字段  设定洗涤时间
      value: 15,
    }, {
      list: ['不加热', 20, 30, 40, 60], // 可选列表 （中文对应的具体value 参考utils 文件）
      timeList: {
        0: 0,
        20: 5,
        30: 10,
        40: 15,
        60: 30
      },
      defalutWashTimeList: {
        0: 45,
        20: 35,
        30: 25,
        40: 15,
        60: 20
      },
      protocol: 'washTemp', // 协议字段 洗涤温度
      value: 40,
    },
    {
      list: [1, 2, 3, 4, 5, 6, 7, 8],
      protocol: 'potch', // 协议字段 漂洗次数
      singleTime: 13, // 一次洗涤时间
      value: 3,
    },
    {
      list: [0, 400, 600, 800, 1000],
      protocol: 'speed', // 协议字段 转速
      value: 1000,
    }
    ],
    defaultTime: 81,
    Speed0Time: 9, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 600, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: true,
      nightWash: true,
      highWater: true,
      soak: true,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      noDryNightWash: 1, // 夜间洗和烘干互斥， 为true, 表示烘干下 夜间洗不可选， 1 代表同个意思，但是要区分
    },
    auxiliaryTimeList: {
      energySave: 10,
      nightWash: 13,
      soak: 30,
    },
    IconName: 'da-wu',
  },

  // 轻柔 4
  {
    index: 15,
    modeNum: 24,
    chineseName: '轻柔',
    configList: [{
      list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
      protocol: 'setWashTime', // 协议字段  设定洗涤时间
      value: 25,
    }, {
      list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
      timeList: {
        0: 0,
        20: 5,
        30: 10,
        40: 15
      },
      defalutWashTimeList: {
        0: 45,
        20: 35,
        30: 25,
        40: 15
      },
      protocol: 'washTemp', // 协议字段 洗涤温度
      value: 30,
    },
    {
      list: [1, 2, 3, 1, 2, 3],
      protocol: 'potch', // 协议字段 漂洗次数
      singleTime: 9, // 一次洗涤时间
      value: 2,
    },
    {
      list: [0, 400, 600, 800],
      protocol: 'speed', // 协议字段 转速
      value: 600,
    }
    ],
    defaultTime: 61,
    Speed0Time: 5, // 转速为0时需要减去的时间
    defaultSpeed: 600, // 默认转速
    nightWashSpeed: 600, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: true,
      nightWash: true,
      highWater: true,
      soak: false,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      noDryNightWash: false, // 夜间洗和烘干互斥， 为true, 表示烘干下 夜间洗不可选
    },
    auxiliaryTimeList: {
      energySave: 10,
      nightWash: 17,
    },
    IconName: 'qing-rou',
  },

  // 衬衫 5
  {
    index: 3,
    modeNum: 4,
    chineseName: '衬衫',
    configList: [
      {
        list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
        protocol: 'setWashTime', // 协议字段  设定洗涤时间
        value: 15,
      }, {
        list: ['不加热', 20, 30, 40, 60], // 可选列表 （中文对应的具体value 参考utils 文件）
        timeList: {
          0: 0,
          20: 5,
          30: 10,
          40: 15,
          60: 30
        },
        defalutWashTimeList: {
          0: 45,
          20: 35,
          30: 25,
          40: 15,
          60: 20
        },
        protocol: 'washTemp', // 协议字段 洗涤温度
        value: 40,
      },
      {
        list: [1, 2, 3, 4, 5, 6, 7, 8],
        protocol: 'potch', // 协议字段 漂洗次数
        singleTime: 13, // 一次洗涤时间
        value: 2,
      },
      {
        list: [0, 400, 600, 800],
        protocol: 'speed', // 协议字段 转速
        value: 800,
      },
      {
        list: ['不烘干', '标准', '超干', 30, 60, 90, 120, 150, 180],
        protocol: 'dry', // 协议字段 转速
        timeList: {
          0: 0,
          1: 113,
          2: 123,
          3: 30,
          4: 60,
          5: 90,
          6: 120,
          7: 150,
          8: 180
        },
        value: '不烘干'
      }
    ],
    drySpeed: { // 选择烘干时，脱水转速
      list: [800],
      protocol: 'speed', // 转速
      value: 800
    },
    defaultTime: 67,
    Speed0Time: 8, // 转速为0时需要减去的时间
    defaultSpeed: 800, // 默认转速
    nightWashSpeed: 600, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: true,
      nightWash: true,
      highWater: true,
      soak: true,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      noDryNightWash: true, // 夜间洗和烘干互斥， 为true, 表示烘干下 夜间洗不可选
    },
    auxiliaryTimeList: {
      energySave: 10,
      nightWash: 14,
      soak: 30,
    },
    IconName: 'chen-shan',
  },

  // 羊毛 6
  {
    index: 4,
    modeNum: 10,
    chineseName: '羊毛',
    configList: [
      {
        list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
        protocol: 'setWashTime', // 协议字段  设定洗涤时间
        value: 25,
      }, {
        list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
        timeList: {
          0: 0,
          20: 5,
          30: 10,
          40: 15
        }, 
        defalutWashTimeList: {
          0: 45,
          20: 35,
          30: 25,
          40: 15
        },
        protocol: 'washTemp', // 协议字段 洗涤温度
        value: 30,
      },
      {
        list: [2, 3, 4, 2, 3, 4], // 只有三个需重复
        protocol: 'potch', // 协议字段 漂洗次数
        singleTime: 9, // 一次洗涤时间
        value: 2,
      },
      {
        list: [0, 400, 600, 800],
        protocol: 'speed', // 协议字段 转速
        value: 800,
      }
    ],
    defaultTime: 60,
    defaultSpeed: 800, // 默认转速
    nightWashSpeed: 600, // 夜间洗转速
    Speed0Time: 4, // 转速为0时需要减去的时间
    nightWashSpeed0Time: 5, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: false,
      nightWash: true,
      highWater: false,
      soak: false,
      autoScour: true,
      autoMeek: true,
      order: true,
      mute: true,
      noDryNightWash: 1, // 夜间洗和烘干互斥， 为true, 表示烘干下 夜间洗不可选
    },
    auxiliaryTimeList: {},
    IconName: 'yang-mao',
  },

  // 羽绒服 7
  {
    index: 6,
    modeNum: 11,
    chineseName: '羽绒服',
    configList: [
      {
        list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
        protocol: 'setWashTime', // 协议字段  设定洗涤时间
        value: 15,
      }, {
        list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
        timeList: {
          0: 0,
          20: 5,
          30: 10,
          40: 15
        },
        defalutWashTimeList: {
          0: 45,
          20: 35,
          30: 25,
          40: 15
        },
        protocol: 'washTemp', // 协议字段 洗涤温度
        value: 40,
      },
      {
        list: [1, 2, 3, 4, 5],
        protocol: 'potch', // 协议字段 漂洗次数
        singleTime: 11, // 一次洗涤时间
        value: 2,
      },
      {
        list: [0, 400, 600, 800],
        protocol: 'speed', // 协议字段 转速
        value: 800,
      }
    ],
    defaultTime: 61,
    Speed0Time: 6, // 转速为0时需要减去的时间
    defaultSpeed: 800, // 默认转速
    nightWashSpeed: 600, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: true,
      nightWash: true,
      highWater: true,
      soak: true,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      noDryNightWash: 1, // 夜间洗和烘干互斥， 为true, 表示烘干下 夜间洗不可选
    },
    auxiliaryTimeList: {
      energySave: 10,
      nightWash: 16,
      soak: 30,
    },
    IconName: 'yu-rong-fu',
  },

  // 水幕清新 8
  {
    index: 5,
    modeNum: 32,
    chineseName: '水幕清新',
    configList: [],
    defaultTime: 30,
    auxiliaryFunction: {
      energySave: false,
      nightWash: false,
      highWater: false,
      soak: false,
      autoScour: false,
      autoMeek: false,
      order: true,
      mute: true,
      noDryNightWash: false, // 夜间洗和烘干互斥， 为true, 表示烘干下 夜间洗不可选
    },
    auxiliaryTimeList: {},
    IconName: 'shui-mu-qing-xin',
  },

  // 除螨 9
  {
    index: 14,
    modeNum: 29,
    chineseName: '除螨',
    configList: [{
      list: [5],
      protocol: 'setWashTime', // 协议字段  设定洗涤时间
      value: 5,
    }, {
      list: [60], // 可选列表 （中文对应的具体value 参考utils 文件）
      timeList: {
        60: 80
      },
      defalutWashTimeList: {60: 5}, // 切换温度时对应的洗涤时间默认值
      protocol: 'washTemp', // 协议字段 洗涤温度
      value: 60,
    },
    {
      list: [1, 2, 3, 4, 5, 6, 7, 8],
      protocol: 'potch', // 协议字段 漂洗次数
      singleTime: 10, // 一次洗涤时间
      value: 2,
    },
    {
      list: [400, 600, 800, 1000, 1200, 1400],
      protocol: 'speed', // 协议字段 转速
      value: 1000,
    },
    {
      list: ['不烘干', '标准', '超干', 30, 60, 90, 120, 150, 180],
      protocol: 'dry', // 协议字段 转速
      timeList: {
        0: 0,
        1: 163,
        2: 183,
        3: 30,
        4: 60,
        5: 90,
        6: 120,
        7: 150,
        8: 180
      },
      value: '不烘干'
    }
    ],
    drySpeed: { // 选择烘干时，脱水转速
      list: [1000, 1200, 1400, 1000, 1200, 1400],
      protocol: 'speed', // 转速
      value: 1200
    },
    defaultTime: 117,
    Speed0Time: 9, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 800, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: false,
      nightWash: true,
      highWater: false,
      soak: true,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      noDryNightWash: true, // 夜间洗和烘干互斥， 为true, 表示烘干下 夜间洗不可选
    },
    auxiliaryTimeList: {
      nightWash: 13,
      soak: 30,
    },
    IconName: 'chu-man',
  },

  // 极净洗 10
  {
    index: 10,
    modeNum: 30,
    chineseName: '极净洗',
    configList: [
      {
        list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
        protocol: 'setWashTime', // 协议字段  设定洗涤时间
        value: 20,
      }, {
        list: [60], // 可选列表 （中文对应的具体value 参考utils 文件）
        timeList: {
          60: 40
        },
        defalutWashTimeList: {60: 0}, // 切换温度时对应的洗涤时间默认值
        protocol: 'washTemp', // 协议字段 洗涤温度
        value: 60,
      },
      {
        list: [1, 2, 3, 4, 5, 6, 7, 8],
        protocol: 'potch', // 协议字段 漂洗次数
        singleTime: 12, // 一次洗涤时间
        value: 2,
      },
      {
        list: [0, 400, 600, 800, 1000, 1200, 1400],
        protocol: 'speed', // 协议字段 转速
        value: 1000,
      },
      {
        list: ['不烘干', '超干'],
        protocol: 'dry', // 协议字段 转速
        timeList: {
          0: 0,
          2: 210,
        },
        value: '超干'
      }
    ],
    drySpeed: { // 选择烘干时，脱水转速
      list: [1000, 1200, 1400, 1000, 1200, 1400],
      protocol: 'speed', // 转速
      value: 1200
    },
    defaultTime: 119,
    Speed0Time: 9, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 800, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: false,
      nightWash: true,
      highWater: false,
      soak: true,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      noDryNightWash: true, // 夜间洗和烘干互斥， 为true, 表示烘干下 夜间洗不可选
    },
    auxiliaryTimeList: {
      nightWash: 13,
      soak: 30,
    },
    IconName: 'ji-jing-xi',
  },

  // 强烘干 11
  {
    index: 10,
    modeNum: 23,
    chineseName: '强烘干',
    configList: [
      {
        list: [1000, 1200, 1400, 1000, 1200, 1400],
        protocol: 'speed', // 协议字段 转速
        value: 1200,
      },
      {
        list: ['标准', '超干', 30, 60, 90, 120, 150, 180],
        protocol: 'dry', // 协议字段 转速
        timeList: {
          1: 171,
          2: 191,
          3: 30,
          4: 60,
          5: 90,
          6: 120,
          7: 150,
          8: 180
        },
        value: '标准'
      }
    ],
    defaultTime: 0, // 该模式为烘干模式，故洗涤时间为0
    defaultSpeed: 1200, // 默认转速
    auxiliaryFunction: {
      energySave: false,
      nightWash: false,
      highWater: false,
      soak: false,
      autoScour: false,
      autoMeek: false,
      order: true,
      mute: true,
      noDryNightWash: false, // 夜间洗和烘干互斥， 为true, 表示烘干下 夜间洗不可选
    },
    auxiliaryTimeList: {
      energySave: 10,
    },
    IconName: 'qiang-hong-gan',
  },

  // 弱烘干 12
  {
    index: 10,
    modeNum: 22,
    chineseName: '弱烘干',
    configList: [
      {
        list: [800],
        protocol: 'speed', // 协议字段 转速
        value: 800,
      },
      {
        list: ['标准', '超干', 30, 60, 90, 120, 150, 180],
        protocol: 'dry', // 协议字段 转速
        timeList: {
          1: 211,
          2: 231,
          3: 30,
          4: 60,
          5: 90,
          6: 120,
          7: 150,
          8: 180
        },
        value: '标准'
      }
    ],
    defaultTime: 0, // 该模式为烘干模式，故洗涤时间为0
    defaultSpeed: 800, // 默认转速
    auxiliaryFunction: {
      energySave: false,
      nightWash: false,
      highWater: false,
      soak: false,
      autoScour: false,
      autoMeek: false,
      order: true,
      mute: true,
      noDryNightWash: false, // 夜间洗和烘干互斥， 为true, 表示烘干下 夜间洗不可选
    },
    auxiliaryTimeList: {},
    IconName: 'ruo-hong-gan',
  },

  // 单脱水 13
  {
    index: 8,
    modeNum: 6,
    chineseName: '单脱水',
    configList: [{
      list: [0, 400, 600, 800, 1000, 1200, 1400],
      protocol: 'speed', // 协议字段 转速
      value: 1000,
    },
    {
      list: ['不烘干', '标准', '超干', 30, 60, 90, 120, 150, 180],
      protocol: 'dry', // 协议字段 转速
      timeList: {
        0: 0,
        1: 163,
        2: 183,
        3: 30,
        4: 60,
        5: 90,
        6: 120,
        7: 150,
        8: 180
      },
      value: '不烘干'
    }],
    drySpeed: { // 选择烘干时，脱水转速
      list: [1000, 1200, 1400, 1000, 1200, 1400],
      protocol: 'speed', // 转速
      value: 1200
    },
    defaultTime: 10,
    Speed0Time: 9, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 800, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: false,
      nightWash: true,
      highWater: false,
      soak: false,
      autoScour: false,
      autoMeek: false,
      order: true,
      mute: true,
      noDryNightWash: true, // 夜间洗和烘干互斥， 为true, 表示烘干下 夜间洗不可选
    },
    auxiliaryTimeList: {
      nightWash: 13,
    },
    IconName: 'dan-tuo-shui',
  },

  // 漂+脱 14
  {
    index: 9,
    modeNum: 7,
    chineseName: '漂+脱',
    configList: [{
      list: [1, 2, 3, 4, 5, 6, 7, 8],
      protocol: 'potch', // 协议字段 漂洗次数
      singleTime: 13, // 一次洗涤时间
      value: 1,
    },
    {
      list: [0, 400, 600, 800, 1000, 1200, 1400],
      protocol: 'speed', // 协议字段 转速
      value: 1000,
    },
    {
      list: ['不烘干', '标准', '超干', 30, 60, 90, 120, 150, 180],
      protocol: 'dry', // 协议字段 转速
      timeList: {
        0: 0,
        1: 163,
        2: 183,
        3: 30,
        4: 60,
        5: 90,
        6: 120,
        7: 150,
        8: 180
      },
      value: '不烘干'
    }
    ],
    drySpeed: { // 选择烘干时，脱水转速
      list: [1000, 1200, 1400, 1000, 1200, 1400],
      protocol: 'speed', // 转速
      value: 1200
    },
    defaultTime: 20,
    Speed0Time: 9, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 800, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: false,
      nightWash: true,
      highWater: true,
      soak: false,
      autoScour: false,
      autoMeek: 'U',
      order: true,
      mute: true,
      noDryNightWash: true, // 夜间洗和烘干互斥， 为true, 表示烘干下 夜间洗不可选
    },
    auxiliaryTimeList: {
      nightWash: 13,
    },
    IconName: 'piao-xi-tuo-shui',
  },

  // 筒清洁 15
  {
    index: 7,
    modeNum: 8,
    chineseName: '桶清洁',
    configList: [
      {
        list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
        protocol: 'setWashTime', // 协议字段  设定洗涤时间
        value: 25,
      }, {
        list: [60, 90], // 可选列表 （中文对应的具体value 参考utils 文件）
        timeList: {
          60: 30,
          90: 75
        },
        defalutWashTimeList: {
          60: 20,
          90: 25
        },
        protocol: 'washTemp', // 协议字段 洗涤温度
        value: 90,
      },
      {
        list: [2],
        protocol: 'potch', // 协议字段 漂洗次数
        singleTime: 12, // 一次洗涤时间
        value: 2,
      },
      {
        list: [1000],
        protocol: 'speed', // 协议字段 转速
        value: 1000,
      },
      {
        list: ['不烘干', 30],
        protocol: 'dry', // 协议字段 转速
        timeList: {
          0: 0,
          3: 30,
        },
        value: '不烘干'
      }
    ],
    drySpeed: { // 选择烘干时，脱水转速
      list: [1000],
      protocol: 'speed', // 转速
      value: 1000
    },
    defaultTime: 126,
    Speed0Time: 3, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 1000, // 夜间洗转速
    nightWashSpeed0Time: 0, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: false,
      nightWash: false,
      highWater: false,
      soak: false,
      autoScour: false,
      autoMeek: false,
      order: true,
      mute: true,
      noDryNightWash: false, // 夜间洗和烘干互斥， 为true, 表示烘干下 夜间洗不可选
    },
    auxiliaryTimeList: {},
    IconName: 'tong-qing-jie',
  },
];

// 洗涤模式字段 对应 washList 中的数组下标.（如 1 表示 洗涤模式字段为1的模式 匹配 washList数组中第2位） 
const modeIndexList28a03 = {};
washList28a03.forEach((element, index) => {
  modeIndexList28a03[element.modeNum] = index;
});


// 配置参数进入洗涤程序某些阶段后（含该阶段）不可再选
const disabledConfigObj28a03 = {
  setWashTime: 37, // 洗涤时间
  washTemp: 43, // 洗涤温度
  potch: 70, // 漂洗次数
  speed: { // 转速
    value: 88,
    diableList: [34, 67, 83, 97, 100]
  }
};

// 高级功能进入洗涤程序某些阶段后（含该阶段）不可再选
const disabledFunObj28a03 = {
  energySave: 37, // 节能
  autoScour: 37, // 洗涤剂
  soak: 42, // 浸泡
  highWater: 84, // 高水位
  autoMeek: 84, //  柔顺剂
  nightWash: { // 夜间洗
    value: 138, 
    diableList: [34, 67, 83, 97, 100], // 中间脱水的小阶段
  }, // 夜间洗
};

export {modeIndexList28a03, washList28a03, disabledConfigObj28a03, disabledFunObj28a03};
