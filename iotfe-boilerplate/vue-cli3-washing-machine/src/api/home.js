/*
 * @Descripttion: 
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-11-18 15:05:07
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-06-27 15:43:50
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
      this.jsonData.startFootList.forEach((item, index) => {
        const length = this.jsonData.startFootList.length;
        // 第一个是开关,任何情况下都会显示顾不处理
        if (index) {
          this.jsonData.startFootList[index].selected = this.dataObject[item.protocol] === 1; // 当前是否选中
          
          if (length <= 3) {
            this.jsonData.startFootList[index].ImgName = this.dataObject[item.protocol] === 1 ? `${item.protocol}_select` : `${item.protocol}`;
          }

          if (item.protocol === 'childLock') {
            this.jsonData.startFootList[index].isDisabled = this.devState === 2;
          } else {
            // 互斥禁用  
            if (this.dataObject.childLock && item.protocol !== 'childLock') { 
              this.jsonData.startFootList[index].isDisabled = true;
            } else {
              this.jsonData.startFootList[index].isDisabled = false;
            }
          }

          this.jsonData.startFootList[index].isShowFuncBtn = !(this.devState === 3);
        }
      });
      return this.jsonData.startFootList;
    }
  }
};

export default footConfig;
