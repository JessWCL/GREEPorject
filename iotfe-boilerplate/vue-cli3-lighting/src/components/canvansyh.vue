<template>
  <canvas
    id="canvas"
    :width="width"
    :height="height"
  ></canvas>
</template>


<script>
export default {
  props: {
    // 宽度
    width: {
      type: Number,
      default: 375
    },
    // 高度
    height: {
      type: Number,
      default: 375
    }
  },
  data() {
    return {
      bigbooms: [],
      maxRadius: 1,
      stars: [],
      lastTime: ''
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$_initGauge();
    });
  },
  methods: {
    $_initGauge() {
      const ctx = this.$el.getContext('2d');
      this.lastTime = new Date();
      this.$_Animate(ctx);
    },
    $_Animate(ctx) {
      ctx.save();
      ctx.fillStyle = 'rgba(0,5,24,0.1)';
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.restore();
    }
  }
};
</script>
