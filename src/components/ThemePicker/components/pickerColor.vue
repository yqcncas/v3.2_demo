<template>
  <el-dialog
    :title="$t('universal.title')"
    :model-value="modelValue"
    @close="closed"
    width="22%"
  >
    <div class="center">
      <p class="title">{{ $t('theme.themeColorChange') }}</p>
      <el-color-picker v-model="mcolor" :predefine="predefineColors" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('universal.cancel') }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t('universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme.js'

const emits = defineEmits(['update:modelValue'])

const closed = () => {
  emits('update:modelValue', false)
}

const confirm = async () => {
  localStorage.setItem('mainColor', mcolor.value)
  const primary = await generateNewStyle(mcolor.value)
  await writeNewStyle(primary)
  closed()
}

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  }
})

// 预定义色值
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]
const store = useStore()

// 默认色值
const mcolor = ref(store.getters.mainColor)
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
