<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-06-15 15:35:31
 * @Description: 左右床垫控制页面
 -->
<template>
  <gree-view class="page-first-in" bg-color="#0b83e9">
    <gree-header
      :style="{ backgroundImage: 'url(' + head_bg + ')' }"
      :left-options="{ preventGoBack: true }"
      :right-options="{ showMore: true }"
      @on-click-back="goBack()"
      @on-click-more="moreInfo()"
    >软硬度调节</gree-header
    >
    <gree-page class="page-content">
      <div
        class="header-block"
        :style="{ backgroundImage: 'url(' + head_bg + ')' }"
      >
        <div class="header-content">
          <img :src="statusPic"/>
          <gree-row class="bed-txt"><span :style="{'opacity': !inBedStateLeft ? '.6' : '0'}">床垫左侧</span><span :style="{'opacity': !inBedStateRight ? '.6' : '0'}">床垫右侧</span></gree-row>
        </div>
        <!-- 左右床控制 -->
        <div class="left-right">
          <gree-tab-bar
            v-model="currentControl"
            :items="bedSide"
          ></gree-tab-bar>
        </div>

        <!-- 控制首页 -->
        <template v-if="AutoControl === 0">
          <div class="center-zoom">
            <gree-row>
              <span>{{ ( inBedStateLeft === 1 && currentControl === 1 ) || ( inBedStateRight === 1 && currentControl === 2 ) ? '已检测有人在床' : '请先躺在床上，再开始智能调节' }}</span>
            </gree-row>
            <gree-row>
              <span @click="changeWay('hande')">{{ ( currentControl === 1 ) || ( currentControl === 2 ) ? '手动调节' : '' }}</span>
            </gree-row>
          </div>
          <div class="bottom-btn">
            <gree-button type="positive" @click="changeWay('startAuto')" :inactive="( inBedStateLeft === 0 && currentControl === 1 ) || ( inBedStateRight === 0 && currentControl === 2 ) ? true : false"
            >智能调节</gree-button
            >
          </div>
        </template>

        <!-- 手动调节 -->
        <template v-else-if="AutoControl === 1">
          <div class="control-zoom" v-if="currentControl === 1">
            <gree-row>
              <gree-col>肩部</gree-col>
            </gree-row>
            <gree-row class="slider-item">
              <gree-col width="10">软</gree-col>
              <gree-col width="80">
                <van-slider
                  v-model="pressureSetupBothLeftSetup"
                  :min="5"
                  :max="100"
                  :step="5"
                />
              </gree-col>
              <gree-col width="10">硬</gree-col>
            </gree-row>
            <gree-row>
              <gree-col>臀部</gree-col>
            </gree-row>
            <gree-row class="slider-item">
              <gree-col width="10">软</gree-col>
              <gree-col width="80">
                <van-slider
                  v-model="pressureSetupBothLeftSetup"
                  :min="5"
                  :max="100"
                  :step="5"
                />
              </gree-col>
              <gree-col width="10">硬</gree-col>
            </gree-row>
            <gree-row>
              <gree-col>腰部</gree-col>
            </gree-row>
            <gree-row class="slider-item">
              <gree-col width="10">软</gree-col>
              <gree-col width="80">
                <van-slider
                  v-model="pressureSetupWaistLeftSetup"
                  :min="5"
                  :max="200"
                  :step="5"
                />
              </gree-col>
              <gree-col width="10">硬</gree-col>
            </gree-row>
          </div>
          <div class="control-zoom" v-if="currentControl === 2">
            <gree-row>
              <gree-col>肩部</gree-col>
            </gree-row>
            <gree-row class="slider-item">
              <gree-col width="10">软</gree-col>
              <gree-col width="80">
                <van-slider
                  v-model="pressureSetupBothRightSetup"
                  :min="5"
                  :max="100"
                  :step="5"
                />
              </gree-col>
              <gree-col width="10">硬</gree-col>
            </gree-row>
            <gree-row>
              <gree-col>臀部</gree-col>
            </gree-row>
            <gree-row class="slider-item">
              <gree-col width="10">软</gree-col>
              <gree-col width="80">
                <van-slider
                  v-model="pressureSetupBothRightSetup"
                  :min="5"
                  :max="100"
                  :step="5"
                />
              </gree-col>
              <gree-col width="10">硬</gree-col>
            </gree-row>
            <gree-row>
              <gree-col>腰部</gree-col>
            </gree-row>
            <gree-row class="slider-item">
              <gree-col width="10">软</gree-col>
              <gree-col width="80">
                <van-slider
                  v-model="pressureSetupWaistRightSetup"
                  :min="5"
                  :max="200"
                  :step="5"
                />
              </gree-col>
              <gree-col width="10">硬</gree-col>
            </gree-row>
          </div>
          <div class="bottom-btn">
            <gree-button type="positive" @click="changeWay('auto')"
            >前往智能调节</gree-button
            >
          </div>
        </template>

        <!-- 智能调节 -->
        <template v-else-if="AutoControl === 2 && currentControl === 1">
          <div class="control-zoom">
            <div v-for="(item, index) in autCtrlLeftList" :key="index">
              <gree-row>
                <gree-col>{{ item.title }}</gree-col>
              </gree-row>
              <gree-row class="slider-item noBall">
                <gree-col width="10">软</gree-col>
                <gree-col width="80">
                  <van-slider
                    v-model="item.value"
                    :min="5"
                    :max="100"
                    :step="5"
                    disabled
                  />
                </gree-col>
                <gree-col width="10">硬</gree-col>
              </gree-row>
            </div>
          </div>
          <div class="bottom-btn">
            <gree-button type="positive" @click="changeWay('hande')"
            >前往手动调节</gree-button
            >
          </div>
        </template>

        <!-- 智能调节 -->
        <template v-else-if="AutoControl === 2 && currentControl === 2">
          <div class="control-zoom">
            <div v-for="(item, index) in autCtrlRightList" :key="index">
              <gree-row>
                <gree-col>{{ item.title }}</gree-col>
              </gree-row>
              <gree-row class="slider-item noBall">
                <gree-col width="10">软</gree-col>
                <gree-col width="80">
                  <van-slider
                    v-model="item.value"
                    :min="5"
                    :max="100"
                    :step="5"
                    disabled
                  />
                </gree-col>
                <gree-col width="10">硬</gree-col>
              </gree-row>
            </div>
          </div>
          <div class="bottom-btn">
            <gree-button type="positive" @click="changeWay('hande')"
            >前往手动调节</gree-button
            >
          </div>
        </template>
      </div>
      <!-- 智能调节的进度条 -->
      <gree-dialog id="auto" v-model="showLoadingBar">
        <div class="title">智能调节中...请不要离开床垫</div>
        <gree-progress-bar :percent="progress" hide-info />
      </gree-dialog>
    </gree-page>
  </gree-view>
