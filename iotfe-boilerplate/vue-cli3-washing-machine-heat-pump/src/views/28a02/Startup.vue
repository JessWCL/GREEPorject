<template>
  <!-- Home主页，包含一个简易页面，请根据实际业务修改 -->
  <gree-view bg-color="#4DB6CF">
    <gree-page class="page-startup" no-navbar>
      <!-- 图片区域 -->
      <div
        class="page-mode2"
        :style="{
          backgroundImage: `url(${washmodeImg2[washMode]})`,
        }"
      >
        <Header2 :fun="goBack" />
        <!-- 时间显示 -->
        <div class="mode-time2" v-if="devState !== 3 && runStage !== 13">
          {{ timeLeft | timeConversion }}
        </div>

        <!-- 特殊文字显示 -->
        <div class="mode-text2" v-else>
          {{ processDescribe }}
          <p v-if="runStage === 13" class="weighing-text">根据衣物重量调整洗涤时间</p>
        </div>

        <div class="mode-name2">
          {{ washmodeName[washMode] }}
        </div>

        <!-- 进度条 -->
        <gree-progress-bar
          class="progress-bar2"
          :percent="percent"
          :stroke-color="['#FFB42C', '#FFDC62']"
        ></gree-progress-bar>

        <!--洗涤--漂洗--脱水--结束 -->
        <gree-row 
          v-if="washMode !== 6 && washMode !== 7" 
          class="data-list2" 
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
          class="data-list2" 
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
          class="data-list2" 
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
      <div class="start-or-pause2">
        <gree-button
          v-if="devState !== 3"
          :class="{
            'opacity':isDisable || childLock
          }"
          class="pause-btn2"
          round
          @click="handlePause"
        >{{ describe }}</gree-button>
      </div>

      <!-- 底下按钮 开关-静音-童锁 -->
      <gree-toolbar position="bottom" no-hairline>
        <gree-row>
          <gree-col
            :class="{ hidden: !item.isShowFuncBtn, opacity: item.isDisabled }"
            v-for="(item, index) in startFootList"
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


      <div style="display:none"></div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Row, Col, Button, ProgressBar, ToolBar, PowerOff, NoticeBar} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import Header2 from '../../components/Header2';
import { changeBarColorPlugin, closePagePlugin, showToastPlugin } from '../../api/pluginInterface';
import {modeIndexList, washList} from '../../api/index';
import { washmodeName, washmodeImg2 } from '../../api/utils';
import footConfig from '../../api/home';
import error from '../../mixins/config/error';

export default {
  name: 'Home',
  components: {
    Header2,
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
      star: 0,
      startupstatus: ['称重中', '洗涤中', '漂洗', '脱水'],
      isShowFavorites: false,
      washmodeName,
      washmodeImg2,
      power_off_bg: require('../../assets/img/bg_off_2.png'),
      isDisable: false,
      processDescribe: '已完成',
      percent: 0 // 进度条百分比
    };
  },
  computed: {
    ...mapState({
      Pow: state => state.dataObject.Pow,
      timeLeft: state => state.dataObject.timeLeft,
      devState: state => state.dataObject.devState,
      washMode(state) {
        const value = state.dataObject.washMode;
        if (value === 6) this.startupstatus = ['脱水'];
        if (value === 7) this.startupstatus = ['漂洗', '脱水'];
        return value;
      },
      // 按键启动1 暂停0
      launch: state => state.dataObject.launch,
      childLock: state => state.dataObject.childLock,
      isCloseing: state => state.showData.isCloseing,

      JFerr: state => state.dataObject.JFerr,
      
      mute: state => state.dataObject.mute,
      potch: state => state.dataObject.potch,
      runStage: state => state.dataObject.runStage,
    }),
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
        this.setDataObj({devState: 5});
        this.$router.push({
          name: 'Home',
        });
      }
    },

    /**
     * @description 文字处理
     */
    launch(newV) {
      this.describe = newV ? '暂停' : '继续';
    },

    /**
     * @description 整机状态判断处理
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
          this.percent = 100;
          return;
        }
        if (newV === 4) {
          this.$router.push({
            name: 'Error',
          });
        } 
      },
    },

    /**
     * @description 进度条处理
     */
    runStage: {
      immediate: true,
      handler(newV) {
        if (!newV) {
          this.percent = 2;
          return;
        } 
        const isWashADewatering = this.washMode === 7; //  是否漂洗+脱水模式
        const isDewatering = this.washMode === 6; //  是否脱水模式
        if (isWashADewatering || isDewatering) return; 
        this.processDescribe = newV === 13 ? '称重中' : '已完成';
        // 根据具体阶段调整进度条进度 ，看不懂的再往下看
        //  阶段判断 洗涤 37-- 漂洗 70-- 脱水88 -- 结束
        const percentRange = [1, 37, 70, 88, 180]; // 各个阶段
        const percentLengthList = [29, 33, 28, 10]; // 每个阶段占百分比
        const addlist = [2, 30, 64, 90]; // 每个阶段需加上以前的进度
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
        const rangeIndex = getRange(newV);
        const value = newV - percentRange[rangeIndex - 1];
        const sum = percentRange[rangeIndex] - percentRange[rangeIndex - 1];
        this.percent = Math.ceil(value / sum * percentLengthList[rangeIndex - 1] + addlist[rangeIndex - 1]);
        // 以上代码等于与下面
        // const progress1 = newV >= 2 && newV <= 37; // 称重-洗涤
        // const progress2 = newV > 37 && newV <= 70; // 洗涤-漂洗
        // const progress3 = newV > 70 && newV <= 138; // 漂洗-脱水
        // const progress4 = newV > 138 && newV <= 180; // 脱水-结束
        // if (progress1) {
        //   const sum = 37 - 2;
        //   const value = newV - 2;
        //   this.percent = value / sum * 29;
        // } else if (progress2) {
        //   const sum = 70 - 37;
        //   const value = newV - 37;
        //   this.percent = value / sum * 33 + 30;
        // } else if (progress3) {
        //   const sum = 138 - 70; 
        //   const value = newV - 70;
        //   this.percent = value / sum * 28 + 64;
        // } else if (progress4) {
        //   const sum = 180 - 138;
        //   const value = newV - 138;
        //   this.percent = value / sum * 10 + 92;
        // }
      },
    },
    
    /**
   * @description 如果是脱水模式按照时间来算进度条百分比
   */
    timeLeft: {
      handler(newV) {
        if (this.devState === 3) {
          this.percent = 100;
          return;
        }
        const isDewatering = this.washMode === 6; //  是否脱水模式
        const isWashADewatering = this.washMode === 7; //  是否漂洗+脱水模式
        if (isDewatering) {
          const sumTime = 10;      
          if (newV === sumTime) { 
            this.percent = 2;
            return;
          }
          this.percent = (10 - newV) * 10;
        }
        if (isWashADewatering) {
          const sumTime = (this.potch - 1) * 13 + 20; // 如果是刚开始的第一分钟 , 默认2%   
          if (sumTime === newV) { 
            this.percent = 2;
            return;
          }
          this.percent = (sumTime - newV) / sumTime * 100;
        }
      },
      immediate: true,
    }

  },

  created() {
    this.processDescribe = this.runStage === 13 ? '称重中' : '已完成';
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
            this.setShowData({ isCloseing: 1 });
            setTimeout(() => {
              this.setShowData({ isCloseing: 0 });
            }, 5000);
          } 
          commitObj.devState = 0;
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
  },
};
</script>


<style lang="scss">
.gree-progress-bar-show-info .gree-progress-bar-outer{
  padding-right: 0
}
</style>
