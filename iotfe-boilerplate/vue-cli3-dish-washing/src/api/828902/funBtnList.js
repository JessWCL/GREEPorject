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
// import iconDisinfectNormal from '../../assets/images/icon_disinfect_normal.png';
// import iconDisinfectActive from '../../assets/images/icon_disinfect_active.png';
// import iconDisinfectForbided from '../../assets/images/icon_disinfect_forbided.png';
import iconAntiBacterialWashNormal from '../../assets/images/icon_AntiBacterialWash_normal.png';
import iconAntiBacterialWashActive from '../../assets/images/icon_AntiBacterialWash_active.png';
import iconAntiBacterialWashForbided from '../../assets/images/icon_AntiBacterialWash_forbided.png';

import purifier from '../../assets/828902/Fun/purifier.png';
import double_wash from '../../assets/828902/Fun/double_wash.png';
import mild_drying from '../../assets/828902/Fun/mild_drying.png';
import standard_drying from '../../assets/828902/Fun/standard_drying.png';
import enhanced_drying from '../../assets/828902/Fun/enhanced_drying.png';
import lighting from '../../assets/828902/Fun/lighting.png';
import make_an_appointment from '../../assets/828902/Fun/make_an_appointment.png';
import underwash from '../../assets/828902/Fun/underwash.png';
import upper_wash from '../../assets/828902/Fun/upper_wash.png';
import uv_disinfection from '../../assets/828902/Fun/uv_disinfection.png';
import child_lock from '../../assets/828902/Fun/child_lock.png';

import { BtnClassName } from '../constant';

const _funBtnList = [
  {
    order: 0, // 排序
    layerWash: 0, // 分层洗ID
    htmlAttr: {
      type: 'radio',
      name: 'LayerWash',
      value: 0
    },
    name: '双层洗',
    handleFunName: 'handleBtnAllWashingAction', // vuex fun name
    btnClassName: BtnClassName.blue,
    normalIconSrc: double_wash, // 普通图标
    txtActiveIcon: '' // 激活图标 提示语
  },
  {
    order: 0, // 排序
    layerWash: 1, // 分层洗ID
    htmlAttr: {
      type: 'radio',
      name: 'LayerWash',
      value: 1
    },
    name: '上层洗',
    handleFunName: 'handleBtnUpperWashingAction', // vuex fun name
    handleDescFunName: null, // vuex fun name
    btnClassName: BtnClassName.blue,
    normalIconSrc: upper_wash, // 普通图标
    txtActiveIcon: '' // 激活图标 提示语
  },
  {
    order: 0, // 排序
    layerWash: 2, // 分层洗ID
    htmlAttr: {
      type: 'radio',
      name: 'LayerWash',
      value: 2
    },
    name: '下层洗',
    handleFunName: 'handleBtnUnderLayerAction', // vuex fun name
    handleDescFunName: null, // vuex fun name
    btnClassName: BtnClassName.blue,
    normalIconSrc: underwash, // 普通图标
    txtActiveIcon: '' // 激活图标 提示语
  },
  {
    order: 1, // 排序
    name: '预约',
    htmlAttr: {
      type: 'checkbox',
      name: 'TmrOn',
      value: 1
    },
    handleFunName: 'handleBtnAppointmentAction', // vuex fun name
    handleDescFunName: null, // vuex fun name
    btnClassName: BtnClassName.blue,
    normalIconSrc: make_an_appointment, // 普通图标
    txtActiveIcon: '' // 激活图标 提示语
  },
  {
    order: 0, // 排序
    name: '保洁',
    htmlAttr: {
      type: 'checkbox',
      name: 'Purifier',
      value: 1
    },
    command: { PurifierTime: 6 },
    immediate: true,
    normalIconSrc: purifier // 普通图标
  },
  {
    name: '轻度烘干',
    htmlAttr: {
      type: 'checkbox',
      name: 'Dry',
      value: 1
    },
    normalIconSrc: mild_drying
  },
  {
    name: '标准烘干',
    htmlAttr: {
      type: 'checkbox',
      name: 'Dry',
      value: 2
    },
    normalIconSrc: standard_drying
  },
  {
    name: '加强烘干',
    htmlAttr: {
      type: 'checkbox',
      name: 'Dry',
      value: 3
    },
    normalIconSrc: enhanced_drying
  },
  {
    name: '照明',
    htmlAttr: {
      type: 'checkbox',
      name: 'Lighting',
      value: 1
    },
    immediate: true,
    normalIconSrc: lighting
  },
  {
    name: '紫外除菌',
    htmlAttr: {
      type: 'checkbox',
      name: 'Disinfect',
      value: 1
    },
    userData: {
      hidden: true
    },
    immediate: true,
    normalIconSrc: uv_disinfection
  },
  {
    name: '童锁',
    htmlAttr: {
      type: 'checkbox',
      name: 'Lock',
      value: 1
    },
    immediate: true,
    normalIconSrc: child_lock
  }
];

const FunBtnList = [];

_funBtnList.forEach((ele, index) => {
  const funBtn = ele;
  funBtn.id = index;
  FunBtnList.push(funBtn);
});

export default _funBtnList;
