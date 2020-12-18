/* eslint-disable */
/*
 * @Descripttion: 所有配置参数
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-07-10 10:12:14
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-07-10 19:25:49
 */

// 特渍附带逻辑 【'--', '血渍', '奶渍', '油渍', '汗渍', '果渍'】
const stainsLogic = {
  1: {
    washTemp: 60,
    setWashTime: 25,
  },
  2: {
    washTemp: 60,
    setWashTime: 5,
  },
  3: {
    washTemp: 60,
    setWashTime: 5,
  },
  4: {
    washTemp: 60,
    setWashTime: 30,
  },
  5: {
    washTemp: 40,
    setWashTime: 30,
  }
}

const upperWashList = [
  // 混合0
  {
    protocolNum: 2, // 协议字段
    defaultTime: 57, //默认时间
    configList: [ // 滑轮参数
      {
        list: [5, 10, 15, 20, 25, 30], // 可调洗涤时间
        protocol: 'setWashTime', // 协议字段
        value: 10, // 默认值
      },
      {
        list: [0, 20, 30, 40, 60], // 可调温度
        protocol: 'washTemp',
        value: 30,
        timeList: { // 对应需要的加热时间
          0: 0,
          20: 8,
          30: 15,
          40: 25,
          60: 35
        }
      },
      {
        list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
        protocol: 'potch',
        singleTime: 12, // 一次洗涤时间
        value: 1,
      },
      {
        list: [0, 400, 600, 800, 1000], // 可调转速
        protocol: 'speed',
        value: 800,
        timeList: {
          0: 0,
          400: 5,
          600: 5,
          800: 6,
          1000: 7
        }
      },
      {
        list: ['--', '血渍', '奶渍', '油渍', '汗渍', '果渍'], // 可调特渍
        protocol: 'stains',
        value: 0,
        stainsLogic // 特渍附带逻辑
      }
    ],
    auxiliaryFunction: { // 高级功能
      soak: false, // 浸泡
      clear: true, // 干净（极净洗）
      nightWash: true, // 安静洗（夜间洗）
      creaseRes: true, // 防皱
      highWater: true, // 高水位
      mute: true, // 静音
    },
    auxiliaryTime: { // 高级功能对应时间
      clear: 15,
      creaseRes: 8
    },
    nightWashSpeed: 800, // 夜间洗默认转速
    creaseResSpeed: 600, // 防皱默认转速
    IconName: 'hun-he',
  },

  // 内衣1
  {
    protocolNum: 14, // 协议字段
    defaultTime: 56, //默认时间
    configList: [ // 滑轮参数
      {
        list: [5, 10, 15, 20, 25, 30, 40], // 可调洗涤时间
        protocol: 'setWashTime', // 协议字段
        value: 15, // 默认值
      },
      {
        list: [0, 20, 30, 40, 60], // 可调温度
        protocol: 'washTemp',
        value: 30,
        timeList: { // 对应需要的加热时间
          0: 0,
          20: 5,
          30: 10,
          40: 20,
          60: 30
        }
      },
      {
        list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
        protocol: 'potch',
        singleTime: 11, // 一次洗涤时间
        value: 1,
      },
      {
        list: [0, 400, 600, 800], // 可调转速
        protocol: 'speed',
        value: 600,
        timeList: {
          0: 0,
          400: 6,
          600: 6,
          800: 7,
        }
      },
      {
        list: ['--', '血渍', '奶渍', '汗渍'], // 可调特渍
        protocol: 'stains',
        value: 0,
        stainsLogic
      }
    ],
    auxiliaryFunction: { // 高级功能
      soak: false, // 浸泡
      clear: true, // 干净（极净洗）
      nightWash: true, // 安静洗（夜间洗）
      creaseRes: false, // 防皱
      highWater: true, // 高水位
      mute: true, // 静音
    },
    auxiliaryTime: { // 高级功能对应时间
      clear: 20,
    },
    nightWashSpeed: 800, // 夜间洗默认转速
    IconName: 'kuai-xi',
  },

  // 轻柔2
  {
    protocolNum: 24, // 协议字段
    defaultTime: 48, //默认时间
    configList: [ // 滑轮参数
      {
        list: [5, 10, 15, 20, 25, 30, 40], // 可调洗涤时间
        protocol: 'setWashTime', // 协议字段
        value: 10, // 默认值
      },
      {
        list: [0, 20, 30, 40], // 可调温度
        protocol: 'washTemp',
        value: 20,
        timeList: { // 对应需要的加热时间
          0: 0,
          20: 8,
          30: 15,
          40: 20,
        }
      },
      {
        list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
        protocol: 'potch',
        singleTime: 11, // 一次洗涤时间
        value: 1,
      },
      {
        list: [0, 400, 600], // 可调转速
        protocol: 'speed',
        value: 600,
        timeList: {
          0: 0,
          400: 5,
          600: 5,
        }
      },
    ],
    auxiliaryFunction: { // 高级功能
      soak: false, // 浸泡
      clear: false, // 干净（极净洗）
      nightWash: false, // 安静洗（夜间洗）
      creaseRes: false, // 防皱
      highWater: false, // 高水位
      mute: true, // 静音
    },
    auxiliaryTime: {},
    IconName: 'qing-rou',
  },

  // 羊绒3
  {
    protocolNum: 50, // 协议字段
    defaultTime: 40, //默认时间
    configList: [ // 滑轮参数
      {
        list: [5, 10, 15, 20], // 可调洗涤时间
        protocol: 'setWashTime', // 协议字段
        value: 15, // 默认值
      },
      {
        list: [0, 20, 30], // 可调温度
        protocol: 'washTemp',
        value: 30,
        timeList: { // 对应需要的加热时间
          0: 0,
          20: 5,
          30: 10
        }
      },
      {
        list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
        protocol: 'potch',
        singleTime: 9, // 一次洗涤时间
        value: 1,
      },
      {
        list: [0, 400, 600], // 可调转速
        protocol: 'speed',
        value: 600,
        timeList: {
          0: 0,
          400: 4,
          600: 4,
        }
      }
    ],
    auxiliaryFunction: { // 高级功能
      soak: false, // 浸泡
      clear: false, // 干净（极净洗）
      nightWash: false, // 安静洗（夜间洗）
      creaseRes: false, // 防皱
      highWater: false, // 高水位
      mute: true, // 静音
    },
    auxiliaryTime: {},
    IconName: 'kuai-xi',
  },

  // 快洗4
  {
    protocolNum: 3, // 协议字段
    defaultTime: 15, //默认时间
    configList: [ // 滑轮参数
      {
        list: [3, 5, 10, 15, 20], // 可调洗涤时间
        protocol: 'setWashTime', // 协议字段
        value: 3, // 默认值
      },
      {
        list: [0, 20, 30], // 可调温度
        protocol: 'washTemp',
        value: 0,
        timeList: { // 对应需要的加热时间
          0: 0,
          20: 6,
          30: 8
        }
      },
      {
        list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
        protocol: 'potch',
        singleTime: 4, // 一次洗涤时间
        value: 1,
      },
      {
        list: [0, 400, 600, 800, 1000], // 可调转速
        protocol: 'speed',
        value: 600,
        timeList: {
          0: 0,
          400: 1,
          600: 1,
          800: 2,
          1000: 3
        }
      }
    ],
    auxiliaryFunction: { // 高级功能
      soak: false, // 浸泡
      clear: false, // 干净（极净洗）
      nightWash: true, // 安静洗（夜间洗）
      creaseRes: false, // 防皱
      highWater: false, // 高水位
      mute: true, // 静音
    },
    auxiliaryTime: {},
    nightWashSpeed: 800, // 夜间洗默认转速
    IconName: 'kuai-xi',
  },

  // 筒清洁5
  {
    protocolNum: 8, // 协议字段
    defaultTime: 78, //默认时间
    configList: [ // 滑轮参数
      {
        list: [0, 5, 10, 15, 20], // 可调洗涤时间
        protocol: 'setWashTime', // 协议字段
        value: 10, // 默认值
      },
      {
        list: [90], // 可调温度
        protocol: 'washTemp',
        value: 90,
        timeList: { // 对应需要的加热时间
          90: 45
        }
      },
      {
        list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
        protocol: 'potch',
        singleTime: 8, // 一次洗涤时间
        value: 1,
      },
      {
        list: [0, 600], // 可调转速
        protocol: 'speed',
        value: 600,
        timeList: {
          0: 0,
          600: 3,
        }
      },
    ],
    auxiliaryFunction: { // 高级功能
      soak: false, // 浸泡
      clear: false, // 干净（极净洗）
      nightWash: false, // 安静洗（夜间洗）
      creaseRes: false, // 防皱
      highWater: false, // 高水位
      mute: true, // 静音
    },
    auxiliaryTime: {},
    IconName: 'hun-he',
  },

  // 漂脱 6
  {
    protocolNum: 7, // 协议字段
    defaultTime: 24, //默认时间
    configList: [ // 滑轮参数
      {
        list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
        protocol: 'potch',
        singleTime: 11, // 一次洗涤时间
        value: 1,
      },
      {
        list: [0, 400, 600, 800, 1000], // 可调转速
        protocol: 'speed',
        value: 800,
        timeList: {
          0: 0,
          400: 5,
          600: 5,
          800: 6,
          1000: 7
        }
      }
    ],
    auxiliaryFunction: { // 高级功能
      soak: false, // 浸泡
      clear: true, // 干净（极净洗）
      nightWash: true, // 安静洗（夜间洗）
      creaseRes: true, // 防皱
      highWater: false, // 高水位
      mute: true, // 静音
    },
    auxiliaryTime: { // 高级功能对应时间
      creaseRes: 8
    },
    nightWashSpeed: 800, // 夜间洗默认转速
    creaseResSpeed: 600, // 防皱默认转速
    IconName: 'hun-he',
  },

  // 单脱水 7
  {
    protocolNum: 6, // 协议字段
    defaultTime: 7, //默认时间
    configList: [ // 滑轮参数
      {
        list: [0, 400, 600, 800, 1000], // 可调转速
        protocol: 'speed',
        value: 800,
        timeList: {
          0: 0,
          400: 5,
          600: 5,
          800: 6,
          1000: 7
        }
      }
    ],
    auxiliaryFunction: { // 高级功能
      soak: false, // 浸泡
      clear: false, // 干净（极净洗）
      nightWash: true, // 安静洗（夜间洗）
      creaseRes: true, // 防皱
      highWater: false, // 高水位
      mute: true, // 静音
    },
    auxiliaryTime: { // 高级功能对应时间
      creaseRes: 8
    },
    nightWashSpeed: 800, // 夜间洗默认转速
    creaseResSpeed: 600, // 防皱默认转速
    IconName: 'hun-he',
  },

  // 随心洗 8
  {
    protocolNum: 51, // 协议字段
    defaultTime: 40, //默认时间
    configList: [ // 滑轮参数
      {
        list: [5, 15, 25, 35, 45, 55, 65], // 可调洗涤时间
        protocol: 'setWashTime', // 协议字段
        value: 10, // 默认值
      },
      {
        list: [30], // 可调温度
        protocol: 'washTemp',
        value: 30,
        timeList: { // 对应需要的加热时间
          30: 8,
        }
      },
      {
        list: [0, 1, 2, 3, ], // 可调漂洗次数
        protocol: 'potch',
        singleTime: 10, // 一次洗涤时间
        value: 0,
      },
      {
        list: [800], // 可调转速
        protocol: 'speed',
        value: 800,
        timeList: {
          800: 4,
        }
      }
    ],
    auxiliaryFunction: { // 高级功能
      soak: false, // 浸泡
      clear: false, // 干净（极净洗）
      nightWash: false, // 安静洗（夜间洗）
      creaseRes: false, // 防皱
      highWater: false, // 高水位
      mute: true, // 静音
    },
    auxiliaryTime: {},
    IconName: 'hun-he',
  },
]


