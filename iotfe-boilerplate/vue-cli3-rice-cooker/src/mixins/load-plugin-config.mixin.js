import { getInfo } from '../../../static/lib/PluginInterface.promise';

const mixin = {
  data() {
    return {
      mac: undefined,
    };
  },
  created() {
    this.mac = this.$getQueryStringByName('mac');
    getInfo(this.mac)
      .then(result => {
        console.log(result); // eslint-disable-line
      })
      .catch(err => {
        console.log(err); // eslint-disable-line
      });
  },
  methods: {
    /**
     * @description 根据不同的机型id加载不同的配置表
     * @function loadPluginConfig
     * @version 0.0.1
     * @param {number} midType 机型id
     */
    loadPluginConfig(midType) {
      const requirePath = `./${midType}`;
      // 下一行需要动态加载，将配置存到store中
      this.$store // 如果store没有启用，则存到全局下
        ? (this.$store.state.pluginConfig = require(requirePath)) // eslint-disable-line
        : (Vue._pluginConfig = require(requirePath)); // eslint-disable-line
    },
  },
};

export default mixin;
