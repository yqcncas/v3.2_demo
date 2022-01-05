<template>
  <div
    class="app-wrapper"
    :class="$store.getters.siderOpenFlag ? 'openSidebar' : 'hideSidebar'"
  >
    <!-- 左侧内容 -->
    <SliderBar
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    />

    <div class="main-container">
      <!-- 顶部 -->
      <div class="fixed-header">
        <NavBar />
        <TagsViewList />
      </div>
      <!-- 内容 -->
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import SliderBar from './components/sliderBar'
import AppMain from './components/AppMain.vue'

import variables from '@/styles/variables.scss'
import TagsViewList from './components/TagsViewList'
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix();
  position: relative;
  width: 100%;
  height: 100%;
  .fixed-header {
    width: calc(100% - $sideBarWidth);
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    transition: all 0.28s;
  }
  &.hideSidebar .fixed-header {
    width: calc(100% - $hideSideBarWidth);
  }
  .sidebar-container {
    min-width: 67px;
  }
}
</style>
