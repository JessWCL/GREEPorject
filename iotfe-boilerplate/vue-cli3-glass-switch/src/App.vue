<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:48
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2019-09-22 15:35:28
 * @Description: 
 -->
<template>
  <div id="app">
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive> -->
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app {
  /* font-family: fzlthjw, appleUltralight, appleLight, sans-serif; */
}
</style>

