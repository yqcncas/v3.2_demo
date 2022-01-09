<template>
  <el-menu
    :collapse="!$store.getters.siderOpenFlag"
    :default-active="activeMenu"
    unique-opened
    :active-text-color="variables.menuActiveText"
    :background-color="variables.menuBg"
    class="el-menu-vertical-demo"
    :text-color="variables.menuText"
    router
  >
    <sider-bar-item
      v-for="item in routes"
      :key="item.path"
      :routes="item"
    ></sider-bar-item>
  </el-menu>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { filterRoutes, generateMenus } from '@/router/routeRule'
import { computed } from 'vue'
import SiderBarItem from './SiderBarItem.vue'
import variables from '@/styles/variables.scss'
const router = useRouter()
const routes = computed(() => {
  const dealRouters = filterRoutes(router.getRoutes())
  console.log(generateMenus(dealRouters))
  return generateMenus(dealRouters)
})

const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped></style>
