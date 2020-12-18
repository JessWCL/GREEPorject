/**
 * @constant {object} errorConfig
 * @description 故障配置
 */
const errorConfig = {
  data() {
    return {
      ErrorCode_0: [
        {
          errIndex: 1,
          itemId: 1,
          subtitle: this.$language('error.subtitle'),
          headtitle: this.$language('error.headtitle'),
          code: '!',
          title: this.$language('error.notify_fault_name_txm'),
          text: this.$language('error.notify_fault_resolve_txm'),
        },
        {
          errIndex: 2,
          itemId: 2,
          subtitle: this.$language('error.subtitle'),
          headtitle: this.$language('error.headtitle'),
          code: '!',
          title: this.$language('error.notify_fault_name_bjtxgz'),
          text: this.$language('error.notify_fault_resolve_bjtxgz'),
        },
        {
          errIndex: 3,
          itemId: 4,
          subtitle: this.$language('error.subtitle'),
          headtitle: this.$language('error.headtitle'),
          code: '!',
          title: this.$language('error.notify_fault_name_cmajgz'),
          text: this.$language('error.notify_fault_resolve_cmajgz'),
        },
        {
          errIndex: 4,
          itemId: 8,
          subtitle: this.$language('error.subtitle'),
          headtitle: this.$language('error.headtitle'),
          code: '!',
          title: this.$language('error.notify_fault_name_jyxpgz'),
          text: this.$language('error.notify_fault_resolve_jyxpgz'),
        },
        {
          errIndex: 5,
          itemId: 16,
          subtitle: this.$language('error.subtitle'),
          headtitle: this.$language('error.headtitle'),
          code: '!',
          title: this.$language('error.notify_fault_name_lsgz'),
          text: this.$language('error.notify_fault_resolve_lsgz'),
        },
        {
          errIndex: 6,
          itemId: 32,
          subtitle: this.$language('error.subtitle'),
          headtitle: this.$language('error.headtitle'),
          code: '!',
          title: this.$language('error.notify_fault_name_jxgz'),
          text: this.$language('error.notify_fault_resolve_jxgz'),
        },
        {
          errIndex: 6,
          itemId: 4096,
          subtitle: this.$language('error.subtitle'),
          headtitle: this.$language('error.headtitle'),
          code: '!',
          title: this.$language('error.notify_fault_name_gwbkl'),
          text: this.$language('error.notify_fault_resolve_gwbkl'),
        },
      ],
      ErrorCode_1: [
        {
          errIndex: 1,
          itemId: 1,
          subtitle: this.$language('error.subtitle'),
          headtitle: this.$language('error.headtitle'),
          code: 'wifi',
          title: this.$language('error.notify_fault_name_wifi'),
          text: this.$language('error.notify_fault_resolve_wifi'),
        },
      ],
      JFerrCode: [
        {
          errIndex: 1,
          itemId: 1,
          subtitle: this.$language('error.subtitle'),
          headtitle: this.$language('error.headtitle'),
          code: 'wifi',
          title: this.$language('error.notify_fault_name_wifi'),
          text: this.$language('error.notify_fault_resolve_wifi'),
        },
      ],
    };
  },
};

export default errorConfig;
