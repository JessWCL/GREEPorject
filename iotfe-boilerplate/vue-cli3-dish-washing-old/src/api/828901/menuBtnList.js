import iconPower from '../../assets/images/icon_power.png';
import iconFun from '../../assets/images/icon_fun.png';
import iconModel from '../../assets/images/icon_model.png';
import iconPowerDisable from '../../assets/images/icon_power_disable.png';
import iconFunDisable from '../../assets/images/icon_fun_disable.png';
import iconModelDisable from '../../assets/images/icon_model_disable.png';

const _menuBtnList = [
  {
    order: 0, // 排序
    name: '开关',
    handleFunName: 'powerSwitchAction', // vuex fun name
    isNormal: true, // 是否普通 默认普通
    isActive: false, // 是否激活
    isForbided: false, // 是否禁用
    normalIconSrc: iconPower, // 普通图标
    activeIconSrc: null, // 激活图标
    forbidedIconSrc: iconPowerDisable, // 禁用图标
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
    forbidedIconSrc: iconModelDisable, // 禁用图标
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
    forbidedIconSrc: iconFunDisable, // 禁用图标
  },
];

const MenuBtnList = [];

_menuBtnList.forEach((ele, index) => {
  const menuBtn = ele;
  menuBtn.id = index;
  MenuBtnList.push(menuBtn);
});

export default _menuBtnList;
