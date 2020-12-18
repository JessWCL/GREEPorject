<template>
  <gree-view 
    class="page has-navbar" 
    id="set"
    bg-color="#f4f4f4"
  >
    <div class="page-content page-setup">
      <Header :fun="clickBack" />

      <div class="page-main" >
        <gree-list>
          <!-- 童锁 -->
          <gree-list-item :title="$language('setUp.childLock')">
            <gree-switch
              slot="after"
              v-model="CLockStatus"
              @change="handler('childLock', CLockStatus)"
            ></gree-switch>
          </gree-list-item>
          <!-- 自动开门 -->
          <gree-list-item :title="$language('setUp.openDooor')" :class="{opacity:isOpacity}">
            <gree-switch
              slot="after"
              v-model="openDoor"
              :disabled="isOpacity"
              @change="handler('autoOpenDoor', openDoor)"
            ></gree-switch>
          </gree-list-item>
          <!-- 看天洗衣 -->
          <gree-list-item :title="$language('setUp.washWeather')" :class="{opacity: isOpacity}">
            <gree-switch
              slot="after"
              v-model="kanTianXiYi"
              :disabled="isOpacity"
              @change="handler('washWeather', kanTianXiYi)"
            ></gree-switch>
          </gree-list-item>
          <!-- 看时洗衣 -->
          <gree-list-item :title="$language('setUp.washTime')" :class="{opacity: isOpacity }">
            <gree-switch
              slot="after"
              v-model="kanShiXiYi"
              :disabled="isOpacity"
              @change="handler('washTime', kanShiXiYi)"
            ></gree-switch>
          </gree-list-item>

          <!-- 洗涤剂自动投放 -->
          <gree-list-item
            :title="$language('setUp.detergentAutomaticDelivery')"
            :class="{opacity: disableSwitch}"
          >
            <gree-switch
              slot="after"
              v-model="xidiji"
              :disabled="disableSwitch"
              @change="handler('autoScour', xidiji)"
            ></gree-switch>
          </gree-list-item>

          <gree-list-item header="洗涤剂使用量" :class="{opacity: disableSwitch || !autoScour}" @click.native="switchRadio('xidijitoufang', Boolean(disableSwitch || !autoScour ))">
            <gree-row slot="title">
              <gree-radio :name="4" size="xl" v-model="xidijitoufang" inline :disabled="Boolean(disableSwitch || !autoScour )">极少</gree-radio>
              <gree-radio :name="1" size="xl" v-model="xidijitoufang" inline :disabled="Boolean(disableSwitch || !autoScour )">较少</gree-radio>
              <gree-radio :name="2" size="xl" v-model="xidijitoufang" inline :disabled="Boolean(disableSwitch || !autoScour )">适量</gree-radio>
              <gree-radio :name="3" size="xl" v-model="xidijitoufang" inline :disabled="Boolean(disableSwitch || !autoScour )">较多</gree-radio>
            </gree-row>
          </gree-list-item>


          <!-- 柔软剂自动投放 -->
          <gree-list-item
            :title="$language('setUp.automaticDeliveryOfSoftener')"
            :class="{opacity: disableSwitch }"
          >
            <gree-switch
              slot="after"
              v-model="roushunji"
              :disabled="disableSwitch"
              @change="handler('autoMeek', roushunji)"
            ></gree-switch>
          </gree-list-item>

          <gree-list-item header="柔顺剂使用量" :class="{opacity: disableSwitch || !autoMeek}" @click.native="switchRadio('roushunjitoufang', disableSwitch || !autoMeek)">
            <gree-row slot="title">
              <gree-radio :name="4" size="xl" v-model="roushunjitoufang" inline :disabled="Boolean(disableSwitch || !autoMeek )">极少</gree-radio>
              <gree-radio :name="1" size="xl" v-model="roushunjitoufang" inline :disabled="Boolean(disableSwitch || !autoMeek )">较少</gree-radio>
              <gree-radio :name="2" size="xl" v-model="roushunjitoufang" inline :disabled="Boolean(disableSwitch || !autoMeek )">适量</gree-radio>
              <gree-radio :name="3" size="xl" v-model="roushunjitoufang" inline :disabled="Boolean(disableSwitch || !autoMeek )">较多</gree-radio>
            </gree-row>
          </gree-list-item>

          <!-- 声音 -->
          <gree-list-item :title="$language('setUp.shengyin')" :class="{opacity: specialLock }">
            <gree-switch
              slot="after"
              v-model="voice"
              @change="handler('mute', voice)"
              :disabled="Boolean(specialLock)"
            ></gree-switch>
          </gree-list-item>

          <gree-list-item
            link
            class="arrow-set"
            :title="$language('setUp.restoreDefaultSettings')"
            :class="{opacity: isOpacity }"
            @click.native="restoreDefaults()"
          ></gree-list-item>
        </gree-list>

      </div>
    </div>

    <div style="display:none"> {{ childLock }}{{ washWeather }}{{ washTime }}{{ autoScour }} {{ autoMeek }} {{ mute }} {{ setMeek }} {{ setScour }} {{ autoOpenDoor }}</div>
  </gree-view>
