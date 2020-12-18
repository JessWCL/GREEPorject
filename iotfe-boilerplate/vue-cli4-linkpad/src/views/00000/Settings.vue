<template>
  <gree-view :bg-color="statusBarColor">
    <gree-page no-navbar class="page-settings">
      <div class="page-header" :style="{ backgroundImage: 'url(' + head_bg + ')' }">
        <gree-header :right-options="{ showMore: !functype }" @on-click-more="moreInfo">按键设置</gree-header>
      </div>
      <div class="page-main">
        <gree-block>
          <gree-block-header>{{ $language('settings.title') }}</gree-block-header>
          <gree-row>
            <gree-col
              width="33"
              v-for="(item, index) in ApiSettingsData.BtnList"
              :key="index"
              @click.native="onClick(index)"
            >
              <gree-card>
                <gree-image :src="require(`@/assets/img/indicator-light.png`)" />
                <h3>{{ item.Name }}</h3>
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
import { Header, Block, BlockHeader, Row, Col, Card, Image } from 'gree-ui';
import { mapState, mapMutations } from 'vuex';
import settingsConfig from '@/mixins/config/00000/settings';
import { editDevice, changeBarColor } from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [Block.name]: Block,
    [BlockHeader.name]: BlockHeader,
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card,
    [Image.name]: Image
  },
  mixins: [settingsConfig],
  data() {
    return {
      statusBarColor: '#E0DFDD'
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
      return require('@/assets/img/bg-settings.png');
    },
    /**
     * @description 主页面下更新状态栏颜色
     */
    ColorChange() {
      let color = false;
      if (this.$route.name === 'Settings') {
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
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevice(this.mac);
    },
    /**
     * @description 点击卡片按钮
     */
    onClick(index) {
      console.log(index);
    }
  }
};
</script>
