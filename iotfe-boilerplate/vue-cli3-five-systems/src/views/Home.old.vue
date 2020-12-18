<template>
  <div class="home-page  page-section" id="home">
    <!-- <img class="home-img" src="../assets/img/home-introduction.png" alt /> -->
    <div class="home-title">
      <h2>格力零碳健康家</h2>
      <h3>Gree Carbon-Free Health House</h3>
      <h4>零碳健康家以太阳能驱动智能产品，实现节能减排的智能生活，打造节能环保、舒适健康的零碳健康家。</h4>
      <p>The Gree Carbon-Free Health House,consisting of intelligent products powered by solar energy,creates an energy-conserving and emission-reducing life.</p>
    </div>
    <div class="home-body">
      <div class="home-section">
        <div class="section-title">
          <h3>系统概述/System Overview</h3>
        </div>
        <div class="section-content">
          <ul>
            <li>
              <div class="content-title">
                <h4>健康管理系统</h4>
                <i>Health Management System</i>
              </div>
              <div class="content-body">
                <h4>从饮食、洗护、用水等方面提供健康解决方案</h4>
                <p>Providing health solutions for diet personal care and water usage</p>
              </div>
            </li>
            <li>
              <div class="content-title">
                <h4>空气管理系统</h4>
                <i>Air Management System</i>
              </div>
              <div class="content-body">
                <h4>恒温、恒湿、恒氧、恒净的空气管理给我自由、洁净的呼吸体验</h4>
                <p>The management of constant temperature humidity, oxygen constant , cleanliness brings us better experience of breath.</p>
              </div>
            </li>
            <li>
              <div class="content-title">
                <h4>能源管理系统</h4>
                <i>Energy Management System</i>
              </div>
              <div class="content-body">
                <h4>零排放能源供应系统是零碳家庭的驱动引擎</h4>
                <p>Zero-emission power supply system is the core of the Gree Carbon-Free Health House.</p>
              </div>
            </li>
            <li>
              <div class="content-title">
                <h4>光照管理系统</h4>
                <i>Illumination Management System</i>
              </div>
              <div class="content-body">
                <h4>情景模式、感应联动等多功能为照明采光提供解决方案</h4>
                <p>Scenario mode and induction devices,which can activate multiple functions provides solutions of illumination system.</p>
              </div>
            </li>
            <li>
              <div class="content-title">
                <h4>安防管理系统</h4>
                <i>Home Security Management System</i>
              </div>
              <div class="content-body">
                <h4>智能门锁、监控布防检测系统为零碳健康家保驾护航</h4>
                <p>Intelligent lock system and supervised arm protect the Gree Carbon-Free Health House.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="home-section section-2">
        <div class="section-title">
          <h3>物联赋能/Talents Of IoT</h3>
        </div>
        <div class="section-content">
          <ul>
            <li>
              <div class="content-title">
                <img :src="imgAssets.IC" class="home-content-img">
              </div>
              <div class="content-body">
                <h4>智能连接</h4>
                <p>Intelligent Connection</p>
              </div>
            </li>
            <li>
              <div class="content-title">
                <img :src="imgAssets.IP" class="home-content-img">
              </div>
              <div class="content-body">
                <h4>智能感知</h4>
                <p>Intelligent Perception</p>
              </div>
            </li>
            <li>
              <div class="content-title">
                <img :src="imgAssets.II" class="home-content-img">
              </div>
              <div class="content-body">
                <h4>智能交互</h4>
                <p>Intelligent Interaction</p>
              </div>
            </li>
            <li>
              <div class="content-title">
                <img :src="imgAssets.ICP" class="home-content-img">
              </div>
              <div class="content-body">
                <h4>智能云平台</h4>
                <p>Intelligent Cloud Platform</p>
              </div>
            </li>
            <li>
              <div class="content-title">
                <img :src="imgAssets.AI" class="home-content-img">
              </div>
              <div class="content-body">
                <h4>人工智能</h4>
                <p>Artificial Intelligent </p>
              </div>
            </li>
            <li>
              <div class="content-title">
                <img :src="imgAssets.IE" class="home-content-img">
              </div>
              <div class="content-body">
                <h4>智慧能源</h4>
                <p>Intelligent Energy</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import svg1 from '../assets/img/washer.svg';

const imgAssets = {
  IC: require('../assets/img/home/ic_Intelligent.svg'),
  IP: require('../assets/img/home/ic_Perception.svg'),
  II: require('../assets/img/home/ic_Interaction.svg'),
  ICP: require('../assets/img/home/ic_Cloud_Platform.svg'),
  AI: require('../assets/img/home/ic_Artificial.svg'),
  IE: require('../assets/img/home/ic_energy.svg'),
};

export default {
  name: "Home",
  components: {},
  data() {
    return {
      imgAssets,
    };
  },
  computed: {
    ...mapState({})
  },
  watch: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
$skyblue: #32C5FF;

.home-page {
  // background: transparent url('./../assets/img/home-introduction.png') top center no-repeat;
  overflow: hidden;
  background-color: transparent;
  border: none;
  background-size: contain;
  font-family: 'SourceHanSansCN-Normal';
  font-weight: lighter;
  .home-img {
    display: block;
    width: 100%;
    height: auto;
  }
  h4 {
    font-weight: normal;
  }
  .home-title {
    text-align: center;
    padding-top: 10px;
    h2 {
      font-weight: normal;
      font-size: 54px;
      color: #000;
      letter-spacing: 2px;
    }
    h3 {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.5);
    }
    h4 {
      padding-top: 30px;
      font-size: 28px;
      font-weight: normal;
    }
    p {
      font-size: 18px;
      color: rgba(0,0,0,.5);
      margin: 0;
      padding-top: 5px;
    }
  }
  .home-section {
    padding: 0 55px;
    padding-top: 45px;
    padding-bottom: 12px;
    .section-title {
      margin-bottom: 36px;
      h3 {
        font-size: 40px;
        font-weight: normal;
        letter-spacing: -1px;
      }
    }
    .section-content {
      ul {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        li {
          max-width: 290px;
          .content-title {
            margin-bottom: 14px;
            h4 {
              font-size: 32px;
              color: $skyblue;
            }
            i {
              font-family: 'Roboto-Regular';
              display: block;
              font-style: normal;
              font-size: 18px;
              color: $skyblue;
            }
          }
          .content-body {
            h4 {
              font-size: 20px;
              padding-bottom: 5px;
            }
            p {
              font-family: 'Roboto-Regular';
              font-size: 18px;
              color: rgba(0, 0, 0, .8);
              margin: 0;
            }
          }
        }
      }
    }
  }
  .section-2 {
    .section-title {
      margin-bottom: 20px;
    }
    .section-content {
      ul {
        li {
          .content-title {
            text-align: center;
            margin-bottom: 5px;
            .home-content-img {
              width: 100px;
              height: 100px;
            }
          }
          .content-body {
            text-align: center;
            h4 {
              font-size: 32px;
              color: #000000;
              line-height: 1;
            }
            p {
              font-family: 'Roboto-Regular';
              font-size: 18px;
            }
          }
        }
      }
    }
  }
}
</style>