</template>

<script>
import { List, Item, Dialog, Switch, DatePicker, Popup, Radio, RadioBox, Row } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { changeBarColorPlugin, showToastPlugin} from '../../api/pluginInterface';
import Header from '../../components/Header';
import { washList, modeIndexList } from '../../api/index';
import { GET_ONCE_STATES } from '../../store/types';


export default {
  components: {
    Header,
    [List.name]: List,
    [Item.name]: Item,
    [Switch.name]: Switch,
    [DatePicker.name]: DatePicker,
    [Popup.name]: Popup,
    [Radio.name]: Radio,
    [RadioBox.name]: RadioBox,
    [Row.name]: Row,
  },
  data() {
    return {
      washList,
      modeIndexList,
      CLockStatus: false, // 童锁
      openDoor: false, // 自动开门
      kanTianXiYi: false, // 看天洗衣
      kanShiXiYi: false, // 看时洗衣
      xidiji: false, // 洗涤机
      roushunji: false, // 柔顺剂
      xidijitoufang: 1, // 洗涤剂投放
      roushunjitoufang: 1, // 柔顺剂投放
      voice: false, // 声音
      isInvalid: false, // 是否禁用（柔顺剂、洗涤剂）
      InvalidList: [], // 柔顺剂、洗涤剂禁用列表，created时生成
      // 以下未用到
      autoDetermine: false,
      date: '请选择',
      time: '请选择',
      minDate: new Date('1970/1/1'),
      maxDate: new Date('2199/9/9'),
      currentDate: new Date(),
      isShowDay: false,
      isShowTime: false,
    };
  },
  computed: {
    ...mapState({
      mac: state => state.mac,
      devname: state => state.deviceInfo.name,
      Pow: state => state.dataObject.Pow,
      devState: state => state.dataObject.devState,
      JFerr: state => state.dataObject.JFerr,
      runStage: state => state.dataObject.runStage,
      washType: state => state.dataObject.washType, // 洗涤类型
      washMode: state => state.dataObject.washMode, // 洗涤模式

      order: state => state.dataObject.order, // 预约
      orderLaunch: state => state.dataObject.orderLaunch, // 预约启动0，暂停1
      

      specialLock: state => state.dataObject.specialLock, // 童锁是否生效
      
      /**
       * @description 童锁
       */
      childLock(state) {
        this.CLockStatus = Boolean(state.dataObject.childLock);
        return state.dataObject.childLock;
      },
      /**
     * @description 自动开门锁
     */
      autoOpenDoor(state) {
        this.openDoor = Boolean(state.dataObject.autoOpenDoor);
        return state.dataObject.autoOpenDoor;
      },
      /**
     * @description 看天洗衣
     */
      washWeather(state) {
        this.kanTianXiYi = Boolean(state.dataObject.washWeather);
        return state.dataObject.washWeather;
      },
      /**
     * @description 看时洗衣
     */
      washTime(state) {
        this.kanShiXiYi = Boolean(state.dataObject.washTime);
        return state.dataObject.washTime;
      },
      /**
     * @description 洗涤剂自动投放
     */
      autoScour(state) {
        this.xidiji = Boolean(state.dataObject.autoScour);
        return state.dataObject.autoScour;
      },
      /**
     * @description 洗涤剂投放量
     */
      setScour(state) {
        this.xidijitoufang = JSON.parse(JSON.stringify(state.dataObject.setScour));
        return state.dataObject.setScour;
      },

      /**
     * @description 柔软剂自动投放
     */
      autoMeek(state) {
        this.roushunji = Boolean(state.dataObject.autoMeek);
        return state.dataObject.autoMeek;
      },
      /**
     * @description 柔顺剂投放量
     */
      setMeek(state) {
        this.roushunjitoufang = JSON.parse(JSON.stringify(state.dataObject.setMeek));
        return state.dataObject.setMeek;
      },
      
      /**
     * @description 静音
     */
      mute(state) {
        this.voice = !state.dataObject.mute;
        return state.dataObject.mute;
      },
    }),
    
    /**
     * @description 是否禁用柔顺剂和洗涤剂
     */
    disableFun() {
      let value = this.runStage >= 84;
      return value;
    },

    /**
     * @description 特殊不显示
     */
    disableSwitch() {
      return Boolean(this.include([this.washType, this.washMode]) || this.isOpacity || this.disableFun);
    },

    /**
     * @description 是否透明显示
     */
    isOpacity() {
      return Boolean(this.specialLock || this.devState === 1 || this.devState === 3 || (this.order && this.orderLaunch));
    },

  },
  watch: {
    Pow(newV) {
      if (newV === 0) this.$router.push({ name: 'Home'});
    },

    devState(newV) {
      if (newV === 4) this.$router.push({name: 'Error'});
      if (newV === 3) this.$router.push({name: 'Startup'});
    },

    JFerr(newV) {
      if (newV) this.$router.push({name: 'Error'});
    }
  },

  /**
    * @description created 获取需要禁用洗涤剂、柔顺剂的list
  */
  created() {
    this.getNewStatus(this.mac);
    this.washList.forEach((element, washType) => {
      element.washMode.forEach(item => {
        if (item.otherFun) {
          this.InvalidList.push([washType, item.modeNum]);
        }
      });
    });
    this.init();
  },
  mounted() {
    changeBarColorPlugin('#F4F4F4');
  },
  beforeDestroy() {
    Dialog.closeAll(); // 关闭所有Dialog
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
      getNewStatus: GET_ONCE_STATES
    }),

    /**
    * @description 返回事件
    */
    clickBack() {
      if (this.devState === 1 || this.devState === 3) {
        this.$router.push({ name: 'Startup' });
        return;
      }

      if (this.devState === 2) {
        this.$router.go(-1);
        return;
      }
  
      this.$router.push({ name: 'Home' });
    },

    /**
    * @description created 获取需要禁用洗涤剂、柔顺剂的list
    * @return ture  false
    */
    include(child) {
      return JSON.stringify(this.InvalidList).indexOf(JSON.stringify(child)) > -1;
    },

    init() {
      this.CLockStatus = Boolean(this.childLock);
      this.openDoor = Boolean(this.autoOpenDoor);
      this.kanTianXiYi = Boolean(this.washWeather);
      this.kanShiXiYi = Boolean(this.washTime);
      this.xidiji = Boolean(this.autoScour);
      this.roushunji = Boolean(this.autoMeek);
      this.voice = !this.mute;
    },
    /**
    * @description 恢复默认设置
    */
    restoreDefaults() {
      if (this.devState === 1 || this.devState === 3 || this.specialLock) return;
      Dialog.confirm({
        title: '提示',
        content:
          '确认恢复默认设置？此操作将会重置任何已经设置的选择项，请谨慎操作',
        confirmText: '确定',
        onConfirm: () => {
          const setData = {
            childLock: 0,
            autoOpenDoor: 0,
            washWeather: 0,
            washTime: 0,
            autoScour: 1,
            autoMeek: 1,
            mute: 0,
            setScour: 2,
            setMeek: 2,
            flagSet: 1
          };
          this.setDataObject(setData);
          this.sendCtrl(setData);
        },
        cancelText: '取消',
        onCancel: () => console.log('已取消'),
      });
    },


    /**
     * @function handler
     * @description 所有开关处理
     * @param name dataObject里面的字段
     * @param value 选择的值
     */
    handler(name, value) {
      if (name !== 'childLock' && this.specialLock) {
        showToastPlugin('请先解锁童锁');
        return;
      }
      const obj = {
        flagSet: 1
      }; 
      const commitObj = {};  
      obj[name] = Number(value);
      if (name === 'childLock') {
        if ((value && this.devState === 1) || this.order) {
          commitObj.specialLock = 1;
        }
        if (!value) {
          commitObj.specialLock = 0;
        }
      }
      if (name === 'mute') obj[name] = Number(!value);
      this.setDataObject(Object.assign(commitObj, obj));
      this.sendCtrl(obj);
    },

    /**
     * @description 切换按钮
     */
    switchRadio(name, value) {
      if (!name || value) return;
      const obj = {
        flagSet: 1
      };
      if (name === 'roushunjitoufang') {
        obj.setMeek = this.roushunjitoufang;
      }
      if (name === 'xidijitoufang') {
        obj.setScour = this.xidijitoufang;
      }
      this.setDataObject(obj);
      this.sendCtrl(obj);
    },


    // 以下未用到
    onDatePickerInitialed() {
      console.log(
        `DatePicker getFormatDate: ${this.$refs.datePicker.getFormatDate(
          'yyyy/MM/dd',
        )}`,
      );
    },
    changeDay(columnsValue) {
      this.date = `${columnsValue[0].text}${columnsValue[1].text}${columnsValue[2].value}日`;
    },
    changeTime(columnsValue) {
      this.time = `${columnsValue[0].text}${columnsValue[1].text}`;
    },
  },
};
</script>
