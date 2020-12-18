/** 洗烘
 * @constant {object} washingClassificationConfig28a04 
 * @description 洗涤分类配置表
 */
/**
 * @constant {object} washModeConfig
 * @description 洗涤模式配置表
 */

// 所有模式的基础参数配置
const washList28a04 = [
  // 一键智洗
  {
    index: 0,
    modeNum: 33,
    chineseName: '一键智洗',
    configList: [{
      list: [15],
      protocol: 'setWashTime', // 协议字段  设定洗涤时间
      value: 15,
    }, {
      list: [40], // 可选列表 （中文对应的具体value 参考utils 文件）
      timeList: { // 对应需要的加热时间
        40: 15
      }, 
      defalutWashTimeList: { // 切换温度时对应的洗涤时间默认值
        40: 15
      }, 
      protocol: 'washTemp', // 协议字段 洗涤温度
      value: 40,
    },
    {
      list: [2],
      protocol: 'potch', // 协议字段 漂洗次数
      singleTime: 13, // 一次洗涤时间
      value: 2,
    },
    {
      list: [1000],
      protocol: 'speed', // 协议字段 转速
      value: 1000,
    }
    ],
    time: 63,
    defaultTime: 68,
    Speed0Time: 9, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 1000, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: false,
      nightWash: false,
      highWater: false,
      autoScour: 'U',
      autoMeek: 'U',
      order: false,
      mute: true,
      autoOpenDoor: true
    },
    auxiliaryTimeList: {
      energySave: 10,
      nightWash: 14,
      soak: 30,
    },
    auxiliaryNocancel: { //  特殊模式下不能取消
      autoScour: true,
      autoMeek: true
    },
    IconName: 'yi-jian-zhi-xi',
  },
  // 混合
  {
    index: 1, // 洗涤模式序号
    modeNum: 2, // 对应洗涤模式字段
    chineseName: '混合', // 用不到，只是为了好看好找
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
        list: ['轻微', '标准', '较脏', '轻微', '标准', '较脏'],
        protocol: 'smudge', // 转速
        value: '标准',
      }
    ],
    time: 67, // 时间
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
      autoOpenDoor: true
    },
    auxiliaryTimeList: { // 选择的时候加减的时间
      energySave: 10,
      nightWash: 14,
      soak: 30,
    },
    IconName: 'hun-he',
  },
  // 快洗
  {
    index: 2,
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
        list: ['轻微', '标准', '较脏', '轻微', '标准', '较脏'],
        protocol: 'smudge', // 转速
        value: '轻微',
      }
    ],
    time: 15,
    defaultTime: 15,
    Speed0Time: 2, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 800, // 夜间洗转速
    nightWashSpeed0Time: 3, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: false,
      nightWash: true,
      highWater: false,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      autoOpenDoor: true
    },
    auxiliaryTimeList: {}, // 辅助功能选择时增加对应的时间 false 代表不可选
    IconName: 'kuai-xi',
  },
  // 棉麻
  {
    index: 3,
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
        list: ['轻微', '标准', '较脏', '轻微', '标准', '较脏'],
        protocol: 'smudge', // 转速
        value: '标准',
      }
    ],
    time: 68,
    defaultTime: 68,
    Speed0Time: 9, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 800, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: true,
      nightWash: true,
      highWater: true,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      autoOpenDoor: true
    },
    auxiliaryTimeList: {
      energySave: 10,
      nightWash: 13,
    },
    IconName: 'mian-ma',
  },
  // 大物
  {
    index: 5,
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
    },
    {
      list: ['轻微', '标准', '较脏', '轻微', '标准', '较脏'],
      protocol: 'smudge', // 转速
      value: '标准',
    }
    ],
    time: 81,
    defaultTime: 81,
    Speed0Time: 9, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 600, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: true,
      nightWash: true,
      highWater: true,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      autoOpenDoor: true
    },
    auxiliaryTimeList: {
      energySave: 10,
      nightWash: 13,
    },
    IconName: 'da-wu',
  },
  // 衬衫
  {
    index: 6,
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
        list: ['轻微', '标准', '较脏', '轻微', '标准', '较脏'],
        protocol: 'smudge', // 转速
        value: '标准',
      }
    ],
    time: 67,
    defaultTime: 67,
    Speed0Time: 8, // 转速为0时需要减去的时间
    defaultSpeed: 800, // 默认转速
    nightWashSpeed: 600, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: true,
      nightWash: true,
      highWater: true,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      autoOpenDoor: true
    },
    auxiliaryTimeList: {
      energySave: 10,
      nightWash: 14,
    },
    IconName: 'chen-shan',
  },
  // 童装
  {
    index: 7,
    modeNum: 31,
    chineseName: '童装',
    configList: [{
      list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
      protocol: 'setWashTime', // 协议字段  设定洗涤时间
      value: 15,
    }, {
      list: ['不加热', 20, 30, 40, 60, 90], // 可选列表 （中文对应的具体value 参考utils 文件）
      timeList: {
        0: 0,
        20: 5,
        30: 10,
        40: 15,
        60: 30,
        90: 75
      },
      defalutWashTimeList: {
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
      value: 3,
    },
    {
      list: [0, 400, 600, 800, 1000, 1200, 1400],
      protocol: 'speed', // 协议字段 转速
      value: 1000,
    },
    {
      list: ['轻微', '标准', '较脏', '轻微', '标准', '较脏'],
      protocol: 'smudge', // 转速
      value: '标准',
    }],
    time: 81,
    defaultTime: 81,
    Speed0Time: 9, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 800, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: true,
      nightWash: true,
      highWater: true,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      autoOpenDoor: true
    },
    auxiliaryTimeList: {
      energySave: 10,
      nightWash: 13,
    },
    IconName: 'tong-zhuang',
  },
  // 牛仔
  {
    index: 8,
    modeNum: 16,
    chineseName: '牛仔洗',
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
      list: [1, 2, 3, 4, 5, 6, 7, 8],
      protocol: 'potch', // 协议字段 漂洗次数
      singleTime: 12, // 一次洗涤时间
      value: 2,
    },
    {
      list: [0, 400, 600, 800, 1000, 1200],
      protocol: 'speed', // 协议字段 转速
      value: 800,
    },
    {
      list: ['轻微', '标准', '较脏', '轻微', '标准', '较脏'],
      protocol: 'smudge', // 转速
      value: '标准',
    }
    ],
    time: 72,
    defaultTime: 72,
    Speed0Time: 10, // 转速为0时需要减去的时间
    defaultSpeed: 800, // 默认转速
    nightWashSpeed: 600, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: true,
      nightWash: true,
      highWater: true,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      autoOpenDoor: true
    },
    auxiliaryTimeList: {
      energySave: 10,
      nightWash: 12,
    },
    IconName: 'niu-zai',
  },
  // 羊毛
  {
    index: 9,
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
      },
      {
        list: ['轻微', '标准', '较脏', '轻微', '标准', '较脏'],
        protocol: 'smudge', // 转速
        value: '轻微',
      }
    ],
    time: 60,
    defaultTime: 60,
    defaultSpeed: 800, // 默认转速
    nightWashSpeed: 600, // 夜间洗转速
    Speed0Time: 4, // 转速为0时需要减去的时间
    nightWashSpeed0Time: 5, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: false,
      nightWash: true,
      highWater: false,
      autoScour: true,
      autoMeek: true,
      order: true,
      mute: true,
      autoOpenDoor: true
    },
    auxiliaryTimeList: {},
    IconName: 'yang-mao',
  },
  // 羽绒
  {
    index: 10,
    modeNum: 11,
    chineseName: '羽绒',
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
      },
      {
        list: ['轻微', '标准', '较脏', '轻微', '标准', '较脏'],
        protocol: 'smudge', // 转速
        value: '标准',
      }
    ],
    time: 61,
    defaultTime: 61,
    Speed0Time: 6, // 转速为0时需要减去的时间
    defaultSpeed: 800, // 默认转速
    nightWashSpeed: 600, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: true,
      nightWash: true,
      highWater: true,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      autoOpenDoor: true
    },
    auxiliaryTimeList: {
      energySave: 10,
      nightWash: 16,
    },
    IconName: 'yu-rong-fu',
  },
  // 轻柔
  {
    index: 11,
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
    },
    {
      list: ['轻微', '标准', '较脏', '轻微', '标准', '较脏'],
      protocol: 'smudge', // 转速
      value: '轻微',
    }
    ],
    time: 61,
    defaultTime: 61,
    Speed0Time: 5, // 转速为0时需要减去的时间
    defaultSpeed: 600, // 默认转速
    nightWashSpeed: 600, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: true,
      nightWash: true,
      highWater: true,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      autoOpenDoor: true
    },
    auxiliaryTimeList: {
      energySave: 10,
      nightWash: 17,
    },
    IconName: 'qing-rou',
  },
  // 除螨
  {
    index: 12,
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
      list: ['轻微', '标准', '较脏', '轻微', '标准', '较脏'],
      protocol: 'smudge', // 转速
      value: '标准',
    }
    ],
    time: 117,
    defaultTime: 117,
    Speed0Time: 9, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 800, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: false,
      nightWash: true,
      highWater: false,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      autoOpenDoor: true
    },
    auxiliaryTimeList: {
      nightWash: 13,
    },
    IconName: 'chu-man',
  },
  // 极净洗
  {
    index: 13,
    modeNum: 30,
    chineseName: '极净洗',
    configList: [
      {
        list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
        protocol: 'setWashTime', // 协议字段  设定洗涤时间
        value: 15,
      }, {
        list: ['不加热', 20, 30, 40, 60, 90], // 可选列表 （中文对应的具体value 参考utils 文件）
        timeList: {
          0: 0, 
          20: 5, 
          30: 10, 
          40: 15, 
          60: 30, 
          90: 75
        },
        defalutWashTimeList: {// 切换温度时对应的洗涤时间默认值
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
        list: ['轻微', '标准', '较脏', '轻微', '标准', '较脏'],
        protocol: 'smudge', // 转速
        value: '较脏',
      }
    ],
    time: 88,
    defaultTime: 88,
    Speed0Time: 10, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 800, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: false,
      nightWash: true,
      highWater: false,
      autoScour: 'U',
      autoMeek: 'U',
      order: true,
      mute: true,
      autoOpenDoor: true
    },
    auxiliaryTimeList: {
      nightWash: 13,
    },
    IconName: 'ji-jing-xi',
  },
  // 漂洗+脱水
  {
    index: 14,
    modeNum: 7,
    chineseName: '漂洗脱水',
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
    }
    ],
    time: 20,
    defaultTime: 20,
    Speed0Time: 9, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 800, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: false,
      nightWash: true,
      highWater: true,
      autoScour: false,
      autoMeek: 'U',
      order: true,
      mute: true,
      autoOpenDoor: true
    },
    auxiliaryTimeList: {
      nightWash: 13,
    },
    IconName: 'piao-xi-tuo-shui',
  },
  // 单脱水
  {
    index: 15,
    modeNum: 6,
    chineseName: '单脱水',
    configList: [{
      list: [0, 400, 600, 800, 1000, 1200, 1400],
      protocol: 'speed', // 协议字段 转速
      value: 1000,
    }],
    time: 10,
    defaultTime: 10,
    Speed0Time: 9, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 800, // 夜间洗转速
    nightWashSpeed0Time: 23, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: false,
      nightWash: true,
      highWater: false,
      autoScour: false,
      autoMeek: false,
      order: true,
      mute: true,
      autoOpenDoor: true
    },
    auxiliaryTimeList: {
      nightWash: 13,
    },
    IconName: 'dan-tuo-shui',
  },
  // 筒清洁
  {
    index: 15,
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
      }
    ],
    time: 126,
    defaultTime: 126,
    Speed0Time: 3, // 转速为0时需要减去的时间
    defaultSpeed: 1000, // 默认转速
    nightWashSpeed: 1000, // 夜间洗转速
    nightWashSpeed0Time: 0, // 选择夜间洗切转速0时需要加的时间
    auxiliaryFunction: {
      energySave: false,
      nightWash: false,
      highWater: false,
      autoScour: false,
      autoMeek: false,
      order: true,
      mute: true,
      autoOpenDoor: true
    },
    auxiliaryTimeList: {},
    IconName: 'tong-qing-jie',
  },
];


// 洗涤模式字段 对应 washList 中的数组下标.（如 1 表示 洗涤模式字段为1的模式 匹配 washList数组中第2位） 
const modeIndexList28a04 = {};
washList28a04.forEach((element, index) => {
  modeIndexList28a04[element.modeNum] = index;
});

// 配置参数进入洗涤程序某些阶段后（含该阶段）不可再选
const disabledConfigObj28a04 = {
  setWashTime: 37, // 洗涤时间
  washTemp: 43, // 洗涤温度
  potch: 70, // 漂洗次数
  speed: { // 转速
    value: 88,
    diableList: [34, 67, 83, 97, 100]
  },
  smudge: 37 // 脏污度
};

// 高级功能进入洗涤程序某些阶段后（含该阶段）不可再选
const disabledFunObj28a04 = {
  energySave: 37, // 节能
  autoScour: 37, // 洗涤剂
  highWater: 84, // 高水位
  autoMeek: 84, //  柔顺剂
  nightWash: { // 夜间洗
    value: 88, 
    diableList: [34, 67, 83, 97, 100], // 中间脱水的小阶段
  }, // 夜间洗
};


export { modeIndexList28a04, washList28a04, disabledConfigObj28a04, disabledFunObj28a04 };
