<template>
  <!-- Home主页，包含一个简易页面，请根据实际业务修改 -->
  <gree-view bg-color="#4DB6CF">
    <gree-page class="page-startup" no-navbar>
      <!-- 图片区域 -->
      <div
        class="page-mode"
        :style="{
          backgroundImage: `url(${washmodeImg3[washMode]})`,
        }"
      >
        <gree-header
          theme="transparent"
          :left-options="{ preventGoBack: true }"
          @on-click-back="goBack"
          :right-options="{ showMore: true }"
          @on-click-more="moreInfo"
        >上层
        </gree-header>

        <!-- 时间显示 -->
        <div class="mode-time" v-if="devState !== 3 && runStage !== 13 ">
          {{ timeLeft | timeConversion }}
        </div>

        <!-- 特殊文字显示 -->
        <div class="mode-text" v-else>
          {{ runStage === 13 ? '称重中' : '已完成' }}
          <p v-if="runStage === 13" class="weighing-text">根据衣物重量调整洗涤时间</p>
        </div>

        <div class="mode-name">
          {{ washmodeName[washMode] }}
        </div>

        <!-- 进度条 -->
        <gree-progress-bar
          class="progress-bar"
          :percent="percent"
          :stroke-color="['#FFB42C', '#FFDC62']"
        ></gree-progress-bar>

        <!--洗涤--漂洗--脱水--结束 -->
        <!-- 单脱水 -->
        <gree-row 
          v-if="washMode === 6" 
          class="data-list-startup" 
        >
          <gree-col
            :width="100"
            v-for="(item, index) in startupstatus"
            :key="index"
          >
            <p>{{ item }}</p>
        </gree-col></gree-row>

        <!-- 漂洗脱水 -->
        <gree-row 
          v-else-if="washMode === 7 " 
          class="data-list-startup" 
        >
          <gree-col
            :width="50"
            v-for="(item, index) in startupstatus"
            :key="index"
          >
            <p>{{ item }}</p>
          </gree-col>
        </gree-row>

        <!-- 单烘干模式 -->
        <gree-row 
          v-else-if="washMode === 22 || washMode === 23" 
          class="data-list-startup" 
        >
          <gree-col
            width="100"
            v-for="(item, index) in startupstatus"
            :key="index"
          >
            <p>{{ item }}</p>
          </gree-col>
        </gree-row>

        <!-- 其余模式 -->
        <gree-row 
          v-else="washMode !== 6 && washMode !== 7" 
          class="data-list-startup" 
        >
          <gree-col
            width="20"
            v-for="(item, index) in startupstatus"
            :key="index"
          >
            <p>{{ item }}</p>
          </gree-col>
        </gree-row>
        <!-- 故障提示 -->
        <!-- <div class="data-list-div-div">
          <div class="data-list-div">
            <gree-notice-bar
              scrollable
              v-show="errStatus"
              class="notice-bar"
              icon="warning"
            >{{ errMsg }}
              <router-link to="/Error">
                <span class="err-detail">
                  查看详情
                </span>
              </router-link>
            </gree-notice-bar>

          </div>
        </div> -->
      </div>

      <!-- 下面区域 -->
      <div class="start-block">
        <!-- 提醒提示 -->
        <!-- <gree-notice-bar
          v-show="warningStatus"
          icon="bell"
          class="notice-warning"
          >{{ warnMsg }}
          <router-link to="/Error">
            <span class="err-detail">
              查看详情
            </span>
          </router-link>
        </gree-notice-bar> -->

        <!-- 中间按钮 -->
        <gree-button
          v-if="devState !== 3"
          :class="{ opacity: isDisable || childLock }"
          class="gree-button-stup"
          round
          @click="handlePause"
        >
          {{ describe }}
        </gree-button>
      </div>


      <!-- 底下按钮 开关-高级功能 -->
      <gree-toolbar position="bottom" no-hairline>
        <gree-row>
          <gree-col
            :class="{ hidden: !item.show, opacity: item.invalid }"
            v-for="(item, index) in footList"
            :key="index"
            @click.native="setFunction('bottom', index, item)"
          >
            <div class="icon">
              <img
                :src="require('@/assets/img/Icon/functionBtn/' + item.ImgName + '.png')"
              />
            </div>
            <h3>{{ $language(item.itemName) }}</h3>
          </gree-col>
        </gree-row>
      </gree-toolbar>

      <div style="display:none"></div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Row, Col, Button, ProgressBar, ToolBar, PowerOff, NoticeBar} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import Header2 from '@/components/Header2';
