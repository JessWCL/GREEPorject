import updateStatus from './updateStatus';
import { finishLoad } from '../../../../static/lib/PluginInterface.promise'; // 主体接口

const mixin = {
  mixins: [updateStatus], // 该mixin自定义初始化时检测故障等功能，需更改
  computed: {},
  methods: {
    /**
     * @description 初始化，并将小卡片传进来的值赋予state
     */
    init() {
      finishLoad();
    },
  },
};

export default mixin;
