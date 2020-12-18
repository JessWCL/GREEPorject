<template>
  <div class="page has-navbar">
    <gree-header
      :left-options="{preventGoBack: true}"
      @on-click-back="goBack"
      :right-options="{showMore: !functype}"
      @on-click-more="moreInfo"
    >{{ $language('menu.btnMenu') }}</gree-header>
    <div class="page-content page-menu">
      <div
        class="page-main"
        :class="{'hidden': isSelected}"
      >
        <!-- 顶部大图-->
        <div class="menu-large">
          <img
            @click="selectMenu(6)"
            :src="menuList[6].ImgUrl"
          >
          <ul>
            <li>
              <h1>{{ menuList[6].name }}</h1>
            </li>
            <li>
              {{ menuList[6].material }}
            </li>
          </ul>
        </div>
        <!-- 其他菜谱列表-->
        <div class="menu-list">
          <div
            class="menu"
            :ref="'menu_' + index "
            @click="selectMenu(index)"
            v-for="(item, index) in menuList"
            :key="item.menu_id"
          >
            <img
              class="menu-img"
              v-if="index<6"
              :src="item.ImgUrl"
            >
            <div
              class="menu-method"
              v-if="index<6"
            >
              <ul>
                <li>
                  <h1>
                    {{ item.name }}
                  </h1>
                </li>
                <li>
                  {{ item.material }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 内部细节-->
      <div
        class="page-detail"
        :class="{'hidden': !isSelected}"
      >
        <div class="detail-img">
          <img :src="menuList[menuID].detailImgUrl">
        </div>
        <div class="material-list">
          <strong class="material-top">{{ foodList }}</strong>
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
        <hr>
        <div class="cookTip">
          <strong class="material-top">{{ cookingTips }}</strong>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { editDevice } from '../../../static/lib/PluginInterface.promise';

export default {
  data() {
    return {
      isSelected: false, // 是否展示详细内容
      menuID: 0, // 菜单id
      btnMenu: this.$language('menu.btnMenu'),
      foodList: this.$language('menu.foodList'),
      cookingTips: this.$language('menu.cookingTips'),
      // 菜单配置
      menuList: [
        {
          menu_id: 0,
          name: this.$language('menu.muttomchopWithgourd'),
          material: this.$language('menu.muttomchopList'),
          ImgUrl: require('@/assets/img/list_dongguabao.png'),
          detailImgUrl: require('@/assets/img/detail_dongguabao.png'),
          materialList: this.$language(
            'menu.muttom1',
            'menu.muttom2',
            'menu.muttom3',
            'menu.muttom4',
            'menu.muttom5',
            'menu.muttom6',
            'menu.muttom7',
            'menu.muttom8'
          ),
          cookTips: this.$language(
            'menu.muttom9',
            'menu.muttom10',
            'menu.muttom11',
            'menu.muttom12',
            'menu.muttom13'
          )
        },
        {
          menu_id: 1,
          name: this.$language('menu.chineseYamSoup'),
          material: this.$language('menu.chineseYamList'),
          ImgUrl: require('@/assets/img/list_shanyaopaigu.png'),
          detailImgUrl: require('@/assets/img/detail_shanyaopaigu.png'),
          materialList: this.$language(
            'menu.yam1',
            'menu.yam2',
            'menu.yam3',
            'menu.yam4',
            'menu.yam5'
          ),
          cookTips: this.$language(
            'menu.yam6',
            'menu.yam7',
            'menu.yam8',
            'menu.yam9'
          )
        },
        {
          menu_id: 2,
          name: this.$language('menu.preservedeggPorridge'),
          material: this.$language('menu.preservedEggList'),
          ImgUrl: require('@/assets/img/list_pidanshourou.png'),
          detailImgUrl: require('@/assets/img/detail_pidanshourou.png'),
          materialList: this.$language(
            'menu.egg1',
            'menu.egg2',
            'menu.egg3',
            'menu.egg4',
            'menu.egg5',
            'menu.egg6',
            'menu.egg7',
            'menu.egg8'
          ),
          cookTips: this.$language('menu.egg9', 'menu.egg10', 'menu.egg11')
        },
        {
          menu_id: 3,
          name: this.$language('menu.babaoPorridge'),
          material: this.$language('menu.babaoPorridgeList'),
          ImgUrl: require('@/assets/img/list_babaozhou.png'),
          detailImgUrl: require('@/assets/img/detail_babaozhou.png'),
          materialList: this.$language(
            'menu.eightPorridge1',
            'menu.eightPorridge2',
            'menu.eightPorridge3',
            'menu.eightPorridge4',
            'menu.eightPorridge6',
            'menu.eightPorridge7',
            'menu.eightPorridge8'
          ),
          cookTips: this.$language(
            'menu.eightPorridge9',
            'menu.eightPorridge10',
            'menu.eightPorridge11'
          )
        },
        {
          menu_id: 4,
          name: this.$language('menu.pearWithRockCandy'),
          material: this.$language('menu.pearWithCandyList'),
          ImgUrl: require('@/assets/img/list_bingtangxueli.png'),
          detailImgUrl: require('@/assets/img/detail_bingtangxueli.png'),
          materialList: this.$language(
            'menu.bingtang1',
            'menu.bingtang2',
            'menu.bingtang3',
            'menu.bingtang4',
            'menu.bingtang5'
          ),
          cookTips: this.$language(
            'menu.bingtang6',
            'menu.bingtang7',
            'menu.bingtang8'
          )
        },
        {
          menu_id: 5,
          name: this.$language('menu.longanPorridge'),
          material: this.$language('menu.longanPorridgeList'),
          ImgUrl: require('@/assets/img/list_xiaomizhou.png'),
          detailImgUrl: require('@/assets/img/detail_xiaomizhou.png'),
          materialList: this.$language(
            'menu.littleRice1',
            'menu.littleRice2',
            'menu.littleRice3',
            'menu.littleRice4',
            'menu.littleRice5'
          ),
          cookTips: this.$language(
            'menu.littleRice6',
            'menu.littleRice7',
            'menu.littleRice8',
            'menu.littleRice9',
            'menu.littleRice10'
          )
        },
        {
          menu_id: 6,
          name: this.$language('menu.chickenSoup'),
          material: this.$language('menu.chickenSoupList'),
          ImgUrl: require('@/assets/img/list_xianggudunji.png'),
          detailImgUrl: require('@/assets/img/detail_xianggudunji.png'),
          materialList: this.$language(
            'menu.chicken1',
            'menu.chicken2',
            'menu.chicken3',
            'menu.chicken4'
          ),
          cookTips: this.$language(
            'menu.chicken5',
            'menu.chicken6',
            'menu.chicken7',
            'menu.chicken8',
            'menu.chicken9'
          )
        }
      ]
    };
  },
  computed: {
    ...mapState({
      editEnable: state => state.editEnable,
      functype: state => state.functype,
      mac: state => state.mac
    })
  },
  /**
   * @description 进入页面后监听根组件的事件分发，将goBack传给安卓返回键
   */
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$root.$on('statusBack', () => {
        vm.goBack();
      });
    });
  },
  /**
   * @description 退出后解除根组件的事件绑定
   */
  beforeRouteLeave(to, from, next) {
    this.$root.$off('statusBack');
    next();
  },
  methods: {
    /**
     * @description 返回键
     */
    goBack() {
      if (this.isSelected) {
        this.isSelected = false;
        this.btnMenu = this.$language('menu.cookTitle');
      } else {
        this.$router.back(-1);
      }
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      if (!this.functype) {
        if (this.editEnable) {
          editDevice(this.mac);
        }
      }
    },
    /**
     * @param {number} index 菜谱index
     * @description 选择菜谱操作
     */
    selectMenu(index) {
      this.isSelected = true;
      this.menuID = index;
      this.btnMenu = this.menuList[index].name;
    }
  }
};
</script>
