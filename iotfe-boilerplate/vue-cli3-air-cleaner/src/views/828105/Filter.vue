<!--
 * @Descripttion: 滤网页面
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2020-03-16 16:01:11
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-03-31 10:37:09
 -->
<template>
  <gree-view bg-color="#f4f4f4">
    <gree-header
      :left-options="{ preventGoBack: true }"
      :right-options="{ showMore: true }"
      @on-click-back="goBack"
      @on-click-more="moreInfo"
    >
      滤网信息
    </gree-header>
    <gree-page class="page-filter">
      <div class="card" ref="lestWave0">
        <div class="header" :style="{ 'background-color': changeBGcolor }">
          <div class="header-describle">滤网1</div>
          <div id="can">
            <canvas id="Ocanvas0" width="180" height="180"></canvas>
          </div>
          <div id="waveBg">
            <canvas id="waveSBg0" width="170" height="170"></canvas>
          </div>
          <div id="wave0">
            <p class="lestwaveTips">滤网余量</p>
            <p class="lestwaveVal">
              <span v-if="estate === 256">---</span>
              <span v-else>{{ FiltUPercent }}%</span>
            </p>
          </div>
        </div>
        <!-- <div class="text" @click="handShowDescribe">
          滤网型号规格如下表
          <gree-icon
            :name="isShowDescribe ? 'arrow-up ' : 'arrow-down'"
            color="#1E90FF"
            size="xl"
            class="text-icon"
          ></gree-icon>
        </div>
        <table border="1" v-show="isShowDescribe">
          <tr>
            <th>配件型号</th>
            <th>功能描述</th>
            <th>适用型号</th>
          </tr>
          <tr>
            <td>高效HEPA网</td>
            <td>高效HEPA网过滤PM2.5等细小颗粒物</td>
            <td rowspan="3">空气净化器KXJFA300-A02</td>
          </tr>
          <tr>
            <td>还原网</td>
            <td>还原网将净化过程残留的臭氧还原成新鲜的空气</td>
          </tr>
          <tr>
            <td>初效过滤网</td>
            <td>初效过滤网过滤毛絮、人和动物皮屑和大颗粒物</td>
          </tr>
        </table> -->
      </div>

      <div class="card" ref="lestWave2">
        <div class="header" :style="{ 'background-color': changeBGcolor2 }">
          <div class="header-describle">高压极板</div>
          <div id="can1">
            <canvas id="Ocanvas2" width="180" height="180"></canvas>
          </div>
          <div id="waveBg1">
            <canvas id="waveSBg2" width="170" height="170"></canvas>
          </div>
          <div id="wave2">
            <p class="lestwaveTips">滤网余量</p>
            <p class="lestwaveVal">
              <span v-if="estate === 256">---</span>
              <span v-else>{{ FiltUPercent2 }}%</span>
            </p>
          </div>
        </div>
      </div>

      <div class="card" ref="lestWave1">
        <div class="header" :style="{ 'background-color': changeBGcolor1 }">
          <div class="header-describle">滤网2</div>
          <div id="can1">
            <canvas id="Ocanvas1" width="180" height="180"></canvas>
          </div>
          <div id="waveBg2">
            <canvas id="waveSBg1" width="170" height="170"></canvas>
          </div>
          <div id="wave1">
            <p class="lestwaveTips">滤网余量</p>
            <p class="lestwaveVal">
              <span v-if="estate === 256">---</span>
              <span v-else>{{ FiltUPercent1 }}%</span>
            </p>
          </div>
        </div>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Popup, Row, Col, Icon } from 'gree-ui';
import { mapState } from 'vuex';
import {
  closePagePlugin,
  editDevicePlugin,
  changeBarColorPlugin,
} from '../../utils/pluginInterface';

export default {
  components: {
    [Header.name]: Header,
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
  },
  data() {
    return {
      isShowDescribe: false,
    };
  },
  computed: {
    ...mapState({
      mac: state => state.mac,
      estate: state => state.dataObject.estate,
      FiltUPercent: state => state.dataObject.FiltUPercent,
      FiltUPercent1: state => state.dataObject.FiltUPercent1,
      FiltUPercent2: state => state.dataObject.FiltUPercent2,
    }),
    changeBGcolor() {
      // 绿色是100%—60%   黄色是59%—30%  橙色是29%—0%2
      let bgColor = '';
      if (this.FiltUPercent >= 60 && this.FiltUPercent <= 100) {
        bgColor = '#70CA3B';
      } else if (this.FiltUPercent >= 30 && this.FiltUPercent < 60) {
        bgColor = '#EFBC26';
      } else {
        bgColor = '#EC9C4F';
      }
      return bgColor;
    },
    changeBGcolor1() {
      // 绿色是100%—60%   黄色是59%—30%  橙色是29%—0%2
      let bgColor = '';
      if (this.FiltUPercent1 >= 60 && this.FiltUPercent1 <= 100) {
        bgColor = '#70CA3B';
      } else if (this.FiltUPercent1 >= 30 && this.FiltUPercent1 < 60) {
        bgColor = '#EFBC26';
      } else {
        bgColor = '#EC9C4F';
      }
      return bgColor;
    },
    changeBGcolor2() {
      // 绿色是100%—60%   黄色是59%—30%  橙色是29%—0%2
      let bgColor = '';
      if (this.FiltUPercent2 >= 60 && this.FiltUPercent2 <= 100) {
        bgColor = '#70CA3B';
      } else if (this.FiltUPercent2 >= 30 && this.FiltUPercent2 < 60) {
        bgColor = '#EFBC26';
      } else {
        bgColor = '#EC9C4F';
      }
      return bgColor;
    },
  },

  mounted() {
    changeBarColorPlugin('#f4f4f4');
    this.initOcanvas();
    this.initwaveSBg();
    this.initStart();
  },
  methods: {
    /**
     * @description 切换是否显示描述
     */
    handShowDescribe() {
      this.isShowDescribe = !this.isShowDescribe;
    },

    initOcanvas() {
      for (let index = 0; index < 3; index++) {
        document.getElementById(`Ocanvas${index}`).width = screen.availWidth * 0.5;
        document.getElementById(`Ocanvas${index}`).height = screen.availWidth * 0.5;
        const canvasDemo = document.getElementById(`Ocanvas${index}`);
        const ctx = canvasDemo.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 2;
        ctx.arc(
          screen.availWidth * 0.25,
          screen.availWidth * 0.25,
          screen.availWidth * 0.24,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      }
    },

    initwaveSBg() {
      for (let index = 0; index < 3; index++) {
        document.getElementById(`waveSBg${index}`).width = screen.availWidth * 0.5;
        document.getElementById(`waveSBg${index}`).height = screen.availWidth * 0.5;
        const canvasDemo = document.getElementById(`waveSBg${index}`);
        const ctx = canvasDemo.getContext('2d');
        ctx.beginPath();
        ctx.arc(
          screen.availWidth * 0.25,
          screen.availWidth * 0.25,
          screen.availWidth * 0.225,
          0,
          Math.PI * 2,
        );
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fill();
        ctx.lineWidth = 0;
        ctx.stroke();
      }
    },
    initStart() {
      for (let index = 0; index < 3; index++) {
        this.$store[`lestWave${index}`] = this.$wave(
          {
            renderTo: `wave${index}`, // 渲染到
          },
          index ? this[`FiltUPercent${index}`] : this.FiltUPercent,
        );
        this.$store[`lestWave${index}`].start();
      } 
    },
    /**
     * @description 返回键
     */
    goBack() {
      this.$router.go(-1);
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevicePlugin(this.mac);
    },
  },
};
</script>
