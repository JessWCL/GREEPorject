<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-02-24 10:50:48
 * @Description: 首次进入插件，完善个人信息
 -->
<template>
  <gree-view 
    class="page-my-sleep" 
    bg-color="#010A0C">
    <gree-page 
      no-navbar
      class="page-content">  
      <div
        class="page-header"
        :style="{backgroundImage:'url(' + head_bg + ')'}"
      >  
        <gree-header
          theme="transparent"
          :left-options="{ preventGoBack: true }"
          @on-click-back="goBack()"
        >
          我的睡眠
          <gree-dropdown
            slot="right"
            position="is-bottom-left"
          >
            <img 
              v-show="deviceList"
              slot="trigger" 
              :src="deviceImg" />
            <gree-dropdown-item 
              v-for="(item,index) in deviceList" 
              :key="index"
              @click.native="changeDevice(item.mac,index)">{{ item.name }}</gree-dropdown-item>
          </gree-dropdown>
        </gree-header>
        <!-- 音乐控制 -->
        <transition name="slide-fade">
          <div 
            class="music-control" 
            v-show="musicStatus">
            <!-- <div v-show="false">{{musicStatus}}</div> -->
            <img 
              class="img_first"
              :src="musicDataArray[musicIndex].disk_a" 
              @click="musicCtrl('detal',musicIndex)">
            <div 
              class="music-play"
              @click="musicCtrl('play')">
              <img 
                class="img_second"
                :src="musicImg[1].src[playStatus === 'true' ? 1 : 0]" 
              >
            </div>
            <div 
              class="music-close"
              @click="musicCtrl('close')">
              <img 
                :src="musicImg[2]" 
              >
            </div>
          </div>
        </transition>
        <div 
          class="head-content" 
          v-if="deviceList"
        >
          <!-- 分数 -->
          <div class="circle-show">
            <gree-progress
              @click.native="sleepReportDetail"
              v-if="circleValue"
              type="dashboard"
              :width="160"
              :stroke-width="3.5"
              border-color="#7E8891"
              :value="circleValue"
              color="white"
            >
            </gree-progress>
            <gree-progress
              @click.native="sleepReportDetail"
              class="noData"
              v-else
              type="dashboard"
              :width="160"
              :stroke-width="3.5"
              border-color="#c0cdf048"
              :value="nodata"
              color="#7E8891"
            ></gree-progress>
            <div class="txt-show">
              <div>睡眠评分</div>
              <div>{{ getYestDay() }}</div>
            </div>
          </div>
          <!-- 起卧时间 -->
          <div 
            class="bottom_show" 
          >
            <gree-row>
              <gree-col>入睡时间</gree-col>
              <gree-col>起床时间</gree-col>
            </gree-row>
            <gree-row>
              <gree-col>{{ sleepStartAt }}</gree-col>
              <gree-col>{{ sleepEndAt }}</gree-col>
            </gree-row>
          </div>
        </div>
        <div 
          class="no_devive" 
          v-else
        >
          <ul class="no_device_content">
            <li>您当前家庭</li>
            <li>还没有睡眠设备哦</li>
            <li @click="goUse">现在使用</li>           
          </ul>
        </div>
      </div>
      <div class="control-area">
        <gree-list>
          <gree-list-item
            class="control"
            title="入睡提醒"
            @click.native="goToSleepScene()"
          >
            <span slot="footer">将在 {{ sleepStandardTime }} 提醒您入睡</span>
            <!-- <gree-switch
              slot="after"
              v-model="funcSleeps"
              @click.native="$event.stopPropagation()"
              @change="sendFuncSleep()"
            ></gree-switch> -->
            <van-switch  
              slot="after"
              :value="funcSleeps" 
              size="24"
              active-color="#ffd03f"
              inactive-color="#FFFFFF"
              @click.native="$event.stopPropagation()"
              @input="sendFuncSleep" />
          </gree-list-item>
          <gree-list-item
            class="control"
            title="起床提醒"
            @click.native="goToWakeUpScene()"
          >
            <span slot="footer">将在 {{ wakeUpStandardTime }} 提醒您起床</span>
            <!-- <gree-switch
              slot="after"
              v-model="funcWakes"
              @click.native="$event.stopPropagation()"
              @change="sendFuncWake()"
            ></gree-switch> -->
            <van-switch  
              slot="after"
              :value="funcWakes" 
              size="24"
              active-color="#ffd03f"
              inactive-color="#FFFFFF"
              @click.native="$event.stopPropagation()"
              @input="sendFuncWake" />
          </gree-list-item>
          <gree-list-item
            class="control"
            title="Ai睡眠"
            footer="将根据您的睡眠状态调整您的空调状态"
          > 
            <div 
              v-if="!hasAirCondition" 
              class="switch_help"  
              slot="after"
              @click="help">
              <img 
                src="../../assets/img/help.png" 
                alt="help">
            </div>
            <!-- <gree-switch
              v-else
              slot="after"
              v-model="smartModes"
              @change="sendSmartMode()"
            ></gree-switch> -->
            <van-switch  
              v-else
              slot="after"
              :value="smartModes" 
              size="24"
              active-color="#ffd03f"
              inactive-color="#FFFFFF"
              @click.native="$event.stopPropagation()"
              @input="sendSmartMode" />
          </gree-list-item>
        </gree-list>
        <div class="music">
          <gree-row>睡眠音乐</gree-row>
          <gree-scroll-view 
            ref="scrollView" 
            :scrolling-y="false" 
            :touch-angle="80" 
            :auto-reflow="true"
            :is-prevent="false">
            <div class="img-list">
              <div 
                class="box" 
                v-for="(item, index) in musicDataArray" 
                :key="index"> 
                <div 
                  class="name" 
                  @click="playMusic(index)">{{ item.name }}</div>    
                <img 
                  :src="item.icon_a" 
                  @click="playMusic(index)"/>
                <div 
                  class="progress-bg"
                  ref="progressbg"
                  v-show="false"
                >
                  <gree-progress 
                    :value="progressList[index] ? progressList[index] : 0.01" 
                    :width="2" 
                    color="#FFF" 
                    :size="20"> 
                  </gree-progress>
                </div>
              </div>
            </div>
          </gree-scroll-view>
        </div>
        <div class="more">
          <gree-button 
            color="#ffd03f"
            type="positive" 
            round 
            size="large" 
            @click="moreCourse"
          >更多课程</gree-button
          >
        </div>
      </div>
    </gree-page>
    <gree-dialog
      title="Ai睡眠"
      v-model="slotDialog.open"
      :btns="slotDialog.btns"
      mask-closable
    >
      <ul>
        <li>若需要体验此功能,需要使用睡眠监测设备和空调设备,并且将睡眠监测设备与空调设置在同一房间中。</li>
        <li>支持空调设备：带WIFI的挂机空调或柜机空调</li>
        <li @click="settingLink()">如何设置房间？</li>
      </ul>
    </gree-dialog>
    <!-- <div 
      class="offline" 
      v-show="musicDataArray.length === 0">
      <img src="../../assets/img/offine.png">
      <div class="off_text"> 
        <span>加载失败了！</span>
        <span @click="reflash">重新加载</span>
      </div>
    </div> -->
  </gree-view>