// 中筒数据
const middleWashList = [
  // 婴儿服0
  {
    protocolNum: 13, // 协议字段
    defaultTime: 65, //默认时间
    configList: [ // 滑轮参数
      {
        list: [5, 10, 15, 20, 25, 30], // 可调洗涤时间
        protocol: 'setWashTime', // 协议字段
        value: 10, // 默认值
      },
      {
        list: [0, 20, 30, 40, 60], // 可调温度
        protocol: 'washTemp',
        value: 40,
        timeList: { // 对应需要的加热时间
          0: 0,
          20: 10,
          30: 15,
          40: 25,
          60: 40
        }
      },
      {
        list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
        protocol: 'potch',
        singleTime: 11, // 一次洗涤时间
        value: 1,
      },
      {
        list: [0, 400, 600, 700], // 可调转速
        protocol: 'speed',
        value: 700,
        timeList: {
          0: 0,
          400: 3,
          600: 3,
          700: 4
        }
      },
      {
        list: ['--', '血渍', '奶渍', '油渍', '汗渍', '果渍'], // 可调特渍
        protocol: 'stains',
        value: 0,
        stainsLogic // 特渍附带逻辑
      }
    ],
    auxiliaryFunction: { // 高级功能
      soak: false, // 浸泡
      clear: true, // 干净（极净洗）
      nightWash: false, // 安静洗（夜间洗）
      creaseRes: false, // 防皱
      highWater: false, // 高水位
      mute: true, // 静音
    },
    auxiliaryTime: { // 高级功能对应时间
      clear: 20,
      creaseRes: 8
    },
    IconName: 'hun-he',
  },

  // 高温煮洗1
  {
    protocolNum: 53, // 协议字段
    defaultTime: 105, //默认时间
    configList: [ // 滑轮参数
      {
        list: [5, 10, 15, 20, 30], // 可调洗涤时间
        protocol: 'setWashTime', // 协议字段
        value: 20, // 默认值
      },
      {
        list: [90], // 可调温度
        protocol: 'washTemp',
        value: 90,
        timeList: { // 对应需要的加热时间
          90: 50
        }
      },
      {
        list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
        protocol: 'potch',
        singleTime: 11, // 一次洗涤时间
        value: 1,
      },
      {
        list: [0, 400, 600, 7000], // 可调转速
        protocol: 'speed',
        value: 800,
        timeList: {
          0: 0,
          400: 3,
          600: 3,
          700: 4
        }
      },
    ],
    auxiliaryFunction: { // 高级功能
      soak: false, // 浸泡
      clear: false, // 干净（极净洗）
      nightWash: false, // 安静洗（夜间洗）
      creaseRes: false, // 防皱
      highWater: false, // 高水位
      mute: true, // 静音
    },
    auxiliaryTime: {},
    IconName: 'hun-he',
  },

  // 混合2
  {
    protocolNum: 2, // 协议字段
    configList: [ // 滑轮参数
      {
        list: [5, 10, 15, 20, 25, 30, 40], // 可调洗涤时间
        protocol: 'setWashTime', // 协议字段
        value: 10, // 默认值
      },
      {
        list: ['不加热', 20, 30, 40, 60], // 可调温度
        protocol: 'washTemp',
        value: 30,
        timeList: { // 对应需要的加热时间
          0: 0,
          20: 8,
          30: 10,
          40: 20,
          60: 35
        }
      },
      {
        list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
        protocol: 'potch',
        singleTime: 11, // 一次洗涤时间
        value: 1,
      },
      {
        list: [0, 400, 600, 700], // 可调转速
        protocol: 'speed',
        value: 700,
        timeList: {
          0: 0,
          400: 3,
          600: 3,
          700: 4,
        }
      },
      {
        list: ['--', '血渍', '奶渍', '油渍', '汗渍', '果渍'], // 可调特渍
        protocol: 'stains',
        value: 0,
        stainsLogic // 特渍附带逻辑
      }
    ],
    defaultTime: 55, //默认时间
    auxiliaryFunction: { // 高级功能
      soak: false, // 浸泡
      clear: true, // 干净（极净洗）
      nightWash: false, // 安静洗（夜间洗）
      creaseRes: true, // 防皱
      highWater: true, // 高水位
      mute: true, // 静音
    },
    auxiliaryTime: { // 高级功能对应时间
      soak: 20,
      clear: 15,
      creaseRes: 8
    },
    creaseResSpeed: 600, // 防皱默认转速
    IconName: 'hun-he',
  },

  // 筒清洁3
  {
    protocolNum: 8, // 协议字段
    configList: [ // 滑轮参数
      {
        list: [5, 10, 15, 20, 25, 30], // 可调洗涤时间
        protocol: 'setWashTime', // 协议字段
        value: 5, // 默认值
      },
      {
        list: [90], // 可调温度
        protocol: 'washTemp',
        value: 90,
        timeList: { // 对应需要的加热时间
          90: 40
        }
      },
      {
        list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
        protocol: 'potch',
        singleTime: 7, // 一次洗涤时间
        value: 1,
      },
      {
        list: [0, 600, 700], // 可调转速
        protocol: 'speed',
        value: 600,
        timeList: {
          0: 0,
          600: 2,
          700: 3,
        }
      },
    ],
    defaultTime: 66, //默认时间
    auxiliaryFunction: { // 高级功能
      soak: false, // 浸泡
      clear: false, // 干净（极净洗）
      nightWash: false, // 安静洗（夜间洗）
      creaseRes: false, // 防皱
      highWater: false, // 高水位
      mute: true, // 静音
    },
    auxiliaryTime: {},
    IconName: 'hun-he',
  },

  // 漂脱4
  {
    protocolNum: 7, // 协议字段
    configList: [ // 滑轮参数
      {
        list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
        protocol: 'potch',
        singleTime: 7, // 一次洗涤时间
        value: 1,
      },
      {
        list: [0, 400, 600, 700], // 可调转速
        protocol: 'speed',
        value: 800,
        timeList: {
          0: 0,
          400: 3,
          600: 3,
          700: 4,
        }
      },
    ],
    defaultTime: 15, //默认时间
    auxiliaryFunction: { // 高级功能
      soak: false, // 浸泡
      clear: false, // 干净（极净洗）
      nightWash: false, // 安静洗（夜间洗）
      creaseRes: false, // 防皱
      highWater: false, // 高水位
      mute: true, // 静音
    },
    auxiliaryTime: {},
    IconName: 'hun-he',
  },

  // 单脱水5
  {
    protocolNum: 6, // 协议字段
    defaultTime: 4, //默认时间
    configList: [ // 滑轮参数
      {
        list: [0, 400, 600, 700], // 可调转速
        protocol: 'speed',
        value: 600,
        timeList: {
          0: 0,
          400: 3,
          600: 3,
          700: 4
        }
      },
    ],
    auxiliaryFunction: { // 高级功能
      soak: false, // 浸泡
      clear: false, // 干净（极净洗）
      nightWash: false, // 安静洗（夜间洗）
      creaseRes: false, // 防皱
      highWater: false, // 高水位
      mute: true, // 静音
    },
    auxiliaryTime: {},
    IconName: 'hun-he',
  },

  //随心洗
  {
    protocolNum: 51, // 协议字段
    defaultTime: 40, //默认时间
    configList: [ // 滑轮参数
      {
        list: [5, 15, 25, 35, 45, 55, 65], // 可调洗涤时间
        protocol: 'setWashTime', // 协议字段
        value: 15, // 默认值
      },
      {
        list: [30], // 可调温度
        protocol: 'washTemp',
        value: 30,
        timeList: { // 对应需要的加热时间
          30: 8,
        }
      },
      {
        list: [0, 1, 2, 3], // 可调漂洗次数
        protocol: 'potch',
        singleTime: 10, // 一次洗涤时间
        value: 1,
      },
      {
        list: [700], // 可调转速
        protocol: 'speed',
        value: 700,
        timeList: {
         700:4
        }
      }
    ],
    auxiliaryFunction: { // 高级功能
      soak: false, // 浸泡
      clear: false, // 干净（极净洗）
      nightWash: false, // 安静洗（夜间洗）
      creaseRes: false, // 防皱
      highWater: false, // 高水位
      mute: true, // 静音
    },
    auxiliaryTime: {},
    IconName: 'hun-he',
  },
]


