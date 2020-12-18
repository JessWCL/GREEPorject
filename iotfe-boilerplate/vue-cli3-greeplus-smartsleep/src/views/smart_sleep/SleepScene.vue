<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-02-24 08:54:41
 * @Description: 首次进入插件，完善个人信息
 -->
<template>
  <gree-view 
    class="page-sleep-scene" 
    bg-color="#FFFFFF">
    <gree-header
      :left-options="{ preventGoBack: true }"
      @on-click-back="goBack()"
    >
      {{ secondsData.no === 1 ? '起床提醒' : '入睡提醒' }}
      <div 
        slot="right" 
        @click="saveScene()" 
        style="height:31px;width: 1rem;">
        保存
      </div>
    </gree-header>
    <gree-page class="page-content">
      <!-- 时间选择 -->
      <div class="time-pick">
        <div id="TimerSelector"></div> 
      </div>
      <!-- 音乐选择 -->
      <div 
      class="music">
        <gree-row>睡眠音乐</gree-row>
        <!-- <div>{{(linkData.musicId)}}</div> -->
        <div class="img-list">
          <div 
            class="box" 
            v-for="(item, index) in musicDataArray" 
            :key="index">
            <div 
              class="name" 
              @click="playMusic(index,item.name)">{{ item.name }}</div>
            <img 
              ref="pickure" 
              :src="item.icon_a"
              :style="{'border': (linkData.musicId === index ? '2px #ffc700 solid' : ''),
                       'padding':(linkData.musicId=== index ? '2px':''),
                       'borderRadius':(linkData.musicId=== index ? '5px':'')}"
              @click="playMusic(index,item.name)" />
          </div>
        </div>
      </div>
      <gree-list>
        <gree-list-item
          link
          title="添加场景"
          @click.native="addScene()"
        ></gree-list-item>
        <gree-list-item 
          v-show="linkData.id" 
          media-item 
          class="scene"
        ><img
          slot="media"
          :src="
          linkData.id ? sceneList[linkData.id - 1].src : sceneList[0].src"
        /></gree-list-item>
        <div 
          v-show="linkData.id" 
          class="scene-name">
          {{
            linkData.id ? linkData.name : sceneList[0].name
          }}
        </div>
      </gree-list>
      <div class="tips">应用退到后台后,定时仅支持场景功能</div>
    </gree-page>
    <div 
      class="mask" 
      v-show="loading">
      <gree-activity-indicator 
        type="spinner" 
        :size="60" 
        :text-size="20"
      ></gree-activity-indicator
      >
    </div>
  </gree-view>

</template>

<script>
import md5 from 'md5';
import {
  Header,
  Field,
  InputItem,
  Row,
  Col,
  Switch,
  List,
  Item,
  Icon,
  Dialog,
  Popup,
  PopupTitleBar,
  Radio,
  RadioList,
  ScrollView,
  Toast,
  ActivityIndicator
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  tryPlaySleepMusic,
  editOrCreateLinkScene,
  getLinkItemData,
  playOrPauseMusic,
  showLoading
} from '../../../../static/lib/PluginInterface.promise';
import homeConfig from '../../mixins/config/smart_sleep/homeReport';

