/**
 * @description 滑轮配置列表
 */

const CarouselConfig = {
  data() {
    return {
      modeImgs: [
        require('@/assets/img/828213/mode/normal.png'), // 普通风
        require('@/assets/img/828213/mode/natural.png'), // 自然风
        require('@/assets/img/828213/mode/sleeping.png'), // 睡眠风
        require('@/assets/img/828213/mode/mute.png'), // 静音风
      ],
      modeOptions: {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: false, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: true, // 显示3个or全部显示
        width: '100%', // 组件宽度
        spaceBetween: '2rem', // 间距
        marginLeft: '0rem', // 组件左边距
        height: '1rem', // 图片大小
        fontSize: '2.9rem',
        radiusMutiply: 0.7, // 半径系数
        flat: false
      },
      speedData: [1, 2, 3, 4, 5],
      speedOptions: {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: true, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: false, // 显示3个or全部显示
        width: '100%', // 组件宽度
        spaceBetween: '4rem', // 间距
        marginLeft: '0rem', // 组件左边距
        height: '3.9rem', // 图片大小
        fontSize: '3.5rem',
        radiusMutiply: 0.7, // 半径系数
        flat: true // 平面不透视
      },
    };
  },
};

export const ModeNameList = ['普通风', '自然风', '睡眠风', '静音风'];
export default CarouselConfig;
