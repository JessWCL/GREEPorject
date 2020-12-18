/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-09-09 14:35:41
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2019-11-28 16:54:17
 */
import {
  changeBarColor,
  closePage,
  showToast,
  editDevice,
  tuyaControlDev,
  tuyaDeviceMore
} from '../../../static/lib/PluginInterface.promise';


//  更改头部颜色
export function changeBarColorPlugin(colorSting) {
  navigator.PluginInterface ? changeBarColor(colorSting) : console.log('头部颜色更换为  %c   ', `font-size:36px;background-color:${colorSting};`);
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

// 控制命令
export const tuyaControlDevPlugin = (mac, key, value) => {
  console.log(mac, key, value);
  navigator.PluginInterface && tuyaControlDev(mac, key, value);
};

// 设备更多页
export function tuyaDeviceMorePlugin(mac) {
  navigator.PluginInterface ? tuyaDeviceMore(mac) : console.log('设备详情页');
}
