/*
 * @Descripttion: washmode 值对应的 名字 && 图片
 * @version: 1.1
 * @Author: ZM_lee└(^o^)┘
 * @Date: 2019-12-19 13:59:22
 * @LastEditors: ZM_lee└(^o^)┘
 * @LastEditTime: 2020-05-27 11:27:07
 */

const mid = process.env.VUE_APP_MID;

/**
 * @description: 洗涤类型对应的名字
 */ 
export const washTypeName = {
  0: '洗涤',
  1: '专业烘干',
  2: '洗烘',
  3: '蒸汽护理',
};

/**
 * @description: 配置参数的单位
 */ 
export const washUnit = {
  setWashTime: '分',
  washTemp: '℃',
  potch: '次',
  speed: '转',
  dry: '分'
};

/**
 * @description: 配置参数的描述
 */ 
export const washConfigDescribe = {  
  0: {
    setWashTime: '洗涤',
    washTemp: '温度',
    potch: '漂洗',
    speed: '转速',
    smudge: '脏污度',
    dry: '烘干'
  },
  1: {
    speed: '转速',
    dry: '烘干'
  },
  2: {
    setWashTime: '洗涤',
    washTemp: '温度',
    potch: '漂洗',
    speed: '转速',
    dry: '烘干'
  },
  3: {
    setWashTime: '护理时间',
    dry: '蒸汽'
  }
};


/**
 * @description: 洗涤模式对应的名字
 */ 
export const washmodeName = {
  0: '棉麻',
  1: '棉麻',
  2: '混合',
  3: '快洗',
  4: '衬衫',
  5: '大物',
  6: '单脱水',
  7: mid === '28a01' ? '漂洗脱水' : '漂+脱',
  8: '筒清洁',
  9: '运动服',
  10: '羊毛',
  11: mid === '28a04' || mid === '28a05' ? '羽绒' : '羽绒服',
  12: '丝绸',
  13: '婴儿服',
  14: '内衣',
  15: '化纤',
  16: mid === '28a04' || mid === '28a05' ? '牛仔洗' : '牛仔',
  17: '快烘',
  18: '毛绒玩具',
  19: '快速洗烘',
  20: '漂洗烘干',
  21: '换季洗',
  22: '弱烘干',
  23: '强烘干',
  24: '轻柔',
  25: '节能',
  26: '除菌洗',
  27: '速洗',
  28: '省心洗',
  29: '除螨',
  30: '极净洗',
  31: '童装',
  32: '水幕清新',
  33: '一键智洗'
};


/**
 * @description: 热泵用 洗涤模式对应的背景图
 */ 
export const washmodeImg = {
  0: require('../assets/img/bg/cottonlinen.png'), // 主控问题
  1: require('../assets/img/bg/cottonlinen.png'),
  2: require('../assets/img/bg/blend.png'),
  3: require('../assets/img/bg/quickWash.png'),
  4: require('../assets/img/bg/shirt.png'),
  5: require('../assets/img/bg/bigThings.png'),
  6: require('../assets/img/bg/dehydration.png'),
  7: require('../assets/img/bg/rinseADehydration.png'),
  8: require('../assets/img/bg/selfCleaning.png'),
  9: require('../assets/img/bg/athleticWear.png'),
  10: require('../assets/img/bg/wool.png'),
  11: require('../assets/img/bg/downJackets.png'),
  12: require('../assets/img/bg/silk.png'),
  13: require('../assets/img/bg/babyClothes.png'),
  14: require('../assets/img/bg/underwear.png'),
  15: require('../assets/img/bg/chemicalFiber.png'),
  16: require('../assets/img/bg/cowboy.png'),
  17: require('../assets/img/bg/quickDrying.png'),
  19: require('../assets/img/bg/quickWashADrying.png'),
  20: require('../assets/img/bg/rinsingADrying.png'),
  21: require('../assets/img/bg/replacementWashing.png'),
  27: require('../assets/img/bg/quickWash.png'),
  28: require('../assets/img/bg/quickWash.png'),
};

// 收藏夹图片
export const favoritesImg = {
  0: require('../assets/img/favorites/cottonlinen.png'), // 主控问题
  1: require('../assets/img/favorites/cottonlinen.png'),
  2: require('../assets/img/favorites/blend.png'),
  3: require('../assets/img/favorites/quickWash.png'),
  4: require('../assets/img/favorites/shirt.png'),
  5: require('../assets/img/favorites/bigThings.png'),
  6: require('../assets/img/favorites/dehydration.png'),
  7: require('../assets/img/favorites/rinseADehydration.png'),
  8: require('../assets/img/favorites/selfCleaning.png'),
  9: require('../assets/img/favorites/athleticWear.png'),
  10: require('../assets/img/favorites/wool.png'),
  11: require('../assets/img/favorites/downJackets.png'),
  12: require('../assets/img/favorites/silk.png'),
  13: require('../assets/img/favorites/babyClothes.png'),
  14: require('../assets/img/favorites/underwear.png'),
  15: require('../assets/img/favorites/chemicalFiber.png'),
  16: require('../assets/img/favorites/cowboy.png'),
  17: require('../assets/img/favorites/quickDrying.png'),
  19: require('../assets/img/favorites/quickWashADrying.png'),
  20: require('../assets/img/favorites/rinsingADrying.png'),
  21: require('../assets/img/favorites/replacementWashing.png'),
  27: require('../assets/img/favorites/quickWash.png'), 
  28: require('../assets/img/favorites/quickWash.png'),
};
/**
 * @description: 纤净用 洗涤模式对应的背景图  与模式字段一一对应
 */ 
// export const washmodeImg2 = {
//   1: require('../assets/img/bg2/mian-ma.png'),
//   2: require('../assets/img/bg2/hun-he.png'),
//   3: require('../assets/img/bg2/kuai-xi.png'),
//   4: require('../assets/img/bg2/chen-shan.png'),
//   5: require('../assets/img/bg2/da-wu.png'),
//   6: require('../assets/img/bg2/dan-tuo-shui.png'),
//   7: require('../assets/img/bg2/piao-xi-tuo-shui.png'),
//   8: require('../assets/img/bg2/tong-qing-jie.png'),
//   9: require('../assets/img/bg2/yun-dong-fu.png'),
//   10: require('../assets/img/bg2/yang-mao.png'),
//   11: require('../assets/img/bg2/yu-rong-fu.png'),
//   16: require('../assets/img/bg2/niu-zai.png'),
//   22: require('../assets/img/bg2/ruo-hong-gan.png'),
//   23: require('../assets/img/bg2/qiang-hong-gan.png'),
//   24: require('../assets/img/bg2/qing-rou.png'),
//   29: require('../assets/img/bg2/chu-man.png'),
//   30: require('../assets/img/bg2/ji-jing-xi.png'),
//   31: require('../assets/img/bg2/tong-zhuang.png'),
//   32: require('../assets/img/bg2/shui-mu-qing-xin.png'),
//   33: require('../assets/img/bg2/yi-jian-zhi-xi.png'),
// };

