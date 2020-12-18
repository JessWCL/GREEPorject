<template>
  <gree-view>
    <gree-header  
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
    >
      {{ devname }}
    </gree-header>
    <div class="page-content-area">
      <gree-radio-list
        :options="AreaList"
        v-model="areaVals"
        icon="check"
        @change="setArea"
      />
      <div 
        class="area-content" 
        v-html="tips"/>
    </div>
  </gree-view>
</template>

<script>
import { Header, RadioList } from 'gree-ui';
import btnConfig from '../../mixins/config/5000/btn';

export default {
  components: {
    [Header.name]: Header,
    [RadioList.name]: RadioList
  },
  mixins: [btnConfig],
  data() {
    return {
      devname: '常开区域',
      areaVals: '1'
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    setArea(val) {
      console.log(val);
    }
  }
};
</script>
