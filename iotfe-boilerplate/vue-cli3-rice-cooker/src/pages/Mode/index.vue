<template>
  <!-- 模式页面 -->
  <div class="mode-main">
    <div :class="main">
      <div class="model-body">
        <div
          v-for="(item, index) in modeList"
          :ref="'model_' + index "
          :key="item.index"
          class="model"
          @click="selectModel(index)"
        >
          <!-- 模式列表 -->
          <img
            class="model-img"
            :src="item.selected ? item.selectImgUrl : item.ImgUrl"
          >
          <div class="model-name">
            {{ item.modeName }}
          </div>
        </div>
      </div>
      <div class="foot">
        <div @click="modelCancel()">
          {{ btnCancel }}
        </div>
        <div @click="modelConfirm()">
          {{ btnAffirm }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @module Mode
 * @description 模式列表选择模块
 * @requires module:setTime 设置插件内的时间
 */
import { mapState, mapMutations } from 'vuex';
import { setTime } from '../../mixins/function-change-device.mixin';

export default {
  name: 'Mode',
  components: {},
  mixins: [setTime],
  data() {
    return {
      save: this.$language('btnSave'),
      unitHour: this.$language('unitHour'),
      about: this.$language('about'),
      unitMin: this.$language('unitMin'),
      btnCancel: this.$language('btnCancel'),
      txtLast: this.$language('txtLast'),
      btnAffirm: this.$language('btnAffirm'),
      riceType: this.$language('rice_kind'),
      tasteType: this.$language('taste'),
      main: 'main moveup', // 控制页面动画
      typeTime: 50, // 精煮饭、快煮饭弹框里的时间
      isTaste: true, // 有没有口感
      typeCache: 0, // 米种缓存
      tasteCache: 1, // 口感缓存
      modeIndexBuffer: 0, // Buffer系列是存储页面刚进来的信息，点击取消后将这些信息提交
      currentModeCache: null,
    };
  },
  computed: {
    ...mapState({
      currentMode: state => state.currentMode,
      modeList: state => state.modeList,
      dataObject: state => state.dataObject,
      isCooking: state => state.dataObject.Pow,
      MidType: state => state.dataObject.MidType,
      devname: state => state.devName,
      Rice: state => state.dataObject.Rice,
      Textre: state => state.dataObject.Textre,
      modeIndex: state => state.dataObject.mode,
      requireTime: state => state.dataObject.StTmr,
      riceIndex: state => state.dataObject.Rice,
      tasteIndex: state => state.dataObject.Textre,
      KpTpEn: state => state.dataObject.KpTpEn,
      KpTpTmr: state => state.dataObject.KpTpTmr,
      /**
       * @function isPreseting
       * @description 判断是否开始预约
       */
      isPreseting: state => state.dataObject.SchEn
    }),
  },
  watch: {
    isCooking: function updatePowUI(newv, oldv) {
      if (newv && !oldv) {
        if (this.isPreseting) {
          this.$router.push({ name: 'Appointment' });
        } else {
          this.updateIsMode(false);
          this.$router.push({ path: '/' });
        }
      }
    }
  },
  /**
   * @function beforeRouteEnter
   * @description 进入页面后监听根组件的事件分发，将goBack传给安卓返回键
   * @param to 路由跳转的目标
   * @param from 路由从哪里来
   * @param next 传一个回调给next进而访问组件实例。否则获取不到组件内的this
   */
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$root.$on('statusBack', () => {
  //       vm.modelCancel();
  //     });
  //   },
  //   );
  // },
  /**
   * @function beforeRouteLeave
   * @description 退出后解除根组件的事件绑定
   * @param to 路由跳转的目标
   * @param from 路由从哪里来
   * @param next 传一个回调给next。beforeRouteLeave可以获取到this
   */
  // beforeRouteLeave(to, from, next) {
  //   this.$root.$off('statusBack');
  //   next();
  // },
  /**
   * @function initMode
   * @description 初始化Mode页面
   */
  mounted: function initMode() {
    this.main = 'main moveup';
    this.currentModeCache = this.currentMode;
  },
  methods: {
    ...mapMutations({
      updateIsMode: 'IS_MODE',
      updateIsAbout: 'IS_ABOUT',
      updateModeName: 'MODE_NAME',
      setDataObject: 'SET_DATA_OBJECT',
      setCurrentMode: 'SET_CURRENT_MODE',
      setActiveMode: 'SET_ACTIVE_MODE'
    }),
    /**
     * @function modelCancel
     * @description 模式界面的取消操作：还原刚进来时的模式、米种、口感、时间
     */
    modelCancel() {
      if (this.isType) {
        this.isType = false; // 安卓返回键取消米种选择弹框
      } else {
        this.updateIsMode(false);
        this.recover2Init();
        this.animation();
      }
    },
    recover2Init() {
      this.setCurrentMode(this.currentModeCache);
      const { index } = this.currentModeCache;
      this.setActiveMode({ modeIndex: index });
    },
    /**
     * @function modelConfirm
     * @description 模式界面的确定操作：提交模式、米种、口感
     */
    modelConfirm() {
      this.updateIsMode(false);
      // 米种，口感
      const TypeTaste = this.$parent.$refs.TypeTaste.getTypeTaste();
      const { type, taste } = TypeTaste;
      this.setDataObject({
        Rice: type,
        Textre: taste,
      });
      // 滑轮ID
      this.$parent.$refs.modeCarousel.setId(this.currentMode.index);
      this.setCurrentMode(this.currentMode);
      this.animation();
    },
    /**
     * @function animation
     * @description Mode界面的动画
     */
    animation() {
      const self = this;
      this.main = 'main movedown';
      setTimeout(() => {
        if (self.$route.path !== '/') {
          self.$router.push('/');
        }
      }, 100);
    },

    // 设置米种口感 同步工作时间
    handleCurrentModeDefaultRiceTextre() {
      // 设置米种口感 同步工作时间
      const {currentMode} = this;
      const [_Rice, _Textre] = currentMode.defaultValueRiceTextre;
      const Rice = this.Rice || _Rice;
      const Textre = this.Textre || _Textre;
      this.setDataObject({
        Rice,
        Textre,
      });
      // eslint-disable-next-line no-undef
      const refTypeTaste = vm.$refs.$TypeTaste;
      // 设置米种口感
      refTypeTaste.setType({type: this.dataObject.Rice});
      refTypeTaste.setTaste({taste: this.dataObject.Textre});
    },

    // 判断是否可以编辑口感
    handleEditRiceTextre() {
      const {currentMode} = this;
      if (currentMode.canEditableRiceTextreComponent) {
        if (currentMode.hasRice || currentMode.hasTextre) {
          // 组件有上个模式的缓存
          // eslint-disable-next-line no-undef
          vm.$refs.$TypeTaste.setEditable({editable: currentMode.canEditableRiceTextreComponent});
          // eslint-disable-next-line no-undef
          vm.$refs.$TypeTaste.handleClick();
        }
      }
    },

    /**
     * @function selectModel
     * @todo 点击模式，更新模式名称、烹饪时间、米种、口感
     * @param {number} index 模式列表下标
     */
    selectModel(index) {
      const currentMode = this.modeList[index];
      this.setActiveMode({ modeIndex: index });
      this.setCurrentMode(currentMode);
      this.updateIsAbout(true);

      // 设置米种口感 同步工作时间
      this.handleCurrentModeDefaultRiceTextre();

      // 判断是否可以编辑口感
      this.handleEditRiceTextre();
    },
    /**
     * @function selectRice
     * @param index 米种列表下标
     * @description 选择米种触发事件
     */
    selectRice(index) {
      this.riceList.forEach(element => {
        const riceList = element;
        riceList.selected = false;
      });
      this.riceList[index].selected = true;
      this.typeCache = index;
      this.typeChangeTime();
    },
    /**
     * @function selectTaste
     * @param index 口感列表下标
     * @description 选择口感触发事件
     */
    selectTaste(index) {
      if (this.isTaste) {
        this.tasteList.forEach(element => {
          const tasteList = element;
          tasteList.selected = false;
        });
        this.tasteList[index].selected = true;
        this.tasteCache = index;
        this.typeChangeTime();
      }
    },
    /**
     * @function typeChangeTime
     * @description 选择不同米种或口感需要的烹饪时间，typeChange在setTime.mixin中
     */
    typeChangeTime() {
      this.typeTime = this.typeChange(this.typeCache + 1, this.tasteCache + 1);
      this.setDataObject({
        StTmr: this.typeTime,
      });
    },
    /**
     * @function Confirm
     * @description 米种、口感弹框的确认键
     */
    Confirm() {
      this.modelConfirm();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/index.scss";

$main-width: 100%;
$main-height: 100%;
.mode-main {
  width: $main-width;
  height: $main-height;
  text-align: center;
  color: #ffffff;
  .moveup {
    animation: moveUp 0.5s;
  }
  .movedown {
    animation: moveDown 0.2s;
  }
  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 70%;
    overflow: hidden;
    box-sizing: border-box;
    box-shadow: 0 0 7px 0 rgba(64, 70, 87, 0.5);
    color: #404657;
    background-color: rgb(244, 244, 244);
    .model-body {
      display: flex;
      flex-wrap: wrap;
      // justify-content: center;
      align-items: center;
      box-sizing: border-box;
      .model {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 25%;
        margin: 0.6rem 0 0;
        .model-img {
          width: 46%;
        }
        .model-name {
          @include font-size(16px);
        }
      }
    }
    .foot {
      display: flex;
      align-items: center;
      justify-content: space-around;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.3rem 1.15rem;
        margin-bottom: 1rem;
        font-size: 0.45rem;
        background-color: #fff;
        border-radius: 50px;
        box-shadow: 0px 0px 10px 0px #dbdbdb;
        &:active {
          background: #f4f4f4;
        }
      }
    }
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #404657;
    background-image: url("../../assets/img/blackBg.png");
    background-size: 100% 100%;
    .taste-type {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 90%;
      height: 38%;
      border-radius: 8px;
      color: #404657;
      background-color: #fff;
      box-shadow: rgb(219, 219, 219) 0px 0px 10px 0px;
      z-index: 100;
      div {
        width: 100%;
        height: 25%;
      }
      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        @include font-size(20px);
        letter-spacing: 2px;
        font-weight: 500;
      }
      .top {
        display: flex;
        justify-content: space-around;
        align-items: baseline;
        @include font-size(15px);
        .riceType {
          width: 15%;
          margin-right: -8%;
          margin-left: -5%;
          @include font-size(16px);
        }
        .rice {
          width: 15%;
          height: 32%;
          padding: 2% 0;
          border-radius: 6px;
          border: 2px solid #e4e4e4;
        }
        .active {
          border: 2px solid rgb(242, 218, 124);
          background-color: rgb(242, 218, 124);
        }
      }
      .middle {
        display: flex;
        justify-content: space-around;
        align-items: baseline;
        @include font-size(15px);
        .tasteType {
          width: 15%;
          margin-right: -8%;
          margin-left: -5%;
          @include font-size(16px);
        }
        .taste {
          width: 15%;
          height: 32%;
          padding: 2% 0;
          border-radius: 6px;
          border: 2px solid #e4e4e4;
        }
        .active {
          border: 2px solid rgb(242, 218, 124);
          background-color: rgb(242, 218, 124);
        }
      }
      .confirm {
        display: flex;
        height: 20%;
        padding-top: 3%;
        border-top: 1px solid #e4e4e4;
        // @include border-top-1px(#000000);
        font-size: 22px;
        div {
          height: 100%;
        }
      }
    }
    .type {
      width: 90%;
      height: 38%;
      border-radius: 8px;
      background-color: #fff;
      .middle {
        .taste {
          width: 16%;
          height: 34%;
          padding: 2% 0;
          border-radius: 6px;
          color: #404657;
          opacity: 0.6;
          background-color: #eee;
          border: 2px solid #eee;
        }
      }
    }
  }
  .hidden {
    visibility: hidden;
  }
  .hide {
    display: none;
  }
  @keyframes moveUp {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
  @keyframes moveDown {
    0% {
      transform: translateY(0px);
      opacity: 1;
    }
    80% {
      transform: translateY(30px);
      opacity: 0;
    }
    100% {
      transform: translateY(30px);
      opacity: 0;
    }
  }
}
</style>
