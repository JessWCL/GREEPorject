<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <loading />
  </div>
</template>

<script>
import loading from './components/Loading';

export default {
  name: 'App',
  components: {
    loading
  }
};
</script>
