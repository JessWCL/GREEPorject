/**
 * @description 故障配置
 */
const errorConfig = {
  data() {
    return {
      errorListMixins: [
        {
          name: this.$language('error.notify_fault_name_0'), // 故障名称
          code: 'CO', // 故障代码
          resolve: this.$language('error.notify_fault_resolve_General') // 解决方案
        },
        {
          name: this.$language('error.notify_fault_name_1'),
          code: 'd1',
          resolve: this.$language('error.notify_fault_resolve_General')
        },
        {
          name: this.$language('error.notify_fault_name_2'),
          code: 'L9',
          resolve: this.$language('error.notify_fault_resolve_General')
        },
        {
          name: this.$language('error.notify_fault_name_3'),
          code: 'LA',
          resolve: this.$language('error.notify_fault_resolve_General')
        },
        {
          name: this.$language('error.notify_fault_name_4'),
          code: 'dH',
          resolve: this.$language('error.notify_fault_resolve_General')
        },
        {
          name: this.$language('error.notify_fault_name_5'),
          code: 'd9',
          resolve: this.$language('error.notify_fault_resolve_General')
        },
        {
          name: this.$language('error.notify_fault_name_6'),
          code: 'y7',
          resolve: this.$language('error.notify_fault_resolve_General')
        },
        {
          name: this.$language('error.notify_fault_name_7'),
          code: 'L5',
          resolve: this.$language('error.notify_fault_resolve_General')
        },
        {
          name: this.$language('error.notify_fault_name_8'),
          code: 'L1',
          resolve: this.$language('error.notify_fault_resolve_General')
        },
        {
          name: this.$language('error.notify_fault_name_9'),
          code: 'd3',
          resolve: this.$language('error.notify_fault_resolve_General')
        }
      ]
    };
  }
};

export default errorConfig;
