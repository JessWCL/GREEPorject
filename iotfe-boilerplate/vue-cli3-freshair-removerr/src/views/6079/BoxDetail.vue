<template>
  <gree-view bgColor='#F4F4F4'>
    <gree-header>{{ roomName }}</gree-header>
    <gree-page>
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
              v-model="GasAvail" 
              @change="handler('GasAvail', GasAvail, $event)"
            ></gree-switch>
          </gree-list-item>
          <gree-list-item title = "设为主空气盒子">
            <label slot="after">&nbsp;</label>
            <gree-switch
              slot="after"
              v-model="GasMas"
              @change="handler('GasMas',  GasMas, $event)"
            ></gree-switch>
          </gree-list-item>
          <gree-list-item title = "呼吸灯">
            <label slot="after">&nbsp;</label>
            <gree-switch
              slot="after"
              v-model="GasMod"
              @change="handler('GasMod',  GasMod, $event)"
            ></gree-switch>
          </gree-list-item>
          <gree-list-item title = "PM2.5检测">
            <label slot="after">&nbsp;</label>
            <gree-switch
              slot="after"
              v-model="PM2P5Sta"
              @change="handler('PM2P5Sta',  PM2P5Sta, $event)"
            ></gree-switch>
          </gree-list-item>
        </gree-list>
      </div>
      <div v-show="false">{{ DataBoxData }}</div>
      <div v-show="false">{{ Name }}</div>
    </gree-page>
  </gree-view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { closePage, showToast } from '../../../../static/lib/PluginInterface.promise';
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
      GasAvail:'',
      GasLED:'',
      GasMod:'',
      GasMas:'',
      PM2P5Sta:'',
      SorErr:'',
      CommErr:'',        
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
      // homeName: state => state.homeName,
      // DataBoxData: state => state.DataBoxData,
      DataBoxData(state) {
        this.GasAvail = Boolean(state.DataBoxData[state.GasN].GasAvail);
        this.GasLED = Boolean(state.DataBoxData[state.GasN].GasLED);
        this.GasMod = !Boolean(state.DataBoxData[state.GasN].GasMod);
        this.GasMas = Boolean(state.DataBoxData[state.GasN].GasMas);
        this.PM2P5Sta = Boolean(state.DataBoxData[state.GasN].PM2P5Sta);
        this.SorErr = Boolean(state.DataBoxData[state.GasN].SorErr);
        this.CommErr = Boolean(state.DataBoxData[state.GasN].CommErr);
          return state.DataBoxData;
      }
    })
  },
  watch: {
    Name() {
      this.roomName = this.Name;
    }
  },
  created() {
    this.roomName = this.Name;
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setBoxListVal:'SET_BOX_List_VALUE'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
      setBoxName: 'SET_BOX_NAME',
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
      this.roomName = this.$refs.inputValue.value.length > 10 ? this.$refs.inputValue.value.slice(0,10)+ '...' : this.$refs.inputValue.value;    
      //this.$store.commit(`${type.SET_HOME`${this.GasN}_OBJECT}`,this.roomName)
      if (this.GasN === 0){
        this.$store.commit(type.SET_HOME0_OBJECT,this.roomName);

      }else if (this.GasN ===1){
         this.$store.commit(type.SET_HOME1_OBJECT,this.roomName)
      }
      this.setBoxName();
      this.textflag = true;
    },
    handler(name, active) {
      const val = active? 1 : 0;
      let ContraryVal = active? 0 : 1;
      let sendVal = "";
      const valArray = [];
      // for (let i = 0;i <this.DataBoxData[this.GasN][name].toString(2).split("").reverse().length; i+=1){
      //   debugger
      //     if (i === this.GasN){
      //       if (name === "GasMod"){
      //       valArray[i] = String(ContraryVal);
      //       }else{
      //       valArray[i] = String(val);
      //       }
      //     }else{
      //       debugger
      //       if (name === "GasMas") {
      //          valArray[i] = val === 1? String(0):String(1);
      //          debugger
      //       }else{
      //       valArray[i] = this.DataBoxData[this.GasN][name].toString(2).split("").reverse()[i];
      //       }
      //     }
      // }
      // const b = valArray.reverse()
      // for (let j = 0; j< b.length; j+=1){
      //     sendVal =  sendVal + b[j]
      // }
      for (let i = 0; i < this.DataBoxData.length;i+=1){
        if (name === "GasMas"&& i!== this.GasN){
         valArray[i] = ContraryVal;
        }else{
         valArray[i] = this.DataBoxData[i][name];
        }
      }
      if (name === "GasMod"){
         valArray[this.GasN] = ContraryVal;
      }else{
         valArray[this.GasN] = val;
      }
      const b = valArray.reverse()      // 倒序数组值
      for(let j = 0;j < b.length;j++){
        sendVal = sendVal + b[j]
      }
      const result  = parseInt(Number(sendVal),2);
      switch(name){
        case "GasAvail":
          if (result === 0){
             showToast("已关闭最后一个盒子,自动模式将无法运行", 0);
             this.setDataObject({Pow: 0,FanMod:1});
             this.sendCtrl({Pow: 0,FanMod:1}); 
          }
          this.setBoxListVal({ GasAvail: result});
          this.sendCtrl({ GasAvail: result }); 
        break; 
        case "GasMas":
          this.setBoxListVal({ GasMas: result});
          this.sendCtrl({ GasMas: result }); 
        break; 
        case "GasLED":
          this.setBoxListVal({ GasLED: result});
          this.sendCtrl({ GasLED: result }); 
        break; 
        case "GasMod":
        const LEDArray = [];
        let ledVal = "";
          for (let j = 0; j < this.DataBoxData.length;j+=1){
            LEDArray[j] = this.DataBoxData[j]["GasLED"];
          }
          LEDArray[this.GasN] = val;
          const c = LEDArray.reverse()      // 倒序数组值
          for(let z = 0;z < c.length;z++){
            ledVal = ledVal + c[z]
          }
          const ledResult  = parseInt(Number(ledVal),2);
          ContraryVal === 0 ? ContraryVal = 1:ContraryVal = 0
          this.setBoxListVal({ GasMod: result, GasLED: ledResult});
          this.sendCtrl({ GasMod: result, GasLED: ledResult});      
        break; 
        case "PM2P5Sta":
          this.setDataObject({ PM2P5Sta: result});
          this.sendCtrl({ PM2P5Sta: result }); 
        break; 
        default:
            break;
      }
  
    },
  }
};
</script>
