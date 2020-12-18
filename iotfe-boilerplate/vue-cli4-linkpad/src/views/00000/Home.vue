<template>
  <gree-view :bg-color="statusBarColor">
    <gree-page no-navbar class="page-home">
      <div class="page-header" :style="{ backgroundImage: 'url(' + head_bg + ')' }">
        <gree-header
          :title="devname"
          :left-options="{ preventGoBack: true }"
          @on-click-back="goBack"
          :right-options="{ showMore: !functype }"
          @on-click-more="moreInfo"
        />
      </div>
      <div class="page-main">
        <gree-block>
          <gree-row>
            <gree-col
              width="50"
              v-for="(item, index) in ApiHomeData.BtnList"
              :key="index"
              @click.native="onClick(index)"
            >
              <gree-card>
                <gree-image :src="require(`@/assets/img/${item.ImgName}.png`)" />
                <h3>{{ $language(item.Name) }}</h3>
              </gree-card>
            </gree-col>
          </gree-row>
        </gree-block>
      </div>
      <div v-show="false">{{ ColorChange }}</div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Block, Row, Col, Card, Image } from 'gree-ui';
import { mapState, mapMutations } from 'vuex';
import homeConfig from '@/mixins/config/00000/home';
import { closePage, editDevice, changeBarColor } from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [Block.name]: Block,
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card,
    [Image.name]: Image
  },
  mixins: [homeConfig],
  data() {
    return {
      statusBarColor: '#ECE9E7'
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac
    }),
    head_bg() {
      return require('@/assets/img/bg-home.png');
    },
    /**
     * @description 主页面下更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      if (this.$route.name === 'Home') {
        color = this.statusBarColor;
      }
      color ? changeBarColor(color) : '';
      return color;
    }
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
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
     * @description 点击卡片按钮
     */
    onClick(index) {
      const routers = ['Settings', 'Device', 'Message', 'CentralAirConditioner'];
      this.$router.push({ name: routers[index] });
    }
  }
};
</script>
