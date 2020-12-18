<template>
  <div class="fliter-home">
    <gree-header
      :title="title"
      :left-options="{ preventGoBack: true }"
      @on-click-back="goBack"
    />
    <div
      class="fliterbg"
      :style="{'backgroundImage':'url('+changbg+')'}"
    >
      <div
        ref="lestWave"
        class="lestWave"
      >
        <div id="can">
          <canvas
            id="Ocanvas"
            style
            width="180"
            height="180"
          />
        </div>
        <div
          id="waveBg"
          style
        >
          <canvas
            id="waveSBg"
            style
            width="170"
            height="170"
          />
        </div>
        <div id="wave">
          <div class="g-lestwave">
            <p class="lestwaveTips">滤网余量</p>
            <p class="lestwaveVal">
              <span v-if="estate === 256&&MidType !== 7936">---</span>
              <span v-else>{{ Filt_Pre }}</span>%
            </p>
          </div>
        </div>
      </div>
      <a
        href="javascript:;"
        @click="gotoBuy"
      >立即更换</a>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { closePage, changeBarColor, toWebPage } from '../../../../static/lib/PluginInterface.promise';
import { Header, Popup, Row, Col, Icon } from 'gree-ui';
import state from '../../store/state';
export default {
  components: {
    [Header.name]: Header,
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon
  },
  data() {
    return {
      title: '滤网更换',
      temp: 0
    };
  },
  computed: {
    // 这里的三点叫做 : 扩展运算符
    ...mapState({
      FiltUPercent: state => state.dataObject.FiltUPercent,
      estate: state => state.dataObject.estate,
      MidType: state => state.dataObject.MidType,
      meshid: state => state.dataObject.meshid,
      FiltUT: state => state.dataObject.FiltUT,
      meshid: state => state.dataObject.meshid,
      LifeTimeMesh1: state => state.dataObject.LifeTimeMesh1,
      LifeTimeMesh2: state => state.dataObject.LifeTimeMesh2,
      Pow: state => state.dataObject.Pow
    }),
    AirMesh1() {
      if (this.meshid) {
        return this.meshid.substring(0, 17);
      } else {
        return '';
      }
    },
    AirMesh2() {
      if (this.meshid) {
        return this.meshid.substring(17, 33);
      } else {
        return '';
      }
    },
    changbg() {
      // 绿色是100%—60%   黄色是59%—30%  橙色是29%—0%2
      let bgColor = '';
      if (this.FiltUPercent >= 60 && this.FiltUPercent <= 100) {
        bgColor = require('../../assets/img/green_bg.png');
      } else if (this.FiltUPercent >= 30 && this.FiltUPercent < 60) {
        bgColor = require('../../assets/img/orange_bg.png');
      } else {
        bgColor = require('../../assets/img/red_bg.png');
      }
      return bgColor;
    },
    Filt_Pre() {
      let filtPre;
      const MAX_FILT_UT = 12200;
      if (this.MidType & 2048) {
        switch (this.MidType) {
          case 15872:
          case 16128:
            filtPre = this.AirMesh1 ? this.LifeTimeMesh1 : this.LifeTimeMesh2;
            break;
          default:
            filtPre = this.FiltUPercent;
            break;
        }
      } else {
        filtPre = (MAX_FILT_UT - this.FiltUT) / (MAX_FILT_UT / 100);
        filtPre = Math.round(filtPre * 100) / 100;
        if (filtPre > parseInt(filtPre)) filtPre = parseInt(filtPre) + 1;
        if (1 > filtPre > 0) filtPre = 1;
      }
      this.temp = filtPre;
      return filtPre;
    }
  },
  watch: {
    Pow() {
      /*1.滤网页在关机页不能打开 */
      /*2.在滤网页时若滤网已到期不能跳转到关机再到滤网已到页面 */
      if (this.Pow === 0 && this.MeshWarning1 !== 2) {
        this.$router.back(-1);
      }
    }
  },
  mounted() {
    this.initOcanvas();
    this.initwaveSBg();
    console.log('FiltUPercent:');
    this.$store.lestWave = this.$wave({
      renderTo: 'wave' // 渲染到
      //     filterPrecent: this.$store.state.moduleMain.DataObject.fr
    });
    this.$store.lestWave.start(this.temp);
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    gotoBuy() {
      toWebPage('http://mall.gree.com/', '董明珠的店');
    },
    initOcanvas() {
      document.getElementById('Ocanvas').width = screen.availWidth * 0.5;
      document.getElementById('Ocanvas').height = screen.availWidth * 0.5;
      const canvasDemo = document.getElementById('Ocanvas');
      const ctx = canvasDemo.getContext('2d');
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 3;
      ctx.arc(screen.availWidth * 0.25, screen.availWidth * 0.25, screen.availWidth * 0.24, 0, Math.PI * 2);
      ctx.stroke();
    },
    initwaveSBg() {
      document.getElementById('waveSBg').width = screen.availWidth * 0.5;
      document.getElementById('waveSBg').height = screen.availWidth * 0.5;
      const canvasDemo = document.getElementById('waveSBg');
      const ctx = canvasDemo.getContext('2d');
      ctx.beginPath();
      ctx.arc(screen.availWidth * 0.25, screen.availWidth * 0.25, screen.availWidth * 0.225, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fill();
      ctx.lineWidth = 0;
      ctx.stroke();
    }
  }
};
</script>
