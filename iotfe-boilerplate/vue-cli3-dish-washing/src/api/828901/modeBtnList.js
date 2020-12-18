import iconEnergySavingWashActive from '../../assets/images/icon_EnergySavingWash_active.png';
import iconEnergySavingWashNormal from '../../assets/images/icon_EnergySavingWash_normal.png';
import iconStrongWashingActive from '../../assets/images/icon_StrongWashing_active.png';
import iconStrongWashingNormal from '../../assets/images/icon_StrongWashing_normal.png';
import iconHotAirDryingNormal from '../../assets/images/icon_HotAirDrying_normal.png';
import iconHotAirDryingActive from '../../assets/images/icon_HotAirDrying_active.png';
import iconQuickWashNormal from '../../assets/images/icon_QuickWash_normal.png';
import iconQuickWashActive from '../../assets/images/icon_QuickWash_active.png';
// import iconDisinfectNormal from '../../assets/images/icon_disinfect_normal.png';
// import iconDisinfectActive from '../../assets/images/icon_disinfect_active.png';
import iconDisinfectDryNormal from '../../assets/images/icon_disinfectdry_normal.png';
import iconDisinfectDryActive from '../../assets/images/icon_disinfectdry_active.png';
import iconAntiBacterialWashNormal from '../../assets/images/icon_AntiBacterialWash_normal.png';
import iconAntiBacterialWashActive from '../../assets/images/icon_AntiBacterialWash_active.png';

import HotAirDrying from '../../assets/images/HotAirDrying.png'; // 单烘干
import StrongWashing from '../../assets/images/StrongWashing.png'; // 强力洗
import EnergySavingWash from '../../assets/images/EnergySavingWash.png'; // 节能洗
import QuickWash from '../../assets/images/QuickWash.png'; // 快速洗
// import Disinfect from '../../assets/images/Disinfect.png'; // 消毒
// import DisinfectDry from '../../assets/images/DisinfectDry.png'; // 消毒烘干
import AntiBacterialWash from '../../assets/images/AntiBacterialWash.png'; // 除菌
import AntiBacterialDry from '../../assets/images/AntiBacterialDry.png'; // 除菌烘干

import DryingBG from '../../assets/images/DryingBG.png'; // 单烘干背景
import StrongWashingBG from '../../assets/images/StrongWashingBG.png'; // 强力洗背景
import EnergySavingWashBG from '../../assets/images/EnergySavingWashBG.png'; // 节能洗背景
import QuickWashBG from '../../assets/images/QuickWashBG.png'; // 快速洗背景
import AntiBacterialWashBG from '../../assets/images/AntiBacterialWashBG.png'; // 除菌洗背景
// import DisinfectBG from '../../assets/images/DisinfectBG.png'; // 消毒背景
// import DisinfectDryBG from '../../assets/images/DisinfectDryBG.png'; // 消毒烘干背景
import AntiBacterialDryBG from '../../assets/images/AntiBacterialDryBG.png'; // 除菌洗背景

// import DefaultWashBG from '../../assets/images/DefaultWashBG.png'; // 滑轮默认背景

import { ModeTheme, BtnClassName } from '../constant';

