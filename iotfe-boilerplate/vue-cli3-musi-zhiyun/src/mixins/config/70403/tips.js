/*
 * @Author: Jerry-Rain
 * @Date: 2020-04-15 17:16:51
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-04-17 09:36:42
 * @Description:
 */

const tips = {
  data() {
    return {
      // 提示dialog
      showTipTitle: '', // 问好参考值的 Title
      showTipContent: '', // 问好参考值的 内容Content
      slotDialog: {
        open: false,
        btns: [
          {
            text: '返回'
          }
        ]
      },
      powerShowTxt: [
        '心脏总能量值',
        '交感神经张力',
        '迷走神经张力',
        '自主神经平衡',
        '心率失常指数',
        '猝死风险指数'
      ],
      explain_heart_beat_average: {
        explain: '解释',
        suggest:
          '平均心率值是指休息状态下的心率，受多种因素影响。正常情况下指数为60~100次/分。晚上数据心率值没有为零的数据下，长期出现小于60次/分，或大于100次/分的平均心率值，可根据个人意愿到医院进行相关检查。'
      }, // 平均心率值解释
      rd_heart_beat: {
        timeList: [],
        valueList: [] 
      },
      rd_breath: {
        timeList: [],
        valueList: [] 
      },
      tp_days_trent_chart: {
        timeList: [],
        valueList: [],
        explain: `#数据阐释#<br/>
当心脏总能量异常升高或者降低时，需结合其他指标注解综合分析得出结论。<br/>
#参数解释#<br/>
心脏总能量代表的是监测时期内心率的全频率部分的功率；本指标可在一定条件下反映心率调控系统的总体储备功能。<br/>
#信息仅供参考#`,
        suggest: ''
      }, // 心脏总能量多天回溯曲线图数据
      lf_days_trent_chart: {
        timeList: [],
        valueList: [],
        explain: `#数据阐释#<br/>
正常情况下，交感神经张力指数范围为600~1800。当交感神经张力指数>6000时，存在两种原因：心律失常、或睡眠质量较差，体动过多。当长期出现此种情况时，可根据个人意愿到医院进行相关检查，如动态心电图和多导睡眠监测等。
#参数解释#<br/>
交感神经张力指数代表的是监测时期内心率的低频率部分的功率，主要反映交感神经调节张力。<br/>
#信息仅供参考#`,
        suggest: ''
      }, // 交感神经调节能力回溯曲线图数据
      hf_days_trent_chart: {
        timeList: [],
        valueList: [],
        explain: `#数据阐释#<br/>
正常情况下，迷走神经张力指数为600~1200。当迷走神经张力指数>5000时，存在两种原因：心律失常、或睡眠质量较差，体动过多。当长期出现此种情况时，可根据个人意愿到医院进行相关检查，如动态心电图和多导睡眠监测等。
对于合并心脑血管疾病的人来说，迷走神经张力长时间低迷，可根据个人意愿到医院进行相关检查，如动态心电图和多导睡眠监测等，防止诱发脑血管意外。
#参数解释#<br/>
迷走神经张力指数代表的是监测时期内心率频率密度分布图。<br/>
#信息仅供参考#`,
        suggest: ''
      }, // 迷走神经张力指数多天回溯曲线图数据
      lf_hf_days_trent_chart: {
        timeList: [],
        valueList: [],
        explain: `#数据阐释#<br/>
正常情况下，自主神经平衡指数最佳范围为0.5~1.5。从理论上讲，数值升高时，表现为心率升高、血压上升；数值降低时则表现相反。
#参数解释#<br/>
自主神经平衡指数反映总体的交感-迷走神经平衡水平，对高血压、冠心病等心血管疾病的早期诊断、病中监护和预后评估等有重要价值。<br/>
#信息仅供参考#`,
        suggest: ''
      }, // 自主神经平衡指数多天回溯曲线图数据
      endocrine_days_trent_chart: {
        timeList: [],
        valueList: [],
        explain: `#数据阐释#<br/>
↓ 过低时，反映了心脏自主神经对心脏在受到过量外界刺激时的总体调节能力下降，提示发生心律失常的风险升高。<br/>
↑ 过高时，反映了心脏出现了心律不整的情况，此时，用户可能会出现明显的心悸、胸闷、头晕、血压降低等情况，严重时可危及生命。如果反复出现这种情况，请及时到专科完善心电图检查，并遵医嘱进行诊治。<br/>
#参数解释#<br/>
心律失常指数是心率变异性（HRV）时域分析方法获得的指标之一，反映了一段时间内窦性心搏间期的总体变异程度，其大小可以用来评估心脏在应激情况下的易损程度。<br/>
#信息仅供参考#`,
        suggest: ''
      }, // 内分泌指数多天回溯曲线图数据
      dc_days_trent_chart: {
        timeList: [],
        valueList: [],
        explain: `#数据阐释#<br/>
若数值长时间低于4.5，可根据个人意愿到医院进行相关检查。
#参数解释#<br/>
猝死风险指数反映了心自主神经（主要是心迷走神经中的副交感神经成分）对心率的减速能力。<br/>
#信息仅供参考#`,
        suggest: ''
      }, // 心率减速力DC（猝死风险指数）多天回溯曲线图数据

      dialogOpt: [
        [],
        ['tp_days_trent_chart', '心脏总能量'],
        ['explain_heart_beat_average', '平均心率值'],
        ['pregnancy_index', '孕气指数'],
        ['water_index', '水润指数'],
        ['easy_fat_index', '易胖指数'],
        ['emostr_index', '情绪应激指数'],
        ['tp_days_trent_chart', '心脏总能量'],
        ['lf_days_trent_chart', '交感神经张力'],
        ['hf_days_trent_chart', '迷走神经张力'],
        ['strtol_index', '抗压能力指数'],
        ['lf_hf_days_trent_chart', '自主神经平衡'],
        ['endocrine_days_trent_chart', '心律失常指数'],
        ['dc_days_trent_chart', '猝死风险指数']
      ]
    };
  }
};

export default tips;
