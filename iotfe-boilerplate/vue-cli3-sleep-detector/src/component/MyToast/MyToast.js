import Vue from 'vue';
import ToastOptions from './MyToast.vue';

const MyToast = function ({
  content = '',
  duration = 2000,
  position = 'center',
  hasMask = true,
  parentNode = document.body,
}) {
  let vm = MyToast._instance;

  if (!vm) {
    const ToastConstructor = Vue.extend(ToastOptions);
    MyToast._instance = new ToastConstructor({
      propsData: {
        content,
        duration,
        position,
        hasMask,
      }
    }).$mount();
    vm = MyToast._instance;
  }

  if (!vm.$el.parentNode) {
    parentNode.appendChild(vm.$el);
  }

  vm.content = content;
  vm.duration = duration;
  vm.position = position;
  vm.hasMask = hasMask;
  vm.show();

  return vm;
};

MyToast._instance = null;

MyToast.hide = function () {
  if (MyToast._instance && MyToast._instance.visible) {
    MyToast._instance.hide();
  }
};

MyToast.show = function () {
  if (MyToast._instance && !MyToast._instance.visible) {
    MyToast._instance.show();
  }
};

MyToast.component = ToastOptions;

export default MyToast;
