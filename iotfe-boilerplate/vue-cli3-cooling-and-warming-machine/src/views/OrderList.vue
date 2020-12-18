<template>
  <gree-view bg-color="#F4F5F5">
    <!-- 头部 -->
    <gree-header :left-options="{ preventGoBack: true }" @on-click-back="goBack"
    ><a slot="right" v-show="isDelete" @click="handleCancel">取消</a
    >预约</gree-header
    >
    <!-- 列表  和底部添加栏-->
    <gree-page class="page-OrderList">
      <div class="page-main">
        <gree-list v-if="!isDelete">
          <gree-list-item
            v-for="(item, index) in dispTrList"
            :key="index"
            :class="{ opcticy: Ocmd }"
            @touchstart.native="handleTouchstart"
            @touchend.native="handleTouchend(index)"
            @touchmove.native="handleToucheMove"
          >
            <span name="feedback" slot="header">
              {{ item.hr <= 9 ? `0${item.hr}` : item.hr }}:{{
                item.min <= 9 ? `0${item.min}` : item.min
              }}
            {{ item.cmd[0].p[0] ? '开机' : '关机' }}</span
            >
            <span
              name="feedback"
              slot="title"
              :class="{ hidden: item.cmd[0].p.length <= 1 }"
            >
              {{ item.cmd[0].p[1] == 1 ? '制冷' : '制热' }}
              {{ item.cmd[0].p[3] == 1 ? '室内温度' : '进水温度'
            }}{{ item.cmd[0].p[2] }}℃</span
            >
            <span name="feedback" slot="footer">
            {{ weekChangle(item.week) }}</span
            >
            <gree-switch
              name="feedback"
              slot="after"
              :disabled="isDelete"
              v-model="item.enable"
              @touchstart.native="stopClick"
              @touchmove.native="stopClick"
              @touchend.native="stopClick"
              @change="select(index, item.enable)"
              class="switch"
            ></gree-switch>
          </gree-list-item>
        </gree-list>

        <gree-check-group
          v-model="deleteIndexList"
          @input="handlerInput"
          v-if="isDelete"
        >
          <gree-list>
            <gree-list-item
              v-for="(item, index) in dispTrList"
              :key="index"
              :class="{opcticy: Ocmd }"
              @touchstart.native="handleTouchstart"
              @touchend.native="handleTouchend(index)"
              @touchmove.native="handleToucheMove"
              media-item
            >
              <gree-check
                slot="media"
                class="delete-check"
                :name="index"
              ></gree-check>
              <span name="feedback" slot="header">
                {{ item.hr <= 9 ? `0${item.hr}` : item.hr }}:{{
                  item.min <= 9 ? `0${item.min}` : item.min
                }}
              {{ item.cmd[0].p[0] ? '开机' : '关机' }}</span
              >
              <span
                name="feedback"
                slot="title"
                :class="{ hidden: item.cmd[0].p.length <= 1 }"
              >
                {{ item.cmd[0].p[1] == 1 ? '制冷' : '制热' }}
                {{ item.cmd[0].p[3] == 1 ? '室内温度' : '进水温度'
              }}{{ item.cmd[0].p[2] }}℃</span
              >
              <span name="feedback" slot="footer">
              {{ weekChangle(item.week) }}</span
              >
              <gree-switch
                name="feedback"
                slot="after"
                :disabled="isDelete"
                v-model="item.enable"
                @change="select(index, item.enable)"
                class="switch"
              ></gree-switch>
            </gree-list-item>
          </gree-list>
        </gree-check-group>

        <!-- <gree-list>
          <gree-check-group v-model="deleteIndexList" @input="handlerInput">
            <div
              v-for="(item, index) in dispTrList"
              :key="index"
              class="listItem"
              :class="{ opcticy: Ocmd }"
            >
              <div
                class="clickArea"
                @touchstart="handleTouchstart"
                @touchend="handleTouchend(index)"
                @touchmove="handleToucheMove"
              >
                <div v-if="isDelete">
                  <gree-check class="delete-check" :name="index"></gree-check>
                  <div class="titleFont" style="left: 50px">
                    {{ item.hr <= 9 ? `0${item.hr}` : item.hr }}:{{
                      item.min <= 9 ? `0${item.min}` : item.min
                    }}
                    <label class="type">{{
                      item.cmd[0].p[0] ? '开机' : '关机'
                    }}</label>
                  </div>
                  <div
                    class="describe"
                    :class="{ hidden: item.cmd[0].p.length <= 1 }"
                    style="left: 50px"
                  >
                    {{ item.cmd[0].p[1] == 1 ? '制冷' : '制热' }}
                    {{ item.cmd[0].p[3] == 1 ? '室内温度' : '进水温度'
                    }}{{ item.cmd[0].p[2] }}℃
                  </div>
                  <div
                    style="left: 50px"
                    :class="item.cmd[0].p.length <= 1 ? 'describe' : 'repeat'"
                  >
                    {{ weekChangle(item.week) }}
                  </div>
                </div>

                <div v-else>
                  <div class="titleFont">
                    {{ item.hr <= 9 ? `0${item.hr}` : item.hr }}:{{
                      item.min <= 9 ? `0${item.min}` : item.min
                    }}
                    <label class="type">{{
                      item.cmd[0].p[0] ? '开机' : '关机'
                    }}</label>
                  </div>
                  <div
                    class="describe"
                    :class="{ hidden: item.cmd[0].p.length <= 1 }"
                  >
                    {{ item.cmd[0].p[1] == 1 ? '制冷' : '制热' }}
                    {{ item.cmd[0].p[3] == 1 ? '室内温度' : '进水温度'
                    }}{{ item.cmd[0].p[2] }}℃
                  </div>
                  <div
                    :class="item.cmd[0].p.length <= 1 ? 'describe' : 'repeat'"
                  >
                    {{ weekChangle(item.week) }}
                  </div>
                </div>
              </div>
              <gree-switch
                slot="after"
                :disabled="isDelete"
                v-model="item.enable"
                @change="select(index, item.enable)"
                class="switch"
              ></gree-switch>
            </div>
          </gree-check-group>
        </gree-list> -->

        <!-- 底部添加栏 -->
        <gree-toolbar
          class="toolBar"
          position="bottom"
          no-hairline
          v-if="isDelete"
        >
          <div class="bottom" @click="handleDetele">
            <h2 style="color: red; font-size: 20px">删除({{ deleteSum }})</h2>
          </div>
        </gree-toolbar>
        <gree-toolbar class="toolBar" position="bottom" no-hairline v-else>
          <div class="bottom" @click="addTimer">
            <gree-icon name="add" />
          </div>
        </gree-toolbar>
      </div>
    </gree-page>
    <div style="display: none">{{ timeList }}{{ dispTrList }}</div>
  </gree-view>
