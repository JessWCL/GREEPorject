<template>
  <div class="canvas-wrapper">
    <canvas id="canvas">
      您的浏览器不支持 HTML5 canvas 标签。
    </canvas>
  </div>
</template>

<script>
export default {

  props: {
    percent: {
      type: Number,
      default() {
        return 0;
      }
    },

    pause: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },

  data() {
    return {
      requestId: undefined,
      animate: undefined,
    };
  },

  mounted() {
    this.handleRenderCanvas();
  },

  destroyed() {
    console.log({ animate: this.animate, requestId: this.requestId });
    cancelAnimationFrame(this.requestId)
    this.requestId = undefined;
    this.animate = undefined;
    console.log({ animate: this.animate, requestId: this.requestId });
    console.log('==== destroyed ===');
  },

  methods: {

    // 处理画布渲染
    handleRenderCanvas() {
      console.log('==== canvas ===='); // eslint-disable-line
      // const { canvas } = payload;
      const canvas = document.getElementById('canvas');

      // 修复没有切换组件时的报错
      const isReturn = canvas === null;
      if (isReturn) {
        console.error('The canvas element is null.');
        setTimeout(() => {
          this.handleRenderCanvas();
        }, 1000)
        return;
      }

      const ctx = canvas.getContext('2d');
      const modeTheme = 'orange'; // 背景渐变色

      const blueColor = { startColor: '#2dd8f1', endColor: '#1184ef' }; // 蓝色
      const yellowColor = { startColor: '#ffda89', endColor: '#f79942' }; // 黄色
      const orangeColor = { startColor: '#f1ad26', endColor: '#f16926' }; // 橙色
      const grayColor = { startColor: '#dedede', endColor: '#dedede' }; // 灰色

      let tickStartTime = new Date().getTime();
      let tickNowTime = new Date().getTime();

      const ONE_SECOND = 1000; // 一秒毫秒数

      const devicePixelRatio = window.devicePixelRatio || 1;

      const CANVAS_WIDTH = document.body.offsetWidth * devicePixelRatio;
      const CANVAS_HEIGHT = CANVAS_WIDTH * 3 / 4;
      const ANGLE_STEP = 5;
      canvas.setAttribute('width', CANVAS_WIDTH);
      canvas.setAttribute('height', CANVAS_HEIGHT);
      canvas.style.height = `${CANVAS_HEIGHT / devicePixelRatio}px`;

      const originX = CANVAS_WIDTH / 2; // 圆心原点x
      const originY = CANVAS_HEIGHT / 2; // 圆心原点y
      const circleRadius = CANVAS_WIDTH / 3.2; // 圆形半径
      const gradientStartX = CANVAS_WIDTH / 2 - (CANVAS_WIDTH / 7.5);
      const gradientEndX = CANVAS_WIDTH - (CANVAS_WIDTH / 7.5);
      const rectHeight = 3 * devicePixelRatio; // 小方块高
      const rectWidth = 10 * devicePixelRatio; // 小方块宽

      const START_ANGLE = 145;
      const END_ANGLE = 400;

      let dynamicAngle = START_ANGLE;

      this.animate = () => {
        this.requestId = requestAnimationFrame(this.animate);

        const {pause} = this;

        // 滑动色块
        if (pause === false) tick();

        let middleLine = START_ANGLE;

        let finishPercent = this.percent / 100;
        // 防止溢出
        if (finishPercent >= 1) {
          finishPercent = 1;
        } else if (finishPercent <= 0) {
          finishPercent = 0;
        }
        middleLine = START_ANGLE + (END_ANGLE - START_ANGLE) * finishPercent;

        let isBlueColor = false;
        let isOrangeColor = false;
        let isYellowColor = false;
        // 防止为空
        isBlueColor = modeTheme === 'blue';
        isOrangeColor = modeTheme === 'orange';
        isYellowColor = modeTheme === 'yellow'; // 单烘干模式 是黄色

        // console.log('==== canvas setInterval ====');
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // 画圆
        for (let i = START_ANGLE; i < END_ANGLE; i += ANGLE_STEP) {
          const coordinate = getCoordinate(i);
          if (i < middleLine) {
            if (isBlueColor) {
              createRect(coordinate, i, blueColor); // 蓝色
            } else if (isYellowColor) {
              createRect(coordinate, i, yellowColor); // 黄色
            } else if (isOrangeColor) {
              createRect(coordinate, i, orangeColor); // 橙色
            } else {
              createRect(coordinate, i, blueColor); // 蓝色
            }
          } else {
            createRect(coordinate, i, grayColor); // 灰色
          }
        }
        // 滑动色块
        const dynamicAngleFirst = limitAngle(dynamicAngle - ANGLE_STEP * 2);
        const dynamicAngleSecond = limitAngle(dynamicAngle - ANGLE_STEP);
        const dynamicAngleThird = limitAngle(dynamicAngle);
        if (isBlueColor) {
          createRect(getCoordinate(dynamicAngleFirst), dynamicAngleFirst, blueColor);
          createRect(getCoordinate(dynamicAngleSecond), dynamicAngleSecond, blueColor);
          createRect(getCoordinate(dynamicAngleThird), dynamicAngleThird, blueColor);
        } else if (isYellowColor) {
          createRect(getCoordinate(dynamicAngleFirst), dynamicAngleFirst, yellowColor);
          createRect(getCoordinate(dynamicAngleSecond), dynamicAngleSecond, yellowColor);
          createRect(getCoordinate(dynamicAngleThird), dynamicAngleThird, yellowColor);
        } else if (isOrangeColor) {
          createRect(getCoordinate(dynamicAngleFirst), dynamicAngleFirst, orangeColor);
          createRect(getCoordinate(dynamicAngleSecond), dynamicAngleSecond, orangeColor);
          createRect(getCoordinate(dynamicAngleThird), dynamicAngleThird, orangeColor);
        } else {
          createRect(getCoordinate(dynamicAngleFirst), dynamicAngleFirst, blueColor);
          createRect(getCoordinate(dynamicAngleSecond), dynamicAngleSecond, blueColor);
          createRect(getCoordinate(dynamicAngleThird), dynamicAngleThird, blueColor);
        }
      };
      this.animate();

      // eslint-disable-next-line
      function tick() {
        tickNowTime = new Date().getTime();
        if (tickNowTime - tickStartTime >= ONE_SECOND / 20) {
          tickStartTime = new Date().getTime();
          dynamicAngle += ANGLE_STEP;
          if (dynamicAngle >= END_ANGLE) dynamicAngle = START_ANGLE;
        }
      }

      function limitAngle(angle) {
        let ret = angle;
        if (angle >= END_ANGLE) {
          ret = END_ANGLE;
        } else if (angle <= START_ANGLE) {
          ret = START_ANGLE;
        }
        return ret;
      }

      function getCoordinate(angle) {
        const x = originX + circleRadius * Math.cos(angle * Math.PI / 180);
        const y = originY + circleRadius * Math.sin(angle * Math.PI / 180);
        return { x, y };
      }

      // 创建矩形
      function createRect(point, num, colors) {
        const { startColor, endColor } = colors;
        ctx.save();
        ctx.translate(point.x, point.y); // 将画布坐标系原点移至中心
        ctx.rotate(num * Math.PI / 180); // 旋转角
        ctx.translate(-point.x, -point.y); // 修正画布坐标
        // 渐变
        const gradient = ctx.createLinearGradient(gradientStartX, 0, gradientEndX, 0);
        gradient.addColorStop(0, startColor);
        gradient.addColorStop(1, endColor);
        ctx.fillStyle = gradient;
        ctx.fillRect(point.x - rectWidth / 2, point.y - rectHeight / 2, rectWidth, rectHeight);
        ctx.fill();
        ctx.restore();
      }
    }
  },

};
</script>
