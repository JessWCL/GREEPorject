import {
  changeBarColor,
  closePage,
  showToast,
  editDevice,
} from '../../../static/lib/PluginInterface.promise';

//  更改头部颜色
export function changeBarColorPlugin(colorSting) {
  navigator.PluginInterface
    ? changeBarColor(colorSting)
    : console.log(
      '头部颜色更换为  %c   ',
      `font-size:36px;background-color:${colorSting};`,
    );
}

// 编辑设备名称
export function editDevicePlugin(mac) {
  navigator.PluginInterface ? editDevice(mac) : console.log('编辑设备名称');
}

// 退出插件
export function closePagePlugin() {
  navigator.PluginInterface ? closePage() : console.log('退出插件');
}

// 提示
export function showToastPlugin(str, num) {
  navigator.PluginInterface ? showToast(str, num) : console.log(str, num);
}

// 设备更多页
export function tuyaDeviceMorePlugin(mac) {
  navigator.PluginInterface ? editDevice(mac) : console.log('设备详情页');
}
