<template>
  <div class="tab-swiper">
    <PlantsCarousel :currentTab="currentTab"></PlantsCarousel>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import PlantsCarousel from '../PlantsCarousel.vue';

export default {
  name: 'tab3Content',
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
  },
  watch: {
  },
  created() {
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
