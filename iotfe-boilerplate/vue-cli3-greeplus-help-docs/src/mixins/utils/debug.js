import mockData from '../../api/mock';
import { CATEGORY_MAP } from '../../api/constant';
import updateHelpDocs from './updateHelpdocs'; // 自定义初始化功能，可以修改

const mixin = {
  mixins: [updateHelpDocs],
  methods: {
    init() {
      const allItems = [];
      mockData.aclass.forEach(x => {
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
      this.setAllHelpDocItems(allItems);
      this.setTopHelpDocItems(mockData.top);
    }
  }
};

export default mixin;
