<template>
  <gree-view>
    <gree-page
      no-navbar
      class="page-home"
    >
      <div
        class="page-header"
        :style="{backgroundImage:'url(' + head_bg + ')'}"
      >
        <gree-header
          theme="transparent"
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
        >
          {{ devname }}
          <gree-dropdown
            slot="right"
            position="is-bottom-left"
          >
            <gree-icon
              slot="trigger"
              name="more"
              size="lg"
            ></gree-icon>
            <gree-dropdown-item @click.native="moreInfo">Device Information</gree-dropdown-item>
            <gree-dropdown-item @click.native="jumpTo('Setting')">Alert Settings</gree-dropdown-item>
          </gree-dropdown>
        </gree-header>
        <div
          class="messenge" 
          @click="goUserList">
          <img :src="bodyImg" />
          <span>{{ nick_name }}</span>
          <gree-icon 
            name="arrow-down" 
            color="#FFFFFF" 
            class="arraw"
            size="lg"/>
        </div>
        <div class="fat-remind">
          <p>{{ String(weight_fnl).split('.')[0] }}
            <span v-show="String(weight_fnl).split('.').length !== 1">.{{ String(weight_fnl).split('.')[1] }}</span>
            <span>{{ unit }}</span>
          </p>
        </div>
        <div class="fat-tips">
          <gree-row>
            <gree-col
              width="30"
              v-for="(item,index) in dataList"
              :key="index"
            >
              <p>
                <span>{{ item.name }}</span>
                <span>
                  <gree-tag 
                    size="small" 
                    shape="circle"
                    type="fill" 
                    :fill-color="item.color">
                    {{ item.status }}
                  </gree-tag>
                </span>
              </p>
              <p>{{ item.value }}</p>
            </gree-col>
          </gree-row>
        </div>
      </div>
      <div class="page-main">
        <gree-block>
          <gree-tab-bar 
            v-model="currentIndex" 
            :items="itemsTab" 
            @change="onTabBarChange"></gree-tab-bar>
        </gree-block>
        <Data-Datil 
          @changeData="getWeightDatas" 
          v-if="currentIndex === 1"/>
        <Historical-Data v-if="currentIndex === 2"/>
        <Data-Trends v-if="currentIndex === 3"/>
      </div>
      <div 
        class="page-bottom"
        @click="addSelect">
        <img 
          src="@/assets/images/add.png" 
          alt="">
      </div>
      <gree-popup 
        v-model="isPopupShow.bottom"
        position="bottom">
        <div 
          class="popup-bottom" 
          v-if="Popstatus">
          <div 
            class="arrow-down" 
            @click="hidePopUp('bottom')"></div>
          <div class="popop-content">
            <div class="popop-lis">
              <div 
                class="popop-li" 
                ref="selectUser"
                @click="userChange(index)"
                v-for="(item,index) in userList" 
                :key="index">
                <div>
                  <img
                    src="@/assets/images/headportrait.png" 
                    alt="">
                  <span>{{ item.nick_name }}</span>
                </div>
                <span @click.stop="editpersion(item)">Edit</span>
              </div>
            </div>
            <div 
              class="popop-adduser"
              @click="addUser">
              <img 
                src="@/assets/images/add.png" 
                alt="">
            </div>
          </div>
        </div>
      </gree-popup>
    </gree-page>
    <!-- <div 
      class="loading" 
      v-show="ifShowLoading">
      <img 
        src="../../assets/images/loading.gif" 
        alt="">
    </div> -->
  </gree-view>
</template>

<script>
import {
  Header,
  Icon,
  Dropdown,
  DropdownItem,
  NoticeBar,
  Col,
  Row,
  Block,
  TabBar,
  Tag,
  Popup,
  DropdownMenu,
  DropdownMenuItem,
  Toast
} from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import DataDatil from '../../components/DataDatil';
import HistoricalData from '../../components/HistoricalData';
import DataTrends from '../../components/DataTrends';
import {
  closePage,
  editDevice
} from '../../../../static/lib/PluginInterface.promise';
import homeConfig from '../../mixins/config/70303/home';

