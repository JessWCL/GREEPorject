<template>
  <div class="off-line-wrapper">
    <SafeAreaInsetTopComponent :top-color="barColor" />
    <div class="off-line">
      <Header />
      <img
        class="offline-img"
        :src="offlineImg"
      >
      <div class="offline-txt">
        连接已断开，
        <a
          href="javascript:void(0);"
          @click="setVisible(true)"
        >
          查看详情
        </a>
      </div>
      <!-- <Confirm
          visible={visible}
          cancelCallback={() => setVisible(null)}
          title="离线检查"
          body="1.家电是否连接电源？
          <br />2.设备是否连上家庭WiFi？
          <br />3.拔掉电源插头再插上试试看。
          <br /><br />
          如果以上仍未恢复连接，您可尝试重置WiFi。"
          footer="取消"
        /> -->
      <div :class="confirmClass">
        <div class="confirm-container animated-in">
          <div class="header">离线检查</div>
          <div class="body">
            1.&nbsp;家电是否连接电源？
            <br>2.设备是否连上家庭WiFi？
            <br>3.拔掉电源插头再插上试试看。
            <br><br>
            如果以上仍未恢复连接，您可尝试重置WiFi。
          </div>
          <div
            class="footer"
            @click="setVisible(false)"
          >
            取消
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SafeAreaInsetTopComponent from '../SafeAreaInsetTopComponent';
import Header from '../../pages/Header';
import offlineImg from './offline.png';
import { BarColor } from '../../api/constant';
import * as types from '../../store/types';

export default {
  components: {
    Header,
    SafeAreaInsetTopComponent,
  },
  data() {
    return {
      offlineImg,
      visible: false
    };
  },
  computed: {
    ...mapState({
      deviceState: state => state.deviceState,
    }),
    confirmClass() {
      return this.visible ? 'confirm-bg' : 'confirm-bg none';
    },
    barColor() {
      return BarColor.blue;
    }
  },
  watch: {
    deviceState(newV, oldV) {
      // 判断设备是否离线
      if (newV === -1) {
        console.log('设备离线了~'); // eslint-disable-line
        // eslint-disable-next-line no-undef
        vm.$router.push('/offline');
      } else if ((newV === 2 || newV === 3) && oldV === -1) {
        console.log('设备在线了~'); // eslint-disable-line
        // eslint-disable-next-line no-undef
        vm.$router.push('/');
      }
    }
  },

  methods: {
    setVisible(value) {
      this.visible = value;
    }
  }
};
</script>

<style scoped>
.off-line-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left:0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.off-line {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  position: relative;
  background-image: url("./offline_bg.png");
  background-size: cover;
}

.off-line .offline-img {
  width: 12rem;
}

.off-line .offline-txt {
  margin-top: 2rem;
  font-size: 1.5rem;
}
.off-line .offline-txt a {
  text-decoration: underline;
}

.confirm-bg {
  z-index: 1010;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  transition: all 1s;
}

.confirm-bg.none {
  display: none;
}

.confirm-bg .confirm-container {
  overflow: hidden;
  width: 90%;
  background-color: #fff;
  border-radius: 10px;
  font-size: 1.5rem;
}

.confirm-container .header {
  padding: 1.5rem;
  padding-bottom: 0;
  text-align: center;
  font-size: 1.5rem;
}
.confirm-container .body {
  padding: 1.5rem 3.7rem;
}
.confirm-container .footer {
  padding: 1.4rem;
  text-align: center;
  border-top: 1px solid #ececec;
}
.confirm-container .footer:active {
  background: rgba(0, 0, 0, 0.05);
}

.animated-in {
  animation: scale-in 0.5s ease;
}

@keyframes scale-in {
  from {
    transform: scale(0.3);
  }
  to {
    transform: scale(1);
  }
}
</style>
