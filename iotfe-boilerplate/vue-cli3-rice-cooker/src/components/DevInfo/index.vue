<template>
  <div class="device-info">
    <div
      class="icon-back"
      @click="goBack()"
    >
      <img src="../../assets/img/back.png">
    </div>
    <div class="devname ellipsis">
      <span class="txt-name">{{ devname }}</span>
    </div>
    <div
      class="btn-save"
      :class="{ hide: !isScene }"
      @click="sceneSave()"
    >
      {{ save }}
    </div>
    <div
      class="btn-save"
      :class="{ hide: isScene }"
      @click="editName()"
    >
      <svg
        width="1rem"
        height="1rem"
      >
        <circle
          cx="0.5rem"
          cy="0.25rem"
          r="0.06rem"
          fill="white"
        />
        <circle
          cx="0.5rem"
          cy="0.5rem"
          r="0.06rem"
          fill="white"
        />
        <circle
          cx="0.5rem"
          cy="0.75rem"
          r="0.06rem"
          fill="white"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { editDevice, getCCcmd } from '../../../../static/lib/PluginInterface.promise';

export default {
  name: 'DevInfo',
  props: {
    leftOnClick: {
      type: Function,
      // eslint-disable-next-line
      default: function() {},
    }
  },
  data() {
    return {
      save: this.$language('btnSave'),
    };
  },
  computed: {
    ...mapState({
      devname: state => state.deviceInfo.name,
      isScene: state => state.isScene,
      isPreseting: state => state.dataObject.SchEn,
      mac: state => state.mac,
      dataObject: state => state.dataObject,
    }),
  },
  mounted: function initScene() { },
  methods: {
    /**
     * @function editName
     * @description 编辑设备名称
     */
    editName() {
      editDevice(this.mac);
    },
    /**
     * @function goBack
     * @description 返回键, 开始预约后要直接返回到小卡片
     * @todo 添加返回小卡片的接口
     */
    goBack() {
      this.leftOnClick();
      window.backButton();
    },
    /**
     * @function sceneSave
     * @description 场景模式的保存
     */
    sceneSave() {
      const keys = Object.keys(this.dataObject);
      const opt = [];
      const p = [];
      const remarks = '...';
      for (let i = 0, j = keys.length; i < j; i += 1) {
        opt.push(keys[i]);
        p.push(this.dataObject[keys[i]]);
      }
      const json = JSON.stringify({ opt, p, t: 'cmd' });
      getCCcmd(this.mac, json, remarks, JSON.stringify(p));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/index.scss";

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.device-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20%;
  box-sizing: border-box;
  .icon-back {
    flex-basis: 13%;
    img {
      width: 18%;
      max-width: 0.3rem;
    }
  }
  .devname {
    margin: 0 auto;
    width: 80%;
    @include font-size(20px);
    font-family: appleLight;
  }
  .icon-edit {
    width: 0.4rem;
  }
  .btn-save {
    flex-basis: 13%;
    @include font-size(20px);
  }
  .hide {
    display: none;
  }
  .hidden {
    visibility: hidden;
  }
}
</style>
