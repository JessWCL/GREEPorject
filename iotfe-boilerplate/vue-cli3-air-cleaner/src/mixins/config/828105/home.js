/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-11 16:43:42
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-03-19 14:41:00
 * @Description: 首页底部功能的配置表
 */
/**
 * @description Home配置列表
 */
import homeData from '@/api/828105/home';
import {
  mapState
} from 'vuex';

const homeConfig = {
  data() {
    return {
      JsonData: {}
    };
  },
  created() {
    this.JsonData = homeData[0];
  },
  computed: {
    ...mapState({
      Pow: state => state.dataObject.Pow,
      AirChildLock: state => state.dataObject.AirChildLock,
      TmrOn: state => state.dataObject.TmrOn,
      TmrOff: state => state.dataObject.TmrOff,
      light: state => state.dataObject.light,
      isError: state => state.isError,
      isScene: state => state.isScene,
      sterilize: state => Number(state.dataObject.sterilize)
    }),    
    FootList() {
      // this.JsonData.FootList[1].isHidden = Boolean(this.isError || this.isScene);
      // return this.JsonData.FootList;
      return [{
          url: this.Pow ? 'pow-on' : 'pow-off',
          name: '开关',
          isHiddenInScence: false,
          hasMore: false,
        },
        {
          url: this.Pow ? 'fliter-off' : 'fliter-unable',
          name: '滤网',
          isHiddenInScence: true,
          hasMore: true,
        },
        {
          url: this.Pow ? (this.light ? 'light-on' : 'light-off') : 'light-unable',
          name: '灯光',
          isHiddenInScence: false,
          hasMore: false,
        },
      ]
    },
    
    modeOptions() {
      this.JsonData.modeOptions.controlAble = !this.isError;
      return this.JsonData.modeOptions;
    },

    pm25statusObj() {
      return this.JsonData.pm25statusObj;
    },

    DeviceStatusIcon() {
      this.JsonData.DeviceStatusIcon.forEach((item, index) => {
        switch (index) {
          case 0:
            this.JsonData.DeviceStatusIcon[index].isHidden = !this.sterilize;
            break;
          case 1:
            this.JsonData.DeviceStatusIcon[index].isHidden = !this.light;
            break; 
          default:
            break;
        }
      });
      return this.JsonData.DeviceStatusIcon;   
    },

    FootFuncList() {
      if (!this.isScene) {
        if (this.Pow) {
          this.JsonData.FootFuncList.forEach((item, index) => {
            let status = 'close';
            switch (index) {
              // case 0:
              //   this.JsonData.FootFuncList[0].gray = false;
              //   break;
              case 1:
                status = this.light ? 'open' : 'close';
                break;
              case 2:
                status = this.AirChildLock ? 'open' : 'close';
                break;
              case 3:
                status = (!this.Pow && this.TmrOn) || (this.Pow && this.TmrOff) ? 'open' : 'close';
                break;        
              default:
                break;
            }
            this.JsonData.FootFuncList[index].ImgUrl = require(`../../../assets/img/funList/${item.ImgName}-${status}.png`);
          });
          return this.JsonData.FootFuncList;
        } 
        
        this.JsonData.FootFuncList2.forEach((item, index) => {
          let status = 'close';
          switch (index) {
            case 0:
              status = (!this.Pow && this.TmrOn) || (this.Pow && this.TmrOff) ? 'open' : 'close';
              break;
            default:
              break;
          }
          this.JsonData.FootFuncList2[index].ImgUrl = require(`../../../assets/img/funList/${item.ImgName}-${status}.png`);
        });
        return this.JsonData.FootFuncList2;
      }
      this.JsonData.FootFuncList3.forEach((item, index) => {
        let status = 'close';
        switch (index) {
          case 0:
            status = this.light ? 'open' : 'close';
            break;
          case 1:
            status = this.AirChildLock ? 'open' : 'close';
            break;
          default:
            break;
        }
        this.JsonData.FootFuncList3[index].ImgUrl = require(`../../../assets/img/funList/${item.ImgName}-${status}.png`);
      });
      return this.JsonData.FootFuncList3;
    }
  }
};

export default homeConfig;
