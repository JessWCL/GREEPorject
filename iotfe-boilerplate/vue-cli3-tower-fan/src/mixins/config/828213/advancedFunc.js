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
      Pow: state => state.dataObject.Pow,
      Anion: state => state.dataObject.Anion,
      TmrOn: state => state.dataObject.TmrOn,
    }),
    functionList() {
      return [
        {
          index: 0,
          gray: !this.Pow,
          name: '负离子',
          ImgUrl: this.Pow && this.Anion ? require('@/assets/img/functionBtn/func_anion_on.png') : require('@/assets/img/functionBtn/func_anion_off.png'),
          moreBtn: false,
          showMiniIcon: this.Pow && this.Anion,
          miniIconUrl: require('@/assets/img/mini/anion_ic.png'),
        },
        {
          index: 1,
          gray: false,
          name: '定时',
          ImgUrl: this.TmrOn ? require('@/assets/img/functionBtn/func_timer_on.png') : require('@/assets/img/functionBtn/func_timer_off.png'),
          moreBtn: true,
          showMiniIcon: this.TmrOn,
          miniIconUrl: require('@/assets/img/mini/timer_ic.png'),
        },
      ];
    }
  },
};

export default drawerFunctionConfig;
