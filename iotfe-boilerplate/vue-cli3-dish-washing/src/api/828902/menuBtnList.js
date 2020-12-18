import iconPowerOn from '../../assets/828902/Menu/icon_power_on.png';
import iconPowerOff from '../../assets/828902/Menu/icon_power_off.png';
import iconFun from '../../assets/828902/Menu/icon_fun.png';
// import iconFunDisable from '../../assets/images/icon_fun_disable.png';
import iconModel from '../../assets/828902/Menu/icon_model.png';
// import iconModelDisable from '../../assets/images/icon_model_disable.png';

const _menuBtnList = [
  {
    order: 0, // 排序
    name: '开关',
    handleFunName: 'powerSwitchAction', // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    normalIconSrc: iconPowerOff, // 普通图标
    activeIconSrc: null, // 激活图标
    forbidedIconSrc: iconPowerOn, // 禁用图标
  },
  {
    order: 0, // 排序
    name: '模式',
    handleFunName: 'handleModelAction', // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    normalIconSrc: iconModel, // 普通图标
    activeIconSrc: null, // 激活图标
    forbidedIconSrc: null, // 禁用图标
  },
  {
    order: 0, // 排序
    name: '功能',
    handleFunName: 'handleFunAction', // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    normalIconSrc: iconFun, // 普通图标
    activeIconSrc: null, // 激活图标
    forbidedIconSrc: null, // 禁用图标
  },
];

const MenuBtnList = [];

_menuBtnList.forEach((ele, index) => {
  const menuBtn = ele;
  menuBtn.id = index;
  MenuBtnList.push(menuBtn);
});

export default _menuBtnList;
