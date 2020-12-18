<template>
  <div 
    class="consoleSwitchItem" 
    @click="consoleSwitch"></div>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
      timerId: 0,
    };
  },
  methods: {
    consoleSwitch() {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = 0;
      }
      this.count++;
      if (this.count === 8) {
        const vconsoleElement = document.getElementById('__vconsole');
        if (vconsoleElement) {
          if (!vconsoleElement.style.display || vconsoleElement.style.display === 'none') {
            vconsoleElement.style.display = 'block';
          } else {
            vconsoleElement.style.display = 'none';
          }
        }
      }
      this.timerId = setTimeout(() => {
        this.count = 0;
      }, 1000);
    }
  }
};
</script>
<style lang="scss">
#__vconsole {
  display: none;
}
.consoleSwitchItem {
  position: fixed; 
  top:0; 
  left:33%; 
  width:30%; 
  height:100px; 
  opacity: 0;
  z-index: 999;
}
</style>
