/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-11 16:43:42
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2019-09-30 15:36:30
 * @Description: 首页底部功能的配置表
 */
/**
 * @description Home配置列表
 */
import { mapState } from 'vuex';
const homeConfig = {
  computed: {
    ...mapState({
      functype: state => state.functype,
      Pow: state => state.dataObject.Pow,
      AppTimer: state => state.dataObject.AppTimer,
      DwatFul: state => state.dataObject.DwatFul,
    }),
    fanNameList() {
      // return ['windSpeed.auto', 'windSpeed.low', 'windSpeed.middle', 'windSpeed.high'];
      return {
        0: 'windSpeed.auto',
        1: 'windSpeed.low',
        3: 'windSpeed.middle',
        5: 'windSpeed.high'
      };
    }, 
    functionList() {
      return [
        {
          url: this.Pow ? 
            require('../../../assets/img/functionBtn/pow_on.png') 
            : require('../../../assets/img/functionBtn/pow_off.png'),
          name: 'btn.advance_pow',
          visible: true
        },
        {
          url: this.AppTimer ?  
            require('../../../assets/img/13805/btn_time_on.png')
            : require('../../../assets/img/13805/btn_time_off.png'),
          name: 'btn.advance_timer1',
          visible: !(this.functype || this.DwatFul)
        },
        {
          url: require('../../../assets/img/function.png'),
          name: 'btn.advance_func',
          visible: this.Pow ? true : false
          // visible: this.DwatFul ? false : (this.Pow ? true : false)
        },   
      ];
    }
  }
};

export default homeConfig;
