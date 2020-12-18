/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-03-14 08:50:27
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-03-18 18:53:01
 */
export default [{
  pm25statusObj: {
    gooder: {
      bgName: 'gooder',
      barColor: '#a4cd31',
      describe: '优'
    },
    middle: {
      bgName: 'middle',
      barColor: '#f8c92d',
      describe: '良'
    },
    bad: {
      bgName: 'bad',
      barColor: '#fea742',
      describe: '差'
    },
    unstable: {
      bgName: 'unstable',
      barColor: '#ada8a8',
      describe: ' '
    }
  },
  // 左上角状态图标
  DeviceStatusIcon: [{
    ImgName: 'disinfection'
  },
  {
    ImgName: 'light'
  }
  ],

  // 开机
  FootFuncList: [{
    index: 0,
    gray: false,
    name: '滤网',
    ImgName: 'filter',
    moreBtn: true,
    protocol: 'filter',
  },
  {
    index: 1,
    gray: false,
    name: '灯光',
    ImgName: 'light',
    moreBtn: false,
    protocol: 'light'
  },
  {
    index: 2,
    gray: false,
    name: '童锁',
    ImgName: 'AirChildLock',
    moreBtn: false,
    protocol: 'AirChildLock'
  },
  {
    index: 3,
    gray: false,
    name: '定时',
    ImgName: 'timer',
    moreBtn: true,
    protocol: 'timer',
    route: 'Preset'
  },
  ],
  // 关机
  FootFuncList2: [{
    index: 0,
    gray: false,
    name: '定时',
    ImgName: 'timer',
    moreBtn: true,
    protocol: 'timer',
    route: 'Preset'
  }],
  // 场景
  FootFuncList3: [{
    index: 1,
    gray: false,
    name: '灯光',
    ImgName: 'light',
    moreBtn: false,
    protocol: 'light'
  },
  {
    index: 2,
    gray: false,
    name: '童锁',
    ImgName: 'AirChildLock',
    moreBtn: false,
    protocol: 'AirChildLock'
  }
  ],
  /* 底部按钮 */
  FootList: [{
    url: require('../../assets/img/funList/pow-off.png'),
    name: '开关',
    isHidden: false,
    hasMore: false
  },
  {
    url: require('../../assets/img/funList/fliter-off.png'),
    name: '滤网',
    isHidden: false,
    hasMore: true
  },
  {
    url: require('../../assets/img/funList/light-off.png'),
    name: '灯光',
    isHidden: false,
    hasMore: false
  },
  ],
  modeData: [
    // to do, 更换图标
    require('../../assets/img/mode/autoSpeed.png'),
    require('../../assets/img/mode/highSpeed.png'),
    require('../../assets/img/mode/middleSpeed.png'),
    require('../../assets/img/mode/lowSpeed.png')
  ],
  modeAll: ['', '自动', '高速', '中速', '低速'],
  modeOptions: {
    isShow: true, // 是否显示
    controlAble: true, // 滑轮能不能滑动 
    showNumOrImg: false, // 显示数字还是图片 数字为true，图片为false
    horizontal: true, // 水平显示or竖直显示
    controlMode: 1,
    threeOrAll: true, // 显示3个or全部显示
    width: '100%', // 组件宽度
    spaceBetween: '2rem', // 间距
    marginLeft: '0', // 组件左边距
    height: '1.2rem', // 图片大小
    fontSize: '32px',
    radiusMutiply: 1, // 半径系数
  },
}];
