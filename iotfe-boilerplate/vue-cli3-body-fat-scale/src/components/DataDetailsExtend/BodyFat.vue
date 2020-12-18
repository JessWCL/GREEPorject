<template>
  <div class="extend-all">
    <div class="extend-content">
      <div class="extend-main">
        <span>{{ fat }}</span>
        <span>kg</span>
      </div>
      <div class="exteng-tips">
        <span>Please weigh nakedly or with known weigh of clothes.</span>
      </div>
      <!-- <gree-block>
        <gree-progress-bar
          :percent="this.percent"
          type="warning"
        ></gree-progress-bar>
    </gree-block> -->
      <img 
        :src="position" 
        :style="{'left':getPositionWidth}">
      <div class="exteng-progress">
        <a>
          <p>Slight Low</p>
        </a>
        <a>
          <p>Regular</p> 
        </a>
        <a>
          <p>Slight High</p>
        </a>
      </div>
    </div>
    <!-- <div class="extend-body">
      <ul>
        <li>You have unchecked data</li>
        <li>Please weigh nakedly or with known weight of clothes. known</li>
        <li>weight of clothes. known weight of clothes</li>
      </ul>
    </div> -->
  </div>

</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      percent: 10,
      position: require('../../assets/images/location.png'),
      positionwidth: 59
    };
  },
  computed: {
    ...mapState({
      fat: state => state.useerMessage.fat
    }),
    getPositionWidth() {
      return `${(35 + (this.fat / 100) * 968) * (window.innerWidth / 1080)}px`; // 按照适配比例计算坐标
    }
  }
};
</script>
