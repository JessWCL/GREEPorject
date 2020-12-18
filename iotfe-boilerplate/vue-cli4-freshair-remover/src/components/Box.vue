<template>
  <div class="page-box">
          <!-- v-if="DataBoxData.length" -->
    <div
      v-for="(item, index) in DataBoxData"
      :key="index"
      class="boxs"
      :class="[airQbg[item.GasAvail ? item.AirQu : 0]]"
      @click="JumpBoxDetali(index)"
    >
      <div class="tips">
        <span>{{ homeName[index].room }}<div v-if="item.GasMas" class="main-box">主</div></span> 
        <div :class="[item.GasAvail ? 'gree-switch-on' : 'gree-switch-off']" @click.stop="switchBoxStatus(item, index)" />
      </div>

      <div class="air-quality">
        <span class="air-level">{{ item.GasAvail ? airQ[item.AirQu] : '已关闭' }}</span>
      </div>

      <gree-row class="row-bottom">
        <gree-col width="25" v-for="(ele, index) in JsonDataList[`ColsList_${index}`]" :key="index">
          <p v-if="item.GasAvail">{{ ele.Value }}</p>
          <p v-else>--</p>
          <p>{{ $language(ele.Name) }}</p>
        </gree-col>
      </gree-row>
    </div>

    <div class="no-box" v-if="!DataBoxData.length">
      <img src="@assets/img/error.png" />
      <p>您还没有安装空气盒子，</br>请先前往实体店购买；再联系客服安装哦!</p>
    </div>
  </div>
</template>

<script>
import { Switch, Row, Col } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { showToast } from '../../../static/lib/PluginInterface.promise';
import homeConfig from '@/mixins/config/60a0/home';
export default {
  mixins: [homeConfig],
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Switch.name]: Switch
  },
  data() {
    return {
      checked1: true,
      airQ: ['--', '优', '良', '中', '差', '差', '差'],
      airQbg: ['close-box', 'excellent-box', 'good-box', 'medium-box', 'poor-box', 'poor-box', 'poor-box']
    };
  },
  computed: {
    ...mapState({
      FanMod: state => state.dataObject.FanMod,
      SensorErr: state => state.dataObject.ErrType,
      homeName: state => state.homeName,
      DataBoxData: state => state.DataBoxData,
      GasQ: state => state.dataObject.GasQ // 盒子个数 
    })
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT',
      setBoxNum: 'SET_BOX_NUM',
      setBoxValue: 'CHANGE_BOX_VALUE',
      setBoxListVal: 'SET_BOX_List_VALUE'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL',
      getBoxName: 'GET_BOX_NAME'
    }),
    JumpBoxDetali(index) {
      // this.SensorErr ? showToast(this.$language('error.box_error'), 0) : this.$router.push({ name: 'BoxDetail' });
      this.setBoxNum(index);
      this.getBoxName();
      this.$router.push({ name: 'BoxDetail' });
    },
    ChargeOnesCountInNum2() {
      let number = this.GasQ;
      let maximumN = 5;
      let n = 0;
      const test = 0x1;
      let res = 0;
      while (maximumN !== 0 && number !== 0) {
        res = number & test;
        if (res === 1) {
          n += 1;
        }
        number >>= 1;
        maximumN -= 1;
      }
      return n;
    },
    switchBoxStatus(item, index) {
      let setObj = {}
      const value = !item.GasAvail + 0;
      let isShowTost 
      if(!value){ // 关闭
        let GasAvailNumber = 0 // 启用盒子数量
        this.DataBoxData.forEach(element => {
          if(element.GasAvail){
            GasAvailNumber ++ 
          }
        });
        if(GasAvailNumber === 1 && this.FanMod === 3){ 
          isShowTost = true
        }
      }
      
      if(this.GasQ  === 1){
        setObj.GasAvail = value
      } else {
        // 二进制数据处理
        setObj.GasAvail = (value << index)  + (this.DataBoxData[1-index]['GasAvail'] << (1-index));
      }

      if(isShowTost){
        const otherSendObj = {
          Pow: 0,
          FanMod: 1,
          IDUAirQu: 0
        }
        this.setDataObject(otherSendObj);
        setObj = { ...setObj, ...otherSendObj}
        showToast('如果关闭最后一个空气盒子,自动模式无法运行', 0);
      }
      this.setBoxListVal({GasAvail: setObj.GasAvail });
      this.$forceUpdate();
      this.sendCtrl(setObj);
    },
  }
};
</script>
