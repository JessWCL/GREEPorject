const modeList = {
  data() {
    return {
      modeListText: [
        {
          value: 'dcxh',
          text: '单次巡航',
          brief: '过一段时间后打开水龙头可享受零冷水一次。'
        },
        {
          value: 'ddxh',
          text: '点动巡航',
          brief: '打开水龙头后关闭，等待后打开可享受零冷水。'
        },
        {
          value: 'qthxh',
          text: '全天候巡航',
          brief: '随时打开水龙头都享受零冷水。'
        },
        {
          value: 'yyxh',
          text: '预约巡航',
          brief: '在设定时间内享受零冷水。'
        }
      ],
    };
  },
};

export default modeList;
