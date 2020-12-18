<template>
  <gree-view bg-color="#F4F5F5">
    <!-- 头部 -->
    <gree-header
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
      :right-options="{showMore: true}"
      @on-click-more="moreInfo"
    >选择模块</gree-header>
    <gree-page
      no-navbar
      class="page-parameterQuery"
    >
      <!-- 列表 -->
      <gree-list>
        <gree-list-item
          link
          title="模块1"
          v-if="as1[0]"
          :text="handleModuleStatus(as1[0][9])"
          @click.native="routerTo(0)"
        >
        </gree-list-item>
        <gree-list-item
          link
          title="模块2"
          v-if="as1[1]"
          :text="handleModuleStatus(as1[1][9])"
          @click.native="routerTo(1)"
        >
        </gree-list-item>
        <gree-list-item
          link
          title="模块3"
          v-if="as2[0]"
          :text="handleModuleStatus(as2[0][9])"
          @click.native="routerTo(2)"
        >
        </gree-list-item>
        <gree-list-item
          link
          title="模块4"
          v-if="as2[1]"
          :text="handleModuleStatus(as2[1][9])"
          @click.native="routerTo(3)"
        >
        </gree-list-item>
        <gree-list-item
          link
          title="模块5"
          v-if="as2[2]"
          :text="handleModuleStatus(as2[2][9])"
          @click.native="routerTo(4)"
        >
        </gree-list-item>
        <gree-list-item
          link
          title="模块6"
          v-if="as3[0]"
          :text="handleModuleStatus(as3[0][9])"
          @click.native="routerTo(5)"
        >
        </gree-list-item>
        <gree-list-item
          link
          title="模块7"
          v-if="as3[1]"
          :text="handleModuleStatus(as3[1][9])"
          @click.native="routerTo(6)"
        >
        </gree-list-item>
        <gree-list-item
          link
          title="模块8"
          v-if="as3[2]"
          :text="handleModuleStatus(as3[2][9])"
          @click.native="routerTo(7)"
        >
        </gree-list-item>
      </gree-list>
    </gree-page>
  </gree-view>
</template> 

<script>
import { Header, List, Item, Icon } from 'gree-ui';
import { editDevicePlugin, showToastPlugin } from '../api/utils';
import { mapState, mapActions } from 'vuex';
import { changeBarColorPlugin } from '../api/utils';

export default {
  components: {
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    [Icon.name]: Icon,
  },
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    ...mapState({
      as1: state => state.dataObject.as1,
      as2: state => state.dataObject.as2,
      as3: state => state.dataObject.as3,
      mac: state => state.mac,
    })
  },
  mounted() {
    console.log('mounted');
    changeBarColorPlugin('#F4F5F5');
    this.queryModules(1);
    this.queryModules(2);
    this.queryModules(3);
    this.timer = setInterval(() => {
      this.queryModules(1);
      this.queryModules(2);
      this.queryModules(3);
    }, 5000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    ...mapActions({
      queryModules: 'QUERY_MODULES'
    }),
    /**
     * @description 返回键
     */
    goBack() {
      this.$router.push({
        name: 'Home'
      });
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevicePlugin(this.mac);
    },

    handleModuleStatus(statusNumber) {
      let key = statusNumber;
      switch (Number(key)) {
        case 0:
          key = '未连接设备';
          break;
        case 1:
          key = '设备IP 地址错误';
          break; 
        case 2:
          key = '设备断开';
          break; 
        case 3:
          key = '在线';
          break;
        default:
          break;
      }
      return key;
    },
    /**
     * @description 路由跳转
     */
    routerTo(row) {
      let asIndex = 0;
      let arrIndex = 0;
      switch (row) {
        case 0:
          asIndex = 1;
          arrIndex = 0;
          break;
        case 1:
          asIndex = 1;
          arrIndex = 1;
          break;
        case 2:
          asIndex = 2;
          arrIndex = 0;
          break;
        case 3:
          asIndex = 2;
          arrIndex = 1;
          break;
        case 4:
          asIndex = 2;
          arrIndex = 2;
          break;
        case 5:
          asIndex = 3;
          arrIndex = 0;
          break;
        case 6:
          asIndex = 3;
          arrIndex = 1;
          break;
        case 7:
          asIndex = 3;
          arrIndex = 2;
          break;
        default:
          break;
      }
      console.log(asIndex, arrIndex);
      if (this[`as${asIndex}`][arrIndex]) {
        this.$router.push({
          name: 'ParameterQueryDetails',
          params: {
            asIndex,
            arrIndex
          }
        });
      } else {
        showToastPlugin('该模块不在线', 0);
      }
    }
  }
};
</script>
