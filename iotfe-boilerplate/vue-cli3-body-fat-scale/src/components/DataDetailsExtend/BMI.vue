<template>
  <div class="extend-all">
    <div class="extend-content">
      <div class="extend-main">
        <span>{{ bmi }}</span>
      </div>
      <div class="exteng-tips">
        <span>Please weigh nakedly or with known weigh of clothes.</span>
      </div>
      <img 
        :src="position" 
        :style="{'left':getPositionWidth}">
      <div class="exteng-progress-BMI">
        <a>
          <p>Skinny</p>
        </a>
        <a>
          <p>Regular</p> 
        </a>
        <a>
          <p>Overweight</p>
        </a>
        <a>
          <p>Fat</p>
        </a>
      </div>
    </div>
    <div class="extend-body">
      <ul>
        <li>You have unchecked data</li>
        <li>Please weigh nakedly or with known weight of clothes. known</li>
        <li>weight of clothes. known weight of clothes</li>
      </ul>
    </div>
  </div>

</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      percent: 10,
      position: require('../../assets/images/location.png')
    };
  },
  computed: {
    ...mapState({
      bmi: state => state.useerMessage.bmi
    }),
    getPositionWidth() {
      return `${(35 + (this.bmi / 100) * 968) * (window.innerWidth / 1080)}px`; // 按照适配比例计算坐标
    }
  }
};
</script>
