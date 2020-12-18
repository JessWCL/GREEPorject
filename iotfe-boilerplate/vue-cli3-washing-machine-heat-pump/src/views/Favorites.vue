<template>
  <gree-view
    bg-color="#f4f4f4"
    class="page has-navbar Favorites"
  >
    <div class="page-content page-setup">
      <gree-header
        :left-options="{preventGoBack: true}"
        @on-click-back="clickBack"
        theme="#404657"
      >{{ $language('home.favorite') }}
        <a
          slot="right"
          @click="changeEdit"
          v-show="!sync && (favor1Params[4] || favor2Params[4] || favor3Params[4])"
        >
          {{ editMsg }}
        </a>
      </gree-header>

      <div class="page-main" v-if="sync">
        <img src="../assets/img/gree-logo.png" alt="" class="sync-logo"/>
        <img src="../assets/img/logo-bg.png" alt="" class="sync-logo-bg"/>
        <p class="favour-none-text">收藏夹数据正在同步中...</p>
      </div>
      <div class="page-main" v-else-if="favorList[0][4]">
        <gree-check-group
          v-model="indexList"
          @input="input(indexList)"
        >
          <div 
            v-show="list[4]"
            v-for="(list, index) in favorList"
            :key="index"
            class="bg"
            :style="{backgroundImage: `url(${favoritesImg[list[4]]})`}"
            @click.self="handleClickBg(list, index)"
          >
            <div class="wash-mode" @click.self="handleClickBg(list, index)">
              {{ washmodeName[list[4]] }}
            </div>
            <div class="wash-type" @click.self="handleClickBg(list, index)">
              {{ washTypeName[list[12] >> 4] }}
            </div>
            <img 
              v-if="!isEdit && !devState"
              class="start-img" 
              src="../assets/img/favour-start.png"
              @click.stop="handleClickStartBtn(list, index)"
            />
            <gree-check
              class="fav-check"
              v-if="isEdit"
              :name="index"
            ></gree-check>
          </div>
        </gree-check-group>

        <!-- 删除按钮 -->
        <gree-button
          class="del-btn"
          v-show="isEdit"
          :inactive="indexList.length === 0"
          @click="handleDelete"
        >删除</gree-button>
      </div>

      <div class="page-main" v-else>
        <img src="../assets/img/favour_none.png" alt="" class="no-favour"/>
        <p class="favour-none-text">收藏夹未添加</p>
        <p class="favour-none-text">快添加一个试试吧</p>
      </div>

    </div>
  </gree-view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
// eslint-disable-next-line import/first
import { Dialog, Header, Check, CheckBox, CheckGroup, CheckList, Button, RadioList } from 'gree-ui';
import { washTypeName, washmodeName, favoritesImg } from '../api/utils';


