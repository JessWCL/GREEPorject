import isString from 'lodash/isString';
import { isLegalForFavoriteData } from '../utils/index';

export default {
  getFavoriteCloudMenuList: state => {
    let { favoriteCloudMenu } = state;
    let ret = [];
    try {
      if (isString(favoriteCloudMenu)) favoriteCloudMenu = JSON.parse(favoriteCloudMenu);
      if (isLegalForFavoriteData(favoriteCloudMenu)) {
        ret = handleSet(favoriteCloudMenu);
      } else {
        console.error('==== FavoriteCloudMenu is illegal ====', JSON.stringify(favoriteCloudMenu));
      }
      return ret;
    } catch (e) {
      console.warn('[FavoriteCloudMenu getter] ==== FavoriteCloudMenu has something error happen ====', e);
      return [];
    }
  }
};

const handleSet = array => {
  const set = new Set();
  const ret = [];
  if (array.length > 0) {
    array.forEach(e => {
      const [e0, e1, e2] = e;
      const obj = `${e0}${e1}${e2}`;
      if (!set.has(obj)) set.add(obj);
    });
    set.forEach(e => {
      const _arr = Array.from(e);
      let [a0, a1, a2] = _arr;
      [a0, a1, a2] = [parseInt(a0, 10), parseInt(a1, 10), parseInt(a2, 10)];
      ret.push([a0, a1, a2]);
    });
  }
  return ret;
};
