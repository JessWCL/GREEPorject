/**
 * @constant {object} washingClassificationConfig 
 * @description 洗涤分类配置表
 */

/**
 * @constant {object} washModeConfig
 * @description 洗涤模式配置表
 */

// 四大板块的所有模式的所有配置
const washList28a01 = [
  {
    label: '洗涤',
    modeNum: 0, // 对应字段的数字  
    selectNum: 1,
    name: 0,
    washMode: [
      // 洗涤混合 0
      {
        index: 0,
        modeNum: 2, // 对应洗涤模式字段
        chineseName: '混合',
        configList: [{
          list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 5
        },
        {
          list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 20, 
            20: 20, 
            30: 20, 
            40: 20
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 40
        },
        {
          list: [1, 2, 3, 4, 5, 6, 7, 8],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 13, // 一次洗涤时间
          value: 2
        },
        {
          list: ['不脱水', 400, 600, 800, 1000, 1200],
          protocol: 'speed', // 协议字段 转速
          value: 1000
        }
        ],
        time: 66,
        defaultTime: 66,
        speed0Time: 8, // 转速为0需要减去时间
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: true,
          noDrain: true,
          creaseRes: true,
          soak: true,
          energySave: true,
          highWater: true,
        },
        auxiliaryTimeList: {
          creaseRes: 7,
          energySave: 10
        },
        IconName: 'hunHe',
      },
      // 洗涤棉麻 1
      {
        index: 1, // 洗涤模式序号
        modeNum: 1, // 对应洗涤模式字段
        selected: true, // 是否选中
        chineseName: '棉麻', // 用不到，只是为了好看好找
        configList: [{
          list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
          protocol: 'setWashTime', // 设定洗涤时间
          value: 5,
        },
        {
          list: ['不加热', 20, 30, 40, 60], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 20,
            20: 20,
            30: 20,
            40: 20,
            60: 40
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 40, // 选中的值
        },
        {
          list: [1, 2, 3, 4, 5, 6, 7, 8],
          protocol: 'potch', // 漂洗次数
          singleTime: 13,
          value: 2,
        },
        {
          list: ['不脱水', 400, 600, 800, 1000, 1200, 1400],
          protocol: 'speed', // 转速
          value: 1000,
        }
        ],
        time: 68, // 时间
        defaultTime: 68, // 时间
        speed0Time: 9, // 转速为0需要减去时间
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: true,
          noDrain: true,
          creaseRes: true,
          soak: true,
          energySave: true,
          highWater: true,
        }, 
        auxiliaryTimeList: {
          creaseRes: 6,
          energySave: 10
        },
        IconName: 'mianMa',
      },
      // 洗涤衬衫 2
      {
        index: 2,
        modeNum: 4,
        chineseName: '衬衫',
        configList: [{
          list: [5, 10, 15, 20, 25, 30],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 5
        }, {
          list: ['不加热', 20, 30, 40, 60], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 20,
            20: 20,
            30: 20,
            40: 20,
            60: 40
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 40
        },
        {
          list: [1, 2, 3, 4, 5, 6, 7, 8],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 13,
          value: 2
        },
        {
          list: ['不脱水', 400, 600, 800],
          protocol: 'speed', // 协议字段 转速
          value: 800
        }
        ],
        time: 66,
        defaultTime: 66,
        speed0Time: 9,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: true,
          noDrain: true,
          creaseRes: true,
          soak: true,
          energySave: true,
          highWater: true,
        },
        auxiliaryTimeList: {
          creaseRes: 6,
          energySave: 10
        },
        IconName: 'chenShan',
      },
      // 洗涤快洗 3
      {
        index: 3,
        modeNum: 3,
        chineseName: '快洗',
        configList: [{
          list: [1, 5, 10, 15],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 1
        }, {
          list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 4,
            20: 5,
            30: 10,
            40: 20
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: '不加热'
        },
        {
          list: [1, 2, 3, 4],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 8,
          value: 1
        },
        {
          list: ['不脱水', 400, 600, 800, 1000, 1200],
          protocol: 'speed', // 协议字段 转速
          value: 1000
        }
        ],
        time: 15,
        defaultTime: 15,
        speed0Time: 2,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: true,
          noDrain: true,
          creaseRes: true,
          soak: true,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {
          creaseRes: 13,
        },
        IconName: 'kuaiXi',
      },
      // 洗涤速洗 4
      {
        index: 4,
        modeNum: 27,
        chineseName: '速洗',
        configList: [
          {
            list: [1],
            protocol: 'setWashTime', // 协议字段  设定洗涤时间
            value: 1
          }, {
            list: [30], // 可选列表 （中文对应的具体value 参考utils 文件）
            timeList: {
              30: 10,
            },
            protocol: 'washTemp', // 协议字段 洗涤温度
            value: 30
          },
          {
            list: [2],
            protocol: 'potch', // 协议字段 漂洗次数
            singleTime: 8,
            value: 2
          },
          {
            list: [1000],
            protocol: 'speed', // 协议字段 转速
            value: 1000
          }
        ],
        time: 30,
        defaultTime: 30,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: true,
          noDrain: false,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'kuaiXi30',
      },
      // 洗涤省心洗 5
      {
        index: 5,
        modeNum: 28,
        chineseName: '省心洗',
        configList: [
          {
            list: [5],
            protocol: 'setWashTime', // 协议字段  设定洗涤时间
            value: 5
          }, {
            list: [30], // 可选列表 （中文对应的具体value 参考utils 文件）
            timeList: {
              30: 10,
            },
            protocol: 'washTemp', // 协议字段 洗涤温度
            value: 30
          },
          {
            list: [2],
            protocol: 'potch', // 协议字段 漂洗次数
            singleTime: 8,
            value: 2
          },
          {
            list: [1000],
            protocol: 'speed', // 协议字段 转速
            value: 1000
          }
        ],
        time: 45,
        defaultTime: 45,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: true,
          noDrain: false,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'kuaiXi45',
      },
      // 洗涤丝绸 6
      {
        index: 6,
        modeNum: 12,
        chineseName: '丝绸',
        configList: [{
          list: [5, 10, 15, 20, 25, 30],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 15
        }, {
          list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 10,
            20: 10,
            30: 10,
            40: 20,
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 30
        },
        {
          list: [1, 2, 3, 4, 5],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 9,
          value: 2
        },
        {
          list: ['不脱水', 400, 600, 800],
          protocol: 'speed', // 协议字段 转速
          value: 800
        }
        ],
        time: 53,
        defaultTime: 53,
        speed0Time: 4,
        auxiliaryFunction: {
          autoMeek: false,
          autoScour: false,
          order: true,
          noDrain: true,
          creaseRes: true,
          soak: false,
          energySave: true,
          highWater: false,
        },
        auxiliaryTimeList: {
          creaseRes: 11,
          energySave: 10
        },
        otherFun: {
          autoScour: false,
          autoMeek: false
        },
        IconName: 'siChou',
      },
      // 洗涤羊毛 7
      {
        index: 7,
        modeNum: 10,
        chineseName: '羊毛',
        configList: [{
          list: [5, 10, 15, 20, 25, 30],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 10
        }, {
          list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 10,
            20: 10,
            30: 10,
            40: 20,
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: '不加热'
        },
        {
          list: [1, 2, 3, 4],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 9,
          value: 2
        },
        {
          list: ['不脱水', 400, 600, 800],
          protocol: 'speed', // 协议字段 转速
          value: 800
        }
        ],
        time: 49,
        defaultTime: 49,
        speed0Time: 4,
        auxiliaryFunction: {
          autoMeek: false,
          autoScour: false,
          order: true,
          noDrain: true,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {
          energySave: 10
        },
        otherFun: {
          autoScour: false,
          autoMeek: false
        },
        IconName: 'yangMao',
      },
      // 洗涤内衣 8
      {
        index: 8,
        modeNum: 14,
        chineseName: '内衣',
        configList: [{
          list: [5, 10, 15, 20, 25, 30],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 15
        }, {
          list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 10,
            20: 10,
            30: 10,
            40: 20
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 30
        },
        {
          list: [1, 2, 3, 4],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 11,
          value: 2
        },
        {
          list: ['不脱水', 400, 600, 800],
          protocol: 'speed', // 协议字段 转速
          value: 600
        }
        ],
        time: 58,
        defaultTime: 58,
        speed0Time: 5,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: true,
          noDrain: true,
          creaseRes: false,
          soak: true,
          energySave: true,
          highWater: true,
        },
        auxiliaryTimeList: {
          energySave: 10
        },
        IconName: 'neiYi',
      },
      // 洗涤婴儿服 9
      {
        index: 9,
        modeNum: 13,
        chineseName: '婴儿服',
        configList: [{
          list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 15
        }, {
          list: ['不加热', 20, 30, 40, 60], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 20,
            20: 20,
            30: 20,
            40: 20,
            60: 40
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 40
        },
        {
          list: [1, 2, 3, 4, 5, 6, 7, 8],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 13,
          value: 2
        },
        {
          list: ['不脱水', 400, 600, 800, 1000, 1200],
          protocol: 'speed', // 协议字段 转速
          value: 1000
        }
        ],
        time: 76,
        defaultTime: 76,
        speed0Time: 9,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: true,
          noDrain: true,
          creaseRes: true,
          soak: true,
          energySave: true,
          highWater: true,
        },
        auxiliaryTimeList: {
          creaseRes: 6,
          energySave: 10
        },
        IconName: 'yingErFu',
      },
      // 洗涤运动服 10
      {
        index: 10,
        modeNum: 9,
        chineseName: '运动服',
        configList: [{
          list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 10
        }, {
          list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 10,
            20: 10,
            30: 10,
            40: 20
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 30
        },
        {
          list: [1, 2, 3, 4],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 12,
          value: 2
        },
        {
          list: ['不脱水', 400, 600, 800, 1000],
          protocol: 'speed', // 协议字段 转速
          value: 800
        }
        ],
        time: 58,
        defaultTime: 58,
        speed0Time: 8,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: true,
          noDrain: true,
          creaseRes: true,
          soak: true,
          energySave: true,
          highWater: true,
        },
        auxiliaryTimeList: {
          creaseRes: 7,
          energySave: 10
        },
        IconName: 'yunDongFu',
      },
      // 洗涤羽绒服 11
      {
        index: 11,
        modeNum: 11,
        chineseName: '羽绒服',
        configList: [{
          list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 15
        }, {
          list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 20,
            20: 20,
            30: 20,
            40: 20
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 40
        },
        {
          list: [1, 2, 3, 4, 5],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 10,
          value: 2
        },
        {
          list: ['不脱水', 400, 600, 800],
          protocol: 'speed', // 协议字段 转速
          value: 800
        }
        ],
        time: 68,
        defaultTime: 68,
        speed0Time: 5,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: true,
          noDrain: true,
          creaseRes: false,
          soak: true,
          energySave: true,
          highWater: false,
        },
        auxiliaryTimeList: {
          energySave: 10
        },
        IconName: 'yuRongFu',
      },
      // 洗涤大物 12
      {
        index: 12,
        modeNum: 5,
        chineseName: '大物',
        configList: [{
          list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 5
        }, {
          list: ['不加热', 20, 30, 40, 60], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 20,
            20: 20,
            30: 20,
            40: 20,
            60: 40
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 40
        },
        {
          list: [1, 2, 3, 4, 5, 6, 7, 8],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 13,
          value: 3
        },
        {
          list: ['不脱水', 400, 600, 800, 1000],
          protocol: 'speed', // 协议字段 转速
          value: 1000
        }
        ],
        time: 81,
        defaultTime: 81,
        speed0Time: 9,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: true,
          noDrain: true,
          creaseRes: false,
          soak: true,
          energySave: true,
          highWater: true,
        },
        auxiliaryTimeList: {
          energySave: 10
        },
        IconName: 'daWu',
      },
      // 洗涤化纤 13
      {
        index: 13,
        modeNum: 15,
        chineseName: '化纤',
        configList: [{
          list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 10
        }, {
          list: ['不加热', 20, 30, 40, 60], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 20,
            20: 20,
            30: 20,
            40: 20,
            60: 40
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 40
        },
        {
          list: [1, 2, 3, 4, 5, 6, 7, 8],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 12,
          value: 2
        },
        {
          list: ['不脱水', 400, 600, 800, 1000, 1200],
          protocol: 'speed', // 协议字段 转速
          value: 800
        }
        ],
        time: 69,
        defaultTime: 69,
        speed0Time: 9,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: true,
          noDrain: true,
          creaseRes: true,
          soak: true,
          energySave: true,
          highWater: true,
        },
        auxiliaryTimeList: {
          creaseRes: 6,
          energySave: 10
        },
        IconName: 'huaQian',
      },
      // 洗涤牛仔 14
      {
        index: 14,
        modeNum: 16,
        chineseName: '牛仔',
        configList: [{
          list: [5, 10, 15, 20, 25, 30],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 15
        }, {
          list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 10,
            20: 10,
            30: 10,
            40: 20
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 30
        },
        {
          list: [1, 2, 3, 4, 5, 6, 7, 8],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 12,
          value: 2
        },
        {
          list: ['不脱水', 400, 600, 800, 1000, 1200],
          protocol: 'speed', // 协议字段 转速
          value: 800
        }
        ],
        time: 66,
        defaultTime: 66,
        speed0Time: 11,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: true,
          noDrain: true,
          creaseRes: false,
          soak: true,
          energySave: true,
          highWater: true,
        },
        auxiliaryTimeList: {
          energySave: 10
        },
        IconName: 'niuZai',
      },
      // 洗涤单脱水 15
      {
        index: 15,
        modeNum: 6,
        chineseName: '单脱水',
        configList: [{
          list: ['不脱水', 400, 600, 800, 1000, 1200, 1400],
          protocol: 'speed', // 协议字段 转速
          value: 1000
        }],
        time: 10,
        defaultTime: 10,
        speed0Time: 9,
        auxiliaryFunction: {
          autoMeek: false,
          autoScour: true,
          order: true,
          noDrain: false,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'danTuoShui',
      },
      // 洗涤漂洗+脱水 16
      {
        index: 16,
        modeNum: 7,
        chineseName: '漂洗脱水',
        configList: [{
          list: [1, 2, 3, 4, 5, 6, 7, 8],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 13,
          value: 1
        },
        {
          list: ['不脱水', 400, 600, 800, 1000, 1200, 1400],
          protocol: 'speed', // 协议字段 转速
          value: 1000
        }
        ],
        time: 20,
        defaultTime: 20,
        speed0Time: 9,
        auxiliaryFunction: {
          autoMeek: false,
          autoScour: true,
          order: true,
          noDrain: true,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: true,
        },
        auxiliaryTimeList: {},
        IconName: 'piaoXiTuoShui',
      },
      //  洗涤筒清洁 17
      {
        index: 17,
        modeNum: 8,
        chineseName: '筒清洁',
        configList: [
          {
            list: [5],
            protocol: 'setWashTime', // 协议字段  设定洗涤时间
            value: 5
          }, {
            list: [60], // 可选列表 （中文对应的具体value 参考utils 文件）
            protocol: 'washTemp', // 协议字段 洗涤温度
            value: 60
          },
          {
            list: [2],
            protocol: 'potch', // 协议字段 漂洗次数
            singleTime: 13,
            value: 2
          },
          {
            list: [1000],
            protocol: 'speed', // 协议字段 转速
            value: 1000
          }
        ],
        time: 73,
        defaultTime: 73,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: true,
          noDrain: false,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        otherFun: {
          autoScour: false,
          autoMeek: false
        },
        IconName: 'tongQinJie',
      },
    ],
  },
  // 专业烘干 断点
  {
    name: 1,
    label: '专业烘干',
    modeNum: 2,
    washMode: [
      // 烘干混合 0
      {
        index: 0,
        modeNum: 2,
        chineseName: '混合',
        configList: [{
          list: [800, 1000, 1200, 800, 1000, 1200],
          protocol: 'speed', // 协议字段 转速
          value: 1200
        },
        {
          list: ['标准', '快速', '30分', '60分', '90分', '120分', '150分', '180分'],
          protocol: 'dry', // 协议字段 转速
          timeDefalutList: {
            1: 90,
            13: 80
          },
          value: '标准'
        }
        ],
        time: 90,
        defaultTime: 90,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'hunHe',
      },
      // 烘干棉麻 1
      {
        index: 1,
        modeNum: 1,
        selected: true,
        chineseName: '棉麻',
        configList: [{
          list: ['不脱水', 800, 1000, 1200, 1400],
          protocol: 'speed', // 协议字段 转速
          value: 1400
        },
        {
          list: ['标准', '快速', '30分', '60分', '90分', '120分', '150分', '180分'],
          protocol: 'dry', // 协议字段 转速
          value: '标准',
          timeDefalutList: {
            1: 175,
            13: 165
          },
        }
        ],
        time: 175,
        defaultTime: 175,
        speed0Time: 12,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'mianMa',
      },
      // 烘干快烘 2
      {
        index: 2,
        modeNum: 17,
        chineseName: '快烘',
        configList: [
          {
            list: [1400],
            protocol: 'speed', // 协议字段 转速
            value: 1400
          },
          {
            list: ['快速'],
            protocol: 'dry', // 协议字段 转速
            value: '快速'
          }
        ],
        time: 30,
        defaultTime: 30,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'kuaiHong',
      },
      // 烘干衬衫 3
      {
        index: 3,
        modeNum: 4,
        chineseName: '衬衫',
        configList: [{
          list: [800, 1000],
          protocol: 'speed', // 协议字段 转速
          value: 800
        },
        {
          list: ['标准', '快速', '30分', '60分', '90分', '120分'],
          protocol: 'dry', // 协议字段 转速
          value: '标准',
          timeDefalutList: {
            1: 90,
            13: 80
          },
        }
        ],
        time: 90,
        defaultTime: 90,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: true,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {
          creaseRes: 6
        },
        IconName: 'chenShan',
      },
      // 烘干大物 4
      {
        index: 4,
        modeNum: 5,
        chineseName: '大物',
        configList: [{
          list: [800, 1000],
          protocol: 'speed', // 协议字段 转速
          value: 1000
        },
        {
          list: ['标准', '30分', '60分', '90分', '120分'],
          protocol: 'dry', // 协议字段 转速
          value: '标准',
          timeDefalutList: {
            1: 110,
          },
        }
        ],
        time: 110,
        defaultTime: 110,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'daWu',
      },
      // 烘干化纤 5
      {
        index: 5,
        modeNum: 15,
        chineseName: '化纤',
        configList: [{
          list: [800, 1000, 1200, 800, 1000, 1200],
          protocol: 'speed', // 协议字段 转速
          value: 1000
        },
        {
          list: ['标准', '30分', '60分', '90分', '120分'],
          protocol: 'dry', // 协议字段 转速
          value: '标准',
          timeDefalutList: {
            1: 110,
          },
        }
        ],
        time: 110,
        defaultTime: 110,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: true,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {
          creaseRes: 6
        },
        IconName: 'huaQian',
      },
      // 烘干丝绸 6
      {
        index: 6,
        modeNum: 12,
        chineseName: '丝绸',
        configList: [
          {
            list: [800],
            protocol: 'speed', // 协议字段 转速
            value: 800
          },
          {
            list: ['标准', '30分', '60分', '90分'],
            protocol: 'dry', // 协议字段 转速
            value: '标准',                
            timeDefalutList: {
              1: 60,
            },
          }
        ],
        time: 60,
        defaultTime: 60,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'siChou',
      },
      // 烘干羊毛 7
      {
        index: 7,
        modeNum: 10,
        chineseName: '羊毛',
        configList: [
          {
            list: [800],
            protocol: 'speed', // 协议字段 转速
            value: 800
          },
          {
            list: ['标准', '30分', '60分', '90分', '120分'],
            protocol: 'dry', // 协议字段 转速
            value: '标准',
            timeDefalutList: {
              1: 110,
            },
          }
        ],
        time: 110,
        defaultTime: 110,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'yangMao',
      },
      // 烘干内衣 8
      {
        index: 8,
        modeNum: 14,
        chineseName: '内衣',
        configList: [{
          list: [800, 1000],
          protocol: 'speed', // 协议字段 转速
          value: 800
        },
        {
          list: ['标准', '30分', '60分', '90分'],
          protocol: 'dry', // 协议字段 转速
          value: '标准',
          timeDefalutList: {
            1: 55,
          },
        }
        ],
        time: 55,
        defaultTime: 55,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'neiYi',
      },     
      // 烘干婴儿服 9
      {
        index: 9,
        modeNum: 13,
        chineseName: '婴儿服',
        configList: [{
          list: [800, 1000, 1200, 800, 1000, 1200],
          protocol: 'speed', // 协议字段 转速
          value: 1000
        },
        {
          list: ['标准', '快速', '30分', '60分', '90分', '120分'],
          protocol: 'dry', // 协议字段 转速
          value: '标准',
          timeDefalutList: {
            1: 110,
            13: 100
          },
        }
        ],
        time: 110,
        defaultTime: 110,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'yingErFu',
      },
      // 烘干运动服 10
      {
        index: 10,
        modeNum: 9,
        chineseName: '运动服',
        configList: [{
          list: [800, 1000],
          protocol: 'speed', // 协议字段 转速
          value: 1000
        },
        {
          list: ['标准', '30分', '60分', '90分', '120分'],
          protocol: 'dry', // 协议字段 转速
          value: '标准',
          timeDefalutList: {
            1: 80,
          },
        }
        ],
        time: 80,
        defaultTime: 80,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: true,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {
          creaseRes: 7
        },
        IconName: 'yunDongFu',
      },
      // 烘干羽绒服 11
      {
        index: 11,
        modeNum: 11,
        chineseName: '羽绒服',
        configList: [
          {
            list: [800],
            protocol: 'speed', // 协议字段 转速
            value: 800
          },
          {
            list: ['标准', '30分', '60分', '90分', '120分'],
            protocol: 'dry', // 协议字段 转速
            value: '标准',
            timeDefalutList: {
              1: 90,
            },
          }
        ],
        time: 90,
        defaultTime: 90,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'yuRongFu',
      },
    ]
  },
  // 洗烘  断点
  {
    name: 2,
    label: '洗烘',
    modeNum: 1,
    washMode: [
      // 洗烘混合 0
      {
        index: 0,
        modeNum: 2,
        chineseName: '混合',
        configList: [{
          list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 5
        }, {
          list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 20,
            20: 20,
            30: 20,
            40: 20
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 40
        },
        {
          list: [1, 2, 3, 4, 5, 6, 7, 8],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 13,
          value: 2
        },
        {
          list: [800, 1000, 1200, 800, 1000, 1200],
          protocol: 'speed', // 协议字段 转速
          value: 1000
        },
        {
          list: ['标准', '快速'],
          protocol: 'dry', // 协议字段 转速
          value: '标准'
        }
        ],
        time: 149,
        defaultTime: 149,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: false,
          soak: true,
          energySave: false,
          highWater: true,
        },
        auxiliaryTimeList: {},
        IconName: 'hunHe',
      },
      // 洗烘棉麻 1
      {
        index: 0,
        modeNum: 1,
        selected: true,
        chineseName: '棉麻',
        configList: [{
          list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 5
        }, {
          list: ['不加热', 20, 30, 40, 60], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 20,
            20: 20,
            30: 20,
            40: 20,
            60: 40
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 40
        },
        {
          list: [1, 2, 3, 4, 5, 6, 7, 8],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 13,
          value: 2
        },
        {
          list: [800, 1000, 1200, 1400],
          protocol: 'speed', // 协议字段 转速
          value: 1000
        },
        {
          list: ['标准', '快速'],
          protocol: 'dry', // 协议字段 转速
          value: '标准'
        }
        ],
        time: 235,
        defaultTime: 235,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: false,
          soak: true,
          energySave: false,
          highWater: true,
        },
        auxiliaryTimeList: {},
        IconName: 'mianMa',
      },
      // 洗烘快速洗烘 2
      {
        index: 2,
        modeNum: 19,
        chineseName: '快速洗烘',
        configList: [{
          list: [1, 5, 10, 15],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 1
        }, {
          list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 4,
            20: 5,
            30: 10,
            40: 20
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: '不加热'
        },
        {
          list: [1, 2, 3, 4],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 8,
          value: 1
        },
        {
          list: [1200],
          protocol: 'speed', // 协议字段 转速
          value: 1200
        },
        {
          list: ['快速'],
          protocol: 'dry', // 协议字段 转速
          value: '快速'
        }
        ],
        time: 45,
        defaultTime: 45,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          noDrain: false,
          creaseRes: false,
          soak: true,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'kuaiSuXiHong',
      },
      // 洗烘衬衫 3
      {
        index: 3,
        modeNum: 4,
        chineseName: '衬衫',
        configList: [{
          list: [5, 10, 15, 20, 25, 30],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 5
        }, {
          list: ['不加热', 20, 30, 40, 60], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 20,
            20: 20,
            30: 20,
            40: 20,
            60: 40
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 40
        },
        {
          list: [1, 2, 3, 4, 5, 6, 7, 8],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 13,
          value: 2
        },
        {
          list: [800],
          protocol: 'speed', // 协议字段 转速
          value: 800
        },
        {
          list: ['标准', '快速'],
          protocol: 'dry', // 协议字段 转速
          value: '标准'
        }
        ],
        time: 150,
        defaultTime: 150,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          noDrain: false,
          creaseRes: true,
          soak: true,
          energySave: false,
          highWater: true,
        },
        auxiliaryTimeList: {
          creaseRes: 6
        },
        IconName: 'chenShan',
      },
      // 洗烘大物 4
      {
        index: 4,
        modeNum: 5,
        chineseName: '大物',
        configList: [{
          list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 5
        }, {
          list: ['不加热', 20, 30, 40, 60], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 20,
            20: 20,
            30: 20,
            40: 20,
            60: 40
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 40
        },
        {
          list: [1, 2, 3, 4, 5, 6, 7, 8],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 13,
          value: 3
        },
        {
          list: [800, 1000],
          protocol: 'speed', // 协议字段 转速
          value: 1000
        },
        {
          list: ['标准'],
          protocol: 'dry', // 协议字段 转速
          value: '标准'
        }
        ],
        time: 183,
        defaultTime: 183,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          noDrain: false,
          creaseRes: false,
          soak: true,
          energySave: false,
          highWater: true,
        },
        auxiliaryTimeList: {},
        IconName: 'daWu',
      },
      // 洗烘换季洗 5
      {
        index: 5,
        modeNum: 21,
        chineseName: '换季洗',
        configList: [
          {
            list: [3],
            protocol: 'potch', // 协议字段 漂洗次数
            singleTime: 13,
            value: 3
          },
          {
            list: ['标准'],
            protocol: 'dry', // 协议字段 转速
            value: '标准'
          }
        ],
        time: 248,
        defaultTime: 248,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          noDrain: false,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'huanJiXi',
      },  
      // 洗烘丝绸 6
      {
        index: 6,
        modeNum: 12,
        chineseName: '丝绸',
        configList: [{
          list: [5, 10, 15, 20, 25, 30],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 15
        }, {
          list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 10,
            20: 10,
            30: 10,
            40: 20
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 30
        },
        {
          list: [1, 2, 3, 4, 5],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 9,
          value: 2
        },
        {
          list: [800],
          protocol: 'speed', // 协议字段 转速
          value: 800
        },
        {
          list: ['标准'],
          protocol: 'dry', // 协议字段 转速
          value: '标准'
        }
        ],
        time: 106,
        defaultTime: 106,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          noDrain: false,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        otherFun: {
          autoScour: false,
          autoMeek: false
        },
        IconName: 'siChou',
      },    
      // 洗烘羊毛 7
      {
        index: 7,
        modeNum: 10,
        chineseName: '羊毛',
        configList: [{
          list: [5, 10, 15, 20, 25, 30],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 10
        }, {
          list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 10,
            20: 10,
            30: 10,
            40: 20
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: '不加热'
        },
        {
          list: [1, 2, 3, 4],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 9,
          value: 2
        },
        {
          list: [800],
          protocol: 'speed', // 协议字段 转速
          value: 800
        },
        {
          list: ['标准'],
          protocol: 'dry', // 协议字段 转速
          value: '标准'
        }
        ],
        time: 153,
        defaultTime: 153,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          noDrain: false,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        otherFun: {
          autoScour: false,
          autoMeek: false
        },
        IconName: 'yangMao',
      },                
      // 洗烘漂洗烘干 8
      {
        index: 8,
        modeNum: 20,
        chineseName: '漂洗烘干',
        configList: [{
          list: [1, 2, 3, 4, 5, 6, 7, 8],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 13,
          value: 1
        },
        {
          list: [800, 1000, 1200, 1400],
          protocol: 'speed', // 协议字段 转速
          value: 1000
        },
        {
          list: ['标准'],
          protocol: 'dry', // 协议字段 转速
          value: '标准'
        }
        ],
        time: 152,
        defaultTime: 152,
        auxiliaryFunction: {
          autoMeek: false,
          autoScour: true,
          noDrain: false,
          creaseRes: false,
          soak: false,
          energySave: false,
          highWater: true,
        },
        auxiliaryTimeList: {},
        IconName: 'piaoXiHongGan',
      },
      // 洗烘婴儿服 9
      {
        index: 9,
        modeNum: 13,
        chineseName: '婴儿服',
        configList: [{
          list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 55, 60],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 15
        }, {
          list: ['不加热', 20, 30, 40, 60], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 20,
            20: 20,
            30: 20,
            40: 20,
            60: 40
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 40
        },
        {
          list: [1, 2, 3, 4, 5, 6, 7, 8],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 13,
          value: 2
        },
        {
          list: [800, 1000, 1200, 800, 1000, 1200],
          protocol: 'speed', // 协议字段 转速
          value: 1000
        },
        {
          list: ['标准', '快速'],
          protocol: 'dry', // 协议字段 转速
          value: '标准'
        }
        ],
        time: 178,
        defaultTime: 178,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          noDrain: false,
          creaseRes: false,
          soak: true,
          energySave: false,
          highWater: true,
        },
        auxiliaryTimeList: {},
        IconName: 'yingErFu',
      },
      // 洗烘运动服 10
      {
        index: 10,
        modeNum: 9,
        chineseName: '运动服',
        configList: [{
          list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 10
        }, {
          list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 10,
            20: 10,
            30: 10,
            40: 20
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 30
        },
        {
          list: [1, 2, 3, 4],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 12,
          value: 2
        },
        {
          list: [800, 1000],
          protocol: 'speed', // 协议字段 转速
          value: 1000
        },
        {
          list: ['标准'],
          protocol: 'dry', // 协议字段 转速
          value: '标准'
        }
        ],
        time: 131,
        defaultTime: 131,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          noDrain: false,
          creaseRes: true,
          soak: true,
          energySave: false,
          highWater: true,
        },
        auxiliaryTimeList: {
          creaseRes: 7
        },
        IconName: 'yunDongFu',
      },
      // 洗烘羽绒服 11
      {
        index: 11,
        modeNum: 11,
        chineseName: '羽绒服',
        configList: [{
          list: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
          protocol: 'setWashTime', // 协议字段  设定洗涤时间
          value: 15
        }, 
        {
          list: ['不加热', 20, 30, 40], // 可选列表 （中文对应的具体value 参考utils 文件）
          timeList: {
            0: 20,
            20: 20,
            30: 20,
            40: 20
          },
          protocol: 'washTemp', // 协议字段 洗涤温度
          value: 40
        },
        {
          list: [1, 2, 3, 4, 5],
          protocol: 'potch', // 协议字段 漂洗次数
          singleTime: 10,
          value: 2
        },
        {
          list: [800],
          protocol: 'speed', // 协议字段 转速
          value: 800
        },
        {
          list: ['标准'],
          protocol: 'dry', // 协议字段 转速
          value: '标准'
        }
        ],
        time: 150,
        defaultTime: 150,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          noDrain: false,
          creaseRes: false,
          soak: true,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'yuRongFu',
      },
    ]
  },
  // 蒸汽护理 断点
  {
    name: 3,
    label: '蒸汽护理',
    modeNum: 3,
    washMode: [
      // 蒸汽棉麻 0
      {
        index: 0,
        modeNum: 1,
        selected: true,
        chineseName: '棉麻',
        configList: [
          {
            list: [20],
            protocol: 'setWashTime', // 协议字段  设定洗涤时间
            value: 20
          },
          {
            list: ['标准'],
            protocol: 'dry', // 协议字段 转速
            value: '标准'
          }
        ],
        time: 30,
        defaultTime: 30,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: 'U',
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'mianMa',
      },
      // 蒸汽化纤 1
      {
        index: 1,
        modeNum: 15,
        chineseName: '化纤',
        configList: [
          {
            list: [20],
            protocol: 'setWashTime', // 协议字段  设定洗涤时间
            value: 20
          },
          {
            list: ['标准'],
            protocol: 'dry', // 协议字段 转速
            value: '标准'
          }
        ],
        time: 30,
        defaultTime: 30,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: 'U',
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'huaQian',
      },
      // 蒸汽丝绸 2
      {
        index: 2,
        modeNum: 12,
        chineseName: '丝绸',
        configList: [
          {
            list: [15],
            protocol: 'setWashTime', // 协议字段  设定洗涤时间
            value: 15
          },
          {
            list: ['标准'],
            protocol: 'dry', // 协议字段 转速
            value: '标准'
          }
        ],
        time: 30,
        defaultTime: 30,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: 'U',
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'siChou',
      },
      // 蒸汽衬衫 3
      {
        index: 3,
        modeNum: 4,
        chineseName: '衬衫',
        configList: [
          {
            list: [20],
            protocol: 'setWashTime', // 协议字段  设定洗涤时间
      
            value: 20
          },
          {
            list: ['标准'],
            protocol: 'dry', // 协议字段 转速
      
            value: '标准'
          }
        ],
        time: 30,
        defaultTime: 30,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: 'U',
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'chenShan',
      }, 
      // 蒸汽羊毛 4
      {
        index: 4,
        modeNum: 10,
        chineseName: '羊毛',
        configList: [
          {
            list: [15],
            protocol: 'setWashTime', // 协议字段  设定洗涤时间
            value: 15
          },
          {
            list: ['标准'],
            protocol: 'dry', // 协议字段 转速
            value: '标准'
          }
        ],
        time: 30,
        defaultTime: 30,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: 'U',
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'yangMao',
      },
      // 蒸汽羽绒服 5
      {
        index: 5,
        modeNum: 11,
        chineseName: '羽绒服',
        configList: [
          {
            list: [20],
            protocol: 'setWashTime', // 协议字段  设定洗涤时间
            value: 20
          },
          {
            list: ['标准'],
            protocol: 'dry', // 协议字段 转速
            value: '标准'
          }
        ],
        time: 30,
        defaultTime: 30,
        auxiliaryFunction: {
          autoMeek: true,
          autoScour: true,
          order: false,
          noDrain: false,
          creaseRes: 'U',
          soak: false,
          energySave: false,
          highWater: false,
        },
        auxiliaryTimeList: {},
        IconName: 'yuRongFu',
      }
    ]
  }
];

// 根据洗涤类型washType 和washMode来找washList具体的配置
const modeIndexList28a01 = {
  0: {
    0: 1,
    2: 0,
    1: 1, 
    4: 2,
    3: 3,
    27: 4,
    28: 5,
    12: 6,
    10: 7,
    14: 8,
    13: 9,
    9: 10,
    11: 11,
    5: 12,
    15: 13,
    16: 14,
    6: 15,
    7: 16,
    8: 17,
  },
  1: {
    0: 1,
    2: 0,
    1: 1, 
    17: 2,
    4: 3,
    5: 4,
    15: 5,
    12: 6,
    10: 7,
    14: 8,
    13: 9,
    9: 10,
    11: 11,
  },
  2: {
    0: 1,
    2: 0,
    1: 1, 
    19: 2,
    4: 3,
    5: 4,
    21: 5,
    12: 6,
    10: 7,
    20: 8,
    13: 9,
    9: 10,
    11: 11,
  },
  3: {
    0: 1,
    1: 0, 
    15: 1,
    12: 2,
    4: 3,
    10: 4,
    11: 5,
  }
};

export { modeIndexList28a01, washList28a01};
