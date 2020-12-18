<template>
  <section>
    <slot></slot>
  </section>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
 section {
    h1 {
      font-size: 52px;
      margin: 0;
      &:first-child {
        margin-bottom: 106px;
      }
    }
    h2 {
      font-size: 42px;
      font-weight: normal;
      margin: 42px 43px 42px 68px;
      word-break: break-all;
    }
    h3 {
      font-size: 38px;
      font-weight: normal;
      margin: 24px 43px 24px 68px;
    }
    p {
      font-size: 38px;
      margin: 24px 43px 24px 76px;
      color: rgba($color: #404657, $alpha: 0.6);
      line-height: 62px;
    }
 }
</style>
