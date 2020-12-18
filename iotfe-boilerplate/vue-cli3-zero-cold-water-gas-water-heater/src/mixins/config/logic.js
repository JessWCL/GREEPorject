/**
 * @description 逻辑互斥列表
 */
/* eslint-disable */
const logicConfig = {
  data() {
    return {
      // 风速[ 1-12 ]
      WdSpdFunc: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      WarmWdSpdFunc: [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
      // 'name' : [[字段], [值], [是否只在该值时点亮图标]]
      AdvFunc: {
        'windLevel' : [['WdSpd'], [1], ['All']],
        'UDFanPort' : [['SwUpDn'], [1], ['All']]
      },
      // 'name' : [字段, 值]
      ModFunc: {
        'Normal' : ['Mod', 0],
        'Sleep' : ['Mod', 2],
        'Warm' : ['Mod', 5],
        0 : 'Normal',
        2 : 'Sleep',
        5 : 'Warm'
      },
      // 模式与高级功能之间的逻辑互斥关系表
      ModtoAdv: [ [    '-'     , 'windLevel', 'SwingLfRig', 'UDFanPort', 'Timing', 'Order'],
                  ['Pow'       ,    false   ,    false    ,    false   ,   false ,  true ],
                  ['Normal'    ,    true    ,    true     ,    true    ,   true  ,  false],
                  ['Sleep'     ,    true    ,    true     ,    true    ,   true  ,  false],
                  ['Warm'      ,    false   ,    true     ,    true    ,   true  ,  false]],
      // 高级功能与高级功能之间的逻辑互斥关系表
      AdvtoAdv: [],
    };
  },
};

export default logicConfig;