</template>

<script>
import {
  Header,
  Field,
  InputItem,
  Row,
  // Switch,  // 存在问题暂时用vant
  Progress,
  Col,
  Button,
  List,
  Item,
  Dropdown,
  DropdownItem,
  ScrollView,
  ActivityIndicator,
  Dialog
} from 'gree-ui';
import { Switch } from 'vant';
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  closePage,
  startSleepMusic,
  playOrPauseMusic,
  requestStartLinkTask,
  setIntelligenceSwitch,
  goToConfigNetWorkForMattress,
  editOrCreateLinkScene,
  changeBarColor,
  downloadMusic,
  toWebPage,
  tryPlaySleepMusic,
  startPlugin
} from '../../../../static/lib/PluginInterface.promise';
import homeConfig from '../../mixins/config/smart_sleep/homeReport';

export default {
  name: 'MySleep',
  components: {
    [Header.name]: Header,
    [Field.name]: Field,
    [InputItem.name]: InputItem,
    [Row.name]: Row,
    [Switch.name]: Switch,
    [Progress.name]: Progress,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [List.name]: List,
    [Item.name]: Item,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [ScrollView.name]: ScrollView,
    [ActivityIndicator.name]: ActivityIndicator,
    [Dialog.name]: Dialog
  },
  mixins: [homeConfig],
  data() {
    return {
      head_bg: require('@/assets/img/bg_mysleep.png'),
      deviceImg: require('@/assets/img/device.png'),
      funcSleeps: '',
      funcWakes: '',
      smartModes: '',
      nodata: 1,
      showDevs: false, // 设备列表显示
      mid: 70401, // 点击进入当前设备时的mid
      musicStatus: false, // 默认显示
      slotDialog: {
        open: false,
        btns: [
          {
            text: '知道了',
            handler: this.iknown
          },
          {
            text: '购买空调',
            handler: this.buy
          }
        ]
      },
      playMusicValue: false,
      mrId: 1, // 默认id
      progressList: [], // 进度数组
      mussicPlayList: [] // 音节是否下载数组列表
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,
      musicIndex: state => state.dataObject.musicIndex,
      playStatus: state => state.dataObject.playStatus,
      Status: state => state.Status,
      funcSleepValue: state => state.mainPageData.funcSleepValue,
      funcSleep: state => state.mainPageData.funcSleep,
      sleepIndex: state => state.mainPageData.sleepIndex,
      funcWakeValue: state => state.mainPageData.funcWakeValue,
      funcWake: state => state.mainPageData.funcWake,
      wakeupindex: state => state.mainPageData.wakeupindex,
      circleValue: state => state.mainPageData.circleValue,
      sleepStartAt: state => state.mainPageData.sleepStartAt,
      sleepEndAt: state => state.mainPageData.sleepEndAt,
      deviceList: state => state.mainPageData.deviceList,
      currentMacIndex: state => state.mainPageData.currentMacIndex,
      smartMode: state => state.mainPageData.smartMode,
      sceneDetail: state => state.sceneDetail,
      musicDataArray: state => state.mainPageData.musicDataArray,
      hasAirCondition: state => state.mainPageData.hasAirCondition,
      sleepStandardTime: state => state.mainPageData.sleepStandardTime,
      wakeUpStandardTime: state => state.mainPageData.wakeUpStandardTime,
      tryStatus: state => state.dataObject.tryStatus
    })
  },
  watch: {
    funcSleep: {
      handler(newVal) {
        this.funcSleeps = newVal;
      },
      immediate: true
    },
    funcWake: {
      handler(newVal) {
        this.funcWakes = newVal;
      },
      immediate: true
    },
    smartMode: {
      handler(newVal) {
        this.smartModes = newVal;
      },
      immediate: true
    },
    // playStatus: {
    //   handler(newVal) {
    //     console.log(this);
    //     if (!this.tryStatus) {
    //       this.musicStatus = false;
    //     } else if (newVal === 'true' || newVal === true) {
    //       this.musicStatus = true;
    //     }
    //   },
    //   immediate: true
    // },
    tryStatus: {
      handler(newVal) {
        if (newVal) {
          this.musicStatus = true;
        } else {
          this.musicStatus = false;
        }
      }
      // immediate: true
    },
    musicDataArray: {
      handler(newVal) {
        for (let i = 0; i < newVal.length; i += 1) {
          this.progressList[i] = 0.01;
          this.mussicPlayList[i] = newVal[i].exist;
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    if (!this.Status) {
      console.log('重新启动定时器');
      this.setDeviceLoop(true);
      this.getDeviceInfo();
    }
  },
  mounted() {
    changeBarColor('#000000');
    if (!this.tryStatus) {
      this.musicStatus = false;
    } else {
      this.musicStatus = true;
    }

    // for (let i = 0; i < this.musicDataArray.length; i += 1) {
    //   this.progressList[i] = 0.01;
    //   this.mussicPlayList[i] = this.musicDataArray[i].exist;
    // }
  },

  methods: {
    ...mapMutations({
      setMusicObject: 'SET_MUSIC_OBJECT',
      setDeviceLoop: 'DEVICE_LOOP',
      setSecondData: 'SET_SECOND_DATA',
      setMainData: 'SET_MAIN_DATA',
      setMac: 'SET_MAC'
      // setProgressVal: 'SET_PROGRESS_VALUE',
      // setLoadStatus: 'SET_LOAD_STATUS'
    }),
    ...mapActions({
      getDeviceInfo: 'GET_DEVICE_INFO',
      getMainPageDate: 'GET_MAIN_PAGE_DATE'
    }),
    // 选择设备列表: 设备列表dom还没写
    showDevsList() {
      this.showDevs ? (this.showDevs = false) : (this.showDevs = true);
      console.log('选择设备列表');
    },
    // 购买设备连接
    buyDevs() {},
    // 进入插件操作
    goToPlugin(mid) {
      console.log('当前设备mid：', mid);
    },
    // 跳转入睡提醒详情设置
    goToSleepScene() {
      this.setDeviceLoop(false);
      this.setSecondData({
        smartIndex: this.sleepIndex,
        no: 0,
        mac: this.currentMacIndex
      });
      this.$router.push({
        name: 'SleepScene',
        query: {
          pageIndex: 0
        }
        // query: { smartIndex: this.sleepIndex, no: 0, mac: this.currentMacIndex }
      });
    },
    // 跳转懒人起床
    goToWakeUpScene() {
      this.setDeviceLoop(false);
      this.setSecondData({
        smartIndex: this.wakeupindex,
        no: 1,
        mac: this.currentMacIndex
      });
      this.$router.push({
        name: 'SleepScene',
        query: {
          pageIndex: 0
        }
      });
    },
    // 入睡提醒
    sendFuncSleep(checked) {
      this.funcSleeps = checked;
      const iid = this.sleepIndex;
      console.log('this.funcSleepValue', this.funcSleepValue);
      const obj = {
        funcSleep: this.funcSleeps,
        funcSleepValue: this.funcSleepValue ? 0 : 1
      };
      this.setMainData(obj);
      console.log(`${iid}!!!${this.funcSleeps}`);
      if (iid === -1) {
        const time = '22:00';
        const musicId = 0;
        const linkName = '入睡提醒';
        const mac = this.mac;
        const musicName = this.musicDataArray[0].name;
        const iid = -1;
        const opt = 1;
        const json = JSON.stringify({
          time,
          musicId,
          linkName,
          mac,
          iid,
          musicName,
          opt
        });
        editOrCreateLinkScene(json, JSON.stringify(this.sceneDetail))
          .then(res => res)
          .catch(err => {
            console.log('err', err);
          });
      } else {
        requestStartLinkTask(iid, this.funcSleepValue)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 懒人起床
    sendFuncWake(checked) {
      this.funcWakes = checked;
      const iid = this.wakeupindex;
      const obj = {
        funcWake: this.funcWakes,
        funcWakeValue: this.funcWakeValue ? 0 : 1
      };
      this.setMainData(obj);
      console.log(`${iid}!!!${this.funcWakeValue}`);
      if (iid === -1) {
        const time = '07:00';
        const musicId = 0;
        const linkName = '懒人起床';
        const mac = this.mac;
        const musicName = this.musicDataArray[0].name;
        const iid = -1;
        const opt = 1;
        const json = JSON.stringify({
          time,
          musicId,
          linkName,
          mac,
          iid,
          musicName,
          opt
        });
        editOrCreateLinkScene(json, JSON.stringify(this.sceneDetail))
          .then(res => res)
          .catch(err => {
            console.log('err', err);
          });
      } else {
        requestStartLinkTask(iid, this.funcWakeValue)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        console.log(this.funcWake);
      }
    },
    sendSmartMode(checked) {
      this.smartModes = checked;
      const obj = {
        smartMode: this.smartModes
      };
      const opt = this.smartModes ? 1 : 0;
      this.setMainData(obj);
      console.log('智能模式', opt);
      setIntelligenceSwitch(opt)
        .then(res => {
          console.log('智能模式开关返回值', res);
        })
        .catch(err => err);
    },
    // 音乐控制函数
    musicCtrl(type, index) {
      switch (type) {
        case 'detal':
          this.playMusic(index);
          break;
        case 'play':
          playOrPauseMusic(0)
            .then(res => {
              console.log('startSleepMusic-callback：', res);
              // this.playStatus = true;
              this.setMusicObject(
                `${this.playStatus !== 'true'},${this.musicIndex},${
                  this.tryStatus
                }`
              );
            })
            .catch(err => {
              console.log('err', err);
            });
          console.log('音乐控制', type);
          break;
        case 'close':
          this.musicStatus = false;
          playOrPauseMusic(1)
            .then(res => {
              console.log('startSleepMusic-callback：', res);
              // this.playStatus = true;
              this.setMusicObject(
                `${this.playStatus !== 'true'},${this.musicIndex}`
              );
            })
            .catch(err => {
              console.log('err', err);
            });
          break;
        default:
          break;
      }
    },
    // 播放音乐
    playMusic(index) {
      console.log('与主体对接，对应的音乐应该是根据id来寻找： ', index);
      // this.musicIndex = id;
      if (this.mussicPlayList[index]) {
        // this.musicStatus = true;
        startSleepMusic(index)
          .then(res => res)
          .catch(err => {
            console.log('err', err);
          });
        this.setMusicObject(`${this.playStatus},${index},${this.tryStatus}`);
      } else {
        this.$refs.progressbg[index].style.display = '';
        this.playMusicValue = false;
        downloadMusic(index, this.updata);
      }

      // editOrCreateLinkScene(url).then(res => res);
    },
    updata(params) {
      console.log('走到了', params);
      this.$set(
        this.progressList,
        Number(JSON.parse(params).id),
        Number(JSON.parse(params).value)
          ? Number(JSON.parse(params).value) / 100
          : 0.01
      );
      if (Number(JSON.parse(params).value) === 100) {
        this.musicStatus = true;
        this.$refs.progressbg[Number(JSON.parse(params).id)].style.display =
          'none';
        this.$set(this.mussicPlayList, Number(JSON.parse(params).id), 1);
        if (!this.playMusicValue) {
          this.mrId = Number(JSON.parse(params).id);
          this.playMusicValue = true;
          tryPlaySleepMusic(this.mrId, false)
            .then(res => {
              console.log('startSleepMusic-callback：', res);
              // this.playStatus = true;
              this.setMusicObject(
                `${this.playStatus !== 'true'},${this.musicIndex}`
              );
            })
            .catch(err => {
              console.log('err', err);
            });
        }
      }
    },
    // 更多课程
    moreCourse() {
      toWebPage(this.moreCourseUrl, '更多课程');
      console.log('更多课程：moreCourse');
    },
    goBack() {
      closePage();
    },
    changeDevice(mac, index) {
      // this.currentMacIndex = index;
      const obj = {
        currentMacIndex: index
      };
      this.setMainData(obj);
      this.setMac(mac);
      this.getMainPageDate(mac);
    },
    getYestDay() {
      const time = new Date().getTime() - 24 * 60 * 60 * 1000;
      let yesterday = new Date(time);
      yesterday = `${yesterday.getFullYear()}.${
        yesterday.getMonth() > 9
          ? yesterday.getMonth() + 1
          : `0${yesterday.getMonth() + 1}`
      }.${
        yesterday.getDate() > 9
          ? yesterday.getDate()
          : `0${yesterday.getDate()}`
      }`;
      return yesterday;
    },
    goUse() {
      goToConfigNetWorkForMattress()
        .then(res => res)
        .catch(error => error);
    },
    onScroll({ scrollTop }) {
      this.scrollY = scrollTop;
    },
    help() {
      this.slotDialog.open = true;
    },
    iknown() {
      this.slotDialog.open = false;
    },
    buy() {
      toWebPage(this.buyUrl, '董总的店');
    },
    settingLink() {
      toWebPage(this.setting, '帮助');
    },
    reflash() {
      this.getMainPageDate();
    },
    sleepReportDetail() {
      startPlugin(this.mac.split('#')[0]);
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';
@import '@/assets/scss/MySleep.scss';
</style>
