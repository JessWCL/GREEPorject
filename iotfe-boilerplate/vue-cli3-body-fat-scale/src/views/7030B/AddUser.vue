<template>
  <gree-view>
    <gree-page
      no-navbar
      class="page-adduser"
    >
      <div class="page-header">
        <gree-header 
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
        >
          Add User
          <a 
            slot="right" 
            @click="clickSave">Save</a>
        </gree-header>
        <gree-list>
          <gree-list-item 
            title="Profile" 
          >
            <div slot="after">
              <img 
                :src="persionimg" 
                alt="">
            </div>
          </gree-list-item>
          <gree-list-item 
          title="Name">
            <gree-input-item
              slot="after"
              placeholder="username"
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
                v-model="gender"/>Male </label> 
              <label><input
                ref="Female"
                type="radio" 
                value="2" 
                v-model="gender"/>Female </label> 
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
            today-text="Nowadays"
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
  InputItem,
  DatePicker,
  Toast
} from 'gree-ui';
import { mapState, mapActions } from 'vuex';
import { tuyaWeightAdd } from '../../../../static/lib/PluginInterface.promise';

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
    [InputItem.name]: InputItem,
    [DatePicker.name]: DatePicker,
    [Toast.component.name]: Toast.component
  },
  data() {
    return {
      gender: '1',
      persionimg: require('../../assets/images/headportrait.png'),
      isPopupShowHeight: {},
      isPopupShowBirthday: {},
      pickerData: Data1,
      pickerDefaultIndex: [170],
      pickerDefaultValue: [170],
      pickerValue: '170',
      PopstatusHeight: false,
      PopstatusBirthday: false,
      minDate: new Date('1900/8/8'),
      maxDate: new Date(),
      currentDate: new Date(),
      name: '',
      defaultDay: '',
      id: ''
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      mac: state => state.mac
    })
  },
  methods: {
    ...mapActions({
      getUserList: 'GET_USER_LIST'
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
      const birthday = this.$refs.datePicker
        ? this.$refs.datePicker.getFormatDate('yyyyMMdd')
        : '';
      const nickName = this.name;
      const sex = parseInt(this.gender, 10);
      const contact = '';
      const weight = '56';
      const height = this.pickerValue;
      const age = '18';
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
        weight,
        age
      });
      console.log(json);
      tuyaWeightAdd(this.mac, json)
        .then(res => {
          console.log('新增用户返回值', res);
          if (JSON.parse(res).code === 200) {
            Toast.succeed('Saved successfully');
            this.getUserList();
          } else {
            Toast.succeed(`Save failed${res.message.msg}`);
          }
        })
        .catch(e => {
          console.log('err', e);
        });
      this.$router.push({ name: 'Home' });
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
    resetSettings() {
      this.round = true;
      this.color = undefined;
      this.minDate = undefined;
      this.maxDate = undefined;
      this.position = undefined;
      this.formatter = undefined;
      this.showConfirm = true;
    },
    show(type, id) {
      this.resetSettings();
      this.id = id;
      this.type = type;
      this.showCalendar = true;
      switch (id) {
        case 'quickSelect1':
          break;
        case 'quickSelect2':
          this.showConfirm = false;
          break;
        default:
          break;
      }
    },
    // eslint-disable-next-line consistent-return
    formatDate(date) {
      if (date) {
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }
    },
    // eslint-disable-next-line consistent-return
    formatFullDate(date) {
      if (date) {
        return `${date.getFullYear()}/${this.formatDate(date)}`;
      }
    },
    // eslint-disable-next-line consistent-return
    formatRange(dateRange) {
      if (dateRange.length) {
        const [start, end] = dateRange;
        return `${this.formatDate(start)} - ${this.formatDate(end)}`;
      }
    },
    onConfirm(date) {
      this.showCalendar = false;
      this.date[this.id] = date;
    },
    onCancel() {
      this.showCalendar = false;
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
