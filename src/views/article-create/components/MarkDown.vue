<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import MKEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { watchSwitchLang } from '@/utils/i18.js'
import { onMounted, defineProps, defineEmits } from 'vue'
import { commitArticle } from './commit'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

let mkEditor
const initEditor = () => {
  mkEditor = new MKEditor({
    el: document.getElementById('markdown-box'), // 容器元素
    previewStyle: 'vertical', // 方向
    height: '500px', // 高度
    language: store.getters.lang === 'zh' ? 'zh-CN' : 'en'
    // initialValue: 'content'
  })
  mkEditor.getMarkdown()
}
onMounted(() => {
  initEditor()
})
watchSwitchLang(() => {
  const htmlStr = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})

const emits = defineEmits(['onSuccess'])
const onSubmitClick = async () => {
  await commitArticle({
    title: props.title,
    content: mkEditor.getHTML()
  })
  mkEditor.reset()
  emits('onSuccess')
}
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