const lowWashList = [
  [
    // 棉织物0 0
    {
      protocolNum: 1, // 协议字段
      defaultTime: 68, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 5, 10, 15, 20, 25, 30, 40, 50], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 10, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40, 60, 90], // 可调温度
          protocol: 'washTemp',
          value: 30,
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 10,
            30: 25,
            40: 35,
            60: 60,
            90: 110
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 12, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000, 1200, 1400], // 可调转速
          protocol: 'speed',
          value: 800,
          timeList: {
            0: 0,
            400: 4,
            600: 4,
            800: 5,
            1000: 6,
            1200: 7,
            1400: 8
          }
        },
        {
          list: ['--', '血渍', '奶渍', '油渍', '汗渍', '果渍'], // 可调特渍
          protocol: 'stains',
          value: 0,
          stainsLogic // 特渍附带逻辑
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: true, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: false, // 防皱
        highWater: true, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        clear: 25
      },
      nightWashSpeed: 800, // 夜间洗默认转速
      creaseResSpeed: 600, // 防皱默认转速
      IconName: 'hun-he',
    },

    // 混合0 1
    {
      protocolNum: 2, // 协议字段
      defaultTime: 73, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 5, 10, 15, 20, 25, 30, 40, 50], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 15, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40, 60], // 可调温度
          protocol: 'washTemp',
          value: 30,
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 10,
            30: 15,
            40: 25,
            60: 40,
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 12, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000, 1200], // 可调转速
          protocol: 'speed',
          value: 800,
          timeList: {
            0: 0,
            400: 5,
            600: 5,
            800: 6,
            1000: 7,
            1200: 8,
          }
        },
        {
          list: ['--', '血渍', '奶渍', '油渍', '汗渍', '果渍'], // 可调特渍
          protocol: 'stains',
          value: 0,
          stainsLogic // 特渍附带逻辑
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: true, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: true, // 防皱
        highWater: true, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        clear: 20,
        creaseRes: 8
      },
      nightWashSpeed: 800, // 夜间洗默认转速
      creaseResSpeed: 600, // 防皱默认转速
      IconName: 'hun-he',
    },

    // 化纤0 2
    {
      protocolNum: 15, // 协议字段
      defaultTime: 56, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 5, 10, 20, 25, 30, 40, 50], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 10, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40, 60], // 可调温度
          protocol: 'washTemp',
          value: 30,
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 10,
            30: 15,
            40: 25,
            60: 40,
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 11, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000, 1200], // 可调转速
          protocol: 'speed',
          value: 800,
          timeList: {
            0: 0,
            400: 5,
            600: 5,
            800: 6,
            1000: 7,
            1200: 8,
          }
        },
        {
          list: ['--', '血渍', '奶渍', '油渍', '汗渍', '果渍'], // 可调特渍
          protocol: 'stains',
          value: 0,
          stainsLogic // 特渍附带逻辑
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: true, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: true, // 防皱
        highWater: true, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        clear: 20,
        creaseRes: 8
      },
      nightWashSpeed: 800, // 夜间洗默认转速
      creaseResSpeed: 600, // 防皱默认转速
      IconName: 'hun-he',
    },

    // 牛仔0 2
    {
      protocolNum: 16, // 协议字段
      defaultTime: 56, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 5, 10, 20, 30, 40, 50], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 10, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40, 60], // 可调温度
          protocol: 'washTemp',
          value: 30,
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 10,
            30: 20,
            40: 30,
            60: 50,
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 12, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000, 1200], // 可调转速
          protocol: 'speed',
          value: 800,
          timeList: {
            0: 0,
            400: 4,
            600: 4,
            800: 5,
            1000: 6,
            1200: 7,
          }
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: true, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: false, // 防皱
        highWater: true, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        clear: 15,
      },
      nightWashSpeed: 800, // 夜间洗默认转速
      IconName: 'hun-he',
    },

    // 羊毛0 4
    {
      protocolNum: 10, // 协议字段
      defaultTime: 39, //默认时间
      configList: [ // 滑轮参数
        {
          list: [5, 10, 20, 30], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 20, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40], // 可调温度
          protocol: 'washTemp',
          value: 0,
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 10,
            30: 15,
            40: 25,
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 10, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800], // 可调转速
          protocol: 'speed',
          value: 800,
          timeList: {
            0: 0,
            400: 4,
            600: 4,
            800: 5,
          }
        },
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: false, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: false, // 防皱
        highWater: false, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: {},
      nightWashSpeed: 800, // 夜间洗默认转速
      IconName: 'hun-he',
    },

    // 快洗 0 5
    {
      protocolNum: 3, // 协议字段
      defaultTime: 15, //默认时间
      configList: [ // 滑轮参数
        {
          list: [3, 5, 10, 15, 20], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 3, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40], // 可调温度
          protocol: 'washTemp',
          value: 0,
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 5,
            30: 10,
            40: 20,
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 4, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000], // 可调转速
          protocol: 'speed',
          value: 800,
          timeList: {
            0: 0,
            400: 1,
            600: 1,
            800: 2,
            1000: 2,
          }
        },
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: false, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: false, // 防皱
        highWater: false, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: {},
      nightWashSpeed: 800, // 夜间洗默认转速
      IconName: 'hun-he',
    },

    // 运动服 0 6
    {
      protocolNum: 9, // 协议字段
      defaultTime: 46, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 5, 10, 20], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 10, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40], // 可调温度
          protocol: 'washTemp',
          value: 30,
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 10,
            30: 15,
            40: 25,
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 11, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000], // 可调转速
          protocol: 'speed',
          value: 800,
          timeList: {
            0: 0,
            400: 5,
            600: 5,
            800: 6,
            1000: 7,
          }
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: true, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: true, // 防皱
        highWater: true, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        clear: 15,
        creaseRes: 8
      },
      nightWashSpeed: 800, // 夜间洗默认转速
      creaseResSpeed: 600, // 防皱默认转速
      IconName: 'hun-he',
    },

    // 大物 0 7
    {
      protocolNum: 5, // 协议字段
      defaultTime: 56, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 5, 10, 20, 30, 40, 50], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 20, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40, 60], // 可调温度
          protocol: 'washTemp',
          value: 30,
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 10,
            30: 15,
            40: 35,
            60: 60,
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 12, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000, 1200], // 可调转速
          protocol: 'speed',
          value: 1000,
          timeList: {
            0: 0,
            400: 5,
            600: 5,
            800: 6,
            1000: 7,
            1200: 8,
          }
        },
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: true, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: true, // 防皱
        highWater: false, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        clear: 20,
        creaseRes: 8
      },
      nightWashSpeed: 800, // 夜间洗默认转速
      creaseResSpeed: 600, // 防皱默认转速
      IconName: 'hun-he',
    },

    // 衬衫 0 8
    {
      protocolNum: 4, // 协议字段
      defaultTime: 75, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 5, 10, 20, 30, 40, 50], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 10, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40], // 可调温度
          protocol: 'washTemp',
          value: 0,
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 5,
            30: 15,
            40: 25,
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 11, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000, 1200], // 可调转速
          protocol: 'speed',
          value: 800,
          timeList: {
            0: 0,
            400: 3,
            600: 3,
            800: 4,
            1000: 5,
            1200: 6,
          }
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: true, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: true, // 防皱
        highWater: true, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        clear: 15,
        creaseRes: 8
      },
      nightWashSpeed: 800, // 夜间洗默认转速
      creaseResSpeed: 600, // 防皱默认转速
      IconName: 'hun-he',
    },

    // 羽绒服 0 9
    {
      protocolNum: 11, // 协议字段
      defaultTime: 62, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 5, 10, 20, 25], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 10, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40], // 可调温度
          protocol: 'washTemp',
          value: 30,
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 10,
            30: 15,
            40: 25
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 10, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, ], // 可调转速
          protocol: 'speed',
          value: 800,
          timeList: {
            0: 0,
            400: 4,
            600: 4,
            800: 5,
          }
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: true, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: false, // 防皱
        highWater: false, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        clear: 15
      },
      nightWashSpeed: 800, // 夜间洗默认转速
      IconName: 'hun-he',
    },

    // 除螨 0 11
    {
      protocolNum: 29, // 协议字段
      defaultTime: 83, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 5, 10, 20, 30, 40, 50], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 10, // 默认值
        },
        {
          list: [60], // 可调温度
          protocol: 'washTemp',
          value: 60,
          timeList: { // 对应需要的加热时间
            60: 40,
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 10, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000, 1200], // 可调转速
          protocol: 'speed',
          value: 1000,
          timeList: {
            0: 0,
            400: 4,
            600: 4,
            800: 5,
            1000: 6,
            1200: 7,
          }
        },
        {
          list: ['--', '血渍', '奶渍', '油渍', '汗渍', '果渍'], // 可调特渍
          protocol: 'stains',
          value: 0,
          stainsLogic // 特渍附带逻辑
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: false, // 干净（极净洗）
        nightWash: false, // 安静洗（夜间洗）
        creaseRes: false, // 防皱
        highWater: false, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: {},
      IconName: 'hun-he',
    },

    // 筒清洁 0 11
    {
      protocolNum: 8, // 协议字段
      defaultTime: 88, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 5, 10, 15, 20], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 5, // 默认值
        },
        {
          list: [90], // 可调温度
          protocol: 'washTemp',
          value: 90,
          timeList: { // 对应需要的加热时间
            90: 60
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 8, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 600], // 可调转速
          protocol: 'speed',
          value: 600,
          timeList: {
            0: 0,
            600: 3,
          }
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: false, // 干净（极净洗）
        nightWash: false, // 安静洗（夜间洗）
        creaseRes: false, // 防皱
        highWater: false, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: {},
      IconName: 'hun-he',
    },
    // 漂洗脱水 0 12
    {
      protocolNum: 7, // 协议字段
      defaultTime: 25, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 7, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000, 1200, 1400], // 可调转速
          protocol: 'speed',
          value: 800,
          timeList: {
            0: 0,
            400: 5,
            600: 5,
            800: 6,
            1000: 7,
            1200: 8,
            1400: 9
          }
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: false, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: true, // 防皱
        highWater: false, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        creaseRes: 8
      },
      creaseResSpeed: 600, // 防皱默认转速
      IconName: 'hun-he',
    },

    // 单脱水 0 13
    {
      protocolNum: 6, // 协议字段
      defaultTime: 8, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 400, 600, 800, 1000, 1200, 1400], // 可调转速
          protocol: 'speed',
          value: 800,
          timeList: {
            0: 0,
            400: 5,
            600: 5,
            800: 6,
            1000: 7,
            1200: 8,
            1400: 9
          }
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: false, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: true, // 防皱
        highWater: false, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        creaseRes: 8
      },
      creaseResSpeed: 600, // 防皱默认转速
      IconName: 'hun-he',
    },
    // 随心洗 0 14
    {
      protocolNum: 51, // 协议字段
      defaultTime: 50, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 10, 20, 30, 40, 50], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 10, // 默认值
        },
        {
          list: [30], // 可调温度
          protocol: 'washTemp',
          value: 30,
          timeList: { // 对应需要的加热时间
            30: 25,
          }
        },
        {
          list: [0, 1, 2, 3], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 10, // 一次洗涤时间
          value: 0,
        },
        {
          list: [800], // 可调转速
          protocol: 'speed',
          value: 800,
          timeList: {
            800: 4,
          }
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: false, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: true, // 防皱
        highWater: false, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        creaseRes: 8
      },
      creaseResSpeed: 600, // 防皱默认转速
      IconName: 'hun-he',
    },
  ],

  // 洗烘
  [
    // 棉麻 1 0
    {
      protocolNum: 1, // 协议字段
      defaultTime: 250, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 5, 10, 20, 25, 30, 40, 50], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 10, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40, 60, 90], // 可调温度
          protocol: 'washTemp',
          value: 30,
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 10,
            30: 25,
            40: 35,
            60: 60,
            90: 110,
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 12, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000, 1200, 1400], // 可调转速
          protocol: 'speed',
          value: 1400,
          timeList: {
            0: 0,
            400: 4,
            600: 4,
            800: 5,
            1000: 6,
            1200: 7,
            1400: 8,
          }
        },
        {
          list: ['--', '血渍', '奶渍', '油渍', '汗渍', '果渍'], // 可调特渍
          protocol: 'stains',
          value: 0,
          stainsLogic // 特渍附带逻辑
        },
        {
          list: ['强烘干'],
          protocol: 'dry',
          value: '强烘干',
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: true, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: false, // 防皱
        highWater: true, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        clear: 25,
      },
      nightWashSpeed: 1000, // 夜间洗默认转速
      IconName: 'hun-he',
    },
    // 混合 1 1
    {
      protocolNum: 2, // 协议字段
      defaultTime: 255, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 5, 10, 15, 20, 25, 30, 40, 50], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 15, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40, 60], // 可调温度
          protocol: 'washTemp',
          value: 30,
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 10,
            30: 15,
            40: 25,
            60: 40,
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 12, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000, 1200], // 可调转速
          protocol: 'speed',
          value: 1200,
          timeList: {
            0: 0,
            400: 5,
            600: 5,
            800: 6,
            1000: 7,
            1200: 8,
          }
        },
        {
          list: ['--', '血渍', '奶渍', '油渍', '汗渍', '果渍'], // 可调特渍
          protocol: 'stains',
          value: 0,
          stainsLogic // 特渍附带逻辑
        },
        {
          list: ['弱烘干'],
          protocol: 'dry',
          value: '弱烘干',
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: true, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: true, // 防皱
        highWater: true, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        clear: 20,
        creaseRes: 8
      },
      nightWashSpeed: 1000, // 夜间洗默认转速
      creaseResSpeed: 600, // 防皱默认转速
      IconName: 'hun-he',
    },

    // 化纤 1 2
    {
      protocolNum: 15, // 协议字段
      defaultTime: 238, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 5, 10, 20, 25, 30, 40, 50], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 10, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40, 60], // 可调温度
          protocol: 'washTemp',
          value: 30,
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 10,
            30: 15,
            40: 25,
            60: 40,
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 11, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000, 1200], // 可调转速
          protocol: 'speed',
          value: 1200,
          timeList: {
            0: 0,
            400: 5,
            600: 5,
            800: 6,
            1000: 7,
            1200: 8,
          }
        },
        {
          list: ['--', '血渍', '奶渍', '油渍', '汗渍', '果渍'], // 可调特渍
          protocol: 'stains',
          value: 0,
          stainsLogic // 特渍附带逻辑
        },
        {
          list: ['强烘干'],
          protocol: 'dry',
          value: '强烘干',
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: true, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: true, // 防皱
        highWater: true, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        clear: 20,
        creaseRes: 8
      },
      nightWashSpeed: 1000, // 夜间洗默认转速
      creaseResSpeed: 600, // 防皱默认转速
      IconName: 'hun-he',
    },

    // 牛仔 1 1
    {
      protocolNum: 16, // 协议字段
      defaultTime: 254, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 5, 10, 20, 30, 40, 50], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 20, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40, 60], // 可调温度
          protocol: 'washTemp',
          value: 30,
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 10,
            30: 20,
            40: 30,
            60: 50,
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 12, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000, 1200], // 可调转速
          protocol: 'speed',
          value: 1200,
          timeList: {
            0: 0,
            400: 4,
            600: 4,
            800: 5,
            1000: 6,
            1200: 7,
          }
        },
        {
          list: ['强烘干'],
          protocol: 'dry',
          value: '强烘干',
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: true, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: false, // 防皱
        highWater: true, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        clear: 20,
      },
      nightWashSpeed: 1000, // 夜间洗默认转速
      IconName: 'hun-he',
    },

    // 快速 1 4
    {
      protocolNum: 17, // 协议字段
      defaultTime: 60, //默认时间
      configList: [ // 滑轮参数
        {
          list: [3, 5, 10, 15, 20], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 3, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40], // 可调温度
          protocol: 'washTemp',
          value: 30,
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 5,
            30: 10,
            40: 20,
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 4, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000], // 可调转速
          protocol: 'speed',
          value: 1000,
          timeList: {
            0: 0,
            400: 1,
            600: 1,
            800: 2,
            1000: 3,
          }
        },
        {
          list: ['强烘干'],
          protocol: 'dry',
          value: '强烘干',
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: false, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: false, // 防皱
        highWater: false, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: {},
      nightWashSpeed: 1000, // 夜间洗默认转速
      IconName: 'hun-he',
    },

    // 运动服 1 1
    {
      protocolNum: 9, // 协议字段
      defaultTime: 227, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 5, 10, 20], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 5, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40], // 可调温度
          protocol: 'washTemp',
          value: '不加热',
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 5,
            30: 15,
            40: 25,
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 11, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000], // 可调转速
          protocol: 'speed',
          value: 1000,
          timeList: {
            0: 0,
            400: 5,
            600: 5,
            800: 6,
            1000: 7,
          }
        },
        {
          list: ['强烘干'],
          protocol: 'dry',
          value: '强烘干',
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: true, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: true, // 防皱
        highWater: true, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        clear: 15,
        creaseRes: 8
      },
      nightWashSpeed: 1000, // 夜间洗默认转速
      creaseResSpeed: 600, // 防皱默认转速
      IconName: 'hun-he',
    },

    // 衬衫 1 7
    {
      protocolNum: 4, // 协议字段
      defaultTime: 257, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 5, 10, 20, 30, 40, 50], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 20, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40], // 可调温度
          protocol: 'washTemp',
          value: 30,
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 5,
            30: 15,
            40: 25,
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 12, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000, 1200], // 可调转速
          protocol: 'speed',
          value: 1200,
          timeList: {
            0: 0,
            400: 3,
            600: 3,
            800: 4,
            1000: 5,
            1200: 6,
          }
        },
        {
          list: ['弱烘干'],
          protocol: 'dry',
          value: '弱烘干',
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: true, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: true, // 防皱
        highWater: true, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        clear: 20,
        creaseRes: 8
      },
      nightWashSpeed: 1000, // 夜间洗默认转速
      creaseResSpeed: 600, // 防皱默认转速
      IconName: 'hun-he',
    },

    // 羽绒服 1 8
    {
      protocolNum: 11, // 协议字段
      defaultTime: 242, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 5, 10, 20, 25, ], // 可调洗涤时间
          protocol: 'setWashTime', // 协议字段
          value: 20, // 默认值
        },
        {
          list: ['不加热', 20, 30, 40], // 可调温度
          protocol: 'washTemp',
          value: '不加热',
          timeList: { // 对应需要的加热时间
            0: 0,
            20: 10,
            30: 15,
            40: 25,
          }
        },
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 10, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800], // 可调转速
          protocol: 'speed',
          value: 800,
          timeList: {
            0: 0,
            400: 4,
            600: 4,
            800: 5,
          }
        },
        {
          list: ['羽绒烘'],
          protocol: 'dry',
          value: '羽绒烘',
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: true, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: false, // 防皱
        highWater: false, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        clear: 15,
      },
      nightWashSpeed: 1000, // 夜间洗默认转速
      IconName: 'hun-he',
    },

    // 漂洗烘干 1 9
    {
      protocolNum: 10, // 协议字段
      defaultTime: 207, //默认时间
      configList: [ // 滑轮参数
        {
          list: [0, 1, 2, 3, 4, 5, 6], // 可调漂洗次数
          protocol: 'potch',
          singleTime: 7, // 一次洗涤时间
          value: 1,
        },
        {
          list: [0, 400, 600, 800, 1000, 1200, 1400], // 可调转速
          protocol: 'speed',
          value: 1400,
          timeList: {
            0: 0,
            400: 5,
            600: 5,
            800: 6,
            1000: 7,
            1200: 8,
            1400: 9
          }
        },
        {
          list: ['强烘干'],
          protocol: 'dry',
          value: '强烘干',
        }
      ],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: false, // 干净（极净洗）
        nightWash: true, // 安静洗（夜间洗）
        creaseRes: true, // 防皱
        highWater: false, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: { // 高级功能对应时间
        creaseRes: 8
      },
      nightWashSpeed: 1000, // 夜间洗默认转速
      creaseResSpeed: 600, // 防皱默认转速
      IconName: 'hun-he',
    },
  ],
  
  [
    // 水幕清新 2 0
    {
      protocolNum: 32, // 协议字段
      defaultTime: 30, //默认时间
      configList: [],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: false, // 干净（极净洗）
        nightWash: false, // 安静洗（夜间洗）
        creaseRes: false, // 防皱
        highWater: false, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: {},
      IconName: 'hun-he',
    },
  ],

  [
    // 强烘干 3  0
    {
      protocolNum: 23, // 协议字段
      defaultTime: 180, //默认时间
      configList: [],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: false, // 干净（极净洗）
        nightWash: false, // 安静洗（夜间洗）
        creaseRes: false, // 防皱
        highWater: false, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: {},
      IconName: 'hun-he',
    },
    // 弱烘干 3  1
    {
      protocolNum: 22, // 协议字段
      defaultTime: 180, //默认时间
      configList: [],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: false, // 干净（极净洗）
        nightWash: false, // 安静洗（夜间洗）
        creaseRes: false, // 防皱
        highWater: false, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: {},
      IconName: 'hun-he',
    },
    // 定时烘 3  2
    {
      protocolNum: 52, // 协议字段
      defaultTime: 180, //默认时间
      configList: [{
        list: [30, 60, 90, 120, 150, 180, 210], // 可调洗涤时间
        protocol: 'setWashTime', // 协议字段
        value: 180, // 默认值
      }],
      auxiliaryFunction: { // 高级功能
        soak: false, // 浸泡
        clear: false, // 干净（极净洗）
        nightWash: false, // 安静洗（夜间洗）
        creaseRes: false, // 防皱
        highWater: false, // 高水位
        mute: true, // 静音
      },
      auxiliaryTime: {},
      IconName: 'hun-he',
    }
  ]
]

