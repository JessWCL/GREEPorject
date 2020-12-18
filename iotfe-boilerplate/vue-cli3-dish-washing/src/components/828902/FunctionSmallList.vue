<template>
  <gree-row class="function-small-list">
    <gree-col>
      <gree-image
        v-show="isNormalMod && LayerWash === 0"
        :src="require('@/assets/828902/FunSmall/double_wash.png')"></gree-image>
      <gree-image v-show="LayerWash === 1" :src="require('@/assets/828902/FunSmall/underwash.png')"></gree-image>
      <gree-image v-show="LayerWash === 2" :src="require('@/assets/828902/FunSmall/upper_wash.png')"></gree-image>
      <gree-image v-show="isNormalMod && Dry === 1" :src="require('@/assets/828902/FunSmall/mild_drying.png')"></gree-image>
      <gree-image v-show="isNormalMod && Dry === 2" :src="require('@/assets/828902/FunSmall/standard_drying.png')"></gree-image>
      <gree-image v-show="isNormalMod && Dry === 3" :src="require('@/assets/828902/FunSmall/enhanced_drying.png')"></gree-image>
      <!-- <gree-image v-show="Disinfect === 1" :src="require('@/assets/828902/FunSmall/uv_disinfection.png')"></gree-image> -->
      <gree-image v-show="TmrOn === 1" :src="require('@/assets/828902/FunSmall/make_an_appointment.png')"></gree-image>
      <gree-image v-show="Lock === 1" :src="require('@/assets/828902/FunSmall/child_lock.png')"></gree-image>
      <gree-image v-show="Lighting === 1" :src="require('@/assets/828902/FunSmall/lighting.png')"></gree-image>
      <gree-image v-show="isNormalMod && Purifier === 1 && modType !== 1" :src="require('@/assets/828902/FunSmall/purifier.png')"></gree-image>
      <!-- 待保洁时间提示 -->
      <span v-show="isNormalMod && Purifier === 1 && modType !== 1" class="purifier-time">{{ purifierTxt }}</span>
    </gree-col>
  </gree-row>
</template>

<script>
import { mapState } from 'vuex';
import { Row, Col, Image } from 'gree-ui';

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image,
  },
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState({
      modType: state => state.cache.modType,
      DataObject: state => state.DataObject,
      WorkStatus: state => state.DataObject.WorkStatus,
      LayerWash: state => state.DataObject.LayerWash,
      Wash: state => state.DataObject.Wash,
      Dry: state => state.DataObject.Dry,
      Lighting: state => state.DataObject.Lighting,
      Disinfect: state => state.DataObject.Disinfect,
      Lock: state => state.DataObject.Lock,
      Purifier: state => state.DataObject.Purifier,
      PurifierTime: state => state.DataObject.PurifierTime,
      TmrOn: state => state.DataObject.TmrOn,
    }),

    isNormalMod() {
      const { isSingleDryMod, isSinglePurifierMod } = this;
      return !(isSingleDryMod || isSinglePurifierMod);
    },

    isSingleDryMod() {
      const { Mod, Dry } = this.DataObject;
      const isSingleDryMod = Mod === 0 && Dry !== 0;
      return isSingleDryMod;
    },

    isSinglePurifierMod() {
      const { Mod, Dry } = this.DataObject;
      const isSinglePurifierMod = Mod === 0 && Dry === 0;
      return isSinglePurifierMod;
    },

    purifierTxt() {
      const { modType, Wash, WorkStatus, Purifier, PurifierTime } = this;
      if (modType === 1) {
        return '';
      }
      const isWorking = Wash === 1;
      const isPurifiering = WorkStatus === 6;
      if (Purifier && isWorking && isPurifiering) {
        return '';
      }
      return `待保洁${PurifierTime}小时`;
    }

  },
};
</script>
