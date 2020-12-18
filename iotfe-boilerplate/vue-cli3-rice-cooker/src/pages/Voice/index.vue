<template>
  <!-- 语音页面 -->
  <div class="page-voice">
    <div class="head">
      <div @click="goBack()">
        <img src="../../assets/img/voiceclose.png">
      </div>
      <div>
        <span>{{ voiceAssistant }}</span>
      </div>
      <div @click="pormpt()">
        <span>{{ prompt }}</span>
      </div>
    </div>
    <div
      class="main"
      :class="{hide: isVoiceStart}"
    >
      <div>
        <ul>
          <li
            v-for="(item, index) in voiceList"
            :ref="'voice' + index "
            :key="item.index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div
      class="main-voice"
      :class="{hide: !isVoiceStart}"
    >
      <ul ref="scrollUl">
        <!-- voice-holder不要删除 -->
        <li class="voice-holder">
          1
        </li>
        <!-- 前方高能，史上最脑残逻辑降临 -->
        <div 
          v-for="(item,index) in voiceTextList" 
          :key="index"
        >
          <!-- 每读一句语音，左右成对出现，所以右边必有一条 -->
          <li 
            v-once 
            class="conversation-right"
          >
            {{ item.text }}
          </li>
          <!-- 接下来的通过v-if控制左边到底有几条 -->
          <!-- 如果左边有action且没有hint，且没有remind，就识别为正常的语音识别语句 -->
          <li
            v-if="item.greekey.action
              && (!item.greekey.remind || item.greekey.action !== 'query_mode')" 
            v-once 
            class="conversation-left"
          >
            {{ getVoiceMsg(item.greekey,index) }}
          </li>
          <!-- 如果含有hint基本就是要提示了，左边一条预热，预示着接下来还有一条要显示，且还是左边 -->
          <li
            v-if="item.greekey.hint
              && !item.greekey.action" 
            v-once 
            class="conversation-left"
          >
            {{ getVoiceHint(item.greekey.hint,index) }}
          </li>
          <!-- 如果是ingredient，则是原料级别的提示，左边无误 -->
          <li
            v-if="item.greekey.ingredient && item.greekey.action === 'query_mode'" 
            v-once 
            class="conversation-left"
          >
            <h2>{{ item.greekey.title }}</h2>
            <h3>配料：</h3>
            {{ item.greekey.ingredient }}
            <h3>步骤：</h3>
            {{ item.greekey.steps }}
            <h3>注意事项</h3>
            {{ item.greekey.remind }}
          </li>
          <!-- 如果含有benefit，则表示要表达某种食材的好处，依然左边显示 -->
          <li 
            v-if="item.greekey.benefit && item.greekey.action === 'query_mode'"
            v-once 
            class="conversation-left"
          >
            <h3>发芽饭好处：</h3>
            {{ item.greekey.benefit }}
            <h3>注意事项</h3>
            {{ item.greekey.remind }}
          </li>
          <!-- 综上逻辑，无任何规则，纯属肆意挥洒，实乃脑袋一拍，既来之则安之典型是也 -->
        </div>
      </ul>
    </div>
    <div class="foot">
      <img
        src="../../assets/img/btnvoice.png"
        @click="voiceBegin"
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import voiceTextMixin from '../../mixins/voice.text.mixin';
import { startSpeak, startVoice } from '../../../../static/lib/PluginInterface.promise';
import { setTime } from '../../mixins/function-change-device.mixin';
import {
  RC_MID_TYPE_4009C
} from '../../api/constants';

/**
 * @module Voice
 * @description 语音界面
 */
