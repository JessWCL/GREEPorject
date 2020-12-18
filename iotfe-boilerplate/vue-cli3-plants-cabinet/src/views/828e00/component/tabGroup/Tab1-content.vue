<template>
  <div class="tab-swiper">
    <PlantsCarousel v-if="available" :currentTab="currentTab"></PlantsCarousel>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import PlantsCarousel from '../PlantsCarousel.vue';

export default {
  name: 'tab1Content',
  components: {
    PlantsCarousel,
  },
  props: {
    currentTab: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    available() {
      return this.currentTab === 0;
    },
  },
  watch: {
  },
  created() {
    console.log('tab1-content');
  },
  methods: {
  }
};
</script>

<style lang="scss">
.tab-swiper{
  height: 100%;
}
</style>
