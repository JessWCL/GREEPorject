import { isJSONStr, replaceServerData } from '../utils/index';

export default {

  cloudMenuList: state => {
    // 筛选数据正确的食谱
    const list = [].concat(state.SearchCloudMenu.data);
    list.forEach((item, index) => {
      let Foods = {};
      if (isJSONStr(item.Foods)) {
        Foods = JSON.parse(item.Foods);
      } else {
        Foods = item.Foods;
      }
      list[index].MainFoods = Foods.main;
      list[index].AuxiliaryFoods = Foods.auxiliary;

      const ml = list[index].MainFoods.length;
      const al = list[index].AuxiliaryFoods.length;
      let mStr = '';
      let aStr = '';
      list[index].MainFoods.forEach((item, index) => {
        const num = replaceServerData(item.num);
        if (ml - 1 === index) {
          mStr += `${item.ingredName}${num}${item.unit}`;
        } else {
          mStr += `${item.ingredName}${num}${item.unit}，`;
        }
      });

      // 主食
      list[index].MainFoodsToString = mStr;

      list[index].AuxiliaryFoods.forEach((item, index) => {
        const num = replaceServerData(item.num);
        if (al - 1 === index) {
          aStr += `${item.ingredName}${num}${item.unit}`;
        } else {
          aStr += `${item.ingredName}${num}${item.unit}，`;
        }
      });

      // 副食
      list[index].AuxiliaryFoodsToString = aStr;

      // 食谱一定会有主食
      if (aStr.length !== 0) {
        list[index].FoodsToString = `${mStr}，${aStr}`;
      } else {
        list[index].FoodsToString = mStr;
      }
    });
    if (list.length <= 0) {
      return [];
    }
    return list;
  },

  searchCloudMenuList: state => {
    // 筛选数据正确的食谱
    const list = [].concat(state.GlobalSearchCloudMenu.data);

    if (!Array.isArray(list)) return [];

    list.forEach((item, index) => {
      let Foods = {};
      if (isJSONStr(item.Foods)) {
        Foods = JSON.parse(item.Foods);
      } else {
        Foods = item.Foods;
      }
      list[index].MainFoods = Foods.main || [];
      list[index].AuxiliaryFoods = Foods.auxiliary || [];

      const ml = list[index].MainFoods.length;
      const al = list[index].AuxiliaryFoods.length;
      let mStr = '';
      let aStr = '';
      list[index].MainFoods.forEach((item, index) => {
        const num = replaceServerData(item.num);
        if (ml - 1 === index) {
          mStr += `${item.ingredName}${num}${item.unit}`;
        } else {
          mStr += `${item.ingredName}${num}${item.unit}，`;
        }
      });

      // 主食
      list[index].MainFoodsToString = mStr;

      list[index].AuxiliaryFoods.forEach((item, index) => {
        const num = replaceServerData(item.num);
        if (al - 1 === index) {
          aStr += `${item.ingredName}${num}${item.unit}`;
        } else {
          aStr += `${item.ingredName}${num}${item.unit}，`;
        }
      });

      // 副食
      list[index].AuxiliaryFoodsToString = aStr;

      // 食谱一定会有主食
      if (aStr.length !== 0) {
        list[index].FoodsToString = `${mStr}，${aStr}`;
      } else {
        list[index].FoodsToString = mStr;
      }
    });
    if (list.length <= 0) {
      return [];
    }
    return list;
  }

};
