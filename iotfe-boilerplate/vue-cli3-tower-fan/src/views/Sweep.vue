<template>
  <gree-view>
    <gree-page 
      no-navbar
      class="page-sweep"
    >
      <gree-header>
        {{ $language('sweep.title') }}
        <a
          slot="right"
          @click="save"
        >{{ $language('home.btnSave') }}</a>
      </gree-header>
      <div class="content">
        <div class="top-bar">
          <span>摇头角度</span>
          <button
            class="switch"
            :class="{ active: isRotateOn }"
            @click="toggleSwitch"
          />
        </div>
        <gree-picker
          v-show="isRotateOn"
          class="angle-picker"
          ref="anglePicker"
          :data="pickerData"
          :cols="1"
          :line-height="90"
          is-view
          :multi-line="false"
          :default-value="defaultRotateAg"
        ></gree-picker>
      </div>
    </gree-page>
  </gree-view>
</template>
<script>
import { Header, Row, Col, Picker } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    [Header.name]: Header,
    [Row.name]: Row,
    [Col.name]: Col,
    [Picker.name]: Picker
  },
  data() {
    return {
      isRotateOn: false,
      pickerData: [
        [
          {
            text: '60',
            value: 12
          },
          {
            text: '100',
            value: 20
          },
          {
            text: '360',
            value: 72
          }
        ]
      ],
      defaultRotateAg: [12]
    };
  },
  computed: {
    ...mapState({
      Rotate: state => state.dataObject.Rotate,
      LRAngle: state => state.dataObject.LRAngle,
      Pow: state => state.dataObject.Pow
    }),
  },
  watch: {
    LRAngle(val) {
      console.log(val);
      if (this.Rotate) {
        this.defaultRotateAg = [val];
        this.$refs.anglePicker.refresh();
      }
    },
    Rotate(val) {
      this.isRotateOn = Boolean(val);
      this.$refs.anglePicker.refresh();
    },
    Pow(val) {
      if (!val) {
        this.$router.push('/');
      }
    }
  },
  mounted() {
    console.log('ag', this.LRAngle);
    this.isRotateOn = Boolean(this.Rotate);
    this.defaultRotateAg = [this.LRAngle === 0 ? 12 : this.LRAngle];
    this.$refs.anglePicker.refresh();
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    save() {
      const cmd = {};
      cmd.Rotate = this.isRotateOn ? 1 : 0;
      cmd.LRAngle = this.$refs.anglePicker.getColumnValue(0).value;
      this.setDataObject(cmd);
      this.sendCtrl(cmd);
      this.$router.push('/');
    },
    toggleSwitch() {
      this.isRotateOn = !this.isRotateOn;
      this.$refs.anglePicker.refresh();
    }
  }
};
</script>
