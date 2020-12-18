function install(_Vue) {
  // 添加实例方法
  const Vue = _Vue;

  Vue.prototype.$wave = function $wave(option) {
    const _this = this;
    let ctx;
    let waveImage;
    let canvasWidth;
    let canvasHeight;
    let needAnimate = false;
    let initval;
    function init() {
      const waves = document.getElementById(option.renderTo);
      const canvas = document.createElement('canvas');
      if (!canvas.getContext) return;
      ctx = canvas.getContext('2d');
      canvasWidth = screen.availWidth * 0.45;
      canvasHeight = screen.availWidth * 0.45;
      canvas.setAttribute('width', canvasWidth);
      canvas.setAttribute('height', canvasHeight);
      canvas.style.marginTop = '10px';
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0)';
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fill();
      ctx.lineWidth = 0;
      ctx.arc(screen.availWidth * 0.225, screen.availWidth * 0.225, screen.availWidth * 0.225, 0, Math.PI * 2);
      ctx.stroke();
      waves.appendChild(canvas);
      waveImage = new Image();
      waveImage.onload = () => {
        waveImage.onload = null;
      };
      waveImage.src = require('../../assets/img/wavess.png');
    }
    init();
    function animate() {
      const per = initval / 100;
      let waveX = 0;
      let waveY = 0;
      const waveXmin = -204;
      const waveYmax = canvasHeight * per;
      console.log(`wavefilter.js--animate()--per:${per}`);
      const requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
      // function(callback) {
      // window.setTimeout(callback, 1000 / 60);
      // };
      function loop() {
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
      }
      loop();
    }

    function start(val) {
      initval = val;
      if (!ctx) return init(start);
      needAnimate = true;
      setTimeout(() => {
        if (needAnimate) animate();
      }, 500);
      // return '';
    }
    function stop() {
      needAnimate = false;
    }
    return {
      start,
      stop
    };
  };
}

export default install;
