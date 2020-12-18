<template>
  <!-- Home主页，包含一个简易页面，请根据实际业务修改 -->
  <gree-view bg-color="#4DB6CF">
    <gree-page class="page-startup" no-navbar>
      <!-- 图片区域 -->
      <div
        class="page-mode"
        :style="{
          backgroundImage: `url(${washmodeImg2[washMode]})`,
        }"
      >
        <Header2 :fun="goBack" />
        <!-- 时间显示 -->
        <div class="mode-time" v-if="devState !== 3 && runStage !== 13" >
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
        <gree-row 
          v-if="washMode !== 6 && washMode !== 7" 
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

        <!-- 单脱水 -->
        <gree-row 
          v-if="washMode === 6" 
          class="data-list-startup" 
        >
          <gree-col
            width="100"
            v-for="(item, index) in startupstatus"
            :key="index"
          >
            <p>{{ item }}</p>
        </gree-col></gree-row>

        <!-- 漂洗脱水 -->
        <gree-row 
          v-if="washMode === 7 " 
          class="data-list-startup" 
        >
          <gree-col
            width="50"
            v-for="(item, index) in startupstatus"
            :key="index"
          >
            <p>{{ item }}</p>
          </gree-col>
        </gree-row>

        <!-- 故障提示 -->
        <div class="data-list-div-div">
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
        </div>
      </div>

      <!-- 下面区域 -->
      <div class="start-block">
        <!-- 提醒提示 -->
        <gree-notice-bar
          v-show="warningStatus"
          icon="bell"
          class="notice-warning"
          >{{ warnMsg }}
          <router-link to="/Error">
            <span class="err-detail">
              查看详情
            </span>
          </router-link>
        </gree-notice-bar>

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

      <!-- 底下按钮 开关-静音-童锁 (大于三个显示或者高级功能)-->
      <gree-toolbar position="bottom" no-hairline>
        <gree-row>
          <gree-col
            :class="{ hidden: !item.isShowFuncBtn}"
            v-for="(item, index) in funList"
            :key="index"
            @click.native="setFunction('bottom', index, item)"
          >
            <div class="icon">
              <img
                :src="require('@/assets/img/Icon/' + item.ImgName + '.png')"
              />
            </div>
            <h3>{{ $language(item.name) }}</h3>
          </gree-col>
        </gree-row>
      </gree-toolbar>

      <!-- 高级弹框 -->
      <StartupFunctionList
        v-if="isShowPopUp"
        :is-popup-show="isShowFunPopup"
        @hideFuncListPopUp="closeFuncList"
        @hide.capture="closeFuncList"
      />

      <div style="display:none"></div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Row, Col, Button, ProgressBar, ToolBar, PowerOff, NoticeBar} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import Header2 from '../../components/Header2';
import StartupFunctionList from '../../components/StartupFunctionList';
import { changeBarColorPlugin, closePagePlugin, showToastPlugin } from '../../api/pluginInterface';
import {modeIndexList, washList} from '../../api/index';
import { washmodeName, washmodeImg2 } from '../../api/utils';
import footConfig from '../../api/home';
import error from '../../mixins/config/error';

