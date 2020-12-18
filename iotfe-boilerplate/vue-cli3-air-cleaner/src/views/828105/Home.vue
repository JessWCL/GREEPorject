<template>
  <gree-view :bg-color="headerColor">
    <gree-page no-navbar class="page-home">
      <!-- 头部 -->
      <div
        class="page-header"
        :style="{ backgroundImage: 'url(' + head_bg + ')' }"
        :class="{error: isError}"
      >
        <gree-header
          theme="transparent"
          :left-options="{ preventGoBack: true }"
          :right-options="{ showMore: !isScene }"
          @on-click-back="goBack"
          @on-click-more="moreInfo"
        >{{ devname }}
          <a v-if="isScene" slot="right" @click="save" style="color: #fff">保存</a>
        </gree-header>
        <!-- 设备状态小图标 -->
        <div class="bar-top" v-if="Pow">
          <gree-row>
            <gree-col>
              <img
                :src="
                  require('@/assets/img/devStatusIcon/' + item.ImgName + '.png')
                "
                :class="{ hidden: item.isHidden }"
                v-for="(item, index) in DeviceStatusIcon"
                :key="index"
              />
            </gree-col>
          </gree-row>
        </div>
        <p class="pm-value" v-if="wipm25 === 1001">---</p>
        <p class="pm-value" v-else>{{ wipm25 }}</p>
        <p class="pm-text">
          PM2.5 <span class="wipm25-describe"> {{ wipm25Describe }} </span>
        </p>

        <!-- 故障提示 -->
        <gree-notice-bar
          scrollable
          key="err"
          v-show="errStatus"
          class="notice-bar"
          v-if="!isScene"
        >
          <img src="@/assets/img/warning.png"/>
          {{ errMsg }}
          <router-link to="/Error">
            <span class="err-detail">
              查看详情
            </span>
          </router-link>
        </gree-notice-bar>
      </div>

      <!-- 居中内容提示 -->
      <div class="page-main">
        <gree-notice-bar
          key="warning"
          v-if="warnMsg && !isScene"
          icon="bell"
          color="#12b7f5"
          scrollable
        >{{ warnMsg }}
          <span v-if="isSHowGotoBuy" class="err-detail" @click="goToBuy" >
            点击购买
          </span>
        </gree-notice-bar>
        <div class="mode-carousel-holder">
          <Carousel
            ref="modeCarousel"
            class="carousel-wrapper"
            @currentChange="setmode"
            @uncontrolable="showToast"
            :prop-data="JsonData.modeData"
            :options="modeOptions"
          />
          <span class="mode-name">{{ JsonData.modeAll[mode] }}</span>
        </div>
      </div>
      <!-- 尾部 -->
      <div class="page-footer">
        <div class="item" v-for="(item, index) in FootList" :key="index" :class="{hidden: item.isHiddenInScence && isScene}">
          <img :src="require('@assets/img/funList/'+item.url+'.png') " @click="footerFunction(index)" />
          <span class="item-text" :class="{gray: !Pow && item.name !== '开关'}">
            {{ item.name }}
            <img v-show="item.hasMore" class="moreContent" :src="require('@/assets/img/more.png')" @click="footerFunction(index)"/>
          </span>
          
        </div>
      </div>
      <!-- drawer pop弹框 -->
      <!-- <gree-popup v-model="showDrawer" position="bottom" >
        <div class="popup-bottom drawer-area">
          <Drawer @hideDrawer="hideDrawer()" />
        </div>
      </gree-popup> -->
      <!-- 关机页面 -->
      <gree-power-off
        v-model="showPowerOff"
        text="已关机"
        :style="{ backgroundImage: 'url(' + power_off_bg + ')' }"
      ></gree-power-off>
      <div style="display: none">{{ pm25statusObj }}</div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, PowerOff, Popup, Row, Col, NoticeBar, Dialog} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
