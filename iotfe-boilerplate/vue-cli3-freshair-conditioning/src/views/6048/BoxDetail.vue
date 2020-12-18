<template>
  <gree-view bgColor='#F4F4F4'>
    <gree-header>{{ roomName }}</gree-header>
    <gree-page>
      <div class="page-main">
        <calibrationline/>
        <gree-list>
          <gree-list-item title = "PM2.5检测">
            <label slot="after">&nbsp;</label>
            <gree-switch
              slot="after"
              :value="PM2P5EN"
              @change="handler('PM2P5EN',  PM2P5EN, $event)"
            ></gree-switch>
          </gree-list-item>
          <gree-list-item title = "甲醛检测">
            <label slot="after">&nbsp;</label>
            <gree-switch
              slot="after"
              :value="HCHOEN" 
              @change="handler('HCHOEN', HCHOEN, $event)"
            ></gree-switch>
          </gree-list-item>
        </gree-list>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, List, Item, Switch } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  closePage,
  showToast
} from '../../../../static/lib/PluginInterface.promise';
import calibrationline from '../../components/Calibrationline';

export default {
  components: {
    calibrationline,
    [Header.name]: Header,
    [List.name]: List,
    [Item.name]: Item,
    [Switch.name]: Switch
  },
  data() {
    return {
      roomName: '空气盒子',
      controlNameList: ['PM2.5', 'CO2', '综合']
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      PM2P5EN: state => Boolean(state.dataObject.PM2P5EN),
      HCHOEN: state => Boolean(state.dataObject.HCHOEN),
      SorSet: state => state.dataObject.SorSet
    })
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
    edit() {
      this.textflag = false;
    },
    handler(name, active) {
      const val = active ? 0 : 1;
      let flag = this.SorSet;
      if (flag) {
        localStorage.setItem('SorSet', flag);
      } else {
        flag = Number(localStorage.getItem('SorSet'));
      }

      switch (name) {
        case 'PM2P5EN':
          if (flag !== 1 && flag !== 3) {
            this.setDataObject({ PM2P5EN: val });
            this.sendCtrl({ PM2P5EN: val });
          } else {
            showToast(
              `当前自动控制器传感器为${
                this.controlNameList[flag - 1]
              },不可关闭`,
              0
            );
          }
          break;
        case 'HCHOEN':
          if (flag !== 3) {
            this.setDataObject({ HCHOEN: val });
            this.sendCtrl({ HCHOEN: val });
          } else {
            showToast(
              `当前自动控制器传感器为${
                this.controlNameList[flag - 1]
              },不可关闭`,
              0
            );
          }

          break;
        default:
          break;
      }
    }
  }
};
</script>
