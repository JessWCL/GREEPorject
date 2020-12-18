<template>
  <div class="page-section illumination-page" id="">
    <div class="illumination-container">
      <div v-for="(el, i) in lightData" :key="i" class="location-container">
        <div class="location-title">
          <b>{{ el.location }}</b>
        </div>
        <div v-for="(item, j) in el.items" :key="j" class="location-item">
          <!-- <div :class="{active: item.power === 1, [item.type]: item.type,}" class="item-img" ></div> -->
          <img :src="item.img" alt="" class="item-img">
          <p>{{ item.name }}</p>
        </div>
      </div>
      <!-- {{ lightData }} -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const imgAssets = {};
imgAssets.litOn = require('../assets/img/illumination/lit-on.png');
imgAssets.litOff = require('../assets/img/illumination/lit-off.png');
imgAssets.chuangtou_on = require('../assets/img/illumination/ic_chuangtou_on.svg');
imgAssets.chuangtou_off = require('../assets/img/illumination/ic_chuangtou_off.svg');
imgAssets.ic_curtain_on02 = require('../assets/img/illumination/ic_curtain_on02.svg');
imgAssets.ic_curtain_off02 = require('../assets/img/illumination/ic_curtain_off02.svg');
imgAssets.ic_dai_on = require('../assets/img/illumination/ic_dai_on.svg');
imgAssets.ic_dai_off = require('../assets/img/illumination/ic_dai_off.svg');
imgAssets.ic_gui_on = require('../assets/img/illumination/ic_gui_on.svg');
imgAssets.ic_gui_off = require('../assets/img/illumination/ic_gui_off.svg');
imgAssets.ic_jingzi_on = require('../assets/img/illumination/ic_jingzi_on.svg');
imgAssets.ic_jingzi_off = require('../assets/img/illumination/ic_jingzi_off.svg');
imgAssets.ic_light_on = require('../assets/img/illumination/ic_light_on.svg');
imgAssets.ic_light_off = require('../assets/img/illumination/ic_light_off.svg');
imgAssets.ic_tong_on = require('../assets/img/illumination/ic_tong_on.svg');
imgAssets.ic_tong_off = require('../assets/img/illumination/ic_tong_off.svg');

