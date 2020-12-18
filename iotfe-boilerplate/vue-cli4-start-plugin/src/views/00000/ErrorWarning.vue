<template>
  <error-warning-component :type="type" :errorList="errorList" :warningList="warningList" />
</template>

<script>
export default {
  data() {
    return {
      type: 'error', // error: 故障组件 warning: 提醒组件
      errorList: [{ code: 'E3', title: '感温包故障', text: '请通知售后人员维修' }],
      warningList: [{ title: '缺盐提示', text: '请添加洗碗机专用盐' }]
    };
  },
  created() {
    /**
     * 在首页 故障提醒 的点击事件添加 params 属性
      this.$router.push({
        name,
        params: { type: 'warning' }
      })
     */
    const { type } = this.$route.params;
    if (type) this.type = type;
  }
};
</script>
