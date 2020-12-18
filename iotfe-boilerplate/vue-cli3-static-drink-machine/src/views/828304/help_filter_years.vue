<template>
  <gree-view>
    <gree-header
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
    >{{ devname }}</gree-header>
    <div class="page-main-help">
      <div class="main-details-bg">
        <h2 
        class="title-txt">滤芯寿命复位</h2>
        <div class="context">
          <div class="context-body">
            1.&nbsp;&nbsp;长按【复位】键3秒以上，进入滤芯寿命复位模式。<br />
            2.&nbsp;&nbsp;短按【制冷/选择】键，选择滤芯级数。<br />
            3.&nbsp;&nbsp;短按【复位】键，所选滤芯寿命复位完成，对应滤芯数字图标常亮，无按键操作30s或者按待机按键即可退出滤芯复位模式。<br />
          </div>
        </div>
      </div>
    </div>
  </gree-view>
</template>
<script>
import { Header } from 'gree-ui';
import { closePagePlugin } from '../../api/utils';

export default {
  components: {
    [Header.name]: Header
  },
  data() {
    return {
      devname: '帮助'
    };
  },
  methods: {
    /**
     * @description 返回键
     */
    goBack() {
      // closePage();
      closePagePlugin();
    }
  }
};
</script>
