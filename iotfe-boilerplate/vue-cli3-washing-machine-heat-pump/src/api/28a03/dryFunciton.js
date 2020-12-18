/*
 * @Descripttion: 底下烘干功能的配置
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-12-01 16:59:36
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2019-12-01 19:16:55
 */
export default [
  {
    index: 0,
    itemName: 'home.standard',
    protocol: 'dry',
    protocolNumber: 1, // 该模式对应的烘干值
    changeRouter: '',
    selected: false,
    invalid: false, // 是否禁用该功能
    show: true,
    ImgUrl: require('../../assets/img/Icon/adv/ic_adv_creaseProof.png'),
    selectedImgUrl: require('../../assets/img/Icon/adv/ic_adv_creaseProof_select.png'),
    warmImgUrl: require('../../assets/img/Icon/adv/ic_adv_creaseProof_unselect.png'),
    IconName: 'fangZhou'
  },
  {
    index: 1,
    itemName: 'home.timing',
    protocol: 'dry',
    protocolNumber: 3, // 该模式对应的烘干值
    changeRouter: '',
    selected: false,
    invalid: false, // 是否禁用该功能
    show: true,
    ImgUrl: require('../../assets/img/Icon/adv/ic_adv_appointment.png'),
    selectedImgUrl: require('../../assets/img/Icon/adv/ic_adv_appointment_select.png'),
    warmImgUrl: require('../../assets/img/Icon/adv/ic_adv_appointment_unselect.png'),
    IconName: 'yuYue'
  },
  {
    index: 2,
    itemName: 'home.ultraDry',
    protocol: 'dry',
    protocolNumber: 2, // 该模式对应的烘干值
    changeRouter: '',
    selected: false,
    invalid: false, // 是否禁用该功能
    show: true,
    ImgUrl: require('../../assets/img/Icon/adv/ic_adv_creaseProof.png'),
    selectedImgUrl: require('../../assets/img/Icon/adv/ic_adv_creaseProof_select.png'),
    warmImgUrl: require('../../assets/img/Icon/adv/ic_adv_creaseProof_unselect.png'),
    IconName: 'fangZhou'
  },
];
