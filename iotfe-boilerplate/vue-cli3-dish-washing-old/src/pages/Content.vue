<template>
  <div class="position-relative content-container">
    <div class="dash-board-container">
      <!-- <ErrorTips /> -->
      <!-- 仪表盘 -->
      <DashBoard />
    </div>
  </div>
</template>

<script>
import DashBoard from './DashBoard';
import ErrorTips from './ErrorTips';

export default {
  name: 'Content',
  components: {
    DashBoard,
    ErrorTips,
  },
};
</script>

<style scoped>
.content-container {
  display: flex;
  flex: 1;
}
.dash-board-container {
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>
