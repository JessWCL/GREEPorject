<template>
  <div
    class="safe-area-inset-top"
    :class="{ 'fixed': fixed }"
    :style="{ background: topColor }"
  ></div>
</template>

<script>
export default {
  name: 'SafeAreaInsetTopComponent',
  props: {
    topColor: {
      type: String,
      default: '#ffffff',
    },
    fixed: {
      type: Boolean,
      default: false,
    }
  },
};
</script>

<style>
@supports (bottom: constant(safe-area-inset-top)) or (bottom: env(safe-area-inset-top)) {
  .safe-area-inset-top {
    height: constant(safe-area-inset-top);
    height: env(safe-area-inset-top);
    width: 100%;
  }
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
}
</style>
