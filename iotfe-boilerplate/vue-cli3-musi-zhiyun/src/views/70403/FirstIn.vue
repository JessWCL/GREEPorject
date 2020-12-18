<!--
 * @Author: Jerry-Rain
 * @Date: 2019-08-09 14:43:49
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2020-05-13 15:28:50
 * @Description: 首次进入插件，完善个人信息
 -->
<template>
  <gree-view class="page-first-in" bg-color="#3674E7">
    <gree-header
      :style="{ backgroundImage: 'url(' + head_bg + ')' }"
      :left-options="{ preventGoBack: true }"
      @on-click-back="goBack()"
    >
      <span v-show="!flag" slot="right" @click="submit()">保存</span>
      编辑个人信息
    </gree-header>
    <gree-page class="page-content">
      <div
        class="header-block"
        :style="{ backgroundImage: 'url(' + head_bg + ')' }"
      >
        <div class="header-content">
          <img :src="userIcon"/>
          <gree-row>{{ nickName }}</gree-row>
          <gree-row>请完善个人信息</gree-row>
        </div>
      </div>
      <gree-field>
        <gree-input-item
          v-model="height"
          title="身高cm"
          placeholder="请填写身高cm"
          align="right"
          type="digit"
          maxlength="3"
        ></gree-input-item>
        <gree-input-item
          v-model="weight"
          title="体重kg"
          placeholder="请填写体重kg"
          align="right"
          type="digit"
          maxlength="3"
        ></gree-input-item>
        <gree-input-item
          title="出生日期"
          :placeholder="bornDateTxt"
          align="right"
          @click.native="showBornDate()"
          readonly
        >
          <gree-icon name="arrow-right" slot="right" />
        </gree-input-item>
        <gree-input-item
          v-model="continuousDays"
          title="月经长度"
          placeholder="参考值（3-10）"
          align="right"
          type="digit"
          maxlength="2"
          id="test"
        ></gree-input-item>
        <gree-input-item
          v-model="menstrualCycle"
          title="月经周期"
          placeholder="参考值（26-35）"
          align="right"
          type="digit"
          maxlength="2"
        ></gree-input-item>
        <gree-input-item
          title="上一周期"
          :placeholder="beforeDateTxt"
          align="right"
          @click.native="showBeforeDate()"
          readonly
        >
          <gree-icon name="arrow-right" slot="right" />
        </gree-input-item>
        <gree-input-item title="是否备孕" readonly>
          <div slot="right" v-for="(item, index) in modelTypeList" :key="index">
            <gree-radio
              v-model="modelType"
              :name="item.name"
              icon
              icon-inverse
              icon-disabled
              :label="item.label"
              inline
            ></gree-radio>
          </div>
        </gree-input-item>
        <gree-input-item title="生理阶段" readonly>
          <div slot="right" v-for="(item, index) in phStateList" :key="index">
            <gree-radio
              v-model="phState"
              :name="item.name"
              icon
              icon-inverse
              icon-disabled
              :label="item.label"
              inline
            ></gree-radio>
          </div>
        </gree-input-item>
      </gree-field>
      <gree-row v-show="flag === 400" class="bottom-btn">
        <gree-col
        ><gree-button @click.native="skip()" round
        >下次填写</gree-button
        ></gree-col
        >
        <gree-col
        ><gree-button @click.native="submit()" round
        >确认</gree-button
        ></gree-col
        >
      </gree-row>
    </gree-page>
    <gree-popup v-model="isBornShow" position="bottom" :mask-closable="true">
      <gree-row class="title">请选择出生日期</gree-row>
      <gree-date-picker
        ref="datePicker"
        today-text="今天"
        :min-date="bornMinDate"
        :max-date="currentDate"
        :default-date="bornCurrentDate"
        is-view
        :line-height="50"
        @initialed="onDatePickerInitialed"
        @change="changBornDate"
      ></gree-date-picker>
      <gree-row class="bottom"
      ><gree-col @click.native="cancelBorn()">取消</gree-col
      ><gree-col @click.native="saveBorn()">保存</gree-col></gree-row
      >
    </gree-popup>
    <gree-popup v-model="isBeforeShow" position="bottom" :mask-closable="true">
      <gree-row class="title">请选择上一周期日期</gree-row>
      <gree-date-picker
        ref="datePicker2"
        today-text="今天"
        :min-date="beforeMinDate"
        :max-date="currentDate"
        :default-date="beforeDefault"
        is-view
        :line-height="50"
        @initialed="onDatePickerInitialed"
        @change="changBeforeDate"
      ></gree-date-picker>
      <gree-row class="bottom"
      ><gree-col @click.native="cancelBefore()">取消</gree-col
      ><gree-col @click.native="saveBefore()">保存</gree-col></gree-row
      >
    </gree-popup>
  </gree-view>
