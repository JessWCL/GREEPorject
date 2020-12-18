import { replaceServerData } from '../../utils';

const filtersMixin = {
  filters: {
    /**
     * @param {string | number} value
     */
    toCookerStr(value) {
      const str = replaceServerData(value);
      return str;
    }
  },
};

export default filtersMixin;
