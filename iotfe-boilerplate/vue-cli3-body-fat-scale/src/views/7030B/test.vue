<template>
  <div>
     <Data-Test></Data-Test>
  </div>
</template>

<script>
import DataTest from '../../components/canvas-gauge/index'
export default {
  components: {
     [DataTest.name]:DataTest
  }
}
</script>

<style type="text/scss" lang="scss" scoped>

 
</style>