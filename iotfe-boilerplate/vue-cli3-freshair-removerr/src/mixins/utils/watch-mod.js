import {mapState} from 'vuex';
import {
  showToast
} from '../../../../static/lib/PluginInterface.promise';
/**
 * @description 模式互斥
 */

const watchMod = {
  mounted() {
  },
  computed: {
    ...mapState({
      ModS: state => state.dataObject.ModS,
    })
  },
  watch: {
    // FanMod: function (val, old) {

    //   const effective = this.ModS.toString(2).split('').reverse();
    //   if (effective[val - 1] === '1') {
    //     this.sendCtrl({ FanMod: val });
    //   } else {
    //     showToast(`不可设置${this.allState.MoveMode.rNames[val - 1]}`, 0);
    //     // console.log(`不可设置${this.allState.MoveMode.rNames[val-1]}`);
    //     // this.setDataObject({ FanMod: old });
    //     this.setCarouselId('carousel-movemode', old - 1);
    //   }
    // }

  },
};

export default watchMod;
