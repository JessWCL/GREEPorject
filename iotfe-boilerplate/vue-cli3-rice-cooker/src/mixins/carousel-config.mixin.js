/**
 * @constant {object} carouselConfig
 * @description 主页面和定时页面的滑轮配置
 */
const carouselConfig = {
  data() {
    return {
      carouselOptions: {
        isShow: true, // 是否显示
        controlAble: true, // 滑轮能不能滑动
        showNumOrImg: false, // 显示数字还是图片
        horizontal: true, // 水平显示or竖直显示
        controlMode: 1,
        threeOrAll: true, // 显示3个or全部显示
        width: '60%', // 组件宽度
        spaceBetween: '3rem', // 间距
        marginLeft: '0', // 组件左边距
        height: '1rem', // 图片大小
        fontSize: '32px',
      },
    };
  },
};

export default carouselConfig;
