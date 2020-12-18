import { mapState } from 'vuex';
import state from '../../store/state.js';
/**
 * @description 检测有没有故障，有没有掉线
 */
const updateStatus = {
  computed: {
    ...mapState({
      isOffline: state =>state.deviceInfo.deviceState,
      estate:state=>state.dataObject.estate,
      JFerr:state=>state.dataObject.JFerr,
    })
  },
  watch: {
    /**
     * @description 设备离线时跳转离线页面
     */
    isOffline(newV) {
      if (newV === -1) {
        this.$router.push({ name: 'Offline' });
      }else if((this.estate!==0&&this.estate!==224&&this.estate!==256)||this.JFerr!==0){
        this.$router.push({path:'errorwarning'});
      }
      else{
        this.$router.replace({ path: '/' });
      }
    },
    estate(){
      if((this.estate!==0&&this.estate!==224&&this.estate!==256)||this.JFerr!==0){
        this.$router.push({path:'errorwarning'});
      }else{
        this.$router.replace({ path: '/' });
      }
    },
    JFerr(){
      if((this.estate!==0&&this.estate!==224&&this.estate!==256)||this.JFerr!==0){
        this.$router.push({path:'errorwarning'});
      }else{
        this.$router.replace({ path: '/' });
      }
    },
  },
  created() {
    this.initApp();
  },
  methods: {
    /**
     * @description APP初始化时检查有没有故障, 有没有预约
     */
    initApp() {
      if (this.isOffline === -1) {
        this.$router.push({ name: 'Offline' });
      } else if((this.estate!==0&&this.estate!==224&&this.estate!==256)||this.JFerr!==0){
        this.$router.push({path:'errorwarning'});
      }else{
        this.$router.replace({ path: '/' });
      }
    }
  }
};
export default updateStatus;
