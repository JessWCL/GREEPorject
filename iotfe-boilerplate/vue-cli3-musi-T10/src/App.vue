<!--
 * @Author: Jerry-Rain
 * @Date: 2019-09-11 16:43:42
 * @LastEditors  : Jerry-Rain
 * @LastEditTime : 2019-12-29 19:22:47
 * @Description: 
 -->
<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
.gree-dialog-content {
  width: 980px;
}
.gree-dialog-text {
  font-size: 42px;
  margin-top: 50px;
  margin-bottom: 20px;
}
.gree-dialog-btn {
  height: 150px;
}
</style>
