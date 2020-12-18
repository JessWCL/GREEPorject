/**
 * @description 故障配置
 */
const errorConfig = {
  data() {
    return {
      errorListMixins: [
        {
          itemId: 1,
          subtitle: this.$language('error.subtitle'),
          headtitle: this.$language('error.headtitle'),
          title: this.$language('error.notify_fault_name_0'), // 故障名称
          code: '!', // 故障代码
          text: this.$language('error.notify_fault_resolve_General'), // 解决方案
        },
        {
          itemId: 2,
          subtitle: this.$language('error.subtitle'),
          headtitle: this.$language('error.headtitle'),
          title: this.$language('error.notify_fault_name_1'),
          code: 'C0',
          text: this.$language('error.notify_fault_resolve_General'),
        },
        {
          itemId: 4,
          subtitle: this.$language('error.subtitle'),
          headtitle: this.$language('error.headtitle'),
          title: this.$language('error.notify_fault_name_2'),
          code: 'CP',
          text: this.$language('error.notify_fault_resolve_General'),
        },
        {
          itemId: 8,
          subtitle: this.$language('error.subtitle'),
          headtitle: this.$language('error.headtitle'),
          title: this.$language('error.notify_fault_name_3'),
          code: 'LA',
          text: this.$language('error.notify_fault_resolve_General'),
        },
        {
          itemId: 16,
          subtitle: this.$language('error.subtitle'),
          headtitle: this.$language('error.headtitle'),
          title: this.$language('error.notify_fault_name_4'),
          code: 'L9',
          text: this.$language('error.notify_fault_resolve_General'),
        },
        {
          itemId: 32,
          subtitle: this.$language('error.subtitle'),
          headtitle: this.$language('error.headtitle'),
          title: this.$language('error.notify_fault_name_5'),
          code: 'dH',
          text: this.$language('error.notify_fault_resolve_General'),
        },
        {
          itemId: 64,
          subtitle: this.$language('error.subtitle'),
          headtitle: this.$language('error.headtitle'),
          title: this.$language('error.notify_fault_name_6'),
          code: 'y8',
          text: this.$language('error.notify_fault_resolve_General'),
        },
      ],
    };
  },
};

export default errorConfig;
