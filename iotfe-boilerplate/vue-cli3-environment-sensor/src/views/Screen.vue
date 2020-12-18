<template>
  <gree-view>
    <gree-page class="page-screen">
      <gree-header>屏幕休眠</gree-header>
      <div class="page-main">
        <div class="screen-bg-img">
          <div class="wrapper">
            <img src="@/assets/img/ic_sleep.png" />
            <p>环境感知器无操作后休眠</p>
          </div>
        </div>
        <gree-radio-list
          :options="timeList"
          v-model="timeMode"
          icon="check"
          @change="setTime"
        />
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, RadioList } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { closePage } from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header,
    [RadioList.name]: RadioList
  },
  data() {
    return {
      timeMode: 0,
      timeList: [
        {
          value: 0,
          text: '永久'
        },
        {
          value: 1,
          text: '15秒'
        },
        {
          value: 2,
          text: '30秒'
        },
        {
          value: 3,
          text: '1分钟'
        },
        {
          value: 4,
          text: '2分钟'
        },
        {
          value: 5,
          text: '5分钟'
        }
      ]
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      ScrTime: state => state.dataObject.ScrTime
    })
  },
  created() {
    this.timeMode = this.ScrTime;
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    /**
     * @description 返回键
     */
    goBack() {
      closePage();
    },
    setTime(index) {
      this.setDataObject({ ScrTime: index.value });
      this.sendCtrl({ ScrTime: index.value });
    }
  }
};
</script>
