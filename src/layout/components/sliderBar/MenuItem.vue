<template>
  <!-- element icon -->
  <!-- <i v-if="icon.includes('el-icon')" class="el-icon" :class="icon"> -->
  <!-- </i> -->
  <el-icon
    :size="6"
    v-if="icon.includes('el-icon')"
    style="font-size: 12px; text-align: left"
  >
    <component :is="customIcon"></component>
  </el-icon>
  <!-- 非element -->
  <!-- <span>{{ icon }}</span> -->
  <svg-icon v-else :icon="icon" />
  <span>{{ $t(`route.${title}`) }}</span>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
const customIcon = computed(() => {
  return props.icon.includes('el-icon-')
    ? props.icon.replace('el-icon-', '')
    : props.icon
})
</script>

<style lang="scss" scoped></style>
