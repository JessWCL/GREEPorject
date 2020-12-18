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
        <!-- 单脱水 -->
        <gree-row 
          v-if="washMode === 6" 
          class="data-list2" 
        >
          <gree-col
            :width="dry ? 50 : 100"
            v-for="(item, index) in startupstatus"
            :key="index"
          >
            <p>{{ item }}</p>
        </gree-col></gree-row>

        <!-- 漂洗脱水 -->
        <gree-row 
          v-else-if="washMode === 7 " 
          class="data-list2" 
        >
          <gree-col
            :width="dry ? 30 : 50"
            v-for="(item, index) in startupstatus"
            :key="index"
          >
            <p>{{ item }}</p>
          </gree-col>
        </gree-row>

        <!-- 单烘干模式 -->
        <gree-row 
          v-else-if="washMode === 22 || washMode === 23" 
          class="data-list2" 
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
        if (this.dry) this.startupstatus.push('烘干中');
        if (value === 22 || value === 23) this.startupstatus = ['烘干中'];
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
      dry: state => state.dataObject.dry,
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
        const isSingleDry = this.washMode === 22 || this.washMode === 23; // 是否单独烘干模式（强烘干、弱烘干 ）
        // if (isDewatering) return; 
        this.processDescribe = newV === 13 ? '称重中' : '已完成';
        // 根据具体阶段调整进度条进度 ，看不懂的再往下看
        //  阶段判断 洗涤 37-- 漂洗 70-- 脱水88 -- 结束
        let percentRange = [1, 37, 70, 88, 180]; // 各个阶段
        let percentLengthList = [29, 33, 28, 10]; // 每个阶段占百分比
        let addlist = [2, 30, 64, 90]; // 每个阶段需加上以前的进度

        // 如果有烘干, 需额外处理
        if (this.dry) {
          percentRange = [1, 37, 70, 88, 144, 180];
          percentLengthList = [20, 23, 23, 20, 10];
          addlist = [2, 23, 47, 70, 90];
        }

        // 特殊处理漂洗+脱水模式
        if (isWashADewatering) {
          percentRange = [69, 88, 180];
          percentLengthList = [59, 27];
          addlist = [13, 73];
          if (this.dry) {
            percentRange = [69, 88, 144, 180];
            percentLengthList = [42, 37, 18];
            addlist = [3, 45, 82];
          }
        }

        // 特殊处理单脱水模式
        if (isDewatering) {
          percentRange = [2, 87, 180];
          percentLengthList = [2, 95];
          addlist = [2, 5];
          if (this.dry) {
            percentRange = [2, 87, 144, 180];
            percentLengthList = [2, 65, 30];
            addlist = [2, 5, 70];
          }
        }

        // 特殊处理单烘干模式
        if (isSingleDry) {
          percentRange = [1, 144, 180];
          percentLengthList = [10, 77];
          addlist = [12, 23];
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
        const rangeIndex = getRange(newV);
        const value = newV - percentRange[rangeIndex - 1];
        const sum = percentRange[rangeIndex] - percentRange[rangeIndex - 1];
        this.percent = Math.ceil(value / sum * percentLengthList[rangeIndex - 1] + addlist[rangeIndex - 1]);
      },
    },
    
    /**
   * @description 如果是单脱水、 漂+脱模式 按照时间来算进度条百分比
   */
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
