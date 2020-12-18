<template>
  <gree-view class="view-cloud-menu-detail">
    <gree-header
      :right-options="{showMore: true}"
      @on-click-more="moreInfo"
    >
      {{lists.Name}}
    </gree-header>
    <gree-page>
      <gree-image
        :src="lists.Pic"
        class="banner"
        width="100%">
        <template v-slot:loading>
          <gree-activity-indicator
            type="spinner"
            :size="30" />
        </template>
        <template v-slot:error>加载失败</template>
      </gree-image>
      <section>
        <article v-if="lists.Dis">
          <p v-html="lists.Dis"></p>
        </article>
        <article>
          <h3
            v-if="lists.MainFoods"
            class="sub-title">材料清单</h3>
          <gree-list
            v-if="lists.AllFoods">
            <gree-list-item
              v-for="(item, index) in lists.AllFoods"
              :key="index"
              :title="item.ingredName"
              :text="item.num + item.unit"></gree-list-item>
          </gree-list>
        </article>
        <article>
          <h3 class="sub-title">
            烹饪工具
          </h3>
          <p>{{ lists.Tool }}</p>
        </article>
        <article>
          <h3 class="sub-title">
            制作步骤
          </h3>
        </article>
        <article
          v-for="item in cloudMenuDetailSteps"
          :key="item.Step"
        >
          <h3 class="sub-title">
            {{ item.Step }} / {{ cloudMenuDetailSteps.length }}
          </h3>
          <gree-image
            class="spic"
            :src="item.Spic"
            width="100%">
            <template v-slot:loading>
              <gree-activity-indicator
                type="spinner"
                :size="30" />
            </template>
            <template v-slot:error>加载失败</template>
          </gree-image>
          <p class="step-text">
            {{ item.Sdis }}
          </p>
        </article>
        <article v-if="lists.Time">
          <h3 class="sub-title">
            烹饪耗时
          </h3>
          <p>{{ lists.Time }}</p>
        </article>
        <article v-if="lists.Tips.length">
          <h3 class="sub-title">
            提示
          </h3>
          <!--eslint-disable-next-line--> 
          <p v-html="lists.Tips"></p>
        </article>
      </section>
      <gree-block>
        <gree-row>
          <gree-col>
            <gree-button
              round
              @click="start"
            >
              一键烹饪
            </gree-button>
          </gree-col>
        </gree-row>
      </gree-block>
    </gree-page>
  </gree-view>
</template>

