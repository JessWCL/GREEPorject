import updateHelpDocs from './updateHelpdocs';
import { CATEGORY_MAP } from '../../api/constant';
import { getHelpDocs, finishLoad } from '../../../../static/lib/PluginInterface.promise';
import { mapMutations } from 'vuex';
import { IS_DATA_INIT} from '../../store/types';

const ID_NAME_MAP = {
  1: '配网',
  2: '账号',
  3: '设备',
  4: '其他'
};

const mixin = {
  mixins: [updateHelpDocs], // 该mixin自定义初始化时检测故障等功能，需更改
  methods: {
    ...mapMutations({
      setIsDataInit: IS_DATA_INIT
    }),
    init() {
      console.log('getHelpDocs');
      getHelpDocs(8).then(data => {
        console.log(data);
        const helpDocs = JSON.parse(data[0]);
        console.log(helpDocs);
        if (helpDocs.top) {
          this.setTopHelpDocItems(helpDocs.top);
        }
        const allItems = [];
        helpDocs.aclass.forEach(x => {
          x.name = ID_NAME_MAP[x.id];
          console.log(x.name);
          const category = CATEGORY_MAP[x.name];
          if (x.bclass) {
            const items = x.bclass.map(y => {
              return {
                ...y,
                category
              };
            });
            allItems.push(...items);
          }
        });
        if (allItems.length > 0) {
          this.setAllHelpDocItems(allItems);
        }
        this.setIsDataInit(true); // 获取数据完成
      });
    }
  }
};

export default mixin;
