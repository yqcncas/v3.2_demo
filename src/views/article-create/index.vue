<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      >
      </el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('article.markdown')" name="markdown">
          <mark-down
            :title="title"
            :detail="detail"
            @onSuccess="onSuccess"
          ></mark-down>
        </el-tab-pane>
        <el-tab-pane :label="$t('article.richText')" name="editor">
          <Edit :title="title" :detail="detail" @onSuccess="onSuccess"></Edit>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Edit from './components/Edit.vue'
import MarkDown from './components/MarkDown.vue'
const activeName = ref('markdown')
const title = ref('')
const onSuccess = () => {
  title.value = ''
}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
