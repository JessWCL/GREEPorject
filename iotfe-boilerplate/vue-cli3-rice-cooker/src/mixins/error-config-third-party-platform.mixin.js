/**
 * @constant {object} errorConfig
 * @description 故障配置
 */
const errorConfig = {
  data() {
    return {
      errorListThirdPartyPlatform: [
        {
          errIndex: 0, // index
          itemId: 1, // 故障协议对应的值
          name: this.$language('error.notify_fault_name_E0'), // 故障名称
          reason: '', // 故障原因
          ImgUrl: require('../assets/img/error_E0.png'), // 故障代码图片
          code: 'E0', // 故障代码
          showImg: false, // 一般故障代码不需要显示故障代码图片，特殊故障需要显示特殊图片，如'└┘'
          resolve: this.$language('error.notify_fault_resolve_Voltage') // 解决方案
        },
        {errIndex: 1, itemId: 2, name: this.$language('error.notify_fault_name_E1'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_E1.png'), code: 'E1', resolve: this.$language('error.notify_fault_resolve_Voltage')},
        {errIndex: 2, itemId: 3, name: this.$language('error.notify_fault_name_E4'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_E4.png'), code: 'E4', resolve: this.$language('error.notify_fault_resolve_General')},
        {errIndex: 3, itemId: 4, name: this.$language('error.notify_fault_name_E5'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_E5.png'), code: 'E5', resolve: this.$language('error.notify_fault_resolve_General')},
        {errIndex: 4, itemId: 5, name: this.$language('error.notify_fault_name_E6'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_E6.png'), code: 'E6', resolve: this.$language('error.notify_fault_resolve_General')},
        {errIndex: 5, itemId: 6, name: this.$language('error.notify_fault_name_EA'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_EA.png'), code: 'EA', resolve: this.$language('error.notify_fault_resolve_General')},
        {errIndex: 6, itemId: 7, name: this.$language('error.notify_fault_name_Ed'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_Ed.png'), code: 'Ed', resolve: this.$language('error.notify_fault_resolve_General')},
        {errIndex: 7, itemId: 8, name: this.$language('error.notify_fault_name_WithouPot'), reason: '', showImg: true, ImgUrl: require('../assets/img/error_WithoutPot.png'), code: 'Eu', resolve: this.$language('error.notify_fault_resolve_WithouPot')},
        {errIndex: 8, itemId: 9, name: this.$language('error.notify_fault_name_H8'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_H8.png'), code: 'H8', resolve: this.$language('error.notify_fault_resolve_General')},
        {errIndex: 9, itemId: 10, name: this.$language('error.notify_fault_name_H0'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_H0.png'), code: 'H0', resolve: this.$language('error.notify_fault_resolve_General')},

        {errIndex: 10, itemId: 11, name: this.$language('error.notify_fault_name_E7'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_E7.png'), code: 'E7', resolve: this.$language('error.notify_fault_resolve_General')},
        {errIndex: 11, itemId: 12, name: this.$language('error.notify_fault_name_EE'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_EE.png'), code: 'EE', resolve: this.$language('error.notify_fault_resolve_General')},
        {errIndex: 12, itemId: 13, name: this.$language('error.notify_fault_name_E8'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_general.png'), code: 'E8', resolve: this.$language('error.notify_fault_resolve_General')},
        {errIndex: 13, itemId: 14, name: this.$language('error.notify_fault_name_EF'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_general.png'), code: 'EF', resolve: this.$language('error.notify_fault_resolve_General')},
        {errIndex: 14, itemId: 15, name: this.$language('error.notify_fault_name_H9'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_H9.png'), code: 'H9', resolve: this.$language('error.notify_fault_resolve_General')},
        {errIndex: 15, itemId: 16, name: this.$language('error.notify_fault_name_HA'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_general.png'), code: 'HA', resolve: this.$language('error.notify_fault_resolve_General')},
        {errIndex: 16, itemId: 17, name: this.$language('error.notify_fault_name_HC'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_general.png'), code: 'HC', resolve: this.$language('error.notify_fault_resolve_General')},

        {errIndex: 17, itemId: 18, name: this.$language('error.notify_fault_name_Hd'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_general.png'), code: 'Hd', resolve: this.$language('error.notify_fault_resolve_General')},
        {errIndex: 18, itemId: 19, name: this.$language('error.notify_fault_name_HE'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_general.png'), code: 'HE', resolve: this.$language('error.notify_fault_resolve_General')},
        {errIndex: 19, itemId: 20, name: this.$language('error.notify_fault_name_F1'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_F1.png'), code: 'F1', resolve: this.$language('error.notify_fault_resolve_F1')},
        {errIndex: 20, itemId: 21, name: this.$language('error.notify_fault_name_H1'), reason: '', showImg: true, ImgUrl: require('../assets/img/error_general.png'), code: 'Wf', resolve: this.$language('error.notify_fault_resolve_General')},
        {errIndex: 21, itemId: 22, name: this.$language('error.notify_fault_name_F1'), reason: '', showImg: false, ImgUrl: require('../assets/img/error_F1.png'), code: 'F1', resolve: this.$language('error.notify_fault_resolve_F1')},
      ],
    };
  },
};

export default errorConfig;
