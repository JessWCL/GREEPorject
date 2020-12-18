/**
 * @constant {object} errorConfig
 * @description 故障配置
 */
const errorConfig = {
  data() {
    return {
      ErrorCode_0: [
        { // 跳线帽故障
          errIndex: 1,
          itemId: 1,
          subtitle: '解除办法：',
          headtitle: '故障名称：',
          code: 'C5',
          title: '跳线帽故障',
          text: '请联系售后',
        },
        { // 板间通讯故障
          errIndex: 2,
          itemId: 2,
          subtitle: '',
          headtitle: '',
          code: '!',
          title: '',
          text: '',
        },
        { // 触摸按键故障
          errIndex: 3,
          itemId: 4,
          subtitle: '',
          headtitle: '',
          code: '!',
          title: '',
          text: '',
        },
        { // 记忆芯片故障
          errIndex: 4,
          itemId: 8,
          // subtitle: this.$language('error.subtitle'),
          // headtitle: this.$language('error.headtitle'),
          // code: 'EC',
          // title: this.$language('error.notify_fault_name_jy'),
          // text: this.$language('error.notify_fault_resolve_jy'),
        },
        { // 漏水故障
          errIndex: 5,
          itemId: 16,
          subtitle: '',
          headtitle: '',
          code: '!',
          title: '',
          text: '',
        },
        { // 长时间制水提醒
          errIndex: 6,
          itemId: 32,
          // subtitle: this.$language('error.subtitle'),
          // headtitle: this.$language('error.headtitle'),
          // code: 'EE',
          // title: this.$language('error.notify_fault_name_csjzstx'),
          // text: this.$language('error.notify_fault_resolve_csjzstx'),
        },
        {
          errIndex: 7,
          itemId: 2,
          subtitle: '',
          headtitle: '',
          code: '!',
          title: '',
          text: '',
        },
        {
          errIndex: 8,
          itemId: 256,
          subtitle: '',
          headtitle: '',
          code: '!',
          title: '',
          text: '',
        },
      ],
      ErrorCode_1: [
        {
          errIndex: 1,
          itemId: 1,
          // subtitle: this.$language('error.subtitle'),
          // headtitle: this.$language('error.headtitle'),
          // code: 'wifi',
          // title: this.$language('error.notify_fault_name_wifi'),
          // text: this.$language('error.notify_fault_resolve_wifi'),
        },
      ],
      JFerrCode: [
        {
          errIndex: 1,
          itemId: 1,
          // subtitle: this.$language('error.subtitle'),
          // headtitle: this.$language('error.headtitle'),
          // code: 'wifi',
          // title: this.$language('error.notify_fault_name_wifi'),
          // text: this.$language('error.notify_fault_resolve_wifi'),
        },
      ],
    };
  },
};

export default errorConfig;