const _modeBtnList = [
  {
    order: 0, // 排序
    show: true, // 是否显示
    Mod: 1, // 电控模式ID
    modeTime: 97, // 模式工作时间
    modeDryTime: 137, // 附加烘干时间
    modeDisinfectTime: 114, // 消毒时间
    modeDryDisinfectTime: 154, // (附加烘干 && 消毒) 时间
    modeLayerWashTime: -1, // 上层/下层时间
    modeDryLayerTime: -1, // （上层/下层 & 附加烘干） 时间
    modeTheme: ModeTheme.blue, // 模式颜色主题
    name: '强净洗',
    handleFunName: 'handleModelBtnAction', // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    btnClassName: BtnClassName.blue,
    carouselIconSrc: StrongWashing, // 滑轮图标
    carouselImgBGSrc: StrongWashingBG, // 滑轮背景
    normalIconSrc: iconStrongWashingNormal, // 普通图标
    activeIconSrc: iconStrongWashingActive, // 激活图标
    forbidedIconSrc: null, // 禁用图标
  },
  {
    order: 0, // 排序
    show: true, // 是否显示
    Mod: 2, // 电控模式ID
    modeTime: 112, // 模式工作时间
    modeDryTime: 126, // 附加烘干时间
    modeDisinfectTime: 131, // 消毒时间
    modeDryDisinfectTime: 145, // (附加烘干 && 消毒) 时间
    modeLayerWashTime: -1, // 上层/下层时间
    modeDryLayerTime: -1, // （上层/下层 & 附加烘干） 时间
    modeTheme: ModeTheme.blue, // 模式颜色主题
    name: '节能洗',
    handleFunName: 'handleModelBtnAction', // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    btnClassName: BtnClassName.blue,
    carouselIconSrc: EnergySavingWash, // 滑轮图标
    carouselImgBGSrc: EnergySavingWashBG, // 滑轮背景
    normalIconSrc: iconEnergySavingWashNormal, // 普通图标
    activeIconSrc: iconEnergySavingWashActive, // 激活图标
    forbidedIconSrc: null, // 禁用图标
  },
  {
    order: 0, // 排序
    show: false, // 是否显示
    Mod: -1, // 电控模式ID
    modeTime: -1, // 模式工作时间
    modeDryTime: -1, // 附加烘干时间
    modeDisinfectTime: -1, // 消毒时间
    modeDryDisinfectTime: -1, // (附加烘干 && 消毒) 时间
    modeLayerWashTime: -1, // 上层/下层时间
    modeDryLayerTime: -1, // （上层/下层 & 附加烘干） 时间
    modeTheme: ModeTheme.blue, // 模式颜色主题
    name: '除菌洗',
    handleFunName: 'handleModelBtnAction', // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    btnClassName: BtnClassName.blue,
    carouselIconSrc: AntiBacterialWash, // 滑轮图标
    carouselImgBGSrc: AntiBacterialWashBG, // 滑轮背景
    normalIconSrc: iconAntiBacterialWashNormal, // 普通图标
    activeIconSrc: iconAntiBacterialWashActive, // 激活图标
    forbidedIconSrc: null, // 禁用图标
  },
  {
    order: 0, // 排序
    show: false, // 是否显示
    Mod: -1, // 电控模式ID
    modeTime: -1, // 模式工作时间
    modeDryTime: -1, // 附加烘干时间
    modeDisinfectTime: -1, // 消毒时间
    modeDryDisinfectTime: -1, // (附加烘干 && 消毒) 时间
    modeLayerWashTime: -1, // 上层/下层时间
    modeDryLayerTime: -1, // （上层/下层 & 附加烘干） 时间
    modeTheme: ModeTheme.blue, // 模式颜色主题
    name: '即时洗',
    handleFunName: 'handleModelBtnAction', // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    btnClassName: BtnClassName.blue,
    carouselIconSrc: QuickWash, // 滑轮图标
    carouselImgBGSrc: QuickWashBG, // 滑轮背景
    normalIconSrc: iconQuickWashNormal, // 普通图标
    activeIconSrc: iconQuickWashActive, // 激活图标
    forbidedIconSrc: null, // 禁用图标
  },
  {
    order: 0, // 排序
    show: true, // 是否显示
    Mod: 3, // 电控模式ID
    modeTime: 29, // 模式工作时间
    modeDryTime: 90, // 附加烘干时间
    modeDisinfectTime: 61, // 消毒时间
    modeDryDisinfectTime: 121, // (附加烘干 && 消毒) 时间
    modeLayerWashTime: -1, // 上层/下层时间
    modeDryLayerTime: -1, // （上层/下层 & 附加烘干） 时间
    modeTheme: ModeTheme.blue, // 模式颜色主题
    name: '快速洗',
    handleFunName: 'handleModelBtnAction', // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    btnClassName: BtnClassName.blue,
    carouselIconSrc: QuickWash, // 滑轮图标
    carouselImgBGSrc: QuickWashBG, // 滑轮背景
    normalIconSrc: iconQuickWashNormal, // 普通图标
    activeIconSrc: iconQuickWashActive, // 激活图标
    forbidedIconSrc: null, // 禁用图标
  },
  {
    order: 0, // 排序
    show: true, // 是否显示
    Mod: 0, // 电控模式ID
    modeTime: 90, // 模式工作时间
    modeDryTime: -1, // 附加烘干时间
    modeDisinfectTime: 101, // 消毒时间
    modeDryDisinfectTime: -1, // (附加烘干 && 消毒) 时间
    modeLayerWashTime: -1, // 上层/下层时间
    modeDryLayerTime: -1, // （上层/下层 & 附加烘干） 时间
    modeTheme: ModeTheme.yellow, // 模式颜色主题
    name: '单烘干',
    handleFunName: 'handleModelBtnAction', // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    btnClassName: BtnClassName.yellow,
    carouselIconSrc: HotAirDrying, // 滑轮图标
    carouselImgBGSrc: DryingBG, // 滑轮背景
    normalIconSrc: iconHotAirDryingNormal, // 普通图标
    activeIconSrc: iconHotAirDryingActive, // 激活图标
    forbidedIconSrc: null, // 禁用图标
  },
  {
    order: 0, // 排序
    show: true, // 是否显示
    Mod: 0, // 电控模式ID
    modeTime: 41, // 模式工作时间
    modeDryTime: 101, // 附加烘干时间
    modeDisinfectTime: -1, // 消毒时间
    modeDryDisinfectTime: -1, // (附加烘干 && 消毒) 时间
    modeLayerWashTime: -1, // 上层/下层时间
    modeDryLayerTime: -1, // （上层/下层 & 附加烘干） 时间
    modeTheme: ModeTheme.blue, // 模式颜色主题
    name: '单除菌',
    handleFunName: 'handleModelBtnAction', // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    btnClassName: BtnClassName.blue,
    carouselIconSrc: AntiBacterialWash, // 滑轮图标
    carouselImgBGSrc: AntiBacterialWashBG, // 滑轮背景
    normalIconSrc: iconAntiBacterialWashNormal, // 普通图标
    activeIconSrc: iconAntiBacterialWashActive, // 激活图标
    forbidedIconSrc: null, // 禁用图标
  },
  {
    order: 0, // 排序
    show: true, // 是否显示
    Mod: 0, // 电控模式ID
    modeTime: -1, // 模式工作时间
    modeDryTime: -1, // 附加烘干时间
    modeDisinfectTime: -1, // 消毒时间
    modeDryDisinfectTime: 101, // (附加烘干 && 消毒) 时间
    modeLayerWashTime: -1, // 上层/下层时间
    modeDryLayerTime: -1, // （上层/下层 & 附加烘干） 时间
    modeTheme: ModeTheme.yellow, // 模式颜色主题
    name: '除菌烘干',
    handleFunName: 'handleModelBtnAction', // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    btnClassName: BtnClassName.yellow,
    carouselIconSrc: AntiBacterialDry, // 滑轮图标
    carouselImgBGSrc: AntiBacterialDryBG, // 滑轮背景
    normalIconSrc: iconDisinfectDryNormal, // 普通图标
    activeIconSrc: iconDisinfectDryActive, // 激活图标
    forbidedIconSrc: null, // 禁用图标
  },
];

const ModeBtnList = [];

_modeBtnList.forEach((ele, index) => {
  const modeBtn = ele;
  modeBtn.id = index;
  ModeBtnList.push(modeBtn);
});

export default ModeBtnList;