// 洗涤模式字段 对应 washList 中的数组下标.（如 1 表示 洗涤模式字段为1的模式 匹配 washList数组中第2位） 
const upperModeIndexList = {};
upperWashList.forEach((element, index) => {
  upperModeIndexList[element.protocolNum] = index;
});

const middleModeIndexList = {};
middleWashList.forEach((element, index) => {
  middleModeIndexList[element.protocolNum] = index;
});

const lowModeIndexList = {};
lowWashList.forEach((item, row) => {
  const list = {}
  item.forEach((element, index) =>{
    list[element.protocolNum] = index;
  })
  lowModeIndexList[row] = list;
})

// 配置参数、辅助功能进入洗涤程序某些阶段后（含该阶段）不可再选
const disabledConfigObj = {
  setWashTime: 13, // 洗涤时间
  washTemp: 43, // 洗涤温度
  potch: 70, // 漂洗次数
  speed: { // 转速
    value: 88,
    diableList: [34, 67, 83, 97, 100]
  },
  stains: 13, // 特渍
  dry: { // 烘干
    value: 88,
    diableList: [34, 67, 83, 97, 100]
  },

  clear: 13, // 干净（极净洗）
  soak: 13, // 浸泡
  nightWash: 13, // 安静洗（夜间洗）
  creaseRes: 13, // 防皱
  highWater: 13, // 高水位

  autoScour: 37, // 洗涤剂
  autoMeek: 84, //  柔顺剂
};

export {
  upperWashList,
  middleWashList,
  lowWashList,
  upperModeIndexList,
  middleModeIndexList,
  lowModeIndexList,
  disabledConfigObj,
};