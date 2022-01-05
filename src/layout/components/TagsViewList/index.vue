<template>
  <div class="tags-view-container">
    <div class="tags-view-wrapper">
      <router-link
        class="tags-view-item"
        :class="isActive(item) ? 'active' : ''"
        v-for="(item, index) in tagsList"
        :key="index"
        :to="item.fullPath"
        @contextmenu.prevent="openMenu($event, index)"
        >{{ item.title }}
        <el-icon
          v-show="!isActive(item)"
          @click.prevent.stop="onCloseClick(index)"
          ><close /></el-icon
      ></router-link>
      <context-menu
        v-show="visible"
        :style="menuStyle"
        :index="currentIndex"
      ></context-menu>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import ContextMenu from './ContextMenu.vue'
const store = useStore()
const tagsList = ref(store.getters.tagsViewList)
const route = useRoute()
const visible = ref(false)
const menuStyle = ref({
  left: 0,
  top: 0
})
const currentIndex = ref(0)
// 是否被选中
const isActive = (tag) => {
  return tag.path === route.path
}
const onCloseClick = (index) => {
  store.commit('app/removeTagsView', { type: 'index', index })
}

// 鼠标右键
const openMenu = (e, index) => {
  const { x, y } = e
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  currentIndex.value = index
  visible.value = true
}
const hiddenVisible = () => {
  visible.value = false
}

watch(
  visible,
  (val) => {
    if (val) {
      document.body.addEventListener('click', hiddenVisible)
    } else {
      document.body.removeEventListener('click', hiddenVisible)
    }
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        color: #fff;
        background: $menuBg;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 4px;
        }
      }
      // close 按钮
      .el-icon-close {
        width: 16px;
        height: 16px;
        line-height: 10px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
}
</style>
