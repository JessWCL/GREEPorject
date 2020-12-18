/**
 * @module store 语音vuex模块
 * @description 语音的store module，为什么要单独拿出来呢，
 *  因为语音与其他模块几乎完全解耦，可以单独拿出来
 */
const store = {
  actions: {
    /**
     * @function START_VOICE
     * @param commit store的commit方法
     * @description 调用主体语音接口
     */
    // START_VOICE({ commit }) {
    //   return startVoice();
    // .then(res => {
    //   // e.g. {"type":0,"key":"煮饭","greekey":{"action":"control_start",
    //   // "hint":""},"text":"煮饭"}
    //   console.log(res);
    //   const result = JSON.parse(res);
    //   commit('SET_VOICE_TEXT', result);
    //   return result;
    // })
    // .catch(err => err);
    // },
  },
  mutations: {
    /**
     * @function SET_VOICE_TEXT
     * @param {object} state vuex store state
     * @param {object} textObj 语音接口返回的text数据
     * @description 设置语音数据，以供界面显示
     */
    SET_VOICE_TEXT(state, textObj) {
      const {length} = state.voiceTextList;
      state.voiceTextList.splice(length, 1, textObj);
    },
    /**
     * @function  CLEAR_VOICE_LIST
     * @param {object} state vuex store state
     * @description 清除界面语音数据
     */
    CLEAR_VOICE_LIST(state) {
      state.voiceTextList = [];
    },
  },
  state: {
    voiceTextList: [], // 语音文字列表
  },
};

export default store;