<script>
import {
  View,
  Page,
  Header,
  Block,
  Row,
  Col,
  Button,
  Toast,
  ActivityIndicator,
  Image,
  List,
  Item,
  Divider,
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
// import MenuList from '@/api/828d04/menuList'; // 云菜单列表（测试数据）
// import MenuDetail from '@/api/828d04/menuDetail'; // 云菜单详情（测试数据）
import commonMethodConfig from '@/mixins/config/828d04/commonMethod';
import { sortByProps, isJSON } from '@/utils';
import * as types from '@/store/types';
import {
  POW,
  PAUSE,
  RUN_STAT,
  MODE_SMART_MENU,
  LIST1_SMART_MENU_CLOUD,
  TAG_LOADING_TIME,
  UseCanTurnOnType,
  __DEV__,
} from '@/api/828d04/constant';
import { editDevice, showToast } from '../../../../static/lib/PluginInterface.promise';
import { testCloudMenuData } from '@/test/testData'; // 云菜单列表（测试数据）

// 替换符号
const replaceChar = str => {
  const char = { ' ': ',', '\t': ',' };
  return str.trim().replace(/[\s\t]/g, a => { return char[a] });
}

function getArrCode(strCode) {
  const fsStrCode = replaceChar(strCode);
  let arrCode = fsStrCode.split(',');
  let Status = 200;
  const ret = [];
  try {
    if (arrCode.length === 0) {
      throw Error('云菜单指令为空数组...');
    } else if (arrCode.length !== 30) {
      throw Error('云菜单指令长度不规范，数组长度不为30');
    } else {
      let hasNaN = false;
      for (let index = 0; index < arrCode.length; index += 1) {
        const ele = arrCode[index];
        const hexToInt = parseInt(ele, 16);
        hasNaN = Number.isNaN(hexToInt);
        if (hasNaN) {
          throw Error(`云菜单指令数组下标${index}的值为${ele}, 格式不规范`);
        }
        if (hexToInt < 0 || hexToInt > 255) {
          throw Error(`云菜单指令数组下标${index}的值为${hexToInt}, 超出限定范围[0, 255]`);
        }
        const isPush = !Number.isNaN(hexToInt);
        if (isPush) {
          ret.push(hexToInt);
        }
      }
    }
  } catch (e) {
    console.error(e);
    showToast(e.toString(), 0);
    Status = 500;
    return [ret, Status];
  }
  return [ret, Status];
}

export default {
  components: {
    [View.name]: View,
    [Page.name]: Page,
    [Header.name]: Header,
    [Block.name]: Block,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [ActivityIndicator.name]: ActivityIndicator,
    [Image.name]: Image,
    [List.name]: List,
    [Item.name]: Item,
    [Divider.name]: Divider,
  },
  mixins: [commonMethodConfig],
  data() {
    return {
      Cid: 0, // 参数ID
      lists: {},
      detail: [],
    };
  },
  computed: {
    ...mapState({
      mac: state => state.mac,
      cloudMenuList: state => {
        if (__DEV__) return testCloudMenuData;
        return state.cloudMenuList;
      },
      cloudMenuDetailSteps: state => {
        const {cloudMenuDetailSteps} = state;
        const ret = sortByProps(cloudMenuDetailSteps, ['Step:asc']);
        return ret;
      },
      dataObject: state => state.dataObject
    })
  },
  created() {
    this.Cid = this.$route.params.id;
    const {Cid} = this;
    this.getCloudMenuDetailSteps({ Cid });
    const lists = this.cloudMenuList.filter(v => {
      return v.Cid === Cid;
    });
    const [data] = lists;
    this.lists = data;

    console.log({data});

    try {
      let Foods = {};
      if (isJSON(data.Foods)) {
        Foods = JSON.parse(data.Foods);
      } else {
        Foods = data.Foods;
      }
      const { main, auxiliary } = Foods;
      this.lists.MainFoods = main;
      this.lists.AuxiliaryFoods = auxiliary;
      console.log({ main, auxiliary });
      this.lists.AllFoods = [].concat(Foods.main).concat(Foods.auxiliary);
      this.lists.Dis = this.lists.Dis.replace(/\n/g, '<br/>');
      this.lists.Tips = this.lists.Tips.replace(/\n/g, '<br/>');
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    ...mapMutations({
      setPow: types.SET_POW,
      setMod: types.SET_MOD,
      setPause: types.SET_PAUSE,
      setRunStat: types.SET_RUNSTAT,
      setList1: types.SET_LIST1,
      setDisSetHour: types.SET_DIS_SET_HOUR,
      setDisSetMin: types.SET_DIS_SET_MIN,
    }),
    ...mapActions({
      getCloudMenuDetailSteps: types.GET_CLOUD_MENU_DETAIL_STEPS,
      sendCtrl: types.SEND_CTRL,
    }),
    moreInfo() {
      editDevice(this.mac);
    },
    start() {
      // 弹出对应的清洁模式和剩余时间
      const isNextHandle = this.handleCleanMod();
      if (!isNextHandle) return;

      const strCode = this.lists.Code;
      const [CloudMenu, Status] = getArrCode(strCode);
      const isPassCode = Status === 200;
      // 整机是否能启动
      const type = UseCanTurnOnType.CloudMenu;
      const payload = CloudMenu;
      const canTrunOn = this.useCanTurnOn({ type, payload });
      if (isNextHandle && isPassCode && canTrunOn) {
        this.setPow(POW.TurnOn);
        this.setMod(MODE_SMART_MENU);
        this.setPause(PAUSE.Off);
        // this.setMod(MODE_NETWORK_MODE);
        this.setRunStat(RUN_STAT.Working);
        this.setList1(LIST1_SMART_MENU_CLOUD);
        this.setDisSetHour(TAG_LOADING_TIME); // 等待下一包数据
        this.setDisSetMin(TAG_LOADING_TIME); // 等待下一包数据
        const { Pow, RunStat, Pause, Mod, List1 } = this.dataObject;
        this.sendCtrl({ CloudMenu, Pow, RunStat, Pause, Mod, List1 });
        showToast('云菜单启动中...', 0);
        this.$router.push({ path: '/' }); // 跳转到首页
      }
    }
  }
};
</script>

<style lang="scss">
.view.view-cloud-menu-detail {
  .list {
    ul {
      background: none;
      &::before, &::after {
        display: none;
      }
    }
  }
  .item-content {
    padding-left: 0;
    .item-inner {
      justify-content: start;
      padding-right: 0;
      .item-title, .item-after {
        font-size: 36px;
        color: #404657;
      }
      .item-after {
        margin-left: 0;
      }
      &::after {
        display: none;
      }
    }
  }
  .page {
    .gree-image {
      &.banner {
        width: 1080px;
        height: 608px;
      }
      &.spic {
        overflow: hidden;
        border-radius: 15px;
        background: #fff;
        width: 974px;
        min-height: 548px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.aspect-ratio {
  height: 0;
  position: relative;
}
.aspect-ratio--6x4 {
  padding-bottom: 66.6%;
}
.cover {
  background-size: cover;
}
.bg-center {
  background-position: 50%;
  background-repeat: no-repeat;
}
.step-cover {
  background-color: #e2e2e2;
}
section {
  padding: 0 40px;
  font-size: 34px;
  transform: translateZ(0);
  article {
    margin-top: 79px;
    color: #404657 !important;
    &:first-child {
      margin-top: 40px;
    }
    .sub-title {
      margin-bottom: 30px;
      font-size: 48px;
      &.center {
        text-align: center;
      }
    }
    p {
      font-size: 36px;
    }
    .step-text {
      margin: 30px 0 34px;
      line-height: 1.6;
    }
  }
}
.block {
  margin-top: 120px;
}
.gree-button {
  margin: 0 auto;
}
</style>
