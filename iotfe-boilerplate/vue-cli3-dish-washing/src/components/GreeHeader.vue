<template>
  <div class="header-container">
    <div
      class="btnBack"
      @click="$emit('handleLeftClick')">
      <slot name="left"/>
    </div>
    <div
      class="device-name ellipsis h3 mb-0"
      :style="{'color': color}">
      <slot name="center"/>
    </div>
    <div
      @click="$emit('handleRightClick')"
      class="titleMore"
      :style="{'color': color}">
      <slot name="right"/>
    </div>
    <div class="border-box"/>
  </div>
</template>


<script>
export default {
  name: 'GreeHeader',
  props: {
    color: {
      type: String,
      default: '#404657',
    }
  }
};
</script>

<style scoped>
.header-container {
  /* position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000; */
  position: relative;
}
.border-box {
  /* border: 1px solid #cdcdcd; */
  border-bottom: 1px solid #c6c6c6;
}
.btnBack {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 3rem; */
  min-width: 3rem;
  height: 3rem;
  padding: 0 1rem;
  font-size: 1.5rem;
  text-align: center;
}
.btnBack:active {
  background: rgba(0, 0, 0, 0.1);
}

.btnBack img {
  height: 1.5rem;
}

.device-name {
  margin: 0 auto;
  width: 80%;
  height: 3rem;
  line-height: 3rem;
  /* font-size: 1.7rem; */
  text-align: center;
}

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.device-name img {
  margin-left: 0.5rem;
  height: 1.5rem;
  width: 1.5rem;
}

.titleMore {
  position: absolute;
  top: 0;
  right: 0;
  /* width: 3rem; */
  min-width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  font-size: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
}
.titleMore:active {
  background: rgba(0, 0, 0, 0.1);
}

.titleMore img {
  height: 1.4rem;
}
</style>
