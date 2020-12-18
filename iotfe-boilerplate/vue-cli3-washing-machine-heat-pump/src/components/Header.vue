<!--
 * @Descripttion: 头部 点击右边三个点的时候弹出选择款 代表 热泵
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:07
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-05-06 16:43:31
 -->
<template>
  <gree-header
    :left-options="{preventGoBack: true}"
    @on-click-back="fun()"
    theme="#404657"
  >{{ devname }}
    <gree-dropdown
      slot="right"
      position="is-bottom-left"
    >
      <gree-icon
        slot="trigger"
        name="more"
        size="lg"
      ></gree-icon>
      <gree-dropdown-item 
        v-for="(item,index) in moreList" 
        :key="index"
        :class="[(index && devState === 3) || (index === 2 && specialLock )? 'opacity' : '']"
        @click="selectMore(item,index)">{{ item }}
      </gree-dropdown-item>
    </gree-dropdown>
  </gree-header>
</template>

<script>
import { Header, Dropdown, DropdownItem, Icon } from 'gree-ui';
import { mapState } from 'vuex';
import {
  editDevicePlugin, showToastPlugin,
} from '../api/pluginInterface';
import { showToast } from '../../../static/lib/PluginInterface.promise';


export default {
  name: 'Header',
  components: {
    [Header.name]: Header,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [Icon.name]: Icon,
  },
  props: {
    fun: {
      type: Function,
      default() {
        return console.log('组件调用Function失败');
      }
    }
  },
  data() {
    return {
      link0: null,
      link1: '',
      moreList: ['设备信息', '洗衣机设置', '收藏夹']
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,
      Pow: state => state.dataObject.Pow,
      childLock: state => state.dataObject.childLock,
      devState: state => state.dataObject.devState,
      specialLock: state => state.dataObject.specialLock,
    })
  },
  mounted() {
    const data = Math.floor(Math.random() * 10000000);
    this.link0 = `link${data}`;
    this.link1 = `#${this.link0}`;
  },
  methods: {
    selectMore(item, index) {
      switch (index) {
        case 0:
          editDevicePlugin(this.mac);
          break;
        case 1:
          if (this.Pow) {
            if (this.devState !== 3) {
              this.$router.push({ name: 'Setup' });
            }
          } else {
            showToastPlugin('关机不可设置');
          }
          break;
        case 2:
          if (this.childLock && this.devState) {
            showToastPlugin('请先解锁童锁');
            return;
          }
          if (this.devState === 3) return;
          this.Pow && this.$router.push({ name: 'Favorites' });
          break;
        default:
          break;
      }
    },
  }
};
</script>

<style lang="scss" scope>
.dropdown{
  .dropdown-menu{
  background-color: #F4F4F4;
  min-width: auto;
  .dropdown-content{
    margin: 0;
    padding: 0;
    .dropdown-item{
      margin: 0;
      width: 170px !important;
      color: #404657;
      font-size: 42px;
      border-bottom: 1px solid #e5e5e5;
      &:last-child{
        border-bottom: 0px solid #e5e5e5;
      }
    }
  }
}
}

.backgred{
  background-color: red;
}

</style>
