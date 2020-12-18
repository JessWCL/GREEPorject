/*
 * @Descripttion:  插件调主体接口。此页是为了网页调试时不报错
 * @version: 1.0
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-12-24 08:47:52
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-03-28 15:00:23
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
  navigator.PluginInterface && changeBarColor(colorSting);
}

// 编辑设备名称
export function editDevicePlugin(mac) {
  if (!mac) {
    console.log('没有传mac');
    return; 
  }
  navigator.PluginInterface ? editDevice(mac) : console.log('编辑设备名称');
}

// 退出插件
export function closePagePlugin() {
  navigator.PluginInterface ? closePage() : console.log('退出插件');
}

// 提示
export function showToastPlugin(str, num = 0) {
  navigator.PluginInterface ? showToast(str, num) : console.log(str);
}

// 控制命令
export const tuyaControlDevPlugin = (mac, key, value) => {
  navigator.PluginInterface ? tuyaControlDev(mac, key, value) : console.log(mac, key);
};

// 设备更多页
export function tuyaDeviceMorePlugin(mac) {
  navigator.PluginInterface ? tuyaDeviceMore(mac) : console.log('设备详情页');
}
