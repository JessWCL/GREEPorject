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
          @on-click-back="goBack"
          :right-options="{showMore: true}"
          @on-click-more="moreInfo"
        >{{ devname }}</gree-header>
        <div class="body-content">
          <div 
            class="body-block" 
            :class="{'body-content-box': index === 5}"
            v-for="(item,index) in lists" 
            :key="index" 
            @click="control(index)"
            :style="{backgroundImage:'url(' + item.img + ')'}">
            <!-- <span>上翻门</span> -->
          </div>
        </div>
        <div class="body-confirm"/>
      </div>
      <!-- 中间及下面 -->
      <!-- <div class="page-main">
      </div> -->
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Toast } from 'gree-ui';
import { mapState, mapActions } from 'vuex';
// closePage,
// editDevice,
// changeBarColor,
import { closePagePlugin } from '../../api/utils';

export default {
  components: {
    [Header.name]: Header,
    [Toast.name]: Toast
  },
  data() {
    return {
      lists: [
        {
          name: '上翻门',
          img: require('@/assets/img/ui-out-1118-01.png'),
          status: false // 默认关闭
        },
        {
          name: '上翻门',
          img: require('@/assets/img/ui-out-1118-02.png'),
          status: false // 默认关闭
        },
        {
          name: '上翻门',
          img: require('@/assets/img/ui-out-1118-03.png'),
          status: false // 默认关闭
        },
        {
          name: '未来窗',
          img: require('@/assets/img/ui-out-1118-04.png'),
          status: false // 默认关闭
        },
        {
          name: '高深拉蓝',
          img: require('@/assets/img/ui-out-1118-05.png'),
          status: false // 默认关闭
        },
        {
          name: '中岛台',
          img: require('@/assets/img/ui-out-1118-06.png'),
          status: false // 默认关闭
        },
        {
          name: '未来窗',
          img: require('@/assets/img/ui-out-1118-07.png'),
          status: false // 默认关闭
        }
      ]
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name
    }),
    /**
     * @description 主页面下根据开关状态更新背景图
     */
    head_bg() {
      return require('@/assets/img/background.png');
    }
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    /**
     * @description 返回键
     */
    goBack() {
      closePagePlugin();
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      // tuyaDeviceMorePlugin(this.mac);
      Toast.info('该功能暂时未开放！');
    },
    control(index) {
      this.lists[index].status = !this.lists[index].status;
      this.sendCtrl({ itemNo: index, state: this.lists[index].status });
    }
  }
};
</script>