export default {
  components: {
    [Header.name]: Header,
    [Button.name]: Button,
    [Check.name]: Check,
    [CheckBox.name]: CheckBox,
    [CheckGroup.name]: CheckGroup,
    [CheckList.name]: CheckList,
    [RadioList.name]: RadioList
  },
  data() {
    return {
      isEdit: false, // 是否编辑状态
      indexList: [], // 选择的下标
      editMsg: '编辑', //
      washTypeName,
      washmodeName,
      favoritesImg,
      favorIndex: 0
    };
  },
  computed: {
    ...mapState({
      devState: state => state.dataObject.devState,
      timeAll: state => state.dataObject.timeAll,
      Pow: state => state.dataObject.Pow,
      JFerr: state => state.dataObject.JFerr,
      sync: state => state.dataObject.sync,
      favor1Params: state => state.dataObject.favor1Params,
      favor2Params: state => state.dataObject.favor2Params,
      favor3Params: state => state.dataObject.favor3Params,
      favorList(state) {
        return [state.dataObject.favor1Params, state.dataObject.favor2Params, state.dataObject.favor3Params];
      }
    })
  },
  watch: {
    Pow(newV) {
      if (newV === 0) this.$router.push({ name: 'Home'});
    },
    devState(newV) {
      if (newV === 3) this.$router.push({name: 'Startup'});
      if (newV === 4) this.$router.push({name: 'Error'});
    },
    JFerr(newV) {
      if (newV) this.$router.push({name: 'Error'});
    }
  },
  beforeDestroy() {
    Dialog.closeAll(); // 关闭所有Dialog
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    input(val) {
      this.indexList = [];
      for (let index = 0; index < val.length; index++) {
        this.indexList[0] = val[index];
      }      
    },
    
    changeEdit() {
      if (this.isEdit) {
        this.isEdit = false;
        this.editMsg = '编辑';
      } else {
        this.isEdit = true;
        this.indexList = [];
        this.editMsg = '取消';
      }
    },

    clickBack() {
      if (this.devState === 1 || this.devState === 2) {
        this.$router.push({ name: 'Startup' });
      } else {
        this.$router.push({ name: 'Home' });
      }
    },

    /**
     * @description 删除选中下表
     */
    handleDelete() {
      Dialog.confirm({
        content:
          '确认取消收藏',
        confirmText: '确定',
        onConfirm: () => {
          this.changeEdit();
          const deletList = new Array(14);
          deletList.fill(0);
          // let sendTime = 0;
          const index = this.indexList[0];
          let obj = {
            changeFavor: 2, // 删除
            exeFavor: index + 1
          };
          obj[`favor${index + 1}Params`] = deletList; // 告诉整机 删除第一个.变化在app显示

          let commitObj = {
            favor3Params: deletList // 无论如何都是无值
          };
          switch (index) {
            case 0:
              if (this.favor2Params[4]) { // 如果第二个有值，更新2、3
                commitObj.favor1Params = this.favor2Params;
                commitObj.favor2Params = this.favor3Params;
              } else { // 如果第二个无值，更新1
                commitObj.favor1Params = deletList;
              }
              break;
            case 1: 
              if (this.favor3Params[4]) { // 如果第三个有值，更新2
                commitObj.favor2Params = this.favor3Params;
              }
              break;
            default:
              break;
          }
          this.setDataObject(obj);
          this.setDataObject(commitObj);
          this.sendCtrl(obj);
        },
        cancelText: '取消',
        onCancel: () => this.changeEdit()
      });
    },
    /**
     * @description // 判断是否特殊模式需弹框确认
     */
    handleClickStartBtn(list, index) {
      if (list[4] === 10) {
        Dialog.confirm({
          title: '确认提示',
          content:
            '本程序仅适用于可机洗羊毛织物，请确认是否可机洗!  启动前请确保已打开机门手动投放适量中性洗涤剂。',
          confirmText: '确认',
          onConfirm: () => this.startFavourProcess(list, index),
          cancelText: '取消',
          onCancel: () => console.log('取消')
        });
      } else if (list[4] === 12) {
        Dialog.confirm({
          title: '确认提示',
          content:
            '本程序仅适用于可机洗丝绸织物，请确认是否可机洗! 启动前请确保已打开机门手动投放适量中性洗涤剂。',
          confirmText: '确认',
          onConfirm: () => this.startFavourProcess(list, index),
          cancelText: '取消',
          onCancel: () => console.log('取消')
        });
      } else {
        this.startFavourProcess(list, index);
      }
    },

    /**
     * @description //当前点击的收藏夹到编辑待机页
     */
    handleClickBg(list, index) {
      if (this.devState) return; // 启动状态不能点击背景去到参数页
      if (this.isEdit) {
        this.indexList = [index];
        return;
      }
      this.startFavourProcess(list, index, false);
    },
    /**
     * @description //启动收藏夹程序
     * @param isLaunch 是否启动程序
     */
    startFavourProcess(list, index, isLaunch = true) {
      const obj = {
        washType: list[12] >> 4, // 洗涤类型
        washMode: list[4], // 洗涤模式
      };


      let funString = list[0].toString(2); // 辅助功能转二进制
      for (let index = funString.length; index < 8; index += 1) {
        funString = `0${funString}`;
      }

      obj.soak = funString[1] >> 0;// 浸泡
      obj.soakTime = Number(list[12]) % (1 << 4);// 浸泡时间
      obj.energySave = funString[2] >> 0; // 节能
      obj.noDrain = funString[3] << 0; // 免排水
      obj.highWate = funString[5] | 0; // 高水位
      obj.creaseRes = Number(funString[6]); // 防皱


      obj.speed = list[5] * 256 + list[6]; // 转速
      obj.washTemp = list[7]; // 温度
      if (list[8]) { obj.setWashTime = list[8]; } // 洗涤时间

      obj.timeAll = list[10] * 256 + list[11]; // 运行总时间
 
      obj.potch = Number(list[9]); // 漂洗次数
      obj.dry = list[13] >> 0; // 烘干/蒸汽 状态

      this.setDataObject(obj);
      if (isLaunch) {
        obj.launch = 1;
        obj.changeFavor = 7; // 启动收藏夹指令
        obj.exeFavor = index + 1; // 执行哪一个指令
        obj.timeLeft = obj.timeAll;
        const isLaunchObj = {
          devState: 1,
          runStage: 2
        };
        const sendObj = {
          changeFavor: 7, // 启动收藏夹指令
          exeFavor: index + 1 // 执行哪一个指令
        };
        this.setDataObject(Object.assign(isLaunchObj, obj));
        this.sendCtrl(sendObj);
        this.$router.push({
          name: 'Startup'
        });
      } else {
        const sendObj = {
          changeFavor: 8, // 启动收藏夹指令
          exeFavor: index + 1 // 执行哪一个指令
        };
        this.sendCtrl(sendObj);
        this.$router.push({
          name: 'Home'
        });
      }
    }
  }
};
</script>
