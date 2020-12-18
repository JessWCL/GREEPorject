<template>
  <div class="extend-all">
    <div class="extend-content">
      <div class="extend-main">
        <span>{{ String(weight).split('.')[0] }}</span>
        <span>kg</span>
        <span v-show="String(weight).split('.').length > 1">.{{ String(weight).split('.')[1] }}</span>
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
      weight: state => state.useerMessage.weight
    }),
    getPositionWidth() {
      return `${(35 + (this.weight / 100) * 968) *
        (window.innerWidth / 1080)}px`; // 按照适配比例计算坐标
    }
  }
};
</script>
