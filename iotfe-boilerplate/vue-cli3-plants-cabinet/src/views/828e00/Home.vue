<!--
 * @Author: Jerry-Rain
 * @Date: 2019-09-10 15:34:25
 * @LastEditors: Feng
 * @LastEditTime: 2019-12-05 10:07:13
 * @Description: 继承强哥的意志-写一个快速开始的101模板
 -->
<template>
  <gree-view>
    <gree-page
      class="page-home"
    >
      <!-- 通用header -->
      <common-header />
      <!-- home-page header -->
      <div class="page-header" >
        <!-- tab 植物类别 -->
        <gree-tab-bar
          class="tab-bar"
          v-model="currentTab"
          :items="tabItems"
          :hasInk="false"
          @change="tabChangeByUser"
        ></gree-tab-bar>
        <!-- 跟随 currentTab 改变的内容 -->
        <div class="page-header-content" :style="{backgroundImage:'url(' + imgAssets.head_bg + ')'}" >
          <!-- <plant-swiper :currentTab="currentTab" ></plant-swiper> -->
          <component v-bind:is="tabContent" :currentTab="currentTab" ></component>
        </div>
      </div>
      <div class="page-main">
        <!-- 居中内容提示 -->
        <HomeMainContent></HomeMainContent>
      </div>
      <!-- 页脚 -->
      <div class="page-footer">
        <div class="item" v-for="(item, index) in functionList" :key="index">
          <img :src="item.url" @click="footerFunction(index)"/>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </gree-page>
    
    <!-- /home/ >>> children -->
    <router-view ></router-view>
  </gree-view>
</template>

<script>
import {
  Header,
  TabBar,
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { plantsList } from '@/assets/js/plants-data.js'; // 植物默认配置表
import {
  closePage,
  editDevice,
} from '../../../../static/lib/PluginInterface.promise';
import homeConfig from '../../mixins/config/828e00/home.js'; // home 配置文件
import CommonHeader from './component/CommonHeader.vue';
// import PlantSwiper from './component/PlantSwiper.vue';
import Tab1Content from './component/tabGroup/Tab1-content.vue';
import Tab2Content from './component/tabGroup/Tab2-content.vue';
import Tab3Content from './component/tabGroup/Tab3-content.vue';
import Tab4Content from './component/tabGroup/Tab4-content.vue';
import HomeMainContent from './component/Home-main-content.vue';

const imgAssets = {
  head_bg: require('@/assets/img/bg_header_on.png'),
  power_off_bg: require('@/assets/img/bg_off.png'),
};

export default {
  components: {
    [Header.name]: Header,
    [TabBar.name]: TabBar,
    CommonHeader,
    HomeMainContent,
  },
  mixins: [homeConfig],
  data() {
    return {
      imgAssets,
      currentTab: 0,
      functionList: [
        {
          url: require('../../assets/img/plants.png'),
          name: '植物'
        },
        {
          url: require('../../assets/img/function.png'),
          name: '高级'
        },  
      ],
    };
  },
  computed: {
    ...mapState({
      mac: state => state.mac,
      functype: state => state.functype,
      devname: state => state.deviceInfo.name,
      dataObject: state => state.dataObject,
      PltType: state => state.dataObject.PltType,
    }),
    head_bg() {
      const bg = require('@/assets/img/bg_header_on.png');
      return bg;
    },
    tabItems() {
      const arr = [];
      plantsList.forEach((el, i) => {
        arr.push({
          name: i,
          label: el.species,
        });
      });
      return arr;
    },
    tabContent() {
      const tabSwiperArr = [Tab1Content, Tab2Content, Tab3Content, Tab4Content];
      const index = this.currentTab;
      return tabSwiperArr[index];
    },
  },
  watch: {
    PltType(newVal, oldVal) {
      // 根据PltType变化设置tab栏
      // console.log('PltType: ', newVal);
      if (newVal !== oldVal) {
        plantsList.forEach((el, i) => {
          el.children.forEach(item => {
            if (item.PltType === newVal) {
              this.currentTab = i;
            }
          });
        });
      }
    },
  },
  created() {
    this.currentTabInit();
  },
  mounted() {
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
    footerFunction(index) {
      console.log('footerFunction index: ', index);
      switch (index) {
        case 0: this.$router.push({ path: '/Home/plantslist'}); break;
        case 1: this.$router.push({ path: '/Home/functionlist'}); break;
        default: break;
      }
    },
    // 初始化currentTab
    
    currentTabInit() {
      const PltType = this.PltType;
      plantsList.forEach((el, i) => {
        el.children.forEach(item => {
          if (item.PltType === PltType) {
            this.currentTab = i;
          }
        });
      });
    },
    // tab栏由用户在界面上切换
    tabChangeByUser(item, index, prevIndex) {
      console.log('tabChangeByUser: ', item, index, prevIndex);
      const PltType = plantsList[index].children[0].PltType; 
      this.setDataObject({
        PltType,
      });
      this.sendCtrl({PltType, });
    },
  }
};
</script>

<style lang="scss" scoped>
// 样式在src/assets/scss/home.scss

.tab-bar {
  padding: 0;
  height: 120px;
  box-shadow: 0px 2px 2px 1px rgba(0,0,0,.5);
  /deep/ .gree-tab-bar-list {
    .gree-tab-bar-item {
      background-color: #325d00;
      color: rgba(255, 255, 255, .6);
      font-size: 45px;
      border-right: 1px solid rgba(255,255,255,.1);
      height: 120px;
      padding: 0;
      // font-family: 'FZLTH--GB1-4';
      &.is-active {
        background-color: #00aeff;
        color: #fff;
      }
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
</style>
