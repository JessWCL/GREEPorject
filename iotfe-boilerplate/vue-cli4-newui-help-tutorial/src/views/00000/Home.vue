<template>
  <gree-view class="view-tutorial" bg-color="#ffffff">
    <gree-page no-navbar class="page-home">
      <div class="page-main">
        <gree-collapse v-model="active" accordion>
          <gree-collapse-item
            :key="index"
            v-for="(item, index) in dataList"
            :title="item.title"
            :name="index">
            <p class="fun-name">{{ item.functionDesc }}</p>
            <p class="ope-name">{{ item.operationDesc }}</p>
            <template v-for="(itemImg, index) in item.imgList">
              <div class="img-container" :key="index">
                <p v-if="itemImg.title" class="title">{{ itemImg.title }}</p>
                <p v-if="itemImg.desc" class="desc">{{ itemImg.desc }}</p>
                <img :src="itemImg.src" alt="">
              </div>
            </template>
            <p class="tips-name">{{ item.tipsTitle }}</p>
            <p class="tips-item" :key="'tips-' + index" v-for="(itemTip, index) in item.tips">{{ itemTip }}</p>
            </gree-collapse-item>
        </gree-collapse>
      </div>
    </gree-page>
  </gree-view>
</template>

<script>
import { Collapse, CollapseItem } from 'gree-ui';
import { mapState, mapMutations } from 'vuex';
import { closePage, changeBarColor } from '../../../../static/lib/PluginInterface.promise';

export default {
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  data() {
    return {
      active: '', // no selected
      dataList: [
        {
          title: '1. 设置温度',
          functionDesc: '功能说明：随时随地进行温度的控制',
          operationDesc: '操作说明：滑动圆环，选择自己适合的温度',
          imgList: [
            {
              src: require('@/assets/img/1-0.png')
            }
          ],
          tipsTitle: '温馨提醒：',
          tips: [
            '顺时针调节为升高温度，逆时针调节为降低温度'
          ],
        },
        {
          title: '2. 设置风速或模式',
          functionDesc: '功能说明：随时随地进行风速或模式的调整',
          operationDesc: '操作说明：点击“风速”或“模式”对空调运行状态进行调整',
          imgList: [
            {
              title: 'a.控制首页，底部功能栏',
              desc: '（① 点击“风速”按钮 ② 选择合适的风挡）',
              src: require('@/assets/img/2-0.png')
            },
            {
              desc: '（① 点击“模式”按钮 ② 选择合适的模式）',
              src: require('@/assets/img/2-1.png')
            },
          ],
          tipsTitle: '温馨提醒：',
          tips: [
            'a.有些空调没有制热模式，需要在说明书中确认购买的空调是否支持制热模式',
            'b.制冷、制热模式下，可以选择强劲风和静音风，其他模式暂不支持这两个风挡',
            'c.若选择了除湿模式，空调强制设为低风档，其他风挡暂不支持',
            'd.若选择了八度制热模式，空调强制设为自动风挡，其他风挡暂不支持',
          ]
        },
        {
          title: '3. 设置预约',
          functionDesc: '功能说明：设置周定时开关机，可设置周日到周六每天具体开机和关机的时间。',
          operationDesc: '操作说明：（示意图）点击“预约”进入预约界面进行设置。',
          imgList: [
            {
              desc: 'a.控制首页，底部功能栏“高级”，预约和更多功能在这里',
              src: require('@/assets/img/3-0.png')
            },
            {
              desc: 'b.高级功能页面点击预约，首次使用预约，直接进入新建预约页',
              src: require('@/assets/img/3-1.png')
            },
            {
              desc: 'c.可以开启关闭设置预约；点击编辑对现有预约进行删除；点击新建预约可以新建（最多可建立10条预约）',
              src: require('@/assets/img/3-2.png')
            },
          ],
          tipsTitle: '温馨提醒：',
          tips: [
            '预约列表最多为10个预约项目。',
            '启用App定时：遥控器设置定时，此时App预约列表界面中定时任务全部变更为“关闭状态”，遥控器取消定时不会影响App预约。',
            '未启用App定时：遥控器任意键，此时App预约列表界面中定时任务全部变更为“关闭状态”',
          ]
        },
        {
          title: '4. 使用高级功能',
          functionDesc: '功能说明：对空调进行更多的高级设置',
          operationDesc: '操作说明：（示意图）点击 “高级功能”，高级功能弹窗可选择其他功能',
          imgList: [
            {
              src: require('@/assets/img/4-0.png')
            }
          ],
          tipsTitle: '温馨提醒：',
          tips: [
            '不同款的空调的高级功能可能不同，以实际为准。'
          ]
        },
        {
          title: '5. 修改设备名称',
          functionDesc: '功能说明：自由编辑设备名称，方便查找设备',
          operationDesc: '操作说明：（示意图）点击“更多”进入更多页，点击“设备名称”对设备名称进行编辑修改',
          imgList: [
            {
              src: require('@/assets/img/5-0.png')
            }
          ],
          tipsTitle: '温馨提醒：',
          tips: [
            '名称不支持符号（补充“怎样设置名称会更容易语音设置”）设置名称不支持输入符号，设置成功的名称可以通过语音操控。示例：“小格”'
          ]
        },
        {
          title: '6. 更换所属房间',
          functionDesc: '功能说明：调整设备所在房间，方便管理设备',
          operationDesc: '操作说明：（示意图）点击“更多”进入更多页，点击“所属房间”调整设备所在房间',
          imgList: [
            {
              src: require('@/assets/img/6-0.png')
            }
          ],
          tipsTitle: '温馨提醒：',
          tips: [
            '房间也可以自定义名字'
          ]
        },
        {
          title: '7. 升级固件版本',
          functionDesc: '功能说明：升级固件版本，让设备功能保持最新',
          operationDesc: '操作说明：（示意图）点击“更多”进入更多页，点击固件 版本进行升级',
          imgList: [
            {
              src: require('@/assets/img/7-0.png')
            }
          ],
          tipsTitle: '温馨提醒：',
          tips: [
            '如固件版本已升级至最新版本，则无需升级'
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.view.view-tutorial {
  .gree-collapse-item__wrapper {
    .gree-collapse-item__content {
      padding-left: 100px;
      padding-right: 100px;
      p {
        &.fun-name {
          margin-bottom: 14px;
          color: #404657;
          font-size: 38px;
        }
        &.ope-name {
          font-size: 38px;
          color: #404657;
        }
        &.tips-name {
          margin-bottom: 41px;
          font-size: 42px;
          color: #404657;
        }
        &.tips-item {
          font-size: 38px;
          line-height: 84px;
          color: rgba(65, 71, 88, 0.6);
        }
      }
    }
  }
  .img-container {
    margin: 42px 0;
    .desc {
      color: rgba(64, 70, 87, 0.6);
      margin: 42px 0;
    }
    img {
      max-width: 100%;
    }
  }
}
</style>

<style lang="scss">
.gree-collapse {
  .list {
    .item-content {
      .item-inner {
        .item-title {
          font-size: 46px;
          color: #404657;
        }
      }
    }
  }
  .gree-collapse-item__wrapper {
    .gree-collapse-item__content {
      padding-left: 60px;
      padding-right: 60px;
    }
  }
}
</style>
