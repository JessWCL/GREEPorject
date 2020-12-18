<template>
  <canvas
    id="canvas"
    :width="width"
    :height="height"
  ></canvas>
</template>

<script>
/**
 * 绘制图案样式
 * @param index 绘制的数量
 * @param color 颜色
 * @param opacity 透明度
 * @param deg 绘制弧长
 */
function SetColorTick() {
  this.draw = ctx => {
    ctx.save();
    for (let i = 0; i <= this.index; i++) {
      ctx.beginPath();
      ctx.lineWidth = this.strokeLineWidth;
      if (this.opacity === 1 && this.gradientColorArr) {
        ctx.strokeStyle = this.gradientColorArr[i];
      } else {
        ctx.strokeStyle = this.color;
      }
      ctx.moveTo(this.width - 3, 0);
      ctx.lineTo(this.width - 21, 0);
      ctx.stroke();
      ctx.rotate(this.deg);
    }
    ctx.restore();
  };
}

export default {
  name: 'gree-canvas-gauge',
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
    },
    // 总分
    total: {
      type: Number,
      default: 100
    },
    // 当前分
    current: {
      type: Number,
      default: 60
    },
    // 刻度数量，越大刻度越密
    score: {
      type: Number,
      default: 50
    },
    // 刻度线宽
    strokeLineWidth: {
      type: Number,
      default: 4
    },
    // 动画速度，值越大越快
    speed: {
      type: Number,
      default: 8
    },
    // 当前刻度颜色（纯色）
    color: {
      type: String,
      default: '#f17026'
    },
    // 渐变色数组，渐变顺序从左到右
    gradientColor: {
      type: Array,
      default: () => []
    },
    // 刻度背景色
    bg: {
      type: String,
      default: '#dedede'
    },
    // 文本标题
    title: {
      type: String,
      default: ''
    },
    // 文本内容
    content: {
      type: String,
      default: ''
    },
    // 文本摘要
    brief: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 彩色刻度线颜色数组
    gradientColorArr() {
      let colorArr = [];
      let colorObj = this.$_getRGBDiff(
        this.gradientColor[0],
        this.gradientColor[1]
      );
      for (let i = 0; i < this.score; i++) {
        // 计算每一步的hex值
        let [sR, sG, sB, startR, startG, startB, hex] = [
          colorObj.sR,
          colorObj.sG,
          colorObj.sB,
          colorObj.startR,
          colorObj.startG,
          colorObj.startB,
          ''
        ];
        hex = this.$_colorToHex(
          'rgba(' +
            ~~(sR * i + startR) +
            ',' +
            ~~(sG * i + startG) +
            ',' +
            ~~(sB * i + startB) +
            ', 1)'
        );
        colorArr.push(hex);
      }
      return colorArr;
    },
    /**
     * 计算弧长
     * 弧长计算公式是一个数学公式，为L=n（圆心角度数）× π（1）× r（半径）/180（角度制），L=α（弧度）× r(半径) （弧度制）。其中n是圆心角度数，r是半径，L是圆心角弧长。
     * 整个运动的角度是（360-120）度，转换成弧度就是12π/9，一共分成了50个分数段，那么每一个分数段就是12π/450 = 2π / 75
     * 如需旋转 5 度，可规定下面的公式：5*Math.PI/180。
     */
    degScore() {
      return (Math.PI * 13) / (9 * this.score);
    }
  },
  methods: {
    $_getRGBDiff(r1, r2) {
      let obj = {
        sR: (r2[0] - r1[0]) / 25,
        // 总差值
        sG: (r2[1] - r1[1]) / 25,
        sB: (r2[2] - r1[2]) / 25,
        startR: r1[0],
        startG: r1[1],
        startB: r1[2]
      };
      return obj;
    },
    $_colorToHex(rgb) {
      const _this = rgb;
      const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      if (/^(rgb|RGB)/.test(_this)) {
        const aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, '').split(',');
        let strHex = '#';
        for (let i = 0; i < aColor.length; i++) {
          let hex = Number(aColor[i]).toString(16);
          hex = hex < 10 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
          if (hex === '0') {
            hex += hex;
          }
          strHex += hex;
        }
        if (strHex.length !== 7) {
          strHex = _this;
        }
        return strHex;
      } else if (reg.test(_this)) {
        const aNum = _this.replace(/#/, '').split('');
        if (aNum.length === 6) {
          return _this;
        } else if (aNum.length === 3) {
          let numHex = '#';
          for (let i = 0; i < aNum.length; i += 1) {
            numHex += aNum[i] + aNum[i];
          }
          return numHex;
        }
      } else {
        return _this;
      }
    },
    /**
     * 绘制文字
     * @param ctx 画布对象
     */
    $_drawText(ctx) {
      // 旋转，使文字角度正确
      ctx.save();
      ctx.rotate((220 * Math.PI) / 180);
      if (this.title) {
        // 绘制标题
        ctx.fillStyle = '#404657';
        ctx.font = '24px Microsoft yahei';
        ctx.textAlign = 'center';
        ctx.textBaseLine = 'top';
        ctx.fillText(this.title, 0, -70);
      }
      if (this.content) {
        // 绘制内容
        ctx.fillStyle = '#404657';
        ctx.font = '48px Roboto';
        ctx.textAlign = 'center';
        ctx.textBaseLine = 'top';
        ctx.fillText(this.content, 0, 10);
      }
      if (this.brief) {
        // 绘制摘要
        ctx.fillStyle = '#404657';
        ctx.font = '24px Microsoft yahei';
        ctx.textAlign = 'center';
        ctx.textBaseLine = 'top';
        ctx.fillText(this.brief, 0, 80);
      }
      ctx.restore();
    },
    /**
     * 初始化
     */
    $_initGauge() {
      const ctx = this.$el.getContext('2d');
      const that = this;
      const [cWidth, cHeight, score, deg] = [
        this.width,
        this.height,
        this.score,
        this.degScore
      ];
      // 数字增加速度
      let dotSpeed = this.speed / 100;
      // 内环动点旋转角度
      let textSpeed = Math.round((dotSpeed * 2) / deg);
      // 起始分数,数字递增用
      let credit = 0;
      let colorTick = new SetColorTick();
      let colorIndex = 0;
      // 动点旋转速度 / 弧度
      let colorSpeed = dotSpeed / deg;
      // 当前刻度值 = （当前分 / 总分）* 总刻度
      let currSpeed = Math.round((this.current / this.total) * this.score);
      (function drawFrame() {
        ctx.save();
        ctx.clearRect(0, 0, cWidth, cHeight);
        ctx.translate(cWidth / 2, cHeight / 2);
        // 因圆本身缺口为110°,为了让缺口朝正下方,所以旋转角度为140°
        ctx.rotate((140 * Math.PI) / 180);
        // 累计动效
        if (credit < score - textSpeed) {
          credit += textSpeed;
        } else if (credit >= score - textSpeed && credit < score) {
          // 显示最终结果
          credit = that.current;
        }
        that.$_drawText(ctx, credit, that.current);
        ctx.save();
        // 绘制全部刻度
        colorTick.color = that.bg;
        colorTick.deg = deg;
        colorTick.index = score;
        colorTick.opacity = 0.6;
        colorTick.width = that.width / 2;
        colorTick.strokeLineWidth = that.strokeLineWidth;
        colorTick.draw(ctx);
        ctx.restore();
        // 绘制实际刻度
        if (colorIndex < currSpeed && colorIndex <= score) {
          colorIndex += colorSpeed;
        }
        if (that.gradientColor.length > 0) {
          colorTick.gradientColorArr = that.gradientColorArr;
        } else {
          colorTick.color = that.color;
        }
        colorTick.deg = deg;
        colorTick.index = colorIndex;
        colorTick.opacity = 1;
        colorTick.width = that.width / 2;
        colorTick.strokeLineWidth = that.strokeLineWidth;
        colorTick.draw(ctx);
        window.requestAnimationFrame(drawFrame);
        ctx.restore();
      })();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$_initGauge();
    });
  }
};
</script>