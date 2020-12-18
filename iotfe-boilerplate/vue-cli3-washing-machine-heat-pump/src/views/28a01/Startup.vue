<template>
  <!-- Home主页，包含一个简易页面，请根据实际业务修改 -->
  <gree-view bg-color="#f4f4f4">
    <Header :fun="goBack" />
    <gree-page class="page-startup">
      <!-- 图片区域 -->
      <div
        class="page-mode"
        :style="{
          backgroundImage: `url(${washmodeImg[washMode]})`,
        }"
      >
        <div
          class="mode-favorites"
          :class="{ active: star }"
          v-show="devState !== 3"
          @click="handleStar(!star)"
        />
        <div class="mode-time" v-if="devState !== 3">
          {{ timeLeft | timeConversion }}
        </div>
        <!-- 特殊文字显示 -->
        <div class="mode-text2" v-else>
          {{ processDescribe }}
        </div>

        <div class="mode-name">
          {{ washmodeName[washMode] }}
        </div>

        <div class="progress-describe">
          {{ processText[runStage] }}
        </div>
        <!-- 进度条 -->
        <gree-progress-bar
          class="progress-bar"
          :percent="percent"
          :stroke-color="['#FFB42C', '#FFDC62']"
        ></gree-progress-bar>

        <div class="data-list-div-div">
          <div class="data-list-div">
            <!-- 故障提示 -->
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

        <!--洗涤--漂洗--脱水--结束 -->

        <!-- <gree-row class="data-list2">
          <gree-col
            width="20"
            v-for="(item, index) in startupstatus"
            :key="index"
          >
            <p>{{ item }}</p>
          </gree-col>
        </gree-row> -->
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
      <div class="start-or-pause">
        <gree-button
          v-if="devState !== 3"
          :class="{
            opacity: isDisable || specialLock,
            textBlue: describe === '继续'
          }"
          class="pause-btn"
          round
          @click="handlePause"
        >{{ describe }}</gree-button
        >
      </div>
      <!-- 底下按钮 开关-高级-模式 -->
      <gree-toolbar position="bottom" no-hairline>
        <gree-row>
          <gree-col
            :class="{ hidden: !item.isShowFuncBtn, opacity: item.isDisabled }"
            v-for="(item, index) in startFootList"
            :key="index"
            @click.native="setFunction('bottom', index)"
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
import {
  Row,
  Col,
  Button,
  ProgressBar,
  ToolBar,
  NoticeBar
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  changeBarColorPlugin,
  closePagePlugin,
  showToastPlugin,
} from '../../api/pluginInterface';
import advancedList from '../../../src/api/28a01/advanced';
import Header from '../../components/Header';
import { washmodeName, washmodeImg } from '../../api/utils';
import footConfig from '../../api/home';
import error from '../../mixins/config/error';
import favorModule from '../../mixins/config/28a01/favorModule';


