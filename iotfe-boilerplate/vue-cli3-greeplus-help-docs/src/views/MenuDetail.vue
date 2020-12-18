<template>
  <gree-view>
    <title-bar 
      style="background-color:#fff;" 
      :title="title" 
    />
    <gree-page class="page-list">
      <link-list :links="links"/>
    </gree-page>
  </gree-view>
</template>

<script>
import { mapState } from 'vuex';
import LinkList from '../components/LinkList';
import { CATEGORY_MAP } from '../api/constant';
import TitleBar from '../components/TitleBar';

export default {
  components: {
    'link-list': LinkList,
    'title-bar': TitleBar,
  },
  data() {
    return {
      title: '帮助',
      links: [],
    };
  },
  computed: {
    ...mapState({
      allHelpDocItems: state => state.helpDocs.allItems,
    }),
  },
  watch: {
    allHelpDocItems(val) {
      // 页面刷新后，created钩子触发时可能还未获取到数据，所以需要在获取到数据时更新一下列表数据
      this.setLinks();
    }
  },
  created() {
    this.setLinks();
  },
  methods: {
    setLinks() {
      console.log(this.$route.params.tag);
      const category = this.$route.params.tag;
      console.log(this.allHelpDocItems);
      if (category) {
        this.title = CATEGORY_MAP[category] || '帮助';
        const result = this.allHelpDocItems.filter(x => x.category === category);
        result && result.length && this.links.splice(0, this.links.length, ...result);
      }
    }
  }
};
</script>

<style lang="scss">
  .page-list {
    background-color: #fff;
    .page-content {
      padding-bottom: 0px;
    }
  }
</style>
