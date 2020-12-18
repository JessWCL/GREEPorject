<template>
  <!-- 菜单页面 -->
  <div class="page-menu">
    <div class="head">
      <div
        class="icon-back"
        @click="goBack()"
      >
        <img src="../../assets/img/return_black.png">
      </div>
      <span class="btnMenu">{{ btnMenu }}</span>
    </div>
    <div
      class="main"
      :class="{ hide: isMenuSelected }"
    >
      <div class="menu-large">
        <!-- 顶部大图-->
        <img
          :src="menuList[6].ImgUrl"
          @click="selectMenu(6)"
        >
        <ul>
          <li>
            {{ menuList[6].name }}
          </li>
          <li>
            {{ menuList[6].material }}
          </li>
        </ul>
      </div>
      <div class="menu-list">
        <!-- 底部列表-->
        <div
          v-for="(item, index) in menuList"
          :ref="'menu_' + index "
          :key="item.menu_id"
          class="menu"
          @click="selectMenu(index)"
        >
          <img
            v-if="index<6"
            class="menu-img"
            :src="item.ImgUrl"
          >
          <div
            v-if="index<6"
            class="menu-method"
          >
            <ul>
              <li>
                {{ item.name }}
              </li>
              <li>
                {{ item.material }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="detail"
      :class="{ hide: !isMenuSelected }"
    >
      <!-- 内部细节-->
      <div class="detail-img">
        <img :src="menuList[menuID].detailImgUrl">
      </div>
      <div class="material-list">
        <div class="material-top">
          {{ foodList }}
        </div>
        <ul>
          <li
            v-for="(item, index) in menuList[menuID].materialList"
            :ref="'material_' + index "
            :key="item.menu_id"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="white-space" />
      <div class="cookTip">
        <div class="material-top">
          {{ cookingTips }}
        </div>
        <ul>
          <li
            v-for="(item, index) in menuList[menuID].cookTips"
            :ref="'cookTip' + index "
            :key="item.menu_id"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

const img01 = require('../../assets/img/list_dongguabao.png');
const img01Detail = require('../../assets/img/detail_dongguabao.png');
const img02 = require('../../assets/img/list_shanyaopaigu.png');
const img02Detail = require('../../assets/img/detail_shanyaopaigu.png');
const img03 = require('../../assets/img/list_pidanshourou.png');
const img03Detail = require('../../assets/img/detail_pidanshourou.png');
const img04 = require('../../assets/img/list_babaozhou.png');
const img04Detail = require('../../assets/img/detail_babaozhou.png');
const img05 = require('../../assets/img/list_bingtangxueli.png');
const img05Detail = require('../../assets/img/detail_bingtangxueli.png');
const img06 = require('../../assets/img/list_xiaomizhou.png');
const img06Detail = require('../../assets/img/detail_xiaomizhou.png');
const img07 = require('../../assets/img/list_xianggudunji.png');
const img07Detail = require('../../assets/img/detail_xianggudunji.png');

/**
 *@module Menu
 *@description 云菜谱页面
 */
export default {
  name: 'Menu',
  data() {
    return {
      menuID: 0, // 菜单id
      foodList: this.$language('foodList'),
      cookingTips: this.$language('cookingTips'),
      // 菜单配置
      menuList: [
        {
          menu_id: 0,
          name: this.$language('muttomchopWithgourd'),
          material: this.$language('muttomchopList'),
          ImgUrl: img01,
          detailImgUrl: img01Detail,
          materialList: this.$language(
            'muttom1',
            'muttom2',
            'muttom3',
            'muttom4',
            'muttom5',
            'muttom6',
            'muttom7',
            'muttom8',
          ),
          cookTips: this.$language(
            'muttom9',
            'muttom10',
            'muttom11',
            'muttom12',
            'muttom13',
          ),
        },
        {
          menu_id: 1,
          name: this.$language('chineseYamSoup'),
          material: this.$language('chineseYamList'),
          ImgUrl: img02,
          detailImgUrl: img02Detail,
          materialList: this.$language('yam1', 'yam2', 'yam3', 'yam4', 'yam5'),
          cookTips: this.$language('yam6', 'yam7', 'yam8', 'yam9'),
        },
        {
          menu_id: 2,
          name: this.$language('preservedeggPorridge'),
          material: this.$language('preservedEggList'),
          ImgUrl: img03,
          detailImgUrl: img03Detail,
          materialList: this.$language(
            'egg1',
            'egg2',
            'egg3',
            'egg4',
            'egg5',
            'egg6',
            'egg7',
            'egg8',
          ),
          cookTips: this.$language('egg9', 'egg10', 'egg11'),
        },
        {
          menu_id: 3,
          name: this.$language('babaoPorridge'),
          material: this.$language('babaoPorridgeList'),
          ImgUrl: img04,
          detailImgUrl: img04Detail,
          materialList: this.$language(
            'eightPorridge1',
            'eightPorridge2',
            'eightPorridge3',
            'eightPorridge4',
            'eightPorridge6',
            'eightPorridge7',
            'eightPorridge8',
          ),
          cookTips: this.$language(
            'eightPorridge9',
            'eightPorridge10',
            'eightPorridge11',
          ),
        },
        {
          menu_id: 4,
          name: this.$language('pearWithRockCandy'),
          material: this.$language('pearWithCandyList'),
          ImgUrl: img05,
          detailImgUrl: img05Detail,
          materialList: this.$language(
            'bingtang1',
            'bingtang2',
            'bingtang3',
            'bingtang4',
            'bingtang5',
          ),
          cookTips: this.$language('bingtang6', 'bingtang7', 'bingtang8'),
        },
        {
          menu_id: 5,
          name: this.$language('longanPorridge'),
          material: this.$language('longanPorridgeList'),
          ImgUrl: img06,
          detailImgUrl: img06Detail,
          materialList: this.$language(
            'littleRice1',
            'littleRice2',
            'littleRice3',
            'littleRice4',
            'littleRice5',
          ),
          cookTips: this.$language(
            'littleRice6',
            'littleRice7',
            'littleRice8',
            'littleRice9',
            'littleRice10',
          ),
        },
        {
          menu_id: 6,
          name: this.$language('chickenSoup'),
          material: this.$language('chickenSoupList'),
          ImgUrl: img07,
          detailImgUrl: img07Detail,
          materialList: this.$language(
            'chicken1',
            'chicken2',
            'chicken3',
            'chicken4',
          ),
          cookTips: this.$language(
            'chicken5',
            'chicken6',
            'chicken7',
            'chicken8',
            'chicken9',
          ),
        },
      ],
    };
  },
  computed: {
    ...mapState({
      isMenuSelected: state => state.menuPages.isMenuSelected,
    }),
    btnMenu() {
      let ret = this.$language('btnMenu');
      if (this.isMenuSelected) ret = this.menuList[this.menuID].name;
      return ret;
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
  //       vm.goBack();
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
  methods: {
    ...mapMutations({
      setIsMenuSelected: 'SET_IS_MENU_SELECTED'
    }),
    /**
     * @function goBack
     * @description 返回键
     */
    goBack() {
      this.isMenuSelected ? this.setIsMenuSelected(false) : this.$router.back(-1);
    },
    /**
     * @function selectMenu
     * @param {number} index 菜谱index
     * @description 选择菜谱操作
     */
    selectMenu(index) {
      this.setIsMenuSelected(true);
      this.menuID = index;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/index.scss";

@mixin text-overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.page-menu {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #fff;
  ul {
    list-style: none;
  }
  .head {
    width: 100%;
    height: 6%;
    box-sizing: border-box;
    .icon-back {
      width: 13%;
      height: 100%;
      float: left;
      img {
        width: 20%;
        margin-top: 15%;
      }
    }
    .btnMenu {
      display: inline-block;
      margin-top: 1.6%;
      margin-left: -13%;
      @include font-size(22px);
    }
  }
  .main {
    width: 100%;
    height: 94%;
    overflow-x: hidden;
    overflow-y: auto;
    .menu-large {
      width: 100%;
      color: #828282;
      img {
        width: 100%;
      }
      ul {
        padding: 0 2%;
        text-align: left;
        font-size: 0.35rem;
        font-family: appleLight;
        margin: 0.33rem 0.23rem;
        li {
          @include text-overflow();
          margin-top: 0.23rem;
          // font-size: 0.26rem;
        }
      }
    }
    .menu-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      .menu {
        width: 49.5%;
        ul {
          padding: 0 2%;
          text-align: left;
          color: #828282;
          margin: 0.33rem 0.23rem;
          li {
            @include text-overflow();
            margin-top: 0.23rem;
          }
        }
      }
      .menu-img {
        width: 100%;
      }
      .menu-method {
        margin-bottom: 3%;
        ul {
          li {
            @include text-overflow();
            font-size: 0.35rem;
            font-family: appleLight;
          }
        }
      }
    }
  }
  .detail {
    width: 100%;
    height: 94%;
    overflow-x: hidden;
    overflow-y: auto;
    ul {
      margin-top: 5%;
      margin-left: 1rem;
    }
    li {
      margin-top: 1%;
      width: 87%;
      font-family: appleLight;
      font-size: 0.35rem;
    }
    .detail-img {
      width: 100%;
      img {
        max-width: 100%;
        width: 100%;
      }
    }
    .material-list {
      margin-top: 3%;
      margin-left: 4%;
      width: 100%;
      text-align: left;
      color: #707070;
      font-family: appleLight;
      font-size: 0.35rem;
    }
    .white-space {
      margin: 1rem 0;
    }
    .cookTip {
      text-align: left;
      margin-left: 4%;
      width: 100%;
      height: 40%;
      color: #707070;
    }
    .material-top {
      color: #707070;
      font-size: .42rem;
    }
  }
  .hidden {
    visibility: hidden;
  }
  .hide {
    display: none;
  }
}
</style>
