/**
 * @description 逻辑互斥列表
 */
/* eslint-disable */
const logicConfig = {
  data() {
    return {
      // 'name' : [[字段], [值], [是否只在该值时点亮图标]]
      AdvFunc: {
        'Health' : [['Health'], [1], ['All']],
        '' : [['AppTimer'], [1], ['All']]
      },
      // 'name' : [字段, 值]
      ModFunc: {
        'Cont'     : ['Mod', 0],
        0 : 'Cont'
      },
      // 'name' : [[字段, 字段的值, 优先度, 滑轮的位置]],[互斥时执行的字段1, 互斥时执行的字段的值1],[互斥时执行的字段2, 互斥时执行的字段的值2]...
      WdSpdFunc: {
        'Low' : [['WdSpd', 0, 1, 0]],
        'High' : [['WdSpd', 1, 1, 1]],
        0 : 'Low',
        1 : 'High'
      },
      // 风档与模式之间的逻辑互斥关系表
      WdSpdtoMod: [ [  '-'   ,  'Low',  'High' ],
                    ['Cont'  ,   true,   true  ]]
    };
  },
};

export default logicConfig;