</template>

<script>
import { editDevice } from '../../../../static/lib/PluginInterface.promise';
import {
  Header,
  Field,
  InputItem,
  TabBar,
  Row,
  Col,
  Button,
  Block,
  Dialog,
  ProgressBar
} from 'gree-ui';
import { mapState, mapMutations } from 'vuex';
import { getDerucciGetBedStatus } from '@/api/70402/mock.js';
import {
  musiGetData,
  showLoading,
  hideLoading,
  showToast
} from '../../../../static/lib/PluginInterface.promise';

export default {
  name: 'Control',
  components: {
    [Header.name]: Header,
    [Field.name]: Field,
    [InputItem.name]: InputItem,
    [TabBar.name]: TabBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Block.name]: Block,
    [Dialog.name]: Dialog,
    [ProgressBar.name]: ProgressBar
  },
  data() {
    return {
      ISFIRST: 0,
      timer: 0, // 计时器
      progress: 0, // 进度条百分比
      showLoadingBar: false, // 显示进度条
      AutoControl: 0, // 控制状态，用于控制UI
      inBedStateLeft: 0, // 左侧在床
      inBedStateRight: 0, // 右侧在床
      head_bg: require('@/assets/img/bg_header_on.png'),
      currentControl: 1, // 当前控制的side  1 左 2 右
      bedSide: [
        { name: 1, label: '床垫左侧' },
        { name: 2, label: '床垫右侧' }
      ], // 左右床table选择器
      autCtrlLeftList: [
        { title: '肩部', value: 10 },
        { title: '臀部', value: 10 },
        { title: '腰部', value: 10 }
      ], // 自动调节 左床
      autCtrlRightList: [
        { title: '肩部', value: 10 },
        { title: '臀部', value: 10 },
        { title: '腰部', value: 10 }
      ], // 自动调节 右床
      sendTimer: 0, // 发送手调命令的定时器
      searchTimer: 0, // 查询的定时器
      onceTimer: 0, // 查询一次的定时器
      SENDDUR: 2000, // 发送命令的间隔
      SEARCHDUR: 10000, // 查询数据的间隔 s
      pressureSetupBothLeftSetup: 10, // 左 手调 肩部和臀部
      pressureSetupWaistLeftSetup: 20, // 左 手调 腰部
      pressureSetupBothRightSetup: 10, // 右 手调 肩部和臀部
      pressureSetupWaistRightSetup: 20 // 右 手调 腰部
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,
      getBedStatusJson: state => state.apiObject.getBedStatusJson,
      dataObject: state => state.dataObject,
      AutoLeftWai: state => state.dataObject.AutoLeftWai, // 自动左侧腰部调节
      AutoLeftLeg: state => state.dataObject.AutoLeftLeg, // 自动左侧臀部调节

      AutoRighWai: state => state.dataObject.AutoRighWai, // 自动右侧腰部调节
      AutoRighLeg: state => state.dataObject.AutoRighLeg, // 自动右侧臀部调节

      HumLeftWai: state => state.dataObject.HumLeftWai, // 手动左侧腰部调节
      HumLeftLeg: state => state.dataObject.HumLeftLeg, // 手动左侧臀部调节
      
      HumRighWai: state => state.dataObject.HumRighWai, // 手动右侧腰部调节
      HumRighLeg: state => state.dataObject.HumRighLeg, // 手动右侧臀部调节
    }),
    statusPic() {
      console.log('是否在床', this.inBedStateLeft, this.inBedStateRight);
      if (this.inBedStateLeft && this.inBedStateRight) {
        return require('@/assets/img/both.png');
      } else if (this.inBedStateLeft && !this.inBedStateRight) {
        return require('@/assets/img/left.png');
      } else if (!this.inBedStateLeft && this.inBedStateRight) {
        return require('@/assets/img/right.png');
      } else if (!this.inBedStateLeft && !this.inBedStateRight) {
        return require('@/assets/img/none.png');
      }
      return require('@/assets/img/none.png');
    }
  },
  watch: {
    showLoadingBar(newv) {
      newv ? this.AIControl() : '';
    },
    pressureSetupBothLeftSetup(newv) {
      if (this.ISFIRST < 4) {
        this.ISFIRST++;
        return;
      } else if (this.AutoControl !== 1) {
        return;
      }
      clearTimeout(this.sendTimer);
      this.sendTimer = 0;
      this.sendTimer = setTimeout(() => {
        // TODO:发送命令
        this.closeAIControlThenSendCommand();
      }, this.SENDDUR);
      console.log(newv);
    },
    pressureSetupBothRightSetup(newv) {
      if (this.ISFIRST < 4) {
        this.ISFIRST++;
        return;
      } else if (this.AutoControl !== 1) {
        return;
      }
      clearTimeout(this.sendTimer);
      this.sendTimer = 0;
      this.sendTimer = setTimeout(() => {
        // TODO:发送命令
        this.closeAIControlThenSendCommand();
      }, this.SENDDUR);
      console.log(newv);
    },
    pressureSetupWaistLeftSetup(newv) {
      if (this.ISFIRST < 4) {
        this.ISFIRST++;
        return;
      } else if (this.AutoControl !== 1) {
        return;
      }
      clearTimeout(this.sendTimer);
      this.sendTimer = 0;
      this.sendTimer = setTimeout(() => {
        // TODO:发送命令
        this.closeAIControlThenSendCommand();
      }, this.SENDDUR);
      console.log(newv);
    },
    pressureSetupWaistRightSetup(newv) {
      if (this.ISFIRST < 4) {
        this.ISFIRST++;
        return;
      } else if (this.AutoControl !== 1) {
        return;
      }
      clearTimeout(this.sendTimer);
      this.sendTimer = 0;
      this.sendTimer = setTimeout(() => {
        // TODO:发送命令
        this.closeAIControlThenSendCommand();
      }, this.SENDDUR);
      console.log(newv);
    }
  },
  mounted() {
    this.init();
  },
  destroyed() {
    // 退出页面销毁定时器
    clearInterval(this.searchTimer);
    clearTimeout(this.sendTimer);
    clearTimeout(this.onceTimer);
    this.searchTimer = null;
    this.sendTimer = null;
    this.onceTimer = null;
  },
  methods: {
    ...mapMutations({
      setApiObject: 'SET_API_OBJECT'
    }),
    // 初始化开始函数
    init() {
      console.log('初始化设置一次状态');
      this.setCtrlValue(); // 设置初始化状态值
      this.searchStatus(); // 初始查询一次初始状态
      this.autoSearch(); // 开启查询和赋值
      // 测试数据mock
      // const { result } = getDerucciGetBedStatus.message 
      // const { result } = this.getBedStatusJson.message
      // this.inBedStateLeft = result.parts[0].inBedState
      // this.inBedStateRight = result.parts[1].inBedState
      
      // this.test()
    },
    test() {
      const data = {
        pressureSetupBothLeftSetup: '100',
        pressureSetupWaistLeftSetup: '200',
        pressureSetupBothRightSetup: '100',
        pressureSetupWaistRightSetup: '200'
      };
      showLoading();
      console.log('测试接口发送的数据： ', data);
      musiGetData(this.mac, data, 'getDerucciSetPressure').then(res => {
        console.log('发送成功', res);
        hideLoading();
      }
      )
        .catch(hideLoading());
    },
    // 开始轮询状态
    autoSearch() { 
      this.searchTimer = 0;
      this.searchTimer = setInterval(() => {
        this.searchStatus(); // SEARCHDUR 时间 轮询一次
        this.setCtrlValue(); // 设置状态值
      }, this.SEARCHDUR);
    },
    // 停止查询
    stopSearch() {
      clearTimeout(this.searchTimer);
      this.searchTimer = 0;
    },
    // 查询状态
    searchStatus() {
      const data = {};
      showLoading();
      musiGetData(this.mac, data, 'getDerucciGetBedStatus').then(res => {
        hideLoading();
        console.log('res的类型: ', typeof (res));
        if (!res) {
          console.log('返回的数据异常： ', res);
        } else {
          console.log('查询到的在床状态', JSON.parse(res));
          const { parts } = JSON.parse(res).message.result;
          if (parts) {
            this.inBedStateLeft = parts[0].inBedState;
            this.inBedStateRight = parts[1].inBedState;
          } else {
            console.log('没有在床数据parts');
          }      
        }
      })
        .catch(hideLoading());
    },
    // 将dataObject的 值更新到UI
    setCtrlValue() {
      console.log('==========设置一次值===========');
      console.log('左', this.HumLeftLeg, this.HumLeftWai);
      console.log('---------------------');
      console.log('右', this.HumRighLeg, this.HumRighWai);
      console.log('---------------------');
      console.log('左-A', this.AutoLeftLeg, this.AutoLeftWai);
      console.log('---------------------');
      console.log('右-A', this.AutoRighLeg, this.AutoRighWai);
      console.log('=====================');


      this.pressureSetupWaistLeftSetup = this.HumLeftWai;
      this.pressureSetupBothLeftSetup = this.HumLeftLeg;
      
      this.pressureSetupWaistRightSetup = this.HumRighWai;
      this.pressureSetupBothRightSetup = this.HumRighLeg;

      this.autCtrlLeftList[0].value = this.AutoLeftLeg; 
      this.autCtrlLeftList[1].value = this.AutoLeftLeg; 
      this.autCtrlLeftList[2].value = this.AutoLeftWai / 2;
      
      this.autCtrlRightList[0].value = this.AutoRighLeg;
      this.autCtrlRightList[1].value = this.AutoRighLeg;
      this.autCtrlRightList[2].value = this.AutoRighWai / 2;
    },
    // 发送控制命令函数
    sendCommand() {
      this.stopSearch(); // 停止查询
      const data = {
        pressureSetupBothLeftSetup: this.pressureSetupBothLeftSetup.toString(),
        pressureSetupWaistLeftSetup: this.pressureSetupWaistLeftSetup.toString(),
        pressureSetupBothRightSetup: this.pressureSetupBothRightSetup.toString(),
        pressureSetupWaistRightSetup: this.pressureSetupWaistRightSetup.toString()
      };
      console.log('调节床垫： ', data);
      console.log('mac: ', this.mac);
      showLoading();
      musiGetData(this.mac, data, 'getDerucciSetPressure').then(res => {
        showToast('控制指令已发送', 0);
        console.log('发送成功', res);
        // 先清除 定时器
        clearTimeout(this.onceTimer);
        this.onceTimer = 0;
        // 10s 后开始查询
        console.log('###已发送命令，下面10s后开始轮询');
        this.onceTimer = setTimeout(() => {
          this.searchStatus(); // 初始查询一次初始状态
          this.autoSearch(); // 开启查询和赋值
        }, this.SEARCHDUR);
        hideLoading();
      }
      )
        .catch(hideLoading());
    },
    // 智能调节
    AIControl() {
      this.AutoControl = 0;
      this.timer = setInterval(() => {
        this.progress++;
        if (this.progress === 99) {
          this.showLoadingBar = false;
          this.progress = 0;
          this.AutoControl = 2;
          clearInterval(this.timer);
          this.timer = 0;
        }
      }, 50);
      const data = {
        partConfigs: [
          {
            machineEntityPartCode: `${this.mac}####left`,
            on: this.inBedStateLeft,
            smartSense: 1
          },
          {
            machineEntityPartCode: `${this.mac}####right`,
            on: this.inBedStateRight,
            smartSense: 1
          }
        ]
      };
      console.log('智能调节： ', data);
      showLoading();
      musiGetData(this.mac, data, 'getDerucciSmartConfig').then(res => {
        console.log('发送成功', res);
        showToast('控制指令已发送', 0);
        hideLoading();
      }
      )
        .catch(hideLoading());
    },  
    // 关闭智能调节
    closeAIControlThenSendCommand() {
      const data = {
        partConfigs: [
          {
            machineEntityPartCode: `${this.mac}####left`,
            on: 0,
            smartSense: 2
          },
          {
            machineEntityPartCode: `${this.mac}####right`,
            on: 0,
            smartSense: 2
          }
        ]
      };
      console.log('关闭-智能调节： ', data);
      showLoading();
      musiGetData(this.mac, data, 'getDerucciSmartConfig').then(res => {
        console.log('关闭智能调节-发送成功', res);
        this.sendCommand(); // 关闭智能并 手动命令发送
        hideLoading();
      }
      )
        .catch(hideLoading());
    },
    // 转换调节方式
    changeWay(name) {
      this.setCtrlValue(); // 设置初始化状态值
      switch (name) {
        case 'hande':
          this.AutoControl = 1;
          break;
        case 'auto':
          this.AutoControl = 0;
          break;
        case 'startAuto':
          this.AutoControl = 2;
          this.showLoadingBar = true;
          break;
        default:
          break;
      }
    },
    // 检验数据是否合法
    checkData(data) {
      // 不是5的倍速并且不是0
      if (data % 5 === 0 && data !== 0) {
        return data;
      } 
      return 5;
    },
    goBack() {
      this.$router.push({ name: 'HomePage' });
    },
    moreInfo() {
      editDevice(this.mac);
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/Control.scss';
</style>