import { changeBarColorPlugin, closePagePlugin, showToastPlugin } from '@/api/pluginInterface';
import { washmodeName, washmodeImg3 } from '@/api/utils';
import { startup } from '@/api/28a06/advanced'

// import error from '../../mixins/config/error';

export default {
  name: 'middleStartUp',
  components: {
    Header2,
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [ProgressBar.name]: ProgressBar,
    [ToolBar.name]: ToolBar,
    [PowerOff.name]: PowerOff,
    [NoticeBar.name]: NoticeBar,
  },
  data() {
    return {
      describe: '暂停',
      washmodeName,
      washmodeImg3,
      power_off_bg: require('@/assets/img/bg_off_2.png'),
      isDisable: false,
      isShowFunPopup: {}, // 高级功能弹框控制
    };
  },
  computed: {
    ...mapState({
      Pow: state => state.parseObj.Pow,
      timeLeft: state => state.parseObj.drum2Params.timeLeft,
      devState: state => state.parseObj.drum2Params.devState,
      washMode: state => state.parseObj.drum2Params.washMode,
      // 按键启动1 暂停0
      launch: state => state.parseObj.drum2Params.launch,
      childLock: state => state.parseObj.childLock,
      
      JFerr: state => state.parseObj.drum2Params.JFerr,
      
      mute: state => state.parseObj.drum2Params.mute,
      potch: state => state.parseObj.drum2Params.potch,
      runStage: state => state.parseObj.drum2Params.runStage,

      isCloseing: state => state.showData.isCloseing,
      isShowPopUp: state => state.showData.isShowPopUp,
    }),


    /**
     * @description 进度条文案逻辑判断计算
     */
    startupstatus() {
      let list = ['称重中', '洗涤中', '漂洗', '脱水'];
      if (this.washMode === 6) list = ['脱水'];
      if (this.washMode === 7) list = ['漂洗', '脱水'];
      return list;
    },

    /**
     * @description 进度条百分比逻辑判断计算
     */
    percent() {
      let val = 2;
      // 容错处理
      if (!this.runStage) return val; 

      if (this.devState === 3) return 100;

      const isWashADewatering = this.washMode === 7; //  是否漂洗+脱水模式
      const isDewatering = this.washMode === 6; //  是否脱水模式

      //  阶段判断 洗涤 37-- 漂洗 70-- 脱水88 -- 结束
      let percentRange = [1, 37, 70, 88, 180]; // 各个阶段
      let percentLengthList = [29, 33, 28, 10]; // 每个阶段占百分比
      let addlist = [2, 30, 64, 90]; // 每个阶段需加上以前的进度


      // 特殊处理漂洗+脱水模式
      if (isWashADewatering) {
        percentRange = [69, 87, 180];
        percentLengthList = [20, 70];
        addlist = [14, 74];
      }

      // 特殊处理单脱水模式
      if (isDewatering) {
        percentRange = [2, 87, 180];
        percentLengthList = [2, 95];
        addlist = [2, 5];
      }


      const getRange = val => {
        let lastRange = NaN;
        return percentRange.findIndex(item => {
          if (lastRange) {
            return lastRange < val && val <= item;
          }
          lastRange = item;
          return false;
        });
      };
      const rangeIndex = getRange(this.runStage);
      const value = this.runStage - percentRange[rangeIndex - 1];
      const sum = percentRange[rangeIndex] - percentRange[rangeIndex - 1];
      val = Math.ceil(value / sum * percentLengthList[rangeIndex - 1] + addlist[rangeIndex - 1]);

      return val; 
    },

    // 底部样式生成
    footList() {
      const list = JSON.parse(JSON.stringify(startup));
      list.forEach(item => {
        const element = item;
        const value = this[element.protocol] ? 'on' : 'off';
        element.selected = !!this[element.protocol];
        element.ImgName = `${element.IconName}_${value}`;
        if (element.protocol === 'mute') {
          element.invalid = !!this.childLock;
        }
      });
      return list;
    },
  },
  watch: {
    /**
     * @description JFerr单独判断
     */
    JFerr(newV) {
      if (newV) {
        this.$router.push({
          name: 'Error',
        });
      }
    },

    /**
     * @description 关机去到首页
     */
    Pow(newV) {
      if (newV === 0) {
        this.$router.push({
          name: 'Home',
        });
      }
    },


    /**
     * @description 整机状态判断处理
     */
    devState: {
      immediate: true,    
      handler(newV) {
        // if (newV === 0) {
        //   this.$router.push({
        //     name: 'Home',
        //   });
        // }
        if (newV === 1) { // 启动状态
          this.describe = '暂停';
          return;
        }
        if (newV === 2) { // 暂停状态
          this.$router.push({
            name: 'Middle',
          });
        }
        if (newV === 4) {
          this.$router.push({
            name: 'Error',
          });
        } 
      },
    },
  },

  mounted() {
    changeBarColorPlugin('#4DB6CF');
  },
  methods: {
    ...mapMutations({
      setShowData: 'SET_SHOW_DATA',
      setMiddleObj: 'SET_MIDDLE_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @function goBack
     * @description 返回键
     */
    goBack() {
      if (this.devState === 2) {
        this.$router.push({
          name: 'Middle'
        });
      } else {
        this.$router.push({
          name: 'Home'
        });
      }
    },

    moreInfo() {
      console.log('-------------');
    },

    /**
     * @description: 发送暂停或重新开启指令
     */
    handlePause() {
      if (this.childLock) {
        showToastPlugin('请先解锁童锁');
        return;
      }
      if (!this.isDisable) {
        const obj = {};
        obj.launch = Number(!this.launch);
        const obj2 = {}; 
        obj2.devState = obj.launch ? 1 : 2;
        this.setMiddleObj(Object.assign(obj2, obj));
        this.isDisable = true;
        this.sendCtrl(obj);
        setTimeout(() => { this.isDisable = false; }, 1500);
      } else {
        showToastPlugin('请勿频繁操作');
      }
    },

    /**
     * @description 底部两个选项选择
     */
    setFunction(type, index, item) {
      const obj = {};
      const commitObj = {};
      const protocol = item.protocol;

      if (protocol === 'Pow') {
        if (!this.isCloseing) {
          obj.Pow = Number(!this.Pow);
          if (this.Pow) {
            commitObj.launch = 0;
            commitObj.childLock = 0;
            // this.setShowData({ isCloseing: 1 });
            // setTimeout(() => {
            //   this.setShowData({ isCloseing: 0 });
            // }, 5000);
          } 
          commitObj.devState = 5;
          this.setMiddleObj(Object.assign(commitObj, obj));
          // this.sendCtrl(obj);
          return;
        } 
        showToastPlugin('关机中暂时无法开启');
        return;
      }

      if (protocol === 'mute') {
        if (this.childLock) {
          showToastPlugin('请先解锁童锁');
          return;
        }
        obj.mute = !this.mute >> 0;
      }

      if (protocol === 'childLock') {
        if (this.devState !== 2) {
          obj.childLock = Number(!this.childLock);    
        } else {
          showToastPlugin('当前不可用');
          return;
        }
      }


      this.setMiddleObj(Object.assign(commitObj, obj));
      // this.sendCtrl(obj);
    },

    /**
     * @description 关闭高级弹框
     */
    closeFuncList() {
      this.$set(this.isShowFunPopup, 'bottom', false);
      this.isShowPopUp && this.setShowData({isShowPopUp: false});
    },
  },
};
</script>


<style lang="scss">
.gree-progress-bar-show-info .gree-progress-bar-outer{
  padding-right: 0
}
</style>
