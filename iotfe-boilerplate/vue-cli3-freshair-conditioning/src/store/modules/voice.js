/**
 * @description 语音
 */
const store = {
  mutations: {
    /**
     * @description 设置语音数据，以供界面显示
     */
    SET_VOICE_TEXT(state, textObj) {
      const length = state.voiceTextList.length;
      state.voiceTextList.splice(length, 1, textObj);
    },
    /**
     * @description 清除界面语音数据
     */
    CLEAR_VOICE_LIST(state) {
      state.voiceTextList = [];
    }
  },
  state: {
    voiceTextList: [] // 语音文字列表
  }
};

export default store;