export default {
  name: 'Home',
  components: {
    Header2,
    StartupFunctionList,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [ProgressBar.name]: ProgressBar,
    [ToolBar.name]: ToolBar,
    [PowerOff.name]: PowerOff,
    [NoticeBar.name]: NoticeBar,
  },
  mixins: [footConfig, error],
  data() {
    return {
      modeIndexList,
      washList,
      describe: '暂停',
      washmodeName,
      washmodeImg2,
      power_off_bg: require('../../assets/img/bg_off_2.png'),
      isDisable: false,
      isShowFunPopup: {}, // 高级功能弹框控制
      funList: [],
      popupList: [],
    };
  },
  computed: {
    ...mapState({
      Pow: state => state.dataObject.Pow,
      timeLeft: state => state.dataObject.timeLeft,
      devState: state => state.dataObject.devState,
      washMode: state => state.dataObject.washMode,
      // 按键启动1 暂停0
      launch: state => state.dataObject.launch,
      childLock: state => state.dataObject.childLock,
      isCloseing: state => state.showData.isCloseing,

      JFerr: state => state.dataObject.JFerr,

      mute: state => state.dataObject.mute,
      potch: state => state.dataObject.potch,
      runStage: state => state.dataObject.runStage,

      
      isShowPopUp: state => state.showData.isShowPopUp,
    }),

    /**
     * @description 进度条文案逻辑判断计算
     */
    startupstatus(){
      let list = ['称重中', '洗涤中', '漂洗', '脱水']
      if (this.washMode === 6) list = ['脱水'];
      if (this.washMode === 7) list = ['漂洗', '脱水'];
      return list
    },

    percent(){
      let val = 2;
      // 容错处理
      if (!this.runStage) return val; 
      // 已完成直接返回100
      if (this.devState === 3 || this.timeLeft === 0) return 100;

      const isWashADewatering = this.washMode === 7; //  是否漂洗+脱水模式
      const isDewatering = this.washMode === 6; //  是否脱水模式

      //  阶段判断 洗涤 37-- 漂洗 70-- 脱水88 -- 结束
      let percentRange = [1, 37, 70, 88, 180]; // 各个阶段
      let percentLengthList = [29, 33, 28, 10]; // 每个阶段占百分比
      let addlist = [2, 30, 64, 90]; // 每个阶段需加上以前的进度

      // 特殊处理漂洗+脱水模式
      if (isWashADewatering) {
        percentRange = [69, 87, 180];
        percentLengthList = [70, 26];
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
    }
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
    Pow: {
      immediate: true,    
      handler(newV) {
        if (newV === 0) {
          // this.setDataObj({devState: 5});
          this.$router.push({
            name: 'Home',
          });
        }
      },
    },

    /**
     * @description 文字处理
     */
    launch(newV) {
      this.describe = newV ? '暂停' : '继续';
    },

    /**
     * @description 整机状态判断
     */
    devState: {
      immediate: true,    
      handler(newV) {
        if (newV === 0) {
          this.$router.push({
            name: 'Home',
          });
        }
        if (newV === 1) { // 启动状态
          this.describe = '暂停';
          return;
        }
        if (newV === 2) { // 暂停状态
          this.describe = '继续';
          return;
        }
        if (newV === 3) { // 已完成状态
          this.funList[1].isShowFuncBtn = false;
          this.$set(this.isShowFunPopup, 'bottom', false); // 打开底部高级弹框
          this.setShowData({isShowPopUp: false});
          return;
        }
        if (newV === 4) {
          this.$router.push({
            name: 'Error',
          });
        } 
      },
    },

  },

  created() {
    
    const length = this.startFootList.length;
    if (length > 3) {
      this.funList = JSON.parse(JSON.stringify(this.startFootList));
      this.funList[1].isShowFuncBtn = this.devState !== 3 && this.Pow;
      this.funList[1].isDisabled = false;
      this.funList[1].protocol = 'menu';
      this.funList[1].name = 'home.senior';
      this.funList[1].ImgName = 'icon_senior';
      this.funList[1].iconName = 'menu';
      this.funList = JSON.parse(JSON.stringify(this.funList.slice(0, 2)));
    }
  },

  mounted() {
    changeBarColorPlugin('#4DB6CF');
  },

  methods: {
    ...mapMutations({
      setDataObj: 'SET_DATA_OBJECT',
      setShowData: 'SET_SHOW_DATA',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @function goBack
     * @description 返回键
     */
    goBack() {
      if (this.launch || this.childLock || (this.devState > 0 && this.devState !== 2)) {
        closePagePlugin();
      } else {
        if (this.devState === 3) {
          const timeAll = this.washList[this.modeIndexList[this.washMode]].defaultTime;
          this.setDataObj({timeAll});
        }
        this.$router.push({
          name: 'Home',
        });
      }
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
        this.setDataObj(Object.assign(obj2, obj));
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
            commitObj.prompt1 = 0;
            commitObj.prompt2 = 0;
            this.setShowData({ isCloseing: 1 });
            setTimeout(() => {
              this.setShowData({ isCloseing: 0 });
            }, 5000);
          } 
          commitObj.devState = 5;
          this.setDataObj(Object.assign(commitObj, obj));
          this.sendCtrl(obj);
          return;
        } 
        showToastPlugin('关机中暂时无法开启');
        return;
      }

      if (protocol === 'menu') {
        this.$set(this.isShowFunPopup, 'bottom', true); // 打开底部高级弹框
        this.setShowData({isShowPopUp: true});
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
      this.setDataObj(Object.assign(commitObj, obj));
      this.sendCtrl(obj);
    },

    closeFuncList() {
      this.$set(this.isShowFunPopup, 'bottom', false);
      this.isShowPopUp && this.setShowData({isShowPopUp: false});
    }
  },
};
</script>


<style lang="scss">
.gree-progress-bar-show-info .gree-progress-bar-outer{
  padding-right: 0
}
</style>
