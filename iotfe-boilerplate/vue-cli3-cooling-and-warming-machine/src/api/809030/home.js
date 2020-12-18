export default [{
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
    ImgName: 'advan_quiet'
  },
  {
    ImgName: 'advan_outmode'
  },
  {
    ImgName: 'advan_assht'
  },
  {
    ImgName: 'advan_ac_svst'
  },
  {
    ImgName: 'advan_svst'
  }],
  modeData: [
    require('../../assets/img/icon_cool.png'),
    require('../../assets/img/icon_heat.png')
  ],
  modeAll: ['', '制冷', '制热'],
  modeOptions: {
    isShow: true, // 是否显示
    controlAble: true, // 滑轮能不能滑动 
    showNumOrImg: false, // 显示数字还是图片 数字为true，图片为false
    horizontal: true, // 水平显示or竖直显示
    controlMode: 1,
    threeOrAll: true, // 显示3个or全部显示
    width: '60%', // 组件宽度
    spaceBetween: '3rem', // 间距
    marginLeft: '0', // 组件左边距
    height: '1.2rem', // 图片大小
    fontSize: '32px',
    radiusMutiply: 1, // 半径系数
  },
  speModeOptions: {
    isShow: true, // 是否显示
    controlAble: false, // 滑轮能不能滑动 
    showNumOrImg: false, // 显示数字还是图片 数字为true，图片为false
    horizontal: true, // 水平显示or竖直显示
    controlMode: 1,
    threeOrAll: true, // 显示3个or全部显示
    width: '60%', // 组件宽度
    spaceBetween: '3rem', // 间距
    marginLeft: '0', // 组件左边距
    height: '1.2rem', // 图片大小
    fontSize: '32px',
    radiusMutiply: 1, // 半径系数
  },
  TemOptions: {
    isShow: true, // 是否显示
    controlAble: true, // 滑轮能不能滑动 
    showNumOrImg: true, // 显示数字还是图片 数字为true，图片为false
    horizontal: true, // 水平显示or竖直显示
    controlMode: 1,
    threeOrAll: false, // 显示3个or全部显示
    width: '100%', // 组件宽度
    spaceBetween: '3rem', // 间距
    marginLeft: '0', // 组件左边距
    height: '0rem', // 图片大小
    fontSize: '35px',
    radiusMutiply: 1, // 半径系数
  },
  /* 底部按钮 */
  FootList: [{
    Name: 'home.power',
    ImgName: 'btn_on'
  },
  {
    Name: 'home.function',
    ImgName: 'btn_function'
  },
  {
    Name: 'home.parameterQuery',
    ImgName: 'parameter_query'
  },
  {
    Name: 'home.order',
    ImgName: 'order'
  }
  ],
  /**  底部弹出层按钮 制冷模式 */
  FootFuncList1: [{
    Name: '静音',
    ImgNameOn: 'icon_cool_quiet_on',
    ImgNameOff: 'icon_quiet_off',
    showArrowMore: false
  },
  {
    Name: '空调节能',
    ImgNameOn: 'icon_cool_ac_svst_on',
    ImgNameOff: 'icon_ac_svst_off',
    showArrowMore: false
  }],

  /** 制热模式 */
  FootFuncList2: [{
    Name: '静音',
    ImgNameOn: 'icon_heat_quiet_on',
    ImgNameOff: 'icon_quiet_off',
    showArrowMore: false
  },
  {
    Name: '外出',
    ImgNameOn: 'icon_outmode_on',
    ImgNameOff: 'icon_outmode_off',
    showArrowMore: false
  },
  {
    Name: '辅热',
    ImgNameOn: 'icon_assht_on',
    ImgNameOff: 'icon_assht_off',
    showArrowMore: false
  },
  {
    Name: '空调节能',
    ImgNameOn: 'icon_heat_ac_svst_on',
    ImgNameOff: 'icon_ac_svst_off',
    showArrowMore: false
  },
  {
    Name: '节能',
    ImgNameOn: 'icon_heat_svst_on',
    ImgNameOff: 'icon_svst_off',
    showArrowMore: false
  },
  ]
}];