// import Drawer from '@/component/Drawer';
import homeConfig from '@/mixins/config/828105/home.js'; // home 配置文件
import { toWebPage, getCCcmd } from '../../../../static/lib/PluginInterface.promise';
import {
  closePagePlugin,
  editDevicePlugin,
  changeBarColorPlugin,
  showToastPlugin,
} from '../../utils/pluginInterface';
import error from '../../mixins/error';
import Carousel from '../../component/Carousel';

export default {
  components: {
    [Header.name]: Header,
    [PowerOff.name]: PowerOff,
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
    [NoticeBar.name]: NoticeBar,
    // Drawer,
    Carousel,
  },
  mixins: [homeConfig, error],
  data() {
    return {
      showDrawer: false,
      head_bg: require('@/assets/img/bg_header_gooder.png'),
      power_off_bg: require('@/assets/img/bg_off_gooder.png'),
      headerColor: '#A2CD34',
      wipm25Describe: '优',
      isSHowGotoBuy: true,
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,
      light: state => Number(state.dataObject.light),
      Pow(state) {
        const value = state.dataObject.Pow;
        return value;
      }, 
      mode(state) {
        const value = state.dataObject.mode;
        this.$nextTick(() => {
          this.$refs.modeCarousel.setId(value - 1);
        });
        return value;
      },

      wipm25: state => state.dataObject.wipm25, // PM2.5值（入口）
      FiltUPercent0: state => state.dataObject.FiltUPercent, 
      FiltUPercent1: state => state.dataObject.FiltUPercent1, 
      FiltUPercent2: state => state.dataObject.FiltUPercent2, 

      dataObject: state => state.dataObject, 
      isError: state => state.isError,
      isScene: state => state.isScene, 
      remarks(state) {
        return state.dataObject.Pow ? state.remarks_on : state.remarks_off;
      } 
    }),

    // 提醒文案
    warnMsg() {
      let warnMsg = '';
      // const less20List = ['滤网1寿命即将到期, 请及时更换正版滤网', '滤网2寿命即将到期, 请及时更换正版滤网', '高压极板需要清洗, 请按说明书要求清洗'];
      const filter0List = ['滤网1寿命已到, 请及时更换正版滤网', '滤网2寿命已到, 请及时更换正版滤网', '高压极板需要清洗, 请按说明书要求清洗'];
      const list = [this.FiltUPercent0, this.FiltUPercent1, this.FiltUPercent2];
      const filter0index = list.findIndex(item => { return item === 0; });
      // const index = list.findIndex(item => { return item <= 20; });
      if (filter0index > -1) {
        warnMsg = filter0List[filter0index];
        this.isSHowGotoBuy = true;
        if (filter0index === 2) {
          this.isSHowGotoBuy = false;
        }
        return warnMsg;
      }

      // if (index > -1) {
      //   warnMsg = less20List[index];
      //   this.isSHowGotoBuy = true;
      //   if (index === 2) {
      //     this.isSHowGotoBuy = false;
      //   }
      //   return warnMsg;
      // }
      return warnMsg;
    },
    showPowerOff() {
      return !this.Pow;
    }
  },
  watch: {
    /**
     *背景颜色随进风口的pm2.5的值进行变化
     * 0~35 优 绿色
     * 36~115 良 黄色
     * 116以上 差 红色
     * 1001 整机开机时不稳定传来的值
     */
    wipm25(newV) {
      this.changeColor(newV);
    },
    sterilize(val) {
      if (val) {
        showToastPlugin("消毒功能已开启");
      }
    },
    Pow(val) {
      if (!val) {
        this.setDataObj({wipm25: 1001}); // 关机时设置背景为灰色
      }
    }
  },
  created() {
    // process.env.NODE_ENV !== 'production' && this.setDataObj({ wipm25: 32 });
  },
  mounted() {
    Dialog.closeAll();
    this.changeColor(this.wipm25);
  },
  methods: {
    ...mapMutations({
      setDataObj: 'SET_DATA_OBJECT',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),

    setmode(val) {
      const obj = { mode: val + 1 };
      this.setDataObj(obj);
      this.sendCtrl(obj);
    },

    showToast() {
      showToastPlugin('故障中,无法切换');
    },

    changeColor(newV) {
      // 映射pm2.5的对象状态
      let status = NaN;
      if (newV >= 0 && newV < 36) {
        status = 'gooder';
      } else if (newV >= 36 && newV < 116) {
        status = 'middle';
      } else if (newV === 1001) {
        status = 'unstable';
      } else {
        status = 'bad';
      }
      const obj = this.pm25statusObj[status];
      this.head_bg = require(`@/assets/img/bg_header_${obj.bgName}.png`); // 正文背景
      this.power_off_bg = require(`@/assets/img/bg_off_${obj.bgName}.png`); // 关机页
      this.headerColor = obj.barColor; // 头部颜色
      changeBarColorPlugin(obj.barColor); // 顶部颜色
      this.wipm25Describe = obj.describe; // 文字描述
    },
    /**
     * @description 场景保存
     */
    save() {
      const keys = ['Pow', 'mode', 'light'];
      const funcNames = ['开关', '模式', '灯光'];
      const modeNames = ['', '自动', '高速', '中速', '低速'];
      const opt = [];
      const p = [];
      // const remarks = this.getRemarks();
      let remarks = [];
      for (let i = 0, j = keys.length; i < j; i += 1) {
        opt.push(keys[i]);
        p.push(this.dataObject[keys[i]]);
        // let func = funcNames[i];
        // if (func) {
        //   if (func === '模式') {
            
        //     remarks.push(`模式 ${modeNames[this.dataObject[keys[i]]]}`);
        //   } else {
        //     remarks.push(`${func} ${this.dataObject[keys[i]] == 1 ? '开': '关'}`);
        //   }
        // }
      }
      const json = JSON.stringify({ opt, p, t: 'cmd' });
      console.log('json', json);
      // console.log(remarks.join(','));
      getCCcmd(this.mac, json, '...', JSON.stringify(p));
    },
    /**
     * @description 场景get值
     */
    getRemarks() {
      let remarksKey; // state中的remarks
      if (!JSON.stringify(this.remarks)) {
        remarksKey = [];
      } else {
        remarksKey = Object.keys(this.remarks);
      }
      let myRemarks = '';
      remarksKey.forEach(element => {
        const _element = element;
        myRemarks += this.remarks[_element][this[_element]]; // 将指令拼装成字符串
      });
      return myRemarks;
    },
    /**
     * @description 去购买
     */
    goToBuy() {
      toWebPage('http://mall.gree.com', 'GREE格力官方旗舰店');
    },
    /**
     * @description 返回键
     */
    goBack() {
      closePagePlugin();
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevicePlugin(this.mac);
    },
    /**
     * @description 隐藏抽屉列表
     */
    hideDrawer() {
      this.showDrawer = false;
    },
    /**
     * @description: 底部功能按钮的点击事件
     */
    footerFunction(index) {
      // console.log('btnfunc-', index);
      const obj = {};
      switch (index) {
        case 0:
           if (this.errStatus) {
            showToastPlugin('故障中');
            return;
          }
          obj.Pow = Number(!this.Pow);
          this.setDataObj(obj);
          this.sendCtrl(obj);
          // console.log('改变后的this.Pow', this.Pow);
          break;
        case 1:
          if (this.errStatus) {
            showToastPlugin('故障中');
            return;
          }
          if (this.Pow) {
            this.$router.push({
              name: 'Filter'
            });
          }
          break;
        case 2:
          if (this.errStatus) {
            showToastPlugin('故障中');
            return;
          }
          if (this.Pow) {
            const cmd = {light: this.light === 0 ? 1 : 0};
            this.setDataObj(cmd);
            this.sendCtrl(cmd);
          }
          break;
        default:
          break;
      }
    },
  },
};
</script>
