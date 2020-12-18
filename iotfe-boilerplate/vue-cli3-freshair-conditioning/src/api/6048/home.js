export default [
  {
    /* 状态栏颜色 */
    BarColor: [
      {
        Value: '#A5CD30',
      },
      {
        Value: '#2998FF',
      },
      {
        Value: '#F8CA31',
      },
      {
        Value: '#FEA843',
      },
    ],
    /* 设备状态小图标 */
    DeviceStatusIcon: [
      {
        ImgName: 'advan_timer',
      },
      {
        ImgName: 'advan_clean',
      },
      {
        ImgName: 'advan_circulation',
      },
    ],
    /* Cols 栏目数据 */
    ColsList: [
      {
        Name: 'home.temsor',
      },
      {
        Name: 'home.humsor',
      },
      {
        Name: 'home.hcho',
      },
      {
        Name: 'home.tvoc',
      },
      {
        Name: 'home.co2',
      },
      {
        Name: 'home.pm',
      },
    ],
    /* 底部按钮 */
    FootList: [
      {
        Name: 'home.power',
        ImgName: 'btn_off',
      },
      {
        Name: 'home.function',
        ImgName: 'btn_function',
      },
      // {
      //   Name: 'home.voice',
      //   ImgName: 'btn_voice',
      // },
    ],
    /* 底部弹出层按钮 */
    FootFuncList: [
      {
        Name: '预约',
        ImgNameOn: 'btn_timer_on',
        ImgNameOff: 'btn_timer_off',
      },
      {
        Name: '清洗复位',
        ImgNameOn: 'btn_clean_on',
        ImgNameOff: 'btn_clean_off',
      },
      {
        Name: '内循环',
        ImgNameOn: 'btn_circulation_on',
        ImgNameOff: 'btn_circulation_off',
      },
    ],
    Filter: [
      {
        Name: 'Crudefilter',
        status: true, // 用于细分码权限
      },
      {
        Name: 'EffReRes',
        status: true,
      },
      {
        Name: 'MedlRes',
        status: true,
      },
    ],

    // 粗效/中效/高效  （0 ：不存在 1：只有清洗提醒 2 ： 只有更换提醒  3： 两个提醒都存在）
    // MidTypeFlag: {
    //   '605D': [3, 0, 2],
    //   6099: [3, 0, 0],
    //   6079: [3, 0, 2],
    //   '60A0': [0, 3, 2],
    // },
    midTypeList: ['605d', '6099', '6079', '60a0'],
  },
];