</template>

<script>
import {
  Header,
  Block,
  List,
  Item,
  Icon,
  ToolBar,
  Button,
  Switch,
  Check,
  CheckBox,
  CheckGroup,
  CheckList,
  Dialog,
  ActionBar,
} from 'gree-ui';
import { showToastPlugin } from '../api/utils';
import { mapState, mapMutations, mapActions } from 'vuex';
import { changeTimerList } from '../api/change';
import { changeBarColorPlugin } from '../api/utils';
import {
  showLoading,
  hideLoading,
} from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [Block.name]: Block,
    [List.name]: List,
    [Item.name]: Item,
    [Icon.name]: Icon,
    [ToolBar.name]: ToolBar,
    [Button.name]: Button,
    [Switch.name]: Switch,
    [Check.name]: Check,
    [CheckBox.name]: CheckBox,
    [CheckGroup.name]: CheckGroup,
    [CheckList.name]: CheckList,
    [Dialog.name]: Dialog,
    [ActionBar.name]: ActionBar,
  },
  data() {
    return {
      isDelete: false,
      hasTimer: false, // 定时器标记，用户判断定时器 是否存在
      Loop: null, // 1秒定时器，用于识别是否到了1秒进入删除模式
      deleteSum: 0,
      deleteIndexList: [],
      dataTimer: null, // 轮询定时器
      isMoving: false,
      isFirst: true, // 首次进入,等待轮询完
      deleteSumString: '',
      isHandleTouchend: true,
      deleteBtn: [
        {
          text: `删除${this.deleteSum}`,
          onClick: this.handleDetele,
        },
      ],
      addBtn: [
        {
          text: '+',
          onClick: this.addTimer,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      statusList: state => state.dataObject.statusList,
      Ocmd: state => state.dataObject.Ocmd,
      timeList: state => state.timeList,
      mac: state => state.mac,
    }),
    // 显示的list
    dispTrList() {
      return changeTimerList(JSON.parse(JSON.stringify(this.timeList.list)));
    },
  },
  watch: {
    // dataObj的timeList的list
    timeList(newV, oldV) {
      if (newV.total !== oldV.total) {
        this.dispTrList = changeTimerList(JSON.parse(JSON.stringify(newV.list)));
      }
    },
  },
  async activated() {
    await this.init();
  },
  /**
   * @description: 清除定时器
   */
  deactivated() {
    console.log('deactivated');
    this.deleteSum = 0;
    this.deleteIndexList = [];
    clearInterval(this.Loop);
    clearInterval(this.dataTimer);
  },
  methods: {
    ...mapMutations({
      setTime: 'SET_TIME',
      setDataObject: 'SET_DATA_OBJECT',
      // set dataobj 里的timeList
      setTimList: 'GET_TIMELIST',
    }),
    ...mapActions({
      sendTime: 'SEND_TIME',
      queryTimeSome: 'QUERY_TIME_SOME',
      queryTime: 'QUERY_TIME',
      deleteTime: 'DELETE_TIMER',
      sendCtrl: 'SEND_CTRL',
    }),
    /**
     * @description 返回键
     */
    goBack() {
      this.$router.push({
        name: 'Home',
      });
    },
    stopClick() {
      event.stopPropagation();
    },
    /**
     * @description:初始化
     */
    init() {
      changeBarColorPlugin('#F4F5F5');
      this.isDelete = false;
      this.isFirst && showLoading();
      this.dataTimer = setInterval(async () => {
        await this.queryTimeSome(0);
        await this.queryTimeSome(4);
        await this.queryTime(8);
        this.isFirst && hideLoading();
        this.isFirst = false;
      }, 5000);
    },
    /**
     * @description 右上角取消事件
     */
    handleCancel() {
      this.deleteIndexList = [];
      this.hasTimer = false;
      this.isDelete = false;
      this.isMoving = false;
      this.deleteSum = 0;
    },

    /**
     * @description: touchstart  handleTouchstart
     */
    handleTouchstart() {
      console.log('handleTouchstart');
      clearInterval(this.Loop); // 再次清空定时器，防止重复注册定时器
      this.isHandleTouchend = false;
      this.isMoving = false;
      if (!this.isDelete) {
        this.Loop = setTimeout(() => {
          if (!this.isMoving && !this.isHandleTouchend) {
            this.deleteIndexList = [];
            this.isDelete = true;
            this.hasTimer = true;
          }
        }, 1000);
      }
    },

    /**
     * @description: ToucheMove事件，清楚滑动不了以及注册定时器问题
     */
    handleToucheMove() {
      this.isMoving = true;
      this.hasTimer = false;
    },

    /**
     * @description: touchend 清除定时器判断是否有手操器预约
     * @param {index}
     * @return:
     */
    handleTouchend(index) {
      console.log('handleTouchend');
      this.isHandleTouchend = true;
      if (!this.isMoving && !this.isDelete) {
        if (this.Ocmd) {
          Dialog.confirm({
            title: '',
            content:
              '开启APP手操器预约功能后，将自动关闭手操器预约功能，请确认是否继续',
            confirmText: '确定',
            onConfirm: () => {
              this.setDataObject({ Ocmd: 0 });
              this.sendCtrl({ Ocmd: 0 });
              this.handleDeleteOrJump(index);
            },
            cancelText: '取消',
            onCancel: () => console.log('已取消'),
          });
        } else {
          this.handleDeleteOrJump(index);
        }
      }
    },
    /**
     * @description: 删除或者编辑
     * @param {number}
     */
    handleDeleteOrJump(index) {
      if (this.hasTimer) {
        this.deleteIndexList = [];
        this.hasTimer = false;
        this.isDelete = true;
        clearInterval(this.Loop);
      } else {
        console.log('jump', index);
        if (!this.isDelete) {
          this.$router.push({
            name: 'Order',
            params: {
              row: index,
            },
          });
        }
      }
    },
    /**
     * @description: 点击添加定时按钮
     * @param {type}
     * @return:
     */
    addTimer() {
      if (this.Ocmd) {
        Dialog.confirm({
          title: '',
          content:
            '开启APP手操器预约功能后，将自动关闭手操器预约功能，请确认是否继续',
          confirmText: '确定',
          onConfirm: () => {
            this.setDataObject({ Ocmd: 0 });
            this.sendCtrl({ Ocmd: 0 });
            if (this.dispTrList.length < 10) {
              this.$router.push({ name: 'Order' });
            } else {
              showToastPlugin('日程已满，请先删除日程');
            }
          },
          cancelText: '取消',
          onCancel: () => console.log('已取消'),
        });
      } else if (this.dispTrList.length < 10) {
        this.$router.push({ name: 'Order' });
      } else {
        console.log('this.dispTrList.length', Array.isArray(this.dispTrList));
        showToastPlugin('日程已满，请先删除日程', 0);
      }
    },

    /**
     * @function handlerInput: 删除选择点击事件
     * @param {array}:  所有选中的下标
     */
    handlerInput(val) {
      console.log('删除选择点击事件', val);
      this.deleteSum = val.length;
      this.deleteIndexList = val;
    },
    /**
     * @description: 删除定时确认弹框
     */
    handleDetele() {
      if (this.deleteIndexList.length > 0) {
        Dialog.confirm({
          title: '',
          content: '确定删除预约',
          confirmText: '确定',
          onConfirm: () => {
            this.setDelet();
          },
          cancelText: '取消',
          onCancel: () => {
            this.isDelete = false;
            this.deleteSum = 0;
            this.deleteIndexList = [];
            showToastPlugin('已取消');
          },
        });
      }
    },

    /**
     * @description: 发送删除命令
     */
    setDelet() {
      this.isDelete = false;
      let timeObj = JSON.parse(JSON.stringify(this.timeList));
      this.deleteIndexList.sort().reverse();
      for (let index = 0; index < this.deleteIndexList.length; index++) {
        this.deleteTime(timeObj.list[this.deleteIndexList[index]].id);
      }
      for (let index = 0; index < this.deleteIndexList.length; index++) {
        timeObj.list.splice(this.deleteIndexList[index], 1);
        timeObj.total--;
      }
      // console.log('timeObj', timeObj);
      this.setTimList(timeObj);
      showToastPlugin('删除成功');
    },

    /**
     * @select: 开关选择器
     * @param {row}
     */
    select(row, value) {
      // event.stopPropagation();
      // console.log('========select');
      if (this.Ocmd) {
        Dialog.confirm({
          title: '',
          content:
            '开启APP手操器预约功能后，将自动关闭手操器预约功能，请确认是否继续',
          confirmText: '确定',
          onConfirm: () => {
            this.setDataObject({ Ocmd: 0 });
            this.sendCtrl({ Ocmd: 0 });
            this.handleSwicthChange(row, value);
          },
          cancelText: '取消',
          onCancel: () => {
            this.dispTrList[row].enable = !this.dispTrList[row].enable;
          },
        });
      } else {
        this.handleSwicthChange(row, value);
      }
    },

    /**
     * @description: 开关发送指令
     * @param {number}
     */
    handleSwicthChange(row, value) {
      const timeObj = JSON.parse(JSON.stringify(this.dispTrList));
      for (let index = 0; index < timeObj.length; index++) {
        timeObj[index].enable = Number(!timeObj[index].enable);
      }
      timeObj[row].enable = Number(!value);
      timeObj[row].t = 'updataT';
      console.log('开关切换', row, value, JSON.stringify(timeObj));
      this.setTime(timeObj);
      this.sendTime(timeObj[row]);
      // event.stopPropagation();
    },

    /**
     * @description: 日期数组转中文  0,0,1,0,0,1,0
     * @param {Array}
     * @return:  周二、五
     */
    weekChangle(arr) {
      let str = '';
      let num = 0;
      const valueArr = ['日', '一', '二', '三', '四', '五', '六'];
      for (let index = 0; index < arr.length; index++) {
        if (arr[index]) {
          if (!num) {
            str = `${str}${valueArr[index]}`;
          } else {
            str = `${str}、${valueArr[index]}`;
          }
          num++;
        }
      }
      if (str !== '') {
        str = `周${str}`;
      }
      if (num === 7) return '每天';
      return str;
    },
  },
};
</script>
