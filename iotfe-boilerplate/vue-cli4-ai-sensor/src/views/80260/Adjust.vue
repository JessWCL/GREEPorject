<template>
  <gree-view>
    <gree-header
      :title="devname"
      :left-options="{ preventGoBack: true }"
      @on-click-back="goBack"
      :right-options="{ showMore: !functype }"
      @on-click-more="moreInfo"
    />
    <gree-page class="page-adjust">
      <!-- 准备开始校准 -->
      <section class="step-start hidden">
        <gree-block>
          <div class="result">
            <h3>首次校准</h3>
            <p>{{ $language('adjust.tip') }}</p>
          </div>
        </gree-block>
        <gree-action-bar :actions="actionBarData"></gree-action-bar>
      </section>
      <!-- 第一步 -->
      <section class="step-first hidden">
        <img :src="require('@/assets/img/bg_first_step.png')" width="100%" />
        <gree-block>
          <h3>第一步</h3>
          <p>请在您的马桶或蹲便器上静待直到语音提示完成。</p>
        </gree-block>
        <gree-row>
          <gree-col>
            <ul class="pager">
              <li class="number active">1</li>
              <li class="number">2</li>
            </ul>
          </gree-col>
        </gree-row>
      </section>
      <!-- 第二步 -->
      <section class="step-second hidden">
        <img :src="require('@/assets/img/bg_gif.gif')" width="100%" />
        <gree-block>
          <h3>第二步</h3>
          <p>请围绕您的浴室区域步行，直到听到语音提示完成，请尝试走遍整个浴室区域，包括淋浴区域或浴缸。</p>
        </gree-block>
        <gree-row>
          <gree-col>
            <ul class="pager">
              <li class="number active">1</li>
              <li class="number active">2</li>
            </ul>
          </gree-col>
        </gree-row>
      </section>
      <!-- 校准成功 -->
      <section class="step-success hidden">
        <img :src="require('@/assets/img/bg_the_calibration_completed.png')" width="100%" />
        <gree-block>
          <h3>完成校准</h3>
          <p>感谢您的配合，已完成了校准，您可以开始感知器的使用。</p>
        </gree-block>
        <gree-row>
          <gree-col>
            <gree-button type="info">立即体验</gree-button>
          </gree-col>
        </gree-row>
      </section>
      <!-- 校准失败 -->
      <section class="step-failure hidden">
        <img :src="require('@/assets/img/bg_calibrtion_failure.png')" width="100%" />
        <gree-block>
          <h3>校准失败</h3>
          <p>对不起，未能完成本次校准，请检查感知器情况，点击“重新校准”，房间校准将被重启</p>
          <p>1.请务必跟随语音提示进行操作。</p>
          <p>2.请确保AI感知器为上电状态。</p>
          <p>3.请检查AI感知器是否被复位。</p>
          <p>4.若以上均不行，请尝试重新绑定。</p>
        </gree-block>
        <gree-row>
          <gree-col>
            <gree-button type="info">重新校准</gree-button>
          </gree-col>
        </gree-row>
      </section>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Button, Block, Row, Col, ActionBar } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { closePage, editDevice } from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [Button.name]: Button,
    [Block.name]: Block,
    [Row.name]: Row,
    [Col.name]: Col,
    [ActionBar.name]: ActionBar
  },
  data() {
    return {
      actionBarData: [
        {
          text: '开始校准',
          onClick: this.handleClick
        }
      ]
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac
    })
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
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
    handleClick() {
      console.log('action-bar click callback');
    }
  }
};
</script>
