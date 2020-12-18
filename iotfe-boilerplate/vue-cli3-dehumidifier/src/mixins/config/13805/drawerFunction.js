/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-30 15:22:21
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2019-12-13 00:44:36
 * @Description:这是高级功能的配置表，所有高级功能在这里配置即可
 */

/**
 * @description: 这是高级功能的配置表，所有高级功能在这里配置即可
 */
import { mapState } from 'vuex';
const drawerFunctionConfig = {
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      DwatFul: state => state.dataObject.DwatFul,
    }),
    functionList() {
      return [
        {
          index: 1,
          gray: this.DwatFul ? true : false,
          key: 'SwUpDn',
          name: 'advance.sweep',
          ImgUrl: this.dataObject.SwUpDn ? require('@/assets/img/13805/sweep_on.png') : require('@/assets/img/13805/sweep_off.png'),
          moreBtn: false
        },
        {
          index: 2,
          gray: (this.DwatFul || this.dataObject.Dmod === 9) ? true : false, // 单净化模式下整机离子会强制打开，APP不可控制
          key: 'Health',
          name: 'advance.anion',
          ImgUrl: this.dataObject.Health ? require('@/assets/img/13805/anion_on.png') : require('@/assets/img/13805/anion_off.png'),
          moreBtn: false
        },
        {
          index: 3,
          gray: false,
          key: 'ChildLock',
          name: 'advance.childLock',
          ImgUrl: this.dataObject.ChildLock ? require('@/assets/img/13805/childlock_on.png') : require('@/assets/img/13805/childlock_off.png'),
          moreBtn: false
        },
        {
          index: 4,
          gray: this.DwatFul ? true : false,
          key: 'Quiet',
          name: 'advance.quiet',
          ImgUrl: this.dataObject.Quiet ? require('@/assets/img/13805/mute_on.png') : require('@/assets/img/13805/mute_off.png'),
          moreBtn: false
        },
        {
          index: 5,
          gray: this.DwatFul ? true : false,
          key: 'Lig',
          name: 'advance.light',
          ImgUrl: this.dataObject.Lig ? require('@/assets/img/13805/light_on.png') : require('@/assets/img/13805/light_off.png'),
          moreBtn: false
        }
      ]
    }
  },
};

export default drawerFunctionConfig;
