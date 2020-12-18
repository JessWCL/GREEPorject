<template>
  <gree-view>
    <gree-page
      no-navbar
      class="page-editpersional"
    >
      <div class="page-header">
        <gree-header 
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
        >
          Edit Persionsal Information
          <a 
            slot="right" 
            @click="clickSave">Save</a>
        </gree-header>
        <gree-list>
          <gree-list-item 
            title="Profile"
            link>
            <div 
            slot="after">
              <img 
                :src="persionimg" 
                alt="">
            </div>
          </gree-list-item>
          <gree-list-item 
          title="Name">
            <gree-input-item
              slot="after"
              placeholder="请输入用户名(限制10位)"
              clearable
              align="right"
              :maxlength="10"
              v-model="name"
            ></gree-input-item> 
          </gree-list-item>
          <gree-list-item title="Gender">
            <div slot="after">
              <label><input 
                ref="Male" 
                type="radio" 
                value="1" 
                v-model="currentSex"/>Male </label> 
              <label><input 
                ref="Female" 
                type="radio" 
                value="2" 
                v-model="currentSex"/>Female </label> 
            </div>
          </gree-list-item>
          <gree-list-item 
            title="Birthday"
            :after="defaultDay" 
            link 
            @click.native="selectedBirthday()">
          </gree-list-item>
          <gree-list-item 
            title="Height" 
            :after="`${pickerValue}cm`" 
            link
            @click.native="selectedHeight()">
          </gree-list-item>
        </gree-list>
      </div>
      <div 
        class="page-bottom"
        @click="showConfirmDelete()">
        <span>Delete</span>
      </div>
      <gree-popup 
        v-model="isPopupShowBirthday.bottom" 
        position="bottom">
        <div 
          class="popup-bottom" 
          v-if="PopstatusBirthday">
          <div 
            class="arrow-down" 
            @click="hidePopUpBirthday('bottom')"></div>
          <gree-date-picker 
            ref="datePicker"
            today-text="今天"
            :min-date="minDate"
            :max-date="maxDate"
            :default-date="currentDate"
            is-view
            @initialed="onDatePickerInitialed"
            @change="DateChange"
          />
        </div>
      </gree-popup>
      <gree-popup 
        v-model="isPopupShowHeight.bottom" 
        position="bottom">
        <div 
          class="popup-bottom" 
          v-if="PopstatusHeight">
          <div 
            class="arrow-down" 
            @click="hidePopUpHeight('bottom')"></div>
          <gree-picker
            class="gree-picker-extend"
            ref="picker"
            :data="pickerData"
            :cols="1"
            :line-height="90"
            :default-index="pickerDefaultIndex"
            :default-value="pickerDefaultValue"
            is-view
            @initialed="onPickerInitialed"
            @change="onPickerConfirm"
          ></gree-picker>
        </div>
      </gree-popup>
    </gree-page>
  </gree-view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  Header,
  Icon,
  Dropdown,
  DropdownItem,
  List,
  Item,
  Calendar,
  ActionSheet,
  Popup,
  Row,
  Picker,
  Dialog,
  InputItem,
  DatePicker,
  Toast
} from 'gree-ui';
import dayjs from 'dayjs';

let Data1 = [];
for (let i = 1; i < 300; i += 1) {
  Data1[i - 1] = { text: `${i}`, value: i };
}
Data1 = [Data1];

