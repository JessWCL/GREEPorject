import { SEND_CTRL } from './types';
import { sendDataToDevice } from '../../../static/lib/PluginInterface.promise'; // 主体接口

export default {
  /**
   * @description 发送控制指令
   */
  async [SEND_CTRL]({ state }, DataObject) {
    const thingId = 'e512ac50d319c0b24d43532fd81e2cef';
    let serviceId;
    const param = {
      command: DataObject.state ? 'on' : 'off',
      line: 1,
    };
    const seq = '121';
    const mid = '70501';
    switch (DataObject.itemNo) {
      case 0:
        serviceId = 'electric_door_control';
        param.line = 1;
        break;
      case 1:
        serviceId = 'electric_door_control';
        param.line = 2;
        break;
      case 2:
        serviceId = 'electric_door_control';
        param.line = 3;
        break;
      case 3:
        serviceId = 'flatron_control';
        param.line = 1;
        break;
      case 4:
        serviceId = 'high_cabinet_control';
        break;
      case 5:
        serviceId = 'platform_control';
        break;
      case 6:
        serviceId = 'flatron_control';
        param.line = 2;
        break;
      default:
        break;
    }
    const mac = state.mac;
    const json = JSON.stringify({ thingId, serviceId, param, seq, mid });
    console.log(json);
    // 调用原生方法发送控制命令
    await sendDataToDevice(mac, json, false)
      .then(res => {
        return res;
      })
      .catch(err => err);
  },
};
