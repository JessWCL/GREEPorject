<template>
  <gree-view>
    <gree-page>
      <gree-header>{{ roomName }}</gree-header>
      <div class="page-main">
        <calibrationline/>
        <gree-list>
          <ul>
            <div
              class="item-content"
            >
              <div class="item-inner">
                <!-- item-title -->
                <div 
                  class="item-title extend-title"
                >名字</div>
                <!-- item-after -->
                <div 
                  v-if="textflag"
                  class="item-after extend-title" 
                  @click="edit()"
                >{{ roomName }}</div>
                <input 
                  class="edit-text"
                  type="text" 
                  v-else
                  @change="input()" 
                  ref="inputValue"/>
              </div>
            </div>
          </ul>
          <gree-list-item title = "开启空气盒子">
            <label slot="after">&nbsp;</label>
            <gree-switch
              slot="after"
              v-model="DataBoxData[GasN].GasAvail"
              @change="handler('GasAvail', Boolean(DataBoxData[GasN].GasAvail), $event)"
            ></gree-switch>
          </gree-list-item>
          <gree-list-item title = "设为主空气盒子">
            <label slot="after">&nbsp;</label>
            <gree-switch
              slot="after"
              v-model="DataBoxData[GasN].GasMas"
              @change="handler('GasMas',  Boolean(DataBoxData[GasN].GasMas), $event)"
            ></gree-switch>
          </gree-list-item>
          <gree-list-item title = "呼吸灯">
            <label slot="after">&nbsp;</label>
            <gree-switch
              slot="after"
              v-model="DataBoxData[GasN].GasMod"
              @change="handler('GasMod',  Boolean(DataBoxData[GasN].GasMod), $event)"
            ></gree-switch>
          </gree-list-item>
          <gree-list-item title = "PM2.5检测">
            <label slot="after">&nbsp;</label>
            <gree-switch
              slot="after"
              v-model="DataBoxData[GasN].PM2P5Sta"
              @change="handler('PM2P5Sta',  Boolean(DataBoxData[GasN].PM2P5Sta), $event)"
            ></gree-switch>
          </gree-list-item>
        </gree-list>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { closePage } from '../../../../static/lib/PluginInterface.promise';
import calibrationline from '../../components/Calibrationline';
import * as type from '@/store/types';

export default {
  components: {
    calibrationline 
  },
  data() {
    return {
      textflag: true,
      roomName: '123',
      isActive:'',
      item: {
        name: '123',
        text: '456'
      },
    };
  },
  computed: {
    ...mapState({
      dataObject: state => state.dataObject,
      ScrTime: state => state.dataObject.ScrTime,
      Name:function(state){
       return state.homeName[state.GasN].room
      },
      GasN: state => state.GasN,
      BoxParameterstList: state => state.BoxParameterstList,
      DataBoxData: state => state.DataBoxData,
    })
  },
  created() {
    this.roomName = this.Name;
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
    input() {
      this.roomName = this.$refs.inputValue.value;
      //this.$store.commit(`${type.SET_HOME`${this.GasN}_OBJECT}`,this.roomName)
      if (this.GasN === 0){
        this.$store.commit(type.SET_HOME0_OBJECT,this.roomName)
      }else if (this.GasN ===1){
         this.$store.commit(type.SET_HOME1_OBJECT,this.roomName)
      }
      this.textflag = true;
    },
    handler(name, active) {
      const val = active? 1 : 0;
      switch(name){
        case "GasAvail":
          this.setDataObject({ GasAvail: val});
          this.sendCtrl({ GasAvail: val }); 
        break; 
        case "GasMas":
          this.setDataObject({ GasMas: val});
          this.sendCtrl({ GasMas: val }); 
        break; 
        case "GasLED":
          this.setDataObject({ GasLED: val});
          this.sendCtrl({ GasLED: val }); 
        break; 
        case "GasMod":
          this.setDataObject({ GasMod: val});
          this.sendCtrl({ GasMod: val }); 
          this.setDataObject({ GasLED: val});
          this.sendCtrl({ GasLED: val });        
        break; 
        case "PM2P5Sta":
          this.setDataObject({ PM2P5Sta: val});
          this.sendCtrl({ PM2P5Sta: val }); 
        break; 
        default:
            break;
      }
  
    }
  }
};
</script>
