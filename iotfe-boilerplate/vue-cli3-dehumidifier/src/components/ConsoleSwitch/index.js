import vconsole from 'vconsole';
import ConsoleSwitch from './ConsoleSwitch.vue';


function install(_Vue) {
  const Vue = _Vue;
  const consoleSwitchCtor = Vue.extend(ConsoleSwitch);
  const consoleSwitchInstance = new consoleSwitchCtor();
  consoleSwitchInstance.$mount();
  const vConsole = new vconsole();
  document.body.appendChild(consoleSwitchInstance.$el);
}

export default install;
