<template>
  <div class="header">
    <gree-header
      :left-options="{ preventGoBack: true }"
      :right-options="{showMore: true}"
      @on-click-more="moreInfo"
      @on-click-back="goBack"
      @click.native="headerClick"
    >
      {{ devname }}
    </gree-header>
  </div>
</template>

<script>import {
  Header,
} from 'gree-ui';
import { mapState, mapMutations } from 'vuex';
import { editDevice, closePage } from '../../../../../static/lib/PluginInterface.promise';

export default {
  name: 'Appointment',
  components: {
    [Header.name]: Header,
  },
  data() {
    return {
      // headerTitel: '植物生长柜'
    };
  },
  computed: {
    ...mapState({
      mac: state => state.mac,
      devname: state => state.deviceInfo.name,
      vconsole_count: state => state.vconsole_count,
    }),
  },

  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
    }),

    /**
     * @description 返回键
     */
    goBack() {
      if (this.$route.name === 'Home') {
        closePage();
      } else {
        this.$router.back();
      }
    },

    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevice(this.mac);
    },
    // 点击顶部的名字隐藏/显示vconsole
    headerClick() {
      const vconsole = document.querySelector('#__vconsole');
      // console.log(window.vconsole_count);
      if (window.vconsole_count < 5) {
        window.vconsole_count += 1;
      } else if (window.vconsole_count >= 5 && window.vconsole_count < 10) {
        window.vconsole_count += 1;
        vconsole.style.display = 'block';
      } else if (window.vconsole_count >= 10) {
        window.vconsole_count = 0;
        vconsole.style.display = 'none';
      }
    },
  }
};
</script>

<style lang="scss">

</style>
