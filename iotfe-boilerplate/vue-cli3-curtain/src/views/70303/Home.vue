<!--
 * @Author: Jerry-Rain
 * @Date: 2019-09-10 15:34:25
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2019-09-30 14:44:36
 * @Description: 继承强哥的意志-写一个快速开始的101模板
 -->  
<template>
  <gree-view>
    <gree-page
      no-navbar
      class="page-home"
    >
      <div
        class="page-header"
        :style="{backgroundImage:'url(' + head_bg + ')'}"
      >
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          :right-options="{showMore: true}"
          @on-click-back="goBack"
          @on-click-more="moreInfo"
        >
          {{ devname }}
          </gree-dropdown>
        </gree-header>  
        <div class="curtainZoom">
        <div class="curtainHead">
          <img class="imgHead" :src='curtainImg.head'>
        </div>
        <div class="curtainPic">
          <img class="imgleft" :src='curtainImg.left'>
          <div class="curtainControl"></div>
          <img class="imgRignt" :src='curtainImg.right'>
        </div>
        </div>
      </div>
      <div class="page-main">
        <!-- 居中内容提示 -->
        <div class="controlBtn">
          <img :src="curtainControl == 0 ? curtainImg.openOn : curtainImg.openOff" @click="curtainControlFunction(0)">
          <img :src="curtainControl == 1 ? curtainImg.stopOn : curtainImg.stopOff" @click="curtainControlFunction(1)">
          <img :src="curtainControl == 2 ? curtainImg.closeOn : curtainImg.closeOff" @click="curtainControlFunction(2)">
        </div>
      </div>
      <div class="page-footer">
        <div class="item" v-for="(item, index) in functionList" :key="index"><img :src="item.url" @click="footerFunction(index)"/><span>{{item.name}}</span></div>
      </div>
    </gree-page>
    
    <router-view></router-view>
    <router-link to="/Home/Pop"></router-link>
  </gree-view>
  
</template>

<script>
import {
  Header,
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  closePage,
  editDevice,
} from '../../../../static/lib/PluginInterface.promise';
import homeConfig from '../../mixins/config/70303/home.js'; //home 配置文件

export default {
  components: {
    [Header.name]: Header,
  },
  mixins: [homeConfig],
  data() {
    return {
      curtainControl: 0,
      curtainImg: {
        head: require('@/assets/img/curtain_head.png'),
        left: require('@/assets/img/curtain_left.png'),
        right: require('@/assets/img/curtain_right.png'),
        openOn: require('@/assets/img/open_on.png'),
        openOff: require('@/assets/img/open_off.png'),
        closeOn: require('@/assets/img/close_on.png'),
        closeOff: require('@/assets/img/close_off.png'),
        stopOn: require('@/assets/img/stop_on.png'),
        stopOff: require('@/assets/img/stop_off.png'),
      }
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
    }),
    head_bg() {
      // if(){ 
      // }
      const bg = require('@/assets/img/bg_header_on.png');
      return bg;
    },
    power_off_bg() {
      const bg = require('@/assets/img/bg_off.png');
      return bg;
    },
  },
  watch: {
  },
  created() {
  },
  mounted() {
    this.curtainControl = 0;
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    /**
     * @description 返回键
     */
    goBack() {
      closePage();
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevice(this.mac);
    },
    /**
     * @description: 底部功能按钮的点击事件
     */    
    footerFunction(index){
      console.log('index',index);
      switch (index) {
        case 0:
          this.$router.push({ path: '/Timer' }) 
          break;
        case 1: this.$router.push({ path: '/Home/Pop'});break;
        case 2: break;
        default: break;
      }
    },
    curtainControlFunction(type){
      this.curtainControl = type
    }
  }
};
</script>

<style lang="scss" scoped>
// 样式在home.scss
</style>
