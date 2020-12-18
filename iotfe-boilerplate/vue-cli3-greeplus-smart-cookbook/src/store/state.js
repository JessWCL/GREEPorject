import { __DEV__, __SHARE__ } from '../api/constant';
import { TEST_DATA } from '../api/mock';

const state = {
  deviceInfo: {
    path: '', // 主体插件页面路径
    fullstatueJson: '', // config.xml里对应的查询字段
    deviceState: 2, // 设备在线状态，-1离线，2在线
    lang: '', // 语言
    name: '智慧菜谱'
  },
  dataObject: {
    mid: '',
    deviceType: '',
    deviceTypeName: '',
    Cid: '',
    keyword: ''
  },
  dataObjectCache: {
    mid: undefined, // 初始化时不能为空字符串
    Cid: undefined, // 初始化时不能为空字符串
  },
  SearchCloudMenu: {
    r: 0,
    message: '',
    count: 0,
    data: []
  },
  GlobalSearchCloudMenu: {
    r: 0,
    message: '',
    count: 0,
    data: []
  },
  CloudMenuDetailSteps: {
    r: 0,
    message: '',
    count: 0,
    data: [],
    dataMsg: {
      Name: '',
      Headpic: '',
      Dis: '',
      Tips: ''
    }
  },
  RecommendedMenu: {
    r: 0,
    message: '',
    count: 0,
    data: []
  },
  DishFromBasket: (__DEV__ || __SHARE__) ? TEST_DATA : [],
  ShareDishBasketUrl: null
};
export default state;
