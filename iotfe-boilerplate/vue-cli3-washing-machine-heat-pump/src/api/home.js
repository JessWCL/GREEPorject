/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:07
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-04-30 19:01:48
 */
/**
 * @constant {object} footConfig
 * @description 配置列表
 */
import {
  mapState
} from 'vuex';
import { orderList, startFootList } from '../api/index';

const footConfig = {
  data() {
    return {
      jsonData: {}
    };
  },
  created() {
    this.jsonData.orderList = orderList;
    this.jsonData.startFootList = startFootList;
  },
  computed: {
    ...mapState({
      Pow: state => state.dataObject.Pow,
      devState: state => state.dataObject.devState,
      dataObject: state => state.dataObject,
      showData: state => state.showData,
    }),
    
    footList() {
      return [{
        index: 0,
        isShowFuncBtn: true,
        isDisabled: this.$store.state.showData.isCloseing,
        name: 'home.power',
        ImgName: 'btn_off',
        iconName: 'power',
      },
      {
        index: 1,
        isShowFuncBtn: this.$store.state.dataObject.Pow,
        isDisabled: !this.$store.state.dataObject.Pow,
        name: 'home.senior',
        ImgName: 'icon_senior',
        iconName: 'menu',
      },
      {
        index: 2,
        isShowFuncBtn: this.$store.state.dataObject.Pow,
        isDisabled: !this.$store.state.dataObject.Pow,
        name: 'home.pattern',
        ImgName: 'icon_mode',
        iconName: 'menu',
      }
      ];
    },

    /**
     * @description 预约时的功能功能列表,童锁开启时不可用
     */
    orderList() {
      this.jsonData.orderList.forEach((item, index) => {
        const protocol = item.protocol;
        this.jsonData.orderList[index].ImgName = this.dataObject[protocol] ? `${protocol}_select` : `${protocol}`;
        if (protocol !== 'childLock') {
          this.jsonData.orderList[index].isDisabled = Boolean(this.dataObject.childLock); 
        }
      });
      return this.jsonData.orderList;
    },

    /**
     * @description 启用页的高级功能
     */
    startFootList() {
      return [{
        index: 0,
        isShowFuncBtn: true,
        isDisabled: this.$store.state.showData.isCloseing,
        name: 'home.power',
        ImgName: this.$store.state.dataObject.Pow ? 'btn_off' : 'btn_on',
        iconName: 'power',
      },
      {
        index: 1,
        isShowFuncBtn: process.env.VUE_APP_MID !== '28a01' && this.devState !== 3 && this.$store.state.dataObject.Pow,
        isDisabled: this.$store.state.dataObject.childLock,
        name: 'setUp.jingyin',
        ImgName: this.$store.state.dataObject.mute ? 'mute_select' : 'mute',
        iconName: 'mute',
      },
      {
        index: 2,
        isShowFuncBtn: process.env.VUE_APP_MID !== '28a01' && this.devState !== 3 && this.$store.state.dataObject.Pow,
        isDisabled: this.$store.state.dataObject.devState === 2,
        name: 'setUp.childLock',
        ImgName: this.$store.state.dataObject.childLock ? 'childLock_select' : 'childLock',
        iconName: 'childLock',
      },
      ];
    }
  }
};

export default footConfig;
