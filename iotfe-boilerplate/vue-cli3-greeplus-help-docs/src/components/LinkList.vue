<template>
  <section>
    <ul v-if="isQuestionList">
      <li v-for="(item, index) in links" :key="index">
        <router-link :to="`/linkDetail?istop=1&pid=${item.pid}&id=${item.id}`" class="link">{{ item.name }}</router-link>
      </li>
    </ul>
    <ul v-else>
      <li v-for="(item, index) in links" :key="index" class="item">
        <router-link :to="`/linkDetail?istop=0&category=${item.category}&id=${item.id}`" class="link">{{ item.name }}</router-link>
        <img src="../assets/img/arrow.png">
      </li>
    </ul>
  </section>
  
</template>

<script>
export default {
  props: ['links', 'isQuestionList']
};
</script>

<style lang="scss" scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 42px;
    background: #ffffff;
    text-align: left;
    li {
      position: relative;
      .link {
        color: rgba($color: #404657, $alpha: 0.8);
        box-sizing: border-box;
        padding: 42px 95px;
        width: 100%;
        display: inline-block;
        text-decoration: none;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &.item {
        height: 140px;
        line-height: 140px;
        border-bottom: 1px solid #efefef;
        position: relative;
        .link {
          padding: 0 126px 0 96px;
          margin: 0;
        }
        img {
          width: 24px;
          height: 46px;
          position: absolute;
          right: 75px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }
      }
    }
  }
</style>
