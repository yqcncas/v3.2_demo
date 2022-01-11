<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="checkBoxOptions">
          <el-checkbox
            v-for="(item, index) in options"
            :label="item.label"
            :key="index"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table ref="tableRef" :data="tableData" border v-loading="loading">
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        >
          <template #default="{ row }" v-if="item.prop === 'publicDate'">
            {{ $filters.relativeTimeMethods(row.publicDate) }}
          </template>
          <template #default="{ row }" v-else-if="item.prop === 'action'">
            <el-button type="primary" size="mini" @click="onShowClick(row)">{{
              $t('article.show')
            }}</el-button>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
              $t('article.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:currentPage="limit.page"
        :page-sizes="[2, 5, 10, 400]"
        :page-size="limit.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="limit.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated } from 'vue'
import { getArticleList, deleteArticle } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18.js'
import { options, checkBoxOptions, tableColumns } from './options'
import { initSortTable, tableRef } from './sortTable'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
const i18n = useI18n()
const router = useRouter()

const tableData = ref([])
const loading = ref(true)
const limit = ref({
  page: 1,
  size: 10,
  total: 0
})
const getListData = async () => {
  const res = await getArticleList(limit.value)
  tableData.value = res.list
  limit.value.total = res.total
  loading.value = false
  initSortTable(tableData, getListData, loading)
}
watchSwitchLang(getListData)
onActivated(getListData)
const onShowClick = (row) => {
  router.push(`/article/${row._id}`)
}
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('article.dialogTitle1') + row.title + i18n.t('article.dialogTitle2'),
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  )
    .then(async () => {
      await deleteArticle(row._id)
      ElMessage({
        type: 'success',
        message: i18n.t('article.removeSuccess')
      })
      getListData()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}
const handleSizeChange = (size) => {
  limit.value.size = size
  getListData()
}
const handleCurrentChange = (val) => {
  limit.value.page = val
  getListData()
}
// onMounted(() => {

// })
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  ::v-deep .el-table__row {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}

::v-deep .sortable-ghost {
  opacity: 0.6;
  color: #fff !important;
  background: #304156 !important;
}
</style>
