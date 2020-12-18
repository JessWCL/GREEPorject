<template>
  <section>
    <h2 class="title">猜你想问</h2>
    <link-list class="links" :links="links" :is-question-list="true"/>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import LinkList from '../components/LinkList';

export default {
  components: {
    'link-list': LinkList
  },
  computed: {
    ...mapState({
      links: state => state.helpDocs.topItems
    })
  },
};
</script>

<style lang="scss" scoped>
  section {
    border-radius: 50px 50px 0 0;
    height: 100%;
    box-sizing: border-box;
    .title {
      text-align: left;
      padding: 82px 0px 38px 54px;
      margin: 0;
      font-weight: normal;
      font-size: 52px;
      color: #404657;
    }
    .links {
      height: calc(100% - 192px);
      overflow-x: hidden;
    }
  }
</style>
