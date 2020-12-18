<template>
  <gree-view bgColor="#F4F4F4" class="filter-page">
    <gree-header>清洗复位</gree-header>
    <gree-page>
      <gree-list>
        <gree-list-item
          link
          :title="tipList.title"
          :text="PollutionList[this.ODUViti - 1].text"
          @click.native="$router.push(`/Detail`)"
        ></gree-list-item>
      </gree-list>

      <div v-for="(item, index) in FilterScreen" :key="index">
        <FilterCirlce
          :card-title="item.tips"
          :filt-value="item.Value"
          :bg-color="item.color"
          :protocol="item.Name"
          @reset-comfirm="showConfirm"
        >
          <span slot="foot-title">{{ item.msg }}</span>
        </FilterCirlce>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import homeConfig from '@/mixins/config/60a0/home';
import { Dialog, Header, Item, List } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { closePage } from '../../../../static/lib/PluginInterface.promise';
import FilterCirlce from '../../components/FilterCirlce';

export default {
  components: {
    [Dialog.name]: Dialog,
    [Header.name]: Header,
    [Item.name]: Item,
    [List.name]: List,
    FilterCirlce: FilterCirlce
  },
  mixins: [homeConfig],
  data() {
    return {
      tipList: {
        title: '当前污染等级',
        text: '详情'
      },
      changeMsg: '立即更换'
    };
  },
  computed: {
    ...mapState({
      Pow: state => state.dataObject.Pow,
      dataObject: state => state.dataObject,
      ScrTime: state => state.dataObject.ScrTime,
      InVitiGrCg: state => state.dataObject.InVitiGrCg,
      PctCle: state => state.dataObject.PctCle,
      PctRe: state => state.dataObject.PctRe,
      PollutionList: state => state.PollutionList,
      ODUViti: state => state.dataObject.ODUViti,
      MIdType: state => state.dataObject.MIdType,
      InVitiGr: state => state.dataObject.InVitiGr,
      VitiGr: state => state.dataObject.VitiGr,
      IFDtiGr: state => state.dataObject.IFDtiGr
    })
  },
  watch: {},
  created() {},
  mounted() {},

  methods: {
    ...mapMutations({
      setDataObject: 'SET_DATA_OBJECT'
    }),
    ...mapActions({
      sendCtrl: 'SEND_CTRL'
    }),
    /**
     * @description 返回键
     */
    goBack() {
      closePage();
    },

    handleReset(title) {
      console.log(title);
    },

    showConfirm(name) {
      const sendObj = {};
      let contentTxt = '';
      switch (name) {
        case 'Crudefilter':
          if (this.PctRe === 1) {
            sendObj.InEffReRes = 1;
            contentTxt = '粗效/中效过滤网是否已更换';
          } else if (this.PctCle === 1) {
            sendObj.InEffClRes = 1;
            contentTxt = '粗效/中效过滤网是否已清洗';
          } else {
            sendObj.InEffReRes = 1;
            contentTxt = '粗效/中效过滤网是否已更换';
          }
          break;
        case 'EffReRes':
          sendObj.EffReRes = 1;
          contentTxt = 'HEPA过滤网是否已更换';
          break;
      }
      Dialog.confirm({
        title: '提示',
        content: contentTxt,
        confirmText: '确定',
        onConfirm: () => {
          this.setDataObject(sendObj);
          this.sendCtrl(sendObj);
        },
        cancelText: '取消',
        onCancel: () => console.log('[Dialog.confirm] cancel clicked')
      });
    }
  }
};
</script>
