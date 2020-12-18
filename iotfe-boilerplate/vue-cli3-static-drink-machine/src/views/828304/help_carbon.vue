<template>
  <gree-view>
    <gree-header
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
    >{{ devname }}</gree-header>
    <div class="page-main-help">
      <div class="main-details-bg">
        <h2 
        class="title-txt">活性炭滤芯冲洗方法</h2>
        <div class="context">
          <div class="context-body">
            1.&nbsp;&nbsp;请取出包装中的活性炭滤芯和炭棒滤芯。<br />
            2.&nbsp;&nbsp;将活性炭滤芯与单体卡座旋转安装好。<br />
            3.&nbsp;&nbsp;从三通球阀引出一条2分PE管与单体卡座进出水口相接，按单体卡座上箭头方向通水清洗滤芯，冲洗至没有黑水流出为止。<br />
            <br />
            <br />
            <div style="text-align: center;">
              <img 
                src="./../../assets/img/more_img1.png" 
                alt="" 
                style="margin: 0 auto; width: 70%;">
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
