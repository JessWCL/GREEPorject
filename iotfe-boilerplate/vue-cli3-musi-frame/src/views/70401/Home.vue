<!--
 * @Author: Jerry-Rain
 * @Date: 2019-09-10 15:34:25
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-09-14 14:55:21
 * @Description: 这个项目没上架就凉了 
 -->
<template>
  <gree-view>
    <gree-page no-navbar class="page-home" bg-color="#0C83E9">
      <!-- 头部 -->
      <div
        class="page-header"
        :style="{ backgroundImage: 'url(' + head_bg + ')' }"
      >
        <gree-header
          theme="transparent"
          :left-options="{ preventGoBack: true }"
          :right-options="{ showMore: true }"
          @on-click-back="goBack"
          @on-click-more="moreInfo"
          v-show="!functype"
          >{{ devname }}</gree-header
        >
        <div class="mod-ctrl">
          <Carousel
            ref="cycleCarousel"
            @currentChange="setMod"
            :prop-data="cycleData"
            :options="rotateOptions"
          />
          <span class="mod-text">{{ cycleAngle }}</span>
        </div>
        <gree-header
          theme="transparent"
          :left-options="{ preventGoBack: true }"
          @on-click-back="goBack"
          v-show="functype"
          >
          <a
            slot="right"
            @click="sceneSave"
          >保存</a>
          {{ devname }}</gree-header
        >
      </div>
      <div class="page-main">
        <!-- <div class="mod-ctrl">
          <Carousel
            ref="cycleCarousel"
            @currentChange="setMod"
            :prop-data="cycleData"
            :options="rotateOptions"
          />
          <span class="mod-text">{{ cycleAngle }}</span>
        </div> -->
        <div class="ctrl-board" v-if="!functype">
          <!-- 居中内容提示 -->
          <gree-row>背部调节</gree-row>
          <gree-row>
            <img :src="backValue === 1 ? images.downOn : images.downOff" @click="backCtrl('down')"/>
            <img :src="backValue === 3 ? images.pauseOn : images.pauseOff" @click="backCtrl('pause')"/>
            <img :src="backValue === 2 ? images.upOn : images.upOff" @click="backCtrl('up')"/>
          </gree-row>
          <gree-row>腿部调节</gree-row>
          <gree-row>
            <img :src="legValue === 1 ? images.downOn : images.downOff" @click="legCtrl('down')"/>
            <img :src="legValue === 3 ? images.pauseOn : images.pauseOff" @click="legCtrl('pause')"/>
            <img :src="legValue === 2 ? images.upOn : images.upOff" @click="legCtrl('up')"/>
          </gree-row>
        </div>
      </div>
      <!-- 尾部 -->
      <!-- <div class="page-footer">
        <div class="item" v-for="(item, index) in functionList" :key="index">
          <img :src="item.url" @click="footerFunction(index)" />
          <span>{{ item.name }}</span>
        </div>
      </div> -->
      <!-- drawer pop弹框 -->
      <gree-popup v-model="showDrawer" position="bottom">
        <div class="drawer-area">
          <gree-row>
            <img :src="images.pulldown" @click="pullDown()"/>
          </gree-row>
          <div class="control" v-for="(item, index) in controlList" :key="index">
            <gree-row>{{item.title}}</gree-row>
            <gree-row>
              <van-slider
                v-model="value[index]"
                :min="1"
                :max="3"
                :step="1"
                id="slider"
              >
                <img slot="button" :src="images.select" class="select" />
              </van-slider>
            </gree-row>
            <gree-row>
              <gree-col :style="{color:(value[index] === 1 ? '#404657' : '#9FA1A8')}">低</gree-col>
              <gree-col :style="{color:(value[index] === 2 ? '#404657' : '#9FA1A8')}">中</gree-col>
              <gree-col :style="{color:(value[index] === 3 ? '#404657' : '#9FA1A8')}">高</gree-col>
            </gree-row>
          </div>
        </div>
      </gree-popup>
    </gree-page>
    <div v-show="false">{{Mod}}</div>
  </gree-view>
</template>

