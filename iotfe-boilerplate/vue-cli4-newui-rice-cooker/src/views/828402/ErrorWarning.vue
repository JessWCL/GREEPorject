<template>
  <error-warning-component type="error" :errorList="errorList" :warningList="warningList" />
</template>

<script>

export default {
  data() {
    return {
      errorList: [
        { code: 'E3', title: '感温包故障', text: '请通知售后人员维修' },
      ],
      warningList: [
        { title: '缺盐提示', text: '请添加洗碗机专用盐' },
      ]
    }
  }
}
</script>

<style>

</style>