export default {
  name: "illumination",
  components: {},
  data() {
    return {
      data: [
        {
          location: '入口',
          items: [
            {
              name: '环绕灯',
              power: 1,
              color: 'round-blue',
            },
          ],
        },
        {
          location: '客厅',
          items: [
            {
              name: '氛围灯',
              power: 1,
              color: 'round-blue',
            },
            {
              name: '照明灯',
              power: 1,
              color: 'round-blue',
            },
          ],
        },
        {
          location: '餐厅',
          items: [
            {
              name: '吊灯',
              power: 0,
              color: 'round-blue',
            },
          ],
        },
        {
          location: '书房',
          items: [
            {
              name: '照明灯',
              power: 1,
              color: 'round-blue',
            },
          ],
        },
        {
          location: '晾衣间',
          items: [
            {
              name: '照明灯',
              power: 1,
              color: 'round-blue',
            },
          ],
        },
        {
          location: '卧室',
          items: [
            {
              name: '照明灯',
              power: 1,
              color: 'round-blue',
            },
            {
              name: '床头灯',
              power: 1,
              color: 'round-blue',
            },
            {
              name: '氛围灯',
              power: 1,
              color: 'round-blue',
            },
            {
              name: '窗帘',
              power: 1,
              color: 'round-yellow',
            },
          ],
        },
        {
          location: '儿童房',
          items: [
            {
              name: '照明灯',
              power: 0,
              color: 'round-blue',
            },
            {
              name: '床头灯',
              power: 1,
              color: 'round-blue',
            },
            {
              name: '氛围灯',
              power: 0,
              color: 'round-blue',
            },
            {
              name: '窗帘',
              power: 1,
              color: 'round-yellow',
            },
          ],
        },
        {
          location: '厨房',
          items: [
            {
              name: '照明灯',
              power: 0,
              color: 'round-blue',
            },
            {
              name: '氛围灯',
              power: 0,
              color: 'round-blue',
            },
          ],
        },
        {
          location: '浴室',
          items: [
            {
              name: '照明灯',
              power: 1,
              color: 'round-blue',
            },
          ],
        },
        {
          location: '阳台',
          items: [
            {
              name: '窗帘',
              power: 0,
              color: 'round-yellow',
            },
          ],
        },
      ],
      imgAssets,
    };
  },
  computed: {
    ...mapState({
      illumination: state => state.dataObject.illumination,
    }),
    lightData() {
      const illumination = this.illumination; 
      const roomNameArr = [];
      const roomData = [];
      illumination.forEach(el => {
        const hasRoom = roomNameArr.includes(el.roomName);
        if (hasRoom) {
          const index = roomData.findIndex(data => {
            return el.roomName === data.location;
          });
          roomData[index].items.push({
            name: el.name,
            power: el.pow,
            mid: el.mid,
            img: this.typeImg(el.name, el.pow),
          }); 
        } else {
          roomNameArr.push(el.roomName);
          roomData.push({
            location: el.roomName,
            items: [
              {
                name: el.name,
                power: el.pow,
                mid: el.mid,
                img: this.typeImg(el.name, el.pow),
              },
            ],
          });
        }
      });
      console.log(roomData);
      return roomData;
    },
  },
  watch: {},
  created() {
  },
  methods: {
    // 判断灯光图标
    typeImg(nameVal = '', pow = 0) {
      let img = this.imgAssets.ic_dai_off;
      const name = nameVal + '';
      const imgMap = {
        筒灯: [this.imgAssets.ic_tong_off, this.imgAssets.ic_tong_on, ],
        灯带: [this.imgAssets.ic_dai_off, this.imgAssets.ic_dai_on, ],
        环绕灯: [this.imgAssets.ic_dai_off, this.imgAssets.ic_dai_on, ],
        柜灯: [this.imgAssets.ic_gui_off, this.imgAssets.ic_gui_on, ],
        床头灯: [this.imgAssets.chuangtou_off, this.imgAssets.chuangtou_on, ],
        镜灯: [this.imgAssets.ic_jingzi_off, this.imgAssets.ic_jingzi_on, ],
        窗帘: [this.imgAssets.ic_curtain_off02, this.imgAssets.ic_curtain_on02, ],
      };
      if (name) {
        for (const n of Object.keys(imgMap)) {
          if (name.indexOf(n) > -1) {
            img = imgMap[n][pow];
            break;
          }
        }
      }
      return img;
    },
  }
};
</script>

<style lang="scss" scoped>
$dull-yellow: #F7B500;
$dull-yellow-translucent: #F7B50060;
$skyblue: #32C5FF;
$skyblue-translucent: #32C5FF60;

.illumination-page {
  color: #fff;
  .illumination-container {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 100%;
    padding: 10px 40px;
    padding-bottom: 0;
    box-sizing: border-box;
    /* &::before {
      content: "";
      display: block;
      width: calc(100% - 180px);
      height: 2px;
      background-color: #000;
      position: absolute;
      margin-top: 50px;
    } */
    .location-container {
      display: flex;
      flex-flow: column nowrap;
      .location-title {
        text-align: center;
        margin-bottom: 10px;
        b {
          font-weight: normal;
          font-size: 34px;
        }
      }
      .location-item {
        text-align: center;
        margin-bottom: 10px;
        .item-img {
          display: block;
          width: 90px;
          height: 90px;
          border-radius: 90px;
          margin: 0 auto;
          margin-top: 22px;
          margin-bottom: 5px;
          border: 1px solid #000c;
        }
        p {
          display: block;
          font-size: 24px;
          line-height: 1;
          color: #fff;
          text-align: center;
          margin: 0;
        }
      }
    }
  }
}
</style>
