<template>
  <gree-header
    theme="transparent"
    :left-options="{preventGoBack: true}"
    @on-click-back="goBack"
  >
    <div 
      class="page-header-title" 
      slot="overwrite-title">
      <span @touchend="openDeviceInfo">{{ devname }}</span>
      <img 
        class="btn-edit" 
        @touchend="openDeviceInfo" 
        v-show="!isScene"
        src="../assets/img/edit.png">
    </div>
    <div 
      class="page-header-right" 
      slot="right">
      <span
        class="btn-save" 
        @click="saveScene"
        v-show="isScene">{{ $language('home.save')}}</span>
      <img 
        class="btn-off" 
        src="../assets/img/10.png"
        v-show="!!Pow"
        @touchend="powerOff">
    </div>
  </gree-header>
</template>
<script>
export default {
  
};
</script>

