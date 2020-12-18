/**
 * @author IOTFE
 * @desc 原生与WebView通讯接口
 */
interface Navigator {
  /**
   * webview插件接口
   */
  PluginInterface: {
    /**
     * Toast提示
     * @param {string} msg 提示内容
     * @param {number} type 1长提示 其它是短提示
     */
    showToast(msg: string, type: number): void;

    /**
     * 跳转到设备编辑页
     * @param {string} mac 设备mac
     */
    editDevice(mac: string): void;

    /**
     * 发送json数据给设备
     *
     * 下发关机命令：const cmdJson = '{"opt":["Pow"],"p":[0],"mac":"test","t":"cmd"}';
     *
     * 查询设备状态：const searchJson = '{"cols":["Pow"],"mac":"test","t":"status"}';
     *
     * @param {string} mac 设备mac
     * @param {string} json 发送给设备的json字段跟机型相关
     * @param {boolean} isFollowSysVibration 是否跟随app设置震动
     * @param {function} callback 回调函数
     */
    sendDataToDevice(
      mac: string,
      json: string,
      isFollowSysVibration: boolean,
      callback: Function
    ): IDeviceStateData | IDeviceCommandData;

    /**
     * 获取设备查询字段以及查看设备是否在线
     * @param {string} mac
     */
    getInfo(mac: string, callback: Function): IDeviceInfo;

  };
}

/**
 * 设备状态
 */
type IDeviceStateData = Array<number>;

/**
 * 下发命令成功后返回值
 */
type IDeviceCommandData = string;

/**
 * 设备信息
 */
type IDeviceInfo = {
    /**
     * 主体插件页面路径
     */
    path: string,
    /**
     * config.xml 里对应的插件查询字段
     */
    fullstatueJson: string,
    /**
     * config.xml 里对应的小卡片查询字段
     */
    statueJson: string,
    /**
     * 设备在线状态，-1离线，2在线
     */
    deviceState: number,
    /**
     * 语言
     */
    lang: string,
    /**
     * 设备名称
     */
    name: string;
}
