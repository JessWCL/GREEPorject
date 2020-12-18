/**
 * Jerry
 * press 长按 参数：长按时长毫秒
 * tap 点击事件
 */
const myGesture = {};

// eslint-disable-next-line
function gestrue(Vue, options) {
  let timeCounter = 0; // 定时器计数
  let isLong = false; // 长按标志位

  console.log(options);
  Vue.directive('press', {
    // 当被绑定的元素插入到 DOM 中时……
    bind(el, binding, vNode) {
      let pressTime = ~~binding.arg; // 长按时长 毫秒
      if (!pressTime) { pressTime = 1000; } // 初始化默认长按时长

      console.log(pressTime);
      console.log(binding);
      // 确保提供的表达式是函数
      if (typeof binding.value !== 'function') {
        // 获取组件名称
        const compName = vNode.context.name;
        // 将警告传递给控制台
        let error = `[longpress:] provided expression '${binding.expression}' is not a function`;
        if (compName) {
          error += `Found in component '${compName}' `;
        }
        console.error(error);
      }

      el.addEventListener('touchstart', (event) => {
        isLong = false;
        timeCounter = setTimeout(() => {
          console.log("长按事件");
          isLong = true;
          binding.value();
        }, pressTime);
      });

      el.addEventListener('touchend', (event) => {
        clearInterval(timeCounter);
      });

      // // 绑定元素
      // el.addEventListener('touchstart', function (event) {
      //   event.stopPropagation();
      //   this.startTime = Date.now();
      //   this.endTime = 0;
      //   this.timer = setTimeout(() => {
      //     if (!this.endTime || this.endTime - this.startTime >= 1000) {
      //       console.log(binding);
      //       binding.value();
      //     }
      //   }, ~~binding.arg);
      // });

      // el.addEventListener('touchend', function () {
      //   this.endTime = Date.now();
      //   if (this.timer) {
      //     window.clearTimeout(this.timer);
      //   }
      // });
    }
  });
  Vue.directive('tap', {
    // 当被绑定的元素插入到 DOM 中时……
    bind(el, binding, vNode) {
      // 确保提供的表达式是函数
      if (typeof binding.value !== 'function') {
        // 获取组件名称
        const compName = vNode.context.name;
        // 将警告传递给控制台
        let error = `[longpress:] provided expression '${binding.expression}' is not a function`;
        if (compName) {
          error += `Found in component '${compName}' `;
        }
        console.error(error);
      }

      el.addEventListener('touchstart', (event) => {
      });

      el.addEventListener('touchend', (event) => {
        if (isLong == false) {
          console.log('点击事件');
          binding.value();
        }
      });

      // 绑定元素
      // el.addEventListener('touchstart', function (event) {
      //   event.stopPropagation();
      //   this.startTime = Date.now();
      //   this.endTime = 0;
      // });

      // el.addEventListener('touchend', function () {
      //   this.endTime = Date.now();
      //   if (this.endTime - this.startTime < 500) {
      //     binding.value()
      //   }
      // });
    }
  });
}

myGesture.install = gestrue;

export { myGesture };
