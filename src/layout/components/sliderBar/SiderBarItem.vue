<template>
  <el-sub-menu
    v-if="routes.children && routes.children.length"
    :index="routes.path"
  >
    <template #title>
      <!-- {{ routes.meta.icon }} -->
      <menu-item :title="routes.meta.title" :icon="routes.meta.icon">
      </menu-item>
    </template>
    <sider-bar-item
      v-for="item in routes.children"
      :key="item.path"
      :routes="item"
    ></sider-bar-item>
  </el-sub-menu>
  <el-menu-item v-else :index="routes.path">
    <menu-item :title="routes.meta.title" :icon="routes.meta.icon"></menu-item>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from 'vue'
import MenuItem from './MenuItem.vue'
defineProps({
  routes: {
    type: Object,
    required: true,
    default: () => {}
  }
})
</script>

<style lang="scss" scoped></style>