export default {
  name: 'Home',
  components: {
    Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [ProgressBar.name]: ProgressBar,
    [ToolBar.name]: ToolBar,
    [NoticeBar.name]: NoticeBar,
  },
  mixins: [footConfig, error, favorModule],
  data() {
    return {
      star: 0,
      moreList: ['设备信息', '洗衣机设置', '收藏夹'],
      advancedList,
      washmodeName,
      washmodeImg,
      isDisable: false,
      describe: '暂停',
      percent: 1,
      processDescribe: '已完成',
      processText: {
        1: '预约等待', 
        2: '检测水位', 
        4: '低温进水', 
        7: '低温加热', 
        13: '洗涤称重', 
        16: '预洗进水', 
        19: '预洗补水', 
        22: '预洗加热', 
        25: '预洗排水',
        28: '预洗消泡1',
        31: '预洗消泡2',
        34: '预洗脱水',
        37: '主洗进水',
        39: '预投放',
        40: '主洗补水',
        41: '投放洗涤剂',
        42: '浸泡洗涤',
        43: '主洗加热',
        46: '主洗可调洗涤',
        48: '主洗强力洗',
        49: '主洗称重洗涤',
        52: '主洗节能洗涤',
        55: '主洗冷却',
        58: '主洗排水',
        60: '主洗消泡',
        61: '主洗消泡1',
        64: '主洗消泡2',
        67: '主洗脱水',
        70: '漂洗进水',
        73: '漂洗补水',
        76: '漂洗排水',
        78: '漂洗消泡',
        79: '漂洗消泡1',
        82: '漂洗消泡2',
        83: '漂洗脱水',
        84: '软化漂进水',
        85: '投放柔顺剂',
        86: '软化漂补水',
        87: '免排水',
        88: '最终排水',
        96: '最终消泡',
        97: '消泡3',
        100: '消泡4',
        103: '防皱脱水',
        107: '防皱抖散',
        123: '夜间洗脱水',
        126: '夜间洗松散',
        138: '最终脱水',
        141: '最终松散',
        144: '烘干排水',
        145: '烘干预脱',
        146: '烘干抖散',
        147: '烘干舒展',
        148: '烘干脱水',
        150: '烘干称重',
        153: '烘干松散',
        156: '烘干升温',
        159: '烘干判干',
        160: '额外判干',
        162: '烘干降温',
        165: '蒸汽熨烫',
        168: '蒸汽升温',
        171: '蒸汽烘干',
        174: '蒸汽降温',
        180: '运行结束',
      },
    };
  },
  computed: {
    ...mapState({
      timeLeft: state => state.dataObject.timeLeft,
      timeAll: state => state.dataObject.timeAll,
      washMode: state => state.dataObject.washMode,
      devState: state => state.dataObject.devState,
      // 按键启动1 暂停0
      launch: state => state.dataObject.launch,
      childLock: state => state.dataObject.childLock,
      specialLock: state => state.dataObject.specialLock, // 童鎖是否生效
      JFerr: state => state.dataObject.JFerr,
      runStage: state => state.dataObject.runStage,
      Pow: state => state.dataObject.Pow,
      mute: state => state.dataObject.mute,
      runTime: state => state.dataObject.runTime, // 已运行时间
      
    }),
  },
  watch: {
    Pow(newV) {
      if (!newV && this.devState) {
        this.setDataObj({devState: 0});
        this.$router.push({
          name: 'Home',
        });
      }
    },
    JFerr(newV) {
      if (newV) this.$router.push({name: 'Error'});
    },
    /**
     * @description 整机状态判断
     */
    devState: {
      immediate: true,    
      handler(newV) {
        switch (newV) {
          case 0:
            this.$router.push({
              name: 'Home',
            });
            break; 
          case 1:
            this.describe = '暂停';
            break;
          case 2:
            this.describe = '继续';
            break;     
          case 3:
            this.percent = 100;
            break; 
          case 4:
            this.describe = '继续';
            this.$router.push({
              name: 'Error',
            });
            break;
          default:
            break;
        }
      }
    },
    
    /**
     * @description 进度条显示
     */
    timeLeft: {
      immediate: true,
      handler(newV) {
        let value = (1 - newV / this.runTime);
        if (!value) value = 0.02;
        this.percent = value * 100;
        if (this.percent < 2) this.percent = 2;
        if (this.devState === 3) this.percent = 100;
      }
    }
  },


  mounted() {
    changeBarColorPlugin('#F4F4F4');
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
      if (this.launch || this.devState === 3 || this.devState === 1) {
        closePagePlugin();
      } else {
        this.$router.push({
          name: 'Home'
        });
      }
    },

    /**
     * @description: 发送暂停或重新开启指令
     */
    handlePause() {
      if (this.specialLock) {
        showToastPlugin('请先解锁童锁');
        return;
      }
      if (!this.isDisable) {
        const obj = {};
        obj.launch = Number(!this.launch);
        const devState = obj.launch ? 1 : 2;
        const obj2 = {devState};

        if (this.childLock) obj2.specialLock = obj.launch; // 童锁开启状态下 启动或者暂停

        this.setDataObj(Object.assign(obj2, obj));
        this.isDisable = true;
        setTimeout(() => {
          this.isDisable = false;
        }, 1500);
        this.sendCtrl(obj);
      } else {
        showToastPlugin('请勿频繁操作');
      }
    },
    /**
     * @description 底部两个选项选择
     */
    setFunction(type, index) {
      const obj = {};
      switch (index) {
        case 0:
          obj.Pow = 0;
          this.setDataObj(Object.assign({devState: 0}, obj));
          this.sendCtrl(obj);
          this.$router.push({
            name: 'Home',
          });
          break;
        case 1:
          if (this.childLock && this.devState) {
            showToastPlugin('请先解锁童锁');
            return;
          }
          obj.mute = !this.mute >> 0;
          break;
        case 2:
          obj.childLock = !this.childLock << 0;
          break;
        default:
          break;
      }
      this.setDataObj(obj);
      this.sendCtrl(obj);
    },
  },
};
</script>