export default {
  name: 'Voice',
  mixins: [voiceTextMixin, setTime],
  data() {
    return {
      isVoiceStart: false,
      voiceAssistant: this.$language('voiceAssistant'),
      prompt: this.$language('prompt'),
      voiceList: this.$language(
        'prompt1',
        'prompt2',
        'prompt3',
        'prompt4',
        // 'prompt5',
        'prompt6',
        'prompt7',
      ),
      cancelTag: false, // 第一次说“取消”时置为true，然后进行下一步判断
      voiceMsgTagList: {},
      voiceMode: 2,
    };
  },
  computed: {
    ...mapState({
      modeList: state => state.modeList,
      voiceTextList: state => state.voice.voiceTextList,
      dataObject: state => state.dataObject,
      isCooking: state => state.dataObject.Pow,
      modeName: state => state.modeName,
    }),
  },
  watch: {
    /**
     * @function updateUI
     * @description 整机取消烹饪时触发此方法，更新UI
     */
    isCooking: function updateUI(newv, oldv) {
      if (oldv === 1 && newv === 0) {
        this.setDataObject({ // 取消后要设置默认时间
          Pow: 0,
          SchEn: 0,
          TmrEn: 0,
          StTmr: this.setDefaultTime(this.dataObject.mode),
          KpTpTmr: 0,
          ModeTmr: this.setDefaultTime(this.dataObject.mode),
        });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      const self = vm;
      self.voiceMsgTagList = {};
      self.voiceHintTagList = {};
      self.clearVoiceText();
    });
  },
  beforeRouteLeave(to, from, next) {
    this.clearVoiceText();
    next();
  },
  mounted() {
    this.clearVoiceText();
  },
  methods: {
    ...mapMutations({
      clearVoiceText: 'CLEAR_VOICE_LIST',
      setVoiceText: 'SET_VOICE_TEXT',
      setDataObject: 'SET_DATA_OBJECT',
    }),
    ...mapActions({ sendCtrl: 'SEND_CTRL' }),
    /**
     * @function goBack
     * @description 返回键
     */
    goBack() {
      if (this.$route.path !== '/') {
        this.$router.back(-1);
      }
    },
    /**
     * @function pormpt
     * @description 提示按键
     */
    pormpt() {
      this.isVoiceStart = false;
    },
    /**
     * @function voiceBegin
     * @description 语音按键，触发主体语音接口，并返回数据进行解析，调用了startSpeak接口（此接口用来播放语音），具体解析过程在template里
     */
    voiceBegin() {
      this.isVoiceStart = true;
      startVoice()
        .then(res => {
          // e.g. {"type":0,"key":"煮饭","greekey":{"action":"control_start",
          // "hint":""},"text":"煮饭"}
          console.log(res); // eslint-disable-line
          const result = JSON.parse(res);
          this.setVoiceText(result);
          setTimeout(() => {
            this.scrollToBtm();
          }, 50);
        })
        .catch(err => console.log(err)); // eslint-disable-line
    },
    /**
     * @function getVoiceHint
     * @param hint greekey的 hint
     * @param index 语音列表index
     * @description 通过action和mode确认要执行什么命令、操作、或者其他处理,代码乱的一批
     */
    getVoiceHint(hint, index) {
      let msg;
      if (!this.voiceHintTagList[index]) {
        this.voiceHintTagList[index] = true;
        msg = hint;
      }
      msg && startSpeak(msg);
      return msg;
    },
    /**
     * @function getVoiceMsg
     * @param greekey greekey
     * @param index 语音列表index
     * @description 通过action和mode确认要执行什么命令、操作、或者其他处理,代码乱的一批
     */
    getVoiceMsg(greekey, index) {
      let msg;
      if (!this.voiceMsgTagList[index]) {
        this.voiceMsgTagList[index] = true;
        const { action, mode, riceKind, taste, time, hint } = greekey; // 获取服务器传来的值
        if (action) {
          msg = this.judgeWorking(action); // 判断当前是否已经开始工作了
          if (!msg) {
            let opt;
            let p;
            let modeFlag = true; // 判断机型有哪些模式没有
            let beginNoMode = true; // 只说“开始”，没有说模式时，获取当前模式
            let specialMode = false; // 4009C的快煮饭固定时间
            (this.dataObject.MidType === RC_MID_TYPE_4009C && mode === 'quick') ? specialMode = true : '';
            if (this.dataObject.MidType === RC_MID_TYPE_4009C) { // 当前机型没有的模式
              if (mode === 'regular' || mode === 'cerealPorridge' || mode === 'babyPorridge' || mode === 'casserole' || mode === 'yoghurt' || mode === 'cerealRice') {
                modeFlag = false;
              }
            } else if (mode === 'regular' || mode === 'casserole' || mode === 'claypotRice' || mode === 'quickPorridge') {
              modeFlag = false;
            }
            // 首先判断有没有mode
            if (mode && modeFlag) {
              beginNoMode = false; // 有mode，说明有模式
              this.cancelTag = false;
              // 如果有呢，就看action有没有预约操作
              if (action.indexOf('control_reservation') < 0 && action.indexOf('control_cancellation') < 0) {
                let textStore = this.understandText;
                specialMode ? textStore = this.specialText : ''; // 快煮饭等特殊模式的遍历表
                // 没有预约且有action和mode字段，就是正常普通操作啦
                for (let i = 0, j = textStore.length; i < j; i += 1) {
                  if (textStore[i].key.indexOf(riceKind) >= 0
                      && textStore[i].key.indexOf(mode) >= 0
                      && textStore[i].key.indexOf(taste) >= 0) { // 混合指令，精煮饭/米种/口感
                    msg = textStore[i].msg;
                    opt = textStore[i].opt;
                    p = textStore[i].p;
                    break;
                  } else if (textStore[i].key.indexOf(riceKind) >= 0
                      || textStore[i].key.indexOf(taste) >= 0) { // 混合指令，米种/口感
                    msg = textStore[i].msg;
                    opt = textStore[i].opt;
                    p = textStore[i].p;
                    break;
                  } else if (
                    textStore[i].key.indexOf(action) >= 0
                    && textStore[i].key.indexOf(mode) >= 0
                  ) { // 不是混合指令就直接遍历
                    msg = textStore[i].msg;
                    opt = textStore[i].opt;
                    p = textStore[i].p;
                    break;
                  }
                }
              } else if (
                // 如果action有预约操作，就执行预约有关的东西，很屌的哟
                action.indexOf('control_reservation') >= 0
              ) {
                // e.g. 预约煮粥下午5点完成
                if (action.indexOf('On') >= 0 && time) {
                  const _time = time.replace(/-/g, '/'); // IOS不识别服务器传来的格式，需要转换
                  const utc = new Date(_time).getTime();
                  const current = Date.now();
                  // 语音接口返回来是一个时间格式，转为utc后用它减去现在的时间，就是预约时间啦
                  const interval = utc - current;
                  const SchTmr = Math.round(interval / 1000 / 60); // 分钟数
                  console.log('语音预约的分钟数', SchTmr); // eslint-disable-line
                  const hour = Math.floor(SchTmr / 60);
                  const min = SchTmr - hour * 60;
                  let presetFlag = false;
                  if (this.dataObject.MidType === RC_MID_TYPE_4009C) { // 当前机型有预约的模式
                    if (mode === 'refined' || mode === 'congee' || mode === 'porridge' || mode === 'soup' || mode === 'steam') {
                      presetFlag = true;
                    }
                  } else if (mode === 'refined' || mode === 'quick' || mode === 'congee' || mode === 'porridge' || mode === 'cerealPorridge' || mode === 'babyPorridge' || mode === 'soup' || mode === 'steam') {
                    presetFlag = true;
                  }
                  // 有预约功能的才可以预约
                  if (presetFlag) {
                    // 预约时间大于0才有意义
                    if (interval > 0) {
                      if (hour <= 23) {
                        const mint = min === 0 ? '' : `${min}分钟`;
                        const hours = hour === 0 ? '' : `${hour}小时`;
                        msg = `已为您预约时间为${hours}${mint}后烹饪完成`;
                        let m = this.getModeIndex(mode);
                        beginNoMode ? m = this.dataObject.mode : m = this.getModeIndex(mode);
                        const obj = {
                          mode: m,
                          StTmr: this.setDefaultTime(m),
                          SchTmr,
                          SchEn: 1,
                          Pow: 1,
                        };
                        console.log(obj); // eslint-disable-line
                        this.setDataObject(obj);
                        this.sendCtrl(obj);
                      } else {
                        // 预约时间大于1天，提示用户不合理
                        msg = '预约时间太长，会影响烹饪效果，请重新设置预约时间';
                      }
                    } else {
                      // 预约时间小于0没意义
                      msg = '预约时间小于当前时间,请您重新设置预约时间';
                    }
                  } else {
                    // 不能进行预约的模式
                    msg = '当前模式不能进行预约,请试试其他模式';
                  }
                } else if (action.indexOf('On') >= 0) { // 没有说明具体预约时间的
                  msg = '请说明烹饪模式和时间';
                } else {
                  // 这里就是取消预约啦
                  msg = '已为您取消预约';
                  this.setDataObject({ Pow: 0, SchEn: 0 });
                  this.sendCtrl({ Pow: 0, SchEn: 0 });
                }
              } else {
                msg = '您可以试试其他说法';
              }
            } else if (modeFlag && !mode && action.indexOf('control_cancellation') >= 0) { // 取消操作
              if (this.cancelTag) {
                let m = this.getModeName(this.dataObject.mode);
                this.dataObject.KpTpEn ? m = '保温' : m = this.getModeName(this.dataObject.mode);
                msg = `已为您取消${m}`;
                this.setDataObject({ // 取消后要设置默认时间
                  Pow: 0,
                  SchEn: 0,
                  TmrEn: 0,
                  StTmr: this.setDefaultTime(this.dataObject.mode),
                  KpTpTmr: 0,
                  ModeTmr: this.setDefaultTime(this.dataObject.mode),
                });
                this.sendCtrl(this.dataObject);
                this.cancelTag = false;
              } else {
                this.cancelTag = true;
                if (this.dataObject.Pow) {
                  msg = '烹饪进行中,如果中途取消烹饪工作会影响烹饪效果。是否取消！';
                } else {
                  msg = '当前未开始烹饪';
                }
              }
            } else if (modeFlag && action.indexOf('control_reservation') >= 0) {
              this.cancelTag = false;
              if (action.indexOf('On') >= 0) { // 只说明“开始预约”，没有说明模式和时间。
                msg = '请说明烹饪模式和时间';
              } else if (this.dataObject.Pow && this.dataObject.SchEn) { // 取消预约
                this.setDataObject({ Pow: 0, SchEn: 0 });
                this.sendCtrl({ Pow: 0, SchEn: 0 });
                msg = '已为您取消预约';
              } else {
                msg = '当前未开始预约';
              }
            } else if (modeFlag && action.indexOf('control_start') >= 0) {
              this.cancelTag = false;
              // 只说了开始，没说具体模式，需要获取当前state的模式
              let flag = true;
              let textStore = this.understandText; // 判断快煮饭等特殊模式
              specialMode ? textStore = this.specialText : '';
              for (let i = 0, j = textStore.length; i < j; i += 1) {
                if (textStore[i].key.indexOf(action) >= 0) {
                  msg = textStore[i].msg;
                  opt = textStore[i].opt;
                  p = textStore[i].p;
                  flag = false;
                  break;
                }
              }
              if (flag) {
                msg = '您可以试试其他说法';
              }
            } else {
              this.cancelTag = false;
              msg = '您可以试试其他说法';
            }
            if (opt && p) {
              const obj = {};
              opt = JSON.parse(opt);
              p = JSON.parse(p);
              const modeNumber = opt.indexOf('mode');
              const timeNumber = opt.indexOf('StTmr');
              const riceNumber = opt.indexOf('Rice');
              const tasteNumber = opt.indexOf('Textre');
              const keepWarm = opt.indexOf('KpTpEn');
              if (!this.dataObject.KpTpEn) {
                // 如果没有指定模式，获取当前APP模式、米种、口感和时间
                beginNoMode ? p[modeNumber] = this.dataObject.mode : '';
                beginNoMode ? p[timeNumber] = this.dataObject.StTmr : '';
                beginNoMode ? p[riceNumber] = this.dataObject.Rice : '';
                beginNoMode ? p[tasteNumber] = this.dataObject.Textre : '';
                beginNoMode ? msg = `${msg}, 当前模式为${this.modeName}` : '';
              } else if (!mode) { // 保温
                p[keepWarm] = 1;
                msg = `${msg}, 当前模式为保温`;
              }
              for (let i = 0, j = opt.length; i < j; i += 1) {
                obj[opt[i]] = p[i];
              }
              console.log(obj); // eslint-disable-line
              this.cancelTag = false;
              this.setDataObject(obj);
              this.sendCtrl(obj);
            }
          }
        } else {
          hint ? (msg = hint) : undefined;
        }
        msg && startSpeak(msg);
      }
      return msg;
    },
    /**
     * @function scrollToBtm
     * @description 将页面滚动到最底部
     */
    scrollToBtm() {
      // console.log(`this.$refs.scrollUl.scrollHeight: ${this.$refs.scrollUl.scrollHeight}`);
      // window.scrollTo(0, this.$refs.scrollUl.scrollHeight);
      this.$refs.scrollUl.scrollTop = this.$refs.scrollUl.scrollHeight;
    },
    /**
     * @function setDefaultTime
     * @param val 语音识别出的模式
     * @description 设置当前模式的默认烹饪时间
     */
    setDefaultTime(val) {
      const modeValue = this.getRealIndex(this.modeList, val);
      let defaultTime; // 预约时间小于定时时间时设置默认时间
      if (this.dataObject.KpTpEn) {
        defaultTime = 0;
      } else {
        modeValue === 0 ? this.isTaste = true : this.isTaste = false; // 根据米种、口感确定具体时间
        modeValue < 2
          ? defaultTime = this.typeChange(this.dataObject.Rice, this.dataObject.Textre)
          : defaultTime = this.modeList[modeValue].requireTime;
      }
      return defaultTime;
    },
    /**
     * @function judgeWorking
     * @param action
     * @description 判断当前是否正在工作
     */
    judgeWorking(action) {
      let msg;
      // action 一定不能使取消或关闭，因为如果是取消操作，不要去阻止它
      if (this.dataObject.Pow === 1 && action.indexOf('cancel') < 0 && action.indexOf('Off') < 0) {
        if (this.dataObject.KpTpEn === 1) {
          msg = '保温进行中, 请先取消保温';
        } else if (this.dataObject.SchEn === 1) {
          msg = '预约进行中, 请先取消预约';
        } else {
          msg = '烹饪进行中, 请先取消烹饪';
        }
        this.cancelTag = false;
      }
      return msg;
    },
    /**
     * @function getModeIndex
     * @param mode 语音返回的模式值，英文，比如cake，这非常屌
     * @description 根据语音返回的模式值解析成要发送的命令值
     */
    getModeIndex(mode) {
      let v;
      for (let i = 0, j = this.modeKeyText.length; i < j; i += 1) {
        if (mode === this.modeKeyText[i].key) {
          v = this.modeKeyText[i].value;
        }
      }
      return v;
    },
    /**
     * @function getModeName
     * @param mode 语音返回的模式值，英文，比如cake，这非常屌
     * @description 根据语音返回的模式值解析成要发送的mode名字
     */
    getModeName(mode) {
      let v;
      for (let i = 0, j = this.modeKeyText.length; i < j; i += 1) {
        if (mode === this.modeKeyText[i].value) {
          v = this.modeKeyText[i].name;
        }
      }
      return v;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/index.scss';

.page-voice {
  width: 100%;
  height: 100%;
  text-align: center;
  color: #fff;
  background-image: url('../../assets/img/voicebg.png');
  background-size: 100% 100%;
  overflow: hidden;
  font-family: appLight;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    height: 6%;
    box-sizing: border-box;
    img {
      width: 40%;
    }
    span {
      @include font-size(20px);
    }
  }
  .main {
    width: 100%;
    height: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    ul {
      list-style: none;
      li {
        margin-bottom: 2%;
        @include font-size(16px);
      }
    }
  }
  .foot {
    width: 100%;
    height: 9%;
    box-sizing: border-box;
    img {
      width: 13%;
    }
  }
  .main-voice {
    width: 100%;
    height: 85%;
    ::-webkit-scrollbar {
      width: 0px;
    }
    ::-webkit-scrollbar-track {
      border-radius: 0px;
      background-color: rgba(25, 147, 147, 0.1);
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 0px;
      background-color: rgba(25, 147, 147, 0.2);
    }
    ul {
      margin: 0 5%;
      width: 90%;
      height: 100%;
      list-style: none;
      overflow-x: hidden;
      overflow-y: auto;
      li {
        clear: both;
        margin-bottom: 5%;
        padding: 3%;
        width: auto;
        max-width: 80%;
        border-radius: 10px;
        text-align: left;
        line-height: 20px;
        @include font-size(16px);
      }
      .conversation-left {
        float: left;
        background-color: rgba(255, 255, 255, 0.2);
        animation: show-chat-even 0.15s 1 ease-in;
        -moz-animation: show-chat-even 0.15s 1 ease-in;
        -webkit-animation: show-chat-even 0.15s 1 ease-in;
        h2 {
          margin: 5% 0;
          font-size: 20px;
          font-weight: 600;
        }
        h3 {
          margin: 5% 0;
          font-size: 18px;
        }
      }
      .conversation-right {
        float: right;
        background-color: rgba(0, 0, 0, 0.2);
        animation: show-chat-odd 0.15s 1 ease-in;
        -moz-animation: show-chat-odd 0.15s 1 ease-in;
        -webkit-animation: show-chat-odd 0.15s 1 ease-in;
      }
      .voice-holder {
        margin-bottom: 0;
        visibility: hidden;
      }
    }
  }
  @keyframes show-chat-odd {
    0% {
      margin-right: -480px;
    }
    100% {
      margin-right: 0;
    }
  }
  @keyframes show-chat-even {
    0% {
      margin-left: -480px;
    }
    100% {
      margin-left: 0;
    }
  }
  .hide {
    display: none;
  }
}
</style>
