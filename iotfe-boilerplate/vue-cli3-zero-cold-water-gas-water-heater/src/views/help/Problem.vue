<template>
  <gree-view
    id="PROBLEM"
    :bg-color="statusBarColor"
  >
    <!-- 顶部导航栏 -->
    <gree-header>
      <gree-icon
        slot="overwrite-left"
        name="back"
        size="lg"
        @click="goBack"
      ></gree-icon>
      {{ listOrDetail ? titleText : listData[showItme].title }}
    </gree-header>
    <gree-page>
      <div class="page-main">
        <div
          class="problem-list"
          v-show="listOrDetail"
        >
          <gree-list>
            <gree-list-item
              v-for="(item, index) in listData"
              :key="index"
              :title="item.title"
              link
              @click.native="setFunction(index)"
            ></gree-list-item>
          </gree-list>
        </div>
        <div
          class="problem-list-item"
          v-show="!listOrDetail"
        >
          <div
            class="detail-item"
            v-for="(item, index) in listData[showItme].itemMsg"
            :key="index"
          >
            <div class="detail-item-title">{{ item.itemTitle }}</div>
            <br />
            <div
              class="detail-item-msg"
              v-html="item.itemMs"
            ></div>
          </div>
        </div>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Header, Icon, List, Item, Block, BlockTitle } from 'gree-ui';
import {
  closePage,
  changeBarColor,
} from '../../../../static/lib/PluginInterface.promise';

export default {
  name: 'Problem',
  components: {
    [Header.name]: Header,
    [Icon.name]: Icon,
    [List.name]: List,
    [Item.name]: Item,
    [Block.name]: Block,
    [BlockTitle.name]: BlockTitle,
  },
  props: {
    // 标题
    title: {
      type: String,
      default() {
        return '';
      },
    },
  },
  data() {
    return {
      statusBarColor: '#ffffff',
      titleText: '常见问题',
      listOrDetail: true,
      showItme: 0,
      listData: [
        {
          title: '关于“出水温度”',
          itemMsg: [
            {
              itemTitle: '1.打开出水阀不排放热水',
              itemMs:
                '出现原因及解决办法：<br/>（1）燃气阀、进水阀是否全部打开；<br/>（2）确认是否出现停水；<br/>（3）确认是否出现停水；<br/>（4）确认是否出现冻伤；<br/>（5）确认机组开关是否切换到关闭状态。',
            },
            {
              itemTitle: '2.水温无法降低',
              itemMs:
                '出现原因及解决办法：<br/>（1）确认当前设定温度是否合适；<br/>（2）当夏季自来水进水温度较高，需求出水温度较低时，机组最小负荷可能达不到使用要求，请将出水阀打开至最大，使热水温度稳定。',
            },
            {
              itemTitle: '3.冷水管中放出热水',
              itemMs:
                '出现原因及解决办法：<br/>（1）对于无专用回水管路的用户，巡航时需要将冷水管作为回水管，因此某些用水点开冷水时会放出热水，此属于正常现象。',
            },
            {
              itemTitle: '4.打开出水阀使用出水流量增大后水温下降',
              itemMs:
                '出现原因及解决办法：<br/>（1）当冬季自来水进水温度较低，要求出热水温度较高时，机组最大符合可能达不到使用要求，请将出水阀开度关小一点，减少出水量，使热水温度升高稳定。',
            },
          ],
        },
        {
          title: '关于“热水量”',
          itemMsg: [
            {
              itemTitle: '1.从出水阀流出的热水量出现变化',
              itemMs:
                '出现原因及解决办法：<br/>（1）在使用热水过程中，若打开其他地方用水点，那么热水量会出现减少，根据自来水管的压力及管路条件，有时会出现热水量骤然减少或暂停出水的现象，此属正常现象，片刻后即可恢复。',
            },
          ],
        },
        {
          title: '关于“声音”',
          itemMsg: [
            {
              itemTitle: '1.初次上电，气阀出现“咔”的响声',
              itemMs:
                '出现原因及解决办法：<br/>（1）因气阀自行复位，属正常现象，并非故障。',
            },
            {
              itemTitle:
                '2.机组使用过程中，需求温度或水量变化时，有时气阀会出现“咔”的响声',
              itemMs:
                '出现原因及解决办法：<br/>（1）因进行气阀火力切换，开阀或关阀，属正常现象，并非故障。',
            },
            {
              itemTitle: '3.停止用水，机组熄火后，风机仍短时间转动',
              itemMs:
                '出现原因及解决办法：<br/>（1）因风机进行烟道后清扫功能，属正常现象，并非故障。',
            },
          ],
        },
        {
          title: '其他现象',
          itemMsg: [
            {
              itemTitle: '1.机组使用中途熄火',
              itemMs:
                '出现原因及解决办法：<br/>（1）确认是否连续使用时间超过40min；<br/>（2）确认燃气阀、进水阀是否全部打开；<br/>（3）确认是否出现停水。',
            },
            {
              itemTitle: '2.冬天寒冷天气排烟口冒出白色烟雾',
              itemMs:
                '出现原因及解决办法：<br/>（1）类似冬天呼出的气息看上去是白色一样，这是由于燃烧烟气中的水蒸气雾化看上去是白色所致。',
            },
            {
              itemTitle:
                '3.有时从热水器的进水泄压阀（过压保护）中短暂流出热水/冷水现象',
              itemMs:
                '出现原因及解决办法：<br/>（1）当机组管路内部产生高压时，由于水过压保护的作用，有时会从泄压阀流出水滴。',
            },
          ],
        },
      ],
    };
  },
  computed: {
    // bgImage() {
    //   return require('../../assets/img/bg_reminder.png');
    // },
  },
  watch: {},
  created() {
    changeBarColor('#ffffff');
  },
  mounted() {},
  methods: {
    /**
     * @description: 返回按钮
     * @function goBack
     */
    goBack() {
      if (this.listOrDetail) {
        closePage();
      } else {
        this.listOrDetail = true;
      }
    },
    setFunction(index) {
      this.showItme = index;
      this.listOrDetail = false;
      console.log(index);
    },
  },
};
</script>

<style lang="scss">
#PROBLEM {
  .gree-header {
    background-color: #ffffff;
    background-size: 0;
    .gree-header-left {
      margin-left: 0rem;
      margin-top: 0.03rem;
      .gree-icon.icon-font {
        font-weight: 600;
      }
    }
    .gree-header-title {
      color: #404657;
      margin: 0 1.5rem;
      font-size: 51px;
    }
    .gree-icon {
      color: #404657;
    }
  }
  .page {
    .page-main {
      .list {
        margin: 0;
        .item-title {
          font-size: 46px;
          color: #404657;
        }
      }
      .problem-list-item {
        .detail-item {
          background-color: #ffffff;
          margin: 36px 34px;
          // padding-left: 34px;
          padding: 34px 34px 34px 34px;
          border-radius: 0.2rem;
          .detail-item-title {
            font-size: 46px;
            color: #404657;
          }
          .detail-item-msg {
            font-size: 38px;
            color: #989898;
            font-weight: 100;
          }
        }
      }
    }
  }
}
</style>
