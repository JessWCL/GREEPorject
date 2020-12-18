/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-09-06 15:53:47
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2019-11-21 16:15:56
 */
import {
  changeBarColor,
  closePage,
  showToast,
  editDevice,
} from '../../../static/lib/PluginInterface.promise';


//  更改头部颜色
export function changeBarColorPlugin(colorSting) {
  navigator.PluginInterface ? changeBarColor(colorSting) : '';
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
  num ? num : num = 1;
  navigator.PluginInterface ? showToast(str, num) : '';
}

