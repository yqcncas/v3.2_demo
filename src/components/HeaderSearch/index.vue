<template>
  <div
    class="header-search"
    :class="{ show: isShow }"
    @click.stop="onShowClick"
  >
    <svg-icon class-name="search-icon" icon="search"></svg-icon>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :remote-method="remoteMethod"
      :loading="loading"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { filterRoutes } from '@/router/routeRule'
import { generateRoutes } from './FuseData'
import Fuse from 'fuse.js'
import { watchSwitchlang } from '@/i18n'
const router = useRouter()

let searchPool = computed(() => {
  const value = filterRoutes(router.getRoutes())
  return generateRoutes(value)
})

let fuse

const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool.value, {
    shouldSort: true, // 按优先级排序
    minMatchCharLength: 1, // 匹配相对应的内容 如搜s sss 超过该值才会被认为匹配
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool.value)
const isShow = ref(false)
const search = ref(null)
const loading = ref(false)
const searchOptions = ref([])
const onShowClick = () => {
  isShow.value = !isShow.value
}
const remoteMethod = (query) => {
  if (query !== '') {
    console.log(fuse)
    console.log(fuse.search(query))
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}
const onSelectChange = (val) => {
  router.push(val.path)
}
const headerSearchSelectRef = ref(null)
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}

watchSwitchlang(() => {
  // searchPool = computed(() => {
  //   const value = filterRoutes(router.getRoutes())
  //   return generateRoutes(value)
  // })
  // console.log(searchPool)
  searchPool = computed(() => {
    const value = filterRoutes(router.getRoutes())
    return generateRoutes(value)
  })
  initFuse(searchPool)
})
watch(
  isShow,
  (val) => {
    if (val) {
      headerSearchSelectRef.value.focus()
      document.body.addEventListener('click', onClose)
    } else {
      document.body.removeEventListener('click', onClose)
    }
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  ::v-deep .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
