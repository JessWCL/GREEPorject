/*
 * @Author: Jerry-Rain
 * @Date: 2019-12-24 10:42:43
 * @LastEditors  : Jerry-Rain
 * @LastEditTime : 2019-12-26 10:52:48
 * @Description: 
 */
/**
 * @constant {object} modConfig
 * @description 风扇配置列表
 */
import { mapState } from 'vuex';

const modConfig = {
  data() {
    return {
      angleAll: [
        '平躺模式', 
        '睡眠模式',
        '休闲模式',
        '阅读模式',
        '减压模式',
        '止鼾模式',
      ],
      cycleData: [
        require('@/assets/img/lay.png'), // 自动
        require('@/assets/img/sleep.png'), // 自动
        require('@/assets/img/relax.png'), // 自动
        require('@/assets/img/read.png'), // 自动
        require('@/assets/img/reducePress.png'), // 自动
        require('@/assets/img/stopVoice.png'), // 自动
      ],
      rotateOptions: {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: false, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: true, // 显示3个or全部显示
        width: '150%', // 组件宽度
        spaceBetween: '800px', // 间距
        marginLeft: '0', // 组件左边距
        height: '100px', // 图片大小
        fontSize: '32px',
        radiusMutiply: 1, // 半径系数
      },
      modData: [0,1,2,3,4,5],
    };
  },
  computed: {
    // ...mapState({
    // }),
    // windOptions() {
    //   let pos = 0;
    //   if (this.SetTem >= 20 && this.SetTem !== 21) {
    //     pos = this.Add05 ? '-1.1rem' : '-.5rem';
    //   } else {
    //     pos = this.Add05 ? '-.8rem' : '-.25rem';
    //   }
    //   return {
    //     isShow: true, // 是否显示
    //     controlAble: true, // 滑轮能不能滑动
    //     showNumOrImg: true, // 显示数字还是图片
    //     horizontal: true, // 水平显示or竖直显示
    //     controlMode: 1,
    //     threeOrAll: false, // 显示3个or全部显示
    //     width: '100%', // 组件宽度
    //     spaceBetween: '6rem', // 间距
    //     marginLeft: '-0.75rem', // 组件左边距
    //     height: '3.9rem', // 图片大小
    //     fontSize: '2.9rem',
    //     radiusMutiply: 1.5, // 半径系数
    //   };
    // },
  },
};

export default modConfig;
