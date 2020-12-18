<template>
  <div
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
          @click="edit"
          v-show="favor1Params[4] || favor2Params[4] || favor3Params[4]"
        >
          {{ editMsg }}
        </a>
      </gree-header>

      <div class="page-main">
        <gree-check-group
          v-model="indexList"
          @input="input(indexList)"
        >
          <div 
            v-if="list[4]"
            v-for="(list, index) in favorList"
            :key="index"
            class="bg"
            :style="{backgroundImage: `url(${favoritesImg[list[4]]})`}"
          >
            <div class="wash-mode">
              {{ washmodeName[list[4]] }}
            </div>
            <div class="wash-type">
              {{ washTypeName[list[12] >> 4] }}
            </div>
            <img 
              v-if="!isEdit"
              class="start-img" 
              src="../assets/img/favour-start.png"
              @click="handleClickStartBtn(list)"
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
          type="positive"
          :inactive="indexList.length === 0"
          @click="handleDelete"
        >删除</gree-button>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
// import Header from '../components/Header';
// eslint-disable-next-line import/first
import { Dialog, Header, Check, CheckBox, CheckGroup, CheckList, Button, RadioList } from 'gree-ui';
import { washingClassificationConfig } from '../../src/api/index';
import { washTypeName, washmodeName, favoritesImg } from '../api/utils';
import { changeZnVlue } from '../utils/config';

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
  mixins: [washingClassificationConfig],
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
      favor1Params: state => state.dataObject.favor1Params,
      favor2Params: state => state.dataObject.favor2Params,
      favor3Params: state => state.dataObject.favor3Params,
      favorList(state) {
        return [state.dataObject.favor1Params, state.dataObject.favor2Params, state.dataObject.favor3Params];
      }
    })
  },
  watch: {
  },
  mounted() {},
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
    edit() {
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
      console.log('返回');
      this.$router.push({ name: 'Home' });
    },
    handleDelete() {
      Dialog.confirm({
        content:
          '确认取消收藏',
        confirmText: '确定',
        onConfirm: () => {
          const obj = {};
          obj.changeFavor = 2; 
          obj.exeFavor = this.indexList[0] + 1; 
          const deletList = new Array(14);
          deletList.fill(0);
          obj[`favor${obj.exeFavor}Params`] = deletList;
          this.edit();
          this.setDataObject(obj);
          this.sendCtrl(obj);
        },
        cancelText: '取消',
        onCancel: () => this.edit()
      });
    },
    /**
     * @description // 判断是否特殊模式需弹框确认
     */
    handleClickStartBtn(list) {
      if (list[4] === 10) {
        Dialog.confirm({
          title: '确认提示',
          content:
            '本程序仅适用于可机洗羊毛织物，请确认是否可机洗!  请确保已打开机门投放适量中性洗涤剂。',
          confirmText: '确认',
          onConfirm: () => this.startFavourProcess(list),
          cancelText: '取消',
          onCancel: () => console.log('取消')
        });
      } else if (list[4] === 12) {
        Dialog.confirm({
          title: '确认提示',
          content:
            '本程序仅适用于可机洗丝绸织物，请确认是否可机洗! 请确保已打开机门投放适量中性洗涤剂。',
          confirmText: '确认',
          onConfirm: () => this.startFavourProcess(list),
          cancelText: '取消',
          onCancel: () => console.log('取消')
        });
      } else {
        this.startFavourProcess(list);
      }
    },
    /**
     * @description //启动收藏夹程序
     */
    startFavourProcess(list) {
      const obj = {
        launch: 1,
        washType: list[12] >> 4, // 洗涤类型
        washMode: list[4], // 洗涤模式
      };
      let funString = list[0].toString(2); // 辅助功能转二进制
      for (let index = funString.length; index < 8; index++) {
        funString = `0${funString}`;
      }
      // console.log(funString);
      if (Number(funString[1])) {
        obj.soak = 1;// 浸泡
        obj.soakTime = list[12] % 256;// 浸泡时间
      } 

      Number(funString[2]) && (obj.energySave = 1); // 节能
      Number(funString[3]) && (obj.noDrain = 1); // 免排水
      Number(funString[5]) && (obj.highWater = 1); // 高水位
      Number(funString[6]) && (obj.creaseRes = 1); // 防皱
 
      if (list[5] && list[6]) { obj.speed = list[5] * 256 + list[6]; } // 转速
      if (list[7]) { obj.washTemp = list[7]; } // 温度
      if (list[8]) { obj.setWashTime = list[8]; } // 洗涤时间

      obj.timeAll = list[10] * 256 + list[11]; // 运行总时间

      Number(list[9]) && (obj.potch = Number(list[9]));// 漂洗次数
      Number(list[13]) && (obj.dry = Number(list[13]));// // 烘干/蒸汽 状态

      this.setDataObject(obj);
      this.setDataObject({timeLeft: obj.timeAll, devState: 1, runStage: 2});
      this.sendCtrl(obj);
      this.$router.push({
        name: 'Startup'
      });
    }
  }
};
</script>
