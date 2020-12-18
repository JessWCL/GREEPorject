<template>
  <!-- time tips -->
  <section v-show="!TmrOn">
    <div class="timetips-container">
      洗涤时间：
      <div v-show="parseInt(ModeTime / 60, 10)">
        <span>{{ parseInt(ModeTime / 60, 10) }}</span>
        <span>小时</span>
      </div>
      <div>
        <span>{{ parseInt(ModeTime % 60, 10) }}</span>
        <span>分钟</span>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'TimeTips',
  computed: {
    ...mapGetters(['ModeTime']),
    ...mapState({
      TmrOn: state => state.DataObject.TmrOn,
    }),
  },
};
</script>

<style scoped>
.timetips-container {
  position: absolute;
  top: 3rem;
  left: 0;
  right: 0;
  display: flex;
  padding-left: 1rem;
  font-size: 1.3rem;
  line-height: 4rem;
  color: #fff;
}
</style>
