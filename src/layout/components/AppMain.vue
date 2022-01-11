<template>
  <div class="app-main">
    <!-- <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition> -->
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { isTags } from './isTags'
import i18n from '@/i18n'
const route = useRoute()
const store = useStore()
const getTitle = (route) => {
  console.log(route)
  let title
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = i18n.global.t(`route.${route.meta.title}`)
  }
  return title
}
watch(
  route,
  (val, oldV) => {
    if (!isTags(val.path)) return
    const { fullPath, meta, name, params, path, query } = val
    console.log(fullPath, meta, name, params, path, query)
    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(val)
    })
  },
  { deep: true }
)
const lang = computed(() => {
  console.log(store.getters.lang)
  return store.getters.lang
})

watch(
  lang,
  () => {
    console.log('****')
    console.log(store.getters.tagsViewList)
    store.getters.tagsViewList.forEach((item, index) => {
      const tagObj = {
        tag: {
          ...item,
          title: getTitle(item)
        },

        index
      }
      store.commit('app/changeTagsViewList', tagObj)
    })
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.28s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
