// 根据实际业务修改
import { GET_DEVICE_INFO, IS_SCENE, SET_ACTIVITY_OBJECT, SET_DATA_OBJECT, SET_MAC } from '@/store/types';
import { getQueryStringByName } from '@/utils';
import { mapActions, mapMutations, mapState } from 'vuex';
import updateStatus from './updateStatus';

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {
    ...mapState({ mac: state => state.mac })
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations({
      setMac: SET_MAC,
      setActivityObject: SET_ACTIVITY_OBJECT,
      setDataObject: SET_DATA_OBJECT,
      updateIsScene: IS_SCENE
    }),
    ...mapActions({
      getDeviceInfo: GET_DEVICE_INFO
    }),
    /**
     * @description 初始化，并将小卡片传进来的值赋予state
     */
    init() {
      const mac = getQueryStringByName('mac');
      console.log(`mac: ${mac}`);

      const result = getQueryStringByName('result');
      console.log(`result: ${result}`);

      const isScene = getQueryStringByName('functype');
      console.log(`functype: ${isScene}`);

      this.setMac(mac);
      this.setActivityObject(JSON.parse(result));
      this.getDeviceInfo(mac);
      Number(isScene) ? this.updateIsScene(1) : this.updateIsScene(0); // 场景
    }
  }
};

export default mixin;
