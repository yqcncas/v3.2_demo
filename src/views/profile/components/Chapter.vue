<template>
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in chapterList"
      :key="index"
      :timestamp="activity.timestamp"
      placement="top"
    >
      <el-card>
        <h4>{{ activity.content }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { chapter } from '@/api/user.js'
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
onMounted(() => {
  initChapter()
})

const chapterList = ref([])
const initChapter = async () => {
  chapterList.value = await chapter()
}

watch(
  store.getters.lang,
  () => {
    initChapter()
  },
  { deep: true }
)
</script>

<style lang="scss" scoped></style>
