const mixin = {
  data() {
    return {
      modeKeyText: [
        { key: 'refined', value: 2, name: '精煮饭' }, // 精煮饭
        { key: 'quick', value: 3, name: '快煮饭' }, // 快煮饭
        { key: 'germinated', value: 13, name: '发芽饭' }, // 发芽饭
        { key: 'regular', value: 1, name: '标准煮' }, // 标准煮
        { key: 'congee', value: 4, name: '煮粥' }, // 煮粥
        { key: 'porridge', value: 5, name: '稀饭' }, // 稀饭
        { key: 'cerealPorridge', value: 8, name: '杂粮粥' }, // 杂粮粥
        { key: 'babyPorridge', value: 14, name: '婴儿粥' }, // 婴儿粥
        { key: 'soup', value: 6, name: '煲汤' }, // 煲汤
        { key: 'steam', value: 10, name: '蒸煮' }, // 蒸煮
        { key: 'reheat', value: 7, name: '热饭' }, // 热饭
        { key: 'cake', value: 11, name: '蛋糕' }, // 蛋糕
        { key: 'casserole', value: 9, name: '锅巴饭' }, // 锅巴饭
        { key: 'yoghurt', value: 12, name: '酸奶' }, // 酸奶
        { key: 'keepWarm', value: 30, name: '保温' }, // 保温
        { key: 'claypotRice', value: 15, name: '煲仔饭' }, // 煲仔饭
        { key: 'quickPorridge', value: 17, name: '快煮粥' }, // 快煮粥
        { key: 'cerealRice', value: 16, name: '杂粮饭' }, // 杂粮饭
      ],
      specialText: [
        {
          key: 'control_modequick',
          opt:
            '["Pow","mode","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,3,1,30,0,0,0]',
          msg: '已为您开始烹饪 当前模式为快煮饭',
        },
      ],
      understandText: [
        {
          key: 'control_start',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,2,1,2,1,50,0,0]',
          msg: '已为您开始烹饪',
        },
        {
          key: 'control_cancellation',
          opt:
            '["Pow","TmrEn","KpTpEn","KpTpTmr"]',
          p: '[0,0,0,0]',
          msg: '已为您取消烹饪',
        },
        {
          key:
            'control_moderefined-control_riceKindlongGrainRice-control_tastesoft',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,1,1,1,50,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为长粒米 口感稍软',
        },
        {
          key:
            'ccontrol_moderefined-ontrol_riceKindlongGrainRice-control_tastemedium',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,1,2,1,50,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为长粒米 口感适中',
        },
        {
          key:
            'control_moderefined-control_riceKindlongGrainRice-control_tastehard',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,1,3,1,45,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为长粒米 口感稍硬',
        },
        {
          key:
            'control_moderefined-control_riceKindshortGrainRice-control_tastesoft',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,2,1,1,50,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为短粒米 口感稍软',
        },
        {
          key:
            'control_moderefined-control_riceKindshortGrainRice-control_tastemedium',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,2,2,1,45,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为短粒米 口感适中',
        },
        {
          key:
            'control_moderefined-control_riceKindshortGrainRice-control_tastehard',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,2,3,1,45,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为短粒米 口感稍硬',
        },
        {
          key:
            'control_moderefined-control_riceKindbrownRice-control_tastesoft',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,3,1,1,90,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为糙米 口感稍软',
        },
        {
          key:
            'control_moderefined-control_riceKindbrownRice-control_tastemedium',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,3,2,1,80,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为糙米 口感适中',
        },
        {
          key:
            'control_moderefined-control_riceKindbrownRice-control_tastehard',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,3,3,1,70,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为糙米 口感稍硬',
        },
        {
          key: 'control_modequick-control_riceKindlongGrainRice',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,3,1,1,1,38,0,0,0]',
          msg: '已为您开始烹饪 当前模式为快煮饭 米种为长粒米',
        },
        {
          key: 'control_modequick-control_riceKindshortGrainRice',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,3,2,1,1,35,0,0,0]',
          msg: '已为您开始烹饪 当前模式为快煮饭 米种短粒米',
        },
        {
          key: 'control_modequick-control_riceKindbrownRice',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,3,3,1,1,65,0,0,0]',
          msg: '已为您开始烹饪 当前模式为快煮饭 米种为糙米',
        },
        {
          key: 'control_modegerminated',
          opt:
            '["Pow","mode","Rice","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,13,3,1,240,0,0]',
          msg: '已为您开始烹饪 当前模式为发芽饭',
        },
        {
          key: 'control_modecongee',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,4,1,90,0,0]',
          msg: '已为您开始烹饪 当前模式为煮粥',
        },
        {
          key: 'control_modeporridge',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,5,1,60,0,0]',
          msg: '已为您开始烹饪 当前模式为稀饭',
        },
        {
          key: 'control_modecerealPorridge',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,8,1,120,0,0]',
          msg: '已为您开始烹饪 当前模式为杂粮粥',
        },
        {
          key: 'control_modebabyPorridge',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,14,1,120,0,0]',
          msg: '已为您开始烹饪 当前模式为婴儿粥',
        },
        {
          key: 'control_modesoup',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,6,1,90,0,0]',
          msg: '已为您开始烹饪 当前模式为煲汤',
        },
        {
          key: 'control_modeclaypotRice',
          opt:
            '["Pow","mode","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,15,1,50,0,0,0]',
          msg: '已为您开始烹饪 当前模式为煲仔饭',
        },
        {
          key: 'control_modesteam',
          opt:
            '["Pow","mode","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,10,1,20,0,0,0]',
          msg: '已为您开始烹饪 当前模式为蒸煮',
        },
        {
          key: 'control_modereheat',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,7,1,20,0,0]',
          msg: '已为您开始烹饪 当前模式为热饭',
        },
        {
          key: 'control_modecake',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,11,1,50,0,0]',
          msg: '已为您开始烹饪 当前模式为蛋糕',
        },
        {
          key: 'control_modequickPorridge',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,17,1,60,0,0]',
          msg: '已为您开始烹饪 当前模式为快煮粥',
        },
        {
          key: 'control_modecerealRice',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,16,1,60,0,0]',
          msg: '已为您开始烹饪 当前模式为杂粮饭',
        },
        {
          key: 'control_modekeepWarm',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,30,1,0,1,0]',
          msg: '已为您开始保温',
        },

        {
          key:
            'control_startrefined-control_riceKindlongGrainRice-control_tastesoft',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,1,1,1,50,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为长粒米 口感稍软',
        },
        {
          key:
            'ccontrol_startrefined-ontrol_riceKindlongGrainRice-control_tastemedium',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,1,2,1,50,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为长粒米 口感适中',
        },
        {
          key:
            'control_startrefined-control_riceKindlongGrainRice-control_tastehard',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,1,3,1,45,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为长粒米 口感稍硬',
        },
        {
          key:
            'control_startrefined-control_riceKindshortGrainRice-control_tastesoft',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,2,1,1,50,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为短粒米 口感稍软',
        },
        {
          key:
            'control_startrefined-control_riceKindshortGrainRice-control_tastemedium',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,2,2,1,45,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为短粒米 口感适中',
        },
        {
          key:
            'control_startrefined-control_riceKindshortGrainRice-control_tastehard',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,2,3,1,45,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为短粒米 口感稍硬',
        },
        {
          key:
            'control_startrefined-control_riceKindbrownRice-control_tastesoft',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,3,1,1,90,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为糙米 口感稍软',
        },
        {
          key:
            'control_startrefined-control_riceKindbrownRice-control_tastemedium',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,3,2,1,80,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为糙米 口感适中',
        },
        {
          key:
            'control_startrefined-control_riceKindbrownRice-control_tastehard',
          opt:
            '["Pow","mode","Rice","Textre","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,2,3,3,1,70,0,0,0]',
          msg: '已为您开始烹饪 当前模式精煮饭 米种为糙米 口感稍硬',
        },
        {
          key: 'control_startquick-control_riceKindlongGrainRice',
          opt:
            '["Pow","mode","Rice","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,3,1,1,38,0,0,0]',
          msg: '已为您开始烹饪 当前模式为快煮饭 米种为长粒米',
        },
        {
          key: 'control_startquick-control_riceKindshortGrainRice',
          opt:
            '["Pow","mode","Rice","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,3,2,1,35,0,0,0]',
          msg: '已为您开始烹饪 当前模式为快煮饭 米种短粒米',
        },
        {
          key: 'control_startquick-control_riceKindbrownRice',
          opt:
            '["Pow","mode","Rice","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,3,3,1,65,0,0,0]',
          msg: '已为您开始烹饪 当前模式为快煮饭 米种为糙米',
        },
        {
          key: 'control_startgerminated',
          opt:
            '["Pow","mode","Rice","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,13,3,1,240,0,0]',
          msg: '已为您开始烹饪 当前模式为发芽饭',
        },
        {
          key: 'control_startcongee',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,4,1,90,0,0]',
          msg: '已为您开始烹饪 当前模式为煮粥',
        },
        {
          key: 'control_startporridge',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,5,1,60,0,0]',
          msg: '已为您开始烹饪 当前模式为稀饭',
        },
        {
          key: 'control_startcerealPorridge',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,8,1,120,0,0]',
          msg: '已为您开始烹饪 当前模式为杂粮粥',
        },
        {
          key: 'control_startbabyPorridge',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,14,1,120,0,0]',
          msg: '已为您开始烹饪 当前模式为婴儿粥',
        },
        {
          key: 'control_startsoup',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,6,1,90,0,0]',
          msg: '已为您开始烹饪 当前模式为煲汤',
        },
        {
          key: 'control_startclaypotRice',
          opt:
            '["Pow","mode","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,15,1,50,0,0,0]',
          msg: '已为您开始烹饪 当前模式为煲仔饭',
        },
        {
          key: 'control_startsteam',
          opt:
            '["Pow","mode","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[1,10,1,20,0,0,0]',
          msg: '已为您开始烹饪 当前模式为蒸煮',
        },
        {
          key: 'control_startreheat',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,7,1,20,0,0]',
          msg: '已为您开始烹饪 当前模式为热饭',
        },
        {
          key: 'control_startcake',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,11,1,50,0,0]',
          msg: '已为您开始烹饪 当前模式为蛋糕',
        },
        {
          key: 'control_startquickPorridge',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,17,1,60,0,0]',
          msg: '已为您开始烹饪 当前模式为快煮粥',
        },
        {
          key: 'control_startcerealRice',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,16,1,60,0,0]',
          msg: '已为您开始烹饪 当前模式为杂粮饭',
        },
        {
          key: 'control_startkeepWarm',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[1,30,1,0,1,0]',
          msg: '已为您开始保温',
        },
        {
          key: 'control_reservationOn',
          opt:
            '["Pow","mode","TmrEn","StTmr","SchEn","SchTmr","Rice","Textre","KpTpEn","KpTpTmr"]',
          p: '[1,2,0,0,1,480,3,2,0,0]',
          msg: '已为您开始预约',
        },
        {
          key: 'control_reservationOff',
          opt:
            '["Pow","TmrEn","SchEn","SchTmr","KpTpEn","KpTpTmr"]',
          p: '[0,0,0,0,0,0]',
          msg: '已为您取消预约',
        },
        {
          key:
            'control_cancellationrefined',
          opt:
            '["Pow","mode","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[0,2,0,70,0,0,0]',
          msg: '已为您取消精煮饭',
        },
        {
          key: 'control_cancellationquick',
          opt:
            '["Pow","mode","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[0,3,0,65,0,0,0]',
          msg: '已为您取消快煮饭',
        },
        {
          key: 'control_cancellationgerminated',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[0,13,0,240,0,0]',
          msg: '已为您取消发芽饭',
        },
        {
          key: 'control_cancellationcongee',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[0,4,0,90,0,0]',
          msg: '已为您取消煮粥',
        },
        {
          key: 'control_cancellationporridge',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[0,5,0,60,0,0]',
          msg: '已为您取消稀饭',
        },
        {
          key: 'control_cancellationcerealPorridge',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[0,8,0,120,0,0]',
          msg: '已为您取消杂粮粥',
        },
        {
          key: 'control_cancellationbabyPorridge',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[0,14,0,120,0,0]',
          msg: '已为您取消婴儿粥',
        },
        {
          key: 'control_cancellationsoup',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[0,6,0,90,0,0]',
          msg: '已为您取消煲汤',
        },
        {
          key: 'control_cancellationclaypotRice',
          opt:
            '["Pow","mode","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[0,15,0,50,0,0,0]',
          msg: '已为您取消煲仔饭',
        },
        {
          key: 'control_cancellationsteam',
          opt:
            '["Pow","mode","TmrEn","StTmr","StpRic","KpTpEn","KpTpTmr"]',
          p: '[0,10,0,20,0,0,0]',
          msg: '已为您取消蒸煮',
        },
        {
          key: 'control_cancellationreheat',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[0,7,0,20,0,0]',
          msg: '已为您取消热饭',
        },
        {
          key: 'control_cancellationcake',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[0,11,0,50,0,0]',
          msg: '已为您取消蛋糕',
        },
        {
          key: 'control_cancellationquickPorridge',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[0,17,0,60,0,0]',
          msg: '已为您取消快煮粥',
        },
        {
          key: 'control_cancellationcerealRice',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[0,16,0,60,0,0]',
          msg: '已为您取消杂粮饭',
        },
        {
          key: 'control_cancellationkeepWarm',
          opt:
            '["Pow","mode","TmrEn","StTmr","KpTpEn","KpTpTmr"]',
          p: '[0,30,0,0,0,0]',
          msg: '已为您取消保温',
        },
      ],
    };
  },
};

export default mixin;
