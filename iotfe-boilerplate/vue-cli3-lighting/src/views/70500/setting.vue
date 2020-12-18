<template>
  <gree-view>
    <gree-page
      no-navbar
      class="page-home"
    >
      <div
        class="page-header-setting"
      >
        <gree-header
          :left-options="{preventGoBack: true}"
          @on-click-back="goBack"
        >调节</gree-header>
      </div>
      <div class="page-main-setting">
        <section>
          <h1>色温调节</h1>
          <div class="colorBtns">
            <div 
              ref="colors"
              @click="colorClick(index)"
              class="colorBtn"
              v-for="(item,index) in colorList"
              :style="{background:item.color}"
              :class="[index === SetTem ? 'borderThick': 'borderThin']"
              :key="index">{{ item.name }}</div>
          </div>
        </section>
        <section>
          <h1>亮度调节</h1>
          <div class="brights">
            <div 
              @click="lightClick(index)"
              class="brightBtn" 
              :class="[index === SetBright ? 'borderMedium': 'borderThin', Breathe ? 'borderContent':'111']"
              v-for="(item,index) in brightList"
              :key="index">{{ item.name }}
            </div>
          </div>
        </section>
        <div v-show="false">{{ Breathe }}</div>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { Header } from 'gree-ui';
import btnConfig from '@/mixins/utils/config/btn';
// import { closePage } from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Header.name]: Header
  },
  mixins: [btnConfig],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      SetTem: state => state.dataObject.SetTem,
      SetBright: state => state.dataObject.SetBright,
      Breathe: state => state.dataObject.Breathe
    })
  },
  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    goBack() {
      this.$router.go(-1);
    },
    colorClick(index) {
      // this[`colorStatus${index}`] = !this[`colorStatus${index}`];
      // this[`colorStatus${index}`]
      //   ? (this.$refs.colors[index].style.borderWidth = 'thick')
      //   : (this.$refs.colors[index].style.borderWidth = 'thin');
      this.setDataObject({ SetTem: index });
      this.sendCtrl({ SetTem: index });
    },
    lightClick(index) {
      if (!this.Breathe) {
        this.setDataObject({ SetBright: index });
        this.sendCtrl({ SetBright: index });
      }
    }
  }
};
</script>
