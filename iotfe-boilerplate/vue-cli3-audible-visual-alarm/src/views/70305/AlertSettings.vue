<template>
  <gree-view>
    <gree-header>
      {{ $language('alertSettings.title') }}
      <!-- <a slot="right" @click="clickSave">{{ $language('alertSettings.save') }}</a> -->
    </gree-header>
    <gree-page class="page-setting">
      <gree-list>
        <!-- <gree-list-item :title="$language('alertSettings.notification1')">
          <gree-switch
            slot="after"
            v-model="isActive1"
            @change="switchHandler('switch', isActive1, $event)"
          ></gree-switch>
        </gree-list-item> -->
        <!-- <gree-list-item :title="$language('alertSettings.audible')">
          <gree-switch
            slot="after"
            v-model="AudibleActive"
            @change="switchHandler('switch', AudibleActive, $event)"
          ></gree-switch>
        </gree-list-item>
        <gree-list-item :title="$language('alertSettings.bright')">
          <gree-switch
            slot="after"
            v-model="BrightActive"
            @change="switchHandler('switch', BrightActive, $event)"
          ></gree-switch>
        </gree-list-item> -->
        <!-- <gree-list-item link :title="$language('alertSettings.settings1')" @click.native="soundsClick" :text="alarmSound" >
        </gree-list-item> -->
        <gree-list-item id="sound_duration_bar" link :title="$language('alertSettings.duration')" @click.native="durationClick" :text="soundDuration + 's'">
        </gree-list-item>
      </gree-list>
    </gree-page>
  </gree-view>
</template>

<script>
import { 
  View, 
  Page, 
  Header, 
  List, 
  Item, 
  Switch, 
  // Toast,
} from 'gree-ui';
import { mapState } from 'vuex';
import { tuyaControlDev } from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [View.name]: View,
    [Page.name]: Page,
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    [Switch.name]: Switch
  },
  data() {
    return {
      isActive1: true,
      alarmSound: 'Alarm Sound 1',
      AudibleActive: true,
      BrightActive: true,
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      devId: state => state.dataObject.deviceId,
      alarmSetting: state => {
        const alarmSetting = state.dataObject.properties.find(el => {
          return el.code === 'alarm_setting';
        });
        return ~~alarmSetting.value;
      },
      soundDuration: state => {
        const alarmTime = state.dataObject.properties.find(el => {
          return el.code === 'alarm_time';
        });
        return alarmTime.value;
      },
    }),
  },
  watch: {
    alarmSetting(newVal) {
      switch (newVal) {
        case 0:
          this.AudibleActive = true;
          this.BrightActive = false;
          break;
        case 1:
          this.AudibleActive = false;
          this.BrightActive = true;
          break;
        case 2:
          this.AudibleActive = true;
          this.BrightActive = true;
          break;
        case 3:
          this.AudibleActive = false;
          this.BrightActive = false;
          break;
        default:
          console.warn(`alarmSetting: ${newVal}`);
      }
    }
  },
  methods: {
    switchHandler(name, active) {
      console.log(name);
      console.log(active);
    },
    clickSave(...arg) {
      console.log(arg);
      const devId = this.devId;
      const key = 'alarm_setting';
      let value = 2;
      if (this.AudibleActive && this.BrightActive) { // 声光
        value = 2;
      } else if (this.AudibleActive) { // 仅声
        value = 0;
      } else if (this.BrightActive) { // 仅光
        value = 1;
      } else { // 取消
        value = 3;
      }
      console.log(`
        devId: ${devId},
        key: ${key},
        value: ${value},
      `);
      tuyaControlDev(devId, key, value)
        .then(res => {
          console.log('AlertSetting.vue > tuyaControlDev');
          console.log(res);
          // Toast.succeed('保存成功');
        })
        .catch(err => console.error(err));
    },
    soundsClick() {
      // console.log(arg);
      this.$router.push('/AlarmSounds');
    },
    durationClick() {
      this.$router.push('/SoundsDuration');
    },
  }
};
</script>

<style lang="scss" scoped >
  a{
    color: inherit;
    text-decoration: none;
  }
</style>
<style lang="scss">
  #sound_duration_bar {
    .item-content {
      .item-inner {
        .item-after{
          color: #999;
        }
      }
    }
  }
</style>
