<!--
 * @Author: Jerry-Rain
 * @Date: 2019-09-10 15:34:25
 * @LastEditors: Jerry-Rain
 * @LastEditTime: 2019-12-13 08:35:32
 * @Description: 继承强哥的意志-写一个快速开始的101模板; 
 -->
<template>
  <gree-view>
    <title-bar 
      :options="{preventGoBack: true}"/>
    <gree-page class="page-home">
      <section class="page-header">
        <search-section />
        <menu-bar />
      </section>
      <question-list class="question-list" />
    </gree-page>
  </gree-view>
</template>

<script>
import SearchSection from '../components/SearchInput';
import MenuBar from '../components/MenuBar';
import QuestionList from '../components/QuestionList';
import TitleBar from '../components/TitleBar';
import { changeBarColor } from '../../../static/lib/PluginInterface.promise';

export default {
  components: {
    'search-section': SearchSection,
    'menu-bar': MenuBar,
    'question-list': QuestionList,
    'title-bar': TitleBar,
  },
  activated() {
    changeBarColor('#f4f4f4');
  },
};
</script>
