<template>
  <div class="search-bar-wrapper">
    <img class="logo" src="../assets/img/robot.png">
    <div class="search-input-section">
      <p>Hi! 我是小格</p>
      <div class="search-input-wrapper">
        <div class="content">
          <img class="search-icon" src="../assets/img/icon-search.png"/>
          <input id="search-input"
                 type="text" 
                 autocomplete="off"
                 @focus="onSearchInputFocus"
                 @keyup.enter="onSearch"
                 placeholder="您好，需要什么帮助" 
                 v-model="searchString">
          <img class="close-icon" src="../assets/img/btn-close.png" v-show="showClearBtn" @click="clearSearchInput"/>
        </div>
        <ul class="dropdowm-select" v-show="showDropdownSelect">
          <li v-for="(item, index) in dropDownList" :key="index" @click="gotoDetail(item)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import configs from '../config/config';
import { mapState } from 'vuex';
import { showToast } from '../../../static/lib/PluginInterface.promise';

export default {
  data() {
    return {
      showClearBtn: false,
      searchString: '',
      showDropdownSelect: false,
      dropDownList: []
    };
  },
  computed: {
    ...mapState({
      allHelpDocItems: state => state.helpDocs.allItems,
    }),
  },
  watch: {
    searchString(val) {
      this.showDropdownSelect = false;
      if (val) {
        this.showClearBtn = true;
        this.setDropdownList(val);
      } else {
        this.showClearBtn = false;
      }
    }
  },
  methods: {
    clearSearchInput() {
      this.searchString = '';
    },
    onDocumentClick(e) {
      if (e.target && e.target.id === 'search-input') {
        return;
      }
      if (this.showDropdownSelect) {
        this.showDropdownSelect = false;
      }
    },
    gotoDetail(item) {
      this.$router.push(`/linkDetail?istop=0&id=${item.id}&category=${item.category}`);
    },
    onSearchInputFocus() {
      const str = this.searchString.trim();
      this.setDropdownList(str);
    },
    setDropdownList(str) {
      if (str) {
        const matchData = this.allHelpDocItems.filter(x => x.name.indexOf(str) !== -1);
        if (matchData && matchData.length) {
          this.dropDownList.splice(0, this.dropDownList.length, ...matchData);
          this.showDropdownSelect = true;
        }
      }
    },
    onSearch() {
      const str = this.searchString.trim();
      if (!str) {
        showToast('请输入搜索关键字', 0);
      } else {
        const matchData = this.allHelpDocItems.filter(x => x.name.indexOf(str) !== -1);
        if (!matchData || matchData.length === 0) {
          showToast('换个关键词试试吧', 0);
          return;
        }
       
        this.$nextTick(() => {
          this.showDropdownSelect = false;
          setTimeout(() => {
            this.setDropdownList(str);
          }, 300);
        });
        
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.onDocumentClick, false);
  },
  destroyed() {
    document.addEventListener('click', this.onDocumentClick, false);
  }
};
</script>

<style lang="scss" scoped>
.search-bar-wrapper {
  display: flex;
  padding: 0px;
  height: 260px;
  justify-content: space-around;
  .logo {
    width: 268px;
    height: 228px;
    margin: 49px 54px 0px 54px;
  }
  .search-input-section{
    flex:1;
    p {
      text-align: left;
      color: #ffffff;
      font-size: 52px;
      margin-top: 98px;
      margin-bottom: 24px;
    }
    .search-input-wrapper{
      width: 626px;
      height: 62px;
      background: rgba($color: #000000, $alpha: 0.2);
      border-radius: 62px;
      position: relative;
      .content {
        height: 100%;
        display: flex;
        align-items: center;
        .search-icon {
          width: 40px;
          height: 40px;
          margin: 0 20px;
        }
        input {
          height: 100%;
          line-height: normal;
          color: #fff;
          border: none;
          outline: none;
          background: transparent;
          appearance: none;
          width: 486px;
          &::placeholder{
            color: rgba($color: #fff, $alpha: 0.6);
            font-size: 34px;
          }
        }
        .close-icon{
          width: 42px;
          height: 40px;
          margin-right: 21px;
        }
      }
      .dropdowm-select {
        position: absolute;
        left: 0;
        top: 62px;
        background: #fff;
        list-style: none;
        margin: 0;
        padding: 0;
        margin-top: 5px;
        width: 100%;
        text-align: left;
        box-sizing: border-box;
        font-size: 42px;
        border-radius: 0 0 25px 25px;
        z-index: 2;
        box-shadow: 0px 0px 24px 0px rgba(0,0,0,.2);
        max-height: 610px;
        overflow-x: hidden;
        transition: display 1s ease-in-out;
        &::-webkit-scrollbar  {
          display: none;
        }
        li {
          height: 122px;
          line-height: 122px;
          padding: 0 52px;
          border-bottom: 1px solid #efefef;
          font-size: 42px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: rgba($color: #404657, $alpha: 0.8);
          &:last-child {
            border: none;
          }
        }
      }
    }
  }
}
  
</style>
