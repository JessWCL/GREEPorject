
<template>
  <transition
    name="fade" 
    v-on:after-leave="mask_afterLeave"
  >
    <div class="mask" v-show="pageShow" @click.stop.self="cancel()" key="mask">
      <transition name="popup" mode="out-in" >
        <div class="popup-wrapper" v-show="pageShow" key="popupWrapper" >
          <div class="popup-header">
            <div class="pulldown">
              <span class="pulldown-icon" @click="cancel()" >
                <img class="img" src="../../../../assets/img/ic_pulldown.png">
              </span>
            </div>
          </div>
          <ul class="popup-items-group">
            <li 
              class="popup-item" 
              :class="{disabled: el.disabled}"
              :disabled="el.disabled"
              v-for="(el, index) in buttonList"
              :key="index"
            >
              <img 
                :src="el.ImgUrl"
                class="item-img"
                @click=" el.disabled ? '' : ImgClick({index, val:el.val});"
              />
              <div class="item-name" @click=" el.disabled || !el.moreBtn ? '' : moreBtnClick(index);">
                {{ el.name }}
                <span v-if="el.moreBtn" class="moreBtn" ></span>
                <!-- <img class="moreContent" src="../../../assets/img/more.png" /> -->
              </div>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { Icon } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import popFunctionConfig from '../../../../mixins/config/828e00/Popfunction.js';

const imgAssets = {
  Light: [require("../../../../assets/img/function.png"), require("../../../../assets/img/function-on.png"), ],
  Wind: [require("../../../../assets/img/function.png"), require("../../../../assets/img/function-on.png"), ],
  WatPump: [require("../../../../assets/img/function.png"), require("../../../../assets/img/function-on.png"), ],
};
// home 配置文件
export default {
  name: 'FunctionList',
  components: {
    [Icon.name]: Icon,
  },
  data() {
    return {
      pageShow: false,
    };
  },
  computed: {
    ...mapState({
      Light: state => state.dataObject.Light,
      Wind: state => state.dataObject.Wind,
      WatPump: state => state.dataObject.WatPump,
    }),
    /**
     * @method buttonList
     * @description 高级功能按钮列表
     */
    buttonList() {
      let data = [];
      data = [
        {
          val: 'Light',
          disabled: false,
          name: "灯光",
          ImgUrl: imgAssets.Light[this.Light],
          moreBtn: false,
        },
        /* {
          val: 'Wind',
          disabled: true,
          name: "新风",
          ImgUrl: imgAssets.Wind[this.Wind],
          moreBtn: false,
        },
        {
          val: 'WatPump',
          disabled: true,
          name: "水循环",
          ImgUrl: imgAssets.WatPump[this.WatPump],
          moreBtn: false,
        },
        {
          val: 3,
          disabled: true,
          name: "功能",
          ImgUrl: require("../../../../assets/img/function.png"),
          moreBtn: false,
        }, */
      ];
      return data;
    },
  },
  mounted() {
    this.pageShow = true;
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    /**
     * @function cancel
     * @description 取消popup，回退路由
     */
    cancel() {
      this.pageShow = false;
    },
    /**
     * @function mask_afterLeave
     * @description 在mask离开动画结束之后调用, 回退路由
     */
    mask_afterLeave(el) {
      // console.log(el);
      this.$router.go(-1);
    },
    // 按钮图片被点击
    ImgClick({index, val}) {
      // console.log('ImgClick: %d , %s ', index, val);
      let state = 0;
      this[val] === 1 ? state = 0 : state = 1;

      console.log('ImgClick: %s , %s ', val, state);
      this.setDataObject({
        [val]: state,
      });
      this.sendCtrl({ [val]: state, });
    },
    // 按钮名字与角标被点击
    moreBtnClick(index) {
      console.log(`moreBtnClick: `, index);
      let mode = 'lightSetting';
      switch (index) {
        case 0:
          mode = 'Light';
          break;
        case 1:
          mode = 'Wind';
          break;
        case 2:
          mode = 'WatPump';
          break;
        default:
          break;
      }
      this.$router.replace({name: 'PopupPicker', params: {mode}});
    },
  },
  
};
</script>

<style lang="scss" scoped>
@import '../../../../assets/scss/popup.scss';

// ---

</style>
