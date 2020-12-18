<template>
  <gree-view>
    <gree-page class="page-voice">
      <gree-header theme="transparent">
        <gree-icon
          name="cancel"
          @click="goBack"
        ></gree-icon>
        {{ $language('voice.voiceAssistant') }}<a
          slot="right"
          @click="prompt"
        >{{ $language('voice.prompt') }}</a>
      </gree-header>
      <gree-popup
        v-model="isVoiceEnd"
        position="center"
        :has-mask="false"
      >
        <p
          v-for="item in voiceList"
          :key="item.index"
        >
          {{ item }}
        </p>
      </gree-popup>
      <div
        class="gree-messages-content"
        :class="{'hidden': isVoiceEnd}"
        v-chat-scroll
      >
        <div class="gree-messages">
          <div
            class="gree-message-wrapper"
            v-for="(item, index) in voiceTextList"
            :key="index"
          >
            <!-- 每读一句语音，左右成对出现，所以右边必有一条 -->
            <div
              class="gree-message gree-message-sent"
              v-once
            >
              <div class="gree-message-content">
                <div class="gree-message-bubble">
                  <div class="gree-message-text">{{ item.text }}</div>
                </div>
              </div>
            </div>
            <!-- 接下来的通过v-if控制左边到底有几条 -->
            <!-- 如果左边有action且没有hint，且没有remind，就识别为正常的语音识别语句 -->
            <div
              class="gree-message gree-message-received"
              v-once
              v-if="item.greekey.action && (!item.greekey.remind || item.greekey.action !== 'query_mode')"
            >
              <div class="gree-message-content">
                <div class="gree-message-bubble">
                  <div class="gree-message-text">{{ getVoiceMsg(item.greekey, index) }}</div>
                </div>
              </div>
            </div>
            <!-- 如果含有hint基本就是要提示了，左边一条预热，预示着接下来还有一条要显示，且还是左边 -->
            <div
              class="gree-message gree-message-received hint"
              v-once
              v-if="item.greekey.hint && !item.greekey.action"
            >
              <div class="gree-message-content">
                <div class="gree-message-bubble">
                  <div class="gree-message-text">{{ getVoiceHint(item.greekey.hint, index) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </gree-page>
    <!-- 底部按钮 -->
    <gree-toolbar
      position="bottom"
      no-hairline
    >
      <gree-row>
        <gree-col>
          <div
            class="icon"
            @click="voiceBegin"
          >
            <img src="@/assets/img/btnvoice.png">
          </div>
        </gree-col>
      </gree-row>
    </gree-toolbar>
  </gree-view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  startSpeak,
  startVoice,
  stopSpeak
} from '../../../static/lib/PluginInterface.promise';

export default {
  data() {
    return {
      isVoiceEnd: true,
      voiceList: this.$language(
        'voice.prompt_power',
        'voice.prompt_level',
        'voice.prompt_add',
        'voice.prompt_cycle'
      ),
      voiceMsgTagList: {},
      voiceHintTagList: {}
    };
  },
  computed: {
    ...mapState({
      voiceTextList: state => state.voice.voiceTextList,
      dataObject: state => state.dataObject,
      Pow: state => state.dataObject.Pow
    })
  },
  created() {
    this.clearVoiceText();
  },
  beforeDestroy() {
    stopSpeak();
  },
  methods: {
    ...mapMutations({
      clearVoiceText: 'CLEAR_VOICE_LIST',
      setVoiceText: 'SET_VOICE_TEXT',
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({ sendCtrl: 'SEND_CTRL' }),
    /**
     * @description 返回键
     */
    goBack() {
      if (this.$route.path !== '/') {
        this.$router.back(-1);
        stopSpeak();
      }
    },
    /**
     * @description 提示按键
     */
    prompt() {
      this.isVoiceEnd = true;
      stopSpeak();
    },
    /**
     * @description 语音按键，触发主体语音接口，并返回数据进行解析，调用了startSpeak接口（此接口用来播放语音），具体解析过程在template里
     */
    voiceBegin() {
      this.isVoiceEnd = false;
      startVoice()
        .then(res => {
          console.log(res);
          const result = JSON.parse(res);
          this.setVoiceText(result);
        })
        .catch(err => console.log(err));
    },
    /**
     * @param greekey 服务器返回的greekey
     * @description 通过action和mode确认要执行什么命令、操作、或者其他处理
     */
    getVoiceMsg(greekey, index) {
      let msg;
      let voiceCommander = {};
      if (!this.voiceMsgTagList[index]) {
        let opt;
        let p;
        this.voiceMsgTagList[index] = true;
        const { action, hint } = greekey;
        if (action === 'control_on') {
          this.Pow
            ? (voiceCommander = this.setMsgOpt('已经是开机状态', '', ''))
            : (voiceCommander = this.setMsgOpt('已为您开机', '["Pow"]', '[1]'));
        } else if (action === 'control_off') {
          this.Pow
            ? (voiceCommander = this.setMsgOpt('已为您关机', '["Pow"]', '[0]'))
            : (voiceCommander = this.setMsgOpt('已经是关机状态', '', ''));
        } else {
          hint ? (msg = hint) : (msg = '您可以试试其他说法');
        }
        if (!this.Pow && action !== 'control_on' && action !== 'control_off') {
          msg = '关机状态下不能发送其它指令，请开机';
          voiceCommander = {};
        }
        if (Object.keys(voiceCommander).length !== 0) {
          msg = voiceCommander.msg;
          opt = voiceCommander.opt;
          p = voiceCommander.p;
        }
        if (opt && p) {
          const obj = {};
          opt = JSON.parse(opt);
          p = JSON.parse(p);
          for (let i = 0, j = opt.length; i < j; i += 1) {
            obj[opt[i]] = p[i];
          }
          this.setDataObject(obj);
          this.sendCtrl(obj);
        }
        msg && startSpeak(msg);
      }
      return msg;
    },
    /**
     * @param hint greekey的 hint
     * @description 通过action和mode确认要执行什么命令、操作、或者其他处理
     */
    getVoiceHint(hint, index) {
      let msg;
      if (!this.voiceHintTagList[index]) {
        this.voiceHintTagList[index] = true;
        this.Pow ? (msg = hint) : (msg = '关机状态下不能发送其它指令，请开机');
      }
      // msg && startSpeak(msg);
      return msg;
    },
    /**
     * @param msg 语音播报的信息
     * @param opt 指令字段
     * @param p 指令的值
     * @description 组装指令
     */
    setMsgOpt(msg, opt, p) {
      const obj = {
        msg,
        opt,
        p
      };
      return obj;
    }
  }
};
</script>
