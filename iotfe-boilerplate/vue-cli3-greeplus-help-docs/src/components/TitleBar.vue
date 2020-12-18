<template>
  <gree-header
    :left-options="options"
    @on-click-back="closePage"
  >
    <a 
      class="btn-close" 
      slot="left" 
      href="javascript:void 0;"
      @click="closePage">关闭</a>
    {{ title }}
    <span slot="right">
      <gree-dropdown position="is-bottom-left">
        <a slot="trigger">
          <gree-icon name="more"></gree-icon>
        </a>
        <gree-dropdown-item 
          v-show="showShareMenu"
          @click="share">
          <img src="../assets/img/share.png">
          <span>分享</span>
        </gree-dropdown-item>
        <gree-dropdown-item @click="refresh">
          <img src="../assets/img/refresh.png">
          <span>刷新</span>
        </gree-dropdown-item>
      </gree-dropdown>
    </span>
  </gree-header>
</template>

<script>
import { Header, Icon, Dropdown, DropdownItem } from 'gree-ui';
import {
  closePage,
  loadUrl
} from '../../../static/lib/PluginInterface.promise';
 
export default {
  components: {
    [Header.name]: Header,
    [Icon.name]: Icon,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
  },
  props: {
    title: {
      type: String,
      default: '帮助'
    },
    options: {
      type: Object,
      default: function () {
        return {preventGoBack: false};
      }
    },
    showShareMenu: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closePage() {
      closePage();
    },
    refresh() {
      if (window.isIOS) {
        window.location.reload();
      } else {
        loadUrl(window.location.href);
      }
    },
    share() {
      this.$emit('share');
    }
  }
};
</script>

<style lang="scss">
.gree-header {
  .gree-header-left {
    .btn-close {
      margin-left: 60px;
      text-decoration: none;
    }
  }
  .gree-header-title {
    margin: 0 180px !important;
  }

  .dropdown-menu {
    border-radius: 12px;
    margin-top: -13px;
    .dropdown-content {
      overflow: hidden;
      box-shadow: 0px 0px 24px 0px rgba(0,0,0,.2);
      width: 480px;
      .dropdown-item {
        display: flex;
        width: 100%;
        height: 120px;
        padding: 0;
        margin: 0;
        align-items: center;
        &:first-child {
          border-bottom: 1px solid #efefef;
        }
        img {
          width: 60px;
          margin-right: 22px;
          margin-left: 58px;
        }
        span {
          font-size: 42px;
          color: #404657;
        }
      }
    }
  }
}
</style>
