import * as types from './types';
import {
  showToast,
  showLoading,
  hideLoading,
  getRecommendedMenu,
  searchCloudMenu,
  getCloudMenuDetailSteps,
  getDishFromBasket,
  addDishToBasket,
  removeDishFromBasket,
  shareDishBasket,
  shareDishBasketUrl,
  getCurrentMode
} from '../../../static/lib/PluginInterface.promise'; // 主体接口
import { GREE_REST_ASIA_DEV, GREE_REST_ASIA, __PROD__, __TEST__, __DEV__ } from '../api/constant';
import { getShareDishBasketURL, isJSONStr } from '../utils/index';

export default {

  /**
   * 生成分享链接
   */
  async [types.GET_SHARE_DISH_BASKET]({ commit }) {
    let resData = {
      r: 'pending',
      basket: []
    };
    try {
      const url = getShareDishBasketURL();
      console.log({ url });
      await fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          const { r, basket } = data;
          if (r === 200) {
            commit(types.SET_DISH_FROM_BASKET, basket);
            resData = { r: 'success', basket };
          } else {
            // eslint-disable-next-line no-throw-literal
            throw 'error';
          }
        })
        .catch(e => {
          console.error(e);
          // eslint-disable-next-line no-throw-literal
          throw 'error';
        });
    } catch (e) {
      console.error(e);
      resData = { r: 'error', basket: [] };
    }
    return resData;
  },

  /**
   * 获取菜蓝子列表
   */
  async [types.GET_DISH_FROM_BASKET]({ commit }) {
    let resData = {
      r: 'pending',
      basket: []
    };
    try {
      showLoading();
      const res = await getDishFromBasket();
      console.log(`GET_DISH_FROM_BASKET: ${res}`);
      let jsonData = {};
      if (isJSONStr(res)) {
        console.log('=== getDishFromBasket parse ===');
        jsonData = JSON.parse(res);
      } else {
        console.log('=== getDishFromBasket not parse ===');
        jsonData = res;
      }
      const { r, basket } = jsonData;
      if (r === 200) {
        commit(types.SET_DISH_FROM_BASKET, basket);
        resData = { r: 'success', basket };
      } else {
        // eslint-disable-next-line no-throw-literal
        throw 'error';
      }
    } catch (e) {
      console.error(e);
      resData = { r: 'error', basket: [] };
    } finally {
      hideLoading();
    }
    return resData;
  },

  /**
   * 添加菜谱到菜篮子
   */
  async [types.ADD_DISH_TO_BASKET](context, { dishname = '菜谱', picture = '', copies = 1, ingredients }) {
    try {
      showLoading();
      console.log({ dishname, picture, copies, ingredients });
      const res = await addDishToBasket(JSON.stringify({ dishname, picture, copies, ingredients }));
      const { r } = JSON.parse(res);
      if (r === 200) {
        showToast(`${dishname}添加成功`, 0);
      } else {
        showToast(`${dishname}添加失败`, 0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      hideLoading();
    }
  },

  async [types.REMOVE_DISH_FROM_BASKET]({ commit }, payload) {
    try {
      showLoading();
      const res = await removeDishFromBasket(payload);
      console.log(res);
      const { r } = JSON.parse(res);
      if (r === 200) {
        commit(types.REMOVE_DISH_FROM_BASKET, payload);
        showToast('删除成功', 0);
      } else {
        showToast('删除失败', 0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      hideLoading();
    }
  },

  /**
   * 获取推荐列表
   */
  async [types.GET_RECOMMENDED_MENU]({ commit }) {
    if (__PROD__ || __TEST__) {
      try {
        showLoading();
        const res = await getRecommendedMenu();
        console.log(res);
        const jsonData = JSON.parse(res);
        const { r } = jsonData;
        if (r === 200) {
          commit(types.SET_RECOMMENDED_MENU, jsonData);
        } else if (r === 11506) {
          commit(types.SET_RECOMMENDED_MENU, jsonData);
        }
      } catch (e) {
        console.error(e);
      } finally {
        hideLoading();
      }
    } else {
      const pathname = '/app/GetRecommendedMenu';
      const origin = __DEV__ ? GREE_REST_ASIA_DEV : GREE_REST_ASIA;
      const url = `${origin}${pathname}`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          commit(types.SET_RECOMMENDED_MENU, data);
        })
        .catch(e => {
          console.error(e);
        });
    }
  },

  /**
   * 获取全局菜谱推荐列表
   */
  async [types.GET_GLOBAL_RECOMMENDED_MENU](context, payload) {
    return new Promise(async (resolve, reject) => {
      const { mid, index, cnt } = payload;
      if (__PROD__ || __TEST__) {
        try {
          showLoading();
          const res = await searchCloudMenu('', mid, index, cnt);
          let jsonData = {};
          if (isJSONStr(res)) {
            console.log('=== searchCloudMenu parse ===');
            jsonData = JSON.parse(res);
          } else {
            console.log('=== searchCloudMenu not parse ===');
            jsonData = res;
          }
          const { r } = jsonData;
          if (r === 200) {
            if (index >= 1) {
              jsonData.data.sort((a, b) => {
                try {
                  const aTime = new Date(a.Createtime).getTime();
                  const bTime = new Date(b.Createtime).getTime();
                  return bTime - aTime;
                } catch (e) {
                  console.error(e);
                  return 0;
                }
              });
              // 取前四个
              jsonData.data = jsonData.data.slice(0, 4);
              resolve(jsonData);
            }
          }
        } catch (e) {
          console.error(e);
          reject(e);
        } finally {
          hideLoading();
        }
      } else {
        const pathname = `/app/SearchCloudMenu?mid=${mid}&index=${index}&cnt=${cnt}`;
        const origin = __DEV__ ? GREE_REST_ASIA_DEV : GREE_REST_ASIA;
        const url = `${origin}${pathname}`;
        fetch(url)
          .then(res => res.json())
          .then(jsonData => {
            console.log(jsonData);
            const { r } = jsonData;
            if (r === 200) {
              if (index >= 1) {
                jsonData.data.sort((a, b) => {
                  try {
                    const aTime = new Date(a.Createtime).getTime();
                    const bTime = new Date(b.Createtime).getTime();
                    return bTime - aTime;
                  } catch (e) {
                    console.error(e);
                    return 0;
                  }
                });
                // 取前四个
                jsonData.data = jsonData.data.slice(0, 4);
                resolve(jsonData);
              }
            } else if (r === 11506) {
              reject(jsonData);
            }
          })
          .catch(e => {
            console.error(e);
            reject(e);
          });
      }
    });
  },

  /**
   * 全局菜谱关键字搜索
   */
  async [types.GET_GLOBAL_SEARCH_CLOUD_MENU](context, payload) {
    return new Promise(async (resolve, reject) => {
      const { keyword, index, cnt } = payload;
      if (__PROD__ || __TEST__) {
        try {
          showLoading();
          const res = await searchCloudMenu(keyword, '', index, cnt);
          let jsonData = {};
          if (isJSONStr(res)) {
            console.log('=== globalSearchCloudMenu parse ===');
            jsonData = JSON.parse(res);
          } else {
            console.log('=== globalSearchCloudMenu not parse ===');
            jsonData = res;
          }
          const { r, data } = jsonData;
          if (r === 200) {
            if (!Array.isArray(data)) {
              res.data = []; // fixed data is null
              // 没有搜索到相关信息
              reject(res);
            } else {
              resolve(jsonData);
            }
          }
        } catch (e) {
          console.error(e);
          reject(e);
        } finally {
          hideLoading();
        }
      } else {
        const pathname = `/app/SearchCloudMenu?keyword=${keyword}&index=${index}&cnt=${cnt}`;
        const origin = __DEV__ ? GREE_REST_ASIA_DEV : GREE_REST_ASIA;
        const url = `${origin}${pathname}`;
        fetch(url)
          .then(res => res.json())
          .then(jsonData => {
            console.log(jsonData);
            const res = jsonData;
            const { r, data } = res;
            if (r === 200) {
              if (!Array.isArray(data)) {
                res.data = []; // fixed data is null
                // 没有搜索到相关信息
                reject(res);
              } else {
                resolve(jsonData);
              }
            }
          })
          .catch(e => {
            console.error(e);
            reject(e);
          });
      }
    });
  },

  /**
   * 获取设备菜谱列表
   */
  async [types.GET_SEARCH_CLOUD_MENU]({ commit }, payload) {
    const { mid, index, cnt } = payload;
    if (__PROD__ || __TEST__) {
      try {
        showLoading();
        const res = await searchCloudMenu('', mid, index, cnt);
        let jsonData = {};
        if (isJSONStr(res)) {
          console.log('=== searchCloudMenu parse ===');
          jsonData = JSON.parse(res);
        } else {
          console.log('=== searchCloudMenu not parse ===');
          jsonData = res;
        }
        const { r } = jsonData;
        if (r === 200) {
          if (index === 1) {
            commit(types.SET_SEARCH_CLOUD_MENU, jsonData);
          } else if (index > 1) {
            commit(types.APPEND_SEARCH_CLOUD_MENU, jsonData);
          }
        } else if (r === 11506) {
          commit(types.SET_SEARCH_CLOUD_MENU, jsonData);
        }
      } catch (e) {
        console.error(e);
      } finally {
        hideLoading();
      }
    } else {
      const pathname = `/app/SearchCloudMenu?mid=${mid}&index=${index}&cnt=${cnt}`;
      const origin = __DEV__ ? GREE_REST_ASIA_DEV : GREE_REST_ASIA;
      const url = `${origin}${pathname}`;
      fetch(url)
        .then(res => res.json())
        .then(jsonData => {
          console.log(jsonData);
          const { r } = jsonData;
          if (r === 200) {
            if (index === 1) {
              commit(types.SET_SEARCH_CLOUD_MENU, jsonData);
            } else if (index > 1) {
              commit(types.APPEND_SEARCH_CLOUD_MENU, jsonData);
            }
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  },

  /**
   * 获取云菜谱明细
   */
  async [types.GET_CLOUD_MENU_DETAIL_STEPS]({ commit }, payload) {
    const { Cid } = payload;
    if (__PROD__ || __TEST__) {
      try {
        showLoading();
        const res = await getCloudMenuDetailSteps(Cid);
        let jsonData = {};
        if (isJSONStr(res)) {
          console.log('=== getCloudMenuDetailSteps parse ===');
          jsonData = JSON.parse(res);
        } else {
          console.log('=== getCloudMenuDetailSteps not parse ===');
          jsonData = res;
        }
        const { r } = jsonData;
        if (r === 200) {
          commit(types.SET_CLOUD_MENU_DETAIL_STEPS, jsonData);
        }
      } catch (e) {
        console.error(e);
      } finally {
        hideLoading();
      }
    } else {
      const pathname = `/app/GetCloudMenuDetailSteps?cid=${Cid}`;
      const origin = __DEV__ ? GREE_REST_ASIA_DEV : GREE_REST_ASIA;
      const url = `${origin}${pathname}`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          commit(types.SET_CLOUD_MENU_DETAIL_STEPS, data);
        })
        .catch(e => {
          console.error(e);
        });
    }
  },

  async [types.SHARE_DISH_BASKET]({ state, commit }, payload) {
    const { ShareDishBasketUrl } = state;
    if (ShareDishBasketUrl) {
      console.log({ ShareDishBasketUrl });
      // 分享链接
      shareDishBasketUrl(ShareDishBasketUrl);
    } else {
      const res = await shareDishBasket(payload);
      const { r, id } = JSON.parse(res);
      if (r === 200) {
        let current = await getCurrentMode();
        let isPluginDebug = false;
        if (typeof current === 'string') current = parseInt(current, 10);
        isPluginDebug = current === 0;
        const pathname = `/menu/share?id=${id}`;
        const origin = isPluginDebug ? GREE_REST_ASIA_DEV : GREE_REST_ASIA;
        const url = `${origin}${pathname}`;
        console.log({ current, isPluginDebug, url });
        shareDishBasketUrl(url);
        // 分享链接
        console.log({ ShareDishBasketUrl: url });
        commit(types.SET_SHARE_DISH_BASKET, url);
      } else {
        showToast('生成分享链接失败...', 0);
      }
    }
  }

};
