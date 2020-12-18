<template>
  <gree-view bgColor='#F4F4F4'>
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
      <div 
        v-for="(item, index) in FilterScreen"
        :key="index">
        <div class="filter-card" :style="{background:item.msg? '#f99a3c':'#86D130'}">
          <div class="filter-rough">{{item.tips }}</div>
          <div class="filter-allowance">{{ $language("filters.allowance") + `${item.Value}`}}</div>
          <div class="line"></div>
          <div class="filter-text" v-show="item.msg">{{item.msg }}</div>
        </div>
        <div 
          class="filter-firm"  
          @click="showConfirm(item.Name)">
          <div 
          class="filter-reset" >{{ $language("filters.reset") }}</div>
        </div>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import homeConfig from '@/mixins/config/6048/home';
import { Dialog, Header, Item, List } from 'gree-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { closePage } from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Dialog.name]: Dialog,
    [Header.name]: Header,
    [Item.name]: Item,
    [List.name]: List
  },
  mixins: [homeConfig],
  data() {
    return {
      tipList: {
        title: '当前污染等级',
        text: '详情'
      }
    };
  },
  computed: {
    ...mapState({
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
      MdVitiGr: state => state.dataObject.MdVitiGr
    })
  },
  created() {},
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
    showConfirm(name) {
      Dialog.confirm({
        title: '提示',
        content: '是否已经清洗或者更换滤网',
        confirmText: '确定',
        onConfirm: () => {
          switch (name) {
            case 'Crudefilter':
              if (this.PctRe === 1) {
                this.setDataObject({ InEffReRes: 1 });
                this.sendCtrl({ InEffReRes: 1 });
              } else if (this.PctCle === 1) {
                this.setDataObject({ InEffClRes: 1 });
                this.sendCtrl({ InEffClRes: 1 });
              } else {
                this.setDataObject({ InEffReRes: 1 });
                this.sendCtrl({ InEffReRes: 1 });
              }
              break;
            case 'EffReRes':
              this.setDataObject({ EffReRes: 1 });
              this.sendCtrl({ EffReRes: 1 });
              break;
            case 'MedlRes':
              if (this.PctRe === 1) {
                this.setDataObject({ MdEffReRes: 1 });
                this.sendCtrl({ MdEffReRes: 1 });
              } else if (this.PctCle === 1) {
                this.setDataObject({ MdEffClRes: 1 });
                this.sendCtrl({ MdEffClRes: 1 });
              } else {
                this.setDataObject({ MdEffReRes: 1 });
                this.sendCtrl({ MdEffReRes: 1 });
              }
              break;
            default:
              break;
          }
        },
        cancelText: '取消',
        onCancel: () => console.log('[Dialog.confirm] cancel clicked')
      });
    }
  }
};
</script>
