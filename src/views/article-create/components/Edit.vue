<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import E from 'wangeditor'
import { onMounted, defineProps, defineEmits } from 'vue'
import { watchSwitchLang } from '@/utils/i18.js'
import i18next from 'i18next'
import { commitArticle, editArticle } from './commit'
import { useStore } from 'vuex'
const store = useStore()
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  detail: {
    type: Object,
    default: () => {}
  }
})

let editor
const initEdit = () => {
  editor = new E('#editor-box')
  editor.config.zIndex = 1
  // editor.config.placeholder = '自定义 placeholder 提示文字'
  editor.config.showMenuTooltips = true // 菜单栏提示
  editor.config.menuTooltipPosition = 'down' // 提示文字的位置
  editor.config.lang = store.getters.lang === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  editor.create()
}
onMounted(() => {
  initEdit()
})
watchSwitchLang(() => {
  const text = editor.txt.text()
  editor.destroy()
  initEdit()
  editor.txt.text(text)
})

const emits = defineEmits(['onSuccess'])
const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.text()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: editor.txt.text()
    })
  }

  editor.txt.clear()
  emits('onSuccess')
}
</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
