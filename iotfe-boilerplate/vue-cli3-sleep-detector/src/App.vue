<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  created() {
    this.initMockData();
  },
  methods: {
    ...mapActions({
      initMockData: 'initMockData',
    }),
  }
};
</script>

<style lang='scss' >
  body {
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    font-family: Helvetica, "Microsoft YaHei", sans-serif;
  }
  ul, li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }
</style>
