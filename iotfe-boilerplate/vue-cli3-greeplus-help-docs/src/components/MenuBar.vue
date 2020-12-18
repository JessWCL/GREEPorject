<template>
  <div class="menu">
    <div v-for="(item, index) in menuItems" 
         :key="index" 
         @click="gotoMenuDetail(item.tag)"
         class="menu-item">
      <img :src="item.imgSrc">
      <h3>{{ item.name }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        {
          imgSrc: require('../assets/img/network.png'),
          name: '配网',
          tag: 'network'
        },
        {
          imgSrc: require('../assets/img/account.png'),
          name: '账号',
          tag: 'account'
        },
        {
          imgSrc: require('../assets/img/device.png'),
          name: '设备',
          tag: 'device'
        },
        {
          imgSrc: require('../assets/img/others.png'),
          name: '其他',
          tag: 'other'
        },
      ]
    };
  },
  methods: {
    gotoMenuDetail(tag) {
      this.$router.push(`/menuDetail/${tag}`);
    }
  }
};
</script>

<style lang="scss" scoped>
  .menu {
    background-image: url('../assets/img/menubar-bg.png');
    background-size: 100% 100%;
    display: flex;
    flex-wrap: nowrap;
    box-sizing: border-box;
    justify-content: space-between;
    margin: 0;
    padding: 84px 73px 104px;
    .menu-item {
      // width: 25%;
      text-align: center;
      img {
        display: block;
        width: 126px;
        height: 126px;
      }
      h3 {
        margin-top: 26px;
        margin-bottom: 0px;;
        color: #fff;
        font-size: 42px;
        font-weight: normal;
      }
    }
  }
</style>
