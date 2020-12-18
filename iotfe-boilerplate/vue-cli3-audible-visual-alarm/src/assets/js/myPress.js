const myPress = {};

// eslint-disable-next-line
function press(Vue, options) {
  // console.log(options);
  Vue.directive('myPress', {
    // 当被绑定的元素插入到 DOM 中时……
    bind(el, binding) {
      // 绑定元素
      el.addEventListener('touchstart', event => {
        event.stopPropagation();
        this.startTime = Date.now();
        this.endTime = 0;
        this.timer = setTimeout(() => {
          if (!this.endTime || this.endTime - this.startTime >= 1000) {
            // console.log(binding);
            binding.value();
          }
        }, 1500);
      });

      el.addEventListener('touchend', () => {
        this.endTime = Date.now();
        if (this.timer) {
          window.clearTimeout(this.timer);
        }
      });
    },
  });
}

myPress.install = press;

export default myPress;
