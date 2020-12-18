/*
 * @Author: Jerry-Rain
 * @Date: 2019-09-11 16:43:42
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-02-22 14:24:15
 * @Description: 首页底部功能的配置表
 */
/**
 * @description Home配置列表
 */

const homeConfig = {
  data() {
    return {
      musicImgList: [
        { src: require('@/assets/img/jiguang.png'), name: '极光' },
        { src: require('@/assets/img/xingchen.png'), name: '星辰' },
        { src: require('@/assets/img/xiaoxi.png'), name: '小溪' },
        { src: require('@/assets/img/dongri.png'), name: '冬日' },
        { src: require('@/assets/img/chaoxi.png'), name: '潮汐' },
        { src: require('@/assets/img/liangchen.png'), name: '良辰' },
        { src: require('@/assets/img/guangyin.png'), name: '光阴' },
        { src: require('@/assets/img/yequ.png'), name: '夜曲' },
        { src: require('@/assets/img/xianwu.png'), name: '仙雾' },
      ],
      musicImg: [
        {
          src: [
            require('@/assets/img/music/jiguang.png'),
            require('@/assets/img/music/xinchen.png'),
            require('@/assets/img/music/xiliu.png'),
            require('@/assets/img/music/dongri.png'),
            require('@/assets/img/music/chaoxi.png'),
            require('@/assets/img/music/liangchen.png'),
            require('@/assets/img/music/guangyin.png'),
            require('@/assets/img/music/yequ.png'),
            require('@/assets/img/music/xianwu.png'),
          ],
        },
        {
          src: [
            require('@/assets/img/music/musicPlay.png'),
            require('@/assets/img/music/musicStop.png'),
          ],
        },
        require('@/assets/img/music/musicClose.png'),
      ],
      buyUrl:
        'https://fmall.gree.com/mobile/index.html#/detail?id=1000025966&skid=1000042823&distributionId=72312132&distributionItemId=444&distributionShopId=2000002215',
      setting: 'http://helpgrih.gree.com/GreePlusHelpZh/v3.0',
      moreCourseUrl: 'http://www.heartide.com/vendor/gree',
      sceneList: [
        { src: require('@/assets/img/huijia.png'), name: '回家' },
        { src: require('@/assets/img/lijia.png'), name: '离家' },
        { src: require('@/assets/img/zaochen.png'), name: '早晨' },
        { src: require('@/assets/img/yewan.png'), name: '夜晚' },
        { src: require('@/assets/img/chifan.png'), name: '吃饭' },
        { src: require('@/assets/img/youxi.png'), name: '游戏' },
        { src: require('@/assets/img/dianying.png'), name: '电影' },
        { src: require('@/assets/img/qita.png'), name: '其他' },
        { src: require('@/assets/img/xiuxian.png'), name: '休闲' },
      ],
    };
  },
};

export default homeConfig;
