<template>
  <div class="box-bg-img">
    <div 
      class="tips-img" 
      :style="{'margin-left':getClientLeftc}">
      <div class="tips-text">{{ CO2 }}</div>  
    </div>  
    <div 
      class="tips-img2" 
      :style="{ 'margin-left':getClientLeftp }">
      <div 
      class="tips-text">{{ PM2P5 }}
      </div>  
    </div>  
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      GasN: state => state.GasN,
      PM2P5: state => state.DataBoxData[state.GasN].PM2P5,
      CO2: state => state.DataBoxData[state.GasN].CO2,
    }),
    getClientLeftc() {
      let CO2Val = this.CO2 > 1000 ? 1000 : this.CO2;
      return `${(60 + CO2Val / 1000 * 258) * (window.innerWidth / 375)}px`;
    },
    getClientLeftp() {
      let PM2P5Val = this.PM2P5 > 100 ? 100 : this.PM2P5;
      return `${(60 + PM2P5Val / 100 * 258) * (window.innerWidth / 375)}px`;
    }
  },
};
</script>