</template>

<script>
import dayjs from 'dayjs';
import {
  Header,
  Field,
  InputItem,
  List,
  Item,
  Icon,
  Button,
  Radio,
  Row,
  Col,
  DatePicker,
  Popup,
  PopupTitleBar,
} from 'gree-ui';
import {
  closePage,
  editDevice,
  showLoading,
  hideLoading,
  musiGetData,
  showToast,
  getDerucciUserInformation
} from '../../../../static/lib/PluginInterface.promise';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'FirstIn',
  components: {
    [Header.name]: Header,
    [Field.name]: Field,
    [InputItem.name]: InputItem,
    [List.name]: List,
    [Item.name]: Item,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Radio.name]: Radio,
    [Row.name]: Row,
    [Col.name]: Col,
    [DatePicker.name]: DatePicker,
    [Popup.name]: Popup,
    [PopupTitleBar.name]: PopupTitleBar,
  },
  data() {
    return {
      flag: 400, // 400代表还未填写，需要显示下面按钮
      head_bg: require('@/assets/img/bg_header_on.png'),

      bornMinDate: new Date('1960/01/01'),
      beforeMinDate: new Date('2020/01/01'),
      bornCurrentDate: new Date('1995/01/01'),
      currentDate: new Date(),
      beforeDefault: new Date(),
      isBornShow: false,
      isBeforeShow: false,
      bornDateTxt: '选择日期',
      beforeDateTxt: '选择日期',

      birthday: '2000/12/30 08:44:10', // 生日
      height: null, // 身高
      weight: null, // 体重
      lastOnsetStart: '2019/11/30 08:44:10', // 上次来的时间
      continuousDays: null, // 上次的天数
      menstrualCycle: null, // 上次的周期
      modelType: '1', // 模式选择 1否  2是备孕
      phState: '4', // 阶段

      phStateList: [
        { name: '1', label: '哺乳' },
        { name: '2', label: '妊娠' },
        { name: '3', label: '绝经' },
        { name: '4', label: '正常' },
      ],
      modelTypeList: [
        { name: '2', label: '否' },
        { name: '1', label: '是' },
      ],
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac,
      userData: state => state.apiObject.userData,
      userIcon: state => state.apiObject.userIcon,
      nickName: state => state.apiObject.nickName,
    }),
  },
  watch: {},
  mounted() {
    this.init(); // 初始化
  },
  methods: {
    ...mapMutations({
      setApiObj: 'SET_API_OBJECT'
    }),
    // 初始化
    async init() {
      this.resizeScreen(); // 监听输入结束恢复页面
      this.flag = this.$route.query.flag; // 判断是否显示 保存
      console.log('flag: ', this.flag);
      this.flag !== 400 ? this.reFillData() : ''; // 信息回填
      this.nickName === '小智' ? await this.getGreeIcon() : ''; // 获取头像
      // this.reFillData(); // 信息回填
    },
    // 信息回填
    reFillData() {
      this.bornDateTxt = dayjs(this.userData.birthday).format('YYYY/MM/DD'); // 生日
      this.height = this.userData.height; // 身高
      this.weight = this.userData.weight; // 体重
      this.beforeMinDate = new Date(this.userData.lastOnsetStart); // 上次来的时间
      this.beforeDateTxt = dayjs(this.userData.lastOnsetStart).format('YYYY/MM/DD'); // 修改默认时间
      this.continuousDays = this.userData.continuousDays; // 上次的天数
      this.menstrualCycle = this.userData.menstrualCycle; // 上次的周期
      this.modelType = this.userData.modelType.toString(); // 模式选择
      this.phState = this.userData.phState.toString(); // 阶段  
    },
    // 获取用户头像名字
    async getGreeIcon() {
      showLoading();
      console.log('获取头像');
      await getDerucciUserInformation().then(res => {
        hideLoading();
        const { nickName, icon } = JSON.parse(res);
        console.log('头像&名字： ', nickName);
        this.setApiObj({ userIcon: `data:image/png;base64,${icon}` });
        this.setApiObj({ nickName });
      })
        .catch(err => {
          console.log('', err);
          hideLoading();
        });
    },
    // 获取信息
    getInfo() {
      showLoading();
      musiGetData(this.mac, {}, 'getDerucciGetLadyInfo')
        .then(res => {
          const result = JSON.parse(res);
          const { code } = result;
          code === '400' ? this.flag = true : this.flag = false;
          console.log('获取成功', result);
          hideLoading();
        })
        .catch(err => {
          // console.log('', err);
          hideLoading();
        });
    },
    // 保存信息
    submit() {
      const data = {
        birthday: this.birthday, // 生日
        height: parseInt(this.height), // 身高
        weight: this.weight, // 体重
        lastOnsetStart: this.lastOnsetStart, // 上次来的时间
        continuousDays: parseInt(this.continuousDays), // 上次的天数
        menstrualCycle: parseInt(this.menstrualCycle), // 上次的周期
        modelType: parseInt(this.modelType), // 模式选择
        phState: parseInt(this.modelType), // 阶段
      };
      console.table('提交的信息：', data);
      if (
        this.birthday &&
        this.height &&
        this.weight &&
        this.lastOnsetStart &&
        this.continuousDays &&
        this.menstrualCycle &&
        this.modelType &&
        this.phState
      ) {
        showLoading();
        showToast('正在提交', false);
        musiGetData(this.mac, data, 'getDerucciGetBedStatus')
          .then(res => {
            console.log('保存成功：', JSON.parse(res));
            hideLoading();
            this.$router.repalce({ name: 'HomePage' });
          })
          .catch(err => {
            // console.log('', err);
            hideLoading();
          });
      } else {
        showToast('信息未填写完整', false);
        console.log('信息未填写完整');
      }
    },
    goBack() {
      this.flag !== 400 ? closePage() : this.$router.replace({ name: 'HomePage' }); // 信息回填
    },
    moreInfo() {
      editDevice(this.mac);
    },
    // 跳过
    skip() {
      this.$router.replace({ name: 'HomePage' });
    },
    // 打开时间选择框
    showBornDate() {
      this.bornCurrentDate = new Date(this.bornDateTxt);
      this.isBornShow = true;
      this.$nextTick(() => {
        this.$refs.datePicker.$_initPicker();
      });
    },
    // 打开时间选择框
    showBeforeDate() {
      this.beforeDefault = new Date(this.beforeDateTxt);
      this.isBeforeShow = true;
      this.$nextTick(() => {
        this.$refs.datePicker2.$_initPicker();
      });
    },
    // 选择时间后改变txt
    changBornDate(columnIndex, itemIndex, value) {
      this.bornDateTxt = this.$refs.datePicker.getFormatDate('yyyy/MM/dd');
    },
    changBeforeDate(columnIndex, itemIndex, value) {
      this.beforeDateTxt = this.$refs.datePicker2.getFormatDate('yyyy/MM/dd');
    },
    saveBorn() {
      this.isBornShow = false;
      this.bornDateTxt === '选择日期' ? (this.bornDateTxt = '1900-01-01') : '';
      this.birthday = `${this.$refs.datePicker.getFormatDate(
        'yyyy/MM/dd',
      )} 00:00:00`;
      console.log('%c data - 出生日期', 'color: red;', this.birthday);
    },
    saveBefore() {
      this.isBeforeShow = false;
      this.beforeDateTxt === '选择日期'
        ? (this.beforeDateTxt = '2020-01-01')
        : '';
      this.lastOnsetStart = `${this.$refs.datePicker2.getFormatDate(
        'yyyy/MM/dd',
      )} 00:00:00`;
      console.log('%c data - 上一次周期', 'color: red;', this.lastOnsetStart);
    },
    cancelBorn() {
      this.isBornShow = false;
    },
    cancelBefore() {
      this.isBeforeShow = false;
    },
    // 监听输入结束恢复页面
    resizeScreen() {
      window.addEventListener('focusout', () => {
        window.scrollTo(0, 0);
      });
      this.$once('hook:destroyed', () => {            
        window.removeEventListener('focusout', {});
      });
    },
    onDatePickerInitialed() {},
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/FirstIn.scss';
</style>
