import {
  changeBarColor,
  closePage,
  showToast,
  editDevice,
  timerListDevice,
} from '../../../static/lib/PluginInterface.promise';

//  更改头部颜色
export function changeBarColorPlugin(colorSting) {
  navigator.PluginInterface ? changeBarColor(colorSting) : '';
  console.log(
    '头部颜色更换为  %c   ',
    `font-size:36px;background-color:${colorSting};`,
  );
}

// 编辑设备名称
export function editDevicePlugin(mac) {
  console.log('编辑设备名称');
  navigator.PluginInterface ? editDevice(mac) : '';
}

// 退出插件
export function closePagePlugin() {
  navigator.PluginInterface ? closePage() : console.log('退出插件');
}

// 提示
export function showToastPlugin(str, num) {
  console.log(str, num);
  navigator.PluginInterface ? showToast(str, num) : '';
}
// 预约列表
export function timerListDevicePlugin(mac) {
  navigator.PluginInterface ? timerListDevice(mac) : '';
}
