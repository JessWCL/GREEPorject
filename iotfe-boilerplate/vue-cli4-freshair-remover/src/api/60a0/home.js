export default {
  /* 状态栏颜色 */
  BarColor: [{
      Value: '#A5CD30'
    },
    {
      Value: '#2998FF'
    },
    {
      Value: '#F8CA31'
    },
    {
      Value: '#FEA843'
    }
  ],
  /* 设备状态小图标 */
  DeviceStatusIcon: [{
      key: 'dingshi',
      active_arr: ['AppTimer_1'],
    },
    // {
    //   ImgName: 'advan_clean'
    // },
    // {
    //   ImgName: 'advan_circulation'
    // }
  ],
  /* Cols 栏目数据 */
  ColsList_0: [{
      Name: 'home.temsor'
    },
    {
      Name: 'home.humsor'
    },
    {
      Name: 'home.co2'
    },
    {
      Name: 'home.pm'
    }
  ],
  ColsList_1: [{
      Name: 'home.temsor'
    },
    {
      Name: 'home.humsor'
    },
    {
      Name: 'home.co2'
    },
    {
      Name: 'home.pm'
    }
  ],
  /* 底部按钮 */
  FootList: [{
      name: '模式',
      key: 'moshi',
      icon: 'moshi',
      active_arr: [],
      hidden_arr: [],
      gray_arr: ['Pow_0'], // 需要置灰的状态数组
      actionType: 'popup', // 触发事件
    },
    {
      name: '内循环',
      key: 'neixunhuan',
      icon: 'inloop',
      active_arr: ['Inloop_1'],
      hidden_arr: [],
      gray_arr: ['Pow_0'],
      actionType: 'send', // 触发事件
    },
    {
      name: '清洗复位',
      key: 'qingxifuwei',
      icon: 'reset',
      active_arr: [],
      hidden_arr: ['isScene_1'],
      gray_arr: [],
      actionType: 'route', // 触发事件
    },
    {
      name: '预约',
      key: 'yuyue',
      icon: 'appointment',
      active_arr: [],
      hidden_arr: ['isScene_1'],
      gray_arr: [],
      actionType: 'route', // 触发事件
    },
  ],

  ModeList: [{
      name: '运行',
      key: 'yunxing',
      value: 'FanMod_1',
      icon: 'yunxing',
      otherProtoclList: ['IDUAirQu_0'], // 需要额外发的指令
      hidden_arr: [],
      disabled_arr: ['Pow_0', 'ModS_0', 'ModS_2', 'ModS_6'], // 需要置灰的状态数组
      actionType: 'send', // 触发事件
    },
    {
      name: '联动',
      key: 'liandong',
      value: 'FanMod_2',
      otherProtoclList: ['IDUAirQu_0', ], // 需要额外发的指令
      icon: 'liandong',
      hidden_arr: [],
      disabled_arr: ['Pow_0', 'ModS_0', 'ModS_1', 'ModS_5'], // 需要置灰的状态数组
      actionType: 'send', // 触发事件
    },
    {
      name: '自动',
      key: 'zidong',
      value: 'FanMod_3',
      icon: 'zidong',
      otherProtoclList: [], // 需要额外发的指令
      hidden_arr: [],
      disabled_arr: ['Pow_0', 'GasQ_0', 'ModS_0', 'ModS_1', 'ModS_2', 'ModS_3'], // 需要置灰的状态数组
      actionType: 'route', // 触发事件
    }
  ],

  /* 底部弹出层按钮 暂无用 可删 */
  FootFuncList: [{
      Name: '预约',
      ImgNameOn: 'crudefilterOn', // css设置对应的inconfont 这里ui未给图先写成一样的
      ImgNameOff: 'crudefilterOff'
    },
    {
      Name: '清洗复位',
      ImgNameOn: 'effReResOn',
      ImgNameOff: 'effReResOff'
    },
    {
      Name: '内循环',
      ImgNameOn: 'ifdclresOn',
      ImgNameOff: 'ifdclresOff'
    }
  ],
  Filter: [{
      Name: 'Crudefilter'
    },
    {
      Name: 'EffReRes'
    },
    // {
    //   Name: 'IFDClRes'
    // }
  ],

  /*
   ** 100~70绿色
   ** 69~30橙色
   ** 29~0红色
   */
  filterColor: {
    value: [29, 69, 101],
    color: [ // 新UI渐变色 
      ['#F8B19F', '#CF413A'],
      ['#F0D09E', '#D76E3B'],
      ['#BCE4C8', '#46AB93']
    ]
  }
}