<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip content="国际化" :effect="effect">
        <svg-icon icon="language" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="currentLanguage === 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="currentLanguage === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { computed } from 'vue'
import { useStore } from 'vuex'
const i18n = useI18n()
const store = useStore()
const currentLanguage = computed(() => {
  return i18n.locale.value
})

// 更新使用的语言
const handleSetLanguage = (lang) => {
  i18n.locale.value = lang
  const langIndex = lang === 'zh' ? 'zh' : 'en'
  store.commit('app/handlerLang', langIndex)
  localStorage.setItem('lang', langIndex)
  ElMessage.success('更新成功')
}
</script>

<style lang="scss" scoped></style>