<script>
import { Header, PowerOff, Popup, Row, Col } from 'gree-ui'
import { mapState, mapMutations, mapActions } from 'vuex'
import {
  closePage,
  editDevice,
  getCCcmd
} from '@/../../static/lib/PluginInterface.promise'
import modConfig from '@/mixins/config/70401/mod-config.mixin'
import homeConfig from '@/mixins/config/70401/home.js' // home 配置文件
import Drawer from '@/component/Drawer'
import Carousel from '@/component/Carousel'

export default {
  components: {
    [Header.name]: Header,
    [PowerOff.name]: PowerOff,
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
    Drawer,
    Carousel
  },
  mixins: [homeConfig, modConfig],
  data() {
    return {
      value: [1,2,3],
      images: {
        downOff: require('@/assets/img/downOff.png'),
        upOff: require('@/assets/img/upOff.png'),
        pauseOff: require('@/assets/img/pauseOff.png'),
        downOn: require('@/assets/img/downOn.png'),
        upOn: require('@/assets/img/upOn.png'),
        pauseOn: require('@/assets/img/pauseOn.png'),
        pulldown: require('@/assets/img/ic_pulldown.png'),
        select: require('@/assets/img/select.png')
      },
      showDrawer: false,
      cycleAngle: '',
      controlList: [{title: '轻微震动按摩'},{title: '敲击震动按摩'},{title: '波浪式交替按摩'}],
      backValue: 0,
      legValue: 0,
      Mod: 1,
    }
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
    }),
    

    head_bg() {
      const bg = require('@/assets/img/bg_header_on.png')
      return bg
    }
  },
  watch: {
    value(newv){
      console.log('现在的值是： ',newv);
      // this.setDataObject({  })
    },
    Mod: {
      immediate: true,
      handler(newv){
      this.$nextTick(() => {
        this.$refs.cycleCarousel.setId(newv);
      });
      this.cycleAngle = this.angleAll[newv];
      return newv;
      }
    },
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    backCtrl(type){
      switch (type) {
        case 'down':
          this.backValue = 1
          break;
        case 'up':
          this.backValue = 2
          break;
        case 'pause':
          this.backValue = 3      
          break;
        default:
          this.backValue = 3
          break;
      }
      console.log('背部 ---',this.backValue);
      this.setDataObject({ ActType: 2, ActValue: this.backValue })
      this.sendCtrl({ ActType: 2, ActValue: this.backValue })
    },
    legCtrl(type){
      switch (type) {
        case 'down':
          this.legValue = 1
          break;
        case 'up':
          this.legValue = 2
          break;
        case 'pause':
          this.legValue = 3      
          break;
        default:
          this.legValue = 3
          break;
      }
      console.log('腿部 ---',this.legValue);
      this.setDataObject({ ActType: 3, ActValue: this.legValue })
      this.sendCtrl({ ActType: 3, ActValue: this.legValue })
    },
    setMod(val) {
      console.log('模式 --- ',val);
      this.Mod = val
      this.setDataObject({ ActType: 1, ActValue: this.Mod }); // 更新state状态
      this.sendCtrl({ ActType: 1, ActValue: this.Mod })
    },
    pullDown(){
      this.showDrawer = false
    },
    /**
     * @description 返回键
     */
    goBack() {
      closePage()
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevice(this.mac)
    },
    /**
     * @description 隐藏抽屉列表
     */
    hideDrawer() {
      this.showDrawer = false
    },
    /**
     * @description: 底部功能按钮的点击事件
     */
    footerFunction(index) {
      console.log('btnfunc-', index)
      switch (index) {
        case 0:
          this.showDrawer = true
          break
        default:
          break
      }
    },
    sceneSave() {
      const keys = Object.keys(this.dataObject);
      const opt = [];
      const p = [];
      const remarks = '...';
      for (let i = 0, j = keys.length; i < j; i += 1) {
        opt.push(keys[i]);
        p.push(this.dataObject[keys[i]]);
      }
      const json = JSON.stringify({ opt, p, t: 'cmd' });
      getCCcmd(this.mac, json, remarks, JSON.stringify(p));
    },
  }
}
</script>
