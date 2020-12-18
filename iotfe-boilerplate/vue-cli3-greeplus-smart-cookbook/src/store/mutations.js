import * as types from './types';
import { INIT_DATA, INIT_DATA2 } from '../api/constant';
// 同步操作放这里
export default {
  [types.SET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
  },
  [types.SET_DATA_OBJECT](state, obj) {
    state.dataObject = { ...state.dataObject, ...obj };
  },
  [types.SET_DATA_OBJECT_CACHE](state, payload) {
    state.dataObjectCache = { ...state.dataObject, ...payload };
  },
  [types.SET_SEARCH_CLOUD_MENU](state, payload) {
    state.SearchCloudMenu = payload;
  },
  [types.APPEND_SEARCH_CLOUD_MENU](state, payload) {
    const { count, data } = payload;
    const oldData = state.SearchCloudMenu.data;
    const monitor = { count, data: [...oldData, ...data] };
    state.SearchCloudMenu = monitor;
    console.log(state.SearchCloudMenu);
  },
  [types.INIT_SEARCH_CLOUD_MENU](state) {
    state.SearchCloudMenu = INIT_DATA;
  },
  [types.SET_GLOBAL_SEARCH_CLOUD_MENU](state, payload) {
    state.GlobalSearchCloudMenu = payload;
  },
  [types.APPEND_GLOBAL_SEARCH_CLOUD_MENU](state, payload) {
    const { count, data } = payload;
    const oldData = state.GlobalSearchCloudMenu.data;
    const monitor = { count, data: [...oldData, ...data] };
    state.GlobalSearchCloudMenu = monitor;
    console.log(state.GlobalSearchCloudMenu);
  },
  [types.INIT_GLOBAL_SEARCH_CLOUD_MENU](state) {
    state.GlobalSearchCloudMenu = INIT_DATA;
  },
  [types.SET_CLOUD_MENU_DETAIL_STEPS](state, payload) {
    state.CloudMenuDetailSteps = payload;
  },
  [types.INIT_CLOUD_MENU_DETAIL_STEPS](state, payload) {
    const { Name } = payload;
    const data = { INIT_DATA2, ...{ dataMsg: { Name } } };
    state.CloudMenuDetailSteps = data;
  },
  [types.SET_RECOMMENDED_MENU](state, payload) {
    state.RecommendedMenu = payload;
  },
  [types.SET_DISH_FROM_BASKET](state, payload) {
    state.DishFromBasket = payload;
  },
  [types.SET_SHARE_DISH_BASKET](state, payload) {
    state.ShareDishBasketUrl = payload;
  },
  [types.REMOVE_DISH_FROM_BASKET](state, payload) {
    const idArr = payload;
    const { DishFromBasket } = state;
    const list = [];
    DishFromBasket.forEach(item => {
      const isPush = !idArr.includes(item.id);
      if (isPush) {
        list.push(item);
      }
    });
    state.DishFromBasket = list;
  },
};
