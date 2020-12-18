/**
 * @description 故障配置
 */
const errorConfig = {
  data() {
    return {
      errorListMixins: [
        {
          name: this.$language('error.notify_fault_name_0'), // 故障名称
          code: '!', // 故障代码
          resolve: this.$language('error.notify_fault_resolve_General') // 解决方案
        },
        {
          name: this.$language('error.notify_fault_name_1'),
          code: '!',
          resolve: this.$language('error.notify_fault_resolve_General')
        },
        {
          name: this.$language('error.notify_fault_name_2'),
          code: '!',
          resolve: this.$language('error.notify_fault_resolve_General')
        },
        {
          name: this.$language('error.notify_fault_name_3'),
          code: '!',
          resolve: this.$language('error.notify_fault_resolve_General')
        },
        {
          name: this.$language('error.notify_fault_name_4'),
          code: 'C0',
          resolve: this.$language('error.notify_fault_resolve_General')
        }
      ]
    };
  }
};

export default errorConfig;
