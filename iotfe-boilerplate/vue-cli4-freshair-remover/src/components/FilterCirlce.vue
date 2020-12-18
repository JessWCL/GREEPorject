<template>
  <div class="filter-block">
    <div class="card" ref="ref-card" :style="bgStyle">
      <p class="header-describle">{{ cardTitle }}</p>
      <div class="canvas-block">
        <canvas width="180" height="180" ref="Ocanvas" />
        <div ref="ref-wave" class="filter-content">
          <p class="wave-tips">{{ filtTitler }}</p>
          <p class="wave-val">
            <span class="val">{{ filtValue }}</span>
          </p>
        </div>
      </div>
      <div class="foot-slot">
        <slot name="foot-title" />
      </div>
    </div>
    <div class="reset" @click="clickReset">
      复位
    </div>
  </div>
</template>

<script>
import { Dialog } from 'gree-ui';

export default {
  name: 'FilterCirlce',
  props: {
    cardTitle: {
      type: String,
      default: '滤网名称'
    },
    filtTitler: {
      type: String,
      default: '滤网余量'
    },
    filtValue: {
      type: [String, Number],
      default: 55,
      required: true,
      validator: function(value) {
        return value > -1 && value < 101;
      }
    },
    bgColor: {
      type: [String, Array],
      default: '#CF413A'
    },
    footTitle: {
      type: String,
      default: '底部文字'
    },
    protocol: {
      type: String,
      default: 'protocol'
    }
  },
  components: {
    [Dialog.name]: Dialog
  },
  data() {
    return {
      availWidth: screen.availWidth * 0.95
    };
  },

  computed: {
    bgStyle() {
      let style;
      if (Array.isArray(this.bgColor)) {
        style = `backgroundImage: linear-gradient(to bottom,${this.bgColor[0]}, ${this.bgColor[1]}) `;
      } else {
        style = `backgroundColor: ${this.bgColor}`;
      }
      return style;
    }
  },

  mounted() {
    this.initCanvans();
  },

  beforeDestroy() {
    Dialog.closeAll();
  },

  methods: {
    initCanvans() {
      this.initCircle();
      this.initWave();
    },

    clickReset() {
      this.$emit('reset-comfirm', this.protocol);
      // Dialog.confirm({
      //   title: '提示',
      //   content: '是否已经清洗或者更换滤网',
      //   confirmText: '确定',
      //   onConfirm: () => {
      //     this.$emit('reset-comfirm', this.cardTitle);
      //   },
      //   cancelText: '取消',
      //   onCancel: () => this.$emit('reset-cancel')
      // });
    },

    /**
     * @description 画圆
     */
    initCircle() {
      this.$refs.Ocanvas.width = this.availWidth * 0.5;
      this.$refs.Ocanvas.height = this.availWidth * 0.5;
      const canvasDemo = this.$refs.Ocanvas;
      const ctx = canvasDemo.getContext('2d');
      // 画⚪边
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 2;
      ctx.arc(this.availWidth * 0.25, this.availWidth * 0.25, this.availWidth * 0.24, 0, Math.PI * 2);
      ctx.stroke();

      // 画⚪填充
      ctx.beginPath();
      ctx.arc(this.availWidth * 0.25, this.availWidth * 0.25, this.availWidth * 0.225, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fill();
      ctx.lineWidth = 0;
      ctx.stroke();
    },

    /**
     * @description 挂载波浪
     */
    initWave() {
      this.$refs['ref-card'] = this.Wave(
        {
          renderTo: 'ref-wave' // 渲染到
        },
        this.filtValue
      );
      this.$refs['ref-card'].start();
    },

    /**
     * @description Wave
     */
    Wave(option, value) {
      let ctx;
      let waveImage;
      let canvasWidth;
      let canvasHeight;
      let needAnimate = false;

      const init = () => {
        const waves = this.$refs[option.renderTo];
        const canvas = document.createElement('canvas');
        if (!canvas.getContext) return;
        ctx = canvas.getContext('2d');
        canvasWidth = this.availWidth * 0.45;
        canvasHeight = this.availWidth * 0.45;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.style.marginTop = '10px';
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0)';
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fill();
        ctx.lineWidth = 0;
        ctx.arc(this.availWidth * 0.225, this.availWidth * 0.225, this.availWidth * 0.225, 0, Math.PI * 2);
        ctx.stroke();
        waves.appendChild(canvas);

        waveImage = new Image();
        waveImage.onload = () => {
          waveImage.onload = null;
        };
        waveImage.src = require('@assets/img/wavess.png');
      };
      init();
      const animate = value => {
        const per = value / 100;
        let waveX = 0;
        let waveY = 0;
        const waveXmin = -204;
        const waveYmax = canvasHeight * per;
        const requestAnimationFrame =
          window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.msRequestAnimationFrame;
        const loop = () => {
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          if (!needAnimate) return;
          if (waveY < waveYmax) waveY += 2.5;
          if (waveX < waveXmin) waveX = 0;
          else waveX -= 0.8;
          ctx.globalCompositeOperation = 'source-over';
          ctx.beginPath();
          ctx.arc(canvasWidth / 2, canvasHeight / 2, canvasHeight / 2, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();
          ctx.globalCompositeOperation = 'source-in';
          ctx.drawImage(waveImage, waveX, canvasHeight - waveY);
          requestAnimationFrame(loop);
        };
        loop();
      };
      const start = () => {
        if (!ctx) return init(start);
        needAnimate = true;
        setTimeout(() => {
          if (needAnimate) animate(value);
        }, 500);
      };
      const stop = () => {
        needAnimate = false;
      };
      return {
        start,
        stop
      };
    }
  }
};
</script>