const hourData = [];
for (let i = 1; i < 25; i += 1) {
  hourData[i - 1] = i - 1 < 10 ? `0${i - 1}` : i - 1;
}
const minData = [];
for (let i = 1; i < 61; i += 1) {
  // if (i === 1) {
  //   minData[0] = '00';
  // } else {
  //   minData[i - 1] = (i - 1) * 1 < 10 ? `0${(i - 1) * 1}` : (i - 1) * 1;
  // }
  minData[i - 1] = (i - 1) * 1 < 10 ? `0${(i - 1) * 1}` : (i - 1) * 1;
}
export default {
  name: 'SleepScene',
  components: {
    [Header.name]: Header,
    [Field.name]: Field,
    [InputItem.name]: InputItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Switch.name]: Switch,
    [List.name]: List,
    [Item.name]: Item,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    [Popup.name]: Popup,
    [Radio.name]: Radio,
    [RadioList.name]: RadioList,
    [ScrollView.name]: ScrollView,
    [PopupTitleBar.name]: PopupTitleBar,
    [Toast.name]: Toast,
    [ActivityIndicator.name]: ActivityIndicator
  },
  mixins: [homeConfig],
  data() {
    return {
      loading: true,
      timePicker: null, // 时间选择器
      AIMode: false, // 智能模式
      nowHome: '请选择', // 选中的家庭
      selectedScene: '', // 已选择的场景
      name: '',
      Date1: 22, // 小时
      Date2: 0, // 分钟
      funcSleep: false, // 入睡提醒
      // showFamily: false,
      familyId: '0',
      musicId: 0,
      musicName: '',
      instanceMobiScroll: undefined, // mobiscroll实例
      pickerHourData: hourData,
      pickerMinData: minData,
      ifChange: false,
      ifClickSave: false,
      routerFlag: 0, // 路由状态 1：页面自带返回  0：系统自带返回
      // ifios: navigator.userAgent.match(/(iPhone|iPod|iPad);?/i),
      lastMd5Val: '', // 用于检测数据变化
      nowMd5Val: ''
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,
      secondsData: state => state.secondsData,
      linkData: state => state.linkData,
      sceneDetail: state => state.sceneDetail,
      musicDataArray: state => state.mainPageData.musicDataArray,
      funcSleepValue: state => state.mainPageData.funcSleepValue,
      funcWakeValue: state => state.mainPageData.funcWakeValue,
      currentSenceId: state => state.dataObject.currentSenceId
    })
  },
  watch: {},
  // activated() {},
  mounted() {
    this.pickerInit();
    if (!this.$route.query.pageIndex) {
      this.getLinkItemData();
    } else {
      this.instanceMobiScroll.setVal(
        `${
          this.linkData.hour > 10
            ? this.linkData.hour
            : `0${this.linkData.hour}`
        } ${
          this.linkData.min > 10 ? this.linkData.min : `0${this.linkData.min}`
        }`
      );
      setTimeout(() => {
        this.loading = false;
      }, 0);
      // this.lastMd5Val = md5(JSON.stringify(this.linkData));
    }
  },
  methods: {
    ...mapMutations({
      setLinkData: 'SET_LINK_DATA',
      // setTimes: 'SET_TIMES'
      setMainData: 'SET_MAIN_DATA',
      setCurrentScene: 'SET_CURRENT_SCENE'
    }),
    ...mapActions({
      getMainPageDate: 'GET_MAIN_PAGE_DATE'
    }),
    // 入睡提醒
    sendFuncSleep() {
      console.log(this.funcSleep);
    },
    // 选择场景,id和名字对应起来，nowHome 那里显示出来;
    addScene() {
      // 进入时预存下，让返回时能记录数据
      const valhour = Number(this.instanceMobiScroll.getVal().split(' ')[0]);
      const valmin = Number(this.instanceMobiScroll.getVal().split(' ')[1]);
      this.setLinkData({
        hour: valhour,
        min: valmin
      });
      this.$router.push({
        name: 'Scene'
      });
    },
    // 播放音乐: 试听10s 并且 保存的时候传给主体
    playMusic(id, name) {
      // if ((this.musicId !== id) & !this.ifChange) {
      //   this.ifChange = true;
      // }
      this.setLinkData({ musicId: id });
      this.musicName = name;
      this.$refs.pickure.forEach((item, index) => {
        if (index === id) {
          this.$refs.pickure[index].style.border = '2px #ffc700 solid';
          this.$refs.pickure[index].style.padding = '2px';
          this.$refs.pickure[index].style.borderRadius = '5px';
        } else {
          this.$refs.pickure[index].style.border = '';
          this.$refs.pickure[index].style.padding = '';
          this.$refs.pickure[index].style.borderRadius = '';
        }
      });
      tryPlaySleepMusic(id, true)
        .then(res => {
          console.log('startSleepMusic-callback：', res);
        })
        .catch(err => {
          console.log('err', err);
        });
      console.log('与主体对接，对应的音乐应该是根据id来寻找： ', id);
    },
    // 初始化时间选择器
    pickerInit() {
      // eslint-disable-next-line no-undef
      this.instanceMobiScroll = mobiscroll.scroller('#TimerSelector', {
        theme: 'ios',
        display: 'inline',
        showLabel: true,
        height: 70,
        rows: 3,
        minWidth: 120,
        wheels: [
          [
            {
              label: '',
              data: this.pickerHourData
            },
            {
              label: '',
              data: this.pickerMinData
            }
          ]
        ],
        onChange: (event, inst) => {
          console.log(inst);
        }
      });
    },
    // 退出触发
    goBack() {
      this.routerFlag = 1;
      playOrPauseMusic(1); // 关闭试听音乐
      // 检测滚轮数据变化没
      // if (!this.ifClickSave) {
      //   const valhour = Number(this.instanceMobiScroll.getVal().split(' ')[0]);
      //   const valmin = Number(this.instanceMobiScroll.getVal().split(' ')[1]);
      //   if (valhour !== this.linkData.hour || valmin !== this.linkData.min) {
      //     this.ifChange = true;
      //   }
      // }
      // if (this.currentSenceId !== this.linkData.selectedScene) {
      //   this.ifChange = true;
      // }
      const valhour = Number(this.instanceMobiScroll.getVal().split(' ')[0]);
      const valmin = Number(this.instanceMobiScroll.getVal().split(' ')[1]);
      this.setLinkData({
        hour: valhour,
        min: valmin
      });
      this.lastMd5Val = window.localStorage.getItem('lastMd5Val');
      this.nowMd5Val = md5(JSON.stringify(this.linkData));
      if ((this.nowMd5Val !== this.lastMd5Val) & !this.ifClickSave) {
        Dialog.confirm({
          title: '提示',
          content: '设置尚未保存，是否退出',
          confirmText: '保存并退出',
          onConfirm: () => {
            console.log('[Dialog.confirm] confirm clicked');
            // TODO:此处业务逻辑，主体接口
            this.sendSetState();
            // this.getMainPageDate(this.mac);
            this.$router.push({ name: 'MySleep' });
          },
          cancelText: '退出',
          onCancel: () => {
            console.log('[Dialog.confirm] cancel clicked');
            this.$router.push({ name: 'MySleep' });
          }
        });
      } else {
        // this.getMainPageDate(this.mac);
        this.$router.push({ name: 'MySleep' });
      }
    },
    // 确认书否退出
    saveScene() {
      playOrPauseMusic(1);
      this.sendSetState();
      // this.getMainPageDate(this.mac);
    },
    // 发送保存状态，接口放这里
    sendSetState() {
      const time = this.instanceMobiScroll.getVal().replace(' ', ':');
      const musicId = this.linkData.musicId;
      const musicName = this.musicName
        ? this.musicName
        : this.musicDataArray[this.linkData.musicId].name;
      const linkName = this.secondsData.no === 1 ? '懒人起床' : '入睡提醒';
      const opt =
        this.secondsData.no === 1 ? this.funcWakeValue : this.funcSleepValue;
      const mac = this.mac;
      const iid = this.secondsData.smartIndex;
      const selectedScene = this.linkData.selectedScene;
      this.setCurrentScene(selectedScene);
      const json =
        selectedScene === ''
          ? JSON.stringify({
              time,
              musicId,
              musicName,
              linkName,
              mac,
              iid,
              opt
            })
          : JSON.stringify({
              time,
              musicId,
              musicName,
              linkName,
              mac,
              iid,
              selectedScene,
              opt
            });
      this.setLinkData({
        hour: time.split(':')[0],
        min: time.split(':')[1],
        selectedScene,
        name: this.linkData.name
      });
      console.log('保存数据', json);
      editOrCreateLinkScene(json, JSON.stringify(this.sceneDetail))
        .then(res => {
          console.log(res);
          this.ifClickSave = true;
          // 防止主页数据拿的太慢产生跳变，先行改变
          if (this.secondsData.no === 1) {
            this.setMainData({
              wakeUpStandardTime: `${time.split(':')[0]}:${time.split(':')[1]}`
            });
          } else {
            this.setMainData({
              sleepStandardTime: `${time.split(':')[0]}:${time.split(':')[1]}`
            });
          }
          Toast({
            content: '保存成功',
            position: 'bottom'
          });

          setTimeout(() => {
            showLoading();
            this.getMainPageDate(this.mac);
            this.$router.push({ name: 'MySleep' });
          }, 1000);
        })
        .catch(err => {
          // Toast.info('保存失败');
          Toast({
            content: '保存失败',
            position: 'bottom'
          });
          console.log('err', err);
        });
    },
    getLinkItemData() {
      console.log('smartIndex', this.secondsData.smartIndex);
      getLinkItemData(this.secondsData.smartIndex)
        .then(res => {
          console.log('二级数据拿到了', res);
          if (res) {
            const _res = JSON.parse(res);
            this.Date1 = Number(_res.timing.split(':')[0]);
            this.Date2 = Number(_res.timing.split(':')[1]);
            this.instanceMobiScroll.setVal(
              `${this.Date1 > 10 ? this.Date1 : `0${this.Date1}`} ${
                this.Date2 > 10 ? this.Date2 : `0${this.Date2}`
              }`
            );
            let selectedScene = '';
            let id = '';
            let name = '';
            if (Object.keys(_res).indexOf('sceneInfo') > -1) {
              selectedScene = Number(_res.sceneInfo.split(',')[0]); // 图片位置id
              id = Number(_res.sceneInfo.split(',')[2]); // 图片下标id
              name = _res.sceneInfo.split(',')[1];
            } else {
              selectedScene = '';
            }
            this.musicId = Number(_res.musicId);
            this.setLinkData({
              hour: this.Date1,
              min: this.Date2,
              musicId: Number(_res.musicId),
              selectedScene,
              name,
              id
            });
            this.setCurrentScene(selectedScene);
          } else {
            this.instanceMobiScroll.setVal(
              `${this.secondsData.no === 1 ? '07' : '22'} 00`
            );
            this.setLinkData({
              hour: this.secondsData.no === 1 ? 7 : 22,
              min: 0,
              musicId: 0,
              selectedScene: '',
              name: '',
              id: ''
            });
          }
          // this.pickerInit();
          // this.$nextTick(() => {
          //   this.loading = false;
          // });
          this.musicName = this.musicDataArray[this.linkData.musicId].name;
          setTimeout(() => {
            this.loading = false;
          }, 100);
          window.localStorage.setItem(
            'lastMd5Val',
            md5(JSON.stringify(this.linkData))
          );
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.routerFlag) {
      if (to.name === 'MySleep') {
        playOrPauseMusic(1); // 关闭试听音乐
      }
      const valhour = Number(this.instanceMobiScroll.getVal().split(' ')[0]);
      const valmin = Number(this.instanceMobiScroll.getVal().split(' ')[1]);
      this.setLinkData({
        hour: valhour,
        min: valmin
      });
      this.lastMd5Val = window.localStorage.getItem('lastMd5Val');
      this.nowMd5Val = md5(JSON.stringify(this.linkData));
      if (
        (this.nowMd5Val !== this.lastMd5Val) &
        !this.ifClickSave &
        (to.name === 'MySleep')
      ) {
        Dialog.confirm({
          title: '提示',
          content: '设置尚未保存，是否退出',
          confirmText: '保存并退出',
          onConfirm: () => {
            console.log('[Dialog.confirm] confirm clicked');
            // TODO:此处业务逻辑，主体接口
            this.sendSetState();
            next();
          },
          cancelText: '退出',
          onCancel: () => {
            console.log('[Dialog.confirm] cancel clicked');
            next();
          }
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';
@import '@/assets/scss/SleepScene.scss';
</style>
