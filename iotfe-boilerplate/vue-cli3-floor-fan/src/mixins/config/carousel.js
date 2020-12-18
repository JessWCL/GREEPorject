/**
 * @description 滑轮配置列表
 */
const WindSpeedRange = [];
const WindSpeedMax = 22;
for (let index = 1; index <= WindSpeedMax; index++) {
  WindSpeedRange.push(index);
}
const CarouselConfig = {
  data() {
    return {
      modeImgs: [
        require('@/assets/img/mode/normal.png'), // 普通风
        require('@/assets/img/mode/natural.png'), // 自然风
        require('@/assets/img/mode/sleeping.png'), // 睡眠风
        require('@/assets/img/mode/smart.png'), // 智能风
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
      speedData: WindSpeedRange,
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
        radiusMutiply: 0.6, // 半径系数
        flat: true // 平面不透视
      },
      naturalWindSpeedData: [1, 2, 3, 4],
      naturalWindSpeedCarouselOptions: {
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
        radiusMutiply: 0.6, // 半径系数
        flat: true // 平面不透视
      }
    };
  },
};

export const ModeNameList = ['普通风', '自然风', '睡眠风', '智能风'];
export default CarouselConfig;
