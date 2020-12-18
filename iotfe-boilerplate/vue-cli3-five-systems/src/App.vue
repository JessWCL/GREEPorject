<template>
  <div id="app" :class="{
    appBG: envInDev && isFiveSystem,
    appBG2: routeName === 'getup',
    appBG3: routeName === 'sleep' || routeName === 'sleep-report',
  }"
  >
    <!-- 测试框架 -->
    <nav class="nav" v-if="envInDev">
      <router-link to="/home">Home</router-link> |
      <router-link to="/health">Health</router-link> |
      <router-link to="/air">Air</router-link> |
      <router-link to="/energy">Energy</router-link> |
      <router-link to="/illumination">Illumination</router-link> |
      <router-link to="/getup">Getup</router-link> |
      <router-link to="/sleep">Sleep</router-link> |
      <router-link to="/sleep-report">Sleep-Report</router-link>
    </nav>
    <div class="app-content" v-if="envInDev">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    
    <router-view v-if="env === 'production' "></router-view>

    <div class="test-log" v-if="envInDev" >
      {{ log }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import myFunc from './utils/myFunc.js';

export default {
  name: 'App',
  data() {
    return {
      env: process.env.NODE_ENV,
      timer_getData: null,
      log: [],
    };
  },
  computed: {
    routeName() {
      let name = 'home';
      if (this.$route.name) {
        name = this.$route.name.toLowerCase();
      }
      return name;
    },
    envInDev() {
      if (this.env === 'development' || this.env === 'testing') return true;
      return false;
    },
    isFiveSystem() {
      if (this.routeName === 'getup' || this.routeName === 'sleep' || this.routeName === 'sleep-report') {
        return false;
      }
      return true;
    },
  },
  created() {
    console.log(this.env);
    // this.getDataPollingInit();
  },
  mounted() {
    this.mountedInit();
  },
  beforeDestroy() {
    this.timerDestroy();
  },
  methods: {
    ...mapActions({
      getFiveSystemData: 'getFiveSystemData',
    }),
    mountedInit() {
      // 获取html名字
      const htmlName = window.htmlName;
      this.log.push(htmlName);
    },
    // 开始轮询数据
    /* getDataPollingInit() {
      const htmlName = window.htmlName;
      // 调用接口测试
      this.getFiveSystemData(htmlName).then(res => {
        console.log('App.vue ');
        console.log(res);
        this.log.push(res);
      });
      this.timer_getData = window.setInterval(() => {
        this.getFiveSystemData(htmlName).then(res => {
          console.log('App.vue ');
          console.log(res);
          console.log(JSON.parse(res));
          this.log.push(res);
        });
      }, 5000);
    }, */
    // Timer销毁
    timerDestroy() {
      this.timer_getData && window.clearInterval(this.timer_getData);
      this.timer_getData = 0;
    },
  },
};
</script>

<style lang="scss">
// 全局css样式设定
* {
  box-sizing: border-box;
}
#app {
  background-size: cover;
  background-color: transparent;
  height: 100%;
  font-size: 26px;
  color: #000;
}
#app.appBG {
  background: transparent url('./assets/img/img_bg.png') no-repeat center top;
  background-size: cover;
}
#app.appBG2 {
  background: transparent url('./assets/img/bg_morning.png') no-repeat center top;
  background-size: cover;
}
#app.appBG3 {
  background: transparent url('./assets/img/img3_bg.png') no-repeat center top;
  background-size: cover;
}
.page-section {
  height: 886px;
  border: 1px solid rgba(255,255,255,.1);
  box-sizing: border-box;
  border-radius: 15px;
  // background-color: rgba(255,255,255,.3);
  background-color: #cdc5ff22;
  overflow: auto;
}
</style>

<style lang="scss" scoped>
  .test-log {
    position: absolute;
    overflow-y: auto;
    width: 400px;
    height: 100px;
    max-height: 200px;
    z-index: 9;
    top: 0;
    left: 0;
    word-break: break-all;
    color: #999;
    font-size: 24px;
    background: rgba(255,255,255, .1);
    border: 1px solid #ccc;
  }
  .nav {
    height: 135px;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    box-sizing: border-box;
    // cursor: grab;
    // background-color: rgba(0,0,0,.25);
    padding: 20px;
    border: 1px solid #ccc;
    color: #999;
    a {
      outline: none;
      text-decoration: none;
      color: #999;
    }
  }
  .app-content {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 135px);
    padding: 0 46px;  
  }
</style>