export default {
  components: {
    [Header.name]: Header,
    [Icon.name]: Icon,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [List.name]: List,
    [Item.name]: Item,
    [Calendar.name]: Calendar,
    [ActionSheet.name]: ActionSheet,
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Picker.name]: Picker,
    [Dialog.name]: Dialog,
    [InputItem.name]: InputItem,
    [DatePicker.name]: DatePicker,
    [Toast.component.name]: Toast.component
  },
  data() {
    return {
      gender: 'Male',
      persionimg: require('../../assets/images/headportrait.png'),
      isPopupShowHeight: {},
      isPopupShowBirthday: {},
      pickerData: Data1,
      pickerDefaultIndex: [170],
      pickerDefaultValue: [170],
      pickerValue: '170',
      PopstatusHeight: false,
      PopstatusBirthday: false,
      defaultDay: '',
      minDate: new Date('1900/8/8'),
      maxDate: new Date(),
      currentDate: new Date(),
      name: '',
      currentSex: ''
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      nick_name: state => state.currentUserMessage.nick_name,
      sex: state => state.currentUserMessage.sex,
      birthday: state => state.currentUserMessage.birthday,
      height: state => state.currentUserMessage.height,
      user_id: state => state.currentUserMessage.user_id,
      contact: state => state.currentUserMessage.contact,
      age: state => state.currentUserMessage.age
    })
  },
  mounted() {
    this.name = this.nick_name;
    this.currentSex = this.sex;
    this.pickerValue = this.height;
    this.defaultDay = `${JSON.stringify(this.birthday).slice(
      1,
      5
    )}-${JSON.stringify(this.birthday).slice(5, 7)}-${JSON.stringify(
      this.birthday
    ).slice(7, 9)}`;
    const ct = new Date(this.defaultDay.replace(/-/g, '/'));
    ct.setFullYear(ct.getFullYear());
    this.currentDate = ct;
  },
  methods: {
    ...mapActions({
      getUserUpdate: 'GET_USER_UPDATE',
      getUserDelete: 'GET_USER_DELETE',
      setUserSave: 'SET_USER_SAVE'
    }),
    /**
     * @description 返回键
     */
    goBack() {
      if (this.$route.path !== '/') {
        this.$router.back(-1);
      }
    },
    clickSave() {
      console.log('save');
      let birthday = '';
      if (this.PopstatusBirthday) {
        birthday = this.$refs.datePicker.getFormatDate('yyyyMMdd');
      } else {
        birthday = dayjs(this.defaultDay).format('YYYYMMDD');
      }
      const contact = this.contact;
      const height = this.pickerValue;
      const nickName = this.name;
      const sex = this.currentSex;
      const userId = this.user_id;
      const age = this.age;
      const weight = parseInt('58', 10);
      if (!nickName) {
        Toast.failed('name cannot be empty', 1500, true, true);
        return;
      } else if (!birthday) {
        Toast.failed('birthday cannot be empty', 1500, true, true);
        return;
      }
      const json = JSON.stringify({
        birthday,
        contact,
        height,
        nickName,
        sex,
        userId,
        weight,
        age
      });
      console.log(json);
      this.getUserUpdate(json).then(async res => {
        if (JSON.parse(res).code === 200) {
          await this.setUserSave({
            key: 'user',
            value: {
              birthday,
              contact,
              height,
              nick_name: nickName,
              sex,
              user_id: userId,
              weight,
              age
            },
            status: true
          });
          Toast.succeed('Saved successfully', 500, true, true);
          this.$router.push({ name: 'Home' });
        } else {
          Toast.failed(JSON.parse(res).msg, 500, true, true);
        }
      });
    },
    selected(item) {
      console.log('action-sheet selected:', JSON.stringify(item));
    },
    cancel() {
      console.log('action-sheet cancel');
    },
    selectedPopup(index) {
      console.log(index);
    },
    showPopUpHeight(type) {
      this.$set(this.isPopupShowHeight, type, true);
    },
    showPopUpBirthday(type) {
      this.$set(this.isPopupShowBirthday, type, true);
    },
    hidePopUpHeight(type) {
      this.$set(this.isPopupShowHeight, type, false);
    },
    hidePopUpBirthday(type) {
      this.$set(this.isPopupShowBirthday, type, false);
    },
    selectedHeight() {
      this.showPopUpHeight('bottom');
      this.PopstatusHeight = true;
    },
    selectedBirthday() {
      this.showPopUpBirthday('bottom');
      this.PopstatusBirthday = true;
    },
    onPickerInitialed() {
      const columnValues = this.$refs.picker.getColumnValues();
      // eslint-disable-next-line no-unused-vars
      let value = '';
      columnValues.forEach(item => {
        value += `${item.value}-`;
      });
    },
    onPickerConfirm(columnIndex, itemIndex, value) {
      if (value) {
        this.pickerValue = value.text;
        console.log(this.pickerValue);
      }
    },
    showConfirmDelete() {
      Dialog.confirm({
        title: 'Notifications',
        content: 'Do you confirm deleting this user？',
        confirmText: 'Delete',
        onConfirm: () => {
          this.getUserDelete(this.user_id).then(async res => {
            if (JSON.parse(res).code === 200) {
              await this.setUserSave({
                key: 'user',
                value: '',
                status: true
              }); // 删除用户则清除缓存记录的用户信息
              Toast.succeed('successfully deleted', 1500, true, true);
              this.$router.push({ name: 'Home' });
            } else {
              Toast.failed(JSON.parse(res).msg, 1500, true, true);
            }
          });
        },
        cancelText: 'Cancel',
        onCancel: () => console.log('[Dialog.confirm] cancel clicked')
      });
    },
    onDatePickerInitialed() {
      /* eslint no-console: off */
      console.log(
        `DatePicker getFormatDate: ${this.$refs.datePicker.getFormatDate(
          'yyyy-MM-dd'
        )}`
      );
      // this.defaultDay = this.$refs.datePicker.getFormatDate('yyyy-MM-dd');
    },
    // eslint-disable-next-line no-unused-vars
    DateChange(columnIndex, itemIndex, value) {
      // console.log(
      //   `DatePicker getFormatDate: ${this.$refs.datePicker.getFormatDate(
      //     'yyyy-MM-dd'
      //   )}`
      // );
      this.defaultDay = this.$refs.datePicker.getFormatDate('yyyy-MM-dd');
    }
  }
};
</script>
