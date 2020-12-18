import iconDoubleWashNormal from '../../assets/images/icon_DoubleWashWashing_normal.png';
import iconDoubleWashActive from '../../assets/images/icon_DoubleWashWashing_active.png';
import iconDoubleWashForbided from '../../assets/images/icon_DoubleWashWashing_forbided.png';
import iconUpperWashingNormal from '../../assets/images/icon_UpperWashing_normal.png';
import iconUpperWashingActive from '../../assets/images/icon_UpperWashing_active.png';
import iconUpperWashingForbided from '../../assets/images/icon_UpperWashing_forbided.png';
import iconUnderlayerWashingNormal from '../../assets/images/icon_UnderlayerWashing_normal.png';
import iconUnderlayerWashingActive from '../../assets/images/icon_UnderlayerWashing_active.png';
import iconUnderlayerWashingForbided from '../../assets/images/icon_UnderlayerWashing_forbided.png';
import iconHotAirDryingNormal from '../../assets/images/icon_HotAirDrying_normal.png';
import iconHotAirDryingActive from '../../assets/images/icon_HotAirDrying_active.png';
import iconHotAirDryingForbided from '../../assets/images/icon_HotAirDrying_forbiden.png';
import iconTimingNormal from '../../assets/images/icon_timing_normal.png';
import iconTimingActive from '../../assets/images/icon_timing_active.png';
import iconTimingForbided from '../../assets/images/icon_timing_forbided.png';
import iconPurifierNormal from '../../assets/images/icon_purifier_normal.png';
import iconPurifierActive from '../../assets/images/icon_purifier_active.png';
import iconPurifierForbided from '../../assets/images/icon_purifier_forbided.png';
import iconDisinfectNormal from '../../assets/images/icon_disinfect_normal.png';
import iconDisinfectActive from '../../assets/images/icon_disinfect_active.png';
import iconDisinfectForbided from '../../assets/images/icon_disinfect_forbided.png';

import { BtnClassName } from '../constant';

const _funBtnList = [
  {
    order: 0, // 排序
    show: true, // 是否显示
    layerWash: 0, // 分层洗ID
    name: '双层洗',
    handleFunName: 'handleBtnAllWashingAction', // vuex fun name
    handleDescFunName: null, // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    btnClassName: BtnClassName.blue,
    normalIconSrc: iconDoubleWashNormal, // 普通图标
    activeIconSrc: iconDoubleWashActive, // 激活图标
    forbidedIconSrc: iconDoubleWashForbided, // 禁用图标
    txtActiveIcon: '', // 激活图标 提示语
  },
  {
    order: 0, // 排序
    show: true, // 是否显示
    layerWash: 1, // 分层洗ID
    name: '上层洗',
    handleFunName: 'handleBtnUpperWashingAction', // vuex fun name
    handleDescFunName: null, // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    btnClassName: BtnClassName.blue,
    normalIconSrc: iconUpperWashingNormal, // 普通图标
    activeIconSrc: iconUpperWashingActive, // 激活图标
    forbidedIconSrc: iconUpperWashingForbided, // 禁用图标
    txtActiveIcon: '', // 激活图标 提示语
  },
  {
    order: 0, // 排序
    show: true, // 是否显示
    layerWash: 2, // 分层洗ID
    name: '下层洗',
    handleFunName: 'handleBtnUnderLayerAction', // vuex fun name
    handleDescFunName: null, // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    btnClassName: BtnClassName.blue,
    normalIconSrc: iconUnderlayerWashingNormal, // 普通图标
    activeIconSrc: iconUnderlayerWashingActive, // 激活图标
    forbidedIconSrc: iconUnderlayerWashingForbided, // 禁用图标
    txtActiveIcon: '', // 激活图标 提示语
  },
  {
    order: 0, // 排序
    show: true, // 是否显示
    name: '热风烘干',
    handleFunName: 'handleBtnHotAirAction', // vuex fun name
    handleDescFunName: null, // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    btnClassName: BtnClassName.yellow,
    normalIconSrc: iconHotAirDryingNormal, // 普通图标
    activeIconSrc: iconHotAirDryingActive, // 激活图标
    forbidedIconSrc: iconHotAirDryingForbided, // 禁用图标
    txtActiveIcon: '', // 激活图标 提示语
  },
  {
    order: 1, // 排序
    show: true, // 是否显示
    name: '预约',
    handleFunName: 'handleBtnAppointmentAction', // vuex fun name
    handleDescFunName: null, // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    isForbidedInFunctype: true, // 场景中是否禁用
    btnClassName: BtnClassName.blue,
    normalIconSrc: iconTimingNormal, // 普通图标
    activeIconSrc: iconTimingActive, // 激活图标
    forbidedIconSrc: iconTimingForbided, // 禁用图标
    txtActiveIcon: '', // 激活图标 提示语
  },
  {
    order: 0, // 排序
    show: true, // 是否显示
    name: '保洁',
    handleFunName: 'handleBtnPurifierAction', // vuex fun name
    handleDescFunName: 'handleBtnDescAppointmentAction', // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    btnClassName: BtnClassName.blue,
    normalIconSrc: iconPurifierNormal, // 普通图标
    activeIconSrc: iconPurifierActive, // 激活图标
    forbidedIconSrc: iconPurifierForbided, // 禁用图标
    txtActiveIcon: '', // 激活图标 提示语
  },
  {
    order: 0, // 排序
    show: false, // 是否显示
    name: '消毒',
    handleFunName: 'handleBtnDisinfectAction', // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    btnClassName: BtnClassName.blue,
    normalIconSrc: iconDisinfectNormal, // 普通图标
    activeIconSrc: iconDisinfectActive, // 激活图标
    forbidedIconSrc: iconDisinfectForbided, // 禁用图标
    txtActiveIcon: '', // 激活图标 提示语
  },
];

const FunBtnList = [];

_funBtnList.forEach((ele, index) => {
  const funBtn = ele;
  funBtn.id = index;
  FunBtnList.push(funBtn);
});

export default _funBtnList;
