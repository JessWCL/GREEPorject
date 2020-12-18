/**
 * @description 逻辑互斥列表
 */
/* eslint-disable */
const logicConfig = {
  data() {
    return {
      // 'name' : [[字段], [值], [是否只在该值时点亮图标]]
      AdvFunc: {
        'SwingLfRig' : [['SwingLfRig'], [1], ['All']],
        'SwUpDn' : [['SwUpDn'], [1], ['All']],
        'UDFanPort' : [['UDFanPort'], [3], ['All']],
        'Lig' : [['Lig'], [1], ['All']],
        'SlpMod' : [['SwhSlp', 'SlpMod'], [1, 1], ['All']],
        'StHt' : [['StHt'], [1], ['All']],
        'VocCtl' : [['VocCtl'],[1], ['All']],
        'AssHt' : [['AssHt'],[1],['All']],
        '' : [['AppTimer'], [1], ['All']]
      },
      // 'name' : [字段, 值]
      ModFunc: {
        'Auto' : ['Mod', 0],
        'Cool' : ['Mod', 1],
        'Heat' : ['Mod', 1],
        'Fan'  : ['Mod', 3],
        'Dry'  : ['Mod', 2],
        0 : 'Auto',
        1 : 'Cool',
        2 : 'Dry',
        3 : 'Fan',
        4 : 'Heat'
      },
      // 'name' : [[字段, 字段的值, 优先度, 滑轮的位置]],[互斥时执行的字段1, 互斥时执行的字段的值1],[互斥时执行的字段2, 互斥时执行的字段的值2]...
      WdSpdFunc: {
        'Auto' : [['WdSpd', 0, 1, 0]],
        'Low' :  [['WdSpd', 1, 1, 1]],
        'Medium-Low' : [['WdSpd', 2, 1, 2]],
        'Medium'  : [['WdSpd', 3, 1, 3]],
        'Medium-High'  : [['WdSpd', 4, 1, 4]],
        'High' : [['WdSpd', 5, 1, 5]],
        'Turbo'  : [['Tur', 1, 2, 6], ['Tur', 0], ['WdSpd', 5]],
        'Quiet'  : [['Quiet', 2, 2, 7], ['Quiet', 0], ['WdSpd', 1]],
        0 : 'Auto',
        1 : 'Low',
        2 : 'Medium-Low',
        3 : 'Medium',
        4 : 'Medium-High',
        5 : 'High',
        6 : 'Turbo',
        7 : 'Quiet'
      },
      // 高级功能与高级功能之间的逻辑互斥关系表
      AdvtoAdv: [ [    '-'     , 'SwingLfRig', 'SwUpDn', 'UDFanPort', 'Lig', 'SlpMod', 'StHt', 'VocCtl', 'AssHt'],
                  ['SwingLfRig',     '-'     ,   true  ,   true  ,    true,   true  ,   true,   true  ,  true ],
                  [  'SwUpDn'  ,     true    ,   '-'   ,   true  ,    true,   true  ,   true,   true  ,  true ],
                  ['UDFanPort'  ,    true    ,   true  ,   '-'   ,    true,   true  ,   true,   true  ,  true ],
                  [   'Lig'    ,     true    ,   true  ,   true  ,    '-' ,   true  ,   true,   true  ,  true ],
                  [  'SlpMod'  ,     true    ,   true  ,   true  ,    true,   '-'   ,   true,   true  ,  true ],
                  [   'StHt'   ,     true    ,   true  ,   true  ,    true,   true  ,   '-' ,   true  ,  true ],
                  [  'VocCtl'  ,     true    ,   true  ,   true  ,    true,   true  ,   true,   '-'   ,  true ],
                  [  'AssHt'   ,     true    ,   true  ,   true  ,    true,   true  ,   true,   true  ,  '-'  ]],
      // 风档与模式之间的逻辑互斥关系表
      WdSpdtoMod: [ ['-'   , 'Auto', 'Low', 'Medium-Low', 'Medium', 'Medium-High', 'High', 'Turbo', 'Quiet'],
                    ['Auto',  true ,  true,     true    ,   true  ,     true     ,  true ,  false ,  false ],
                    ['Cool',  true ,  true,     true    ,   true  ,     true     ,  true ,  true  ,  true  ],
                    ['Heat',  true ,  true,     true    ,   true  ,     true     ,  true ,  true  ,  true  ],
                    ['Fan' ,  true ,  true,     true    ,   true  ,     true     ,  true ,  false ,  false ],
                    ['Dry' ,  false,  true,     false   ,   false ,     false    ,  false,  false ,  false ]],
      // 高级功能与模式之间的逻辑互斥关系表
      AdvtoMod: [ [    '-'     , 'SwingLfRig', 'SwUpDn', 'UDFanPort', 'Lig', 'SlpMod', 'StHt', 'AssHt' ],
                  [   'Auto'   ,     true    ,   true  ,   true  ,    true,   false ,  false,  false ],
                  [   'Cool'   ,     true    ,   true  ,   true  ,    true,   true  ,  false,  false ],
                  [   'Heat'   ,     true    ,   true  ,   true  ,    true,   true ,   true  ,  true ],
                  [   'Fan'    ,     true    ,   true  ,   true  ,    true,   false ,  false,  false ],
                  [   'Dry'    ,     true    ,   true  ,   true  ,    true,   false ,  false,  false ]]
    };
  },
};

export default logicConfig;
