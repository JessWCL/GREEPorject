<!--
 * @Descripttion: 头部 点击右边三个点就是设备详情 代表 纤净
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:07
 * @LastEditors  : ZM_lee└(^o^)┘
 * @LastEditTime : 2020-01-17 11:32:15
 -->
<template>
  <gree-header
    theme="transparent"
    :left-options="{ preventGoBack: true }"
    @on-click-back="fun"
    :right-options="{ showMore: true }"
    @on-click-more="moreInfo"
  >{{ devname }}
  </gree-header>
</template>

<script>
import { mapState } from 'vuex';
import { Header } from 'gree-ui';
import { editDevicePlugin, closePagePlugin } from '../api/pluginInterface';

export default {
  name: 'Header2',
  components: {
    [Header.name]: Header,
  },
  props: {
    fun: {
      type: Function,
      default() {
        return closePagePlugin();
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      mac: state => state.mac,
      devname: state => state.deviceInfo.name,
    }),
  },
  mounted() {},
  methods: {
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevicePlugin(this.mac);
    },
  },
};
</script>

<style lang="scss" scope>

</style>
