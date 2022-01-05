<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="item.path">
        <span class="no-redirect" v-if="index === breadcrumb.length - 1">{{
          $t(`route.${item.meta.title}`)
        }}</span>
        <span class="redirect" v-else @click="handleClick(item)">{{
          $t(`route.${item.meta.title}`)
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const breadcrumb = ref([]) // 数据
const getBreadcrumb = () => {
  // console.log(route.matched) // 获取当前路由的路由表
  breadcrumb.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
  console.log(breadcrumb.value)
} // 生成数据的方法

const route = useRoute()
watch(
  route,
  () => {
    getBreadcrumb()
  },
  {
    immediate: true,
    deep: true
  }
)

const handleClick = (info) => {
  // console.log(info.path)
  router.push(info.path)
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  // font-size: 14px;
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  ::v-deep .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      color: $menuBg;
    }
  }
}
</style>
