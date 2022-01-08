<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card class="project-card" :features="featureList" />
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="$t('profile.feature')" name="feature"
              ><Feature :features="featureList"
            /></el-tab-pane>
            <el-tab-pane :label="$t('profile.chapter')" name="chapter"
              ><Chapter
            /></el-tab-pane>
            <el-tab-pane :label="$t('profile.author')" name="author"
              ><Author
            /></el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useStore } from 'vuex'
import ProjectCard from './components/ProjectCard.vue'
import Feature from './components/feature.vue'
import Chapter from './components/Chapter.vue'
import Author from './components/Author.vue'
import { feature } from '@/api/user.js'
// import { useI18n } from 'vue-i18n'
// import { watchSwitchlang } from '@/i18n'
const store = useStore()
const activeName = ref('feature')
const featureList = ref([])
// const i18n = useI18n()
onMounted(() => {
  initfeature()
})

const initfeature = async () => {
  const res = await feature()
  featureList.value = res
}
const lang = computed(() => {
  return store.getters.lang
})
console.log(lang.value)
// watchSwitchlang(initfeature)
watch(
  lang,
  () => {
    initfeature()
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.project-card {
  margin-right: 20px;
}
</style>
