<template>
  <div @click="onToggle">
    <svg-icon
      id="guide-full"
      :icon="isFullFlag ? 'exit-fullscreen' : 'fullscreen'"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import screenfull from 'screenfull'
const isFullFlag = ref(screenfull.isFullscreen)
const onToggle = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}
const changeFullScreen = () => {
  isFullFlag.value = screenfull.isFullscreen
}

onMounted(() => {
  // window.addEventListener('resize', () => {
  //   isFullFlag.value = screenfull.isFullscreen
  // })
  screenfull.on('change', changeFullScreen)
})
onBeforeUnmount(() => {
  // window.removeEventListener('resize')
  screenfull.off('change')
})
</script>

<style lang="scss" scoped></style>
