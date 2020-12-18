<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-02-22 14:24:42
 * @Description: 首次进入插件，完善个人信息
 -->
<template>
  <gree-view 
    class="page-scene" 
    bg-color="#FFFFFF">
    <gree-header
      :left-options="{ preventGoBack: true }"
      @on-click-back="goBack()"
    >
      场景
    </gree-header>
    <gree-page class="page-content">
      <div class="show-area">
        <div class="header">{{ homeName }}</div>
        <div class="list">
          <div
            class="list-item"
            v-for="(item, index) in sceneList"
            :key="index"
          >
            <img 
              class="list-img" 
              :src="sceneListImge[Number(item.picName) - 1].src" 
              @click="selectScene(index,item.items,item,item.groupname,Number(item.picName))" />
            <div class="list-name">{{ item.groupname }}</div>
          </div>
        </div>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Field, InputItem, Dialog } from 'gree-ui';
import { mapState, mapMutations } from 'vuex';
import {
  editDevice,
  getCurrentHomeSceneList,
  goToEditScene
} from '../../../../static/lib/PluginInterface.promise';
// import {
//   SET_SCENE_ID
// } from '../../store/types';
export default {
  name: 'Scene',
  components: {
    [Header.name]: Header,
    [Field.name]: Field,
    [InputItem.name]: InputItem,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      sceneListImge: [
        { src: require('@/assets/img/huijia.png'), groupname: '回家' },
        { src: require('@/assets/img/lijia.png'), groupname: '离家' },
        { src: require('@/assets/img/zaochen.png'), groupname: '早晨' },
        { src: require('@/assets/img/yewan.png'), groupname: '夜晚' },
        { src: require('@/assets/img/chifan.png'), groupname: '吃饭' },
        { src: require('@/assets/img/youxi.png'), groupname: '游戏' },
        { src: require('@/assets/img/dianying.png'), groupname: '电影' },
        { src: require('@/assets/img/qita.png'), groupname: '其他' },
        { src: require('@/assets/img/xiuxian.png'), groupname: '休闲' }
      ],
      homeName: '',
      // fnlSceneList: []
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,
      sceneList: state => state.dataObject.sceneList,
      linkData: state => state.linkData
      // familyId: state => state.dataObject.familyId
    })
  },
  watch: {
    // sceneList: {
    //   handler(NewVal) {
    //     console.log('NewVal', NewVal);
    //     this.fnlSceneList = NewVal;
    //   },
    //   deep: true
    // }
  },
  mounted() {
    this.getCurrentHomeSceneList();
  },
  methods: {
    ...mapMutations({
      setSceneList: 'SCENE_LIST',
      setLinkData: 'SET_LINK_DATA',
      setSceneDetail: 'SET_SCENE_DETAIL'
    }),
    // 选择场景，id 有接口后才知道测试随便 传个index先
    selectScene(id, items, index, name, picture) {
      this.setSceneDetail(index);
      if (items.length === 0 || items === '[]') {
        Dialog.confirm({
          title: '提示',
          content: '设置尚未保存，是否退出',
          confirmText: '去设置',
          onConfirm: () => {
            console.log('[Dialog.confirm] confirm clicked');
            console.log('保存传过去的对象', index);
            goToEditScene(index)
              .then(res => res)
              .catch(err => err);
            // TODO:此处业务逻辑，主体接口
          },
          cancelText: '退出',
          onCancel: () => {
            console.log('[Dialog.confirm] cancel clicked');
          }
        });
      } else {
        // TODO:选择后返回上一页(可以用路由带回去)
        this.setLinkData({
          selectedScene: id,
          id: picture,
          name
        });
        this.$router.push({
          name: 'SleepScene',
          query: {
            pageIndex: 2
          }
        });
      }
    },
    goBack() {
      // this.$router.go(-1);
      this.$router.push({
        name: 'SleepScene',
        query: {
          pageIndex: 2
        }
      });
    },
    moreInfo() {
      editDevice(this.mac);
    },
    getCurrentHomeSceneList() {
      getCurrentHomeSceneList().then(res => {
        const _res = JSON.parse(res);
        console.log('场景列表数据', _res);
        this.homeName = _res[0];
        this.setSceneList(_res[1]); // 用于watch事件
        // this.fnlSceneList = _res[1];
      });
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';
@import '@/assets/scss/Scene.scss';
</style>
