<template>
  <!-- 底部按钮 -->
  <gree-toolbar position="bottom" no-hairline class="bottom-btn">
    <!-- 开关机键 -->
    <div class="bottom-pow-view" @click="changePow" :style="{ backgroundImage: 'url(' + powBg + ')' }">
      <img :src="require('../assets/img/pow.png')" alt="" v-show="Pow" />
      <div class="ripple" v-show="!Pow" />
    </div>
    <!-- 其他按钮 -->
    <div class="bottom-fun-view">
      <div
        class="bottom-fun"
        v-for="(btn, index) in FootList"
        :key="index"
        :class="{
          'set-active': btn.active,
          'set-gray': btn.gray,
          'set-hide': btn.hide
        }"
        @click="handleClickBtn(btn)"
      >
        <!-- 底部功能显示控制(坑爹UI, 不切svg，只切png, 此处作废) -->
        <!-- <span class="iconfont" :class="`icon-${btn.icon}`"></span> -->

        <img :src="[require(`../assets/img/${btn.icon}_${btn.imgSatus}.png`)]" />
        <p>{{ btn.name }}</p>
      </div>
    </div>
  </gree-toolbar>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { Block, Icon, ToolBar } from 'gree-ui';
// import config from '../api/60a0/home';
import home from '../mixins/config/60a0/home';
import { showToast } from '../../../static/lib/PluginInterface.promise';

export default {
  name: 'BottomBtn',
  components: {
    [Block.name]: Block,
    [Icon.name]: Icon,
    [ToolBar.name]: ToolBar
  },
  mixins: [home],
  data() {
    return {
      // : 0
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      Pow: state => state.dataObject.Pow,
      Inloop: state => state.dataObject.Inloop,
      RunMod: state => state.dataObject.RunMod
    }),

    // 底部功能显示控制(坑爹UI, 不切svg，只切png, 此处作废)
    btnList() {
      config.FootList.forEach((item, index) => {
        const isActive = item.active_arr.find(ele => {
          const key = ele.split('_')[0];
          const value = ele.split('_')[1] >> 0;
          return this.dataObject[key] == value;
        });
        config.FootList[index].active = !!isActive;

        const isGray = item.gray_arr.find(ele => {
          const key = ele.split('_')[0];
          const value = ele.split('_')[1] >> 0;
          return this.dataObject[key] == value;
        });
        config.FootList[index].gray = !!isGray;
      });
      return config.FootList;
    },
    // 开关机背景
    powBg() {
      return require(`@/assets/img/pow-${this.Pow ? 'on' : 'off'}.png`);
    }
  },
  mounted() {},
  methods: {
    ...mapMutations({
      setDataObj: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    changePow(item) {
      const sendObj = { Pow: !this.Pow - 0 };
      this.setDataObj(sendObj);
      this.sendCtrl(sendObj);
    },

    handleClickBtn(item) {
      switch (item.actionType) {
        case 'send':
          if (!this.Pow) {
            showToast('请先开机');
            return;
          }
          const sendObj = { Inloop: !this.Inloop + 0 };
          sendObj.RunMod = this.RunMod > 4 ? 1 : 5;
          this.setDataObj(sendObj);
          this.sendCtrl(sendObj);
          break;
        case 'popup':
          if (!this.Pow) {
            showToast('请先开机');
            return;
          }
          this.$emit('btn-popup', item.key);
          break;
        case 'route':
          this.$emit('to-new-page', item.key);
          break;
        default:
          break;
      }
    }
  }
};
</script>