export default {
  components: {
    [Header.name]: Header,
    [Icon.name]: Icon,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [NoticeBar.name]: NoticeBar,
    [Col.name]: Col,
    [Row.name]: Row,
    [Block.name]: Block,
    [TabBar.name]: TabBar,
    [Tag.name]: Tag,
    [Popup.name]: Popup,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownMenuItem.name]: DropdownMenuItem,
    [Toast.component.name]: Toast.component,
    DataDatil,
    HistoricalData,
    DataTrends
  },
  mixins: [homeConfig],
  data() {
    return {
      currentIndex: 1,
      isWarningShow: false,
      bodyImg: require('@/assets/images/headportrait.png'),
      Arrow: require('@/assets/images/dropdown.png'),
      Scores: require('@/assets/images/score.png'),
      lists: [],
      isFinished: false,
      isPopupShow: {},
      Popstatus: false,
      // navigation: 'zhangsan',
      ifShowLoading: true
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devname: state => state.deviceInfo.name,
      functype: state => state.functype,
      mac: state => state.mac,
      isScene: state => state.isScene,
      userList: state => state.userList,
      nick_name: state => state.dataObject.nick_name,
      sex: state => state.dataObject.sex,
      birthday: state => state.dataObject.birthday,
      height: state => state.dataObject.height,
      weight: state => state.useerMessage.weight,
      age: state => state.dataObject.age,
      user_id: state => state.dataObject.user_id,
      unit: state => state.dataObject.unit
    }),
    head_bg() {
      const bg = require('@/assets/images/bg_header.png');
      return bg;
    },
    weight_fnl() {
      let value = this.weight;
      if (value === '--') return '--';
      switch (this.unit) {
        case 'kg':
          value = this.weight.toFixed(1);
          break;
        case 'lb':
          value = (this.weight * 2.20462262185).toFixed(2);
          break;
        case 'st':
          value = (this.weight * 0.157473044418).toFixed(2);
          break;
        default:
          break;
      }
      return value;
    }
  },
  mounted() {
    // 这块逻辑处理的不好,暂时先折中
    const getData = async () => {
      await this.getUserList();
      await this.getWeightDatas();
    };
    getData();
  },
  methods: {
    ...mapActions({
      getUserMessage: 'GET_USER_MESSAGE',
      setUserSave: 'SET_USER_SAVE',
      getUserList: 'GET_USER_LIST'
    }),
    ...mapMutations({
      userInfo: 'USER_INFO',
      editUserInfo: 'EDIT_USER_INFO'
    }),
    /**
     * @description 返回键
     */
    goBack() {
      closePage();
    },
    /**
     * @description 编辑设备名称
     */
    moreInfo() {
      editDevice(this.mac);
    },
    jumpTo(path) {
      this.$router.push(path);
    },
    onTabBarChange(item, index, prevIndex) {
      this.currentIndex = item.name;
      console.log(this.currentIndex);
      console.log(
        `currentIndex: ${index}, prevIndex: ${prevIndex}, label: ${item.label}`
      );
    },
    addSelect() {
      this.$router.push({ path: 'AddUser' });
    },
    showPopUp(type) {
      this.$set(this.isPopupShow, type, true);
    },
    hidePopUp(type) {
      this.$set(this.isPopupShow, type, false);
    },
    editpersion(item) {
      this.editUserInfo(item);
      this.$router.push({ name: 'EditPersionsal' });
    },
    addUser() {
      this.$router.push({ name: 'AddUser' });
    },
    async getWeightDatas() {
      console.log('user_id', this.user_id);
      // 获取单位
      const obj = {
        key: `WeightUnit${this.mac}`,
        value: '',
        status: false
      };
      await this.setUserSave(obj).then(res => {
        const unit = JSON.parse(res).value ? JSON.parse(res).value : 'kg';
        this.userInfo({ unit });
      });
      await this.getUserMessage(this.user_id).then(res => {
        this.ifShowLoading = false;
        JSON.parse(res).code !== 200
          ? Toast.failed(JSON.parse(res).msg, 1500, true, true)
          : '';
      });
    },
    userChange(id) {
      console.log('this.userList[index]', this.userList[id]);
      this.userInfo(this.userList[id]);
      const obj = {
        key: 'user',
        value: this.userList[id],
        status: true
      };
      this.Popstatus = false;
      this.hidePopUp('bottom');
      this.setUserSave(obj);
      this.getWeightDatas();
    },
    goUserList() {
      this.showPopUp('bottom');
      this.Popstatus = true;
    }
  }
};
</script>
