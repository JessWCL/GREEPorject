<template>
  <gree-view>
    <gree-header
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
    >{{ devname }}</gree-header>
    <div class="page-main-help">
      <div class="main-details-bg">
        <h2 
        class="title-txt">滤芯更换方法</h2>
        <div class="context">
          <div>
            <div class="context-title"></div>
            <div class="context-body">
              当换芯图标常亮，滤芯对应数字闪烁时，请尽快更换滤芯。更换滤芯前，请先关闭电源、水源，并排空自来水箱与纯水箱中的水。<br />
              具体如下：<br />
              1.&nbsp;&nbsp;打开机身右侧滤芯门，按照闪烁的数字选择对应滤芯，左旋旋出滤芯，按右旋旋入滤芯。<br />
              2.&nbsp;&nbsp;更换活性炭滤芯、炭棒滤芯后进行滤芯冲洗，详见活性炭滤芯冲洗方式。<br />
              根据下图方法，依次把滤芯安装到对应位置：
              <br />
              <br />
              <img 
                src="./../../assets/img/more_img0.png" 
                alt="">
            </div>
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
