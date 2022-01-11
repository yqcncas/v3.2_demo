import Sortable from 'sortablejs'
import { ref } from 'vue'
import { articleSort } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

export const tableRef = ref(null)

export const initSortTable = (tableData, cb, loading) => {
  const tbody = tableRef.value.$el.querySelectorAll('.el-table__body-wrapper tbody')[0]
  // const _this = this
  // row拖拽
  Sortable.create(tbody, {
    animation: 150,
    sort: true,
    // handle: '.handle', // 使用类名才能拖拽
    ghostClass: 'sortable-ghost', // 可通过类名来搞css
    async onEnd({ newIndex, oldIndex }) {
      await articleSort({
        initRanking: tableData.value[oldIndex].ranking,
        finalRanking: tableData.value[newIndex].ranking
      })
      ElMessage.success({
        message: i18n.global.t('article.sortSuccess'),
        type: 'success'
      })
      loading.value = true
      tableData.value = []
      cb && cb() // 传递过来的更新数据方法
    }
  })
}
